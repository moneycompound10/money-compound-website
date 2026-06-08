import React, { useEffect, useRef, useState } from 'react'
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Link2, Quote, Image as ImageIcon, Pilcrow } from 'lucide-react'

// Lightweight contentEditable WYSIWYG. Outputs HTML compatible with `.blog-prose`.
// Remount with a `key` when loading a different post to reset content.
export default function RichEditor({ initialHtml = '', onChange, uploadImage }) {
  const ref = useRef(null)
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = initialHtml || ''
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const emit = () => onChange?.(ref.current?.innerHTML || '')

  const exec = (cmd, val = null) => {
    ref.current?.focus()
    document.execCommand(cmd, false, val)
    emit()
  }

  const addLink = () => {
    const url = window.prompt('Link URL:')
    if (url) exec('createLink', url)
  }

  const onPickImage = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      if (url) {
        ref.current?.focus()
        document.execCommand('insertImage', false, url)
        emit()
      }
    } catch (err) {
      alert('Image upload failed: ' + (err.message || err))
    } finally {
      setUploading(false)
    }
  }

  const Btn = ({ onClick, title, children }) => (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-brand-navy transition-colors"
    >
      {children}
    </button>
  )

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-100 bg-slate-50">
        <Btn onClick={() => exec('bold')} title="Bold"><Bold size={16} /></Btn>
        <Btn onClick={() => exec('italic')} title="Italic"><Italic size={16} /></Btn>
        <span className="w-px h-5 bg-slate-200 mx-1" />
        <Btn onClick={() => exec('formatBlock', 'H2')} title="Heading 2"><Heading2 size={16} /></Btn>
        <Btn onClick={() => exec('formatBlock', 'H3')} title="Heading 3"><Heading3 size={16} /></Btn>
        <Btn onClick={() => exec('formatBlock', 'P')} title="Paragraph"><Pilcrow size={16} /></Btn>
        <span className="w-px h-5 bg-slate-200 mx-1" />
        <Btn onClick={() => exec('insertUnorderedList')} title="Bullet list"><List size={16} /></Btn>
        <Btn onClick={() => exec('insertOrderedList')} title="Numbered list"><ListOrdered size={16} /></Btn>
        <Btn onClick={() => exec('formatBlock', 'BLOCKQUOTE')} title="Quote"><Quote size={16} /></Btn>
        <span className="w-px h-5 bg-slate-200 mx-1" />
        <Btn onClick={addLink} title="Insert link"><Link2 size={16} /></Btn>
        <Btn onClick={() => fileRef.current?.click()} title="Insert image">
          <ImageIcon size={16} />
        </Btn>
        {uploading && <span className="text-[11px] text-slate-400 ml-1">Uploading…</span>}
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickImage} />
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        className="blog-prose admin-editor min-h-[320px] max-h-[60vh] overflow-y-auto px-5 py-4 text-[15px] leading-relaxed focus:outline-none"
      />

      <style jsx global>{`
        .admin-editor:empty:before {
          content: 'Write your article here…';
          color: #94a3b8;
        }
        .admin-editor h2 { font-size: 1.5rem; font-weight: 800; margin: 0.8em 0 0.4em; color: #0B1A3A; }
        .admin-editor h3 { font-size: 1.25rem; font-weight: 700; margin: 0.7em 0 0.35em; color: #0B1A3A; }
        .admin-editor p { margin: 0.6em 0; }
        .admin-editor ul { list-style: disc; padding-left: 1.4rem; margin: 0.6em 0; }
        .admin-editor ol { list-style: decimal; padding-left: 1.4rem; margin: 0.6em 0; }
        .admin-editor blockquote { border-left: 3px solid #C0913E; padding-left: 1rem; color: #475569; font-style: italic; margin: 0.8em 0; }
        .admin-editor a { color: #2C78C5; text-decoration: underline; }
        .admin-editor img { max-width: 100%; border-radius: 0.6rem; margin: 0.8em 0; }
      `}</style>
    </div>
  )
}
