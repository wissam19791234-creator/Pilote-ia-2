'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Zap, ImageIcon, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLACEHOLDERS = [
  'Ex: Institut beauté premium à Paris avec réservation en ligne...',
  'Ex: Restaurant gastronomique à Lyon avec réservation...',
  'Ex: Boutique parfum luxe avec vente en ligne...',
  'Ex: Coach sportif à Bordeaux avec devis automatique...',
  'Ex: Salon massage bien-être à Nice, style zen...',
  'Ex: Agence événementielle mariage à Marseille...',
]

const SUGGESTIONS = [
  'Site beauté premium à Paris',
  'Restaurant chaleureux à Lyon',
  'Boutique parfum luxe',
  'Institut massage bien-être',
  'Coach sportif avec réservation',
  'Événementiel avec devis auto',
  'Garage automobile moderne',
  'Boutique Shopify cosmétique',
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
    const interval = setInterval(() => {
      setPlaceholder(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed || isGenerating) return
    onGenerate(trimmed)
    setValue('')
  }, [value, isGenerating, onGenerate])

  const insertSuggestion = (s: string) => {
    setValue(s)
    textareaRef.current?.focus()
  }

  return (
    <div className="flex flex-col gap-3 p-4 border-t border-border bg-white">
      {/* Suggestions */}
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => insertSuggestion(s)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange/10 text-orange text-xs font-medium hover:bg-orange/20 transition-colors"
          >
            <ChevronRight className="w-3 h-3" />
            {s}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="flex flex-col gap-2">
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
              'w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/60',
              'focus:outline-none focus:border-orange transition-colors',
              'disabled:opacity-50',
            )}
            style={{ minHeight: '72px', maxHeight: '140px' }}
          />
          <span className="absolute bottom-2 right-3 text-[10px] text-muted/50">
            {value.length}/500
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPhotoClick}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-sm text-muted hover:border-orange hover:text-orange transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
            {photoCount > 0 ? `${photoCount} photo${photoCount > 1 ? 's' : ''}` : 'Ajouter photos'}
          </button>

          <button
            onClick={handleSubmit}
            disabled={!value.trim() || isGenerating}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl',
              'bg-gradient-to-r from-orange to-rose text-white font-syne font-bold text-sm',
              'hover:-translate-y-0.5 transition-all shadow-orange hover:shadow-orange-hover',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
            )}
          >
            <Zap className="w-4 h-4" />
            {isGenerating ? 'Génération...' : 'Générer le site'}
          </button>
        </div>

        <p className="text-[10px] text-muted/60 text-center">
          Ctrl+Entrée pour générer · Résultat en ~10 secondes
        </p>
      </div>
    </div>
  )
}
