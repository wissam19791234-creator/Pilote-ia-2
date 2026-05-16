import { NextResponse } from 'next/server'
import { LeadSchema } from '@/lib/leads/leadValidation'
import { calculateLeadScore } from '@/lib/leads/leadScoring'
import { createOrUpdateContact } from '@/lib/resend/resendContacts'
import { sendLeadNotification, sendProspectConfirmation } from '@/lib/resend/resendAutomation'
import { isResendConfigured } from '@/lib/resend/resendClient'
import type { LeadApiResponse } from '@/lib/resend/resendTypes'

export async function POST(request: Request): Promise<NextResponse<LeadApiResponse>> {
  try {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, message: 'Corps de la requête invalide.' },
        { status: 400 },
      )
    }

    const parsed = LeadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Données du formulaire invalides. Veuillez vérifier les champs requis.' },
        { status: 400 },
      )
    }

    const lead = parsed.data
    const score = calculateLeadScore(lead)

    if (isResendConfigured()) {
      // Chaque appel dans try/catch indépendant — un échec n'empêche pas les autres
      try {
        await createOrUpdateContact(lead, score)
      } catch (err) {
        console.error('[leads] createOrUpdateContact failed:', err instanceof Error ? err.message : err)
      }

      try {
        await sendLeadNotification(lead, score)
      } catch (err) {
        console.error('[leads] sendLeadNotification failed:', err instanceof Error ? err.message : err)
      }

      try {
        await sendProspectConfirmation(lead)
      } catch (err) {
        console.error('[leads] sendProspectConfirmation failed:', err instanceof Error ? err.message : err)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead reçu avec succès.',
      leadScore: score.score,
      leadLevel: score.level,
      tags: score.tags,
    })
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossible d'envoyer le lead pour le moment." },
      { status: 500 },
    )
  }
}
