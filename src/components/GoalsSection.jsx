import React, { useEffect, useRef } from 'react'
import { Landmark, GraduationCap, Plane, Heart, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const goals = [
  {
    title: 'Child Education',
    desc: 'Secure the brightest future for your next generation with early planning.',
    icon: <GraduationCap size={22} />,
    color: 'text-brand-blue',
    iconBg: 'bg-brand-blue/10',
    accentColor: '#2C78C5',
    stat: '₹50L+ Goal',
    num: '01'
  },
  {
    title: 'Marriage Planning',
    desc: 'Plan for the big day without compromising on your financial stability.',
    icon: <Heart size={22} />,
    color: 'text-brand-green',
    iconBg: 'bg-brand-green/10',
    accentColor: '#52C19E',
    stat: 'Custom Plan',
    num: '02'
  },
  {
    title: 'Retirement Planning',
    desc: 'Enjoy worry-free financial freedom well after your active career.',
    icon: <Landmark size={22} />,
    color: 'text-brand-blue',
    iconBg: 'bg-brand-blue/10',
    accentColor: '#2C78C5',
    stat: '60+ Secure',
    num: '03'
  },
  {
    title: 'Dream Home',
    desc: 'Turn your aspirations into reality with a dedicated property fund.',
    icon: <Plane size={22} />,
    color: 'text-brand-green',
    iconBg: 'bg-brand-green/10',
    accentColor: '#52C19E',
    stat: 'Premium Home',
    num: '04'
  }
]

export default function GoalsSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Section fade-in
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      }
    )

    // Cards stagger entrance
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.4)',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 overflow-hidden relative"
      style={{ background: 'linear-gradient(160deg, #eef3fa 0%, #e6edf6 60%, #eaf4f0 100%)' }}
      data-scroll-section
    >
      {/* === BG: Dot Grid Pattern === */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, #2C78C540 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* === BG: Animated Color Orbs === */}
      <div className="absolute -top-10 left-[10%] w-72 h-72 rounded-full blur-[80px] opacity-25 animate-pulse-slow pointer-events-none"
        style={{ background: '#2C78C5' }} />
      <div className="absolute top-1/2 right-[8%] w-56 h-56 rounded-full blur-[70px] opacity-20 animate-float pointer-events-none"
        style={{ background: '#52C19E' }} />
      <div className="absolute bottom-0 left-1/2 w-64 h-48 rounded-full blur-[90px] opacity-15 animate-pulse-slow pointer-events-none"
        style={{ background: '#2C78C5' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black tracking-[0.22em] text-brand-blue uppercase">Life Milestones</span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-['Playfair_Display'] italic font-black text-slate-900 leading-tight">
            GIVE SHAPE TO YOUR <span className="text-brand-green">INVESTMENTS....</span>
          </h2>

          <p className="text-base lg:text-lg text-slate-800 max-w-4xl mx-auto leading-relaxed font-medium">
            Financial goals are the priorities and targets you set for how you want to spend and save your money. They aren&apos;t one size fits all, because everyone has different priorities. However, if you don&apos;t set your financial goals, you&apos;ll probably be left wondering where all your money went.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {goals.map((g, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="border-shade group relative bg-white rounded-2xl overflow-hidden cursor-pointer"
              style={{
                boxShadow: '0 2px 16px -4px rgba(10,15,30,0.08), 0 0 0 1.5px rgba(10,15,30,0.07)'
              }}
            >
              {/* Light sweep shimmer on hover */}
              <div className="light-sweep" />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 w-full h-[3px] transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, ${g.accentColor}, transparent)` }}
              />

              {/* Card body */}
              <div className="p-5 flex flex-col gap-4">

                {/* Number + Icon row */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-base font-black tracking-widest"
                    style={{ color: g.accentColor, opacity: 0.4 }}
                  >
                    {g.num}
                  </span>
                  <div
                    className={`w-11 h-11 rounded-xl ${g.iconBg} ${g.color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-md`}
                  >
                    {g.icon}
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-1.5">
                  <h4 className="text-xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-brand-blue transition-colors duration-300">
                    {g.title}
                  </h4>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">
                    {g.desc}
                  </p>
                </div>

                {/* Footer stat */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span
                    className="text-sm font-black tracking-wide"
                    style={{ color: g.accentColor }}
                  >
                    {g.stat}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-slate-300 group-hover:text-brand-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
