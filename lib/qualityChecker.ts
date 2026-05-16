import type { GeneratedProject, QualityCheck, QualityIssue } from '@/types'

interface Check {
  id: string
  label: string
  weight: number
  test: (p: GeneratedProject) => boolean
  fix?: string
  severity: QualityIssue['severity']
}

const CHECKS: Check[] = [
  { id: 'hero', label: 'Hero section présente', weight: 10, severity: 'error', test: (p) => p.sections.some((s) => s.type === 'hero') || p.html.includes('hero') || p.copywriting.heroTitle.length > 0, fix: 'Régénérez le site avec une description plus détaillée' },
  { id: 'cta', label: 'CTA (appel à l\'action) présent', weight: 10, severity: 'error', test: (p) => p.copywriting.ctaPrimary.length > 0 || p.html.includes('btn') || p.html.includes('button'), fix: 'Ajoutez un objectif clair dans votre description' },
  { id: 'services', label: 'Services / Produits listés', weight: 8, severity: 'warning', test: (p) => p.services.length > 0 || p.products.length > 0, fix: 'Listez vos services dans la description' },
  { id: 'sections', label: 'Au moins 5 sections', weight: 8, severity: 'warning', test: (p) => p.sections.length >= 5 || p.html.length > 5000, fix: 'Demandez plus de sections dans votre prompt' },
  { id: 'design', label: 'Design system complet', weight: 8, severity: 'warning', test: (p) => !!p.designSystem?.palette?.primary, fix: 'Précisez le style dans votre description' },
  { id: 'html', label: 'Export HTML non vide', weight: 12, severity: 'error', test: (p) => p.html.length > 500, fix: 'Régénérez le site' },
  { id: 'seo', label: 'SEO configuré', weight: 6, severity: 'info', test: (p) => p.seo?.title?.length > 0 && p.seo?.description?.length > 0, fix: 'SEO sera généré automatiquement' },
  { id: 'client_message', label: 'Message client généré', weight: 8, severity: 'warning', test: (p) => (p.copywriting?.clientMessage?.length ?? 0) > 50, fix: "Consultez l'onglet Message" },
  { id: 'automations', label: 'Automatisations disponibles', weight: 8, severity: 'info', test: (p) => (p.automationSales?.options?.length ?? 0) > 0, fix: "Vérifiez l'onglet Vendre" },
  { id: 'sector', label: 'Secteur identifié', weight: 6, severity: 'info', test: (p) => p.sector.length > 0 && p.sector !== 'service local', fix: 'Précisez le secteur dans votre description' },
  { id: 'mobile', label: 'HTML responsive mobile', weight: 8, severity: 'warning', test: (p) => p.html.includes('viewport') || p.html.includes('responsive') || p.html.includes('@media'), fix: 'La génération IA inclut automatiquement le responsive' },
  { id: 'contact', label: 'Informations de contact', weight: 8, severity: 'warning', test: (p) => p.html.includes('form') || p.html.includes('whatsapp') || p.html.includes('contact'), fix: "Ajoutez 'avec formulaire de contact' dans votre description" },
]

export function runQualityCheck(project: GeneratedProject): QualityCheck {
  const issues: QualityIssue[] = []
  let earned = 0
  const maxScore = CHECKS.reduce((acc, c) => acc + c.weight, 0)

  for (const check of CHECKS) {
    const passed = check.test(project)
    if (passed) {
      earned += check.weight
    } else {
      issues.push({
        id: check.id,
        severity: check.severity,
        message: `${check.label} — non détecté`,
        fix: check.fix,
      })
    }
  }

  const score = Math.round((earned / maxScore) * 100)
  const passed = score >= 70

  const suggestions: string[] = []
  if (score < 70) suggestions.push("Régénérez avec une description plus détaillée pour améliorer le score")
  if (!project.automationSales) suggestions.push("Ajoutez des automatisations dans l'onglet Vendre pour plus de valeur")
  if (score >= 85) suggestions.push("Votre site est prêt à être présenté au commerce ✓")
  if (score >= 95) suggestions.push("Pack complet — maquette + outils commerciaux disponibles ✓")

  return {
    score,
    passed,
    issues,
    suggestions,
    checkedAt: new Date().toISOString(),
  }
}

export function getScoreColor(score: number): string {
  if (score >= 85) return '#10b981'
  if (score >= 70) return '#f59e0b'
  return '#ef4444'
}

export function getScoreLabel(score: number): string {
  if (score >= 85) return 'Prêt à présenter au client'
  if (score >= 70) return 'Correct — quelques améliorations possibles'
  return 'Incomplet — régénérez avec plus de détails'
}
