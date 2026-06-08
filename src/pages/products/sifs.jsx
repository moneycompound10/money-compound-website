import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, ShieldCheck, TrendingUp, BarChart3, Briefcase,
  CheckCircle, Layers, Globe, Sparkles, Plus, Minus, Zap, ArrowRight, Quote 
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

export default function SIFPage() {
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

  const features = [
    { icon: Target, color: 'text-blue-600', title: 'Minimum ₹10 Lakh', text: 'Accessible entry point — between mutual funds (₹500 min) and PMS (₹50 L min).' },
    { icon: Layers, color: 'text-emerald-600', title: 'Strategy Flexibility', text: 'Long-short equity, concentrated portfolios, derivatives overlay — beyond plain MF mandates.' },
    { icon: ShieldCheck, color: 'text-purple-600', title: 'SEBI Regulated', text: 'Full SEBI oversight like mutual funds — daily NAV, mark-to-market, strict governance.' },
    { icon: BarChart3, color: 'text-orange-600', title: 'Institutional Strategies', text: 'Access to strategies previously available only to institutions and UHNIs.' },
    { icon: Briefcase, color: 'text-rose-600', title: 'Lower Fees Than PMS', text: 'Typically more cost-efficient than equivalent PMS strategies, with no separate performance fees.' },
    { icon: CheckCircle, color: 'text-cyan-600', title: 'Tax-Efficient Structure', text: 'Pass-through taxation and MF-like capital gains treatment.' },
  ];

  const faqs = [
    {
      q: 'What exactly is an SIF?',
      a: 'A Specialized Investment Fund is a new SEBI-regulated category between mutual funds and PMS. SIFs can use advanced strategies (concentrated portfolios, hedging, long-short) that are restricted for regular mutual funds.'
    },
    {
      q: 'How are SIFs different from PMS?',
      a: 'PMS: minimum ₹50 L, stocks held in your demat, performance fees common. SIF: minimum ₹10 L, pooled structure like MFs, daily NAV, lower fees. PMS gives more personalization, SIFs offer more accessibility.'
    },
    {
      q: 'Who should invest in SIFs?',
      a: 'SIFs suit investors who: have at least ₹10 L, understand equity market risks, want access to advanced strategies, and have a 3+ year horizon.'
    },
    {
      q: 'What is the taxation of SIFs?',
      a: 'SIFs enjoy mutual fund-like taxation. Equity-oriented SIFs: LTCG at 12.5% (above ₹1.25 L), STCG at 20%. Debt-oriented: taxed per slab.'
    },
    {
      q: 'Can I exit my SIF investment anytime?',
      a: 'Most SIFs have daily or weekly liquidity. Some specialized strategies may have lock-ins or exit loads, disclosed in the Scheme Information Document.'
    },
    {
      q: 'Are SIFs safe?',
      a: 'SIFs are SEBI-regulated with strong governance and transparent disclosures — safer than unregulated alternatives. However, like all market-linked products, capital is at risk.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Specialised Investment Funds (SIF) Distribution | Money Compound</title>
        <meta name="description" content="Specialised Investment Funds (SIF) distribution under SEBI's Feb 2025 circular. Money Compound is registered to distribute SIF schemes under ARN-140318. SIF investments are subject to market risk; please read scheme documents carefully." />
        <link rel="canonical" href="https://www.moneycompound.com/products/sifs" />
        <meta property="og:title" content="SIF Distribution — Money Compound" />
        <meta property="og:url" content="https://www.moneycompound.com/products/sifs" />
        <meta property="og:image" content="https://www.moneycompound.com/og-cover.jpg" />
      </Head>

      {/* Hero Section - Pinterest Premium Style */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
                <div className="flex flex-col items-center text-center relative z-10 w-full max-w-4xl mx-auto">
            <div className="animate-up flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-slate-300" />
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">SEBI&apos;s Newest Investment Category</span>
              <div className="h-[2px] w-12 bg-slate-300" />
            </div>

            <h1 className="text-5xl lg:text-6xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="SIF" className="block" />
              <SplitTextCharacters text="Investing." className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium font-['Inter'] mb-12">
               A new SEBI-regulated structure that bridges the gap between Mutual Funds and PMS, providing <span className="text-brand-gold font-bold italic">sophisticated, flexible strategies</span>.
            </p>

            <div className="animate-up flex flex-wrap gap-6 justify-center">
              <Link href="/contact-us" className="px-10 py-5 bg-brand-navy text-white rounded-full font-bold text-[13px] hover:bg-brand-gold transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest">
                Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
        </div>
      </section>

      {/* Why SIFs Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Why Consider SIFs</h2>
          <div className="animate-up w-24 h-1.5 bg-gradient-to-r from-brand-gold to-slate-200 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
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
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Beyond Plain-Vanilla Funds.</h2>
              <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
              <div className="space-y-12">
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Strategy Flexibility</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    SIFs bridge the gap between mutual funds and PMS — offering advanced strategies with the regulatory framework of mutual funds. Designed for sophisticated investors.
                  </p>
                </div>
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Structured Access</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Money Compound provides structured access to the top SIFs from leading AMCs, with end-to-end onboarding and ongoing research support.
                  </p>
                </div>
              </div>
           </div>
           
           <div className="animate-scale relative">
              <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
                 <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="SIF Strategy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
                 <Quote className="text-brand-gold mb-6 w-10 h-10" />
                 <p className="text-white text-lg font-medium leading-relaxed italic">
                    &quot;Sophisticated investment strategies with institutional protection.&quot;
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
                 <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Bridge the Gap.</h2>
                 <p className="text-white text-base mb-12 font-medium">
                   SIFs open access to advanced SEBI-regulated investment strategies with daily liquidity and complete transparency.
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
