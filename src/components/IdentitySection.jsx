import React, { useEffect, useRef } from 'react'
import { ShieldCheck, Eye, Target, Globe, Heart } from 'lucide-react'
import gsap, { ScrollTrigger } from '../lib/gsap'

const steps = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To spread financial literacy among people to achieve financial freedom in their life.',
    label: 'MISSION'
  },
  {
    icon: Globe,
    title: 'Our Vision',
    desc: 'To help our clients in creating wealth to live a happy and fulfilled life.',
    label: 'VISION'
  },
  {
    icon: Heart,
    title: 'Our Values',
    desc: 'Radical transparency, client-first philosophy, and professional discipline.',
    label: 'VALUES'
  }
]

// Single staircase-up SVG path: 3 levels for Mission, Vision, Values
const FLOW_PATH = 'M 80 320 L 350 320 L 430 200 L 770 200 L 850 80 L 1120 80'
// Approx node positions on the path (x,y) used to position the markers above
const NODES = [
  { x: 250, y: 320 },  // Mission
  { x: 600, y: 200 },  // Vision
  { x: 980, y: 80 }   // Values
]

const IdentitySection = () => {
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const pathRef = useRef(null)
  const count1Ref = useRef(null)
  const count2Ref = useRef(null)
  const nodesRef = useRef([])
  const desktopCardsRef = useRef([])
  const mobileCardsRef = useRef([])
  const titleRef = useRef(null)
  const visualRef = useRef(null)
  const visualDonutRef = useRef(null)
  const visualBarsRef = useRef([])
  const visualBadgesRef = useRef([])
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })

      // Stats Counting
      gsap.fromTo(count1Ref.current, { innerText: 0 }, {
        innerText: 18, duration: 2, snap: { innerText: 1 },
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      })
      gsap.fromTo(count2Ref.current, { innerText: 0 }, {
        innerText: 100, duration: 2, snap: { innerText: 1 },
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      })

      // Path draw via stroke-dashoffset, scrubbed
      const path = pathRef.current
      if (path) {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: 0.6
          }
        })
      }

      // Nodes light up at staggered scroll positions
      nodesRef.current.forEach((node, i) => {
        if (!node) return
        gsap.fromTo(node,
          { scale: 0.4, opacity: 0 },
          {
            scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)',
            scrollTrigger: {
              trigger: stageRef.current,
              start: `top+=${i * 80} 60%`,
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Desktop cards animation
      desktopCardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: stageRef.current,
              start: `top+=${i * 70} 65%`,
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Mobile cards animation
      mobileCardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // ─── REPLACEMENT VISUAL: scroll-triggered allocation visual ───
      // 1. Donut segments draw in with stagger
      const donut = visualDonutRef.current
      if (donut) {
        const segs = donut.querySelectorAll('.alloc-seg')
        segs.forEach((seg) => {
          const len = seg.getTotalLength()
          gsap.set(seg, { strokeDasharray: len, strokeDashoffset: len })
        })
        gsap.to(segs, {
          strokeDashoffset: 0,
          duration: 1.4,
          stagger: 0.25,
          ease: 'power3.out',
          scrollTrigger: { trigger: visualRef.current, start: 'top 80%' }
        })
        // slow continuous rotation of the entire donut group
        gsap.to(donut, { rotate: 360, duration: 60, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      }

      // 2. Bars rise on scroll
      gsap.fromTo(visualBarsRef.current,
        { scaleY: 0, transformOrigin: 'bottom' },
        {
          scaleY: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: visualRef.current, start: 'top 80%' }
        }
      )

      // 3. Floating badge chips fade/scale in with stagger
      gsap.fromTo(visualBadgesRef.current,
        { opacity: 0, scale: 0.7, y: 12 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.6)',
          scrollTrigger: { trigger: visualRef.current, start: 'top 80%' }
        }
      )

      // idle floating motion for the badge chips
      visualBadgesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          y: i % 2 === 0 ? -8 : 8,
          duration: 2.8 + (i * 0.3),
          repeat: -1, yoyo: true, ease: 'sine.inOut'
        })
      })

      // Performance/XIRR metric counter removed per SEBI/AMFI norms.

      // Card starts at FULL screen width touching both edges. On scroll-down
      // the visible boundary pulls in from each side (clip-path inset). On
      // scroll-up it expands back to full width. Text never reflows because
      // the inner content wrapper has its own fixed max-width.
      if (cardRef.current) {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
        cardRef.current.style.willChange = 'clip-path'
        gsap.fromTo(cardRef.current,
          { clipPath: 'inset(0px 0px 0px 0px round 0px)' },
          {
            clipPath: isMobile
              ? 'inset(16px 4vw 16px 4vw round 24px)'
              : 'inset(32px 8vw 32px 8vw round 40px)',
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

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative mt-16 md:mt-20">
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-24 lg:py-32 bg-stage-dove"
      >
        {/* cardRef = FULL screen width white card; scroll shrinks visible
            boundary via clipPath inset. Inner wrapper keeps content centered
            at fixed max-width so text never reflows. */}
        <div
          ref={cardRef}
          className="relative z-10 w-full bg-white border-y border-slate-200"
          style={{ clipPath: 'inset(0px 0px 0px 0px round 0px)' }}
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
          {/* Top Row: Left Column (Heading + 2 Boxes), Right Column (Credit Assessment SVG) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 lg:mb-20">
            {/* Left Column (Span 7) */}
            <div className="lg:col-span-7">
              <div ref={titleRef} className="text-left mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-[2px] bg-brand-gold/40 rounded-full" />
                  <span className="text-[12px] font-black text-brand-gold uppercase tracking-[0.25em]">Our Foundation</span>
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-navy mb-6 leading-tight tracking-tight">
                  Investing Built on <br />
                  <span className="gold-gradient">Ethics &amp; Expertise</span>
                </h2>
                <p className="text-lg lg:text-xl text-[#0a1733] leading-relaxed font-semibold max-w-xl tracking-tight">
                  A collective of CA, CS, and CFP professionals dedicated to the financial security of Individuals, NRIs, HNIs, and retirees — zero hidden charges.
                </p>
              </div>

              {/* TWO SMALL HERITAGE BOXES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
                <div className="glass-card p-4 px-5 flex items-center gap-4 border-2 border-[#0a1733]/25 hover:border-[#1d4ed8]/70 transition-all duration-300 group shadow-md hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <span ref={count1Ref}>18</span>+
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-[#1d4ed8] uppercase tracking-[0.22em] mb-1">Years of Trust</div>
                    <div className="text-[16px] text-[#0a1733] font-bold mb-1 leading-snug">Proven Resilience</div>
                    <div className="text-[13px] text-[#334155] leading-relaxed font-semibold">Navigating market cycles with proven resilience.</div>
                  </div>
                </div>

                <div className="glass-card p-4 px-5 flex items-center gap-4 border-2 border-[#0a1733]/25 hover:border-[#1d4ed8]/70 transition-all duration-300 group shadow-md hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-900/20 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <span ref={count2Ref}>100</span>%
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-[#1d4ed8] uppercase tracking-[0.22em] mb-1">Transparency</div>
                    <div className="text-[16px] text-[#0a1733] font-bold mb-1 leading-snug">100% Transparent</div>
                    <div className="text-[13px] text-[#334155] leading-relaxed font-semibold">Zero hidden fees, zero conflict of interest.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Span 5): Allocation visual — GSAP scroll animations, light theme */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div ref={visualRef} className="relative w-full max-w-[460px] lg:max-w-[500px] aspect-square">
                {/* soft halo behind */}
                <div aria-hidden className="absolute inset-0 -z-10"
                     style={{ background: 'radial-gradient(circle at 50% 55%, rgba(56,189,248,0.18), transparent 65%)' }} />

                {/* outer rotating dotted ring (subtle) */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full animate-[spin_90s_linear_infinite] text-sky-700/30">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="48"
                              fill="none" stroke="currentColor"
                              strokeWidth="0.6" strokeDasharray="0.25 2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* central donut chart + bars */}
                <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
                  <defs>
                    <linearGradient id="seg1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%"  stopColor="#1E40AF" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                    <linearGradient id="seg2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%"  stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient id="seg3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%"  stopColor="#7DD3FC" />
                      <stop offset="100%" stopColor="#BAE6FD" />
                    </linearGradient>
                    <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"  stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>

                  {/* donut group (rotates) */}
                  <g ref={visualDonutRef} style={{ transformOrigin: '200px 180px' }}>
                    {/* base ring (faint) */}
                    <circle cx="200" cy="180" r="78" fill="none" stroke="rgba(37,99,235,0.08)" strokeWidth="22" />
                    {/* 3 colored segments drawn on scroll */}
                    <circle className="alloc-seg" cx="200" cy="180" r="78" fill="none"
                            stroke="url(#seg1)" strokeWidth="22" strokeLinecap="round"
                            pathLength="100" strokeDasharray="55 100" transform="rotate(-90 200 180)" />
                    <circle className="alloc-seg" cx="200" cy="180" r="78" fill="none"
                            stroke="url(#seg2)" strokeWidth="22" strokeLinecap="round"
                            pathLength="100" strokeDasharray="28 100" strokeDashoffset="-55" transform="rotate(-90 200 180)" />
                    <circle className="alloc-seg" cx="200" cy="180" r="78" fill="none"
                            stroke="url(#seg3)" strokeWidth="22" strokeLinecap="round"
                            pathLength="100" strokeDasharray="17 100" strokeDashoffset="-83" transform="rotate(-90 200 180)" />
                  </g>

                  {/* Centre area intentionally left blank — performance/XIRR badge removed per SEBI/AMFI norms */}

                  {/* mini growth bars below the donut */}
                  <g transform="translate(0, 0)">
                    {[
                      { x: 96,  y: 326, h: 18 },
                      { x: 124, y: 310, h: 34 },
                      { x: 152, y: 290, h: 54 },
                      { x: 180, y: 274, h: 70 },
                      { x: 208, y: 254, h: 90 },
                      { x: 236, y: 238, h: 106 },
                      { x: 264, y: 222, h: 122 },
                      { x: 292, y: 204, h: 140 }
                    ].map((b, i) => (
                      <rect key={i}
                            ref={(el) => (visualBarsRef.current[i] = el)}
                            x={b.x} y={b.y} width="18" height={b.h} rx="3"
                            fill="url(#bar-grad)" opacity={0.5 + i * 0.06} />
                    ))}
                    <line x1="80" y1="346" x2="320" y2="346"
                          stroke="rgba(37,99,235,0.25)" strokeWidth="1" strokeDasharray="2 4" />
                  </g>
                </svg>

                {/* Floating trust badges */}
                {[
                  { label: 'SEBI ✓',  pos: 'top-2 -left-2 lg:-left-6',   tone: 'from-blue-600 to-sky-400' },
                  { label: 'AMFI ✓',  pos: 'top-24 -right-3 lg:-right-6', tone: 'from-sky-500 to-cyan-400' },
                  { label: 'CFP · CA · CS', pos: 'bottom-10 -left-2 lg:-left-8', tone: 'from-indigo-600 to-blue-500' }
                ].map((b, i) => (
                  <div
                    key={i}
                    ref={(el) => (visualBadgesRef.current[i] = el)}
                    className={`absolute ${b.pos} z-20 flex items-center gap-2 px-3.5 py-2 bg-white/95 backdrop-blur-md rounded-full border border-slate-200 shadow-lg`}
                  >
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${b.tone}`} />
                    <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.18em]">{b.label}</span>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* ─── STAGE: pinned canvas with path + nodes (Mission, Vision, Values) ─── */}
          <div ref={stageRef} className="relative max-w-6xl mx-auto">
            {/* SVG canvas (hidden on mobile, replaced by simple vertical stepper) */}
            <div className="relative hidden md:block" style={{ aspectRatio: '1200 / 400' }}>
              <svg viewBox="0 0 1200 400" className="absolute inset-0 w-full h-full" aria-hidden>
                <defs>
                  <linearGradient id="flowLine" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%"  stopColor="#1E40AF" />
                    <stop offset="50%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                  <pattern id="flowGrid" width="60" height="56" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 56" fill="none" stroke="rgba(15,23,42,0.04)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="1200" height="400" fill="url(#flowGrid)" />

                {/* base track (dim) */}
                <path
                  d={FLOW_PATH}
                  fill="none"
                  stroke="rgba(37, 99, 235, 0.15)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* progress (drawn on scroll) */}
                <path
                  ref={pathRef}
                  d={FLOW_PATH}
                  fill="none"
                  stroke="url(#flowLine)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 6px 14px rgba(37,99,235,0.35))' }}
                />

                {/* nodes */}
                {NODES.map((n, i) => (
                  <g key={i} ref={(el) => (nodesRef.current[i] = el)} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
                    <circle cx={n.x} cy={n.y} r="14" fill="white" stroke="url(#flowLine)" strokeWidth="3" />
                    <circle cx={n.x} cy={n.y} r="5" fill="#2563EB" />
                  </g>
                ))}
              </svg>

              {/* cards floated above each node */}
              {steps.map((s, i) => {
                const n = NODES[i]
                // Convert svg coords (1200x400) to % for absolute positioning
                const leftPct = (n.x / 1200) * 100
                const topPct  = (n.y / 400) * 100
                return (
                  <div
                    key={i}
                    ref={(el) => (desktopCardsRef.current[i] = el)}
                    className="absolute"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: 'translate(-50%, -155%)',
                      width: 'min(220px, 20vw)'
                    }}
                  >
                    <div
                      className="rounded-xl p-3 border border-[#1d4ed8]/25"
                      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 60%, #eff6ff 100%)' }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-7 h-7 rounded-md bg-[#1d4ed8] flex items-center justify-center flex-shrink-0">
                          <s.icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                          <div className="text-[9px] font-black text-[#1d4ed8] tracking-[0.22em] uppercase">{s.label}</div>
                          <div className="text-[13px] font-extrabold text-[#0a1733] leading-tight">{s.title}</div>
                        </div>
                      </div>
                      <p className="text-[11.5px] text-[#0a1733] leading-[1.45] font-semibold">{s.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Mobile stepper */}
            <div className="md:hidden space-y-5">
              {steps.map((s, i) => (
                <div
                  key={i}
                  ref={(el) => (mobileCardsRef.current[i] = el)}
                  className="rounded-xl p-3.5 flex gap-3 border border-[#1d4ed8]/25"
                  style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 60%, #eff6ff 100%)' }}
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-9 h-9 rounded-lg bg-[#1d4ed8] flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                    {i < steps.length - 1 && (
                      <span className="block w-px flex-1 mt-3 bg-[#1d4ed8]/40" />
                    )}
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-[#1d4ed8] tracking-[0.22em] uppercase mb-1">{s.label}</div>
                    <h3 className="text-[15px] font-extrabold text-[#0a1733] mb-1 leading-tight">{s.title}</h3>
                    <p className="text-[13px] text-[#0a1733] leading-[1.5] font-semibold">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>{/* close inner max-w wrapper */}
        </div>
      </section>
    </div>
  )
}

export default IdentitySection
