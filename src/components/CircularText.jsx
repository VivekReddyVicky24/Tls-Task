import React, { useState } from 'react'
import './CircularText.css'

// CircularText: renders text along a circular path and rotates it.
// Props:
// - text: string (the text to render along the circle)
// - spinDuration: number (seconds for a full rotation)
// - onHover: 'speedUp' | undefined (if 'speedUp', rotation speeds on hover)
// - className: additional classNames
export default function CircularText({ text = '', centerText = 'tls', spinDuration = 20, onHover, className = '' }) {
  const [hover, setHover] = useState(false)
  const speedUp = onHover === 'speedUp'
  const duration = hover && speedUp ? Math.max(0.8, spinDuration / 6) : spinDuration

  const style = {
    ['--spin-duration']: `${duration}s`
  }

  // Render the provided text once and center it on the path
  const displayText = text

  return (
    <div
      className={`circular-text ${className}`}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={text}
      aria-label={centerText}
      role="img"
    >
      <svg viewBox="0 0 200 200" className="circular-text__svg" aria-hidden="true">
        <defs>
          <path id="circle-path" d="M100,100 m -84,0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0" />
        </defs>

        {/* subtle halo circle for better contrast */}
        <circle cx="100" cy="100" r="88" className="circular-text__halo" />

        <g className="circular-text__g">
          <text className="circular-text__text" >
            <textPath href="#circle-path" startOffset="50%" textAnchor="middle">
              {displayText}
            </textPath>
          </text>
        </g>
      </svg>

      {/* Center monogram (static) */}
      <div className="circular-text__center">
        <div className="circular-text__center-dot"></div>
        <div className="circular-text__center-text">{centerText}</div>
      </div>
    </div>
  )
}
