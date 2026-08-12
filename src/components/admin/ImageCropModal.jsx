import React, { useCallback, useEffect, useRef, useState } from 'react'
import { X, Check, RotateCcw } from 'lucide-react'

// Dependency-free crop dialog. Shown after picking an image and before it is
// uploaded, so only the cropped version ever reaches storage.
//
// The crop box is tracked in *displayed* pixels and scaled up to the image's
// natural size on apply, so cropping never costs resolution.

const ASPECTS = [
  { label: 'Free', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '3:2', value: 3 / 2 },
  { label: '16:9', value: 16 / 9 },
]

const MIN_SIZE = 32

export default function ImageCropModal({ file, onCancel, onConfirm }) {
  const [src, setSrc] = useState('')
  const [box, setBox] = useState(null)
  const [aspect, setAspect] = useState(null)
  const [busy, setBusy] = useState(false)
  const imgRef = useRef(null)
  const dragRef = useRef(null)

  useEffect(() => {
    const url = URL.createObjectURL(file)
    setSrc(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const clamp = useCallback((b) => {
    const img = imgRef.current
    if (!img) return b
    const W = img.clientWidth
    const H = img.clientHeight
    const w = Math.max(MIN_SIZE, Math.min(b.w, W))
    const h = Math.max(MIN_SIZE, Math.min(b.h, H))
    return {
      w,
      h,
      x: Math.max(0, Math.min(b.x, W - w)),
      y: Math.max(0, Math.min(b.y, H - h)),
    }
  }, [])

  // A centred box covering most of the frame, honouring the chosen ratio.
  const resetBox = useCallback((ratio) => {
    const img = imgRef.current
    if (!img || !img.clientWidth) return
    const W = img.clientWidth
    const H = img.clientHeight
    let w = W * 0.9
    let h = H * 0.9
    if (ratio) {
      if (w / h > ratio) w = h * ratio
      else h = w / ratio
    }
    setBox({ x: (W - w) / 2, y: (H - h) / 2, w, h })
  }, [])

  const pickAspect = (ratio) => {
    setAspect(ratio)
    resetBox(ratio)
  }

  const startDrag = (e, mode) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.setPointerCapture?.(e.pointerId)
    dragRef.current = { mode, sx: e.clientX, sy: e.clientY, start: box }
  }

  const onMove = (e) => {
    const d = dragRef.current
    if (!d || !d.start) return
    const dx = e.clientX - d.sx
    const dy = e.clientY - d.sy
    const b = d.start

    if (d.mode === 'move') {
      setBox(clamp({ ...b, x: b.x + dx, y: b.y + dy }))
      return
    }

    let { x, y, w, h } = b
    if (d.mode.includes('e')) w = b.w + dx
    if (d.mode.includes('s')) h = b.h + dy
    if (d.mode.includes('w')) { w = b.w - dx; x = b.x + dx }
    if (d.mode.includes('n')) { h = b.h - dy; y = b.y + dy }

    if (aspect) {
      h = w / aspect
      // Keep the anchored edge still when dragging from the top.
      if (d.mode.includes('n')) y = b.y + b.h - h
    }

    setBox(clamp({ x, y, w, h }))
  }

  const endDrag = (e) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    dragRef.current = null
  }

  const apply = async () => {
    const img = imgRef.current
    if (!img || !box) return
    setBusy(true)
    try {
      const scaleX = img.naturalWidth / img.clientWidth
      const scaleY = img.naturalHeight / img.clientHeight
      const w = Math.max(1, Math.round(box.w * scaleX))
      const h = Math.max(1, Math.round(box.h * scaleY))

      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, box.x * scaleX, box.y * scaleY, w, h, 0, 0, w, h)

      // PNG keeps transparency; everything else is cheaper as JPEG.
      const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
      const blob = await new Promise((r) => canvas.toBlob(r, type, 0.92))
      if (!blob) throw new Error('the browser could not render the crop')

      const base = file.name.replace(/\.[^.]+$/, '') || 'image'
      const ext = type === 'image/png' ? '.png' : '.jpg'
      // uploadImage() reads .name and .type, so hand back a File and not a Blob.
      onConfirm(new File([blob], `${base}-cropped${ext}`, { type }))
    } catch (err) {
      alert('Could not crop the image: ' + (err.message || err))
      setBusy(false)
    }
  }

  const handle = (mode, style) => (
    <span
      onPointerDown={(e) => startDrag(e, mode)}
      onPointerMove={onMove}
      onPointerUp={endDrag}
      className="absolute w-3.5 h-3.5 bg-white border-2 border-brand-blue rounded-sm"
      style={style}
    />
  )

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <h3 className="text-[15px] font-bold text-brand-navy">Crop image</h3>
          <button
            type="button"
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <X size={17} />
          </button>
        </div>

        <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-slate-100 bg-slate-50 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">Ratio</span>
          {ASPECTS.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => pickAspect(a.value)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors ${
                aspect === a.value
                  ? 'bg-brand-navy text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {a.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => resetBox(aspect)}
            title="Reset the crop box"
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-200"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5 flex items-center justify-center bg-slate-100">
          <div className="relative inline-block overflow-hidden select-none leading-none">
            <img
              ref={imgRef}
              src={src}
              alt=""
              draggable={false}
              onLoad={() => resetBox(aspect)}
              className="block max-h-[52vh] max-w-full"
            />
            {box && (
              <div
                onPointerDown={(e) => startDrag(e, 'move')}
                onPointerMove={onMove}
                onPointerUp={endDrag}
                className="absolute border-2 border-white cursor-move"
                style={{
                  left: box.x,
                  top: box.y,
                  width: box.w,
                  height: box.h,
                  boxShadow: '0 0 0 9999px rgba(0,0,0,0.45)',
                }}
              >
                {handle('nw', { left: -8, top: -8, cursor: 'nwse-resize' })}
                {handle('ne', { right: -8, top: -8, cursor: 'nesw-resize' })}
                {handle('sw', { left: -8, bottom: -8, cursor: 'nesw-resize' })}
                {handle('se', { right: -8, bottom: -8, cursor: 'nwse-resize' })}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-slate-100">
          <span className="text-[12px] text-slate-500">
            {box ? `${Math.round(box.w)} × ${Math.round(box.h)} on screen` : 'Loading…'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onConfirm(file)}
              disabled={busy}
              className="px-4 py-2 rounded-lg text-[12px] font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
            >
              Use original
            </button>
            <button
              type="button"
              onClick={apply}
              disabled={busy || !box}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold bg-brand-navy text-white hover:bg-slate-900 disabled:opacity-50"
            >
              <Check size={15} /> {busy ? 'Cropping…' : 'Crop & insert'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
