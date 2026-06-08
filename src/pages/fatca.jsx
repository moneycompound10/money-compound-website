import Head from 'next/head'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export default function Fatca() {
  return (
    <>
      <Head>
        <title>FATCA &amp; CRS Disclosure | Money Compound</title>
        <meta name="description" content="FATCA and CRS disclosure framework for NRI and resident clients onboarding with Money Compound for mutual fund and other investment products." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moneycompound.com/fatca" />
      </Head>

      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-brand-gold">Compliance</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-navy mb-6 leading-tight">
            FATCA &amp; CRS Disclosure
          </h1>
          <p className="text-slate-700 text-base leading-relaxed mb-12">
            India is a signatory to the Foreign Account Tax Compliance Act (FATCA) framework with the United States and to the Common Reporting Standard (CRS) coordinated by the OECD. As an AMFI-registered Mutual Fund Distributor, Money Compound is required to collect FATCA / CRS self-certifications from every investor and to ensure the information is captured at the AMC / RTA level for onward reporting.
          </p>

          <div className="space-y-8 text-[14px] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">1. Who must self-certify</h2>
              <p>Every investor — resident, NRI, OCI or non-individual — must provide a FATCA / CRS self-certification at the time of KYC or when there is a change in tax residency. This includes confirming country of tax residence, Tax Identification Number (TIN), country of birth and US-person status.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">2. What is reported</h2>
              <p>Where you are classified as a Reportable Person (e.g. US tax resident under FATCA, or tax resident of any CRS-participating jurisdiction other than India), the AMC / RTA reports your account balance, value and income to the Indian Income Tax Department, which in turn shares it with the relevant foreign tax authority under the intergovernmental agreement.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">3. Change in circumstances</h2>
              <p>You are required to inform us within 30 days of any change in tax residency, citizenship, address or other FATCA / CRS-relevant attributes. Failure to do so may lead to freezing of the folio or rejection of further transactions under SEBI / CBDT norms.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">4. Specific note for US / Canada NRIs</h2>
              <p>Several Indian AMCs do not currently accept investments from US and Canadian persons due to FATCA / state-securities-law constraints. We will inform you of AMCs that accept your residency at the time of onboarding and assist with the additional documentation required (e.g. W-9 / W-8BEN forms, attestations) for AMCs that do.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">5. Confidentiality</h2>
              <p>FATCA / CRS information is treated as personal data under our <Link href="/privacy-policy" className="text-brand-gold underline">Privacy Policy</Link> and shared only with the AMC / RTA / depositories and the Indian tax authority as required by law.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">6. Contact</h2>
              <p>For any FATCA / CRS query, write to <a href="mailto:compliance@moneycompound.com" className="text-brand-gold underline">compliance@moneycompound.com</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
