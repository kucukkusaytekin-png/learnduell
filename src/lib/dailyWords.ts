import { allWords, type VocabWord } from './words';

// Deterministic seeded random (mulberry32)
export function seededRandom(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function dateToSeed(date: string): number {
  // date = yyyy-mm-dd → numeric seed
  let h = 0;
  for (let i = 0; i < date.length; i++) {
    h = (h * 31 + date.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const rand = seededRandom(seed);
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickDailyWords(date: string, count = 5): VocabWord[] {
  const seed = dateToSeed(date);
  return shuffleWithSeed(allWords, seed).slice(0, count);
}
