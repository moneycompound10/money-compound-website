import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Target,
  Layers,
  Heart,
  Smartphone,
  Star,
  Database,
  TrendingUp,
  ShieldCheck,
  SmartphoneIcon,
  Crown
} from 'lucide-react'
import gsap from 'gsap'

const reasons = [
  { icon: Layers, title: 'No Hidden or Platform Fees', desc: 'You invest in schemes — we earn from AMCs, not you.' },
  { icon: Target, title: 'Objective-Aligned, Not Product-Centric', desc: 'Life needs come first. Products follow the plan.' },
  { icon: TrendingUp, title: 'Due Diligence-Led Approach', desc: 'Scheme suggestions backed by in-house due diligence.' },
  { icon: Heart, title: 'NRI-Specialist Expertise', desc: 'FEMA, DTAA, FATCA and tax handled end-to-end.' },
  { icon: ShieldCheck, title: 'Secure & Digital', desc: 'Bank-grade encryption and paperless onboarding.' },
]

const AnimatedHeading = ({ text, className }) => {
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return
    const chars = textRef.current.querySelectorAll('.char')
    
    gsap.from(chars, {
      rotationY: -90,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.4)",
      transformOrigin: "50% 50% -20px",
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 90%',
      }
    })
  }, [])

  return (
    <span ref={textRef} className={className} style={{ perspective: '1000px' }}>
      {text.split('').map((char, i) => (
        <span key={i} className="char inline-block whitespace-pre">
          {char}
        </span>
      ))}
    </span>
  )
}

export default function WhyUsSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.fromTo(cardsRef.current,
      {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -40 : 40),
        rotation: (i) => (i % 2 === 0 ? -10 : 10),
        scale: 0.9
      },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.8)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-16 relative overflow-hidden bg-cover bg-fixed bg-center"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}
      data-scroll-section
    >
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] z-0" />
      <div className="absolute top-[10%] left-[-8%] w-[400px] h-[400px] bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-10 relative z-10">

        {/* Why Money Compound Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="h-[2px] w-12 bg-brand-green shadow-glow" />
            <AnimatedHeading 
              text="Why Money Compound" 
              className="text-[14px] font-black tracking-[0.5em] text-brand-green uppercase" 
            />
            <div className="h-[2px] w-12 bg-brand-green shadow-glow" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-5 bg-gradient-to-r from-[#86b6e8] to-[#52C19E] bg-clip-text text-transparent"
          >
            A Partner, <br />
            <span className="italic text-brand-green">Not Just a Platform.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="text-slate-100/70 text-lg lg:text-xl leading-relaxed font-bold"
          >
            We are process-driven, client-obsessed, and proudly transparent. <br />
            Here&apos;s what sets us apart.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">

          {/* Feature Cards Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <motion.div
                  key={i}
                  ref={el => cardsRef.current[i] = el}
                  className="card p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-3xl group transition-all duration-500 relative overflow-hidden flex flex-col gap-2 cursor-pointer h-full"
                >
                  <div className="light-sweep" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-brand-blue transition-all duration-500 flex-shrink-0 border border-white/20">
                      <r.icon size={22} className="relative z-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight leading-snug relative z-10 group-hover:text-brand-green transition-colors duration-500">{r.title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed pl-16">
                    {r.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Side Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-4 relative w-full max-w-[420px] mx-auto lg:ml-auto"
          >
            <div className="absolute -inset-12 bg-brand-green/[0.1] blur-[100px] rounded-full animate-pulse-slow pointer-events-none" />
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl bg-white/5 border border-white/20 group aspect-square">
              <div className="light-sweep" />
              <img
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop"
                alt="Financial Charts"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-3xl rounded-2xl border border-white/20">
                <div className="text-white text-[15px] font-black tracking-tight mb-1 italic">Client-First Vision</div>
                <p className="text-slate-300 text-sm font-semibold leading-relaxed">Dedicated to building long-term investment outcomes through disciplined, due diligence-led distribution.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
