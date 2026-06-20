// Deterministic seedable random for daily challenges.
// Same date → same questions for everyone.

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getTodayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function pickDailyQuestions<T>(pool: T[], count: number, dateKey = getTodayKey()): T[] {
  const seed = hashString(`lernduell-${dateKey}`);
  const rand = mulberry32(seed);
  const arr = [...pool];
  // Deterministic Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length)).sort((a, b) => {
    // Sort by difficulty if available (assuming items have `difficulty`), else keep order
    const ad = (a as any).difficulty ?? 1;
    const bd = (b as any).difficulty ?? 1;
    return ad - bd;
  });
}
