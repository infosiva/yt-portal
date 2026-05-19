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

  const videos = query ? await searchVideos(query, 24) : []
  const showPlaceholders = videos.length === 0

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
      </div>

      {showPlaceholders && query && (
        <p className="text-gray-500 text-center py-20">
          No results for &ldquo;{query}&rdquo; — <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 underline">search on YouTube →</a>
        </p>
      )}
    </div>
  )
}
