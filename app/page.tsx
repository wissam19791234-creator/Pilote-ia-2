import Link from 'next/link'
import { Zap, Target, Package2, Mail, Sparkles } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PricingCard from '@/components/PricingCard'
import FormationCard from '@/components/FormationCard'
import FAQ from '@/components/FAQ'

const FAQ_ITEMS = [
  { question: 'Comment fonctionne SitePilot AI ?', answer: 'Décrivez le commerce dans la zone de chat, ajoutez optionnellement des photos, cliquez sur Générer. En ~10 secondes, l\'IA analyse le secteur, détecte le style optimal, génère des textes persuasifs et produit un fichier HTML complet prêt à livrer.' },
  { question: 'Dois-je savoir coder ?', answer: 'Non. SitePilot AI génère tout le code HTML/CSS/JS automatiquement. Vous téléchargez un fichier standalone que vous pouvez héberger n\'importe où (Hostinger, OVH, Netlify…) sans aucune compétence technique.' },
  { question: 'Que contient le site généré ?', answer: 'Header + hero premium, section problème/solution, grille services, galerie photos, témoignages clients, FAQ accordéon, formulaire intelligent (devis/réservation/contact), footer professionnel. Le tout en HTML standalone responsive.' },
  { question: 'Puis-je modifier le site après génération ?', answer: 'Oui ! Tapez simplement vos instructions dans le chat : "rends le design plus luxe", "ajoute un bouton WhatsApp", "change les couleurs en bleu"… Le site se régénère instantanément.' },
  { question: 'C\'est quoi un crédit ?', answer: 'Un crédit = une génération de site. Le plan Starter inclut 12 crédits offerts à l\'inscription, puis 5/mois. Le plan Pro donne 20/mois, l\'Agence 60/mois.' },
  { question: 'Quelle est votre politique de remboursement ?', answer: 'Remboursement intégral sous 14 jours si vous n\'êtes pas satisfait, sans justification. Pour les formations, garantie "satisfait ou remboursé" 30 jours.' },
]

const PERSONAS = [
  { icon: '🤖', title: 'Freelances IA', desc: 'Débutants ou confirmés qui veulent livrer des sites premium sans coder et facturer 300-800€ par projet.' },
  { icon: '🏢', title: 'Agences digitales', desc: 'Accélérez la production de maquettes et proposez plus de clients simultanément sans recruter.' },
  { icon: '📱', title: 'Créateurs de contenu', desc: 'Monétisez votre audience en proposant un service de création de sites à vos abonnés.' },
  { icon: '💼', title: 'Vendeurs de services', desc: 'Ajoutez la création de site à votre offre d\'automatisation et augmentez votre panier moyen.' },
]

const FORMATIONS = [
  {
    title: 'Sites IA Local',
    price: 97,
    description: 'Créez et vendez des sites pour commerces locaux avec l\'IA',
    modules: ['Le marché des sites locaux en 2025', 'Identifier les niches les plus rentables', 'Trouver des clients sur Instagram & Google Maps', 'Scripts DM qui convertissent', 'Closer la vente au téléphone', 'Livrer en 48h et fidéliser'],
    badge: 'best-seller' as const,
  },
  {
    title: 'Automatisation IA',
    price: 147,
    description: 'Packagisez et vendez des systèmes d\'automatisation',
    modules: ['Identifier les tâches répétitives', 'Devis automatique & formulaires intelligents', 'Emails & relances automatiques', 'WhatsApp Business API', 'CRM simple avec IA', 'Packager et vendre des packs mensuels'],
  },
  {
    title: 'E-commerce IA',
    price: 197,
    description: 'Créez des boutiques rentables avec l\'IA',
    modules: ['Choisir un produit gagnant avec l\'IA', 'Créer sa boutique Shopify en 1h', 'Page produit qui convertit', 'Créatifs publicitaires avec IA', 'Lancer des Meta Ads rentables', 'Scaler responsablement'],
    badge: 'nouveau' as const,
  },
  {
    title: 'IA Business System',
    price: 297,
    originalPrice: 441,
    description: 'Le bundle complet — tout inclus',
    modules: ['Les 3 formations complètes', '1 mois SaaS Pro offert', '50+ prompts premium', 'Scripts DM prêts à l\'emploi', 'Groupe privé + études de cas', 'Bonus : automatiser sa prospection'],
    badge: 'best-seller' as const,
  },
]

const STARTER_FEATURES = [
  '5 sites générés/mois',
  'Export HTML inclus',
  'Message client DM',
  'Templates de base (10 secteurs)',
  'Support email',
  '1 utilisateur',
]

const PRO_FEATURES = [
  '20 sites générés/mois',
  'Upload photos (8/site)',
  'Modifications par chat',
  'Templates premium (30+ secteurs)',
  'Automatisations IA',
  'Projets sauvegardés illimités',
  'Support prioritaire',
  '1 utilisateur',
]

const AGENCE_FEATURES = [
  '60 sites générés/mois',
  'Workspace agence',
  'Variantes de design (3/site)',
  'Exports avancés (ZIP bientôt)',
  'Priorité de génération',
  '3 utilisateurs',
  'Account manager',
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange/6 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-rose/6 blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20 text-orange text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4" />
              ✦ Propulsé par l&apos;IA — Sans code
            </span>

            <h1
              className="font-syne font-extrabold text-ink mb-6 leading-tight"
              style={{ fontSize: 'clamp(48px, 7vw, 80px)' }}
            >
              Crée des sites pour<br />
              commerces locaux<br />
              <span className="gradient-text">avec l&apos;IA.</span>
            </h1>

            <p className="text-lg text-muted max-w-2xl mb-10 leading-relaxed">
              Décris un business, ajoute des photos, et SitePilot AI génère une maquette complète
              avec textes, design, formulaire, automatisations et export.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange to-rose text-white font-syne font-bold text-lg shadow-orange hover:-translate-y-1 hover:shadow-orange-hover transition-all"
              >
                <Zap className="w-5 h-5" />
                Tester le studio IA →
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-border bg-white text-ink font-syne font-bold text-lg hover:border-orange hover:text-orange transition-all"
              >
                Voir les offres
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange" />
                <span>60 secondes</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange" />
                <span>30+ secteurs</span>
              </div>
              <div className="flex items-center gap-2">
                <Package2 className="w-4 h-4 text-orange" />
                <span>Export HTML</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange" />
                <span>Message DM inclus</span>
              </div>
            </div>
          </div>

          {/* Mockup */}
          <div className="mt-16 max-w-3xl mx-auto animate-float">
            <div className="bg-white rounded-3xl border border-border shadow-card-hover p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow" />
                  <div className="w-3 h-3 rounded-full bg-green" />
                </div>
                <div className="flex-1 bg-surface rounded-lg h-6" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 flex flex-col gap-3">
                  <div className="h-8 bg-gradient-to-r from-orange/20 to-rose/20 rounded-xl" />
                  <div className="h-3 bg-surface rounded-full w-3/4" />
                  <div className="h-3 bg-surface rounded-full" />
                  <div className="h-3 bg-surface rounded-full w-5/6" />
                  <div className="h-8 gradient-bg rounded-xl mt-2" />
                </div>
                <div className="col-span-2 bg-gradient-to-br from-orange/10 to-rose/10 rounded-2xl flex items-center justify-center">
                  <span className="text-5xl">✨</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {['index.html', 'styles.css', 'script.js'].map((f) => (
                  <div key={f} className="bg-surface rounded-lg p-2">
                    <p className="text-[10px] font-mono text-muted">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLÈME */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
              Les commerces ont Instagram.<br />Mais ils n&apos;ont pas de système.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'DM sans suite', desc: 'Des prospects qui écrivent mais ne reçoivent pas de suivi → leads perdus chaque jour.' },
              { title: 'Pas de devis auto', desc: 'Chaque devis pris 30 min à faire → perte de temps et d\'énergie sur chaque client.' },
              { title: 'Page qui ne convertit pas', desc: 'Un site vitrine sans CTA ni formulaire → chiffre d\'affaires en dessous du potentiel.' },
            ].map((p) => (
              <div key={p.title} className="card p-6 border-l-4 border-l-orange">
                <div className="text-2xl mb-3">❌</div>
                <h3 className="font-syne font-bold text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
              SitePilot AI génère tout en 60 secondes
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: '🎨', label: 'Maquette premium' },
              { icon: '✍️', label: 'Copywriting persuasif' },
              { icon: '🎯', label: 'Design system adapté' },
              { icon: '📋', label: 'Formulaire intelligent' },
              { icon: '💌', label: 'Message client prêt' },
              { icon: '📦', label: 'Export HTML propre' },
            ].map((item) => (
              <div key={item.label} className="card p-5 flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-semibold text-ink text-sm">✓ {item.label}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange to-rose text-white font-syne font-bold shadow-orange hover:-translate-y-1 hover:shadow-orange-hover transition-all"
            >
              <Zap className="w-5 h-5" />
              Essayer gratuitement →
            </Link>
          </div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
              Pour qui ?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PERSONAS.map((p) => (
              <div key={p.title} className="card p-6 flex items-start gap-4">
                <span className="text-3xl">{p.icon}</span>
                <div>
                  <h3 className="font-syne font-bold text-ink mb-1">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATIONS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet/10 text-violet text-sm font-semibold mb-4">
              Formations
            </span>
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
              Maîtrise l&apos;IA. Génère des revenus.
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Des formations pratiques pour monétiser vos compétences IA dès cette semaine.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {FORMATIONS.map((f) => (
              <FormationCard key={f.title} {...f} compact />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
              Des tarifs simples et transparents
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <PricingCard name="Starter" price={19} annualPrice={15} features={STARTER_FEATURES} cta="Commencer gratuitement" description="Pour tester et démarrer" />
            <PricingCard name="Pro" price={39} annualPrice={31} highlighted features={PRO_FEATURES} cta="Essayer Pro 14j offerts" description="Le plus populaire" />
            <PricingCard name="Agence" price={79} annualPrice={63} features={AGENCE_FEATURES} cta="Contacter les ventes" description="Pour les équipes" />
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-sm text-orange hover:underline font-medium">
              Voir tous les détails →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-ink text-center mb-12" style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
            Questions fréquentes
          </h2>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
