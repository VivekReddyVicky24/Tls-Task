import React, { useState } from 'react'
import './SubscribeBanner.css'

export default function SubscribeBanner() {
  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubbed(true)
  }

  return (
    <section className="subscribe-banner">
      <div className="subscribe-banner__inner">
        <div className="subscribe-banner__copy">
          <h5>Never miss a question</h5>
          <div className="subscribe-banner__sub">Get the Question of the Day in your inbox.</div>
        </div>
        <form onSubmit={handleSubmit} className="subscribe-banner__form">
          <input type="email" required placeholder="you@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} className="subscribe-input" />
          <button className="btn-primary" disabled={loading}>{loading ? 'Sending...' : subbed ? 'Thanks!' : 'Notify Me Daily'}</button>
        </form>
      </div>
    </section>
  )
}
