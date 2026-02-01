import React from 'react'
import CircularText from './CircularText'
import './Header.css'

// Header: minimal top bar with brand and subtitle
export default function Header() {
  return (
    <header className="tls-header">
      <div className="tls-header__inner">
        <div className="tls-brand">
          <div className="tls-brand__logo">
            <CircularText text="techlearn solutions" centerText="tls" onHover="speedUp" spinDuration={18} className="logo-circle" />
          </div>

          <div className="tls-brand__meta">
            <div className="tls-brand__title">TechLearn Solutions</div>
            <div className="tls-brand__sub">Question of the Day</div>
          </div>
        </div>
        <div className="tls-header__note">One problem. Every day.</div>
      </div>
    </header>
  )
}
