import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion'
import type { DesignSystem } from '@/types'

interface ContactSceneProps {
  businessName: string
  ctaPrimary: string
  designSystem: DesignSystem
}

export function ContactScene({ businessName, ctaPrimary, designSystem }: ContactSceneProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const { palette } = designSystem

  const scale = spring({ frame, fps, config: { damping: 14, stiffness: 180 } })
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(135deg, ${palette.primary}dd, ${palette.secondary ?? palette.accent}dd)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'sans-serif', padding: '40px',
    }}>
      <div style={{ opacity, transform: `scale(${scale})`, textAlign: 'center' }}>
        <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px', fontWeight: '600' }}>
          {businessName}
        </p>
        <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#ffffff', marginBottom: '32px', lineHeight: 1.1 }}>
          {ctaPrimary || 'Nous contacter'}
        </h2>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          border: '2px solid rgba(255,255,255,0.5)',
          borderRadius: '100px',
          padding: '16px 40px',
          fontSize: '18px',
          fontWeight: '800',
          color: '#ffffff',
          display: 'inline-block',
        }}>
          Démo générée par SitePilot AI ✦
        </div>
      </div>
    </div>
  )
}
