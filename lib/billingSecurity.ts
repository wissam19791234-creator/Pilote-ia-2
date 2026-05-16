/**
 * SÉCURITÉ FACTURATION — MVP LOCAL UNIQUEMENT
 *
 * ATTENTION : En production, TOUT ce qui concerne les crédits, plans et limites
 * DOIT être vérifié côté serveur. Le localStorage est manipulable par l'utilisateur.
 *
 * Architecture production requise :
 * - Stripe pour les abonnements et paiements
 * - Supabase pour stocker plans et crédits par user_id
 * - Stripe webhooks → mise à jour Supabase
 * - Vérification credits côté API (route /api/generate) via Supabase
 * - Ne JAMAIS faire confiance au plan/credits envoyé par le frontend
 * - Rate limiting par API key + user_id
 * - Audit log de chaque génération
 */

import type { PlanId, Plan } from './plans'
import type { CreditAction } from './credits'

/**
 * Vérifie le plan de l'utilisateur côté serveur.
 * MVP : renvoie 'free' (stub). Remplacer par une requête Supabase.
 *
 * @example
 * // Production :
 * // const { data } = await supabase
 * //   .from('subscriptions')
 * //   .select('plan_id')
 * //   .eq('user_id', userId)
 * //   .single()
 * // return data.plan_id as PlanId
 */
export async function verifyPlanServerSide(_userId: string): Promise<PlanId> {
  // TODO: remplacer par Supabase en production
  return 'free'
}

/**
 * Consomme des crédits côté serveur de façon atomique.
 * MVP : renvoie true (stub). Remplacer par une transaction Supabase.
 *
 * @example
 * // Production :
 * // const { data, error } = await supabase.rpc('consume_credits', {
 * //   p_user_id: userId,
 * //   p_action: action,
 * //   p_amount: CREDIT_COSTS[action],
 * // })
 * // return !error && data === true
 */
export async function consumeCreditsServerSide(
  _userId: string,
  _action: CreditAction,
): Promise<boolean> {
  // TODO: remplacer par Supabase RPC en production
  return true
}

/**
 * Récupère les limites du plan de l'utilisateur côté serveur.
 * MVP : renvoie le plan free (stub). Remplacer par une requête Supabase.
 *
 * @example
 * // Production :
 * // const planId = await verifyPlanServerSide(userId)
 * // return PLANS[planId]
 */
export async function getPlanLimitsServerSide(_userId: string): Promise<Plan> {
  // TODO: remplacer par Supabase en production
  const { PLANS } = await import('./plans')
  return PLANS['free']
}
