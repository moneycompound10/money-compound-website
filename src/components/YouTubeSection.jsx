import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import gsap, { ScrollTrigger } from '../lib/gsap'



const YoutubeIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)

const videos = [
  {
    title: 'Mutual Funds for Minors',
    duration: '8 min',
    author: 'Vipul Khandelwal (CA, CS, CFP)',
    image: 'https://img.youtube.com/vi/Maoay_AKIOY/hqdefault.jpg'
  },
  {
    title: 'How to Generate Regular Income through SWP',
    duration: '6 min',
    author: 'Money Compound Research',
    image: 'https://img.youtube.com/vi/muoLyft0lUM/hqdefault.jpg'
  },
  {
    title: 'How to Become Rich? Power of Compounding',
    duration: '11 min',
    author: 'By Vipul Khandelwal',
    image: 'https://img.youtube.com/vi/ZhdgcffX10Q/hqdefault.jpg'
  },
  {
    title: 'Complete Guide on Stock Market Taxation',
    duration: '9 min',
    author: 'Money Compound',
    image: 'https://img.youtube.com/vi/Uj65vVUm_rc/hqdefault.jpg'
  }
]

export default function YouTubeSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const mainHeadingRef = useRef(null);
  const subHeadingRef = useRef(null);

  useEffect(() => {
    // Safety check: ensure refs are attached
    if (!mainHeadingRef.current || !subHeadingRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Ultra-Premium Heading Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainHeadingRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(mainHeadingRef.current, 
        { opacity: 0, y: 50, rotateX: -30 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power4.out" }
      )
      .fromTo(subHeadingRef.current,
        { opacity: 0, x: -30, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" },
        "-=0.5"
      );

      // 2. 3D Swing Card Entrance
      gsap.fromTo(cardsRef.current,
        { 
          opacity: 0,
          y: 120,
          rotateX: -45,
          transformOrigin: "top center",
          scale: 0.8,
          filter: "brightness(0.5) blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "brightness(1) blur(0px)",
          duration: 1.8,
          stagger: 0.15,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          }
        }
      );

      // 3. Advanced GSAP Parallax for background blobs
      const containers = gsap.utils.toArray('.parallax-container');
      containers.forEach((container) => {
        const depth = container.dataset.depth || 0.2;
        gsap.to(container, {
          y: -(depth * 300),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          }
        });

        const innerBlob = container.querySelector('.parallax-blob');
        if (innerBlob) {
          gsap.to(innerBlob, {
            x: 'random(-80, 80)',
            y: 'random(-80, 80)',
            duration: 'random(6, 10)',
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      });

      // 4. Interactive 3D Tilt on Hover for Cards
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const inner = card.querySelector('.card-inner');
        if (!inner) return;
        
        const onMove = (e) => {
          const { left, top, width, height } = card.getBoundingClientRect();
          const x = (e.clientX - left) / width - 0.5;
          const y = (e.clientY - top) / height - 0.5;
          gsap.to(inner, { rotateY: x * 15, rotateX: -y * 15, scale: 1.02, duration: 0.5, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(inner, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: "power2.out" });
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#080b1a] relative overflow-hidden"
      data-scroll-section
    >

      {/* High-Fidelity Animated Mesh Blobs with GSAP PARALLAX (3 Blobs) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Blob 1 - Bluish */}
        <div className="parallax-container absolute -top-[10%] -left-[10%] w-[60%] h-[60%]" data-depth="0.3">
          <div className="parallax-blob w-full h-full bg-[#2C78C5]/30 blur-[150px] rounded-full" />
        </div>
        
        {/* Blob 2 - Teal */}
        <div className="parallax-container absolute top-[20%] -right-[15%] w-[55%] h-[55%]" data-depth="0.6">
          <div className="parallax-blob w-full h-full bg-[#52C19E]/30 blur-[140px] rounded-full" />
        </div>

        {/* Blob 3 - Bluish Accent */}
        <div className="parallax-container absolute bottom-[-15%] left-[10%] w-[50%] h-[50%]" data-depth="0.8">
          <div className="parallax-blob w-full h-full bg-[#2C78C5]/25 blur-[160px] rounded-full" />
        </div>
      </div>





      {/* Floating Glass Geometric Shapes with GSAP PARALLAX */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-30">
        <div
          className="parallax-blob absolute top-[15%] left-[5%] w-20 h-20 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-2xl rotate-12"
          data-depth="1.2"
        />
        <div
          className="parallax-blob absolute bottom-[20%] right-[8%] w-24 h-24 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl"
          data-depth="0.9"
        />
        <div
          className="parallax-blob absolute top-[40%] right-[5%] w-12 h-12 bg-white/5 backdrop-blur-2xl rounded-lg border border-white/10 shadow-2xl rotate-45"
          data-depth="1.5"
        />
      </div>


      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16" data-scroll data-speed="0.9">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-3xl px-6 py-2.5 rounded-full mb-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <YoutubeIcon size={18} className="text-[#52C19E]" />
            <span className="text-[11px] font-black tracking-[0.4em] text-white/90 uppercase">Money Compound TV</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-none overflow-hidden">
            <span ref={mainHeadingRef} className="section-heading-main inline-block">Learn Investing, </span>
            <span ref={subHeadingRef} className="section-heading-sub bg-gradient-to-r from-[#2C78C5] to-[#52C19E] bg-clip-text text-transparent italic inline-block">
              One Video at a Time
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-300 text-base font-medium leading-relaxed opacity-80">
            Free educational videos on mutual funds, NRI investing, taxation, and goal planning — explained in simple Hindi & English.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((v, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group cursor-pointer"
              data-scroll
              data-speed={1 + (i * 0.1)} // Subtle stagger in scroll speed
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/[0.05] backdrop-blur-[40px] p-4 rounded-3xl border border-white/10 group-hover:border-white/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] group-hover:shadow-[0_45px_100px_-20px_rgba(139,92,246,0.3)] transition-all duration-700 h-full flex flex-col relative overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden mb-5 relative shadow-inner">
                  <img
                    src={v.image}
                    alt={v.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20 shadow-2xl group-hover:bg-[#06B6D4] group-hover:border-[#06B6D4] group-hover:scale-110 transition-all duration-500">
                      <Play size={22} fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-xl rounded-lg text-[9px] font-black text-white uppercase tracking-widest border border-white/5">
                    {v.duration}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2 px-1 pb-2 relative z-10">
                  <h4 className="text-white font-black text-[15px] tracking-tight leading-snug group-hover:text-[#06B6D4] transition-colors line-clamp-2">
                    {v.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D946EF] shadow-[0_0_8px_#D946EF]" />
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{v.author}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-20" data-scroll data-speed="1.1">
          <motion.a
            whileHover={{ y: -8, scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href="https://www.youtube.com/@moneycompoundwealth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-12 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] backdrop-blur-3xl hover:bg-white hover:text-[#080b1a] transition-all duration-500 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)]"
          >
            <YoutubeIcon size={20} />
            Visit our channel
          </motion.a>
        </div>
      </div>
    </section>
  )
}
