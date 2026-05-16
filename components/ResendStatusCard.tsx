'use client'

interface ResendStatusCardProps {
  configured?: boolean
  showSetupGuide?: boolean
}

export default function ResendStatusCard({ configured = false, showSetupGuide = true }: ResendStatusCardProps) {
  if (configured) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-600 text-lg">✅</span>
          <p className="font-semibold text-green-800 text-sm">Resend configuré</p>
        </div>
        <p className="text-xs text-green-700 mb-3">
          Les leads des sites générés seront automatiquement capturés et envoyés par email.
        </p>
        <button
          onClick={() => window.open('/api/resend/test', '_blank')}
          className="text-xs px-3 py-1.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
        >
          Tester la configuration
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-amber-600 text-lg">⚠️</span>
        <p className="font-semibold text-amber-800 text-sm">Resend non configuré</p>
      </div>
      <p className="text-xs text-amber-700 mb-3">
        Les leads seront calculés mais pas envoyés par email. Configurez Resend pour activer les notifications.
      </p>

      {showSetupGuide && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Configuration requise :</p>
          <ol className="space-y-1.5 text-xs text-amber-700">
            <li className="flex gap-2">
              <span className="font-bold shrink-0">1.</span>
              <span>Créer un compte gratuit sur <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">resend.com</a></span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold shrink-0">2.</span>
              <span>Aller dans <strong>Audiences</strong> et créer une nouvelle audience</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold shrink-0">3.</span>
              <span>Copier l&apos;ID de l&apos;audience (format : <code className="bg-amber-100 px-1 rounded">xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</code>)</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold shrink-0">4.</span>
              <span>Ajouter <code className="bg-amber-100 px-1 rounded">RESEND_API_KEY</code> et <code className="bg-amber-100 px-1 rounded">RESEND_AUDIENCE_ID</code> dans Vercel → Settings → Environment Variables</span>
            </li>
          </ol>
        </div>
      )}
    </div>
  )
}
