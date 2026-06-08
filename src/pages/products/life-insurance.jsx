import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, ShieldCheck, Target, Layers, Landmark,
  UserCheck, Home, Sparkles, Plus, Minus, ArrowRight, Quote, AlertTriangle
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

export default function LifeInsurancePage() {
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

  const reasons = [
    { title: "Income Replacement", desc: "If something happens to you, term life insurance gives your dependents a lump-sum payout to replace your income, repay liabilities and meet essential living costs.", icon: ShieldCheck, color: "text-blue-600" },
    { title: "Death Benefit to Family", desc: "On the policyholder's death during the policy term, the insurer pays the sum assured (and any applicable bonus, as per the policy contract) to the nominated beneficiary.", icon: Heart, color: "text-rose-600" },
    { title: "Tax Treatment", desc: "Life insurance premiums paid may qualify for deduction under Section 80C of the Income-tax Act, 1961, within the overall ₹1,50,000 limit (subject to conditions). Tax rules can change — please confirm with your CA.", icon: Landmark, color: "text-emerald-600" },
    { title: "Long-term Protection", desc: "Long-term term plans (up to age 60-80) keep your family financially protected through your high-responsibility years — home loans, child education, dependent parents.", icon: Sparkles, color: "text-amber-600" }
  ];

  const faqs = [
    {
      q: 'How much life insurance do I need?',
      a: 'A commonly accepted rule is 10-15× your annual income, or a Human Life Value (HLV) calculation that considers your future earnings, liabilities (home loan), dependents’ needs and existing assets. A 35-year-old earning ₹15 L/year with 20 years of earning life would need roughly ₹1.5-2 Cr term cover. Our team calculates it precisely based on your profile.'
    },
    {
      q: 'Term insurance vs ULIP — what is the difference?',
      a: 'Term insurance is a pure protection product: lower premium, no investment component, payout only on death during the policy term. ULIPs combine insurance with market-linked investment, with higher costs and longer lock-ins. We treat life insurance as protection first; investment goals are typically better served separately through AMFI-registered mutual fund schemes. Final product choice is yours, based on your needs.'
    },
    {
      q: 'Can I buy multiple term policies from different insurers?',
      a: 'Yes. You must disclose existing policies in each new application. Spreading cover across 2-3 insurers can be smart: it reduces dependency on one insurer’s claim process and lets you surrender one policy later as your cover need reduces (post-retirement).'
    },
    {
      q: 'What if I stop paying term insurance premium?',
      a: 'Unlike traditional policies, term insurance has no surrender value. If you stop paying, the policy lapses and all premiums paid are lost. However, you can continue term cover up to age 60-80 by paying premiums — after which cover is rarely needed (dependents typically independent, liabilities cleared).'
    },
    {
      q: 'How are life insurance proceeds taxed?',
      a: 'Subject to conditions, death benefits paid to nominees are generally tax-exempt under Section 10(10D) of the Income-tax Act, 1961. Maturity proceeds of traditional and ULIP policies are also exempt subject to specified premium-to-sum-assured ratios; for policies issued after 1 April 2023, ULIPs with annual premium above ₹2.5 lakh lose the Section 10(10D) exemption. Please verify current rules with your CA before relying on them.'
    },
    {
      q: 'Can NRIs buy term insurance from India?',
      a: 'Yes — most Indian life insurers (HDFC Life, ICICI Prudential, Max Life, Tata AIA, etc.) accept term insurance applications from NRIs, often with video KYC. Eligibility, underwriting, medicals and documentation are governed by the insurer. Premiums for NRI applicants are generally comparable to resident Indian premiums; we help you compare options and complete the IRDAI-compliant onboarding.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Life Insurance — Protection First | Money Compound (IRDAI POSP)</title>
        <meta name="description" content="Life insurance distribution under IRDAI POSP registration 408483. Money Compound helps you compare term insurance, traditional and ULIP plans from IRDAI-licensed insurers and complete the application — with protection-first guidance, not product push." />
        <link rel="canonical" href="https://moneycompound.com/products/life-insurance" />
      </Head>

      {/* Hero Section - Pinterest Premium Style */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="flex flex-col items-center text-center relative z-10 w-full max-w-4xl mx-auto">
          <div className="animate-up flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-slate-300" />
            <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Protection First</span>
            <div className="h-[2px] w-12 bg-slate-300" />
          </div>

          <h1 className="text-5xl lg:text-6xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
            <SplitTextCharacters text="Life" className="block" />
            <SplitTextCharacters text="Insurance" className="text-brand-gold block" />
          </h1>

          <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium font-['Inter'] mb-12">
            Life insurance is, first and foremost, <span className="text-brand-gold font-bold italic">protection for the people who depend on you</span>. We help you compare term and traditional plans from IRDAI-licensed insurers and complete the application under IRDAI POSP.
          </p>

          <div className="animate-up flex flex-wrap gap-6 justify-center">
            <Link href="/contact-us" className="px-10 py-5 bg-brand-navy text-white rounded-full font-bold text-[13px] hover:bg-brand-gold transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest">
              Speak To Us <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* IRDAI Registration Disclosure */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mb-24">
        <div className="animate-up bg-blue-50 border border-blue-200 rounded-[32px] p-8 md:p-10 flex gap-5 items-start">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div className="text-slate-800 text-[15px] leading-relaxed">
            <p className="font-bold text-slate-900 mb-2">Insurance registration</p>
            <p>
              Money Compound is registered with IRDAI as a POSP (Point of Sales Person), Registration No. <strong>408483</strong>. Insurance is the subject matter of solicitation. Premium quotes, claim settlement and policy terms are governed by the respective IRDAI-licensed insurer. Money Compound does not underwrite policies and is not a SEBI-registered Investment Adviser; investment goals should typically be addressed through AMFI-registered mutual fund schemes rather than through investment-linked insurance products.
            </p>
          </div>
        </div>
      </section>

      {/* Reasons Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Reasons for Coverage</h2>
          <div className="animate-up w-24 h-1.5 bg-gradient-to-r from-brand-gold to-slate-200 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((item, idx) => (
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

      {/* Core Description - Split Card */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="animate-up">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">The Essence of Financial Legacy.</h2>
            <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
            <div className="space-y-12">
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Secure Quality of Life</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  Think about your spouse, children or other loved ones. Life insurance ensures they can continue to enjoy the quality of the life they deserve, no matter what happens.
                </p>
              </div>
              <div className="animate-up">
                <div className="space-y-6">
                  {[
                    { icon: Home, text: "Protect your home mortgage and loans" },
                    { icon: Target, text: "Provide finance to achieve future goals" },
                    { icon: UserCheck, text: "Replace loss of personal income" },
                    { icon: Layers, text: "Maintain lifestyle and estate needs" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-slate-950 font-bold">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-brand-gold"><item.icon size={20} /></div>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="animate-scale relative">
            <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
              <img src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Life Protection" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
              <Quote className="text-brand-gold mb-6 w-10 h-10" />
              <p className="text-white text-lg font-medium leading-relaxed italic">
                &quot;In life insurance, you buy a promise of financial security for your loved ones.&quot;
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
              <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Secure Their Future.</h2>
              <p className="text-white text-base mb-12 font-medium">
                Life insurance is for the people who depend on you. We help you compare IRDAI-licensed insurers and complete the application — protection first, no pressure.
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
