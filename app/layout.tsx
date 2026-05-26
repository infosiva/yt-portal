import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import YTNavbar from '@/components/YTNavbar'
import YTSidebar from '@/components/YTSidebar'
import FloatingChatWrapper from '@/components/FloatingChatWrapper'

export const metadata: Metadata = {
  title: 'YT Portal — Trending YouTube Videos by Topic',
  description: 'Discover trending YouTube videos curated by topic. Tech, gaming, music, news and more — updated daily.',
  keywords: ['trending videos', 'YouTube', 'curated videos', 'tech videos', 'gaming videos'],
  metadataBase: new URL('https://yt-portal.vercel.app'),
  openGraph: { title: 'YT Portal — Trending YouTube Videos', description: 'Trending YouTube videos curated by topic.', type: 'website', locale: 'en_GB', siteName: 'YT Portal' },
  twitter: { card: 'summary_large_image', title: 'YT Portal', description: 'Trending YouTube videos by topic.' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          body { background: #0f0f0f; margin: 0; }
          .yt-nav-link:hover { background: rgba(255,255,255,0.1) !important; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "YT Portal",
          "url": "https://yt-portal.vercel.app",
        })}} />
      </head>
      <body style={{ background: '#0f0f0f', color: '#fff', fontFamily: 'Roboto,-apple-system,system-ui,sans-serif', minHeight: '100dvh' }}>
        <YTNavbar />
        <div style={{ display: 'flex', paddingTop: 56, minHeight: 'calc(100vh - 56px)' }}>
          <YTSidebar />
          <main style={{ flex: 1, minWidth: 0, overflowX: 'hidden' }}>
            {children}
          </main>
        </div>
        <FloatingChatWrapper />
        <Script defer data-site="yt-portal.vercel.app" src="http://31.97.56.148:3098/t.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
