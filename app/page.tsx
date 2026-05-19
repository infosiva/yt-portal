import { getTrending } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'
import PlaceholderGrid from '@/components/PlaceholderGrid'

const CHIPS = [
  { label: 'All', query: '' },
  { label: '🔥 Trending', query: 'trending' },
  { label: '💻 Tech', query: 'technology 2024' },
  { label: '🎮 Gaming', query: 'gaming' },
  { label: '🎵 Music', query: 'music' },
  { label: '📈 Finance', query: 'personal finance investing' },
  { label: '🔬 Science', query: 'science' },
  { label: '🎬 Movies', query: 'movie trailer 2024' },
  { label: '🏋️ Fitness', query: 'workout fitness' },
  { label: '📰 News', query: 'world news' },
  { label: '🍳 Food', query: 'cooking food' },
  { label: '✈️ Travel', query: 'travel vlog' },
]

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams

  let videos: import("@/lib/youtube").YTVideo[] = []
  let error = ''

  try {
    if (process.env.YOUTUBE_API_KEY) {
      videos = await getTrending(24)
    }
  } catch (e: unknown) {
    error = (e as Error).message
  }

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
      {/* Sticky category chips — YouTube style */}
      <div
        style={{
          position: 'sticky',
          top: 56,
          zIndex: 40,
          background: '#0f0f0f',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '12px 24px',
        }}
      >
        <div
          className="scrollbar-hide"
          style={{ display: 'flex', gap: 8, overflowX: 'auto', alignItems: 'center' }}
        >
          {CHIPS.map(c => {
            const isActive = (!cat && !c.query) || cat === c.query
            return (
              <a
                key={c.label}
                href={c.query ? `/search?q=${encodeURIComponent(c.query)}` : '/'}
                style={{
                  flexShrink: 0,
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
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
      <div style={{ padding: '16px 24px 32px' }}>
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px 16px', color: '#fca5a5', fontSize: '0.875rem', marginBottom: 16 }}>
            {error}
          </div>
        )}

        {videos.length === 0 && <PlaceholderGrid />}

        {/* Video grid — YouTube 4-col style */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px 16px',
        }}>
          {videos.map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </div>
  )
}
