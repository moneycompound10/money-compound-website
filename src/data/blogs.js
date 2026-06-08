// Blog metadata sourced from blog-meta.json (produced by scripts/scrape-blogs.mjs).
// Full HTML content lives in blog-content.json and is loaded only by the
// dynamic /blog/[slug] page at build time via getStaticProps.

import blogMeta from './blog-meta.json';

const MC = 'https://moneycompound.com';
const absUrl = (path) => (path.startsWith('http') ? path : `${MC}${path}`);

export const allBlogs = blogMeta.map((b, i) => ({
  id: i + 1,
  title: b.title,
  date: b.date,
  slug: b.slug,
  sourceId: b.sourceId,
  url: `/blog/${b.slug}`,
  image: absUrl(b.image),
}));
