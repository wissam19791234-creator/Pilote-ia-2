import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#08080e',
}

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['400', '600', '700', '800'] })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: 'SitePilot AI Studio — Sites premium pour commerces locaux',
  description: 'Propulsé par Claude AI. Décris un business, ajoute des photos, et obtenez une maquette complète avec copywriting, design et export HTML en 60 secondes.',
  keywords: ['site web IA', 'commerce local', 'Claude AI', 'génération site', 'maquette automatique', 'freelance IA'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  )
}
