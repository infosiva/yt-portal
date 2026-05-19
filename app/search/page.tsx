import { searchVideos } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'

const CATEGORIES = [
  { label: '🔥 Trending', query: '' },
  { label: '💻 Tech', query: 'technology 2024' },
  { label: '🎮 Gaming', query: 'gaming' },
  { label: '🎵 Music', query: 'music' },
  { label: '📈 Finance', query: 'personal finance investing' },
  { label: '🔬 Science', query: 'science' },
  { label: '🎬 Movies', query: 'movie trailer 2024' },
  { label: '🏋️ Fitness', query: 'workout fitness' },
]

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q ?? ''

  let videos: import("@/lib/youtube").YTVideo[] = []
  let error = ''

  if (query && process.env.YOUTUBE_API_KEY) {
    try {
      videos = await searchVideos(query, 24)
    } catch (e: unknown) {
      error = (e as Error).message
    }
  }

  const PLACEHOLDER_VIDEOS = [
    { title: `Best "${query || 'AI'}" videos on YouTube`, channel: 'YT Portal', views: '—', ago: 'Live results coming soon', thumb: '🎬', dur: '' },
    { title: 'How to use ChatGPT like a pro', channel: 'AI Insider', views: '2.4M views', ago: '3 days ago', thumb: '🤖', dur: '12:34' },
    { title: 'Top AI tools you need right now', channel: 'Tech Daily', views: '890K views', ago: '1 week ago', thumb: '🛠️', dur: '9:21' },
    { title: 'Build an AI agent from scratch', channel: 'Code with AI', views: '1.1M views', ago: '5 days ago', thumb: '🧠', dur: '24:05' },
    { title: 'Gemini vs ChatGPT — which wins?', channel: 'AI Compare', views: '3.2M views', ago: '2 weeks ago', thumb: '⚡', dur: '15:48' },
    { title: 'Claude just changed everything', channel: 'AI News', views: '540K views', ago: '4 days ago', thumb: '💡', dur: '8:12' },
    { title: 'Best free AI image generators', channel: 'Creator AI', views: '1.5M views', ago: '1 week ago', thumb: '🎨', dur: '11:07' },
    { title: 'Python AI project in 30 minutes', channel: 'Dev Quick', views: '420K views', ago: '3 days ago', thumb: '🐍', dur: '29:55' },
  ]
  const showPlaceholders = (error || !process.env.YOUTUBE_API_KEY) && videos.length === 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Category pills with active state */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        {CATEGORIES.map(c => {
          const isActive = c.query && query === c.query
          return (
            <a
              key={c.label}
              href={c.query ? `/search?q=${encodeURIComponent(c.query)}` : '/'}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                isActive
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                  : 'bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800 hover:border-gray-600 hover:text-white'
              }`}
            >
              {c.label}
            </a>
          )
        })}
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-5 bg-red-500 rounded-full" />
        <h1 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          {query ? `Results for "${query}"` : 'Search results'}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {videos.map(v => (
          <VideoCard key={v.id} video={v} />
        ))}
        {showPlaceholders && PLACEHOLDER_VIDEOS.map((v, i) => (
          <a key={i} href={`https://www.youtube.com/results?search_query=${encodeURIComponent(query || v.title)}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none', borderRadius: 12, overflow: 'hidden',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ height: 160, background: 'rgba(255,255,255,0.06)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 48, position: 'relative' }}>
              {v.thumb}
              {v.dur && <span style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.8)',
                color: '#fff', fontSize: 11, padding: '2px 6px', borderRadius: 4 }}>{v.dur}</span>}
            </div>
            <div style={{ padding: '12px 14px' }}>
              <p style={{ color: '#fff', fontSize: 14, fontWeight: 600, lineHeight: 1.4, marginBottom: 6,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{v.title}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{v.channel}</p>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{v.views}{v.ago ? ` · ${v.ago}` : ''}</p>
            </div>
          </a>
        ))}
      </div>

      {!videos.length && !showPlaceholders && query && (
        <p className="text-gray-500 text-center py-20">No results found for &ldquo;{query}&rdquo;</p>
      )}
    </div>
  )
}
