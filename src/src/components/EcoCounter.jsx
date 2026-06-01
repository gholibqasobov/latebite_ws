import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../lib/i18n.jsx'

// Counts up to `value` once it scrolls into view.
export default function EcoCounter({ value, duration = 1600 }) {
  const { numberLocale } = useI18n()
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setDisplay(Math.round(value * eased))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return <span ref={ref}>{display.toLocaleString(numberLocale())}</span>
}
