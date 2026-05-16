'use client'

import { useState } from 'react'
import { Copy, Check, TrendingUp } from 'lucide-react'
import { getComparison } from '@/lib/comparison'
import type { GeneratedProject } from '@/types'

interface ComparisonPanelProps {
  project: GeneratedProject
}

export default function ComparisonPanel({ project }: ComparisonPanelProps) {
  const [copied, setCopied] = useState(false)
  const data = getComparison(project.sector)

  const copyForProspect = () => {
    const lines = [
      `${data.headline}`,
      '',
      `❌ ${data.competitorLabel}  vs  ✅ ${project.businessName}`,
      '',
      ...data.points.map((p) => `${p.category} :\n  ❌ ${p.competitor}\n  ✅ ${p.yours}`),
      '',
      `→ Réservez / Contactez : [votre lien]`,
    ]
    void navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a0a14] border-b border-border px-5 py-4">
        <div className="flex items-start justify-between gap-4 max-w-3xl mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-primary-light" />
              <h2 className="font-syne font-bold text-sm text-primary-light uppercase tracking-wider">Argument de vente</h2>
            </div>
            <p className="font-syne font-bold text-lg text-ink leading-snug">{data.headline}</p>
            <p className="text-xs text-muted mt-1">Montrez cette comparaison à vos prospects pour les convaincre de vous choisir</p>
          </div>
          <button
            onClick={copyForProspect}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card hover:border-primary/40 transition-all text-xs font-medium text-muted hover:text-ink"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copié !' : 'Copier'}
          </button>
        </div>
      </div>

      <div className="p-5 max-w-3xl mx-auto">
        {/* Versus header */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 mb-4 items-center">
          {/* Competitor */}
          <div className="bg-red-950/30 border border-red-900/40 rounded-2xl p-4 text-center">
            <div className="text-3xl mb-2">{data.competitorEmoji}</div>
            <p className="text-xs font-bold text-red-400 leading-tight">{data.competitorLabel}</p>
          </div>

          {/* VS badge */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center">
              <span className="text-xs font-black text-muted">VS</span>
            </div>
          </div>

          {/* Your business */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 text-center">
            <div className="text-3xl mb-2">{data.yourEmoji}</div>
            <p className="text-xs font-bold text-primary-light leading-tight">{project.businessName}</p>
          </div>
        </div>

        {/* Comparison points */}
        <div className="flex flex-col gap-3">
          {data.points.map((point, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-border">
              {/* Category bar */}
              <div className="bg-card px-4 py-2 border-b border-border">
                <span className="text-xs font-black text-ink uppercase tracking-wider">{point.category}</span>
              </div>

              <div className="grid grid-cols-2 divide-x divide-border">
                {/* Competitor side */}
                <div className="p-4 bg-red-950/10">
                  <div className="flex gap-2">
                    <span className="text-red-400 text-sm shrink-0 mt-0.5">✕</span>
                    <p className="text-xs text-red-300/80 leading-relaxed">{point.competitor}</p>
                  </div>
                </div>

                {/* Your side */}
                <div className="p-4 bg-primary/5">
                  <div className="flex gap-2">
                    <span className="text-green text-sm shrink-0 mt-0.5">✓</span>
                    <p className="text-xs text-ink leading-relaxed font-medium">{point.yours}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary/20 to-violet/10 border border-primary/30 p-5 text-center">
          <p className="text-sm font-bold text-ink mb-1">Utilisez cette comparaison partout</p>
          <p className="text-xs text-muted mb-4">Réseaux sociaux, WhatsApp prospects, email de relance, story Instagram</p>
          <button
            onClick={copyForProspect}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-glow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Comparaison copiée !' : 'Copier la comparaison'}
          </button>
        </div>

        <p className="text-[10px] text-muted mt-4 leading-relaxed text-center">
          Comparaison à titre indicatif. Les résultats varient selon le commerce, l&apos;offre et la mise en œuvre.
        </p>
      </div>
    </div>
  )
}
