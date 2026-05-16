import { z } from 'zod'

export const GenerationInputSchema = z.object({
  prompt: z.string().min(3).max(1000),
  photos: z.array(z.string()).max(8).optional(),
})

export const RefineInputSchema = z.object({
  instruction: z.string().min(1).max(1000),
  project: z.any(),
  photos: z.array(z.string()).max(8).optional(),
})

export function sanitizePrompt(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input.trim().slice(0, 1000).replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+\s*=/gi, 'data-blocked=')
    .replace(/javascript:/gi, '')
}

export function validateGenerationInput(body: unknown): { prompt: string; photos?: string[] } {
  const parsed = GenerationInputSchema.safeParse(body)
  if (!parsed.success) throw new Error('Entrée invalide')
  return parsed.data
}

export function limitPromptLength(prompt: string, max = 1000): string {
  return prompt.slice(0, max)
}

export function validateImages(images: string[]): string[] {
  return images.slice(0, 8).filter((img) => {
    if (!img.startsWith('data:')) return false
    const mime = img.slice(5, img.indexOf(';'))
    return ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(mime)
  })
}

export function safeErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message.slice(0, 200)
  return 'Erreur inconnue'
}
