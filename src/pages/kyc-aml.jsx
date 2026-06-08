import Head from 'next/head'
import { ShieldCheck } from 'lucide-react'

export default function KycAml() {
  return (
    <>
      <Head>
        <title>KYC & AML Policy | Money Compound</title>
        <meta name="description" content="Money Compound's KYC, anti-money-laundering (AML) and PMLA-aligned policy framework for mutual fund distribution and related investment products." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moneycompound.com/kyc-aml" />
      </Head>

      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-brand-gold">Compliance</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-navy mb-6 leading-tight">
            KYC &amp; AML Policy
          </h1>
          <p className="text-slate-700 text-base leading-relaxed mb-12">
            This policy is framed in compliance with the Prevention of Money Laundering Act, 2002 (PMLA), the PMLA Rules, the SEBI Master Circular on AML / CFT and AMFI Best Practice Circulars. It sets out how Money Compound identifies, verifies and monitors its clients in the course of mutual fund distribution and related activities.
          </p>

          <div className="space-y-8 text-[14px] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">1. Client Identification (CIP)</h2>
              <p>Every prospective investor — Indian resident, NRI or non-individual entity — must complete a KYC verification through a SEBI-registered KRA (CAMS KRA, CVL KRA, NSE KRA, NDML KRA or KARVY KRA) before any transaction is processed. CKYC and Aadhaar-based eKYC (where permitted) are accepted.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">2. Documents collected</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Permanent Account Number (PAN) — mandatory.</li>
                <li>Proof of identity (Aadhaar / Passport / Voter ID / Driving Licence).</li>
                <li>Proof of address (utility bill, bank statement or any officially valid document).</li>
                <li>Bank proof (cancelled cheque or bank statement).</li>
                <li>For NRIs / OCIs: Passport copy, visa, overseas address proof, FATCA / CRS self-certification.</li>
                <li>For non-individuals: Constitution documents, board resolution, authorised-signatory KYC.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">3. Risk Categorisation</h2>
              <p>Every client is risk-categorised at onboarding (Low / Medium / High) based on geography, occupation, source of funds and politically-exposed-person (PEP) status. High-risk clients undergo enhanced due diligence (EDD) with documented sign-off from the Compliance Officer.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">4. Suspicious Transaction Reporting</h2>
              <p>Transactions that appear unusual in nature, amount or pattern, or that the client cannot reasonably explain, are escalated internally and where required reported to FIU-IND in accordance with Section 12 of the PMLA. Money Compound does not tip off the client in case of a Suspicious Transaction Report (STR).</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">5. Record Keeping</h2>
              <p>KYC documents and transaction records are retained for the statutory period (currently 8 years from cessation of the relationship) in secure, access-controlled systems.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">6. Training & Audit</h2>
              <p>All client-facing personnel undergo periodic AML / KYC training. Our Compliance Officer reviews adherence quarterly and the overall framework is subject to an annual independent audit.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">7. Principal Officer</h2>
              <p>Principal Officer for PMLA matters: Vipul Khandelwal, <a href="mailto:compliance@moneycompound.com" className="text-brand-gold underline">compliance@moneycompound.com</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
