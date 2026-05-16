'use client'

import { getComparison } from '@/lib/comparison'
import type { GeneratedProject } from '@/types'
import { cn } from '@/lib/utils'

interface ComparisonPanelProps {
  project: GeneratedProject
}

export default function ComparisonPanel({ project }: ComparisonPanelProps) {
  const points = getComparison(project.sector)

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <div className="max-w-3xl mx-auto">
        <div className="mb-5">
          <h2 className="font-syne font-bold text-lg text-ink mb-1">Avant / Après — {project.sector}</h2>
          <p className="text-xs text-muted">
            Comparaison de la présentation digitale type pour ce secteur, avant et après une maquette SitePilot.
          </p>
        </div>

        {/* Header row */}
        <div className="grid grid-cols-3 gap-3 mb-3 px-1">
          <div className="text-xs font-bold text-muted uppercase tracking-wider">Aspect</div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider">
            <span className="w-3 h-3 rounded-full bg-red-500/20 flex items-center justify-center text-[8px]">✕</span>
            Sans maquette
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-green uppercase tracking-wider">
            <span className="w-3 h-3 rounded-full bg-green/20 flex items-center justify-center text-[8px]">✓</span>
            Avec SitePilot
          </div>
        </div>

        {/* Points */}
        <div className="flex flex-col gap-2">
          {points.map((point, i) => (
            <div
              key={i}
              className={cn(
                'grid grid-cols-3 gap-3 p-3 rounded-xl border transition-all',
                'bg-card border-border hover:border-primary/20',
              )}
            >
              <div className="flex items-start">
                <span className="text-xs font-bold text-ink">{point.category}</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-red-400 text-xs mt-0.5 shrink-0">✕</span>
                <p className="text-xs text-muted leading-relaxed">{point.before}</p>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-green text-xs mt-0.5 shrink-0">✓</span>
                <p className="text-xs text-ink leading-relaxed">{point.after}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-muted mt-5 leading-relaxed text-center">
          Ces comparaisons sont indicatives. Les résultats dépendent de l&apos;offre, du commerce et de la mise en œuvre.
        </p>
      </div>
    </div>
  )
}
