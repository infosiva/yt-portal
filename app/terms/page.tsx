import Link from 'next/link'

export default function Terms() {
  return (
    <main style={{ maxWidth: 800, margin: '80px auto', padding: '0 24px', color: 'rgba(255,255,255,0.87)' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>Terms of Service</h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 32, fontSize: '0.9rem' }}>Last updated: June 2026</p>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>1. Acceptance</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          By using YT Portal you agree to these terms. This service is provided as-is for discovery and content research purposes.
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>2. Content</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          YT Portal aggregates publicly available YouTube trending data. We are not affiliated with YouTube or Google. All video content remains the property of respective creators and is subject to YouTube&apos;s Terms of Service.
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>3. Use</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          Use this service lawfully and in good faith. Do not attempt to scrape, reverse-engineer, or overload our systems.
        </p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>4. Limitation of Liability</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
          This service is provided without warranty. We are not liable for any direct or indirect damages arising from use of this platform.
        </p>
      </section>

      <Link href="/" style={{ color: '#ff4444', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
        ← Back to YT Portal
      </Link>
    </main>
  )
}
