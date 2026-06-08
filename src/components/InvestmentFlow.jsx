import React from 'react'
import { motion } from 'framer-motion'
import { Search, PenTool, PlayCircle, BarChart3 } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Discovery',
    desc: 'We start by understanding your goals, time horizon, and comfort with risk through a structured conversation. No jargon, no pressure — just clarity on what you want your money to do.',
    color: 'from-[#B48A30] to-[#D4AF37]'
  },
  {
    icon: PenTool,
    title: 'Scheme Selection',
    desc: 'Based on your goals, we shortlist suitable mutual fund schemes — screened on track record, expense ratio, and category fit. We explain the options in plain language; the final choice is always yours.',
    color: 'from-[#0F172A] to-[#334155]'
  },
  {
    icon: PlayCircle,
    title: 'Paperless Execution',
    desc: 'We handle KYC and onboarding end-to-end and help you complete your investments digitally across AMFI-registered AMCs. Secure, fast, and fully paperless.',
    color: 'from-[#0D9488] to-[#2DD4BF]'
  },
  {
    icon: BarChart3,
    title: 'Periodic Reviews',
    desc: 'We share regular portfolio statements and sit down with you to review progress against your goals. Any change to your investments is made only with your approval.',
    color: 'from-[#B48A30] to-[#D4AF37]'
  }
]

const InvestmentFlow = () => {
  return (
    <section className="py-20 lg:py-24 bg-cool-sky relative overflow-hidden">
      {/* Subtle Background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <circle cx="500" cy="500" r="400" fill="none" stroke="black" strokeWidth="0.5" />
          <circle cx="500" cy="500" r="300" fill="none" stroke="black" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-brand-gold/40"></span>
            <span className="text-[12px] font-black text-brand-gold uppercase tracking-[0.3em]">How We Work With You</span>
            <span className="w-12 h-[1px] bg-brand-gold/40"></span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-serif font-bold text-brand-navy mb-8 leading-tight tracking-tight">
            A Simple, <br />
            <span className="gold-gradient">Transparent Process</span>
          </h2>
          <p className="text-xl text-slate-900 leading-relaxed max-w-2xl mx-auto font-medium">
            Four clear steps — built around your goals and executed on your instructions. You make every decision; we handle the legwork.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Dotted Curved Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-40 hidden lg:block -translate-y-1/2 pointer-events-none overflow-visible">
            <svg className="w-full h-full" viewBox="0 0 1000 100">
              <path
                d="M50,50 Q250,150 500,50 T950,50"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeDasharray="6,8"
              />
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 relative items-stretch">
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 w-full sm:w-[240px] flex">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full flex"
                >
                  <motion.div
                    whileHover={{ y: -12, rotate: i % 2 === 0 ? 3 : -3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-full p-7 bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] border-[1px] border-slate-300 flex flex-col items-center text-center group transition-shadow duration-500 cursor-pointer hover:shadow-xl"
                  >
                    {/* Step Number Circle */}
                    <div className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold mb-5 text-sm shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                      {i + 1}
                    </div>

                    <h3 className="text-lg font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors">{step.title}</h3>
                    <p className="text-[13.5px] text-slate-900 leading-relaxed font-medium">{step.desc}</p>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InvestmentFlow
