import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import YTNavbar from '@/components/YTNavbar'
import YTSidebar from '@/components/YTSidebar'
import FloatingChatWrapper from '@/components/FloatingChatWrapper'
import FeedbackWidget from '@/components/FeedbackWidget'

export const metadata: Metadata = {
  title: 'YT Portal — YouTube Growth on Autopilot. Video Ideas, Scripts & SEO.',
  description: 'Tell AI your channel niche — get video ideas, SEO titles, scripts, and thumbnail concepts in under a minute. Trending videos updated every 30 minutes.',
  keywords: [
    'trending YouTube videos', 'viral videos today', 'best YouTube channels 2026',
    'what to watch on YouTube', 'YouTube trending now', 'AI videos', 'tech YouTube',
    'most watched videos', 'YouTube discovery', 'creator tools', 'video growth',
    'YouTube SEO', 'viral content', 'binge-worthy videos',
  ],
  metadataBase: new URL('https://yt-portal.app'),
  alternates: { canonical: 'https://yt-portal.app' },
  openGraph: {
    title: 'YT Portal — Viral YouTube Videos Trending Right Now',
    description: 'What\'s blowing up on YouTube before everyone else. Trending videos in AI, tech, finance, gaming and more.',
    type: 'website', locale: 'en_GB', siteName: 'YT Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YT Portal — Viral YouTube Videos Trending Right Now',
    description: 'Discover what\'s blowing up on YouTube. Curated trending videos by topic, updated every 30 minutes.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4237294630161176" />
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
          "url": "https://yt-portal.app",
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
        <FeedbackWidget />
        <Script defer data-site="yt-portal.vercel.app" src="http://31.97.56.148:3098/t.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
