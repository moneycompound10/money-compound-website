import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { X, Maximize2, Newspaper } from 'lucide-react';

const mediaClippings = [
  {
    id: 1,
    title: "Plan a worry-free future with Freedom SIP",
    hindiTitle: "फ्रीडम एसआईपी के साथ चिंता मुक्त भविष्य की योजना बनाएं",
    category: "Media Coverage",
    // Use the actual image path provided by the user or a clean placeholder
    image: "/images/media_clipping.png", 
    description: "Expert insights by Vipul Khandelwal on achieving financial independence through strategic SIP planning."
  }
];

export default function GalleryPage() {
  const containerRef = useRef(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

      gsap.set('.animate-title-reveal', { y: 60, opacity: 0 });
      gsap.set('.animate-media-frame', { scale: 0.9, opacity: 0, y: 40 });

      tl.to('.animate-title-reveal', {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.2
      })
        .to('.animate-media-frame', {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'expo.out'
        }, "-=0.8");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#ECF1EE] pt-44 pb-20 px-4 overflow-hidden">
      <Head>
        <title>Our Gallery | Money Compound</title>
      </Head>

      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="inline-block relative">
          <div className="animate-title-reveal text-sm font-black text-[#1A2E23] uppercase tracking-[0.5em] mb-6">Our Moments</div>
          <h1 className="animate-title-reveal text-6xl md:text-8xl font-black text-[#1A2E23] mb-4 tracking-tighter leading-none">
            THE <span className="text-[#1A2E23]/30 italic">GALLERY</span>
          </h1>
          <p className="animate-title-reveal mt-6 text-slate-500 text-lg max-w-2xl mx-auto">
            Featured media coverage and expert financial insights from leading publications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Newspaper Clipping Card */}
          <div 
            className="animate-media-frame group cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          >
            <div className="bg-white rounded-[32px] overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {/* Preview Thumbnail - Real Content Snippet */}
              <div className="aspect-[4/3] bg-[#FFFFF0] p-6 relative overflow-hidden border-b border-slate-50 font-['Noto_Sans_Devanagari',sans-serif]">
                <div className="border-l-4 border-[#C81D25] pl-3 mb-4">
                  <h4 className="text-[14px] font-black text-[#0B1120] leading-tight">फ्रीडम एसआईपी के साथ चिंता मुक्त भविष्य की योजना बनाएं</h4>
                </div>
                
                <div className="text-[9px] text-slate-600 space-y-2 leading-relaxed text-justify pr-16">
                  <p>हम सभी जीवन के विभिन्न पहलुओं में स्वतंत्रता चाहते हैं और वित्तीय रूप से आत्मनिर्भरता इस स्वतंत्रता को प्राप्त करने की दिशा में पहला कदम है। युवा वयस्कों के रूप में, हमें पर्याप्त नकदी प्रवाह...</p>
                  <p className="font-bold text-[#C81D25]">आईसीआईसीआई प्रूडेंशियल फ्रीडम सिस्टमैटिक इन्वेस्टमेंट प्लान और एसडब्लूपी का एक कॉम्बिनेशन है...</p>
                </div>

                <div className="absolute bottom-4 right-4 w-20 h-24 border-2 border-slate-200 p-1 bg-white rotate-3 shadow-md">
                  <img src="/images/vipul_sir.png" alt="Vipul Khandelwal — Founder, Money Compound" className="w-full h-full object-cover grayscale-[20%]" />
                </div>

                {/* Overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                   <div className="bg-[#2C78C5] text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 shadow-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                      <Maximize2 size={14} />
                      Read Article
                   </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-[#C81D25]/10 text-[#C81D25] text-[10px] font-black uppercase tracking-widest rounded-md">Newspaper</span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">March 2026</span>
                </div>
                <h3 className="text-lg font-black text-[#0B1120] leading-tight group-hover:text-[#2C78C5] transition-colors">Media Feature: Vipul Khandelwal</h3>
                <p className="text-slate-500 text-sm mt-2 line-clamp-2">Featured insights on achieving financial freedom through strategic investment planning.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox / Modal with HD Content */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto pt-24 pb-12 scrollbar-hide">
          <button 
            className="fixed top-8 right-8 text-white hover:text-white transition-colors p-3 bg-white/5 rounded-full z-[110]"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X size={32} />
          </button>
          
          <div className="max-w-5xl w-full mx-auto">
            {/* HD Digital Recreation */}
            <div className="bg-[#FFFFF0] p-8 md:p-16 rounded-[40px] border border-slate-200 shadow-2xl relative font-['Noto_Sans_Devanagari',sans-serif]">
              {/* Red Header */}
              <div className="border-b-4 border-[#C81D25] mb-10 pb-4 flex justify-between items-end">
                <h2 className="text-3xl md:text-5xl font-black text-[#0B1120] leading-tight">
                  फ्रीडम <span className="text-[#C81D25]">एसआईपी</span> के साथ चिंता मुक्त भविष्य की योजना बनाएं
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-6 text-slate-800 text-lg leading-relaxed text-justify">
                  <p>हम सभी जीवन के विभिन्न पहलुओं में स्वतंत्रता चाहते हैं और वित्तीय रूप से आत्मनिर्भरता इस स्वतंत्रता को प्राप्त करने की दिशा में पहला कदम है। युवा वयस्कों के रूप में, हमें पर्याप्त नकदी प्रवाह न होने का डर होता है। बड़े होने पर, हम बच्चों की स्कूल फीस, बिजली बिल, ईएमआई और अन्य मासिक खर्चों जैसी बुनियादी जीवन आवश्यकताओं को पूरा करने के बारे में चिंता करते हैं।</p>

                  <div className="relative pl-12 py-4 italic border-l-4 border-[#C81D25] bg-white/50 rounded-r-xl">
                    <span className="absolute left-4 top-0 text-6xl text-[#C81D25] font-serif leading-none">“</span>
                    <p className="font-bold text-[#0B1120]">प्रभावी दृष्टिकोण आईसीआईसीआई प्रूडेंशियल म्यूचुअल फंड द्वारा पेश किए गए फ्रीडम एसआईपी प्रोडक्ट के माध्यम से है।</p>
                    <p className="mt-4 text-[#C81D25] font-black uppercase tracking-widest text-sm">— विपुल खंडेलवाल, मनी कंपाउंड</p>
                  </div>

                  <p>यह दृष्टिकोण निवेशकों को उनकी नकदी प्रवाह की जरूरतों को पूरा करने और आसानी से वित्तीय लक्ष्य हासिल करने में मदद करने के लिए डिजाइन किया गया है।</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="p-2 bg-white border border-slate-300 shadow-xl rotate-2">
                    <div className="w-full aspect-[3/4] overflow-hidden">
                      <img src="/images/vipul_sir.png" alt="Vipul Khandelwal — Founder, Money Compound" className="w-full h-full object-cover grayscale-[20%]" />
                    </div>
                  </div>
                  <div className="mt-8 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C81D25] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">
                      <Newspaper size={14} /> Media Featured
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
