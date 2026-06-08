import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Target, Briefcase, Shield, Smartphone,
  Users, CheckCircle2, Sparkles, Plus, Minus, Heart,
  ShieldCheck, Landmark, ArrowRight, Quote
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

export default function IndividualsPage() {
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
    { icon: TrendingUp, color: 'text-blue-600', title: 'Monthly SIP Plans', text: 'Due diligence-backed mutual fund SIPs aligned to your income, tax bracket and life milestones — from ₹500 to ₹5 lakh per month.' },
    { icon: Target, color: 'text-emerald-600', title: 'Milestone Mapping', text: 'Home, car, child\'s education, foreign vacation — every target with an exact monthly SIP and timeline.' },
    { icon: Briefcase, color: 'text-purple-600', title: 'Tax Saving', text: 'ELSS, PPF, NPS, Sec 80C/80D optimization and old-vs-new regime clarity — save ₹46,800+ every year.' },
    { icon: Shield, color: 'text-rose-600', title: 'Protection First', text: 'Right term insurance cover, health insurance and emergency corpus before we discuss any investment.' },
    { icon: Smartphone, color: 'text-orange-600', title: 'Digital Portfolio', text: '24/7 online portal and mobile app to track every rupee invested — across funds, insurance and NPS.' },
    { icon: Heart, color: 'text-cyan-600', title: 'Zero Hidden Fees', text: 'You invest in regular MF schemes. We are paid by AMCs — never by you. Full transparency, always.' },
  ];

  const whoFor = [
    'First-time investors who want to start their SIP journey the right way',
    'Salaried professionals (IT, consulting, banking, corporate, etc.)',
    'Young couples planning home, kids, education and retirement together',
    'Self-employed professionals — doctors, lawyers, CAs, consultants',
    'Anyone who has been mis-sold insurance as investment and wants a second opinion',
  ];

  const faqs = [
    {
      q: 'How much should I invest in SIP every month?',
      a: 'A widely cited thumb rule is 30% of your monthly take-home salary towards long-term investments, of which 60–80% can be equity SIPs depending on your age and risk profile. Our team helps you build a personalized SIP plan based on your income, goals, tax bracket and existing commitments — so your investments fund your goals without stressing your lifestyle.'
    },
    {
      q: 'Is SIP better than lump sum for individuals?',
      a: 'For most individuals, SIP is superior to lump sum investing because it averages your purchase cost (rupee-cost averaging), removes market-timing stress, and builds discipline. Lump sum works only when markets are clearly undervalued and you have a long horizon. For salaried investors with monthly income, SIPs match your cash flow and compound beautifully over 15–25 years.'
    },
    {
      q: 'How do I start investing with Money Compound?',
      a: 'Simply book a free 30-minute consultation. We will understand your income, goals, existing investments and risk profile, and prepare a written plan with specific SIP scheme suggestions, insurance cover, and tax-saving allocations. KYC and onboarding are 100% digital — most clients start investing within 48 hours.'
    },
    {
      q: 'What is the minimum investment amount?',
      a: 'You can start with an SIP as low as ₹500 per month. There is no minimum portfolio size to work with us. We believe financial guidance should be accessible to every earning individual — not just HNIs.'
    },
    {
      q: 'Do you charge any fees?',
      a: 'No. Money Compound is an AMFI-registered Mutual Fund Distributor. You invest in regular mutual fund schemes, and we are paid by the Asset Management Companies (AMCs) as standard distribution fee. You pay zero additional charges for our planning, reviews or portfolio support.'
    },
    {
      q: 'How often will my portfolio be reviewed?',
      a: 'We conduct detailed portfolio reviews twice a year and share a written health-check report. For clients with more complex portfolios, we offer quarterly reviews. Additionally, your dedicated point of contact is always available on WhatsApp and call for ad-hoc questions.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Mutual Fund Investing for Individuals & Families | Money Compound</title>
        <meta name="description" content="Need-aligned mutual fund investing for salaried individuals and families — SIP planning, tax-saving ELSS, insurance distribution under IRDAI POSP and retirement preparation. Led by CA, CS, CFP-qualified professionals." />
        <link rel="canonical" href="https://www.moneycompound.com/services/individuals" />
        <meta property="og:title" content="Mutual Fund Investing for Individuals — Money Compound" />
        <meta property="og:url" content="https://www.moneycompound.com/services/individuals" />
        <meta property="og:image" content="https://www.moneycompound.com/og-cover.jpg" />
      </Head>

      {/* Hero Section - Pinterest Premium Style */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full max-w-7xl mx-auto">
          <div className="text-left">
            <div className="animate-up flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-slate-300" />
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Personalised Investment Planning</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="For" className="block" />
              <SplitTextCharacters text="Individuals." className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-xl font-medium font-['Inter'] mb-12">
              Smart, structured investment planning for <span className="text-slate-950 font-bold border-b-2 border-brand-gold/30">salaried professionals, young families</span> and first-time investors — so every rupee you earn works as hard as you do.
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
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Premium Financial Planning" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>
            
            {/* Floating Pinterest-style Card */}
            <div className="floating-element absolute -bottom-10 right-20 bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-premium border border-white/20 max-w-[280px]">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white">
                   <ShieldCheck size={20} />
                 </div>
                 <span className="font-bold text-slate-900">Certified Professionals</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Our team is led by CA, CS, CFP-qualified professionals, backed by multiple NISM certifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Restored Original Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">What You Get</h2>
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

      {/* Who This Is For - Restored Original Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
           <div className="animate-up">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Who This Is For</h2>
              <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
              <div className="space-y-4">
                {whoFor.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <p className="text-slate-700 font-bold text-base font-['Inter']">{item}</p>
                  </div>
                ))}
              </div>
           </div>
           
           <div className="animate-scale relative">
              <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
                 <img src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="For Families" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
                 <Quote className="text-brand-gold mb-6 w-10 h-10" />
                 <p className="text-white text-lg font-medium leading-relaxed italic">
                    &quot;No hidden fees, no commission-driven selling — just honest guidance.&quot;
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ & CTA - Restored Original Content */}
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
                 <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Ready to Compound?</h2>
                 <p className="text-white text-base mb-12 font-medium">
                   Book a free 30-minute consultation. No sales pitch — just a clear financial plan built for your life.
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
