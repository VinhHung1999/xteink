/**
 * Server-side input sanitization — strips HTML tags to prevent stored XSS.
 * Our fields are plain text rendered by React (textContent, not innerHTML),
 * so tag stripping is sufficient. No entity encoding needed.
 */

/**
 * Sanitize a user-provided string: strip all HTML tags and trim.
 * Returns empty string for non-string inputs.
 */
export function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/<[^>]*>/g, "").trim();
}

/**
 * Alias for sanitize — same behavior.
 * Kept for semantic clarity in call sites (e.g., sanitizeStrip for emails/phones).
 */
export const sanitizeStrip = sanitize;
