import type { Metadata } from 'next'
import './globals.css'
import SharedNavbar from '@/components/SharedNavbar'
import SharedFooter from '@/components/SharedFooter'
import type { BrandConfig } from '@/components/SharedNavbar'

const brand: BrandConfig = {
  name: 'YT Portal',
  tagline: 'Trending YouTube videos curated by topic — tech, gaming, music and more.',
  icon: '▶️',
  color: '#ef4444',
  url: 'https://yt-portal.vercel.app',
  navLinks: [
    { label: 'Trending', href: '/?cat=Trending' },
    { label: 'Tech', href: '/?cat=Tech' },
    { label: 'Gaming', href: '/?cat=Gaming' },
    { label: 'Music', href: '/?cat=Music' },
  ],
  cta: { label: 'Browse →', href: '/' },
}

export const metadata: Metadata = {
  title: 'YT Portal — Trending YouTube Videos by Topic',
  description: 'Discover trending YouTube videos curated by topic. Tech, gaming, music, news and more — updated daily.',
  keywords: ['trending videos', 'YouTube', 'curated videos', 'tech videos', 'gaming videos'],
  openGraph: { title: 'YT Portal — Trending YouTube Videos', description: 'Trending YouTube videos curated by topic.', type: 'website', locale: 'en_GB', siteName: 'YT Portal' },
  twitter: { card: 'summary_large_image', title: 'YT Portal', description: 'Trending YouTube videos by topic.' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "YT Portal",
          "url": brand.url,
          "description": brand.tagline
        })}} />
      </head>
      <body className="flex flex-col min-h-screen">
        <SharedNavbar brand={brand} />
        <main className="flex-1 pt-16">{children}</main>
        <SharedFooter brand={brand} />
      </body>
    </html>
  )
}
