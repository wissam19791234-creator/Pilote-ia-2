import type { DesignSystem } from '@/types'

export interface DAPreset {
  id: string
  name: string
  sectors: string[]
  styleKeywords: string[]
  palette: {
    background: string
    surface: string
    surfaceAlt: string
    primary: string
    secondary: string
    accent: string
    text: string
    muted: string
    gradient: string
  }
  layout: 'split-hero' | 'centered-hero' | 'editorial-hero' | 'luxury-fullscreen' | 'ecommerce-focus' | 'local-conversion' | 'event-portfolio' | 'app-landing'
  typography: {
    heading: string
    body: string
    googleFontUrl: string
  }
  mood: string
  buttonStyle: 'gradient' | 'outlined' | 'solid' | 'glass'
  cardStyle: 'white-shadow' | 'glass' | 'dark-glass' | 'colored-border' | 'minimal'
  heroEmoji: string
  animationSpeed: 'slow' | 'medium' | 'fast'
}

// ─── Legacy interface for backwards compatibility ─────────────────────────────
export interface DesignPreset {
  id: string
  name: string
  sectors: string[]
  styles: string[]
  designSystem: DesignSystem
  visualMotifs: string[]
  layoutStyle: string
}

// ─── 12 DA Presets ────────────────────────────────────────────────────────────

const DA_PRESETS: DAPreset[] = [
  {
    id: 'beauty-nude-luxe',
    name: 'Beauté Nude Luxe',
    sectors: ['beauté', 'esthétique', 'brow', 'onglerie', 'nail', 'coiffure', 'salon', 'beauty', 'lash'],
    styleKeywords: ['doux', 'féminin', 'premium', 'luxe', 'élégant', 'nude', 'rose', 'pastel'],
    palette: {
      background: '#fdf8f3',
      surface: '#fff4ea',
      surfaceAlt: '#fef0e4',
      primary: '#c9956a',
      secondary: '#e8c4a0',
      accent: '#d4785a',
      text: '#2d1b0e',
      muted: '#9a8478',
      gradient: 'linear-gradient(135deg, #c9956a 0%, #e8c4a0 50%, #f5c6c6 100%)',
    },
    layout: 'split-hero',
    typography: {
      heading: "'Playfair Display', serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'doux, féminin, premium',
    buttonStyle: 'gradient',
    cardStyle: 'white-shadow',
    heroEmoji: '✨',
    animationSpeed: 'slow',
  },
  {
    id: 'event-neon-prestige',
    name: 'Événementiel Neon Prestige',
    sectors: ['événementiel', 'mariage', 'traiteur', 'event', 'animation', 'soirée', 'wedding'],
    styleKeywords: ['luxe', 'lumineux', 'festif', 'prestige', 'doré', 'nuit', 'neon'],
    palette: {
      background: '#120b1e',
      surface: '#1c1230',
      surfaceAlt: '#241840',
      primary: '#d4af37',
      secondary: '#9b4fa8',
      accent: '#f8d7a3',
      text: '#ffffff',
      muted: '#a89bc0',
      gradient: 'linear-gradient(135deg, #9b4fa8 0%, #1c1230 50%, #d4af37 100%)',
    },
    layout: 'event-portfolio',
    typography: {
      heading: "'Syne', sans-serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'luxe, lumineux, festif',
    buttonStyle: 'glass',
    cardStyle: 'dark-glass',
    heroEmoji: '🎊',
    animationSpeed: 'medium',
  },
  {
    id: 'restaurant-terracotta',
    name: 'Restaurant Terracotta',
    sectors: ['restaurant', 'pizzeria', 'food', 'bistro', 'brasserie', 'café', 'cuisine', 'traiteur', 'chef', 'gastronomie'],
    styleKeywords: ['chaleureux', 'gourmand', 'authentique', 'convivial', 'terroir', 'rustique'],
    palette: {
      background: '#fdf6ec',
      surface: '#fef9f0',
      surfaceAlt: '#fff4e6',
      primary: '#c0553a',
      secondary: '#e07832',
      accent: '#27ae60',
      text: '#2c1a0e',
      muted: '#8a7465',
      gradient: 'linear-gradient(135deg, #c0553a 0%, #e07832 60%, #f5a623 100%)',
    },
    layout: 'local-conversion',
    typography: {
      heading: "'Syne', sans-serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'chaleureux, gourmand',
    buttonStyle: 'solid',
    cardStyle: 'colored-border',
    heroEmoji: '🍽️',
    animationSpeed: 'medium',
  },
  {
    id: 'cosmetic-minimal',
    name: 'Cosmétique Minimaliste',
    sectors: ['cosmétique', 'skincare', 'parfum', 'luxe', 'e-commerce beauté', 'ecommerce', 'boutique', 'shop'],
    styleKeywords: ['minimaliste', 'premium', 'clean', 'épuré', 'sophistiqué', 'blanc', 'champagne'],
    palette: {
      background: '#fafaf8',
      surface: '#f5f2ed',
      surfaceAlt: '#ede8e0',
      primary: '#1a1a1a',
      secondary: '#c9a96e',
      accent: '#d4b896',
      text: '#1a1a1a',
      muted: '#8a7d6e',
      gradient: 'linear-gradient(135deg, #fafaf8 0%, #f0e8d8 50%, #e8d4b8 100%)',
    },
    layout: 'ecommerce-focus',
    typography: {
      heading: "'Playfair Display', serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'minimaliste premium',
    buttonStyle: 'outlined',
    cardStyle: 'minimal',
    heroEmoji: '🌿',
    animationSpeed: 'slow',
  },
  {
    id: 'auto-sport-premium',
    name: 'Auto Sport Premium',
    sectors: ['automobile', 'garage', 'détailing', 'carrosserie', 'auto', 'voiture', 'mécanique'],
    styleKeywords: ['dynamique', 'performance', 'puissant', 'sport', 'technique', 'racing'],
    palette: {
      background: '#0d0d0d',
      surface: '#141414',
      surfaceAlt: '#1a1a1a',
      primary: '#e63946',
      secondary: '#6c757d',
      accent: '#c1121f',
      text: '#ffffff',
      muted: '#8d8d8d',
      gradient: 'linear-gradient(135deg, #0d0d0d 0%, #2d2d2d 50%, #e63946 100%)',
    },
    layout: 'split-hero',
    typography: {
      heading: "'Syne', sans-serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'dynamique, performance',
    buttonStyle: 'solid',
    cardStyle: 'dark-glass',
    heroEmoji: '🚗',
    animationSpeed: 'fast',
  },
  {
    id: 'real-estate-prestige',
    name: 'Immobilier Prestige',
    sectors: ['immobilier', 'agence immobilière', 'agence immo', 'logement', 'appartement', 'maison'],
    styleKeywords: ['prestige', 'confiance', 'premium', 'professionnel', 'élégant', 'bleu nuit'],
    palette: {
      background: '#f8f9fa',
      surface: '#ffffff',
      surfaceAlt: '#eef0f4',
      primary: '#1a2744',
      secondary: '#c9a96e',
      accent: '#2c4a8a',
      text: '#1a1a2e',
      muted: '#6c757d',
      gradient: 'linear-gradient(135deg, #1a2744 0%, #2c4a8a 50%, #c9a96e 100%)',
    },
    layout: 'split-hero',
    typography: {
      heading: "'Playfair Display', serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'confiance, prestige',
    buttonStyle: 'gradient',
    cardStyle: 'white-shadow',
    heroEmoji: '🏠',
    animationSpeed: 'slow',
  },
  {
    id: 'fitness-energy',
    name: 'Fitness Énergie',
    sectors: ['fitness', 'sport', 'musculation', 'gym', 'coach sportif', 'salle de sport'],
    styleKeywords: ['énergie', 'mouvement', 'dynamique', 'intense', 'force', 'motivation'],
    palette: {
      background: '#0a0e1a',
      surface: '#121828',
      surfaceAlt: '#1a2436',
      primary: '#f97316',
      secondary: '#22d3ee',
      accent: '#fb923c',
      text: '#ffffff',
      muted: '#94a3b8',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 40%, #22d3ee 100%)',
    },
    layout: 'app-landing',
    typography: {
      heading: "'Syne', sans-serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'énergie, mouvement',
    buttonStyle: 'gradient',
    cardStyle: 'dark-glass',
    heroEmoji: '💪',
    animationSpeed: 'fast',
  },
  {
    id: 'wellness-organic',
    name: 'Wellness Organique',
    sectors: ['spa', 'massage', 'bien-être', 'naturopathie', 'yoga', 'méditation', 'thérapeute', 'ostéopathe', 'kiné'],
    styleKeywords: ['naturel', 'calme', 'organique', 'bio', 'zen', 'sérénité', 'végétal'],
    palette: {
      background: '#f5f0e8',
      surface: '#faf6f0',
      surfaceAlt: '#ede6d8',
      primary: '#5f7a5e',
      secondary: '#c4a882',
      accent: '#7a9e79',
      text: '#2a2a20',
      muted: '#8a7d68',
      gradient: 'linear-gradient(135deg, #5f7a5e 0%, #7a9e79 50%, #c4a882 100%)',
    },
    layout: 'centered-hero',
    typography: {
      heading: "'Playfair Display', serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'naturel, calme',
    buttonStyle: 'outlined',
    cardStyle: 'white-shadow',
    heroEmoji: '🌿',
    animationSpeed: 'slow',
  },
  {
    id: 'fashion-editorial',
    name: 'Fashion Éditorial',
    sectors: ['mode', 'boutique', 'vêtements', 'accessoires', 'fashion', 'prêt-à-porter', 'création'],
    styleKeywords: ['magazine', 'editorial', 'avant-garde', 'tendance', 'chic', 'contemporain'],
    palette: {
      background: '#fafafa',
      surface: '#ffffff',
      surfaceAlt: '#f0f0f0',
      primary: '#1a1a1a',
      secondary: '#e91e8c',
      accent: '#ff4db8',
      text: '#1a1a1a',
      muted: '#6b7280',
      gradient: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #e91e8c 100%)',
    },
    layout: 'editorial-hero',
    typography: {
      heading: "'Syne', sans-serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'magazine, éditorial',
    buttonStyle: 'solid',
    cardStyle: 'minimal',
    heroEmoji: '👗',
    animationSpeed: 'medium',
  },
  {
    id: 'tech-saas-clean',
    name: 'Tech & SaaS Clean',
    sectors: ['coaching', 'consultant', 'agence', 'digital', 'tech', 'formation', 'saas', 'startup', 'web', 'marketing'],
    styleKeywords: ['moderne', 'clean', 'futuriste', 'technologie', 'digital', 'innovation', 'propre'],
    palette: {
      background: '#f0f4ff',
      surface: '#ffffff',
      surfaceAlt: '#e8eeff',
      primary: '#4f46e5',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      text: '#1e1b4b',
      muted: '#6366f1',
      gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #8b5cf6 100%)',
    },
    layout: 'app-landing',
    typography: {
      heading: "'Syne', sans-serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'propre, moderne',
    buttonStyle: 'gradient',
    cardStyle: 'glass',
    heroEmoji: '🚀',
    animationSpeed: 'medium',
  },
  {
    id: 'wedding-romantic',
    name: 'Mariage Romantique',
    sectors: ['mariage', 'wedding planner', 'wedding', 'photo mariage', 'photographe mariage', 'cérémonie'],
    styleKeywords: ['romantique', 'élégant', 'tendre', 'luxe doux', 'rose poudré', 'champagne', 'ivoire'],
    palette: {
      background: '#fff9f5',
      surface: '#fff4ee',
      surfaceAlt: '#feeee4',
      primary: '#c17f58',
      secondary: '#e8c4a0',
      accent: '#d4956a',
      text: '#2d1a0e',
      muted: '#a08070',
      gradient: 'linear-gradient(135deg, #f5c6b0 0%, #e8c4a0 50%, #c17f58 100%)',
    },
    layout: 'event-portfolio',
    typography: {
      heading: "'Playfair Display', serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'romantique, luxe doux',
    buttonStyle: 'outlined',
    cardStyle: 'white-shadow',
    heroEmoji: '💍',
    animationSpeed: 'slow',
  },
  {
    id: 'artisan-local',
    name: 'Artisan Local',
    sectors: ['artisan', 'plombier', 'électricien', 'menuisier', 'bâtiment', 'peintre', 'renovation', 'charpentier', 'maçon'],
    styleKeywords: ['confiance', 'expertise', 'local', 'professionnel', 'fiable', 'solide', 'brun', 'ambre'],
    palette: {
      background: '#fdf8f0',
      surface: '#ffffff',
      surfaceAlt: '#f5ede0',
      primary: '#92400e',
      secondary: '#d97706',
      accent: '#b45309',
      text: '#1c1003',
      muted: '#78716c',
      gradient: 'linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)',
    },
    layout: 'local-conversion',
    typography: {
      heading: "'Syne', sans-serif",
      body: "'DM Sans', sans-serif",
      googleFontUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap',
    },
    mood: 'confiance, expertise',
    buttonStyle: 'solid',
    cardStyle: 'colored-border',
    heroEmoji: '🔧',
    animationSpeed: 'medium',
  },
]

// ─── Preset selection logic ───────────────────────────────────────────────────

export function selectDAPreset(sector: string, style: string, prompt: string): DAPreset {
  const sectorLow = sector.toLowerCase()
  const styleLow = style.toLowerCase()
  const promptLow = prompt.toLowerCase()
  const combined = `${sectorLow} ${styleLow} ${promptLow}`

  let bestPreset: DAPreset | null = null
  let bestScore = -1

  for (const preset of DA_PRESETS) {
    let score = 0

    // Score by sector match
    for (const s of preset.sectors) {
      if (combined.includes(s)) score += 10
      if (sectorLow.includes(s) || s.includes(sectorLow)) score += 8
    }

    // Score by style keyword match
    for (const kw of preset.styleKeywords) {
      if (combined.includes(kw)) score += 5
    }

    if (score > bestScore) {
      bestScore = score
      bestPreset = preset
    }
  }

  // If no match found, pick a sensible default based on broad sector
  if (!bestPreset || bestScore === 0) {
    if (/beauté|coiffure|esthétique|onglerie|nail/.test(combined)) return DA_PRESETS[0]
    if (/restaurant|food|bistro|pizzeria/.test(combined)) return DA_PRESETS[2]
    if (/auto|garage|voiture|détailing/.test(combined)) return DA_PRESETS[4]
    if (/immobilier/.test(combined)) return DA_PRESETS[5]
    if (/fitness|sport|gym|musculation/.test(combined)) return DA_PRESETS[6]
    if (/spa|massage|bien-être|naturo/.test(combined)) return DA_PRESETS[7]
    if (/mode|boutique|fashion/.test(combined)) return DA_PRESETS[8]
    if (/mariage|wedding/.test(combined)) return DA_PRESETS[10]
    if (/artisan|plombier|électricien|menuisier/.test(combined)) return DA_PRESETS[11]
    return DA_PRESETS[9] // tech-saas-clean as universal default
  }

  return bestPreset
}

// ─── Backwards-compatibility helpers ─────────────────────────────────────────

export function getDesignPreset(sector: string, style: string = ''): DAPreset {
  return selectDAPreset(sector, style, '')
}

export function generateDesignSystem(sector: string, style: string): DesignSystem {
  const preset = selectDAPreset(sector, style, '')
  const { palette } = preset

  return {
    palette: {
      background: palette.background,
      surface: palette.surface,
      primary: palette.primary,
      secondary: palette.secondary,
      accent: palette.accent,
      text: palette.text,
      muted: palette.muted,
    },
    mood: preset.mood,
    typography: preset.typography.heading,
    buttonStyle: preset.buttonStyle,
    cardStyle: preset.cardStyle,
  }
}
