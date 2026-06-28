/**
 * "Neu" badge helper — flags topics/modules that were added recently so
 * the student notices fresh content.
 *
 * Window: 14 days from `addedAt` (ISO YYYY-MM-DD).
 * - Topic with addedAt = today → "Neu"
 * - Topic with addedAt = 13 days ago → still "Neu"
 * - Topic with addedAt = 15 days ago → no badge
 *
 * Edge cases:
 * - No addedAt → undefined → not new
 * - Invalid date string → treated as not new (safe default)
 * - addedAt in the future → not new (avoid weird "neu" state if user clock is off)
 */

const NEW_WINDOW_DAYS = 14;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function isRecentlyAdded(addedAt: string | undefined | null): boolean {
  if (!addedAt) return false;
  const added = new Date(addedAt).getTime();
  if (Number.isNaN(added)) return false;

  const now = Date.now();
  if (added > now) return false; // future date — don't claim it's new

  const ageDays = (now - added) / MS_PER_DAY;
  return ageDays < NEW_WINDOW_DAYS;
}

export function daysSinceAdded(addedAt: string | undefined | null): number | null {
  if (!addedAt) return null;
  const added = new Date(addedAt).getTime();
  if (Number.isNaN(added)) return null;
  return Math.floor((Date.now() - added) / MS_PER_DAY);
}

/**
 * Returns the most recent `addedAt` date among topics, or undefined if none.
 * Useful for module-level "Neu" badges on the dashboard.
 */
export function newestAddedAt<T extends { addedAt?: string }>(topics: T[]): string | undefined {
  const dates = topics
    .map((t) => t.addedAt)
    .filter((d): d is string => Boolean(d))
    .sort()
    .reverse();
  return dates[0];
}