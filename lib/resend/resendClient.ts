import { Resend } from 'resend'

// Ne jamais exposer côté client
let _client: Resend | null = null

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY non configurée')
  if (!_client) _client = new Resend(apiKey)
  return _client
}

export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY && !!process.env.RESEND_AUDIENCE_ID
}

export function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL ?? 'noreply@sitepilot.ai'
}

export function getAudienceId(): string {
  const id = process.env.RESEND_AUDIENCE_ID
  if (!id) throw new Error('RESEND_AUDIENCE_ID non configuré')
  return id
}
