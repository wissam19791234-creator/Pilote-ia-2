'use client'

import { cn } from '@/lib/utils'
import { Check, Loader2 } from 'lucide-react'

const STEPS = [
  'Analyse du commerce et du marché',
  'Détection du secteur et de la niche',
  'Création de l\'architecture UX',
  'Génération du copywriting persuasif',
  'Création du design system personnalisé',
  'Intégration des photos uploadées',
  'Ajout des automatisations IA',
  'Création du formulaire intelligent',
  'Génération du code HTML/CSS',
  'Optimisation mobile et responsive',
  'Préparation de l\'export et du message client',
]

interface LoadingStepsProps {
  currentStep: number
  progress: number
}

export default function LoadingSteps({ currentStep, progress }: LoadingStepsProps) {
  const remaining = Math.max(0, Math.round(((STEPS.length - currentStep) * 0.8)))

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-bold font-syne text-ink">Génération en cours...</p>
        <span className="text-xs text-muted">~{remaining}s restantes</span>
      </div>

      <div className="flex flex-col gap-2">
        {STEPS.map((step, i) => {
          const done = i < currentStep
          const active = i === currentStep
          return (
            <div
              key={i}
              className={cn(
                'flex items-center gap-3 text-sm transition-all duration-300',
                done ? 'text-green' : active ? 'text-orange font-semibold' : 'text-muted/50',
              )}
            >
              <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                {done ? (
                  <div className="w-5 h-5 rounded-full bg-green/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green" />
                  </div>
                ) : active ? (
                  <Loader2 className="w-4 h-4 text-orange animate-spin" />
                ) : (
                  <div className="w-3 h-3 rounded-full border-2 border-current" />
                )}
              </div>
              <span>{step}</span>
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-muted mb-1">
          <span>Progression</span>
          <span className="font-bold text-orange">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange to-rose rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
