// One-off scraper: pulls full blog content from moneycompound.com for each
// entry in src/data/blogs.js and writes a JSON map keyed by blog slug to
// src/data/blog-content.json. The dynamic [slug] page reads from that file.
//
// Run: node scripts/scrape-blogs.mjs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BLOGS_JS = path.join(ROOT, 'src', 'data', 'blogs.js');
const OUTPUT_JSON = path.join(ROOT, 'src', 'data', 'blog-content.json');
const BASE = 'https://moneycompound.com';

// ─────────────────────────── helpers ───────────────────────────

const slugify = (s) =>
  s.toLowerCase()
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Convert the absUrl(...) calls in blogs.js back to relative paths so we
// can extract the raw rawBlogs array via eval-like dynamic import.
async function loadBlogsList() {
  const src = await fs.readFile(BLOGS_JS, 'utf8');
  // Match the rawBlogs array literal
  const match = src.match(/const rawBlogs\s*=\s*(\[[\s\S]*?\n\]);/);
  if (!match) throw new Error('Could not find rawBlogs array in blogs.js');
  // eslint-disable-next-line no-new-func
  const raw = new Function(`return ${match[1]}`)();
  return raw;
}

// Pull the inner HTML of the blog-detail div. The end boundary is the next
// "clearfix" div or the start of the commented-out tags block.
function extractBlogDetail(html) {
  const startMarker = '<div class="blog-detail">';
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) return null;
  const after = html.slice(startIdx + startMarker.length);

  // Pick the earliest end boundary.
  const boundaries = [
    after.indexOf('<!--<div>'),
    after.indexOf('<div class="clearfix">'),
    after.indexOf('<div class="sharepost">'),
  ].filter((i) => i > -1);
  if (boundaries.length === 0) return null;
  const endIdx = Math.min(...boundaries);

  // Trim trailing whitespace and any leftover closing </div> of blog-detail.
  let body = after.slice(0, endIdx).trim();
  body = body.replace(/<\/div>\s*$/i, '').trim();
  return body;
}

// Strip the source site's heavy inline styling so it renders cleanly in our
// theme. Keeps semantic tags (p, h1-h6, ul/ol/li, strong/em, a, img, br, blockquote).
function sanitize(html) {
  let out = html;

  // Remove inline styles, class, lang and font-family/font tags.
  out = out.replace(/\s+style="[^"]*"/gi, '');
  out = out.replace(/\s+style='[^']*'/gi, '');
  out = out.replace(/\s+class="[^"]*"/gi, '');
  out = out.replace(/\s+lang="[^"]*"/gi, '');
  out = out.replace(/\s+xml:lang="[^"]*"/gi, '');
  out = out.replace(/\s+face="[^"]*"/gi, '');
  out = out.replace(/\s+color="[^"]*"/gi, '');
  out = out.replace(/\s+size="[^"]*"/gi, '');
  out = out.replace(/\s+align="[^"]*"/gi, '');

  // Drop <font> and presentational tags entirely (keep their inner text).
  out = out.replace(/<\/?font[^>]*>/gi, '');
  out = out.replace(/<\/?o:p[^>]*>/gi, '');

  // Collapse <span> wrappers since they only carried styling in the source.
  out = out.replace(/<span[^>]*>/gi, '');
  out = out.replace(/<\/span>/gi, '');

  // Normalise image srcs to absolute URLs.
  out = out.replace(/(<img[^>]+src=")(\/[^"]+)/gi, `$1${BASE}$2`);

  // Strip script/iframe (defensive).
  out = out.replace(/<script[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

  // Collapse runs of blank lines.
  out = out.replace(/(\r?\n\s*){3,}/g, '\n\n');

  return out.trim();
}

async function fetchWithRetry(url, attempt = 0) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    if (attempt < 2) {
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      return fetchWithRetry(url, attempt + 1);
    }
    throw err;
  }
}

// Derive a stable slug. Prefer the slug from the URL; if missing or empty,
// fall back to slugifying the title. Append numeric id when needed for uniqueness.
function deriveSlug(blog, takenSlugs) {
  // URL pattern: /Home/Blogdetailsanc/<id>/<slug>  OR  /Home/Blogdetails/<id>/<slug>
  const m = blog.url.match(/\/Home\/Blogdetails(?:anc)?\/(\d+)\/([^/?]*)/);
  let id = m ? m[1] : '';
  let slug = m ? m[2] : '';
  if (!slug) slug = slugify(blog.title);
  slug = slug.replace(/^-+|-+$/g, ''); // trim leading dashes (e.g. "-are-you-...")
  if (!slug) slug = `post-${id || 'x'}`;
  let candidate = slug;
  let n = 2;
  while (takenSlugs.has(candidate)) {
    candidate = `${slug}-${n++}`;
  }
  takenSlugs.add(candidate);
  return { slug: candidate, sourceId: id };
}

async function main() {
  const blogs = await loadBlogsList();
  console.log(`Found ${blogs.length} blogs to scrape.`);

  const takenSlugs = new Set();
  const enriched = blogs.map((b) => {
    const { slug, sourceId } = deriveSlug(b, takenSlugs);
    return { ...b, slug, sourceId };
  });

  const results = {};
  const batchSize = 8;
  let done = 0;
  for (let i = 0; i < enriched.length; i += batchSize) {
    const batch = enriched.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (blog) => {
        const fullUrl = `${BASE}${blog.url}`;
        try {
          const html = await fetchWithRetry(fullUrl);
          const raw = extractBlogDetail(html);
          if (!raw) {
            console.warn(`  ! No blog-detail found for: ${blog.title}`);
            results[blog.slug] = { ok: false, reason: 'no-blog-detail' };
            return;
          }
          const clean = sanitize(raw);
          results[blog.slug] = {
            ok: true,
            title: blog.title,
            date: blog.date,
            image: blog.image,
            slug: blog.slug,
            sourceId: blog.sourceId,
            sourceUrl: fullUrl,
            content: clean,
          };
        } catch (err) {
          console.warn(`  ! ${blog.title}: ${err.message}`);
          results[blog.slug] = { ok: false, reason: err.message };
        }
      })
    );
    done += batch.length;
    console.log(`  ...${done}/${enriched.length} done`);
  }

  // Write JSON
  await fs.writeFile(OUTPUT_JSON, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nWrote ${OUTPUT_JSON}`);

  // Also write the enriched blog list (with slug) back to a separate JSON
  // so blogs.js can be regenerated without re-running the scraper.
  const meta = enriched.map((b) => ({
    title: b.title,
    date: b.date,
    image: b.image,
    url: b.url,
    slug: b.slug,
    sourceId: b.sourceId,
  }));
  const metaPath = path.join(ROOT, 'src', 'data', 'blog-meta.json');
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf8');
  console.log(`Wrote ${metaPath}`);

  const okCount = Object.values(results).filter((r) => r.ok).length;
  console.log(`\nDone. ${okCount}/${enriched.length} successful.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
