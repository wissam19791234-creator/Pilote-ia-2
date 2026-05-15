'use client'

import { useState } from 'react'
import { Copy, Download, Archive, Save, Check } from 'lucide-react'
import type { GeneratedProject } from '@/types'
import { saveProject } from '@/lib/storage'
import Badge from './Badge'

interface ExportPanelProps { project: GeneratedProject }

export default function ExportPanel({ project }: ExportPanelProps) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  const copyHTML = async () => {
    try {
      await navigator.clipboard.writeText(project.html)
      setCopied(true); setTimeout(() => setCopied(false), 2500)
    } catch { /* clipboard unavailable */ }
  }

  const downloadHTML = () => {
    const blob = new Blob([project.html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.businessName.toLowerCase().replace(/\s/g, '-')}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const save = () => {
    saveProject({ ...project, status: 'exported' })
    setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const htmlSize = new Blob([project.html]).size
  const humanSize = htmlSize > 1024 * 1024 ? `${(htmlSize / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(htmlSize / 1024)} KB`

  const actions = [
    { icon: copied ? Check : Copy, label: copied ? 'Copié !' : 'Copier HTML', sub: 'Copiez le code dans votre presse-papier', color: 'text-primary-light', bg: 'bg-primary/10', hover: 'hover:border-primary/40', onClick: copyHTML },
    { icon: Download, label: 'Télécharger HTML', sub: 'Fichier standalone, tout inline', color: 'text-accent', bg: 'bg-accent/10', hover: 'hover:border-accent/40', onClick: downloadHTML },
    { icon: saved ? Check : Save, label: saved ? 'Sauvegardé !' : 'Sauvegarder', sub: 'Stockage local — accessible depuis Projets', color: 'text-green', bg: 'bg-green/10', hover: 'hover:border-green/40', onClick: save },
  ]

  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <h3 className="font-syne font-bold text-ink mb-1">Exporter le site</h3>
        <p className="text-sm text-muted">Votre site est prêt à être livré ou hébergé.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[['Taille HTML', humanSize], ['Sections', String(project.sections.length)], ['Photos', String(project.photos.length)], ['Généré le', new Date(project.createdAt).toLocaleDateString('fr-FR')]].map(([k, v]) => (
          <div key={k} className="bg-card border border-border rounded-xl p-3">
            <p className="text-[10px] text-muted">{k}</p>
            <p className="text-sm font-bold text-ink">{v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {actions.map((a) => (
          <button key={a.label} onClick={a.onClick}
            className={`flex items-center gap-3 p-4 rounded-xl border border-border bg-card ${a.hover} transition-all`}>
            <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center`}>
              <a.icon className={`w-5 h-5 ${a.color}`} />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-ink text-sm">{a.label}</p>
              <p className="text-xs text-muted">{a.sub}</p>
            </div>
          </button>
        ))}

        <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50 opacity-50 cursor-not-allowed">
          <div className="w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center">
            <Archive className="w-5 h-5 text-violet" />
          </div>
          <div className="text-left flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-ink text-sm">Télécharger ZIP</p>
              <Badge variant="violet">Bientôt</Badge>
            </div>
            <p className="text-xs text-muted">HTML + CSS + JS séparés</p>
          </div>
        </div>
      </div>
    </div>
  )
}
