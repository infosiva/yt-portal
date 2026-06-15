'use client'
import { useState } from 'react'

type FeedbackType = 'Bug' | 'Feature' | 'General'

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [type, setType] = useState<FeedbackType>('General')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const TYPES: FeedbackType[] = ['Bug', 'Feature', 'General']

  async function submit() {
    if (!message.trim() || message.trim().length < 5) {
      setError('Please enter at least a few words.')
      return
    }
    if (!rating) {
      setError('Please select a star rating.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type, rating, message, email,
          page: typeof window !== 'undefined' ? window.location.pathname : '/',
          site: 'YT Portal',
        }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setError((d as { error?: string }).error ?? 'Something went wrong. Try again.')
      } else {
        setSubmitted(true)
        setTimeout(() => { setOpen(false); setSubmitted(false); setRating(0); setMessage(''); setEmail('') }, 2500)
      }
    } catch {
      setError('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Toggle button — bottom-left */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Give feedback"
        title="Give feedback"
        style={{
          position: 'fixed', bottom: 24, left: 24, width: 44, height: 44,
          borderRadius: 12, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)', zIndex: 1000, fontSize: 18,
          transition: 'transform 160ms cubic-bezier(0.23,1,0.32,1), background 150ms ease',
          color: '#fff',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div
          style={{
            position: 'fixed', bottom: 80, left: 24, width: 300,
            background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, zIndex: 1000, overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            animation: 'feedbackIn 0.18s cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          <style>{`@keyframes feedbackIn{from{opacity:0;transform:translateY(8px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
          {/* Header */}
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)',
            fontSize: 13, fontWeight: 700, color: '#fff',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff0000', display: 'inline-block' }} />
            Share feedback
          </div>

          {submitted ? (
            <div style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Thanks!</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Your feedback helps improve YT Portal.</div>
            </div>
          ) : (
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Star rating */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rating</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', padding: 2,
                        color: n <= (hoverRating || rating) ? '#ff4444' : 'rgba(255,255,255,0.2)',
                        transition: 'color 100ms ease, transform 100ms ease',
                        transform: n <= (hoverRating || rating) ? 'scale(1.15)' : 'scale(1)',
                      }}
                      aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Type selector */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {TYPES.map(t => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      style={{
                        padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                        background: type === t ? 'rgba(255,0,0,0.2)' : 'rgba(255,255,255,0.08)',
                        border: `1px solid ${type === t ? 'rgba(255,68,68,0.5)' : 'rgba(255,255,255,0.12)'}`,
                        color: type === t ? '#ff6666' : 'rgba(255,255,255,0.6)',
                        transition: 'all 120ms ease',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</div>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={3}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 8, padding: '8px 10px', fontSize: 12, color: '#fff',
                    outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Optional email */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email (optional — for follow-up)"
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 8, padding: '7px 10px', fontSize: 12, color: '#fff',
                    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                  }}
                />
              </div>

              {error && (
                <div style={{ fontSize: 11, color: '#ff6666', background: 'rgba(255,0,0,0.1)', borderRadius: 6, padding: '6px 10px' }}>
                  {error}
                </div>
              )}

              <button
                onClick={submit}
                disabled={loading}
                style={{
                  background: '#ff0000', border: 'none', borderRadius: 8, padding: '9px 0',
                  fontSize: 13, fontWeight: 700, color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.65 : 1, width: '100%',
                  transition: 'opacity 150ms ease, transform 100ms ease',
                }}
                onMouseDown={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)' }}
                onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)' }}
              >
                {loading ? 'Sending…' : 'Send feedback'}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
