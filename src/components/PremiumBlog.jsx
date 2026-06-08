import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Calendar } from 'lucide-react'
import gsap from '../lib/gsap'
import { allBlogs } from '../data/blogs'

const blogs = allBlogs.slice(0, 3)

const PremiumBlog = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        {
          opacity: 0,
          y: 100,
          rotateZ: 5,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
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
    <section ref={sectionRef} className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 bg-lavender-mist overflow-hidden">
      {/* Premium Line Dividers */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-200 z-20" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-200 z-20" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-brand-gold/40 rounded-full"></span>
            <span className="text-[12px] font-black text-brand-gold uppercase tracking-[0.25em]">Learn With Us</span>
            <span className="w-10 h-[2px] bg-brand-gold/40 rounded-full"></span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-serif font-semibold text-brand-navy mb-6 leading-tight tracking-tight">
            Latest From <br />
            <span className="gold-gradient">Our Blog</span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-900 font-medium mb-8 leading-relaxed max-w-2xl mx-auto">
            Actionable insights on mutual funds, NRI investing, taxation and goal planning.
          </p>
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="flex items-center gap-3 px-8 py-3 border border-slate-200 bg-white rounded-full text-[12px] font-black uppercase tracking-[0.2em] text-brand-navy shadow-sm hover:border-brand-gold hover:text-brand-gold transition-all duration-500 group"
            >
              View All Articles <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <a
              key={blog.id}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={el => cardsRef.current[i] = el}
              className="group cursor-pointer block"
            >
              <div className="relative rounded-xl overflow-hidden mb-4 shadow-sm border border-slate-50 aspect-[16/8]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="flex items-center gap-6 text-[11px] font-black text-slate-900 uppercase tracking-widest mb-4">
                <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-brand-gold" /> {blog.date}</span>
              </div>

              <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-gold transition-colors leading-tight">
                {blog.title}
              </h3>
              <div className="w-10 h-[1px] bg-slate-100 group-hover:w-full group-hover:bg-brand-gold transition-all duration-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PremiumBlog
