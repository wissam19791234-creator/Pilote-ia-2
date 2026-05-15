import { Check, Star } from 'lucide-react'
import Badge from './Badge'
import { cn } from '@/lib/utils'

interface FormationCardProps {
  title: string
  price: number
  originalPrice?: number
  description: string
  modules: string[]
  badge?: 'best-seller' | 'nouveau'
  compact?: boolean
}

export default function FormationCard({
  title, price, originalPrice, description, modules, badge, compact = false,
}: FormationCardProps) {
  return (
    <div className={cn(
      'bg-white border border-border rounded-3xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all flex flex-col',
      compact ? 'p-5' : 'p-8',
    )}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className={cn('font-syne font-bold text-ink', compact ? 'text-lg' : 'text-xl')}>{title}</h3>
          <p className="text-sm text-muted mt-1">{description}</p>
        </div>
        {badge && (
          <Badge variant={badge === 'best-seller' ? 'orange' : 'violet'} className="shrink-0">
            {badge === 'best-seller' ? (
              <><Star className="w-3 h-3 mr-1" />Best-seller</>
            ) : 'Nouveau'}
          </Badge>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl font-bold font-syne text-ink">{price}€</span>
        {originalPrice && (
          <span className="text-lg text-muted line-through">{originalPrice}€</span>
        )}
        <span className="text-xs text-green font-semibold bg-green/10 px-2 py-0.5 rounded-full">
          Accès à vie
        </span>
      </div>

      {/* Modules */}
      {!compact && (
        <ul className="flex flex-col gap-2.5 flex-1 mb-6">
          {modules.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-green shrink-0 mt-0.5" />
              <span className="text-ink">{m}</span>
            </li>
          ))}
        </ul>
      )}

      {compact && (
        <p className="text-xs text-muted mb-4">{modules.length} modules inclus</p>
      )}

      {/* CTA */}
      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-orange to-rose text-white font-syne font-bold text-sm hover:-translate-y-0.5 transition-all shadow-orange hover:shadow-orange-hover mt-auto">
        Accéder à la formation
      </button>

      {!compact && (
        <p className="text-[10px] text-muted/70 text-center mt-3">
          Les résultats présentés sont des exemples individuels et ne constituent pas une garantie.
        </p>
      )}
    </div>
  )
}
