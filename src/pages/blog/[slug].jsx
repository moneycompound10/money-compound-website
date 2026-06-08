import React, { useLayoutEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { Calendar, ChevronLeft, ArrowRight } from 'lucide-react';
import { getBlogBySlug, getRelatedBlogs } from '../../lib/contentDb';

export async function getServerSideProps({ params }) {
  const post = await getBlogBySlug(params.slug);
  if (!post) {
    return { notFound: true };
  }
  const related = await getRelatedBlogs(params.slug);
  return { props: { post, related } };
}

export default function BlogPostPage({ post, related }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bp-fade', { opacity: 0, y: 24, stagger: 0.12, duration: 0.9, ease: 'power3.out' });
      gsap.from('.bp-hero-img', { opacity: 0, scale: 1.06, duration: 1.2, ease: 'power4.out' });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-50 pt-32 pb-20">
      <Head>
        <title>{post.title} | Money Compound</title>
        <meta name="description" content={post.title} />
      </Head>

      {/* ── Hero ── */}
      <div className="max-w-4xl mx-auto px-6">
        <Link
          href="/blog"
          className="bp-fade inline-flex items-center gap-2 text-slate-500 hover:text-brand-gold font-bold uppercase tracking-widest text-[12px] mb-10 transition-colors group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        <div className="bp-fade flex items-center gap-3 mb-6 text-sm">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/5 text-brand-navy font-bold uppercase tracking-widest text-[10px]">
            <Calendar size={13} className="text-brand-gold" />
            {post.date}
          </span>
        </div>

        <h1 className="bp-fade text-3xl md:text-5xl font-black text-brand-navy leading-[1.15] tracking-tight mb-10">
          {post.title}
        </h1>

        {post.image && (
          <div className="bp-hero-img relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl mb-14 bg-slate-100">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* ── Article body ── */}
        <article
          className="bp-fade blog-prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ── CTA ── */}
        <div className="bp-fade mt-20 bg-brand-navy text-white rounded-3xl p-8 md:p-12 shadow-xl">
          <p className="text-[11px] font-black text-brand-gold uppercase tracking-[0.4em] mb-3">Talk to an Expert</p>
          <h3 className="text-2xl md:text-3xl font-black mb-3 leading-tight">
            Want help mapping these ideas to <span className="text-brand-gold">your portfolio?</span>
          </h3>
          <p className="text-white/70 text-sm md:text-base mb-7 max-w-2xl">
            Our CAs and CFPs put together a <strong className="text-white">written, personalised plan</strong> for free — no obligation.
          </p>
          <Link href="/contact-us" className="inline-flex items-center gap-2 px-7 py-4 bg-brand-gold text-brand-navy font-black text-sm rounded-2xl hover:brightness-110 transition-all shadow-lg">
            Book a Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* ── Related ── */}
      {related && related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-24">
          <div className="bp-fade flex items-center gap-4 mb-10">
            <div className="w-12 h-[1px] bg-slate-300" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-gold">Keep Reading</span>
            <div className="w-12 h-[1px] bg-slate-300" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="bp-fade group flex flex-col">
                <div className="relative h-48 mb-5 overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-white/90 text-[10px] font-bold tracking-wider uppercase">
                    <Calendar size={11} className="text-brand-gold" />
                    {r.date}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-brand-navy leading-snug group-hover:text-brand-gold transition-colors">
                  {r.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Prose styling (project has no @tailwindcss/typography) ── */}
      <style jsx global>{`
        .blog-prose {
          color: #1e293b;
          font-size: 17px;
          line-height: 1.85;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .blog-prose > * + * { margin-top: 1.1em; }
        .blog-prose h1, .blog-prose h2, .blog-prose h3, .blog-prose h4 {
          color: #0B1A3A;
          font-weight: 800;
          line-height: 1.25;
          margin-top: 1.8em;
          margin-bottom: 0.6em;
          letter-spacing: -0.01em;
        }
        .blog-prose h1 { font-size: 2.1rem; }
        .blog-prose h2 { font-size: 1.65rem; }
        .blog-prose h3 { font-size: 1.35rem; }
        .blog-prose h4 { font-size: 1.15rem; }
        .blog-prose p {
          color: #334155;
        }
        .blog-prose strong { color: #0B1A3A; font-weight: 700; }
        .blog-prose em { color: #475569; }
        .blog-prose a {
          color: #2C78C5;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
          font-weight: 600;
        }
        .blog-prose a:hover { color: #0B1A3A; }
        .blog-prose ul, .blog-prose ol {
          padding-left: 1.6rem;
          margin-top: 1.1em;
          margin-bottom: 1.1em;
        }
        .blog-prose ul { list-style-type: disc; }
        .blog-prose ol { list-style-type: decimal; }
        .blog-prose li { margin-top: 0.45em; color: #334155; }
        .blog-prose li::marker { color: #C0913E; }
        .blog-prose blockquote {
          border-left: 4px solid #C0913E;
          padding: 0.5rem 0 0.5rem 1.5rem;
          margin: 1.5em 0;
          font-style: italic;
          color: #334155;
        }
        .blog-prose img {
          max-width: 100%;
          height: auto;
          margin: 1.5em auto;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }
        .blog-prose hr {
          border: 0;
          border-top: 1px solid #e2e8f0;
          margin: 2em 0;
        }
        .blog-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
        }
        .blog-prose th, .blog-prose td {
          border: 1px solid #e2e8f0;
          padding: 0.6rem 0.9rem;
          text-align: left;
        }
        .blog-prose th { background: #f1f5f9; font-weight: 700; color: #0B1A3A; }
      `}</style>
    </div>
  );
}
