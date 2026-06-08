import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    stars: 5,
    text: 'Managing investments in India from Dubai always felt like a headache. Money Compound made the entire process smooth, transparent and completely digital. Finally confident about my money back home.',
    name: 'Rajeev Kumar',
    role: 'NRI Client · Dubai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    accent: '#2C78C5'
  },
  {
    stars: 5,
    text: 'Retired two years ago and was nervous about managing my corpus. Their SWP strategy and tax-efficient planning has given me regular income without touching my principal. Truly stress-free.',
    name: 'Sunita Mehra',
    role: 'Retiree · Pune',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    accent: '#52C19E'
  },
  {
    stars: 5,
    text: 'I used to get sold insurance as investment. Vipul and team redid my entire financial plan, separated protection from investments, and my portfolio IRR has jumped significantly. Genuine professionals.',
    name: 'Ashish Kapoor',
    role: 'HNI Client · Mumbai',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    accent: '#2C78C5'
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-12 bg-white relative overflow-hidden" data-scroll-section>
      {/* Minimalist Background Image */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
          alt="Abstract Network" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Soft Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-brand-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-brand-green/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1.5px] w-10 bg-brand-green/40" />
            <span className="text-[11px] font-black tracking-[0.4em] text-slate-400 uppercase">Voices of Trust</span>
            <div className="h-[1.5px] w-10 bg-brand-green/40" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-black text-slate-950 font-['Playfair_Display'] italic"
          >
            Real Stories. <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">Real Growth.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative group"
            >
              <div className="h-full bg-white p-6 rounded-xl border border-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)] transition-all duration-500 flex flex-col relative overflow-hidden group-hover:border-brand-blue/30">
                
                <Quote className="absolute -top-4 right-8 w-20 h-20 text-slate-50 -z-0 group-hover:text-brand-blue/5 transition-colors" />

                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, idx) => (
                    <Star key={idx} size={16} fill={t.accent} className="text-transparent" />
                  ))}
                </div>

                <p className="text-slate-600 text-base leading-relaxed relative z-10 font-medium italic mb-8">
                  &quot;{t.text}&quot;
                </p>

                <div className="mt-auto flex items-center gap-5 pt-6 border-t border-slate-50">
                  <div className="relative">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-lg object-cover relative z-10 border border-slate-100 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <div className="text-slate-950 font-black text-lg tracking-tight leading-none mb-1">{t.name}</div>
                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
