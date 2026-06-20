// Simple German-language keyword extractor.
// Looks for: capitalized nouns (likely important terms), common grammar terms,
// and any text matching common Oberstufe vocabulary.

const GERMAN_STOPWORDS = new Set([
  'der', 'die', 'das', 'ein', 'eine', 'und', 'oder', 'aber', 'weil', 'wenn', 'wann',
  'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie', 'mich', 'dich', 'sich',
  'ist', 'sind', 'war', 'hat', 'haben', 'sein', 'werden', 'kann', 'muss', 'soll',
  'nicht', 'kein', 'keine', 'auch', 'noch', 'schon', 'sehr', 'viel', 'mehr',
  'mit', 'ohne', 'für', 'von', 'aus', 'bei', 'zum', 'zur', 'auf', 'in', 'an',
  'um', 'durch', 'gegen', 'über', 'unter', 'vor', 'nach', 'seit',
  'dass', 'weil', 'wenn', 'als', 'ob', 'damit', 'sodass', 'während', 'bevor', 'nachdem',
  'diese', 'dieser', 'dieses', 'jene', 'jener', 'jenes', 'alle', 'jeder', 'jede', 'jedes',
  'was', 'wer', 'wen', 'wem', 'wessen', 'wo', 'wohin', 'woher', 'warum', 'wieso',
  'hier', 'dort', 'dann', 'jetzt', 'heute', 'morgen', 'gestern',
  'satz', 'sätze', 'text', 'beispiel', 'übung', 'aufgabe',
]);

const OBERSTUFE_TOPICS = [
  'Satz', 'Satzart', 'Satzarten', 'Aussagesatz', 'Fragesatz', 'Aufforderungssatz',
  'Ausrufesatz', 'Satzglied', 'Satzglieder', 'Subjekt', 'Prädikat', 'Objekt',
  'Akkusativ', 'Dativ', 'Genitiv', 'Nominativ', 'Adverbial', 'Adverbialbestimmung',
  'Konnektor', 'Konnektoren', 'Relativsatz', 'Relativsätze', 'Relativpronomen',
  'Passiv', 'Aktiv', 'Konjunktiv', 'Indikativ', 'Plusquamperfekt', 'Präteritum',
  'Präsens', 'Perfekt', 'Futur', 'Modalverb', 'Hilfsverb',
  'Nebensatz', 'Hauptsatz', 'Satzgefüge', 'Satzreihe', 'Satzklammer',
  'Temporalsatz', 'Kausalsatz', 'Konzessivsatz', 'Finalsatz', 'Konditionalsatz',
  'Konsekutivsatz', 'Modalsatz', 'Lokalsatz',
  'Funktion', 'Gleichung', 'Ableitung', 'Integral', 'Vektor', 'Matrix',
];

export function extractKeywords(text: string, maxTags = 8): string[] {
  if (!text || text.length < 10) return [];

  const tags = new Set<string>();
  const lower = text.toLowerCase();

  // 1. Check for known Oberstufe topics
  for (const topic of OBERSTUFE_TOPICS) {
    if (lower.includes(topic.toLowerCase())) {
      tags.add(topic);
    }
  }

  // 2. Extract capitalized words (German nouns)
  const wordRegex = /\b([A-ZÄÖÜ][a-zäöüß]{3,})\b/g;
  const matches = text.match(wordRegex) || [];
  const wordFreq = new Map<string, number>();

  for (const m of matches) {
    if (GERMAN_STOPWORDS.has(m.toLowerCase())) continue;
    wordFreq.set(m, (wordFreq.get(m) || 0) + 1);
  }

  // Top capitalized words
  const topWords = [...wordFreq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([w]) => w);

  for (const w of topWords) {
    if (tags.size >= maxTags) break;
    tags.add(w);
  }

  return [...tags].slice(0, maxTags);
}
