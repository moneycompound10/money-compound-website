import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap, { ScrollTrigger } from '../lib/gsap'

export default function FounderSection() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const countRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Content Stagger with Scale
      gsap.fromTo(".founder-content > *",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // 2. Image Animation with Perspective Parallax
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 1.1, x: 80, rotateY: -10 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          rotateY: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // 3. Counting Effect
      gsap.fromTo(countRef.current,
        { innerText: 0 },
        {
          innerText: 1000,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-white overflow-hidden relative" 
    >
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px] -z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Content Area */}
          <div ref={contentRef} className="founder-content space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Meet Our Founder</span>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brand-navy">
                  Vipul Khandelwal
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                   {['CA', 'CS', 'CFP'].map(q => (
                     <span key={q} className="px-3 py-0.5 border border-slate-200 text-brand-navy text-[10px] font-bold rounded-full tracking-wider">{q}</span>
                   ))}
                   <div className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
                   <span className="text-brand-gold font-bold text-xs uppercase tracking-widest">18+ Yrs</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed">
                Vipul founded Money Compound with a simple conviction: Indian families deserve <span className="text-brand-navy font-bold">honest, due diligence-backed</span> investment guidance — not commission-driven selling.
              </p>

              <p className="text-slate-500 text-base leading-relaxed">
                A triple-qualified professional (Chartered Accountant, Company Secretary, Certified Financial Planner), he has personally guided over 1,000 families toward their life goals.
              </p>

              <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group">
                 <div className="text-4xl text-brand-gold/20 font-serif absolute top-6 left-6">&quot;</div>
                 <p className="text-brand-navy text-lg font-serif italic leading-relaxed relative z-10 pl-4">
                   Long-term investing isn&apos;t about chasing returns. It&apos;s about aligning money to meaning — and showing up every single year.
                 </p>
                 <div className="text-4xl text-brand-gold/20 font-serif absolute bottom-6 right-6 rotate-180">&quot;</div>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                href="/about"
                className="group inline-flex items-center gap-3 text-brand-navy font-bold hover:text-brand-gold transition-colors"
              >
                <span className="text-[11px] uppercase tracking-[0.2em]">Read Full Story</span>
                <span className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-brand-gold transition-colors">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>

          {/* Portrait Area */}
          <div ref={imageRef} className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] max-w-[450px] mx-auto">
              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-brand-gold/20 rounded-[3rem] -z-0 translate-x-4 translate-y-4" />
              <div className="absolute inset-0 bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border border-white">
                <img
                  src="/images/vipul_khandelwal.png"
                  alt="Vipul Khandelwal"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              {/* Stats Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 z-20">
                <div className="text-2xl font-bold text-brand-navy"><span ref={countRef}>0</span>+</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Families Guided</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
