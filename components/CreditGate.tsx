'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { canAfford, getCredits, CREDIT_COSTS, type CreditAction } from '@/lib/credits'
import { canCurrentUserAccess, type Feature } from '@/lib/featureAccess'
import UpgradeModal from './UpgradeModal'

interface CreditGateProps {
  action: CreditAction
  feature?: Feature
  children: React.ReactNode
  onBlocked?: () => void
}

export default function CreditGate({ action, feature, children, onBlocked }: CreditGateProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const creditOk = canAfford(action)
  const featureOk = feature ? canCurrentUserAccess(feature) : true
  const isBlocked = !creditOk || !featureOk

  const handleOverlayClick = () => {
    onBlocked?.()
    setModalOpen(true)
  }

  if (!isBlocked) {
    return <>{children}</>
  }

  const currentCredits = getCredits()
  const requiredCredits = CREDIT_COSTS[action]

  return (
    <>
      <div className="relative group">
        {/* Render children but visually locked */}
        <div className="pointer-events-none select-none opacity-60 blur-[0.5px]">
          {children}
        </div>

        {/* Overlay — intercepts clicks */}
        <button
          type="button"
          onClick={handleOverlayClick}
          className="absolute inset-0 w-full h-full bg-background/60 backdrop-blur-[2px] rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-background/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Accès restreint — cliquer pour débloquer"
        >
          <div className="flex flex-col items-center gap-2">
            {/* Cost badge */}
            <span className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold shadow-primary',
              creditOk ? 'bg-primary text-white' : 'bg-red-500 text-white'
            )}>
              <span>⚡</span>
              <span>{requiredCredits} crédit{requiredCredits > 1 ? 's' : ''}</span>
            </span>

            {/* Upgrade button */}
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-primary border border-primary/30 rounded-xl text-sm font-semibold shadow-soft hover:bg-surface-soft transition-colors duration-150">
              {featureOk ? '↑ Recharger' : '↑ Upgrade'}
            </span>
          </div>
        </button>
      </div>

      <UpgradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        feature={feature}
        action={action}
        currentCredits={currentCredits}
        requiredCredits={requiredCredits}
      />
    </>
  )
}
