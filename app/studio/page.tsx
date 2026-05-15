'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Sparkles, Eye, FileText, Code2, Download, MessageSquare, LayoutGrid } from 'lucide-react'
import type { ChatMessage, GeneratedProject, StudioTab } from '@/types'
import { generateProject, refineProject } from '@/lib/generator'
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
import PhotoUploader from '@/components/PhotoUploader'
import { cn } from '@/lib/utils'

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `Bonjour ! Je suis SitePilot AI 👋\n\nDécris le commerce pour lequel tu veux créer un site (nom, ville, secteur, style, objectif…) et je génère une maquette complète en quelques secondes.\n\nTu peux aussi ajouter des photos et utiliser les suggestions rapides ci-dessous.`,
  timestamp: new Date().toISOString(),
}

const TABS = [
  { id: 'preview' as const, label: 'Preview', icon: Eye },
  { id: 'plan' as const, label: 'Plan', icon: LayoutGrid },
  { id: 'files' as const, label: 'Fichiers', icon: FileText },
  { id: 'code' as const, label: 'Code', icon: Code2 },
  { id: 'export' as const, label: 'Export', icon: Download },
  { id: 'message' as const, label: 'Message', icon: MessageSquare },
]

const GENERATION_STEPS = [
  'Analyse du commerce et du marché',
  'Détection du secteur et de la niche',
  'Création de l\'architecture UX',
  'Génération du copywriting persuasif',
  'Création du design system personnalisé',
  'Intégration des photos uploadées',
  'Ajout des automatisations IA',
  'Création du formulaire intelligent',
  'Génération du code HTML/CSS',
  'Optimisation mobile et responsive',
  'Préparation de l\'export et du message client',
]

const MODIFICATION_KEYWORDS = [
  'plus luxe', 'plus premium', 'plus coloré', 'plus vendeur', 'plus conversion',
  'ajoute whatsapp', 'ajoute devis', 'section ecommerce', 'change couleur',
  'rends', 'modifie', 'ajoute', 'supprime', 'change', 'mets', 'met',
]

function isModification(text: string, hasProject: boolean): boolean {
  if (!hasProject) return false
  const lower = text.toLowerCase()
  return MODIFICATION_KEYWORDS.some((kw) => lower.includes(kw))
}

export default function StudioPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [currentProject, setCurrentProject] = useState<GeneratedProject | null>(null)
  const [photos, setPhotos] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [activeTab, setActiveTab] = useState<StudioTab>('preview')
  const [credits, setCredits] = useState(12)
  const [selectedFile, setSelectedFile] = useState('index.html')
  const [showPhotos, setShowPhotos] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setCredits(getCredits())
  }, [])

  const addMessage = useCallback((role: ChatMessage['role'], content: string) => {
    const msg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role,
      content,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, msg])
  }, [])

  const runGeneration = useCallback(async (prompt: string, isRefine: boolean) => {
    if (!consumeCredit()) {
      addMessage('assistant', '❌ Vous n\'avez plus de crédits. Upgradez votre plan pour continuer à générer des sites.')
      return
    }

    setIsGenerating(true)
    setGenerationStep(0)
    setGenerationProgress(0)
    setActiveTab('preview')

    const totalSteps = GENERATION_STEPS.length
    let step = 0

    intervalRef.current = setInterval(() => {
      step++
      setGenerationStep(step)
      setGenerationProgress(Math.round((step / totalSteps) * 100))
      if (step >= totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, 800)

    await new Promise((r) => setTimeout(r, totalSteps * 800 + 400))

    if (intervalRef.current) clearInterval(intervalRef.current)

    let project: GeneratedProject
    if (isRefine && currentProject) {
      project = refineProject(currentProject, prompt)
    } else {
      project = generateProject(prompt, photos)
    }

    setCurrentProject(project)
    setGenerationStep(totalSteps)
    setGenerationProgress(100)
    setIsGenerating(false)
    setCredits(getCredits())
    window.dispatchEvent(new Event('credits-updated'))

    addMessage(
      'assistant',
      isRefine
        ? `✅ Modifications appliquées !\n\nJ'ai mis à jour le design selon vos instructions. Consultez la preview pour voir les changements.`
        : `✅ Site généré avec succès !\n\n🎨 **${project.businessName}** — ${project.city}\n📁 ${project.sections.length} sections créées\n${project.automationNeeds.length > 0 ? `🤖 ${project.automationNeeds.join(', ')}\n` : ''}💌 Message client prêt\n\nVous pouvez modifier le design en tapant des instructions ici, ou exporter directement.`,
    )

    setActiveTab('preview')
  }, [currentProject, photos, addMessage])

  const handleGenerate = useCallback((prompt: string) => {
    addMessage('user', prompt)

    const isMod = isModification(prompt, !!currentProject)
    addMessage(
      'assistant',
      isMod
        ? `🔄 Modification en cours...\n\nJ'applique vos instructions sur le site existant.`
        : `🚀 Génération en cours...\n\nJ'analyse votre demande et je crée votre site premium. Cela prend environ 10 secondes.`,
    )

    void runGeneration(prompt, isMod)
  }, [addMessage, currentProject, runGeneration])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const noProject = !currentProject

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Chat */}
      <div className="w-full lg:w-[360px] shrink-0 flex flex-col border-r border-border bg-white">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-syne font-bold text-sm text-ink">SitePilot AI</p>
            <p className="text-[10px] text-muted">{credits} crédit{credits !== 1 ? 's' : ''} restant{credits !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {isGenerating ? (
          <LoadingSteps currentStep={generationStep} progress={generationProgress} />
        ) : (
          <ChatPanel messages={messages} />
        )}

        {/* Photo uploader (toggle) */}
        {showPhotos && (
          <div className="px-4 pb-3 border-t border-border pt-3">
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

      {/* Main preview area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-white overflow-x-auto">
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
                    ? 'bg-orange/10 text-orange font-bold'
                    : disabled
                    ? 'text-muted/40 cursor-not-allowed'
                    : 'text-muted hover:text-ink hover:bg-black/5',
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {activeTab === 'preview' && (
            <SitePreview html={currentProject?.html ?? null} isGenerating={isGenerating} />
          )}
          {activeTab === 'plan' && currentProject && (
            <div className="flex-1 overflow-y-auto">
              <PlanPanel project={currentProject} />
            </div>
          )}
          {activeTab === 'files' && currentProject && (
            <div className="flex-1 overflow-y-auto">
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
