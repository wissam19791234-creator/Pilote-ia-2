'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Menu, X, Zap } from 'lucide-react'
import { getCredits } from '@/lib/credits'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/studio', label: 'Studio' },
  { href: '/projects', label: 'Projets' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/formations', label: 'Formations' },
  { href: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [credits, setCredits] = useState(12)
  const pathname = usePathname()

  useEffect(() => {
    setCredits(getCredits())
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#08080e]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-glow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-syne font-bold text-lg gradient-text">SitePilot AI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                pathname === l.href
                  ? 'text-primary-light bg-primary/10'
                  : 'text-muted hover:text-ink hover:bg-white/5',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <div className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors',
            credits <= 2 ? 'border-red-500/30 text-red-400 bg-red-500/10' :
            credits <= 5 ? 'border-yellow/30 text-yellow bg-yellow/10' :
            'border-primary/30 text-primary-light bg-primary/10',
          )}>
            <Zap className="w-3 h-3" />
            {credits} crédits
          </div>
          <Link
            href="/studio"
            className="btn-primary text-sm py-2 px-5 rounded-xl font-syne font-bold"
          >
            Ouvrir le Studio
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg border border-white/10 text-muted hover:text-ink transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0d0d18]/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-ink hover:bg-white/5 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/studio"
            onClick={() => setOpen(false)}
            className="mt-2 text-center py-3 rounded-xl gradient-bg text-white font-syne font-bold text-sm shadow-primary"
          >
            Ouvrir le Studio
          </Link>
        </div>
      )}
    </header>
  )
}
