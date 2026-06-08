import React, { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'
import { LogIn, Loader2, Plus, Pencil, Trash2, LogOut, FileText, Video, ExternalLink } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import BlogEditor from '../../components/admin/BlogEditor'
import VideoEditor from '../../components/admin/VideoEditor'
import { formatDate } from '../../lib/contentDb'

export default function AdminPage() {
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  const [tab, setTab] = useState('blogs')        // 'blogs' | 'videos'
  const [view, setView] = useState('list')        // 'list' | 'blog-edit' | 'video-edit'
  const [editing, setEditing] = useState(null)

  const [blogs, setBlogs] = useState([])
  const [videos, setVideos] = useState([])
  const [loadingList, setLoadingList] = useState(false)

  // login form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  const loadLists = useCallback(async () => {
    setLoadingList(true)
    const [b, v] = await Promise.all([
      supabase.from('blogs').select('id,title,slug,published,published_at,cover_image').order('published_at', { ascending: false }),
      supabase.from('youtube_videos').select('*').order('sort_order', { ascending: true }),
    ])
    setBlogs(b.data || [])
    setVideos(v.data || [])
    setLoadingList(false)
  }, [])

  useEffect(() => {
    if (session && view === 'list') loadLists()
  }, [session, view, loadLists])

  const login = async (e) => {
    e.preventDefault()
    setLoginErr('')
    setLoggingIn(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginErr(error.message)
    setLoggingIn(false)
  }

  const logout = () => supabase.auth.signOut()

  const delBlog = async (id, title) => {
    if (!window.confirm(`Delete blog "${title}"? This cannot be undone.`)) return
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (error) alert(error.message)
    else loadLists()
  }

  const delVideo = async (id, title) => {
    if (!window.confirm(`Delete video "${title}"?`)) return
    const { error } = await supabase.from('youtube_videos').delete().eq('id', id)
    if (error) alert(error.message)
    else loadLists()
  }

  const openNew = () => { setEditing(null); setView(tab === 'blogs' ? 'blog-edit' : 'video-edit') }
  const openEdit = (item, type) => { setEditing(item); setView(type === 'blogs' ? 'blog-edit' : 'video-edit') }
  const backToList = () => { setEditing(null); setView('list') }
  const afterSave = () => { setEditing(null); setView('list') }

  // ── Not ready / not logged in ────────────────────────────────
  if (!authReady) {
    return (
      <Shell>
        <div className="flex items-center justify-center py-32 text-slate-400">
          <Loader2 className="animate-spin mr-2" /> Loading…
        </div>
      </Shell>
    )
  }

  if (!session) {
    return (
      <Shell>
        <div className="max-w-sm mx-auto mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h1 className="text-2xl font-serif font-bold text-brand-navy mb-1">Admin Login</h1>
            <p className="text-sm text-slate-500 mb-6">Sign in to manage blogs & videos.</p>
            {loginErr && <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{loginErr}</div>}
            <form onSubmit={login} className="space-y-4">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold" />
              <button type="submit" disabled={loggingIn}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-navy text-white rounded-xl text-sm font-bold hover:bg-brand-gold transition-colors disabled:opacity-60">
                {loggingIn ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />} Sign In
              </button>
            </form>
          </div>
        </div>
      </Shell>
    )
  }

  const token = session.access_token

  // ── Editors ──────────────────────────────────────────────────
  if (view === 'blog-edit') {
    return <Shell><BlogEditor blog={editing} token={token} onClose={backToList} onSaved={afterSave} /></Shell>
  }
  if (view === 'video-edit') {
    return <Shell><VideoEditor video={editing} onClose={backToList} onSaved={afterSave} /></Shell>
  }

  // ── Dashboard list ───────────────────────────────────────────
  return (
    <Shell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-navy">Content Admin</h1>
          <p className="text-sm text-slate-500">{session.user.email}</p>
        </div>
        <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">
          <LogOut size={15} /> Logout
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <TabBtn active={tab === 'blogs'} onClick={() => setTab('blogs')} icon={<FileText size={15} />} label={`Blogs (${blogs.length})`} />
        <TabBtn active={tab === 'videos'} onClick={() => setTab('videos')} icon={<Video size={15} />} label={`Videos (${videos.length})`} />
        <div className="flex-1" />
        <button onClick={openNew} className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-navy text-white rounded-xl text-sm font-bold hover:bg-brand-gold transition-colors">
          <Plus size={16} /> {tab === 'blogs' ? 'New Blog' : 'Add Video'}
        </button>
      </div>

      {loadingList ? (
        <div className="py-20 text-center text-slate-400"><Loader2 className="animate-spin inline mr-2" /> Loading…</div>
      ) : tab === 'blogs' ? (
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          {blogs.length === 0 && <div className="p-8 text-center text-slate-400 text-sm">No blogs yet.</div>}
          {blogs.map((b) => (
            <div key={b.id} className="flex items-center gap-4 p-4 hover:bg-slate-50">
              <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                {b.cover_image && <img src={b.cover_image} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-brand-navy text-sm truncate">{b.title}</div>
                <div className="text-xs text-slate-400">
                  {formatDate(b.published_at)} · {b.published ? <span className="text-emerald-600 font-semibold">Published</span> : <span className="text-amber-600 font-semibold">Draft</span>}
                </div>
              </div>
              <a href={`/blog/${b.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-brand-navy" title="View"><ExternalLink size={16} /></a>
              <button onClick={() => openEdit(b, 'blogs')} className="p-2 text-slate-400 hover:text-brand-navy" title="Edit"><Pencil size={16} /></button>
              <button onClick={() => delBlog(b.id, b.title)} className="p-2 text-slate-400 hover:text-red-500" title="Delete"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          {videos.length === 0 && <div className="p-8 text-center text-slate-400 text-sm">No videos yet.</div>}
          {videos.map((v) => (
            <div key={v.id} className="flex items-center gap-4 p-4 hover:bg-slate-50">
              <img src={`https://img.youtube.com/vi/${v.youtube_id}/default.jpg`} alt="" className="w-20 h-12 rounded-lg object-cover bg-slate-100 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-brand-navy text-sm truncate">{v.title}</div>
                <div className="text-xs text-slate-400 truncate">{v.meta}</div>
              </div>
              <button onClick={() => openEdit(v, 'videos')} className="p-2 text-slate-400 hover:text-brand-navy" title="Edit"><Pencil size={16} /></button>
              <button onClick={() => delVideo(v.id, v.title)} className="p-2 text-slate-400 hover:text-red-500" title="Delete"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </Shell>
  )
}

function TabBtn({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${active ? 'bg-brand-navy text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
      {icon} {label}
    </button>
  )
}

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-5 font-['Inter']">
      <Head>
        <title>Content Admin | Money Compound</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="max-w-5xl mx-auto">{children}</div>
    </div>
  )
}
