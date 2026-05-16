import { getResendClient, getFromEmail, isResendConfigured } from './resendClient'
import type { LeadData, LeadScore } from './resendTypes'

function buildLeadNotificationHtml(lead: LeadData, score: LeadScore): string {
  const levelColor = score.level === 'hot' ? '#ef4444' : score.level === 'warm' ? '#f59e0b' : '#3b82f6'
  const levelEmoji = score.level === 'hot' ? '🔥' : score.level === 'warm' ? '⚡' : '❄️'

  const rows = [
    ['Nom', lead.name],
    ['Email', lead.email],
    ['Téléphone', lead.phone ?? '—'],
    ['Entreprise', lead.businessName],
    ['Secteur', lead.sector],
    ['Besoin', lead.needType],
    ['Budget', lead.budget ?? '—'],
    ['Délai', lead.delay ?? '—'],
    ['Ville', lead.city ?? '—'],
    ['Source', lead.source],
    ['Contact préféré', lead.preferredContact ?? '—'],
    ['Message', lead.message ?? '—'],
  ]
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600; color: #374151; white-space: nowrap; border-right: 1px solid #e5e7eb;">${label}</td>
        <td style="padding: 8px 12px; color: #111827;">${value}</td>
      </tr>`,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Nouveau lead</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #f3f4f6;">
  <div style="max-width: 640px; margin: 32px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background: ${levelColor}; padding: 24px 32px;">
      <h1 style="margin: 0; color: #fff; font-size: 20px; font-weight: 700;">
        ${levelEmoji} Nouveau lead ${score.level.toUpperCase()} — ${lead.businessName}
      </h1>
      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
        Score : <strong>${score.score}/100</strong> · Action : ${score.recommendedAction}
      </p>
    </div>

    <!-- Lead info table -->
    <div style="padding: 24px 32px;">
      <h2 style="margin: 0 0 16px; font-size: 16px; color: #374151;">Informations du lead</h2>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <tbody>${rows}</tbody>
      </table>
    </div>

    <!-- Tags -->
    <div style="padding: 0 32px 24px;">
      <h2 style="margin: 0 0 12px; font-size: 16px; color: #374151;">Tags</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${score.tags.map((tag) => `<span style="display: inline-block; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 6px; padding: 3px 10px; font-size: 12px; font-weight: 500;">${tag}</span>`).join('')}
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 16px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; font-size: 12px; color: #6b7280;">
        Envoyé par SitePilot AI · ${new Date().toLocaleString('fr-FR')}
      </p>
    </div>
  </div>
</body>
</html>`
}

function buildProspectConfirmationHtml(lead: LeadData): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Votre demande a été reçue</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #f3f4f6;">
  <div style="max-width: 600px; margin: 32px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px;">
      <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700;">Votre demande a bien été reçue ✅</h1>
      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 15px;">${lead.businessName}</p>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
      <p style="margin: 0 0 16px; font-size: 16px; color: #111827;">
        Bonjour <strong>${lead.name}</strong>,
      </p>
      <p style="margin: 0 0 16px; color: #374151; line-height: 1.6;">
        Merci pour votre intérêt ! Nous avons bien reçu votre demande concernant <strong>${lead.businessName}</strong>
        et nous revenons vers vous très prochainement.
      </p>
      <p style="margin: 0 0 16px; color: #374151; line-height: 1.6;">
        Notre équipe a pris note de votre besoin <strong>${lead.needType}</strong>
        ${lead.delay ? `avec un délai de <strong>${lead.delay}</strong>` : ''}.
        Nous ferons tout pour vous répondre dans les meilleurs délais.
      </p>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 24px 0;">
        <p style="margin: 0; color: #15803d; font-weight: 600; font-size: 14px;">
          ✅ Récapitulatif de votre demande
        </p>
        <ul style="margin: 8px 0 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 1.8;">
          <li>Secteur : ${lead.sector}</li>
          <li>Besoin : ${lead.needType}</li>
          ${lead.budget ? `<li>Budget : ${lead.budget}</li>` : ''}
          ${lead.city ? `<li>Ville : ${lead.city}</li>` : ''}
        </ul>
      </div>

      <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
        À très bientôt,<br>
        <strong>L'équipe SitePilot AI</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="padding: 16px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; font-size: 12px; color: #9ca3af; text-align: center;">
        SitePilot AI · Ce message est automatique, vous pouvez y répondre directement.
      </p>
    </div>
  </div>
</body>
</html>`
}

export async function sendLeadNotification(lead: LeadData, score: LeadScore): Promise<void> {
  if (!isResendConfigured()) {
    console.warn('[resend] sendLeadNotification: Resend non configuré, notification ignorée.')
    return
  }

  try {
    const client = getResendClient()
    const from = getFromEmail()
    const levelEmoji = score.level === 'hot' ? '🔥' : score.level === 'warm' ? '⚡' : '❄️'

    await client.emails.send({
      from,
      to: from,
      subject: `${levelEmoji} Nouveau lead ${score.level.toUpperCase()} — ${lead.businessName}`,
      html: buildLeadNotificationHtml(lead, score),
    })
  } catch (err) {
    console.error('[resend] Erreur sendLeadNotification:', err instanceof Error ? err.message : 'Erreur inconnue')
  }
}

export async function sendProspectConfirmation(lead: LeadData): Promise<void> {
  if (!isResendConfigured()) {
    console.warn('[resend] sendProspectConfirmation: Resend non configuré, confirmation ignorée.')
    return
  }

  try {
    const client = getResendClient()
    const from = getFromEmail()

    await client.emails.send({
      from,
      to: lead.email,
      subject: `Votre demande a bien été reçue — ${lead.businessName}`,
      html: buildProspectConfirmationHtml(lead),
    })
  } catch (err) {
    console.error('[resend] Erreur sendProspectConfirmation:', err instanceof Error ? err.message : 'Erreur inconnue')
  }
}
