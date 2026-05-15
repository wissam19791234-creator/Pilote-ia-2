import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'SitePilot AI Studio — Génère des sites pour commerces locaux',
  description:
    'Décris un business, ajoute des photos, et SitePilot AI génère une maquette complète avec textes, design, formulaires et export.',
  keywords: ['site web', 'IA', 'commerce local', 'génération site', 'maquette', 'automatisation'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="grain-overlay">{children}</body>
    </html>
  )
}
