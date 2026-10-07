import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, background: '#0e0e10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="140" height="140" viewBox="0 0 32 32">
          <path d="M5 22 L11 14 L16 18 L22 9 L27 13" fill="none" stroke="#ff5a36" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="22" cy="9" r="2.6" fill="#ff5a36" />
        </svg>
      </div>
    ),
    size,
  )
}
