import Link from 'next/link'
import { Zap, Sparkles, ArrowRight, Check, Star, Shield } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import RoiCalculator from '@/components/RoiCalculator'
import ComparisonSection from '@/components/ComparisonSection'

const FAQ_ITEMS = [
  { question: 'SitePilot AI utilise quelle IA ?', answer: 'SitePilot AI est propulsé par Claude (Anthropic), l\'un des modèles de langage les plus avancés au monde. Il génère copywriting, architecture UX et HTML complet en une seule passe, adapté au secteur détecté.' },
  { question: 'Le site généré est-il vraiment utilisable ?', answer: 'Oui. Le fichier HTML généré est 100% standalone — tous les styles et scripts sont inline. Il peut être hébergé sur n\'importe quel serveur (Hostinger, OVH, Netlify, Vercel) sans aucune dépendance externe. Zéro configuration.' },
  { question: 'Puis-je modifier le site après génération ?', answer: 'Oui. Tapez vos modifications directement dans le chat : "rends le design plus luxe", "ajoute un bouton WhatsApp", "change les couleurs en bleu marine". Claude applique les modifications en quelques secondes.' },
  { question: 'Dois-je savoir coder pour utiliser SitePilot ?', answer: 'Non. SitePilot AI génère tout le code HTML/CSS/JS automatiquement. Tu décris le commerce, le site se génère. Tu télécharges un fichier et tu l\'héberges. Zéro compétence technique requise.' },
  { question: 'Qu\'est-ce qu\'un crédit ?', answer: 'Un crédit = une génération complète de site ou une modification par chat. 12 crédits offerts à l\'inscription sans carte bancaire. Le plan Pro donne 20 crédits/mois, l\'Agence 60/mois.' },
  { question: 'Politique de remboursement ?', answer: 'Remboursement intégral sous 14 jours sans justification. Aucune question posée. Si tu n\'es pas satisfait dans les 14 jours, tu es intégralement remboursé.' },
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
  { emoji: '🏥', label: 'Médical' },
  { emoji: '🏨', label: 'Hôtellerie' },
]

const STEPS = [
  { num: '01', title: 'Décris le commerce', desc: 'Nom, ville, secteur, style, objectif. Plus tu es précis, meilleur sera le résultat. 3 lignes suffisent.' },
  { num: '02', title: 'Ajoute des photos (optionnel)', desc: 'Upload jusqu\'à 8 photos. Elles s\'intègrent directement dans la galerie et le hero du site généré.' },
  { num: '03', title: 'Claude génère la maquette', desc: 'Copywriting adapté au secteur, design personnalisé, formulaire de contact et HTML complet prêt à héberger.' },
  { num: '04', title: 'Exporte et présente', desc: 'Télécharge le fichier HTML standalone. Héberge-le sur n\'importe quel serveur. Présente la démo au commerce.' },
]

const TESTIMONIALS = [
  {
    name: 'Florian B.',
    role: 'Freelance web à Paris',
    avatar: 'FB',
    color: 'from-violet-500 to-purple-600',
    content: 'J\'utilise SitePilot pour préparer mes avant-vente. Je génère une maquette pendant le rendez-vous, le client voit concrètement ce que ça pourrait donner pour son commerce. C\'est très utile.',
    tag: 'Beauté · Paris',
    stars: 5,
  },
  {
    name: 'Amina K.',
    role: 'Designer indépendante · Lyon',
    avatar: 'AK',
    color: 'from-cyan-500 to-blue-600',
    content: 'Avant je passais beaucoup de temps sur des maquettes Figma pour convaincre un client. SitePilot me permet de préparer une démo structurée rapidement, ce qui facilite la discussion.',
    tag: 'Restaurant · Lyon',
    stars: 5,
  },
  {
    name: 'Thomas M.',
    role: 'Agence web · Marseille',
    avatar: 'TM',
    color: 'from-emerald-500 to-green-600',
    content: 'On utilise SitePilot pour nos maquettes avant-vente. Montrer un site complet dès le premier rendez-vous aide le client à se projeter. Ça rend nos présentations plus concrètes.',
    tag: 'Agence · Marseille',
    stars: 5,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background noise">
      <Navbar />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 px-6 overflow-hidden bg-grid">
        <div className="orb w-[700px] h-[700px] bg-violet/15 -top-40 -right-40" style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="orb w-[500px] h-[500px] bg-accent/10 bottom-0 -left-20" style={{ animation: 'float 6s ease-in-out 1s infinite' }} />

        <div className="max-w-6xl mx-auto relative w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="animate-fade-in">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-semibold mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
                </span>
                Claude AI actif · Propulsé par Anthropic
              </div>

              <h1
                className="font-syne font-extrabold text-ink leading-[1.1] mb-4"
                style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
              >
                Sites premium<br />
                pour commerces<br />
                <span className="gradient-text">rapidement.</span>
              </h1>

              {/* Value hook */}
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-xl px-4 py-2.5 mb-6">
                <Sparkles className="w-4 h-4 text-accent shrink-0" />
                <p className="text-sm font-semibold text-ink">
                  Générez une maquette structurée. <span className="text-accent">Préparez une démo pour le commerce.</span>
                </p>
              </div>

              <p className="text-lg text-muted leading-relaxed mb-10 max-w-lg">
                Décris un commerce, ajoute des photos — Claude AI génère une maquette complète
                avec copywriting persuasif, design adapté au secteur et export HTML prêt à héberger.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  href="/studio"
                  className="btn-primary text-base px-7 py-3.5 rounded-2xl font-syne text-lg"
                >
                  <Zap className="w-5 h-5" />
                  Générer mon premier site →
                </Link>
                <Link
                  href="/pricing"
                  className="btn-secondary text-base px-7 py-3.5 rounded-2xl font-syne"
                >
                  Voir les offres
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-5 text-sm">
                <div className="flex items-center gap-2 text-muted">
                  <Shield className="w-4 h-4 text-green" />
                  <span>Aucune carte bancaire</span>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <Zap className="w-4 h-4 text-yellow" />
                  <span>12 crédits offerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow text-yellow" />
                    ))}
                  </div>
                  <span className="text-muted">Satisfaction clients</span>
                </div>
              </div>
            </div>

            {/* Right: Studio mockup */}
            <div className="relative animate-float hidden lg:block">
              <div className="absolute inset-0 rounded-3xl gradient-bg opacity-15 blur-3xl scale-90" />
              <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(124,58,237,0.25)]">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow/60" />
                    <div className="w-3 h-3 rounded-full bg-green/60" />
                  </div>
                  <div className="flex-1 bg-background rounded-md px-3 py-1 text-xs text-muted border border-border">
                    app.sitepilot.ai/studio
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse inline-block" />
                    ✦ Claude AI
                  </div>
                </div>

                {/* Fake studio content */}
                <div className="grid grid-cols-5 bg-[#09090f]">
                  {/* Chat column */}
                  <div className="col-span-2 border-r border-border flex flex-col min-h-[260px]">
                    <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-hidden">
                      {/* Assistant msg */}
                      <div className="flex gap-2">
                        <div className="w-5 h-5 rounded gradient-bg shrink-0 mt-0.5" />
                        <div className="bg-card border border-border rounded-xl rounded-tl-none p-2.5 flex-1">
                          <div className="h-1.5 bg-border rounded mb-1.5 w-full" />
                          <div className="h-1.5 bg-border/60 rounded w-4/5 mb-1" />
                          <div className="h-1.5 bg-border/40 rounded w-3/5" />
                        </div>
                      </div>
                      {/* User msg */}
                      <div className="flex gap-2 flex-row-reverse">
                        <div className="bg-primary rounded-xl rounded-tr-none p-2.5 max-w-[80%]">
                          <div className="h-1.5 bg-white/30 rounded mb-1 w-full" />
                          <div className="h-1.5 bg-white/20 rounded w-3/4" />
                        </div>
                      </div>
                      {/* AI response with green tick */}
                      <div className="flex gap-2">
                        <div className="w-5 h-5 rounded gradient-bg shrink-0 mt-0.5" />
                        <div className="bg-card border border-border rounded-xl rounded-tl-none p-2.5 flex-1">
                          <div className="h-1.5 bg-green/50 rounded mb-1.5 w-full" />
                          <div className="h-1.5 bg-green/30 rounded w-5/6 mb-1" />
                          <div className="h-1.5 bg-border/40 rounded w-2/3" />
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-t border-border">
                      <div className="h-9 rounded-xl gradient-bg flex items-center justify-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-white" />
                        <div className="h-1.5 w-20 bg-white/30 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Preview column */}
                  <div className="col-span-3 overflow-hidden">
                    {/* Fake generated site */}
                    <div className="bg-white h-full min-h-[260px]">
                      {/* Fake site header */}
                      <div className="bg-[#c9956a] px-4 py-2 flex justify-between items-center">
                        <div className="text-white font-bold text-sm">Beauty Studio</div>
                        <div className="text-white/80 text-xs bg-white/20 px-2 py-0.5 rounded">Réserver →</div>
                      </div>
                      {/* Fake hero */}
                      <div className="h-20 bg-gradient-to-br from-orange-50 to-pink-50 px-4 py-3 flex items-center gap-3">
                        <div>
                          <div className="h-2.5 bg-[#c9956a] rounded w-28 mb-1.5" />
                          <div className="h-1.5 bg-[#c9956a]/40 rounded w-20 mb-1" />
                          <div className="h-1.5 bg-[#c9956a]/30 rounded w-16" />
                        </div>
                        <div className="ml-auto text-2xl">💆</div>
                      </div>
                      {/* Fake services */}
                      <div className="px-3 py-2">
                        <div className="h-1.5 bg-gray-200 rounded w-16 mb-2" />
                        <div className="grid grid-cols-3 gap-1.5">
                          {['Soin visage', 'Massage', 'Manucure'].map((s) => (
                            <div key={s} className="bg-orange-50 border border-orange-100 rounded-lg p-1.5 text-center">
                              <div className="text-xs text-[#8b6f5e] font-medium" style={{ fontSize: '9px' }}>{s}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Badge */}
                      <div className="px-3 pb-2">
                        <div className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 rounded px-2 py-0.5 text-[9px] font-semibold">
                          <span className="w-1 h-1 rounded-full bg-green-500 inline-block" />
                          Généré par Claude AI
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

      {/* ═══════════════════════ TRUST BAR ═══════════════════════ */}
      <section className="py-10 px-6 border-y border-border bg-surface/60">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 'Claude AI', label: 'Propulsé par Anthropic', icon: '✦' },
              { value: 'HTML', label: 'Export standalone', icon: '📄' },
              { value: '30+', label: 'Secteurs supportés', icon: '🏢' },
              { value: '14j', label: 'Satisfait ou remboursé', icon: '🛡️' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-syne font-extrabold text-2xl text-ink mb-0.5">{s.value}</div>
                <div className="text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SECTORS ═══════════════════════ */}
      <section className="py-14 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs text-muted mb-6 uppercase tracking-widest font-semibold">30+ secteurs supportés</p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {SECTORS.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted hover:border-primary/30 hover:text-ink transition-all cursor-default"
              >
                <span>{s.emoji}</span>
                {s.label}
              </div>
            ))}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-semibold">
              + 18 autres
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PROBLÈME ═══════════════════════ */}
      <section className="py-24 px-6 bg-surface/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Le problème
            </div>
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Les commerces locaux perdent<br />
              <span className="gradient-text">des clients chaque jour.</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Ils ont Instagram, TikTok, des stories… mais aucun système pour convertir ce trafic en clients payants.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '📬', title: 'DM Instagram sans suite', desc: 'Des prospects qui écrivent mais ne reçoivent aucun suivi automatique → leads perdus chaque jour.' },
              { icon: '⏱️', title: 'Devis manuels chronophages', desc: 'Chaque devis prend 30-45 min à rédiger → perte de temps qui se répète sur chaque prospect.' },
              { icon: '📉', title: 'Page qui ne convertit pas', desc: 'Un site vitrine sans CTA fort ni formulaire → chiffre d\'affaires bien en dessous du potentiel réel.' },
            ].map((p) => (
              <div key={p.title} className="card p-6 border-l-4 border-l-red-500/50">
                <div className="text-2xl mb-3">{p.icon}</div>
                <h3 className="font-syne font-bold text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ DEMO PREVIEW ═══════════════════════ */}
      <section className="py-24 px-6 bg-background relative overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-primary/10 top-0 right-0" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-14">
            <div className="inline-block bg-green/10 border border-green/20 text-green text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              ✦ Ce que vous obtenez
            </div>
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Une maquette complète générée.<br />
              <span className="gradient-text">Prête à présenter.</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Copywriting persuasif · Design adapté au secteur · Formulaire intelligent · SEO · Export HTML standalone
            </p>
          </div>

          {/* 3 site previews */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                sector: 'Beauté & Spa',
                name: 'Belle & Zen Studio',
                city: 'Paris',
                bg: '#fdf8f3',
                primary: '#c9956a',
                secondary: '#8b6f5e',
                emoji: '💆',
                services: ['Soin visage', 'Massage', 'Manucure'],
                badge: 'bg-orange-50 border-orange-200 text-orange-700',
              },
              {
                sector: 'Restaurant',
                name: 'Le Gourmet',
                city: 'Lyon',
                bg: '#fdf6ec',
                primary: '#c0392b',
                secondary: '#e67e22',
                emoji: '🍽️',
                services: ['Menu du jour', 'À la carte', 'Brunch'],
                badge: 'bg-red-50 border-red-200 text-red-700',
              },
              {
                sector: 'Coaching',
                name: 'Coach Excellence',
                city: 'Bordeaux',
                bg: '#f0f4ff',
                primary: '#4f8cff',
                secondary: '#8b5cf6',
                emoji: '🎯',
                services: ['Coaching 1:1', 'Ateliers', 'Programme en ligne'],
                badge: 'bg-blue-50 border-blue-200 text-blue-700',
              },
            ].map((site) => (
              <div key={site.name} className="group relative rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-[0_0_40px_rgba(124,58,237,0.2)] transition-all duration-300 hover:-translate-y-1">
                {/* Fake site */}
                <div style={{ background: site.bg }}>
                  {/* Header */}
                  <div style={{ background: site.primary }} className="px-4 py-2.5 flex justify-between items-center">
                    <span className="text-white font-bold text-sm">{site.name}</span>
                    <span className="text-white/80 text-xs bg-white/20 px-2 py-0.5 rounded">Réserver →</span>
                  </div>
                  {/* Hero */}
                  <div className="h-28 px-5 py-4 flex items-center gap-4" style={{ background: `linear-gradient(135deg, ${site.primary}15, ${site.secondary}10)` }}>
                    <div className="flex-1">
                      <div className="h-3 rounded font-bold mb-2" style={{ background: site.primary, width: '140px' }} />
                      <div className="h-2 rounded mb-1.5" style={{ background: `${site.primary}60`, width: '110px' }} />
                      <div className="inline-block text-xs text-white font-semibold px-3 py-1 rounded-lg mt-1 cursor-pointer" style={{ background: `linear-gradient(135deg, ${site.primary}, ${site.secondary})` }}>
                        Nous contacter →
                      </div>
                    </div>
                    <div className="text-3xl">{site.emoji}</div>
                  </div>
                  {/* Services */}
                  <div className="px-4 py-3">
                    <p className="text-xs font-bold mb-2" style={{ color: site.primary }}>NOS SERVICES</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {site.services.map((s) => (
                        <div key={s} className="text-center py-1.5 px-1 rounded-lg text-xs font-medium" style={{ background: `${site.primary}12`, color: site.secondary }}>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Stats bar */}
                  <div className="px-4 pb-3 flex items-center gap-3">
                    <div className="text-xs" style={{ color: site.primary }}>★★★★★</div>
                    <div className="text-xs text-gray-400">4.9/5 · 200+ clients</div>
                  </div>
                </div>
                {/* Tag */}
                <div className="absolute top-10 right-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${site.badge}`}>
                    {site.sector} · {site.city}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted mt-8">
            Exemples de sites générés par Claude AI · HTML standalone prêt à héberger
          </p>
        </div>
      </section>

      {/* ═══════════════════════ STEPS ═══════════════════════ */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              De zéro à une maquette livrée<br />
              <span className="gradient-text">en 4 étapes.</span>
            </h2>
            <p className="text-muted">Sans formation. Sans compétence technique. Sans prise de tête.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {STEPS.map((step) => (
              <div key={step.num} className="card p-6 flex gap-5 glow-border">
                <div className="text-4xl font-bold font-mono text-primary/20 shrink-0 leading-none">{step.num}</div>
                <div>
                  <h3 className="font-syne font-bold text-ink mb-2">{step.title}</h3>
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
              Essayer gratuitement →
            </Link>
            <p className="text-xs text-muted mt-3">12 crédits offerts · Aucune carte bancaire</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ROI CALCULATOR ═══════════════════════ */}
      <section className="py-24 px-6 bg-[#fffaf3]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-violet-100 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Simulateur de rentabilité
            </div>
            <h2 className="font-syne font-bold text-[#171717] mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Combien peut vous rapporter<br />
              <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                SitePilot ?
              </span>
            </h2>
            <p className="text-[#6b625b] max-w-xl mx-auto">
              Entrez vos paramètres et estimez votre retour sur investissement potentiel.
            </p>
          </div>
          <RoiCalculator />
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className="py-24 px-6 bg-background relative overflow-hidden">
        <div className="orb w-[400px] h-[400px] bg-accent/10 bottom-0 left-0" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-yellow/10 border border-yellow/20 text-yellow text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Star className="w-4 h-4 fill-yellow" />
              Ils l&apos;utilisent déjà
            </div>
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Freelances et agences<br />
              <span className="gradient-text">qui l&apos;utilisent au quotidien.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card p-6 flex flex-col gap-4 glow-border relative overflow-hidden">
                {/* Background glow */}
                <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${t.color} opacity-10 blur-2xl`} />

                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow text-yellow" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-muted leading-relaxed flex-1 italic">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] bg-surface border border-border text-muted px-2 py-0.5 rounded-full">{t.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ AVANT/APRÈS ═══════════════════════ */}
      <section className="py-24 px-6 bg-surface/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Avant vs Après SitePilot
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6 border-l-4 border-l-red-500/50">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center text-sm">❌</div>
                <h3 className="font-syne font-bold text-ink">Sans SitePilot</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  'Maquette Figma longue à préparer',
                  'Résultat générique peu convaincant',
                  'Copywriting à rédiger soi-même',
                  'Templates copiés-collés sans adaptation',
                  'Difficulté à faire visualiser le résultat final',
                  'Perte de temps sur chaque avant-vente',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6 border-l-4 border-l-green/50 shadow-[0_0_30px_rgba(85,196,122,0.1)]">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-green/20 flex items-center justify-center text-sm">✦</div>
                <h3 className="font-syne font-bold text-ink">Avec SitePilot AI</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  'Maquette HTML générée rapidement',
                  'Design adapté au secteur et au style demandé',
                  'Copywriting rédigé par Claude AI',
                  'Client qui peut se projeter sur le rendu',
                  'Export standalone hébergeable partout',
                  'Démo structurée prête à envoyer au commerce',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink">
                    <span className="text-green mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FEATURES ═══════════════════════ */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-ink mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Tout ce qu&apos;il faut pour livrer
            </h2>
            <p className="text-muted">Un outil complet, pas un simple générateur de templates.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: '🧠', label: 'Claude AI intégré', desc: 'Copywriting persuasif rédigé par Claude claude-sonnet-4-6, le meilleur modèle du marché' },
              { icon: '🎨', label: 'Design sur-mesure', desc: 'Palette de couleurs, typographie et style adaptés au secteur et au style demandé' },
              { icon: '📱', label: 'Mobile-first', desc: 'Design responsive 100% · HTML standalone · Aucune dépendance externe' },
              { icon: '📋', label: 'Formulaire intelligent', desc: 'Devis automatique, réservation ou contact selon l\'objectif détecté' },
              { icon: '🤖', label: 'Automations IA', desc: 'WhatsApp Business, email auto, chatbot IA selon les besoins du commerce' },
              { icon: '💌', label: 'Message client', desc: 'DM Instagram, email et WhatsApp rédigés automatiquement pour closer le client' },
              { icon: '🔍', label: 'SEO optimisé', desc: 'Title, meta description et keywords générés pour un bon référencement local' },
              { icon: '📸', label: 'Galerie photos', desc: 'Upload jusqu\'à 8 photos intégrées directement dans le hero et la galerie' },
              { icon: '⬇️', label: 'Export HTML', desc: 'Fichier HTML standalone avec tout inline · Hébergeable partout · Livrable immédiat' },
            ].map((f) => (
              <div key={f.label} className="card p-5 glow-border hover:border-primary/30 transition-all">
                <div className="text-2xl mb-3">{f.icon}</div>
                <p className="font-syne font-bold text-ink text-sm mb-1 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-green" />
                  {f.label}
                </p>
                <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ComparisonSection />

      {/* ═══════════════════════ PRICING ═══════════════════════ */}
      <section className="py-24 px-6 bg-surface/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block bg-violet-100 border border-violet-200 text-violet-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              🎁 Essai gratuit 7 jours — aucune carte bancaire
            </div>
            <h2 className="font-syne font-bold text-ink mb-3" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Créez des sites qui convertissent.
              <br />
              <span className="gradient-text">Vendez plus. Automatiquement.</span>
            </h2>
            <p className="text-muted">Rejoignez les agences et freelances qui génèrent des sites premium en 5 minutes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {[
              {
                name: 'Starter',
                tagline: 'Pour démarrer et tester',
                oldPrice: '39€',
                price: '19€',
                perDay: '0,65',
                badge: null,
                features: ['8 sites générés par mois', 'Export HTML prêt à livrer', '5 styles de design', 'Message client inclus', 'Support par email'],
                cta: 'Choisir Starter',
                href: 'https://buy.stripe.com/eVq7sE0WSbZN7b52FyfjG04',
                highlight: false,
              },
              {
                name: 'Pro',
                tagline: 'Pour vendre sérieusement',
                oldPrice: '120€',
                price: '59€',
                perDay: '2',
                badge: '⭐ Le plus populaire',
                features: ['25 sites par mois', 'Export ZIP complet', 'Images IA (DALL-E 3)', 'Chatbot lead capture intégré', 'Automatisations & devis intelligent', 'Pack commercial complet', 'Support prioritaire'],
                cta: 'Choisir Pro',
                href: 'https://buy.stripe.com/bJe8wIdJEfbZdzt2FyfjG05',
                highlight: true,
              },
              {
                name: 'Agency',
                tagline: 'Pour les agences qui scalent',
                oldPrice: '299€',
                price: '149€',
                perDay: '5',
                badge: null,
                features: ['80 sites par mois', 'Chatbot avancé + lead scoring', 'Mini CRM intégré', 'Projets illimités', 'Variantes design illimitées', 'Support dédié'],
                cta: 'Choisir Agency',
                href: 'https://buy.stripe.com/bJe7sEeNI1l9anh93WfjG06',
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl flex flex-col overflow-visible bg-card transition-all ${
                  plan.highlight
                    ? 'border-2 border-primary shadow-[0_0_40px_rgba(124,58,237,0.2)] md:scale-105'
                    : 'border border-border shadow-sm'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-block text-xs font-bold bg-primary text-white px-4 py-1.5 rounded-full shadow whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-syne font-bold text-xl text-ink mb-0.5 mt-2">{plan.name}</h3>
                  <p className="text-sm text-muted mb-4">{plan.tagline}</p>
                  <div className="mb-5">
                    <div className="text-sm text-muted line-through mb-0.5">{plan.oldPrice}/mois</div>
                    <div className="flex items-end gap-1">
                      <span className="font-syne font-extrabold text-ink text-4xl">{plan.price}</span>
                      <span className="text-muted text-sm mb-1">/mois</span>
                    </div>
                    <p className="text-xs text-muted italic mt-1">soit moins de {plan.perDay}€/jour</p>
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
                    href={plan.href}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl font-syne font-bold text-sm transition-all hover:-translate-y-0.5 ${
                      plan.highlight
                        ? 'gradient-bg text-white shadow-primary hover:shadow-primary-hover'
                        : 'border border-primary text-primary hover:bg-primary/5'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 flex flex-col items-center gap-2">
            <p className="text-sm text-muted flex items-center gap-2">
              <Shield className="w-4 h-4 text-green" />
              Satisfait ou remboursé 7 jours · Annulable à tout moment
            </p>
            <Link href="/pricing" className="text-sm text-primary-light hover:underline">
              Voir tous les détails →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-syne font-bold text-ink text-center mb-12" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Questions fréquentes
          </h2>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ═══════════════════════ CTA FINAL ═══════════════════════ */}
      <section className="py-24 px-6 bg-surface/40 relative overflow-hidden">
        <div className="orb w-80 h-80 bg-primary/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-2xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            12 crédits offerts · Aucune carte bancaire
          </div>
          <h2 className="font-syne font-extrabold text-ink mb-6" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Génère ton premier site<br />
            <span className="gradient-text">maintenant.</span>
          </h2>
          <p className="text-muted mb-3 text-lg">Sans carte bancaire · Sans code · Résultats variables</p>
          <p className="text-sm text-muted mb-10">
            Les résultats dépendent de l&apos;offre, du client et de l&apos;exécution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/studio"
              className="btn-primary text-lg px-10 py-4 rounded-2xl font-syne inline-flex items-center gap-3"
            >
              <Zap className="w-5 h-5" />
              Ouvrir le Studio IA
            </Link>
            <Link
              href="/pricing"
              className="btn-secondary text-lg px-8 py-4 rounded-2xl font-syne inline-flex items-center gap-2"
            >
              Voir les offres
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              14j satisfait ou remboursé
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              12 crédits offerts
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
