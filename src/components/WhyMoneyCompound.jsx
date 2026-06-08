import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Target, Search, Globe, Lock } from 'lucide-react'
import gsap from '../lib/gsap'

const features = [
  {
    icon: ShieldCheck,
    num: "1",
    title: 'We Don’t Charge Any Fees From Our Clients',
    desc: 'You invest in schemes — we earn from AMCs, not you.',
  },
  {
    icon: Target,
    num: "2",
    title: 'Objective-Aligned, Not Product-Centric',
    desc: 'We start with your life needs. Products follow the plan — not the other way around.',
  },
  {
    icon: Search,
    num: "3",
    title: 'Due Diligence-Led Approach',
    desc: 'Every scheme suggestion is backed by detailed evaluation and product-level due diligence.',
  },
  {
    icon: Globe,
    num: "4",
    title: 'NRI-Specialist Expertise',
    desc: 'FEMA, DTAA, FATCA and country-specific tax treatment handled end-to-end.',
  },
  {
    icon: Lock,
    num: "5",
    title: 'Secure & Digital',
    desc: 'Bank-grade encryption, paperless onboarding, real-time portfolio tracking.',
  }
]

const WhyMoneyCompound = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const titleRef = useRef(null)
  const railRef = useRef(null)
  const dragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false })

  useEffect(() => {
    // Title only — kept on GSAP since framer-motion handles the cards/line
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 overflow-hidden relative"
      style={{ background: 'linear-gradient(180deg, #f1f1f3 0%, #e6e6ea 100%)' }}
    >
      {/* Header */}
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <div className="text-[12px] font-black text-[#0a1733] uppercase tracking-[0.28em] mb-4">Why Money Compound</div>
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#0a1733] mb-5 leading-tight tracking-tight">
            A Partner, <br />
            Not Just a Platform
          </h2>
          <p className="text-lg text-[#0a1733]/80 leading-relaxed max-w-2xl mx-auto font-normal">
            We are process-driven, client-obsessed, and proudly transparent. Here&apos;s what sets us apart.
          </p>
        </div>
      </div>

      {/* Drag rail — horizontal, click-and-drag scroll */}
      <div
        ref={railRef}
        className="relative overflow-x-auto cursor-grab active:cursor-grabbing select-none why-rail"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={(e) => {
          const rail = railRef.current
          if (!rail) return
          dragRef.current.isDown = true
          dragRef.current.moved = false
          dragRef.current.startX = e.pageX - rail.offsetLeft
          dragRef.current.scrollLeft = rail.scrollLeft
        }}
        onMouseLeave={() => { dragRef.current.isDown = false }}
        onMouseUp={() => { dragRef.current.isDown = false }}
        onMouseMove={(e) => {
          const rail = railRef.current
          if (!rail || !dragRef.current.isDown) return
          e.preventDefault()
          const x = e.pageX - rail.offsetLeft
          const walk = (x - dragRef.current.startX) * 1.6
          rail.scrollLeft = dragRef.current.scrollLeft - walk
          if (Math.abs(walk) > 4) dragRef.current.moved = true
        }}
      >
        <style jsx>{`
          .why-rail::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Rail content — relative so the single full-width timeline line can be absolutely positioned across all cards */}
        <div className="relative inline-flex gap-6 lg:gap-8 px-6 lg:px-16 pb-6 min-w-full">
          {/* Full-width horizontal timeline line — static, edge-to-edge, no entrance animation */}
          <div
            className="timeline-line absolute h-[2px] bg-[#0a1733] left-0 right-0 z-0 pointer-events-none"
            style={{ top: '47px' }}
            aria-hidden="true"
          />

          {features.map((feature, i) => {
            const isDark = i % 2 === 1
            const cardBg = isDark ? 'bg-[#0a1733]' : 'bg-white'
            const titleColor = isDark ? 'text-white' : 'text-[#0a1733]'
            const descColor = isDark ? 'text-white' : 'text-[#0a1733]'
            const iconBg = isDark ? 'bg-white/10' : 'bg-[#0a1733]/[0.06]'
            const iconColor = isDark ? 'text-white' : 'text-[#0a1733]'
            return (
              <motion.div
                key={i}
                ref={el => (cardsRef.current[i] = el)}
                className="flex-shrink-0 w-[240px] sm:w-[260px] lg:w-[280px] relative z-10 flex flex-col items-center self-stretch"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.75,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {/* Number label */}
                <div className="text-[28px] font-black text-[#0a1733] tracking-tight leading-none mb-2">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Dot — thicker, center punches through the timeline line */}
                <div className="w-5 h-5 rounded-full bg-[#0a1733] relative z-10 ring-4 ring-[#f1f1f3]" />

                {/* Vertical drop line */}
                <div className="w-[2px] h-10 bg-[#0a1733]" />

                {/* Card — flex-1 so every card stretches to the tallest column height */}
                <div className={`w-full p-6 rounded-2xl ${cardBg} shadow-[0_18px_44px_rgba(10,26,47,0.18)] flex flex-col items-start text-left flex-1 min-h-[260px]`}>
                  <div className={`w-11 h-11 mb-4 rounded-xl ${iconBg} flex items-center justify-center`}>
                    <feature.icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className={`text-[16px] font-bold ${titleColor} leading-snug mb-3`}>
                    {feature.title}
                  </h3>
                  <p className={`text-[13.5px] leading-relaxed font-semibold ${descColor}`}>
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Drag hint — mobile/tablet only */}
      <div className="container mx-auto px-6 mt-6 flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.25em] text-[#0a1733]/55 lg:hidden">
        <span>← Drag to explore →</span>
      </div>
    </section>
  )
}

export default WhyMoneyCompound
