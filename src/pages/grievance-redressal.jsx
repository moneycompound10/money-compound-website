import Head from 'next/head'
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react'

export default function GrievanceRedressal() {
  return (
    <>
      <Head>
        <title>Grievance Redressal | Money Compound</title>
        <meta name="description" content="How to register, escalate and track complaints with Money Compound. SCORES and Smart ODR portal references for SEBI-regulated investor grievances." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moneycompound.com/grievance-redressal" />
      </Head>

      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-brand-gold">Compliance</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-navy mb-6 leading-tight">
            Grievance Redressal Policy
          </h1>
          <p className="text-slate-700 text-base leading-relaxed mb-12">
            Money Compound is committed to the timely and fair resolution of every investor complaint. This policy outlines how you can raise a grievance with us, the escalation hierarchy, and the external regulatory mechanisms available to you under SEBI / AMFI norms.
          </p>

          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Step 1 — Designated Grievance Officer</h2>
            <ul className="space-y-3 text-[14px] text-slate-800">
              <li className="flex gap-3"><span className="font-bold w-28 flex-shrink-0">Name:</span><span>Vipul Khandelwal</span></li>
              <li className="flex gap-3"><span className="font-bold w-28 flex-shrink-0">Designation:</span><span>Grievance Officer, Money Compound</span></li>
              <li className="flex gap-3"><Mail className="w-4 h-4 text-brand-gold mt-1" /><a href="mailto:helpdesk@moneycompound.com" className="text-brand-navy underline">helpdesk@moneycompound.com</a></li>
              <li className="flex gap-3"><Phone className="w-4 h-4 text-brand-gold mt-1" /><span>+91 84474 96480 (Mon–Sat, 10:00–19:00 IST)</span></li>
              <li className="flex gap-3"><MapPin className="w-4 h-4 text-brand-gold mt-1" /><span>C-107, 1st Floor, Noida One, Sector 62, Noida, UP-201309</span></li>
            </ul>
            <p className="text-[12px] text-slate-600 mt-4">We acknowledge complaints within 1 working day and aim to resolve them within 21 working days.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Step 2 — Compliance Officer (Escalation)</h2>
            <p className="text-[14px] text-slate-700 mb-4">If you are not satisfied with the resolution at Step 1, please escalate to:</p>
            <ul className="space-y-3 text-[14px] text-slate-800">
              <li className="flex gap-3"><span className="font-bold w-28 flex-shrink-0">Name:</span><span>Vipul Khandelwal</span></li>
              <li className="flex gap-3"><Mail className="w-4 h-4 text-brand-gold mt-1" /><a href="mailto:compliance@moneycompound.com" className="text-brand-navy underline">compliance@moneycompound.com</a></li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 mb-12">
            <h2 className="text-xl font-bold text-brand-navy mb-6">Step 3 — AMFI / AMC Channels</h2>
            <p className="text-[14px] text-slate-700 leading-relaxed mb-4">
              For mutual-fund-specific grievances, you may also write directly to the relevant Asset Management Company or to AMFI:
            </p>
            <ul className="space-y-2 text-[14px] text-slate-800">
              <li>AMFI: <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline">www.amfiindia.com</a></li>
              <li>Complaint email: <a href="mailto:investorhelp@amfiindia.com" className="text-brand-gold underline">investorhelp@amfiindia.com</a></li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 mb-12">
            <h2 className="text-xl font-bold text-amber-950 mb-6">Step 4 — SEBI SCORES Portal</h2>
            <p className="text-[14px] text-amber-900 leading-relaxed mb-4">
              If your complaint is not resolved within 30 days, or if you are dissatisfied with the resolution, you can register your grievance on the SEBI SCORES portal — a free, online platform for tracking complaints with all SEBI-registered intermediaries.
            </p>
            <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-navy font-bold underline">
              scores.sebi.gov.in <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200 mb-12">
            <h2 className="text-xl font-bold text-slate-950 mb-6">Step 5 — Smart ODR (Online Dispute Resolution)</h2>
            <p className="text-[14px] text-slate-800 leading-relaxed mb-4">
              SEBI&apos;s Online Dispute Resolution (ODR) mechanism allows investors to seek mediation and arbitration of complaints against SEBI-registered intermediaries, including mutual fund distributors, through the Smart ODR Portal.
            </p>
            <a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-navy font-bold underline">
              smartodr.in <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-100 pt-8">
            Money Compound is an AMFI-registered Mutual Fund Distributor (ARN-140318). We are not a SEBI-registered Investment Adviser. For insurance grievances, please refer to the relevant IRDAI Bima Bharosa portal; for loan products, complaints rest with the underlying NBFC / bank as per the disclosure provided at the time of disbursal.
          </div>
        </div>
      </section>
    </>
  )
}
