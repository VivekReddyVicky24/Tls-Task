import React, { useEffect, useRef } from 'react'
import './ScrollVelocity.css'

// ScrollVelocity
// Props:
// - texts: array of strings to display in the marquee
// - velocity: number controlling sensitivity; higher = faster base motion
// - className: extra classes
export default function ScrollVelocity({ texts = ['Question of the Day'], velocity = 100, className = '' }) {
  const rootRef = useRef(null)
  const lastY = useRef(window.scrollY)
  const lastT = useRef(performance.now())
  const frame = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const baseDuration = Math.max(6, 30 * (100 / (velocity || 100))) // seconds
    el.style.setProperty('--duration', `${baseDuration}s`)

    function onScroll() {
      if (frame.current) return
      frame.current = requestAnimationFrame(() => {
        const now = performance.now()
        const y = window.scrollY
        const dy = Math.abs(y - lastY.current)
        const dt = Math.max(16, now - lastT.current)
        const speed = (dy / dt) * 1000 // px per second

        // normalize and compute new duration (faster scroll -> shorter duration)
        const speedNorm = Math.min(speed, 2500)
        const factor = 1 + speedNorm / 300 // adjust intensity
        const newDuration = Math.max(3, baseDuration / factor)
        el.style.setProperty('--duration', `${newDuration}s`)

        // gentle decay back to base duration
        clearTimeout(el._decayTimeout)
        el._decayTimeout = setTimeout(() => {
          el.style.setProperty('--duration', `${baseDuration}s`)
        }, 220)

        lastY.current = y
        lastT.current = now
        frame.current = null
      })
    }

    // Scroll event disabled - keep static animation
    // window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame.current) cancelAnimationFrame(frame.current)
      clearTimeout(el._decayTimeout)
    }
  }, [velocity])

  // Create a continuous line from texts
  const content = texts.join(' • ')

  return (
    <div ref={rootRef} className={`scroll-velocity ${className ?? ''}`} role="img" aria-label={content}>
      <h1 className="sr-only">{content}</h1>

      <div className="scroll-velocity__wrap">
        <div className="scroll-velocity__track" aria-hidden="true">
          <span className="scroll-velocity__item">{content}</span>
          <span className="scroll-velocity__item">{content}</span>
        </div>
        <div className="scroll-velocity__track reverse" aria-hidden="true">
          <span className="scroll-velocity__item">{content}</span>
          <span className="scroll-velocity__item">{content}</span>
        </div>
      </div>
    </div>
  )
}
