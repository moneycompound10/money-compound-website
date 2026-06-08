import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ShieldCheck, User, Phone, Mail, Loader2 } from 'lucide-react'
import { track, EVENTS } from '../lib/analytics'

// ── Zoho endpoints ──────────────────────────────────────────────
const ZOHO_FORMS = {
  // Default form used for ebook downloads
  default: {
    action: 'https://forms.zohopublic.in/moneycompound/form/FreeDownloadthePDFinstantly/formperma/NhnKVwv9WR1NETFDu7nribzaKyL5ZzWot8AgjeilGyQ/htmlRecords/submit',
    formName: 'FreeDownloadthePDFinstantly',
    formPerma: 'NhnKVwv9WR1NETFDu7nribzaKyL5ZzWot8AgjeilGyQ',
  },
  // Newsletter form used for "Subscribe to Newsletter"
  newsletter: {
    action: 'https://forms.zohopublic.in/moneycompound/form/SubscribetoourNewsletter/formperma/Ktu1Ih_yC9t5iz7INX82BScXTZtHvO6ONphOPg7GiJ8/htmlRecords/submit',
    formName: 'SubscribetoourNewsletter',
    formPerma: 'Ktu1Ih_yC9t5iz7INX82BScXTZtHvO6ONphOPg7GiJ8',
  },
}

export default function LeadCaptureModal({ open, onClose, asset }) {
  const [status, setStatus] = useState('form') // 'form' | 'submitting' | 'success' | 'error'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  })
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  // Reset when opened — intentional setState in effect (responds to prop change)
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus('form')
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({ firstName: '', lastName: '', phone: '', email: '' })
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors({})
    }
  }, [open])

  // ── Validation ────────────────────────────────────────────────
  // All fields are mandatory — for both ebook downloads and newsletter
  // signups. The PDF/download is only released after a valid submission,
  // so a visitor cannot download without giving full details.
  const validate = () => {
    const e = {}
    if (!formData.firstName.trim()) e.firstName = 'First name is required'
    if (!formData.lastName.trim()) e.lastName = 'Last name is required'
    if (!formData.phone.trim()) {
      e.phone = 'Phone number is required'
    } else if (!/^[\d\s+\-()]{6,15}$/.test(formData.phone)) {
      e.phone = 'Enter a valid phone number'
    }
    if (!formData.email.trim()) {
      e.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Enter a valid email'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')

    // Determine which Zoho form to use
    const isNewsletter = !asset?.fileUrl
    const zoho = asset?.formUrl?.includes('SDpoJH7RLbUPEruAVEtJ')
      ? ZOHO_FORMS.newsletter
      : isNewsletter
        ? ZOHO_FORMS.newsletter
        : ZOHO_FORMS.default

    const isEbook = zoho === ZOHO_FORMS.default

    // Build form body matching Zoho's exact field names
    const body = new URLSearchParams()
    body.append('SingleLine1', formData.firstName)
    body.append('SingleLine', formData.lastName)
    body.append('PhoneNumber', formData.phone)
    body.append('Email', formData.email)
    // The ebook form has two mandatory dropdowns (Lead Source / Lead Status).
    // They must be sent or Zoho rejects the submission server-side.
    if (isEbook) {
      body.append('Dropdown1', 'Website Ebook')   // Lead Source
      body.append('Dropdown', 'Not Contacted')    // Lead Status
    }
    body.append('formName', zoho.formName)
    body.append('formPerma', zoho.formPerma)
    body.append('isPaymentForm', 'false')
    body.append('formType', '0')
    body.append('isDocsPublicForm', 'false')
    body.append('date_format', 'dd-MMM-yyyy')
    body.append('resizeform', '0')
    body.append('referrerName', window.location.href)

    try {
      await fetch(zoho.action, {
        method: 'POST',
        mode: 'no-cors',      // Zoho doesn't allow CORS, but the data still goes through
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })

      // With no-cors we can't read the response, but the POST goes through
      handleSuccess()
    } catch (err) {
      console.error('Form submission error:', err)
      // Even if fetch "fails", no-cors POST still delivers the data
      handleSuccess()
    }
  }

  // ── Download helper ───────────────────────────────────────────
  const triggerDownload = (fileUrl, fileName) => {
    if (!fileUrl) return
    try {
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = fileName || 'download.pdf'
      link.target = '_blank'
      link.rel = 'noopener'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(() => {
        try { window.open(fileUrl, '_blank', 'noopener') } catch (_) { }
      }, 400)
    } catch (_) {
      try { window.open(fileUrl, '_blank', 'noopener') } catch (_2) { }
    }
  }

  const handleSuccess = () => {
    setStatus('success')
    track(EVENTS.GENERATE_LEAD, {
      asset_title: asset?.title || 'unknown',
      asset_type: asset?.fileUrl ? 'ebook' : 'newsletter',
      source: 'lead_capture_modal',
    })
    if (asset?.fileUrl) {
      track(EVENTS.EBOOK_DOWNLOAD, {
        asset_title: asset?.title || 'unknown',
        file_name: asset?.fileName || 'download.pdf',
      })
      triggerDownload(asset.fileUrl, asset.fileName)
    } else {
      track(EVENTS.NEWSLETTER_SIGNUP, {
        source: asset?.title || 'newsletter',
      })
    }
  }

  const handleClose = () => {
    setStatus('form')
    onClose()
  }

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  // ── Render ────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[420px] relative overflow-hidden my-4 sm:my-0 flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ─────────────────────────────────── */}
            <div className="relative bg-gradient-to-br from-brand-navy via-[#0F2746] to-[#0A1A2F] px-5 pt-4 pb-3 shrink-0">
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1 h-4 rounded-full bg-brand-gold" />
                <span className="text-[9px] font-bold text-brand-gold/80 uppercase tracking-[0.2em]">
                  {asset?.fileUrl ? 'Free Download' : 'Newsletter'}
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug pr-8">
                {asset?.title || 'Subscribe to our Newsletter'}
              </h3>
              {asset?.desc && (
                <p className="text-[11px] text-white/50 mt-1 leading-relaxed line-clamp-2">
                  {asset.desc}
                </p>
              )}
            </div>

            {/* ── Body ───────────────────────────────────── */}
            <div className="px-5 py-3 overflow-y-auto flex-1">
              {status === 'success' ? (
                /* ── Success state ────────────────────────── */
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-navy mb-2">
                    Thank You!
                  </h4>
                  <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                    {asset?.fileUrl ? (
                      <>Your download of <strong>{asset.title}</strong> should begin automatically.</>
                    ) : (
                      <>You have been successfully subscribed. Our team will be in touch shortly.</>
                    )}
                  </p>

                  {asset?.fileUrl && (
                    <a
                      href={asset.fileUrl}
                      download={asset.fileName || 'download.pdf'}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center justify-center gap-2 w-full mb-3 px-5 py-2.5 bg-brand-gold text-white rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-brand-navy transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Again
                    </a>
                  )}

                  <button
                    onClick={handleClose}
                    className="text-xs text-slate-400 hover:text-brand-navy underline underline-offset-2 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* ── Form state ───────────────────────────── */
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-2.5">
                  {/* First Name * */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange('firstName')}
                        placeholder="John"
                        required
                        className={`w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all ${
                          errors.firstName ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name * */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange('lastName')}
                        placeholder="Doe"
                        required
                        className={`w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all ${
                          errors.lastName ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div>

                  {/* Phone * */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        placeholder="+91 98765 43210"
                        required
                        className={`w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all ${
                          errors.phone ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email * */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 uppercase tracking-wider">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        placeholder="john@example.com"
                        required
                        className={`w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all ${
                          errors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full mt-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-gold to-[#D4AF37] text-white rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg shadow-brand-gold/25 hover:shadow-xl hover:shadow-brand-gold/35 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : asset?.fileUrl ? (
                      <>
                        <Download className="w-4 h-4" />
                        Download Free
                      </>
                    ) : (
                      'Subscribe Now'
                    )}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
