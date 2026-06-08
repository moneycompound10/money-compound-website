import React, { useLayoutEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import {
  ShieldCheck, TrendingUp, Zap, Target, Layers,
  BarChart3, PieChart, ArrowRight, Quote, AlertTriangle
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

export default function PMSPage() {
  const containerRef = useRef(null);

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

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Portfolio Management Services (PMS) — Educational Overview | Money Compound</title>
        <meta name="description" content="An educational overview of SEBI-regulated Portfolio Management Services (PMS). Money Compound does not distribute or advise on PMS and is not registered with APMI; we may refer interested HNI clients to SEBI-registered Portfolio Managers." />
        <link rel="canonical" href="https://www.moneycompound.com/products/pms" />
      </Head>

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

                <div className="flex flex-col items-center text-center relative z-10 w-full max-w-4xl mx-auto">
            <div className="animate-up flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-slate-300" />
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Educational Overview</span>
              <div className="h-[2px] w-12 bg-slate-300" />
            </div>

            <h1 className="text-5xl lg:text-6xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Portfolio" className="block" />
              <SplitTextCharacters text="Management" className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium font-['Inter'] mb-12">
              Portfolio Management Services (PMS) are SEBI-regulated, separately managed accounts run by SEBI-registered Portfolio Managers for HNI investors. This page is for <span className="text-brand-gold font-bold italic">information only</span>.
            </p>

            <div className="animate-up flex flex-wrap gap-6 justify-center">
              <Link href="/contact-us" className="px-10 py-5 bg-brand-navy text-white rounded-full font-bold text-[13px] hover:bg-brand-gold transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest">
                Speak To Us <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
        </div>
      </section>

      {/* Referral-only disclosure — top of page */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mb-24">
        <div className="animate-up bg-amber-50 border border-amber-200 rounded-[32px] p-8 md:p-10 flex gap-5 items-start">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div className="text-slate-800 text-[15px] leading-relaxed">
            <p className="font-bold text-slate-900 mb-2">Important disclosure — please read</p>
            <p>
              For Portfolio Management Services (PMS) and Alternative Investment Funds (AIF), Money Compound may refer clients to SEBI-registered Portfolio Managers / AIF managers. <strong>Money Compound does not distribute, select, or advise on PMS or AIF products, and is not registered with APMI.</strong> Any onboarding, investment selection, performance reporting and grievance handling for PMS/AIF is the responsibility of the SEBI-registered manager. Investments in PMS/AIF involve significant risk and are intended for sophisticated investors only.
            </p>
          </div>
        </div>
      </section>

      {/* What is PMS — educational */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
           <div className="animate-up">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">What is PMS?</h2>
              <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium mb-8">
                A Portfolio Management Service (PMS) is a SEBI-regulated investment offering where a SEBI-registered Portfolio Manager manages a separately held account on behalf of an HNI investor, with a minimum investment threshold prescribed by SEBI (currently ₹50 lakh).
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                Securities are held directly in the investor&apos;s name through a designated demat account. Performance, reporting, fees, taxation and grievance redressal are governed by the SEBI (Portfolio Managers) Regulations, 2020, and managed by the appointed Portfolio Manager — not by Money Compound.
              </p>
           </div>

           <div className="animate-scale relative">
              <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
                 <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Investor reviewing portfolio statement at desk" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
                 <Quote className="text-brand-gold mb-6 w-10 h-10" />
                 <p className="text-white text-lg font-medium leading-relaxed italic">
                    &quot;A SEBI-regulated structure for sophisticated, high-net-worth investors.&quot;
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Discretionary vs Non-Discretionary */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="animate-up bg-slate-50 rounded-[50px] p-12 md:p-16 border border-slate-100 hover:shadow-2xl transition-all duration-500">
            <div className="w-16 h-16 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-8">
              <BarChart3 size={32} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Discretionary PMS</h3>
            <p className="text-slate-600 text-lg leading-relaxed font-medium font-['Inter']">
              The Portfolio Manager makes investment decisions within the SEBI-mandated agreement. Buy/sell decisions on the investor&apos;s account are taken by the Portfolio Manager.
            </p>
          </div>

          <div className="animate-up bg-slate-950 rounded-[50px] p-12 md:p-16 border border-white/5 hover:shadow-2xl transition-all duration-500 shadow-premium">
            <div className="w-16 h-16 rounded-3xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-8">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-3xl font-black text-white mb-6 font-['Playfair_Display']">Non-Discretionary PMS</h3>
            <p className="text-white text-lg leading-relaxed font-medium font-['Inter']">
              The Portfolio Manager suggests ideas, but the final buy/sell decision rests with the investor. Suitable for investors who want professional input while retaining control.
            </p>
          </div>
        </div>
      </section>

      {/* What Money Compound does (and does not) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="animate-scale bg-white rounded-[80px] p-16 md:p-24 shadow-premium border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -mr-32 -mt-32 blur-3xl" />

          <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-6 font-['Playfair_Display'] text-center">Our Role</h2>
          <p className="text-slate-600 text-center max-w-3xl mx-auto mb-16">
            Money Compound is an AMFI-registered Mutual Fund Distributor. We do not act as a distributor, adviser, or selector for PMS or AIF products.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Target,
                title: "Referral Only",
                text: "If an HNI client expresses interest, we may connect them to a SEBI-registered Portfolio Manager. Selection of the manager remains the client's decision."
              },
              {
                icon: Layers,
                title: "Independent Onboarding",
                text: "All PMS onboarding, KYC, agreement signing, performance reporting and grievances are handled directly by the SEBI-registered Portfolio Manager."
              },
              {
                icon: PieChart,
                title: "Mutual Funds Remain Our Core",
                text: "For most investors, AMFI-registered mutual fund schemes — including SIPs, ELSS and debt — already address long-term goals."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-900 mb-8 group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                  <item.icon size={36} />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-4 font-['Playfair_Display']">{item.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium font-['Inter']">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
