// One-time: fix 4 broken blog cover images in Supabase (replace dead /Content/... paths
// with working anchoredge CDN images). Idempotent — safe to re-run.
import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l && !l.trim().startsWith('#') && l.includes('='))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

const CDN = 'https://newapps.anchoredge.in/branding/Content/Blogimage/RealImage'
const updates = [
  ['can-minors-invest-in-mutual-funds-in-india', `${CDN}/806Mutual-fund-in-the-name-of-a-minor.jpg`],
  ['is-your-medical-claim-stuck', `${CDN}/1710573697healthinsurance.png`],
  ['health-insurance-in-financial-planning-a-comprehensive-guide', `${CDN}/1706166196healthinsurance-01.png`],
  ['financial-deadlines-what-you-need-to-know-before-september-30-2023', `${CDN}/479tax_free_tax_saving.jpg`],
]

for (const [slug, cover] of updates) {
  const { data, error } = await sb
    .from('blogs')
    .update({ cover_image: cover })
    .eq('slug', slug)
    .select('slug, cover_image')
  if (error) { console.error('FAIL', slug, error.message); process.exit(1) }
  if (!data || data.length !== 1) { console.error('FAIL', slug, 'rows updated:', data?.length); process.exit(1) }
  console.log('updated', slug, '->', data[0].cover_image)
}
console.log('\nDONE — all 4 covers updated.')
