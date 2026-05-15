import type { GeneratedProject } from '@/types'
import Badge from './Badge'

export default function PlanPanel({ project }: { project: GeneratedProject }) {
  const { designSystem } = project

  return (
    <div className="flex flex-col gap-5 p-5">
      <section>
        <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3">Business détecté</h3>
        <div className="grid grid-cols-2 gap-2">
          {[['Commerce', project.businessName], ['Ville', project.city], ['Secteur', project.sector], ['Style', project.style], ['Objectif', project.goal], ['Ton', project.tone]].map(([k, v]) => (
            <div key={k} className="bg-card border border-border rounded-xl p-3">
              <p className="text-[10px] text-muted mb-0.5">{k}</p>
              <p className="text-sm font-semibold text-ink capitalize">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Proposition de valeur</h3>
        <p className="text-sm text-ink bg-card border border-border rounded-xl p-3 leading-relaxed">{project.valueProposition}</p>
      </section>

      <section>
        <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Problèmes clients</h3>
        <div className="flex flex-col gap-1.5">
          {project.painPoints.map((p, i) => (
            <Badge key={i} variant="red" className="justify-start w-fit max-w-full whitespace-normal text-left py-1 px-3">❌ {p}</Badge>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Services générés</h3>
        <div className="flex flex-wrap gap-1.5">
          {project.services.map((s, i) => <Badge key={i} variant="green">✓ {s}</Badge>)}
        </div>
      </section>

      {project.automationNeeds.length > 0 && (
        <section>
          <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Automatisations IA</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.automationNeeds.map((a, i) => <Badge key={i} variant="violet">🤖 {a}</Badge>)}
          </div>
        </section>
      )}

      {project.ecommerceNeeds.length > 0 && (
        <section>
          <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">E-commerce</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.ecommerceNeeds.map((e, i) => <Badge key={i} variant="blue">🛍️ {e}</Badge>)}
          </div>
        </section>
      )}

      <section>
        <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Sections HTML</h3>
        <div className="flex flex-col gap-1">
          {project.sections.map((s) => (
            <div key={s.id} className="flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green shrink-0" />
              <span className="text-ink font-medium">{s.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">SEO</h3>
        <div className="flex flex-col gap-2">
          <div className="bg-card border border-border rounded-xl p-3">
            <p className="text-[10px] text-muted mb-0.5">Title</p>
            <p className="text-sm text-ink">{project.seo.title}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3">
            <p className="text-[10px] text-muted mb-0.5">Description</p>
            <p className="text-sm text-ink">{project.seo.description}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {project.seo.keywords.map((k, i) => <Badge key={i} variant="gray">{k}</Badge>)}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Design System</h3>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(designSystem.palette).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full border border-white/10 shadow-sm" style={{ background: val as string }} />
              <span className="text-[10px] text-muted">{key}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
