import type { GeneratedProject } from '@/types'
import Badge from './Badge'

export default function AutomationSalesPanel({ project }: { project: GeneratedProject }) {
  return (
    <div className="flex flex-col gap-5 p-5">
      <section>
        <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Options recommandées</h3>
        <div className="grid gap-3">
          {(project.automationSalesOptions ?? []).map((option) => (
            <div key={option.key} className="bg-card border border-border rounded-xl p-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="font-semibold text-ink">{option.name}</p>
                <Badge variant={option.recommended ? 'green' : 'gray'}>{option.recommended ? 'Recommandée' : 'Optionnelle'}</Badge>
                <Badge variant="blue">Complexité: {option.complexity}</Badge>
                <Badge variant="violet">Valeur: {option.perceivedValue}</Badge>
              </div>
              <p className="text-sm text-muted">🎯 Problème: {option.problemSolved}</p>
              <p className="text-sm text-muted">✅ Bénéfice: {option.businessBenefit}</p>
              <p className="text-sm text-ink mt-1">💬 &ldquo;{option.salesPitch}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">3 packs commerciaux</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {(project.recommendedPacks ?? []).map((pack) => (
            <div key={pack.id} className="bg-card border border-border rounded-xl p-4">
              <p className="font-semibold text-ink mb-2">{pack.name}</p>
              <ul className="text-xs text-muted list-disc pl-4 space-y-1">
                {pack.includes.map((i) => <li key={i}>{i}</li>)}
              </ul>
              <p className="text-xs text-primary-light mt-2">{pack.positioning}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-semibold text-ink mb-2">Argumentaire client & script prix</h3>
        <ul className="list-disc pl-5 text-sm text-muted space-y-1 mb-3">
          {(project.automationArgumentary ?? []).map((a) => <li key={a}>{a}</li>)}
        </ul>
        <p className="text-sm text-ink mb-2">💶 {project.automationPriceScript ?? ''}</p>
        <p className="text-sm text-primary-light">📩 {project.automationReadyMessage ?? ''}</p>
      </section>
    </div>
  )
}
