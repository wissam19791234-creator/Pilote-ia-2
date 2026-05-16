'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Sparkles, Eye, FileText, Code2, Download, MessageSquare, LayoutGrid, Zap, Bot } from 'lucide-react'
import type { ChatMessage, GeneratedProject, StudioTab } from '@/types'
import { getCredits, consumeCredit } from '@/lib/credits'
import Sidebar from '@/components/Sidebar'
import ChatPanel from '@/components/ChatPanel'
import PromptComposer from '@/components/PromptComposer'
import LoadingSteps from '@/components/LoadingSteps'
import SitePreview from '@/components/SitePreview'
import PlanPanel from '@/components/PlanPanel'
import FileExplorer from '@/components/FileExplorer'
import CodePanel from '@/components/CodePanel'
import ExportPanel from '@/components/ExportPanel'
import ClientMessagePanel from '@/components/ClientMessagePanel'
import AutomationSalesPanel from '@/components/AutomationSalesPanel'
import PhotoUploader from '@/components/PhotoUploader'
import { cn } from '@/lib/utils'

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `Bonjour ! Je suis SitePilot AI, propulsé par Claude ✦\n\nDécris le commerce pour lequel tu veux créer un site — ville, secteur, style, objectif… Plus tu es précis, meilleur sera le résultat.\n\nJ'analyse ton brief, génère le copywriting, le design et le HTML en quelques secondes.`,
  timestamp: new Date().toISOString(),
}

const TABS = [
  { id: 'preview' as const, label: 'Preview', icon: Eye },
  { id: 'plan' as const, label: 'Analyse', icon: LayoutGrid },
  { id: 'automations' as const, label: 'Vendre', icon: Bot },
  { id: 'files' as const, label: 'Fichiers', icon: FileText },
  { id: 'code' as const, label: 'Code', icon: Code2 },
  { id: 'export' as const, label: 'Export', icon: Download },
  { id: 'message' as const, label: 'Message', icon: MessageSquare },
]

const TOTAL_STEPS = 11

const MODIFICATION_TRIGGERS = [
  'plus luxe', 'plus premium', 'plus coloré', 'plus vendeur', 'plus sombre',
  'ajoute whatsapp', 'ajoute devis', 'section ecommerce', 'change couleur',
  'rends', 'modifie', 'ajoute', 'supprime', 'change', 'mets', 'met ',
  'refais', 'améliore', 'update',
]

function isModification(text: string, hasProject: boolean): boolean {
  if (!hasProject) return false
  const lower = text.toLowerCase()
  return MODIFICATION_TRIGGERS.some((kw) => lower.includes(kw))
}

function newMsg(role: ChatMessage['role'], content: string): ChatMessage {
  return { id: `msg_${Date.now()}_${Math.random()}`, role, content, timestamp: new Date().toISOString() }
}

export default function StudioPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [currentProject, setCurrentProject] = useState<GeneratedProject | null>(null)
  const [photos, setPhotos] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationMode, setGenerationMode] = useState<string>('')
  const [activeTab, setActiveTab] = useState<StudioTab>('preview')
  const [credits, setCredits] = useState(12)
  const [selectedFile, setSelectedFile] = useState('index.html')
  const [showPhotos, setShowPhotos] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setCredits(getCredits())
  }, [])

  const addMsg = useCallback((role: ChatMessage['role'], content: string) => {
    setMessages((prev) => [...prev, newMsg(role, content)])
  }, [])

  const runGeneration = useCallback(async (prompt: string, isRefine: boolean) => {
    if (!consumeCredit()) {
      addMsg('assistant', '❌ Plus de crédits disponibles. Upgradez votre plan pour continuer à générer des sites.')
      return
    }

    setIsGenerating(true)
    setGenerationStep(0)
    setGenerationProgress(0)
    setGenerationMode('')

    // Animate steps in parallel with API call
    let step = 0
    intervalRef.current = setInterval(() => {
      step = Math.min(step + 1, TOTAL_STEPS - 1)
      setGenerationStep(step)
      setGenerationProgress(Math.round((step / TOTAL_STEPS) * 85))
    }, 900)

    try {
      const endpoint = isRefine ? '/api/refine' : '/api/generate'
      const body = isRefine && currentProject
        ? { instruction: prompt, project: currentProject, photos }
        : { prompt, photos }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.json() as { error?: string }
        throw new Error(err.error ?? `Erreur ${res.status}`)
      }

      const data = await res.json() as { project: GeneratedProject; mode?: string }

      if (intervalRef.current) clearInterval(intervalRef.current)
      setGenerationStep(TOTAL_STEPS)
      setGenerationProgress(100)
      setGenerationMode(data.mode ?? 'local')

      setCurrentProject(data.project)
      setCredits(getCredits())
      window.dispatchEvent(new Event('credits-updated'))

      const modeLabel = data.mode === 'ai' ? '✦ Claude AI' : data.mode === 'local-fallback' ? '(mode local)' : '(mode local)'
      const msg = isRefine
        ? `✅ Modifications appliquées ${modeLabel}\n\nLe site a été mis à jour selon vos instructions.`
        : `✅ Site généré ${modeLabel} !\n\n🏢 **${data.project.businessName}** — ${data.project.city}\n🎯 Secteur : ${data.project.sector}\n📋 ${data.project.sections.length} sections générées\n${data.project.automationNeeds.length > 0 ? `🤖 Automations : ${data.project.automationNeeds.join(', ')}\n` : ''}💌 Message client prêt\n\nModifiez le site en tapant vos instructions ici.`

      addMsg('assistant', msg)
      setActiveTab('preview')
    } catch (err) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      const message = err instanceof Error ? err.message : 'Erreur inconnue'
      addMsg('assistant', `❌ Erreur lors de la génération : ${message}\n\nRéessayez ou simplifiez votre description.`)
    } finally {
      setIsGenerating(false)
    }
  }, [currentProject, photos, addMsg])

  const handleGenerate = useCallback((prompt: string) => {
    addMsg('user', prompt)
    const isMod = isModification(prompt, !!currentProject)
    addMsg('assistant', isMod
      ? '🔄 Modification en cours…\nJ\'applique vos instructions avec Claude AI.'
      : '🚀 Génération en cours…\nClaude AI analyse votre brief et crée votre site.',
    )
    void runGeneration(prompt, isMod)
  }, [addMsg, currentProject, runGeneration])

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const noProject = !currentProject

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Chat column */}
      <div className="w-full lg:w-[360px] shrink-0 flex flex-col border-r border-border bg-[#09090f]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-[#0a0a14]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-glow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-syne font-bold text-sm text-ink">SitePilot AI</p>
              <p className="text-[10px] text-muted flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" />
                {credits} crédit{credits !== 1 ? 's' : ''} · Claude AI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {[...Array(Math.min(credits, 5))].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow-sm" />
            ))}
            {credits > 5 && <span className="text-[10px] text-muted">+{credits - 5}</span>}
          </div>
        </div>

        {isGenerating ? (
          <LoadingSteps
            currentStep={generationStep}
            progress={generationProgress}
            mode={generationMode}
          />
        ) : (
          <ChatPanel messages={messages} />
        )}

        {/* Photo uploader */}
        {showPhotos && (
          <div className="px-4 pb-3 border-t border-border pt-3 bg-[#09090f]">
            <PhotoUploader photos={photos} onChange={setPhotos} />
          </div>
        )}

        <PromptComposer
          onGenerate={handleGenerate}
          onPhotoClick={() => setShowPhotos(!showPhotos)}
          isGenerating={isGenerating}
          photoCount={photos.length}
        />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-[#0a0a14] overflow-x-auto">
          {TABS.map((tab) => {
            const disabled = noProject && tab.id !== 'preview'
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => !disabled && setActiveTab(tab.id)}
                disabled={disabled}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-primary/15 text-primary-light border border-primary/20'
                    : disabled
                    ? 'text-muted/25 cursor-not-allowed'
                    : 'text-muted hover:text-ink hover:bg-white/5',
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-hidden flex flex-col bg-surface">
          {activeTab === 'preview' && (
            <SitePreview html={currentProject?.html ?? null} isGenerating={isGenerating} />
          )}
          {activeTab === 'plan' && currentProject && (
            <div className="flex-1 overflow-y-auto">
              <PlanPanel project={currentProject} />
            </div>
          )}
          {activeTab === 'automations' && currentProject && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <AutomationSalesPanel project={currentProject} />
            </div>
          )}
          {activeTab === 'files' && currentProject && (
            <div className="flex-1 overflow-y-auto bg-[#0a0a14]">
              <FileExplorer
                project={currentProject}
                selectedFile={selectedFile}
                onSelect={(f) => { setSelectedFile(f); setActiveTab('code') }}
              />
            </div>
          )}
          {activeTab === 'code' && currentProject && (
            <CodePanel project={currentProject} selectedFile={selectedFile} />
          )}
          {activeTab === 'export' && currentProject && (
            <div className="flex-1 overflow-y-auto">
              <ExportPanel project={currentProject} />
            </div>
          )}
          {activeTab === 'message' && currentProject && (
            <div className="flex-1 overflow-y-auto">
              <ClientMessagePanel project={currentProject} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
