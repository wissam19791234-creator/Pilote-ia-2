'use client'

import { useState } from 'react'
import { Copy, Download, Archive, Save, Check } from 'lucide-react'
import type { GeneratedProject } from '@/types'
import { saveProject } from '@/lib/storage'
import Badge from './Badge'

interface ExportPanelProps {
  project: GeneratedProject
}

export default function ExportPanel({ project }: ExportPanelProps) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  const copyHTML = async () => {
    try {
      await navigator.clipboard.writeText(project.html)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // clipboard unavailable
    }
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
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const htmlSize = new Blob([project.html]).size
  const humanSize = htmlSize > 1024 * 1024
    ? `${(htmlSize / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(htmlSize / 1024)} KB`

  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <h3 className="font-syne font-bold text-ink mb-1">Exporter le site</h3>
        <p className="text-sm text-muted">Votre site est prêt à être livré ou hébergé.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          ['Taille HTML', humanSize],
          ['Sections', project.sections.length.toString()],
          ['Photos', project.photos.length.toString()],
          ['Généré le', new Date(project.createdAt).toLocaleDateString('fr-FR')],
        ].map(([k, v]) => (
          <div key={k} className="bg-surface border border-border rounded-xl p-3">
            <p className="text-[10px] text-muted">{k}</p>
            <p className="text-sm font-bold text-ink">{v}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={copyHTML}
          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-white hover:border-orange hover:bg-orange/5 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center">
            {copied ? <Check className="w-5 h-5 text-green" /> : <Copy className="w-5 h-5 text-orange" />}
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-ink text-sm">{copied ? 'Copié !' : 'Copier HTML'}</p>
            <p className="text-xs text-muted">Copiez le code dans votre presse-papier</p>
          </div>
        </button>

        <button
          onClick={downloadHTML}
          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-white hover:border-blue hover:bg-blue/5 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
            <Download className="w-5 h-5 text-blue" />
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-ink text-sm">Télécharger HTML</p>
            <p className="text-xs text-muted">Fichier standalone, tout inline</p>
          </div>
        </button>

        <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-gray-50 opacity-60 cursor-not-allowed">
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

        <button
          onClick={save}
          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-white hover:border-green hover:bg-green/5 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center">
            {saved ? <Check className="w-5 h-5 text-green" /> : <Save className="w-5 h-5 text-green" />}
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-ink text-sm">{saved ? 'Sauvegardé !' : 'Sauvegarder le projet'}</p>
            <p className="text-xs text-muted">Stockage local, accessible depuis Projets</p>
          </div>
        </button>
      </div>
    </div>
  )
}
