import React, { useEffect, useRef, useState } from 'react'
import { Play, Quote } from 'lucide-react'
import gsap from '../lib/gsap'

const testimonials = [
  {
    name: 'Bhashit Ji',
    headline: 'A Client Shares His Money Compound Experience',
    youtubeId: 'v48iUCfbfu8',
    image: 'https://img.youtube.com/vi/v48iUCfbfu8/hqdefault.jpg'
  },
  {
    name: 'Prakash Ji',
    headline: 'A Client Shares His Money Compound Experience',
    youtubeId: 'caRhTNt-dMg',
    image: 'https://img.youtube.com/vi/caRhTNt-dMg/hqdefault.jpg'
  }
]

const VideoTestimonials = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const [playingIndex, setPlayingIndex] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        {
          opacity: 0,
          y: 80,
          rotateX: -30,
          perspective: 1000
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 0%, rgba(148, 163, 184, 0.18) 0%, transparent 70%),
          linear-gradient(180deg, #f8fafc 0%, #dde5ef 100%)
        `
      }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-200 z-20" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-200 z-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-brand-gold/40 rounded-full"></span>
            <span className="text-[12px] font-black text-brand-gold uppercase tracking-[0.25em]">Testimonials</span>
            <span className="w-10 h-[2px] bg-brand-gold/40 rounded-full"></span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-serif font-semibold text-brand-navy mb-6 leading-tight tracking-tight">
            In Their Own Words, <br />
            <span className="gold-gradient">From Our Clients</span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-900 leading-relaxed max-w-2xl mx-auto font-medium">
            Real conversations with clients on what working with Money Compound has meant for their financial journey.
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '1000px' }}>
          {testimonials.map((t, i) => (
            <div
              key={t.youtubeId}
              ref={el => cardsRef.current[i] = el}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-300 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                {playingIndex === i ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${t.youtubeId}?autoplay=1&rel=0`}
                    title={`Client testimonial — ${t.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingIndex(i)}
                    aria-label={`Play testimonial by ${t.name}`}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                  >
                    <img
                      src={t.image}
                      alt={`Client testimonial by ${t.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-brand-navy/30 group-hover:bg-brand-navy/15 transition-colors" />
                    <Quote className="absolute top-4 left-4 w-8 h-8 text-white/70 drop-shadow-lg" fill="currentColor" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-300">
                        <Play className="w-5 h-5 text-brand-navy group-hover:text-white fill-current ml-0.5" />
                      </div>
                    </div>
                  </button>
                )}
              </div>
              <div className="p-6">
                <p className="text-[11px] font-black text-brand-gold uppercase tracking-widest mb-2">Client Testimonial</p>
                <h3 className="text-xl font-bold text-brand-navy mb-2 leading-snug group-hover:text-brand-gold transition-colors">
                  {t.headline}
                </h3>
                <div className="flex items-center gap-3 mt-3">
                  <span className="w-6 h-[2px] bg-brand-gold/60" />
                  <p className="text-[12px] font-black text-slate-900 uppercase tracking-widest">By {t.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VideoTestimonials
