import OpenAI from 'openai'

// DALL-E 3 image generation — OPENAI_API_KEY requis (variable d'env serveur uniquement)

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY non configurée')
  return new OpenAI({ apiKey })
}

export type ImageSize = '1024x1024' | '1792x1024' | '1024x1792'
export type ImageQuality = 'standard' | 'hd'

export interface GeneratedImage {
  url: string
  prompt: string
  revisedPrompt?: string
}

export async function generateImageWithDALLE(
  prompt: string,
  size: ImageSize = '1024x1024',
  quality: ImageQuality = 'standard',
): Promise<GeneratedImage> {
  const client = getClient()
  const response = await client.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size,
    quality,
    response_format: 'url',
  })
  const item = response.data?.[0]
  if (!item?.url) throw new Error('Pas d\'URL dans la réponse DALL-E')
  return {
    url: item.url,
    prompt,
    revisedPrompt: item.revised_prompt ?? undefined,
  }
}

export async function generateImagesWithDALLE(
  prompts: string[],
  size: ImageSize = '1024x1024',
): Promise<GeneratedImage[]> {
  const results: GeneratedImage[] = []
  for (const prompt of prompts) {
    try {
      const img = await generateImageWithDALLE(prompt, size)
      results.push(img)
    } catch (e) {
      console.error('[dalle] failed for prompt:', prompt.slice(0, 60), e)
      results.push({ url: '', prompt, revisedPrompt: undefined })
    }
  }
  return results
}

export function buildImagePrompts(
  sector: string,
  businessName: string,
  city: string,
  style: string,
): { hero: string; gallery: string[] } {
  const styleAdj = styleAdjectives[style] ?? 'professionnel et moderne'
  const sectorCtx = sectorContexts[sector] ?? sectorContexts.general

  return {
    hero: `${sectorCtx.hero}, ${styleAdj}, business "${businessName}" in ${city} France. Photorealistic, commercial photography, high-end marketing image, no text, no watermark.`,
    gallery: sectorCtx.gallery.map((g) =>
      `${g}, ${styleAdj}, ${sector} business in France. Photorealistic, professional photography, no text, no watermark.`
    ),
  }
}

const styleAdjectives: Record<string, string> = {
  luxe: 'luxury, premium, elegant, sophisticated, high-end',
  minimaliste: 'minimalist, clean, white space, refined',
  coloré: 'vibrant, colorful, dynamic, bold colors',
  féminin: 'feminine, soft, romantic, pastel colors',
  naturel: 'natural, organic, earthy, eco-friendly, warm tones',
  futuriste: 'futuristic, modern, tech, sleek',
  chaleureux: 'warm, cozy, welcoming, rustic',
  moderne: 'modern, contemporary, professional',
}

const sectorContexts: Record<string, { hero: string; gallery: string[] }> = {
  beauté: {
    hero: 'Beautiful modern beauty salon interior, elegant decor, soft lighting, luxury spa atmosphere',
    gallery: [
      'Professional hair styling in a premium salon',
      'Luxury facial treatment, spa setting, soft lighting',
      'Beautiful nail art design, close up, elegant',
      'Makeup artistry, beauty transformation result',
    ],
  },
  restaurant: {
    hero: 'Elegant restaurant interior, warm lighting, beautiful table setting, French cuisine ambiance',
    gallery: [
      'Gourmet dish plating, fine dining, professional food photography',
      'Fresh ingredients, chef preparing food, kitchen atmosphere',
      'Restaurant terrace with beautiful decor and lighting',
      'Dessert presentation, pastry art, elegant plating',
    ],
  },
  automobile: {
    hero: 'Professional car detailing studio, luxury vehicle, dramatic lighting, showroom quality',
    gallery: [
      'Car detailing close-up, perfect shine, professional result',
      'Luxury sports car, dramatic studio lighting',
      'Professional mechanic working, clean modern garage',
      'Before and after car detailing transformation',
    ],
  },
  événementiel: {
    hero: 'Stunning event setup, luxury wedding or gala decoration, elegant venue, beautiful lighting',
    gallery: [
      'Elegant wedding reception decoration, flowers and candles',
      'Corporate gala event setup, sophisticated decor',
      'Floral arrangements for events, professional design',
      'Happy guests at elegant celebration, luxury venue',
    ],
  },
  fitness: {
    hero: 'Modern fitness gym interior, professional equipment, energetic atmosphere',
    gallery: [
      'Personal training session, professional coach',
      'Group fitness class, energetic atmosphere',
      'Modern gym equipment, clean and professional',
      'Athlete achieving fitness goals, transformation',
    ],
  },
  immobilier: {
    hero: 'Luxury modern apartment or villa, beautiful interior design, natural lighting, premium real estate',
    gallery: [
      'Modern living room design, luxury interior',
      'Beautiful kitchen, premium appliances',
      'Luxury bedroom with stunning view',
      'Property exterior, beautiful garden, architecture',
    ],
  },
  coaching: {
    hero: 'Professional business coaching session, modern office, mentor and client, success atmosphere',
    gallery: [
      'Business strategy presentation, professional environment',
      'One-on-one coaching session, modern office setting',
      'Team workshop, collaborative environment',
      'Success and growth concept, professional achievement',
    ],
  },
  'e-commerce': {
    hero: 'Premium product photography on clean background, elegant packaging, luxury brand aesthetic',
    gallery: [
      'Product flat lay photography, elegant arrangement',
      'Lifestyle product shot, aspirational photography',
      'Premium packaging and unboxing experience',
      'Customer using product, happy lifestyle photography',
    ],
  },
  artisan: {
    hero: 'Skilled craftsman at work, workshop setting, professional tools, quality craftsmanship',
    gallery: [
      'Detailed craftwork, hands working with precision',
      'Before and after renovation project',
      'Professional workmanship, quality results',
      'Satisfied customer with completed project',
    ],
  },
  general: {
    hero: 'Modern professional business, clean design, welcoming atmosphere, successful team',
    gallery: [
      'Professional team meeting, modern office',
      'Business success concept, professional environment',
      'Customer service excellence, friendly professional',
      'Quality work results, professional achievement',
    ],
  },
}

// Stubs pour compatibilité
export async function generateWithOpenAI(_prompt: string): Promise<string> {
  throw new Error('Utilisez generateImageWithDALLE pour la génération d\'images')
}

export async function refineWithOpenAI(_html: string, _instruction: string): Promise<string> {
  throw new Error('Utilisez Claude pour la modification de sites')
}
