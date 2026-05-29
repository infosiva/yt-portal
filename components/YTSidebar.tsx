import Link from 'next/link'

const NAV = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
    ),
    label: 'Home',
    href: '/',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
    ),
    label: 'Shorts',
    href: '/search?q=shorts',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    label: 'Subscriptions',
    href: '/search?q=subscriptions',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
    ),
    label: 'Creator Tools',
    href: '/creator-tools',
  },
]

const EXPLORE = [
  { label: '🔥 Trending', href: '/' },
  { label: '🛍️ Shopping', href: '/search?q=shopping' },
  { label: '🎵 Music', href: '/search?q=music' },
  { label: '🎬 Movies', href: '/search?q=movies' },
  { label: '📺 Live', href: '/search?q=live' },
  { label: '🎮 Gaming', href: '/search?q=gaming' },
  { label: '📰 News', href: '/search?q=news' },
  { label: '🏋️ Sports', href: '/search?q=sports' },
  { label: '🔬 Learning', href: '/search?q=learning' },
  { label: '👗 Fashion', href: '/search?q=fashion' },
  { label: '🎙️ Podcasts', href: '/search?q=podcasts' },
]

export default function YTSidebar() {
  return (
    <aside
      style={{
        width: 240,
        minWidth: 240,
        background: '#0f0f0f',
        height: 'calc(100vh - 56px)',
        position: 'sticky',
        top: 56,
        overflowY: 'auto',
        paddingTop: 12,
        paddingBottom: 24,
        flexShrink: 0,
      }}
      className="hidden lg:block"
    >
      {/* Main nav */}
      <div style={{ marginBottom: 12 }}>
        {NAV.map(item => (
          <Link
            key={item.label}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '10px 24px',
              color: 'rgba(255,255,255,0.87)',
              fontSize: '0.875rem',
              fontWeight: 500,
              borderRadius: 10,
              margin: '2px 0',
              transition: 'background 0.15s',
            }}
            className="yt-nav-link"
          >
            <span style={{ color: 'rgba(255,255,255,0.87)', flexShrink: 0 }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '8px 24px' }} />

      {/* Explore */}
      <div style={{ padding: '8px 0' }}>
        <p style={{ padding: '8px 24px', fontSize: '0.875rem', fontWeight: 600, color: 'rgba(255,255,255,0.87)', letterSpacing: 0 }}>
          Explore
        </p>
        {EXPLORE.map(item => (
          <Link
            key={item.label}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '8px 24px',
              color: 'rgba(255,255,255,0.75)',
              fontSize: '0.875rem',
              borderRadius: 10,
              transition: 'background 0.15s',
            }}
            className="yt-nav-link"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '8px 24px' }} />

      <p style={{ padding: '12px 24px 4px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
        © 2025 YT Portal<br />
        Not affiliated with YouTube
      </p>
    </aside>
  )
}
