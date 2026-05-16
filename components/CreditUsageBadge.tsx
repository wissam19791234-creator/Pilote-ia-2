'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { getCredits } from '@/lib/credits'
import { getCurrentPlan } from '@/lib/plans'

import CreditHistoryPanel from './CreditHistoryPanel'

interface CreditUsageBadgeProps {
  size?: 'sm' | 'lg'
  showHistory?: boolean
}

function getCreditColor(credits: number, max: number): string {
  if (max === 0) return 'text-muted'
  const ratio = credits / max
  if (ratio > 0.2) return 'text-green-600'
  if (ratio > 0.1) return 'text-orange'
  return 'text-red-500'
}

function getBarColor(credits: number, max: number): string {
  if (max === 0) return 'bg-border'
  const ratio = credits / max
  if (ratio > 0.2) return 'bg-green'
  if (ratio > 0.1) return 'bg-orange'
  return 'bg-red-500'
}

export default function CreditUsageBadge({
  size = 'sm',
  showHistory = false,
}: CreditUsageBadgeProps) {
  const [credits, setCredits] = useState<number>(0)
  const [historyOpen, setHistoryOpen] = useState(false)

  const refresh = useCallback(() => {
    setCredits(getCredits())
  }, [])

  useEffect(() => {
    // Initial read
    refresh()

    // Listen for credit updates dispatched elsewhere in the app
    const handler = () => refresh()
    window.addEventListener('credits-updated', handler)
    return () => window.removeEventListener('credits-updated', handler)
  }, [refresh])

  const plan = getCurrentPlan()
  const max = plan.monthlyCredits
  const ratio = max > 0 ? credits / max : 0
  const pct = Math.min(100, Math.round(ratio * 100))

  const creditColor = getCreditColor(credits, max)
  const barColor = getBarColor(credits, max)

  if (size === 'sm') {
    return (
      <>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-semibold text-xs bg-surface border-border shadow-soft',
            creditColor
          )}
        >
          <span>⚡</span>
          <span>{credits.toLocaleString()} crédits</span>
        </span>

        {showHistory && (
          <CreditHistoryPanel
            isOpen={historyOpen}
            onClose={() => setHistoryOpen(false)}
          />
        )}
      </>
    )
  }

  // size === 'lg'
  return (
    <>
      <div className="flex flex-col gap-2 p-4 bg-surface rounded-2xl border border-border shadow-soft w-full">
        <div className="flex items-center justify-between">
          <div className={cn('flex items-center gap-2 font-bold text-base', creditColor)}>
            <span className="text-lg">⚡</span>
            <span>{credits.toLocaleString()} crédits</span>
          </div>
          <span className="text-xs text-muted">
            sur {max.toLocaleString()} / mois
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-500', barColor)}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted">
            Plan <span className="font-semibold text-ink capitalize">{plan.name}</span>
          </span>
          <span className="text-xs text-muted">{pct}% restants</span>
        </div>

        {showHistory && (
          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            className="mt-1 text-xs text-primary font-semibold hover:underline text-left"
          >
            Voir l&apos;historique →
          </button>
        )}
      </div>

      {showHistory && (
        <CreditHistoryPanel
          isOpen={historyOpen}
          onClose={() => setHistoryOpen(false)}
        />
      )}
    </>
  )
}
