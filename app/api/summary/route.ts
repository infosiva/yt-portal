import { NextRequest, NextResponse } from 'next/server'
import { callAI } from '@/lib/ai'

const SYSTEM = `You are a concise video summarizer. Given a YouTube video title, channel, and description, produce:
1. A 2-sentence plain-English summary of what the video covers
2. 3-5 key takeaways as bullet points
3. Who should watch it (one line)

Respond in this exact JSON format:
{
  "summary": "...",
  "takeaways": ["...", "...", "..."],
  "audience": "..."
}`

export async function POST(req: NextRequest) {
  try {
    const { title, channel, description } = await req.json()
    if (!title) return NextResponse.json({ error: 'title required' }, { status: 400 })

    const prompt = `Video: "${title}"
Channel: ${channel}
Description: ${description?.slice(0, 800) || 'No description available'}`

    const { text } = await callAI(SYSTEM, [{ role: 'user', content: prompt }], 512, 'fast')
    const clean = text.replace(/```json\n?|```\n?/g, '').trim()
    const parsed = JSON.parse(clean)
    return NextResponse.json(parsed)
  } catch (e: unknown) {
    console.error('[summary]', e)
    return NextResponse.json({ error: 'Summary failed' }, { status: 500 })
  }
}
