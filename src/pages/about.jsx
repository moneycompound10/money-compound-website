import React, { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, TrendingUp, Shield, BarChart3, AppWindow, Apple, Users, Target, Rocket, Award, Heart, BookOpen, Quote as QuoteIcon, Search, Share2, Globe, Mail, Phone, BadgeCheck, ChevronDown, Linkedin } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import gsap, { ScrollTrigger } from '../lib/gsap'
import SplitType from 'split-type'

// Custom Social Icons for high compatibility
const FacebookIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
const TwitterIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
);
const InstagramIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);

const E = [0.22, 1, 0.36, 1]

function TeamAvatar({ member }) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center ring-[3px] ring-white shadow-[inset_0_0_0_1px_rgba(212,175,55,0.4)] group-hover:shadow-[inset_0_0_0_1px_rgba(212,175,55,1)] transition-all duration-500">
      {member.imgSrc && !hasError && (
        <img
          src={member.imgSrc}
          alt={member.name}
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {(!member.imgSrc || hasError) && (
        <span className="relative text-2xl font-black text-slate-600 group-hover:text-[#2C78C5] transition-colors font-serif italic">
          {member.initial}
        </span>
      )}
    </div>
  )
}

function StorysetHero() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bag: fades up + gentle settle
      gsap.from('.illu-bag', { y: 30, opacity: 0, duration: 1.0, delay: 0.20, ease: 'power3.out' })
      // Bag breathes (subtle continuous scale)
      gsap.to('.illu-bag', {
        scale: 1.015, duration: 3.2, yoyo: true, repeat: -1,
        ease: 'sine.inOut', transformOrigin: '50% 70%'
      })

      // Tablet: scale in + tiny float
      gsap.from('.illu-screen', {
        y: 24, opacity: 0, scale: 0.92, duration: 1.0, delay: 0.45,
        ease: 'back.out(1.4)', transformOrigin: '50% 50%'
      })
      gsap.to('.illu-screen', {
        y: '-=6', duration: 3.6, yoyo: true, repeat: -1, ease: 'sine.inOut'
      })

      // Chart bars: rise from bottom
      gsap.from('.illu-bar', {
        scaleY: 0, transformOrigin: 'bottom center',
        duration: 1.0, stagger: 0.08, ease: 'power4.out', delay: 0.85
      })

      // Red trend line: draws across
      const path = rootRef.current?.querySelector('.illu-line')
      if (path) {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, { strokeDashoffset: 0, duration: 1.6, delay: 1.55, ease: 'power3.out' })
      }

      // Dollar bills: slide in from inside the bag
      gsap.from('.illu-bill', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.10,
        delay: 1.0, ease: 'power3.out'
      })

      // Coin stacks: rise + tiny bounce
      gsap.from('.illu-stack', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12,
        delay: 1.1, ease: 'back.out(1.5)', transformOrigin: 'bottom center'
      })

      // Floating coin medallions
      gsap.from('.illu-coin', {
        y: -40, opacity: 0, scale: 0.4, duration: 0.75,
        stagger: 0.12, delay: 0.6, ease: 'back.out(2)',
        transformOrigin: '50% 50%'
      })
      gsap.to('.illu-coin', {
        y: '-=10', duration: 2.4, yoyo: true, repeat: -1,
        stagger: { each: 0.3, from: 'random' }, ease: 'sine.inOut'
      })

      // Decorative dots
      gsap.to('.illu-dot', {
        y: '+=6', duration: 1.8, yoyo: true, repeat: -1,
        stagger: { each: 0.25, from: 'random' }, ease: 'sine.inOut'
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="relative w-full max-w-[580px] mx-auto aspect-square">
      {/* soft halo — transparent, no box */}
      <div aria-hidden className="absolute inset-0 -z-10"
           style={{ background: 'radial-gradient(circle at 50% 55%, rgba(56,189,248,0.22), transparent 65%)' }} />

      <svg viewBox="0 0 600 600" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="bag-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </linearGradient>
          <linearGradient id="coin-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="coin-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="bar-up" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="floor-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#2563EB" stopOpacity="0" />
            <stop offset="50%"  stopColor="#2563EB" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* floor accent — subtle, fades at edges */}
        <line x1="80" y1="540" x2="520" y2="540" stroke="url(#floor-g)" strokeWidth="1.5" strokeDasharray="3 6" />

        {/* decorative dots scattered around the composition */}
        <circle className="illu-dot" cx="60"  cy="120" r="4"  fill="#38BDF8" />
        <circle className="illu-dot" cx="80"  cy="430" r="3"  fill="#FBBF24" />
        <circle className="illu-dot" cx="540" cy="500" r="3"  fill="#2563EB" />
        <circle className="illu-dot" cx="555" cy="170" r="4"  fill="#10B981" />
        <circle className="illu-dot" cx="30"  cy="300" r="3"  fill="#2563EB" />

        {/* ─── TABLET / SCREEN with chart ─── */}
        <g className="illu-screen" style={{ transformOrigin: '420px 250px' }}>
          {/* tablet frame shadow */}
          <rect x="263" y="138" width="294" height="218" rx="14" fill="#0B1A3A" opacity="0.10" />
          {/* tablet body */}
          <rect x="258" y="134" width="294" height="218" rx="12" fill="#FFFFFF" stroke="#0B1A3A" strokeWidth="3" />
          {/* screen area */}
          <rect x="272" y="148" width="266" height="190" rx="5" fill="#F8FAFC" />

          {/* bars — staggered heights */}
          <g>
            <rect className="illu-bar" x="288" y="296" width="22" height="40"  rx="3" fill="url(#bar-up)" opacity="0.55" />
            <rect className="illu-bar" x="318" y="272" width="22" height="64"  rx="3" fill="url(#bar-up)" opacity="0.65" />
            <rect className="illu-bar" x="348" y="248" width="22" height="88"  rx="3" fill="url(#bar-up)" opacity="0.75" />
            <rect className="illu-bar" x="378" y="220" width="22" height="116" rx="3" fill="url(#bar-up)" opacity="0.85" />
            <rect className="illu-bar" x="408" y="234" width="22" height="102" rx="3" fill="url(#bar-up)" opacity="0.85" />
            <rect className="illu-bar" x="438" y="204" width="22" height="132" rx="3" fill="url(#bar-up)" />
            <rect className="illu-bar" x="468" y="184" width="22" height="152" rx="3" fill="url(#bar-up)" />
            <rect className="illu-bar" x="498" y="170" width="22" height="166" rx="3" fill="url(#bar-up)" />
          </g>

          {/* red trending line going up */}
          <path className="illu-line"
                d="M 298 310 L 328 286 L 358 258 L 388 226 L 418 240 L 448 198 L 478 172 L 508 158 L 530 152"
                fill="none" stroke="#EF4444" strokeWidth="3.5"
                strokeLinecap="round" strokeLinejoin="round" />
          {/* arrowhead */}
          <path d="M 524 146 L 538 150 L 532 162 Z" fill="#EF4444" />
          {/* dots on line */}
          <circle cx="298" cy="310" r="3.5" fill="#EF4444" />
          <circle cx="530" cy="152" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />

          {/* tablet stand */}
          <rect x="378" y="352" width="56" height="6" rx="2" fill="#0B1A3A" />
          <rect x="394" y="358" width="24" height="14" rx="2" fill="#94A3B8" />
        </g>

        {/* ─── MONEY BAG ─── */}
        <g className="illu-bag" style={{ transformOrigin: '195px 420px' }}>
          {/* bag shadow */}
          <ellipse cx="195" cy="548" rx="120" ry="9" fill="#0B1A3A" opacity="0.14" />
          {/* bag body */}
          <path d="M 130 280
                   L 116 296
                   Q 84 330 92 366
                   L 116 524
                   Q 122 544 152 544
                   L 238 544
                   Q 268 544 274 524
                   L 298 366
                   Q 306 330 274 296
                   L 260 280 Z"
                fill="url(#bag-g)" stroke="#0B1A3A" strokeWidth="2.6" strokeLinejoin="round" />
          {/* highlight on the bag body */}
          <path d="M 130 320 Q 122 380 128 460" stroke="#0B1A3A" strokeWidth="1.5" fill="none" opacity="0.15" />
          {/* bag opening */}
          <ellipse cx="195" cy="282" rx="68" ry="12" fill="#F3F4F6" stroke="#0B1A3A" strokeWidth="2.6" />
          {/* bag tie / rope wave */}
          <path d="M 130 282 Q 148 270 162 286 Q 178 270 195 286 Q 212 270 228 286 Q 244 270 260 282"
                fill="none" stroke="#0B1A3A" strokeWidth="2.6" strokeLinecap="round" />
          {/* growing-sprout medallion on bag (replaces the old $ sign) */}
          <circle cx="195" cy="410" r="54" fill="#FFFFFF" stroke="#0B1A3A" strokeWidth="3" />
          <g transform="translate(145 354)" strokeLinejoin="round">
            {/* stem */}
            <path d="M50 94 Q49 72 50 50" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* lower leaves */}
            <path d="M50 80 Q33 74 28 60 Q40 64 50 74 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
            <path d="M50 68 Q67 62 72 48 Q60 52 50 62 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="1.5" />
            {/* upper leaves */}
            <path d="M50 58 Q38 50 34 36 Q47 41 50 53 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
            <path d="M50 50 Q62 43 66 30 Q54 35 50 47 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="1.5" />
            {/* bud */}
            <circle cx="50" cy="40" r="4" fill="#86EFAC" stroke="#15803D" strokeWidth="1.5" />
          </g>
        </g>

        {/* ─── DOLLAR BILLS tucked in the bag ─── */}
        <g className="illu-bill" transform="rotate(-14 220 252)">
          <rect x="170" y="240" width="104" height="52" rx="4" fill="#86EFAC" stroke="#15803D" strokeWidth="2" />
          <circle cx="222" cy="266" r="13" fill="#15803D" />
          <text x="222" y="273" textAnchor="middle"
                fontFamily="Manrope, Inter, sans-serif" fontWeight="800" fontSize="14" fill="#FFFFFF">$</text>
          <text x="185" y="254" fontFamily="Manrope, Inter, sans-serif" fontSize="7" fill="#15803D" fontWeight="700">100</text>
          <text x="252" y="288" fontFamily="Manrope, Inter, sans-serif" fontSize="7" fill="#15803D" fontWeight="700">100</text>
        </g>
        <g className="illu-bill" transform="rotate(7 235 235)" opacity="0.95">
          <rect x="198" y="228" width="92" height="46" rx="4" fill="#A7F3D0" stroke="#15803D" strokeWidth="2" />
        </g>

        {/* ─── COIN STACKS (3 stacks of varying heights) ─── */}
        <g className="illu-stack">
          {/* Stack A — short, near bag */}
          <ellipse cx="346" cy="488" rx="30" ry="7" fill="url(#coin-edge)" />
          <ellipse cx="346" cy="481" rx="30" ry="7" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="346" cy="471" rx="30" ry="7" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="346" cy="461" rx="30" ry="7" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
        </g>

        <g className="illu-stack">
          {/* Stack B — medium */}
          <ellipse cx="412" cy="498" rx="34" ry="8" fill="url(#coin-edge)" />
          <ellipse cx="412" cy="490" rx="34" ry="8" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="412" cy="478" rx="34" ry="8" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="412" cy="466" rx="34" ry="8" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="412" cy="454" rx="34" ry="8" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="412" cy="442" rx="34" ry="8" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
        </g>

        <g className="illu-stack">
          {/* Stack C — tall, the showpiece */}
          <ellipse cx="494" cy="506" rx="38" ry="9" fill="url(#coin-edge)" />
          <ellipse cx="494" cy="497" rx="38" ry="9" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="494" cy="483" rx="38" ry="9" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="494" cy="469" rx="38" ry="9" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="494" cy="455" rx="38" ry="9" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="494" cy="441" rx="38" ry="9" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="494" cy="427" rx="38" ry="9" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          <ellipse cx="494" cy="413" rx="38" ry="9" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.2" />
          {/* top coin with $ */}
          <ellipse cx="494" cy="399" rx="38" ry="9" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.5" />
          <text x="494" y="406" textAnchor="middle"
                fontFamily="Manrope, Inter, sans-serif" fontWeight="800" fontSize="14" fill="#0B1A3A">$</text>
        </g>

        {/* ─── Floating accent coins ─── */}
        <g className="illu-coin">
          <circle cx="90" cy="180" r="18" fill="url(#coin-g)" stroke="#92400E" strokeWidth="2" />
          <text x="90" y="187" textAnchor="middle"
                fontFamily="Manrope, Inter, sans-serif" fontWeight="800" fontSize="14" fill="#0B1A3A">₹</text>
        </g>
        <g className="illu-coin">
          <circle cx="540" cy="80" r="14" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.8" />
          <text x="540" y="86" textAnchor="middle"
                fontFamily="Manrope, Inter, sans-serif" fontWeight="800" fontSize="11" fill="#0B1A3A">$</text>
        </g>
        <g className="illu-coin">
          <circle cx="60" cy="380" r="12" fill="url(#coin-g)" stroke="#92400E" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  )
}

const AboutPage = () => {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const wordsRef = useRef([])
  const [openFaq, setOpenFaq] = useState(null)
  const [activeCert, setActiveCert] = useState(0)
  const certCardRefs = useRef([])
  const certAutoplayRef = useRef(true)
  const teamRailRef = useRef(null)
  const teamDragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false })

  const faqs = [
    {
      q: "How much should I invest in SIP every month?",
      a: "A general rule of thumb is the 50/30/20 rule, allocating at least 20% of your monthly income towards investments. However, at Money Compound, we calculate your SIP amount based on your specific life goals (such as retirement, children's education, or wealth creation) and inflation-adjusted future costs to ensure you reach your targets on time."
    },
    {
      q: "Is SIP better than lump sum for individuals?",
      a: "SIP (Systematic Investment Plan) is ideal for salaried individuals as it instills financial discipline and benefits from Rupee Cost Averaging, mitigating market volatility. Lump sum investments are highly effective during market corrections or when you receive windfall gains. Our advisory team helps you choose a hybrid approach tailored to your cash flow and risk profile."
    },
    {
      q: "How do I start investing with Money Compound?",
      a: "Starting is seamless. We begin with a comprehensive portfolio review and goal assessment session. Once your risk profile and financial milestones are mapped, our onboarding team assists you with a 100% paperless, KYC-compliant digital onboarding process to initiate your tailored investment plan."
    },
    {
      q: "What is the minimum investment amount?",
      a: "You can initiate your wealth creation journey with SIPs starting as low as ₹1,000 per month. For our tailored HNI and NRI advisory services or specialized portfolio restructuring, we evaluate your existing assets to craft a bespoke wealth management strategy."
    }
  ]

  useEffect(() => {
    const splits = []
    const ctx = gsap.context(() => {
      // Split Text Animation (Gravity Bounce Effect)
      const title1 = new SplitType(".about-bounce-text-1", { types: 'chars' });
      const title2 = new SplitType(".about-bounce-text-2", { types: 'chars' });
      splits.push(title1, title2)

      const allChars = [...title1.chars, ...title2.chars];
      allChars.forEach(ch => {
        gsap.from(ch, {
          y: -200,
          opacity: 0,
          duration: 0.8,
          ease: "bounce.out",
          delay: Math.random() * 0.5
        });
      });

      // Pendulum-swing chars on "Awards & Certifications" heading
      const certHeading = document.querySelector('.cert-pendulum')
      if (certHeading) {
        const split = new SplitType(certHeading, { types: 'chars' })
        splits.push(split)
        gsap.set(split.chars, { display: 'inline-block' })
        gsap.from(split.chars, {
          rotation: 90,
          transformOrigin: 'top center',
          opacity: 0,
          stagger: 0.05,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: certHeading,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        })
      }

      // Popcorn-pop on "Moments & Memories" — animate the 3 word-spans directly so
      // the italic + SVG underline structure stays intact.
      const momentsHeading = document.querySelector('.moments-popcorn')
      if (momentsHeading) {
        const popWords = momentsHeading.querySelectorAll('.pop-word')
        if (popWords.length) {
          gsap.from(popWords, {
            scale: 0,
            y: 30,
            rotation: () => gsap.utils.random(-15, 15),
            stagger: { each: 0.12, from: 'random' },
            duration: 0.55,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: momentsHeading,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          })
        }
      }

      // generic scroll reveals
      gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        )
      })

      // Hero parallax on glow blobs
      gsap.to('.hero-blob-a', {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: true }
      })
      gsap.to('.hero-blob-b', {
        yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: true }
      })

      // BOLD WORDMARK rolling parallax across the page (the "rolling" effect)
      gsap.to('.wordmark-roll', {
        xPercent: -25, ease: 'none',
        scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
      })

      // ── CINEMATIC DIVE-IN ─────────────────────────────────────────────
      // Hero content recedes (scale down + fade + slight blur) as user scrolls
      gsap.to('.hero-recede', {
        scale: 0.86,
        y: -50,
        opacity: 0.18,
        filter: 'blur(3px)',
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom 30%',
          scrub: 0.8
        }
      })

      // Connecting line draws downward + portal dot grows
      const connectLine = document.querySelector('.connect-line')
      if (connectLine) {
        const len = connectLine.getTotalLength()
        gsap.set(connectLine, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(connectLine, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero',
            start: 'bottom 95%',
            end: 'bottom 25%',
            scrub: 1
          }
        })
      }
      gsap.fromTo('.portal-dot',
        { scale: 0.6, opacity: 0 },
        {
          scale: 1.6, opacity: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-hero',
            start: 'bottom 60%',
            end: 'bottom 10%',
            scrub: 1
          }
        }
      )
    }, containerRef)
    return () => {
      // Revert SplitType DOM modifications before GSAP context to keep React's tree in sync
      splits.forEach((s) => { try { s.revert() } catch (_) {} })
      ctx.revert()
    }
  }, [])

  // ── Certificate stack — GSAP deck animation ─────────────────────────
  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    // certificateCards is a stable literal declared below; safe to read in effect
    // eslint-disable-next-line react-hooks/immutability
    const total = certificateCards.length
    certCardRefs.current.forEach((card, i) => {
      if (!card) return
      const offset = (i - activeCert + total) % total
      const visible = offset < 5
      gsap.to(card, {
        y: offset * -16,
        x: offset * 8,
        rotation: offset === 0 ? 0 : -2 + offset * 0.8,
        scale: 1 - offset * 0.045,
        opacity: visible ? 1 - offset * 0.18 : 0,
        zIndex: total - offset,
        duration: 0.85,
        ease: 'power3.out'
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCert])

  // ── Certificate stack — auto rotate ─────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      if (certAutoplayRef.current) {
        setActiveCert((prev) => (prev + 1) % certificateCards.length)
      }
    }, 3800)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const milestones = [
    { label: 'Families Served', value: 1000, suffix: '+', desc: 'Across India & 25+ countries' },
    { label: 'Investments Facilitated', prefix: '₹', value: 180, suffix: ' Cr+', desc: 'AUA growing every quarter' },
    { label: 'Years of Expertise', value: 18, suffix: '+', desc: 'Through multiple market cycles' },
    { label: 'Client Retention', value: 95, suffix: '%', desc: 'We build lifetime relationships' }
  ]

  const Counter = ({ value, prefix = "", suffix = "" }) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const nodeRef = useRef(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
      if (isInView) {
        const controls = animate(0, value, {
          duration: 2,
          ease: "easeOut",
          onUpdate(latest) {
            setDisplayValue(Math.floor(latest));
          },
        });
        return () => controls.stop();
      }
    }, [value, isInView]);

    return <span ref={nodeRef}>{prefix}{displayValue}{suffix}</span>;
  }

  const team = [
    { name: 'Apoorv Srivastava', role: '', qual: '', initial: 'AS', imgSrc: '/apoorve.jpeg' },
    { name: 'Rahul Jaswal', role: '', qual: '', initial: 'RJ', imgSrc: '/rahul.png' },
    { name: 'Rohit Chaudhary', role: '', qual: '', initial: 'RC', imgSrc: '/rohit.png' },
    { name: 'Manoj Negi', role: '', qual: '', initial: 'MN', imgSrc: '/manoj.png' },
    { name: 'Nitin Moyal', role: '', qual: '', initial: 'NM', imgSrc: '/Nitin_moyal.png' },
    { name: 'Ram Parvesh', role: '', qual: '', initial: 'RP', imgSrc: '/ram.png' },
    { name: 'Ankit Chauhan', role: '', qual: '', initial: 'AC', imgSrc: '/ankit.png' },
    { name: 'Priyanka', role: '', qual: '', initial: 'P', imgSrc: '/priyanka.png' }
  ]

  const certificateCards = [
    {
      issuer: 'IRDAI',
      tag: 'Regulatory Registration',
      title: 'IRDAI POSP — Insurance Distribution',
      authority: 'Insurance Regulatory and Development Authority of India',
      desc: 'IRDAI POSP Registration No. 408483 — authorised to distribute life, health and general insurance products from IRDAI-licensed insurers under applicable regulations.',
      gradient: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%)'
    },
    {
      issuer: 'AMFI',
      tag: 'Regulatory Registration',
      title: 'AMFI Mutual Fund Distributor',
      authority: 'Association of Mutual Funds in India',
      desc: 'AMFI ARN-140318 — authorised to distribute mutual fund schemes across AMCs in India under AMFI / SEBI norms.',
      gradient: 'linear-gradient(135deg, #0E7490 0%, #0891B2 50%, #06B6D4 100%)'
    },
    {
      issuer: 'NISM',
      tag: 'NISM Series VII',
      title: 'Securities Operations & Risk Management',
      authority: 'National Institute of Securities Markets',
      desc: 'Cleared exam covering settlement, risk management and operational discipline in capital markets.',
      gradient: 'linear-gradient(135deg, #7C2D12 0%, #9A3412 50%, #C2410C 100%)'
    },
    {
      issuer: 'NISM',
      tag: 'NISM Series V-C',
      title: 'PMS Distributor Module Cleared',
      authority: 'National Institute of Securities Markets',
      desc: 'NISM Series V-C examination cleared. Money Compound does not currently distribute or advise on PMS; HNI interest is handled on a referral-only basis to SEBI-registered Portfolio Managers.',
      gradient: 'linear-gradient(135deg, #581C87 0%, #6B21A8 50%, #7E22CE 100%)'
    },
    {
      issuer: 'NISM',
      tag: 'NISM Series VIII',
      title: 'Equity Derivatives',
      authority: 'National Institute of Securities Markets',
      desc: 'Certified in the mechanics, risks and strategy of equity derivative instruments.',
      gradient: 'linear-gradient(135deg, #065F46 0%, #047857 50%, #059669 100%)'
    },
    {
      issuer: 'NISM',
      tag: 'NISM Series I',
      title: 'Currency Derivatives',
      authority: 'National Institute of Securities Markets',
      desc: 'Cleared the regulator-mandated module for trading and advising on currency derivatives.',
      gradient: 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)'
    },
    {
      issuer: 'NISM',
      tag: 'NISM Series IV',
      title: 'Interest Rate Derivatives',
      authority: 'National Institute of Securities Markets',
      desc: 'Certified on the structure, valuation and hedging use-cases of interest rate derivative products.',
      gradient: 'linear-gradient(135deg, #92400E 0%, #B45309 50%, #D97706 100%)'
    },
    {
      issuer: 'NISM',
      tag: 'NISM Series XVII',
      title: 'Retirement Adviser',
      authority: 'National Institute of Securities Markets',
      desc: 'Specialised certification on retirement planning, NPS structures and post-retirement income strategy.',
      gradient: 'linear-gradient(135deg, #1E40AF 0%, #4338CA 50%, #6366F1 100%)'
    },
    {
      issuer: 'NISM',
      tag: 'AIF Distributor',
      title: 'Alternative Investment Funds',
      authority: 'National Institute of Securities Markets',
      desc: 'Authorised to distribute Category I, II and III AIFs to qualified investors.',
      gradient: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 50%, #2DD4BF 100%)'
    }
  ]

  const principles = [
    { title: 'Transparency', desc: 'Zero hidden fees, open commission disclosures, and clear portfolio reports.', icon: Shield },
    { title: 'Client-First', desc: "Your goals drive every scheme suggestion. We never push what you don't need.", icon: Heart },
    { title: 'Due Diligence', desc: 'In-house screening of every scheme, AMC and product on track record, expense ratio, and category fit before we discuss it with you.', icon: BookOpen }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#1A2E23] selection:text-white overflow-hidden">
      <Head>
        <title>About Money Compound — AMFI MFD & IRDAI POSP in Noida</title>
        <meta name="description" content="Money Compound is led by CA, CS, CFP-qualified professionals, backed by multiple NISM certifications. Founded by Vipul Khandelwal in Noida — an AMFI-registered Mutual Fund Distributor (ARN-140318) and IRDAI POSP (408483) serving 1,000+ families across 25+ countries." />
        <link rel="canonical" href="https://www.moneycompound.com/about" />
        <meta property="og:title" content="About Money Compound — AMFI MFD & IRDAI POSP in Noida" />
        <meta property="og:description" content="Money Compound is led by CA, CS, CFP-qualified professionals, backed by multiple NISM certifications. Founded by Vipul Khandelwal in Noida." />
        <meta property="og:url" content="https://www.moneycompound.com/about" />
        <meta property="og:image" content="https://www.moneycompound.com/og-cover.jpg" />
      </Head>

      {/* ═══════════════════════════ HERO ═══════════════════════════ */}
      <section className="about-hero relative isolate min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
               style={{
                 background:
                   'radial-gradient(ellipse 70% 60% at 50% 0%, #EAF2FF 0%, #F5F8FF 30%, #FFFFFF 70%)'
               }}>
        {/* atmosphere */}
        <div className="absolute inset-0 bg-grid-fade opacity-70 pointer-events-none" aria-hidden />
        <span aria-hidden className="hero-blob-a glow-blob blue glow-float-a"
              style={{ width: 540, height: 540, top: '-120px', left: '-160px' }} />
        <span aria-hidden className="hero-blob-b glow-blob sky glow-float-b"
              style={{ width: 480, height: 480, bottom: '-120px', right: '-120px' }} />

        {/* HUGE rolling wordmark behind the content (the August "ABOUT US" feel) */}
        <div aria-hidden
             className="wordmark-roll absolute left-[2%] top-[12%] pointer-events-none select-none whitespace-nowrap
                        font-display font-extrabold tracking-[-0.06em] leading-none z-0
                        opacity-[0.07]"
             style={{
               fontSize: 'clamp(180px, 28vw, 360px)',
               color: '#0B1A3A'
             }}>
          ABOUT US · ABOUT US ·
        </div>

        <div className="hero-recede relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 w-full will-change-transform">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            {/* COPY */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: E }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="w-14 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-sky-400" />
                <span className="text-[12px] font-bold tracking-[0.36em] uppercase text-slate-900">About Us</span>
              </motion.div>

              {/* Massive MONEY COMPOUND headline with gravity bounce */}
              <h1 ref={headlineRef}
                  className="font-display font-extrabold leading-[0.94] tracking-[-0.045em] mb-8
                             text-[56px] sm:text-[78px] lg:text-[104px]">
                <span className="block text-slate-950 will-change-transform about-bounce-text-1">
                  MONEY
                </span>
                <span className="block accent-gradient will-change-transform about-bounce-text-2">
                  COMPOUND.
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: E }}
                className="border-l-[4px] border-blue-600 pl-6 py-1 mb-7 max-w-xl"
              >
                <p className="font-display font-extrabold text-[24px] lg:text-[30px] leading-[1.15] tracking-[-0.02em]">
                  <span className="accent-gradient">AMFI-Registered</span>
                  <br />
                  <span className="text-slate-950">Mutual Fund Distributor.</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.70, ease: E }}
                className="max-w-xl mb-9"
              >
                <p className="text-[16px] lg:text-[18px] text-slate-800 leading-[1.7]">
                  Money Compound is a mutual fund distribution practice helping <span className="font-bold text-slate-950">1000+ families across 25+ countries</span> pursue their financial goals with clarity, care and conviction.
                </p>
              </motion.div>
            </div>

            {/* ILLUSTRATION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: E }}
              className="relative flex items-center justify-center"
            >
              <StorysetHero />
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <a href="#story" aria-label="Scroll to story"
           className="absolute bottom-24 lg:bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors">
          <span className="block w-px h-10 bg-gradient-to-b from-blue-500 to-transparent" />
        </a>

        {/* ── Cinematic connector: line draws down, portal dot grows ── */}
        <div aria-hidden
             className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[120px] h-[140px] z-20 pointer-events-none">
          <svg viewBox="0 0 120 140" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="connect-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#2563EB" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#2563EB" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path className="connect-line"
                  d="M 60 0 C 60 50, 60 90, 60 140"
                  fill="none"
                  stroke="url(#connect-g)"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  strokeLinecap="round" />
          </svg>
          {/* portal dot — grows as user scrolls toward the next section */}
          <span className="portal-dot absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full will-change-transform"
                style={{
                  background: 'radial-gradient(circle, #38BDF8 0%, #2563EB 60%, rgba(37,99,235,0) 100%)',
                  boxShadow: '0 0 32px 10px rgba(56,189,248,0.55), 0 0 12px 4px rgba(37,99,235,0.85)'
                }} />
        </div>
      </section>

      {/* --- OUR STORY SECTION (Scroll Reveal & Light Shade BG) --- */}
      <section id="story" className="pt-32 pb-20 bg-[#F8FAFA] px-6 relative overflow-hidden">
        {/* Artistic Background Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -right-20 top-0 w-[600px] h-[600px] bg-[#ECF1EE] rounded-full blur-[100px] -z-0"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-24"
          >
            <h2 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.5em] mb-8">Our Story</h2>
            <h3 className="text-4xl lg:text-5xl font-black mb-10 leading-tight tracking-tight max-w-4xl mx-auto uppercase text-slate-900">
              From a Simple Belief <br />
              <span className="gold-gradient">to a Growing Movement</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="bg-white p-10 lg:p-14 rounded-[3rem] border border-[#1A2E23]/10 shadow-xl relative overflow-hidden group">
              {/* Decorative Accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-[#1A2E23]" />

              <div className="space-y-8 text-xl text-slate-950 font-bold leading-relaxed relative z-10">
                <p>
                  Money Compound was founded on a simple conviction: every Indian family deserves honest, evidence-based scheme guidance — not commission-driven product selling.
                </p>
                <p>
                  We saw too many families being mis-sold insurance as investment, too many retirees locked into underperforming plans, and too many NRIs stuck navigating Indian finance without a reliable distributor.
                </p>
                <p>
                  We set out to change that. Over the years, we have grown from a small team of passionate financial professionals into a multi-disciplinary firm led by CA, CS, CFP-qualified professionals, backed by multiple NISM certifications.
                </p>
              </div>
            </div>
            <div className="reveal-up lg:pl-12">
              <div className="p-12 bg-[#ECF1EE] rounded-[3rem] border-l-[12px] border-[#1A2E23] relative shadow-2xl">
                <QuoteIcon className="w-16 h-16 text-[#1A2E23]/5 absolute top-10 right-10" fill="currentColor" />
                <p className="text-2xl text-[#1A2E23] font-bold italic leading-relaxed relative z-10 mb-8">
                  &ldquo;Today, Money Compound serves individuals, NRIs, HNIs and retirees across 25+ countries. Our clients stay with us for decades, not months.&rdquo;
                </p>
                <p className="text-lg text-slate-900 font-bold leading-relaxed">
                  We believe long-term outcomes are not built by chasing returns. They are built by aligning money to meaning, by showing up every single year, and by keeping things ruthlessly simple.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MILESTONES (High Contrast Dark) --- */}
      <section className="pt-12 pb-20 bg-[#0B1120] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white/5 rounded-[2rem] border border-white/10 hover:border-brand-gold/30 transition-colors text-center"
            >
              <div className="text-3xl lg:text-4xl font-black mb-1 text-[#E2B35E]">
                <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-2">{m.label}</div>
              <div className="text-[11px] text-white font-bold leading-relaxed">{m.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FOUNDER'S STORY --- */}
      <section className="pt-12 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[3rem] border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white">
            {/* Split Card Background with Design Elements */}
            <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 bg-slate-50 relative overflow-hidden">
                {/* Dotted Pattern Overlay */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1A2E23 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                {/* Vertical Sidebar Label */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block">
                  <span className="text-[10px] font-black uppercase tracking-[1em] text-slate-200 vertical-text">LEADERSHIP</span>
                </div>
              </div>
              <div className="lg:col-span-5 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50/50" />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#2C78C5]/5 rounded-full blur-[100px]" />
              </div>
            </div>

            <div className="relative z-10 p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 order-2 lg:order-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-[2px] bg-[#2C78C5]" />
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#2C78C5]">Founder & CEO</span>
                  </div>
                  <h3 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                    Vipul <span className="text-[#2C78C5]">Khandelwal</span>
                  </h3>
                </div>

                <div className="space-y-5 text-base lg:text-lg text-slate-800 font-semibold leading-relaxed max-w-xl border-l-4 border-[#2C78C5]/20 pl-6">
                  <p className="text-base lg:text-lg text-slate-950 font-bold leading-relaxed">
                    Vipul Khandelwal is a triple-qualified professional (CA, CS, CFP) with 18+ Yrs of cross-disciplinary expertise. He combines rigorous financial analysis with deep empathy for every client&apos;s life stage.
                  </p>
                  <p className="font-serif italic text-lg lg:text-xl text-slate-900 border-t border-slate-100 pt-4">
                    &ldquo;Our single KPI is not AUM. It&apos;s whether our clients reach their life goals on time.&rdquo;
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {['CA', 'CS', 'CFP'].map(t => (
                    <span key={t} className="px-5 py-2 bg-[#0B1A3A] text-white rounded-md text-[11px] font-black uppercase tracking-[0.25em] shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right Image with Popup Effect */}
              {/* Right Image Area with Floating Design */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 100, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    type: "spring",
                    stiffness: 80,
                    damping: 20
                  }}
                  className="relative group"
                >
                  {/* Main Portrait with Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#2C78C5]/15 rounded-full blur-[100px]" style={{zIndex: -1}} />

                  {/* Box cutout container — overflow visible so offset frame shows */}
                  <div className="w-[220px] lg:w-[260px] relative" style={{overflow: 'visible'}}>
                    {/* Offset blue border behind */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      border: '3px solid #2C78C5',
                      transform: 'translate(10px, 10px)',
                      zIndex: 0
                    }} />
                    {/* White background box */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#F8FAFC',
                      border: '1.5px solid #E2E8F0',
                      zIndex: 1
                    }} />
                    <img
                      src="/images/vipul_khandelwal_2026_05_20.jpg"
                      alt="Vipul Khandelwal"
                      style={{position: 'relative', zIndex: 2}}
                      className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.14)] p-3"
                    />
                  </div>

                  {/* Corner accent top-left */}
                  <div style={{
                    position: 'absolute', top: -10, left: -10,
                    width: 36, height: 36,
                    border: '2.5px solid #2C78C5',
                    opacity: 0.5,
                    zIndex: 3
                  }} />
                  {/* Corner accent bottom-right */}
                  <div style={{
                    position: 'absolute', bottom: -14, right: -14,
                    width: 56, height: 56,
                    border: '2.5px solid #2C78C5',
                    opacity: 0.4,
                    zIndex: 3
                  }} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CO-FOUNDER'S STORY --- */}
      <section className="pt-4 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[3rem] border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white">
            {/* Split Card Background with Design Elements */}
            <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 bg-slate-50 relative overflow-hidden">
                {/* Dotted Pattern Overlay */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1A2E23 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                {/* Vertical Sidebar Label */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block">
                  <span className="text-[10px] font-black uppercase tracking-[1em] text-slate-200 vertical-text">LEADERSHIP</span>
                </div>
              </div>
              <div className="lg:col-span-5 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50/50" />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#2C78C5]/5 rounded-full blur-[100px]" />
              </div>
            </div>

            <div className="relative z-10 p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 space-y-6 order-2 lg:order-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-[2px] bg-[#2C78C5]" />
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#2C78C5]">Co-Founder &amp; Director</span>
                  </div>
                  <h3 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                    Shruti <span className="text-[#2C78C5]">Khandelwal</span>
                  </h3>
                </div>

                <div className="space-y-5 text-base lg:text-lg text-slate-800 font-semibold leading-relaxed max-w-xl border-l-4 border-[#2C78C5]/20 pl-6">
                  <p className="text-base lg:text-lg text-slate-950 font-bold leading-relaxed">
                    Shruti Khandelwal is an MBA and QPFP-certified professional associated with client engagement and financial solutions at Money Compound. She focuses on understanding each family’s financial needs and helping them stay aligned with their financial journey through a structured and process-driven approach.
                  </p>
                  <p className="font-serif italic text-lg lg:text-xl text-slate-900 border-t border-slate-100 pt-4">
                    &ldquo;Every family’s financial journey is unique, and a structured approach helps create better long-term financial discipline.&rdquo;
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {['MBA', 'QPFP'].map(t => (
                    <span key={t} className="px-5 py-2 bg-[#0B1A3A] text-white rounded-md text-[11px] font-black uppercase tracking-[0.25em] shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right Image Area — placeholder (blank) with same dimensions as Vipul's card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 100, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    type: "spring",
                    stiffness: 80,
                    damping: 20
                  }}
                  className="relative group"
                >
                  {/* Soft glow behind placeholder */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#2C78C5]/15 rounded-full blur-[100px]" style={{zIndex: -1}} />

                  {/* Box cutout container — same dimensions as Vipul's portrait frame */}
                  <div className="w-[220px] lg:w-[260px] relative" style={{overflow: 'visible', aspectRatio: '1 / 1'}}>
                    {/* Offset blue border behind */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      border: '3px solid #2C78C5',
                      transform: 'translate(10px, 10px)',
                      zIndex: 0
                    }} />
                    {/* White background box */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#F8FAFC',
                      border: '1.5px solid #E2E8F0',
                      zIndex: 1
                    }} />
                    <img
                      src="/images/shruti_khandelwal.jpg"
                      alt="Shruti Khandelwal"
                      style={{position: 'relative', zIndex: 2, width: '100%', height: '100%'}}
                      className="object-cover drop-shadow-[0_16px_32px_rgba(0,0,0,0.14)] p-3"
                    />
                  </div>

                  {/* Corner accent top-left */}
                  <div style={{
                    position: 'absolute', top: -10, left: -10,
                    width: 36, height: 36,
                    border: '2.5px solid #2C78C5',
                    opacity: 0.5,
                    zIndex: 3
                  }} />
                  {/* Corner accent bottom-right */}
                  <div style={{
                    position: 'absolute', bottom: -14, right: -14,
                    width: 56, height: 56,
                    border: '2.5px solid #2C78C5',
                    opacity: 0.4,
                    zIndex: 3
                  }} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- AWARDS & RECOGNITION — Stacked Certificate Deck --- */}
      <section className="relative py-28 lg:py-32 overflow-hidden bg-[#070B14]">
        {/* Backdrop atmospherics */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#2C78C5]/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/8 rounded-full blur-[160px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative"
             onMouseEnter={() => { certAutoplayRef.current = false }}
             onMouseLeave={() => { certAutoplayRef.current = true }}>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* LEFT — Heading column */}
            <div className="lg:col-span-4 reveal-up relative">
              {/* Decorative Award watermark */}
              <div className="absolute -top-10 -left-10 w-36 h-36 opacity-[0.18] pointer-events-none">
                <Award className="w-full h-full text-white" strokeWidth={1.25} />
              </div>

              <div className="inline-flex items-center gap-2 mb-5 relative">
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/85">
                  World-Class
                </span>
                <span className="w-10 h-[1.5px] bg-[#D4AF37]" />
              </div>
              <h3 className="cert-pendulum text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-6">
                Awards &amp;
                <br />
                <span
                  className="italic font-serif font-bold inline-block"
                  style={{
                    color: '#ffffff',
                    WebkitTextFillColor: '#ffffff',
                    opacity: 1,
                    letterSpacing: '-0.025em'
                  }}
                >
                  Certifications
                </span>
              </h3>
              <p className="text-[15px] text-white/85 leading-relaxed max-w-sm mb-8">
                Formal credentials from India&apos;s financial regulators — every scheme suggestion is anchored to an active registration on file.
              </p>

              {/* Live counter + progress */}
              <div className="flex items-baseline gap-4 mb-6">
                <span
                  className="font-serif italic text-7xl font-bold leading-none"
                  style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', opacity: 1 }}
                >
                  {String(activeCert + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-xl font-semibold"
                  style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', opacity: 0.8 }}
                >
                  / {String(certificateCards.length).padStart(2, '0')}
                </span>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    certAutoplayRef.current = false
                    setActiveCert((prev) => (prev - 1 + certificateCards.length) % certificateCards.length)
                  }}
                  aria-label="Previous certificate"
                  className="w-12 h-12 rounded-full border border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center text-white/80 hover:text-[#D4AF37] transition-all duration-300"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={() => {
                    certAutoplayRef.current = false
                    setActiveCert((prev) => (prev + 1) % certificateCards.length)
                  }}
                  aria-label="Next certificate"
                  className="w-12 h-12 rounded-full border border-white/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center text-white/80 hover:text-[#D4AF37] transition-all duration-300"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CENTER — Stacked card deck */}
            <div className="lg:col-span-4 flex justify-center order-first lg:order-none">
              <div className="relative w-[300px] sm:w-[340px] h-[440px] sm:h-[480px]" style={{ perspective: '1200px' }}>
                {certificateCards.map((cert, i) => {
                  // Initial stacked transform (matches GSAP defaults so no flash on first paint)
                  const initialOffset = i
                  const initialVisible = initialOffset < 5
                  return (
                    <div
                      key={i}
                      ref={(el) => (certCardRefs.current[i] = el)}
                      className="absolute inset-0 rounded-[1.75rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] cursor-pointer"
                      style={{
                        background: cert.gradient,
                        willChange: 'transform',
                        transform: `translate(${initialOffset * 8}px, ${initialOffset * -16}px) rotate(${initialOffset === 0 ? 0 : -2 + initialOffset * 0.8}deg) scale(${1 - initialOffset * 0.045})`,
                        opacity: initialVisible ? 1 - initialOffset * 0.18 : 0,
                        zIndex: certificateCards.length - initialOffset
                      }}
                      onClick={() => {
                        certAutoplayRef.current = false
                        setActiveCert(i)
                      }}
                    >
                      {/* Top texture */}
                      <div className="absolute inset-0 opacity-30 mix-blend-overlay"
                           style={{
                             backgroundImage:
                               'radial-gradient(circle at 80% 10%, rgba(255,255,255,0.5) 0%, transparent 50%)'
                           }} />
                      {/* Foil shine band */}
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent" />
                      {/* Bottom decorative ribbon */}
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/20 backdrop-blur-sm" />

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-between p-7">
                        {/* Header — issuer + tag */}
                        <div>
                          <div className="flex items-start justify-between mb-1">
                            <div className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                              {cert.issuer}
                            </div>
                            <BadgeCheck className="w-6 h-6 text-white/85" strokeWidth={2} />
                          </div>
                          <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/85">
                            {cert.tag}
                          </div>
                        </div>

                        {/* Middle — title */}
                        <div className="flex-1 flex items-center">
                          <h4 className="text-[26px] font-black text-white leading-[1.1] tracking-tight drop-shadow-md">
                            {cert.title}
                          </h4>
                        </div>

                        {/* Footer — seal area */}
                        <div className="relative flex items-end justify-between">
                          <div>
                            <div className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/85 mb-1">
                              Official Certificate
                            </div>
                            <div className="text-[10px] text-white/80 font-medium italic font-serif">
                              {cert.authority.split(' ').slice(0, 4).join(' ')}…
                            </div>
                          </div>
                          {/* Mini wax-seal stamp */}
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <div className="absolute inset-0 rounded-full border-2 border-white/30" />
                            <div className="absolute inset-1 rounded-full border border-white/20 flex items-center justify-center">
                              <Award className="w-4 h-4 text-white/80" strokeWidth={2} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Subtle holographic edge */}
                      <div className="absolute inset-0 rounded-[1.75rem] pointer-events-none border border-white/10" />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* RIGHT — Active card details */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#D4AF37]">
                  {certificateCards[activeCert].issuer} • {certificateCards[activeCert].tag}
                </span>
              </div>

              <h4 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                {certificateCards[activeCert].title}
              </h4>

              <p className="text-[13px] uppercase tracking-[0.2em] text-white/75 font-semibold mb-5">
                {certificateCards[activeCert].authority}
              </p>

              <p className="text-base text-white/90 leading-relaxed mb-8">
                {certificateCards[activeCert].desc}
              </p>

              {/* Dots indicator */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                {certificateCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      certAutoplayRef.current = false
                      setActiveCert(i)
                    }}
                    aria-label={`View certificate ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeCert === i
                        ? 'w-10 bg-[#D4AF37]'
                        : 'w-1.5 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Verified strip */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                  Active &amp; In Good Standing
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- MOMENTS & RECOGNITION SCRAPBOOK --- */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#F4F1E8]">
        {/* Paper backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(10,26,47,0.55) 1px, transparent 0)',
              backgroundSize: '34px 34px'
            }}
          />
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#C9A227]/12 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2C78C5]/8 rounded-full blur-[180px]" />
          {/* Faint ruled-paper lines */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent 0, transparent 39px, #0A1A2F 39px, #0A1A2F 40px)'
            }}
          />
          {/* Coffee-stain ring (top-left) */}
          <div className="absolute top-24 left-10 w-24 h-24 rounded-full border-[8px] border-[#8B5E3C]/15" />
          <div className="absolute top-28 left-14 w-12 h-12 rounded-full border-[3px] border-[#8B5E3C]/10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* HEADER */}
          <div className="text-center mb-16 lg:mb-20 reveal-up relative">
            {/* Floating doodle stars */}
            <span className="hidden lg:block absolute -top-2 left-1/4 text-2xl text-[#C9A227]/50 rotate-12">✦</span>
            <span className="hidden lg:block absolute top-4 right-1/4 text-xl text-[#2C78C5]/40 -rotate-12">✦</span>

            <div className="inline-flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-px bg-[#C9A227]" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-600">
                From the Office
              </span>
              <span className="w-10 h-px bg-[#C9A227]" />
            </div>
            <h3 className="moments-popcorn text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mb-5"
                style={{ color: '#0A1A2F' }}>
              <span className="pop-word inline-block">Moments</span>{' '}
              <span className="pop-word inline-block">&amp;</span>{' '}
              <span className="pop-word italic font-serif font-bold relative inline-block" style={{ color: '#2C78C5' }}>
                Memories
                {/* Hand-drawn underline */}
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M2,7 Q50,2 100,6 T198,5" stroke="#2C78C5" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
                </svg>
              </span>
            </h3>
            <p className="text-base lg:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-serif italic">
              Pinned to the office wall — the milestones, certificates and small celebrations behind the work.
            </p>
          </div>

          {/* SCRAPBOOK COLLAGE */}
          <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start relative">

            {/* Decorative scattered elements (absolute positioned in grid) */}
            <span className="hidden lg:block absolute top-[35%] left-[58%] text-xl text-[#C9A227]/60 rotate-12 select-none pointer-events-none z-10">✦</span>
            <span className="hidden lg:block absolute top-[65%] left-[8%] text-2xl text-[#2C78C5]/50 -rotate-12 select-none pointer-events-none z-10">✶</span>
            <span className="hidden lg:block absolute top-[80%] right-[12%] text-lg text-[#E11D48]/60 rotate-45 select-none pointer-events-none z-10">✦</span>

            {/* Handwritten arrow annotation pointing to team photo */}
            <div className="hidden lg:block absolute top-[2%] right-[5%] z-20 rotate-[-8deg] select-none pointer-events-none">
              <div className="font-serif italic text-[#0A1A2F] text-sm flex items-center gap-2">
                <span>← Our crew!</span>
              </div>
            </div>

            {/* Item 1 — Team celebration (large feature) */}
            <motion.figure
              initial={{ opacity: 0, y: 30, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
              className="col-span-12 lg:col-span-7 relative bg-white p-3 lg:p-4 pb-14 lg:pb-16 shadow-[0_18px_48px_rgba(10,26,47,0.18)] rounded-sm"
            >
              {/* Washi tape */}
              <div className="absolute -top-4 left-12 w-24 h-7 bg-[#FFE082]/80 rotate-[-8deg] shadow-sm" style={{ clipPath: 'polygon(4% 0, 96% 0, 100% 100%, 0 100%)' }} />
              {/* Sticker badge */}
              <div className="absolute -top-3 -right-3 z-20 w-16 h-16 rounded-full bg-[#2C78C5] text-white flex items-center justify-center rotate-[12deg] shadow-lg">
                <div className="text-center leading-tight">
                  <div className="text-[8px] font-black uppercase tracking-[0.2em]">The</div>
                  <div className="text-[11px] font-black uppercase">Team</div>
                </div>
              </div>
              {/* Photo corner brackets */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#0A1A2F]/30 z-10" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#0A1A2F]/30 z-10" />
              <div className="aspect-[16/8] bg-slate-100 overflow-hidden rounded-sm">
                <img
                  src="/scrapbook/team-celebration.jpg"
                  alt="Money Compound team celebration"
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Date stamp */}
              <div className="absolute bottom-14 lg:bottom-16 right-4 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#0A1A2F]/40 border border-[#0A1A2F]/30 px-2 py-0.5 rotate-[-3deg] bg-white">
                · 2025 ·
              </div>
              <figcaption className="absolute bottom-3 left-0 right-0 text-center font-serif italic text-slate-800">
                <span className="text-base lg:text-lg">The Money Compound team</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] not-italic text-slate-600 mt-1">
                  Office Celebration
                </span>
              </figcaption>
            </motion.figure>

            {/* Item 2 — Fastrack Magazine */}
            <motion.figure
              initial={{ opacity: 0, y: 30, rotate: 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
              className="col-span-12 sm:col-span-6 lg:col-span-5 relative bg-white p-3 lg:p-4 pb-14 shadow-[0_18px_48px_rgba(10,26,47,0.18)] rounded-sm"
            >
              {/* Pin */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#C9A227] to-[#8B6914] shadow-md ring-2 ring-white z-20" />
              {/* Sticker badge */}
              <div className="absolute -top-4 -left-4 z-20 w-14 h-14 rounded-full bg-[#E11D48] text-white flex items-center justify-center rotate-[-15deg] shadow-lg">
                <div className="text-center leading-tight">
                  <div className="text-[8px] font-black uppercase tracking-[0.1em]">★</div>
                  <div className="text-[9px] font-black uppercase tracking-[0.05em]">Featured</div>
                </div>
              </div>
              {/* Photo corner brackets */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#0A1A2F]/30 z-10" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#0A1A2F]/30 z-10" />
              <div className="aspect-[3/4] bg-white overflow-hidden rounded-sm flex items-center justify-center">
                <img
                  src="/scrapbook/fastrack-magazine.jpg"
                  alt="Featured in Fastrack magazine"
                  draggable={false}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Date stamp */}
              <div className="absolute bottom-14 right-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#0A1A2F]/40 border border-[#0A1A2F]/30 px-2 py-0.5 rotate-[3deg] bg-white">
                Apr–Jun &apos;25
              </div>
              <figcaption className="absolute bottom-3 left-0 right-0 text-center font-serif italic text-slate-800">
                <span className="text-base">Featured in Fastrack Magazine</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] not-italic text-slate-600 mt-1">
                  Issue 84 · 2025
                </span>
              </figcaption>
            </motion.figure>

            {/* Item 3 — NISM Certificate */}
            <motion.figure
              initial={{ opacity: 0, y: 30, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
              className="col-span-12 sm:col-span-6 lg:col-span-5 relative bg-white p-3 lg:p-4 pb-12 shadow-[0_16px_42px_rgba(10,26,47,0.16)] rounded-sm"
            >
              {/* Washi tape */}
              <div className="absolute -top-3 right-10 w-20 h-6 bg-[#A5D6A7]/80 rotate-[6deg] shadow-sm" style={{ clipPath: 'polygon(4% 0, 96% 0, 100% 100%, 0 100%)' }} />
              {/* Sticker badge */}
              <div className="absolute -top-3 -left-3 z-20 w-14 h-14 rounded-full bg-[#0A1A2F] text-white flex items-center justify-center rotate-[-12deg] shadow-lg">
                <div className="text-center leading-tight">
                  <div className="text-[8px] font-black uppercase tracking-[0.1em] text-[#C9A227]">NISM</div>
                  <div className="text-[8px] font-black uppercase tracking-[0.05em]">Pass</div>
                </div>
              </div>
              {/* Photo corner brackets */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#0A1A2F]/30 z-10" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#0A1A2F]/30 z-10" />
              <div className="aspect-[7/5] bg-slate-50 overflow-hidden rounded-sm">
                <img
                  src="/scrapbook/nism-vipul.jpg"
                  alt="NISM Retirement Adviser certificate — Vipul Khandelwal"
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Date stamp */}
              <div className="absolute bottom-12 right-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#0A1A2F]/40 border border-[#0A1A2F]/30 px-2 py-0.5 rotate-[-2deg] bg-white">
                May &apos;25
              </div>
              <figcaption className="absolute bottom-2 left-0 right-0 text-center font-serif italic text-slate-800">
                <span className="text-sm">NISM Series XVII — Retirement Adviser</span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.3em] not-italic text-slate-600 mt-1">
                  Vipul Khandelwal
                </span>
              </figcaption>
            </motion.figure>

            {/* Item 4 — QPFP Certificate (Shruti) */}
            <motion.figure
              initial={{ opacity: 0, y: 30, rotate: 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ rotate: 0, y: -6, scale: 1.03 }}
              className="col-span-12 sm:col-span-6 lg:col-span-3 relative bg-white p-3 pb-12 shadow-[0_16px_42px_rgba(10,26,47,0.16)] rounded-sm"
            >
              {/* Pin */}
              <div className="absolute -top-2 right-6 w-4 h-4 rounded-full bg-gradient-to-br from-[#E11D48] to-[#9F1239] shadow-md ring-2 ring-white z-20" />
              {/* Sticker badge */}
              <div className="absolute -top-3 -left-3 z-20 w-14 h-14 rounded-full bg-[#C9A227] text-white flex items-center justify-center rotate-[10deg] shadow-lg">
                <div className="text-center leading-tight">
                  <div className="text-[7px] font-black uppercase tracking-[0.1em]">Qualified</div>
                  <div className="text-[8px] font-black uppercase">QPFP</div>
                </div>
              </div>
              {/* Photo corner brackets */}
              <span className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#0A1A2F]/30 z-10" />
              <span className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#0A1A2F]/30 z-10" />
              <div className="aspect-[3/4] bg-slate-50 overflow-hidden rounded-sm">
                <img
                  src="/scrapbook/qpfp-shruti.jpg"
                  alt="QPFP certification — Shruti Khandelwal"
                  draggable={false}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <figcaption className="absolute bottom-2 left-0 right-0 text-center font-serif italic text-slate-800">
                <span className="text-sm">QPFP Certified</span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.3em] not-italic text-slate-600 mt-1">
                  Shruti · 2025
                </span>
              </figcaption>
            </motion.figure>

            {/* Item 5 — HDFC ERGO Certificate */}
            <motion.figure
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
              className="col-span-12 sm:col-span-6 lg:col-span-4 relative bg-white p-3 lg:p-4 pb-12 shadow-[0_16px_42px_rgba(10,26,47,0.16)] rounded-sm"
            >
              {/* Washi tape */}
              <div className="absolute -top-3 left-8 w-24 h-6 bg-[#EF9A9A]/80 rotate-[-5deg] shadow-sm" style={{ clipPath: 'polygon(4% 0, 96% 0, 100% 100%, 0 100%)' }} />
              {/* Sticker badge */}
              <div className="absolute -top-4 -right-3 z-20 w-16 h-16 rounded-full bg-[#9F1239] text-white flex items-center justify-center rotate-[15deg] shadow-lg">
                <div className="text-center leading-tight">
                  <div className="text-[10px] font-black tracking-tight">🏆</div>
                  <div className="text-[8px] font-black uppercase tracking-[0.1em]">Awarded</div>
                </div>
              </div>
              {/* Photo corner brackets */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#0A1A2F]/30 z-10" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#0A1A2F]/30 z-10" />
              <div className="aspect-[8/5] bg-slate-50 overflow-hidden rounded-sm">
                <img
                  src="/scrapbook/hdfc-ergo-recognition.jpg"
                  alt="HDFC ERGO Certificate of Recognition"
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Date stamp */}
              <div className="absolute bottom-12 right-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#0A1A2F]/40 border border-[#0A1A2F]/30 px-2 py-0.5 rotate-[2deg] bg-white">
                Jul &apos;25
              </div>
              <figcaption className="absolute bottom-2 left-0 right-0 text-center font-serif italic text-slate-800">
                <span className="text-sm">HDFC ERGO · Certificate of Recognition</span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.3em] not-italic text-slate-600 mt-1">
                  Fresh Premium Champion
                </span>
              </figcaption>
            </motion.figure>

            {/* Decorative "sticky note" with handwritten quote */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ rotate: 0, y: -6 }}
              className="col-span-12 sm:col-span-6 lg:col-span-5 hidden lg:block relative"
            >
              <div className="relative bg-[#FFF59D] p-6 lg:p-8 shadow-[0_14px_36px_rgba(10,26,47,0.18)] rounded-sm overflow-hidden">
                {/* Folded corner */}
                <div className="absolute top-0 right-0 w-10 h-10 bg-[#FBC02D]/40" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                {/* Tape */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-white/70 rotate-[-3deg] shadow-sm" />

                <div className="font-serif italic text-[#0A1A2F] text-base lg:text-lg leading-relaxed">
                  &ldquo;Behind every portfolio is a family — and behind every family, our team that shows up every day to do the work.&rdquo;
                </div>

                {/* Signature line */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-12 h-px bg-[#0A1A2F]/40" />
                  <span className="font-serif italic text-sm text-[#0A1A2F]/85">
                    Vipul &amp; Team
                  </span>
                </div>

                {/* Doodle stars */}
                <span className="absolute bottom-4 right-6 text-[#C9A227] text-xl rotate-12 select-none">✦</span>
                <span className="absolute bottom-8 right-12 text-[#C9A227]/70 text-sm -rotate-12 select-none">✶</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- TEAM RAIL — Drag-to-Scroll Premium Light --- */}
      <section className="relative pt-8 pb-20 lg:pt-10 lg:pb-24 overflow-hidden bg-[#E5E7EB]">
        {/* Backdrop atmospherics */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2C78C5]/8 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/8 rounded-full blur-[160px]" />
        </div>

        {/* HEADER */}
        <div className="max-w-7xl mx-auto px-6 relative mb-10 lg:mb-12">
          <div className="text-center reveal-up">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-px bg-[#C9A227]" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-600">
                Meet The People
              </span>
              <span className="w-10 h-px bg-[#C9A227]" />
            </div>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95]"
                style={{ color: '#0A1A2F' }}>
              Our{' '}
              <span className="italic font-serif font-bold" style={{ color: '#2C78C5' }}>Team</span>
            </h3>
            <div className="inline-flex items-center gap-3 mt-5 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-600">
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              <span>Drag to explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* DRAG RAIL */}
        <div
          ref={teamRailRef}
          className="relative overflow-x-auto cursor-grab active:cursor-grabbing select-none team-rail"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={(e) => {
            const rail = teamRailRef.current
            if (!rail) return
            teamDragRef.current.isDown = true
            teamDragRef.current.moved = false
            teamDragRef.current.startX = e.pageX - rail.offsetLeft
            teamDragRef.current.scrollLeft = rail.scrollLeft
          }}
          onMouseLeave={() => { teamDragRef.current.isDown = false }}
          onMouseUp={() => { teamDragRef.current.isDown = false }}
          onMouseMove={(e) => {
            const rail = teamRailRef.current
            if (!rail || !teamDragRef.current.isDown) return
            e.preventDefault()
            const x = e.pageX - rail.offsetLeft
            const walk = (x - teamDragRef.current.startX) * 1.6
            rail.scrollLeft = teamDragRef.current.scrollLeft - walk
            if (Math.abs(walk) > 4) teamDragRef.current.moved = true
          }}
        >
          <style jsx>{`
            .team-rail::-webkit-scrollbar { display: none; }
          `}</style>

          <div className="flex gap-5 lg:gap-6 px-6 lg:px-12 py-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="group flex-shrink-0 w-[200px] sm:w-[220px] lg:w-[240px] bg-white rounded-2xl border-4 border-white shadow-[0_6px_22px_rgba(10,26,47,0.10)] hover:shadow-[0_18px_44px_rgba(10,26,47,0.18)] transition-all duration-400 p-6 pt-7 flex flex-col items-center text-center"
              >
                {/* Avatar */}
                <div className="relative mb-5">
                  <div className="w-[120px] h-[120px] lg:w-[130px] lg:h-[130px] rounded-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 ring-2 ring-white shadow-md flex items-center justify-center">
                    {member.imgSrc ? (
                      <img
                        src={member.imgSrc}
                        alt={member.name}
                        draggable={false}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    ) : (
                      <span className="text-3xl font-black text-slate-600 font-serif italic">
                        {member.initial}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <h4 className="text-base lg:text-lg font-black tracking-tight leading-snug"
                    style={{ color: '#0A1A2F' }}>
                  {member.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRINCIPLES (Horizontal Circle Cards + Dotted Connector) --- */}
      <section className="pt-12 pb-32 bg-white px-6">
        <div className="max-w-5xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-10 h-[1px] bg-slate-300" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#2C78C5]">Our Principles</span>
              <div className="w-10 h-[1px] bg-slate-300" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">What We Stand For</h3>
          </div>

          {/* Horizontal Circle Row */}
          <div className="flex flex-row items-center justify-center flex-wrap gap-0">
            {principles.map((p, i) => (
              <div key={i} className="flex flex-row items-center">

                {/* Full Circle Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="w-56 h-56 rounded-full bg-white border-[2.5px] border-[#1A3A5C] shadow-[0_8px_40px_rgba(26,58,92,0.12)] flex flex-col items-center justify-center text-center px-6 gap-3 hover:shadow-[0_12px_50px_rgba(44,120,197,0.2)] hover:border-[#2C78C5] transition-all duration-400 group cursor-default"
                >
                  {/* Icon Circle inside */}
                  <div className="w-11 h-11 rounded-full bg-[#1A3A5C] group-hover:bg-[#2C78C5] flex items-center justify-center transition-colors duration-300 shadow-md flex-shrink-0">
                    <p.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-sm font-black text-[#1A3A5C] group-hover:text-[#2C78C5] tracking-tight leading-tight transition-colors duration-300">{p.title}</h4>
                  <p className="text-[11px] text-slate-900 leading-snug font-black">{p.desc}</p>
                </motion.div>

                {/* Dotted Horizontal Connector — not after last */}
                {i < principles.length - 1 && (
                  <div
                    style={{
                      height: '3px',
                      width: '64px',
                      flexShrink: 0,
                      backgroundImage: 'repeating-linear-gradient(to right, #1A3A5C 0px, #1A3A5C 7px, transparent 7px, transparent 16px)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- FREQUENTLY ASKED QUESTIONS (Premium Institutional Accordion) --- */}
      <section className="pt-20 pb-32 bg-[#F8FAFC] px-6 border-t border-slate-200 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2C78C5]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-10 h-[1px] bg-slate-300" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#2C78C5]">Got Questions?</span>
              <div className="w-10 h-[1px] bg-slate-300" />
            </div>
            <h3 className="text-3xl lg:text-5xl font-black text-[#0B1A3A] tracking-tight mb-4">
              Frequently Asked <span className="text-[#2C78C5]">Questions</span>
            </h3>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium">
              Everything you need to know about our mutual fund distribution and wealth management approach.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`border transition-all duration-300 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md ${
                    isOpen ? 'border-[#2C78C5] ring-2 ring-[#2C78C5]/10' : 'border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-6 px-8 flex items-center justify-between gap-6 text-left transition-colors hover:bg-slate-50/50"
                  >
                    <span className={`text-lg lg:text-xl font-bold tracking-tight transition-colors ${
                      isOpen ? 'text-[#2C78C5]' : 'text-[#0B1A3A]'
                    }`}>
                      {faq.q}
                    </span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#2C78C5] text-white rotate-180' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-8 bg-slate-50/50 text-slate-800 text-base lg:text-lg leading-relaxed font-medium pl-8 border-l-4 border-[#2C78C5]">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Help CTA */}
          <div className="mt-12 text-center bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h4 className="text-xl font-bold text-[#0B1A3A] mb-1">Still have questions?</h4>
              <p className="text-sm text-slate-700">Can&apos;t find the answer you&apos;re looking for? Our team is here to help.</p>
            </div>
            <Link href="/contact-us" className="px-8 py-3.5 bg-[#0B1A3A] hover:bg-[#1A3A5C] text-white font-black text-sm tracking-widest uppercase rounded-xl shadow-lg hover:shadow-xl transition-all flex-shrink-0">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
