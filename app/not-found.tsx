import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: '40px 16px',
        textAlign: 'center',
        background: '#0a0a0a',
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}
      >
        404
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#f9fafb', margin: 0 }}>
        Page not found
      </h1>
      <p
        style={{
          fontSize: 13,
          color: 'rgba(249,250,251,0.4)',
          margin: 0,
          maxWidth: 320,
        }}
      >
        This page has moved or doesn&apos;t exist. Head back to discover what&apos;s trending.
      </p>
      <Link
        href="/"
        style={{
          marginTop: 8,
          padding: '12px 28px',
          borderRadius: 12,
          background: 'rgba(239,68,68,0.15)',
          color: '#ef4444',
          fontWeight: 800,
          fontSize: 14,
          textDecoration: 'none',
          border: '1px solid rgba(239,68,68,0.3)',
        }}
      >
        Back to YT Portal →
      </Link>
    </div>
  )
}
