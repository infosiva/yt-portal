"use client";
// Anonymous usage + error log. Sends nothing until the visitor accepts cookies (localStorage cookie_consent_v1).
const KEY = "cookie_consent_v1";
const ok = () => { try { return localStorage.getItem(KEY) === "accepted"; } catch { return false; } };

export function track(event: string, props?: Record<string, string | number | boolean>) {
  if (!ok()) return;
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", event, props);
    navigator.sendBeacon?.("/api/usage", new Blob([JSON.stringify({ event, ...props })], { type: "application/json" }));
  } catch {}
}

let installed = false;
export function installErrorLog() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  window.addEventListener("error", (e) => track("js_error", { msg: String(e.message).slice(0, 120), src: String(e.filename ?? "").slice(-60), line: e.lineno ?? 0 }));
  window.addEventListener("unhandledrejection", (e) => track("js_unhandled_rejection", { msg: String((e.reason as Error)?.message ?? e.reason).slice(0, 120) }));
}
