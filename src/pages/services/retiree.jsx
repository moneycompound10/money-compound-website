import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet, Landmark, ShieldCheck, HeartPulse, FileText, PhoneCall,
  CheckCircle2, Sparkles, Plus, Minus, HeartHandshake, Shield, ArrowRight, Quote
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

export default function RetireesInvestmentsPage() {
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
      gsap.set('.image-mask', { clipPath: 'inset(0 100% 0 0)' });

      // Entrance Sequence
      tl.to('.image-mask', { clipPath: 'inset(0 0% 0 0)', duration: 2, ease: 'expo.inOut' })
        .to('.char-reveal', {
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

      // Floating animations
      gsap.to('.floating-element', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { icon: Wallet, color: 'text-blue-600', title: 'SWP Income Planning', text: 'Structure tax-efficient monthly withdrawals from your mutual fund investments using SWPs — actual tax outcomes vary by scheme category, holding period and your slab.', img: 'https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Landmark, color: 'text-emerald-600', title: 'SCSS', text: 'Senior Citizen Savings Scheme — government-backed small-savings option with quarterly interest payouts (rates revised periodically by the Government).', img: 'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: ShieldCheck, color: 'text-purple-600', title: 'Tax-Free Bonds & Quality Debt', text: 'NHAI, REC, IRFC tax-free bonds in the secondary market and highly-rated corporate FDs for the relatively lower-risk part of your portfolio. Returns are not guaranteed; credit and interest-rate risks apply.', img: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: HeartPulse, color: 'text-rose-600', title: 'Health Insurance', text: 'Senior-first health cover, super top-ups and critical illness policies — essential cushion for medical inflation.', img: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: FileText, color: 'text-orange-600', title: 'Nomination & Estate', text: 'Will drafting, nomination updates, joint holdings, and hassle-free succession planning.', img: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: PhoneCall, color: 'text-cyan-600', title: 'Senior-Friendly Support', text: 'Phone-first support, paper statements on request, and branch meetings for clients over 70.', img: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];

  const whoFor = [
    'Pensioners and retirees seeking reliable monthly income',
    'Ex-armed forces and ex-PSU executives',
    'Self-retired professionals wanting tax-efficient withdrawals',
    'Seniors looking for tax-free bonds and SCSS optimization',
    'Those needing assistance with estate planning and health insurance',
  ];

  const faqs = [
    {
      q: 'How much monthly income can I get from my retirement corpus?',
      a: 'A commonly used rule of thumb is the 4% Rule — withdraw 4% of your corpus in year 1 and adjust for inflation thereafter. For India, factoring in higher inflation and longer lifespans, a safer withdrawal rate is 3-3.5%. So a ₹1 Cr corpus can sustainably provide ₹25,000-30,000 per month, inflation-adjusted, for 25+ years — with the right asset allocation. Try our SWP calculator for an exact estimate.'
    },
    {
      q: 'What is SWP and how does it compare with FD interest?',
      a: 'A Systematic Withdrawal Plan (SWP) lets you redeem a fixed amount every month from a mutual fund. Unlike FD interest (fully taxable at your slab on the entire interest), only the capital-gains portion of an SWP redemption is taxed — and equity-oriented schemes have a separate LTCG regime. The exact tax outcome depends on your scheme category, holding period, slab and applicable tax rules at the time of redemption. Please confirm with your CA.'
    },
    {
      q: 'What happens to my corpus during SWP?',
      a: 'Your invested amount remains exposed to the underlying mutual fund scheme(s), so its value moves with the markets — it is not principal-protected. If your annual withdrawal rate is below the fund\'s long-term return, the corpus can last for the planned horizon or longer; if it is above, the corpus depletes faster. We suggest the underlying scheme mix based on your risk profile and withdrawal needs, reviewed with you on a periodic basis.'
    },
    {
      q: 'What is the maximum deposit in SCSS?',
      a: 'The Senior Citizen Savings Scheme (SCSS) limit was enhanced to ₹30 lakh per individual. A senior couple can jointly park ₹60 lakh in SCSS, with government-backed security and competitive quarterly interest payouts. Interest is fully taxable but eligible for Sec 80TTB deduction up to ₹50,000.'
    },
    {
      q: 'Should retirees keep any equity exposure?',
      a: 'For many retirees, a modest equity allocation through conservative-hybrid or balanced-advantage mutual fund schemes is considered helpful to address inflation risk over a 20-30-year retirement. Pure fixed-income portfolios can carry the risk of falling short of long-term living costs. The right mix is a personal decision based on your risk tolerance, other income sources and dependants — we suggest options and the final call is yours.'
    },
    {
      q: 'Do you help with pension, PF and gratuity decisions?',
      a: 'Yes — we help you understand your options for EPF (lump sum vs annuity), gratuity, EPS commutation and structuring retirement payouts, and coordinate with your CA on tax. We do not provide pension product advice as a SEBI-registered Investment Adviser; final decisions are yours, based on your tax and family situation.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Retirement Planning for Senior Investors | Money Compound</title>
        <meta name="description" content="Retirement-stage planning — tax-efficient SWPs from mutual funds, SCSS, RBI Floating Rate Bonds, tax-free bonds, senior health cover and estate coordination. Reviewed with you periodically; changes only on your written approval." />
        <link rel="canonical" href="https://moneycompound.com/services/retiree" />
        <meta property="og:title" content="Retirement Planning — Money Compound" />
        <meta property="og:url" content="https://moneycompound.com/services/retiree" />
        <meta property="og:image" content="https://moneycompound.com/og-cover.jpg" />
      </Head>

      {/* Hero Section - Pinterest Premium Style */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full max-w-7xl mx-auto">
          <div className="text-left">
            <div className="animate-up flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-slate-300" />
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Retirement Income Experts</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Retirement" className="block" />
              <SplitTextCharacters text="Planning." className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-xl font-medium font-['Inter'] mb-12">
              Ensuring your corpus lasts as long as you do. <span className="text-slate-950 font-bold border-b-2 border-brand-gold/30">Monthly income planning</span>, tax-efficient withdrawals, and inheritance planning for seniors.
            </p>

            <div className="animate-up flex flex-wrap gap-6">
              <Link href="/contact-us" className="px-10 py-5 bg-brand-navy text-white rounded-full font-bold text-[13px] hover:bg-brand-gold transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest">
                Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="relative group perspective-stage hidden lg:block">
            <div className="image-mask relative rounded-[60px] overflow-hidden aspect-[4/5] shadow-2xl max-w-[450px] ml-auto">
              <img
                src="https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Retirement Planning"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>

            <div className="floating-element absolute -bottom-10 right-20 bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-premium border border-white/20 max-w-[280px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white">
                  <Shield size={20} />
                </div>
                <span className="font-bold text-slate-900">Peace of Mind</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Your second innings should be about living life to the fullest. Leave the portfolio to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Retirement Services</h2>
          <div className="animate-up w-24 h-1.5 bg-gradient-to-r from-brand-gold to-slate-200 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => (
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
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Protect Your Financial Freedom.</h2>
            <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
            <div className="space-y-12">
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Monthly Income Portfolios</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  We combine SCSS, RBI bonds, debt mutual funds and SWP (Systematic Withdrawal Plans) to create a steady, monthly &quot;paycheck&quot; for your retirement.
                </p>
              </div>
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Health & Emergency</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  In retirement, the goal shifts from growth to preservation. We help you secure the right top-up health insurance and a liquid emergency fund.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-scale relative">
            <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
              <img src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Senior Security" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
              <Quote className="text-brand-gold mb-6 w-10 h-10" />
              <p className="text-white text-lg font-medium leading-relaxed italic">
                &quot;Enjoy your retirement. Let your portfolio work for you.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="animate-up bg-slate-50 rounded-[60px] p-12 md:p-20 border border-slate-100">
          <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-12 font-['Playfair_Display']">Who We Serve</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whoFor.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <p className="text-slate-700 font-bold text-base font-['Inter']">{item}</p>
              </div>
            ))}
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
              <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Secure Your Income.</h2>
              <p className="text-white text-base mb-12 font-medium">
                Book a consultation to structure your retirement corpus into a reliable, tax-efficient monthly income stream.
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
