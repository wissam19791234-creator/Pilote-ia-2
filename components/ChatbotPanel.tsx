'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { GeneratedProject, ChatbotConfig } from '@/types'
import { getCurrentPlanId } from '@/lib/plans'
import { canCurrentUserAccess } from '@/lib/featureAccess'
import { generateChatbotConfig } from '@/lib/chatbotBuilder'
import ChatbotWidget from '@/components/ChatbotWidget'
import ChatbotPreview from '@/components/ChatbotPreview'

interface ChatbotPanelProps {
  project: GeneratedProject
}

const SIMPLE_COST = 6
const ADVANCED_COST = 12

export default function ChatbotPanel({ project }: ChatbotPanelProps) {
  const planId = getCurrentPlanId()
  const canSimple = canCurrentUserAccess('chatbot_simple')
  const canAdvanced = canCurrentUserAccess('chatbot_advanced')

  const [previewOpen, setPreviewOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const config: ChatbotConfig = generateChatbotConfig(
    project.sector,
    project.businessName,
    project.city,
    project.services,
    planId
  )

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  function handleAddToSite() {
    // In production this would call consumeCredits(...)
    setAdded(true)
    showToast(
      canAdvanced
        ? `Chatbot avancé ajouté au site — ${ADVANCED_COST} crédits consommés`
        : `Chatbot simple ajouté au site — ${SIMPLE_COST} crédits consommés`
    )
  }

  function handleExportLeads() {
    showToast('Export leads — fonctionnalité bientôt disponible')
  }

  const isBlocked = !canSimple && !canAdvanced

  return (
    <div className="relative p-6 max-w-3xl mx-auto space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-5 py-3 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {toast}
        </div>
      )}

      {/* Title row */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">💬</span>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Chatbot intelligent</h2>
          <p className="text-sm text-gray-500">
            Capturez vos leads 24h/24 avec un chatbot personnalisé pour {project.businessName}
          </p>
        </div>
      </div>

      {/* ── BLOCKED: free / starter ── */}
      {isBlocked && (
        <div className="space-y-4">
          {/* Upgrade banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                  PRO requis
                </span>
              </div>
              <p className="text-sm font-semibold text-amber-900">
                Chatbot disponible à partir du plan Pro
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                Capturez jusqu&apos;à 3× plus de leads avec un chatbot IA intégré à votre site.
              </p>
            </div>
            <a
              href="/pricing"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              Passer au plan Pro — 39€/mois
            </a>
          </div>

          {/* Blurred preview */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-200">
            <div className="blur-sm pointer-events-none select-none p-6 bg-gray-50 flex justify-center">
              <ChatbotWidget
                config={{
                  ...config,
                  enabled: true,
                  level: 'simple',
                  title: project.businessName,
                  welcomeMessage: `Bonjour ! Je suis l'assistant de ${project.businessName}. Comment puis-je vous aider ?`,
                  suggestedQuestions: [
                    'Quels sont vos services ?',
                    'Comment vous contacter ?',
                    'Demander un devis',
                  ],
                }}
                interactive={false}
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-amber-100 text-amber-800 border border-amber-300 shadow">
                🔒 PRO requis
              </span>
              <p className="text-sm text-gray-600 mt-2">Passez au plan Pro pour activer le chatbot</p>
            </div>
          </div>
        </div>
      )}

      {/* ── PRO: chatbot simple ── */}
      {canSimple && !canAdvanced && (
        <div className="space-y-5">
          {/* Status badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Chatbot Simple activé
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              Coût : {SIMPLE_COST} crédits
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Config details */}
            <div className="space-y-4">
              {/* Suggested questions */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Questions générées pour votre secteur
                </h3>
                <ul className="space-y-2">
                  {config.suggestedQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lead capture fields */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Champs de capture lead</h3>
                <div className="flex flex-wrap gap-2">
                  {['Nom', 'Email', 'Téléphone', 'Besoin'].map((field) => (
                    <span
                      key={field}
                      className="text-xs px-2.5 py-1 bg-violet-50 text-violet-700 border border-violet-200 rounded-full"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleAddToSite}
                  disabled={added}
                  className={cn(
                    'w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors',
                    added
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-violet-600 hover:bg-violet-700 text-white'
                  )}
                >
                  {added ? '✓ Ajouté au site' : `Ajouter au site — ${SIMPLE_COST} crédits`}
                </button>
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  Tester le chatbot
                </button>
              </div>
            </div>

            {/* Widget preview */}
            <div className="flex justify-center items-start pt-2">
              <ChatbotWidget config={config} interactive={true} />
            </div>
          </div>
        </div>
      )}

      {/* ── AGENCY: chatbot avancé ── */}
      {canAdvanced && (
        <div className="space-y-5">
          {/* Status badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-violet-50 text-violet-700 border border-violet-200">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              Chatbot Avancé activé
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              Coût : {ADVANCED_COST} crédits
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Config details */}
            <div className="space-y-4">
              {/* Suggested questions */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Questions générées pour votre secteur
                </h3>
                <ul className="space-y-2">
                  {config.suggestedQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-violet-500 mt-0.5 flex-shrink-0">✓</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lead capture fields: standard + advanced */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Champs de capture lead</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['Nom', 'Email', 'Téléphone', 'Besoin'].map((field) => (
                    <span
                      key={field}
                      className="text-xs px-2.5 py-1 bg-violet-50 text-violet-700 border border-violet-200 rounded-full"
                    >
                      {field}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mb-2">Champs avancés :</p>
                <div className="flex flex-wrap gap-2">
                  {['Budget', 'Délai', 'Score lead'].map((field) => (
                    <span
                      key={field}
                      className="text-xs px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Advanced features */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Fonctionnalités avancées</h3>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-xs">✓</span>
                  Lead scoring activé
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-xs">✓</span>
                  CRM fictif activé (HubSpot / Notion)
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-xs">✓</span>
                  Qualification automatique des prospects
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleAddToSite}
                  disabled={added}
                  className={cn(
                    'w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors',
                    added
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-violet-600 hover:bg-violet-700 text-white'
                  )}
                >
                  {added ? '✓ Ajouté au site' : `Ajouter au site — ${ADVANCED_COST} crédits`}
                </button>
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  Tester le chatbot
                </button>
                <button
                  onClick={handleExportLeads}
                  className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold border border-violet-200 bg-violet-50 hover:bg-violet-100 text-violet-700 transition-colors"
                >
                  Export leads (CSV)
                </button>
              </div>
            </div>

            {/* Widget preview */}
            <div className="flex justify-center items-start pt-2">
              <ChatbotWidget config={config} interactive={true} />
            </div>
          </div>
        </div>
      )}

      {/* Preview modal */}
      <ChatbotPreview
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        project={project}
        planId={planId}
      />
    </div>
  )
}
