import { create } from 'zustand'
import type { ChatMessage, GeneratedProject, GenerationJob, QualityCheck, StudioTab } from '@/types'
import { getCredits } from '@/lib/credits'

interface StudioState {
  // Chat
  messages: ChatMessage[]
  // Photos
  photos: string[]
  // Generation
  isGenerating: boolean
  generationJob: GenerationJob | null
  generationMode: string
  // Project
  currentProject: GeneratedProject | null
  // UI
  activeTab: StudioTab
  selectedFile: string
  showPhotos: boolean
  // Credits
  credits: number
  // Error
  error: string | null
  // Logs
  logs: string[]
}

interface StudioActions {
  addMessage: (role: ChatMessage['role'], content: string) => void
  setMessages: (messages: ChatMessage[]) => void
  addPhoto: (dataUrl: string) => void
  removePhoto: (index: number) => void
  clearPhotos: () => void
  setIsGenerating: (v: boolean) => void
  setGenerationJob: (job: GenerationJob | null) => void
  setGenerationMode: (mode: string) => void
  setCurrentProject: (project: GeneratedProject | null) => void
  setActiveTab: (tab: StudioTab) => void
  setSelectedFile: (file: string) => void
  setShowPhotos: (v: boolean) => void
  refreshCredits: () => void
  setCredits: (n: number) => void
  setError: (err: string | null) => void
  addLog: (log: string) => void
  clearLogs: () => void
  resetStudio: () => void
}

function makeMsg(role: ChatMessage['role'], content: string): ChatMessage {
  return { id: `msg_${Date.now()}_${Math.random()}`, role, content, timestamp: new Date().toISOString() }
}

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `Bonjour ! Je suis SitePilot AI, propulsé par Claude ✦\n\nDécris le commerce pour lequel tu veux créer un site — ville, secteur, style, objectif… Plus tu es précis, meilleur sera le résultat.\n\nJ'analyse ton brief et génère une maquette complète avec copywriting, design et HTML.`,
  timestamp: new Date().toISOString(),
}

const INITIAL_STATE: StudioState = {
  messages: [WELCOME],
  photos: [],
  isGenerating: false,
  generationJob: null,
  generationMode: '',
  currentProject: null,
  activeTab: 'preview',
  selectedFile: 'index.html',
  showPhotos: false,
  credits: 12,
  error: null,
  logs: [],
}

export const useStudioStore = create<StudioState & StudioActions>((set, get) => ({
  ...INITIAL_STATE,

  addMessage: (role, content) =>
    set((s) => ({ messages: [...s.messages, makeMsg(role, content)] })),

  setMessages: (messages) => set({ messages }),

  addPhoto: (dataUrl) =>
    set((s) => ({ photos: s.photos.length < 8 ? [...s.photos, dataUrl] : s.photos })),

  removePhoto: (index) =>
    set((s) => ({ photos: s.photos.filter((_, i) => i !== index) })),

  clearPhotos: () => set({ photos: [] }),

  setIsGenerating: (v) => set({ isGenerating: v }),

  setGenerationJob: (job) => set({ generationJob: job }),

  setGenerationMode: (mode) => set({ generationMode: mode }),

  setCurrentProject: (project) => set({ currentProject: project }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedFile: (file) => set({ selectedFile: file }),

  setShowPhotos: (v) => set({ showPhotos: v }),

  refreshCredits: () => set({ credits: getCredits() }),

  setCredits: (n) => set({ credits: n }),

  setError: (err) => set({ error: err }),

  addLog: (log) => set((s) => ({ logs: [...s.logs, log] })),

  clearLogs: () => set({ logs: [] }),

  resetStudio: () =>
    set({
      ...INITIAL_STATE,
      messages: [WELCOME],
      credits: getCredits(),
    }),
}))
