import React from 'react'

export default function AppSection() {
  return (
    <section className="relative w-full bg-[#FFFFFF] py-24 lg:py-32 overflow-hidden">
      
      {/* Very subtle background light gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Typography Area (Left Side) */}
          <div className="w-full lg:w-1/2 text-left">
            <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-[#F5F7FA] border border-slate-100 shadow-sm">
              <span className="text-[10px] lg:text-xs font-bold text-[#4FC3F7] uppercase tracking-widest">Download the app now</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-slate-900 mb-6 leading-[1.15] tracking-tight">
              A Future of Great Investment <br />
              <span className="text-[#4FC3F7]">Starts With Us</span>
            </h2>
            
            <p className="text-base lg:text-lg text-slate-500 leading-relaxed mb-10 max-w-lg font-light">
              Streamline your investments effortlessly with Money Compound – your all-in-one solution for portfolio management. Take control of your financial future with ease and convenience right at your fingertips.
            </p>
            
            {/* Button */}
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#4FC3F7] to-[#0288D1] text-white font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(79,195,247,0.3)] hover:shadow-[0_15px_40px_rgba(79,195,247,0.5)] hover:-translate-y-1 transition-all duration-300">
                Get the App
              </button>
            </div>
          </div>

          {/* Phone / Mockup Area (Right Side) */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end items-center h-[500px] lg:h-[600px]">
            
            {/* Circle Behind Phone (VERY IMPORTANT) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] bg-[#EEF3FF] rounded-full blur-[60px] lg:blur-[80px] z-0"></div>

            {/* Floating Phone Mockup */}
            <div className="relative z-10 w-[240px] lg:w-[280px] h-auto transform rotate-12 hover:rotate-[8deg] transition-transform duration-700 ease-out animate-float">
              
              {/* Very soft diffused shadow under phone */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-slate-400/20 blur-[15px] rounded-full"></div>
              
              <div className="w-full rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border-[8px] border-slate-900 bg-white shadow-[0_40px_80px_rgba(0,0,0,0.07)]">
                <img
                  src="/mobile-phone.jpeg"
                  alt="Money Compound mobile app interface for tracking mutual fund investments"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  )
}

