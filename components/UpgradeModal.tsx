'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CREDIT_COSTS, type CreditAction } from '@/lib/credits'
import {
  getUpgradeMessage,
  getRequiredPlan,
  canCurrentUserAccess,
  type Feature,
} from '@/lib/featureAccess'
import { PLANS, getCurrentPlanId } from '@/lib/plans'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  feature?: Feature
  action?: CreditAction
  currentCredits: number
  requiredCredits?: number
}

const PLAN_BENEFITS: Record<string, string[]> = {
  starter: [
    '500 crédits / mois',
    'Export HTML',
    'Chatbot simple',
    'Sauvegarde des projets',
  ],
  pro: [
    '2 000 crédits / mois',
    'Export ZIP',
    'Images IA',
    'Variations de design',
    'Chatbot avancé',
    'Suppression du watermark',
  ],
  agency: [
    'Crédits illimités',
    'Mini CRM',
    'Lead dashboard',
    'Projets illimités',
    'Toutes les fonctionnalités Pro',
  ],
}

export default function UpgradeModal({
  isOpen,
  onClose,
  feature,
  action,
  currentCredits,
  requiredCredits,
}: UpgradeModalProps) {
  const router = useRouter()

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent body scroll when open
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

  const isCreditIssue =
    action !== undefined &&
    requiredCredits !== undefined &&
    currentCredits < requiredCredits &&
    (!feature || canCurrentUserAccess(feature))

  const isFeatureIssue = feature !== undefined && !canCurrentUserAccess(feature)

  const title = isCreditIssue ? 'Crédits insuffisants' : 'Fonctionnalité Pro'

  const missingCredits =
    requiredCredits !== undefined ? requiredCredits - currentCredits : 0

  const requiredPlanId = feature ? getRequiredPlan(feature) : undefined
  const requiredPlan = requiredPlanId ? PLANS[requiredPlanId] : undefined
  const benefits =
    requiredPlanId && requiredPlanId !== 'free'
      ? PLAN_BENEFITS[requiredPlanId] ?? []
      : []

  const upgradeMessage = feature ? getUpgradeMessage(feature) : undefined

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-modal-title"
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        className={cn(
          'relative z-10 w-full max-w-md bg-surface rounded-3xl shadow-card-hover border border-border p-6 animate-scale-in'
        )}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-muted hover:bg-border hover:text-ink transition-colors"
          aria-label="Fermer"
        >
          ✕
        </button>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-surface-soft flex items-center justify-center text-xl">
            {isCreditIssue ? '⚡' : '🔒'}
          </div>
          <h2
            id="upgrade-modal-title"
            className="text-lg font-bold font-syne text-ink"
          >
            {title}
          </h2>
        </div>

        {/* Credit info */}
        {isCreditIssue && (
          <div className="mb-4 rounded-2xl bg-red-50 border border-red-100 p-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Coût de l&apos;action</span>
              <span className="font-bold text-ink">
                ⚡ {requiredCredits} crédit{requiredCredits! > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Crédits disponibles</span>
              <span className="font-bold text-red-500">
                ⚡ {currentCredits} crédit{currentCredits !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="border-t border-red-100 pt-2 flex justify-between text-sm">
              <span className="text-muted">Il vous manque</span>
              <span className="font-bold text-red-600">
                {missingCredits} crédit{missingCredits > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        {/* Feature lock info */}
        {isFeatureIssue && (
          <div className="mb-4 rounded-2xl bg-surface-soft border border-border-bright p-4">
            {upgradeMessage && (
              <p className="text-sm text-muted mb-3 leading-relaxed">
                {upgradeMessage}
              </p>
            )}
            {requiredPlan && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted mb-0.5">Plan requis</p>
                  <p className="font-bold text-ink capitalize">
                    {requiredPlan.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted mb-0.5">À partir de</p>
                  <p className="font-bold text-primary text-lg">
                    {requiredPlan.price}€
                    <span className="text-xs font-normal text-muted">/mois</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Plan benefits */}
        {benefits.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-2">
              Inclus dans le plan {requiredPlan?.name}
            </p>
            <ul className="flex flex-col gap-1.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-ink">
                  <span className="text-primary font-bold">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              onClose()
              router.push('/pricing')
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold font-syne text-sm shadow-primary hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200"
          >
            Voir les plans →
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-4 rounded-xl bg-transparent text-muted border border-border text-sm font-semibold hover:bg-border hover:text-ink transition-colors duration-150"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
