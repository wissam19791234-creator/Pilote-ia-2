import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface DashboardCardProps {
  icon: ReactNode
  label: string
  value: string | number
  change?: string
  positive?: boolean
  color?: 'orange' | 'blue' | 'green' | 'violet'
}

const colors = {
  orange: 'bg-orange/10 text-orange',
  blue: 'bg-blue/10 text-blue',
  green: 'bg-green/10 text-green',
  violet: 'bg-violet/10 text-violet',
}

export default function DashboardCard({
  icon, label, value, change, positive, color = 'orange',
}: DashboardCardProps) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted font-medium">{label}</p>
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', colors[color])}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold font-syne text-ink">{value}</p>
      {change && (
        <p className={cn('text-xs mt-1.5 font-medium', positive ? 'text-green' : 'text-red-500')}>
          {positive ? '▲' : '▼'} {change}
        </p>
      )}
      {/* Sparkline placeholder */}
      <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full gradient-bg')}
          style={{ width: '60%' }}
        />
      </div>
    </div>
  )
}
