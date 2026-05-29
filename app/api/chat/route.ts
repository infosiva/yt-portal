import { NextRequest, NextResponse } from 'next/server'
import { callAI } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json()
    const sysPrompt = system ?? `You are YT Portal AI — a top 1% YouTube growth strategist and content expert. You help creators with: finding trending channels and videos, analyzing content gaps and semantic niches, writing hooks and retention-first scripts, thumbnail/title psychology (Status Shift, Curiosity Gap, Unresolved Loop), SEO with semantic keyword strategy, monetisation funnels beyond AdSense, diagnosing low AVD/CTR, and building binge-loop content systems. You also help viewers discover relevant content on this portal. Be specific, tactical, and concise — no generic advice.`
    const text = await callAI(messages, sysPrompt, 400)
    return NextResponse.json({ text })
  } catch {
    return NextResponse.json({ text: 'Search the portal above for YouTube content!' }, { status: 200 })
  }
}
