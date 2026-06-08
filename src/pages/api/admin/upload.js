import { supabaseAdmin } from '../../../lib/supabaseAdmin'
import { requireAdmin } from '../../../lib/requireAdmin'

export const config = {
  api: { bodyParser: { sizeLimit: '12mb' } },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const user = await requireAdmin(req)
  if (!user) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const { name, type, dataBase64 } = req.body || {}
    if (!dataBase64) return res.status(400).json({ error: 'No file data' })

    const safe = (name || 'image').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-60)
    const path = `blogs/${Date.now()}-${safe}`
    const buffer = Buffer.from(dataBase64, 'base64')

    const { error } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(path, buffer, { contentType: type || 'image/png', upsert: true })
    if (error) return res.status(500).json({ error: error.message })

    const { data } = supabaseAdmin.storage.from('blog-images').getPublicUrl(path)
    return res.status(200).json({ url: data.publicUrl })
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Upload failed' })
  }
}
