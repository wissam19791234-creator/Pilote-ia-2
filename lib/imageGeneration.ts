import type { GeneratedProject, GeneratedVisual } from '@/types'
import { nanoid } from 'nanoid'

interface PlaceholderStyle {
  gradient: string
  pattern?: string
  emoji?: string
  label: string
}

const SECTOR_HERO: Record<string, PlaceholderStyle> = {
  beauté: { gradient: 'linear-gradient(135deg, #fdf0e8 0%, #f5cba7 50%, #e8a87c 100%)', emoji: '💆', label: 'Institut beauté premium' },
  événementiel: { gradient: 'linear-gradient(135deg, #1a0533 0%, #4a1070 50%, #c9a96e 100%)', emoji: '✨', label: 'Événement luxe' },
  restaurant: { gradient: 'linear-gradient(135deg, #fdf6ec 0%, #f5deb3 50%, #c0392b 100%)', emoji: '🍽️', label: 'Restaurant chaleureux' },
  automobile: { gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #e63946 100%)', emoji: '🚗', label: 'Automobile premium' },
  immobilier: { gradient: 'linear-gradient(135deg, #0e1a2b 0%, #142235 50%, #c9a96e 100%)', emoji: '🏠', label: 'Immobilier prestige' },
  coaching: { gradient: 'linear-gradient(135deg, #f0f4ff 0%, #c7d2fe 50%, #4f46e5 100%)', emoji: '🎯', label: 'Coaching transformation' },
  'e-commerce': { gradient: 'linear-gradient(135deg, #fafafa 0%, #f5f0eb 50%, #c8a882 100%)', emoji: '✦', label: 'Boutique cosmétique' },
  fitness: { gradient: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #ff6b35 100%)', emoji: '💪', label: 'Studio fitness' },
  artisan: { gradient: 'linear-gradient(135deg, #f9f5f0 0%, #e8d5b0 50%, #2d6a4f 100%)', emoji: '🔧', label: 'Artisan expert' },
  médical: { gradient: 'linear-gradient(135deg, #f0f8ff 0%, #e8f4fd 50%, #2980b9 100%)', emoji: '🏥', label: 'Cabinet médical' },
}

const SECTOR_GALLERY: Record<string, PlaceholderStyle[]> = {
  beauté: [
    { gradient: 'linear-gradient(135deg, #fde8d8, #f5cba7)', emoji: '💄', label: 'Soin visage' },
    { gradient: 'linear-gradient(135deg, #fdf0e8, #e8c9a8)', emoji: '💅', label: 'Manucure' },
    { gradient: 'linear-gradient(135deg, #f5e6d3, #dab896)', emoji: '🌸', label: 'Massage' },
  ],
  'e-commerce': [
    { gradient: 'linear-gradient(135deg, #fafafa, #f0ebe5)', emoji: '✦', label: 'Sérum' },
    { gradient: 'linear-gradient(135deg, #f5f0eb, #e8ddd0)', emoji: '🌿', label: 'Crème hydratante' },
    { gradient: 'linear-gradient(135deg, #fdf8f3, #f0e8dc)', emoji: '💫', label: 'Coffret cadeau' },
  ],
  restaurant: [
    { gradient: 'linear-gradient(135deg, #fdf6ec, #f5deb3)', emoji: '🥗', label: 'Entrée' },
    { gradient: 'linear-gradient(135deg, #fef9f0, #f8d89a)', emoji: '🍝', label: 'Plat signature' },
    { gradient: 'linear-gradient(135deg, #fff8ee, #fce0a8)', emoji: '🍮', label: 'Dessert' },
  ],
  événementiel: [
    { gradient: 'linear-gradient(135deg, #1a0533, #6b3fa0)', emoji: '💒', label: 'Mariage' },
    { gradient: 'linear-gradient(135deg, #0d0d1a, #4a1070)', emoji: '🎊', label: 'Gala' },
    { gradient: 'linear-gradient(135deg, #13131f, #9b59b6)', emoji: '🥂', label: 'Cocktail' },
  ],
  automobile: [
    { gradient: 'linear-gradient(135deg, #0a0a0a, #2a2a2a)', emoji: '🚘', label: 'Véhicule' },
    { gradient: 'linear-gradient(135deg, #141414, #1e1e1e)', emoji: '⚙️', label: 'Atelier' },
    { gradient: 'linear-gradient(135deg, #0d0d0d, #252525)', emoji: '🔬', label: 'Diagnostic' },
  ],
}

function getHeroStyle(sector: string): PlaceholderStyle {
  for (const key of Object.keys(SECTOR_HERO)) {
    if (sector.toLowerCase().includes(key)) return SECTOR_HERO[key]
  }
  return { gradient: 'linear-gradient(135deg, #0a0a14, #7c3aed)', emoji: '✦', label: 'Business local' }
}

function getGalleryStyles(sector: string): PlaceholderStyle[] {
  for (const key of Object.keys(SECTOR_GALLERY)) {
    if (sector.toLowerCase().includes(key)) return SECTOR_GALLERY[key]
  }
  return [
    { gradient: 'linear-gradient(135deg, #f0f4ff, #c7d2fe)', emoji: '📸', label: 'Image 1' },
    { gradient: 'linear-gradient(135deg, #f5f0eb, #e8ddd0)', emoji: '📸', label: 'Image 2' },
    { gradient: 'linear-gradient(135deg, #f9f5f0, #e8d5b0)', emoji: '📸', label: 'Image 3' },
  ]
}

function makeCssPlaceholder(style: PlaceholderStyle, w: number, h: number): string {
  return `
    <div style="
      width:${w}px;height:${h}px;
      background:${style.gradient};
      border-radius:12px;
      display:flex;flex-direction:column;
      align-items:center;justify-content:center;
      gap:8px;font-family:sans-serif;
    ">
      <div style="font-size:48px">${style.emoji ?? '📸'}</div>
      <div style="color:rgba(0,0,0,0.5);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px">${style.label}</div>
    </div>
  `.trim()
}

export function generateVisualPlan(project: GeneratedProject): GeneratedVisual[] {
  const sector = project.sector
  const heroStyle = getHeroStyle(sector)
  const galleryStyles = getGalleryStyles(sector)

  const visuals: GeneratedVisual[] = [
    {
      id: nanoid(8),
      type: 'hero',
      title: `Hero — ${project.businessName}`,
      prompt: `Professional ${sector} hero image for ${project.businessName}, ${project.style} style, ${project.city}`,
      cssPlaceholder: makeCssPlaceholder(heroStyle, 800, 450),
      alt: `${project.businessName} — hero`,
    },
    ...galleryStyles.map((style, i) => ({
      id: nanoid(8),
      type: 'gallery' as const,
      title: style.label,
      prompt: `${style.label} photo for ${project.sector} business, professional, ${project.style}`,
      cssPlaceholder: makeCssPlaceholder(style, 400, 300),
      alt: style.label,
    })),
  ]

  // Add product visuals for e-commerce
  if (sector.includes('e-commerce') || project.ecommerceNeeds.length > 0) {
    const products = project.products.slice(0, 3)
    products.forEach((product, i) => {
      visuals.push({
        id: nanoid(8),
        type: 'product',
        title: product,
        prompt: `Product photo of ${product} for ${sector} brand, white/beige background, professional`,
        cssPlaceholder: makeCssPlaceholder(
          { gradient: 'linear-gradient(135deg, #fafafa, #f5f0eb)', emoji: '✦', label: product },
          300, 300,
        ),
        alt: product,
      })
    })
  }

  return visuals
}

export function generateLocalVisuals(project: GeneratedProject): GeneratedVisual[] {
  return generateVisualPlan(project)
}
