import { NextResponse } from 'next/server'
import { generateImagesWithDALLE, buildImagePrompts, type ImageSize } from '@/lib/openai'

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>
    try {
      body = await request.json() as Record<string, unknown>
    } catch {
      return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENAI_API_KEY non configurée. Ajoutez-la dans vos variables d\'environnement.' }, { status: 503 })
    }

    // Mode 1 : prompts personnalisés fournis directement
    if (Array.isArray(body.prompts)) {
      const prompts = (body.prompts as unknown[])
        .filter((p): p is string => typeof p === 'string' && p.length > 0)
        .slice(0, 5) // max 5 images par appel
        .map((p) => p.trim().slice(0, 900))

      if (prompts.length === 0) {
        return NextResponse.json({ error: 'Aucun prompt valide fourni' }, { status: 400 })
      }

      const size: ImageSize = typeof body.size === 'string' &&
        ['1024x1024', '1792x1024', '1024x1792'].includes(body.size)
        ? body.size as ImageSize
        : '1024x1024'

      const images = await generateImagesWithDALLE(prompts, size)
      return NextResponse.json({ images, mode: 'custom' })
    }

    // Mode 2 : génération automatique depuis le secteur du projet
    const sector = typeof body.sector === 'string' ? body.sector.slice(0, 50) : 'general'
    const businessName = typeof body.businessName === 'string' ? body.businessName.slice(0, 60) : 'Business'
    const city = typeof body.city === 'string' ? body.city.slice(0, 40) : 'France'
    const style = typeof body.style === 'string' ? body.style.slice(0, 40) : 'moderne'
    const heroOnly = body.heroOnly === true

    const prompts = buildImagePrompts(sector, businessName, city, style)
    const toGenerate = heroOnly ? [prompts.hero] : [prompts.hero, ...prompts.gallery.slice(0, 3)]

    const images = await generateImagesWithDALLE(toGenerate, '1024x1024')
    return NextResponse.json({ images, prompts, mode: 'auto' })

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    const status = message.includes('OPENAI_API_KEY') ? 503 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
