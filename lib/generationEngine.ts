import { nanoid } from 'nanoid'
import type { GenerationJob, GenerationStatus, GenerationStep } from '@/types'

const DEMO_SPEED: 'normal' | 'fast' = process.env.NODE_ENV === 'development' ? 'fast' : 'normal'
const STEP_DURATION_MS = DEMO_SPEED === 'fast' ? 1200 : 8000

const STEP_DEFS: Array<{ id: string; title: string; description: string; weight: number }> = [
  { id: 'analyze', title: 'Analyse du prompt', description: 'Détection du secteur, style, ville et objectif', weight: 1 },
  { id: 'plan', title: 'Planification du site', description: 'Architecture UX et sections à générer', weight: 1 },
  { id: 'design', title: 'Création du design system', description: 'Palette, typographie et style visuel', weight: 1 },
  { id: 'copy', title: 'Génération du copywriting', description: 'Titre, accroche, services et CTA', weight: 2 },
  { id: 'images', title: 'Préparation des visuels', description: 'Placeholders et prompts images', weight: 1 },
  { id: 'html', title: 'Génération du HTML/CSS', description: 'Code complet du site avec toutes les sections', weight: 3 },
  { id: 'automations', title: 'Construction des automatisations', description: 'Options et packs commerciaux à proposer', weight: 1 },
  { id: 'quote', title: 'Création du formulaire devis', description: 'Formulaire intelligent adapté au secteur', weight: 1 },
  { id: 'sales', title: 'Pack de vente généré', description: 'Argumentaire, scripts et objections', weight: 1 },
  { id: 'quality', title: 'Contrôle qualité', description: "Vérification du site avant livraison", weight: 1 },
  { id: 'export', title: 'Préparation de l\'export', description: 'HTML et ZIP prêts à télécharger', weight: 1 },
]

export function createGenerationJob(): GenerationJob {
  const steps: GenerationStep[] = STEP_DEFS.map((def) => ({
    id: def.id,
    title: def.title,
    description: def.description,
    status: 'waiting' as const,
    durationMs: 0,
  }))

  return {
    id: nanoid(10),
    status: 'queued',
    progress: 0,
    estimatedSeconds: DEMO_SPEED === 'fast' ? 15 : 90,
    currentStep: '',
    steps,
    logs: ['Démarrage du job de génération…'],
    startedAt: new Date().toISOString(),
  }
}

export function estimateGenerationTime(): number {
  return DEMO_SPEED === 'fast' ? 15 : 90
}

type Callbacks = {
  onUpdate: (job: GenerationJob) => void
  onComplete: () => void
  onError: (error: string) => void
}

const STATUS_SEQUENCE: GenerationStatus[] = [
  'analyzing', 'planning', 'designing', 'writing',
  'generating_images', 'building_site', 'building_automations',
  'building_sales_pack', 'exporting', 'quality_check', 'completed',
]

let activeJobId: string | null = null

export function cancelGeneration(jobId: string): void {
  if (activeJobId === jobId) activeJobId = null
}

export async function runSimulatedGeneration(
  job: GenerationJob,
  callbacks: Callbacks,
): Promise<void> {
  activeJobId = job.id
  const totalWeight = STEP_DEFS.reduce((a, b) => a + b.weight, 0)
  let earnedWeight = 0

  for (let i = 0; i < STEP_DEFS.length; i++) {
    if (activeJobId !== job.id) {
      callbacks.onError('Génération annulée')
      return
    }

    const def = STEP_DEFS[i]
    const status = STATUS_SEQUENCE[i] ?? 'building_site'

    // Mark step running
    job.steps[i] = { ...job.steps[i], status: 'running', startedAt: new Date().toISOString() }
    job.status = status
    job.currentStep = def.title
    job.logs = [...job.logs, `▶ ${def.title}…`]
    callbacks.onUpdate({ ...job })

    // Wait
    const duration = STEP_DURATION_MS * def.weight
    await sleep(duration)

    if (activeJobId !== job.id) {
      callbacks.onError('Génération annulée')
      return
    }

    // Mark step done
    earnedWeight += def.weight
    job.steps[i] = {
      ...job.steps[i],
      status: 'done',
      completedAt: new Date().toISOString(),
      durationMs: duration,
    }
    job.progress = Math.round((earnedWeight / totalWeight) * 95)
    job.logs = [...job.logs, `✓ ${def.title} — terminé`]
    callbacks.onUpdate({ ...job })
  }

  job.status = 'completed'
  job.progress = 100
  job.completedAt = new Date().toISOString()
  job.logs = [...job.logs, '✅ Génération terminée']
  callbacks.onUpdate({ ...job })
  activeJobId = null
  callbacks.onComplete()
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
