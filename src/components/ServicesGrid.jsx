import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Users, 
  Globe, 
  TrendingUp, 
  HeartHandshake, 
  Target, 
  Building2, 
  Receipt, 
  ShoppingBag,
  ChevronRight
} from 'lucide-react'
import gsap from '../lib/gsap'

const services = [
  {
    icon: Users,
    title: 'Individuals',
    desc: 'SIPs, scheme selection, tax saving and insurance — structured for salaried professionals, young families and first-time investors.',
    link: '/services/individuals',
  },
  {
    icon: Globe,
    title: 'NRI Investments',
    desc: 'FEMA-compliant investing from the UAE, Middle East, Singapore and beyond. NRE/NRO, DTAA and seamless repatriation.',
    link: '/services/nri',
  },
  {
    icon: TrendingUp,
    title: 'HNI Investments',
    desc: 'Sophisticated portfolio strategies, PMS & AIF access, estate planning, and dedicated Relationship Managers for ₹1 Cr+ portfolios.',
    link: '/services/hni',
  },
  {
    icon: HeartHandshake,
    title: 'Retiree Investments',
    desc: 'Reliable income strategies, SWP planning, senior citizen tax benefits and health cover — so you enjoy retirement, not worry about it.',
    link: '/services/retiree',
  },
  {
    icon: Target,
    title: 'Need-Based Selection',
    desc: 'Home, child\'s education, retirement, foreign travel — we map timeline and horizon details to suitable mutual fund schemes.',
    link: '/services/goal',
  },
  {
    icon: Building2,
    title: 'Corporate Sessions',
    desc: 'Financial wellness programs, employee investment workshops and CXO investment clinics for HR leaders and corporate teams.',
    link: '/services/corporate',
  },
  {
    icon: Receipt,
    title: 'Taxation Planning',
    desc: 'Capital gains optimization, ELSS structuring, old vs new regime, NRI/DTAA tax and ITR filing assistance.',
    link: '/services/tax',
  },
  {
    icon: ShoppingBag,
    title: 'Investment Products',
    desc: 'Mutual Funds, Stocks, Insurance, Loans, SIFs, Unlisted Shares, Bonds, NPS and more — all under one transparent roof.',
    link: '/products/mutual-funds',
  }
]

const ServicesGrid = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { 
          opacity: 0, 
          scale: 0.5, 
          rotateX: 30,
          y: 60,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.1,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-stone-gold relative overflow-hidden">
      {/* Premium Line Dividers */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-200 z-20" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-200 z-20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-brand-gold/40 rounded-full"></span>
            <span className="text-[12px] font-black text-brand-gold uppercase tracking-[0.25em]">What We Offer</span>
            <span className="w-10 h-[2px] bg-brand-gold/40 rounded-full"></span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#050d1f] mb-6 leading-tight tracking-tight">
            Investment Solutions Built <br />
            <span className="text-[#050d1f]">Around Your Life Goals</span>
          </h2>
          <p className="text-lg lg:text-xl text-[#1a2236] leading-relaxed max-w-2xl mx-auto font-medium">
            From your first SIP to succession planning — we guide every stage with due diligence-backed clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const handleMove = (e) => {
              const card = e.currentTarget
              const r = card.getBoundingClientRect()
              card.style.setProperty('--mx', `${e.clientX - r.left}px`)
              card.style.setProperty('--my', `${e.clientY - r.top}px`)
            }
            return (
              <Link
                key={i}
                href={service.link}
                ref={el => cardsRef.current[i] = el}
                onMouseMove={handleMove}
                className="spotlight-card group relative block p-7 bg-white rounded-[20px] border border-slate-200/80 overflow-hidden isolate"
              >
                {/* Cursor-tracking spotlight (under content) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(10,31,68,0.10), transparent 45%)'
                  }}
                />
                {/* Inner border gradient ring that lights up under the cursor */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(10,31,68,0.55), transparent 50%)',
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1px'
                  }}
                />

                {/* Icon — quiet square that becomes solid navy on hover (no scale gimmick) */}
                <div className="relative w-11 h-11 rounded-xl bg-[#f4f5f9] flex items-center justify-center mb-5 transition-colors duration-500 group-hover:bg-[#0a1f44]">
                  <service.icon className="w-5 h-5 text-[#0a1f44] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>

                <h3 className="text-[20px] font-serif font-bold text-[#050d1f] mb-2 tracking-tight">
                  {service.title}
                </h3>

                <p className="text-[#1a2236] text-[15px] leading-[1.6] mb-7 font-medium">
                  {service.desc}
                </p>

                {/* Footer row — label slides left, chevron resolves into a filled pill */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="text-[11.5px] font-black uppercase tracking-[0.22em] text-[#050d1f] transition-transform duration-500 group-hover:translate-x-1">
                    Explore Details
                  </span>
                  <span className="relative w-9 h-9 rounded-full flex items-center justify-center bg-transparent text-[#050d1f] group-hover:bg-[#050d1f] group-hover:text-white transition-all duration-500 ease-out border border-[#050d1f]/15">
                    <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesGrid
