import { getTrending } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'

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

        {!process.env.YOUTUBE_API_KEY && (
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 32, textAlign: 'center', marginBottom: 24 }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Add <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4 }}>YOUTUBE_API_KEY</code> to see trending videos</p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem' }}>Free at console.cloud.google.com → YouTube Data API v3</p>
          </div>
        )}

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
