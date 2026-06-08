// One-time migration: existing blogs + YouTube videos -> Supabase.
// Idempotent (upserts by slug), so safe to re-run.
import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l && !l.trim().startsWith('#') && l.includes('='))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    })
)
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

const MC = 'https://moneycompound.com'
const absUrl = (p) => (!p ? null : p.startsWith('http') ? p : `${MC}${p}`)
const stripHtml = (html) => (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
const toExcerpt = (html) => stripHtml(html).slice(0, 180)
const toReadTime = (html) => {
  const words = stripHtml(html).split(' ').filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}
const toISO = (dateStr) => {
  const d = new Date(dateStr)
  return isNaN(d) ? null : d.toISOString()
}

// ── Blogs ──────────────────────────────────────────────────────
const content = JSON.parse(readFileSync(new URL('../src/data/blog-content.json', import.meta.url)))
const entries = Object.values(content).filter((e) => e && e.ok !== false && e.slug && e.content)

const blogRows = entries.map((e) => ({
  title: e.title,
  slug: e.slug,
  excerpt: toExcerpt(e.content),
  cover_image: absUrl(e.image),
  content: e.content,
  author: 'Money Compound',
  read_time: toReadTime(e.content),
  published: true,
  published_at: toISO(e.date),
}))

console.log(`Upserting ${blogRows.length} blogs...`)
// chunk to avoid payload limits
for (let i = 0; i < blogRows.length; i += 50) {
  const chunk = blogRows.slice(i, i + 50)
  const { error } = await sb.from('blogs').upsert(chunk, { onConflict: 'slug' })
  if (error) { console.log('  Blog chunk ERROR:', error.message); process.exit(1) }
  console.log(`  ...${Math.min(i + 50, blogRows.length)}/${blogRows.length}`)
}

// ── YouTube videos ─────────────────────────────────────────────
const youtube = [
  { title: 'Mutual Funds for Minors', meta: '8 min • By Vipul Khandelwal', youtube_id: 'Maoay_AKIOY' },
  { title: 'How to Generate Regular Income through SWP', meta: '6 min • Money Compound Research', youtube_id: 'muoLyft0lUM' },
  { title: 'How to Become Rich? Power of Compounding', meta: '11 min • By Vipul Khandelwal', youtube_id: 'ZhdgcffX10Q' },
  { title: 'Complete Guide on Stock Market Taxation', meta: '9 min • Money Compound', youtube_id: 'Uj65vVUm_rc' },
  { title: 'Complete Guide on IPO Investing', meta: '14 min • By Vipul Khandelwal', youtube_id: 'YZ-bBdTjs4c' },
  { title: "SIF: SEBI's New Investment Option (2025)", meta: '7 min • By Vipul Khandelwal', youtube_id: 'kVVgyFd9u8E' },
].map((v, i) => ({ ...v, sort_order: i }))

// Only seed videos if the table is empty (avoid duplicates on re-run).
const { count } = await sb.from('youtube_videos').select('*', { count: 'exact', head: true })
if (!count) {
  const { error } = await sb.from('youtube_videos').insert(youtube)
  console.log(error ? `Video insert ERROR: ${error.message}` : `Inserted ${youtube.length} videos ✓`)
} else {
  console.log(`Videos already present (${count}) — skipping.`)
}

console.log('Migration done ✓')
