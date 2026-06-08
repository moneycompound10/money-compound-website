import React, { useEffect, useRef, useState } from 'react'
import { Play, Tv } from 'lucide-react'
import gsap from '../lib/gsap'
import Link from 'next/link'

const YoutubeIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const videos = [
  {
    title: 'Mutual Funds for Minors',
    author: 'Vipul Khandelwal (CA, CS, CFP)',
    duration: '8 min',
    youtubeId: 'Maoay_AKIOY',
    image: 'https://img.youtube.com/vi/Maoay_AKIOY/hqdefault.jpg'
  },
  {
    title: 'How to Generate Regular Income through SWP',
    author: 'Money Compound Research',
    duration: '6 min',
    youtubeId: 'muoLyft0lUM',
    image: 'https://img.youtube.com/vi/muoLyft0lUM/hqdefault.jpg'
  },
  {
    title: 'How to Become Rich? Power of Compounding',
    author: 'Vipul Khandelwal',
    duration: '11 min',
    youtubeId: 'ZhdgcffX10Q',
    image: 'https://img.youtube.com/vi/ZhdgcffX10Q/hqdefault.jpg'
  },
  {
    title: 'Complete Guide on Stock Market Taxation',
    author: 'Money Compound',
    duration: '9 min',
    youtubeId: 'Uj65vVUm_rc',
    image: 'https://img.youtube.com/vi/Uj65vVUm_rc/hqdefault.jpg'
  }
]

const VideoSection = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const [playingIndex, setPlayingIndex] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { 
          opacity: 0, 
          y: 100,
          rotateX: -45,
          perspective: 1000
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.out",
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
    <section ref={sectionRef} className="relative py-20 lg:py-24 bg-sky-soft overflow-hidden">
      {/* Premium Line Dividers */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-200 z-20" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-200 z-20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-brand-gold/40 rounded-full"></span>
            <span className="text-[12px] font-black text-brand-gold uppercase tracking-[0.25em]">Money Compound TV</span>
            <span className="w-10 h-[2px] bg-brand-gold/40 rounded-full"></span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-serif font-semibold text-brand-navy mb-6 leading-tight tracking-tight">
            Learn Investing, <br />
            <span className="gold-gradient">One Video at a Time</span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-900 mb-8 leading-relaxed max-w-2xl mx-auto font-medium">
            Free educational videos on mutual funds, NRI investing, taxation, retirement and goal planning — explained in simple Hindi & English by our founder and research team.
          </p>
          <div className="flex justify-center">
            <Link
              href="https://www.youtube.com/@moneycompoundwealth"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button !px-8 !py-3 text-xs flex items-center gap-3 shadow-xl !rounded-full uppercase tracking-widest font-semibold"
              style={{ background: '#000000', color: '#ffffff' }}
            >
              <YoutubeIcon size={20} className="text-white" />
              Subscribe on YouTube
            </Link>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1000px' }}>
          {videos.map((vid, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group bg-white rounded-2xl overflow-hidden border-[1px] border-slate-300 hover:border-brand-gold/20 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-video overflow-hidden">
                {playingIndex === i ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1&rel=0`}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingIndex(i)}
                    aria-label={`Play ${vid.title}`}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                  >
                    <img
                      src={vid.image}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-brand-navy/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-300">
                        <Play className="w-3 h-3 text-brand-navy group-hover:text-white fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded-md">
                      {vid.duration}
                    </div>
                  </button>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-brand-navy mb-2 line-clamp-2 leading-snug group-hover:text-brand-gold transition-colors">
                  {vid.title}
                </h3>
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">By {vid.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VideoSection
