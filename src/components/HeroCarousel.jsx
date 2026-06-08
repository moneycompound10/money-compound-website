import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

const AnimatedTitle = ({ title }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const words = containerRef.current.querySelectorAll('.word-wrapper')

    // Kill any existing animations on these words to prevent overlap
    gsap.killTweensOf(words)

    gsap.fromTo(words,
      {
        opacity: 0,
        z: (i) => (i % 2 === 0 ? -800 : 800),
        x: (i) => (i % 2 === 0 ? -200 : 200),
        rotationY: (i) => (i % 2 === 0 ? 80 : -80),
        rotationX: (i) => (i % 2 === 0 ? -40 : 40),
        filter: 'blur(20px)',
        scale: 0.2
      },
      {
        opacity: 1,
        z: 0,
        x: 0,
        rotationY: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.2
      }
    )
  }, [title])

  // Split title by <br/> first, then by space
  const lines = title.split('<br/>')

  return (
    <div
      ref={containerRef}
      className="text-4xl lg:text-6xl font-['Playfair_Display'] italic font-black leading-[1.05] tracking-[-0.04em] min-h-[100px] lg:min-h-[140px] [perspective:2000px] relative z-10"
    >
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className="block whitespace-nowrap mb-2">
          {line.split(' ').map((word, wordIdx) => (
            <span
              key={wordIdx}
              className="word-wrapper inline-block mr-4 bg-gradient-to-r from-[#1e3a8a] to-[#52C19E] bg-clip-text text-transparent will-change-transform"
              style={{ transformStyle: 'preserve-3d', display: 'inline-block' }}
            >
              {word}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

const DURATION = 4000

const slides = [
  {
    badge: 'FINANCIAL EXCELLENCE',
    title: 'Welcome to<br/>Money Compound.',
    tagline: 'AMFI Registered Mutual Fund Distribution',
    desc: 'Money Compound is a group of experts like CAs, CSs and Financial Experts who have 18+ Yrs in the field of finance. We provide a 360 degree financial solution to our clients for their better future.',
    image: '/hero-1.png',
    accent: '#2e86de',
  },
  {
    badge: 'STRATEGIC PLANNING',
    title: 'Connect Your<br/>Dreams to Investments.',
    tagline: 'Objective-Aligned Investment Tracking',
    desc: "Whether it's your child's education, your dream home, or a peaceful retirement—we help you plan for what matters most.",
    image: '/images/stock-market-hero.avif',
    accent: '#2ecc71',
  },
  {
    badge: 'INSTITUTIONAL TRUST',
    title: 'Stability In<br/>Every Step.',
    tagline: '360 Degree Investment Solutions',
    desc: 'A disciplined, need-aligned investment process backed by our team of CAs, CSs, and experienced financial professionals.',
    image: '/hero-3.png',
    accent: '#2e86de',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const cardRefs = useRef([])
  const buttonRef = useRef(null)
  const contentRef = useRef(null)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(20px)"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  // --- Entrance Hero Animation ---
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    if (contentRef.current?.children?.length) {
      tl.fromTo(contentRef.current.children,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, stagger: 0.15, ease: "expo.out" }
      )
    }
    const activeCard = cardRefs.current[current]
    if (activeCard) {
      gsap.fromTo(activeCard,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "expo.out" }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // --- Magnetic Pull Effect for "Know More" Button ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      const btn = buttonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const currentX = gsap.getProperty(btn, "x") || 0;
      const currentY = gsap.getProperty(btn, "y") || 0;

      const btnCenter = {
        x: rect.left - currentX + rect.width / 2,
        y: rect.top - currentY + rect.height / 2
      };

      const dx = e.clientX - btnCenter.x;
      const dy = e.clientY - btnCenter.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        const pull = (120 - dist) / 120;
        gsap.to(btn, { x: dx * pull * 0.4, y: dy * pull * 0.4, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    slides.forEach((_, i) => {
      const card = cardRefs.current[i]
      if (!card) return
      const total = slides.length
      const diff = (i - current + total) % total
      let xPos = 0, rot = 0, scale = 1, zIndex = 0, opacity = 1, blur = 0;
      if (diff === 0) {
        xPos = 0; rot = 0; scale = 1; zIndex = 20; opacity = 1; blur = 0;
      } else {
        const offset = diff === 1 ? 1 : -1;
        xPos = offset * 140 + (diff - 1) * 25;
        rot = (diff === 1 ? 8 : -8);
        scale = 0.85;
        zIndex = 10;
        opacity = 0.6;
        blur = 4;
      }
      if (card) {
        gsap.to(card, {
          x: xPos,
          rotationZ: rot,
          scale: scale,
          zIndex: zIndex,
          opacity: opacity,
          filter: `blur(${blur}px)`,
          duration: 1.2,
          ease: "expo.out"
        })
      }
    })
  }, [current])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, DURATION)
  }, [])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  const goTo = (idx) => {
    setCurrent(idx)
    startTimer()
  }

  return (
    <motion.section
      ref={sectionRef}
      style={{ filter: blur, opacity }}
      className="relative w-full h-screen min-h-[800px] flex items-center overflow-hidden pt-20 bg-white"
      data-scroll-section
    >
      <div className="absolute inset-0 pointer-events-none z-0 bg-white" />

      <div className="max-w-7xl mx-auto w-full px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        <div className="lg:col-span-6" ref={contentRef}>
          <div className="space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-brand-blue" />
                  <span className="text-[10px] font-black tracking-[0.5em] text-brand-blue uppercase ml-2">{slides[current].badge}</span>
                </div>

                <AnimatedTitle title={slides[current].title} />

                <div className="flex items-center gap-6">
                  <div className="h-10 w-[1px] bg-slate-200" />
                  <p className="text-base lg:text-lg font-bold text-slate-900 tracking-wide">
                    &quot;{slides[current].tagline}&quot;
                  </p>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-slate-600 text-sm leading-relaxed max-w-lg font-light"
                >
                  {slides[current].desc}
                </motion.p>

                <div className="flex flex-wrap gap-8 pt-4 items-center">
                  <button
                    ref={buttonRef}
                    className="px-10 py-4 bg-slate-900 text-white font-black rounded-full text-[10px] uppercase tracking-[0.2em] shadow-premium flex items-center gap-4 transition-colors border border-slate-900 group relative z-20"
                  >
                    Know More
                    <ArrowRight size={16} className="text-brand-green group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>

                {/* --- Deep Glassmorphism Stats Box --- */}
                <div className="pt-8 w-full max-w-md">
                  <div className="bg-white/20 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-between gap-4 relative overflow-hidden group">
                    {/* Subtle internal glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                    {[
                      { val: 1000, suffix: '+', label: 'FAMILIES' },
                      { val: 180, prefix: '₹', suffix: ' Cr+', label: 'ASSETS' },
                      { val: 18, suffix: '+', label: 'YRS EXP' }
                    ].map((stat, i) => (
                      <div key={i} className="flex flex-col items-center text-center relative z-10">
                        <div className="text-2xl font-[900] text-slate-950 flex items-center tracking-tighter drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                          {stat.prefix && <span className="text-base mr-0.5 font-black">{stat.prefix}</span>}
                          <StatCounter value={stat.val} />
                          <span className="text-base font-black">{stat.suffix}</span>
                        </div>
                        <div className="text-[9px] font-black tracking-[0.2em] text-slate-800 uppercase mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-[600px] w-full flex items-center justify-center perspective-[2500px]">
          <div className="absolute inset-0 m-auto w-[400px] h-[400px] bg-brand-blue/10 blur-[120px] rounded-full animate-pulse-slow opacity-60" />
          <div className="relative w-full h-[550px] preserve-3d">
            {slides.map((slide, i) => (
              <div
                key={i}
                ref={el => cardRefs.current[i] = el}
                className="absolute inset-0 m-auto w-[360px] h-[520px] rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] cursor-pointer group will-change-transform"
                onClick={() => goTo(i)}
                style={{ pointerEvents: i === current ? 'auto' : 'none' }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5 z-10 pointer-events-none" />
                <img
                  src={slide.image}
                  alt={slide.tagline || "Investment and Mutual Fund Distribution Visual"}
                  className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-10 right-10 flex items-center justify-end z-30">
        <div className="flex gap-6 items-center">
          <div className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">Scroll to explore / 03</div>
          <div className="h-12 w-[1px] bg-slate-200" />
          <div className="flex gap-4">
            <button onClick={() => goTo((current - 1 + slides.length) % slides.length)} className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue hover:bg-white transition-all shadow-soft overflow-hidden group relative">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => goTo((current + 1) % slides.length)} className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-blue hover:border-brand-blue hover:bg-white transition-all shadow-soft overflow-hidden group relative">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// --- Helper Component for Counting Animation ---
function StatCounter({ value }) {
  const [count, setCount] = React.useState(0)
  const nodeRef = React.useRef(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0
        const end = value
        const duration = 2000
        let startTime = null

        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime
          const progress = Math.min((currentTime - startTime) / duration, 1)
          setCount(Math.floor(progress * (end - start) + start))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
        observer.disconnect()
      }
    }, { threshold: 0.5 })

    if (nodeRef.current) observer.observe(nodeRef.current)
    return () => observer.disconnect()
  }, [value])

  return <span ref={nodeRef}>{count}</span>
}
