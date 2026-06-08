import React, { useLayoutEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';

const videoList = [
  {
    id: 1,
    title: "How to Create Investments via Stock Market",
    videoId: "AAlgoEUmzG8",
    description: "Learn the fundamentals of portfolio growth and how the stock market plays a crucial role in long-term financial growth."
  },
  {
    id: 2,
    title: "3X Your Investments || Power of SIP Top Up",
    videoId: "eMx_edwW7cg",
    description: "Discover the magic of Systematic Investment Plan (SIP) Top-ups and how small increases can triple your returns."
  },
  {
    id: 3,
    title: "Invest in PPF Before April 5 for BIG Returns",
    videoId: "Ev_b5NSNd6s",
    description: "Important financial planning tips for Public Provident Fund (PPF) investors to maximize interest gains."
  },
  {
    id: 4,
    title: "Accessing Your Capital Gain/Loss Statements",
    videoId: "PtsN5npa0Bc",
    description: "A step-by-step guide on how to access and understand your capital gain/loss statements for tax filing."
  },
  {
    id: 5,
    title: "Financial Planning & Investment Services",
    videoId: "FW-T-Hxe7Gk",
    description: "Deep dive into comprehensive financial planning strategies for long-term security and prosperity."
  },
];

export default function EducationalVideos() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

      gsap.set('.animate-title-reveal', { y: 60, opacity: 0 });
      gsap.set('.animate-video-card', { y: 80, opacity: 0 });

      tl.to('.animate-title-reveal', {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.2
      })
        .to('.animate-video-card', {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.5,
          ease: 'back.out(1.2)'
        }, "-=0.8");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#ECF1EE] pt-44 pb-20 px-4 overflow-hidden">
      <Head>
        <title>Educational Videos | Money Compound</title>
      </Head>

      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="inline-block relative">
          <div className="animate-title-reveal text-sm font-black text-[#1A2E23] uppercase tracking-[0.5em] mb-6">Expert Tutorials</div>
          <h1 className="animate-title-reveal text-6xl md:text-8xl font-black text-[#1A2E23] mb-6 tracking-tighter leading-none">
            EDUCATIONAL <span className="text-[#1A2E23]/30 italic">VIDEOS</span>
          </h1>
          <p className="animate-title-reveal text-[#1A2E23] text-lg max-w-2xl mx-auto font-medium opacity-70">
            Empower your financial journey with our curated expert tutorials and investment guides.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
          {videoList.map((video) => (
            <div
              key={video.id}
              className="animate-video-card group flex flex-col bg-white rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_30px_60px_rgba(44,120,197,0.12)] transition-all duration-500"
            >
              {/* Video Player Container */}
              <div className="relative aspect-video w-full bg-black overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1 bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-1 bg-gradient-to-r from-[#2C78C5] to-[#52C19E] rounded-full" />
                  <span className="text-[11px] font-bold text-[#2C78C5] uppercase tracking-[0.2em]">Expert Series</span>
                </div>
                
                <h3 className="text-[24px] font-black text-[#0B1120] mb-4 leading-[1.2] group-hover:text-[#2C78C5] transition-colors duration-300">
                  {video.title}
                </h3>
                
                <p className="text-slate-500 text-[15px] leading-relaxed mb-6">
                  {video.description}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2C78C5] to-[#52C19E] flex items-center justify-center text-white text-[10px] font-bold">
                      MC
                    </div>
                    <span className="text-[12px] font-bold text-slate-600 tracking-wide uppercase">Money Compound</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[#52C19E] text-[12px] font-bold uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52C19E] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#52C19E]"></span>
                    </span>
                    Now Playing
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
