import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, TrendingUp, Zap, Target, Layers, ArrowUpRight,
  BarChart3, PieChart, Wallet, Briefcase, Landmark, Globe,
  CheckCircle2, AlertCircle, Coins, Percent, FileText, Plus, Minus, ArrowRight, Quote, Sparkles
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

export default function CapitalGainBondPage() {
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
    { title: "Safe & Secure", desc: "AAA rated bonds issued by PSUs backed by Government of India for maximum security.", icon: ShieldCheck, color: "text-blue-600" },
    { title: "Tax Exemption", desc: "Avail exemption on long-term capital gains arising from sale of property under Section 54EC.", icon: Landmark, color: "text-emerald-600" },
    { title: "Fixed Tenure", desc: "Specifically designed for tax optimization with a fixed 5-year lock-in period.", icon: Target, color: "text-orange-600" },
    { title: "Annual Interest", desc: "Earn 5% rate of interest payable annually on your tax-saving investment.", icon: Percent, color: "text-rose-600" }
  ];

  const faqs = [
    {
      q: 'What are 54EC Capital Gain Bonds?',
      a: '54EC bonds are specific investment instruments issued by PSUs like NHAI, REC, and PFC. Investing your long-term capital gains from property sale into these bonds allows you to claim tax exemption.'
    },
    {
      q: 'What is the maximum investment limit?',
      a: 'The maximum limit for investment in 54EC bonds is ₹50 lakhs per individual per financial year.'
    },
    {
      q: 'What is the lock-in period?',
      a: 'These bonds have a mandatory lock-in period of 5 years. They are non-transferable and cannot be used as collateral for loans during this period.'
    },
    {
      q: 'How is the interest taxed?',
      a: 'The annual interest (currently 5%) is taxable as per your individual tax slab. However, the principal amount is tax-free on maturity.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Capital Gain Bonds (Section 54EC) | Money Compound</title>
        <meta name="description" content="Section 54EC capital gain bonds (NHAI, REC, PFC, IRFC) — up to ₹50 lakh per year, 5-year lock-in, sovereign-rated. Useful when planning long-term capital gain reinvestment from property sale. Confirm current 54EC limits and yields with your CA." />
        <link rel="canonical" href="https://www.moneycompound.com/products/capital-gain-bond" />
        <meta property="og:title" content="Capital Gain Bonds (54EC) — Money Compound" />
        <meta property="og:url" content="https://www.moneycompound.com/products/capital-gain-bond" />
        <meta property="og:image" content="https://www.moneycompound.com/og-cover.jpg" />
      </Head>

      {/* Hero Section - Pinterest Premium Style */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

                <div className="flex flex-col items-center text-center relative z-10 w-full max-w-4xl mx-auto">
            <div className="animate-up flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-slate-300" />
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Strategic Tax Optimization</span>
              <div className="h-[2px] w-12 bg-slate-300" />
            </div>

            <h1 className="text-5xl lg:text-6xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Capital Gain" className="block" />
              <SplitTextCharacters text="Bond (54EC)." className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium font-['Inter'] mb-12">
               Save long-term capital gain tax by investing in <span className="text-brand-gold font-bold italic">government-backed PSU bonds</span>. A secure way to protect your property sale profits.
            </p>

            <div className="animate-up flex flex-wrap gap-6 justify-center">
              <Link href="/contact-us" className="px-10 py-5 bg-brand-navy text-white rounded-full font-bold text-[13px] hover:bg-brand-gold transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest">
                Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Key Features</h2>
          <div className="animate-up w-24 h-1.5 bg-gradient-to-r from-brand-gold to-slate-200 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="animate-scale group bg-white p-8 rounded-[40px] border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:bg-slate-100 transition-colors" />
              <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${item.color} mb-8 group-hover:scale-110 transition-transform`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display'] group-hover:text-brand-gold transition-colors">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium font-['Inter']">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Narrative - Split Card */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="animate-up">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Exemption Utility.</h2>
            <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
            <div className="space-y-12">
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Strategic Tax Saving</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  54EC bonds are specifically meant for individuals, HUFs, and firms. You can avail exemption in respect of long-term capital gains arising from the sale of residential property by investing the gain amount into these bonds.
                </p>
              </div>
              <div className="animate-up">
                <div className="space-y-6">
                  {[
                    "Maximum investment of ₹50 lakhs per financial year",
                    "Minimum investment of just 1 bond (₹10,000)",
                    "Hold in either Physical or Demat form",
                    "Non-transferable bonds ensuring stable lock-in"
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
              <img src="https://images.pexels.com/photos/5900165/pexels-photo-5900165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Property Sale Tax" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
              <Quote className="text-brand-gold mb-6 w-10 h-10" />
              <p className="text-white text-lg font-medium leading-relaxed italic">
                &quot;Strategic investing is the most effective way to preserve your portfolio from taxes.&quot;
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
              <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Protect Your Gains.</h2>
              <p className="text-white text-base mb-12 font-medium">
                Minimize tax liabilities while ensuring maximum security through government-backed PSU bonds. Start your tax optimization journey today.
              </p>
              <button className="w-full py-5 bg-white text-slate-950 rounded-full font-bold text-base hover:bg-brand-gold transition-all shadow-xl uppercase tracking-widest text-[13px]">
                Invest In 54EC Bonds
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
