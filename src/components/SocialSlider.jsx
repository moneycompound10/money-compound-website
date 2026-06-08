import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const FacebookIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const LinkedinIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
const TwitterIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
)
const InstagramIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const YoutubeIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7z" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
)

const socials = [
  { Icon: LinkedinIcon,  label: 'LinkedIn',  href: 'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGFNhtU2rRacAAAAZ5O4vvY-HViHMPJpM-juaFWwC_ykbyF5OnAW9qfurOc6tkzawflBq33NqbpghGwf22eJ_uVT3UvlfBinLg4XIiIakiL3L_7SS4S99zMfy9Ge8PxwlrpwOc=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fmoneycompound', color: 'bg-[#0A66C2]' },
  { Icon: TwitterIcon,   label: 'Twitter',   href: 'https://x.com/compound_money',              color: 'bg-[#1DA1F2]' },
  { Icon: InstagramIcon, label: 'Instagram', href: 'https://www.instagram.com/money_compound/',        color: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]' },
  { Icon: YoutubeIcon,   label: 'YouTube',   href: 'https://www.youtube.com/@moneycompoundwealth',   color: 'bg-[#FF0000]' },
  { Icon: FacebookIcon,  label: 'Facebook',  href: 'https://www.facebook.com/moneycompoundwealth',         color: 'bg-[#1877F2]' }
]

export default function SocialSlider() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[90] hidden md:flex items-center">
      {/* Expanded panel of social icons */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -120, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col gap-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-r-2xl shadow-2xl py-3 px-2"
          >
            {socials.map(({ Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform ${color}`}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle arrow tab */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Hide social links' : 'Show social links'}
        aria-expanded={open}
        className="w-7 h-14 bg-brand-navy text-white rounded-r-lg shadow-xl flex items-center justify-center hover:bg-brand-gold transition-colors"
      >
        {open ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  )
}
