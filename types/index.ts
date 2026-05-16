export interface DesignSystem {
  palette: {
    background: string
    surface: string
    primary: string
    secondary: string
    accent: string
    text: string
    muted: string
  }
  mood: string
  typography: string
  buttonStyle: string
  cardStyle: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

export interface GeneratedFile {
  name: string
  type: 'html' | 'css' | 'js' | 'json'
  content: string
  size: string
}

export interface GeneratedPage {
  name: string
  slug: string
  sections: string[]
}

export interface GeneratedSection {
  id: string
  type: string
  title: string
  content: string
}

export interface GeneratedVisual {
  id: string
  type: 'hero' | 'gallery' | 'product' | 'background' | 'icon'
  title: string
  prompt: string
  cssPlaceholder: string
  alt: string
}

export interface QuoteField {
  id: string
  label: string
  type: 'text' | 'select' | 'number' | 'date' | 'textarea' | 'file'
  options?: string[]
  required: boolean
  placeholder?: string
}

export interface SmartQuote {
  sector: string
  formTitle: string
  formSubtitle: string
  fields: QuoteField[]
  adminSummaryTemplate: string
  clientConfirmationTemplate: string
  estimatedResponseTime: string
}

export interface ObjectionAnswer {
  objection: string
  responseShort: string
  responsePremium: string
  valueArgument: string
}

export interface SalesPack {
  recommendedOffer: string
  simplePack: CommercialPackV2
  premiumPack: CommercialPackV2
  automationPack: CommercialPackV2
  priceJustification: string[]
  objectionHandling: ObjectionAnswer[]
  pitchScript: string
  dmShort: string
  dmPremium: string
  emailProfessional: string
  followUps: string[]
  depositMessage: string
}

export interface CommercialPackV2 {
  name: string
  tagline: string
  price: string
  priceHigh: string
  features: string[]
  highlighted: boolean
}

export interface QualityIssue {
  id: string
  severity: 'warning' | 'error' | 'info'
  message: string
  fix?: string
}

export interface QualityCheck {
  score: number
  passed: boolean
  issues: QualityIssue[]
  suggestions: string[]
  checkedAt: string
}

export type GenerationStatus =
  | 'idle'
  | 'queued'
  | 'analyzing'
  | 'planning'
  | 'designing'
  | 'writing'
  | 'generating_images'
  | 'building_site'
  | 'building_automations'
  | 'building_sales_pack'
  | 'generating_video'
  | 'exporting'
  | 'quality_check'
  | 'completed'
  | 'error'

export interface GenerationStep {
  id: string
  title: string
  description: string
  status: 'waiting' | 'running' | 'done' | 'error'
  durationMs: number
  startedAt?: string
  completedAt?: string
}

export interface GenerationJob {
  id: string
  status: GenerationStatus
  progress: number
  estimatedSeconds: number
  currentStep: string
  steps: GenerationStep[]
  logs: string[]
  startedAt: string
  completedAt?: string
  error?: string
}

export interface PromptAnalysis {
  businessName: string
  sector: string
  city: string
  style: string
  goal: string
  targetAudience: string
  services: string[]
  products: string[]
  needsEcommerce: boolean
  needsBooking: boolean
  needsQuote: boolean
  needsWhatsapp: boolean
  needsAutomation: boolean
  confidenceScore: number
  missingInfo: string[]
}

export interface GeneratedProject {
  id: string
  projectName: string
  businessName: string
  city: string
  sector: string
  style: string
  goal: string
  tone: string
  audience: string
  valueProposition: string
  painPoints: string[]
  services: string[]
  products: string[]
  automationNeeds: string[]
  ecommerceNeeds: string[]
  designSystem: DesignSystem
  pages: GeneratedPage[]
  sections: GeneratedSection[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  copywriting: {
    heroTitle: string
    heroSubtitle: string
    ctaPrimary: string
    ctaSecondary: string
    faq: FAQItem[]
    testimonials: Testimonial[]
    clientMessage: string
  }
  files: GeneratedFile[]
  html: string
  photos: string[]
  createdAt: string
  status: 'draft' | 'generated' | 'exported'
  // Extended fields
  automationSales?: AutomationSalesData
  visuals?: GeneratedVisual[]
  smartQuote?: SmartQuote
  salesPack?: SalesPack
  qualityCheck?: QualityCheck
  promptAnalysis?: PromptAnalysis
}

export interface AutomationOptionDetails {
  formQuestions?: string[]
  whatsappMessage?: string
  whatsappExample?: string
  emailPro?: string
  emailChalleureux?: string
  followupJ1?: string
  followupJ3?: string
  followupJ7?: string
  scoreFields?: string[]
  crmColumns?: string[]
  dashboardMetrics?: string[]
  bookingInfo?: string
  paymentInfo?: string
}

export interface AutomationOption {
  id: string
  name: string
  category: string
  problem: string
  benefit: string
  complexity: 'simple' | 'moyenne' | 'avancée'
  perceivedValue: 'faible' | 'forte' | 'premium'
  salesPitch: string
  recommended: boolean
  price: string
  details: AutomationOptionDetails
}

export interface CommercialPack {
  id: string
  name: string
  tagline: string
  price: string
  priceHigh: string
  features: string[]
  automationIds: string[]
  highlighted: boolean
  color: string
}

export interface AutomationSalesData {
  options: AutomationOption[]
  packs: CommercialPack[]
  clientArgument: string
  priceScript: string
  readyMessage: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface ChatbotConfig {
  enabled: boolean
  level: 'none' | 'simple' | 'advanced'
  title: string
  welcomeMessage: string
  suggestedQuestions: string[]
  answers: Array<{ trigger: string; response: string }>
  leadCaptureFields: string[]
  ctaLabel: string
  whatsappMessage: string
  leadScoringEnabled: boolean
  crmEnabled: boolean
  primaryColor: string
}

export type StudioTab =
  | 'preview'
  | 'plan'
  | 'images'
  | 'automations'
  | 'offer'
  | 'quote'
  | 'chatbot'
  | 'resend'
  | 'video'
  | 'quality'
  | 'comparison'
  | 'files'
  | 'code'
  | 'export'
  | 'message'
