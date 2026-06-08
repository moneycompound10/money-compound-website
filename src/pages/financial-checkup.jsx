import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import Head from 'next/head';
import gsap from 'gsap';

// Splits text into per-character spans for the 3D reveal animation.
const SplitTextCharacters = ({ text, className }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char-reveal inline-block whitespace-pre"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default function FinancialCheckupPage() {
  const [frameHeight, setFrameHeight] = useState(720);
  const containerRef = useRef(null);

  // Iframe auto-height — listen for the embedded page reporting its content height.
  useEffect(() => {
    const onMessage = (event) => {
      const data = event?.data;
      if (data && data.type === 'fincheckup-height' && typeof data.height === 'number') {
        setFrameHeight(Math.max(480, Math.round(data.height)));
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Heading character-reveal animation (same effect as the Calculators page).
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      gsap.set('.perspective-stage', { perspective: 2000 });
      gsap.set('.char-reveal', {
        rotationY: -90,
        opacity: 0,
        z: -20,
        transformOrigin: '50% 50% -20px',
      });
      gsap.set('.animate-up', { y: 40, opacity: 0 });

      tl.to('.char-reveal', {
        rotationY: 0,
        opacity: 1,
        z: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: 'back.out(1.4)',
      })
        .to('.animate-up', {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
        }, '-=0.5');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 pt-32 pb-24 font-['Inter'] perspective-stage">
      <Head>
        <title>Financial Check up — Health–Wealth Assessment | Money Compound</title>
        <meta name="description" content="Take Money Compound's free Financial Check up — answer 10 quick questions and get your financial health score instantly, with personalised next steps." />
        <link rel="canonical" href="https://moneycompound.com/financial-checkup" />
        <meta property="og:title" content="Financial Check up — Money Compound" />
        <meta property="og:url" content="https://moneycompound.com/financial-checkup" />
      </Head>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-navy mb-6 leading-tight">
            <SplitTextCharacters text="Financial " className="" />
            <SplitTextCharacters text="Check up" className="text-brand-gold" />
          </h1>

          <p className="animate-up text-slate-600 text-lg leading-relaxed font-medium">
            Answer 10 quick questions and get your financial health score instantly — along with personalised next steps from our research team.
          </p>
        </div>

        {/* Embedded assessment — iframe auto-fits its content height */}
        <div className="max-w-5xl mx-auto">
          <iframe
            src="/financial-checkup-assessment.html"
            title="Financial Check up"
            scrolling="no"
            className="w-full block"
            style={{ border: 'none', height: `${frameHeight}px`, transition: 'height 0.25s ease' }}
          />
        </div>
      </div>
    </div>
  );
}
