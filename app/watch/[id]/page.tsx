import { getVideoById, searchVideos, formatViews, timeAgo } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'
import Navbar from '@/components/Navbar'
import AISummary from '@/components/AISummary'
import EmbedPlayer from '@/components/EmbedPlayer'
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
      video = await getVideoById(id)
      // relatedToVideoId is deprecated — use channel/topic search instead
      if (video) {
        related = await searchVideos(video.channelTitle, 12).catch(() => [])
        related = related.filter(v => v.id !== id).slice(0, 12)
      }
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
            <EmbedPlayer id={id} title={video?.title ?? 'YouTube Video'} thumbnail={video?.thumbnail} />

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
                <AISummary
                  videoId={id}
                  title={video.title}
                  channel={video.channelTitle}
                  description={video.description}
                />
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
