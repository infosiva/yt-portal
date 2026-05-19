'use client'
import { useState } from 'react'

const VIDEOS = [
  { title: 'How to use ChatGPT like a pro in 2025', channel: 'AI Insider', views: '2.4M views', ago: '3 days ago', query: 'ChatGPT pro tips 2025', dur: '12:34', hue: 220 },
  { title: 'Top 10 AI tools you need RIGHT NOW', channel: 'Tech Daily', views: '890K views', ago: '1 week ago', query: 'best AI tools 2025', dur: '9:21', hue: 260 },
  { title: 'Build an AI agent from scratch', channel: 'Code with AI', views: '1.1M views', ago: '5 days ago', query: 'build AI agent tutorial', dur: '24:05', hue: 180 },
  { title: 'Gemini vs ChatGPT — which is better?', channel: 'AI Compare', views: '3.2M views', ago: '2 weeks ago', query: 'Gemini vs ChatGPT comparison', dur: '15:48', hue: 200 },
  { title: 'Claude 4 just changed everything', channel: 'Anthropic News', views: '540K views', ago: '4 days ago', query: 'Claude AI review', dur: '8:12', hue: 280 },
  { title: 'How I make $10k/month with AI', channel: 'AI Income', views: '780K views', ago: '6 days ago', query: 'make money with AI 2025', dur: '18:33', hue: 40 },
  { title: 'Best free AI image generators 2025', channel: 'Creator AI', views: '1.5M views', ago: '1 week ago', query: 'free AI image generators', dur: '11:07', hue: 320 },
  { title: 'Python AI project in 30 minutes', channel: 'Dev Quick', views: '420K views', ago: '3 days ago', query: 'Python AI project tutorial', dur: '29:55', hue: 140 },
  { title: 'Midjourney v7 full tutorial', channel: 'Design AI', views: '2.1M views', ago: '5 days ago', query: 'Midjourney v7 tutorial', dur: '22:18', hue: 30 },
  { title: 'AI that writes code better than developers', channel: 'Future Tech', views: '4.3M views', ago: '1 week ago', query: 'AI code generation 2025', dur: '16:44', hue: 160 },
  { title: 'How Sora AI video generation works', channel: 'OpenAI', views: '6.7M views', ago: '2 months ago', query: 'Sora AI video tutorial', dur: '7:33', hue: 0 },
  { title: 'The AI tools replacing 9-to-5 jobs', channel: 'AI Future', views: '3.8M views', ago: '2 weeks ago', query: 'AI replacing jobs 2025', dur: '20:01', hue: 240 },
]

function Avatar({ name, hue }: { name: string; hue: number }) {
  return (
    <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, marginTop: 2,
      background: `hsl(${hue}, 60%, 42%)`, display: 'flex', alignItems: 'center',
      justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

function Card({ v }: { v: typeof VIDEOS[0] }) {
  const [hovered, setHovered] = useState(false)
  const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(v.query)}`

  return (
    <a href={ytUrl} target="_blank" rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9',
        borderRadius: hovered ? 0 : 12, overflow: 'hidden',
        background: `hsl(${v.hue}, 25%, 18%)`, transition: 'border-radius 0.2s',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Gradient bg mimicking thumbnail */}
        <div style={{ position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 30% 40%, hsl(${v.hue}, 60%, 30%) 0%, hsl(${v.hue}, 20%, 12%) 70%)` }} />
        {/* Channel initial as big letter */}
        <span style={{ position: 'relative', fontSize: 52, fontWeight: 900, letterSpacing: '-0.05em',
          color: `hsla(${v.hue}, 80%, 75%, 0.25)`, fontFamily: 'system-ui, sans-serif',
          userSelect: 'none' }}>
          {v.channel.slice(0, 1)}
        </span>
        {/* Duration badge */}
        <span style={{ position: 'absolute', bottom: 6, right: 8,
          background: 'rgba(0,0,0,0.87)', color: '#fff', fontSize: '0.75rem',
          fontWeight: 600, padding: '1px 5px', borderRadius: 4,
          letterSpacing: '0.02em', fontFamily: 'monospace' }}>
          {v.dur}
        </span>
        {/* Hover play overlay */}
        {hovered && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Info row — matches VideoCard layout */}
      <div style={{ display: 'flex', gap: 12, paddingTop: 12, paddingBottom: 8 }}>
        <Avatar name={v.channel} hue={v.hue} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 500, lineHeight: 1.4, color: '#f1f1f1',
            display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}>
            {v.title}
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.8125rem', color: '#aaa',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {v.channel}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: '0.8125rem', color: '#aaa' }}>
            {v.views} · {v.ago}
          </p>
        </div>
      </div>
    </a>
  )
}

export default function PlaceholderGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px 16px' }}>
      {VIDEOS.map((v, i) => <Card key={i} v={v} />)}
    </div>
  )
}
