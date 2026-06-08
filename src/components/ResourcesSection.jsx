import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { Download, Mail } from 'lucide-react';
import LeadCaptureModal from './LeadCaptureModal';
import EbookCard from './EbookCard';

const resourcesData = [
  {
    tag: 'EBOOK - FREE',
    tagColor: 'bg-brand-gold/10 text-brand-gold',
    title: "The Smart Investor's Handbook 2026",
    subtitle: "An educational beginner-to-confident guide to building wealth in India.",
    desc: "A 20-chapter beginner-to-confident guide for every kind of investor in India — compounding, asset classes, mutual funds & SIPs, fixed income, tax-smart investing.",
    linkText: "Download Free PDF",
    icon: Download,
    fileUrl: "/ebooks/smart-investors-handbook-2026.pdf",
    fileName: "MoneyCompound_Smart_Investors_Handbook_2026.pdf",
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

const ResourcesSection = () => {
  const containerRef = useRef(null);
  const [activeAsset, setActiveAsset] = useState(null);

  React.useEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.fromTo('.resource-anim-up', 
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%'
          }
        }
      );
      
      gsap.fromTo('.resource-card', 
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.resources-grid',
            start: 'top 85%'
          }
        }
      );
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 font-['Inter'] relative"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 100%, rgba(148, 163, 184, 0.20) 0%, transparent 70%),
          linear-gradient(180deg, #ffffff 0%, #e8edf3 100%)
        `
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="resource-anim-up flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-brand-gold rounded-full" />
            <span className="text-[11px] font-black text-brand-gold uppercase tracking-[0.25em]">
              Knowledge Hub
            </span>
            <span className="w-12 h-[2px] bg-brand-gold rounded-full" />
          </div>
          
          <h2 className="resource-anim-up text-4xl lg:text-5xl font-serif font-bold text-brand-navy mb-6 leading-tight">
            Resources, Ebooks & <span className="text-brand-gold">Newsletters</span>
          </h2>
          
          <p className="resource-anim-up text-slate-600 text-lg leading-relaxed font-medium">
            Free, downloadable guides created by our research team to help you plan, invest and protect your portfolio.
          </p>
        </div>

        {/* Grid — Premium 3D ebook covers */}
        <div className="resources-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
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
    </section>
  );
}

export default ResourcesSection;
