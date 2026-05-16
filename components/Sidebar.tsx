'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sparkles, LayoutDashboard, FolderOpen,
  CreditCard, Plus, TrendingUp, Zap, ChevronRight, Bot, Map,
} from 'lucide-react'
import { getCredits } from '@/lib/credits'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/studio', label: 'Studio', icon: Sparkles },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'Projets', icon: FolderOpen },
  { href: '/pricing', label: 'Abonnement', icon: CreditCard },
  { href: '/roadmap', label: 'Roadmap', icon: Map },
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

  const progressPct = Math.round((credits / 12) * 100)
  const creditColor = credits <= 1 ? '#ef4444' : credits <= 4 ? '#f59e0b' : '#10b981'

  return (
    <aside className="w-[240px] shrink-0 h-screen sticky top-0 bg-white border-r border-border flex flex-col overflow-y-auto shadow-soft">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-glow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-syne font-bold text-base gradient-text">SitePilot AI</span>
        </Link>
      </div>

      {/* New project */}
      <div className="p-3">
        <Link
          href="/studio"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl gradient-bg text-white font-syne font-bold text-sm shadow-primary hover:shadow-primary-hover hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          Nouveau projet
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 flex flex-col gap-0.5 py-2">
        {navItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted hover:bg-surface-soft hover:text-ink',
              )}
            >
              <Icon className={cn('w-4 h-4 shrink-0', active && 'text-primary')} />
              {item.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-primary opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* Credits */}
      <div className="mx-3 mb-3 p-4 bg-card border border-border rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-muted">Crédits restants</p>
          <Zap className="w-3.5 h-3.5 text-muted" />
        </div>
        <p className="text-3xl font-bold font-syne" style={{ color: creditColor }}>{credits}</p>
        <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progressPct}%`,
              background: `linear-gradient(90deg, ${creditColor}, ${creditColor}99)`,
              boxShadow: `0 0 8px ${creditColor}66`,
            }}
          />
        </div>
        <p className="text-[10px] text-muted mt-1.5">Plan Starter · 12/mois</p>
        <Link
          href="/pricing"
          className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 rounded-xl gradient-bg text-white text-xs font-bold font-syne hover:opacity-90 transition-opacity shadow-primary"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Upgrade
        </Link>
      </div>

      {/* Studio shortcut */}
      <div className="mx-3 mb-4 p-3 bg-primary/5 rounded-xl border border-primary/15">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="w-3.5 h-3.5 text-primary-light" />
          <p className="text-xs font-bold text-primary-light">Onglet Vendre</p>
        </div>
        <p className="text-[10px] text-muted leading-relaxed mb-2">
          Après génération, consultez les automatisations et packs recommandés dans l&apos;onglet Vendre du Studio.
        </p>
        <Link
          href="/studio"
          className="flex items-center justify-center w-full py-1.5 rounded-lg bg-primary/20 border border-primary/30 text-primary-light text-xs font-bold hover:bg-primary/30 transition-colors"
        >
          Ouvrir le Studio →
        </Link>
      </div>
    </aside>
  )
}
