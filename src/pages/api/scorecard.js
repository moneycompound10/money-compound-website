// Receives a Financial Health Scorecard submission and writes the lead straight
// into Zoho CRM — no Zoho Flow in the middle.
//
// Flow sat here first and was replaced because it failed silently: it answered
// 200 to every submission while creating nothing, so a visitor saw "Sent" and
// the lead simply vanished. A direct call either works or raises, and the
// failure is logged rather than swallowed.
//
// Needs three env vars, from a Self Client in the Zoho API Console
// (https://api-console.zoho.in):
//   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN
// The org is on the India DC, so the .in domains are the defaults.

import crypto from 'crypto'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

const ACCOUNTS = process.env.ZOHO_ACCOUNTS_DOMAIN || 'https://accounts.zoho.in'
const API = process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'

// These reports carry someone's income, debts and insurance gaps, so the bucket
// is private and the link is signed rather than public.
const REPORT_BUCKET = 'scorecard-reports'
const SIGNED_URL_TTL = 60 * 60 * 24 * 365

// Must match the FHS_Grade picklist. An unknown value would have Zoho reject the
// whole record, so it is dropped instead — a lead without a grade beats no lead.
const GRADES = ['Excellent', 'Strong', 'Fair', 'Needs Attention', 'Needs Urgent Action']

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
}

// Access tokens last an hour; keep the current one warm so most submissions cost
// one Zoho call rather than two.
let cachedToken = null
let cachedUntil = 0

async function getAccessToken() {
  const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN } = process.env
  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    throw new Error('Zoho credentials are not configured')
  }
  if (cachedToken && Date.now() < cachedUntil) return cachedToken

  const params = new URLSearchParams({
    refresh_token: ZOHO_REFRESH_TOKEN,
    client_id: ZOHO_CLIENT_ID,
    client_secret: ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token',
  })

  const res = await fetch(`${ACCOUNTS}/oauth/v2/token?${params}`, { method: 'POST' })
  const json = await res.json()
  if (!json.access_token) {
    throw new Error(`Zoho token refresh failed: ${json.error || JSON.stringify(json)}`)
  }

  cachedToken = json.access_token
  // Expire a minute early so a token never dies mid-request.
  cachedUntil = Date.now() + ((json.expires_in || 3600) - 60) * 1000
  return cachedToken
}

// Zoho datetime fields reject the trailing Z the browser produces.
function toZohoDateTime(iso) {
  const d = iso ? new Date(iso) : new Date()
  return isNaN(d.getTime()) ? null : d.toISOString().replace('Z', '+00:00')
}

// Zoho requires Last_Name, so a single-word name becomes the last name.
function splitName(full) {
  const parts = String(full || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return { first: '', last: 'Unknown' }
  if (parts.length === 1) return { first: '', last: parts[0] }
  return { first: parts.slice(0, -1).join(' '), last: parts[parts.length - 1] }
}

async function storeReport(base64, name) {
  const buffer = Buffer.from(base64, 'base64')
  const safe = String(name || 'scorecard.pdf').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-60)
  // Random as well as timestamped, so one link never hints at another.
  const path = `reports/${Date.now()}-${crypto.randomBytes(8).toString('hex')}-${safe}`

  const { error } = await supabaseAdmin.storage
    .from(REPORT_BUCKET)
    .upload(path, buffer, { contentType: 'application/pdf', upsert: false })
  if (error) throw new Error(error.message)

  const { data, error: signError } = await supabaseAdmin.storage
    .from(REPORT_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL)
  if (signError) throw new Error(signError.message)

  return { url: data.signedUrl, buffer, fileName: safe }
}

async function attachReport(leadId, token, buffer, fileName) {
  const form = new FormData()
  form.append('file', new Blob([buffer], { type: 'application/pdf' }), fileName)

  const res = await fetch(`${API}/crm/v8/Leads/${leadId}/Attachments`, {
    method: 'POST',
    headers: { Authorization: `Zoho-oauthtoken ${token}` },
    body: form,
  })
  if (!res.ok) throw new Error(`attachment HTTP ${res.status}`)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const b = req.body || {}
  const email = String(b.email || '').trim()
  const mobile = String(b.mobile || '').replace(/\D/g, '').slice(-10)

  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'A valid email is required' })
  if (!/^[6-9]\d{9}$/.test(mobile)) return res.status(400).json({ error: 'A valid mobile number is required' })
  // The first consent covers sending the report and following up; without it
  // there is no lawful basis to store the record at all.
  if (b.service_consent !== true) return res.status(400).json({ error: 'Consent is required' })

  const { first, last } = splitName(b.full_name)
  const score = Number(b.total_score)

  try {
    // Store the report before the lead, so its link can go on the record itself.
    // A storage failure must not cost the lead.
    let report = null
    if (b.pdf_base64) {
      try {
        report = await storeReport(b.pdf_base64, b.pdf_name)
      } catch (e) {
        console.error('Scorecard report upload failed:', e.message)
      }
    }

    // Everything measured that has no field of its own, rather than a column per
    // ratio. The report link lives here too, so the record is self-contained.
    const notes = [
      b.date_of_birth ? `Date of birth: ${b.date_of_birth}` : null,
      Number.isFinite(Number(b.self_rating)) ? `Self-rating: ${b.self_rating}/100` : null,
      Number.isFinite(Number(b.confidence_gap)) ? `Confidence gap: ${b.confidence_gap} points` : null,
      b.source_url ? `Taken at: ${b.source_url}` : null,
      report ? `Report: ${report.url}` : null,
      b.top_actions ? `\nPriority actions:\n${b.top_actions}` : null,
    ].filter(Boolean).join('\n')

    const record = {
      Last_Name: last,
      Email: email,
      Mobile: mobile,
      Lead_Source: 'Financial Scorecard',
      Lead_Status: 'Not Contacted',
      Description: notes.slice(0, 32000),
      Newsletter_Consent: b.newsletter_consent === true,
      Consent_Version: b.consent_version || '',
      Consent_On: toZohoDateTime(b.consent_at),
      FHS_Taken_On: toZohoDateTime(b.submitted_on),
    }
    if (first) record.First_Name = first
    if (Number.isFinite(score)) record.Financial_Health_Score = Math.round(score)
    if (GRADES.includes(b.grade)) record.FHS_Grade = b.grade

    const token = await getAccessToken()

    // Upsert on email so retaking the scorecard refreshes the same lead's score
    // instead of leaving duplicates behind.
    const crm = await fetch(`${API}/crm/v8/Leads/upsert`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [record], duplicate_check_fields: ['Email'] }),
    })

    const json = await crm.json()
    const row = json?.data?.[0]
    if (!crm.ok || row?.status !== 'success') {
      console.error('Zoho upsert failed:', JSON.stringify(json))
      return res.status(502).json({ error: row?.message || 'Could not save the lead' })
    }

    const leadId = row.details?.id
    console.log(`Scorecard lead ${row.code === 'SUCCESS' ? 'saved' : row.code} for ${email} (${leadId}), score ${score}`)

    // The lead is already written; a failed attachment must not undo it.
    if (leadId && report) {
      try {
        await attachReport(leadId, token, report.buffer, report.fileName)
      } catch (e) {
        console.error('Scorecard PDF attachment failed:', e.message)
      }
    }

    return res.status(200).json({ ok: true, id: leadId })
  } catch (e) {
    console.error('Scorecard submission failed:', e.message)
    return res.status(500).json({ error: 'Submission failed' })
  }
}
