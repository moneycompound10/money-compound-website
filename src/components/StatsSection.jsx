import React, { useRef, useEffect } from 'react'
import { motion, useSpring, useTransform, useInView } from 'framer-motion'
import { TrendingUp, Users, Award, ShieldCheck } from 'lucide-react'

const stats = [
  { value: 18,   suffix: '+',  label: 'Yrs Experience', icon: Award },
  { icon: Users, value: 1000, suffix: '+', label: 'Happy Clients' },
  { icon: TrendingUp, value: 180, suffix: '+', label: 'Crore Facilitated (AUA)' },
  { icon: ShieldCheck, value: 360, suffix: '°', label: 'Solutions' },
]

function Counter({ value, isKm = false }) {
  const [mounted, setMounted] = React.useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const springValue = useSpring(0, { stiffness: 40, damping: 20, restDelta: 0.001 })

  const display = useTransform(springValue, (latest) => {
    const val = Math.floor(latest)
    if (val >= 1000 && isKm) return `${(val / 1000).toFixed(0)}K`
    return val
  })

  useEffect(() => {
    if (isInView && mounted) springValue.set(value)
  }, [isInView, value, springValue, mounted])

  return <motion.span ref={ref}>{mounted ? display : "0"}</motion.span>
}

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-7 rounded-[1.75rem] glass-card border-shade transition-all duration-500 overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand-blue to-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      <div className="glow-node top-2 right-2 opacity-40 group-hover:opacity-100 transition-opacity" />
      <div className="glow-node bottom-2 left-2 opacity-20 group-hover:opacity-60 transition-opacity" />
      <div className="light-sweep" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-[1.25rem] bg-white shadow-soft flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-500 relative border border-slate-100">
          <div className="absolute inset-0 bg-brand-blue/5 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <stat.icon size={20} className="text-slate-700 group-hover:text-brand-blue transition-colors duration-500 relative z-10" />
        </div>
        
        <div className="text-4xl font-black text-slate-900 mb-1.5 tracking-tighter flex items-baseline gap-0.5 group-hover:text-brand-blue transition-colors duration-500">
          <Counter value={stat.value} isKm={stat.label === 'Happy Clients'} />
          <span className="text-lg text-brand-green">{stat.suffix}</span>
        </div>
        
        <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500 group-hover:text-slate-700 transition-colors duration-500">
          {stat.label}
        </div>
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-12 relative overflow-hidden" data-scroll-section>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-brand-blue/[0.05] blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
