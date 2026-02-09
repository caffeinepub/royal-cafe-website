/**
 * Utility for normalizing admin codes to ensure case-insensitive and whitespace-tolerant matching
 */

/**
 * Normalizes an admin code by trimming whitespace and converting to uppercase
 * This ensures consistent comparison regardless of how the user enters the code
 * 
 * @param code - The raw admin code entered by the user
 * @returns The normalized admin code (trimmed and uppercase)
 */
export function normalizeAdminCode(code: string): string {
  return code.trim().toUpperCase();
}

/**
 * The expected admin code in normalized form
 * This is the single source of truth for admin code validation
 */
export const EXPECTED_ADMIN_CODE = normalizeAdminCode('royalcafemau01');
