'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Zap, ImageIcon, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLACEHOLDERS = [
  'Institut beauté premium à Paris, style luxe, réservation en ligne…',
  'Restaurant gastronomique à Lyon avec réservation…',
  'Boutique parfum luxe avec vente en ligne…',
  'Coach sportif à Bordeaux avec devis automatique…',
  'Salon massage bien-être à Nice, zen et naturel…',
  'Agence événementielle mariage à Marseille, haut de gamme…',
  'Garage automobile à Toulouse, détailing et entretien…',
]

const SUGGESTIONS = [
  'Beauté premium Paris',
  'Restaurant Lyon',
  'Parfum luxe online',
  'Coach sportif RDV',
  'Massage bien-être',
  'Événementiel mariage',
  'Garage automobile',
  'E-commerce cosméto',
]

interface PromptComposerProps {
  onGenerate: (prompt: string) => void
  onPhotoClick: () => void
  isGenerating: boolean
  photoCount: number
}

export default function PromptComposer({ onGenerate, onPhotoClick, isGenerating, photoCount }: PromptComposerProps) {
  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const iv = setInterval(() => {
      setPlaceholder(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)])
    }, 3500)
    return () => clearInterval(iv)
  }, [])

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || isGenerating) return
    onGenerate(trimmed)
    setValue('')
  }, [value, isGenerating, onGenerate])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col gap-2.5 p-3 border-t border-border bg-[#0a0a14]">
      {/* Suggestions */}
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setValue(s); textareaRef.current?.focus() }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs font-medium hover:bg-primary/20 transition-colors"
          >
            <ChevronRight className="w-3 h-3" />
            {s}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 500))}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          disabled={isGenerating}
          className={cn(
            'w-full resize-none rounded-xl border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/50',
            'focus:outline-none focus:border-primary/50 transition-colors',
            'disabled:opacity-50',
            'border-border',
          )}
          style={{ minHeight: '72px', maxHeight: '130px' }}
        />
        <span className="absolute bottom-2 right-3 text-[10px] text-muted/40 font-mono">
          {value.length}/500
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onPhotoClick}
          className={cn(
            'flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm transition-all',
            photoCount > 0
              ? 'border-primary/40 text-primary-light bg-primary/10'
              : 'border-border text-muted hover:border-primary/40 hover:text-ink',
          )}
        >
          <ImageIcon className="w-4 h-4" />
          {photoCount > 0 ? `${photoCount} photo${photoCount > 1 ? 's' : ''}` : 'Photos'}
        </button>

        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isGenerating}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl',
            'gradient-bg text-white font-syne font-bold text-sm',
            'shadow-primary hover:shadow-primary-hover hover:-translate-y-0.5 transition-all',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none',
          )}
        >
          <Zap className="w-4 h-4" />
          {isGenerating ? 'Génération…' : 'Générer avec IA'}
        </button>
      </div>

      <p className="text-[10px] text-muted/40 text-center">
        Ctrl+Entrée pour générer · Propulsé par Claude AI
      </p>
    </div>
  )
}
