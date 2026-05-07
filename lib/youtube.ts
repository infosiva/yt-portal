const API_KEY = process.env.YOUTUBE_API_KEY
const BASE    = 'https://www.googleapis.com/youtube/v3'

export interface YTVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  channelTitle: string
  channelId: string
  publishedAt: string
  viewCount: string
  likeCount: string
  duration: string
}

export interface YTChannel {
  id: string
  title: string
  thumbnail: string
  subscriberCount: string
  videoCount: string
  description: string
}

function ytFetch(endpoint: string, params: Record<string, string>) {
  const url = new URL(`${BASE}/${endpoint}`)
  url.searchParams.set('key', API_KEY!)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  return fetch(url.toString(), { next: { revalidate: 300 } })
}

export async function getTrending(maxResults = 24, regionCode = 'US'): Promise<YTVideo[]> {
  const r = await ytFetch('videos', {
    part: 'snippet,statistics,contentDetails',
    chart: 'mostPopular',
    regionCode,
    maxResults: String(maxResults),
  })
  if (!r.ok) throw new Error(`YouTube trending: ${r.status}`)
  const data = await r.json() as { items: RawVideo[] }
  return data.items.map(parseVideo)
}

export async function searchVideos(query: string, maxResults = 24): Promise<YTVideo[]> {
  const searchRes = await ytFetch('search', {
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: String(maxResults),
    order: 'relevance',
  })
  if (!searchRes.ok) throw new Error(`YouTube search: ${searchRes.status}`)
  const searchData = await searchRes.json() as { items: Array<{ id: { videoId: string }; snippet: RawSnippet }> }
  const ids = searchData.items.map(i => i.id.videoId).join(',')
  if (!ids) return []
  return getVideosByIds(ids)
}

export async function getVideosByIds(ids: string): Promise<YTVideo[]> {
  const r = await ytFetch('videos', {
    part: 'snippet,statistics,contentDetails',
    id: ids,
  })
  if (!r.ok) throw new Error(`YouTube videos: ${r.status}`)
  const data = await r.json() as { items: RawVideo[] }
  return data.items.map(parseVideo)
}

export async function getVideoById(id: string): Promise<YTVideo | null> {
  const vids = await getVideosByIds(id)
  return vids[0] ?? null
}

export async function getRelatedVideos(videoId: string, maxResults = 12): Promise<YTVideo[]> {
  // Search by video title as proxy (related videos endpoint deprecated)
  const r = await ytFetch('search', {
    part: 'snippet',
    relatedToVideoId: videoId,
    type: 'video',
    maxResults: String(maxResults),
  })
  if (!r.ok) return []
  const data = await r.json() as { items: Array<{ id: { videoId: string } }> }
  const ids = data.items.map(i => i.id.videoId).filter(Boolean).join(',')
  if (!ids) return []
  return getVideosByIds(ids)
}

export async function getChannel(channelId: string): Promise<YTChannel | null> {
  const r = await ytFetch('channels', {
    part: 'snippet,statistics',
    id: channelId,
  })
  if (!r.ok) return null
  const data = await r.json() as { items: RawChannel[] }
  const ch = data.items[0]
  if (!ch) return null
  return {
    id: ch.id,
    title: ch.snippet.title,
    thumbnail: ch.snippet.thumbnails?.high?.url ?? ch.snippet.thumbnails?.default?.url ?? '',
    subscriberCount: ch.statistics?.subscriberCount ?? '0',
    videoCount: ch.statistics?.videoCount ?? '0',
    description: ch.snippet.description ?? '',
  }
}

// ── Parsers ───────────────────────────────────────────────────────────────────
interface RawSnippet {
  title: string
  description: string
  thumbnails: { maxres?: { url: string }; high?: { url: string }; medium?: { url: string }; default?: { url: string } }
  channelTitle: string
  channelId: string
  publishedAt: string
}

interface RawVideo {
  id: string
  snippet: RawSnippet
  statistics?: { viewCount?: string; likeCount?: string }
  contentDetails?: { duration?: string }
}

interface RawChannel {
  id: string
  snippet: { title: string; description: string; thumbnails: RawSnippet['thumbnails'] }
  statistics?: { subscriberCount?: string; videoCount?: string }
}

function parseVideo(v: RawVideo): YTVideo {
  const t = v.snippet.thumbnails
  return {
    id:           v.id,
    title:        v.snippet.title,
    description:  v.snippet.description,
    thumbnail:    t.maxres?.url ?? t.high?.url ?? t.medium?.url ?? t.default?.url ?? '',
    channelTitle: v.snippet.channelTitle,
    channelId:    v.snippet.channelId,
    publishedAt:  v.snippet.publishedAt,
    viewCount:    v.statistics?.viewCount ?? '0',
    likeCount:    v.statistics?.likeCount ?? '0',
    duration:     parseDuration(v.contentDetails?.duration ?? ''),
  }
}

function parseDuration(iso: string): string {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return ''
  const h = m[1] ? `${m[1]}:` : ''
  const min = m[2] ? m[2].padStart(h ? 2 : 1, '0') : '0'
  const sec = (m[3] ?? '0').padStart(2, '0')
  return `${h}${min}:${sec}`
}

export function formatViews(n: string): string {
  const num = parseInt(n)
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M views`
  if (num >= 1_000)     return `${(num / 1_000).toFixed(0)}K views`
  return `${num} views`
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const d = Math.floor(diff / 86400000)
  if (d === 0) return 'Today'
  if (d < 7)   return `${d}d ago`
  if (d < 30)  return `${Math.floor(d / 7)}w ago`
  if (d < 365) return `${Math.floor(d / 30)}mo ago`
  return `${Math.floor(d / 365)}y ago`
}
