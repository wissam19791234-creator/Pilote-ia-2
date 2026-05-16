'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import type { GeneratedProject } from '@/types'
import { Play, Download, AlertTriangle } from 'lucide-react'

// Dynamic import to avoid SSR issues with Remotion
const PlayerComponent = dynamic(() => import('./RemotionPlayer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-card rounded-xl">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-muted">Chargement du lecteur vidéo…</p>
      </div>
    </div>
  ),
})

interface VideoDemoPanelProps {
  project: GeneratedProject
}

export default function VideoDemoPanel({ project }: VideoDemoPanelProps) {
  const [hasRemotionError, setHasRemotionError] = useState(false)

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <div className="max-w-3xl mx-auto">
        <div className="mb-5">
          <h2 className="font-syne font-bold text-lg text-ink mb-1">Vidéo démo client</h2>
          <p className="text-xs text-muted">
            Aperçu vidéo de 12 secondes présentant le site généré. À envoyer au commerce pour présenter la maquette.
          </p>
        </div>

        {/* Player */}
        <div className="aspect-video w-full bg-card border border-border rounded-2xl overflow-hidden mb-5">
          {hasRemotionError ? (
            <FallbackPreview project={project} />
          ) : (
            <PlayerComponent
              project={project}
              onError={() => setHasRemotionError(true)}
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-muted text-xs font-semibold">
            <Download className="w-4 h-4" />
            Export MP4 — bientôt disponible
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/15 text-primary-light text-xs font-semibold">
            <Play className="w-4 h-4" />
            Aperçu dans le navigateur disponible
          </div>
        </div>

        <p className="text-[10px] text-muted mt-4 leading-relaxed">
          La vidéo est générée avec Remotion et adaptée aux couleurs du design system du site. L&apos;export MP4 nécessite une configuration serveur supplémentaire.
        </p>
      </div>
    </div>
  )
}

function FallbackPreview({ project }: { project: GeneratedProject }) {
  const { palette } = project.designSystem
  const automations = project.automationSales?.options.slice(0, 3).map((o) => o.name) ?? ['Devis automatique', 'WhatsApp', 'Relances']

  return (
    <div className="w-full h-full flex flex-col" style={{ background: `linear-gradient(135deg, ${palette.background}, ${palette.surface})` }}>
      {/* Simulated slides */}
      <div className="flex-1 flex items-center justify-center p-8 text-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4"
            style={{ background: `${palette.primary}20`, color: palette.primary, border: `1px solid ${palette.primary}40` }}>
            ✦ {project.sector} · {project.city}
          </div>
          <h2 className="font-bold text-3xl mb-2" style={{ color: palette.text }}>{project.businessName}</h2>
          <p className="text-sm mb-4" style={{ color: palette.muted }}>{project.copywriting.heroTitle || 'Maquette générée par SitePilot AI'}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {automations.map((a, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full font-semibold"
                style={{ background: `${palette.accent}20`, color: palette.accent, border: `1px solid ${palette.accent}40` }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="px-6 pb-4 flex items-center justify-between">
        <span className="text-xs" style={{ color: palette.muted }}>Démo — SitePilot AI</span>
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3 text-yellow-400" />
          <span className="text-xs text-yellow-400">Lecteur Remotion non disponible — affichage fallback</span>
        </div>
      </div>
    </div>
  )
}
