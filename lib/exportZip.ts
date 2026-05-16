import type { GeneratedProject } from '@/types'

export async function exportZip(project: GeneratedProject): Promise<Blob> {
  const JSZip = (await import('jszip')).default
  const zip = new JSZip()

  const folder = zip.folder('generated-site')!

  // index.html
  folder.file('index.html', project.html)

  // Extract inline styles as separate CSS
  const styleMatch = /<style[^>]*>([\s\S]*?)<\/style>/i.exec(project.html)
  const cssContent = styleMatch ? styleMatch[1] : '/* No styles extracted */'
  folder.file('styles.css', `/* SitePilot AI — ${project.businessName} */\n/* Copy these styles into your own stylesheets */\n\n${cssContent}`)

  // Extract inline scripts
  const scriptMatch = /<script[^>]*>([\s\S]*?)<\/script>/i.exec(project.html)
  const jsContent = scriptMatch ? scriptMatch[1] : '// No scripts extracted'
  folder.file('script.js', `// SitePilot AI — ${project.businessName}\n\n${jsContent}`)

  // config.json
  const config = {
    businessName: project.businessName,
    city: project.city,
    sector: project.sector,
    style: project.style,
    goal: project.goal,
    services: project.services,
    designSystem: project.designSystem,
    seo: project.seo,
    generatedAt: project.createdAt,
    generatedBy: 'SitePilot AI',
  }
  folder.file('config.json', JSON.stringify(config, null, 2))

  // Client message
  if (project.copywriting?.clientMessage) {
    folder.file('assets/message-client.txt', project.copywriting.clientMessage)
  }

  // Sales pack
  if (project.salesPack) {
    const salesText = [
      `=== PACK DE VENTE — ${project.businessName} ===`,
      '',
      `Pack recommandé : ${project.salesPack.recommendedOffer}`,
      '',
      '--- PITCH SCRIPT ---',
      project.salesPack.pitchScript,
      '',
      '--- DM COURT ---',
      project.salesPack.dmShort,
      '',
      '--- EMAIL PROFESSIONNEL ---',
      project.salesPack.emailProfessional,
      '',
      '--- RELANCES ---',
      ...project.salesPack.followUps,
    ].join('\n')
    folder.file('assets/pack-vente.txt', salesText)
  }

  // README
  const readme = `# ${project.businessName} — Site généré par SitePilot AI

## Contenu du pack

- **index.html** : Le site complet, standalone (tout inline)
- **styles.css** : Les styles extraits pour référence
- **script.js** : Les scripts extraits pour référence
- **config.json** : Configuration du projet
- **assets/message-client.txt** : Message prêt à envoyer au commerce
- **assets/pack-vente.txt** : Scripts commerciaux et argumentaires

## Hébergement

Le fichier \`index.html\` est standalone. Pour l'héberger :
- **Netlify** : Glissez-déposez index.html sur app.netlify.com/drop
- **Vercel** : \`vercel deploy\` dans le dossier
- **OVH / Hostinger** : Uploadez index.html via FTP
- **GitHub Pages** : Poussez dans un repo public

## Généré par SitePilot AI

Date : ${new Date(project.createdAt).toLocaleDateString('fr-FR')}
Secteur : ${project.sector}
Ville : ${project.city}
`
  folder.file('README.md', readme)

  return zip.generateAsync({ type: 'blob' })
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 5000)
}
