import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Layers, BookOpen,
  Sparkles, Plus, Minus, UserCheck, ArrowRight, Quote, CheckCircle2, AlertTriangle, LineChart
} from 'lucide-react';

const SplitTextCharacters = ({ text, className }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char-reveal inline-block whitespace-pre"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default function StockMarketPage() {
  const containerRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      gsap.set('.perspective-stage', { perspective: 2000 });
      gsap.set('.char-reveal', {
        rotationY: -90,
        opacity: 0,
        z: -20,
        transformOrigin: '50% 50% -20px'
      });
      gsap.set('.animate-up', { y: 40, opacity: 0 });
      gsap.set('.animate-scale', { scale: 1.1, opacity: 0 });

      tl.to('.char-reveal', {
        rotationY: 0,
        opacity: 1,
        z: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(1.4)'
      }, "-=1.2")
      .to('.animate-up', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1
      }, "-=0.5")
      .to('.animate-scale', {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out'
      }, "-=1");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const solutions = [
    { title: "Demat & Broker Setup", icon: UserCheck, color: "text-rose-600", text: "Full assistance with demat / trading account opening, bank linking and KYC, onboarding with our SEBI-registered stock broker partner. Account terms and execution are governed by the broker." },
    { title: "Equity Mutual Funds & ETFs", icon: LineChart, color: "text-blue-600", text: "For diversified equity exposure, AMFI-registered equity mutual funds and exchange-traded funds (ETFs), distributed under ARN-140318." },
    { title: "SIP-based Investing", icon: Layers, color: "text-orange-600", text: "Disciplined monthly SIPs into equity mutual fund schemes for long-term investing — no market timing required." },
    { title: "ELSS for Tax Saving", icon: ShieldCheck, color: "text-emerald-600", text: "Equity Linked Savings Schemes (ELSS) qualifying under Section 80C, with a 3-year lock-in. Distributed as part of regular mutual fund services." },
    { title: "Investor Education", icon: BookOpen, color: "text-cyan-600", text: "Free guides, webinars and handbooks covering how Indian equity markets, indices, taxation and SIPs work." }
  ];

  const faqs = [
    {
      q: "Does Money Compound give stock tips or recommendations?",
      a: "No. Money Compound is an AMFI-registered Mutual Fund Distributor (ARN-140318), not a SEBI-registered Investment Adviser, Research Analyst or stock broker. We do not provide stock tips, buy/sell calls, model portfolios, target prices or IPO recommendations. We help with demat account onboarding and investor education only."
    },
    {
      q: "How do I get started in the stock market?",
      a: "The first step is opening a demat and trading account — we can facilitate this with our SEBI-registered stock broker partner, including KYC, bank linking and onboarding. For diversified equity exposure with less effort, you can also invest through equity mutual funds and ETFs via SIPs."
    },
    {
      q: "Stock market vs mutual funds — which suits me?",
      a: "Both can build long-term wealth. Direct stocks require time, knowledge and active tracking, while mutual funds offer diversification and professional management with less effort. Money Compound does not recommend specific stocks; for equity exposure we suggest AMFI-registered mutual funds and ETFs, and we can help you open a demat account if you wish to invest in stocks directly."
    },
    {
      q: "How are stock gains taxed?",
      a: "For listed equity: Long-Term Capital Gains (held 12+ months) are taxed at 12.5% on gains above ₹1.25 lakh per financial year. Short-Term Capital Gains (held under 12 months) are taxed at 20%. Dividends are taxed at your slab rate. Tax rules can change — please confirm current rules with your CA before transacting."
    },
    {
      q: "Do you offer intraday or F&O trading tips?",
      a: "No. We do not offer intraday calls, F&O, options, futures, derivatives or any short-term trading recommendations. Our focus is long-term, need-aligned investing through AMFI-registered mutual fund schemes and ETFs."
    },
    {
      q: "Can NRIs open a demat account through you?",
      a: "Yes. NRIs can invest in Indian equities through a PIS (Portfolio Investment Scheme) or non-PIS demat account linked to an NRE/NRO bank account. We can assist with broker onboarding, subject to FEMA and RBI regulations. Account terms and execution are governed by the broker."
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Stock Market Access — Demat Onboarding & Equity Investing | Money Compound</title>
        <meta name="description" content="Open a demat account via our SEBI-registered stock broker partner, get diversified equity exposure through AMFI-registered mutual funds and ETFs, and learn how markets work. Money Compound does not give stock tips, model portfolios or IPO calls." />
        <link rel="canonical" href="https://moneycompound.com/products/stock-market" />
      </Head>

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

                <div className="flex flex-col items-center text-center relative z-10 w-full max-w-4xl mx-auto">
            <div className="animate-up flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-slate-300" />
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Stock Market Access</span>
              <div className="h-[2px] w-12 bg-slate-300" />
            </div>

            <h1 className="text-5xl lg:text-6xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Stock" className="block" />
              <SplitTextCharacters text="Market" className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium font-['Inter'] mb-12">
              Get started in the stock market the right way — <span className="text-brand-gold font-bold italic">demat &amp; trading account onboarding</span> via our SEBI-registered broker partner, plus investor education and diversified exposure through mutual funds and ETFs.
            </p>

            <div className="animate-up flex flex-wrap gap-6 justify-center">
              <Link href="/contact-us" className="px-10 py-5 bg-brand-navy text-white rounded-full font-bold text-[13px] hover:bg-brand-gold transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest">
                Speak To Us <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
        </div>
      </section>

      {/* Disclosure */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mb-24">
        <div className="animate-up bg-amber-100 border-2 border-amber-400 shadow-lg rounded-[32px] p-8 md:p-10 flex gap-5 items-start">
          <div className="w-12 h-12 rounded-2xl bg-amber-300 flex items-center justify-center text-amber-900 flex-shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div className="text-slate-900 text-[15px] leading-relaxed">
            <p className="font-bold text-slate-950 mb-2">No stock tips, no buy/sell calls, no F&amp;O</p>
            <p>
              Money Compound is an AMFI-registered Mutual Fund Distributor (ARN-140318). We are <strong>not</strong> a SEBI-registered Investment Adviser, Research Analyst or stock broker. We do not give stock tips, buy/sell calls, target prices, intraday calls, F&amp;O / options recommendations or short-term trading strategies. For equity exposure, we suggest AMFI-registered equity mutual funds and ETFs. Demat onboarding, where applicable, is facilitated through a SEBI-registered stock broker partner — brokerage and execution terms are governed by that broker.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Stock Market Solutions</h2>
          <div className="animate-up w-24 h-1.5 bg-gradient-to-r from-brand-gold to-slate-200 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((item, idx) => (
            <div key={idx} className="animate-scale group bg-white p-8 rounded-[40px] border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:bg-slate-100 transition-colors" />
              <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${item.color} mb-8 group-hover:scale-110 transition-transform`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display'] group-hover:text-brand-gold transition-colors">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium font-['Inter']">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Narrative */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
           <div className="animate-up">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Built for the Long Term.</h2>
              <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
              <div className="space-y-12">
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Access Made Simple</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    We help you open a demat and trading account with our SEBI-registered stock broker partner, and explain how equity markets, SIPs and taxation work — so you can invest with confidence. Account terms, brokerage and execution are governed by the broker.
                  </p>
                </div>
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Education, Not Tips</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Money Compound does not provide stock tips, buy/sell calls, model portfolios, target prices or IPO recommendations. For equity exposure we suggest AMFI-registered mutual funds and ETFs, ideally through disciplined SIPs.
                  </p>
                </div>
                <div className="animate-up">
                   <div className="space-y-6">
                      {[
                        "Demat & trading account onboarding via SEBI-registered partner broker",
                        "Equity mutual funds and ETFs for diversified exposure",
                        "Disciplined monthly SIPs — no market timing",
                        "Free investor education and handbooks"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-slate-950 font-bold">
                           <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-brand-gold"><CheckCircle2 size={20} /></div>
                           {item}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
           </div>

           <div className="animate-scale relative">
              <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
                 <img src="https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Investor reviewing mutual fund SIP statement" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
                 <Quote className="text-brand-gold mb-6 w-10 h-10" />
                 <p className="text-white text-lg font-medium leading-relaxed italic">
                    &quot;Time in the market beats timing the market.&quot;
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ & CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
           <div>
              <h2 className="animate-up text-3xl font-black text-slate-950 mb-12 font-['Playfair_Display']">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={`animate-up overflow-hidden transition-all duration-500 rounded-[30px] border ${isOpen ? 'bg-slate-50 border-brand-gold/20' : 'bg-white border-slate-100'}`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-8 flex items-center justify-between text-left"
                      >
                        <span className={`text-lg font-bold ${isOpen ? 'text-slate-950' : 'text-slate-700'} font-['Playfair_Display']`}>{faq.q}</span>
                        {isOpen ? <Minus className="text-brand-gold" /> : <Plus className="text-slate-300" />}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-8 pb-8"
                          >
                            <p className="text-slate-600 leading-relaxed font-medium">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
           </div>

           <div className="animate-scale sticky top-32">
              <div className="bg-slate-950 rounded-[60px] p-16 text-center shadow-premium relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent pointer-events-none" />
                 <Sparkles className="text-brand-gold mx-auto mb-8 w-12 h-12" />
                 <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Start with a Plan.</h2>
                 <p className="text-white text-base mb-12 font-medium">
                    Get started the simple way — demat onboarding via our SEBI-registered partner broker and diversified exposure through mutual fund SIPs.
                 </p>
                 <a
                   href="https://vipulkhandelwal-moneycompound1.zohobookings.in/#/moneycompound2"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block w-full py-5 bg-white text-slate-950 rounded-full font-bold text-base hover:bg-brand-gold transition-all shadow-xl uppercase tracking-widest text-[13px] text-center"
                 >
                   Book Free Consultation
                 </a>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
