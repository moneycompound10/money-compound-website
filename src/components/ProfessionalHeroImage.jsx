import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * ProfessionalHeroImage
 * A cinematic image component with Ken Burns scaling, mouse parallax,
 * and a premium light sweep effect. Designed for high-end finance sites.
 */
const ProfessionalHeroImage = ({ src, active = false }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const sweepRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    // --- Ken Burns Effect ---
    gsap.to(imageRef.current, {
      scale: 1.12,
      duration: 10,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // --- Mouse Parallax ---
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 30; // Max 30px movement
      const yPos = (clientY / innerHeight - 0.5) * 30;

      gsap.to(imageRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out',
      });
    };

    // --- Light Sweep ---
    const startSweep = () => {
      gsap.fromTo(sweepRef.current, 
        { x: '-100%' }, 
        { 
          x: '200%', 
          duration: 3, 
          ease: 'power2.inOut', 
          delay: 2, 
          repeat: -1, 
          repeatDelay: 5 
        }
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    startSweep();

    const imageEl = imageRef.current;
    const sweepEl = sweepRef.current;

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (imageEl) gsap.killTweensOf(imageEl);
      if (sweepEl) gsap.killTweensOf(sweepEl);
    };
  }, [active]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/5 bg-[#0a0a0a]"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 z-10 pointer-events-none" />

      {/* Main Image */}
      <img
        ref={imageRef}
        src={src}
        alt="Money Compound investor reviewing mutual fund portfolio"
        className="w-full h-full object-cover transform scale-105 will-change-transform opacity-90 contrast-[1.05] brightness-[0.95]"
      />

      {/* Light Sweep Effect */}
      <div 
        ref={sweepRef}
        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] z-20 pointer-events-none"
        style={{ left: '-100%' }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.8)] z-30 pointer-events-none" />
      
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-40"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
    </div>
  );
};

export default ProfessionalHeroImage;
