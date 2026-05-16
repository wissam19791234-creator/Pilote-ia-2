import { NextResponse } from 'next/server'

interface ResendTestResponse {
  configured: boolean
  hasApiKey: boolean
  hasAudienceId: boolean
  hasFromEmail: boolean
  message: string
}

export async function GET(): Promise<NextResponse<ResendTestResponse>> {
  // Ne jamais exposer les valeurs des clés, juste true/false
  const hasApiKey = !!process.env.RESEND_API_KEY
  const hasAudienceId = !!process.env.RESEND_AUDIENCE_ID
  const hasFromEmail = !!process.env.RESEND_FROM_EMAIL
  const configured = hasApiKey && hasAudienceId

  let message: string
  if (configured) {
    message = 'Resend est correctement configuré. Les leads seront envoyés par email.'
  } else if (!hasApiKey && !hasAudienceId) {
    message = 'Resend non configuré. Ajoutez RESEND_API_KEY et RESEND_AUDIENCE_ID dans vos variables d\'environnement.'
  } else if (!hasApiKey) {
    message = 'RESEND_API_KEY manquante. Créez une clé API sur resend.com/api-keys.'
  } else {
    message = 'RESEND_AUDIENCE_ID manquant. Créez une audience sur resend.com/audiences.'
  }

  return NextResponse.json({
    configured,
    hasApiKey,
    hasAudienceId,
    hasFromEmail,
    message,
  })
}
