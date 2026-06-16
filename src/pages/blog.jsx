import React, { useLayoutEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap, { ScrollTrigger } from '../lib/gsap';
import { Calendar, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { getAllBlogs } from '../lib/contentDb';

export async function getServerSideProps() {
  const allBlogs = await getAllBlogs();
  return { props: { allBlogs } };
}

const BLOG_HEAD = (
  <Head>
    <title>Mutual Fund Investing Blog — SIP, NRI, Tax, Retirement | Money Compound</title>
    <meta name="description" content="The Money Compound blog — educational articles on mutual fund SIPs, NRI investing, taxation, retirement, insurance and personal finance. Written for Indian investors, in plain English." />
    <link rel="canonical" href="https://moneycompound.com/blog" />
    <meta property="og:title" content="Money Compound Blog" />
    <meta property="og:url" content="https://moneycompound.com/blog" />
    <meta property="og:image" content="https://moneycompound.com/og-cover.jpg" />
  </Head>
);

export default function BlogPage({ allBlogs = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const containerRef = useRef(null);
  const totalPages = Math.ceil(allBlogs.length / blogsPerPage);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveals on load (it sits above the fold)
      gsap.set('.animate-text-reveal', { y: 60, opacity: 0 });
      gsap.to('.animate-text-reveal', {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Each blog card reveals as it scrolls into view — and re-animates
      // when scrolling back up/down (toggleActions: play/reverse both ways).
      gsap.utils.toArray('.animate-blog-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);
    return () => ctx.revert();
  }, [currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setCurrentPage(pageNumber);
    }, 100);
  };

  const jumpForward = () => {
    const nextBlock = Math.min(currentPage + 6, totalPages);
    paginate(nextBlock);
  };

  const jumpBackward = () => {
    const prevBlock = Math.max(currentPage - 6, 1);
    paginate(prevBlock);
  };

  return (
    <>
    {BLOG_HEAD}
    <div ref={containerRef} className="min-h-screen bg-zinc-50 pt-44 pb-20 px-4 overflow-hidden">
      <Head>
        <title>Our Blog | Money Compound</title>
      </Head>

      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="inline-block relative">
          <div className="animate-text-reveal text-sm font-black text-brand-gold uppercase tracking-[0.5em] mb-6">Our Insights</div>
          <h1 className="animate-text-reveal text-6xl md:text-8xl font-black text-brand-navy mb-4 tracking-tighter">
            THE <span className="text-brand-gold italic">BLOG</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto min-h-[1000px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {currentBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={blog.url}
              className="animate-blog-card group flex flex-col bg-transparent"
            >
              <div className="relative aspect-[19/10] mb-6 overflow-hidden rounded-[24px] shadow-xl border border-white/20 bg-white">
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 text-white/90 text-[11px] font-bold tracking-wider uppercase">
                  <Calendar size={14} className="text-brand-gold" />
                  {blog.date}
                </div>
              </div>

              <div className="flex flex-col flex-1 px-2">
                <h3 className="text-[22px] font-bold text-brand-navy mb-3 leading-[1.3] group-hover:text-brand-gold transition-colors duration-300 min-h-[3.9rem]">
                  {blog.title}
                </h3>

                <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-navy text-white group-hover:bg-brand-gold rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all duration-300 self-start shadow-xl">
                  Read More
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-24 flex justify-center items-center gap-2 animate-text-reveal">
          <button
            onClick={jumpBackward}
            disabled={currentPage === 1}
            className={`p-3 bg-white border border-slate-200 rounded-xl transition-all shadow-sm ${currentPage === 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:text-brand-gold hover:border-brand-gold'}`}
          >
            <ChevronsLeft size={18} />
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-3 bg-white border border-slate-200 rounded-xl transition-all shadow-sm ${currentPage === 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:text-brand-gold hover:border-brand-gold'}`}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-2 py-1 shadow-md">
            {(() => {
              const maxVisible = 6;
              const currentBlock = Math.floor((currentPage - 1) / maxVisible);
              const start = currentBlock * maxVisible + 1;
              const end = Math.min(start + maxVisible - 1, totalPages);

              return Array.from({ length: (end - start) + 1 }, (_, i) => start + i).map((num) => (
                <button
                  key={num}
                  onClick={() => paginate(num)}
                  className={`w-12 h-12 min-w-[48px] rounded-xl text-[15px] font-bold transition-all duration-300 ${
                    num === currentPage
                    ? 'bg-brand-navy text-white shadow-lg'
                    : 'text-brand-navy/40 hover:text-brand-navy hover:bg-white/50'
                  }`}
                >
                  {num}
                </button>
              ));
            })()}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-3 bg-white border border-slate-200 rounded-xl transition-all shadow-sm ${currentPage === totalPages ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:text-brand-gold hover:border-brand-gold'}`}
          >
            <ChevronRight size={18} />
          </button>
          <button
            onClick={jumpForward}
            disabled={currentPage === totalPages}
            className={`p-3 bg-white border border-slate-200 rounded-xl transition-all shadow-sm ${currentPage === totalPages ? 'text-slate-200 cursor-not-allowed' : 'text-slate-500 hover:text-brand-gold hover:border-brand-gold'}`}
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
