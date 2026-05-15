'use client'

import { useState } from 'react'
import { ExternalLink, Download, Trash2 } from 'lucide-react'
import type { GeneratedProject } from '@/types'
import Badge from './Badge'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: GeneratedProject
  onDelete?: (id: string) => void
  onExport?: (project: GeneratedProject) => void
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const d = Math.floor(diff / 86400000)
  if (d === 0) return 'aujourd\'hui'
  if (d === 1) return 'hier'
  if (d < 7) return `il y a ${d} jours`
  if (d < 30) return `il y a ${Math.floor(d / 7)} semaine${d >= 14 ? 's' : ''}`
  return `il y a ${Math.floor(d / 30)} mois`
}

const statusVariant = {
  draft: 'gray' as const,
  generated: 'green' as const,
  exported: 'blue' as const,
}

const sectorColors: Record<string, string> = {
  beauté: '#c9956a', restaurant: '#c0392b', événementiel: '#d4af37',
  automobile: '#e74c3c', mode: '#1a1a1a', luxe: '#d4af37',
  immobilier: '#2c3e50', coaching: '#4f8cff', médical: '#0284c7',
  fitness: '#f97316', hôtellerie: '#8b6914', 'e-commerce': '#ff5a1f',
  artisan: '#92400e', general: '#ff5a1f',
}

export default function ProjectCard({ project, onDelete, onExport }: ProjectCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const bgColor = sectorColors[project.sector] ?? '#ff5a1f'

  const downloadHTML = () => {
    const blob = new Blob([project.html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.businessName.toLowerCase().replace(/\s/g, '-')}.html`
    a.click()
    URL.revokeObjectURL(url)
    onExport?.(project)
  }

  return (
    <div className={cn('bg-white border border-border rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all')}>
      {/* Color thumbnail */}
      <div
        className="h-24 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${bgColor}22, ${bgColor}44)` }}
      >
        <div
          className="text-4xl font-bold font-syne opacity-30"
          style={{ color: bgColor }}
        >
          {project.businessName.slice(0, 2).toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-syne font-bold text-ink text-sm leading-tight">{project.businessName}</h3>
            <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
          </div>
          <p className="text-xs text-muted mt-0.5">{project.city} · {project.sector}</p>
          <p className="text-[10px] text-muted/60 mt-1">{timeAgo(project.createdAt)}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => window.open(`data:text/html,${encodeURIComponent(project.html)}`, '_blank')}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-orange/10 text-orange text-xs font-semibold hover:bg-orange/20 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Ouvrir
          </button>
          <button
            onClick={downloadHTML}
            className="p-2 rounded-xl border border-border text-muted hover:text-blue hover:border-blue transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
          {confirmDelete ? (
            <button
              onClick={() => { onDelete?.(project.id); setConfirmDelete(false) }}
              className="p-2 rounded-xl bg-red-500 text-white"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              onBlur={() => setTimeout(() => setConfirmDelete(false), 200)}
              className="p-2 rounded-xl border border-border text-muted hover:text-red-500 hover:border-red-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
