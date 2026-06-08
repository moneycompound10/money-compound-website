import { useEffect } from 'react'

/**
 * Observes all elements with .reveal / .reveal-left / .reveal-right / .reveal-scale
 * and adds 'in-view' once they enter the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            // Keep observing so it re-animates if removed (optional: disconnect to animate only once)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    )
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
