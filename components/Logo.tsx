export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', color: '#f5f5f4' }}>
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#1a1a1e" />
        <path d="M5 22 L11 14 L16 18 L22 9 L27 13" fill="none" stroke="#ff5a36" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="9" r="2.6" fill="#ff5a36" />
      </svg>
      <span>YT<span style={{ color: '#ff5a36' }}>Portal</span></span>
    </span>
  )
}
