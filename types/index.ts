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
  automationSales?: AutomationSalesData
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

export type StudioTab = 'preview' | 'plan' | 'files' | 'code' | 'export' | 'message' | 'automations'
