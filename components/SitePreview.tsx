'use client'

import { useState } from 'react'
import { Monitor, Smartphone, ZoomIn, ZoomOut } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SitePreviewProps {
  html: string | null
  isGenerating?: boolean
}

const ZOOM_LEVELS = [50, 75, 100] as const
type ZoomLevel = typeof ZOOM_LEVELS[number]

export default function SitePreview({ html, isGenerating }: SitePreviewProps) {
  const [zoom, setZoom] = useState<ZoomLevel>(75)
  const [mobile, setMobile] = useState(false)

  if (isGenerating) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface rounded-2xl">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <p className="font-syne font-bold text-ink">Génération du site...</p>
          <p className="text-sm text-muted mt-1">Votre maquette apparaîtra ici</p>
        </div>
      </div>
    )
  }

  if (!html) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface rounded-2xl border-2 border-dashed border-border">
        <div className="text-center max-w-xs">
          <div className="text-5xl mb-4">✨</div>
          <p className="font-syne font-bold text-ink text-lg mb-2">Génère un site pour voir la preview</p>
          <p className="text-sm text-muted">
            Décris un commerce dans le chat, ajoute des photos et clique sur Générer.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Browser toolbar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-100 border-b border-border rounded-t-xl">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow" />
          <div className="w-3 h-3 rounded-full bg-green" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-muted border border-border truncate">
          preview.sitepilot.ai/mon-site
        </div>
        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMobile(false)}
            className={cn('p-1.5 rounded-lg transition-colors', !mobile ? 'bg-white text-orange' : 'text-muted hover:bg-white')}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobile(true)}
            className={cn('p-1.5 rounded-lg transition-colors', mobile ? 'bg-white text-orange' : 'text-muted hover:bg-white')}
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-border mx-1" />
          <button
            onClick={() => setZoom((z) => Math.max(50, z - 25) as ZoomLevel)}
            className="p-1.5 rounded-lg text-muted hover:bg-white transition-colors"
            disabled={zoom === 50}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-muted w-8 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(100, z + 25) as ZoomLevel)}
            className="p-1.5 rounded-lg text-muted hover:bg-white transition-colors"
            disabled={zoom === 100}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview frame */}
      <div className="flex-1 overflow-auto bg-gray-200 p-4 flex items-start justify-center">
        <div
          style={{
            width: mobile ? `${320 / (zoom / 100)}px` : '100%',
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
          }}
          className={cn('bg-white shadow-2xl', mobile ? 'rounded-3xl overflow-hidden mx-auto' : 'rounded-b-xl')}
        >
          <iframe
            srcDoc={html}
            title="Site preview"
            className="w-full border-none"
            style={{ height: '800px' }}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  )
}
