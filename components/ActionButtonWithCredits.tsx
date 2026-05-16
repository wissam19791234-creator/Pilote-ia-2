'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { canAfford, getCredits, CREDIT_COSTS, type CreditAction } from '@/lib/credits'
import {
  canCurrentUserAccess,
  getRequiredPlan,
  type Feature,
} from '@/lib/featureAccess'
import { PLANS } from '@/lib/plans'
import UpgradeModal from './UpgradeModal'

interface ActionButtonWithCreditsProps {
  action: CreditAction
  feature?: Feature
  label: string
  icon?: React.ReactNode
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

const PLAN_BADGE_LABELS: Record<string, string> = {
  starter: 'STARTER',
  pro: 'PRO',
  agency: 'AGENCY',
}

export default function ActionButtonWithCredits({
  action,
  feature,
  label,
  icon,
  onClick,
  disabled = false,
  variant = 'primary',
  className,
}: ActionButtonWithCreditsProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const cost = CREDIT_COSTS[action]
  const creditOk = canAfford(action)
  const featureOk = feature ? canCurrentUserAccess(feature) : true
  const isBlocked = !creditOk || !featureOk || disabled

  const currentCredits = getCredits()
  const missingCredits = Math.max(0, cost - currentCredits)

  const requiredPlanId = feature && !featureOk ? getRequiredPlan(feature) : undefined
  const requiredPlan = requiredPlanId ? PLANS[requiredPlanId] : undefined
  const planBadgeLabel = requiredPlanId ? PLAN_BADGE_LABELS[requiredPlanId] ?? requiredPlanId.toUpperCase() : undefined

  const handleClick = () => {
    if (isBlocked) {
      setModalOpen(true)
      return
    }
    onClick()
  }

  // Base styles per variant
  const variantStyles: Record<NonNullable<ActionButtonWithCreditsProps['variant']>, string> = {
    primary: cn(
      'bg-primary text-white shadow-primary',
      isBlocked
        ? 'opacity-70 cursor-not-allowed'
        : 'hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-primary-hover'
    ),
    secondary: cn(
      'bg-surface text-ink border border-border',
      isBlocked
        ? 'opacity-70 cursor-not-allowed'
        : 'hover:border-primary hover:text-primary hover:-translate-y-px'
    ),
    ghost: cn(
      'bg-transparent text-muted',
      isBlocked
        ? 'opacity-70 cursor-not-allowed'
        : 'hover:text-ink hover:bg-black/5'
    ),
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled && !(!creditOk || !featureOk)}
        aria-disabled={isBlocked}
        className={cn(
          'relative inline-flex flex-col items-center gap-1 px-5 py-3 rounded-xl font-syne font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40',
          variantStyles[variant],
          className
        )}
      >
        {/* Plan badge (top-right corner) */}
        {planBadgeLabel && !featureOk && (
          <span className="absolute -top-2 -right-2 inline-flex items-center px-1.5 py-0.5 rounded-md bg-primary text-white text-[10px] font-bold tracking-wide shadow-glow-sm">
            {planBadgeLabel}
          </span>
        )}

        {/* Main row: icon + label */}
        <span className="flex items-center gap-2 text-sm">
          {icon && <span className="w-4 h-4 shrink-0">{icon}</span>}
          <span>{label}</span>
        </span>

        {/* Sub-label: credit info */}
        <span className="flex items-center gap-1 text-[11px] font-normal opacity-80">
          {!featureOk && planBadgeLabel ? (
            <span className="text-white/90">
              🔒 Requiert {requiredPlan?.name ?? planBadgeLabel}
              {requiredPlan ? ` (${requiredPlan.price}€/mois)` : ''}
            </span>
          ) : !creditOk ? (
            <span className={variant === 'primary' ? 'text-red-200' : 'text-red-500'}>
              ⚡ {missingCredits} crédit{missingCredits > 1 ? 's' : ''} manquant{missingCredits > 1 ? 's' : ''}
            </span>
          ) : (
            <span className={variant === 'primary' ? 'text-white/70' : 'text-muted'}>
              ⚡ {cost} crédit{cost > 1 ? 's' : ''}
            </span>
          )}
        </span>
      </button>

      <UpgradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        feature={feature}
        action={action}
        currentCredits={currentCredits}
        requiredCredits={cost}
      />
    </>
  )
}
