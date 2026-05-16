import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getResendClient, getAudienceId, isResendConfigured } from '@/lib/resend/resendClient'

const ContactSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(200).optional(),
  audienceId: z.string().max(200).optional(),
})

export async function POST(request: Request): Promise<NextResponse<{ success: boolean; message: string }>> {
  try {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ success: false, message: 'Corps de la requête invalide.' }, { status: 400 })
    }

    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Données invalides. Champ email requis et valide.' },
        { status: 400 },
      )
    }

    if (!isResendConfigured()) {
      return NextResponse.json(
        { success: false, message: 'Resend non configuré. Veuillez ajouter RESEND_API_KEY et RESEND_AUDIENCE_ID.' },
        { status: 503 },
      )
    }

    const { email, name, audienceId: customAudienceId } = parsed.data

    let firstName: string | undefined
    let lastName: string | undefined
    if (name) {
      const parts = name.trim().split(/\s+/)
      firstName = parts[0]
      lastName = parts.length > 1 ? parts.slice(1).join(' ') : undefined
    }

    const audienceId = customAudienceId ?? getAudienceId()
    const client = getResendClient()

    await client.contacts.create({
      audienceId,
      email,
      ...(firstName ? { firstName } : {}),
      ...(lastName ? { lastName } : {}),
      unsubscribed: false,
    })

    return NextResponse.json({ success: true, message: `Contact ${email} créé ou mis à jour avec succès.` })
  } catch (err) {
    console.error('[resend/contact] Erreur:', err instanceof Error ? err.message : 'Erreur inconnue')
    return NextResponse.json(
      { success: false, message: 'Impossible de créer le contact pour le moment.' },
      { status: 500 },
    )
  }
}
