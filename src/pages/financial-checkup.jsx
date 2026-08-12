import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function FinancialCheckupPage() {
  const [frameHeight, setFrameHeight] = useState(1400);

  // The embedded scorecard reports its own content height so the iframe can grow with it.
  // The scorecard sends { mcfhsHeight }; the previous assessment sent
  // { type: 'fincheckup-height', height }. Accept both so either asset works here.
  useEffect(() => {
    const onMessage = (event) => {
      const data = event?.data;
      if (!data) return;

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
        src="/financial-checkup-assessment.html"
        title="Financial Health Scorecard"
        scrolling="no"
        className="w-full block"
        style={{ border: 'none', height: `${frameHeight}px`, transition: 'height 0.25s ease' }}
      />
    </div>
  );
}
