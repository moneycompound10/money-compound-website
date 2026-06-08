import React from 'react'
import { motion } from 'framer-motion'
import { Apple } from 'lucide-react'

const AppShowcase = () => {
  return (
    <section className="relative w-full bg-mint-soft py-14 sm:py-20 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        <div className="relative flex items-center justify-center min-h-[400px]">

          {/* Main Dark Card / Banner - Pill Shaped */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-[90%] bg-[#0A0A0A] rounded-3xl md:rounded-[3rem] p-6 sm:p-10 md:p-20 flex flex-col md:flex-row items-center relative overflow-hidden shadow-2xl mr-auto lg:ml-0"
          >
            {/* Perspective Line Pattern Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 {[...Array(30)].map((_, i) => (
                   <line
                     key={i}
                     x1={i * 4} y1="0"
                     x2={i * 4 - 20} y2="100"
                     stroke="white"
                     strokeWidth="0.05"
                   />
                 ))}
               </svg>
            </div>

            {/* Abstract Sine Wave — hidden on small screens to free up space */}
            <div className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-16 md:w-32 opacity-70 z-20 hidden md:block">
              <svg viewBox="0 0 100 40" className="w-full h-auto">
                <path
                  d="M0,20 Q12.5,0 25,20 T50,20 T75,20 T100,20"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Content Area */}
            <div className="relative z-30 w-full md:w-3/5 md:pl-32 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black !text-white mb-6 sm:mb-8 md:mb-10 leading-tight tracking-tight font-sans">
                Keep Your Finger on the <br />
                Investment Market Pulse
              </h2>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <motion.a
                  href="https://apps.apple.com/in/app/money-compound/id1558818248"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="store-bubble-btn group relative flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-[12px] sm:text-[13px] uppercase tracking-widest shadow-xl overflow-hidden"
                >
                  {/* Hover bubble pulse */}
                  <span aria-hidden className="store-bubble-pulse" />
                  {/* Tap ripple */}
                  <span aria-hidden className="store-bubble-ripple" />
                  <Apple className="relative z-10 w-4 h-4 fill-current" />
                  <span className="relative z-10">App Store</span>
                </motion.a>
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.dwt.moneycompoundapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="store-bubble-btn group relative flex items-center gap-2 bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-[12px] sm:text-[13px] uppercase tracking-widest shadow-xl overflow-hidden"
                >
                  <span aria-hidden className="store-bubble-pulse" />
                  <span aria-hidden className="store-bubble-ripple" />
                  <svg viewBox="0 0 24 24" className="relative z-10 w-4 h-4" aria-hidden="true">
                    <path fill="#34A853" d="M3.6 21l10-9.6L7 6.5z" />
                    <path fill="#FBBC04" d="M16.5 14.4l-3.3-3 3-2.9 3.5 1.9c1.1.6 1.1 2.2 0 2.8z" />
                    <path fill="#EA4335" d="M3.6 21l9.6-9.6 3.3 3-12 6.6z" />
                    <path fill="#4285F4" d="M3.6 3l9.7 8.4-3 2.9L3.6 3z" />
                  </svg>
                  <span className="relative z-10">Play Store</span>
                </motion.a>
              </div>

              {/* Mobile phone preview — shown only on small screens (below md) */}
              <div className="mt-8 md:hidden flex justify-center w-full">
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.2 }}
                  className="w-[180px] sm:w-[220px] rounded-2xl bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-200 overflow-hidden"
                >
                  <img
                    src="/mobile-phone.jpeg"
                    alt="Money Compound mobile app"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>

              {/* Bubble animation styles for store buttons */}
              <style jsx>{`
                .store-bubble-btn {
                  isolation: isolate;
                  transition: box-shadow 0.35s ease;
                }
                .store-bubble-btn:hover {
                  box-shadow: 0 18px 40px -10px rgba(255, 255, 255, 0.35),
                              0 0 0 2px rgba(255, 255, 255, 0.5);
                }
                .store-bubble-pulse {
                  position: absolute;
                  inset: 0;
                  border-radius: inherit;
                  background: radial-gradient(circle at center,
                              rgba(244, 196, 48, 0.55) 0%,
                              rgba(244, 196, 48, 0) 70%);
                  opacity: 0;
                  transform: scale(0.6);
                  pointer-events: none;
                  z-index: 0;
                }
                .store-bubble-btn:hover .store-bubble-pulse {
                  animation: store-bubble-pulse 1.4s ease-out infinite;
                }
                @keyframes store-bubble-pulse {
                  0%   { opacity: 0;   transform: scale(0.6); }
                  40%  { opacity: 0.8; transform: scale(1.05); }
                  100% { opacity: 0;   transform: scale(1.6); }
                }
                .store-bubble-ripple {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  width: 16px;
                  height: 16px;
                  border-radius: 9999px;
                  background: rgba(0, 0, 0, 0.18);
                  transform: translate(-50%, -50%) scale(0);
                  opacity: 0;
                  pointer-events: none;
                  z-index: 0;
                }
                .store-bubble-btn:active .store-bubble-ripple {
                  animation: store-bubble-ripple 0.55s ease-out;
                }
                @keyframes store-bubble-ripple {
                  0%   { opacity: 0.6; transform: translate(-50%, -50%) scale(0); }
                  100% { opacity: 0;   transform: translate(-50%, -50%) scale(28); }
                }
              `}</style>
            </div>

            {/* Spacer for phone overlap */}
            <div className="hidden md:block w-1/4"></div>
          </motion.div>

          {/* Floating Mobile UI Card — desktop/tablet only (md+) */}
          <motion.div
            initial={{ y: 150, opacity: 0, scale: 0.5, rotate: 0 }}
            whileInView={{ y: 0, opacity: 1, scale: 1, rotate: 6 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: 0.1
            }}
            className="hidden md:block absolute right-0 md:right-12 top-1/2 -translate-y-1/2 z-40 w-[200px] md:w-[260px]"
          >
            {/* White UI Card Frame */}
            <div className="relative rounded-2xl md:rounded-[2rem] bg-white shadow-[0_60px_90px_-20px_rgba(0,0,0,0.35)] border-[1px] border-slate-300 overflow-hidden">
              <img
                src="/mobile-phone.jpeg"
                alt="Money Compound mobile app showing portfolio dashboard"
                className="w-full h-auto object-cover"
              />

              {/* Subtle light reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default AppShowcase
