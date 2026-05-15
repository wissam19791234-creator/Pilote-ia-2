'use client'

import { useState, useRef, useEffect } from 'react'
import { Monitor, Smartphone, ZoomIn, ZoomOut, RefreshCw, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SitePreviewProps {
  html: string | null
  isGenerating?: boolean
}

type ZoomLevel = 50 | 75 | 100

export default function SitePreview({ html, isGenerating }: SitePreviewProps) {
  const [zoom, setZoom] = useState<ZoomLevel>(75)
  const [mobile, setMobile] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    setLoaded(false)
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [html])

  const openInTab = () => {
    if (!html) return
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }

  if (isGenerating) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-glow animate-glow-pulse">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <p className="font-syne font-bold text-ink">Génération en cours…</p>
          <p className="text-sm text-muted mt-1">Votre maquette apparaîtra ici</p>
          <div className="mt-4 flex gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!html) {
    return (
      <div className="flex-1 flex items-center justify-center bg-surface border-2 border-dashed border-border">
        <div className="text-center max-w-xs px-4">
          <div className="text-5xl mb-4">✨</div>
          <p className="font-syne font-bold text-ink text-lg mb-2">Preview du site</p>
          <p className="text-sm text-muted leading-relaxed">
            Décris un commerce dans le chat et clique sur Générer pour voir votre site ici.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 opacity-30">
            {['Beauté', 'Restaurant', 'Coaching'].map((s) => (
              <div key={s} className="h-16 rounded-xl bg-primary/20 flex items-center justify-center text-xs text-muted">{s}</div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Browser toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-card border-b border-border">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow/70" />
          <div className="w-3 h-3 rounded-full bg-green/70" />
        </div>
        <div className="flex-1 bg-surface rounded-md px-3 py-1 text-xs text-muted border border-border truncate">
          preview.sitepilot.ai/mon-site
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setMobile(false)}
            className={cn('p-1.5 rounded-lg transition-colors', !mobile ? 'bg-primary/20 text-primary-light' : 'text-muted hover:text-ink')}
            title="Desktop"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobile(true)}
            className={cn('p-1.5 rounded-lg transition-colors', mobile ? 'bg-primary/20 text-primary-light' : 'text-muted hover:text-ink')}
            title="Mobile"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-border mx-1" />
          <button
            onClick={() => setZoom((z) => Math.max(50, z - 25) as ZoomLevel)}
            disabled={zoom === 50}
            className="p-1.5 rounded-lg text-muted hover:text-ink disabled:opacity-30 transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs text-muted w-8 text-center font-mono">{zoom}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(100, z + 25) as ZoomLevel)}
            disabled={zoom === 100}
            className="p-1.5 rounded-lg text-muted hover:text-ink disabled:opacity-30 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => { setLoaded(false); setTimeout(() => setLoaded(true), 50) }} className="p-1.5 rounded-lg text-muted hover:text-ink transition-colors" title="Rafraîchir">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button onClick={openInTab} className="p-1.5 rounded-lg text-muted hover:text-ink transition-colors" title="Ouvrir dans un onglet">
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-auto bg-[#050508] p-4 flex items-start justify-center">
        <div
          style={{
            width: mobile ? `${390 / (zoom / 100)}px` : '100%',
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            marginBottom: zoom < 100 ? `-${(100 - zoom) * 8}px` : 0,
          }}
          className={cn(
            'bg-white shadow-2xl overflow-hidden',
            mobile ? 'rounded-[2rem] mx-auto' : 'rounded-b-xl',
          )}
        >
          {loaded && (
            <iframe
              ref={iframeRef}
              srcDoc={html}
              title="Aperçu du site généré"
              className="w-full border-none block"
              style={{ height: '900px' }}
              sandbox="allow-scripts allow-same-origin"
              onLoad={() => setLoaded(true)}
            />
          )}
          {!loaded && (
            <div className="w-full h-[900px] shimmer" />
          )}
        </div>
      </div>
    </div>
  )
}
