import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ShieldCheck, TrendingUp, Zap, Target, Layers, ArrowUpRight, 
  BarChart3, PieChart, Wallet, Briefcase, Landmark, Globe, 
  CheckCircle2, AlertCircle, Coins, Percent, FileText, UserCheck, 
  Users, Home, Sparkles, Activity, Stethoscope, Cross, LifeBuoy, Plus, Minus, ArrowRight, Quote 
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

export default function HealthInsurancePage() {
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
    { title: "Young Age Entry", desc: "Preferably at a young age, but better late than never. Premium tends to increase with age, making early entry the right choice.", icon: TrendingUp, color: "text-blue-600" },
    { title: "No Claim Bonus", desc: "Insurance companies give a 'no claim bonus' for every year in which no claim is taken against the insurance policy.", icon: Sparkles, color: "text-emerald-600" },
    { title: "Tax Benefit 80D", desc: "This policy comes with significant tax benefits under Section 80D of the Income Tax Act.", icon: Landmark, color: "text-indigo-600" },
    { title: "Savings Protection", icon: Wallet, desc: "Avoid incurring health expenses from the savings you did for your other important goals and dreams.", color: "text-orange-600" }
  ];

  const faqs = [
    {
      q: 'How much health insurance do I need?',
      a: 'For metro-based families, a base cover of ₹10-15 lakh for family floater is a minimum, topped up with a ₹50 L-₹1 Cr super top-up. Tier-2 cities can manage with ₹7-10 L base + ₹25 L super top-up. Senior citizens (65+) should ideally have ₹15-25 L individual cover. Medical inflation means under-insurance compounds fast — we recalculate your need every 3-4 years.'
    },
    {
      q: 'Individual vs family floater — which is better?',
      a: 'Family floater is better when all members are young and relatively healthy — you share one sum insured, and premium per person is lower. Individual policy is better for (a) senior parents (their high premium should not inflate your floater), and (b) when one family member has a high-risk condition. Many families use a combination.'
    },
    {
      q: 'What is a super top-up policy?',
      a: 'A super top-up is a secondary health policy that kicks in once your claim crosses a defined deductible (e.g. ₹5 L or ₹10 L). It is 60-80% cheaper than equivalent base cover. So a ₹5 L base + ₹50 L super top-up with ₹5 L deductible gives you ₹55 L total cover at roughly the cost of ₹15 L standalone. Highly recommended.'
    },
    {
      q: 'Are pre-existing diseases covered?',
      a: 'Yes, but with a waiting period of 1-4 years, depending on the insurer and condition. Diabetes, hypertension, thyroid and high-cholesterol are covered after the waiting period. Specific conditions like heart disease, joint replacement etc. may have longer waits. We compare waiting periods before recommending a plan.'
    },
    {
      q: 'What is claim settlement ratio and why it matters?',
      a: 'Claim Settlement Ratio (CSR) is the % of claims settled by an insurer in a year. A higher CSR (90%+) indicates reliability. However, CSR alone is not enough — we also track incurred claims ratio, complaints ratio, hospital network size, and policy wording transparency.'
    },
    {
      q: 'Do you get tax benefits on health insurance premium?',
      a: 'Yes. Under Section 80D of the Income Tax Act, you can claim: up to ₹25,000 for self, spouse and children; additional ₹25,000 (₹50,000 if parents are senior citizens) for parents\' cover; plus ₹5,000 for preventive health check-ups. Total possible 80D deduction: up to ₹1 lakh per year. This is in addition to Sec 80C.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Health Insurance / Mediclaim Distribution | Money Compound (IRDAI POSP)</title>
        <meta name="description" content="Health insurance distribution under IRDAI POSP registration 408483. Money Compound helps you compare mediclaim, family floater and super top-up policies from IRDAI-licensed insurers, and complete the application." />
        <link rel="canonical" href="https://www.moneycompound.com/products/health-insurance" />
      </Head>

      {/* Hero Section - Pinterest Premium Style */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="flex flex-col items-center text-center relative z-10 w-full max-w-4xl mx-auto">
            <div className="animate-up flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-slate-300" />
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Complete Mediclaim Protection</span>
              <div className="h-[2px] w-12 bg-slate-300" />
            </div>

            <h1 className="text-5xl lg:text-6xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Health" className="block" />
              <SplitTextCharacters text="Insurance" className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium font-['Inter'] mb-12">
               Insure your family against the financial impact of hospitalisation and serious illness. <span className="text-brand-gold font-bold italic">We help you compare and complete the application — under IRDAI POSP.</span>
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
              Money Compound is registered with IRDAI as a POSP (Point of Sales Person), Registration No. <strong>408483</strong>. Insurance is the subject matter of solicitation. Cashless networks, claim settlement, waiting periods and policy terms are governed by the respective IRDAI-licensed insurer. We help you compare and complete the application; underwriting and claim decisions rest with the insurer.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">The Right Choice</h2>
          <div className="animate-up w-24 h-1.5 bg-gradient-to-r from-brand-gold to-slate-200 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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

      {/* Core Description - Split Card */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
           <div className="animate-up">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Security Against The Unexpected.</h2>
              <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
              <div className="space-y-12">
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Cashless & International Care</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Coverage includes cashless facilities, international treatment, and Doctors’ second opinion facility. Plus, free medical check-ups for all family members at reputed medical centers.
                  </p>
                </div>
                <div className="animate-up">
                   <div className="space-y-6">
                      {[
                        "Emergencies can come without warning",
                        "Private hospitals are highly expensive",
                        "Rising cost of medicines and doctor fees",
                        "Avoid draining your life savings"
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
                 <img src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Health Care" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
                 <Quote className="text-brand-gold mb-6 w-10 h-10" />
                 <p className="text-white text-lg font-medium leading-relaxed italic">
                    &quot;Health is your most important asset. Protect it with the best medical care.&quot;
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
                 <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Better Late Than Never.</h2>
                 <p className="text-white text-base mb-12 font-medium">
                    Don&apos;t wait for an emergency to realize the value of health insurance. Secure your medical future today.
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
