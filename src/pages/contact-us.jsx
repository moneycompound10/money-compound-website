import React, { useLayoutEffect, useRef } from 'react';
import Head from 'next/head';
import gsap from 'gsap';
import {
  Phone, Mail, MessageSquare, MapPin, Clock, ShieldCheck
} from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Office', value: 'C-107, 1st Floor, Noida One, Sector 62, Noida, UP-201309' },
  { icon: Phone, label: 'Phone', value: '+91 84474 96480' },
  { icon: Mail, label: 'Email', value: 'helpdesk@moneycompound.com' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat : 9:30 AM – 7:00 PM IST' },
];

export default function ContactPage() {
  const mainRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 3D perspective on container
      gsap.set('.container-3d', { perspective: 1400 });

      // Hero image zoom-in
      gsap.set('.hero-zoom', { scale: 1.12 });
      gsap.to('.hero-zoom', { scale: 1, duration: 3.5, ease: 'power2.out' });

      // Left panel slides in from left with 3D rotate
      gsap.fromTo(leftRef.current,
        { x: -120, opacity: 0, rotateY: 30, transformOrigin: 'left center' },
        { x: 0, opacity: 1, rotateY: 0, duration: 1.6, ease: 'power4.out' }
      );

      // Right panel slides in from right with 3D rotate
      gsap.fromTo(rightRef.current,
        { x: 120, opacity: 0, rotateY: -30, transformOrigin: 'right center' },
        { x: 0, opacity: 1, rotateY: 0, duration: 1.6, ease: 'power4.out', delay: 0.2 }
      );

      // Info cards stagger
      gsap.from('.info-card', {
        y: 30, opacity: 0, stagger: 0.12, duration: 0.8,
        ease: 'back.out(1.4)', delay: 0.4
      });

      // Floating micro icons
      gsap.to('.floating-icon', {
        y: (i) => [-15, 12, -10, 14][i % 4],
        x: (i) => [-8, 8, -5, 6][i % 4],
        rotation: (i) => [-8, 8, -4, 5][i % 4],
        duration: (i) => 2.5 + (i % 3) * 0.7,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        stagger: { amount: 1.2, from: 'random' }
      });

      // Glowing orbs pulsate
      gsap.to('.glow-orb', {
        scale: 1.2, opacity: 0.6, duration: 3,
        repeat: -1, yoyo: true, ease: 'sine.inOut',
        stagger: { amount: 1, from: 'random' }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#ECF1EE] font-sans overflow-x-hidden pt-44">
      <Head>
        <title>Contact Money Compound — Free 30-min Goal Review | Noida</title>
        <meta name="description" content="Book a free 30-minute goal review with Money Compound — AMFI-registered Mutual Fund Distributor and IRDAI POSP based in Noida. WhatsApp +91-8447496480 or helpdesk@moneycompound.com." />
        <link rel="canonical" href="https://www.moneycompound.com/contact-us" />
        <meta property="og:title" content="Contact Money Compound — Free 30-min Goal Review" />
        <meta property="og:url" content="https://www.moneycompound.com/contact-us" />
        <meta property="og:image" content="https://www.moneycompound.com/og-cover.jpg" />
      </Head>

      {/* Institutional Hero Header */}
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center relative">
        {/* ROTATING DOTTED CIRCLE (Matches About Page) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-0 opacity-20 hero-zoom">
          <div className="w-[600px] h-[600px] animate-[spin_80s_linear_infinite] text-[#081229]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50" cy="50" r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="0.2 3.5"
                strokeLinecap="square"
              />
            </svg>
          </div>
        </div>

        <div className="relative z-10">
          <div className="inline-block animate-text-reveal text-sm font-black text-brand-gold uppercase tracking-[0.5em] mb-6">Connect With Us</div>
          <h1 className="animate-text-reveal text-6xl md:text-8xl font-black text-brand-navy mb-8 tracking-tighter leading-none">
            START THE <br />
            <span className="text-brand-gold italic">CONVERSATION</span>
          </h1>
          <p className="animate-text-reveal text-brand-navy text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-80">
            Share your financial goals and our expert team of CAs and CFPs will reach out within 24 hours.
          </p>
        </div>
      </div>

      {/* Main Content — lifted up to overlap hero */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 -mt-16 md:-mt-24 pb-32 relative z-10">
        <div className="container-3d flex flex-col lg:flex-row rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-white/60">

          {/* LEFT: Contact Info */}
          <div
            ref={leftRef}
            className="lg:w-5/12 p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 100% 0%, rgba(0,113,227,0.18) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 0% 100%, rgba(0,113,227,0.12) 0%, transparent 60%), #0a0a0c'
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck size={18} className="text-[#0071e3]" />
                <span className="text-white/80 font-semibold tracking-[0.28em] text-[10px] uppercase">Money Compound</span>
              </div>
              <h2 className="!text-white text-4xl md:text-5xl font-['Playfair_Display'] font-black mb-4 leading-tight">
                Reach <span className="!text-white underline decoration-[#0071e3]/50 decoration-2 underline-offset-4">Us</span>
              </h2>
              <p className="text-white/85 text-[15px] font-['Inter'] font-normal mb-8 max-w-sm leading-relaxed">
                Our client team is available Monday to Saturday. Reach us via any channel below.
              </p>

              {/* WhatsApp CTA (Moved up & enhanced) */}
              <div className="mb-8 p-5 bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/5 border border-[#25D366]/30 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/10 rounded-full blur-2xl group-hover:bg-[#25D366]/20 transition-all duration-500" />
                <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare size={18} className="text-[#25D366]" />
                      <span className="text-[#25D366] font-bold text-base">Prefer WhatsApp?</span>
                    </div>
                    <p className="text-white/90 text-xs font-['Inter']">Get instant responses from our professionals.</p>
                  </div>
                  <a
                    href="https://wa.me/918447496480"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-bold rounded-full hover:bg-[#20bd5a] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.4)] animate-pulse hover:animate-none"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    Chat Now
                  </a>
                </div>
              </div>

              {/* Contact Info — stacked rows for clear hierarchy + full text visibility */}
              <div className="flex flex-col gap-3 mb-2">
                {contactInfo.map((item, idx) => (
                  <div
                    key={idx}
                    className="info-card flex items-start gap-4 p-4 rounded-2xl bg-black/40 border border-white/15 hover:bg-black/55 hover:border-white/25 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white shrink-0">
                      <item.icon size={18} strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white/70 text-[10px] uppercase tracking-[0.2em] font-semibold mb-1">{item.label}</p>
                      <p className="text-white text-[14px] font-medium font-['Inter'] leading-snug break-words">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Zoho Contact Form (embedded) */}
          <div
            ref={rightRef}
            className="lg:w-7/12 p-10 lg:p-14 bg-white"
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="mb-8">
              <h3 className="text-slate-800 text-4xl font-['Playfair_Display'] font-black mb-3 leading-tight">
                Start the <span className="text-brand-navy">Conversation.</span>
              </h3>
              <p className="text-slate-500 text-base font-['Inter'] font-medium">
                Fill in the form and we&apos;ll get back to you within 24 hours — no sales pitch, just real advice.
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl"
                 style={{ backgroundColor: '#ffffff' }}>
              <iframe
                aria-label="Contact Us Now"
                src="https://zfrmz.in/aOpOxUwcUE3wgXBLr0hi"
                frameBorder="0"
                className="w-full h-[650px] bg-white"
                allowtransparency="true"
                style={{ border: 'none', backgroundColor: '#ffffff' }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
