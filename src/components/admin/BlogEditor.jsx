import React, { useRef, useState } from 'react'
import { ArrowLeft, Loader2, Upload, X } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { uploadImage, slugify } from '../../lib/adminApi'
import RichEditor from './RichEditor'

export default function BlogEditor({ blog, token, onClose, onSaved }) {
  const isNew = !blog
  const coverRef = useRef(null)
  const [f, setF] = useState(() => ({
    title: blog?.title || '',
    slug: blog?.slug || '',
    excerpt: blog?.excerpt || '',
    cover_image: blog?.cover_image || '',
    content: blog?.content || '',
    author: blog?.author || 'Money Compound',
    tags: (blog?.tags || []).join(', '),
    read_time: blog?.read_time || '',
    published: blog?.published ?? true,
  }))
  const [slugEdited, setSlugEdited] = useState(!isNew)
  const [coverUploading, setCoverUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))

  const onTitle = (v) => {
    set('title', v)
    if (!slugEdited) set('slug', slugify(v))
  }

  const onCover = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setCoverUploading(true)
    try {
      const url = await uploadImage(file, token)
      set('cover_image', url)
    } catch (e2) {
      setErr('Cover upload failed: ' + e2.message)
    } finally {
      setCoverUploading(false)
    }
  }

  const save = async () => {
    setErr('')
    if (!f.title.trim()) return setErr('Title is required.')
    if (!f.slug.trim()) return setErr('Slug is required.')
    setSaving(true)
    const payload = {
      title: f.title.trim(),
      slug: slugify(f.slug),
      excerpt: f.excerpt.trim() || f.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180),
      cover_image: f.cover_image.trim(),
      content: f.content,
      author: f.author.trim(),
      tags: f.tags.split(',').map((t) => t.trim()).filter(Boolean),
      read_time: f.read_time.trim(),
      published: f.published,
    }
    try {
      let error
      if (isNew) {
        payload.published_at = new Date().toISOString()
        ;({ error } = await supabase.from('blogs').insert(payload))
      } else {
        ;({ error } = await supabase.from('blogs').update(payload).eq('id', blog.id))
      }
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
    <div className="max-w-4xl mx-auto">
      <button onClick={onClose} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-navy mb-6">
        <ArrowLeft size={16} /> Back to list
      </button>

      <h2 className="text-2xl font-serif font-bold text-brand-navy mb-6">
        {isNew ? 'New Blog Post' : 'Edit Blog Post'}
      </h2>

      {err && <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{err}</div>}

      <div className="space-y-5">
        <div>
          <label className={label}>Title *</label>
          <input className={input} value={f.title} onChange={(e) => onTitle(e.target.value)} placeholder="Best SIPs for 2026" />
        </div>

        <div>
          <label className={label}>URL slug *</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">/blog/</span>
            <input
              className={input}
              value={f.slug}
              onChange={(e) => { setSlugEdited(true); set('slug', e.target.value) }}
              placeholder="best-sips-for-2026"
            />
          </div>
        </div>

        <div>
          <label className={label}>Cover image</label>
          <div className="flex items-center gap-4">
            {f.cover_image ? (
              <div className="relative">
                <img src={f.cover_image} alt="cover" className="w-40 h-24 object-cover rounded-lg border border-slate-200" />
                <button onClick={() => set('cover_image', '')} className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-red-500 shadow">
                  <X size={13} />
                </button>
              </div>
            ) : (
              <div className="w-40 h-24 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-xs">No image</div>
            )}
            <button
              type="button"
              onClick={() => coverRef.current?.click()}
              disabled={coverUploading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-bold text-brand-navy hover:bg-slate-50 disabled:opacity-60"
            >
              {coverUploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
              {f.cover_image ? 'Replace' : 'Upload'}
            </button>
            <input ref={coverRef} type="file" accept="image/*" hidden onChange={onCover} />
          </div>
          <input className={`${input} mt-2`} value={f.cover_image} onChange={(e) => set('cover_image', e.target.value)} placeholder="…or paste an image URL" />
        </div>

        <div>
          <label className={label}>Content *</label>
          <RichEditor
            key={blog?.id || 'new'}
            initialHtml={f.content}
            onChange={(html) => set('content', html)}
            uploadImage={(file) => uploadImage(file, token)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={label}>Author</label>
            <input className={input} value={f.author} onChange={(e) => set('author', e.target.value)} />
          </div>
          <div>
            <label className={label}>Read time</label>
            <input className={input} value={f.read_time} onChange={(e) => set('read_time', e.target.value)} placeholder="5 min read" />
          </div>
        </div>

        <div>
          <label className={label}>Tags (comma-separated)</label>
          <input className={input} value={f.tags} onChange={(e) => set('tags', e.target.value)} placeholder="SIP, Mutual Funds, Tax" />
        </div>

        <div>
          <label className={label}>Short excerpt (optional)</label>
          <textarea className={`${input} h-20 resize-none`} value={f.excerpt} onChange={(e) => set('excerpt', e.target.value)} placeholder="One-line summary (auto-generated from content if left blank)" />
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input type="checkbox" checked={f.published} onChange={(e) => set('published', e.target.checked)} className="w-4 h-4 accent-brand-gold" />
          <span className="text-sm font-semibold text-slate-700">Published (visible on the site)</span>
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-xl text-sm font-bold hover:bg-brand-gold transition-colors disabled:opacity-60">
            {saving && <Loader2 size={16} className="animate-spin" />}
            {isNew ? 'Publish Blog' : 'Save Changes'}
          </button>
          <button onClick={onClose} className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100">Cancel</button>
        </div>
      </div>
    </div>
  )
}
