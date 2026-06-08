import React, { useState } from 'react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

// Extracts the 11-char YouTube ID from a full URL or returns the input as-is.
function parseYouTubeId(input) {
  const s = (input || '').trim()
  const m = s.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/)
  if (m) return m[1]
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s
  return ''
}

export default function VideoEditor({ video, onClose, onSaved }) {
  const isNew = !video
  const [f, setF] = useState(() => ({
    title: video?.title || '',
    meta: video?.meta || '',
    youtube: video?.youtube_id || '',
    sort_order: video?.sort_order ?? 0,
  }))
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))

  const ytId = parseYouTubeId(f.youtube)

  const save = async () => {
    setErr('')
    if (!f.title.trim()) return setErr('Title is required.')
    if (!ytId) return setErr('Enter a valid YouTube link or 11-character video ID.')
    setSaving(true)
    const payload = {
      title: f.title.trim(),
      meta: f.meta.trim(),
      youtube_id: ytId,
      sort_order: Number(f.sort_order) || 0,
    }
    try {
      let error
      if (isNew) ({ error } = await supabase.from('youtube_videos').insert(payload))
      else ({ error } = await supabase.from('youtube_videos').update(payload).eq('id', video.id))
      if (error) throw error
      onSaved()
    } catch (e2) {
      setErr(e2.message || 'Save failed')
      setSaving(false)
    }
  }

  const label = 'block text-[12px] font-bold text-slate-600 uppercase tracking-wider mb-1.5'
  const input =
    'w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-all'

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onClose} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-navy mb-6">
        <ArrowLeft size={16} /> Back to list
      </button>

      <h2 className="text-2xl font-serif font-bold text-brand-navy mb-6">{isNew ? 'Add YouTube Video' : 'Edit Video'}</h2>

      {err && <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{err}</div>}

      <div className="space-y-5">
        <div>
          <label className={label}>Title *</label>
          <input className={input} value={f.title} onChange={(e) => set('title', e.target.value)} placeholder="How to Become Rich? Power of Compounding" />
        </div>
        <div>
          <label className={label}>YouTube link or video ID *</label>
          <input className={input} value={f.youtube} onChange={(e) => set('youtube', e.target.value)} placeholder="https://youtu.be/ZhdgcffX10Q" />
          {ytId && (
            <div className="mt-3">
              <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt="preview" className="w-48 rounded-lg border border-slate-200" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={label}>Meta line</label>
            <input className={input} value={f.meta} onChange={(e) => set('meta', e.target.value)} placeholder="11 min • By Vipul Khandelwal" />
          </div>
          <div>
            <label className={label}>Sort order</label>
            <input type="number" className={input} value={f.sort_order} onChange={(e) => set('sort_order', e.target.value)} />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-xl text-sm font-bold hover:bg-brand-gold transition-colors disabled:opacity-60">
            {saving && <Loader2 size={16} className="animate-spin" />}
            {isNew ? 'Add Video' : 'Save Changes'}
          </button>
          <button onClick={onClose} className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100">Cancel</button>
        </div>
      </div>
    </div>
  )
}
