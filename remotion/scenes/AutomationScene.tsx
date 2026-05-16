import { useCurrentFrame, interpolate } from 'remotion'
import type { DesignSystem } from '@/types'

interface AutomationSceneProps {
  automations: string[]
  designSystem: DesignSystem
}

const ICONS = ['📋', '💬', '📧', '📅', '💳', '📊']

export function AutomationScene({ automations, designSystem }: AutomationSceneProps) {
  const frame = useCurrentFrame()
  const { palette } = designSystem

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(135deg, ${palette.background}, ${palette.surface})`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'sans-serif', padding: '40px',
    }}>
      <div style={{
        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
        background: `${palette.accent}20`,
        border: `1px solid ${palette.accent}40`,
        borderRadius: '100px',
        padding: '8px 20px',
        marginBottom: '24px',
        fontSize: '14px',
        color: palette.accent,
        fontWeight: '700',
      }}>
        🤖 Automatisations incluses
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '600px' }}>
        {automations.slice(0, 4).map((auto, i) => {
          const opacity = interpolate(frame, [i * 8, i * 8 + 20], [0, 1], { extrapolateRight: 'clamp' })
          const x = interpolate(frame, [i * 8, i * 8 + 20], [-40, 0], { extrapolateRight: 'clamp' })
          return (
            <div key={i} style={{
              opacity,
              transform: `translateX(${x}px)`,
              display: 'flex', alignItems: 'center', gap: '16px',
              background: `${palette.surface}cc`,
              border: `1px solid ${palette.primary}20`,
              borderRadius: '12px',
              padding: '14px 20px',
            }}>
              <span style={{ fontSize: '24px' }}>{ICONS[i] ?? '✦'}</span>
              <span style={{ fontSize: '16px', fontWeight: '600', color: palette.text }}>{auto}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
