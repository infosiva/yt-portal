import { getTrending } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'

const CATEGORIES = [
  { label: '🔥 Trending', query: '', emoji: '🔥' },
  { label: '💻 Tech', query: 'technology 2024', emoji: '💻' },
  { label: '🎮 Gaming', query: 'gaming', emoji: '🎮' },
  { label: '🎵 Music', query: 'music', emoji: '🎵' },
  { label: '📈 Finance', query: 'personal finance investing', emoji: '📈' },
  { label: '🔬 Science', query: 'science', emoji: '🔬' },
  { label: '🎬 Movies', query: 'movie trailer 2024', emoji: '🎬' },
  { label: '🏋️ Fitness', query: 'workout fitness', emoji: '🏋️' },
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
    if (!process.env.YOUTUBE_API_KEY) {
      videos = []
    } else {
      videos = await getTrending(24)
    }
  } catch (e: unknown) {
    error = (e as Error).message
  }

  const featuredVideo = videos[0] ?? null
  const gridVideos = videos.slice(1)

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="liquid-blob liquid-blob-1" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.15), transparent 70%)' }} aria-hidden="true" />
      <div className="liquid-blob liquid-blob-2" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.08), transparent 70%)', animationDelay: '-5s' }} aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {CATEGORIES.map(c => {
            const isActive = !cat && !c.query
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

        {error && (
          <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm mb-6">
            {error}
          </div>
        )}

        {!process.env.YOUTUBE_API_KEY && (
          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-6 text-center mb-6">
            <p className="text-yellow-400 font-medium">Add YOUTUBE_API_KEY to see trending videos</p>
            <p className="text-gray-500 text-sm mt-1">Free at console.cloud.google.com → YouTube Data API v3</p>
          </div>
        )}

        {/* Featured hero video */}
        {featuredVideo && (
          <div className="mb-8">
            <VideoCard video={featuredVideo} featured />
          </div>
        )}

        {/* Section header */}
        {gridVideos.length > 0 && (
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 bg-red-500 rounded-full" />
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">More Trending</h2>
          </div>
        )}

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {gridVideos.map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </>
  )
}
