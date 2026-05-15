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
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export type StudioTab = 'preview' | 'plan' | 'files' | 'code' | 'export' | 'message'
