import React, { useEffect, useRef, useState } from 'react'
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered, Link2, Quote,
  Image as ImageIcon, Pilcrow, AlignLeft, AlignCenter, AlignRight, Trash2,
} from 'lucide-react'
import ImageCropModal from './ImageCropModal'

// Lightweight contentEditable WYSIWYG. Outputs HTML compatible with `.blog-prose`.
// Remount with a `key` when loading a different post to reset content.

// Absolute sizes, not em, so "Normal" always lands back on the published body
// size however deeply the selection happens to be nested. 17px matches
// `.blog-prose` in pages/blog/[slug].jsx.
const TEXT_SIZES = [
  { label: 'Small', value: '15px' },
  { label: 'Normal', value: '17px' },
  { label: 'Large', value: '21px' },
  { label: 'Extra large', value: '26px' },
]

const IMAGE_WIDTHS = ['25%', '50%', '75%', '100%']

export default function RichEditor({ initialHtml = '', onChange, uploadImage }) {
  const ref = useRef(null)
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [pendingFile, setPendingFile] = useState(null)
  const [selImg, setSelImg] = useState(null)

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

  // execCommand can only set the legacy 1–7 font sizes, so size 7 is used as a
  // marker and the <font> tags it leaves behind are swapped for real spans.
  const setTextSize = (size) => {
    const el = ref.current
    if (!el || !size) return
    el.focus()
    document.execCommand('fontSize', false, '7')
    el.querySelectorAll('font[size="7"]').forEach((f) => {
      const span = document.createElement('span')
      span.style.fontSize = size
      while (f.firstChild) span.appendChild(f.firstChild)
      f.replaceWith(span)
    })
    emit()
  }

  const onPickImage = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    // Crop first — only the cropped version is ever uploaded.
    if (file) setPendingFile(file)
  }

  const insertImage = async (file) => {
    setPendingFile(null)
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

  // Clicking an image in the canvas selects it and reveals its own controls.
  const onEditorClick = (e) => {
    setSelImg(e.target?.tagName === 'IMG' ? e.target : null)
  }

  const styleImage = (fn) => {
    if (!selImg) return
    fn(selImg)
    emit()
  }

  const setImgWidth = (w) => styleImage((img) => {
    img.style.width = w
    img.style.height = 'auto'
  })

  const setImgAlign = (align) => styleImage((img) => {
    img.style.display = 'block'
    img.style.marginLeft = align === 'left' ? '0' : 'auto'
    img.style.marginRight = align === 'right' ? '0' : 'auto'
  })

  const removeImage = () => {
    if (!selImg) return
    selImg.remove()
    setSelImg(null)
    emit()
  }

  const Btn = ({ onClick, title, children, active }) => (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
        active ? 'bg-slate-200 text-brand-navy' : 'text-slate-600 hover:bg-slate-100 hover:text-brand-navy'
      }`}
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

        <select
          title="Text size — select some text first"
          defaultValue=""
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => { setTextSize(e.target.value); e.target.value = '' }}
          className="h-9 px-2 rounded-lg text-[12px] font-semibold text-slate-600 bg-white border border-slate-200 hover:border-slate-300 focus:outline-none cursor-pointer"
        >
          <option value="" disabled>Text size</option>
          {TEXT_SIZES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <span className="w-px h-5 bg-slate-200 mx-1" />
        <Btn onClick={() => exec('insertUnorderedList')} title="Bullet list"><List size={16} /></Btn>
        <Btn onClick={() => exec('insertOrderedList')} title="Numbered list"><ListOrdered size={16} /></Btn>
        <Btn onClick={() => exec('formatBlock', 'BLOCKQUOTE')} title="Quote"><Quote size={16} /></Btn>
        <span className="w-px h-5 bg-slate-200 mx-1" />
        <Btn onClick={addLink} title="Insert link"><Link2 size={16} /></Btn>
        <Btn onClick={() => fileRef.current?.click()} title="Insert image (you can crop it first)">
          <ImageIcon size={16} />
        </Btn>
        {uploading && <span className="text-[11px] text-slate-400 ml-1">Uploading…</span>}
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickImage} />
      </div>

      {/* Image controls — only while an image in the canvas is selected. */}
      {selImg && (
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 border-b border-slate-100 bg-blue-50/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">Image</span>
          {IMAGE_WIDTHS.map((w) => (
            <button
              key={w}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setImgWidth(w)}
              className="px-2.5 h-8 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-white hover:text-brand-navy transition-colors"
            >
              {w}
            </button>
          ))}
          <span className="w-px h-5 bg-slate-200 mx-1" />
          <Btn onClick={() => setImgAlign('left')} title="Align left"><AlignLeft size={16} /></Btn>
          <Btn onClick={() => setImgAlign('center')} title="Centre"><AlignCenter size={16} /></Btn>
          <Btn onClick={() => setImgAlign('right')} title="Align right"><AlignRight size={16} /></Btn>
          <span className="w-px h-5 bg-slate-200 mx-1" />
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={removeImage}
            title="Remove image"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} />
          </button>
          <span className="ml-auto text-[11px] text-slate-400">Click anywhere else to deselect</span>
        </div>
      )}

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        onClick={onEditorClick}
        className="blog-prose admin-editor min-h-[320px] max-h-[60vh] overflow-y-auto px-5 py-4 text-[17px] leading-relaxed focus:outline-none"
      />

      {pendingFile && (
        <ImageCropModal
          file={pendingFile}
          onCancel={() => setPendingFile(null)}
          onConfirm={insertImage}
        />
      )}

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
        .admin-editor img { max-width: 100%; border-radius: 0.6rem; margin: 0.8em 0; cursor: pointer; }
        .admin-editor img:hover { outline: 2px solid #93c5fd; outline-offset: 2px; }
      `}</style>
    </div>
  )
}
