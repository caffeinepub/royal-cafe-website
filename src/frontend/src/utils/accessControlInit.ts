/**
 * Access control initialization helper for admin authorization
 * Ensures the actor is initialized with the stored admin token when present
 */

import { getSessionParameter } from './urlParams';
import type { backendInterface } from '../backend';

// Track which actor instances have been initialized to avoid redundant calls
const initializedActors = new WeakSet<backendInterface>();

/**
 * Initialize access control for the given actor using the stored admin token
 * This is memoized per actor instance to avoid redundant initialization
 * 
 * @param actor - The backend actor instance
 * @returns Promise that resolves when initialization is complete
 */
export async function initializeAccessControl(actor: backendInterface | null): Promise<void> {
  if (!actor) {
    return;
  }

  // Skip if already initialized for this actor instance
  if (initializedActors.has(actor)) {
    return;
  }

  // Get the stored admin token
  const adminToken = getSessionParameter('caffeineAdminToken') || '';

  // Initialize access control with the token (empty string if no token)
  try {
    await actor._initializeAccessControlWithSecret(adminToken);
    initializedActors.add(actor);
  } catch (error) {
    console.error('Failed to initialize access control:', error);
    throw error;
  }
}
