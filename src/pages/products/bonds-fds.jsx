import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark, ShieldCheck, Percent, Users, CreditCard,
  Award, TrendingUp, Sparkles, Plus, Minus, Star, Coins, ArrowRight, Quote
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

export default function BondsPage() {
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

  const products = [
    { icon: Landmark, color: 'text-blue-600', title: 'Government Bonds (G-Sec)', text: 'Sovereign-backed. Zero credit risk. Available via RBI Retail Direct and select brokers.' },
    { icon: Star, color: 'text-emerald-600', title: 'Tax-Free Bonds', text: 'NHAI, REC, IRFC, PFC — interest fully tax-free. Best for high tax-bracket investors.' },
    { icon: TrendingUp, color: 'text-purple-600', title: 'Corporate FDs', text: 'Highly-rated corporate fixed deposits, which have historically offered interest rates higher than comparable-tenure bank FDs (typical spread of around 1-2% based on current market data — actual rates vary by issuer and tenure). Unlike bank FDs, corporate FDs are not covered by DICGC insurance.' },
    { icon: Users, color: 'text-orange-600', title: 'SCSS', text: 'Senior Citizen Savings Scheme — govt-backed, ₹30 L limit, tax benefit on interest up to ₹50,000.' },
    { icon: CreditCard, color: 'text-rose-600', title: 'RBI Floating Rate Bonds', text: 'Govt-backed, semi-annual interest, linked to NSC rate — suitable for retirees seeking income.' },
    { icon: Coins, color: 'text-amber-600', title: 'Sovereign Gold Bonds (SGB)', text: 'Gold exposure with 2.5% annual interest, capital gains exempt on maturity if held full 8 years.' },
  ];

  const faqs = [
    {
      q: 'Are corporate FDs safer than bank FDs?',
      a: 'Bank FDs up to ₹5 lakh are insured under DICGC. Corporate FDs are not insured — safety depends entirely on the issuer\'s credit rating (AAA-rated FDs have historically very low default). In return, corporate FDs typically offer 1-2% higher interest.'
    },
    {
      q: 'Are tax-free bonds still available?',
      a: 'Fresh tax-free bond issuances have been paused, but existing bonds trade in the secondary market. Yields on AAA tax-free bonds are attractive for 30% tax bracket investors — effective pre-tax yield of 8-9%.'
    },
    {
      q: 'What is the best fixed-income allocation for a retiree?',
      a: 'A typical split: SCSS (up to ₹30 L), tax-free bonds for efficiency, AAA corporate FDs for yield pickup, RBI Floating Rate Bonds for safety, and short-term debt funds for liquidity.'
    },
    {
      q: 'Are Sovereign Gold Bonds better than physical gold?',
      a: 'Yes, for investment: SGBs earn 2.5% annual interest, have no storage risk, and capital gains are tax-exempt if held till maturity (8 years).'
    },
    {
      q: 'Can I invest in government bonds directly?',
      a: 'Yes — through RBI Retail Direct platform (zero fees) or brokers. Minimum ticket is ₹10,000 with tenors ranging from 91-day T-bills to 40-year government bonds.'
    },
    {
      q: 'How are fixed-income returns taxed?',
      a: 'FD/Corporate FD interest: taxable per slab. Tax-free bond interest: exempt. Debt fund gains: taxable per slab. SGB interest: taxable, but maturity gains are tax-free.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Bonds, FDs & Fixed Income — for the Lower-Risk Part of Your Portfolio | Money Compound</title>
        <meta name="description" content="Government bonds (G-Sec), tax-free bonds, AAA-rated corporate FDs, RBI Floating Rate Bonds, SCSS and Sovereign Gold Bonds — fixed-income options for the relatively lower-risk part of your portfolio. Returns are not guaranteed; credit risk applies for non-sovereign instruments." />
        <link rel="canonical" href="https://moneycompound.com/products/bonds-fds" />
      </Head>

      {/* Hero Section - Pinterest Premium Style */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
                <div className="flex flex-col items-center text-center relative z-10 w-full max-w-4xl mx-auto">
            <div className="animate-up flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-slate-300" />
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Bonds, FDs &amp; Govt Schemes</span>
              <div className="h-[2px] w-12 bg-slate-300" />
            </div>

            <h1 className="text-5xl lg:text-6xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Fixed" className="block" />
              <SplitTextCharacters text="Income" className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium font-['Inter'] mb-12">
               Fixed income for the relatively lower-risk part of your portfolio — <span className="text-slate-950 font-bold border-b-2 border-brand-gold/30">government bonds, tax-free bonds, AAA-rated corporate FDs</span> and select small-savings schemes.
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
            <p className="font-bold text-slate-900 mb-2">A note on risk</p>
            <p>
              Fixed income is generally lower-risk than equity but is not risk-free. Only G-Secs and small-savings schemes carry sovereign backing. Corporate FDs and non-sovereign bonds carry credit risk and are <strong>not covered by DICGC insurance</strong> (which insures bank deposits up to ₹5 lakh per depositor). Returns are not guaranteed; interest-rate, reinvestment and liquidity risks apply.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Fixed Income Shelf</h2>
          <div className="animate-up w-24 h-1.5 bg-gradient-to-r from-brand-gold to-slate-200 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item, idx) => (
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
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Stability Meets Efficiency.</h2>
              <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
              <div className="space-y-12">
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Curated Quality</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    We offer a curated shelf of fixed-income products, chosen for credit quality, tax efficiency and the right duration mix. We typically facilitate only AAA or equivalent sovereign-rated instruments.
                  </p>
                </div>
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">For Every Life Stage</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    From SCSS and RBI bonds for retirees to tax-free bonds for high-bracket earners. We structure the right fixed-income mix for your goals and tax bracket.
                  </p>
                </div>
              </div>
           </div>
           
           <div className="animate-scale relative">
              <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
                 <img src="https://images.pexels.com/photos/258160/pexels-photo-258160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Stable Foundation" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
                 <Quote className="text-brand-gold mb-6 w-10 h-10" />
                 <p className="text-white text-lg font-medium leading-relaxed italic">
                    &quot;Safety, income and tax efficiency — the fixed income trifecta.&quot;
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
                 <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Anchor Your Portfolio.</h2>
                 <p className="text-white text-base mb-12 font-medium">
                   We curate only the highest quality fixed income instruments, matched to your tax bracket and tenure.
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
