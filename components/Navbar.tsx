'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'
import CreditBadge from './CreditBadge'

const navLinks = [
  { href: '/studio', label: 'Studio' },
  { href: '/projects', label: 'Projets' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/formations', label: 'Formations' },
  { href: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-syne font-bold text-xl gradient-text shrink-0">
          <Sparkles className="w-5 h-5 text-orange" />
          SitePilot AI
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <CreditBadge />
          <Link
            href="/studio"
            className="btn-primary text-sm py-2 px-4 font-syne font-bold rounded-xl bg-gradient-to-r from-orange to-rose text-white shadow-orange hover:-translate-y-0.5 transition-all"
          >
            Tester le studio
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted hover:text-ink py-2 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <CreditBadge />
            <Link
              href="/studio"
              onClick={() => setOpen(false)}
              className="flex-1 text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange to-rose text-white font-syne font-bold text-sm"
            >
              Tester le studio
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
