'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface Props {
  id: string
  title: string
  thumbnail?: string
}

const YT_PLAY_ICON = (
  <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
)

const YT_LOGO = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

export default function EmbedPlayer({ id, title, thumbnail }: Props) {
  const [embedError, setEmbedError] = useState(false)
  const [started, setStarted] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const thumb = thumbnail || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  const ytUrl = `https://www.youtube.com/watch?v=${id}`

  // Listen for YouTube postMessage errors (101 = embedding disabled, 150 = same)
  useEffect(() => {
    if (!started) return
    const handler = (e: MessageEvent) => {
      if (typeof e.data !== 'string') return
      try {
        const d = JSON.parse(e.data)
        if (d?.event === 'onError' && (d?.info === 101 || d?.info === 150)) {
          setEmbedError(true)
        }
      } catch { /* non-JSON message, ignore */ }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [started])

  if (!started) {
    return (
      <div
        className="aspect-video rounded-xl overflow-hidden bg-black relative group cursor-pointer"
        onClick={() => setStarted(true)}
        role="button"
        aria-label={`Play ${title}`}
      >
        <Image
          src={thumb}
          alt={title}
          fill
          className="object-cover opacity-80"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-2xl">
            {YT_PLAY_ICON}
          </div>
        </div>
      </div>
    )
  }

  if (embedError) {
    return (
      <div className="aspect-video rounded-xl overflow-hidden bg-black relative flex items-center justify-center">
        <Image src={thumb} alt={title} fill className="object-cover opacity-30" />
        <div className="relative z-10 bg-black/80 rounded-2xl px-6 py-5 text-center space-y-3 max-w-xs">
          <p className="text-white font-semibold">Can't play here</p>
          <p className="text-gray-400 text-sm">This video is restricted from embedding (live events, music, etc.)</p>
          <a
            href={ytUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            {YT_LOGO}
            Watch on YouTube
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&enablejsapi=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}
