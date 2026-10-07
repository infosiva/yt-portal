import { NextRequest, NextResponse } from "next/server";

// Anonymous usage/error event (client sends only after cookie consent). JSON-line stdout log; no IP, no UA, no PII stored.
export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const { event, msg, src, line, path } = b ?? {};
    console.log(JSON.stringify({ level: String(event).startsWith("js_") ? "error" : "info", scope: "usage", event: String(event ?? "").slice(0, 40), msg: msg && String(msg).slice(0, 120), src: src && String(src).slice(-60), line: typeof line === "number" ? line : undefined, path: path && String(path).slice(0, 80), ts: Date.now() }));
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  return new NextResponse(null, { status: 204 });
}
