import { searchVideos } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'
import Navbar from '@/components/Navbar'

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

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-lg font-semibold mb-6 text-gray-300">
          {query ? `Results for "${query}"` : 'Search for videos'}
        </h1>

        {error && (
          <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map(v => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>

        {!videos.length && query && !error && (
          <p className="text-gray-500 text-center py-20">No results found</p>
        )}
      </main>
    </>
  )
}
