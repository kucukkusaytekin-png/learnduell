// Text similarity scoring for the rewrite (Stilübung) question type.
// Uses Jaccard similarity over normalized word tokens — fast, no deps.

const STOPWORDS = new Set([
  'der', 'die', 'das', 'ein', 'eine', 'und', 'oder', 'aber', 'weil', 'wenn', 'wann',
  'ist', 'sind', 'war', 'hat', 'haben', 'sein', 'werden', 'kann', 'muss', 'soll',
  'nicht', 'kein', 'keine', 'auch', 'noch', 'schon', 'sehr', 'viel', 'mehr',
  'mit', 'ohne', 'für', 'von', 'aus', 'bei', 'zum', 'zur', 'auf', 'in', 'an',
  'um', 'durch', 'gegen', 'über', 'unter', 'vor', 'nach', 'seit',
  'dass', 'als', 'ob', 'damit', 'sodass', 'während', 'bevor', 'nachdem',
  'diese', 'dieser', 'dieses', 'jene', 'jener', 'jenes',
  'was', 'wer', 'wen', 'wem', 'wessen', 'wo', 'wohin', 'woher', 'warum', 'wieso',
  'hier', 'dort', 'dann', 'jetzt', 'heute', 'morgen', 'gestern',
  'satz', 'sätze', 'text', 'beispiel', 'übung', 'aufgabe',
  'i', 'im', 'am',
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

/**
 * Jaccard similarity between two strings.
 * Returns 0..1 (1 = identical word set).
 */
export function jaccardSimilarity(a: string, b: string): number {
  const aSet = new Set(tokenize(a));
  const bSet = new Set(tokenize(b));
  if (aSet.size === 0 && bSet.size === 0) return 1;
  let intersection = 0;
  for (const w of aSet) if (bSet.has(w)) intersection++;
  const union = aSet.size + bSet.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Score a learner answer against the model + any accepted answers.
 * Returns the BEST similarity score across all candidates.
 */
export function bestScore(learner: string, model: string, accepted: string[] = []): number {
  const candidates = [model, ...accepted];
  let best = 0;
  for (const c of candidates) {
    best = Math.max(best, jaccardSimilarity(learner, c));
  }
  return best;
}

export type SimilarityVerdict = 'excellent' | 'good' | 'okay' | 'try-again';

export function verdictForScore(score: number): { label: string; color: string; pct: number; verdict: SimilarityVerdict } {
  if (score >= 0.75) return { label: 'Ausgezeichnet!', color: '#10b981', pct: Math.round(score * 100), verdict: 'excellent' };
  if (score >= 0.55) return { label: 'Gut!', color: '#fbbf24', pct: Math.round(score * 100), verdict: 'good' };
  if (score >= 0.35) return { label: 'Versuche es nochmal', color: '#f97316', pct: Math.round(score * 100), verdict: 'okay' };
  return { label: 'Anders formulieren', color: '#ef4444', pct: Math.round(score * 100), verdict: 'try-again' };
}
