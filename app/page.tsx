import { getTrending } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'

const CHIPS = [
  { label: 'All', query: '' },
  { label: '🔥 Blowing Up Now', query: 'trending viral 2026' },
  { label: '🤖 AI That Changed Everything', query: 'artificial intelligence breakthrough 2026' },
  { label: '🎮 Games Nobody Saw Coming', query: 'best games 2026' },
  { label: '💰 Money Moves', query: 'personal finance investing wealth 2026' },
  { label: '🎵 Sounds of Right Now', query: 'trending music 2026' },
  { label: '🔬 Science They Buried', query: 'science discovery 2026' },
  { label: '🎬 Films Worth Your 2hrs', query: 'best movies 2026' },
  { label: '💪 Physiques That Took 90 Days', query: 'body transformation workout' },
  { label: '📰 What They\'re Not Telling You', query: 'news analysis 2026' },
  { label: '🍳 Meals Under 15 Minutes', query: 'quick cooking recipes' },
  { label: '✈️ Places Under £500', query: 'budget travel destinations' },
  { label: '🎯 Creator Tools', query: '' },
]

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams

  const videos = await getTrending(24)
  const featured = videos.slice(0, 3)
  const rest = videos.slice(3)

  return (
    <div style={{ minHeight: '100%' }}>
      {/* Animated blob bg */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }} aria-hidden>
        <div style={{ position: 'absolute', top: '-15%', left: '-8%', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,0,0,0.12) 0%, transparent 70%)', filter: 'blur(80px)',
          animation: 'blobDrift1 14s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-6%', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180,0,0,0.08) 0%, transparent 70%)', filter: 'blur(90px)',
          animation: 'blobDrift2 18s ease-in-out infinite' }} />
        <style>{`@keyframes blobDrift1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-20px) scale(1.08)}}
          @keyframes blobDrift2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-25px,20px) scale(1.06)}}`}</style>
      </div>

      {/* Hook banner — retention-first value prop */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(255,0,0,0.15) 0%, rgba(0,0,0,0) 100%)',
        borderBottom: '1px solid rgba(255,0,0,0.15)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ff4444' }}>
          LIVE TRENDING
        </span>
        <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
          Curated from YouTube's top 100 — updated every 30 min
        </span>
        <a href="/creator-tools" style={{
          marginLeft: 'auto', fontSize: '0.75rem', fontWeight: 600, color: '#ff4444',
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
          padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(255,68,68,0.3)',
          background: 'rgba(255,68,68,0.08)', whiteSpace: 'nowrap',
        }}>
          🎯 Grow your channel →
        </a>
      </div>

      {/* Sticky category chips */}
      <div style={{
        position: 'sticky', top: 56, zIndex: 40, background: '#0f0f0f',
        borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '12px 24px',
      }}>
        <div className="scrollbar-hide" style={{ display: 'flex', gap: 8, overflowX: 'auto', alignItems: 'center' }}>
          {CHIPS.map(c => {
            if (c.label === '🎯 Creator Tools') {
              return (
                <a key={c.label} href="/creator-tools" style={{
                  flexShrink: 0, padding: '6px 14px', borderRadius: 8, fontSize: '0.875rem',
                  fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none',
                  background: 'rgba(255,0,0,0.15)', color: '#ff6666',
                  border: '1px solid rgba(255,0,0,0.25)', transition: 'all 0.15s',
                }}>{c.label}</a>
              )
            }
            const isActive = (!cat && !c.query) || cat === c.query
            return (
              <a
                key={c.label}
                href={c.query ? `/search?q=${encodeURIComponent(c.query)}` : '/'}
                style={{
                  flexShrink: 0, padding: '6px 14px', borderRadius: 8, fontSize: '0.875rem',
                  fontWeight: 500, whiteSpace: 'nowrap', textDecoration: 'none',
                  transition: 'all 0.15s',
                  background: isActive ? '#fff' : 'rgba(255,255,255,0.1)',
                  color: isActive ? '#0f0f0f' : 'rgba(255,255,255,0.87)',
                }}
              >
                {c.label}
              </a>
            )
          })}
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: '20px 24px 32px' }}>

        {/* Featured row — top 3 viral picks */}
        {featured.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ width: 3, height: 18, background: '#ff0000', borderRadius: 2, display: 'block' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                Trending Now
              </span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginLeft: 4 }}>Top picks breaking today</span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '16px',
            }}>
              {featured.map((v, i) => (
                <VideoCard key={v.id} video={v} rank={i + 1} />
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        {rest.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ width: 3, height: 18, background: 'rgba(255,255,255,0.2)', borderRadius: 2, display: 'block' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
              All Videos
            </span>
          </div>
        )}

        {/* Full video grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px 16px',
        }}>
          {rest.map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </div>
  )
}
