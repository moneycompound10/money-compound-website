import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, Landmark, Briefcase, RefreshCcw, BarChart3, 
  ShieldCheck, TrendingUp, Target, Sparkles, Plus, Minus, Lock, 
  ArrowRight, Quote 
} from 'lucide-react';

// Manual SplitText implementation for characters
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

export default function UnlistedSharesPage() {
  const containerRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      // Setup Initial 3D State
      gsap.set('.perspective-stage', { perspective: 2000 });
      gsap.set('.char-reveal', { 
        rotationY: -90, 
        opacity: 0, 
        z: -20,
        transformOrigin: '50% 50% -20px'
      });
      gsap.set('.animate-up', { y: 40, opacity: 0 });
      gsap.set('.animate-scale', { scale: 1.1, opacity: 0 });

      // Entrance Sequence
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

  const offerings = [
    { icon: Rocket, color: 'text-blue-600', title: 'Pre-IPO Shares — informational', text: 'Shares in companies that may pursue an IPO at some future date. Listing timing, pricing band and listing itself are not guaranteed.' },
    { icon: Landmark, color: 'text-emerald-600', title: 'Legacy Unlisted', text: 'Shares of established unlisted names traded in the off-market. Information shared is for awareness only; valuations are opaque and can move sharply.' },
    { icon: Briefcase, color: 'text-purple-600', title: 'ESOP Liquidity', text: 'Some employees of late-stage private companies sell vested ESOPs off-market. Availability, pricing and terms vary widely.' },
    { icon: RefreshCcw, color: 'text-orange-600', title: 'Off-Market Transfer', text: 'Off-market buy/sell of unlisted shares is executed via SEBI-registered intermediaries with KYC, stamp duty and tax compliance — handled by the executing broker, not by Money Compound.' },
    { icon: BarChart3, color: 'text-rose-600', title: 'Independent Review', text: 'We share publicly available business and valuation information for general awareness. We do not provide research recommendations.' },
    { icon: Lock, color: 'text-cyan-600', title: 'Transaction-Basis Facilitation', text: 'Where a transaction does proceed, it is settled by the SEBI-registered broker/intermediary handling the off-market transfer. Money Compound facilitates the connect only.' },
  ];

  const faqs = [
    {
      q: 'Are unlisted shares legal in India?',
      a: 'Yes — buying and selling unlisted shares is fully legal. Transactions happen off-exchange through registered brokers via demat-to-demat transfer with stamp duty compliance.'
    },
    {
      q: 'What is the typical minimum ticket?',
      a: 'Tickets vary widely by counterparty — typically ₹2-5 lakh per company is common, but availability, pricing and lots are decided by the executing intermediary on a deal-by-deal basis.'
    },
    {
      q: 'What are the risks of investing in unlisted shares?',
      a: 'Significant risks include: illiquidity, pricing opacity, IPO delays, business risk, and taxation at 12.5% with no exemption. Suitable for sophisticated investors.'
    },
    {
      q: 'How are unlisted shares taxed?',
      a: 'LTCG (held 24+ months): 12.5% with indexation. STCG (under 24 months): taxed per slab rate. Unlike listed equity, there is no ₹1.25 L LTCG exemption.'
    },
    {
      q: 'When can I sell my unlisted shares?',
      a: 'Exit paths: company IPO, secondary sale to another investor (we help find buyers), or occasional company buybacks.'
    },
    {
      q: 'Will unlisted shares reflect in my demat account?',
      a: 'Yes. Once executed, shares credit to your NSDL or CDSL demat account within 2-3 working days and show in your standard statement.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Unlisted Shares — Informational Page | Money Compound</title>
        <meta name="description" content="An informational page on unlisted shares (Pre-IPO, legacy unlisted, ESOP liquidity). Unlisted shares are illiquid, high-risk, and unsuitable for most retail investors. Money Compound facilitates the connect on a transaction basis only; settlement is handled by the executing SEBI-registered intermediary." />
        <link rel="canonical" href="https://www.moneycompound.com/products/unlisted-shares" />
      </Head>

      {/* Hero Section - Pinterest Premium Style */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
                <div className="flex flex-col items-center text-center relative z-10 w-full max-w-4xl mx-auto">
            <div className="animate-up flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-slate-300" />
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Pre-IPO &amp; Private Equity</span>
              <div className="h-[2px] w-12 bg-slate-300" />
            </div>

            <h1 className="text-5xl lg:text-6xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Unlisted" className="block" />
              <SplitTextCharacters text="Shares." className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium font-['Inter'] mb-12">
               Information on unlisted shares — <span className="text-brand-gold font-bold italic">illiquid, high-risk instruments</span> that are unsuitable for most retail investors. Returns, IPO timing and exit are not guaranteed.
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
        <div className="animate-up bg-amber-50 border border-amber-200 rounded-[32px] p-8 md:p-10 flex gap-5 items-start">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div className="text-slate-800 text-[15px] leading-relaxed">
            <p className="font-bold text-slate-900 mb-2">High-risk, illiquid — please read</p>
            <p>
              Unlisted shares trade off-exchange, have no daily price discovery, and may take years to provide an exit (if at all). No specific discount-to-listing, return or IPO-timing is guaranteed by Money Compound. Off-market transactions, where executed, are settled by a SEBI-registered intermediary handling demat transfer, stamp duty and reporting. Money Compound is an AMFI-registered Mutual Fund Distributor and is not a SEBI-registered Investment Adviser, Research Analyst or stock broker — this page is informational only.
            </p>
          </div>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Unlisted Investing We Enable</h2>
          <div className="animate-up w-24 h-1.5 bg-gradient-to-r from-brand-gold to-slate-200 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((item, idx) => (
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

      {/* Core Description - Split Card */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
           <div className="animate-up">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Own Great Companies.</h2>
              <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
              <div className="space-y-12">
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Vetted Opportunities</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Money Compound curates access to select unlisted companies. Every opportunity is vetted for business quality, valuation, and exit-path to listing.
                  </p>
                </div>
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Settlement via Registered Intermediary</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Where an off-market transaction does happen, it is executed and settled by a SEBI-registered broker / intermediary, who handles KYC, stamp duty, demat transfer and reporting. Timelines and operational outcomes are governed by that intermediary.
                  </p>
                </div>
              </div>
           </div>
           
           <div className="animate-scale relative">
              <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
                 <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Private Equity" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
                 <Quote className="text-brand-gold mb-6 w-10 h-10" />
                 <p className="text-white text-lg font-medium leading-relaxed italic">
                    &quot;Curated access to India&apos;s most exciting pre-IPO firms.&quot;
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
                 <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Invest in Tomorrow.</h2>
                 <p className="text-white text-base mb-12 font-medium">
                   Speak with our team if you are evaluating an off-market unlisted shares transaction. We will walk you through the structure and connect you to the SEBI-registered intermediary handling the deal.
                 </p>
                 <a
                   href="https://vipulkhandelwal-moneycompound1.zohobookings.in/#/moneycompound2"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block w-full py-5 bg-white text-slate-950 rounded-full font-bold text-base hover:bg-brand-gold transition-all shadow-xl text-center"
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
