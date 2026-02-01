import React, { useState, useEffect } from 'react'
import './EditorPanel.css'
import CodeEditor from './CodeEditor'

export default function EditorPanel({ starterCode, sampleOutput, onRun, onSubmit }) {
  const templates = {
    javascript: `// JavaScript — Solution\n\nfunction twoSum(nums, target) {\n  // Write your solution here\n  return []\n}\n\n// Example\nconsole.log(twoSum([2,7,11,15], 9))`,
    python: `# Python — Solution\n\ndef two_sum(nums, target):\n    # Write your solution here\n    return []\n\nif __name__ == '__main__':\n    print(two_sum([2,7,11,15], 9))`,
    cpp: `// C++ — Solution\n#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n    return {};\n}\n\nint main(){\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    return 0;\n}`
  }

  const [code, setCode] = useState(() => starterCode || templates.javascript)
  const [lang, setLang] = useState('javascript')
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const theme = 'vs-dark'

  function handleLangChange(e) {
    const newLang = e.target.value
    const prevLang = lang
    setLang(newLang)
    const prevTemplate = templates[prevLang]
    const newTemplate = templates[newLang] || ''
    const pristine = !code || code === prevTemplate || code === starterCode
    if (pristine) setCode(newTemplate)
  }

  function handleRun() {
    setLoading(true)
    setTimeout(() => {
      setOutput({ type: 'success', message: 'Ran successfully', sample: sampleOutput })
      setLoading(false)
      onRun && onRun()
    }, 700)
  }

  async function handleSubmit() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    const success = Math.random() > 0.2
    setOutput(success ? { type: 'success', message: 'All tests passed ✅', sample: sampleOutput } : { type: 'error', message: 'Some tests failed. Try again.' })
    setLoading(false)
    onSubmit && onSubmit(success)
  }

  return (
    <div className="editor-grid">
      <div className="editor-panel">
        <div className="editor-panel__top">
          <select value={lang} onChange={handleLangChange} className="select-lang">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          <div className="editor-panel__actions">
            <button onClick={handleRun} disabled={loading} className="btn-ghost">{loading ? 'Running...' : 'Run'}</button>
            <button onClick={handleSubmit} disabled={loading} className="btn-primary small">{loading ? 'Submitting...' : 'Submit'}</button>
          </div>
        </div>

        <CodeEditor value={code} onChange={(v) => setCode(v)} language={lang === 'cpp' ? 'cpp' : lang} theme={'vs-dark'} height={'680px'} options={{ fontSize: 15, smoothScrolling: true, lineNumbers: 'on', glyphMargin: false, lineNumbersMinChars: 2 }} />
      </div>

      <div className="output-panel">
        <div className="output-panel__title">Output</div>
        <div className={`output-panel__box ${output?.type === 'success' ? 'is-success' : output?.type === 'error' ? 'is-error' : ''}`}>
          <div className="output-panel__msg">{output?.message ?? 'No output yet'}</div>
          {output?.sample && <pre className="output-sample">{output.sample}</pre>}
        </div>
      </div>
    </div>
  )
}
