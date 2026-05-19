import { NextRequest, NextResponse } from 'next/server'
import { callAI } from '@/lib/ai'

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json()
    const sysPrompt = system ?? 'You are YT Portal AI — a YouTube content expert. Help users find channels, understand trends, summarise videos, and grow their YouTube presence. Be concise and helpful.'
    const text = await callAI(messages, sysPrompt, 400)
    return NextResponse.json({ text })
  } catch {
    return NextResponse.json({ text: 'Search the portal above for YouTube content!' }, { status: 200 })
  }
}
