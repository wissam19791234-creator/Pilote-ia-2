import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import Badge from './Badge'

interface PricingCardProps {
  name: string
  price: number
  annualPrice?: number
  isAnnual?: boolean
  highlighted?: boolean
  features: string[]
  cta: string
  description?: string
}

export default function PricingCard({
  name, price, annualPrice, isAnnual = false, highlighted = false, features, cta, description,
}: PricingCardProps) {
  const displayPrice = isAnnual && annualPrice ? annualPrice : price

  return (
    <div
      className={cn(
        'relative flex flex-col bg-white rounded-3xl p-8 border transition-all duration-200',
        highlighted
          ? 'border-orange shadow-orange scale-105 ring-2 ring-orange/20'
          : 'border-border shadow-card hover:shadow-card-hover hover:-translate-y-1',
      )}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge variant="orange" className="shadow-orange text-xs px-4 py-1 font-bold">
            ✦ Populaire
          </Badge>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-syne font-bold text-xl text-ink mb-2">{name}</h3>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>

      <div className="mb-6">
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold font-syne text-ink">{displayPrice}€</span>
          <span className="text-muted text-sm mb-1">/mois</span>
        </div>
        {isAnnual && annualPrice && (
          <p className="text-xs text-green mt-1">
            Économisez {Math.round((1 - annualPrice / price) * 100)}% vs mensuel
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-3 flex-1 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <Check className="w-4 h-4 text-green shrink-0 mt-0.5" />
            <span className="text-ink">{f}</span>
          </li>
        ))}
      </ul>

      <button
        className={cn(
          'w-full py-3 rounded-xl font-syne font-bold text-sm transition-all',
          highlighted
            ? 'bg-gradient-to-r from-orange to-rose text-white shadow-orange hover:shadow-orange-hover hover:-translate-y-0.5'
            : 'bg-surface border border-border text-ink hover:border-orange hover:text-orange',
        )}
      >
        {cta}
      </button>
    </div>
  )
}
