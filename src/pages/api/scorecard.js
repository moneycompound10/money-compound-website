// Receives a Financial Health Scorecard submission and hands it to the Zoho CRM
// function that files the lead.
//
// The forwarding happens here rather than in the browser on purpose: the
// function's REST URL carries a zapikey, and the scorecard is served from
// public/, so posting to it directly would have published the key to every
// visitor and let anyone fill the CRM with junk. It stays in ZOHO_FUNCTION_URL.
//
// Zoho Flow sat here before and was replaced because it failed silently — it
// answered 200 to every submission while creating nothing, so a visitor saw
// "Sent" and the lead vanished.

import crypto from 'crypto'
import { supabaseAdmin } from '../../lib/supabaseAdmin'

// These reports carry someone's income, debts and insurance gaps, so the bucket
// is private and the link is signed rather than public.
const REPORT_BUCKET = 'scorecard-reports'
const SIGNED_URL_TTL = 60 * 60 * 24 * 365

// Must match the FHS_Grade picklist. An unknown value would have Zoho save the
// field blank, so it is dropped instead.
const GRADES = ['Excellent', 'Strong', 'Fair', 'Needs Attention', 'Needs Urgent Action']

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
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

  return data.signedUrl
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // ZOHO_FLOW_WEBHOOK_URL is the older name and is still read, so an existing
  // Vercel variable keeps working if it was pointed at the function instead.
  const url = process.env.ZOHO_FUNCTION_URL || process.env.ZOHO_FLOW_WEBHOOK_URL
  if (!url) {
    console.error('ZOHO_FUNCTION_URL is not set')
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

  // Store the report and pass a link rather than half a megabyte of base64.
  // Deluge cannot rebuild a binary file from a string, but it can fetch a URL.
  // A storage failure must not cost the lead.
  let pdfUrl = ''
  if (b.pdf_base64) {
    try {
      pdfUrl = await storeReport(b.pdf_base64, b.pdf_name)
    } catch (e) {
      console.error('Scorecard report upload failed:', e.message)
    }
  }

  // Everything measured that has no CRM field of its own, so the function can
  // drop it straight into Description rather than needing a column per ratio.
  const notes = [
    b.date_of_birth ? `Date of birth: ${b.date_of_birth}` : null,
    Number.isFinite(Number(b.self_rating)) ? `Self-rating: ${b.self_rating}/100` : null,
    Number.isFinite(Number(b.confidence_gap)) ? `Confidence gap: ${b.confidence_gap} points` : null,
    b.source_url ? `Taken at: ${b.source_url}` : null,
    pdfUrl ? `Report: ${pdfUrl}` : null,
    b.top_actions ? `\nPriority actions:\n${b.top_actions}` : null,
  ].filter(Boolean).join('\n')

  // Pre-split and normalised so the function maps straight onto the CRM layout.
  const payload = {
    ...b,
    first_name: first,
    last_name: last,
    email,
    mobile,
    lead_source: 'Financial Scorecard',
    lead_status: 'Not Contacted',
    description: notes.slice(0, 32000),
    total_score: Number.isFinite(score) ? Math.round(score) : null,
    grade: GRADES.includes(b.grade) ? b.grade : null,
    submitted_on: toZohoDateTime(b.submitted_on),
    consent_at: toZohoDateTime(b.consent_at),
    newsletter_consent: b.newsletter_consent === true,
    pdf_url: pdfUrl,
  }
  delete payload.pdf_base64

  try {
    const zoho = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const text = await zoho.text()
    if (!zoho.ok) {
      console.error(`Zoho function returned HTTP ${zoho.status}: ${text.slice(0, 500)}`)
      return res.status(502).json({ error: 'Could not save the lead' })
    }

    // The function answers 200 even when its own code raises, so the body is
    // logged — a silent failure here is how leads disappear unnoticed.
    console.log(`Scorecard submitted for ${email}, score ${score}. Zoho said: ${text.slice(0, 300)}`)
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('Scorecard submission failed:', e.message)
    return res.status(500).json({ error: 'Submission failed' })
  }
}
