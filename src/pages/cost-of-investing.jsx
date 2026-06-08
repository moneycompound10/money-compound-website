import Head from 'next/head'
import { ShieldCheck } from 'lucide-react'

export default function CostOfInvesting() {
  return (
    <>
      <Head>
        <title>Cost of Investing — Regular vs Direct Plans | Money Compound</title>
        <meta name="description" content="How Money Compound earns from mutual fund distribution, the difference between Regular and Direct plans, and a transparent view of the cost you pay." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moneycompound.com/cost-of-investing" />
      </Head>

      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-brand-gold">Transparency</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-navy mb-6 leading-tight">
            Cost of Investing &amp; Regular vs Direct Plans
          </h1>
          <p className="text-slate-700 text-base leading-relaxed mb-12">
            We believe investors should clearly understand how Money Compound is paid, what costs are embedded in their mutual fund investments, and the difference between Regular and Direct plans of the same scheme. This page lays it all out.
          </p>

          <div className="space-y-8 text-[14px] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">1. How Money Compound earns</h2>
              <p>Money Compound is an AMFI-registered Mutual Fund Distributor. We <strong>do not charge you a separate advisory fee</strong>. When you invest in a mutual fund scheme through us, we receive a <strong>trail commission</strong> from the Asset Management Company (AMC) for as long as your money remains invested. This commission is built into the Total Expense Ratio (TER) of the Regular plan and is not deducted separately from your folio.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">2. Regular plan vs Direct plan</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border border-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-3 border-b border-slate-200">Attribute</th>
                      <th className="text-left p-3 border-b border-slate-200">Regular Plan</th>
                      <th className="text-left p-3 border-b border-slate-200">Direct Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">Distributor commission</td><td className="p-3 border-b border-slate-100">Embedded in TER (paid to distributor)</td><td className="p-3 border-b border-slate-100">None</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">TER (illustrative)</td><td className="p-3 border-b border-slate-100">Higher by ~0.5–1.0% p.a.</td><td className="p-3 border-b border-slate-100">Lower</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">NAV impact</td><td className="p-3 border-b border-slate-100">Slightly lower NAV growth over time</td><td className="p-3 border-b border-slate-100">Slightly higher NAV growth over time</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">Servicing</td><td className="p-3 border-b border-slate-100">Distributor / MFD handholding</td><td className="p-3 border-b border-slate-100">Self-service / RIA-led</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">If you would prefer to invest in Direct plans of the same schemes, you may do so via the AMC&apos;s website, the BSE StAR MF / NSE NMF II direct portal, or a SEBI-registered Investment Adviser (RIA). We will not earn commission in that case.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">3. What you get in return for the trail commission</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Goal-mapping and personalised SIP / lump-sum scheme suggestions.</li>
                <li>KYC, onboarding and ongoing folio servicing.</li>
                <li>Periodic written portfolio reviews; any change to your investment mix is suggested in writing and executed only with your approval.</li>
                <li>Tax-statement support and consolidated reporting.</li>
                <li>NRI-specific support: FEMA, DTAA, FATCA / CRS, repatriation.</li>
                <li>A single point of contact for queries — phone, WhatsApp and email.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">4. Other product economics</h2>
              <p><strong>Insurance:</strong> commission is paid by the IRDAI-licensed insurer as per IRDAI norms and is built into the premium. <strong>Loans:</strong> we may receive a one-time DSA fee from the lender on disbursal; this does not increase your EMI. <strong>SIF:</strong> distribution commission is governed by the SIF scheme document. <strong>PMS / AIF:</strong> Money Compound does not distribute or advise on PMS/AIF; for interested HNI clients we provide a referral to a SEBI-registered Portfolio Manager / AIF manager, who is responsible for onboarding, fees and reporting. <strong>Unlisted shares:</strong> facilitated on a transaction basis only — pricing and any spreads are between the buyer, seller and executing SEBI-registered intermediary.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">5. Commission disclosure</h2>
              <p>On request, we will share an annual statement of commission earned on your folios. Please write to <a href="mailto:helpdesk@moneycompound.com" className="text-brand-gold underline">helpdesk@moneycompound.com</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">6. No conflict-of-interest products</h2>
              <p>We do not earn entry-load, upfront commission or in-kind incentives. Our trail commission economics align our interests with yours — we are paid for as long as you stay invested, which is the same outcome any long-term investor wants.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
