import React from 'react'
import './SampleIO.css'

export default function SampleIO({ input, output }) {
  return (
    <div className="sample-io">
      <div className="sample-io__section">
        <div className="sample-io__title">Sample Input</div>
        <pre className="sample-io__content">{input || 'nums = [2, 7, 11, 15]\ntarget = 9'}</pre>
      </div>
      <div className="sample-io__section">
        <div className="sample-io__title">Expected Output</div>
        <pre className="sample-io__content">{output || '[0, 1]'}</pre>
      </div>
    </div>
  )
}
