"use client";
import { useEffect, useState } from "react";
import { track, installErrorLog } from "@/lib/telemetry";

const KEY = "cookie_consent_v1";
const grant = (on: boolean) => {
  try { (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("consent", "update", { analytics_storage: on ? "granted" : "denied" }); } catch {}
};

export default function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let v: string | null = null;
    try { v = localStorage.getItem(KEY); } catch {}
    if (!v) { setShow(true); return; }
    grant(v === "accepted");
    if (v === "accepted") { installErrorLog(); track("page_view", { path: location.pathname }); }
  }, []);
  const choose = (on: boolean) => {
    try { localStorage.setItem(KEY, on ? "accepted" : "declined"); } catch {}
    grant(on);
    setShow(false);
    if (on) { installErrorLog(); track("consent_accept"); }
  };
  if (!show) return null;
  const btn = { minHeight: 44, padding: "0 16px", borderRadius: 8, fontSize: 13, cursor: "pointer", border: "1px solid #3a4150" } as const;
  return (
    <div role="dialog" aria-label="Cookie consent" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 9998, padding: 16, background: "#14181f", color: "#e8eaf0", borderTop: "1px solid #2a303c", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
      <p style={{ margin: 0, fontSize: 13, flex: "1 1 260px" }}>We use cookies for anonymous analytics and ads. <a href="/privacy" style={{ textDecoration: "underline", color: "inherit" }}>Privacy</a></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => choose(false)} style={{ ...btn, background: "transparent", color: "#e8eaf0" }}>Decline</button>
        <button onClick={() => choose(true)} style={{ ...btn, background: "var(--theme-primary, #38bdf8)", color: "#0b0b12", border: "none", fontWeight: 600 }}>Accept</button>
      </div>
    </div>
  );
}
