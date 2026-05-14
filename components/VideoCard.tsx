'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { YTVideo, formatViews, timeAgo } from '@/lib/youtube'

function ChannelAvatar({ name }: { name: string }) {
  const initials = name.slice(0, 2).toUpperCase()
  // Deterministic color from channel name
  const hue = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
      style={{ background: `hsl(${hue}, 65%, 45%)` }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export default function VideoCard({ video, featured = false }: { video: YTVideo; featured?: boolean }) {
  const [imgSrc, setImgSrc] = useState(video.thumbnail)
  const fallback = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`

  if (featured) {
    return (
      <Link href={`/watch/${video.id}`} className="group block relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-red-500/50 transition-colors">
        <div className="relative aspect-video w-full">
          <Image
            src={imgSrc}
            alt={video.title}
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="100vw"
            onError={() => { if (imgSrc !== fallback) setImgSrc(fallback) }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {video.duration && (
            <span className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg font-mono">
              {video.duration}
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="inline-block bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2 uppercase tracking-wide">Featured</span>
            <h2 className="text-white text-xl font-bold leading-snug line-clamp-2 mb-2">{video.title}</h2>
            <div className="flex items-center gap-3">
              <ChannelAvatar name={video.channelTitle} />
              <div>
                <p className="text-gray-200 text-sm font-medium">{video.channelTitle}</p>
                <p className="text-gray-400 text-xs">{formatViews(video.viewCount)} · {timeAgo(video.publishedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/watch/${video.id}`} className="group block">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-800 ring-1 ring-transparent group-hover:ring-red-500/30 transition-all duration-200">
        <Image
          src={imgSrc}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => { if (imgSrc !== fallback) setImgSrc(fallback) }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded-md font-mono">
            {video.duration}
          </span>
        )}
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        <ChannelAvatar name={video.channelTitle} />
        <div className="flex-1 min-w-0 space-y-0.5">
          <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
            {video.title}
          </h3>
          <p className="text-xs text-gray-400 truncate">{video.channelTitle}</p>
          <p className="text-xs text-gray-500">
            {formatViews(video.viewCount)} · {timeAgo(video.publishedAt)}
          </p>
        </div>
      </div>
    </Link>
  )
}
