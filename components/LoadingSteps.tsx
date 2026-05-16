import { Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  'Analyse du commerce et du marché',
  'Détection du secteur et de la niche',
  "Création de l'architecture UX",
  'Génération du copywriting persuasif',
  'Création du design system personnalisé',
  'Intégration des photos uploadées',
  'Ajout des automatisations IA',
  'Création du formulaire intelligent',
  'Génération du code HTML/CSS',
  'Optimisation mobile et responsive',
  "Préparation de l'export et du message client",
]

interface LoadingStepsProps {
  currentStep: number
  progress: number
  mode?: string
}

export default function LoadingSteps({ currentStep, progress, mode }: LoadingStepsProps) {
  const isAI = mode === 'ai' || !mode

  return (
    <div className="flex flex-col gap-3 p-5 flex-1 overflow-y-auto">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <p className="text-sm font-bold font-syne text-ink">
            {isAI ? '✦ Claude AI génère votre site' : 'Génération en cours'}
          </p>
        </div>
        <span className="text-xs text-muted">En cours…</span>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-1.5">
        {STEPS.map((step, i) => {
          const done = i < currentStep
          const active = i === currentStep
          return (
            <div
              key={i}
              className={cn(
                'flex items-center gap-3 text-xs transition-all duration-300 rounded-lg px-2 py-1.5',
                done ? 'text-green' :
                active ? 'text-primary-light bg-primary/10 border border-primary/20' :
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
                  <div className="w-2 h-2 rounded-full border border-current" />
                )}
              </div>
              <span className={cn('flex-1', active && 'font-semibold')}>{step}</span>
            </div>
          )
        })}
      </div>

      {/* Progress */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-muted mb-1.5">
          <span>Progression globale</span>
          <span className="font-bold text-primary-light">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full gradient-bg transition-all duration-500 shadow-glow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
