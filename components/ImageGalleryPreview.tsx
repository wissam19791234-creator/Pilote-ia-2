'use client'

import { useState } from 'react'
import type { GeneratedProject, GeneratedVisual } from '@/types'
import { generateLocalVisuals } from '@/lib/imageGeneration'
import { Copy, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageGalleryPreviewProps {
  project: GeneratedProject
}

function VisualCard({ visual }: { visual: GeneratedVisual }) {
  const [copied, setCopied] = useState(false)

  function copyPrompt() {
    void navigator.clipboard.writeText(visual.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden group">
      {/* Placeholder */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-2"
          style={{ background: extractGradient(visual.cssPlaceholder) }}
        >
          <span className="text-4xl">{extractEmoji(visual.cssPlaceholder)}</span>
          <span className="text-xs text-white/60 font-semibold uppercase tracking-wider">{visual.title}</span>
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase">
            {visual.type}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-bold text-ink mb-1">{visual.title}</p>
        <p className="text-[10px] text-muted leading-relaxed line-clamp-2 mb-2">{visual.prompt}</p>
        <div className="flex gap-2">
          <button
            onClick={copyPrompt}
            className="flex items-center gap-1 text-[10px] text-muted hover:text-ink px-2 py-1 rounded-lg bg-surface border border-border hover:border-primary/30 transition-all"
          >
            <Copy className="w-3 h-3" />
            {copied ? 'Copié !' : 'Copier prompt'}
          </button>
          <span className={cn(
            'text-[10px] px-2 py-1 rounded-full font-semibold border',
            visual.type === 'hero' ? 'border-primary/30 text-primary-light bg-primary/10' :
            visual.type === 'product' ? 'border-green/30 text-green bg-green/10' :
            'border-border text-muted',
          )}>
            {visual.type}
          </span>
        </div>
      </div>
    </div>
  )
}

function extractGradient(css: string): string {
  const m = /background:(linear-gradient[^;]+)/.exec(css)
  return m ? m[1].trim() : 'linear-gradient(135deg, #1a1a2e, #7c3aed)'
}

function extractEmoji(css: string): string {
  const m = />([^<]{1,4})<\/div>\s*<div style="color/.exec(css)
  return m ? m[1].trim() : '📸'
}

export default function ImageGalleryPreview({ project }: ImageGalleryPreviewProps) {
  const visuals = project.visuals ?? generateLocalVisuals(project)
  const hero = visuals.filter((v) => v.type === 'hero')
  const gallery = visuals.filter((v) => v.type === 'gallery')
  const products = visuals.filter((v) => v.type === 'product')

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-5">
          <h2 className="font-syne font-bold text-lg text-ink mb-1">Visuels générés</h2>
          <p className="text-xs text-muted">
            Placeholders premium et prompts image pour chaque section. Copiez les prompts pour générer avec Midjourney ou DALL·E.
          </p>
        </div>

        {hero.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Hero</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {hero.map((v) => <VisualCard key={v.id} visual={v} />)}
            </div>
          </div>
        )}

        {gallery.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Galerie</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((v) => <VisualCard key={v.id} visual={v} />)}
            </div>
          </div>
        )}

        {products.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Produits</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((v) => <VisualCard key={v.id} visual={v} />)}
            </div>
          </div>
        )}

        <div className="p-4 bg-primary/5 border border-primary/15 rounded-xl">
          <p className="text-xs font-bold text-primary-light mb-1">💡 Générer de vraies images</p>
          <p className="text-xs text-muted leading-relaxed">
            Copiez les prompts ci-dessus et collez-les dans Midjourney, DALL·E 3 ou Stable Diffusion.
            Uploadez les images générées dans le Studio pour les intégrer dans le site.
          </p>
        </div>
      </div>
    </div>
  )
}
