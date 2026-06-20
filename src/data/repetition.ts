import type { Question } from '../types';

// Extra question pool for Spaced Repetition.
// Each topic gets 4 NEW questions with different vocabulary/content than the main pool.
// When a topic is "due", the Repetitor page picks from this pool (shuffled).

function makeMcq(
  id: string,
  prompt: string,
  correct: string,
  distractors: string[],
  explanation: string,
  difficulty: 1 | 2 | 3,
  tags: string[]
): Question {
  const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
  return {
    id,
    type: 'mcq',
    prompt,
    options,
    correctIndex: options.indexOf(correct),
    explanation,
    difficulty,
    tags,
  };
}

// ─── Deutsch Satzaufbau: Konnektoren (alternative set) ────────────────────
const konnektorenExtra: Question[] = [
  makeMcq(
    'rep-kon-1',
    'Welcher Konnektor passt?\n\n"___ es regnete, gingen wir spazieren."',
    'Obwohl',
    ['Weil', 'Damit', 'Wenn'],
    'Obwohl = trotz der Tatsache (konzessiv). Es regnete, TROTZDEM spazieren.',
    2,
    ['konnektor', 'konzessiv'],
  ),
  makeMcq(
    'rep-kon-2',
    'Welcher Konnektor passt?\n\n"Ich lerne viel, ___ ich die Prüfung bestehen kann."',
    'damit',
    ['obwohl', 'während', 'seitdem'],
    'Damit = Zweck/Folge. Ich lerne → ZIEL: Prüfung bestehen.',
    2,
    ['konnektor', 'final'],
  ),
  makeMcq(
    'rep-kon-3',
    'Welcher Konnektor passt?\n\n"___ er angekommen war, begann das Konzert."',
    'Nachdem',
    ['Während', 'Bevor', 'Sobald'],
    'Nachdem = Plusquamperfekt-Temporal. Nach einem vergangenen Ereignis.',
    3,
    ['konnektor', 'temporal'],
  ),
  makeMcq(
    'rep-kon-4',
    'Welcher Konnektor passt?\n\n"Sie blieb zu Hause, ___ sie krank war."',
    'weil',
    ['damit', 'obwohl', 'sodass'],
    'Weil = kausal (Grund). Sie war krank (Grund), blieb zu Hause (Folge).',
    1,
    ['konnektor', 'kausal'],
  ),
];

// ─── Deutsch Satzaufbau: Konjunktiv II ────────────────────────────────────
const konjunktivExtra: Question[] = [
  makeMcq(
    'rep-konj-1',
    'Welche Form passt?\n\n"Wenn ich Zeit ___ (haben), würde ich dir helfen."',
    'hätte',
    ['habe', 'hatte', 'haben würde'],
    'Konjunktiv II von "haben" = "hätte" (unregelmäßig).',
    2,
    ['konjunktiv-ii'],
  ),
  makeMcq(
    'rep-konj-2',
    'Welche Form passt?\n\n"Wenn ich du ___ (sein), würde ich sofort anfangen."',
    'wäre',
    ['bin', 'war', 'sei'],
    'Konjunktiv II von "sein" = "wäre" (Standardsprache), "sei" eher förmlich.',
    2,
    ['konjunktiv-ii'],
  ),
  makeMcq(
    'rep-konj-3',
    'Welche Form passt?\n\n"Es ___ (regnen) morgen, könnten wir drinnen bleiben."',
    'würde',
    ['regnete', 'regnen würde', 'hat geregnet'],
    'Konjunktiv II mit "würde" + Infinitiv (umschrieben). Sicherste Form bei Verben mit Umlaut-Problemen.',
    2,
    ['konjunktiv-ii'],
  ),
  makeMcq(
    'rep-konj-4',
    'Welche Form passt?\n\n"Ich ___ (können) gut Klavier spielen, wenn ich mehr geübt hätte."',
    'könnte',
    ['kann', 'konnte', 'würde können'],
    'Konjunktiv II von "können" = "könnte".',
    3,
    ['konjunktiv-ii'],
  ),
];

// ─── Mathematik: Ableitung ────────────────────────────────────────────────
const ableitungExtra: Question[] = [
  makeMcq(
    'rep-ableit-1',
    'Bilde die Ableitung:\n\n"f(x) = 4x³ − 6x + 2"',
    'f′(x) = 12x² − 6',
    ['f′(x) = 12x² − 6x', 'f′(x) = 4x² − 6', 'f′(x) = 12x³ − 6'],
    'Potenzregel: 4x³ → 12x²; −6x → −6; +2 → 0 (Konstante verschwindet).',
    2,
    ['ableitung', 'potenzregel'],
  ),
  makeMcq(
    'rep-ableit-2',
    'Bilde die Ableitung:\n\n"f(x) = 5/x = 5x⁻¹"',
    'f′(x) = −5x⁻² = −5/x²',
    ['f′(x) = 5x⁻²', 'f′(x) = 5 · ln(x)', 'f′(x) = 5x²'],
    'Potenzregel mit −1: 5x⁻¹ → −5x⁻².',
    3,
    ['ableitung', 'potenzregel'],
  ),
  makeMcq(
    'rep-ableit-3',
    'Bilde die Ableitung:\n\n"f(x) = sin(x) · cos(x)"',
    'f′(x) = cos²(x) − sin²(x)',
    ['f′(x) = sin(x) · cos(x)', 'f′(x) = cos(x) − sin(x)', 'f′(x) = −sin(x) · cos(x)'],
    'Produktregel: u = sin(x), v = cos(x); u′v + uv′ = cos²(x) − sin²(x).',
    3,
    ['ableitung', 'produktregel'],
  ),
  makeMcq(
    'rep-ableit-4',
    'Bilde die Ableitung:\n\n"f(x) = e^(3x)"',
    'f′(x) = 3e^(3x)',
    ['f′(x) = e^(3x)', 'f′(x) = 3x · e^(3x−1)', 'f′(x) = 3 · ln(x) · e^(3x)'],
    'Kettenregel: äußere Ableitung e^u = e^u · u′. u = 3x, u′ = 3.',
    3,
    ['ableitung', 'kettenregel'],
  ),
];

// ─── Mathematik: Vektoren ────────────────────────────────────────────────
const vektorenExtra: Question[] = [
  makeMcq(
    'rep-vekt-1',
    'Berechne den Betrag des Vektors:\n\n"a = (3, 4)"',
    '|a| = 5',
    ['|a| = 7', '|a| = √7', '|a| = 12'],
    '|a| = √(3² + 4²) = √(9 + 16) = √25 = 5. (3-4-5 rechtwinkliges Dreieck)',
    1,
    ['vektor', 'betrag'],
  ),
  makeMcq(
    'rep-vekt-2',
    'Sind die Vektoren orthogonal (senkrecht)?\n\n"a = (2, 1); b = (−1, 2)"',
    'Ja, das Skalarprodukt ist 0',
    ['Nein, sie sind parallel', 'Ja, weil gleicher Betrag', 'Nein, sie stehen senkrecht zueinander'],
    'Skalarprodukt a · b = 2·(−1) + 1·2 = −2 + 2 = 0 → orthogonal.',
    2,
    ['vektor', 'skalarprodukt'],
  ),
  makeMcq(
    'rep-vekt-3',
    'Berechne das Skalarprodukt:\n\n"a = (1, 2, 3); b = (4, −5, 6)"',
    'a · b = 12',
    ['a · b = 0', 'a · b = 32', 'a · b = 18'],
    'a · b = 1·4 + 2·(−5) + 3·6 = 4 − 10 + 18 = 12.',
    2,
    ['vektor', 'skalarprodukt'],
  ),
  makeMcq(
    'rep-vekt-4',
    'Welche Aussage über das Kreuzprodukt ist richtig?',
    'Es ist nur im ℝ³ definiert und steht senkrecht auf beiden Vektoren.',
    ['Es ist nur im ℝ² definiert.', 'Es ergibt einen Skalar.', 'Es ist immer der Nullvektor.'],
    'Kreuzprodukt a × b ist im 3D definiert, ergibt einen Vektor senkrecht zu a und b (rechte-Hand-Regel).',
    3,
    ['vektor', 'kreuzprodukt'],
  ),
];

// ─── Stil & Ausdruck: Stilfiguren ─────────────────────────────────────────
const stilfigurenExtra: Question[] = [
  makeMcq(
    'rep-stil-1',
    'Welche Stilfigur liegt vor?\n\n"Blut, Schweiß und Tränen — das war sein Leben."',
    'Triade',
    ['Antithese', 'Klimax', 'Metapher'],
    'Dreierfigur (drei gleichberechtigte Glieder): Blut, Schweiß, Tränen.',
    1,
    ['stilfigur', 'triade'],
  ),
  makeMcq(
    'rep-stil-2',
    'Welche Stilfigur liegt vor?\n\n"Die Stadt, die niemals schläft, schläft endlich doch."',
    'Antithese',
    ['Triade', 'Personifikation', 'Klimax'],
    'Widerspruch: "niemals schläft" vs "schläft endlich doch" — Gegenüberstellung.',
    2,
    ['stilfigur', 'antithese'],
  ),
  makeMcq(
    'rep-stil-3',
    'Welche Stilfigur liegt vor?\n\n"Er kämpfte, litt und starb für seine Überzeugung."',
    'Klimax',
    ['Antithese', 'Metapher', 'Personifikation'],
    'Steigerung: kämpfen (aktiv) → leiden → sterben (endgültig). Zunehmende Intensität.',
    2,
    ['stilfigur', 'klimax'],
  ),
  makeMcq(
    'rep-stil-4',
    'Welche Stilfigur liegt vor?\n\n"Das Herz Europas schlägt in Brüssel."',
    'Personifikation',
    ['Metapher', 'Triade', 'Chiasmus'],
    'Verlebendigung: "schlagen" wird dem abstrakten "Herz Europas" zugeschrieben.',
    2,
    ['stilfigur', 'personifikation'],
  ),
];

// ─── Stil & Ausdruck: Nominalstil ─────────────────────────────────────────
const nominalstilExtra: Question[] = [
  makeMcq(
    'rep-nom-1',
    'Wandle in Nominalstil um:\n\n"Weil er die Prüfung nicht bestand, war er traurig."',
    'Wegen seines Nichtbestehens der Prüfung war er traurig.',
    ['Weil er die Prüfung nicht bestand, war er traurig.', 'Sein Nichtbestehen der Prüfung traurig war.', 'Er bestand die Prüfung nicht und war traurig.'],
    'Verbal kausal → Nominal kausal: "weil … nicht bestand" → "Wegen seines Nichtbestehens".',
    3,
    ['nominalstil', 'kausal'],
  ),
  makeMcq(
    'rep-nom-2',
    'Wandle in Nominalstil um:\n\n"Obwohl das Wetter schlecht war, gingen wir spazieren."',
    'Trotz des schlechten Wetters gingen wir spazieren.',
    ['Obwohl das Wetter schlecht war, gingen wir.', 'Wegen des schlechten Wetters gingen wir.', 'Das schlechte Wetter war, gingen wir spazieren.'],
    'Konzessiv-Verbal → Konzessiv-Nominal: "obwohl … war" → "Trotz des … Wetters".',
    2,
    ['nominalstil', 'konzessiv'],
  ),
  makeMcq(
    'rep-nom-3',
    'Wandle in Nominalstil um:\n\n"Sie las das Buch und weinte dabei."',
    'Beim Lesen des Buches weinte sie.',
    ['Sie las das Buch, als sie weinte.', 'Sie las das Buch, dabei weinte sie.', 'Ihr Lesen des Buches weinte sie.'],
    'Simultan-Verbal → Simultan-Nominal: "las … und weinte dabei" → "Beim Lesen …".',
    3,
    ['nominalstil', 'simultan'],
  ),
  makeMcq(
    'rep-nom-4',
    'Welcher Nominalstil ist grammatisch korrekt?',
    'Die Zerstörung der Stadt im Zweiten Weltkrieg',
    ['Das Zerstören der Stadt', 'Die Stadt zerstören', 'Zerstören der Stadt'],
    'Genitiv-Attribut ist standardsprachlich: "die Zerstörung" + Genitiv ("der Stadt").',
    2,
    ['nominalstil'],
  ),
];

// ─── English: Conditionals ────────────────────────────────────────────────
const conditionalsExtra: Question[] = [
  makeMcq(
    'rep-cond-1',
    'Choose the correct form:\n\n"If I ___ (know) the answer, I would tell you."',
    'knew',
    ['know', 'have known', 'will know'],
    'Type 2: Past Simple in if-clause. know → knew.',
    2,
    ['conditional', 'type-2'],
  ),
  makeMcq(
    'rep-cond-2',
    'Choose the correct form:\n\n"If she ___ (not miss) the bus, she would have been on time."',
    'had not missed',
    ['did not miss', 'would not miss', 'has not missed'],
    'Type 3 mixed: Past Perfect in if-clause, would have been in main clause.',
    3,
    ['conditional', 'type-3'],
  ),
  makeMcq(
    'rep-cond-3',
    'Which conditional type?\n\n"If we leave now, we will catch the train."',
    'Type 1 (real / likely)',
    ['Type 2 (unreal present)', 'Type 3 (unreal past)', 'Type 0 (general truth)'],
    'Real, likely future → Type 1. leave (Present Simple) + will catch.',
    1,
    ['conditional', 'type-1'],
  ),
  makeMcq(
    'rep-cond-4',
    'Choose the correct form:\n\n"If he ___ (be) taller, he could reach the shelf."',
    'were',
    ['is', 'had been', 'would be'],
    'Type 2: subjunctive "were" for hypothetical present (advice/hypothetical).',
    2,
    ['conditional', 'type-2'],
  ),
];

// ─── English: Indirect Speech ─────────────────────────────────────────────
const indirectSpeechExtra: Question[] = [
  makeMcq(
    'rep-is-1',
    'Report the sentence:\n\n"I am reading a book," she said.',
    'She said (that) she was reading a book.',
    ['She said she is reading a book.', 'She says she was reading a book.', 'She said I was reading a book.'],
    'Present Continuous → Past Continuous. Pronoun I → she.',
    1,
    ['reported-speech'],
  ),
  makeMcq(
    'rep-is-2',
    'Report the request:\n\n"Please open the window," the teacher said.',
    'The teacher asked me to open the window.',
    ['The teacher said me to open the window.', 'The teacher told open the window.', 'The teacher said please open the window.'],
    'Polite request → "asked + person + to + infinitive".',
    2,
    ['reported-speech', 'request'],
  ),
  makeMcq(
    'rep-is-3',
    'Report the question:\n\n"Why are you laughing?" he asked.',
    'He asked why I was laughing.',
    ['He asked why am I laughing.', 'He asked why I am laughing.', 'He asked that I was laughing why.'],
    'wh-question → keep "why". Tense shift: are laughing → was laughing. Pronoun you → I.',
    2,
    ['reported-speech', 'question'],
  ),
  makeMcq(
    'rep-is-4',
    'Report the sentence:\n\n"I can swim very well," Tom said.',
    'Tom said (that) he could swim very well.',
    ['Tom said he can swim very well.', 'Tom said he could to swim.', 'Tom said I could swim.'],
    'Modal past: can → could. Pronoun I → he.',
    2,
    ['reported-speech', 'modal'],
  ),
];

export const repetitionByTopic: Record<string, Question[]> = {
  // Deutsch Satzaufbau
  konnektoren: konnektorenExtra,
  'konjunktiv-ii': konjunktivExtra,
  // Mathematik
  ableitung: ableitungExtra,
  vektoren: vektorenExtra,
  // Stil & Ausdruck
  stilfiguren: stilfigurenExtra,
  nominalstil: nominalstilExtra,
  // English
  conditionals: conditionalsExtra,
  'indirect-speech': indirectSpeechExtra,
};

export function getRepetitionTopics(): string[] {
  return Object.keys(repetitionByTopic);
}

export function hasRepetitionPool(topicId: string): boolean {
  return !!repetitionByTopic[topicId];
}
