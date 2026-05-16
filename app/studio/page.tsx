'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Sparkles, Eye, FileText, Code2, Download, MessageSquare,
  LayoutGrid, Zap, Bot, GitCompareArrows, Image, Package,
  ClipboardList, Video, ShieldCheck, ChevronLeft, Monitor,
} from 'lucide-react'
import type { ChatMessage, GeneratedProject, StudioTab } from '@/types'
import { getCredits, consumeCredit } from '@/lib/credits'
import { analyzePrompt } from '@/lib/promptAnalyzer'
import { generateLocalVisuals } from '@/lib/imageGeneration'
import { generateSmartQuote } from '@/lib/quoteBuilder'
import { generateSalesPack } from '@/lib/salesPackBuilder'
import { runQualityCheck } from '@/lib/qualityChecker'
import { generateAutomationSales } from '@/lib/automationOptions'
import { useStudioStore } from '@/store/studioStore'
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
import ComparisonPanel from '@/components/ComparisonPanel'
import ImageGalleryPreview from '@/components/ImageGalleryPreview'
import SalesPackPanel from '@/components/SalesPackPanel'
import QuoteBuilderPanel from '@/components/QuoteBuilderPanel'
import QualityCheckPanel from '@/components/QualityCheckPanel'
import VideoDemoPanel from '@/components/VideoDemoPanel'
import PhotoUploader from '@/components/PhotoUploader'
import ErrorState from '@/components/ErrorState'
import { cn } from '@/lib/utils'

const TABS: Array<{ id: StudioTab; label: string; icon: React.ElementType; group?: string }> = [
  { id: 'preview', label: 'Preview', icon: Eye },
  { id: 'plan', label: 'Analyse', icon: LayoutGrid },
  { id: 'images', label: 'Visuels', icon: Image },
  { id: 'automations', label: 'Vendre', icon: Bot },
  { id: 'offer', label: 'Offre', icon: Package },
  { id: 'quote', label: 'Devis', icon: ClipboardList },
  { id: 'video', label: 'Vidéo', icon: Video },
  { id: 'quality', label: 'Qualité', icon: ShieldCheck },
  { id: 'comparison', label: 'Avant/Après', icon: GitCompareArrows },
  { id: 'files', label: 'Fichiers', icon: FileText },
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'export', label: 'Export', icon: Download },
  { id: 'message', label: 'Message', icon: MessageSquare },
]

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

function enrichProject(project: GeneratedProject): GeneratedProject {
  const enriched = { ...project }
  try { if (!enriched.visuals) enriched.visuals = generateLocalVisuals(project) } catch (e) { console.warn('[enrich] visuals', e) }
  try { if (!enriched.smartQuote) enriched.smartQuote = generateSmartQuote(project) } catch (e) { console.warn('[enrich] quote', e) }
  try { if (!enriched.salesPack) enriched.salesPack = generateSalesPack(project) } catch (e) { console.warn('[enrich] sales', e) }
  try { if (!enriched.qualityCheck) enriched.qualityCheck = runQualityCheck(project) } catch (e) { console.warn('[enrich] quality', e) }
  try {
    if (!enriched.automationSales) {
      enriched.automationSales = generateAutomationSales(project.sector, project.businessName, project.city, project.goal)
    }
  } catch (e) { console.warn('[enrich] automations', e) }
  return enriched
}

export default function StudioPage() {
  const {
    messages, photos, isGenerating, generationJob,
    currentProject, activeTab, selectedFile, showPhotos,
    credits, error,
    addMessage, addPhoto, removePhoto, setShowPhotos,
    setIsGenerating, setGenerationJob,
    setCurrentProject, setActiveTab, setSelectedFile,
    setCredits, setError, resetStudio,
  } = useStudioStore()

  useEffect(() => {
    setCredits(getCredits())
  }, [setCredits])

  const runGeneration = useCallback(async (prompt: string, isRefine: boolean) => {
    if (!consumeCredit()) {
      addMessage('assistant', '❌ Plus de crédits disponibles. Upgradez votre plan pour continuer à générer des sites.')
      return
    }

    setIsGenerating(true)
    setError(null)

    // Analyze prompt locally for immediate feedback
    const analysis = analyzePrompt(prompt)
    addMessage('assistant', `🔍 Secteur détecté : **${analysis.sector}** · ${analysis.city}\n${analysis.missingInfo.length > 0 ? `💡 Tip : ${analysis.missingInfo.join(', ')} pour un meilleur résultat.` : ''}`)

    let step = 0
    const totalSteps = 11
    const interval = setInterval(() => {
      step = Math.min(step + 1, totalSteps - 1)
      setGenerationJob({
        id: 'current',
        status: 'building_site',
        progress: Math.round((step / totalSteps) * 85),
        estimatedSeconds: 0,
        currentStep: '',
        steps: [],
        logs: [],
        startedAt: new Date().toISOString(),
      })
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

      clearInterval(interval)

      if (!res.ok) {
        const err = await res.json() as { error?: string }
        throw new Error(err.error ?? `Erreur ${res.status}`)
      }

      const data = await res.json() as { project: GeneratedProject; mode?: string }
      let enriched: GeneratedProject
      try {
        enriched = enrichProject(data.project)
      } catch (e) {
        console.warn('[studio] enrichProject failed, using raw project', e)
        enriched = data.project
      }

      setGenerationJob({ id: 'current', status: 'completed', progress: 100, estimatedSeconds: 0, currentStep: '', steps: [], logs: [], startedAt: new Date().toISOString(), completedAt: new Date().toISOString() })
      setCurrentProject(enriched)
      setCredits(getCredits())
      window.dispatchEvent(new Event('credits-updated'))

      const modeLabel = data.mode === 'ai' ? '✦ Claude AI' : '(mode local)'
      const msg = isRefine
        ? `✅ Modifications appliquées ${modeLabel}\n\nLe site a été mis à jour selon vos instructions.`
        : `✅ Site généré ${modeLabel} !\n\n🏢 **${enriched.businessName}** — ${enriched.city}\n🎯 Secteur : ${enriched.sector}\n📋 ${enriched.sections.length} sections · ${enriched.visuals?.length ?? 0} visuels\n🤖 ${enriched.automationSales?.options.length ?? 0} automatisations\n📊 Qualité : ${enriched.qualityCheck?.score ?? '?'}/100\n\nExplorez les onglets : Visuels, Vendre, Offre, Devis, Vidéo, Qualité.`

      addMessage('assistant', msg)
      setActiveTab('preview')
      setMobileView('studio')
    } catch (err) {
      clearInterval(interval)
      const message = err instanceof Error ? err.message : 'Erreur inconnue'
      setError(message)
      addMessage('assistant', `❌ Erreur lors de la génération : ${message}\n\nRéessayez ou simplifiez votre description.`)
    } finally {
      setIsGenerating(false)
    }
  }, [currentProject, photos, addMessage, setIsGenerating, setGenerationJob, setCurrentProject, setCredits, setActiveTab, setError])

  const handleGenerate = useCallback((prompt: string) => {
    addMessage('user', prompt)
    const isMod = isModification(prompt, !!currentProject)
    addMessage('assistant', isMod
      ? '🔄 Modification en cours…\nJ\'applique vos instructions avec Claude AI.'
      : '🚀 Génération en cours…\nClaude AI analyse votre brief et crée votre site.',
    )
    void runGeneration(prompt, isMod)
  }, [addMessage, currentProject, runGeneration])

  const [mobileView, setMobileView] = useState<'chat' | 'studio'>('chat')

  const noProject = !currentProject
  const progress = generationJob?.progress ?? 0
  const step = generationJob ? Math.round((generationJob.progress / 100) * 10) : 0

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Chat column */}
      <div className={cn(
        'w-full lg:w-[360px] shrink-0 flex flex-col border-r border-border bg-[#09090f]',
        mobileView === 'studio' ? 'hidden lg:flex' : 'flex',
      )}>
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
          <LoadingSteps currentStep={step} progress={progress} mode={generationJob?.status === 'completed' ? 'ai' : ''} />
        ) : (
          <ChatPanel messages={messages} />
        )}

        {/* Photo uploader */}
        {showPhotos && (
          <div className="px-4 pb-3 border-t border-border pt-3 bg-[#09090f]">
            <PhotoUploader photos={photos} onChange={(newPhotos) => {
              // sync store photos
              const store = useStudioStore.getState()
              store.clearPhotos()
              newPhotos.forEach((p) => store.addPhoto(p))
            }} />
          </div>
        )}

        <PromptComposer
          onGenerate={handleGenerate}
          onPhotoClick={() => setShowPhotos(!showPhotos)}
          isGenerating={isGenerating}
          photoCount={photos.length}
        />

        {/* Mobile: "Voir le site" button — shown only after generation */}
        {currentProject && !isGenerating && (
          <button
            onClick={() => setMobileView('studio')}
            className="lg:hidden flex items-center justify-center gap-2 mx-4 mb-3 py-3 rounded-xl gradient-bg text-white text-sm font-semibold shadow-glow-sm"
          >
            <Monitor className="w-4 h-4" />
            Voir le site généré →
          </button>
        )}
      </div>

      {/* Main area */}
      <div className={cn(
        'flex-1 flex flex-col overflow-hidden',
        mobileView === 'chat' ? 'hidden lg:flex' : 'flex',
      )}>
        {/* Mobile back button */}
        <div className="lg:hidden flex items-center gap-2 px-3 py-2 border-b border-border bg-[#0a0a14]">
          <button
            onClick={() => setMobileView('chat')}
            className="flex items-center gap-1 text-muted hover:text-ink text-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Chat
          </button>
          {currentProject && (
            <span className="text-xs text-muted ml-2 truncate">{currentProject.businessName} — {currentProject.city}</span>
          )}
        </div>
        {/* Tabs */}
        <div className="flex items-center gap-0.5 px-2 py-2 border-b border-border bg-[#0a0a14] overflow-x-auto">
          {TABS.map((tab) => {
            const disabled = noProject && tab.id !== 'preview'
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => !disabled && setActiveTab(tab.id)}
                disabled={disabled}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0',
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
          {error && activeTab === 'preview' && !currentProject && (
            <ErrorState message={error} onRetry={() => {
              setError(null)
              const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')
              if (lastUserMsg) handleGenerate(lastUserMsg.content)
            }} />
          )}

          {activeTab === 'preview' && !error && (
            <SitePreview html={currentProject?.html ?? null} isGenerating={isGenerating} />
          )}
          {activeTab === 'plan' && currentProject && (
            <div className="flex-1 overflow-y-auto">
              <PlanPanel project={currentProject} />
            </div>
          )}
          {activeTab === 'images' && currentProject && (
            <ImageGalleryPreview project={currentProject} />
          )}
          {activeTab === 'automations' && currentProject && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <AutomationSalesPanel project={currentProject} />
            </div>
          )}
          {activeTab === 'offer' && currentProject && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <SalesPackPanel project={currentProject} />
            </div>
          )}
          {activeTab === 'quote' && currentProject && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <QuoteBuilderPanel project={currentProject} />
            </div>
          )}
          {activeTab === 'video' && currentProject && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <VideoDemoPanel project={currentProject} />
            </div>
          )}
          {activeTab === 'quality' && currentProject && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <QualityCheckPanel
                project={currentProject}
                onRegenerate={() => {
                  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')
                  if (lastUserMsg) handleGenerate(lastUserMsg.content)
                }}
              />
            </div>
          )}
          {activeTab === 'comparison' && currentProject && (
            <div className="flex-1 overflow-hidden flex flex-col">
              <ComparisonPanel project={currentProject} />
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
