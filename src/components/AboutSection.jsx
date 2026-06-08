import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Shield, Users, BarChart4, Rocket } from 'lucide-react'

const pillars = [
  { icon: Users, label: 'Global Clients', val: '10K+', sub: 'Network' },
  { icon: Shield, label: 'Investments Facilitated', val: '₹180 Cr+', sub: 'AUA' },
  { icon: BarChart4, label: 'Expert Team', val: '50+', sub: 'Professionals' },
  { icon: Rocket, label: 'Experience', val: '18+ Yrs', sub: 'Excellence' },
]

const points = [
  '360-Degree Solutions',
  'CAs & CSs Experts',
  'Need-Based Selection',
  'Digital Tracking',
]

export default function AboutSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-slate-50 h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                alt="Money Compound Vision"
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-[1px] w-6 bg-brand-gold" />
                <span className="text-[9px] font-bold tracking-[0.4em] text-slate-400 uppercase">Our Identity</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold leading-tight text-brand-navy">
                Investing Made Simple with <br />
                <span className="gold-gradient">Precision & Ethics.</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                Money Compound is a collective of CAs, CSs, and CFP-qualified professionals with 18+ Yrs. We help clients access mutual fund and investment product solutions through structured, horizon-aligned scheme matching.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              {points.map((p, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 transition-all duration-300 group"
                >
                  <CheckCircle size={14} className="text-brand-gold" />
                  <span className="text-xs font-bold text-slate-700 tracking-tight">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand-gold mb-4 group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                <p.icon size={18} />
              </div>
              <div className="text-xl font-bold text-brand-navy mb-0.5">{p.val}</div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{p.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
