'use client'

import { useState } from 'react'
import type { GeneratedProject, GeneratedVisual } from '@/types'
import { generateLocalVisuals } from '@/lib/imageGeneration'
import { canCurrentUserAccess } from '@/lib/featureAccess'
import { consumeCredits, canAfford } from '@/lib/credits'
import { Copy, Download, Wand2, Loader2, Lock, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageGalleryPreviewProps {
  project: GeneratedProject
}

interface AIImageResult {
  url: string
  prompt: string
  revisedPrompt?: string
}

function extractGradient(css: string): string {
  const m = /background:(linear-gradient[^;]+)/.exec(css)
  return m ? m[1].trim() : 'linear-gradient(135deg, #1a1a2e, #7c3aed)'
}

function VisualCard({
  visual,
  aiUrl,
  onGenerate,
  isGenerating,
  canUseAI,
}: {
  visual: GeneratedVisual
  aiUrl?: string
  onGenerate: (visual: GeneratedVisual) => void
  isGenerating: boolean
  canUseAI: boolean
}) {
  const [copied, setCopied] = useState(false)

  function copyPrompt() {
    void navigator.clipboard.writeText(visual.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden group">
      {/* Image area */}
      <div className="relative h-48 overflow-hidden">
        {aiUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={aiUrl} alt={visual.title} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: extractGradient(visual.cssPlaceholder) }}
          >
            <span className="text-3xl opacity-60">📸</span>
            <span className="text-xs text-white/60 font-semibold uppercase tracking-wider">{visual.title}</span>
          </div>
        )}

        {/* Overlay generate button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          {canUseAI ? (
            <button
              onClick={() => onGenerate(visual)}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-ink text-xs font-semibold hover:bg-white transition-all disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : aiUrl ? <RefreshCw className="w-3.5 h-3.5" /> : <Wand2 className="w-3.5 h-3.5" />}
              {aiUrl ? 'Regénérer' : 'Générer IA'}
            </button>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-muted text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              Pro requis
            </span>
          )}
        </div>

        {aiUrl && (
          <div className="absolute top-2 left-2">
            <span className="bg-green-500/90 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">✦ DALL-E 3</span>
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase">{visual.type}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-bold text-ink mb-1">{visual.title}</p>
        <p className="text-[10px] text-muted leading-relaxed line-clamp-2 mb-2">{visual.prompt}</p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={copyPrompt}
            className="flex items-center gap-1 text-[10px] text-muted hover:text-ink px-2 py-1 rounded-lg bg-surface-soft border border-border hover:border-primary/30 transition-all"
          >
            <Copy className="w-3 h-3" />
            {copied ? 'Copié !' : 'Copier prompt'}
          </button>
          {aiUrl && (
            <a
              href={aiUrl}
              download={`${visual.title}.jpg`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-green hover:text-green/80 px-2 py-1 rounded-lg bg-green/10 border border-green/20 transition-all"
            >
              <Download className="w-3 h-3" />
              Télécharger
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ImageGalleryPreview({ project }: ImageGalleryPreviewProps) {
  const visuals = project.visuals ?? generateLocalVisuals(project)
  const [aiImages, setAiImages] = useState<Record<string, AIImageResult>>({})
  const [generatingId, setGeneratingId] = useState<string | null>(null)
  const [generatingAll, setGeneratingAll] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canUseAI = canCurrentUserAccess('ai_images')

  async function generateOneImage(visual: GeneratedVisual) {
    if (!canUseAI || generatingId) return
    if (!canAfford('generate_ai_images')) {
      setError('Crédits insuffisants — générer une image coûte 4 crédits.')
      return
    }
    setError(null)
    setGeneratingId(visual.id)
    try {
      const res = await fetch('/api/generate-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompts: [visual.prompt] }),
      })
      const data = await res.json() as { images?: AIImageResult[]; error?: string }
      if (!res.ok || data.error) throw new Error(data.error ?? 'Erreur génération')
      if (data.images?.[0]?.url) {
        consumeCredits(4, 'generate_ai_images')
        setAiImages((prev) => ({ ...prev, [visual.id]: data.images![0] }))
        window.dispatchEvent(new Event('credits-updated'))
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue')
    } finally {
      setGeneratingId(null)
    }
  }

  async function generateAllImages() {
    if (!canUseAI || generatingAll) return
    if (!canAfford('generate_ai_images')) {
      setError('Crédits insuffisants — générer toutes les images coûte 4 crédits.')
      return
    }
    setError(null)
    setGeneratingAll(true)
    try {
      const res = await fetch('/api/generate-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sector: project.sector,
          businessName: project.businessName,
          city: project.city,
          style: project.style ?? 'moderne',
        }),
      })
      const data = await res.json() as { images?: AIImageResult[]; error?: string }
      if (!res.ok || data.error) throw new Error(data.error ?? 'Erreur génération')
      if (data.images) {
        consumeCredits(4, 'generate_ai_images')
        window.dispatchEvent(new Event('credits-updated'))
        // Map images to visuals by order
        const heroVisuals = visuals.filter((v) => v.type === 'hero')
        const galleryVisuals = visuals.filter((v) => v.type === 'gallery')
        const ordered = [...heroVisuals, ...galleryVisuals]
        const newImages: Record<string, AIImageResult> = {}
        data.images.forEach((img, i) => {
          if (ordered[i] && img.url) newImages[ordered[i].id] = img
        })
        setAiImages((prev) => ({ ...prev, ...newImages }))
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue')
    } finally {
      setGeneratingAll(false)
    }
  }

  const hero = visuals.filter((v) => v.type === 'hero')
  const gallery = visuals.filter((v) => v.type === 'gallery')
  const products = visuals.filter((v) => v.type === 'product')
  const aiCount = Object.keys(aiImages).length

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-syne font-bold text-lg text-ink mb-0.5">Visuels IA</h2>
            <p className="text-xs text-muted">
              {aiCount > 0 ? `${aiCount} image${aiCount > 1 ? 's' : ''} générée${aiCount > 1 ? 's' : ''} avec DALL-E 3` : 'Générez de vraies photos avec DALL-E 3 (OpenAI)'}
            </p>
          </div>
          {canUseAI ? (
            <button
              onClick={() => void generateAllImages()}
              disabled={generatingAll || !!generatingId}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all',
                'gradient-bg text-white shadow-primary hover:shadow-primary-hover hover:-translate-y-0.5',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
              )}
            >
              {generatingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              {generatingAll ? 'Génération…' : 'Tout générer · 4 crédits'}
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
              <Lock className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs font-bold text-primary">Images IA — Plan Pro</p>
                <a href="/pricing" className="text-[10px] text-primary/70 hover:text-primary underline">Débloquer →</a>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <span>⚠️</span> {error}
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">✕</button>
          </div>
        )}

        {!canUseAI && (
          <div className="mb-5 p-4 bg-gradient-to-r from-primary/5 to-pink/5 border border-primary/15 rounded-xl">
            <p className="text-sm font-bold text-ink mb-1">🎨 Générez de vraies photos avec DALL-E 3</p>
            <p className="text-xs text-muted leading-relaxed mb-3">
              Passez au plan Pro pour générer des photos professionnelles réalistes adaptées à votre secteur, directement intégrées dans le site.
            </p>
            <a href="/pricing" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-bg text-white text-xs font-bold shadow-primary hover:opacity-90">
              Passer au plan Pro — 39€/mois →
            </a>
          </div>
        )}

        {hero.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Hero</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {hero.map((v) => (
                <VisualCard
                  key={v.id}
                  visual={v}
                  aiUrl={aiImages[v.id]?.url}
                  onGenerate={(vis) => void generateOneImage(vis)}
                  isGenerating={generatingId === v.id}
                  canUseAI={canUseAI}
                />
              ))}
            </div>
          </div>
        )}

        {gallery.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Galerie</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((v) => (
                <VisualCard
                  key={v.id}
                  visual={v}
                  aiUrl={aiImages[v.id]?.url}
                  onGenerate={(vis) => void generateOneImage(vis)}
                  isGenerating={generatingId === v.id}
                  canUseAI={canUseAI}
                />
              ))}
            </div>
          </div>
        )}

        {products.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Produits</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((v) => (
                <VisualCard
                  key={v.id}
                  visual={v}
                  aiUrl={aiImages[v.id]?.url}
                  onGenerate={(vis) => void generateOneImage(vis)}
                  isGenerating={generatingId === v.id}
                  canUseAI={canUseAI}
                />
              ))}
            </div>
          </div>
        )}

        <div className="p-4 bg-surface-soft border border-border rounded-xl text-xs text-muted">
          <p className="font-semibold mb-1">ℹ️ Comment ça fonctionne</p>
          <p className="leading-relaxed">
            DALL-E 3 (OpenAI) génère des images réalistes adaptées à votre secteur. Les images sont directement téléchargeables.
            Ajoutez <code className="bg-border px-1 rounded">OPENAI_API_KEY</code> dans vos variables d&apos;environnement pour activer cette fonctionnalité.
          </p>
        </div>
      </div>
    </div>
  )
}
