import React from 'react'
import { track, EVENTS } from '../lib/analytics'

const WHATSAPP_NUMBER = '918447496480' // +91 84474 96480
const PREFILL = encodeURIComponent("Hi Money Compound, I'd like to learn more about your investment services.")

export default function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${PREFILL}`

  const handleClick = () => {
    track(EVENTS.WHATSAPP_CLICK, { source: 'floating_button' })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Money Compound on WhatsApp"
      onClick={handleClick}
      className="fixed bottom-24 right-6 z-[100] group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform duration-300">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#FFFFFF" aria-hidden="true">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.36-1.67a11.84 11.84 0 0 0 5.69 1.45h.01c6.54 0 11.86-5.32 11.86-11.86a11.8 11.8 0 0 0-3.4-8.44ZM12.06 21.6h-.01a9.7 9.7 0 0 1-4.96-1.36l-.36-.21-3.78 1 1.01-3.68-.23-.38a9.74 9.74 0 1 1 8.33 4.63Zm5.34-7.28c-.29-.15-1.72-.85-1.98-.95-.26-.1-.46-.15-.65.15-.19.29-.74.95-.91 1.14-.17.19-.34.21-.62.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.58-.9-2.16-.24-.57-.48-.49-.65-.5-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.77.36-.26.29-1 1-1 2.44 0 1.43 1.02 2.82 1.16 3.01.15.19 2 3.06 4.85 4.29.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z"/>
        </svg>
      </span>
    </a>
  )
}
