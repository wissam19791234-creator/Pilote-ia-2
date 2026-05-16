const WITHOUT_ITEMS = [
  { task: 'Analyser le commerce', time: '45 min' },
  { task: 'Écrire les textes', time: '2h' },
  { task: 'Créer la maquette', time: '3–5h' },
  { task: 'Créer le formulaire', time: '1h' },
  { task: 'Imaginer les automatisations', time: '2h' },
  { task: 'Préparer le message client', time: '30 min' },
  { task: 'Créer l\'offre commerciale', time: '1h' },
  { task: 'Exporter le site', time: '30 min' },
]

const WITH_ITEMS = [
  { task: 'Décrire le commerce', time: '2 min' },
  { task: 'Ajouter les photos', time: '1 min' },
  { task: 'Attendre la génération', time: '2–5 min' },
  { task: 'Site complet · Variantes design · Automatisations · Offre · Message · HTML/ZIP', time: '✓' },
]

export default function ComparisonSection() {
  return (
    <section className="py-24 px-6 bg-[#fffaf3]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="font-syne font-bold text-[#171717] mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            10 heures vs{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #4f46e5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              10 minutes
            </span>
          </h2>
          <p className="text-[#6b625b] max-w-xl mx-auto">
            SitePilot compresse une journée de travail en une pause café.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Without */}
          <div className="bg-white rounded-3xl border border-red-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 bg-red-50 border-b border-red-100">
              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-sm font-bold text-red-500">
                ✗
              </div>
              <h3 className="font-syne font-bold text-[#171717]">Sans SitePilot</h3>
            </div>
            <div className="p-6 flex flex-col gap-3">
              {WITHOUT_ITEMS.map((item) => (
                <div
                  key={item.task}
                  className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-red-400 text-sm shrink-0 font-bold">✗</span>
                    <span className="text-sm text-[#171717]">{item.task}</span>
                  </div>
                  <span className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
              {/* Total */}
              <div className="mt-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-center justify-between">
                <span className="font-syne font-bold text-[#171717]">Total</span>
                <span className="font-syne font-extrabold text-red-500 text-lg">10–14 heures</span>
              </div>
            </div>
          </div>

          {/* With */}
          <div className="bg-white rounded-3xl border border-violet-100 shadow-sm overflow-hidden relative">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-bold bg-violet-600 text-white px-2.5 py-1 rounded-full">
                ✦ Recommandé
              </span>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 bg-violet-50 border-b border-violet-100">
              <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center text-sm font-bold text-violet-600">
                ✓
              </div>
              <h3 className="font-syne font-bold text-[#171717]">Avec SitePilot</h3>
            </div>
            <div className="p-6 flex flex-col gap-3">
              {WITH_ITEMS.map((item) => (
                <div
                  key={item.task}
                  className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#55c47a] text-sm shrink-0 font-bold mt-0.5">✓</span>
                    <span className="text-sm text-[#171717]">{item.task}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${item.time === '✓' ? 'bg-[#55c47a]/10 text-[#55c47a]' : 'bg-violet-50 text-violet-600'}`}>
                    {item.time}
                  </span>
                </div>
              ))}
              {/* Total */}
              <div className="mt-3 rounded-2xl px-4 py-3 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #8b5cf6, #4f46e5)' }}>
                <span className="font-syne font-bold text-white">Total</span>
                <span className="font-syne font-extrabold text-white text-lg">5–10 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
