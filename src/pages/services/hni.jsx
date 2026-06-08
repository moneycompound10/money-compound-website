import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, TrendingUp, ScrollText, Landmark, User, Lock,
  CheckCircle2, Sparkles, Plus, Minus, ShieldCheck, Diamond, ArrowRight, Quote, AlertTriangle
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

export default function HNIInvestmentsPage() {
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
      gsap.set('.image-mask', { clipPath: 'inset(0 100% 0 0)' });

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
    { icon: Target, color: 'text-blue-600', title: 'Larger-ticket Mutual Funds', text: 'AMFI-registered mutual fund schemes shortlisted for HNI portfolios — covering equity, hybrid and debt categories.', img: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: TrendingUp, color: 'text-emerald-600', title: 'Specialised Investment Funds (SIF)', text: 'Newer SEBI-regulated SIF strategies, distributed under our SIF distribution registration where suitable.', img: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: ScrollText, color: 'text-purple-600', title: 'Estate Coordination', text: 'Wills, family arrangements and succession discussions in coordination with qualified lawyers — we do not provide legal advice.', img: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Landmark, color: 'text-rose-600', title: 'Tax Coordination', text: 'Mutual fund capital-gain harvesting, ELSS structuring and coordination with your CA / tax professional.', img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: User, color: 'text-orange-600', title: 'Dedicated Relationship Manager', text: 'One named Relationship Manager who knows your goals, family context and existing investments — not a call centre.', img: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Lock, color: 'text-cyan-600', title: 'Confidentiality', text: 'Signed NDAs, secure reporting and discreet handling of every interaction.', img: 'https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];

  const whoFor = [
    'Families with ₹1 Cr+ investable financial assets',
    'Professionals looking for larger-ticket mutual fund and SIF investments',
    'Business owners coordinating tax, succession and investments under one roof',
    'High-Net-Worth individuals wanting a single point of contact for mutual funds and insurance',
    'Investors who prefer need-based mutual fund portfolios over product-pushing',
  ];

  const faqs = [
    {
      q: 'Who is the HNI Investment Services offering for?',
      a: 'It is designed for families with ₹1 Cr+ in investable financial assets who want a single, accountable point of contact for need-based mutual fund investing, insurance distribution and coordination with their CA / lawyer. Money Compound acts as an AMFI-registered Mutual Fund Distributor and IRDAI POSP — not as a Portfolio Manager or Investment Adviser.'
    },
    {
      q: 'Do you offer PMS or AIF directly?',
      a: 'No. Money Compound does not distribute or advise on PMS or AIF and is not registered with APMI. If an HNI client expresses interest, we may refer them to a SEBI-registered Portfolio Manager / AIF manager. Onboarding, performance reporting and grievance handling for PMS/AIF then sit with that SEBI-registered manager.'
    },
    {
      q: 'How are mutual fund scheme suggestions made?',
      a: 'We suggest AMFI-registered mutual fund schemes based on your written goals, time horizon, risk profile and existing investments. Suggestions are not personalised investment advice under the SEBI (Investment Advisers) Regulations, 2013. Final investment decisions are yours.'
    },
    {
      q: 'How do you charge?',
      a: 'For mutual funds, we earn standard distributor commission directly from the AMC under SEBI / AMFI norms — no separate fee from you. For insurance, we earn standard IRDAI POSP commission. Full fee disclosure is available on our Cost of Investing page.'
    },
    {
      q: 'Do you help with estate & succession planning?',
      a: 'We coordinate succession discussions in partnership with qualified lawyers and CAs. Money Compound does not provide legal or tax advice. Wills, trusts, HUF restructuring and gifting decisions are taken in consultation with your legal / tax professionals.'
    },
    {
      q: 'How often are HNI portfolios reviewed?',
      a: 'HNI relationships receive periodic written portfolio statements and structured review meetings with your Relationship Manager. Any change to your investment mix is suggested in writing and executed only with your written approval.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>HNI Investment Services | Money Compound</title>
        <meta name="description" content="HNI Investment Services from Money Compound — larger-ticket mutual fund distribution, Specialised Investment Funds (SIF), insurance distribution under IRDAI POSP, and coordination with your CA and lawyer. For PMS/AIF, we refer to SEBI-registered managers." />
        <link rel="canonical" href="https://moneycompound.com/services/hni" />
      </Head>

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full max-w-7xl mx-auto">
          <div className="text-left">
            <div className="animate-up flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-slate-300" />
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">For Established Investors</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="HNI Investment" className="block" />
              <SplitTextCharacters text="Services." className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-xl font-medium font-['Inter'] mb-12">
              A single accountable point of contact for <span className="text-slate-950 font-bold border-b-2 border-brand-gold/30">larger-ticket mutual fund investing</span>, Specialised Investment Funds (SIF), insurance distribution and coordination with your CA and lawyer.
            </p>

            <div className="animate-up flex flex-wrap gap-6">
              <Link href="/contact-us" className="px-10 py-5 bg-brand-navy text-white rounded-full font-bold text-[13px] hover:bg-brand-gold transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest">
                Speak To Us <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="relative group perspective-stage hidden lg:block">
            <div className="image-mask relative rounded-[60px] overflow-hidden aspect-[4/5] shadow-2xl max-w-[450px] ml-auto">
              <img
                src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="HNI investor reviewing mutual fund portfolio with relationship manager"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>

            <div className="floating-element absolute -bottom-10 right-20 bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-premium border border-white/20 max-w-[280px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white">
                  <Diamond size={20} />
                </div>
                <span className="font-bold text-slate-900">One Point of Contact</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                A dedicated Relationship Manager who knows your investments, goals and family context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Referral-only disclosure */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mb-24">
        <div className="animate-up bg-amber-50 border border-amber-200 rounded-[32px] p-8 md:p-10 flex gap-5 items-start">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div className="text-slate-800 text-[15px] leading-relaxed">
            <p className="font-bold text-slate-900 mb-2">Important — PMS / AIF disclosure</p>
            <p>
              For Portfolio Management Services (PMS) and Alternative Investment Funds (AIF), Money Compound may refer clients to SEBI-registered Portfolio Managers / AIF managers. <strong>Money Compound does not distribute, select, or advise on PMS or AIF products, and is not registered with APMI.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">What HNI Clients Get</h2>
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

      {/* Core Description */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="animate-up">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">A Disciplined Approach.</h2>
            <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
            <div className="space-y-12">
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">AMFI-registered Mutual Fund Distribution</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  Need-aligned scheme suggestions across AMFI-registered mutual funds, with full commission disclosure and zero hidden fees from you.
                </p>
              </div>
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Tax & Succession Coordination</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  We coordinate with your CA and lawyer on capital-gain timing, ELSS structuring, wills and HUF arrangements. Money Compound does not provide legal or tax advice itself.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-scale relative">
            <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
              <img src="https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="HNI client portfolio review meeting" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
              <Quote className="text-brand-gold mb-6 w-10 h-10" />
              <p className="text-white text-lg font-medium leading-relaxed italic">
                &quot;Long-term outcomes come from clear goals, written decisions and disciplined reviews.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Profile */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="animate-up bg-slate-50 rounded-[60px] p-12 md:p-20 border border-slate-100">
          <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-12 font-['Playfair_Display']">Client Profile</h2>
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
              <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">A Confidential Review.</h2>
              <p className="text-white text-base mb-12 font-medium">
                Speak with our team to review your existing mutual fund portfolio and discuss your goals. No fees, no obligation.
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
