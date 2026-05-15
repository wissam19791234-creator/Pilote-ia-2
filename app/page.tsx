import Link from 'next/link'
import { Zap, Sparkles, ArrowRight, Check, Star } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'

const FAQ_ITEMS = [
  { question: 'SitePilot AI utilise quelle IA ?', answer: 'SitePilot AI est propulsé par Claude (Anthropic), l\'un des modèles de langage les plus avancés au monde. Il génère copywriting, architecture UX et HTML en une seule passe.' },
  { question: 'Le site généré est-il vraiment utilisable ?', answer: 'Oui. Le fichier HTML généré est 100% standalone — tous les styles et scripts sont inline. Il peut être hébergé sur n\'importe quel serveur (Hostinger, OVH, Netlify, Vercel) sans aucune dépendance externe.' },
  { question: 'Puis-je modifier le site après génération ?', answer: 'Oui. Tapez vos modifications directement dans le chat : "rends le design plus luxe", "ajoute un bouton WhatsApp", "change les couleurs en bleu". Claude applique les modifications instantanément.' },
  { question: 'Dois-je savoir coder ?', answer: 'Non. SitePilot AI génère tout le code HTML/CSS/JS automatiquement. Vous téléchargez un fichier et vous l\'hébergez. Zéro compétence technique requise.' },
  { question: 'Qu\'est-ce qu\'un crédit ?', answer: 'Un crédit = une génération complète de site. 12 crédits offerts à l\'inscription. Le plan Pro donne 20/mois, l\'Agence 60/mois. Les modifications par chat consomment aussi 1 crédit.' },
  { question: 'Politique de remboursement ?', answer: 'Remboursement intégral sous 14 jours sans justification. Pour les formations : garantie 30 jours. Aucune question posée.' },
]

const SECTORS = [
  { emoji: '💅', label: 'Beauté & Spa' },
  { emoji: '🍽️', label: 'Restaurant' },
  { emoji: '🎊', label: 'Événementiel' },
  { emoji: '🚗', label: 'Automobile' },
  { emoji: '👗', label: 'Mode & Luxe' },
  { emoji: '🏠', label: 'Immobilier' },
  { emoji: '💪', label: 'Fitness' },
  { emoji: '🎯', label: 'Coaching' },
  { emoji: '🛍️', label: 'E-commerce' },
  { emoji: '🔧', label: 'Artisan' },
]

const STEPS = [
  { num: '01', title: 'Décris le commerce', desc: 'Nom, ville, secteur, style, objectif. Plus tu es précis, meilleur sera le résultat.' },
  { num: '02', title: 'Ajoute des photos', desc: 'Upload jusqu\'à 8 photos. Elles s\'intègrent directement dans le site généré.' },
  { num: '03', title: 'Claude génère', desc: 'Copywriting persuasif, design adapté, HTML complet. Tout en moins de 15 secondes.' },
  { num: '04', title: 'Exporte et livre', desc: 'Télécharge le fichier HTML et héberge-le n\'importe où. Facture le client.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background noise">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 px-6 overflow-hidden bg-grid">
        {/* Orbs */}
        <div className="orb w-[600px] h-[600px] bg-violet/20 -top-32 -right-32" style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="orb w-[400px] h-[400px] bg-accent/15 bottom-0 -left-20" style={{ animation: 'float 6s ease-in-out 1s infinite' }} />

        <div className="max-w-6xl mx-auto relative w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-semibold mb-8">
                <Sparkles className="w-4 h-4" />
                ✦ Propulsé par Claude AI · Sans code
              </div>

              <h1
                className="font-syne font-extrabold text-ink leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(42px, 6vw, 76px)' }}
              >
                Sites premium pour<br />
                commerces locaux<br />
                <span className="gradient-text">en 60 secondes.</span>
              </h1>

              <p className="text-lg text-muted leading-relaxed mb-10 max-w-lg">
                Décris un business, ajoute des photos — Claude AI génère une maquette complète
                avec copywriting persuasif, design adapté, formulaire et export HTML.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  href="/studio"
                  className="btn-primary text-base px-7 py-3.5 rounded-2xl font-syne text-lg"
                >
                  <Zap className="w-5 h-5" />
                  Lancer le Studio →
                </Link>
                <Link
                  href="/pricing"
                  className="btn-secondary text-base px-7 py-3.5 rounded-2xl font-syne"
                >
                  Voir les offres
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow text-yellow" />
                    ))}
                  </div>
                  <span>4.9/5 · 200+ utilisateurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
                  <span>Claude AI · Temps réel</span>
                </div>
                <div>⚡ 30+ secteurs · Export HTML</div>
              </div>
            </div>

            {/* Right: Studio mockup */}
            <div className="relative animate-float">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl gradient-bg opacity-20 blur-2xl scale-95" />

                {/* Card */}
                <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(124,58,237,0.2)]">
                  {/* Top bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow/60" />
                      <div className="w-3 h-3 rounded-full bg-green/60" />
                    </div>
                    <div className="flex-1 bg-background rounded-md px-3 py-1 text-xs text-muted border border-border">
                      app.sitepilot.ai/studio
                    </div>
                    <div className="flex items-center gap-1 text-xs text-primary-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Claude AI
                    </div>
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-5">
                    {/* Sidebar mini */}
                    <div className="col-span-1 bg-[#0a0a14] border-r border-border p-3 flex flex-col gap-2">
                      <div className="w-full h-2 bg-primary/30 rounded" />
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded bg-border" />
                          <div className="flex-1 h-1.5 bg-border rounded" style={{ width: `${50 + i * 8}%` }} />
                        </div>
                      ))}
                      <div className="mt-auto pt-2 border-t border-border">
                        <div className="h-10 rounded-lg bg-primary/20 border border-primary/30" />
                      </div>
                    </div>

                    {/* Chat mini */}
                    <div className="col-span-2 border-r border-border flex flex-col">
                      <div className="flex-1 p-3 flex flex-col gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-4 h-4 rounded-md gradient-bg shrink-0" />
                          <div className="bg-card border border-border rounded-lg rounded-tl-none p-2 flex-1">
                            <div className="h-1.5 bg-border rounded mb-1" />
                            <div className="h-1.5 bg-border/60 rounded w-3/4" />
                          </div>
                        </div>
                        <div className="flex gap-1.5 flex-row-reverse">
                          <div className="bg-primary rounded-lg rounded-tr-none p-2 flex-1 max-w-[70%]">
                            <div className="h-1.5 bg-white/30 rounded mb-1" />
                            <div className="h-1.5 bg-white/20 rounded w-2/3" />
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <div className="w-4 h-4 rounded-md gradient-bg shrink-0" />
                          <div className="bg-card border border-border rounded-lg rounded-tl-none p-2 flex-1">
                            <div className="h-1.5 bg-green/40 rounded mb-1" />
                            <div className="h-1.5 bg-border/60 rounded w-4/5" />
                            <div className="h-1.5 bg-border/40 rounded w-3/5 mt-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-2 border-t border-border">
                        <div className="h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center gap-1">
                          <Zap className="w-3 h-3 text-primary-light" />
                          <div className="h-1.5 w-16 bg-primary/40 rounded" />
                        </div>
                      </div>
                    </div>

                    {/* Preview mini */}
                    <div className="col-span-2 bg-white overflow-hidden" style={{ height: '200px' }}>
                      <div className="w-full h-full bg-gradient-to-br from-violet/20 to-blue/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl mb-1">✨</div>
                          <div className="text-[10px] text-gray-400 font-mono">Preview</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTEURS */}
      <section className="py-16 px-6 border-y border-border bg-surface/50">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm text-muted mb-8 uppercase tracking-widest font-semibold">30+ secteurs supportés</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SECTORS.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted hover:border-primary/30 hover:text-ink transition-all"
              >
                <span>{s.emoji}</span>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLÈME */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Les commerces ont Instagram.<br />
              <span className="gradient-text">Mais pas de système.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '📬', title: 'DM sans suite', desc: 'Des prospects qui écrivent mais ne reçoivent aucun suivi → leads perdus chaque jour.' },
              { icon: '⏱️', title: 'Devis manuels', desc: 'Chaque devis prend 30 min à faire → perte de temps sur chaque client potentiel.' },
              { icon: '📉', title: 'Page qui ne convertit pas', desc: 'Un site vitrine sans CTA ni formulaire → chiffre d\'affaires en dessous du potentiel.' },
            ].map((p) => (
              <div key={p.title} className="card p-6 border-l-4 border-l-red-500/50 glow-border">
                <div className="text-2xl mb-3">{p.icon}</div>
                <h3 className="font-syne font-bold text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION — STEPS */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              De zéro à une maquette livrée<br />
              <span className="gradient-text">en 4 étapes.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {STEPS.map((step) => (
              <div key={step.num} className="card p-6 flex gap-5 glow-border">
                <div className="text-3xl font-bold font-mono text-primary/30 shrink-0 leading-none">{step.num}</div>
                <div>
                  <h3 className="font-syne font-bold text-ink mb-1.5">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/studio"
              className="btn-primary text-base px-8 py-4 rounded-2xl font-syne text-lg inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Commencer maintenant →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Tout ce qu&apos;il faut pour livrer
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: '🧠', label: 'Claude AI intégré', desc: 'Copywriting persuasif généré par Claude Anthropic' },
              { icon: '🎨', label: 'Design adapté', desc: 'Palette et style selon le secteur détecté' },
              { icon: '📱', label: 'Mobile-first', desc: 'Responsive 100% — HTML standalone' },
              { icon: '📋', label: 'Formulaire intelligent', desc: 'Devis / réservation / contact selon l\'objectif' },
              { icon: '🤖', label: 'Automations IA', desc: 'WhatsApp, email auto, chatbot détectés' },
              { icon: '💌', label: 'Message client', desc: 'DM Instagram, email pro et WhatsApp prêts' },
            ].map((f) => (
              <div key={f.label} className="card p-5 glow-border">
                <div className="text-2xl mb-3">{f.icon}</div>
                <p className="font-syne font-bold text-ink text-sm mb-1">
                  <Check className="w-3.5 h-3.5 text-green inline mr-1" />
                  {f.label}
                </p>
                <p className="text-xs text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Prix simple et transparent
            </h2>
            <p className="text-muted">12 crédits offerts · Sans carte bancaire</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: 'Starter', price: '19€', period: '/mois', features: ['5 sites/mois', 'Export HTML', 'Message client', '10 secteurs'], cta: 'Commencer', highlight: false },
              { name: 'Pro', price: '39€', period: '/mois', features: ['20 sites/mois', 'Upload photos', 'Modifications chat', '30+ secteurs', 'Automations IA'], cta: 'Essayer 14j offerts', highlight: true },
              { name: 'Agence', price: '79€', period: '/mois', features: ['60 sites/mois', '3 utilisateurs', 'Workspace agence', 'Account manager'], cta: 'Contacter', highlight: false },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`card p-6 flex flex-col ${plan.highlight ? 'border-primary/40 shadow-glow' : ''}`}
              >
                {plan.highlight && (
                  <div className="text-center mb-3">
                    <span className="text-xs font-bold bg-primary/20 text-primary-light px-3 py-1 rounded-full border border-primary/30">
                      ✦ Populaire
                    </span>
                  </div>
                )}
                <h3 className="font-syne font-bold text-xl text-ink mb-1">{plan.name}</h3>
                <div className="mb-5">
                  <span className="text-3xl font-bold font-syne text-ink">{plan.price}</span>
                  <span className="text-muted text-sm">{plan.period}</span>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green shrink-0" />
                      <span className="text-ink">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-syne font-bold text-sm transition-all ${
                    plan.highlight
                      ? 'gradient-bg text-white shadow-primary hover:shadow-primary-hover hover:-translate-y-0.5'
                      : 'bg-surface border border-border text-muted hover:text-ink hover:border-primary/30'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/pricing" className="text-sm text-primary-light hover:underline">
              Voir tous les détails →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-ink text-center mb-12" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Questions fréquentes
          </h2>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative">
            <div className="orb w-64 h-64 bg-primary/20 -top-16 left-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                12 crédits offerts à l&apos;inscription
              </div>
              <h2 className="font-syne font-extrabold text-ink mb-6" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                Génère ton premier site<br />
                <span className="gradient-text">maintenant.</span>
              </h2>
              <p className="text-muted mb-8">Sans carte bancaire · Sans code · En 60 secondes</p>
              <Link
                href="/studio"
                className="btn-primary text-lg px-10 py-4 rounded-2xl font-syne inline-flex items-center gap-3"
              >
                <Zap className="w-5 h-5" />
                Ouvrir le Studio IA
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
