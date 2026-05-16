import { Composition } from 'remotion'
import type { GeneratedProject } from '@/types'

const defaultProject: GeneratedProject = {
  id: 'preview',
  projectName: 'Preview',
  businessName: 'Mon Commerce',
  city: 'Paris',
  sector: 'beauté',
  style: 'moderne',
  goal: 'contact',
  tone: 'professionnel',
  audience: 'Clients locaux',
  valueProposition: 'Service premium',
  painPoints: [],
  services: ['Service 1', 'Service 2', 'Service 3'],
  products: [],
  automationNeeds: ['Devis automatique', 'WhatsApp intelligent', 'Relances email'],
  ecommerceNeeds: [],
  designSystem: {
    palette: { background: '#0a0a14', surface: '#0d0d1a', primary: '#7c3aed', secondary: '#06b6d4', accent: '#8b5cf6', text: '#ffffff', muted: '#8892a4' },
    mood: 'moderne',
    typography: 'Syne',
    buttonStyle: 'rounded-xl',
    cardStyle: 'glass',
  },
  pages: [],
  sections: [],
  seo: { title: '', description: '', keywords: [] },
  copywriting: { heroTitle: 'Votre titre', heroSubtitle: 'Votre sous-titre', ctaPrimary: 'Nous contacter', ctaSecondary: '', faq: [], testimonials: [], clientMessage: '' },
  files: [],
  html: '',
  photos: [],
  createdAt: new Date().toISOString(),
  status: 'draft',
}

export function RemotionRoot() {
  // Lazy load to avoid type conflicts in production
  return null
}
