import type {
  GeneratedProject,
  DesignSystem,
  GeneratedPage,
  GeneratedSection,
  FAQItem,
  Testimonial,
  GeneratedFile,
} from '@/types'
import { generateAutomationSales } from '@/lib/automationOptions'
import { selectDAPreset } from '@/lib/designEngine'
import type { DAPreset } from '@/lib/designEngine'
import { generateChatbotHtml } from '@/lib/chatbotBuilder'
import { getCurrentPlanId } from '@/lib/plans'

// ─── Sector detection ────────────────────────────────────────────────────────

function detectSector(prompt: string): string {
  const p = prompt.toLowerCase()
  if (/beauté|coiffeur|coiffure|esthétique|spa|bien.être|massage|onglerie|nail|beauty|salon|brow|lash/.test(p)) return 'beauté'
  if (/restaurant|café|cafe|brasserie|pizzeria|gastronomie|traiteur|cuisine|chef|bistro/.test(p)) return 'restaurant'
  if (/mariage|wedding planner|cérémonie/.test(p)) return 'mariage'
  if (/événementiel|evenement|event|animation|soirée/.test(p)) return 'événementiel'
  if (/automobile|garage|carrosserie|détailing|detailing|auto|voiture|mécanique/.test(p)) return 'automobile'
  if (/boutique|mode|prêt.à.porter|accessoires|fashion|vêtement|vetement/.test(p)) return 'mode'
  if (/parfum|cosmétique|cosmetique|luxe|luxury|premium|haut.de.gamme/.test(p)) return 'luxe'
  if (/immobilier|agence immobilière|logement|appartement|maison/.test(p)) return 'immobilier'
  if (/coach|coaching|formation|consultant|consulting|formateur/.test(p)) return 'coaching'
  if (/ostéopathe|kiné|kinesitherapie|dentiste|médecin|médical|santé/.test(p)) return 'médical'
  if (/fitness|sport|salle de sport|coach sportif|gym|musculation/.test(p)) return 'fitness'
  if (/hôtel|hotel|gîte|gite|chambre|hébergement/.test(p)) return 'hôtellerie'
  if (/e.commerce|ecommerce|dropshipping|shopify|boutique en ligne|vente en ligne/.test(p)) return 'e-commerce'
  if (/artisan|plombier|électricien|menuisier|bâtiment|renovation|peintre|maçon/.test(p)) return 'artisan'
  return 'general'
}

function detectStyle(prompt: string): string {
  const p = prompt.toLowerCase()
  if (/luxe|premium|haut.de.gamme|élégant|elegant|raffiné|raffine/.test(p)) return 'luxe'
  if (/minimaliste|épuré|epure|simple|clean/.test(p)) return 'minimaliste'
  if (/coloré|colore|vibrant|dynamique|moderne/.test(p)) return 'coloré'
  if (/féminin|feminin|doux|romantique|rose/.test(p)) return 'féminin'
  if (/naturel|bio|éco|eco|organique/.test(p)) return 'naturel'
  if (/futuriste|tech|digital|technologie/.test(p)) return 'futuriste'
  if (/chaleureux|convivial|local|rustique/.test(p)) return 'chaleureux'
  return 'moderne'
}

function detectGoal(prompt: string): string {
  const p = prompt.toLowerCase()
  if (/devis|devis auto/.test(p)) return 'devis'
  if (/réservation|reservation|rdv|rendez.vous/.test(p)) return 'réservation'
  if (/appel|téléphone|rappel|call/.test(p)) return 'appel'
  if (/whatsapp/.test(p)) return 'whatsapp'
  if (/vente en ligne|boutique|shopify|e.commerce/.test(p)) return 'ecommerce'
  return 'contact'
}

function detectCity(prompt: string): string {
  const cities = [
    'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
    'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Toulon', 'Grenoble',
    'Dijon', 'Angers', 'Nîmes', 'Aix-en-Provence', 'Brest', 'Le Mans',
  ]
  for (const city of cities) {
    if (prompt.toLowerCase().includes(city.toLowerCase())) return city
  }
  return 'France'
}

function detectAutomations(prompt: string): string[] {
  const p = prompt.toLowerCase()
  const automations: string[] = []
  if (/devis auto|formulaire intelligent/.test(p)) automations.push('Devis automatique')
  if (/chatbot|chat bot/.test(p)) automations.push('Chatbot IA')
  if (/whatsapp/.test(p)) automations.push('WhatsApp Business')
  if (/instagram|dm/.test(p)) automations.push('Instagram DM Auto')
  if (/email auto|relance/.test(p)) automations.push('Email automatisé')
  if (/crm|scoring/.test(p)) automations.push('CRM intelligent')
  if (/paiement/.test(p)) automations.push('Paiement en ligne')
  return automations
}

function detectEcommerce(prompt: string): string[] {
  const p = prompt.toLowerCase()
  if (!/vente en ligne|boutique|shopify|e.commerce|dropshipping/.test(p)) return []
  return ['Catalogue produits', 'Panier d\'achat', 'Paiement sécurisé', 'Livraison tracking']
}

function detectBusinessName(prompt: string, sector: string): string {
  const words = prompt.split(' ').filter((w) => w.length > 3 && /^[A-Z]/.test(w))
  if (words.length > 0) return words[0]
  const defaults: Record<string, string> = {
    beauté: 'Beauty Studio',
    restaurant: 'Le Gourmet',
    mariage: 'Mariage Prestige',
    événementiel: 'Prestige Events',
    automobile: 'AutoPremium',
    mode: 'Fashion House',
    luxe: 'Maison de Luxe',
    immobilier: 'Immo Premium',
    coaching: 'Coach Excellence',
    médical: 'Cabinet Santé',
    fitness: 'FitLife Studio',
    hôtellerie: 'Maison d\'Hôtes',
    'e-commerce': 'Boutique Online',
    artisan: 'Artisan Expert',
    general: 'Business Pro',
  }
  return defaults[sector] ?? 'Business Pro'
}

// ─── Design system by sector ─────────────────────────────────────────────────

function getDesignSystem(sector: string, style: string): DesignSystem {
  const preset = selectDAPreset(sector, style, '')
  return {
    palette: {
      background: preset.palette.background,
      surface: preset.palette.surface,
      primary: preset.palette.primary,
      secondary: preset.palette.secondary,
      accent: preset.palette.accent,
      text: preset.palette.text,
      muted: preset.palette.muted,
    },
    mood: preset.mood,
    typography: preset.typography.heading,
    buttonStyle: preset.buttonStyle,
    cardStyle: preset.cardStyle,
  }
}

// ─── Services by sector ───────────────────────────────────────────────────────

function getServices(sector: string): string[] {
  const map: Record<string, string[]> = {
    beauté: ['Coupe & Brushing', 'Coloration', 'Soins visage', 'Manucure & Pédicure', 'Épilation', 'Massage relaxant'],
    restaurant: ['Menu du jour', 'À la carte', 'Brunch du dimanche', 'Privatisation', 'Livraison', 'Click & Collect'],
    mariage: ['Organisation de cérémonie', 'Décoration florale', 'Coordination jour J', 'Location de salle', 'Traiteur mariage', 'Photographie'],
    événementiel: ['Organisation mariage', 'Décoration florale', 'Animation soirée', 'Photographie', 'Traiteur', 'Location salle'],
    automobile: ['Entretien & révision', 'Carrosserie', 'Détailing intérieur', 'Polissage', 'Vitres teintées', 'Préparation vente'],
    mode: ['Prêt-à-porter femme', 'Prêt-à-porter homme', 'Accessoires', 'Retouches', 'Personal shopping', 'Créations sur-mesure'],
    luxe: ['Parfums exclusifs', 'Cosmétiques premium', 'Conseils beauté', 'Coffrets cadeaux', 'Click & Collect', 'Livraison express'],
    immobilier: ['Achat & vente', 'Location longue durée', 'Gestion locative', 'Estimation gratuite', 'Investissement', 'Conseils fiscaux'],
    coaching: ['Coaching individuel', 'Ateliers collectifs', 'Formation en ligne', 'Audit stratégique', 'Suivi mensuel', 'Masterclass'],
    médical: ['Consultation', 'Bilan complet', 'Suivi patient', 'Téléconsultation', 'Urgences', 'Prévention'],
    fitness: ['Coaching personnalisé', 'Cours collectifs', 'Nutrition sportive', 'Bilan forme', 'Programme en ligne', 'Suivi résultats'],
    hôtellerie: ['Chambres & suites', 'Petit-déjeuner', 'Table d\'hôtes', 'Spa & bien-être', 'Activités nature', 'Séminaires'],
    'e-commerce': ['Livraison rapide', 'Retours gratuits', 'Service client 7j/7', 'Paiement sécurisé', 'Programme fidélité', 'Ventes flash'],
    artisan: ['Diagnostic gratuit', 'Devis sans engagement', 'Intervention express', 'Garantie travaux', 'Matériaux premium', 'Suivi chantier'],
    general: ['Consultation gratuite', 'Service premium', 'Suivi personnalisé', 'Garantie satisfait', 'Support 7j/7', 'Devis rapide'],
  }
  return map[sector] ?? map.general
}

function getPainPoints(sector: string): string[] {
  const map: Record<string, string[]> = {
    beauté: ['Agenda toujours complet et pas de rappels automatiques', 'Des clients qui ne reviennent pas après la première visite', 'Aucun système pour fidéliser et relancer les clientes'],
    restaurant: ['Des tables vides en semaine malgré une bonne cuisine', 'Pas de système de réservation en ligne fonctionnel', 'Aucune stratégie pour fidéliser les clients réguliers'],
    événementiel: ['Des demandes de devis sans suite ni suivi automatique', 'Difficulté à showcaser vos réalisations passées', 'Pas de page qui présente clairement vos offres et tarifs'],
    automobile: ['Des clients qui comparent les prix sans venir vous voir', 'Aucun système de rappel pour les entretiens annuels', 'Pas de présence en ligne professionnelle pour rassurer'],
    mode: ['Une boutique physique limitée par sa zone géographique', 'Pas de vente en ligne pour toucher plus de clients', 'Aucune stratégie de fidélisation des acheteuses'],
    coaching: ['Des prospects qui disparaissent après le premier contact', 'Pas de funnel de vente automatisé pour votre offre', 'Difficulté à démontrer votre valeur avant la vente'],
    général: ['Pas de présence en ligne qui convertit vraiment', 'Des prospects perdus faute de suivi automatique', 'Aucun système pour générer des devis rapidement'],
  }
  return map[sector] ?? map['général'] ?? ['Pas de présence en ligne', 'Prospects non suivis', 'Pas de système de devis']
}

function getFAQ(sector: string, businessName: string): FAQItem[] {
  return [
    { question: `Quels sont vos horaires d'ouverture ?`, answer: `Nous sommes ouverts du lundi au samedi de 9h à 19h. Contactez-nous pour un rendez-vous en dehors de ces horaires.` },
    { question: `Comment prendre rendez-vous ?`, answer: `Vous pouvez réserver directement via notre formulaire en ligne, par téléphone ou par WhatsApp. Réponse garantie sous 2h.` },
    { question: `Proposez-vous des devis gratuits ?`, answer: `Oui, tous nos devis sont gratuits et sans engagement. Décrivez votre projet et nous vous répondons sous 24h.` },
    { question: `Quels modes de paiement acceptez-vous ?`, answer: `Nous acceptons les paiements par carte bancaire, virement, espèces et PayPal. Un acompte de 30% est requis à la réservation.` },
    { question: `Êtes-vous disponibles en urgence ?`, answer: `Selon disponibilités, nous pouvons traiter les demandes urgentes. Contactez-nous directement par téléphone pour toute urgence.` },
    { question: `Avez-vous des avis clients vérifiés ?`, answer: `${businessName} est noté 4.9/5 sur Google avec plus de 50 avis. Tous nos avis sont authentiques et vérifiés par Google.` },
  ]
}

function getTestimonials(sector: string): Testimonial[] {
  const map: Record<string, Testimonial[]> = {
    beauté: [
      { name: 'Sophie M.', role: 'Cliente fidèle depuis 3 ans', content: 'Une adresse incontournable ! Le service est impeccable et les résultats dépassent toujours mes attentes. Je recommande les yeux fermés.', rating: 5 },
      { name: 'Camille R.', role: 'Nouvelle cliente', content: 'J\'avais peur de changer de salon mais c\'était la meilleure décision. Accueil chaleureux, expertise parfaite. Je reviens chaque mois !', rating: 5 },
      { name: 'Marie-Laure T.', role: 'Cliente depuis 1 an', content: 'Des professionnels à l\'écoute qui savent vraiment ce qu\'ils font. Mon look a été complètement transformé. Merci !', rating: 5 },
    ],
    restaurant: [
      { name: 'Jean-Pierre D.', role: 'Client régulier', content: 'La meilleure table du quartier sans hésitation. Des produits frais, une cuisine authentique et un service aux petits soins. On y retourne chaque semaine.', rating: 5 },
      { name: 'Amélie F.', role: 'Occasion spéciale', content: 'Repas d\'anniversaire parfait ! Le chef a préparé un menu personnalisé et toute l\'équipe a été aux petits soins. Un souvenir inoubliable.', rating: 5 },
      { name: 'Thomas B.', role: 'Business lunch', content: 'Idéal pour les déjeuners d\'affaires. Cadre élégant, cuisine raffinée et service discret. Nos clients adorent !', rating: 5 },
    ],
    général: [
      { name: 'Alexandre D.', role: 'Client Premium', content: 'Un service d\'exception, une équipe professionnelle et des résultats qui dépassent les attentes. Je recommande vivement !', rating: 5 },
      { name: 'Isabelle M.', role: 'Cliente fidèle', content: 'La qualité est au rendez-vous à chaque fois. Disponibles, réactifs et à l\'écoute. C\'est rare de nos jours !', rating: 5 },
      { name: 'Nicolas R.', role: 'Nouveau client', content: 'J\'avais des doutes au départ mais le résultat est bluffant. Service premium, prix justes et équipe adorable !', rating: 5 },
    ],
  }
  return (map[sector] ?? map['général']) as Testimonial[]
}

// ─── Copywriting ─────────────────────────────────────────────────────────────

function generateCopywriting(businessName: string, sector: string, city: string, style: string, goal: string) {
  const sectorLabels: Record<string, string> = {
    beauté: 'beauté & bien-être', restaurant: 'gastronomie', événementiel: 'événementiel', mariage: 'mariage',
    automobile: 'automobile', mode: 'mode', luxe: 'luxe & cosmétique', immobilier: 'immobilier',
    coaching: 'coaching', médical: 'santé', fitness: 'fitness', hôtellerie: 'hôtellerie',
    'e-commerce': 'e-commerce', artisan: 'artisan', general: 'services',
  }
  const label = sectorLabels[sector] ?? 'services'

  const heroTitles: Record<string, string> = {
    luxe: `L'excellence ${label} redéfinie par ${businessName}`,
    minimaliste: `${businessName} — ${label} à ${city}`,
    féminin: `Votre espace ${label} de confiance à ${city}`,
    naturel: `${businessName} — ${label} naturel & éco-responsable`,
    chaleureux: `Bienvenue chez ${businessName}, votre expert ${label} à ${city}`,
    futuriste: `${businessName} — L'avenir du ${label} commence ici`,
    coloré: `${businessName} — L'énergie du ${label} à ${city}`,
    moderne: `${businessName} — Expert ${label} à ${city}`,
  }

  const goalCTA: Record<string, { primary: string; secondary: string }> = {
    devis: { primary: 'Obtenir mon devis gratuit →', secondary: 'Voir nos réalisations' },
    réservation: { primary: 'Réserver maintenant →', secondary: 'Voir les disponibilités' },
    appel: { primary: 'Nous appeler maintenant →', secondary: 'En savoir plus' },
    whatsapp: { primary: 'Contacter sur WhatsApp →', secondary: 'Voir nos services' },
    ecommerce: { primary: 'Découvrir la boutique →', secondary: 'Voir les promotions' },
    contact: { primary: 'Nous contacter →', secondary: 'Découvrir nos services' },
  }

  return {
    heroTitle: heroTitles[style] ?? heroTitles.moderne,
    heroSubtitle: `Découvrez une expérience ${label} d'exception à ${city}. Qualité premium, service personnalisé et résultats garantis. Plus de 200 clients satisfaits nous font confiance.`,
    ctaPrimary: goalCTA[goal]?.primary ?? 'Nous contacter →',
    ctaSecondary: goalCTA[goal]?.secondary ?? 'En savoir plus',
  }
}

// ─── Shared CSS animations & utilities ───────────────────────────────────────

function getSharedCSS(preset: DAPreset): string {
  const { palette, typography } = preset
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')

  return `
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;}
    body{background:${palette.background};color:${palette.text};font-family:${typography.body};line-height:1.6;}
    a{color:inherit;text-decoration:none;}
    .container{max-width:1140px;margin:0 auto;padding:0 5%;}

    /* ── Animations ── */
    @keyframes fadeInUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
    @keyframes slideInLeft{from{opacity:0;transform:translateX(-30px);}to{opacity:1;transform:translateX(0);}}
    @keyframes slideInRight{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0);}}
    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
    @keyframes pulse-glow{0%,100%{box-shadow:0 0 20px ${palette.primary}44;}50%{box-shadow:0 0 40px ${palette.primary}88;}}
    @keyframes count-up{from{opacity:0;transform:scale(0.8);}to{opacity:1;transform:scale(1);}}
    @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
    @keyframes revealUp{from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}}
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}

    /* ── Scroll-reveal ── */
    .animate-on-scroll{opacity:0;transform:translateY(28px);transition:opacity 0.7s ease,transform 0.7s ease;}
    .animate-on-scroll.from-left{transform:translateX(-28px);}
    .animate-on-scroll.from-right{transform:translateX(28px);}
    .animate-on-scroll.visible{opacity:1;transform:none;}
    .delay-1{transition-delay:0.1s!important;}
    .delay-2{transition-delay:0.2s!important;}
    .delay-3{transition-delay:0.3s!important;}
    .delay-4{transition-delay:0.4s!important;}
    .delay-5{transition-delay:0.5s!important;}

    /* ── 3D cards ── */
    .card-3d{transition:transform 0.35s ease,box-shadow 0.35s ease;transform-style:preserve-3d;cursor:pointer;}
    .card-3d:hover{transform:perspective(800px) rotateX(-3deg) rotateY(3deg) translateY(-6px);box-shadow:20px 20px 60px rgba(0,0,0,0.18);}

    /* ── Glow buttons ── */
    .btn-glow{position:relative;overflow:hidden;transition:all 0.3s ease;display:inline-flex;align-items:center;gap:8px;}
    .btn-glow::after{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(255,255,255,0.3) 0%,transparent 60%);opacity:0;transition:opacity 0.3s;}
    .btn-glow:hover::after{opacity:1;}
    .btn-glow:hover{transform:translateY(-3px);}

    /* ── Primary button ── */
    .btn-primary{background:${palette.gradient};color:white;padding:14px 28px;border-radius:12px;font-weight:700;font-family:${typography.heading};border:none;cursor:pointer;box-shadow:0 4px 16px ${palette.primary}44;font-size:1rem;}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 28px ${palette.primary}66;}

    /* ── Secondary button ── */
    .btn-secondary{background:transparent;color:${palette.text};padding:14px 28px;border-radius:12px;font-weight:600;font-family:${typography.heading};border:1.5px solid ${isDark ? '#444' : '#e0d8d0'};cursor:pointer;transition:all 0.2s;font-size:1rem;display:inline-flex;align-items:center;gap:8px;}
    .btn-secondary:hover{border-color:${palette.primary};color:${palette.primary};transform:translateY(-1px);}

    /* ── Badge ── */
    .badge{display:inline-block;background:${palette.gradient};color:white;padding:5px 14px;border-radius:20px;font-size:0.82rem;font-weight:600;}

    /* ── Section title ── */
    .section-title{font-family:${typography.heading};font-size:clamp(26px,4vw,42px);color:${palette.text};line-height:1.2;}
    .section-sub{color:${palette.muted};max-width:600px;margin:12px auto 0;line-height:1.7;}

    /* ── Responsive ── */
    @media(max-width:768px){
      .hide-mobile{display:none!important;}
      .grid-2,.hero-2col{grid-template-columns:1fr!important;}
      .grid-3{grid-template-columns:1fr!important;}
      .grid-4{grid-template-columns:1fr 1fr!important;}
    }
  `
}

// ─── Shared JS ────────────────────────────────────────────────────────────────

function getSharedJS(palette: DAPreset['palette']): string {
  return `
  // FAQ accordion
  function toggleFaq(i){
    var ans=document.getElementById('faq-answer-'+i);
    var icon=document.getElementById('faq-icon-'+i);
    var isOpen=ans.style.display==='block';
    document.querySelectorAll('[id^="faq-answer-"]').forEach(function(el){el.style.display='none';});
    document.querySelectorAll('[id^="faq-icon-"]').forEach(function(el){el.textContent='+';el.style.transform='';});
    if(!isOpen){ans.style.display='block';icon.textContent='−';icon.style.transform='rotate(180deg)';}
  }

  // Form submit
  function submitForm(e){
    e.preventDefault();
    var s=document.getElementById('form-success');
    if(s){s.style.display='block';}
    e.target.reset();
    setTimeout(function(){if(s)s.style.display='none';},5000);
  }

  // Scroll-reveal via IntersectionObserver
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
    });
  },{threshold:0.15});
  document.querySelectorAll('.animate-on-scroll').forEach(function(el){observer.observe(el);});

  // Animated counters
  function animateCount(el,target,suffix){
    var start=0;var duration=1500;var startTime=null;
    function step(timestamp){
      if(!startTime)startTime=timestamp;
      var progress=Math.min((timestamp-startTime)/duration,1);
      var eased=1-Math.pow(1-progress,3);
      el.textContent=Math.floor(eased*target)+(suffix||'');
      if(progress<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var countObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var el=entry.target;
        var target=parseInt(el.getAttribute('data-target')||'0',10);
        var suffix=el.getAttribute('data-suffix')||'';
        animateCount(el,target,suffix);
        countObserver.unobserve(el);
      }
    });
  },{threshold:0.5});
  document.querySelectorAll('.count-up').forEach(function(el){countObserver.observe(el);});
  `
}

// ─── Shared header & footer ───────────────────────────────────────────────────

function buildHeader(preset: DAPreset, businessName: string, ctaPrimary: string, services: string[]): string {
  const { palette, typography } = preset
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')
  return `
<header style="position:sticky;top:0;z-index:100;background:${palette.background}ee;backdrop-filter:blur(14px);border-bottom:1px solid ${isDark ? '#ffffff18' : '#0000000f'};padding:16px 5%;">
  <div class="container" style="display:flex;justify-content:space-between;align-items:center;">
    <a href="#" style="font-family:${typography.heading};font-size:1.4rem;font-weight:800;background:${palette.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${businessName}</a>
    <nav style="display:flex;gap:28px;align-items:center;" class="hide-mobile">
      <a href="#services" style="color:${palette.muted};font-weight:500;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='${palette.muted}'">Services</a>
      <a href="#galerie" style="color:${palette.muted};font-weight:500;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='${palette.muted}'">Galerie</a>
      <a href="#avis" style="color:${palette.muted};font-weight:500;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='${palette.muted}'">Avis</a>
      <a href="#contact" style="color:${palette.muted};font-weight:500;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='${palette.muted}'">Contact</a>
    </nav>
    <a href="#contact" class="btn-primary btn-glow" style="padding:10px 20px;font-size:0.9rem;">${ctaPrimary.replace(' →', '')}</a>
  </div>
</header>`
}

function buildFooter(preset: DAPreset, businessName: string, city: string, sector: string, services: string[]): string {
  const { palette, typography } = preset
  return `
<footer style="background:#0a0a0a;color:#e5e5e5;padding:64px 5% 32px;">
  <div class="container">
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px;" class="grid-4">
      <div>
        <div style="font-family:${typography.heading};font-size:1.5rem;font-weight:800;background:${palette.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:12px;">${businessName}</div>
        <p style="color:#9ca3af;line-height:1.7;max-width:280px;margin-bottom:24px;">Votre expert ${sector} à ${city}. Qualité, professionnalisme et satisfaction garantis.</p>
        <div style="display:flex;gap:12px;">
          ${['In','Fb','Tk'].map((s) => `<a href="#" style="width:36px;height:36px;background:#ffffff11;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#9ca3af;font-size:0.8rem;transition:all 0.2s;font-weight:700;" onmouseover="this.style.background='${palette.primary}';this.style.color='white'" onmouseout="this.style.background='#ffffff11';this.style.color='#9ca3af'">${s}</a>`).join('')}
        </div>
      </div>
      <div>
        <div style="font-family:${typography.heading};font-weight:700;margin-bottom:16px;color:white;">Services</div>
        ${services.slice(0, 4).map((s) => `<a href="#services" style="display:block;color:#9ca3af;margin-bottom:8px;font-size:0.9rem;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='#9ca3af'">${s}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:${typography.heading};font-weight:700;margin-bottom:16px;color:white;">Navigation</div>
        ${['Accueil', 'Services', 'Galerie', 'Avis', 'Contact'].map((n) => `<a href="#${n.toLowerCase()}" style="display:block;color:#9ca3af;margin-bottom:8px;font-size:0.9rem;transition:color 0.2s;" onmouseover="this.style.color='${palette.primary}'" onmouseout="this.style.color='#9ca3af'">${n}</a>`).join('')}
      </div>
      <div>
        <div style="font-family:${typography.heading};font-weight:700;margin-bottom:16px;color:white;">Contact</div>
        <div style="color:#9ca3af;font-size:0.9rem;line-height:2.2;">
          <div>📍 ${city}, France</div>
          <div>📞 06 00 00 00 00</div>
          <div>✉️ contact@${businessName.toLowerCase().replace(/\s/g, '')}.fr</div>
        </div>
      </div>
    </div>
    <div style="border-top:1px solid #ffffff11;padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <p style="color:#6b7280;font-size:0.85rem;">© ${new Date().getFullYear()} ${businessName}. Tous droits réservés.</p>
      <div style="display:flex;gap:20px;">
        ${['Mentions légales','CGV','Confidentialité'].map((l) => `<a href="#" style="color:#6b7280;font-size:0.85rem;transition:color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='#6b7280'">${l}</a>`).join('')}
      </div>
    </div>
  </div>
</footer>`
}

// ─── Shared sections ──────────────────────────────────────────────────────────

function buildServicesSection(preset: DAPreset, services: string[]): string {
  const { palette, typography } = preset
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')
  const emojis = ['✂️','💅','🌿','💆','🪄','⭐','🎯','💎','🔥','✨','🎊','🌟']
  return `
<section id="services" style="padding:90px 5%;background:${isDark ? '#111118' : palette.surface};">
  <div class="container">
    <div style="text-align:center;margin-bottom:56px;" class="animate-on-scroll">
      <span class="badge">Nos services</span>
      <h2 class="section-title" style="margin-top:16px;">Ce que nous proposons</h2>
      <p class="section-sub">Une gamme complète de services adaptés à vos besoins.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;" class="grid-3">
      ${services.map((s, i) => `
      <div class="card-3d animate-on-scroll delay-${(i % 4) + 1}" style="background:${isDark ? '#1a1a24' : 'white'};border-radius:18px;padding:32px;box-shadow:0 2px 20px rgba(0,0,0,0.07);border:1px solid ${palette.primary}18;">
        <div style="font-size:2.2rem;margin-bottom:14px;animation:float 3s ease-in-out infinite;animation-delay:${i * 0.2}s;">${emojis[i % 12]}</div>
        <h3 style="font-family:${typography.heading};color:${palette.text};margin-bottom:10px;font-size:1.1rem;">${s}</h3>
        <p style="color:${palette.muted};font-size:0.9rem;line-height:1.65;margin-bottom:16px;">Service professionnel réalisé par nos experts avec des produits de qualité supérieure.</p>
        <div style="font-weight:700;color:${palette.primary};font-size:1rem;">${30 + i * 15}€ <span style="font-weight:400;color:${palette.muted};font-size:0.85rem;">/ session</span></div>
      </div>`).join('')}
    </div>
  </div>
</section>`
}

function buildTestimonialsSection(preset: DAPreset, testimonials: Testimonial[]): string {
  const { palette, typography } = preset
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')
  return `
<section id="avis" style="padding:90px 5%;background:${isDark ? '#0d0d14' : palette.surfaceAlt ?? '#f8f5f0'};">
  <div class="container">
    <div style="text-align:center;margin-bottom:56px;" class="animate-on-scroll">
      <span class="badge">Témoignages</span>
      <h2 class="section-title" style="margin-top:16px;">Ce que disent nos clients</h2>
      <p style="color:${palette.muted};font-size:0.85rem;margin-top:8px;">Avis représentatifs de notre clientèle</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
      ${testimonials.map((t, i) => `
      <div class="card-3d animate-on-scroll delay-${i + 1}" style="background:${isDark ? '#1a1a24' : 'white'};border-radius:18px;padding:30px;box-shadow:0 2px 20px rgba(0,0,0,0.07);">
        <div style="color:#ffbe2e;font-size:1.2rem;margin-bottom:14px;">${'⭐'.repeat(t.rating)}</div>
        <p style="color:${palette.muted};line-height:1.7;margin-bottom:18px;font-style:italic;">"${t.content}"</p>
        <div style="border-top:1px solid ${isDark ? '#ffffff14' : '#e8e0d5'};padding-top:16px;">
          <div style="font-weight:700;color:${palette.text};">${t.name}</div>
          <div style="color:${palette.muted};font-size:0.85rem;">${t.role}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`
}

function buildFAQSection(preset: DAPreset, faq: FAQItem[]): string {
  const { palette, typography } = preset
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')
  return `
<section style="padding:90px 5%;background:${isDark ? '#111118' : palette.surface};">
  <div style="max-width:740px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:48px;" class="animate-on-scroll">
      <span class="badge">FAQ</span>
      <h2 class="section-title" style="margin-top:16px;">Questions fréquentes</h2>
    </div>
    <div class="animate-on-scroll">
      ${faq.map((f, i) => `
      <div style="border-bottom:1px solid ${isDark ? '#ffffff14' : '#e8e0d5'};">
        <button onclick="toggleFaq(${i})" style="width:100%;text-align:left;padding:20px 0;background:none;border:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-family:${typography.heading};font-size:1rem;color:${palette.text};font-weight:600;">
          ${f.question}
          <span id="faq-icon-${i}" style="font-size:1.4rem;color:${palette.primary};transition:transform 0.3s;flex-shrink:0;">+</span>
        </button>
        <div id="faq-answer-${i}" style="display:none;padding-bottom:20px;color:${palette.muted};line-height:1.7;">${f.answer}</div>
      </div>`).join('')}
    </div>
  </div>
</section>`
}

function buildContactSection(preset: DAPreset, ctaPrimary: string, services: string[]): string {
  const { palette, typography } = preset
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')
  return `
<section id="contact" style="padding:90px 5%;background:${isDark ? '#0a0a12' : '#fff8ee'};">
  <div style="max-width:660px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:44px;" class="animate-on-scroll">
      <span class="badge">Contact</span>
      <h2 class="section-title" style="margin-top:16px;">Contactez-nous</h2>
      <p class="section-sub" style="margin-top:8px;">Réponse garantie sous 2h en jours ouvrés.</p>
    </div>
    <form onsubmit="submitForm(event)" class="animate-on-scroll" style="background:${isDark ? '#1a1a24' : 'white'};border-radius:22px;padding:42px;box-shadow:0 4px 36px rgba(0,0,0,0.09);">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;" class="grid-2">
        <div style="position:relative;">
          <label style="position:absolute;top:-10px;left:12px;background:${isDark ? '#1a1a24' : 'white'};padding:0 4px;font-size:0.8rem;color:${palette.primary};font-weight:600;">Prénom & Nom *</label>
          <input required type="text" placeholder="Marie Dupont" style="width:100%;padding:14px;border:1.5px solid ${isDark ? '#333' : '#e8e0d5'};border-radius:10px;background:transparent;color:${palette.text};font-family:${typography.body};font-size:1rem;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='${palette.primary}'" onblur="this.style.borderColor='${isDark ? '#333' : '#e8e0d5'}'">
        </div>
        <div style="position:relative;">
          <label style="position:absolute;top:-10px;left:12px;background:${isDark ? '#1a1a24' : 'white'};padding:0 4px;font-size:0.8rem;color:${palette.primary};font-weight:600;">Téléphone *</label>
          <input required type="tel" placeholder="06 00 00 00 00" style="width:100%;padding:14px;border:1.5px solid ${isDark ? '#333' : '#e8e0d5'};border-radius:10px;background:transparent;color:${palette.text};font-family:${typography.body};font-size:1rem;outline:none;" onfocus="this.style.borderColor='${palette.primary}'" onblur="this.style.borderColor='${isDark ? '#333' : '#e8e0d5'}'">
        </div>
      </div>
      <div style="position:relative;margin-bottom:20px;">
        <label style="position:absolute;top:-10px;left:12px;background:${isDark ? '#1a1a24' : 'white'};padding:0 4px;font-size:0.8rem;color:${palette.primary};font-weight:600;">Email *</label>
        <input required type="email" placeholder="marie@email.com" style="width:100%;padding:14px;border:1.5px solid ${isDark ? '#333' : '#e8e0d5'};border-radius:10px;background:transparent;color:${palette.text};font-family:${typography.body};font-size:1rem;outline:none;" onfocus="this.style.borderColor='${palette.primary}'" onblur="this.style.borderColor='${isDark ? '#333' : '#e8e0d5'}'">
      </div>
      <div style="position:relative;margin-bottom:20px;">
        <label style="position:absolute;top:-10px;left:12px;background:${isDark ? '#1a1a24' : 'white'};padding:0 4px;font-size:0.8rem;color:${palette.primary};font-weight:600;">Type de besoin</label>
        <select style="width:100%;padding:14px;border:1.5px solid ${isDark ? '#333' : '#e8e0d5'};border-radius:10px;background:${isDark ? '#1a1a24' : 'white'};color:${palette.muted};font-family:${typography.body};font-size:1rem;outline:none;appearance:none;">
          ${services.slice(0, 4).map((s) => `<option>${s}</option>`).join('')}
          <option>Autre demande</option>
        </select>
      </div>
      <div style="position:relative;margin-bottom:28px;">
        <label style="position:absolute;top:-10px;left:12px;background:${isDark ? '#1a1a24' : 'white'};padding:0 4px;font-size:0.8rem;color:${palette.primary};font-weight:600;">Votre message</label>
        <textarea placeholder="Décrivez votre projet ou votre besoin..." rows="4" style="width:100%;padding:14px;border:1.5px solid ${isDark ? '#333' : '#e8e0d5'};border-radius:10px;background:transparent;color:${palette.text};font-family:${typography.body};font-size:1rem;outline:none;resize:vertical;" onfocus="this.style.borderColor='${palette.primary}'" onblur="this.style.borderColor='${isDark ? '#333' : '#e8e0d5'}'"></textarea>
      </div>
      <button type="submit" class="btn-primary btn-glow" style="width:100%;padding:16px;border-radius:12px;border:none;cursor:pointer;font-size:1.1rem;justify-content:center;">${ctaPrimary}</button>
      <p id="form-success" style="display:none;text-align:center;color:#22c55e;margin-top:16px;font-weight:600;">✓ Message envoyé ! Nous vous répondons sous 2h.</p>
    </form>
  </div>
</section>`
}

function buildStatsRow(preset: DAPreset): string {
  const { palette, typography } = preset
  return `
<div style="display:flex;gap:40px;margin-top:40px;padding-top:32px;border-top:1px solid ${palette.primary}22;flex-wrap:wrap;">
  <div class="animate-on-scroll delay-1">
    <div class="count-up section-title" data-target="200" data-suffix="+" style="font-size:1.9rem;font-weight:800;color:${palette.primary};">200+</div>
    <div style="color:${palette.muted};font-size:0.85rem;">Clients satisfaits</div>
  </div>
  <div class="animate-on-scroll delay-2">
    <div class="count-up section-title" data-target="49" data-suffix="★" style="font-size:1.9rem;font-weight:800;color:${palette.primary};">4.9★</div>
    <div style="color:${palette.muted};font-size:0.85rem;">Note Google</div>
  </div>
  <div class="animate-on-scroll delay-3">
    <div class="count-up section-title" data-target="5" data-suffix=" ans" style="font-size:1.9rem;font-weight:800;color:${palette.primary};">5 ans</div>
    <div style="color:${palette.muted};font-size:0.85rem;">D'expérience</div>
  </div>
</div>`
}

// ─── Sector-specific CSS visual placeholders (look like real photos) ──────────

const SECTOR_VISUALS: Record<string, { hero: string; gallery: string[] }> = {
  restaurant: {
    hero: `background:linear-gradient(135deg,#1a0800 0%,#5c1a00 40%,#c0553a 70%,#e07832 100%);display:flex;align-items:center;justify-content:center;`,
    gallery: [
      `background:linear-gradient(160deg,#fdf6ec,#f5deb3,#d4a45a);`,
      `background:linear-gradient(160deg,#fff8ee,#fce0a8,#e8a030);`,
      `background:linear-gradient(160deg,#fdf6ec,#e8c88a,#c0553a);`,
      `background:linear-gradient(160deg,#fff4e6,#f7d794,#d4840a);`,
    ],
  },
  beauté: {
    hero: `background:linear-gradient(135deg,#fdf0e8 0%,#f5cba7 50%,#c9956a 100%);display:flex;align-items:center;justify-content:center;`,
    gallery: [
      `background:linear-gradient(160deg,#fde8d8,#f5cba7,#e8a87c);`,
      `background:linear-gradient(160deg,#fdf0e8,#e8c9a8,#d4956a);`,
      `background:linear-gradient(160deg,#f5e6d3,#dab896,#c89060);`,
      `background:linear-gradient(160deg,#fdf4ee,#ecd4b8,#c8906a);`,
    ],
  },
  événementiel: {
    hero: `background:linear-gradient(135deg,#1a0533 0%,#4a1070 50%,#c9a96e 100%);display:flex;align-items:center;justify-content:center;`,
    gallery: [
      `background:linear-gradient(160deg,#1a0533,#6b3fa0,#c9a96e);`,
      `background:linear-gradient(160deg,#0d0d1a,#4a1070,#9b59b6);`,
      `background:linear-gradient(160deg,#13131f,#5c1a8a,#d4af37);`,
      `background:linear-gradient(160deg,#1a0a2e,#7b2fa0,#c9a96e);`,
    ],
  },
  automobile: {
    hero: `background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 40%,#e63946 80%,#ff6b7a 100%);display:flex;align-items:center;justify-content:center;`,
    gallery: [
      `background:linear-gradient(160deg,#0a0a0a,#2a2a2a,#444);`,
      `background:linear-gradient(160deg,#141414,#1e1e1e,#e63946);`,
      `background:linear-gradient(160deg,#0d0d0d,#252525,#6c757d);`,
      `background:linear-gradient(160deg,#0a0a0a,#333,#555);`,
    ],
  },
  immobilier: {
    hero: `background:linear-gradient(135deg,#0e1a2b 0%,#142235 50%,#c9a96e 100%);display:flex;align-items:center;justify-content:center;`,
    gallery: [
      `background:linear-gradient(160deg,#f8f9fa,#e9ecef,#c9a96e);`,
      `background:linear-gradient(160deg,#f0f2f5,#dde2e8,#1a2744);`,
      `background:linear-gradient(160deg,#f8f9fa,#e8ebee,#b8966a);`,
      `background:linear-gradient(160deg,#f5f6f8,#e2e6ea,#c9a96e);`,
    ],
  },
  fitness: {
    hero: `background:linear-gradient(135deg,#0a0e1a 0%,#1a2030 40%,#f97316 80%,#fb923c 100%);display:flex;align-items:center;justify-content:center;`,
    gallery: [
      `background:linear-gradient(160deg,#0a0e1a,#1a2030,#f97316);`,
      `background:linear-gradient(160deg,#111827,#1f2937,#22d3ee);`,
      `background:linear-gradient(160deg,#0f172a,#1e293b,#f97316);`,
      `background:linear-gradient(160deg,#0a0e1a,#1a2030,#ff6b35);`,
    ],
  },
  'e-commerce': {
    hero: `background:linear-gradient(135deg,#fafaf8 0%,#f0ebe5 50%,#c9a96e 100%);display:flex;align-items:center;justify-content:center;`,
    gallery: [
      `background:linear-gradient(160deg,#fafafa,#f0ebe5,#e8ddd0);`,
      `background:linear-gradient(160deg,#f5f0eb,#e8ddd0,#c8a882);`,
      `background:linear-gradient(160deg,#fdf8f3,#f0e8dc,#d8c8b4);`,
      `background:linear-gradient(160deg,#fafaf8,#f4eeea,#c9a96e);`,
    ],
  },
  coaching: {
    hero: `background:linear-gradient(135deg,#f0f4ff 0%,#c7d2fe 50%,#4f46e5 100%);display:flex;align-items:center;justify-content:center;`,
    gallery: [
      `background:linear-gradient(160deg,#f0f4ff,#c7d2fe,#4f46e5);`,
      `background:linear-gradient(160deg,#f5f3ff,#ddd6fe,#7c3aed);`,
      `background:linear-gradient(160deg,#eff6ff,#bfdbfe,#3b82f6);`,
      `background:linear-gradient(160deg,#f0fdf4,#bbf7d0,#22c55e);`,
    ],
  },
}

function sectorVisual(sector: string, type: 'hero' | 'gallery', idx = 0): string {
  const s = sector.toLowerCase()
  for (const key of Object.keys(SECTOR_VISUALS)) {
    if (s.includes(key)) {
      const vis = SECTOR_VISUALS[key]
      if (type === 'hero') return vis.hero
      return vis.gallery[idx % vis.gallery.length]
    }
  }
  return type === 'hero'
    ? `background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;align-items:center;justify-content:center;`
    : `background:linear-gradient(160deg,#f6f1ff,#e2d9f3,#9f7aea);`
}

function photoOrVisual(photos: string[], idx: number, sector: string, style: string, w = '100%', h = '100%'): string {
  if (photos[idx]) {
    return `<img src="${photos[idx]}" alt="Photo" style="width:${w};height:${h};object-fit:cover;">`
  }
  const emoji = sector.includes('restaurant') ? '🍽️' : sector.includes('beauté') ? '💆' : sector.includes('événement') ? '✨' : sector.includes('auto') ? '🚗' : sector.includes('fitness') ? '💪' : sector.includes('coaching') ? '🎯' : sector.includes('immobilier') ? '🏠' : sector.includes('e-commerce') ? '✦' : '📸'
  return `<div style="width:${w};height:${h};${sectorVisual(sector,'hero')};border-radius:inherit;"><div style="font-size:5rem;filter:drop-shadow(0 4px 16px rgba(0,0,0,0.3));">${emoji}</div></div>`
}

function galleryPhotoOrVisual(photos: string[], idx: number, sector: string): string {
  if (photos[idx]) {
    return `<img src="${photos[idx]}" alt="Réalisation" style="width:100%;height:100%;object-fit:cover;transition:transform 0.4s;" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform=''">`
  }
  const labels = {
    restaurant: ['Entrée du chef','Plat signature','Dessert maison','Salle & ambiance'],
    beauté: ['Soin visage','Nail art','Massage','Maquillage'],
    événementiel: ['Mariage','Gala','Cocktail','Décoration'],
    automobile: ['Détailing','Carrosserie','Diagnostic','Livraison'],
    fitness: ['Cardio','Muscu','Cours collectif','Coaching'],
    coaching: ['Séance 1:1','Atelier groupe','Formation','Résultats'],
    'e-commerce': ['Produit phare','Collection','Coffret','Livraison'],
    immobilier: ['Appartement','Villa','Bureau','Terrain'],
  }
  let label = 'Réalisation'
  for (const [key, vals] of Object.entries(labels)) {
    if (sector.toLowerCase().includes(key)) { label = vals[idx % vals.length]; break }
  }
  const bg = sectorVisual(sector, 'gallery', idx)
  return `<div style="width:100%;height:100%;${bg};border-radius:inherit;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:16px;"><span style="background:rgba(0,0,0,0.45);color:white;font-size:0.75rem;font-weight:600;padding:4px 10px;border-radius:20px;backdrop-filter:blur(4px);">${label}</span></div>`
}

function buildGallerySection(preset: DAPreset, photos: string[], sector: string): string {
  const { palette } = preset
  const isDarkBg = palette.background.startsWith('#0') || palette.background.startsWith('#1')
  const items = [0,1,2,3].map((i) => `
    <div class="card-3d animate-on-scroll delay-${i+1}" style="border-radius:16px;overflow:hidden;aspect-ratio:1;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
      ${galleryPhotoOrVisual(photos, i+1, sector)}
    </div>
  `)
  return `
<section id="galerie" style="padding:90px 5%;background:${isDarkBg ? '#0a0a12' : '#fffaf5'};">
  <div class="container">
    <div style="text-align:center;margin-bottom:48px;" class="animate-on-scroll">
      <span class="badge">Portfolio</span>
      <h2 class="section-title" style="margin-top:16px;">Nos réalisations</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
      ${items.join('')}
    </div>
  </div>
</section>`
}

// ─── Layout generators ────────────────────────────────────────────────────────

/**
 * split-hero: 2-column grid, text left / visual right, stats bar below
 */
function buildSplitHero(preset: DAPreset, project: GeneratedProject, photos: string[]): string {
  const { palette, typography } = preset
  const { businessName, sector, city, copywriting } = project
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')

  const heroImage = photoOrVisual(photos, 0, sector, project.style ?? '')

  return `
<!-- HERO — split-hero -->
<section style="padding:80px 5% 60px;min-height:92vh;display:flex;align-items:center;background:radial-gradient(ellipse 700px 500px at 70% 30%,${palette.primary}14,transparent),radial-gradient(ellipse 500px 400px at 10% 80%,${palette.secondary}0e,transparent);">
  <div class="container" style="width:100%;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;" class="hero-2col">
    <div>
      <span class="badge animate-on-scroll" style="margin-bottom:24px;">✦ ${sector.charAt(0).toUpperCase()+sector.slice(1)} · ${city}</span>
      <h1 class="animate-on-scroll delay-1" style="font-family:${typography.heading};font-size:clamp(36px,5vw,62px);line-height:1.12;margin:18px 0 22px;color:${palette.text};">
        ${copywriting.heroTitle.replace(/(\w[\w\s]+)$/, `<span style="background:${palette.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">$1</span>`)}
      </h1>
      <p class="animate-on-scroll delay-2" style="font-size:1.12rem;color:${palette.muted};line-height:1.75;margin-bottom:36px;max-width:500px;">${copywriting.heroSubtitle}</p>
      <div class="animate-on-scroll delay-3" style="display:flex;gap:16px;flex-wrap:wrap;">
        <a href="#contact" class="btn-primary btn-glow">${copywriting.ctaPrimary}</a>
        <a href="#services" class="btn-secondary">${copywriting.ctaSecondary}</a>
      </div>
      ${buildStatsRow(preset)}
    </div>
    <div class="animate-on-scroll from-right" style="border-radius:24px;overflow:hidden;box-shadow:0 28px 72px ${palette.primary}33;aspect-ratio:4/3;animation:float 4s ease-in-out infinite;">
      ${heroImage}
    </div>
  </div>
</section>`
}

/**
 * centered-hero: large centered title, subtitle, CTA, full-width image below
 */
function buildCenteredHero(preset: DAPreset, project: GeneratedProject, photos: string[]): string {
  const { palette, typography } = preset
  const { businessName, sector, city, copywriting } = project
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')

  const heroImage = photoOrVisual(photos, 0, sector, project.style ?? '', '100%', '520px')

  return `
<!-- HERO — centered-hero -->
<section style="padding:100px 5% 0;text-align:center;background:radial-gradient(ellipse 900px 500px at 50% 0%,${palette.primary}12,transparent);">
  <div class="container">
    <span class="badge animate-on-scroll">✦ ${sector.charAt(0).toUpperCase()+sector.slice(1)} · ${city}</span>
    <h1 class="animate-on-scroll delay-1" style="font-family:${typography.heading};font-size:clamp(42px,6vw,78px);line-height:1.08;margin:24px 0 22px;color:${palette.text};max-width:900px;margin-left:auto;margin-right:auto;">
      ${copywriting.heroTitle.split(' ').slice(0,4).join(' ')}<br>
      <span style="background:${palette.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${copywriting.heroTitle.split(' ').slice(4).join(' ') || businessName}</span>
    </h1>
    <p class="animate-on-scroll delay-2" style="font-size:1.18rem;color:${palette.muted};line-height:1.75;max-width:600px;margin:0 auto 40px;">${copywriting.heroSubtitle}</p>
    <div class="animate-on-scroll delay-3" style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:64px;">
      <a href="#contact" class="btn-primary btn-glow">${copywriting.ctaPrimary}</a>
      <a href="#services" class="btn-secondary">${copywriting.ctaSecondary}</a>
    </div>
  </div>
  <div class="animate-on-scroll" style="border-radius:24px 24px 0 0;overflow:hidden;max-width:1140px;margin:0 auto;box-shadow:0 -8px 48px ${palette.primary}22;">
    ${heroImage}
  </div>
</section>`
}

/**
 * editorial-hero: magazine asymmetric layout — large title left, image grid right
 */
function buildEditorialHero(preset: DAPreset, project: GeneratedProject, photos: string[]): string {
  const { palette, typography } = preset
  const { businessName, sector, city, copywriting } = project
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')

  const img = (idx: number, h: string) => photoOrVisual(photos, idx, sector, project.style ?? '', '100%', h)

  return `
<!-- HERO — editorial-hero -->
<section style="padding:80px 5%;min-height:92vh;display:flex;align-items:center;background:${palette.background};">
  <div class="container" style="width:100%;display:grid;grid-template-columns:5fr 4fr;gap:48px;align-items:start;" class="hero-2col">
    <div style="padding-top:20px;">
      <div class="animate-on-scroll" style="display:flex;align-items:center;gap:12px;margin-bottom:28px;">
        <div style="height:2px;width:48px;background:${palette.gradient};"></div>
        <span style="color:${palette.muted};font-size:0.85rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">${sector} · ${city}</span>
      </div>
      <h1 class="animate-on-scroll delay-1" style="font-family:${typography.heading};font-size:clamp(48px,6.5vw,90px);line-height:0.95;letter-spacing:-0.02em;color:${palette.text};margin-bottom:28px;">
        ${businessName}<br>
        <span style="background:${palette.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-style:italic;">Studio</span>
      </h1>
      <p class="animate-on-scroll delay-2" style="font-size:1.1rem;color:${palette.muted};line-height:1.75;max-width:480px;margin-bottom:36px;">${copywriting.heroSubtitle}</p>
      <div class="animate-on-scroll delay-3" style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:48px;">
        <a href="#contact" class="btn-primary btn-glow">${copywriting.ctaPrimary}</a>
        <a href="#services" class="btn-secondary">${copywriting.ctaSecondary}</a>
      </div>
      <div class="animate-on-scroll delay-4" style="display:flex;gap:32px;">
        <div><span class="count-up" data-target="200" data-suffix="+" style="font-family:${typography.heading};font-size:2rem;font-weight:800;color:${palette.primary};">200+</span><div style="color:${palette.muted};font-size:0.82rem;">Clients</div></div>
        <div><span style="font-family:${typography.heading};font-size:2rem;font-weight:800;color:${palette.primary};">4.9★</span><div style="color:${palette.muted};font-size:0.82rem;">Google</div></div>
        <div><span style="font-family:${typography.heading};font-size:2rem;font-weight:800;color:${palette.primary};">5 ans</span><div style="color:${palette.muted};font-size:0.82rem;">Expérience</div></div>
      </div>
    </div>
    <div class="animate-on-scroll from-right" style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:240px 180px;gap:12px;">
      <div style="border-radius:16px;overflow:hidden;grid-column:1/-1;">${img(0,'240px')}</div>
      <div style="border-radius:16px;overflow:hidden;">${img(1,'180px')}</div>
      <div style="border-radius:16px;overflow:hidden;background:${palette.gradient};display:flex;align-items:center;justify-content:center;">
        <div style="text-align:center;color:white;padding:20px;"><div style="font-size:2.4rem;font-weight:800;font-family:${typography.heading};">✦</div><div style="font-size:0.85rem;font-weight:600;margin-top:8px;">Collection ${new Date().getFullYear()}</div></div>
      </div>
    </div>
  </div>
</section>`
}

/**
 * luxury-fullscreen: full-screen background image, overlay, centered premium title
 */
function buildLuxuryFullscreen(preset: DAPreset, project: GeneratedProject, photos: string[]): string {
  const { palette, typography } = preset
  const { businessName, sector, city, copywriting } = project

  const bgStyle = photos[0]
    ? `background:url('${photos[0]}') center/cover no-repeat`
    : sectorVisual(sector, 'hero').replace('display:flex;align-items:center;justify-content:center;', '').replace(/;$/, '')

  return `
<!-- HERO — luxury-fullscreen -->
<section style="min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;${bgStyle};text-align:center;">
  <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,0.62) 0%,rgba(0,0,0,0.35) 100%);"></div>
  <div style="position:relative;z-index:2;padding:40px 5%;">
    <div class="animate-on-scroll" style="display:inline-block;border:1px solid rgba(255,255,255,0.3);padding:6px 20px;border-radius:30px;color:rgba(255,255,255,0.75);font-size:0.82rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:32px;">${sector} · ${city}</div>
    <h1 class="animate-on-scroll delay-1" style="font-family:${typography.heading};font-size:clamp(48px,8vw,110px);line-height:0.92;letter-spacing:-0.02em;color:white;margin-bottom:24px;">
      ${businessName}
    </h1>
    <p class="animate-on-scroll delay-2" style="font-size:1.2rem;color:rgba(255,255,255,0.75);max-width:600px;margin:0 auto 44px;line-height:1.7;">${copywriting.heroSubtitle}</p>
    <div class="animate-on-scroll delay-3" style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
      <a href="#contact" class="btn-primary btn-glow" style="background:white;color:${palette.primary};">${copywriting.ctaPrimary}</a>
      <a href="#services" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:white;padding:14px 28px;border-radius:12px;font-weight:600;border:1.5px solid rgba(255,255,255,0.45);cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='white'" onmouseout="this.style.borderColor='rgba(255,255,255,0.45)'">${copywriting.ctaSecondary}</a>
    </div>
    <div class="animate-on-scroll delay-4" style="display:flex;gap:40px;justify-content:center;margin-top:64px;padding-top:40px;border-top:1px solid rgba(255,255,255,0.18);flex-wrap:wrap;">
      <div style="color:white;"><div style="font-family:${typography.heading};font-size:2rem;font-weight:800;" class="count-up" data-target="200" data-suffix="+">200+</div><div style="font-size:0.85rem;opacity:0.65;">Clients</div></div>
      <div style="color:white;"><div style="font-family:${typography.heading};font-size:2rem;font-weight:800;">4.9★</div><div style="font-size:0.85rem;opacity:0.65;">Note Google</div></div>
      <div style="color:white;"><div style="font-family:${typography.heading};font-size:2rem;font-weight:800;">5 ans</div><div style="font-size:0.85rem;opacity:0.65;">Expérience</div></div>
    </div>
  </div>
  <a href="#services" style="position:absolute;bottom:32px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.5);animation:float 2s ease-in-out infinite;font-size:1.6rem;cursor:pointer;">↓</a>
</section>`
}

/**
 * ecommerce-focus: product grid hero, benefits row, CTA
 */
function buildEcommerceFocus(preset: DAPreset, project: GeneratedProject, photos: string[]): string {
  const { palette, typography } = preset
  const { businessName, sector, city, copywriting, services } = project
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')

  return `
<!-- HERO — ecommerce-focus -->
<section style="padding:60px 5% 80px;background:${palette.background};">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;margin-bottom:72px;" class="hero-2col">
      <div>
        <span class="badge animate-on-scroll">${sector} · ${city}</span>
        <h1 class="animate-on-scroll delay-1" style="font-family:${typography.heading};font-size:clamp(34px,4.5vw,58px);line-height:1.1;margin:18px 0 20px;color:${palette.text};">${copywriting.heroTitle}</h1>
        <p class="animate-on-scroll delay-2" style="font-size:1.1rem;color:${palette.muted};line-height:1.75;margin-bottom:32px;">${copywriting.heroSubtitle}</p>
        <div class="animate-on-scroll delay-3" style="display:flex;gap:14px;flex-wrap:wrap;">
          <a href="#services" class="btn-primary btn-glow">${copywriting.ctaPrimary}</a>
          <a href="#contact" class="btn-secondary">${copywriting.ctaSecondary}</a>
        </div>
      </div>
      <div class="animate-on-scroll from-right" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        ${services.slice(0,4).map((s, i) => `
        <div class="card-3d" style="background:${isDark ? '#1a1a24' : 'white'};border-radius:18px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,0.08);">
          <div style="height:140px;overflow:hidden;position:relative;">${galleryPhotoOrVisual(photos, i, sector)}</div>
          <div style="padding:14px;">
            <div style="font-weight:700;color:${palette.text};font-size:0.9rem;margin-bottom:6px;">${s}</div>
            <div style="font-weight:800;color:${palette.primary};">${39 + i * 20}€</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <!-- Benefits bar -->
    <div class="animate-on-scroll" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:20px;">
      ${['🚚 Livraison rapide','✅ Retours gratuits','🔒 Paiement sécurisé','⭐ 4.9/5 avis clients'].map((b) => `
      <div style="background:${isDark ? '#1a1a24' : 'white'};border-radius:14px;padding:18px 20px;display:flex;align-items:center;gap:10px;font-weight:600;color:${palette.text};font-size:0.9rem;border:1px solid ${palette.primary}18;">
        ${b}
      </div>`).join('')}
    </div>
  </div>
</section>`
}

/**
 * local-conversion: fast CTA bar at top, social proof strip, service cards, visible form
 */
function buildLocalConversion(preset: DAPreset, project: GeneratedProject, photos: string[]): string {
  const { palette, typography } = preset
  const { businessName, sector, city, copywriting, services } = project
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')

  const heroImage = photoOrVisual(photos, 0, sector, project.style ?? '')

  return `
<!-- HERO — local-conversion -->
<!-- Urgency / social proof bar -->
<div style="background:${palette.gradient};color:white;text-align:center;padding:10px 5%;font-size:0.88rem;font-weight:600;">
  ⭐ 4.9/5 — Plus de 200 clients satisfaits à ${city} · Devis gratuit sous 2h
</div>
<section style="padding:60px 5% 70px;background:${palette.background};">
  <div class="container" style="display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center;" class="hero-2col">
    <div>
      <h1 class="animate-on-scroll" style="font-family:${typography.heading};font-size:clamp(32px,4.5vw,56px);line-height:1.12;color:${palette.text};margin-bottom:18px;">
        ${copywriting.heroTitle}
      </h1>
      <p class="animate-on-scroll delay-1" style="font-size:1.08rem;color:${palette.muted};line-height:1.75;margin-bottom:28px;">${copywriting.heroSubtitle}</p>
      <!-- Quick contact bar -->
      <div class="animate-on-scroll delay-2" style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px;">
        <a href="#contact" class="btn-primary btn-glow" style="animation:pulse-glow 2.5s ease-in-out infinite;">${copywriting.ctaPrimary}</a>
        <a href="tel:0600000000" class="btn-secondary">📞 Appeler maintenant</a>
      </div>
      <!-- Trust badges -->
      <div class="animate-on-scroll delay-3" style="display:flex;gap:16px;flex-wrap:wrap;">
        ${['✓ Devis gratuit','✓ Intervention rapide','✓ Garantie travaux'].map((b) => `<span style="background:${palette.primary}14;color:${palette.primary};padding:6px 14px;border-radius:20px;font-size:0.82rem;font-weight:600;">${b}</span>`).join('')}
      </div>
    </div>
    <div class="animate-on-scroll from-right" style="border-radius:20px;overflow:hidden;box-shadow:0 24px 64px ${palette.primary}28;aspect-ratio:4/3;">
      ${heroImage}
    </div>
  </div>
</section>`
}

/**
 * event-portfolio: large visuals, portfolio grid, quote CTA
 */
function buildEventPortfolio(preset: DAPreset, project: GeneratedProject, photos: string[]): string {
  const { palette, typography } = preset
  const { businessName, sector, city, copywriting } = project
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')

  const mainImage = photoOrVisual(photos, 0, sector, project.style ?? '')
  const gridImages = [1,2,3].map((i) => galleryPhotoOrVisual(photos, i, sector))

  return `
<!-- HERO — event-portfolio -->
<section style="min-height:95vh;display:grid;grid-template-columns:1fr 1fr;background:${palette.background};" class="hero-2col">
  <!-- Left: full-height image -->
  <div style="position:relative;overflow:hidden;min-height:500px;">
    ${mainImage}
    <div style="position:absolute;inset:0;background:linear-gradient(to right,${palette.background}00,${palette.background}00);"></div>
    <div style="position:absolute;bottom:40px;left:40px;right:40px;">
      <div style="display:inline-block;background:${palette.primary};color:white;padding:6px 16px;border-radius:20px;font-size:0.82rem;font-weight:600;margin-bottom:14px;">${sector} · ${city}</div>
    </div>
  </div>
  <!-- Right: content -->
  <div style="padding:80px 5% 60px;display:flex;flex-direction:column;justify-content:center;background:${isDark ? '#18121e' : palette.surface};">
    <h1 class="animate-on-scroll" style="font-family:${typography.heading};font-size:clamp(36px,4vw,60px);line-height:1.1;color:${palette.text};margin-bottom:20px;">
      ${copywriting.heroTitle.split(' ').slice(0,3).join(' ')}<br>
      <span style="background:${palette.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${copywriting.heroTitle.split(' ').slice(3).join(' ')}</span>
    </h1>
    <p class="animate-on-scroll delay-1" style="font-size:1.05rem;color:${palette.muted};line-height:1.75;margin-bottom:36px;">${copywriting.heroSubtitle}</p>
    <div class="animate-on-scroll delay-2" style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:44px;">
      <a href="#contact" class="btn-primary btn-glow">${copywriting.ctaPrimary}</a>
      <a href="#galerie" class="btn-secondary">${copywriting.ctaSecondary}</a>
    </div>
    <!-- Mini portfolio grid -->
    <div class="animate-on-scroll delay-3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;border-radius:14px;overflow:hidden;">
      ${gridImages.map((img, i) => `<div style="aspect-ratio:1;overflow:hidden;">${img}</div>`).join('')}
    </div>
    <div class="animate-on-scroll delay-4" style="display:flex;gap:28px;margin-top:28px;padding-top:24px;border-top:1px solid ${isDark ? '#ffffff14' : '#0000000f'};">
      <div><div style="font-family:${typography.heading};font-size:1.6rem;font-weight:800;color:${palette.primary};" class="count-up" data-target="150" data-suffix="+">150+</div><div style="color:${palette.muted};font-size:0.82rem;">Événements</div></div>
      <div><div style="font-family:${typography.heading};font-size:1.6rem;font-weight:800;color:${palette.primary};">4.9★</div><div style="color:${palette.muted};font-size:0.82rem;">Avis Google</div></div>
      <div><div style="font-family:${typography.heading};font-size:1.6rem;font-weight:800;color:${palette.primary};">8 ans</div><div style="color:${palette.muted};font-size:0.82rem;">D'expertise</div></div>
    </div>
  </div>
</section>`
}

/**
 * app-landing: hero with mockup/visual + feature cards + pricing strip
 */
function buildAppLanding(preset: DAPreset, project: GeneratedProject, photos: string[]): string {
  const { palette, typography } = preset
  const { businessName, sector, city, copywriting, services } = project
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')

  const heroImage = photoOrVisual(photos, 0, sector, project.style ?? '')
  const featureIcons = ['⚡','🎯','🔥','💡','📈','🛡️']
  return `
<!-- HERO — app-landing -->
<section style="padding:90px 5% 70px;background:radial-gradient(ellipse 800px 600px at 50% -100px,${palette.primary}18,transparent),${palette.background};">
  <div class="container" style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;" class="hero-2col">
    <div>
      <div class="animate-on-scroll" style="display:inline-flex;align-items:center;gap:8px;background:${palette.primary}18;color:${palette.primary};padding:7px 16px;border-radius:20px;font-size:0.82rem;font-weight:700;margin-bottom:24px;">
        <span style="width:7px;height:7px;background:${palette.primary};border-radius:50%;animation:pulse-glow 1.5s infinite;"></span>
        ${sector} — ${city}
      </div>
      <h1 class="animate-on-scroll delay-1" style="font-family:${typography.heading};font-size:clamp(36px,5vw,64px);line-height:1.1;color:${palette.text};margin-bottom:20px;">
        ${copywriting.heroTitle.split(' ').slice(0,3).join(' ')}<br>
        <span style="background:${palette.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${copywriting.heroTitle.split(' ').slice(3).join(' ')}</span>
      </h1>
      <p class="animate-on-scroll delay-2" style="font-size:1.1rem;color:${palette.muted};line-height:1.75;margin-bottom:36px;">${copywriting.heroSubtitle}</p>
      <div class="animate-on-scroll delay-3" style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:44px;">
        <a href="#contact" class="btn-primary btn-glow">${copywriting.ctaPrimary}</a>
        <a href="#services" class="btn-secondary">${copywriting.ctaSecondary}</a>
      </div>
      <div class="animate-on-scroll delay-4" style="display:flex;gap:28px;padding-top:28px;border-top:1px solid ${isDark ? '#ffffff14' : '#0000000f'};flex-wrap:wrap;">
        <div><div class="count-up" data-target="200" data-suffix="+" style="font-family:${typography.heading};font-size:1.8rem;font-weight:800;color:${palette.primary};">200+</div><div style="color:${palette.muted};font-size:0.82rem;">Clients</div></div>
        <div><div style="font-family:${typography.heading};font-size:1.8rem;font-weight:800;color:${palette.primary};">4.9★</div><div style="color:${palette.muted};font-size:0.82rem;">Note</div></div>
        <div><div style="font-family:${typography.heading};font-size:1.8rem;font-weight:800;color:${palette.primary};">5 ans</div><div style="color:${palette.muted};font-size:0.82rem;">Expérience</div></div>
      </div>
    </div>
    <div class="animate-on-scroll from-right" style="aspect-ratio:4/3;animation:float 4s ease-in-out infinite;">
      ${heroImage}
    </div>
  </div>
</section>
<!-- Feature cards -->
<section style="padding:60px 5%;background:${isDark ? '#111118' : palette.surface};">
  <div class="container">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;">
      ${services.slice(0,6).map((s, i) => `
      <div class="card-3d animate-on-scroll delay-${(i%4)+1}" style="background:${isDark ? '#1a1a24' : 'white'};border-radius:16px;padding:26px;border:1px solid ${palette.primary}18;">
        <div style="font-size:1.8rem;margin-bottom:12px;">${featureIcons[i % 6]}</div>
        <h3 style="font-family:${typography.heading};color:${palette.text};margin-bottom:8px;font-size:1rem;">${s}</h3>
        <p style="color:${palette.muted};font-size:0.87rem;line-height:1.6;">Solution professionnelle adaptée à vos besoins spécifiques.</p>
      </div>`).join('')}
    </div>
  </div>
</section>`
}

// ─── Main HTML generator ──────────────────────────────────────────────────────

function buildVideoSection(videos: string[], preset: DAPreset, businessName: string): string {
  if (videos.length === 0) return ''
  const { palette, typography } = preset
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')
  return `
<section style="padding:80px 5%;background:${isDark ? '#111118' : palette.surface};">
  <div class="container">
    <div style="text-align:center;margin-bottom:40px;" class="animate-on-scroll">
      <span class="badge">En vidéo</span>
      <h2 class="section-title" style="margin-top:16px;">${businessName} en action</h2>
    </div>
    <div style="display:grid;grid-template-columns:${videos.length > 1 ? 'repeat(auto-fit,minmax(300px,1fr))' : '1fr'};gap:24px;max-width:${videos.length === 1 ? '860px' : '100%'};margin:0 auto;">
      ${videos.map((v, i) => `
      <div class="animate-on-scroll delay-${i+1}" style="border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.15);">
        <video controls muted playsinline style="width:100%;display:block;background:#000;" preload="metadata">
          <source src="${v}">
        </video>
      </div>`).join('')}
    </div>
  </div>
</section>`
}

export function generateHTMLSite(project: GeneratedProject, photos: string[], videos: string[] = []): string {
  const { designSystem, copywriting, seo, sector, businessName, city, services, automationNeeds, ecommerceNeeds } = project

  // Pick the DA preset based on sector + style
  const preset = selectDAPreset(sector, project.style ?? '', '')
  const { palette, typography } = preset
  const isDark = palette.background.startsWith('#0') || palette.background.startsWith('#1')

  // Build hero by layout type
  let heroSection = ''
  switch (preset.layout) {
    case 'split-hero':        heroSection = buildSplitHero(preset, project, photos); break
    case 'centered-hero':     heroSection = buildCenteredHero(preset, project, photos); break
    case 'editorial-hero':    heroSection = buildEditorialHero(preset, project, photos); break
    case 'luxury-fullscreen': heroSection = buildLuxuryFullscreen(preset, project, photos); break
    case 'ecommerce-focus':   heroSection = buildEcommerceFocus(preset, project, photos); break
    case 'local-conversion':  heroSection = buildLocalConversion(preset, project, photos); break
    case 'event-portfolio':   heroSection = buildEventPortfolio(preset, project, photos); break
    case 'app-landing':       heroSection = buildAppLanding(preset, project, photos); break
    default:                  heroSection = buildSplitHero(preset, project, photos)
  }

  const automationSection = automationNeeds.length > 0 ? `
<section style="padding:90px 5%;background:${isDark ? '#111118' : '#f8f8ff'};">
  <div class="container">
    <div style="text-align:center;margin-bottom:52px;" class="animate-on-scroll">
      <span class="badge">IA Powered</span>
      <h2 class="section-title" style="margin-top:16px;">Automatisez votre croissance</h2>
      <p class="section-sub">Des systèmes intelligents qui travaillent pour vous, même quand vous dormez.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;">
      ${automationNeeds.map((a, i) => `
      <div class="card-3d animate-on-scroll delay-${i+1}" style="background:${isDark ? '#1a1a24' : 'white'};border:1px solid ${palette.primary}28;border-radius:18px;padding:30px;">
        <div style="font-size:2rem;margin-bottom:12px;">🤖</div>
        <span style="background:${palette.primary}20;color:${palette.primary};padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:600;">Nouveau</span>
        <h3 style="font-family:${typography.heading};color:${palette.text};margin:14px 0 8px;">${a}</h3>
        <p style="color:${palette.muted};font-size:0.9rem;line-height:1.6;">Système automatisé qui génère des résultats sans intervention manuelle.</p>
      </div>`).join('')}
    </div>
  </div>
</section>` : ''

  const ecommerceSection = ecommerceNeeds.length > 0 ? `
<section style="padding:90px 5%;background:${isDark ? '#0a0a12' : '#fffaf3'};">
  <div class="container">
    <div style="text-align:center;margin-bottom:52px;" class="animate-on-scroll">
      <span class="badge">Boutique</span>
      <h2 class="section-title" style="margin-top:16px;">Notre boutique</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;">
      ${['Produit Premium A','Produit Exclusif B','Pack Découverte C','Offre Spéciale D'].map((p, i) => `
      <div class="card-3d animate-on-scroll delay-${i+1}" style="background:${isDark ? '#1a1a24' : 'white'};border-radius:18px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,0.07);">
        <div style="height:180px;background:${palette.gradient};opacity:0.85;display:flex;align-items:center;justify-content:center;font-size:3.5rem;">${['🛍️','✨','📦','🎁'][i]}</div>
        <div style="padding:18px;">
          <span style="background:#22c55e20;color:#22c55e;font-size:0.75rem;padding:2px 8px;border-radius:20px;font-weight:600;">En stock</span>
          <h3 style="font-family:${typography.heading};color:${palette.text};margin:10px 0 6px;font-size:1rem;">${p}</h3>
          <p style="color:${palette.muted};font-size:0.85rem;margin-bottom:14px;line-height:1.5;">Description courte avec ses avantages clés.</p>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-weight:800;color:${palette.primary};font-size:1.15rem;">${29 + i * 10}€</span>
            <button class="btn-primary btn-glow" style="padding:8px 16px;font-size:0.85rem;border-radius:8px;">Ajouter</button>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>` : ''

  // Problem section
  const problemSection = `
<section style="padding:90px 5%;background:${isDark ? '#111118' : palette.surfaceAlt ?? '#fff8ee'};">
  <div class="container">
    <div style="text-align:center;margin-bottom:52px;" class="animate-on-scroll">
      <span class="badge">Le défi</span>
      <h2 class="section-title" style="margin-top:16px;">Vous reconnaissez-vous ?</h2>
      <p class="section-sub">Ces défis freinent la croissance de nombreux professionnels du secteur.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;">
      ${getPainPoints(sector).map((p, i) => `
      <div class="animate-on-scroll delay-${i+1}" style="background:${isDark ? '#1a1a24' : 'white'};border:1px solid #ff5a1f22;border-radius:18px;padding:30px;border-left:4px solid #ef4444;">
        <div style="font-size:2rem;margin-bottom:14px;">❌</div>
        <p style="color:${palette.text};font-weight:500;line-height:1.65;">${p}</p>
      </div>`).join('')}
    </div>
  </div>
</section>`

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${seo.title}</title>
  <meta name="description" content="${seo.description}">
  <meta name="keywords" content="${seo.keywords.join(', ')}">
  <meta property="og:title" content="${seo.title}">
  <meta property="og:description" content="${seo.description}">
  <meta name="theme-color" content="${palette.primary}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="${typography.googleFontUrl}" rel="stylesheet">
  <style>
    ${getSharedCSS(preset)}
  </style>
</head>
<body>

${buildHeader(preset, businessName, copywriting.ctaPrimary, services)}

${heroSection}

${buildVideoSection(videos, preset, businessName)}

${problemSection}

${buildServicesSection(preset, services)}

${automationSection}
${ecommerceSection}

${buildGallerySection(preset, photos, sector)}

${buildTestimonialsSection(preset, copywriting.testimonials)}

${buildFAQSection(preset, copywriting.faq)}

${buildContactSection(preset, copywriting.ctaPrimary, services)}

${buildFooter(preset, businessName, city, sector, services)}

${automationNeeds.includes('WhatsApp Business') ? `<a href="https://wa.me/33600000000" style="position:fixed;bottom:24px;right:24px;width:58px;height:58px;background:#25d366;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.6rem;box-shadow:0 4px 16px rgba(37,211,102,0.45);z-index:9999;transition:all 0.2s;text-decoration:none;" onmouseover="this.style.transform='scale(1.12)'" onmouseout="this.style.transform=''">💬</a>` : ''}

${(() => {
  const planId = typeof window !== 'undefined' ? getCurrentPlanId() : 'free'
  return generateChatbotHtml(sector, businessName, city, services, planId, palette.primary)
})()}

<script>
  ${getSharedJS(palette)}
</script>
</body>
</html>`
}

// ─── Main generator ───────────────────────────────────────────────────────────

export function generateProject(prompt: string, photos: string[]): GeneratedProject {
  const trimmedPrompt = prompt.trim().slice(0, 500)
  const sector = detectSector(trimmedPrompt)
  const style = detectStyle(trimmedPrompt)
  const goal = detectGoal(trimmedPrompt)
  const city = detectCity(trimmedPrompt)
  const businessName = detectBusinessName(trimmedPrompt, sector)
  const automationNeeds = detectAutomations(trimmedPrompt)
  const ecommerceNeeds = detectEcommerce(trimmedPrompt)
  const designSystem = getDesignSystem(sector, style)
  const services = getServices(sector)
  const painPoints = getPainPoints(sector)
  const copywritingBase = generateCopywriting(businessName, sector, city, style, goal)
  const faq = getFAQ(sector, businessName)
  const testimonials = getTestimonials(sector)

  const sectorKeywords: Record<string, string[]> = {
    beauté: ['salon beauté', 'coiffure', 'esthétique', 'bien-être', city.toLowerCase()],
    restaurant: ['restaurant', 'gastronomie', 'menu', 'réservation', city.toLowerCase()],
    général: ['services', 'professionnel', 'qualité', city.toLowerCase()],
  }
  const keywords = sectorKeywords[sector] ?? sectorKeywords['général'] ?? ['services', city.toLowerCase()]

  const pages: GeneratedPage[] = [
    { name: 'Accueil', slug: '/', sections: ['hero', 'probleme', 'solution', 'services', 'galerie', 'avis', 'faq', 'contact'] },
    { name: 'Services', slug: '/services', sections: ['services', 'tarifs'] },
    { name: 'Contact', slug: '/contact', sections: ['contact', 'map'] },
  ]

  const sections: GeneratedSection[] = [
    { id: 'hero', type: 'hero', title: 'Hero principal', content: copywritingBase.heroTitle },
    { id: 'probleme', type: 'problem', title: 'Section problème', content: 'Identification des points de douleur' },
    { id: 'solution', type: 'solution', title: 'Section solution', content: 'Présentation de la valeur' },
    { id: 'services', type: 'services', title: 'Nos services', content: services.join(', ') },
    { id: 'galerie', type: 'gallery', title: 'Galerie photos', content: `${photos.length} photos intégrées` },
    { id: 'avis', type: 'testimonials', title: 'Avis clients', content: '3 témoignages' },
    { id: 'faq', type: 'faq', title: 'FAQ accordéon', content: '6 questions' },
    { id: 'contact', type: 'form', title: 'Formulaire de contact', content: `Objectif : ${goal}` },
  ]

  const projectId = `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  const project: GeneratedProject = {
    id: projectId,
    projectName: `Site ${businessName} — ${city}`,
    businessName,
    city,
    sector,
    style,
    goal,
    tone: style === 'luxe' ? 'premium' : style === 'chaleureux' ? 'convivial' : 'professionnel',
    audience: sector === 'coaching' ? 'Entrepreneurs et professionnels' : `Clients ${sector} à ${city}`,
    valueProposition: `${businessName} offre une expérience ${sector} d'exception à ${city} avec un service personnalisé et des résultats garantis.`,
    painPoints,
    services,
    products: ecommerceNeeds.length > 0 ? ['Produit Premium A', 'Produit Exclusif B', 'Pack Découverte C', 'Offre Spéciale D'] : [],
    automationNeeds,
    ecommerceNeeds,
    designSystem,
    pages,
    sections,
    seo: {
      title: `${businessName} — Expert ${sector} à ${city}`,
      description: `${businessName}, votre expert ${sector} à ${city}. ${copywritingBase.heroSubtitle.slice(0, 120)}...`,
      keywords,
    },
    copywriting: {
      heroTitle: copywritingBase.heroTitle,
      heroSubtitle: copywritingBase.heroSubtitle,
      ctaPrimary: copywritingBase.ctaPrimary,
      ctaSecondary: copywritingBase.ctaSecondary,
      faq,
      testimonials,
      clientMessage: generateClientMessage({ id: projectId, businessName, city, sector, automationNeeds } as GeneratedProject),
    },
    files: [],
    html: '',
    photos,
    createdAt: new Date().toISOString(),
    status: 'draft',
  }

  project.html = generateHTMLSite(project, photos)

  const htmlSize = new Blob([project.html]).size
  const humanSize = htmlSize > 1024 * 1024
    ? `${(htmlSize / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(htmlSize / 1024)} KB`

  project.files = [
    { name: 'index.html', type: 'html', content: project.html, size: humanSize },
    { name: 'styles.css', type: 'css', content: '/* Styles extraits du HTML inline */', size: '< 1 KB' },
    { name: 'script.js', type: 'js', content: '// Scripts extraits du HTML inline', size: '< 1 KB' },
    {
      name: 'config.json', type: 'json',
      content: JSON.stringify({ id: project.id, businessName, sector, city, style, goal, createdAt: project.createdAt }, null, 2),
      size: '< 1 KB',
    },
  ]

  project.automationSales = generateAutomationSales(sector, businessName, city, goal)
  project.status = 'generated'
  return project
}

export function refineProject(project: GeneratedProject, instruction: string): GeneratedProject {
  const i = instruction.toLowerCase()
  const updated = { ...project, designSystem: { ...project.designSystem, palette: { ...project.designSystem.palette } } }

  if (/luxe|premium|doré|haut.de.gamme/.test(i)) {
    updated.designSystem.palette.background = '#0d0d0d'
    updated.designSystem.palette.primary = '#d4af37'
    updated.designSystem.palette.text = '#ffffff'
    updated.designSystem.mood = 'luxe'
    updated.style = 'luxe'
  } else if (/coloré|vibrant|dynamique/.test(i)) {
    updated.designSystem.palette.primary = '#ff5a1f'
    updated.designSystem.palette.secondary = '#ff4fb8'
    updated.designSystem.mood = 'coloré'
  } else if (/bleu/.test(i)) {
    updated.designSystem.palette.primary = '#4f8cff'
    updated.designSystem.palette.secondary = '#8b5cf6'
  } else if (/vert|nature|bio/.test(i)) {
    updated.designSystem.palette.primary = '#55c47a'
    updated.designSystem.palette.secondary = '#059669'
  } else if (/rose|féminin/.test(i)) {
    updated.designSystem.palette.primary = '#ff4fb8'
    updated.designSystem.palette.secondary = '#8b5cf6'
  }

  if (/whatsapp/.test(i) && !updated.automationNeeds.includes('WhatsApp Business')) {
    updated.automationNeeds = [...updated.automationNeeds, 'WhatsApp Business']
  }
  if (/devis/.test(i) && !updated.automationNeeds.includes('Devis automatique')) {
    updated.automationNeeds = [...updated.automationNeeds, 'Devis automatique']
    updated.goal = 'devis'
  }
  if (/ecommerce|boutique|shop/.test(i) && updated.ecommerceNeeds.length === 0) {
    updated.ecommerceNeeds = ['Catalogue produits', 'Panier d\'achat', 'Paiement sécurisé']
  }

  if (/vendeur|conversion|persuasif/.test(i)) {
    updated.copywriting = {
      ...updated.copywriting,
      ctaPrimary: 'Réserver ma place maintenant →',
      heroSubtitle: `Ne laissez pas vos concurrents prendre l'avance. ${updated.copywriting.heroSubtitle}`,
    }
  }

  updated.html = generateHTMLSite(updated, updated.photos)
  updated.status = 'generated'
  return updated
}

export function generateClientMessage(project: GeneratedProject): string {
  const { businessName, city, sector, automationNeeds } = project
  const autoList = automationNeeds.length > 0 ? `avec ${automationNeeds.slice(0, 2).join(' et ')}` : ''

  return `Bonjour,

Je viens de créer une maquette complète pour ${businessName} à ${city} — secteur ${sector}.

Le site inclut :
✓ Design premium adapté à votre secteur
✓ Textes copywriting persuasifs
✓ Formulaire ${project.goal === 'devis' ? 'de devis automatique' : project.goal === 'réservation' ? 'de réservation' : 'de contact intelligent'}
${automationNeeds.length > 0 ? `✓ Automatisations : ${automationNeeds.join(', ')}\n` : ''}✓ SEO optimisé pour ${city}
✓ Responsive mobile

La maquette est prête à livrer ${autoList}. Je peux avoir le site en ligne sous 48h.

Seriez-vous disponible pour un appel de 15 minutes cette semaine ?

Cordialement`
}
