import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale, FileText, TrendingUp, Globe, Home, FileCheck,
  CheckCircle2, Sparkles, Plus, Minus, Landmark, ShieldCheck, ArrowRight, Quote
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

export default function TaxationPlanningPage() {
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
    { icon: Scale, color: 'text-blue-600', title: 'Old vs New Regime', text: 'Year-specific, slab-wise comparison — we calculate which regime saves you the most.', img: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: FileText, color: 'text-emerald-600', title: 'Section 80C & 80D', text: 'ELSS, PPF, NPS, EPF, life insurance + health insurance stacking — maximize ₹2.5 L deductions.', img: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: TrendingUp, color: 'text-purple-600', title: 'Capital Gains Planning', text: 'LTCG harvesting on equity mutual funds, STCG / loss set-off and use of the ₹1.25 lakh per-year equity LTCG exemption (FY24-25 rules; please confirm current limits).', img: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Globe, color: 'text-rose-600', title: 'NRI / DTAA', text: 'Double Taxation Avoidance credit claims, TDS reduction certificates (Form 13), resident return planning.', img: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Home, color: 'text-orange-600', title: 'Property & Real Estate', text: 'Sec 54/54F/54EC exemptions, indexation benefits, joint ownership structuring.', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: FileCheck, color: 'text-cyan-600', title: 'ITR Filing', text: 'ITR-1 to ITR-3 filing with capital gains, foreign income, NRI returns — handled by qualified CAs.', img: 'https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];

  const whoFor = [
    'Salaried professionals navigating Old vs New tax regimes',
    'High Net-Worth Individuals (HNIs) optimizing capital gains',
    'Non-Resident Indians (NRIs) needing DTAA and TRC support',
    'Individuals selling real estate looking for Sec 54/54EC exemptions',
    'Investors wanting to harvest tax losses and optimize portfolios',
  ];

  const faqs = [
    {
      q: 'Which is better: old or new tax regime?',
      a: 'The new regime works better for most young professionals and those with simple tax situations who do not claim major deductions. The old regime is better if you have significant deductions (HRA, 80C maxed, 80D, home loan interest, Sec 24, NPS). There is no one-size-fits-all — we run the exact calculation based on your income, investments, loans and rent to tell you which saves more. The answer often changes year-on-year.'
    },
    {
      q: 'How much can I save under Sec 80C?',
      a: 'Sec 80C allows a maximum deduction of ₹1.5 lakh per year. Eligible instruments include EPF, PPF, ELSS mutual funds, NSC, tax-saving FD, life insurance premium, home loan principal, tuition fees etc. An additional ₹50,000 under Sec 80CCD(1B) is available for NPS. Sec 80D (health insurance) provides another ₹25,000-75,000 depending on family and senior parent cover. Total addressable: ~₹2.75 lakh/year in deductions.'
    },
    {
      q: 'How are mutual fund capital gains taxed in India?',
      a: 'For equity funds (held 12+ months): LTCG taxed at 12.5% (for gains above ₹1.25 L p.a., FY24-25 rules). Short-term (under 12 months): 20%. For debt funds (invested after April 2023): taxed as per slab, no indexation benefit. Rules continue to evolve — we stay on top of every Finance Act and share the relevant updates with you.'
    },
    {
      q: 'How do NRIs claim DTAA benefits?',
      a: 'NRIs can claim DTAA (Double Taxation Avoidance Agreement) benefits by submitting a Tax Residency Certificate (TRC) from their country of residence, along with Form 10F, to the Indian payer (bank/AMC). This reduces TDS rates on interest and capital gains, and you claim credit in your resident country for Indian tax paid. The process is documentation-heavy — we handle it end-to-end.'
    },
    {
      q: 'Can I save tax when selling property?',
      a: 'Yes — multiple exemptions exist. Sec 54: reinvest LTCG in another residential property within 2 years (purchase) or 3 years (construction) → fully exempt. Sec 54EC: invest LTCG up to ₹50 L in NHAI/REC bonds within 6 months → exempt. Sec 54F: for non-residential property sale, reinvest full sale proceeds in residential property → exempt. We structure the optimal combination based on your proceeds and goals.'
    },
    {
      q: 'Do you help with ITR filing?',
      a: 'Yes. We file ITRs for salaried individuals, HNIs, business owners and NRIs — including complex returns with capital gains, foreign income, DTAA claims, multiple property sales and RSU / ESOP events. Your return is prepared by a qualified CA, reviewed twice, and delivered before the deadline with full documentation.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Tax-Smart Investing — ELSS, 80C, NRI / DTAA Support | Money Compound</title>
        <meta name="description" content="Tax-smart mutual fund investing — ELSS for Section 80C, capital-gains planning under the FY24-25 LTCG (₹1.25 lakh exemption) rules, NRI / DTAA support, and old-vs-new regime walkthroughs. Money Compound is an AMFI-registered MFD; tax filing is via partner CAs." />
        <link rel="canonical" href="https://moneycompound.com/services/tax" />
        <meta property="og:title" content="Tax-Smart Investing — Money Compound" />
        <meta property="og:url" content="https://moneycompound.com/services/tax" />
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
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Strategic Tax Management</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Taxation" className="block" />
              <SplitTextCharacters text="Services" className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-xl font-medium font-['Inter'] mb-12">
              Minimise your liability, keep more of what you earn. <span className="text-slate-950 font-bold border-b-2 border-brand-gold/30">Expert tax planning</span> for individuals, HNIs and NRIs — integrated with your investment portfolio.
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
                src="https://images.pexels.com/photos/5900226/pexels-photo-5900226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Taxation Services" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>
            
            <div className="floating-element absolute -bottom-10 right-20 bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-premium border border-white/20 max-w-[280px]">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white">
                   <Scale size={20} />
                 </div>
                 <span className="font-bold text-slate-900">Efficiency First</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                A rupee saved in taxes is a rupee earned in your portfolio. Structure your investments intelligently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Tax Services We Provide</h2>
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
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Tax Planning, Not Just Filing</h2>
              <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
              <div className="space-y-12">
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Integrated Strategy</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Most people treat tax as a year-end compliance task. We treat it as a year-round planning discipline. Structured tax planning can meaningfully improve your net post-tax outcome.
                  </p>
                </div>
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Old vs New Regime</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    We run detailed comparative simulations to help you choose the right tax regime each year, accounting for all your deductions and long-term financial goals.
                  </p>
                </div>
              </div>
           </div>
           
           <div className="animate-scale relative">
              <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
                 <img src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Tax Strategy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
                 <Quote className="text-brand-gold mb-6 w-10 h-10" />
                 <p className="text-white text-lg font-medium leading-relaxed italic">
                    &quot;Minimize your liability, maximize your portfolio.&quot;
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="animate-up bg-slate-50 rounded-[60px] p-12 md:p-20 border border-slate-100">
           <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-12 font-['Playfair_Display']">Who We Help</h2>
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
                 <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Stay Efficient</h2>
                 <p className="text-white text-base mb-12 font-medium">
                   Schedule a consultation with our CA-led tax planning team to optimize your income and returns.
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
