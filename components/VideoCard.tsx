import Image from 'next/image'
import Link from 'next/link'
import { YTVideo, formatViews, timeAgo } from '@/lib/youtube'

export default function VideoCard({ video }: { video: YTVideo }) {
  return (
    <Link href={`/watch/${video.id}`} className="group block">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-800">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
            {video.duration}
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-gray-400">{video.channelTitle}</p>
        <p className="text-xs text-gray-500">
          {formatViews(video.viewCount)} · {timeAgo(video.publishedAt)}
        </p>
      </div>
    </Link>
  )
}
