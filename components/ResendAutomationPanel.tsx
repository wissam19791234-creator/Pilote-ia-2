'use client'

import { useEffect, useState } from 'react'
import type { GeneratedProject } from '@/types'
import { getCurrentPlanId } from '@/lib/plans'
import { calculateLeadScore } from '@/lib/leads/leadScoring'
import ResendStatusCard from './ResendStatusCard'
import LeadCapturePreview from './LeadCapturePreview'
import LeadScoreBadge from './LeadScoreBadge'

interface ResendAutomationPanelProps {
  project: GeneratedProject
}

interface ResendTestData {
  configured: boolean
  hasApiKey: boolean
  hasAudienceId: boolean
  hasFromEmail: boolean
  message: string
}

function buildTestLead(project: GeneratedProject) {
  return {
    name: 'Test Lead SitePilot',
    email: 'test@sitepilot.ai',
    phone: '06 00 00 00 00',
    sector: project.sector,
    needType: 'devis',
    budget: '500€',
    delay: 'urgent',
    message: `Test automatique depuis SitePilot AI — projet ${project.businessName}`,
    businessName: project.businessName,
    siteId: project.id,
    city: project.city,
    source: 'generated-site',
    preferredContact: 'email',
  }
}

export default function ResendAutomationPanel({ project }: ResendAutomationPanelProps) {
  const [resendStatus, setResendStatus] = useState<ResendTestData | null>(null)
  const [isLoadingStatus, setIsLoadingStatus] = useState(true)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; leadScore?: number; leadLevel?: string } | null>(null)

  const planId = getCurrentPlanId()

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/resend/test')
        if (res.ok) {
          const data = await res.json() as ResendTestData
          setResendStatus(data)
        }
      } catch {
        // silently ignore
      } finally {
        setIsLoadingStatus(false)
      }
    }
    void fetchStatus()
  }, [])

  // Fake score for tags preview
  const testLead = buildTestLead(project)
  const previewScore = calculateLeadScore({
    ...testLead,
    name: testLead.name,
    email: testLead.email,
    sector: testLead.sector,
    needType: testLead.needType,
    businessName: testLead.businessName,
    source: testLead.source,
  })

  async function handleTestSend() {
    if (!resendStatus?.configured) return
    setIsTesting(true)
    setTestResult(null)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testLead),
      })
      const data = await res.json() as { success: boolean; message: string; leadScore?: number; leadLevel?: string }
      setTestResult(data)
    } catch {
      setTestResult({ success: false, message: "Erreur réseau lors du test." })
    } finally {
      setIsTesting(false)
    }
  }

  // Free plan gate
  if (planId === 'free') {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-lg mx-auto text-center py-12">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📬</span>
          </div>
          <h2 className="font-syne font-bold text-xl text-ink mb-2">Capture de leads Resend</h2>
          <p className="text-muted text-sm mb-6">
            La capture automatique de leads avec scoring et notifications email est disponible à partir du plan <strong>Starter</strong>.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white font-semibold text-sm shadow-glow-sm hover:opacity-90 transition-opacity"
          >
            Voir les plans →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-glow-sm">
          <span className="text-base">📬</span>
        </div>
        <div>
          <h2 className="font-syne font-bold text-lg text-ink">Capture de leads</h2>
          <p className="text-xs text-muted">Resend — scoring automatique + notifications email</p>
        </div>
        {planId === 'starter' && (
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-medium">Starter</span>
        )}
        {(planId === 'pro' || planId === 'agency') && (
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-medium">{planId === 'pro' ? 'Pro' : 'Agency'} ✓</span>
        )}
      </div>

      {/* Section 1 — Statut Resend */}
      <section>
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Statut</h3>
        {isLoadingStatus ? (
          <div className="rounded-xl border border-border bg-surface-soft p-4 text-xs text-muted animate-pulse">
            Vérification de la configuration Resend…
          </div>
        ) : (
          <ResendStatusCard configured={resendStatus?.configured ?? false} showSetupGuide={!resendStatus?.configured} />
        )}
        {resendStatus && (
          <p className="text-xs text-muted mt-1.5 italic">{resendStatus.message}</p>
        )}
      </section>

      {/* Section 2 — Lead fictif prévisualisé */}
      <section>
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Exemple de lead</h3>
        <LeadCapturePreview sector={project.sector} businessName={project.businessName} />
      </section>

      {/* Section 3 — Tags générés */}
      <section>
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Tags générés automatiquement</h3>
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs text-muted mb-3">Ces tags seront appliqués à chaque lead selon son profil :</p>
          <div className="flex flex-wrap gap-1.5">
            {previewScore.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block text-xs px-2.5 py-1 rounded-full bg-primary/5 text-primary border border-primary/20 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <LeadScoreBadge score={previewScore.score} level={previewScore.level} showScore />
            <span className="text-xs text-muted">{previewScore.recommendedAction}</span>
          </div>
        </div>
      </section>

      {/* Section 4 — Configuration guide (si non configuré) */}
      {!resendStatus?.configured && (
        <section>
          <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Configuration Resend</h3>
          <div className="rounded-xl border border-border bg-white p-4 space-y-3 text-sm">
            <p className="text-xs text-muted font-medium">Suivez ces étapes pour activer la capture de leads :</p>
            <div className="space-y-3">
              {[
                {
                  step: '1',
                  title: 'Créer un compte Resend',
                  desc: 'Inscrivez-vous gratuitement sur resend.com (jusqu\'à 3 000 emails/mois gratuits).',
                  link: 'https://resend.com/signup',
                  linkLabel: 'resend.com/signup →',
                },
                {
                  step: '2',
                  title: 'Créer une audience',
                  desc: 'Dans le dashboard Resend, allez dans Audiences → New Audience. Nommez-la "SitePilot Leads".',
                  link: 'https://resend.com/audiences',
                  linkLabel: 'resend.com/audiences →',
                },
                {
                  step: '3',
                  title: 'Créer une clé API',
                  desc: 'Dans API Keys → Create API Key. Donnez les permissions "Sending access" et "Audiences".',
                  link: 'https://resend.com/api-keys',
                  linkLabel: 'resend.com/api-keys →',
                },
                {
                  step: '4',
                  title: 'Ajouter les variables dans Vercel',
                  desc: 'Vercel → votre projet → Settings → Environment Variables.',
                  code: 'RESEND_API_KEY=re_xxxxxxxxxx\nRESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
                },
              ].map(({ step, title, desc, link, linkLabel, code }) => (
                <div key={step} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {step}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-ink text-xs">{title}</p>
                    <p className="text-muted text-xs mt-0.5">{desc}</p>
                    {link && (
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline font-medium">
                        {linkLabel}
                      </a>
                    )}
                    {code && (
                      <pre className="mt-1 bg-surface-soft rounded-lg p-2 text-[10px] text-ink overflow-x-auto font-mono">
                        {code}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 5 — Bouton "Tester l'envoi" */}
      <section>
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Tester l&apos;envoi</h3>
        <div className="rounded-xl border border-border bg-white p-4 space-y-3">
          {!resendStatus?.configured ? (
            <p className="text-xs text-muted italic">Configurez Resend pour activer le test d&apos;envoi.</p>
          ) : (
            <>
              <p className="text-xs text-muted">
                Envoie un lead fictif pour tester toute la chaîne : validation → scoring → contact → email notification → confirmation prospect.
              </p>
              <button
                onClick={() => void handleTestSend()}
                disabled={isTesting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-bg text-white text-xs font-semibold shadow-glow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTesting ? '⏳ Envoi en cours…' : '🚀 Tester l\'envoi'}
              </button>
              {testResult && (
                <div className={`rounded-lg p-3 text-xs ${testResult.success ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                  <p className="font-semibold">{testResult.success ? '✅ Succès' : '❌ Erreur'}</p>
                  <p className="mt-0.5">{testResult.message}</p>
                  {testResult.leadScore !== undefined && (
                    <p className="mt-1">Score : <strong>{testResult.leadScore}/100</strong> · Niveau : <strong>{testResult.leadLevel}</strong></p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Section 6 — Plan gating info */}
      {planId === 'starter' && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          <p className="font-semibold mb-1">Plan Starter — capture de leads activée</p>
          <p className="text-amber-700">Les leads sont capturés et scorés. Passez en <strong>Pro</strong> pour le CRM avancé et les automatisations multi-étapes.</p>
        </div>
      )}
    </div>
  )
}
