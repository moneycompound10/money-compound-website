import React, { useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { Download, Mail, Play, ArrowRight } from 'lucide-react';
import LeadCaptureModal from '../components/LeadCaptureModal';
import EbookCard from '../components/EbookCard';
import { getVideos } from '../lib/contentDb';

export async function getServerSideProps() {
  const videos = await getVideos();
  return { props: { videos } };
}

const resourcesData = [
  {
    tag: 'EBOOK - FREE',
    tagColor: 'bg-brand-gold/10 text-brand-gold',
    title: "The Smart Investor's Handbook 2026",
    subtitle: "An educational beginner-to-confident guide to building wealth in India.",
    desc: "A 20-chapter beginner-to-confident guide for every kind of investor in India — covering compounding, asset classes, mutual funds & SIPs, fixed income, tax-smart investing and more.",
    linkText: "Download Free PDF",
    icon: Download,
    fileUrl: "/ebooks/smart-investors-handbook-2026.pdf",
    fileName: "MoneyCompound_Smart_Investors_Handbook_2026.pdf",
    // Book cover styling
    volume: 'VOL. 01',
    color: '#B22234',
    gradient: 'linear-gradient(160deg, #B22234 0%, #8B1A26 70%, #6B121C 100%)',
    accent: '#F5C04A',
    tagline: 'By Money Compound Research',
    badge: 'Master Your Financial Life',
  },
  {
    tag: 'EBOOK - FREE',
    tagColor: 'bg-brand-gold/10 text-brand-gold',
    title: "The NRI Investment Guide 2026",
    subtitle: "An educational handbook for NRIs in the UAE, Gulf & MEA region investing in India.",
    desc: "An educational handbook for NRIs in the UAE, the Gulf and the wider MEA region investing in India — NRE/NRO/FCNR, DTAA, GIFT City, repatriation, estate planning & more.",
    linkText: "Download Free PDF",
    icon: Download,
    fileUrl: "/ebooks/nri-investment-guide-2026.pdf",
    fileName: "MoneyCompound_NRI_Investment_Guide_2026.pdf",
    volume: 'VOL. 02',
    color: '#1E3A8A',
    gradient: 'linear-gradient(160deg, #1E40AF 0%, #1E3A8A 60%, #0E2A6E 100%)',
    accent: '#A7D469',
    tagline: 'For NRIs · UAE · Gulf · MEA',
    badge: 'Invest Smart from Abroad',
  },
  {
    tag: 'CHECKLIST - FREE',
    tagColor: 'bg-emerald-100 text-emerald-800',
    title: "Retirement Readiness Checklist",
    subtitle: "Audit whether your retirement plan is actually on track.",
    desc: "A practical checklist to audit whether your retirement plan is actually on track — income, corpus, healthcare and estate planning.",
    linkText: "Download Checklist",
    icon: Download,
    fileUrl: "/ebooks/MoneyCompound_Retirement_Readiness_Checklist.html",
    fileName: "MoneyCompound_Retirement_Readiness_Checklist.html",
    volume: 'VOL. 03',
    color: '#065F46',
    gradient: 'linear-gradient(160deg, #047857 0%, #065F46 60%, #064E3B 100%)',
    accent: '#FDE047',
    tagline: 'Plan a Stress-Free Retirement',
    badge: 'Retirement Ready Series',
  },
  {
    tag: 'CHECKLIST - FREE',
    tagColor: 'bg-emerald-100 text-emerald-800',
    title: "NRI Starter Checklist",
    subtitle: "Step-by-step starter for NRIs — accounts, KYC, FATCA, DTAA.",
    desc: "Step-by-step starter checklist for NRIs: residency status, NRE/NRO/FCNR accounts, KYC, FATCA, DTAA and what to set up before investing in India.",
    linkText: "Download Checklist",
    icon: Download,
    fileUrl: "/ebooks/MoneyCompound_NRI_Starter_Checklist.html",
    fileName: "MoneyCompound_NRI_Starter_Checklist.html",
    volume: 'VOL. 04',
    color: '#C2410C',
    gradient: 'linear-gradient(160deg, #EA580C 0%, #C2410C 60%, #9A3412 100%)',
    accent: '#FFFFFF',
    tagline: 'Your First 90 Days as an NRI Investor',
    badge: 'NRI Onboarding',
  },
  {
    tag: 'READY RECKONER - FREE',
    tagColor: 'bg-brand-gold/10 text-brand-gold',
    title: "Tax Saving Ready Reckoner",
    subtitle: "80C, 80D, ELSS, NPS, capital-gains & old-vs-new regime at a glance.",
    desc: "Quick-reference guide to Section 80C, 80D, ELSS, NPS, capital-gains taxation and the choice between old vs new tax regime.",
    linkText: "Download Reckoner",
    icon: Download,
    fileUrl: "/ebooks/MoneyCompound_TaxSaving_ReadyReckoner.html",
    fileName: "MoneyCompound_TaxSaving_ReadyReckoner.html",
    volume: 'VOL. 05',
    color: '#5B21B6',
    gradient: 'linear-gradient(160deg, #6D28D9 0%, #5B21B6 60%, #4C1D95 100%)',
    accent: '#FDE047',
    tagline: 'A Quick-Reference Tax Manual',
    badge: 'Save Tax. Stay Compliant.',
  }
];

const youtubeData = [
  { title: "Mutual Funds for Minors", meta: "8 min • By Vipul Khandelwal", youtubeId: "Maoay_AKIOY" },
  { title: "How to Generate Regular Income through SWP", meta: "6 min • Money Compound Research", youtubeId: "muoLyft0lUM" },
  { title: "How to Become Rich? Power of Compounding", meta: "11 min • By Vipul Khandelwal", youtubeId: "ZhdgcffX10Q" },
  { title: "Complete Guide on Stock Market Taxation", meta: "9 min • Money Compound", youtubeId: "Uj65vVUm_rc" },
  { title: "Complete Guide on IPO Investing", meta: "14 min • By Vipul Khandelwal", youtubeId: "YZ-bBdTjs4c" },
  { title: "SIF: SEBI's New Investment Option (2025)", meta: "7 min • By Vipul Khandelwal", youtubeId: "kVVgyFd9u8E" }
];

export default function ResourcesPage({ videos = [] }) {
  const videoList = videos.length ? videos : youtubeData;
  const containerRef = useRef(null);
  const [activeAsset, setActiveAsset] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  React.useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.animate-up', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
      );
      
      gsap.fromTo('.resource-card', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
      
      gsap.fromTo('.youtube-anim-up', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.youtube-section-start', start: 'top 80%' } }
      );
      
      gsap.fromTo('.youtube-card', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.youtube-grid', start: 'top 85%' } }
      );
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 pt-32 pb-24 font-['Inter']">
      <Head>
        <title>Free Ebooks, Resources & Newsletter | Money Compound</title>
        <meta name="description" content="Free downloadable ebooks and resources from Money Compound — Smart Investor's Handbook, NRI Investment Guide, Retirement Checklist, NRI Starter Pack and Tax Reckoner. Newsletter signup available." />
        <link rel="canonical" href="https://www.moneycompound.com/resources" />
        <meta property="og:title" content="Free Ebooks & Resources — Money Compound" />
        <meta property="og:url" content="https://www.moneycompound.com/resources" />
        <meta property="og:image" content="https://www.moneycompound.com/og-cover.jpg" />
        <meta name="description" content="Free, downloadable guides created by our research team to help you plan, invest and protect your portfolio." />
      </Head>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="animate-up flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-brand-gold rounded-full" />
            <span className="text-[11px] font-black text-brand-gold uppercase tracking-[0.25em]">
              Knowledge Hub
            </span>
            <span className="w-12 h-[2px] bg-brand-gold rounded-full" />
          </div>
          
          <h1 className="animate-up text-4xl lg:text-5xl font-serif font-bold text-brand-navy mb-6 leading-tight">
            Resources, Ebooks & <span className="text-brand-gold">Newsletters</span>
          </h1>
          
          <p className="animate-up text-slate-600 text-lg leading-relaxed font-medium">
            Free, downloadable guides created by our research team to help you plan, invest and protect your portfolio.
          </p>

          {/* Newsletter Subscribe CTA — opens Zoho lead-capture modal */}
          <div className="animate-up mt-8 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setActiveAsset({
                title: 'Subscribe to The Compound Digest',
                desc: 'Monthly research notes on markets, mutual funds and macro themes. Delivered to your inbox on the 1st.',
                formUrl: 'https://zfrmz.in/SDpoJH7RLbUPEruAVEtJ',
              })}
              className="newsletter-cta group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-brand-navy via-[#0F2746] to-brand-navy text-white font-black text-[12px] uppercase tracking-[0.25em] shadow-[0_10px_30px_-8px_rgba(10,26,47,0.45)] overflow-hidden transition-all duration-400 hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.55)] hover:-translate-y-1 hover:scale-[1.04] active:scale-[0.98] cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-gold/40"
            >
              {/* Outer gold glow on hover */}
              <span aria-hidden className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#F4C430] via-[#F4C430]/40 to-[#F4C430] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10" />
              {/* Gold shimmer sweep on hover */}
              <span aria-hidden className="newsletter-sweep absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#F4C430]/50 to-transparent" />
              {/* Animated ring — pulsing gold border */}
              <span aria-hidden className="absolute inset-0 rounded-full ring-1 ring-[#F4C430]/40 group-hover:ring-2 group-hover:ring-[#F4C430] transition-all duration-500 newsletter-ring-pulse" />
              <Mail className="relative z-10 w-[18px] h-[18px] text-[#F4C430] group-hover:rotate-[-12deg] group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_3px_rgba(244,196,48,0.4)]" strokeWidth={2.75} />
              <span className="relative z-10 group-hover:tracking-[0.3em] transition-all duration-300">Subscribe to Newsletter</span>
              <ArrowRight className="relative z-10 w-[18px] h-[18px] text-[#F4C430] group-hover:translate-x-1.5 transition-transform duration-300 drop-shadow-[0_0_3px_rgba(244,196,48,0.4)]" strokeWidth={2.75} />
            </button>
          </div>

          <style jsx>{`
            .newsletter-cta:hover .newsletter-sweep {
              transform: translateX(100%);
              transition: transform 1.1s cubic-bezier(0.22, 0.61, 0.36, 1);
            }
            .newsletter-ring-pulse {
              animation: newsletter-ring-pulse-kf 2.8s ease-in-out infinite;
            }
            @keyframes newsletter-ring-pulse-kf {
              0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.55); }
              50%      { box-shadow: 0 0 0 8px rgba(212, 175, 55, 0); }
            }
          `}</style>
        </div>

        {/* Grid — Premium 3D ebook covers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {resourcesData.map((resource, idx) => (
            <EbookCard
              key={idx}
              book={resource}
              index={idx}
              onClick={() => setActiveAsset(resource)}
            />
          ))}
        </div>
      </div>

      <LeadCaptureModal
        open={!!activeAsset}
        onClose={() => setActiveAsset(null)}
        asset={activeAsset}
      />

      {/* YouTube Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-32 youtube-section-start">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="youtube-anim-up flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-brand-gold rounded-full" />
            <span className="text-[11px] font-black text-brand-gold uppercase tracking-[0.25em]">
              Watch & Learn
            </span>
            <span className="w-12 h-[2px] bg-brand-gold rounded-full" />
          </div>
          
          <h2 className="youtube-anim-up text-4xl lg:text-5xl font-serif font-bold text-brand-navy mb-6 leading-tight">
            Our <span className="text-brand-gold">YouTube</span> Library
          </h2>
          
          <p className="youtube-anim-up text-slate-600 text-lg leading-relaxed font-medium">
            Bite-sized videos on investing, taxation and investments planning by the Money Compound team.
          </p>
        </div>

        {/* Video Grid */}
        <div className="youtube-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoList.map((video, idx) => (
            <div
              key={idx}
              className="youtube-card bg-white rounded-2xl border-[1.5px] border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              {/* Thumbnail / Player Area */}
              <div className="h-48 bg-brand-navy relative overflow-hidden">
                {playingVideo === idx ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlayingVideo(idx)}
                    aria-label={`Play ${video.title}`}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/70 to-slate-900/60 mix-blend-multiply group-hover:opacity-80 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Play className="w-6 h-6 text-brand-navy ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </button>
                )}
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-serif font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors duration-300 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-slate-500 text-[13px] font-medium mt-auto">
                  {video.meta}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="youtube-anim-up mt-16 text-center">
          <Link href="https://www.youtube.com/@moneycompoundwealth" target="_blank" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-brand-navy text-brand-navy font-bold text-sm hover:bg-brand-navy hover:text-white transition-all duration-300">
            Visit Our YouTube Channel
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

    </div>
  );
}
