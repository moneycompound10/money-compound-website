import Head from 'next/head'
import { ShieldCheck } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Money Compound</title>
        <meta name="description" content="How Money Compound collects, uses, stores and protects your personal data, including DPDP Act 2023 compliance, cookie use and data principal rights." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moneycompound.com/privacy-policy" />
      </Head>

      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-brand-gold">Compliance</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-navy mb-6 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-[13px] mb-12">Effective date: 1 May 2026. This policy is issued in line with the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000 and rules thereunder.</p>

          <div className="prose prose-slate max-w-none text-[14px] leading-relaxed space-y-8">
            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">1. Who we are</h2>
              <p>Money Compound (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is an AMFI-registered Mutual Fund Distributor operating from C-107, 1st Floor, Noida One, Sector 62, Noida, UP-201309. We act as the Data Fiduciary in respect of personal data collected through this website and our onboarding workflows.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">2. Personal data we collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity & KYC:</strong> name, PAN, Aadhaar (masked), photograph, signature, date of birth, nationality.</li>
                <li><strong>Contact:</strong> email, mobile, residential address, country of residence (for NRIs).</li>
                <li><strong>Financial:</strong> bank account, demat, scheme holdings, transaction history, income, risk profile responses.</li>
                <li><strong>Technical:</strong> IP address, device identifiers, browser type, cookies, analytics events.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">3. Purposes</h2>
              <p>We process personal data only for the following specified, lawful purposes: (a) KYC, AML and onboarding under SEBI / AMFI / PMLA norms; (b) executing mutual fund and product transactions via the AMC / RTA / exchange; (c) servicing portfolio, statements and tax reports; (d) FATCA / CRS / FEMA reporting for NRI clients; (e) communication, support and product disclosures; (f) regulatory and legal compliance.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">4. Lawful basis (DPDP Act, 2023)</h2>
              <p>We process personal data on the basis of (i) your specific, informed consent, captured at the point of collection, or (ii) certain legitimate uses recognised under Section 7 of the DPDP Act (KYC, compliance, court orders, employment).</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">5. Sharing of data</h2>
              <p>We share personal data with: (a) AMCs, RTAs (CAMS / KFintech), depositories, exchanges and IRDAI / NBFC partners as required to execute the transaction you authorise; (b) auditors, regulators and law-enforcement when required by law; (c) IT infrastructure providers under strict data-protection agreements. We do not sell or rent personal data to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">6. Cookies & analytics</h2>
              <p>This website uses essential cookies and limited analytics (e.g. Google Analytics) to understand usage and improve performance. You may disable non-essential cookies from your browser settings without affecting core functionality.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">7. Retention</h2>
              <p>KYC and transaction records are retained for the period mandated under PMLA / SEBI norms (currently 8 years from the end of the business relationship). General correspondence is retained for the lower of (a) the duration of the relationship and (b) 5 years.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">8. Your rights as a Data Principal</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right to access a summary of personal data we hold.</li>
                <li>Right to correction or erasure of inaccurate or no-longer-required data (subject to statutory retention obligations).</li>
                <li>Right to grievance redressal and nomination.</li>
                <li>Right to withdraw consent at any time, without affecting prior processing.</li>
              </ul>
              <p className="mt-3">To exercise these rights, write to <a href="mailto:helpdesk@moneycompound.com" className="text-brand-gold underline">helpdesk@moneycompound.com</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">9. Security</h2>
              <p>We deploy reasonable technical and organisational safeguards — TLS in transit, encryption at rest, role-based access, periodic audits — to protect personal data from unauthorised access, alteration, disclosure or destruction.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">10. Children</h2>
              <p>Our services are not directed at children under 18. Minor accounts are operated only by guardians under SEBI / AMC norms.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">11. Updates</h2>
              <p>This policy may be updated periodically. The current version is always available at this URL with an effective date.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">12. Contact</h2>
              <p>Data Protection Officer (DPO): Vipul Khandelwal · <a href="mailto:dpo@moneycompound.com" className="text-brand-gold underline">dpo@moneycompound.com</a> · +91 84474 96480.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
