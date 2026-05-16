import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion'
import type { DesignSystem } from '@/types'

interface ServicesSceneProps {
  services: string[]
  sector: string
  designSystem: DesignSystem
}

export function ServicesScene({ services, sector, designSystem }: ServicesSceneProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const { palette } = designSystem

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(135deg, ${palette.surface}, ${palette.background})`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'sans-serif', padding: '40px',
    }}>
      <h2 style={{ opacity: titleOpacity, fontSize: '36px', fontWeight: '800', color: palette.text, marginBottom: '40px' }}>
        Nos services
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', maxWidth: '800px' }}>
        {services.slice(0, 6).map((service, i) => {
          const cardOpacity = interpolate(frame, [i * 5, i * 5 + 20], [0, 1], { extrapolateRight: 'clamp' })
          const cardScale = spring({ frame: frame - i * 5, fps, config: { damping: 14, stiffness: 180 } })
          return (
            <div key={i} style={{
              opacity: cardOpacity,
              transform: `scale(${cardScale})`,
              background: `${palette.primary}15`,
              border: `1px solid ${palette.primary}30`,
              borderRadius: '16px',
              padding: '20px 28px',
              fontSize: '18px',
              fontWeight: '700',
              color: palette.text,
            }}>
              {service}
            </div>
          )
        })}
      </div>
    </div>
  )
}
