'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function YTNavbar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header
      style={{ background: '#0f0f0f', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 gap-4"
    >
      {/* Left — Logo */}
      <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
        <svg width="28" height="20" viewBox="0 0 90 64" fill="none" aria-hidden>
          <rect width="90" height="64" rx="14" fill="#FF0000"/>
          <path d="M36 18l28 14-28 14V18z" fill="white"/>
        </svg>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em', fontFamily: 'system-ui,sans-serif' }}>
          YT<span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>Portal</span>
        </span>
      </Link>

      {/* Center — Search */}
      <form
        onSubmit={handleSearch}
        className="flex-1 max-w-xl flex items-center gap-0"
        style={{ minWidth: 0 }}
      >
        <div
          className="flex-1 flex items-center"
          style={{
            background: focused ? '#121212' : '#121212',
            border: `1px solid ${focused ? '#1c62b9' : 'rgba(255,255,255,0.15)'}`,
            borderRight: 'none',
            borderRadius: '40px 0 0 40px',
            height: '40px',
            paddingLeft: '16px',
            paddingRight: '8px',
            boxShadow: focused ? 'inset 0 1px 3px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search"
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '1rem',
              width: '100%',
            }}
            aria-label="Search videos"
          />
        </div>
        <button
          type="submit"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderLeft: 'none',
            borderRadius: '0 40px 40px 0',
            height: '40px',
            width: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          aria-label="Search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
        {/* Mic */}
        <button
          type="button"
          style={{
            marginLeft: '8px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          aria-label="Search with voice"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        </button>
      </form>

      {/* Right — actions */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Upload */}
        <button
          style={{ width: 40, height: 40, borderRadius: '50%', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          aria-label="Upload"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline stroke="white" fill="none" strokeWidth="1.5" points="14 2 14 8 20 8"/>
            <line stroke="white" strokeWidth="1.5" x1="12" y1="18" x2="12" y2="12"/>
            <line stroke="white" strokeWidth="1.5" x1="9" y1="15" x2="15" y2="15"/>
          </svg>
        </button>
        {/* Notifications */}
        <button
          style={{ width: 40, height: 40, borderRadius: '50%', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}
          aria-label="Notifications"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#ff0000', border: '1.5px solid #0f0f0f' }} />
        </button>
        {/* Avatar */}
        <div
          style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#ff0000,#ff4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 4, cursor: 'pointer' }}
          aria-label="Account"
        >
          <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>YP</span>
        </div>
      </div>
    </header>
  )
}
