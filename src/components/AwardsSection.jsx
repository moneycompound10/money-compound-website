import React from 'react'
import { motion } from 'framer-motion'
import { Award, ShieldCheck, Star, CheckCircle } from 'lucide-react'

const awards = [
  {
    icon: Award,
    title: 'AMFI Registered MFD',
    sub: 'ARN-140318'
  },
  {
    icon: Star,
    title: 'FPSB Certified',
    sub: 'CFP Credential'
  },
  {
    icon: ShieldCheck,
    title: 'Top Performing MFD 2024',
    sub: 'Regional Recognition'
  },
  {
    icon: CheckCircle,
    title: 'ISO 27001 Compliant',
    sub: 'Data Security'
  }
]

export default function AwardsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-10">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black tracking-[0.5em] text-brand-green uppercase mb-4 block">Recognition</span>
          <h2 className="text-4xl font-black text-slate-950 tracking-tighter">Awards & Certifications</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 text-center group hover:shadow-lg transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-brand-blue mx-auto mb-6 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-inner">
                <a.icon size={28} />
              </div>
              <h4 className="text-slate-900 font-black tracking-tight leading-snug mb-1">{a.title}</h4>
              <div className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{a.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
