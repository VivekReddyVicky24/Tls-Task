import React, { useEffect, useRef, useState } from 'react'
import './CountUp.css'

export default function CountUp({ from = 0, to = 100, separator = ',', direction = 'up', duration = 1, className = '', startCounting = true }) {
  const [value, setValue] = useState(from)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    if (!startCounting) return
    const start = performance.now()
    startRef.current = start
    const diff = to - from

    // easeOutCubic for smooth finish
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3)
    }

    function step(now) {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = easeOutCubic(t)
      let current = 0
      if (direction === 'up') {
        current = Math.round(from + diff * eased)
      } else {
        current = Math.round(to - diff * eased)
      }
      // avoid unnecessary state updates
      setValue((prev) => (prev === current ? prev : current))

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        // ensure final value is exact
        setValue(to)
      }
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [from, to, duration, direction, startCounting])

  function format(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  }

  return <span className={`count-up-text ${className}`}>{format(value)}</span>
}
