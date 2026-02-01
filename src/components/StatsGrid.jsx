import React from 'react'
import CountUp from './CountUp'
import './StatsGrid.css'

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-card__label">{label}</div>
      <div className="stat-card__value">{value}</div>
    </div>
  )
}

export default function StatsGrid({ stats }) {
  return (
    <div className="stats-grid">
      <StatCard label="Attempts today" value={stats.attempts} />
      <StatCard label="Success rate" value={`${stats.successRate}%`} />
      <StatCard label="Avg solve time" value={`${stats.avgTime}m`} />
      <div className="stat-card stat-card--streak">
        <div className="stat-card__label">🔥 Daily streak</div>
        <div className="stat-card__value"><CountUp from={0} to={stats.streak} separator="," duration={1.2} startCounting={true} /> <span className="stat-card__suffix">d</span></div>
      </div>
    </div>
  )
}
