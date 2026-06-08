import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator, ShieldCheck, Mail } from 'lucide-react'
import gsap from '../lib/gsap'
import Link from 'next/link'
import LeadCaptureModal from './LeadCaptureModal'

const headings = [
  { line1: 'Objective-Aligned', line2: 'Mutual Fund',       line3: 'Solutions' },
  { line1: 'Mutual Fund',    line2: 'Distribution',       line3: 'for Every Stage' },
  { line1: 'Institutional',  line2: 'Due Diligence-Led',  line3: 'Process' }
]

// 4 hero images — cinematic mosaic with cycling highlight
const HERO_GALLERY_IMAGES = [
  { src: '/images/trading-1.avif', alt: 'Indian investor reviewing mutual fund portfolio performance on a laptop with Money Compound' },
  { src: '/images/trading-2.avif', alt: 'NRI investor planning SIP and objective-aligned investments through the Money Compound app' },
  { src: '/hero-1.png',            alt: 'Money Compound family mutual fund session — CA-led, objective-aligned mutual fund distribution' },
  { src: '/new_hero_1.png',        alt: 'Money Compound — AMFI Registered Mutual Fund Distributor serving 1000+ families' }
]

const HeroSection = () => {
  const rootRef = useRef(null)
  const headingRef = useRef(null)
  const statsRef = useRef(null)
  const count1Ref = useRef(null)
  const count2Ref = useRef(null)
  const count3Ref = useRef(null)
  const heroCardRef = useRef(null)
  const chipRefs = useRef([])
  const imageCardRefs = useRef([])
  const [headingIndex, setHeadingIndex] = useState(0)
  const [slotImages, setSlotImages] = useState([0, 1, 2, 3])
  const [slotVisible, setSlotVisible] = useState([true, true, true, true])
  const [newsletterOpen, setNewsletterOpen] = useState(false)

  // Synchronous slow pulse — all 4 cards fade out together (slow), swap images invisibly, all 4 fade in together (slow). Repeat.
  useEffect(() => {
    const id = setInterval(() => {
      setSlotVisible([false, false, false, false])
      setTimeout(() => {
        setSlotImages((prev) => prev.map((idx) => (idx + 1) % HERO_GALLERY_IMAGES.length))
        setSlotVisible([true, true, true, true])
      }, 1200) // wait for slower fade-out to complete
    }, 4200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading rotation loop — no gap between headings. As soon as one fades out,
      // next one immediately starts fading in.
      const headingTl = gsap.timeline({ repeat: -1 })
      headings.forEach((_, i) => {
        // Switch index and fade-in
        headingTl.call(() => setHeadingIndex(i))
        headingTl.fromTo(headingRef.current,
          { opacity: 0, filter: 'blur(12px)', y: 12 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.5, ease: 'power2.out' }
        )
        // Hold visible
        headingTl.to({}, { duration: 1.5 })
        // Fade out (next loop iteration immediately runs fade-in of next heading)
        headingTl.to(headingRef.current,
          { opacity: 0, filter: 'blur(12px)', y: -12, duration: 0.45, ease: 'power2.in' }
        )
      })

      // Hero 4-image grid entrance — all 4 cards appear together on page load (no stagger).
      gsap.from('.hero-grid-item', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      })

      // Counter animations
      const counters = [
        { ref: count1Ref, end: 1000 },
        { ref: count2Ref, end: 180 },
        { ref: count3Ref, end: 18 }
      ]
      counters.forEach((counter) => {
        gsap.fromTo(counter.ref.current,
          { innerText: 0 },
          {
            innerText: counter.end,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: { trigger: statsRef.current, start: 'top 90%' },
            ease: 'power2.out'
          }
        )
      })

      // Idle floating animation for the trust chips — gentle, cinematic
      chipRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          duration: 3.2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  // Cursor-following spotlight + 3D card tilt — desktop-only (skip on touch / small screens)
  const handleHeroMouseMove = (e) => {
    const el = rootRef.current
    if (!el) return
    if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024)) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    requestAnimationFrame(() => {
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)

      const card = heroCardRef.current
      if (card) {
        const cardRect = card.getBoundingClientRect()
        const cx = ((e.clientX - cardRect.left) / cardRect.width) - 0.5
        const cy = ((e.clientY - cardRect.top) / cardRect.height) - 0.5
        card.style.transform = `perspective(1000px) rotateY(${cx * 6}deg) rotateX(${-cy * 6}deg) translateZ(0)`
      }
    })
  }

  const handleHeroMouseLeave = () => {
    const card = heroCardRef.current
    if (card) {
      card.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)'
      setTimeout(() => { if (card) card.style.transition = '' }, 700)
    }
  }

  return (
    <section
      ref={rootRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative isolate pt-20 pb-12 lg:pt-36 lg:pb-24 overflow-hidden cursor-light bg-white"
    >
      {/* Very subtle drifting mesh — hidden below `md` for mobile perf */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 560, height: 560, top: '-180px', left: '-160px',
            background: 'radial-gradient(circle, rgba(0,113,227,0.10) 0%, transparent 70%)',
            filter: 'blur(80px)',
            willChange: 'transform'
          }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 480, height: 480, bottom: '-160px', right: '-120px',
            background: 'radial-gradient(circle, rgba(96,165,250,0.10) 0%, transparent 70%)',
            filter: 'blur(90px)',
            willChange: 'transform'
          }}
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Light square grid backdrop — subtle slate lines on white, masked toward center */}
      <div aria-hidden className="absolute inset-0 bg-hero-grid pointer-events-none z-0" />

      {/* Bottom hairline divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-slate-200/60 z-20" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: copy ─────────────────────────────────────────────── */}
          <div className="min-h-0 lg:min-h-[420px] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#0a1733]/15 mb-5 lg:mb-6 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#0071e3] flex-shrink-0" />
                <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-widest text-[#000000]">AMFI Registered Mutual Fund Distributor</span>
              </div>

              {/* Heading — bigger + thicker, natural word-wrap */}
              <div ref={headingRef}>
                <h1
                  className="text-[34px] sm:text-[46px] lg:text-[58px] font-serif font-black mb-5 lg:mb-6 leading-[1.08] min-h-[110px] sm:min-h-[150px] lg:min-h-[200px] max-w-[640px]"
                  style={{
                    letterSpacing: '-0.04em',
                    fontWeight: 900,
                    WebkitTextStroke: '1.8px currentColor'
                  }}
                >
                  <span className="text-[#000000]">{headings[headingIndex].line1}</span>{' '}
                  <span className="text-[#0071e3]">{headings[headingIndex].line2}</span>{' '}
                  <span className="text-[#000000]">{headings[headingIndex].line3}</span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-[#0a1733] font-bold mb-6 lg:mb-8 leading-relaxed max-w-lg">
                Money Compound helps Individuals, NRIs, HNIs, and Retirees access need-aligned mutual fund and investment product solutions. Led by CA, CS, CFP qualified professionals with 18+ Yrs, and zero hidden charges.
              </p>

              {/* CTA buttons — Primary on Row 1; Calculator + Newsletter side-by-side on Row 2 */}
              <div className="mb-10 lg:mb-12">
                {/* Row 1: Primary CTA */}
                <a
                  href="https://vipulkhandelwal-moneycompound1.zohobookings.in/#/moneycompound2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative cta-button !px-5 sm:!px-8 !py-3 text-[12px] sm:text-[13px] font-black !rounded-full shadow-xl uppercase tracking-widest overflow-hidden inline-flex"
                  style={{ background: '#0a1733', color: '#ffffff' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Investment Journey
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </a>

                {/* Row 2: Calculator (left) + Newsletter (right) side-by-side */}
                <div className="flex flex-wrap items-center gap-5 sm:gap-7 mt-5 sm:mt-6">
                  <Link href="/calculators" className="flex items-center gap-3 text-brand-navy font-bold hover:text-brand-gold transition-all duration-300 group cursor-pointer">
                    <div className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:border-brand-gold group-hover:bg-brand-gold/10 group-hover:scale-110 group-hover:shadow-[0_6px_18px_-4px_rgba(30,58,138,0.35)]">
                      <Calculator className="w-4 h-4 text-brand-navy group-hover:text-brand-gold group-hover:scale-110 transition-all duration-300" strokeWidth={2.25} />
                    </div>
                    <span className="text-[11px] sm:text-[12px] uppercase tracking-widest font-black group-hover:tracking-[0.2em] transition-all duration-300">Try Our Calculators</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setNewsletterOpen(true)}
                    className="flex items-center gap-3 text-brand-navy font-bold hover:text-brand-gold transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:border-brand-gold group-hover:bg-brand-gold/10 group-hover:scale-110 group-hover:shadow-[0_6px_18px_-4px_rgba(30,58,138,0.35)]">
                      <Mail className="w-4 h-4 text-brand-navy group-hover:text-brand-gold group-hover:scale-110 transition-all duration-300" strokeWidth={2.25} />
                    </div>
                    <span className="text-[11px] sm:text-[12px] uppercase tracking-widest font-black group-hover:tracking-[0.2em] transition-all duration-300">Subscribe Newsletter</span>
                  </button>
                </div>
              </div>

              {/* Newsletter Zoho modal */}
              <LeadCaptureModal
                open={newsletterOpen}
                onClose={() => setNewsletterOpen(false)}
                asset={{
                  title: 'Subscribe to The Compound Digest',
                  desc: 'Monthly research notes on markets, mutual funds and macro themes. Delivered to your inbox on the 1st.',
                  formUrl: 'https://zfrmz.in/SDpoJH7RLbUPEruAVEtJ',
                  compact: true,
                }}
              />

              {/* Stats row */}
              <div ref={statsRef} className="flex flex-wrap items-center gap-5 sm:gap-6 md:gap-10 pt-6 border-t-2 border-[#0a1733]/15">
                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#000000] flex items-baseline gap-0.5 tracking-tight">
                    <span ref={count1Ref}>1000</span><span className="text-[#0071e3] text-sm sm:text-base">+</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-black text-[#000000] uppercase tracking-widest">Families Served</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#000000] flex items-baseline gap-0.5 tracking-tight">
                    ₹<span ref={count2Ref}>180</span> <span className="text-[#0071e3] text-sm sm:text-base">Cr+</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-black text-[#000000] uppercase tracking-widest">Investments Facilitated</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-extrabold text-[#000000] flex items-baseline gap-0.5 tracking-tight">
                    <span ref={count3Ref}>18</span><span className="text-[#0071e3] text-sm sm:text-base">+</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-black text-[#000000] uppercase tracking-widest">Years Experience</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: cinematic 4-image mosaic with cycling highlight + 2 floating UI chips ── */}
          <div className="relative flex items-center justify-center py-8 lg:py-12 min-h-[420px] sm:min-h-[500px] lg:min-h-[600px]"
               style={{ perspective: '1200px' }}>

            {/* Soft glow halo behind the mosaic */}
            <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[440px] h-[440px] lg:w-[540px] lg:h-[540px] rounded-full"
                   style={{ background: 'radial-gradient(circle, rgba(0,113,227,0.20) 0%, transparent 65%)', filter: 'blur(70px)' }} />
            </div>

            {/* 2x2 SQUARE grid (no mosaic tilt) — 4 perfect squares with a + crosshair line behind */}
            <div ref={heroCardRef} className="hero-grid relative z-10" style={{ willChange: 'transform' }}>
              {/* + crosshair lines through dead-center of the grid, behind the cards */}
              <div aria-hidden className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                {/* Vertical line */}
                <div className="absolute w-[2px] bg-[#0a1733] h-[110%] left-1/2 -translate-x-1/2" />
                {/* Horizontal line */}
                <div className="absolute h-[2px] bg-[#0a1733] w-[110%] top-1/2 -translate-y-1/2" />
              </div>

              {/* 2x2 square cards */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6 relative z-10">
                {[0, 1, 2, 3].map((i) => {
                  const slotImg = HERO_GALLERY_IMAGES[slotImages[i]]
                  const visible = slotVisible[i]
                  return (
                    <div
                      key={`slot-${i}`}
                      ref={(el) => (imageCardRefs.current[i] = el)}
                      className="hero-grid-item relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] lg:w-[220px] lg:h-[220px] rounded-2xl overflow-hidden bg-white border-[3px] border-white"
                      style={{
                        transform: `scale(${visible ? 1 : 0.94})`,
                        opacity: visible ? 1 : 0,
                        filter: visible ? 'blur(0px)' : 'blur(4px)',
                        transition: 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1), filter 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                        boxShadow: '0 22px 50px -12px rgba(15,23,42,0.30), 0 6px 20px -8px rgba(0,113,227,0.18)',
                        transformOrigin: 'center center'
                      }}
                    >
                      <img
                        src={slotImg.src}
                        alt={slotImg.alt}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0a1733]/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default HeroSection
