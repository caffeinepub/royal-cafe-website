/**
 * Centralized React Query key helpers to ensure consistent query key usage across the app
 */

/**
 * Generate the actor query key
 * @param identityPrincipal - Optional principal string from identity
 */
export function getActorQueryKey(identityPrincipal?: string) {
  return ['actor', identityPrincipal];
}

/**
 * Query key for admin status check
 */
export const ADMIN_STATUS_QUERY_KEY = ['isAdmin'];

/**
 * Query key for homepage content
 */
export const HOMEPAGE_CONTENT_QUERY_KEY = ['homePageContent'];

/**
 * Query key for publish state
 */
export const PUBLISH_STATE_QUERY_KEY = ['publishState'];
