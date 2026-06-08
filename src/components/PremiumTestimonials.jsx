import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    text: 'Managing investments in India from Dubai always felt like a headache. Money Compound made the entire process smooth, transparent and completely digital. Finally confident about my money back home.',
    name: 'Rohan Kapoor',
    category: 'NRI Investor · IT Professional, Dubai'
  },
  {
    text: 'Retired two years ago and was nervous about managing my corpus. Their SWP setup and tax-efficient planning has given me regular monthly income without touching my principal. Stress-free.',
    name: 'Sushma Mishra',
    category: 'Retiree · Lucknow'
  },
  {
    text: 'I used to be sold insurance as investment. Vipul and team rebuilt my financial plan, separated protection from investments, and my portfolio is finally aligned to my actual goals.',
    name: 'Aakash Khurana',
    category: 'HNI Investor · Business Owner, Delhi NCR'
  }
]

const PremiumTestimonials = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="py-16 md:py-20 bg-white overflow-hidden px-4 md:px-10">
      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto h-[400px] lg:h-[460px] overflow-hidden flex items-center rounded-3xl lg:rounded-[3rem] shadow-2xl text-white"
        style={{
          background: `
            radial-gradient(ellipse 60% 75% at 100% 100%, rgba(96, 165, 250, 0.45) 0%, transparent 65%),
            radial-gradient(ellipse 50% 60% at 0% 0%, rgba(37, 99, 235, 0.30) 0%, transparent 60%),
            linear-gradient(135deg, #0a1733 0%, #1e3a8a 45%, #2563eb 80%, #60a5fa 100%)
          `
        }}
      >

      {/* Auto-Rotating Content Container */}
      <div className="absolute inset-0 flex h-full z-20">

        {/* Content Container (Centered) */}
        <div className="relative h-full w-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-5xl mx-auto z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <Quote className="absolute -top-8 -left-6 w-12 h-12 lg:w-16 lg:h-16 text-white/10 rotate-180 -z-10" fill="currentColor" />
              <Quote className="absolute -bottom-8 right-10 lg:right-32 w-12 h-12 lg:w-16 lg:h-16 text-white/10 -z-10" fill="currentColor" />

              <p className="text-lg md:text-xl lg:text-2xl text-white font-sans leading-[1.6] mb-4 max-w-3xl font-semibold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                &quot;{testimonials[current].text}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-8 h-[2px] bg-white/70" />
                <div>
                  <h4 className="text-lg lg:text-xl font-normal text-white tracking-tight">{testimonials[current].name}</h4>
                  <p className="text-white/90 text-[14px] lg:text-[17px] italic tracking-normal mt-1.5" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, letterSpacing: '0.005em' }}>{testimonials[current].category}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Dots Indicator (Static Bottom Right) */}
      <div className="absolute bottom-6 lg:bottom-8 right-8 lg:right-24 z-40 hidden md:flex items-center gap-3">
        {testimonials.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${current === i ? 'bg-white w-6' : 'bg-white/30'}`}
          />
        ))}
      </div>

      </motion.section>
    </div>
  )
}

export default PremiumTestimonials
