import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FormationCard from '@/components/FormationCard'
import { Check } from 'lucide-react'

const FORMATIONS = [
  {
    title: 'Sites IA Local',
    price: 97,
    description: 'Apprends à créer et vendre des sites pour commerces locaux avec l\'IA',
    badge: 'best-seller' as const,
    modules: [
      'Le marché des sites locaux en 2025',
      'Identifier les niches les plus rentables',
      'Trouver des clients sur Instagram et Google Maps',
      'Analyser le business en 10 minutes',
      'Créer la maquette avec SitePilot AI',
      'Scripts DM qui convertissent',
      'Relances automatiques',
      'Closer la vente au téléphone',
      'Encaisser l\'acompte',
      'Livrer en 48h',
      'Upsells et options premium',
      'Construire une agence',
    ],
  },
  {
    title: 'Automatisation IA',
    price: 147,
    description: 'Packagisez et vendez des systèmes d\'automatisation à des commerçants',
    modules: [
      'Identifier les tâches répétitives',
      'Créer un devis automatique',
      'Formulaires intelligents avec scoring',
      'Emails automatiques personnalisés',
      'Relances automatiques',
      'WhatsApp Business API',
      'Instagram DM automatisé',
      'CRM simple avec IA',
      'Packager et vendre des packs mensuels',
      'Automatiser sa propre prospection',
    ],
  },
  {
    title: 'E-commerce IA',
    price: 197,
    description: 'Créez et scalez des boutiques en ligne rentables grâce à l\'IA',
    badge: 'nouveau' as const,
    modules: [
      'La réalité du e-commerce (sans bullshit)',
      'Choisir un produit gagnant avec l\'IA',
      'Créer sa boutique Shopify en 1 heure',
      'Construire une offre irrésistible',
      'Page produit qui convertit',
      'Branding rapide avec IA',
      'Créatifs publicitaires avec IA',
      'Lancer des Meta Ads rentables',
      'TikTok Ads organique et payant',
      'Lire ses dashboards',
      'Calculer ses marges réelles',
      'Gérer le SAV sans stress',
      'Scaler responsablement',
    ],
  },
  {
    title: 'IA Business System',
    price: 297,
    originalPrice: 441,
    description: 'Le bundle complet pour bâtir un business IA pérenne',
    badge: 'best-seller' as const,
    modules: [
      'Les 3 formations complètes',
      '1 mois SaaS Pro offert',
      '50+ prompts premium',
      'Scripts DM prêts à l\'emploi',
      'Templates automatisation',
      'Études de cas réels',
      'Dashboards Excel/Notion',
      'Groupe privé',
      'Bonus : automatiser sa prospection',
    ],
  },
]

const INCLUDED = [
  'Accès immédiat et à vie',
  'Mises à jour gratuites',
  'Support par email',
  'Communauté privée',
  'Garantie 30 jours',
]

export default function FormationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-20 px-6 text-center bg-gradient-to-br from-violet/5 to-rose/5">
        <span className="inline-block px-4 py-1.5 rounded-full bg-violet/10 text-violet text-sm font-semibold mb-6">
          Formations IA
        </span>
        <h1 className="font-syne font-extrabold text-ink mb-4" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
          Maîtrise l&apos;IA.<br />
          <span className="gradient-text">Génère des revenus.</span>
        </h1>
        <p className="text-lg text-muted max-w-xl mx-auto mb-10">
          Des formations pratiques et actionnables pour monétiser vos compétences IA dès cette semaine. Pas de théorie inutile — que du concret.
        </p>

        {/* Included in all */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {INCLUDED.map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-sm text-muted">
              <Check className="w-4 h-4 text-green" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <div className="bg-yellow/10 border-y border-yellow/30 py-3 px-6 text-center">
        <p className="text-sm text-ink/70 max-w-3xl mx-auto">
          ⚠️ <strong>Disclaimer :</strong> Les résultats présentés sont des exemples individuels et ne constituent pas une garantie de résultats futurs.
          Les performances varient selon les efforts, l&apos;expérience et le marché.
        </p>
      </div>

      {/* Formations */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {FORMATIONS.map((f) => (
            <div key={f.title} className="card p-0 overflow-hidden">
              {/* Header */}
              <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-6 bg-surface">
                <div>
                  <h2 className="font-syne font-bold text-2xl text-ink mb-1">{f.title}</h2>
                  <p className="text-muted">{f.description}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold font-syne text-ink">{f.price}€</span>
                      {f.originalPrice && (
                        <span className="text-xl text-muted line-through mb-1">{f.originalPrice}€</span>
                      )}
                    </div>
                    <p className="text-xs text-green font-semibold">Accès à vie · {f.modules.length} modules</p>
                  </div>
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange to-rose text-white font-syne font-bold shadow-orange hover:-translate-y-0.5 hover:shadow-orange-hover transition-all whitespace-nowrap">
                    Accéder →
                  </button>
                </div>
              </div>

              {/* Modules grid */}
              <div className="p-8">
                <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-5">Programme ({f.modules.length} modules)</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {f.modules.map((m, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-orange/10 flex items-center justify-center shrink-0 text-orange text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="text-sm text-ink">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final disclaimer */}
      <section className="py-12 px-6 bg-surface">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted leading-relaxed">
            <strong>Résultats non garantis.</strong> Les résultats présentés dans nos formations sont des exemples individuels basés sur du travail réel, de la persévérance et des conditions de marché spécifiques. Ils ne représentent pas des résultats typiques et ne constituent pas une promesse ou garantie de revenus. Vos résultats dépendront de nombreux facteurs incluant votre niveau d&apos;engagement, vos compétences préexistantes et les conditions de votre marché local.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
