'use client'

import { useState } from 'react'
import { Copy, Download, Archive, Save, Check } from 'lucide-react'
import type { GeneratedProject } from '@/types'
import { saveProject } from '@/lib/storage'
import { exportZip, downloadBlob } from '@/lib/exportZip'

interface ExportPanelProps { project: GeneratedProject }

export default function ExportPanel({ project }: ExportPanelProps) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [zipping, setZipping] = useState(false)
  const [zipDone, setZipDone] = useState(false)

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

  const downloadZIP = async () => {
    setZipping(true)
    try {
      const blob = await exportZip(project)
      const slug = project.businessName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      downloadBlob(blob, `${slug}-sitepilot.zip`)
      setZipDone(true)
      setTimeout(() => setZipDone(false), 3000)
    } catch {
      // fallback: just download HTML
      downloadHTML()
    } finally {
      setZipping(false)
    }
  }

  const save = () => {
    saveProject({ ...project, status: 'exported' })
    setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const htmlSize = new Blob([project.html]).size
  const humanSize = htmlSize > 1024 * 1024 ? `${(htmlSize / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(htmlSize / 1024)} KB`

  const qualityScore = project.qualityCheck?.score

  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <h3 className="font-syne font-bold text-ink mb-1">Exporter le site</h3>
        <p className="text-sm text-muted">Votre site est prêt à être livré ou hébergé.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          ['Taille HTML', humanSize],
          ['Sections', String(project.sections.length)],
          ['Visuels', String(project.visuals?.length ?? 0)],
          ['Qualité', qualityScore ? `${qualityScore}/100` : '—'],
        ].map(([k, v]) => (
          <div key={k} className="bg-card border border-border rounded-xl p-3">
            <p className="text-[10px] text-muted">{k}</p>
            <p className="text-sm font-bold text-ink">{v}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {/* Copy HTML */}
        <button onClick={copyHTML} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            {copied ? <Check className="w-5 h-5 text-green" /> : <Copy className="w-5 h-5 text-primary-light" />}
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-ink text-sm">{copied ? 'Copié !' : 'Copier HTML'}</p>
            <p className="text-xs text-muted">Copiez le code dans votre presse-papier</p>
          </div>
        </button>

        {/* Download HTML */}
        <button onClick={downloadHTML} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-accent/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Download className="w-5 h-5 text-accent" />
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-ink text-sm">Télécharger HTML</p>
            <p className="text-xs text-muted">Fichier standalone, tout inline · {humanSize}</p>
          </div>
        </button>

        {/* Download ZIP */}
        <button
          onClick={() => void downloadZIP()}
          disabled={zipping}
          className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-violet/40 transition-all disabled:opacity-60"
        >
          <div className="w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center">
            {zipping ? (
              <div className="w-5 h-5 border-2 border-violet border-t-transparent rounded-full animate-spin" />
            ) : zipDone ? (
              <Check className="w-5 h-5 text-green" />
            ) : (
              <Archive className="w-5 h-5 text-violet" />
            )}
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-ink text-sm">
              {zipping ? 'Création du ZIP…' : zipDone ? 'ZIP téléchargé !' : 'Télécharger ZIP'}
            </p>
            <p className="text-xs text-muted">HTML + CSS + JS + config + message client</p>
          </div>
        </button>

        {/* Save */}
        <button onClick={save} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-green/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center">
            {saved ? <Check className="w-5 h-5 text-green" /> : <Save className="w-5 h-5 text-green" />}
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-ink text-sm">{saved ? 'Sauvegardé !' : 'Sauvegarder'}</p>
            <p className="text-xs text-muted">Stockage local — accessible depuis Projets</p>
          </div>
        </button>
      </div>

      <div className="p-3 bg-surface/60 border border-border rounded-xl">
        <p className="text-[10px] text-muted leading-relaxed">
          <strong className="text-ink">Hébergement :</strong> Glissez-déposez index.html sur{' '}
          <span className="text-primary-light">Netlify Drop</span>,{' '}
          <span className="text-primary-light">Vercel</span> ou uploadez via FTP sur{' '}
          <span className="text-primary-light">OVH / Hostinger</span>.
        </p>
      </div>
    </div>
  )
}
