'use client'
import { useState } from 'react'
import Image from 'next/image'

interface Props {
  id: string
  title: string
  thumbnail?: string
}

export default function EmbedPlayer({ id, title, thumbnail }: Props) {
  const [embedError, setEmbedError] = useState(false)
  const [started, setStarted] = useState(false)

  const thumb = thumbnail || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  const ytUrl = `https://www.youtube.com/watch?v=${id}`

  if (embedError || !started) {
    return (
      <div className="aspect-video rounded-xl overflow-hidden bg-black relative group cursor-pointer"
        onClick={() => setStarted(true)}>
        <Image src={thumb} alt={title} fill className="object-cover opacity-80"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          {embedError ? (
            <>
              <div className="bg-black/80 rounded-2xl px-6 py-4 text-center space-y-3">
                <p className="text-white font-medium">This video can't be embedded</p>
                <p className="text-gray-400 text-sm">Rights-restricted content (live sports, music, etc.)</p>
                <a href={ytUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
                  onClick={e => e.stopPropagation()}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch on YouTube
                </a>
              </div>
            </>
          ) : (
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-2xl">
              <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-black relative">
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        onError={() => setEmbedError(true)}
      />
      {/* Detect embed block via postMessage */}
      <EmbedErrorDetector onError={() => setEmbedError(true)} videoId={id} />
    </div>
  )
}

// YouTube sends postMessage when video is unavailable for embedding
function EmbedErrorDetector({ onError, videoId }: { onError: () => void; videoId: string }) {
  if (typeof window !== 'undefined') {
    const handler = (e: MessageEvent) => {
      if (typeof e.data === 'string') {
        try {
          const d = JSON.parse(e.data)
          if (d?.event === 'onError' && (d?.info === 101 || d?.info === 150)) {
            onError()
            window.removeEventListener('message', handler)
          }
        } catch { /* not JSON */ }
      }
    }
    window.addEventListener('message', handler)
    // Also fallback: if after 4s iframe is still loading, check via timeout
    setTimeout(() => {
      const iframe = document.querySelector(`iframe[src*="${videoId}"]`) as HTMLIFrameElement | null
      if (iframe) {
        try {
          iframe.contentDocument // throws if blocked (cross-origin is fine, null is fine)
        } catch { /* expected */ }
      }
    }, 4000)
  }
  return null
}
