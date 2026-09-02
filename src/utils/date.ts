/**
 * Format a date as "November 11, 2025".
 * Pinned to en-US so the output does not depend on the visitor's browser locale.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
