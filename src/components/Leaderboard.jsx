import React from 'react'
import './Leaderboard.css'

export default function Leaderboard({ data }) {
  return (
    <aside className="leaderboard">
      <div className="leaderboard__head">
        <h3>Leaderboard</h3>
        <div className="leaderboard__sub">Top 5 today</div>
      </div>
      <ul className="leaderboard__list">
        {data.map((u) => (
          <li key={u.rank} className={`leaderboard__item ${u.highlight ? 'is-you' : ''}`}>
            <div className="leaderboard__left">
              <div className="leaderboard__rank">#{u.rank}</div>
              <div className="leaderboard__name">{u.name}</div>
            </div>
            <div className="leaderboard__time">{u.time}</div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
