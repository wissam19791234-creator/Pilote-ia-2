import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { refineProject } from '@/lib/generator'
import type { GeneratedProject } from '@/types'

function sanitizeInput(input: unknown, max: number): string {
  if (typeof input !== 'string') throw new Error('Instruction invalide')
  const trimmed = input.trim()
  if (trimmed.length < 2) throw new Error('Instruction trop courte')
  if (trimmed.length > max) throw new Error(`Instruction trop longue (max ${max} caractères)`)
  return trimmed
}

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>
    try {
      body = await request.json() as Record<string, unknown>
    } catch {
      return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
    }

    const instruction = sanitizeInput(body.instruction, 300)
    const project = body.project as GeneratedProject | undefined
    const photos = Array.isArray(body.photos)
      ? (body.photos as string[]).slice(0, 8).filter((p) => typeof p === 'string' && p.startsWith('data:image/'))
      : []

    if (!project || typeof project !== 'object') {
      return NextResponse.json({ error: 'Projet invalide' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY

    // Without API key: use local refiner
    if (!apiKey) {
      const refined = refineProject(project, instruction)
      return NextResponse.json({ project: refined, mode: 'local' })
    }

    // With API key: ask Claude for specific modifications
    const client = new Anthropic({ apiKey })

    const systemPrompt = `Tu es un expert en design et copywriting de sites web. L'utilisateur veut modifier un site existant. Génère UNIQUEMENT du JSON valide avec les modifications demandées.`

    const userPrompt = `Site actuel pour "${project.businessName}" (${project.sector}, ${project.city}).
Style actuel : ${project.style}
Instruction de modification : "${instruction}"

Génère un JSON avec UNIQUEMENT les champs à modifier parmi :
- style, heroTitle, heroSubtitle, ctaPrimary, services (array), automationNeeds (array), ecommerceNeeds (array), colorHint

colorHint peut être : "violet"|"blue"|"cyan"|"green"|"rose"|"gold"|"dark"|"light"

Retourne UNIQUEMENT le JSON des modifications, rien d'autre.`

    try {
      const message = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      })

      const content = message.content[0]
      if (content.type !== 'text') throw new Error('Réponse inattendue')

      const jsonStr = content.text.replace(/```(?:json)?\s*([\s\S]+?)```/g, '$1').trim()
      const start = jsonStr.indexOf('{')
      const end = jsonStr.lastIndexOf('}')
      const aiMods = start !== -1 && end !== -1
        ? JSON.parse(jsonStr.slice(start, end + 1)) as Record<string, unknown>
        : {}

      // Apply AI modifications to the local refiner
      const refinedBase = refineProject(project, instruction)

      // Overlay AI-suggested changes
      if (typeof aiMods.heroTitle === 'string' && aiMods.heroTitle.length > 0) {
        refinedBase.copywriting.heroTitle = aiMods.heroTitle
      }
      if (typeof aiMods.heroSubtitle === 'string' && aiMods.heroSubtitle.length > 0) {
        refinedBase.copywriting.heroSubtitle = aiMods.heroSubtitle
      }
      if (typeof aiMods.ctaPrimary === 'string' && aiMods.ctaPrimary.length > 0) {
        refinedBase.copywriting.ctaPrimary = aiMods.ctaPrimary
      }
      if (Array.isArray(aiMods.services) && (aiMods.services as unknown[]).length > 0) {
        refinedBase.services = (aiMods.services as string[]).slice(0, 8)
      }
      if (Array.isArray(aiMods.automationNeeds)) {
        refinedBase.automationNeeds = aiMods.automationNeeds as string[]
      }

      const { generateHTMLSite } = require('@/lib/generator')
      refinedBase.html = generateHTMLSite(refinedBase, photos)

      return NextResponse.json({ project: refinedBase, mode: 'ai' })
    } catch {
      // Claude failed, use local refiner
      const refined = refineProject(project, instruction)
      return NextResponse.json({ project: refined, mode: 'local-fallback' })
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    const status = message.includes('invalide') || message.includes('trop') ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}
