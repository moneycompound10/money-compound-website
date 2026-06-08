import React from 'react'
import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  Lightbulb, 
  Smartphone, 
  Trophy, 
  UserPlus, 
  Headphones,
  ArrowRight
} from 'lucide-react'

const reasons = [
  { icon: ShieldCheck, title: 'AMFI Registered', desc: 'Registered mutual fund distributor operating within SEBI / AMFI norms.' },
  { icon: Lightbulb, title: 'Certified Team', desc: 'CA, CS and CFP-qualified professionals with institutional experience.' },
  { icon: Smartphone, title: 'Digital First', desc: 'Sophisticated paperless onboarding for the modern investor.' },
  { icon: Trophy, title: 'Disciplined Process', desc: 'Need-aligned, process-driven approach across market cycles.' },
]

export default function CTASection() {
  return (
    <section className="py-28 relative overflow-hidden" data-scroll-section>
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-brand-blue/[0.04] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-10 relative z-10">
        
        {/* Main CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative glass-card border-shade p-12 lg:p-20 rounded-[3rem] overflow-hidden shadow-elite border border-white/50"
        >
          <div className="glow-node top-8 right-8" />
          <div className="glow-node bottom-8 left-8" />
          <div className="light-sweep" />
          
          <div className="relative z-10 grid lg:grid-cols-5 gap-24 items-center">
            
            {/* Left - Content (Col Span 3) */}
            <div className="lg:col-span-3 space-y-12">
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="h-[2px] w-12 bg-brand-blue shadow-glow" />
                  <span className="text-[10px] font-black tracking-[0.6em] text-brand-blue uppercase">JOIN THE INSTITUTION</span>
                  <div className="h-[2px] w-12 bg-brand-blue shadow-glow" />
                </motion.div>
                
                <h2 className="text-2xl lg:text-4xl font-black text-slate-900 leading-[1.05] tracking-tight">
                  Ready to Compound <br/>
                  <span className="text-brand-green italic">Your Portfolio?</span>
                </h2>
                
                <p className="text-slate-600 text-sm leading-relaxed max-w-lg font-light">
                  Book a free 30-minute goal review with our team. No fees. No obligation. Just honest, professional guidance for your financial future.
                </p>
              </div>

              <div className="flex flex-wrap gap-8 pt-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-slate-900 text-white font-black rounded-full text-[10px] uppercase tracking-[0.25em] shadow-premium transition-all border border-slate-900 group relative overflow-hidden"
                >
                  <div className="light-sweep" />
                  Become a Member <ArrowRight size={16} className="inline-block ml-3 text-brand-green group-hover:translate-x-2 transition-transform" />
                </motion.button>
                <button className="px-10 py-4 rounded-full border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-[0.25em] hover:bg-white transition-all shadow-soft flex items-center gap-3">
                  View Portfolios
                </button>
              </div>
            </div>

            {/* Right - Features Grid (Col Span 2) */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-8">
              {reasons.map((r, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  whileHover={{ y: -10 }}
                  className="group relative p-7 rounded-[2rem] glass-card border-shade overflow-hidden border border-white/40"
                >
                  <div className="glow-node top-3 right-3 opacity-30" />
                  <div className="light-sweep" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-11 h-11 rounded-xl bg-white shadow-soft flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 relative">
                       <div className="absolute inset-0 bg-brand-blue/5 rounded-2xl" />
                       <r.icon size={18} className="text-brand-blue relative z-10" />
                    </div>
                    <div className="text-[12px] font-black text-slate-900 mb-3 uppercase tracking-[0.1em]">{r.title}</div>
                    <div className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-[0.15em] opacity-80 group-hover:opacity-100 transition-opacity">{r.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Regulatory Ticker */}
        <div className="mt-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-[10px] font-black tracking-[0.6em] text-slate-400 uppercase mb-16"
          >
            LICENSED & REGULATED FINANCIAL INSTITUTION
          </motion.p>
          
          <div className="ticker-wrap relative py-12 overflow-hidden bg-white/50 backdrop-blur-3xl rounded-[3rem] border border-white/50 shadow-soft">
            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
            
            <motion.div 
              animate={{ x: [0, -1500] }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              className="flex gap-24 items-center whitespace-nowrap"
            >
              {[
                'SEBI REGISTERED', 'AMFI CERTIFIED', 'IRDA LICENSED', 'NSE MEMBER', 
                'BSE MEMBER', 'CDSL DEPOSITORY', 'NSDL REGISTERED', 'KYC COMPLIANT'
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-10">
                  <span className="text-xl lg:text-2xl font-black text-slate-900/8 italic tracking-tighter uppercase">{t}</span>
                  <div className="w-3 h-3 rounded-full bg-brand-blue/30" />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                'SEBI REGISTERED', 'AMFI CERTIFIED', 'IRDA LICENSED', 'NSE MEMBER', 
                'BSE MEMBER', 'CDSL DEPOSITORY', 'NSDL REGISTERED', 'KYC COMPLIANT'
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-10">
                  <span className="text-xl lg:text-2xl font-black text-slate-900/8 italic tracking-tighter uppercase">{t}</span>
                  <div className="w-3 h-3 rounded-full bg-brand-blue/30" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
