import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Landmark, LineChart, Globe2, RefreshCw, Home,
  CheckCircle2, Sparkles, Plus, Minus, ShieldCheck, Plane, ArrowRight, Quote
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

export default function NRIInvestmentsPage() {
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
    { icon: Landmark, color: 'text-blue-600', title: 'NRE / NRO / FCNR Setup', text: 'End-to-end assistance with account opening, documentation, and mandate setup with leading Indian banks.', img: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Globe, color: 'text-emerald-600', title: 'NRI Mutual Funds', text: 'Direct investing in Indian MF schemes, including equity, debt, hybrid, ELSS — all FATCA-compliant.', img: 'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: LineChart, color: 'text-purple-600', title: 'NRI Stocks & PMS', text: 'PIS account setup, Indian equity investing, and access to SEBI-registered PMS for ₹50L+ portfolios.', img: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Globe2, color: 'text-rose-600', title: 'DTAA Optimization', text: 'Double Taxation Avoidance benefits for UAE, Singapore — minimize TDS and claim credits.', img: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: RefreshCw, color: 'text-orange-600', title: 'Repatriation Planning', text: 'Structured repatriation of principal and gains back to your country of residence with full RBI compliance.', img: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Home, color: 'text-cyan-600', title: 'Real Estate & Loans', text: 'NRI home loans, property investment guidance, and rental income tax planning.', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];

  const whoFor = [
    'NRIs looking to invest in Indian markets securely',
    'Professionals across UAE, Singapore & Australia',
    'NRIs needing help with NRE/NRO account setup and DTAA',
    'Families wanting to repatriate funds compliantly',
    'High-Net-Worth NRIs looking for PMS or Real Estate investments',
  ];

  const faqs = [
    {
      q: 'Can NRIs invest in Indian mutual funds?',
      a: 'Yes, NRIs can invest in Indian mutual funds on both a repatriable basis (through NRE account) and non-repatriable basis (through NRO account). The process is 100% online after FATCA-compliant KYC. Note: mutual funds registered in the US and Canada have certain AMC restrictions due to FATCA — we help you identify and access the AMCs that accept investors from your country.'
    },
    {
      q: 'What is the difference between NRE and NRO accounts?',
      a: 'NRE (Non-Resident External) is for depositing foreign earnings in INR — fully repatriable, interest tax-free in India. NRO (Non-Resident Ordinary) is for Indian income (rent, dividends, pension) — taxable in India, repatriation capped at USD 1 million per financial year. Most NRIs need both. We help you decide how to split investments between them.'
    },
    {
      q: 'How is NRI taxation on mutual funds?',
      a: 'NRI mutual fund gains are generally subject to TDS at source in India. Under current rules (FY24-25), equity-oriented mutual funds attract LTCG at 12.5% on gains above ₹1.25 lakh per financial year (held 12+ months) and STCG at 20% (held under 12 months). Debt-oriented funds are taxed as per your applicable slab / special rates depending on holding period and the type of scheme. Under DTAA with your country of residence, you may claim credit for Indian tax paid. Tax rules can change — please confirm current rates with your CA before transacting.'
    },
    {
      q: 'Can I continue my existing SIPs after becoming an NRI?',
      a: 'Yes, but your status with the AMC must be updated from Resident to NRI, and your linked bank account must change to NRE or NRO. We handle the entire re-KYC and status change process, ensuring your SIPs continue uninterrupted.'
    },
    {
      q: 'How do I repatriate my investment returns abroad?',
      a: 'From your NRE account, principal and interest are fully repatriable without limit. From your NRO account, you can repatriate up to USD 1 million per financial year after submitting Form 15CA/15CB certified by a Chartered Accountant. We manage all documentation and bank coordination.'
    },
    {
      q: 'Is my money safe investing from abroad?',
      a: 'Yes — 100%. Your investments are held directly with the AMC or broker in your name. Money Compound never holds your funds. All transactions happen through regulated, AMFI-registered channels with bank-grade encryption, FATCA compliance and audited processes.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>NRI Mutual Fund Investing in India — Gulf, UAE, MEA | Money Compound</title>
        <meta name="description" content="Money Compound helps NRIs in the UAE, Gulf and wider MEA invest in Indian mutual funds — NRE / NRO / FCNR account setup support, video KYC, DTAA / TRC guidance, repatriation and FATCA / CRS compliance. AMFI ARN-140318." />
        <link rel="canonical" href="https://moneycompound.com/services/nri" />
        <meta property="og:title" content="NRI Mutual Fund Investing in India — Money Compound" />
        <meta property="og:url" content="https://moneycompound.com/services/nri" />
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
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">NRI Investment Services</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Invest in" className="block" />
              <SplitTextCharacters text="India." className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-xl font-medium font-['Inter'] mb-12">
              FEMA-compliant, tax-optimized, paperless investing for Non-Resident Indians across <span className="text-slate-950 font-bold border-b-2 border-brand-gold/30">UAE, Singapore, Australia</span> and 25+ countries.
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
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="NRI Investments"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>

            <div className="floating-element absolute -bottom-10 right-20 bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-premium border border-white/20 max-w-[280px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white">
                  <Globe size={20} />
                </div>
                <span className="font-bold text-slate-900">Global Reach</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Serving 500+ NRI families across 25+ countries with FEMA-compliant strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">NRI Services We Offer</h2>
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
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Your Reliable Mutual Fund Distributor Back Home.</h2>
            <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
            <div className="space-y-12">
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Global Presence</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  We serve 500+ NRI families across UAE, Saudi Arabia, Singapore, Australia, Germany, Hong Kong and beyond. Managing investments in India from abroad should not feel like paperwork and compliance headaches.
                </p>
              </div>
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Tax & Repatriation Focus</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  Every plan is FEMA, FATCA and CRS compliant, and every portfolio is structured to minimize Indian tax liability while maximizing long-term growth. We assist with DTAA, NRE/NRO accounts and repatriation.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-scale relative">
            <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
              <img src="https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="NRI Support" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
              <Quote className="text-brand-gold mb-6 w-10 h-10" />
              <p className="text-white text-lg font-medium leading-relaxed italic">
                &quot;Managing your portfolio in India shouldn&apos;t be constrained by geography.&quot;
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
              <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Stay Globally Connected.</h2>
              <p className="text-white text-base mb-12 font-medium">
                Book a free consultation to discuss your Indian investments, taxation, or repatriation needs.
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
