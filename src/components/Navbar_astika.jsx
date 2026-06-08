import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, Menu, X, ChevronDown, User, MessageSquare } from 'lucide-react'
import gsap from 'gsap'

// --- Premium Social Icons ---
const SocialIcon = ({ Icon, label, href }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-base hover:text-brand-blue transition-colors bg-slate-100 border border-slate-300"
    aria-label={label}
  >
    <Icon size={14} />
  </motion.a>
);

const FbIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const IgIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)
const TwIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)
const LiIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
  </svg>
)

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const blobRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const moveBlob = (e) => {
    if (!navRef.current || !blobRef.current) return;
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    
    gsap.to(blobRef.current, {
      left: rect.left - navRect.left,
      width: rect.width,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const hideBlob = () => {
    if (!blobRef.current) return;
    gsap.to(blobRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Financial Checkup', href: '/checkup' },
    { name: 'Information', href: '/information' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-1000">
      {/* --- Top Utility Bar (Crystal Glass) --- */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="hidden md:flex bg-white/10 backdrop-blur-2xl border-b border-white/10 py-3 px-12 justify-between items-center relative overflow-hidden"
          >
            <div className="light-sweep opacity-50" />
            <div className="flex items-center gap-8 relative z-10">
              <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">
                <Phone size={11} className="text-brand-blue" />
                <span>+91 8447496480</span>
              </div>
              <div className="w-[1px] h-4 bg-white/20" />
              <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">
                <Mail size={11} className="text-brand-green" />
                <span>support@moneycompound.com</span>
              </div>
            </div>

            <div className="flex items-center gap-5 relative z-10">
              <SocialIcon Icon={FbIcon} label="Facebook" href="#" />
              <SocialIcon Icon={IgIcon} label="Instagram" href="#" />
              <SocialIcon Icon={TwIcon} label="Twitter" href="#" />
              <SocialIcon Icon={LiIcon} label="LinkedIn" href="#" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main Navigation (Elite Glassmorphism) --- */}
      <div className="flex justify-center w-full transition-all duration-1000">
        <nav className={`transition-all duration-1000 relative overflow-hidden w-full ${isScrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-white/20 px-12 py-5 shadow-soft' : 'bg-white/5 backdrop-blur-2xl border-b border-white/10 px-12 py-8'}`}>
          <div className="light-sweep opacity-20" />

          <div className="flex items-center justify-between relative z-10">

            {/* Logo Section */}
            <Link href="/" className="group flex items-center gap-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand-blue/20 rounded-2xl rotate-45 group-hover:rotate-180 transition-transform duration-1000 border border-brand-blue/30" />
                <div className="glow-node top-0 right-0" />
                <span className="relative text-2xl font-black text-slate-900 tracking-tighter">M</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[16px] font-black tracking-tighter text-slate-900 group-hover:text-brand-blue transition-colors uppercase">MONEY</span>
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-400 group-hover:text-brand-green transition-colors uppercase">COMPOUND</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div 
              className="hidden lg:flex items-center gap-2 relative py-1"
              ref={navRef}
              onMouseLeave={hideBlob}
            >
              {/* Sliding Blob Effect */}
              <div 
                ref={blobRef}
                className="absolute top-0 bottom-0 bg-slate-900/5 backdrop-blur-xl rounded-full opacity-0 pointer-events-none z-0 border border-slate-200/50"
              />

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={moveBlob}
                  className="relative z-10 text-[10px] font-black text-slate-500 hover:text-brand-blue transition-colors tracking-[0.4em] uppercase px-5 py-3"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Premium Action Suite */}
            <div className="hidden md:flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 border border-white/50 hover:bg-white/50 transition-all shadow-soft overflow-hidden relative"
              >
                <div className="light-sweep opacity-30" />
                <User size={15} className="text-brand-blue" />
                LOGIN
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-premium transition-all flex items-center gap-2 border border-slate-900 group relative overflow-hidden"
              >
                <div className="light-sweep opacity-30" />
                <MessageSquare size={15} className="text-brand-green" />
                CONTACT US
              </motion.button>
            </div>

            {/* Mobile Interface Toggle */}
            <button
              className="lg:hidden text-slate-900 w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* --- Mobile Cinematic Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 lg:hidden bg-white/80 z-[110] flex flex-col items-center justify-center p-10"
          >
            <button
              className="absolute top-12 right-12 text-slate-900 w-14 h-14 flex items-center justify-center rounded-full bg-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-5xl font-black text-slate-900 hover:text-brand-blue transition-colors tracking-tighter"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="https://vipulkhandelwal-moneycompound1.zohobookings.in/#/moneycompound2"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-10 px-16 py-6 bg-slate-900 text-white text-lg font-black rounded-[2rem] shadow-premium inline-block text-center"
              >
                Start Consultation
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar;
