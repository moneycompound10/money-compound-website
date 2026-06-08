import React, { useRef, useLayoutEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { Download, FileText, ChevronLeft, Share2 } from 'lucide-react';

// Mock data (Shared with main page)
const imageData = [
  { id: 1, title: "Custom Branding Content 1", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1728713047brandingimage.png" },
  { id: 2, title: "Custom Branding Content 2", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1727927934brandingimage.png" },
  { id: 3, title: "Custom Branding Content 3", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1718869350brandingimage.png" },
  { id: 4, title: "Custom Branding Content 4", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1713322720brandingimage.png" },
  { id: 5, title: "Custom Branding Content 5", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1709867962brandingimage.png" },
  { id: 6, title: "Custom Branding Content 6", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1707901112brandingimage.png" },
  { id: 7, title: "Custom Branding Content 7", category: "Greetings and Others", subCategory: "Personal Greetings", image: "https://newapps.anchoredge.in/branding/Content/WebsiteShareImage/support@moneycompound.com/1680674820brandingimage.png" },
];

export default function ImageDetail() {
  const router = useRouter();
  const { id } = router.query;
  const containerRef = useRef(null);

  const image = imageData.find(img => img.id === parseInt(id));

  useLayoutEffect(() => {
    if (!image) return;
    const ctx = gsap.context(() => {
      gsap.from('.animate-fade', { opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power3.out' });
    }, containerRef);
    return () => ctx.revert();
  }, [image]);

  if (!image) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] pt-44 pb-20 px-4">
      <Head>
        <title>{image.title} | Money Compound</title>
      </Head>

      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link 
          href="/educational-images"
          className="animate-fade inline-flex items-center gap-2 text-slate-500 hover:text-[#2C78C5] font-bold uppercase tracking-widest text-[12px] mb-12 transition-colors group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          <div className="flex-1 w-full flex flex-col items-center">
            <div className="animate-fade bg-white p-4 pb-10 rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden w-full max-w-2xl flex flex-col items-center gap-8">
              <div className="w-full rounded-[24px] overflow-hidden shadow-sm border border-slate-50">
                <img 
                  src={image.image} 
                  alt={image.title} 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Download Button - Now Inside the Card */}
              <a 
                href={image.image} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-3.5 bg-[#E2E2E2] hover:bg-[#D4D4D4] text-[#214F83] text-[18px] font-bold rounded-[8px] transition-all border border-[#C5C5C5] shadow-sm"
              >
                Download Image
              </a>
            </div>
          </div>

          {/* Sidebar: E-book Section */}
          <div className="w-full lg:w-[380px] animate-fade">
            <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden sticky top-32">
              <div className="bg-slate-50/50 p-8 border-b border-slate-100">
                <h3 className="text-xl font-black text-[#0B1120] flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-[#2C78C5] to-[#52C19E] rounded-full" />
                  Get Free E-book
                </h3>
              </div>
              <div className="p-8">
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { name: 'Financial Freedom', link: '#' },
                      { name: 'Personal Finance Lessons', link: '#' }
                    ].map((item, idx) => (
                      <tr key={idx} className="group">
                        <td className="py-5">
                          <div className="flex items-center gap-3">
                            <FileText size={18} className="text-[#2C78C5]" />
                            <span className="text-[14px] font-bold text-slate-700">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-5 text-right">
                          <a href={item.link} className="text-[#2C78C5] font-black text-[11px] uppercase tracking-widest hover:text-[#52C19E] transition-colors underline decoration-2 underline-offset-4">
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
