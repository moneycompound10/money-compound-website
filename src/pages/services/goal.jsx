import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, GraduationCap, Heart, Plane, Briefcase, TrendingUp,
  CheckCircle2, Sparkles, Plus, Minus, Target, Map, ArrowRight, Quote
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

export default function NeedBasedSelectionPage() {
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
    { icon: Home, color: 'text-blue-600', title: 'Home Purchase', text: 'Down-payment, loan planning, and full home purchase ready within 5-10 years.', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: GraduationCap, color: 'text-emerald-600', title: 'Child\'s Education', text: 'Indian and foreign education corpus with currency and inflation protection.', img: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Heart, color: 'text-purple-600', title: 'Child\'s Marriage', text: 'Long-term marriage corpus — typically 15-25 years of equity SIP.', img: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: TrendingUp, color: 'text-rose-600', title: 'Early Retirement / FIRE', text: 'Financial Independence, Retire Early — calculated to your target age and lifestyle cost.', img: 'https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Plane, color: 'text-orange-600', title: 'Travel & Sabbatical', text: 'Funded dream vacations, mid-career sabbaticals, and lifestyle milestones.', img: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Briefcase, color: 'text-cyan-600', title: 'Business / Venture', text: 'Seed capital for starting your own venture post-corporate life.', img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];

  const benefits = [
    'Stop guessing and start tracking your investing journey',
    'Calculate the future value of each milestone (inflation-adjusted)',
    'Determine the monthly SIP commitment needed for every milestone',
    'Shortlist suitable mutual fund schemes matched to your target timeline',
    'Implement annual step-ups to accelerate corpus building',
  ];

  const faqs = [
    {
      q: 'What is need-based scheme matching?',
      a: 'Need-based scheme matching is the practice of aligning mutual fund scheme selections with your investment time-horizon, cash-flow requirements, and risk tolerance. Instead of choosing schemes at random, every monthly SIP is matched to a specific timeline — like child\'s higher education in 15 years, retirement in 25 years, etc. This helps maintain long-term discipline and clarity.'
    },
    {
      q: 'How much should I save for my child\'s foreign education?',
      a: 'Assuming US undergraduate cost of ~₹1 Cr today (tuition + living) and 7% annual education inflation, a foreign education 15 years away will cost approximately ₹2.76 Cr. At 12% expected equity return, you would need a monthly SIP of around ₹55,000, or about ₹38,000 with a 10% annual step-up. Our target calculator gives you an exact number based on your child\'s age and target country.'
    },
    {
      q: 'Can I invest for multiple milestones at once?',
      a: 'Yes — most working-age families typically have 4-6 simultaneous goals (emergency fund, home, child\'s education, retirement, etc.). We help structure a consolidated SIP plan with each milestone earmarked in its own fund bucket, so you can track progress milestone-by-milestone. Any change to your investment mix is suggested in writing and executed only with your approval.'
    },
    {
      q: 'What is a step-up SIP and why does it matter?',
      a: 'A step-up SIP increases your monthly investment by a fixed % every year (typically 10%). This matches your rising income and significantly accelerates corpus building. Illustrative example: ₹20,000 flat SIP for 20 years at an assumed 12% = ₹1.99 Cr. Same ₹20,000 with 10% annual step-up = ₹4.14 Cr. Returns are illustrative only; actual returns depend on market conditions and are not guaranteed.'
    },
    {
      q: 'How often do you review scheme allocations?',
      a: 'Every need-based allocation is reviewed at least once a year to check progress vs target, discuss inflation-linked SIP step-ups, and respond to life changes (new child, job change, relocation). Any change to your investment mix is suggested in writing and executed only with your approval.'
    },
    {
      q: 'What if my target amount seems too large to reach?',
      a: 'That is exactly why structured planning matters. We break down large targets into manageable SIPs, use step-up strategies, suggest priority ranking if resources are tight, and in some cases suggest extending timelines. The point is clarity — you will know exactly what is achievable and what trade-offs exist.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Need-Based Mutual Fund Selection — SIP Strategy | Money Compound</title>
        <meta name="description" content="Need-based mutual fund selection from Money Compound. Map each time horizon — emergency fund, home, child's education, retirement — to its own AMFI-registered scheme bucket, with a written plan, periodic reviews and zero hidden fees." />
        <link rel="canonical" href="https://moneycompound.com/services/goal" />
        <meta property="og:title" content="Need-Based Mutual Fund Selection — Money Compound" />
        <meta property="og:url" content="https://moneycompound.com/services/goal" />
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
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Targeted Need Selection</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Need-Based" className="block" />
              <SplitTextCharacters text="Selection." className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-xl font-medium font-['Inter'] mb-12">
              Invest with purpose. We map your <span className="text-slate-950 font-bold border-b-2 border-brand-gold/30">life goals</span> — home, education, retirement — to exact financial instruments for guaranteed clarity.
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
                src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Need-Based Matching" 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>
            
            <div className="floating-element absolute -bottom-10 right-20 bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-premium border border-white/20 max-w-[280px]">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white">
                   <Target size={20} />
                 </div>
                 <span className="font-bold text-slate-900">Purposeful Investing</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Turn your dreams into funded, trackable milestones with a clear monthly SIP plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Milestones We Help You Select</h2>
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
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Don&apos;t Just Invest. Plan Your Life.</h2>
              <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
              <div className="space-y-12">
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Reverse Mapping</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Money without a goal is just a number. Money with a goal is freedom. We help you define, quantify and track every major milestone in your life — ensuring you have the right amount of money, at the right time.
                  </p>
                </div>
                <div className="animate-up">
                  <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Dynamic Adjustments</h4>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Life changes — and so should your plan. We adjust your goals for inflation, market volatility and personal life events (marriage, kids, career shifts) twice every year.
                  </p>
                </div>
              </div>
           </div>
           
           <div className="animate-scale relative">
              <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
                 <img src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Life Planning" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
                 <Quote className="text-brand-gold mb-6 w-10 h-10" />
                 <p className="text-white text-lg font-medium leading-relaxed italic">
                    &quot;Investing is not about how much money you have. It&apos;s about funding the life you want to live.&quot;
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="animate-up bg-slate-50 rounded-[60px] p-12 md:p-20 border border-slate-100">
           <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-12 font-['Playfair_Display']">Why It Works</h2>
           <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((item, idx) => (
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
                 <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Map Your Money.</h2>
                 <p className="text-white text-base mb-12 font-medium">
                   Don&apos;t just save. Map your money to your milestones and discover the exact SIP roadmap required.
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
