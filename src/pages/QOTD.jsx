import React, { useState } from 'react'
import './QOTD.css'
import Header from '../components/Header'
import ScrollVelocity from '../components/ScrollVelocity'
import QuestionCard from '../components/QuestionCard'
import EditorPanel from '../components/EditorPanel'
import SampleIO from '../components/SampleIO'
import StatsGrid from '../components/StatsGrid'
import Leaderboard from '../components/Leaderboard'
import HintPanel from '../components/HintPanel'
import SubscribeBanner from '../components/SubscribeBanner'
import Lanyard from '../components/Lanyard'
import { qotd } from '../data/qotd'
import { leaderboard } from '../data/leaderboard'

export default function QOTD() {
  const [hintOpen, setHintOpen] = useState(false)
  const [stats] = useState({ attempts: 12, successRate: 78, avgTime: 6, streak: 89 })
  const [rewardOpen, setRewardOpen] = useState(false)

  return (
    <div className="qotd-root">
      <Header />
      <main className="qotd-main">
        <ScrollVelocity texts={["React Bits", "Question of the Day"]} velocity={120} className="qotd-heading" />

        <div className="qotd-grid">
          <div className="qotd-left">
            <QuestionCard q={qotd} onToggleHint={() => setHintOpen((s) => !s)} />

            <SampleIO input={qotd.sampleInput} output={qotd.sampleOutput} />

            <div className="qotd-hint">
              <HintPanel hints={["Think about using a map to store complements."]} />
            </div>

            <Leaderboard data={leaderboard} />

            {/* <SubscribeBanner /> */}
          </div>

          <aside className="qotd-right">
            <EditorPanel starterCode={qotd.starterCode} sampleOutput={qotd.sampleOutput} onSubmit={(success) => success && setRewardOpen(true)} />
          </aside>
        </div>
      </main>

      <footer className="qotd-footer">Built with care • TechLearn Solutions</footer>

      <Lanyard open={rewardOpen} onClose={() => setRewardOpen(false)} />

      {/* Sticky submit CTA for mobile */}
      <div className="qotd-sticky">
        <div className="qotd-sticky__inner">
          <button className="btn-ghost">Run</button>
          <button className="btn-primary">Submit</button>
        </div>
      </div>
    </div>
  )
}
