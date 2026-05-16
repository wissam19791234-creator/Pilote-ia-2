'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { GeneratedProject } from '@/types'
import type { PlanId } from '@/lib/plans'
import { generateChatbotHtml } from '@/lib/chatbotBuilder'

interface ChatbotPreviewProps {
  isOpen: boolean
  onClose: () => void
  project: GeneratedProject
  planId: PlanId
}

export default function ChatbotPreview({ isOpen, onClose, project, planId }: ChatbotPreviewProps) {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    if (!isOpen) return
    const generated = generateChatbotHtml(
      project.sector,
      project.businessName,
      project.city,
      project.services,
      planId,
      project.designSystem?.palette?.primary
    )
    setHtml(generated)
  }, [isOpen, project, planId])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden w-[440px] max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-lg">💬</span>
            <h2 className="text-base font-semibold text-gray-900">Aperçu du chatbot</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* iframe container */}
        <div className="flex items-center justify-center bg-gray-50 p-6 flex-1">
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200" style={{ width: 400, height: 600 }}>
            {html ? (
              <iframe
                srcDoc={html}
                sandbox="allow-scripts allow-same-origin"
                title="Aperçu chatbot"
                style={{ width: 400, height: 600, border: 'none', display: 'block' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                Chargement…
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
