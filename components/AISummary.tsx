'use client'

import { useState } from 'react'

interface Props {
  videoId: string
  title: string
  channel: string
  description: string
}

interface Summary {
  summary: string
  takeaways: string[]
  audience: string
}

export default function AISummary({ title, channel, description }: Props) {
  const [data, setData]       = useState<Summary | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen]       = useState(false)

  async function load() {
    if (data) { setOpen(o => !o); return }
    setLoading(true)
    try {
      const res = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, channel, description }),
      })
      const json = await res.json()
      setData(json)
      setOpen(true)
    } catch {
      setData({ summary: 'Failed to generate summary.', takeaways: [], audience: '' })
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-3">
      <button
        onClick={load}
        className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
      >
        <span className="text-base">✨</span>
        {loading ? 'Generating AI summary...' : open ? 'Hide AI Summary' : 'AI Summary'}
      </button>

      {open && data && (
        <div className="mt-3 bg-gray-900/80 border border-purple-800/40 rounded-xl p-4 space-y-3">
          <p className="text-sm text-gray-300 leading-relaxed">{data.summary}</p>

          {data.takeaways?.length > 0 && (
            <ul className="space-y-1">
              {data.takeaways.map((t, i) => (
                <li key={i} className="text-xs text-gray-400 flex gap-2">
                  <span className="text-purple-500 shrink-0">•</span>
                  {t}
                </li>
              ))}
            </ul>
          )}

          {data.audience && (
            <p className="text-xs text-gray-500 border-t border-gray-800 pt-2">
              <span className="text-gray-400">Best for: </span>{data.audience}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
