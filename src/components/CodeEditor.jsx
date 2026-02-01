import React, { useRef, useEffect, useState } from 'react'
import './CodeEditor.css'

// Wrapper around @monaco-editor/react providing a graceful fallback
export default function CodeEditor({ value, language = 'javascript', onChange, theme = 'vs-dark', options = {}, height = '520px' }) {
  const [LoadedEditor, setLoadedEditor] = useState(null)
  const [ready, setReady] = useState(false)
  const fallbackRef = useRef(null)

  useEffect(() => {
    let mounted = true
    // dynamic import so the app still runs if package isn't installed
    import('@monaco-editor/react')
      .then((mod) => {
        if (!mounted) return
        setLoadedEditor(() => mod.default)
      })
      .catch(() => {
        // package not installed — we'll show a simple textarea fallback
        setLoadedEditor(null)
      })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    // ensure fallback textarea shows initial value
    if (!LoadedEditor && fallbackRef.current) {
      fallbackRef.current.value = value ?? ''
    }
  }, [LoadedEditor, value])

  // onChange handler for fallback textarea
  function handleFallbackChange(e) {
    onChange && onChange(e.target.value)
  }

  if (LoadedEditor) {
    const Editor = LoadedEditor
    return (
      <div className="codeeditor-root" style={{ ['--editor-height']: height }}>
        <Editor
          height={height}
          defaultLanguage={language}
          value={value}
          theme={theme}
          options={{ minimap: { enabled: false }, fontSize: 15, automaticLayout: true, ...options }}
          onChange={(v) => onChange && onChange(v)}
          onMount={() => setReady(true)}
        />
      </div>
    )
  }

  return (
    <div className="codeeditor-root" style={{ ['--editor-height']: height }}>
      <textarea ref={fallbackRef} onChange={handleFallbackChange} className="codeeditor-fallback" defaultValue={value} style={{ height }} />
      <div className="codeeditor-fallback-note">Install <code>@monaco-editor/react</code> for a better editor experience.</div>
    </div>
  )
}
