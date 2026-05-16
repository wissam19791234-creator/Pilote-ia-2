import { getResendClient, getAudienceId } from './resendClient'
import type { LeadData, LeadScore } from './resendTypes'

export async function createOrUpdateContact(lead: LeadData, score: LeadScore): Promise<void> {
  // Tags ne sont pas directement supportés dans contacts.create —
  // ils seront passés comme metadata dans l'email de notification (voir resendAutomation.ts)
  try {
    const client = getResendClient()
    const audienceId = getAudienceId()

    const nameParts = lead.name.trim().split(/\s+/)
    const firstName = nameParts[0] ?? lead.name
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined

    await client.contacts.create({
      audienceId,
      email: lead.email,
      firstName,
      ...(lastName ? { lastName } : {}),
      unsubscribed: false,
    })
  } catch (err) {
    // Log sans exposer la clé API
    console.error('[resend] Erreur createOrUpdateContact:', err instanceof Error ? err.message : 'Erreur inconnue')
  }
}
