import React from 'react'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

// Premium 3D ebook cover — modelled on a real hardbound book mockup
// (CNBC-TV18 / Network18 style). White card background, book standing
// upright with realistic spine, ground shadow, and a hover tilt.
export default function EbookCard({ book, onClick, index = 0 }) {
  const {
    title,
    subtitle,
    color = '#0A1A2F',
    gradient,
    accent = '#D4AF37',
    volume,
    tagline,
    badge,
    tag,
    tagColor,
  } = book

  // Split title — first ~3 words bigger, rest smaller for a "book cover" feel
  const titleWords = title.split(' ')
  const titleTop = titleWords.slice(0, 1).join(' ').toUpperCase()
  const titleMain = titleWords.slice(1).join(' ').toUpperCase()

  const coverBg = gradient || `linear-gradient(160deg, ${color} 0%, ${color}DD 100%)`

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="ebook-card group cursor-pointer relative bg-white rounded-2xl border border-slate-200/80 shadow-[0_6px_24px_rgba(10,26,47,0.06)] hover:shadow-[0_18px_50px_rgba(10,26,47,0.14)] transition-shadow duration-500 overflow-hidden"
    >
      {/* ── Book stage — white card with book standing upright ───────────── */}
      <div className="relative h-[320px] sm:h-[340px] lg:h-[360px] flex items-end justify-center px-5 pt-5 pb-8"
           style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}>

        {/* Soft ground shadow (oval) — gives floating-book feel */}
        <div
          aria-hidden
          className="absolute bottom-5 left-[45%] -translate-x-1/2 w-[48%] h-3 rounded-full bg-black/30 blur-md opacity-70 group-hover:opacity-95 group-hover:translate-y-1 transition-all duration-700"
        />

        {/* The book — default tilt + gentle floating animation */}
        <motion.div
          initial={false}
          animate={{
            rotateY: [-35, -33, -35],
            y: [0, -4, 0]
          }}
          whileHover={{
            rotateY: -38,
            y: -10,
          }}
          transition={{
            rotateY: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative h-full aspect-[3/4] ebook-default-tilt"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
          }}
        >
          {/* Page edges (right side — paper stripes for depth) */}
          <div
            aria-hidden
            className="absolute top-[3%] right-[-3px] bottom-[3%] w-[6px] rounded-r-sm"
            style={{
              background:
                'repeating-linear-gradient(0deg, #faf6e7 0px, #faf6e7 1px, #e8e2cf 1px, #e8e2cf 2px)',
              boxShadow: 'inset -1px 0 2px rgba(0,0,0,0.15)',
              transform: 'translateZ(-4px)',
            }}
          />

          {/* Inner spine shadow (front face left edge) */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[8%]"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
              zIndex: 5,
            }}
          />

          {/* Cover (front face) — split: brand stripe on left, content on right */}
          <div
            className="absolute inset-0 rounded-sm overflow-hidden shadow-[12px_18px_30px_-10px_rgba(10,26,47,0.55)]"
            style={{ background: coverBg }}
          >
            {/* White content panel on right 2/3 — like the reference cover */}
            <div className="absolute top-0 bottom-0 right-0 w-[68%] bg-white">
              {/* Top brand row */}
              <div className="absolute top-3 left-4 right-3 flex items-start justify-between">
                <div className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Network 18
                </div>
                <div className="flex flex-col items-end leading-none">
                  <span className="text-[9px] font-black uppercase tracking-tight" style={{ color }}>
                    Money
                  </span>
                  <span className="text-[7px] font-black uppercase tracking-[0.1em] text-slate-400">
                    Compound
                  </span>
                </div>
              </div>

              {/* Title block — each word on its own line so long words never overflow */}
              <div className="absolute top-11 left-3 right-2">
                {titleTop && (
                  <div className="text-[14px] sm:text-[16px] font-black uppercase tracking-tight leading-[1.05] mb-1" style={{ color: '#1A1A1A' }}>
                    {titleTop}
                  </div>
                )}
                <h3
                  className="font-black uppercase leading-[1.05] tracking-tight break-words"
                  style={{
                    color: accent.startsWith('#FFF') ? color : accent,
                    fontSize: titleMain.length > 20 ? '15px' : '20px',
                  }}
                >
                  {titleMain.split(' ').slice(0, 2).join(' ')}
                </h3>
                {titleMain.split(' ').length > 2 && (
                  <div
                    className="font-black uppercase leading-[1.1] mt-1.5 tracking-tight break-words"
                    style={{
                      color: '#1A1A1A',
                      fontSize: titleMain.length > 20 ? '12px' : '14px',
                    }}
                  >
                    {titleMain.split(' ').slice(2).join(' ')}
                  </div>
                )}
              </div>

              {/* Growing-plant decoration (lower right of white panel) */}
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                className="absolute bottom-12 right-1 w-[60%] h-auto opacity-95"
              >
                <ellipse cx="50" cy="92" rx="18" ry="3.5" fill="#3E2A1B" opacity="0.85" />
                <path d="M50 92 Q49 70 50 50" stroke="#7CB342" strokeWidth="1.2" fill="none" />
                <path d="M50 78 Q35 72 30 60 Q40 64 50 72 Z" fill="#7CB342" />
                <path d="M50 65 Q65 58 70 45 Q60 50 50 60 Z" fill="#8BC34A" />
                <path d="M50 55 Q40 48 36 35 Q46 40 50 50 Z" fill="#7CB342" />
                <path d="M50 48 Q60 42 64 30 Q56 35 50 44 Z" fill="#8BC34A" />
                <circle cx="50" cy="38" r="2.5" fill="#8BC34A" />
              </svg>

              {/* Round "Master Your Financial Life" badge */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                <div className="relative w-12 h-12 rounded-full border-[1.5px] flex items-center justify-center text-center px-1"
                     style={{ borderColor: color }}>
                  <div className="text-[5px] font-black uppercase leading-[1.1] tracking-tight" style={{ color }}>
                    Master Your<br />Financial Life
                  </div>
                  {volume && (
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 px-1.5 rounded text-[6px] font-black"
                         style={{ background: color, color: 'white' }}>
                      {volume.replace('VOL. ', '')}
                    </div>
                  )}
                </div>
              </div>

              {/* Tiny author line */}
              <div className="absolute bottom-1 left-0 right-0 text-center text-[6px] font-medium text-slate-500 italic">
                {tagline || 'Money Compound Research'}
              </div>

              {/* Bottom Bestsellers stamp */}
              <div className="absolute bottom-1 right-2 px-1 py-0.5 rounded-sm" style={{ background: '#E53935' }}>
                <span className="text-[5px] font-black uppercase tracking-tight text-white">
                  Bestsellers 18
                </span>
              </div>
            </div>

            {/* Brand colour stripe on left 32% — title can wrap here */}
            <div className="absolute top-0 bottom-0 left-0 w-[32%] flex flex-col justify-center px-3 z-10">
              <div className="text-white">
                <div className="text-[9px] font-black opacity-90 uppercase tracking-[0.25em] mb-3">
                  Vol
                </div>
                <div className="text-[42px] font-black leading-none" style={{ color: accent }}>
                  {volume ? volume.replace('VOL. ', '') : '01'}
                </div>
                {subtitle && (
                  <div className="mt-4 text-[8px] font-medium text-white/85 italic leading-snug">
                    {subtitle.length > 60 ? subtitle.slice(0, 60) + '…' : subtitle}
                  </div>
                )}
              </div>
            </div>

            {/* Hover shine sweep */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background:
                  'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
              }}
            />
          </div>

          {/* Top edge highlight (book cover thickness) */}
          <div
            aria-hidden
            className="absolute -top-[3px] left-0 right-[-3px] h-[3px]"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
              transform: 'translateZ(-2px)',
            }}
          />
        </motion.div>
      </div>

      {/* ── Card footer — title + download CTA ─────────────────────────── */}
      <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-gradient-to-b from-slate-50/60 to-white">
        {tag && (
          <div
            className={`inline-block px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-3 ${tagColor || 'bg-brand-gold/10 text-brand-gold'}`}
          >
            {tag}
          </div>
        )}
        <h4 className="text-base lg:text-[17px] font-serif font-bold text-brand-navy mb-2 leading-snug group-hover:text-brand-gold transition-colors">
          {title}
        </h4>
        {book.desc && (
          <p className="text-slate-600 text-xs leading-relaxed font-medium mb-3 line-clamp-2">
            {book.desc}
          </p>
        )}
        <div className="flex items-center gap-2 text-[12px] font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
          <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          {book.linkText || 'Download Free PDF'}
        </div>
      </div>
    </motion.div>
  )
}
