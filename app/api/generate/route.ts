import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { generateProject, generateHTMLSite, generateClientMessage } from '@/lib/generator'
import type { GeneratedProject } from '@/types'

const SYSTEM_PROMPT = `Tu es un expert en copywriting et création de sites web pour commerces locaux français. Tu génères du contenu persuasif, authentique et adapté au secteur. Tu réponds UNIQUEMENT en JSON valide, sans markdown, sans explication.`

function buildUserPrompt(prompt: string): string {
  return `Description du commerce : "${prompt}"

Génère un objet JSON avec ce contenu pour un site web professionnel :
{
  "businessName": "Nom du commerce détecté ou généré (max 3 mots)",
  "city": "Ville détectée ou 'France'",
  "sector": "UN de: beauté|restaurant|événementiel|automobile|mode|luxe|immobilier|coaching|médical|fitness|hôtellerie|e-commerce|artisan|general",
  "style": "UN de: luxe|minimaliste|coloré|féminin|naturel|futuriste|chaleureux|moderne",
  "goal": "UN de: devis|réservation|appel|whatsapp|ecommerce|contact",
  "heroTitle": "Titre accrocheur en français, max 10 mots, percutant",
  "heroSubtitle": "Sous-titre persuasif en français, max 25 mots, orienté bénéfice client",
  "ctaPrimary": "CTA principal avec →, max 5 mots",
  "ctaSecondary": "CTA secondaire, max 4 mots",
  "valueProposition": "2-3 phrases sur la valeur unique de ce commerce en français",
  "services": ["6 services concrets adaptés au secteur"],
  "painPoints": ["3 problèmes réels que vivent les clients de ce secteur"],
  "faq": [
    {"question": "Question pertinente ?", "answer": "Réponse détaillée et rassurante"}
  ],
  "testimonials": [
    {"name": "Prénom Nom français", "role": "Rôle ou contexte d'utilisation", "content": "Témoignage authentique et détaillé", "rating": 5}
  ],
  "automationNeeds": [],
  "ecommerceNeeds": [],
  "seoTitle": "Titre SEO max 60 caractères",
  "seoDescription": "Description meta max 160 caractères",
  "keywords": ["5-7 mots-clés pertinents"],
  "audience": "Description de l'audience cible en français",
  "tone": "premium|chaleureux|dynamique|professionnel"
}

Règles :
- faq doit avoir exactement 5 éléments
- testimonials doit avoir exactement 3 éléments
- automationNeeds : inclure si mention de devis auto, WhatsApp, chatbot, email auto, CRM, Instagram DM
- ecommerceNeeds : inclure si mention de boutique en ligne, vente, dropshipping
- Tout doit être en français, authentique et adapté au secteur
- Retourne UNIQUEMENT le JSON, rien d'autre`
}

function extractJSON(text: string): string {
  // Strip markdown code fences if present
  const match = text.match(/```(?:json)?\s*([\s\S]+?)```/)
  if (match) return match[1].trim()
  // Find first { and last }
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start !== -1 && end !== -1) return text.slice(start, end + 1)
  return text.trim()
}

function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') throw new Error('Prompt invalide')
  const trimmed = input.trim()
  if (trimmed.length < 5) throw new Error('Prompt trop court (minimum 5 caractères)')
  if (trimmed.length > 500) throw new Error('Prompt trop long (maximum 500 caractères)')
  // Basic injection prevention
  return trimmed.replace(/<script[\s\S]*?<\/script>/gi, '').slice(0, 500)
}

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>
    try {
      body = await request.json() as Record<string, unknown>
    } catch {
      return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 })
    }

    const prompt = sanitizeInput(body.prompt)
    const photos = Array.isArray(body.photos)
      ? (body.photos as string[]).slice(0, 8).filter((p) => typeof p === 'string' && p.startsWith('data:image/'))
      : []

    const apiKey = process.env.ANTHROPIC_API_KEY

    // Fallback to local generator if no API key
    if (!apiKey) {
      const project = generateProject(prompt, photos)
      return NextResponse.json({ project, mode: 'local' })
    }

    // Call Claude
    const client = new Anthropic({ apiKey })

    let aiData: Record<string, unknown>
    try {
      const message = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: buildUserPrompt(prompt) }],
      })

      const content = message.content[0]
      if (content.type !== 'text') throw new Error('Réponse inattendue de Claude')

      const jsonStr = extractJSON(content.text)
      aiData = JSON.parse(jsonStr) as Record<string, unknown>
    } catch (aiError) {
      // Claude failed, fallback to local
      console.error('Claude API error:', aiError)
      const project = generateProject(prompt, photos)
      return NextResponse.json({ project, mode: 'local-fallback' })
    }

    // Merge AI data with local generator
    const baseProject = generateProject(prompt, photos)
    const project = mergeAIData(baseProject, aiData, photos)

    return NextResponse.json({ project, mode: 'ai' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    const status = message.includes('trop') || message.includes('invalide') ? 400 : 500
    return NextResponse.json({ error: message }, { status })
  }
}

function getString(obj: Record<string, unknown>, key: string, fallback: string): string {
  const val = obj[key]
  return typeof val === 'string' && val.length > 0 ? val : fallback
}

function getStringArray(obj: Record<string, unknown>, key: string, fallback: string[]): string[] {
  const val = obj[key]
  if (!Array.isArray(val)) return fallback
  const strings = val.filter((x): x is string => typeof x === 'string')
  return strings.length > 0 ? strings : fallback
}

function mergeAIData(base: GeneratedProject, ai: Record<string, unknown>, photos: string[]): GeneratedProject {
  const merged = {
    ...base,
    businessName: getString(ai, 'businessName', base.businessName),
    city: getString(ai, 'city', base.city),
    sector: getString(ai, 'sector', base.sector),
    style: getString(ai, 'style', base.style),
    goal: getString(ai, 'goal', base.goal),
    tone: getString(ai, 'tone', base.tone),
    audience: getString(ai, 'audience', base.audience),
    valueProposition: getString(ai, 'valueProposition', base.valueProposition),
    services: getStringArray(ai, 'services', base.services),
    painPoints: getStringArray(ai, 'painPoints', base.painPoints),
    automationNeeds: getStringArray(ai, 'automationNeeds', base.automationNeeds),
    ecommerceNeeds: getStringArray(ai, 'ecommerceNeeds', base.ecommerceNeeds),
    copywriting: {
      ...base.copywriting,
      heroTitle: getString(ai, 'heroTitle', base.copywriting.heroTitle),
      heroSubtitle: getString(ai, 'heroSubtitle', base.copywriting.heroSubtitle),
      ctaPrimary: getString(ai, 'ctaPrimary', base.copywriting.ctaPrimary),
      ctaSecondary: getString(ai, 'ctaSecondary', base.copywriting.ctaSecondary),
      faq: Array.isArray(ai.faq) && (ai.faq as unknown[]).length >= 3
        ? (ai.faq as Array<{ question: string; answer: string }>).slice(0, 6)
        : base.copywriting.faq,
      testimonials: Array.isArray(ai.testimonials) && (ai.testimonials as unknown[]).length >= 2
        ? (ai.testimonials as Array<{ name: string; role: string; content: string; rating: number }>).slice(0, 4)
        : base.copywriting.testimonials,
    },
    seo: {
      title: getString(ai, 'seoTitle', base.seo.title),
      description: getString(ai, 'seoDescription', base.seo.description),
      keywords: getStringArray(ai, 'keywords', base.seo.keywords),
    },
  }

  // Regenerate HTML with AI content
  merged.html = generateHTMLSite(merged, photos)
  merged.copywriting.clientMessage = generateClientMessage(merged)
  merged.status = 'generated'

  return merged
}
