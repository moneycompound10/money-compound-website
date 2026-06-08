import React, { useLayoutEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { 
  Plane, ShieldCheck, Globe, Zap, Target, Layers, ArrowUpRight, 
  MapPin, Luggage, Wallet, Briefcase, Landmark, Clock, 
  CheckCircle2, AlertCircle, Coins, Percent, FileText, UserCheck, 
  Users, Home, Sparkles, Anchor, LifeBuoy, Heart, ArrowRight, Quote 
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

export default function TravelInsurancePage() {
  const containerRef = useRef(null);

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

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Travel Insurance Distribution | Money Compound (IRDAI POSP)</title>
        <meta name="description" content="Travel insurance distribution under IRDAI POSP registration 408483. Compare and complete the application for international and student travel insurance with IRDAI-licensed insurers." />
        <link rel="canonical" href="https://www.moneycompound.com/products/travel-insurance" />
        <meta property="og:title" content="Travel Insurance — Money Compound" />
        <meta property="og:url" content="https://www.moneycompound.com/products/travel-insurance" />
        <meta property="og:image" content="https://www.moneycompound.com/og-cover.jpg" />
      </Head>

      {/* Hero Section - Pinterest Premium Style */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
                <div className="flex flex-col items-center text-center relative z-10 w-full max-w-4xl mx-auto">
            <div className="animate-up flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-slate-300" />
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Global Protection &amp; Travel Security</span>
              <div className="h-[2px] w-12 bg-slate-300" />
            </div>

            <h1 className="text-5xl lg:text-6xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Travel" className="block" />
              <SplitTextCharacters text="Insurance" className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium font-['Inter'] mb-12">
               Comprehensive protection for the <span className="text-brand-gold font-bold italic">unexpected moments</span> that happen while you explore the world. Medical, cancellation, and baggage cover.
            </p>

            <div className="animate-up flex flex-wrap gap-6 justify-center">
              <Link href="/contact-us" className="px-10 py-5 bg-brand-navy text-white rounded-full font-bold text-[13px] hover:bg-brand-gold transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest">
                Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
        </div>
      </section>

      {/* Core Description - Split Card */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
           <div className="animate-up">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">The Key Takeaways.</h2>
              <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium mb-12">
                Travel policies are comprehensive, covering everything from personal property damage to emergency medical assistance. Many companies selling travel packages also offer integrated insurance options.
              </p>
              <div className="space-y-6">
                 {[
                   { icon: Plane, text: "Trip cancellation or interruption" },
                   { icon: Luggage, text: "Baggage and personal effects" },
                   { icon: Heart, text: "Medical and accidental death" },
                   { icon: Clock, text: "24/7 Emergency assistance services" }
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-center gap-4 text-slate-700 font-bold">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-brand-gold"><item.icon size={20} /></div>
                      {item.text}
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="animate-scale relative">
              <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
                 <img src="https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Safe Journey" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
                 <Quote className="text-brand-gold mb-6 w-10 h-10" />
                 <p className="text-white text-lg font-medium leading-relaxed italic">
                    &quot;24/7 emergency services, ensuring you&apos;re never stranded.&quot;
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Main Categories</h2>
          <div className="animate-up w-24 h-1.5 bg-gradient-to-r from-brand-gold to-slate-200 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Trip Cancellation", desc: "Non-refundable costs covered if you cancel for a covered reason.", icon: Zap, color: "text-blue-500" },
            { title: "Personal Property", desc: "Covers damage to luggage, rented cars, and ransom.", icon: ShieldCheck, color: "text-rose-500" },
            { title: "Medical Coverage", desc: "Essential for international travel where local health insurance may not apply.", icon: Heart, color: "text-emerald-500" },
            { title: "24/7 Assistance", desc: "Replacing lost passports and re-booking canceled flights.", icon: Clock, color: "text-amber-500" }
          ].map((reason, idx) => (
            <div key={idx} className="animate-scale group bg-white p-8 rounded-[40px] border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:bg-slate-100 transition-colors" />
              <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${reason.color} mb-8 group-hover:scale-110 transition-transform`}>
                <reason.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display'] group-hover:text-brand-gold transition-colors">{reason.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium font-['Inter']">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="animate-scale bg-slate-950 rounded-[80px] p-16 md:p-24 relative overflow-hidden shadow-premium text-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 to-transparent" />
          <div className="relative z-10">
             <Sparkles className="text-brand-gold mx-auto mb-10" size={48} />
             <h2 className="text-3xl md:text-5xl font-black text-white mb-10 font-['Playfair_Display'] max-w-4xl mx-auto leading-tight italic">
               &quot;Travel the world with absolute peace of mind.&quot;
             </h2>
             <p className="text-white text-xl md:text-2xl leading-relaxed font-medium font-['Inter'] max-w-3xl mx-auto mb-12">
                Whether it&apos;s a leisure trip or business travel, ensure your costs and losses are covered so you can focus on the journey.
             </p>
             <button className="px-12 py-6 bg-white text-slate-950 rounded-full font-bold text-lg hover:bg-brand-gold transition-all shadow-xl">
               Get Insurance Quote
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
