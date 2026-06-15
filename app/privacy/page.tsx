export const metadata = {
  title: 'Privacy Policy — YT Portal',
  description: 'How YT Portal handles your data.',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 32 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#ef4444', marginBottom: 12 }}>{title}</h2>
    <div style={{ color: '#d1d5db', lineHeight: 1.7, fontSize: 15 }}>{children}</div>
  </section>
)

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 80px', background: '#0a0a0a', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, color: '#f9fafb', marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: '#6b7280', marginBottom: 48, fontSize: 14 }}>Last updated: June 2026</p>
      <Section title="Data We Collect">
        <p>We collect YouTube video URLs and search queries you submit. We do not collect or store your YouTube account data, watch history, or personal information beyond your session.</p>
      </Section>
      <Section title="How We Use Data">
        <p>Video URLs and queries are used to fetch trending data via the YouTube Data API and pass relevant context to AI for summaries and Q&amp;A. We do not store transcripts or AI-generated summaries after your session ends.</p>
      </Section>
      <Section title="Cookies">
        <p>We use minimal session cookies for functionality (e.g. category preferences). No advertising or tracking cookies are used. Google AdSense may serve ads and set its own cookies subject to Google&apos;s privacy policy.</p>
      </Section>
      <Section title="Third-Party Services">
        <p>This tool uses YouTube Data API (Google), Groq and/or OpenAI APIs for AI features, and Google AdSense for advertising. Data shared with these services is subject to their respective privacy policies. YT Portal is not affiliated with YouTube or Google.</p>
      </Section>
      <Section title="Data Retention">
        <p>Search queries and video URLs are not retained after your session. We do not maintain a database of user activity or browsing history.</p>
      </Section>
      <Section title="Your Rights">
        <p>Email <a href="mailto:privacy@yt-portal.app" style={{ color: '#ef4444' }}>privacy@yt-portal.app</a> to request deletion of any data we hold about you, or to ask questions about data handling.</p>
      </Section>
      <Section title="Children&apos;s Privacy">
        <p>This service is not directed at children under 13. We do not knowingly collect data from minors. If you believe a minor has submitted data, contact us immediately.</p>
      </Section>
      <Section title="Changes to This Policy">
        <p>We may update this policy periodically. Continued use of YT Portal after changes constitutes acceptance of the updated policy.</p>
      </Section>
      <Section title="Contact">
        <p>Questions? Email <a href="mailto:privacy@yt-portal.app" style={{ color: '#ef4444' }}>privacy@yt-portal.app</a></p>
      </Section>
    </main>
  )
}
