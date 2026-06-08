import React, { useEffect } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react'
import ProfessionalHeroImage from './ProfessionalHeroImage'

const Hero = () => {
  useEffect(() => {
    const chars = SplitType.create(".text", { types: "chars" });
    gsap.from(chars.chars, {
      rotationY: -90,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "back.out(1.4)",
      transformOrigin: "50% 50% -20px"
    });

    return () => {
      if (chars.revert) chars.revert();
    };
  }, []);
  return (
    <section className="w-full bg-[#020406] min-h-[750px] flex items-center relative overflow-hidden">
      {/* Premium Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] right-[15%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 bg-[#c9a04d]" />
        <div className="absolute bottom-[25%] left-[15%] w-[350px] h-[350px] rounded-full blur-[120px] opacity-10 bg-white" />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="max-w-[1400px] mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-20 relative z-10">
        {/* Left Side Content */}
        <div className="pl-4 md:pl-12 slide-up-reveal">
          <div className="flex items-center gap-4 mb-10">
            <span className="h-[1px] w-12 bg-[#c9a04d] rounded" />
            <span className="text-[12px] font-bold tracking-[0.4em] uppercase text-[#c9a04d]">
              OUR INVESTMENT STRATEGY
            </span>
          </div>

          <h1 className="text text-white text-6xl md:text-8xl font-black leading-[0.92] tracking-tighter mb-8" style={{ perspective: "1000px" }}>
            MUTUAL<br/>FUNDS
          </h1>
          <h2 className="text-white/90 text-2xl md:text-3xl mb-12 font-light tracking-wide italic" style={{ fontFamily: 'Georgia, serif' }}>
            &quot;Diversify. Multiply. Prosper&quot;
          </h2>
          
          <div className="flex flex-wrap items-center gap-6">
            <button className="group relative overflow-hidden bg-[#c9a04d] text-[#020406] px-12 py-5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(201,160,77,0.3)]">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10">Discover Funds</span>
            </button>
            <button className="text-white border border-white/10 px-12 py-5 rounded-full font-bold text-sm hover:bg-white/5 transition-all backdrop-blur-md">
              Contact Strategy Team
            </button>
          </div>
        </div>

        {/* Right Side - Cinematic Visual */}
        <div className="relative flex justify-center items-center h-[450px] lg:h-[600px] slide-right-reveal">
          <div className="relative w-full h-full max-w-[650px]">
            <ProfessionalHeroImage src="/hero-1.png" active={true} />
            
            {/* Contextual Stats */}
            <div className="absolute -top-6 -right-6 glass-dark rounded-[2rem] px-8 py-6 animate-float border border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Historical Success</div>
              <div className="text-3xl font-black text-[#c9a04d]">99.9%</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Indicators */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 cursor-pointer hidden md:flex flex-col gap-8 z-20">
        <div className="w-[1px] h-32 bg-white/10 relative">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-[#c9a04d]" />
        </div>
      </div>

      <style jsx>{`
        .slide-up-reveal { animation: slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .slide-right-reveal { animation: slideRight 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </section>
  )
}

export default Hero
