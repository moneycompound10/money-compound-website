// One-time: remove the broken IRDAI <img> (404) from the medical-claim blog body.
import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l && !l.trim().startsWith('#') && l.includes('='))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })

const slug = 'is-your-medical-claim-stuck'
const { data, error } = await sb.from('blogs').select('content').eq('slug', slug).single()
if (error) { console.error(error.message); process.exit(1) }

const before = data.content || ''
// remove the <p>..<img ...157IRDAI...></p> block (broken 404 image)
const re = /<p>\s*<img[^>]*157IRDAI[^>]*>\s*<\/p>/
if (!re.test(before)) { console.error('broken img block not found — already fixed?'); process.exit(1) }
const after = before.replace(re, '')
if (after === before || after.length >= before.length) { console.error('no change made'); process.exit(1) }
// safety: ensure no broken IRDAI img remains
if (/157IRDAI/.test(after)) { console.error('IRDAI ref still present'); process.exit(1) }

const upd = await sb.from('blogs').update({ content: after }).eq('slug', slug).select('slug')
if (upd.error || upd.data?.length !== 1) { console.error('update failed', upd.error?.message); process.exit(1) }
console.log('removed broken image.', before.length, '->', after.length, 'chars')
console.log('DONE')
