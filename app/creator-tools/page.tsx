'use client'
import { useState } from 'react'

const PROMPTS = [
  {
    id: 1,
    tag: 'Strategy',
    tagColor: '#7c3aed',
    title: 'Semantic Niche Matrix — Vacuum Finder',
    desc: 'Find untapped sub-topics with high search-to-supply ratio and build your content moat.',
    placeholders: ['Niche'],
    template: `Act as a Top 1% YouTube Growth Lead. My channel niche is [Niche]. Analyze the modern 2026 YouTube landscape. Identify a 'Semantic Content Vacuum'—a sub-topic that has a high search-to-supply ratio where viewers are deeply unsatisfied with current video answers. Define my channel's unique 'Moat' and give me 5 core content pillars designed to establish programmatic authority in under 30 days.`,
  },
  {
    id: 2,
    tag: 'Packaging',
    tagColor: '#0891b2',
    title: 'Curiosity-Gap Thumbnail & Title Architect',
    desc: 'Generate 5 title + thumbnail pairings using Status Shift and Unresolved Loop psychology.',
    placeholders: ['Topic'],
    template: `I have a video concept about [Topic]. Act as a Viral Video Packaging Expert. Generate 5 pairings of high-concept Titles and Thumbnail Visual Frameworks. Use the 'Status Shift' and 'Unresolved Loop' psychological models. Avoid generic 'How-To' phrases. Tell me exactly what visual asset or text should be the focal point of the thumbnail canvas to force the click.`,
  },
  {
    id: 3,
    tag: 'Script',
    tagColor: '#059669',
    title: 'Retention-First AVD Script Engine',
    desc: '10-minute script outline with 15-sec hyper-hook, escalating stakes, and open loops.',
    placeholders: ['Topic'],
    template: `Act as an Elite YouTube Scriptwriter. Map out a 10-minute video script outline for [Topic] using the 'Retention-First' framework. Break it down into: 1) The 15-second Hyper-Hook (zero fluff/intros), 2) The 'Escalating Stakes' body, and 3) An 'Open Loop' at minute 4 to prevent drop-off. Suggest a visual pattern-interrupt (B-roll, kinetic typography, or graphic) every 4 seconds to maintain maximum cognitive load.`,
  },
  {
    id: 4,
    tag: 'Retention',
    tagColor: '#dc2626',
    title: 'Binge-Loop Session-Time Expander',
    desc: 'Connect two videos into an unbreakable binge loop with a 20-sec end-screen script.',
    placeholders: ['Topic A', 'Topic B'],
    template: `Review these two video concepts: Video A [Topic A] and Video B [Topic B]. Act as a Content Systems Engineer. Show me how to connect these two videos into an unbreakable 'Binge-Loop.' Write the exact 20-second 'End-Screen Script' for Video A that frames watching Video B not as an option, but as the mandatory next step to solve their problem.`,
  },
  {
    id: 5,
    tag: 'Monetisation',
    tagColor: '#d97706',
    title: 'AdSense Bypass Monetisation Funnel',
    desc: 'Backend conversion funnel from cold viewer → lead magnet → paid offer for sub-1k channels.',
    placeholders: ['Niche', 'Price'],
    template: `Act as an Info-Business Monetization Architect. Design a backend conversion funnel for a channel with under 1,000 subscribers in the [Niche] space. Map the exact journey from a cold viewer watching a video -> clicking the description link -> consuming a high-value lead magnet -> converting into a $[Price] digital offer. Write the exact 30-second native mid-video Call-To-Action (CTA).`,
  },
  {
    id: 6,
    tag: 'SEO',
    tagColor: '#0284c7',
    title: 'NLP Semantic SEO Optimizer',
    desc: '10 semantic concept keywords + vector-search-optimised description + 5 timestamp chapters.',
    placeholders: ['Topic'],
    template: `Act as a YouTube SEO Specialist. For my video on [Topic], generate a list of 10 'Semantic Concept Keywords' to integrate naturally into my spoken script and description metadata. Draft a 3-sentence, high-relevance video description optimized for the algorithm's vector search, and create 5 timestamp chapters optimized for user search intent.`,
  },
  {
    id: 7,
    tag: 'Diagnostics',
    tagColor: '#be185d',
    title: 'AVD Retention Graph Diagnostic Surgeon',
    desc: 'Isolate whether failure was thumbnail fatigue, weak hook, or mid-section pacing drops.',
    placeholders: ['CTR %', 'AVD %'],
    template: `Act as a YouTube Channel Auditor. My latest video has a [CTR %]% CTR and an [AVD %]% Average View Duration, but flatlined after 72 hours. Analyze these metrics. Give me a strict 3-step diagnostic checklist to execute on my next video upload to isolate if the failure was caused by thumbnail fatigue, a weak hook, or pacing drops in the mid-section.`,
  },
  {
    id: 8,
    tag: 'Growth',
    tagColor: '#7c3aed',
    title: 'Viral Topic Prediction Engine',
    desc: '30 video ideas ranked by viral potential — rising trends before saturation hits.',
    placeholders: ['Niche'],
    template: `Act like a YouTube growth strategist with access to current platform trends. Analyze my niche: [Niche]. Identify: rising topics before saturation, high-retention video angles, emotionally clickable ideas, searchable long-tail opportunities, underserved audience questions, trends likely to explode in the next 90 days. Then generate 30 video ideas ranked by viral potential.`,
  },
]

function PromptCard({ prompt }: { prompt: typeof PROMPTS[0] }) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  function buildFinal() {
    let text = prompt.template
    for (const ph of prompt.placeholders) {
      const val = values[ph]?.trim()
      text = text.replaceAll(`[${ph}]`, val ? val : `[${ph}]`)
    }
    return text
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(buildFinal())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const allFilled = prompt.placeholders.every(ph => values[ph]?.trim())

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14,
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      transition: 'border-color 0.15s, background 0.15s',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.18)'
        ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'
        ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{
          padding: '3px 10px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.04em', textTransform: 'uppercase',
          background: `${prompt.tagColor}22`, color: prompt.tagColor, flexShrink: 0,
        }}>{prompt.tag}</span>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', lineHeight: 1.35 }}>
            {prompt.title}
          </p>
          <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>
            {prompt.desc}
          </p>
        </div>
      </div>

      {/* Placeholders */}
      {prompt.placeholders.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {prompt.placeholders.map(ph => (
            <div key={ph} style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 120 }}>
              <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                {ph}
              </label>
              <input
                value={values[ph] ?? ''}
                onChange={e => setValues(v => ({ ...v, [ph]: e.target.value }))}
                placeholder={`Enter ${ph.toLowerCase()}…`}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8, padding: '7px 10px', fontSize: '0.8rem', color: '#fff', outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(255,0,0,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
            </div>
          ))}
        </div>
      )}

      {/* Preview + Copy */}
      <div style={{ position: 'relative' }}>
        <div style={{
          background: 'rgba(0,0,0,0.4)', borderRadius: 8, padding: '10px 12px',
          fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6,
          maxHeight: 80, overflow: 'hidden',
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        }}>
          {buildFinal()}
        </div>
      </div>

      <button
        onClick={handleCopy}
        style={{
          background: copied
            ? 'rgba(5,150,105,0.2)'
            : allFilled
              ? 'linear-gradient(135deg,#ff0000,#cc0000)'
              : 'rgba(255,255,255,0.08)',
          border: copied ? '1px solid rgba(5,150,105,0.4)' : '1px solid transparent',
          borderRadius: 8, padding: '8px 16px', fontSize: '0.8rem', fontWeight: 600,
          color: copied ? '#34d399' : '#fff', cursor: 'pointer', alignSelf: 'flex-start',
          transition: 'all 0.15s',
          transform: 'scale(1)',
        }}
        onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
        onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {copied ? '✓ Copied!' : allFilled ? '📋 Copy Prompt' : '📋 Copy Template'}
      </button>
    </div>
  )
}

export default function CreatorToolsPage() {
  const [filter, setFilter] = useState<string | null>(null)
  const tags = Array.from(new Set(PROMPTS.map(p => p.tag)))
  const filtered = filter ? PROMPTS.filter(p => p.tag === filter) : PROMPTS

  return (
    <div style={{ padding: '24px 24px 48px', maxWidth: 1200 }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>🎯</span>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>
            Creator Tools
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', maxWidth: 560 }}>
          8 battle-tested AI prompts for YouTube growth. Fill in your niche or topic, copy, and paste straight into ChatGPT or Claude.
        </p>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        <button
          onClick={() => setFilter(null)}
          style={{
            padding: '5px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
            border: '1px solid transparent', transition: 'all 0.12s',
            background: !filter ? '#fff' : 'rgba(255,255,255,0.08)',
            color: !filter ? '#0f0f0f' : 'rgba(255,255,255,0.75)',
          }}
        >All</button>
        {tags.map(tag => {
          const prompt = PROMPTS.find(p => p.tag === tag)!
          const active = filter === tag
          return (
            <button key={tag}
              onClick={() => setFilter(active ? null : tag)}
              style={{
                padding: '5px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.12s',
                background: active ? `${prompt.tagColor}33` : 'rgba(255,255,255,0.06)',
                border: active ? `1px solid ${prompt.tagColor}66` : '1px solid rgba(255,255,255,0.1)',
                color: active ? prompt.tagColor : 'rgba(255,255,255,0.6)',
              }}
            >{tag}</button>
          )
        })}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 16,
      }}>
        {filtered.map(p => <PromptCard key={p.id} prompt={p} />)}
      </div>

      {/* How to use */}
      <div style={{
        marginTop: 40, padding: '20px 24px',
        background: 'rgba(255,0,0,0.06)', border: '1px solid rgba(255,0,0,0.2)',
        borderRadius: 14,
      }}>
        <p style={{ margin: '0 0 8px', fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
          ⚡ How to use these prompts
        </p>
        <ol style={{ margin: 0, paddingLeft: 20, fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
          <li>Fill in the placeholder fields (Niche, Topic, etc.)</li>
          <li>Click <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Copy Prompt</strong> — the filled version copies to clipboard</li>
          <li>Paste into ChatGPT, Claude, or the <strong style={{ color: 'rgba(255,255,255,0.8)' }}>YT Portal AI</strong> chat below ↘</li>
          <li>Use the output to improve your next upload's performance</li>
        </ol>
      </div>
    </div>
  )
}
