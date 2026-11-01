import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

// Roughly the height of the fixed navbar, so a scrolled-to element does not end
// up hidden behind it.
const NAV_OFFSET = 110;

export default function FinancialCheckupPage() {
  const [frameHeight, setFrameHeight] = useState(1400);
  const frameRef = useRef(null);

  // The scorecard is sized to its full content and never scrolls itself, so it
  // reports its height here and asks this window to do any scrolling for it.
  useEffect(() => {
    const onMessage = (event) => {
      // The scorecard is served from this same origin, so anything arriving from
      // elsewhere is not it and has no business resizing or scrolling the page.
      if (event.origin !== window.location.origin) return;

      const data = event?.data;
      if (!data) return;

      if (typeof data.mcfhsScrollTo === 'number') {
        const frame = frameRef.current;
        if (!frame) return;

        const frameTop = frame.getBoundingClientRect().top + window.scrollY;
        let top = frameTop + data.mcfhsScrollTo - NAV_OFFSET;
        if (data.mcfhsBlock === 'center') {
          top -= Math.max(0, window.innerHeight / 2 - NAV_OFFSET);
        }

        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        return;
      }

      // { mcfhsHeight } is the scorecard; { type: 'fincheckup-height' } was the
      // previous assessment. Accept both so either asset works in this wrapper.
      let height = null;
      if (typeof data.mcfhsHeight === 'number') {
        height = data.mcfhsHeight;
      } else if (data.type === 'fincheckup-height' && typeof data.height === 'number') {
        height = data.height;
      }

      if (height) setFrameHeight(Math.max(480, Math.round(height)));
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7FA] pt-24 md:pt-28 lg:pt-32">
      <Head>
        <title>Financial Health Scorecard — Free 100-Point Assessment | Money Compound</title>
        <meta name="description" content="Check your Financial Health Score in about 2 minutes. Fifteen tap-only questions give you a 100-point score, 14 personal finance ratios benchmarked against what they should be, and a prioritised action plan." />
        <link rel="canonical" href="https://moneycompound.com/financial-checkup" />
        <meta property="og:title" content="Financial Health Scorecard — Money Compound" />
        <meta property="og:description" content="An objective 100-point score, your personal financial ratios and a prioritised action plan — in about 2 minutes." />
        <meta property="og:url" content="https://moneycompound.com/financial-checkup" />
      </Head>

      {/* The scorecard is a self-contained page with its own hero, disclaimer and
          PDF export, so it is embedded whole and simply reports its height back. */}
      <iframe
        ref={frameRef}
        src="/financial-checkup-assessment.html"
        title="Financial Health Scorecard"
        scrolling="no"
        className="block"
        /* The scroll container this page sits in measures a little short of the
           viewport, which left the frame — and so the hero inside it — stopping
           before the right edge while the left sat flush. Breaking out to the
           viewport width sidesteps whatever the container reports. body already
           carries overflow-x:hidden, so this cannot scroll sideways. */
        style={{
          border: 'none',
          height: `${frameHeight}px`,
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
        }}
      />
    </div>
  );
}
