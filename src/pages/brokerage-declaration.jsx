import Head from 'next/head'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export default function BrokerageDeclaration() {
  return (
    <>
      <Head>
        <title>Brokerage Declaration | Money Compound</title>
        <meta name="description" content="Indicative trail brokerage / commission ranges earned by Money Compound from AMCs across mutual fund scheme categories, disclosed for transparency." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.moneycompound.com/brokerage-declaration" />
      </Head>

      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-brand-gold">Compliance</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-navy mb-6 leading-tight">
            Brokerage Declaration
          </h1>
          <p className="text-slate-700 text-base leading-relaxed mb-12">
            As an AMFI-registered Mutual Fund Distributor, Money Compound earns trail commission from Asset Management Companies (AMCs) on the mutual fund schemes that our clients hold through us. The indicative range of trail commission (per annum) across scheme categories is disclosed below. Actual commission may vary across AMCs and schemes within the same category.
          </p>

          <div className="space-y-8 text-[14px] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">1. Indicative trail commission across scheme categories</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border border-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-3 border-b border-slate-200">Scheme Type</th>
                      <th className="text-left p-3 border-b border-slate-200">Trail&nbsp;-&nbsp;1st Year onwards</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">Liquid / Ultra Short Term Schemes</td><td className="p-3 border-b border-slate-100">0.05% – 0.70%</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">Short-Term Income Funds</td><td className="p-3 border-b border-slate-100">0.50% – 0.90%</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">Income Funds</td><td className="p-3 border-b border-slate-100">0.40% – 1.00%</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">Gilt Funds</td><td className="p-3 border-b border-slate-100">0.15% – 0.90%</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">Hybrid Debt / Monthly Income Plans</td><td className="p-3 border-b border-slate-100">0.90% – 1.20%</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">Arbitrage Funds</td><td className="p-3 border-b border-slate-100">0.55% – 0.70%</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">Fund of Funds</td><td className="p-3 border-b border-slate-100">0.25% – 0.50%</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">ELSS</td><td className="p-3 border-b border-slate-100">0.65% – 1.00%</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">Index Funds</td><td className="p-3 border-b border-slate-100">0.30% – 1.00%</td></tr>
                    <tr><td className="p-3 border-b border-slate-100 font-bold">Equity / Hybrid Equity / Balance Funds</td><td className="p-3 border-b border-slate-100">0.10% – 1.40%</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">The figures above are indicative ranges of trail commission paid by AMCs to distributors and are embedded in the Total Expense Ratio (TER) of the Regular plan of the respective scheme. No amount is deducted separately from your folio.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">2. Regular vs Direct plans</h2>
              <p>Direct plans of the same scheme do not include distributor commission and therefore carry a lower TER. Refer to our <Link href="/cost-of-investing" className="text-brand-gold underline">Cost of Investing</Link> page for a side-by-side comparison and the rationale for choosing one over the other.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-navy mb-3">3. Commission disclosure on request</h2>
              <p>On request, we will share an annual statement of commission earned on your folios. Please write to <a href="mailto:helpdesk@moneycompound.com" className="text-brand-gold underline">helpdesk@moneycompound.com</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
