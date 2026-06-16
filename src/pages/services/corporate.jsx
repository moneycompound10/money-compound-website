import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Presentation, Users, Mic, Calculator, UserPlus,
  CheckCircle2, Sparkles, Plus, Minus, HeartHandshake, Building2, ArrowRight, Quote
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

export default function CorporateWorkshopsPage() {
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
    { icon: Presentation, color: 'text-blue-600', title: 'Financial Wellness Workshops', text: '60-90 minute sessions on investing, tax saving, insurance and debt — customized to employee demographics.', img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Users, color: 'text-emerald-600', title: 'CXO Investments Clinics', text: 'One-on-one confidential planning sessions for CXO and senior leadership.', img: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Mic, color: 'text-purple-600', title: 'Town Hall Sessions', text: 'Large-format (500+ attendee) townhall talks by our founder on investments, markets or investing psychology.', img: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: Calculator, color: 'text-rose-600', title: 'Tax Planning Clinics', text: 'Pre-March annual workshops to help employees choose old vs new regime and optimize Sec 80C/80D.', img: 'https://images.pexels.com/photos/3184318/pexels-photo-3184318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { icon: UserPlus, color: 'text-orange-600', title: 'New Joinee Onboarding', text: '30-minute onboarding module on financial basics — CTC, payslip, tax, first SIP — as part of your L&D curriculum.', img: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  ];

  const whoFor = [
    'IT / Tech Companies & Startups',
    'Consulting Firms & Banks',
    'BPOs & Service Enterprises',
    'Manufacturing Companies',
    'Educational Institutions & Universities',
  ];

  const faqs = [
    {
      q: 'What formats do you offer for corporate workshops?',
      a: 'We offer in-person, hybrid and fully virtual (Zoom/Teams) formats. Session lengths range from a 30-minute lunch-and-learn to full-day financial literacy bootcamps. All content is customized to your employee demographics, language preferences and business context.'
    },
    {
      q: 'Are your workshops free or paid?',
      a: 'We offer both models. Sponsored workshops (free for your company) are possible for specific topics where we may earn through optional follow-up engagements with interested employees. Paid workshops are priced per session or per audit-hour and come with zero product push. Your HR team decides the model; we deliver either way.'
    },
    {
      q: 'Do employees get one-on-one support after the workshop?',
      a: 'Yes. Every corporate engagement includes a free one-on-one consultation slot for every attendee who wants personalized guidance — at no additional cost to your company. Whether they ultimately invest with us or not is entirely their choice.'
    },
    {
      q: 'Can you customize content for our industry?',
      a: 'Absolutely. We tailor content for IT/tech (ESOPs, international postings, RSU), banking (restricted lists, vesting), consulting (variable pay), startups (liquidity events), and manufacturing (PF, gratuity, pension plans). Share your context and we will shape the workshop accordingly.'
    },
    {
      q: 'What languages do you deliver in?',
      a: 'English and Hindi as default. Regional languages (Marathi, Tamil, Telugu, Bengali, Punjabi) available for specific geographies — please ask.'
    },
    {
      q: 'Do you sign NDAs and ensure data confidentiality?',
      a: 'Yes. We routinely sign corporate NDAs, vendor agreements and data-handling commitments. Employee-level data is encrypted, confidential and never used for marketing without explicit consent.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white pt-[100px] pb-32 font-sans overflow-x-hidden perspective-stage">
      <Head>
        <title>Corporate Financial Wellness Workshops | Money Compound</title>
        <meta name="description" content="Live and virtual financial literacy workshops for corporate employees, led by CA, CS, CFP-qualified professionals. Improve retention, reduce financial stress and educate employees on need-aligned mutual fund investing." />
        <link rel="canonical" href="https://moneycompound.com/services/corporate" />
        <meta property="og:title" content="Corporate Financial Wellness Workshops — Money Compound" />
        <meta property="og:url" content="https://moneycompound.com/services/corporate" />
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
              <span className="text-slate-500 font-bold tracking-[0.3em] text-[11px] uppercase">Institutional Wellness</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black italic text-slate-950 mb-10 tracking-tighter leading-[1.1] font-['Playfair_Display']">
              <SplitTextCharacters text="Empower Your" className="block" />
              <SplitTextCharacters text="Workforce" className="text-brand-gold block" />
            </h1>

            <p className="animate-up text-slate-600 text-lg lg:text-xl leading-relaxed max-w-xl font-medium font-['Inter'] mb-12">
              Empower your employees with financial literacy. Elevate retention. Drive engagement. <span className="text-slate-950 font-bold border-b-2 border-brand-gold/30">Live and virtual workshops</span> led by CA, CS, CFP-qualified professionals.
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
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Corporate Workshop"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>

            <div className="floating-element absolute -bottom-10 right-20 bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-premium border border-white/20 max-w-[280px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white">
                  <Building2 size={20} />
                </div>
                <span className="font-bold text-slate-900">Institutional Trust</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Our corporate clients span industries but share one goal: elevating their workforce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-40">
        <div className="text-center mb-24">
          <h2 className="animate-up text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Our Corporate Offerings</h2>
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
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 font-['Playfair_Display']">Financial Wellness = Employee Wellness</h2>
            <div className="w-20 h-1.5 bg-brand-gold rounded-full mb-12" />
            <div className="space-y-12">
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">From First SIP to Tax Saving</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  We deliver interactive, due diligence-backed sessions in Hindi and English, in-person or on Zoom/Teams, for organizations ranging from 20-employee startups to 5,000+ employee enterprises.
                </p>
              </div>
              <div className="animate-up">
                <h4 className="text-xl font-black text-slate-950 mb-4 font-['Playfair_Display']">Highly Rated</h4>
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  Our workshops are jargon-free, highly practical, and consistently rated 4.8+/5 by attendees. Real financial education without the product push.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-scale relative">
            <div className="rounded-[60px] overflow-hidden shadow-premium aspect-square">
              <img src="https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Corporate Support" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-slate-950 p-10 rounded-[50px] shadow-2xl max-w-[300px] border border-white/10">
              <Quote className="text-brand-gold mb-6 w-10 h-10" />
              <p className="text-white text-lg font-medium leading-relaxed italic">
                &quot;Invest in the people who invest their time in your company.&quot;
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
              <h2 className="text-3xl font-black text-white mb-8 font-['Playfair_Display']">Partner with Us</h2>
              <p className="text-white text-base mb-12 font-medium">
                Reach out for our corporate deck, attendee testimonials, and pricing to plan your next wellness workshop.
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
