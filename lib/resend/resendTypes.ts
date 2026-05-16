export interface LeadData {
  name: string
  email: string
  phone?: string
  sector: string
  needType: string
  budget?: string
  delay?: string
  message?: string
  businessName: string
  siteId?: string
  city?: string
  source: string
  preferredContact?: string
}

export interface LeadScore {
  score: number
  level: 'cold' | 'warm' | 'hot'
  tags: string[]
  recommendedAction: string
}

export interface ResendContactPayload {
  email: string
  firstName?: string
  lastName?: string
  unsubscribed: boolean
  audienceId: string
}

export interface LeadApiResponse {
  success: boolean
  message: string
  leadScore?: number
  leadLevel?: string
  tags?: string[]
}
