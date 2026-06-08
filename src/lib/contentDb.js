import { supabase } from './supabaseClient'

// Format an ISO timestamp as "May 19, 2026" (UTC-stable so the day never shifts).
export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d)) return ''
  return d.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  })
}

const MC = 'https://moneycompound.com'
const absUrl = (p) => (!p ? '' : p.startsWith('http') ? p : `${MC}${p}`)

// All published blogs (newest first) — shape matches the old `allBlogs`.
export async function getAllBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, cover_image, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false })
  if (error) { console.error('getAllBlogs:', error.message); return [] }
  return (data || []).map((b, i) => ({
    id: b.id,
    n: i + 1,
    title: b.title,
    slug: b.slug,
    url: `/blog/${b.slug}`,
    image: absUrl(b.cover_image),
    date: formatDate(b.published_at),
  }))
}

// One blog by slug (published only).
export async function getBlogBySlug(slug) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error || !data) return null
  return {
    title: data.title,
    slug: data.slug,
    date: formatDate(data.published_at),
    image: absUrl(data.cover_image),
    content: data.content || '',
  }
}

// 3 recent blogs excluding the given slug.
export async function getRelatedBlogs(slug) {
  const { data, error } = await supabase
    .from('blogs')
    .select('title, slug, cover_image, published_at')
    .eq('published', true)
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(3)
  if (error) return []
  return (data || []).map((b) => ({
    title: b.title,
    slug: b.slug,
    image: absUrl(b.cover_image),
    date: formatDate(b.published_at),
  }))
}

// All YouTube videos for the resources page.
export async function getVideos() {
  const { data, error } = await supabase
    .from('youtube_videos')
    .select('id, title, meta, youtube_id')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) { console.error('getVideos:', error.message); return [] }
  return (data || []).map((v) => ({
    title: v.title,
    meta: v.meta,
    youtubeId: v.youtube_id,
  }))
}
