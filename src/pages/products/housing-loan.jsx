import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ShieldCheck, TrendingUp, Target, ArrowUpRight,
  Landmark, Globe, Percent, FileText, Key, GraduationCap,
  Briefcase, RefreshCcw, Building2, Sparkles, Plus, Minus, ArrowRight, Quote
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

export default function HousingLoanPage() {
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

  const loanTypes = [
    { title: 'Home Loan', icon: Home, color: 'text-blue-600', text: 'Fresh purchase, under-construction, balance transfer — from SBI, HDFC, ICICI, Axis, LIC HFC and more.', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { title: 'LAP (Loan Against Property)', icon: Building2, color: 'text-emerald-600', text: 'Unlock liquidity from your existing property — interest rates close to home loan, long tenure.', img: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { title: 'Education Loan', icon: GraduationCap, color: 'text-purple-600', text: 'Domestic & abroad education — covered up to ₹1.5 Cr without collateral for premier institutes.', img: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { title: 'Personal Loan', icon: Briefcase, color: 'text-orange-600', text: 'Unsecured loans for emergencies, weddings, home improvement — quickest disbursal, smart rate comparison.', img: 'https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { title: 'NRI Home Loan', icon: Globe, color: 'text-rose-600', text: 'Home loans for NRIs buying property in India — select banks offer favorable NRI rates.', img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { title: 'Balance Transfer', icon: RefreshCcw, color: 'text-cyan-600', text: 'Switch your existing loan to a lower rate — we calculate breakeven and arrange the transfer.', img: 'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];

  const faqs = [
    {
      q: 'How much home loan can I get?',
      a: 'Banks typically lend 60-75 times your monthly income as home loan (with up to 40% EMI-to-income ratio). For co-applicants, incomes are combined. LTV (loan-to-value) is typically 80-90% for under ₹75 L, 75% for ₹75 L-₹1.5 Cr, and 70% above. Eligibility also factors age, employer, existing liabilities and credit score.'
    },
    {
      q: 'Fixed rate vs floating rate — which is better?',
      a: 'In India, floating rate (linked to repo rate) is more common and usually cheaper over the tenure. Fixed rate offers predictability but is typically 100-150 bps higher. As a general guideline: floating if you have buffer in your budget, fixed for the first 3-5 years if you need certainty during the initial high-EMI years.'
    },
    {
      q: 'What tax benefits do I get on home loan?',
      a: 'Home loan interest: up to ₹2 lakh deduction under Sec 24 for self-occupied property (no limit for let-out property but subject to loss capping). Principal repayment: up to ₹1.5 lakh under Sec 80C. Additionally, first-time homebuyers can claim Sec 80EE / 80EEA for additional interest deduction (subject to conditions).'
    },
    {
      q: 'When should I do a loan balance transfer?',
      a: 'Balance transfer makes sense when: (a) new lender offers rate lower by 0.5%+, (b) you have 3+ years of tenure left, and (c) processing fee + transfer cost does not exceed 6 months of interest savings. We calculate breakeven to confirm if the switch genuinely saves money.'
    },
    {
      q: 'Should I prepay my home loan?',
      a: 'Generally yes for peace of mind, but with nuance. If your post-tax loan rate is lower than your expected equity MF return, investing beats prepaying over long horizons. Many smart borrowers do both: prepay a portion with bonuses while keeping monthly SIPs running. We run the math for your specific numbers.'
    },
    {
      q: 'Do you charge fees for loan arrangement?',
      a: 'No. The lender pays us a standard origination fee for successful loan disbursal. You pay zero additional charges to Money Compound. Processing fees and documentation charges are paid directly to the lender, fully disclosed upfront.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Loan Facilitation — Home, LAP, Education & NRI Loans | Money Compound</title>
        <meta name="description" content="Home, LAP, Education and NRI loan facilitation through partner banks and NBFCs. Sanction terms, interest rate and processing are governed by the underlying lender. Money Compound is a referral / DSA facilitator." />
        <link rel="canonical" href="https://moneycompound.com/products/housing-loan" />
        <meta property="og:title" content="Loan Facilitation — Money Compound" />
        <meta property="og:url" content="https://moneycompound.com/products/housing-loan" />
        <meta property="og:image" content="https://moneycompound.com/og-cover.jpg" />
      </Head>

      {/* Hero Section - Pinterest Premium Style */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center px-6 md:px-12 lg:px-24 mb-32 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="flex flex-col items-center text-center relative z-10 w-full max-w-4xl mx-auto">
          <div className="animate-up flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-slate-300" />
            <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Premium Credit Solutions</span>
            <div className="h-[2px] w-12 bg-slate-300" />
          </div>

          <h1 className="text-5xl lg:text-6xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
            <SplitTextCharacters text="Loans &amp;" className="block" />
            <SplitTextCharacters text="Credit" className="text-brand-gold block" />
          </h1>

          <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium font-['Inter'] mb-12">
            Best rates from <span className="text-slate-950 font-bold border-b-2 border-brand-gold/30">30+ banks and NBFCs</span>, paperless processing, and unbiased comparison - across home, LAP, education, personal and NRI loans.
          </p>

          <div className="animate-up flex flex-wrap gap-6 justify-center">
            <Link href="/contact-us" className="px-10 py-5 bg-brand-navy text-white rounded-full font-bold text-[13px] hover:bg-brand-gold transition-all flex items-center gap-3 group shadow-xl uppercase tracking-widest">
              Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Loan Types Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Our Credit Offerings</h2>
          <div className="animate-up w-24 h-1.5 bg-gradient-to-r from-brand-gold to-slate-200 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loanTypes.map((item, idx) => (
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

      {/* Core Description - Replaced with Pinterest style Split Card */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="animate-up">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Borrow Smart. Pay Less Interest.</h2>
            <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
            <div className="space-y-12">
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Rate Negotiation</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  The difference between a good and bad loan can mean lakhs of rupees over the tenure. A 0.5% rate difference on a ₹50 L home loan is ₹3.5 L+ over 20 years. Money Compound helps you negotiate better terms.
                </p>
              </div>
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">End-to-End Support</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  From eligibility check to disbursement — paperless processing with full documentation support and bank co-ordination handled by our team.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-scale relative">
            <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
              <img src="/images/housing_loan_hero.png" alt="Housing Loan" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
              <Quote className="text-brand-gold mb-6 w-10 h-10" />
              <p className="text-white text-lg font-medium leading-relaxed italic">
                &quot;The right loan, at the right rate, structured the right way.&quot;
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
              <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Need a Loan?</h2>
              <p className="text-white text-base mb-12 font-medium">
                We compare across 30+ lenders so you get the best deal — with zero broker fees and complete transparency.
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
