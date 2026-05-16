'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { getCreditHistory, type CreditAction, type CreditHistoryEntry } from '@/lib/credits'

interface CreditHistoryPanelProps {
  isOpen: boolean
  onClose: () => void
}

type FilterCategory = 'all' | 'generations' | 'exports' | 'other'

const ACTION_ICONS: Record<CreditAction, string> = {
  generate_site: '🌐',
  generate_site_ecommerce: '🛍️',
  generate_site_ai_images: '🖼️',
  generate_site_automations: '🤖',
  generate_video: '🎬',
  generate_variation: '🎨',
  chat_modify: '💬',
  generate_ai_images: '✨',
  export_zip: '📦',
  generate_chatbot_simple: '🤖',
  generate_chatbot_advanced: '🧠',
  generate_sales_pack: '📊',
}

const ACTION_LABELS: Record<CreditAction, string> = {
  generate_site: 'Génération de site',
  generate_site_ecommerce: 'Site e-commerce',
  generate_site_ai_images: 'Site avec images IA',
  generate_site_automations: 'Site avec automatisations',
  generate_video: 'Vidéo démo',
  generate_variation: 'Variation de design',
  chat_modify: 'Modification par chat',
  generate_ai_images: 'Images IA',
  export_zip: 'Export ZIP',
  generate_chatbot_simple: 'Chatbot simple',
  generate_chatbot_advanced: 'Chatbot avancé',
  generate_sales_pack: 'Pack de vente',
}

const GENERATION_ACTIONS: CreditAction[] = [
  'generate_site',
  'generate_site_ecommerce',
  'generate_site_ai_images',
  'generate_site_automations',
  'generate_video',
  'generate_variation',
  'generate_ai_images',
  'generate_chatbot_simple',
  'generate_chatbot_advanced',
  'generate_sales_pack',
]

const EXPORT_ACTIONS: CreditAction[] = ['export_zip']

function filterEntries(
  entries: CreditHistoryEntry[],
  category: FilterCategory
): CreditHistoryEntry[] {
  if (category === 'all') return entries
  if (category === 'generations') {
    return entries.filter((e) => GENERATION_ACTIONS.includes(e.action))
  }
  if (category === 'exports') {
    return entries.filter((e) => EXPORT_ACTIONS.includes(e.action))
  }
  // 'other'
  return entries.filter(
    (e) =>
      !GENERATION_ACTIONS.includes(e.action) && !EXPORT_ACTIONS.includes(e.action)
  )
}

function formatDate(timestamp: string): string {
  const d = new Date(timestamp)
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function CreditHistoryPanel({ isOpen, onClose }: CreditHistoryPanelProps) {
  const [entries, setEntries] = useState<CreditHistoryEntry[]>([])
  const [filter, setFilter] = useState<FilterCategory>('all')

  useEffect(() => {
    if (isOpen) {
      setEntries(getCreditHistory())
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const filtered = filterEntries(entries, filter)

  const filters: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'Tout' },
    { id: 'generations', label: 'Générations' },
    { id: 'exports', label: 'Exports' },
    { id: 'other', label: 'Autre' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — slides in from right */}
      <div className="relative ml-auto w-full max-w-sm h-full bg-surface shadow-card-hover flex flex-col animate-slide-in-left border-l border-border">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h2 className="font-bold font-syne text-ink text-base">
              Historique des crédits
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-muted hover:bg-border hover:text-ink transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 px-4 py-3 border-b border-border shrink-0 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap',
                filter === f.id
                  ? 'bg-primary text-white'
                  : 'bg-background text-muted hover:bg-surface-soft hover:text-ink border border-border'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted text-sm gap-2">
              <span className="text-3xl opacity-40">📭</span>
              <p>Aucune entrée pour ce filtre</p>
            </div>
          ) : (
            filtered.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border hover:border-border-bright transition-colors"
              >
                {/* Action icon */}
                <span className="text-xl shrink-0 mt-0.5">
                  {ACTION_ICONS[entry.action] ?? '⚡'}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-ink truncate">
                      {ACTION_LABELS[entry.action] ?? entry.action}
                    </p>
                    <span
                      className={cn(
                        'text-sm font-bold shrink-0',
                        entry.amount < 0 ? 'text-red-500' : 'text-green-600'
                      )}
                    >
                      {entry.amount > 0 ? '+' : ''}{entry.amount}
                    </span>
                  </div>

                  {entry.reason && (
                    <p className="text-xs text-muted mt-0.5 truncate">{entry.reason}</p>
                  )}

                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted">
                      {formatDate(entry.timestamp)}
                    </span>
                    <span className="text-[10px] text-muted">
                      Solde : <span className="font-semibold text-ink">⚡{entry.balanceAfter}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer summary */}
        <div className="px-5 py-3 border-t border-border shrink-0">
          <p className="text-xs text-muted text-center">
            {filtered.length} entrée{filtered.length !== 1 ? 's' : ''} affichée{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  )
}
