import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

/**
 * Layout Component
 * Integrates Locomotive Scroll v5 with GSAP ScrollTrigger.
 */
export default function Layout({ children }) {
  const scrollRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    let locoScroll = null;

    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // Importing Locomotive Scroll v5
    import('locomotive-scroll').then((LocomotiveScroll) => {
      // v5 initialization is simplified
      locoScroll = new LocomotiveScroll.default({
        el: scrollRef.current,
        smooth: true,
      });

      // v5 uses native scroll, so ScrollTrigger.refresh() is usually enough
      // but we refresh to ensure all triggers have correct positions
      ScrollTrigger.refresh();
    });

    return () => {
      if (locoScroll) {
        // v5 destroy/cleanup
        locoScroll.destroy?.();
      }
    };
  }, [router.asPath]);

  return (
    <div data-scroll-container ref={scrollRef}>
      <main>{children}</main>
    </div>
  );
}
