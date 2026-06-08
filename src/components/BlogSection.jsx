import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const blogs = [
  {
    id: 1,
    date: 'April 17, 2026',
    title: 'Five Quotes That Reveal How Great Investors Actually Think',
    desc: 'Unlock the psychological strategies used by market legends.',
    img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    link: 'https://moneycompound.com/Home/Blogdetailsanc/272/five-quotes-that-reveal-how-great-investors-actually-think'
  },
  {
    id: 2,
    date: 'March 24, 2026',
    title: "Corrections Don't Break Portfolios, Reactions Do",
    desc: "Why staying calm during market dips is the ultimate secret.",
    img: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?q=80&w=2070&auto=format&fit=crop',
    link: 'https://moneycompound.com/Home/Blogdetailsanc/271/corrections-dont-break-portfolios-reactions-do'
  },
  {
    id: 3,
    date: 'March 6, 2026',
    title: 'SIP Is the Only Place Where Laziness Pays Off',
    desc: 'Automating your portfolio journey via the "Set it and Forget it" approach.',
    img: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    link: '#'
  }
]

const ParticleHeading = () => {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const mouse = useRef({ x: 0, y: 0, radius: 80 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    let animationFrameId

    const init = () => {
      canvas.width = 400
      canvas.height = 80
      ctx.fillStyle = 'black'
      ctx.font = '900 48px Inter'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Our Blogs', canvas.width / 2, canvas.height / 2)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      particles.current = []

      for (let y = 0; y < canvas.height; y += 2) {
        for (let x = 0; x < canvas.width; x += 2) {
          const index = (y * canvas.width + x) * 4
          if (imageData.data[index + 3] > 128) {
            particles.current.push({
              x: x,
              y: y,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0
            })
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.current.forEach(p => {
        const dx = mouse.current.x - p.x
        const dy = mouse.current.y - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const force = (mouse.current.radius - distance) / mouse.current.radius

        if (distance < mouse.current.radius) {
          const angle = Math.atan2(dy, dx)
          p.vx -= Math.cos(angle) * force * 5
          p.vy -= Math.sin(angle) * force * 5
        }

        p.vx *= 0.9
        p.vy *= 0.9
        p.x += p.vx + (p.originX - p.x) * 0.12
        p.y += p.vy + (p.originY - p.y) * 0.12

        ctx.fillStyle = '#ffffff'
        ctx.fillRect(p.x, p.y, 1.5, 1.5)
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = (e.clientX - rect.left) * (canvas.width / rect.width)
      mouse.current.y = (e.clientY - rect.top) * (canvas.height / rect.height)
    }
    const handleMouseLeave = () => {
      mouse.current.x = -999
      mouse.current.y = -999
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="flex justify-center mb-16 px-4">
      <canvas 
        ref={canvasRef} 
        className="w-full max-w-[400px] h-[80px] cursor-pointer"
      />
    </div>
  )
}

export default function BlogSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // --- Lando Style Scroll Reveal ---
    gsap.fromTo(sectionRef.current,
      { opacity: 0, scale: 0.95, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      }
    )
  }, [])

  const handleTilt = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // --- YOUR GSAP TILT LOGIC ---
    gsap.to(card, {
      rotateY: x * 20, 
      rotateX: -y * 20,
      duration: 0.3, 
      transformPerspective: 600,
      ease: "power2.out"
    });
  }

  const handleReset = (card) => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power3.out"
    });
  }

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative bg-fixed bg-cover bg-center overflow-hidden" 
      style={{ backgroundImage: 'url("/3d-finance-bg2.png")' }}
      data-scroll-section
    >
      {/* Exact request: slight blur ONLY, without the white haze. Kept dark tint for good contrast. */}
      <div className="absolute inset-0 backdrop-blur-[3px] bg-black/20 z-0 pointer-events-none" />
      
      <div className="absolute top-0 left-[-5%] w-[600px] h-[600px] bg-brand-blue/[0.04] blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-[-5%] w-[600px] h-[600px] bg-brand-green/[0.04] blur-[120px] rounded-full pointer-events-none z-0" />
      
      {/* Top & Bottom blends */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-10 relative z-10">
        <ParticleHeading />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onMouseMove={(e) => handleTilt(e, e.currentTarget)}
              onMouseLeave={(e) => handleReset(e.currentTarget)}
              className="flex flex-col group cursor-pointer will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative aspect-square overflow-hidden mb-8 rounded-[3.5rem] shadow-2xl transition-all duration-700 bg-slate-100 border border-slate-100 pointer-events-none">
                <img 
                  src={blog.img} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/10 transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
                
                <div className="absolute bottom-6 left-6">
                   <div className="bg-white/95 backdrop-blur-xl px-4 py-2 rounded-2xl inline-flex items-center gap-3 border border-white shadow-xl">
                      <Calendar size={12} className="text-brand-blue" />
                      <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{blog.date}</span>
                   </div>
                </div>
              </div>

              <div className="px-4 flex flex-col items-center text-center pointer-events-none">
                <h3 className="text-xl font-extrabold text-white leading-tight mb-4 group-hover:font-black group-hover:text-brand-green group-hover:drop-shadow-[0_0_8px_rgba(46,204,113,0.6)] transition-all duration-500 text-center mx-auto max-w-[280px]">
                  {blog.title}
                </h3>
                <p className="text-slate-300 text-[13px] font-semibold leading-relaxed mb-8 group-hover:font-extrabold group-hover:text-white transition-all duration-500">
                  {blog.desc}
                </p>
                
                <a 
                   href={blog.link}
                   className="inline-flex items-center gap-4 text-[10px] font-bold text-brand-green uppercase tracking-[0.3em] border-b-2 border-brand-green/30 group-hover:font-black group-hover:text-white group-hover:border-white group-hover:gap-6 transition-all duration-500 pointer-events-auto"
                >
                  Read Article <ChevronRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
