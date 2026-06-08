import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator } from 'lucide-react'
import Link from 'next/link'
import gsap from '../lib/gsap'

const FinalCTA = () => {
  const visualRef = useRef(null)
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const linePathRef = useRef(null)
  const fillPathRef = useRef(null)
  const barsRef = useRef([])
  const chipsRef = useRef([])
  const orbitsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Line chart draw-on-enter, then loop
      const line = linePathRef.current
      const fill = fillPathRef.current
      if (line && fill) {
        const len = line.getTotalLength()
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
        gsap.set(fill, { opacity: 0 })

        const lineTl = gsap.timeline({
          repeat: -1, repeatDelay: 1.8,
          scrollTrigger: { trigger: visualRef.current, start: 'top 85%' }
        })
        lineTl
          .to(line, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' })
          .to(fill, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.6')
          .to([line, fill], { opacity: 0.3, duration: 0.6, delay: 1.4, ease: 'power1.in' })
          .set(line, { strokeDashoffset: len, opacity: 1 })
          .set(fill, { opacity: 0 })
      }

      // 2. Vertical growth bars rising
      gsap.fromTo(barsRef.current,
        { scaleY: 0, transformOrigin: 'bottom' },
        {
          scaleY: 1, duration: 1.1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: visualRef.current, start: 'top 85%' }
        }
      )

      // 3. Coin chips drift in + idle float
      gsap.fromTo(chipsRef.current,
        { opacity: 0, scale: 0.6, y: 20 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.9, stagger: 0.18, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: visualRef.current, start: 'top 85%' }
        }
      )
      chipsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          duration: 3 + (i * 0.4),
          repeat: -1, yoyo: true, ease: 'sine.inOut'
        })
      })

      // 5. Orbits — slow continuous rotation
      orbitsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          rotate: i % 2 === 0 ? 360 : -360,
          duration: 60 + i * 20,
          repeat: -1, ease: 'none', transformOrigin: '50% 50%'
        })
      })

      // 6. Card starts at FULL SCREEN width touching both edges. On scroll-down
      //    the visible boundary pulls in from each side (clip-path inset).
      //    On scroll-up it expands back to full width. Text never reflows
      //    because the underlying content wrapper has its own fixed max-width.
      if (cardRef.current) {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
        cardRef.current.style.willChange = 'clip-path'
        gsap.fromTo(cardRef.current,
          { clipPath: 'inset(0px 0px 0px 0px round 0px)' },
          {
            clipPath: isMobile
              ? 'inset(16px 4vw 16px 4vw round 24px)'   // gentler on mobile (less visual disruption)
              : 'inset(32px 8vw 32px 8vw round 40px)',  // full shrink on desktop
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              end: 'bottom 20%',
              scrub: 0.8
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-[#334155] relative overflow-hidden">
      {/* cardRef = FULL-SCREEN-WIDTH white card; scroll shrinks visible boundary
          via clipPath inset, while inner content wrapper stays at fixed max width
          so text/drawing never reflows. */}
      <div
        ref={cardRef}
        className="bg-white border-y border-slate-200 relative w-full"
        style={{ clipPath: 'inset(0px 0px 0px 0px round 0px)' }}
      >
        {/* Inner content — fixed max width, always centered, never reflows */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            {/* ── LEFT: existing content, dark text on white ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[2px] bg-[#1d4ed8] rounded-full"></span>
                <span className="text-[13px] font-black text-[#1d4ed8] uppercase tracking-[0.3em]">Get Started</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#0a1733] mb-6 leading-tight tracking-tight">
                Ready to Compound <br />
                <span className="text-[#1d4ed8]">Your Portfolio?</span>
              </h2>
              <p className="text-lg lg:text-xl text-[#0a1733] font-semibold mb-10 max-w-lg leading-relaxed">
                Book a free 30-minute goal review with our team. No fees. No obligation. Just honest, professional guidance.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="https://vipulkhandelwal-moneycompound1.zohobookings.in/#/moneycompound2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0a1733] text-white hover:bg-[#1d4ed8] px-7 py-3.5 rounded-full text-[13px] font-black uppercase tracking-[0.2em] transition-colors duration-300 flex items-center gap-3"
                >
                  Book Free Review <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/calculators"
                  className="border-2 border-[#0a1733] text-[#0a1733] hover:bg-[#0a1733] hover:text-white px-7 py-3.5 rounded-full text-[13px] font-black uppercase tracking-[0.2em] transition-colors duration-300 flex items-center gap-3"
                >
                  Try Calculator <Calculator className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-x-8 gap-y-3 text-slate-700">
                <div className="text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8]"></span> Zero Hidden Fees
                </div>
                <div className="text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8]"></span> CA, CS, CFP
                </div>
                <div className="text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8]"></span> AMFI Registered
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: DARK NAVY box (apple-stage-indigo) containing the GSAP drawing ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full"
            >
              <div className="rounded-2xl apple-stage-indigo p-6 lg:p-8 overflow-hidden">
                <div ref={visualRef} className="relative w-full aspect-square max-w-[500px] mx-auto">
                  {/* soft radial glow */}
                  <div aria-hidden className="absolute inset-0 -z-10"
                       style={{ background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.22), transparent 65%)' }} />

                  {/* Orbit ring 1 (slow rotation) */}
                  <div ref={(el) => (orbitsRef.current[0] = el)} className="absolute inset-0 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-sky-300/25">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor"
                              strokeWidth="0.4" strokeDasharray="0.4 3" strokeLinecap="round" />
                    </svg>
                  </div>
                  {/* Orbit ring 2 */}
                  <div ref={(el) => (orbitsRef.current[1] = el)} className="absolute inset-[6%] pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-brand-gold/30">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor"
                              strokeWidth="0.3" strokeDasharray="0.2 2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Central SVG composition: rising line chart + bars */}
                  <svg viewBox="0 0 500 500" className="w-full h-full relative z-10">
                    <defs>
                      <linearGradient id="cta-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%"   stopColor="#7DD3FC" />
                        <stop offset="50%"  stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#FBBF24" />
                      </linearGradient>
                      <linearGradient id="cta-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#38BDF8" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="cta-bar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#1E40AF" />
                      </linearGradient>
                      <radialGradient id="cta-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"  stopColor="#FBBF24" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* dashed grid lines */}
                    {[120, 200, 280, 360].map((y) => (
                      <line key={y} x1="50" y1={y} x2="460" y2={y}
                            stroke="rgba(148,163,184,0.18)" strokeWidth="1" strokeDasharray="3 6" />
                    ))}

                    {/* rising bars (foundation) */}
                    {[
                      { x: 70,  h: 30 },
                      { x: 122, h: 60 },
                      { x: 174, h: 100 },
                      { x: 226, h: 150 },
                      { x: 278, h: 210 },
                      { x: 330, h: 270 },
                      { x: 382, h: 320 }
                    ].map((b, i) => (
                      <rect key={i}
                            ref={(el) => (barsRef.current[i] = el)}
                            x={b.x} y={400 - b.h} width="34" height={b.h} rx="5"
                            fill="url(#cta-bar)"
                            opacity={0.35 + i * 0.08} />
                    ))}

                    {/* area fill beneath line */}
                    <path
                      ref={fillPathRef}
                      d="M 50 360 L 100 330 L 160 290 L 220 240 L 280 195 L 340 145 L 400 95 L 460 60 L 460 400 L 50 400 Z"
                      fill="url(#cta-fill)"
                    />

                    {/* rising line chart (draw on enter, loop) */}
                    <path
                      ref={linePathRef}
                      d="M 50 360 L 100 330 L 160 290 L 220 240 L 280 195 L 340 145 L 400 95 L 460 60"
                      fill="none"
                      stroke="url(#cta-line)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ filter: 'drop-shadow(0 4px 12px rgba(56,189,248,0.45))' }}
                    />

                    {/* glowing end-point */}
                    <circle cx="460" cy="60" r="28" fill="url(#cta-glow)" />
                    <circle cx="460" cy="60" r="8"  fill="#FBBF24" />
                    <circle cx="460" cy="60" r="4"  fill="#FFFFFF" />

                    {/* baseline */}
                    <line x1="50" y1="400" x2="460" y2="400"
                          stroke="rgba(148,163,184,0.35)" strokeWidth="1.5" />
                  </svg>

                  {/* Floating trust-marker chips */}
                  {[
                    { label: 'AMFI Registered',         pos: 'top-2 -left-2 lg:-left-4',      tone: 'from-sky-400 to-blue-600' },
                    { label: 'CA · CS · CFP',       pos: 'top-1/3 -right-3 lg:-right-6',  tone: 'from-amber-300 to-amber-500' },
                    { label: '100% Paperless Onboarding', pos: 'bottom-24 -left-3 lg:-left-6',  tone: 'from-cyan-300 to-sky-500' }
                  ].map((c, i) => (
                    <div
                      key={i}
                      ref={(el) => (chipsRef.current[i] = el)}
                      className={`absolute ${c.pos} z-20 flex items-center gap-2 px-3.5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-[0_8px_28px_rgba(0,0,0,0.35)]`}
                    >
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${c.tone}`} />
                      <span className="text-[11.5px] font-extrabold text-white uppercase tracking-[0.18em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
