import Link from 'next/link'
import { Sparkles } from 'lucide-react'

const columns = [
  {
    title: 'Produit',
    links: [
      { href: '/studio', label: 'Studio IA' },
      { href: '/projects', label: 'Projets' },
      { href: '/pricing', label: 'Tarifs' },
      { href: '/roadmap', label: 'Roadmap' },
    ],
  },
  {
    title: 'Formations',
    links: [
      { href: '/formations', label: 'Sites IA Local' },
      { href: '/formations', label: 'Automatisation IA' },
      { href: '/formations', label: 'E-commerce IA' },
      { href: '/formations', label: 'Bundle IA Business' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { href: '#', label: 'Mentions légales' },
      { href: '#', label: 'CGV' },
      { href: '#', label: 'Politique de confidentialité' },
      { href: '#', label: 'Cookies' },
    ],
  },
]

const socials = [
  { label: 'X', href: '#' },
  { label: 'IG', href: '#' },
  { label: 'TK', href: '#' },
  { label: 'LI', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-syne font-bold text-xl mb-3">
              <Sparkles className="w-5 h-5 text-orange" />
              <span className="gradient-text">SitePilot AI</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              La plateforme IA pour générer des sites premium pour commerces locaux en 60 secondes.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-xs font-bold text-white/60 hover:bg-orange hover:text-white transition-all"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-syne font-bold text-sm mb-4 text-white/80">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} SitePilot AI Studio. Tous droits réservés.
          </p>
          <p className="text-[11px] text-white/30 text-center max-w-lg">
            Les résultats présentés sont des exemples individuels et ne constituent pas une garantie de résultats futurs.
            Les performances varient selon les efforts, l&apos;expérience et le marché.
          </p>
        </div>
      </div>
    </footer>
  )
}
