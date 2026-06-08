import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Building2, Globe2 } from 'lucide-react'

const stats = [
  { icon: Building2, label: '40+ AMCs', sub: 'Registered with AMFI' },
  { icon: Globe2, label: '25+ Countries', sub: 'NRI corridors covered' },
  { icon: ShieldCheck, label: '1000+ Families', sub: 'Onboarded since inception' },
]

const PartnerLogos = () => {
  return (
    <section
      className="py-16 lg:py-20 relative overflow-hidden text-white"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 50% 0%, rgba(51, 65, 85, 0.55) 0%, transparent 70%),
          linear-gradient(180deg, #1e293b 0%, #172033 100%)
        `
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[17px] font-black tracking-[0.5em] uppercase !text-white drop-shadow-lg mb-4"
          style={{ color: '#FFFFFF' }}
        >
          Pan-AMC Distribution
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white max-w-3xl mx-auto text-[15px] md:text-[16px] font-semibold leading-relaxed mb-12"
        >
          As an AMFI-registered Mutual Fund Distributor, we facilitate investments across all major Asset Management Companies (AMCs) registered with AMFI in India — covering equity, debt, hybrid, ELSS, index and international schemes.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-6 hover:bg-white/10 hover:border-brand-gold/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center mb-4 mx-auto shadow-lg shadow-brand-blue/30 ring-1 ring-white/15">
                <s.icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div className="text-white font-black text-lg tracking-tight mb-1">{s.label}</div>
              <div className="text-white/90 text-[11.5px] font-extrabold uppercase tracking-[0.2em]">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        <p className="text-white/85 text-[12.5px] font-semibold mt-10 max-w-2xl mx-auto leading-relaxed">
          AMC names and logos are property of the respective Asset Management Companies and are not displayed here; we work with all 40+ AMFI-registered AMCs in India on a fully transparent commission-disclosed basis.
        </p>
      </div>
    </section>
  )
}

export default PartnerLogos
