import Link from 'next/link'
import { Sparkles } from 'lucide-react'

const columns = [
  { title: 'Produit', links: [{ href: '/studio', label: 'Studio IA' }, { href: '/projects', label: 'Projets' }, { href: '/pricing', label: 'Tarifs' }, { href: '/roadmap', label: 'Roadmap' }] },
  { title: 'Formations', links: [{ href: '/formations', label: 'Sites IA Local' }, { href: '/formations', label: 'Automatisation IA' }, { href: '/formations', label: 'E-commerce IA' }, { href: '/formations', label: 'Bundle IA Business' }] },
  { title: 'Légal', links: [{ href: '#', label: 'Mentions légales' }, { href: '#', label: 'CGV' }, { href: '#', label: 'Confidentialité' }, { href: '#', label: 'Cookies' }] },
]

export default function Footer() {
  return (
    <footer className="bg-[#050508] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-glow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-syne font-bold text-lg gradient-text">SitePilot AI</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs mb-5">
              La plateforme IA pour générer des sites premium pour commerces locaux. Propulsé par Claude Anthropic.
            </p>
            <div className="flex gap-2">
              {['X', 'IG', 'TK', 'LI'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-muted hover:bg-primary/20 hover:text-primary-light hover:border-primary/30 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-syne font-bold text-sm mb-4 text-ink/80">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted hover:text-ink transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/60">© {new Date().getFullYear()} SitePilot AI Studio. Tous droits réservés.</p>
          <p className="text-[11px] text-muted/40 text-center max-w-lg">
            Les résultats présentés sont des exemples individuels et ne constituent pas une garantie.
            Les performances varient selon les efforts, l&apos;expérience et le marché.
          </p>
        </div>
      </div>
    </footer>
  )
}
