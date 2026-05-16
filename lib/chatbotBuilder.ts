import type { PlanId } from './plans'

export interface ChatbotConfig {
  enabled: boolean
  level: 'none' | 'simple' | 'advanced'
  title: string
  welcomeMessage: string
  suggestedQuestions: string[]
  answers: Array<{ trigger: string; response: string }>
  leadCaptureFields: string[]
  ctaLabel: string
  whatsappMessage: string
  leadScoringEnabled: boolean
  crmEnabled: boolean
  primaryColor: string
}

// ─── Sector data ─────────────────────────────────────────────────────────────

interface SectorData {
  questions: string[]
  answers: Array<{ trigger: string; response: string }>
  welcomeMessage: string
  ctaLabel: string
}

function getSectorData(sector: string, businessName: string, city: string, services: string[]): SectorData {
  const serviceList = services.length > 0 ? services.join(', ') : 'nos services'
  const s = sector.toLowerCase()

  if (s.includes('beauté') || s.includes('coiffure') || s.includes('esthétique') || s.includes('spa') || s.includes('salon')) {
    return {
      welcomeMessage: `Bonjour ! Bienvenue chez ${businessName} à ${city}. Comment puis-je vous aider ? 💆‍♀️`,
      questions: [
        'Quels sont vos services ?',
        'Comment prendre rendez-vous ?',
        'Quels sont vos tarifs ?',
        'Êtes-vous disponible ce week-end ?',
        'Où vous trouver ?',
      ],
      answers: [
        {
          trigger: 'service',
          response: `Nous proposons : ${serviceList}. Chaque prestation est réalisée avec soin pour vous offrir le meilleur résultat.`,
        },
        {
          trigger: 'rendez-vous',
          response: `Pour prendre rendez-vous chez ${businessName}, appelez-nous ou envoyez-nous un message. Nous vous trouverons un créneau rapidement !`,
        },
        {
          trigger: 'tarif',
          response: `Nos tarifs varient selon les prestations. Contactez-nous pour un devis personnalisé — la première consultation est gratuite !`,
        },
        {
          trigger: 'week-end',
          response: `Oui, nous sommes disponibles le samedi. Prenez rendez-vous dès maintenant pour garantir votre créneau !`,
        },
        {
          trigger: 'adresse',
          response: `Nous sommes situés à ${city}. Contactez-nous pour l'adresse exacte et les horaires d'ouverture.`,
        },
      ],
      ctaLabel: 'Prendre rendez-vous',
    }
  }

  if (s.includes('restaurant') || s.includes('traiteur') || s.includes('café') || s.includes('brasserie') || s.includes('pizz')) {
    return {
      welcomeMessage: `Bienvenue chez ${businessName} ! Envie de réserver une table ou de commander ? Je suis là pour vous aider. 🍽️`,
      questions: [
        'Quels sont vos horaires ?',
        'Comment réserver une table ?',
        'Proposez-vous des menus ?',
        'Livrez-vous à domicile ?',
        'Avez-vous une carte végétarienne ?',
      ],
      answers: [
        {
          trigger: 'horaire',
          response: `${businessName} est ouvert tous les jours. Contactez-nous pour les horaires détaillés et les fermetures exceptionnelles.`,
        },
        {
          trigger: 'réserver',
          response: `Pour réserver votre table chez ${businessName} à ${city}, envoyez-nous un message avec la date, l'heure et le nombre de personnes.`,
        },
        {
          trigger: 'menu',
          response: `Nous proposons des menus adaptés à toutes les occasions : ${serviceList}. Demandez notre carte complète !`,
        },
        {
          trigger: 'livraison',
          response: `Oui, nous livrons dans ${city} et les alentours. Passez votre commande directement via ce chat ou par téléphone !`,
        },
        {
          trigger: 'végétarien',
          response: `Absolument ! Nous avons des options végétariennes et pouvons adapter nos plats à vos préférences alimentaires. N'hésitez pas à nous préciser vos besoins.`,
        },
      ],
      ctaLabel: 'Réserver une table',
    }
  }

  if (s.includes('événement') || s.includes('mariage') || s.includes('décoration') || s.includes('wedding') || s.includes('reception')) {
    return {
      welcomeMessage: `Bonjour, bienvenue chez ${businessName} ! Votre événement mérite d'être inoubliable. Comment puis-je vous aider ? 🎉`,
      questions: [
        'Quels types d\'événements organisez-vous ?',
        'Quels sont vos tarifs ?',
        'Êtes-vous disponible à ma date ?',
        'Proposez-vous des forfaits clé en main ?',
        'Comment se passe la première consultation ?',
      ],
      answers: [
        {
          trigger: 'type',
          response: `Nous organisons : ${serviceList}. Chaque événement est unique et nous l'abordons avec la même passion !`,
        },
        {
          trigger: 'tarif',
          response: `Nos tarifs sont personnalisés selon vos besoins. Obtenez un devis gratuit en nous décrivant votre projet !`,
        },
        {
          trigger: 'disponible',
          response: `Les dates se réservent vite ! Indiquez-nous votre date et nous vérifions notre disponibilité immédiatement.`,
        },
        {
          trigger: 'forfait',
          response: `Oui, nous proposons des forfaits tout compris pour simplifier l'organisation de votre événement. Demandez notre brochure !`,
        },
        {
          trigger: 'consultation',
          response: `La première rencontre est gratuite et sans engagement. Nous y découvrons votre vision et vous présentons nos idées !`,
        },
      ],
      ctaLabel: 'Obtenir un devis gratuit',
    }
  }

  if (s.includes('auto') || s.includes('garage') || s.includes('mécanique') || s.includes('voiture') || s.includes('carrosserie')) {
    return {
      welcomeMessage: `Bonjour, bienvenue chez ${businessName} à ${city} ! Besoin d'un devis ou d'un rendez-vous ? Je vous aide. 🚗`,
      questions: [
        'Quelles réparations proposez-vous ?',
        'Comment obtenir un devis ?',
        'Prenez-vous tous les véhicules ?',
        'Avez-vous des véhicules de remplacement ?',
        'Quels sont vos délais ?',
      ],
      answers: [
        {
          trigger: 'réparation',
          response: `Nous réalisons : ${serviceList}. Notre équipe est formée sur toutes les marques et modèles.`,
        },
        {
          trigger: 'devis',
          response: `Obtenez votre devis gratuit en quelques minutes ! Décrivez votre problème ou apportez votre véhicule pour un diagnostic.`,
        },
        {
          trigger: 'véhicule',
          response: `Nous intervenons sur toutes les marques, véhicules légers et utilitaires. Aucun problème ne nous résiste !`,
        },
        {
          trigger: 'remplacement',
          response: `Oui, nous proposons des véhicules de prêt pendant l'immobilisation de votre voiture selon disponibilité.`,
        },
        {
          trigger: 'délai',
          response: `Les délais varient selon l'intervention. Nous nous engageons à vous tenir informé à chaque étape de la réparation.`,
        },
      ],
      ctaLabel: 'Demander un devis',
    }
  }

  if (s.includes('e-commerce') || s.includes('boutique') || s.includes('vente en ligne') || s.includes('shop') || s.includes('commerce')) {
    return {
      welcomeMessage: `Bienvenue sur ${businessName} ! Je suis votre assistant shopping. Comment puis-je vous aider ? 🛍️`,
      questions: [
        'Comment passer une commande ?',
        'Quels sont les délais de livraison ?',
        'Puis-je retourner un article ?',
        'Avez-vous des promotions ?',
        'Comment contacter le service client ?',
      ],
      answers: [
        {
          trigger: 'commande',
          response: `Commander est simple : choisissez vos articles, ajoutez-les au panier et finalisez votre achat en quelques clics. Besoin d'aide ?`,
        },
        {
          trigger: 'livraison',
          response: `Nous livrons en 2 à 5 jours ouvrés en France métropolitaine. La livraison est offerte à partir d'un certain montant !`,
        },
        {
          trigger: 'retour',
          response: `Retours acceptés sous 30 jours. Les articles doivent être dans leur état d'origine. Remboursement rapide garanti !`,
        },
        {
          trigger: 'promotion',
          response: `Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives et codes promo en avant-première !`,
        },
        {
          trigger: 'contact',
          response: `Notre service client est disponible du lundi au vendredi. Laissez votre message ici et nous vous répondons sous 24h.`,
        },
      ],
      ctaLabel: 'Voir nos produits',
    }
  }

  // Fallback générique
  return {
    welcomeMessage: `Bonjour ! Bienvenue chez ${businessName} à ${city}. Comment puis-je vous aider ? 😊`,
    questions: [
      'Quels sont vos services ?',
      'Comment vous contacter ?',
      'Quels sont vos tarifs ?',
      'Êtes-vous disponible rapidement ?',
      'Où êtes-vous situé ?',
    ],
    answers: [
      {
        trigger: 'service',
        response: `Nous proposons : ${serviceList}. N'hésitez pas à nous contacter pour en savoir plus !`,
      },
      {
        trigger: 'contact',
        response: `Vous pouvez nous joindre directement via ce chat ou par téléphone. Nous vous répondrons dans les plus brefs délais.`,
      },
      {
        trigger: 'tarif',
        response: `Nos tarifs sont adaptés à chaque besoin. Demandez un devis gratuit et personnalisé !`,
      },
      {
        trigger: 'disponible',
        response: `Nous ferons le nécessaire pour vous accueillir rapidement. Laissez-nous vos coordonnées et nous vous recontactons !`,
      },
      {
        trigger: 'adresse',
        response: `Nous sommes basés à ${city}. Contactez-nous pour l'adresse exacte et les horaires.`,
      },
    ],
    ctaLabel: 'Nous contacter',
  }
}

// ─── Config generator ─────────────────────────────────────────────────────────

export function generateChatbotConfig(
  sector: string,
  businessName: string,
  city: string,
  services: string[],
  planId: PlanId,
): ChatbotConfig {
  const level = planId === 'agency' ? 'advanced' : planId === 'pro' ? 'simple' : 'none'

  if (level === 'none') {
    return {
      enabled: false,
      level: 'none',
      title: '',
      welcomeMessage: '',
      suggestedQuestions: [],
      answers: [],
      leadCaptureFields: [],
      ctaLabel: '',
      whatsappMessage: '',
      leadScoringEnabled: false,
      crmEnabled: false,
      primaryColor: '#4f46e5',
    }
  }

  const data = getSectorData(sector, businessName, city, services)

  const baseFields = ['nom', 'email', 'téléphone', 'besoin']
  const advancedFields = [...baseFields, 'budget', 'délai']

  const whatsappMessage = `Bonjour ${businessName} ! Je viens de votre site et j'aimerais en savoir plus sur ${services[0] ?? 'vos services'}. Pouvez-vous me contacter ?`

  return {
    enabled: true,
    level,
    title: `Assistant ${businessName}`,
    welcomeMessage: data.welcomeMessage,
    suggestedQuestions: data.questions,
    answers: data.answers,
    leadCaptureFields: level === 'advanced' ? advancedFields : baseFields,
    ctaLabel: data.ctaLabel,
    whatsappMessage,
    leadScoringEnabled: level === 'advanced',
    crmEnabled: level === 'advanced',
    primaryColor: '#4f46e5',
  }
}

// ─── HTML generator ───────────────────────────────────────────────────────────

export function generateChatbotHtml(
  sector: string,
  businessName: string,
  city: string,
  services: string[],
  planId: PlanId,
  primaryColor = '#4f46e5',
): string {
  if (planId === 'free' || planId === 'starter') return ''

  const config = generateChatbotConfig(sector, businessName, city, services, planId)
  if (!config.enabled) return ''

  const isAdvanced = config.level === 'advanced'

  const answersJson = JSON.stringify(config.answers)
  const questionsJson = JSON.stringify(config.suggestedQuestions)
  const leadFieldsJson = JSON.stringify(config.leadCaptureFields)
  const whatsappMsg = config.whatsappMessage.replace(/`/g, '\\`')

  return `<!-- SitePilot Chatbot — généré automatiquement -->
<style>
  #sp-chat-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: ${primaryColor};
    color: #fff;
    font-size: 26px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  }
  #sp-chat-btn:hover { transform: scale(1.08); }
  #sp-chat-window {
    position: fixed;
    bottom: 92px;
    right: 24px;
    width: 360px;
    max-height: 560px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.18);
    z-index: 99999;
    display: none;
    flex-direction: column;
    overflow: hidden;
    font-family: system-ui, -apple-system, sans-serif;
  }
  #sp-chat-window.sp-open { display: flex; }
  #sp-chat-header {
    background: ${primaryColor};
    color: #fff;
    padding: 14px 18px;
    font-weight: 700;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #sp-chat-close {
    background: none;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    line-height: 1;
  }
  #sp-chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .sp-bubble {
    max-width: 82%;
    padding: 10px 14px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.45;
  }
  .sp-bot { background: #f0f0f5; color: #1a1a2e; align-self: flex-start; border-bottom-left-radius: 4px; }
  .sp-user { background: ${primaryColor}; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
  #sp-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0 16px 12px;
  }
  .sp-suggestion {
    background: #f0f0f5;
    border: 1px solid #e0e0e8;
    border-radius: 20px;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
    color: #333;
    transition: background 0.15s;
  }
  .sp-suggestion:hover { background: #e0e0ee; }
  #sp-lead-form {
    padding: 14px 16px;
    border-top: 1px solid #eee;
    display: none;
    flex-direction: column;
    gap: 8px;
  }
  #sp-lead-form.sp-visible { display: flex; }
  .sp-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 13px;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s;
  }
  .sp-input:focus { border-color: ${primaryColor}; }
  .sp-btn-primary {
    background: ${primaryColor};
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: opacity 0.2s;
  }
  .sp-btn-primary:hover { opacity: 0.88; }
  .sp-btn-wa {
    background: #25d366;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 9px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: opacity 0.2s;
    display: none;
  }
  .sp-btn-wa:hover { opacity: 0.88; }
  .sp-score-badge {
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 12px;
    font-weight: 700;
    display: inline-block;
    margin-top: 4px;
  }
  .sp-score-hot { background: #fee2e2; color: #dc2626; }
  .sp-score-warm { background: #fef3c7; color: #d97706; }
  .sp-score-cold { background: #e0f2fe; color: #0369a1; }
  @media (max-width: 420px) {
    #sp-chat-window { width: calc(100vw - 32px); right: 16px; bottom: 84px; }
  }
</style>

<button id="sp-chat-btn" aria-label="Ouvrir le chat">💬</button>

<div id="sp-chat-window" role="dialog" aria-label="Assistant ${businessName}">
  <div id="sp-chat-header">
    <span>🤖 ${config.title}</span>
    <button id="sp-chat-close" aria-label="Fermer">✕</button>
  </div>
  <div id="sp-chat-messages"></div>
  <div id="sp-suggestions"></div>
  <div id="sp-lead-form">
    <p style="font-size:13px;font-weight:600;margin:0 0 4px;">Laissez vos coordonnées :</p>
    ${config.leadCaptureFields.map(f => `<input class="sp-input" id="sp-field-${f.replace(/\s/g, '-')}" placeholder="${f.charAt(0).toUpperCase() + f.slice(1)}" />`).join('\n    ')}
    ${isAdvanced ? `<select class="sp-input" id="sp-field-score-intent" style="color:#555">
      <option value="">Votre projet (quand ?)</option>
      <option value="urgent">Urgent — dans les 2 semaines</option>
      <option value="soon">Bientôt — dans 1 à 3 mois</option>
      <option value="later">Plus tard — en réflexion</option>
    </select>` : ''}
    <button class="sp-btn-primary" id="sp-submit-lead">Envoyer ma demande</button>
    <button class="sp-btn-wa" id="sp-whatsapp-btn">💬 Envoyer sur WhatsApp</button>
    <p id="sp-success-msg" style="display:none;font-size:13px;color:#16a34a;text-align:center;font-weight:600;">✅ Demande envoyée ! Nous vous recontactons vite.</p>
  </div>
</div>

<script>
(function() {
  var ANSWERS = ${answersJson};
  var QUESTIONS = ${questionsJson};
  var LEAD_FIELDS = ${leadFieldsJson};
  var WA_MSG = \`${whatsappMsg}\`;
  var IS_ADVANCED = ${isAdvanced};
  var BUSINESS = "${businessName.replace(/"/g, '\\"')}";

  var btn = document.getElementById('sp-chat-btn');
  var win = document.getElementById('sp-chat-window');
  var closeBtn = document.getElementById('sp-chat-close');
  var msgs = document.getElementById('sp-chat-messages');
  var sugg = document.getElementById('sp-suggestions');
  var form = document.getElementById('sp-lead-form');
  var submitBtn = document.getElementById('sp-submit-lead');
  var waBtn = document.getElementById('sp-whatsapp-btn');
  var successMsg = document.getElementById('sp-success-msg');
  var opened = false;

  function addMsg(text, role) {
    var b = document.createElement('div');
    b.className = 'sp-bubble sp-' + role;
    b.textContent = text;
    msgs.appendChild(b);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showSuggestions(list) {
    sugg.innerHTML = '';
    list.forEach(function(q) {
      var chip = document.createElement('button');
      chip.className = 'sp-suggestion';
      chip.textContent = q;
      chip.addEventListener('click', function() {
        handleQuestion(q);
      });
      sugg.appendChild(chip);
    });
  }

  function getAnswer(question) {
    var q = question.toLowerCase();
    for (var i = 0; i < ANSWERS.length; i++) {
      if (q.includes(ANSWERS[i].trigger.toLowerCase())) {
        return ANSWERS[i].response;
      }
    }
    return "Je ne suis pas sûr de comprendre. Laissez vos coordonnées et nous vous rappelons rapidement !";
  }

  function handleQuestion(question) {
    sugg.innerHTML = '';
    addMsg(question, 'user');
    setTimeout(function() {
      addMsg(getAnswer(question), 'bot');
      setTimeout(function() {
        addMsg("Souhaitez-vous qu'on vous recontacte ?", 'bot');
        form.classList.add('sp-visible');
        waBtn.style.display = 'block';
      }, 600);
    }, 400);
  }

  function calcScore(intent) {
    if (intent === 'urgent') return { label: '🔥 Lead chaud', cls: 'sp-score-hot', value: 90 };
    if (intent === 'soon') return { label: '⚡ Lead tiède', cls: 'sp-score-warm', value: 60 };
    return { label: '❄️ Lead froid', cls: 'sp-score-cold', value: 25 };
  }

  submitBtn && submitBtn.addEventListener('click', function() {
    var lead = { timestamp: new Date().toISOString(), business: BUSINESS };
    LEAD_FIELDS.forEach(function(f) {
      var el = document.getElementById('sp-field-' + f.replace(/\\s/g, '-'));
      if (el) lead[f] = el.value;
    });

    if (IS_ADVANCED) {
      var intentEl = document.getElementById('sp-field-score-intent');
      var intent = intentEl ? intentEl.value : '';
      var score = calcScore(intent);
      lead.scoring = score.value;
      lead.scoringLabel = score.label;
    }

    try {
      var history = JSON.parse(localStorage.getItem('sp_leads') || '[]');
      history.push(lead);
      localStorage.setItem('sp_leads', JSON.stringify(history));
    } catch(e) {}

    LEAD_FIELDS.forEach(function(f) {
      var el = document.getElementById('sp-field-' + f.replace(/\\s/g, '-'));
      if (el) el.value = '';
    });

    submitBtn.style.display = 'none';
    successMsg.style.display = 'block';

    if (IS_ADVANCED) {
      var intentEl2 = document.getElementById('sp-field-score-intent');
      var intent2 = intentEl2 ? intentEl2.value : '';
      var scoreData = calcScore(intent2);
      var badge = document.createElement('span');
      badge.className = 'sp-score-badge ' + scoreData.cls;
      badge.textContent = scoreData.label;
      successMsg.appendChild(badge);
    }
  });

  waBtn && waBtn.addEventListener('click', function() {
    var msg = WA_MSG;
    var nameEl = document.getElementById('sp-field-nom');
    if (nameEl && nameEl.value) msg += ' — ' + nameEl.value;
    window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
  });

  btn.addEventListener('click', function() {
    if (!opened) {
      opened = true;
      win.classList.add('sp-open');
      addMsg("${config.welcomeMessage.replace(/"/g, '\\"')}", 'bot');
      setTimeout(function() { showSuggestions(QUESTIONS); }, 500);
    } else {
      win.classList.toggle('sp-open');
    }
  });

  closeBtn.addEventListener('click', function() {
    win.classList.remove('sp-open');
  });
})();
</script>
`
}
