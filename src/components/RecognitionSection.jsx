import React, { useEffect, useRef } from 'react'
import { Award, ShieldCheck, Star, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import gsap, { ScrollTrigger } from '../lib/gsap'

const recognitionData = [
  {
    icon: Award,
    title: 'AMFI Registered MFD',
    sub: 'ARN-140318',
    desc: 'Official Mutual Fund Distributor registration.'
  },
  {
    icon: Star,
    title: 'FPSB Certified',
    sub: 'CFP Credential',
    desc: 'Global benchmark for excellence in financial planning.'
  },
  {
    icon: ShieldCheck,
    title: 'Recognised Distribution Practice',
    sub: 'Regional Recognition',
    desc: 'Acknowledged for our process-led distribution approach.'
  },
  {
    icon: CheckCircle,
    title: 'ISO 27001 Compliant',
    sub: 'Data Security',
    desc: 'Ensuring 100% security for your financial data.'
  }
]

export default function RecognitionSection() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Title Entrance (Robust without SplitType)
      gsap.fromTo(".recognition-title-part", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.recognition-title-container',
            start: "top 85%",
          }
        }
      );

      // 2. Card Entrance Sequence
      gsap.fromTo(".recognition-card", 
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.9,
          rotateX: -15 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // 3. Floating Parallax Blobs
      const blobs = gsap.utils.toArray('.recognition-blob');
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          y: i % 2 === 0 ? -100 : 100,
          x: i % 2 === 0 ? 50 : -50,
          rotation: 360,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Tilt Effect
  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (card) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-[#0B1121] relative border-t border-slate-800" 
      data-scroll-section
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 overflow-visible">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-800/50 rounded border border-slate-700 mb-6">
            <Award size={14} className="text-[#3B82F6]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-300 uppercase">Recognition</span>
          </div>
          <div className="recognition-title-container overflow-visible">
            <h2 className="recognition-title-part text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Awards & <span className="text-[#3B82F6]">Certifications</span>
            </h2>
          </div>
          <div className="w-16 h-1 bg-[#3B82F6] mx-auto mt-6 rounded-full"></div>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recognitionData.map((award, i) => (
            <div
              key={i}
              className="recognition-card group relative bg-slate-800/80 p-8 rounded-xl border border-slate-700 hover:border-[#3B82F6]/50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-lg bg-slate-900 flex items-center justify-center text-[#3B82F6] mb-6 group-hover:bg-[#3B82F6] group-hover:text-white transition-colors duration-300 shadow-md relative z-10">
                <award.icon size={26} strokeWidth={2} />
              </div>

              <div className="relative z-10">
                <h4 className="text-white text-lg font-bold tracking-tight leading-snug mb-2 group-hover:text-[#3B82F6] transition-colors duration-300">
                  {award.title}
                </h4>
                <div className="inline-block px-2 py-1 bg-slate-900 rounded border border-slate-700 mb-4">
                  <span className="text-[#3B82F6] text-[10px] font-bold uppercase tracking-wider">
                    {award.sub}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed transition-all duration-500">
                  {award.desc}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ArrowRight size={14} className="text-white/40" />
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA for Section */}
        <div className="mt-24 text-center">
          <Link 
            href="/certifications"
            className="group relative inline-flex items-center gap-6 px-12 py-6 bg-white text-slate-950 font-black rounded-3xl hover:bg-[#2C78C5] hover:text-white transition-all duration-500 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            <span className="relative z-10 uppercase tracking-widest text-xs">Verify All Credentials</span>
            <div className="absolute inset-0 bg-[#52C19E] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
