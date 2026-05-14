import { getVideoById, searchVideos, formatViews, timeAgo } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'
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
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Player */}
          <div className="lg:col-span-2 space-y-4">
            <EmbedPlayer id={id} title={video?.title ?? 'YouTube Video'} thumbnail={video?.thumbnail} />

            {video && (
              <div className="space-y-4 bg-gray-900/50 border border-gray-800 rounded-2xl p-4">
                <h1 className="text-base font-semibold leading-snug">{video.title}</h1>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    {/* Channel avatar */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ background: `hsl(${video.channelTitle.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 360}, 65%, 45%)` }}
                    >
                      {video.channelTitle.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{video.channelTitle}</p>
                      <p className="text-xs text-gray-500">
                        {formatViews(video.viewCount)} views · {timeAgo(video.publishedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm px-3 py-1.5 rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
                      {parseInt(video.likeCount || '0').toLocaleString()}
                    </span>
                  </div>
                </div>
                <AISummary
                  videoId={id}
                  title={video.title}
                  channel={video.channelTitle}
                  description={video.description}
                />
                {video.description && (
                  <details className="group">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300 transition-colors">
                      Show description
                    </summary>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed whitespace-pre-line line-clamp-6">
                      {video.description}
                    </p>
                  </details>
                )}
              </div>
            )}
          </div>

          {/* Related */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-red-500 rounded-full" />
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Up Next</h2>
            </div>
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
