import type { GeneratedProject } from '@/types'
import Badge from './Badge'

interface PlanPanelProps {
  project: GeneratedProject
}

export default function PlanPanel({ project }: PlanPanelProps) {
  const { designSystem } = project

  return (
    <div className="flex flex-col gap-5 p-5 overflow-y-auto">
      {/* Business info */}
      <section>
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Business détecté</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            ['Commerce', project.businessName],
            ['Ville', project.city],
            ['Secteur', project.sector],
            ['Style', project.style],
            ['Objectif', project.goal],
            ['Ton', project.tone],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface rounded-xl p-3">
              <p className="text-[10px] text-muted mb-0.5">{k}</p>
              <p className="text-sm font-semibold text-ink capitalize">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Value proposition */}
      <section>
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Proposition de valeur</h3>
        <p className="text-sm text-ink bg-surface rounded-xl p-3 leading-relaxed">{project.valueProposition}</p>
      </section>

      {/* Audience */}
      <section>
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Audience cible</h3>
        <p className="text-sm text-ink">{project.audience}</p>
      </section>

      {/* Pain points */}
      <section>
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Problèmes clients</h3>
        <div className="flex flex-col gap-1.5">
          {project.painPoints.map((p, i) => (
            <Badge key={i} variant="red" className="justify-start w-fit max-w-full whitespace-normal text-left">
              ❌ {p}
            </Badge>
          ))}
        </div>
      </section>

      {/* Services */}
      <section>
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Services générés</h3>
        <div className="flex flex-wrap gap-1.5">
          {project.services.map((s, i) => (
            <Badge key={i} variant="green">✓ {s}</Badge>
          ))}
        </div>
      </section>

      {/* Automations */}
      {project.automationNeeds.length > 0 && (
        <section>
          <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Automatisations IA</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.automationNeeds.map((a, i) => (
              <Badge key={i} variant="violet">🤖 {a}</Badge>
            ))}
          </div>
        </section>
      )}

      {/* Ecommerce */}
      {project.ecommerceNeeds.length > 0 && (
        <section>
          <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">E-commerce</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.ecommerceNeeds.map((e, i) => (
              <Badge key={i} variant="blue">🛍️ {e}</Badge>
            ))}
          </div>
        </section>
      )}

      {/* Sections HTML */}
      <section>
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Sections HTML générées</h3>
        <div className="flex flex-col gap-1">
          {project.sections.map((s) => (
            <div key={s.id} className="flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green shrink-0" />
              <span className="text-ink font-medium">{s.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SEO */}
      <section>
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">SEO</h3>
        <div className="flex flex-col gap-2">
          <div className="bg-surface rounded-xl p-3">
            <p className="text-[10px] text-muted mb-0.5">Title</p>
            <p className="text-sm text-ink">{project.seo.title}</p>
          </div>
          <div className="bg-surface rounded-xl p-3">
            <p className="text-[10px] text-muted mb-0.5">Description</p>
            <p className="text-sm text-ink">{project.seo.description}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {project.seo.keywords.map((k, i) => (
              <Badge key={i} variant="gray">{k}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Design system */}
      <section>
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Design System</h3>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(designSystem.palette).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div
                className="w-5 h-5 rounded-full border border-border shadow-sm"
                style={{ background: val as string }}
              />
              <span className="text-[10px] text-muted">{key}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
