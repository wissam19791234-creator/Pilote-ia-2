import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Check, Loader2, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const ITEMS = [
  { status: 'done', label: 'Génération locale (IA simulée)', desc: 'Génération complète de sites HTML sans dépendance serveur.', date: 'Mai 2025' },
  { status: 'done', label: 'Export HTML standalone', desc: 'Téléchargement du fichier HTML complet avec tout inline.', date: 'Mai 2025' },
  { status: 'done', label: 'Message client (DM / Email / WhatsApp)', desc: 'Génération de messages prêts à envoyer au prospect.', date: 'Mai 2025' },
  { status: 'done', label: 'Upload et intégration de photos', desc: 'Photos en base64 intégrées directement dans le HTML généré.', date: 'Mai 2025' },
  { status: 'in-progress', label: 'Vraie IA OpenAI GPT-4o', desc: 'Intégration de l\'API OpenAI pour une génération encore plus précise.', date: 'Q3 2025' },
  { status: 'in-progress', label: 'Authentification Supabase', desc: 'Comptes utilisateurs, sessions persistantes, multi-device.', date: 'Q3 2025' },
  { status: 'in-progress', label: 'Paiements Stripe', desc: 'Abonnements mensuels/annuels et gestion des crédits en temps réel.', date: 'Q3 2025' },
  { status: 'planned', label: 'Export ZIP (HTML + CSS + JS séparés)', desc: 'Export avec fichiers séparés pour faciliter la modification.', date: 'Q4 2025' },
  { status: 'planned', label: 'Hébergement en 1 clic', desc: 'Déployez votre site directement depuis SitePilot sur Vercel/Netlify.', date: 'Q4 2025' },
  { status: 'planned', label: 'Marketplace templates', desc: 'Templates premium créés par la communauté, achetables/vendables.', date: '2026' },
  { status: 'planned', label: 'App mobile (iOS / Android)', desc: 'Générez des sites depuis votre téléphone, n\'importe où.', date: '2026' },
]

const statusConfig = {
  done: { icon: Check, color: 'text-green', bg: 'bg-green/10', line: 'bg-green', label: 'Disponible' },
  'in-progress': { icon: Loader2, color: 'text-orange', bg: 'bg-orange/10', line: 'bg-gradient-to-b from-green to-orange', label: 'En cours' },
  planned: { icon: Calendar, color: 'text-muted', bg: 'bg-surface', line: 'bg-border', label: 'Planifié' },
}

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-20 px-6 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-violet/10 text-violet text-sm font-semibold mb-6">
          Roadmap publique
        </span>
        <h1 className="font-syne font-extrabold text-ink mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
          Ce qui arrive sur SitePilot AI
        </h1>
        <p className="text-muted max-w-xl mx-auto">
          Transparence totale sur nos priorités produit. Votez et suggérez des fonctionnalités via notre Discord.
        </p>
      </section>

      <section className="py-12 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative flex flex-col gap-0">
            {ITEMS.map((item, i) => {
              const config = statusConfig[item.status as keyof typeof statusConfig]
              const Icon = config.icon
              const isLast = i === ITEMS.length - 1
              return (
                <div key={i} className="flex gap-5">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className={cn('w-10 h-10 rounded-full flex items-center justify-center shrink-0', config.bg)}>
                      <Icon className={cn('w-5 h-5', config.color, item.status === 'in-progress' && 'animate-spin')} />
                    </div>
                    {!isLast && (
                      <div className={cn('w-0.5 flex-1 my-1', config.line)} style={{ minHeight: '32px' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={cn('pb-8 flex-1', isLast && 'pb-0')}>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-syne font-bold text-ink">{item.label}</h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={cn(
                          'text-xs font-semibold px-2 py-0.5 rounded-full',
                          item.status === 'done' ? 'bg-green/10 text-green' :
                          item.status === 'in-progress' ? 'bg-orange/10 text-orange' :
                          'bg-surface text-muted border border-border',
                        )}>
                          {config.label}
                        </span>
                        <span className="text-xs text-muted">{item.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
