'use client'

import { AlertTriangle, RotateCcw } from 'lucide-react'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-red-400" />
      </div>
      <h3 className="font-syne font-bold text-ink mb-2">Une erreur est survenue</h3>
      <p className="text-sm text-muted mb-6 max-w-xs leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/15 border border-primary/30 text-primary-light font-bold text-sm hover:bg-primary/25 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Réessayer
        </button>
      )}
    </div>
  )
}
