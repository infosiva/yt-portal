import { getTrending } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'

const CATEGORIES = [
  { label: 'Trending', query: '' },
  { label: 'Tech', query: 'technology 2024' },
  { label: 'Gaming', query: 'gaming' },
  { label: 'Music', query: 'music' },
  { label: 'Finance', query: 'personal finance investing' },
  { label: 'Science', query: 'science' },
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
      // Demo mode — show placeholder cards
      videos = []
    } else {
      videos = await getTrending(24)
    }
  } catch (e: unknown) {
    error = (e as Error).message
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {CATEGORIES.map(c => (
            <a
              key={c.label}
              href={c.query ? `/search?q=${encodeURIComponent(c.query)}` : '/'}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !cat && !c.query
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {c.label}
            </a>
          ))}
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

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </main>
    </>
  )
}
