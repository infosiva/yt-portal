'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const OUTPUT_TYPES = [
  { label: 'Video Ideas', icon: '💡' },
  { label: 'Script', icon: '📝' },
  { label: 'SEO Title', icon: '🔍' },
  { label: 'Thumbnail Concept', icon: '🖼️' },
]

export default function NicheToolBar() {
  const [niche, setNiche] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const router = useRouter()

  function toggleOutput(label: string) {
    setSelected(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    )
  }

  function handleGo() {
    if (!niche.trim()) return
    const types = selected.length > 0 ? selected.join(',') : 'Video Ideas'
    router.push(`/creator-tools?niche=${encodeURIComponent(niche.trim())}&types=${encodeURIComponent(types)}`)
  }

  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(255,0,0,0.07) 0%, rgba(0,0,0,0) 100%)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '20px 24px 16px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
          YouTube Growth on Autopilot
        </p>
        <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)' }}>
          Tell AI your channel niche — get video ideas, scripts, SEO titles &amp; thumbnail concepts in under a minute.
        </p>
      </div>

      {/* Input row */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={niche}
          onChange={e => setNiche(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleGo()}
          placeholder="What's your channel about? e.g. personal finance for millennials"
          style={{
            flex: '1 1 280px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: 10,
            padding: '9px 14px',
            fontSize: '0.85rem',
            color: '#fff',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => (e.target.style.borderColor = 'rgba(255,68,68,0.5)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.14)')}
        />

        {/* Output type chips */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {OUTPUT_TYPES.map(({ label, icon }) => {
            const active = selected.includes(label)
            return (
              <button
                key={label}
                onClick={() => toggleOutput(label)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '7px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.12s',
                  background: active ? 'rgba(255,68,68,0.2)' : 'rgba(255,255,255,0.07)',
                  border: active ? '1px solid rgba(255,68,68,0.5)' : '1px solid rgba(255,255,255,0.12)',
                  color: active ? '#ff8888' : 'rgba(255,255,255,0.65)',
                }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            )
          })}
        </div>

        <button
          onClick={handleGo}
          disabled={!niche.trim()}
          style={{
            padding: '9px 20px', borderRadius: 10, fontSize: '0.85rem', fontWeight: 700,
            cursor: niche.trim() ? 'pointer' : 'not-allowed',
            background: niche.trim() ? 'linear-gradient(135deg, #ff0000, #cc0000)' : 'rgba(255,255,255,0.08)',
            color: '#fff', border: 'none', transition: 'all 0.15s',
            transform: 'scale(1)',
            opacity: niche.trim() ? 1 : 0.5,
          }}
          onMouseDown={e => niche.trim() && ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)')}
          onMouseUp={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)')}
        >
          Generate →
        </button>
      </div>
    </div>
  )
}
