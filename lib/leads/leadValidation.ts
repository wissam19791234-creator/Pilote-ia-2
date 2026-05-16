import { z } from 'zod'

export const LeadSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  sector: z.string().max(50).default('general'),
  needType: z.string().max(50).default('contact'),
  budget: z.string().max(50).optional(),
  delay: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
  businessName: z.string().max(100).trim(),
  siteId: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
  source: z.string().max(100).default('generated-site'),
  preferredContact: z.string().max(20).optional(),
})

export type LeadInput = z.infer<typeof LeadSchema>
