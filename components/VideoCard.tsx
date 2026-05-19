'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { YTVideo, formatViews, timeAgo } from '@/lib/youtube'

function ChannelAvatar({ name }: { name: string }) {
  const hue = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  return (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: `hsl(${hue}, 65%, 45%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '0.8rem',
        fontWeight: 700,
        flexShrink: 0,
        marginTop: 2,
      }}
      aria-hidden
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

export default function VideoCard({ video, featured = false }: { video: YTVideo; featured?: boolean }) {
  const [imgSrc, setImgSrc] = useState(video.thumbnail)
  const fallback = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
  const [hovered, setHovered] = useState(false)

  // featured prop kept for backwards compat with watch page — renders same card style
  void featured

  return (
    <Link
      href={`/watch/${video.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: hovered ? 0 : 12,
          overflow: 'hidden',
          background: '#272727',
          transition: 'border-radius 0.2s',
        }}
      >
        <Image
          src={imgSrc}
          alt={video.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={() => { if (imgSrc !== fallback) setImgSrc(fallback) }}
          style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)', transition: 'transform 0.3s' }}
        />

        {/* Duration */}
        {video.duration && (
          <span
            style={{
              position: 'absolute',
              bottom: 6,
              right: 8,
              background: 'rgba(0,0,0,0.87)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '1px 5px',
              borderRadius: 4,
              letterSpacing: '0.02em',
              fontFamily: 'monospace',
            }}
          >
            {video.duration}
          </span>
        )}
      </div>

      {/* Info row — avatar + text (exact YouTube layout) */}
      <div style={{ display: 'flex', gap: 12, paddingTop: 12, paddingBottom: 8 }}>
        <ChannelAvatar name={video.channelTitle} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              margin: 0,
              fontSize: '0.9375rem',
              fontWeight: 500,
              lineHeight: 1.4,
              color: '#f1f1f1',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
            }}
          >
            {video.title}
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.8125rem', color: '#aaa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {video.channelTitle}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: '0.8125rem', color: '#aaa' }}>
            {formatViews(video.viewCount)} · {timeAgo(video.publishedAt)}
          </p>
        </div>
      </div>
    </Link>
  )
}
