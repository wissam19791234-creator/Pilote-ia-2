import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'
import type { DesignSystem } from '@/types'

interface HeroSceneProps {
  businessName: string
  sector: string
  city: string
  heroTitle: string
  heroSubtitle: string
  designSystem: DesignSystem
}

export function HeroScene({ businessName, sector, city, heroTitle, heroSubtitle, designSystem }: HeroSceneProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const { palette } = designSystem

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })
  const titleY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: 'clamp' })
  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' })
  const badgeScale = spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 200 } })

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, ${palette.background}, ${palette.surface})`,
      fontFamily: 'sans-serif', padding: '40px',
    }}>
      {/* Badge */}
      <div style={{
        transform: `scale(${badgeScale})`,
        background: `${palette.primary}20`,
        border: `1px solid ${palette.primary}50`,
        borderRadius: '100px',
        padding: '8px 20px',
        marginBottom: '24px',
        fontSize: '14px',
        color: palette.primary,
        fontWeight: '700',
      }}>
        ✦ {sector} · {city}
      </div>

      {/* Business name */}
      <h1 style={{
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        fontSize: '52px',
        fontWeight: '900',
        color: palette.text,
        textAlign: 'center',
        marginBottom: '16px',
        lineHeight: 1.1,
      }}>
        {businessName}
      </h1>

      {/* Hero title */}
      <p style={{
        opacity: titleOpacity,
        fontSize: '24px',
        fontWeight: '700',
        color: palette.primary,
        textAlign: 'center',
        marginBottom: '12px',
      }}>
        {heroTitle}
      </p>

      {/* Subtitle */}
      <p style={{
        opacity: subtitleOpacity,
        fontSize: '16px',
        color: palette.muted,
        textAlign: 'center',
        maxWidth: '600px',
      }}>
        {heroSubtitle}
      </p>
    </div>
  )
}
