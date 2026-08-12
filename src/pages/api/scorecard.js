// Receives a Financial Health Scorecard submission and forwards it to the Zoho
// Flow webhook, which creates the CRM lead.
//
// The forwarding happens here rather than in the browser on purpose: the webhook
// URL carries a zapikey, and anything the scorecard posts to directly would have
// to sit in public/ where any visitor could read it and spam the CRM. Keeping it
// in ZOHO_FLOW_WEBHOOK_URL means the key never reaches the client.
//
// Set ZOHO_FLOW_WEBHOOK_URL in .env.local for dev and in the Vercel project
// settings for production.

import crypto from 'crypto'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
}

// The report is stored rather than posted through Flow. Base64 of a ~350KB PDF
// runs to about half a million characters, which is both awkward for the webhook
// and useless on arrival: Deluge cannot rebuild a binary file from a string
// without corrupting it. A URL it can fetch with invokeurl works properly.
const REPORT_BUCKET = 'scorecard-reports'
// Private bucket, so the link is signed. These reports carry someone's income,
// debts and insurance gaps — they must not be publicly readable.
const SIGNED_URL_TTL = 60 * 60 * 24 * 365

const GRADES = ['Excellent', 'Strong', 'Fair', 'Needs Attention', 'Needs Urgent Action']

async function storeReport(base64, name, email) {
  const buffer = Buffer.from(base64, 'base64')
  const safe = String(name || 'scorecard.pdf').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-60)
  // A random segment as well as the timestamp, so one link never hints at another.
  const path = `reports/${Date.now()}-${crypto.randomBytes(8).toString('hex')}-${safe}`

  const { error } = await supabaseAdmin.storage
    .from(REPORT_BUCKET)
    .upload(path, buffer, { contentType: 'application/pdf', upsert: false })
  if (error) throw new Error(error.message)

  const { data, error: signError } = await supabaseAdmin.storage
    .from(REPORT_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL)
  if (signError) throw new Error(signError.message)

  console.log(`Scorecard report stored for ${email}: ${path}`)
  return data.signedUrl
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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const url = process.env.ZOHO_FLOW_WEBHOOK_URL
  if (!url) {
    console.error('ZOHO_FLOW_WEBHOOK_URL is not set')
    return res.status(500).json({ error: 'Lead capture is not configured' })
  }

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

  // Everything measured that has no CRM field of its own, so Flow can drop it
  // straight into Description rather than needing a column per ratio.
  const notes = [
    b.date_of_birth ? `Date of birth: ${b.date_of_birth}` : null,
    Number.isFinite(Number(b.self_rating)) ? `Self-rating: ${b.self_rating}/100` : null,
    Number.isFinite(Number(b.confidence_gap)) ? `Confidence gap: ${b.confidence_gap} points` : null,
    b.source_url ? `Taken at: ${b.source_url}` : null,
    b.top_actions ? `\nPriority actions:\n${b.top_actions}` : null,
  ].filter(Boolean).join('\n')

  // Pre-split and normalised so the Flow mapping is a straight field-to-field
  // match against the CRM layout.
  const payload = {
    ...b,
    first_name: first,
    last_name: last,
    email,
    mobile,
    lead_source: 'Financial Scorecard',
    description: notes.slice(0, 32000),
    total_score: Number.isFinite(score) ? Math.round(score) : null,
    grade: GRADES.includes(b.grade) ? b.grade : null,
    submitted_on: toZohoDateTime(b.submitted_on),
    consent_at: toZohoDateTime(b.consent_at),
    newsletter_consent: b.newsletter_consent === true,
  }

  // Store the report and hand Flow a link instead of the bytes. A failure here
  // must not cost the lead, so it degrades to a submission without a report.
  payload.pdf_url = ''
  if (b.pdf_base64) {
    try {
      payload.pdf_url = await storeReport(b.pdf_base64, b.pdf_name, email)
    } catch (e) {
      console.error('Scorecard report upload failed:', e.message)
    }
  }
  delete payload.pdf_base64

  try {
    const flow = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!flow.ok) {
      const detail = await flow.text().catch(() => '')
      console.error(`Zoho Flow returned HTTP ${flow.status}: ${detail.slice(0, 500)}`)
      return res.status(502).json({ error: 'Could not reach the CRM' })
    }

    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('Scorecard submission failed:', e.message)
    return res.status(500).json({ error: 'Submission failed' })
  }
}
