import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { ChevronDown, Maximize2, X } from 'lucide-react';

const categories = [
  { 
    name: 'Mutual Fund', 
    subItems: ['Equity', 'Sales Drive', 'Debt', 'Hybrid'] 
  },
  { 
    name: 'Insurance', 
    subItems: ['other insurances', 'Life Insurance', 'Health Insurance'] 
  },
  { 
    name: 'Greetings and Others', 
    subItems: ['Special Days', 'Festivals', 'Personal Greetings'] 
  }
];

// Mock data with official links
const imageData = [
  { id: 1, title: "Custom Branding Content 1", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1728713047brandingimage.png" },
  { id: 2, title: "Custom Branding Content 2", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1727927934brandingimage.png" },
  { id: 3, title: "Custom Branding Content 3", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1718869350brandingimage.png" },
  { id: 4, title: "Custom Branding Content 4", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1713322720brandingimage.png" },
  { id: 5, title: "Custom Branding Content 5", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1709867962brandingimage.png" },
  { id: 6, title: "Custom Branding Content 6", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1707901112brandingimage.png" },
  { id: 7, title: "Custom Branding Content 7", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1680674820brandingimage.png" },
];

export default function EducationalImages() {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState({ category: 'All', subCategory: 'All' });
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const filteredImages = imageData.filter(img => {
    if (activeFilter.category === 'All') return true;
    if (activeFilter.subCategory === 'All') return img.category === activeFilter.category;
    return img.subCategory === activeFilter.subCategory;
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.animate-grid-item', 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.6, ease: 'power2.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#ECF1EE] pt-44 pb-20 px-4 overflow-hidden">
      <Head>
        <title>Educational Images | Money Compound</title>
      </Head>

      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="inline-block relative">
          <div className="animate-text-reveal text-sm font-black text-[#1A2E23] uppercase tracking-[0.5em] mb-6">Visual Knowledge</div>
          <h1 className="animate-text-reveal text-6xl md:text-8xl font-black text-[#1A2E23] mb-4 tracking-tighter">
            EDUCATIONAL <span className="text-[#1A2E23]/30 italic">IMAGES</span>
          </h1>
        </div>
      </div>

      {/* Filter Bar - Solid Navy Theme */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-center">
        <div className="flex flex-wrap items-center bg-[#1A2E23] rounded-full overflow-visible shadow-2xl border border-white/10 p-1.5">
          {/* All Button */}
          <button
            onClick={() => {
              setActiveFilter({ category: 'All', subCategory: 'All' });
              setOpenDropdown(null);
            }}
            className={`px-8 py-3 text-[12px] font-black uppercase tracking-[0.2em] transition-all rounded-full ${activeFilter.category === 'All' ? 'bg-white text-[#2C78C5] shadow-md' : 'text-white hover:bg-white/10'}`}
          >
            All
          </button>

          {/* Dynamic Dropdowns */}
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              className="relative"
              onMouseEnter={() => setOpenDropdown(cat.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`flex items-center gap-2 px-8 py-3 text-[12px] font-black uppercase tracking-[0.2em] transition-all rounded-full ${activeFilter.category === cat.name ? 'bg-white text-[#2C78C5] shadow-md' : 'text-white hover:bg-white/10'}`}
              >
                {cat.name}
                <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === cat.name ? 'rotate-180' : ''}`} />
              </button>

              {/* Sub-menu - Glassmorphism - Gap Fixed */}
              {openDropdown === cat.name && (
                <div className="absolute top-full left-0 min-w-[220px] bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[60] border border-slate-100 rounded-2xl overflow-hidden py-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  {cat.subItems.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setActiveFilter({ category: cat.name, subCategory: sub });
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-all ${activeFilter.subCategory === sub ? 'bg-gradient-to-r from-[#2C78C5] to-[#52C19E] text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-[#2C78C5]'}`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid - 3 Column - Linking to Detail Page */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredImages.length > 0 ? (
            filteredImages.map((img) => (
              <Link 
                key={img.id}
                href={`/educational-images/${img.id}`}
                className="animate-grid-item group cursor-pointer bg-white rounded-[32px] overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={img.image} 
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-[#2C78C5] scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                      <Maximize2 size={24} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-400 font-bold uppercase tracking-widest">
              No images found in this category
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
