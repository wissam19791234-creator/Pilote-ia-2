import type { DesignSystem } from '@/types'

export interface DesignPreset {
  id: string
  name: string
  sectors: string[]
  styles: string[]
  designSystem: DesignSystem
  visualMotifs: string[]
  layoutStyle: string
}

const PRESETS: DesignPreset[] = [
  {
    id: 'beaute-premium',
    name: 'Beauté Premium',
    sectors: ['beauté', 'spa', 'bien-être'],
    styles: ['luxe premium', 'élégant', 'minimaliste'],
    designSystem: {
      palette: { background: '#fdf8f3', surface: '#fff8ee', primary: '#c9956a', secondary: '#8b6f5e', accent: '#d4a574', text: '#2d1b0e', muted: '#9a8478' },
      mood: 'chaud et luxueux',
      typography: 'Cormorant Garamond',
      buttonStyle: 'rounded-full',
      cardStyle: 'soft-shadow',
    },
    visualMotifs: ['fleurs', 'dorures', 'textures beige', 'lifestyle féminin'],
    layoutStyle: 'elegant-centered',
  },
  {
    id: 'evenementiel-luxe',
    name: 'Événementiel Luxe',
    sectors: ['événementiel', 'mariage', 'wedding'],
    styles: ['luxe premium', 'élégant', 'moderne'],
    designSystem: {
      palette: { background: '#0d0d18', surface: '#13131f', primary: '#c9a96e', secondary: '#9b59b6', accent: '#f8d7a3', text: '#ffffff', muted: '#8a8a9a' },
      mood: 'luxueux et festif',
      typography: 'Playfair Display',
      buttonStyle: 'rounded-lg',
      cardStyle: 'glass-dark',
    },
    visualMotifs: ['lumières dorées', 'fleurs élégantes', 'tables dressées', 'décor de mariage'],
    layoutStyle: 'full-screen-hero',
  },
  {
    id: 'restaurant-chaleureux',
    name: 'Restaurant Chaleureux',
    sectors: ['restaurant', 'brasserie', 'café'],
    styles: ['chaleureux', 'traditionnel', 'moderne'],
    designSystem: {
      palette: { background: '#fdf6ec', surface: '#fef9f0', primary: '#c0392b', secondary: '#e67e22', accent: '#27ae60', text: '#2c1a0e', muted: '#8a7465' },
      mood: 'chaleureux et appétissant',
      typography: 'Lora',
      buttonStyle: 'rounded-md',
      cardStyle: 'warm-border',
    },
    visualMotifs: ['plats appétissants', 'ambiance restaurant', 'terrasse', 'chef en cuisine'],
    layoutStyle: 'grid-asymmetric',
  },
  {
    id: 'ecommerce-cosmetique',
    name: 'E-commerce Cosmétique',
    sectors: ['e-commerce', 'cosmétique', 'skincare', 'parfum'],
    styles: ['minimaliste', 'clean', 'premium'],
    designSystem: {
      palette: { background: '#fafafa', surface: '#f5f0eb', primary: '#2d2d2d', secondary: '#b8a99a', accent: '#c8a882', text: '#1a1a1a', muted: '#8c7b6b' },
      mood: 'minimaliste et luxueux',
      typography: 'DM Sans',
      buttonStyle: 'rounded-none',
      cardStyle: 'clean-border',
    },
    visualMotifs: ['produits cosmétiques', 'fond studio blanc', 'routine skincare', 'ingrédients naturels'],
    layoutStyle: 'product-grid',
  },
  {
    id: 'auto-premium',
    name: 'Automobile Premium',
    sectors: ['automobile', 'garage', 'auto'],
    styles: ['moderne', 'premium', 'technique'],
    designSystem: {
      palette: { background: '#0a0a0a', surface: '#141414', primary: '#e63946', secondary: '#a8a8a8', accent: '#f1c40f', text: '#ffffff', muted: '#6b6b6b' },
      mood: 'puissant et technique',
      typography: 'Rajdhani',
      buttonStyle: 'rounded-sm',
      cardStyle: 'dark-sharp',
    },
    visualMotifs: ['voitures studio', 'moteur', 'route ouverte', 'détail carrosserie'],
    layoutStyle: 'dark-full-bleed',
  },
  {
    id: 'immobilier-prestige',
    name: 'Immobilier Prestige',
    sectors: ['immobilier', 'agence immo'],
    styles: ['luxe premium', 'élégant', 'professionnel'],
    designSystem: {
      palette: { background: '#0e1a2b', surface: '#142235', primary: '#c9a96e', secondary: '#4a90d9', accent: '#e8d5b0', text: '#ffffff', muted: '#8a9bb5' },
      mood: 'prestige et confiance',
      typography: 'Cormorant Garamond',
      buttonStyle: 'rounded-full',
      cardStyle: 'glass-dark',
    },
    visualMotifs: ['maisons de prestige', 'intérieurs luxueux', 'vue aérienne', 'bureau agence'],
    layoutStyle: 'property-grid',
  },
  {
    id: 'coaching-moderne',
    name: 'Coaching Moderne',
    sectors: ['coaching', 'formation', 'conseil'],
    styles: ['moderne', 'dynamique', 'professionnel'],
    designSystem: {
      palette: { background: '#f8f9ff', surface: '#eef1ff', primary: '#4f46e5', secondary: '#7c3aed', accent: '#06b6d4', text: '#1e1b4b', muted: '#6366f1' },
      mood: 'dynamique et inspirant',
      typography: 'Plus Jakarta Sans',
      buttonStyle: 'rounded-xl',
      cardStyle: 'gradient-border',
    },
    visualMotifs: ['personnes en réunion', 'tableau blanc', 'développement', 'succès'],
    layoutStyle: 'modern-sections',
  },
  {
    id: 'fitness-energique',
    name: 'Fitness Énergique',
    sectors: ['fitness', 'sport', 'gym'],
    styles: ['dynamique', 'coloré', 'moderne'],
    designSystem: {
      palette: { background: '#111111', surface: '#1a1a1a', primary: '#ff6b35', secondary: '#ffd23f', accent: '#06d6a0', text: '#ffffff', muted: '#888888' },
      mood: 'énergique et motivant',
      typography: 'Oswald',
      buttonStyle: 'rounded-md',
      cardStyle: 'dark-gradient',
    },
    visualMotifs: ['personnes sportives', 'salle de sport', 'équipements', 'résultats'],
    layoutStyle: 'bold-sections',
  },
  {
    id: 'artisan-local',
    name: 'Artisan Local',
    sectors: ['artisan', 'plombier', 'électricien', 'menuisier'],
    styles: ['chaleureux', 'professionnel', 'simple'],
    designSystem: {
      palette: { background: '#f9f5f0', surface: '#f0e8e0', primary: '#2d6a4f', secondary: '#40916c', accent: '#95d5b2', text: '#1b1b1b', muted: '#6c757d' },
      mood: 'fiable et local',
      typography: 'Inter',
      buttonStyle: 'rounded-lg',
      cardStyle: 'soft-border',
    },
    visualMotifs: ['artisan au travail', 'outils', 'réalisation', 'chantier'],
    layoutStyle: 'simple-sections',
  },
]

const DEFAULT_PRESET: DesignPreset = {
  id: 'default',
  name: 'Studio Moderne',
  sectors: [],
  styles: [],
  designSystem: {
    palette: { background: '#0a0a14', surface: '#0d0d1a', primary: '#7c3aed', secondary: '#06b6d4', accent: '#8b5cf6', text: '#ffffff', muted: '#8892a4' },
    mood: 'moderne et tech',
    typography: 'Syne',
    buttonStyle: 'rounded-xl',
    cardStyle: 'glass',
  },
  visualMotifs: ['interface tech', 'données', 'connexion'],
  layoutStyle: 'modern-sections',
}

export function getDesignPreset(sector: string, style: string = ''): DesignPreset {
  const sectorLow = sector.toLowerCase()
  const styleLow = style.toLowerCase()

  // Exact sector match
  for (const preset of PRESETS) {
    if (preset.sectors.some((s) => sectorLow.includes(s) || s.includes(sectorLow))) {
      // Check style bonus
      if (preset.styles.some((st) => styleLow.includes(st.split(' ')[0]))) {
        return preset
      }
      return preset
    }
  }

  // Partial keyword match
  for (const preset of PRESETS) {
    if (preset.styles.some((s) => styleLow.includes(s.split(' ')[0]))) {
      return preset
    }
  }

  return DEFAULT_PRESET
}

export function generateDesignSystem(sector: string, style: string): DesignSystem {
  return getDesignPreset(sector, style).designSystem
}
