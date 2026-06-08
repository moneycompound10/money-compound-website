import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  Users, 
  Globe, 
  TrendingUp as HniIcon, 
  HeartHandshake, 
  Target, 
  Briefcase, 
  FileText, 
  Briefcase as ProductsIcon 
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const services = [
  {
    icon: Users,
    title: 'Individuals',
    desc: 'SIPs, scheme selection and tax saving structured for young families.',
  },
  {
    icon: Globe,
    title: 'NRI Investments',
    desc: 'FEMA-compliant investing with seamless repatriation.',
  },
  {
    icon: HniIcon,
    title: 'HNI Distribution',
    desc: 'Sophisticated product access and dedicated relationship management for ₹1 Cr+ portfolios.',
  },
  {
    icon: HeartHandshake,
    title: 'Retiree Planning',
    desc: 'Reliable income strategies and senior citizen tax benefits.',
  },
  {
    icon: Target,
    title: 'Need-Based Selection',
    desc: 'Timeline and horizon matching for education, retirement, and travel.',
  },
  {
    icon: Briefcase,
    title: 'Corporate Wellness',
    desc: 'Investment workshops and CXO investment clinics.',
  },
  {
    icon: FileText,
    title: 'Tax Planning',
    desc: 'Capital gains optimization and ITR assistance.',
  },
  {
    icon: ProductsIcon,
    title: 'All Products',
    desc: 'Mutual Funds, Stocks, Bonds and NPS under one roof.',
    cta: 'Explore'
  }
]

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-[1px] w-8 bg-brand-gold" />
            <span className="text-[9px] font-bold tracking-[0.4em] text-brand-gold uppercase">What We Offer</span>
            <div className="h-[1px] w-8 bg-brand-gold" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-serif font-bold text-brand-navy mb-4"
          >
            Investment Solutions for Every Stage
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 text-sm"
          >
            From your first investment to legacy planning, we guide you with clarity.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              ref={el => cardsRef.current[i] = el}
              whileHover={{ y: -5 }}
              className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5">
                <s.icon size={18} className="text-brand-gold" />
              </div>

              <h3 className="text-base font-bold text-brand-navy mb-2">
                {s.title}
              </h3>

              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                {s.desc}
              </p>

              <div className="mt-auto flex items-center gap-2 text-[8px] font-bold tracking-widest uppercase text-brand-gold">
                {s.cta || 'Details'} <ChevronRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
