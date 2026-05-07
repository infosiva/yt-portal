import { getVideoById, getRelatedVideos, formatViews, timeAgo } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'
import Navbar from '@/components/Navbar'
import { notFound } from 'next/navigation'

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let video = null
  let related: import("@/lib/youtube").YTVideo[] = []

  try {
    if (process.env.YOUTUBE_API_KEY) {
      ;[video, related] = await Promise.all([
        getVideoById(id),
        getRelatedVideos(id, 12),
      ])
    }
  } catch { /* show notFound */ }

  if (!video && process.env.YOUTUBE_API_KEY) notFound()

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
                title={video?.title ?? 'YouTube Video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {video && (
              <div className="space-y-2">
                <h1 className="text-lg font-semibold leading-snug">{video.title}</h1>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-300">{video.channelTitle}</p>
                    <p className="text-xs text-gray-500">
                      {formatViews(video.viewCount)} · {timeAgo(video.publishedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>👍 {parseInt(video.likeCount).toLocaleString()}</span>
                  </div>
                </div>
                {video.description && (
                  <p className="text-sm text-gray-400 line-clamp-3 bg-gray-900 rounded-xl p-4">
                    {video.description}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Related */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Related</h2>
            <div className="space-y-4">
              {related.map(v => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
