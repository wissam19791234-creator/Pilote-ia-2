'use client'

import { useEffect, useState } from 'react'
import { Check, Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  { label: 'Analyse du brief et du marché', duration: 8 },
  { label: 'Détection du secteur et de la niche', duration: 6 },
  { label: 'Création d\'une DA unique pour ce commerce', duration: 12 },
  { label: 'Génération du copywriting persuasif', duration: 16 },
  { label: 'Choix du layout et de la structure', duration: 10 },
  { label: 'Création du design system personnalisé', duration: 14 },
  { label: 'Intégration des visuels et des photos', duration: 10 },
  { label: 'Génération du code HTML / CSS premium', duration: 20 },
  { label: 'Ajout des animations et effets 3D', duration: 10 },
  { label: 'Préparation des automatisations IA', duration: 12 },
  { label: 'Génération de la vidéo démo', duration: 16 },
  { label: 'Contrôle qualité et optimisation mobile', duration: 10 },
  { label: 'Préparation de l\'export ZIP + message client', duration: 8 },
]

// Total "realistic" display duration in seconds — steps animate regardless of actual API speed
const REALISTIC_DURATION = 150 // 2m30 default

interface LoadingStepsProps {
  currentStep: number
  progress: number
  mode?: string
  estimatedSeconds?: number
}

export default function LoadingSteps({ currentStep, progress, mode, estimatedSeconds = REALISTIC_DURATION }: LoadingStepsProps) {
  const [displayStep, setDisplayStep] = useState(0)
  const [displayProgress, setDisplayProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [startTime] = useState(Date.now())

  // Animate steps independently of actual API progress for "realistic" feel
  useEffect(() => {
    let accum = 0
    const thresholds = STEPS.map((s) => {
      accum += s.duration
      return accum
    })
    const total = thresholds[thresholds.length - 1]

    const interval = setInterval(() => {
      const now = Date.now()
      const sec = Math.floor((now - startTime) / 1000)
      setElapsed(sec)

      // Map elapsed seconds to a step — slow, dramatic
      const pct = Math.min(sec / estimatedSeconds, 0.95)
      const stepIdx = thresholds.findIndex((t) => (t / total) > pct)
      setDisplayStep(stepIdx === -1 ? STEPS.length - 1 : stepIdx)
      setDisplayProgress(Math.round(pct * 100))
    }, 500)

    return () => clearInterval(interval)
  }, [startTime, estimatedSeconds])

  // Once real generation is done, jump to 100%
  const showFinal = progress >= 100
  const activeStep = showFinal ? STEPS.length : displayStep
  const activeProgress = showFinal ? 100 : displayProgress

  const remaining = Math.max(0, estimatedSeconds - elapsed)
  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60

  return (
    <div className="flex flex-col gap-3 p-5 flex-1 overflow-y-auto bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <p className="text-sm font-bold font-syne text-ink">
            Site premium en création…
          </p>
        </div>
        <span className="text-xs text-muted tabular-nums">
          {showFinal ? '✓ Prêt' : mins > 0 ? `~${mins}m${secs}s` : `~${secs}s`}
        </span>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-1">
        {STEPS.map((step, i) => {
          const done = i < activeStep
          const active = i === activeStep
          return (
            <div
              key={i}
              className={cn(
                'flex items-center gap-3 text-xs transition-all duration-500 rounded-xl px-3 py-2',
                done ? 'text-green bg-green/5' :
                active ? 'text-primary bg-primary/8 border border-primary/20 shadow-sm' :
                'text-muted/40',
              )}
            >
              <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                {done ? (
                  <div className="w-4 h-4 rounded-full bg-green/20 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-green" />
                  </div>
                ) : active ? (
                  <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                ) : (
                  <div className="w-2 h-2 rounded-full border border-current opacity-40" />
                )}
              </div>
              <span className={cn('flex-1', active && 'font-semibold')}>{step.label}</span>
              {done && <span className="text-[10px] text-green/60">✓</span>}
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-muted mb-1.5">
          <span>Progression</span>
          <span className="font-bold text-primary tabular-nums">{activeProgress}%</span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full gradient-bg transition-all duration-1000"
            style={{ width: `${activeProgress}%`, boxShadow: '0 0 8px rgba(139,92,246,0.4)' }}
          />
        </div>
        {!showFinal && (
          <p className="text-[10px] text-muted mt-2 text-center">
            Un site premium demande un peu plus de temps — ça vaut le résultat.
          </p>
        )}
      </div>
    </div>
  )
}
