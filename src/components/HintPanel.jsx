import React, { useState } from 'react'
import './HintPanel.css'

export default function HintPanel({ hints = [] }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="hint-card">
      <div className="hint-card__head">
        <h4>Hints</h4>
        <button onClick={() => setOpen((s) => !s)} className="hint-card__toggle">{open ? 'Hide' : 'Show'}</button>
      </div>
      {open && (
        <div className="hint-card__body">
          <div className="hint-card__hint">{hints[0]}</div>
          <div className="hint-card__locked">Locked hint — solve to unlock</div>
        </div>
      )}
    </div>
  )
}
