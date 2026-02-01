import React, { useEffect } from 'react'
import './Lanyard.css'
import cardUrl from '../assets/lanyard/card.glb'
import lanyardTexture from '../assets/lanyard/lanyard.png'

export default function Lanyard({ open = false, onClose, position = [0, 0, 20], gravity = [0, -40, 0], autoClose = 12000 }) {
  useEffect(() => {
    if (!open) return
    // auto-close after autoClose ms (default ~12s)
    const t = setTimeout(() => onClose && onClose(), autoClose)
    return () => clearTimeout(t)
  }, [open, onClose, autoClose])

  if (!open) return null

  return (
    <div className="lanyard-overlay" onClick={() => onClose && onClose()}>
      <div className="lanyard-card">
        <model-viewer
          src={cardUrl}
          poster={lanyardTexture}
          alt="Reward: TechLearn Lanyard"
          auto-rotate
          camera-controls
          exposure="1"
          ar
          style={{ width: '320px', height: '320px' }}
        />
        <div className="lanyard__text">Nice work! Here’s your reward 🎉</div>
      </div>
    </div>
  )
}
