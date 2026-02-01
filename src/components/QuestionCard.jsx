import React from 'react'
import './QuestionCard.css'

function DifficultyBadge({ level }) {
  return <span className={`difficulty difficulty--${level.toLowerCase()}`}>{level}</span>
}

export default function QuestionCard({ q, onToggleHint }) {
  return (
    <section className="q-card">
      <div className="q-card__header">
        <div>
          <h2 className="q-card__title">{q.title}</h2>
          <div className="q-card__statement">{q.statement}</div>
        </div>

        <div className="q-card__meta">
          <DifficultyBadge level={q.difficulty} />
          <div className="q-card__tag">#DSA • Daily</div>
        </div>
      </div>
    </section>
  )
}
