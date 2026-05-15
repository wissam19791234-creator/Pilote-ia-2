'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sparkles, LayoutDashboard, FolderOpen, GraduationCap,
  CreditCard, Settings, Plus, TrendingUp,
} from 'lucide-react'
import { getCredits } from '@/lib/credits'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/studio', label: 'Studio', icon: Sparkles },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'Projets', icon: FolderOpen },
  { href: '/formations', label: 'Formations', icon: GraduationCap },
  { href: '/pricing', label: 'Pricing', icon: CreditCard },
  { href: '/roadmap', label: 'Roadmap', icon: TrendingUp },
  { href: '#', label: 'Paramètres', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [credits, setCredits] = useState(12)

  useEffect(() => {
    setCredits(getCredits())
    const handler = () => setCredits(getCredits())
    window.addEventListener('credits-updated', handler)
    return () => window.removeEventListener('credits-updated', handler)
  }, [])

  const creditColor =
    credits <= 1 ? 'text-red-500' :
    credits <= 4 ? 'text-yellow' :
    'text-green'

  const progressPct = Math.round((credits / 12) * 100)

  return (
    <aside className="w-[260px] shrink-0 h-screen sticky top-0 bg-white border-r border-border flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="p-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2 font-syne font-bold text-lg gradient-text">
          <Sparkles className="w-5 h-5 text-orange" />
          SitePilot AI
        </Link>
      </div>

      {/* New project */}
      <div className="p-4">
        <Link
          href="/studio"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange to-rose text-white font-syne font-bold text-sm hover:-translate-y-0.5 transition-all shadow-orange"
        >
          <Plus className="w-4 h-4" />
          Nouveau projet
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-orange/10 text-orange font-bold'
                  : 'text-muted hover:bg-black/5 hover:text-ink',
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Credits block */}
      <div className="mx-3 mb-3 p-4 bg-surface rounded-2xl border border-border">
        <p className="text-xs font-semibold text-muted mb-1">Crédits restants</p>
        <p className={cn('text-3xl font-bold font-syne', creditColor)}>{credits}</p>
        <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange to-rose transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-xs text-muted mt-2">Plan Starter · 12/mois</p>
        <Link
          href="/pricing"
          className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-gradient-to-r from-orange to-rose text-white text-xs font-bold font-syne hover:opacity-90 transition-opacity"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Upgrade
        </Link>
      </div>

      {/* Formation upsell */}
      <div className="mx-3 mb-4 p-4 bg-gradient-to-br from-violet/10 to-rose/10 rounded-2xl border border-violet/20">
        <p className="text-xs font-bold text-violet mb-1">Bundle IA Business System</p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold font-syne text-ink">197€</span>
          <span className="text-sm text-muted line-through">297€</span>
        </div>
        <Link
          href="/formations"
          className="flex items-center justify-center w-full py-1.5 rounded-lg bg-violet text-white text-xs font-bold hover:opacity-90 transition-opacity"
        >
          Voir l&apos;offre
        </Link>
      </div>
    </aside>
  )
}
