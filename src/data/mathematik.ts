import type { Module, Topic, Question } from '../types';

function makeMcq(
  id: string,
  prompt: string,
  correct: string,
  distractors: string[],
  explanation: string,
  difficulty: 1 | 2 | 3,
  tags: string[],
  solutionSteps?: string[],
  turkish?: {
    prompt: string;
    explanation: string;
    solutionSteps?: string[];
  }
): Question {
  const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
  return {
    id,
    type: 'mcq',
    prompt,
    turkishPrompt: turkish?.prompt,
    options,
    correctIndex: options.indexOf(correct),
    explanation,
    turkishExplanation: turkish?.explanation,
    difficulty,
    tags,
    solutionSteps,
    turkishSolutionSteps: turkish?.solutionSteps,
  };
}

const funktionen: Topic = {
  id: 'funktionen',
  title: 'Funktionen',
  summary: 'Lineare und quadratische Funktionen verstehen und analysieren.',
  lesson: {
    intro:
      'Funktionen beschreiben Zusammenhänge zwischen Größen. In der Oberstufe sind lineare und quadratische Funktionen die Basis.',
    rules: [
      {
        title: 'Lineare Funktion (f(x) = mx + b)',
        body: 'm ist die Steigung, b ist der y-Achsenabschnitt. Der Graph ist eine gerade Linie.',
        examples: [
          'f(x) = 2x + 3 → Steigung 2, y-Achsenabschnitt 3',
          'f(x) = -x + 5 → fallende Gerade',
          'Nullstelle: f(x) = 0 lösen',
        ],
      },
      {
        title: 'Quadratische Funktion (f(x) = ax² + bx + c)',
        body: 'Der Graph ist eine Parabel. a bestimmt die Öffnung (a>0: nach oben, a<0: nach unten).',
        examples: [
          'f(x) = x² → Normalparabel',
          'f(x) = 2x² - 4x + 1',
          'Scheitelpunkt: S(-b/(2a), c - b²/(4a))',
        ],
      },
      {
        title: 'Nullstellen berechnen',
        body: 'Setze f(x) = 0 und löse die Gleichung. Bei quadratischen Funktionen: Mitternachtsformel oder pq-Formel.',
        examples: [
          'f(x) = x² - 5x + 6 = 0 → x = 2 oder x = 3',
          'Mitternachtsformel: x = (-b ± √(b²-4ac)) / 2a',
          'pq-Formel: x² + px + q = 0 → x = -p/2 ± √((p/2)² - q)',
        ],
      },
      {
        title: 'Scheitelpunktform',
        body: 'f(x) = a(x - d)² + e. Der Scheitelpunkt ist S(d, e). Direkt ablesbar!',
        examples: [
          'f(x) = (x - 3)² + 2 → S(3, 2)',
          'f(x) = -2(x + 1)² - 5 → S(-1, -5), nach unten geöffnet',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'f1',
      'Wie lautet die Steigung m der Funktion f(x) = 3x + 7?',
      '3',
      ['7', '-3', '0'],
      'Bei f(x) = mx + b ist m = 3 (Koeffizient vor x), b = 7.',
      1,
      ['funktion', 'linear'],
      [
        'Identifiziere die Funktionsform: f(x) = mx + b (lineare Funktion).',
        'Vergleiche mit der gegebenen Funktion: f(x) = 3x + 7.',
        'Lies die Steigung m ab — das ist der Koeffizient vor x: m = 3.',
        'Probe: f(0) = 7 (Y-Achsenabschnitt b = 7) ✓',
      ]
    ),
    makeMcq(
      'f2',
      'Was ist die Nullstelle von f(x) = 2x - 6?',
      'x = 3',
      ['x = -3', 'x = 6', 'x = 2'],
      '0 = 2x - 6 → 2x = 6 → x = 3.',
      1,
      ['funktion', 'nullstelle'],
      [
        'Definition: Eine Nullstelle ist der x-Wert, an dem f(x) = 0.',
        'Setze die Funktion gleich null: 2x - 6 = 0.',
        'Löse nach x auf: 2x = 6.',
        'Teile durch 2: x = 3.',
        'Probe: f(3) = 2·3 - 6 = 0 ✓',
      ]
    ),
    makeMcq(
      'f3',
      'Welcher Punkt ist der Scheitelpunkt von f(x) = (x - 2)² + 4?',
      'S(2, 4)',
      ['S(-2, 4)', 'S(2, -4)', 'S(4, 2)'],
      'In Scheitelpunktform f(x) = a(x - d)² + e ist S(d, e). Hier: d = 2, e = 4.',
      2,
      ['funktion', 'parabel'],
      [
        'Erkenne die Scheitelpunktform: f(x) = a(x - d)² + e.',
        'Der Scheitelpunkt ist S(d, e).',
        'Lies die Werte ab: x - d = x - 2, also d = 2.',
        'Konstante am Ende: + 4, also e = 4.',
        'Ergebnis: S(2, 4).',
      ]
    ),
    makeMcq(
      'f4',
      'Wie viele Nullstellen hat f(x) = x² + 4x + 5?',
      'Keine',
      ['Eine', 'Zwei', 'Unendlich viele'],
      'Diskriminante: b² - 4ac = 16 - 20 = -4 < 0 → keine reellen Nullstellen.',
      3,
      ['funktion', 'diskriminante'],
      [
        'Bestimme a, b, c aus f(x) = ax² + bx + c: a = 1, b = 4, c = 5.',
        'Berechne die Diskriminante: D = b² - 4ac.',
        'Einsetzen: D = 4² - 4·1·5 = 16 - 20 = -4.',
        'Auswertung: D < 0 → keine reellen Nullstellen.',
        'Die Parabel liegt komplett oberhalb (oder unterhalb) der x-Achse.',
      ]
    ),
    makeMcq(
      'f5',
      'Was ist die y-Achsenabschnitt von f(x) = -2x + 5?',
      '5',
      ['-2', '2', '-5'],
      'Bei f(x) = mx + b ist b = y-Achsenabschnitt. Hier: b = 5.',
      1,
      ['funktion', 'linear'],
      [
        'Der y-Achsenabschnitt ist der Funktionswert an der Stelle x = 0.',
        'Berechne: f(0) = -2·0 + 5 = 5.',
        'Oder: in der Form f(x) = mx + b direkt ablesen — b = 5.',
      ]
    ),
    makeMcq(
      'f6',
      'Die Parabel f(x) = -3x² + 12 ist…',
      'nach unten geöffnet',
      ['nach oben geöffnet', 'eine Gerade', 'nach links geöffnet'],
      'a = -3 < 0 → nach unten geöffnet.',
      2,
      ['funktion', 'parabel'],
      [
        'Identifiziere die quadratische Funktion: f(x) = -3x² + 12.',
        'Lies den Vorfaktor a ab: a = -3.',
        'Prüfe das Vorzeichen: a < 0.',
        'Regel: a < 0 → die Parabel ist nach unten geöffnet.',
      ]
    ),
  ],
};

const ableitung: Topic = {
  id: 'ableitung',
  title: 'Ableitung',
  summary: 'Differentialrechnung — die Ableitung als Steigung des Graphen.',
  lesson: {
    intro:
      'Die Ableitung f\'(x) beschreibt die momentane Steigung einer Funktion. Sie ist die Grundlage für Kurvendiskussion und Optimierung.',
    rules: [
      {
        title: 'Potenzregel',
        body: 'f(x) = xⁿ → f\'(x) = n·xⁿ⁻¹. Der Exponent wandert nach vorne als Faktor, der neue Exponent ist um 1 kleiner.',
        examples: [
          'f(x) = x⁵ → f\'(x) = 5x⁴',
          'f(x) = x³ → f\'(x) = 3x²',
          'f(x) = x → f\'(x) = 1',
          'f(x) = const → f\'(x) = 0',
        ],
      },
      {
        title: 'Summenregel',
        body: 'Die Ableitung einer Summe ist die Summe der Ableitungen: (f + g)\'(x) = f\'(x) + g\'(x).',
        examples: [
          'f(x) = 3x² + 2x → f\'(x) = 6x + 2',
          'f(x) = x⁴ - 5x² + 7 → f\'(x) = 4x³ - 10x',
        ],
      },
      {
        title: 'Produktregel',
        body: '(u·v)\' = u\'·v + u·v\'. Wird verwendet, wenn zwei Funktionen multipliziert werden.',
        examples: [
          'f(x) = x² · sin(x)',
          'f\'(x) = 2x · sin(x) + x² · cos(x)',
        ],
      },
      {
        title: 'Kettenregel',
        body: '(f(g(x)))\' = f\'(g(x)) · g\'(x). Innere Ableitung mit der äußeren multiplizieren.',
        examples: [
          'f(x) = (3x + 2)⁵',
          'f\'(x) = 5(3x + 2)⁴ · 3 = 15(3x + 2)⁴',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'a1',
      'Was ist die Ableitung von f(x) = x⁴?',
      "f'(x) = 4x³",
      ["f'(x) = x³", "f'(x) = 4x⁴", "f'(x) = 3x⁴"],
      'Potenzregel: x⁴ → 4x³ (Exponent nach vorne, neuer Exponent -1).',
      1,
      ['ableitung', 'potenzregel'],
      [
        'Erkenne die Funktion als Potenz: f(x) = x⁴.',
        'Wende die Potenzregel an: f(x) = xⁿ → f\'(x) = n · xⁿ⁻¹.',
        'Setze n = 4 ein: f\'(x) = 4 · x⁴⁻¹.',
        'Vereinfache den Exponenten: 4 - 1 = 3.',
        'Ergebnis: f\'(x) = 4x³.',
      ]
    ),
    makeMcq(
      'a2',
      "Was ist f'(x) von f(x) = 3x² + 5x?",
      "f'(x) = 6x + 5",
      ["f'(x) = 3x + 5", "f'(x) = 6x", "f'(x) = 3x² + 5"],
      'Summen- und Potenzregel: 3x² → 6x, 5x → 5. Konstante 0 fällt weg.',
      2,
      ['ableitung', 'summenregel'],
      [
        'Identifiziere die Summanden: 3x² und 5x.',
        'Wende die Summenregel an: jede Summe wird einzeln abgeleitet.',
        'Leite 3x² ab mit Potenzregel: 3 · 2 · x¹ = 6x.',
        'Leite 5x ab mit Potenzregel: 5 · 1 · x⁰ = 5.',
        'Addiere die Teilergebnisse: f\'(x) = 6x + 5.',
      ]
    ),
    makeMcq(
      'a3',
      'Was ist die Ableitung einer Konstanten c?',
      '0',
      ['c', '1', '-c'],
      'Die Steigung einer konstanten Funktion ist immer 0.',
      1,
      ['ableitung', 'konstante'],
      [
        'Eine konstante Funktion hat die Form f(x) = c (zum Beispiel f(x) = 5).',
        'Ihr Graph ist eine horizontale Gerade.',
        'Die Steigung einer horizontalen Geraden ist null.',
        'Daher: f\'(x) = 0.',
      ]
    ),
    makeMcq(
      'a4',
      'Was ist die Ableitung von f(x) = sin(x)?',
      "f'(x) = cos(x)",
      ["f'(x) = -sin(x)", "f'(x) = -cos(x)", "f'(x) = tan(x)"],
      'Eine der wichtigen Grundableitungen: sin(x) → cos(x).',
      3,
      ['ableitung', 'trigonometrie'],
      [
        'Erkenne die trigonometrische Grundfunktion f(x) = sin(x).',
        'Die Grundableitung von sin(x) ist cos(x).',
        'Eselsbrücke: sin → cos → -sin → -cos → sin (zyklisch).',
        'Ergebnis: f\'(x) = cos(x).',
      ]
    ),
    makeMcq(
      'a5',
      'Berechne die Ableitung von f(x) = (2x + 1)³.',
      "f'(x) = 6(2x + 1)²",
      ["f'(x) = 3(2x + 1)²", "f'(x) = (2x + 1)²", "f'(x) = 3·2·(2x + 1)² = 6(2x+1)²"],
      'Kettenregel: 3(2x + 1)² · 2 = 6(2x + 1)².',
      3,
      ['ableitung', 'kettenregel'],
      [
        'Erkenne eine verkettete Funktion: außen x³, innen 2x + 1.',
        'Wende die Kettenregel an: f\'(x) = äußere Ableitung · innere Ableitung.',
        'Äußere Ableitung von (·)³ ist 3·(·)², also 3(2x + 1)².',
        'Innere Ableitung von 2x + 1 ist 2.',
        'Multipliziere: 3(2x + 1)² · 2 = 6(2x + 1)².',
      ]
    ),
    makeMcq(
      'a6',
      'Wo hat f(x) = x² - 4x + 3 ein Minimum?',
      'Bei x = 2',
      ['Bei x = 0', 'Bei x = 4', 'Bei x = -2'],
      'f\'(x) = 2x - 4 = 0 → x = 2. Zweite Ableitung f\'\'(x) = 2 > 0 → Minimum.',
      3,
      ['ableitung', 'extremstelle'],
      [
        'Bilde die erste Ableitung: f\'(x) = 2x - 4.',
        'Setze die erste Ableitung gleich null (notwendige Bedingung): 2x - 4 = 0.',
        'Löse nach x auf: 2x = 4 → x = 2.',
        'Prüfe mit der zweiten Ableitung: f\'\'(x) = 2.',
        'f\'\'(2) = 2 > 0 → es ist ein Minimum (hinreichende Bedingung).',
      ]
    ),
  ],
};

const vektoren: Topic = {
  id: 'vektoren',
  title: 'Vektoren',
  summary: 'Vektorrechnung — Addition, Skalarmultiplikation und Skalarprodukt.',
  lesson: {
    intro:
      'Ein Vektor beschreibt eine gerichtete Größe mit Länge und Richtung. In der Oberstufe rechnen wir mit Vektoren im 2D- und 3D-Raum.',
    rules: [
      {
        title: 'Vektor-Addition',
        body: 'Komponentenweise addieren: (a₁, a₂) + (b₁, b₂) = (a₁ + b₁, a₂ + b₂).',
        examples: [
          '(3, 4) + (1, 2) = (4, 6)',
          '(5, -2) + (-3, 7) = (2, 5)',
        ],
      },
      {
        title: 'Skalarmultiplikation',
        body: 'Jede Komponente wird mit dem Skalar multipliziert: λ·(a₁, a₂) = (λ·a₁, λ·a₂).',
        examples: [
          '2·(3, 4) = (6, 8)',
          '-1·(3, 4) = (-3, -4) (Gegenvektor)',
        ],
      },
      {
        title: 'Betrag eines Vektors',
        body: 'Die Länge: |v| = √(a₁² + a₂²). Im 3D-Raum: |v| = √(a₁² + a₂² + a₃²).',
        examples: [
          '|(3, 4)| = √(9 + 16) = √25 = 5',
          '|(1, 2, 2)| = √(1 + 4 + 4) = √9 = 3',
        ],
      },
      {
        title: 'Skalarprodukt',
        body: 'a · b = a₁·b₁ + a₂·b₂ + a₃·b₃. Ist 0, dann stehen die Vektoren senkrecht zueinander.',
        examples: [
          '(1, 2) · (3, 4) = 3 + 8 = 11',
          '(2, -1) · (1, 2) = 2 - 2 = 0 → senkrecht!',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'v1',
      'Was ist (2, 3) + (4, 1)?',
      '(6, 4)',
      ['(8, 3)', '(2, 4)', '(6, 3)'],
      'Komponentenweise: (2+4, 3+1) = (6, 4).',
      1,
      ['vektor', 'addition'],
      [
        'Schreibe beide Vektoren untereinander: (2, 3) und (4, 1).',
        'Addiere die erste Komponente: 2 + 4 = 6.',
        'Addiere die zweite Komponente: 3 + 1 = 4.',
        'Ergebnis: (6, 4).',
      ]
    ),
    makeMcq(
      'v2',
      'Was ist der Betrag des Vektors (3, 4)?',
      '5',
      ['7', '25', '√7'],
      '|v| = √(3² + 4²) = √(9 + 16) = √25 = 5.',
      1,
      ['vektor', 'betrag'],
      [
        'Notiere die Formel für den Betrag im 2D: |v| = √(a₁² + a₂²).',
        'Setze die Komponenten ein: a₁ = 3, a₂ = 4.',
        'Berechne die Quadrate: 3² = 9 und 4² = 16.',
        'Addiere: 9 + 16 = 25.',
        'Ziehe die Wurzel: √25 = 5.',
      ]
    ),
    makeMcq(
      'v3',
      'Was ist 3·(2, -1)?',
      '(6, -3)',
      ['(5, 2)', '(6, -1)', '(2, -3)'],
      'Skalarmultiplikation: jede Komponente mal 3.',
      1,
      ['vektor', 'skalarmultiplikation'],
      [
        'Notiere die Regel: λ·(a₁, a₂) = (λ·a₁, λ·a₂).',
        'Multipliziere die erste Komponente mit 3: 3 · 2 = 6.',
        'Multipliziere die zweite Komponente mit 3: 3 · (-1) = -3.',
        'Fasse zusammen: (6, -3).',
      ]
    ),
    makeMcq(
      'v4',
      'Was ist das Skalarprodukt (1, 2, 3) · (4, 5, 6)?',
      '32',
      ['15', '6', '62'],
      '1·4 + 2·5 + 3·6 = 4 + 10 + 18 = 32.',
      2,
      ['vektor', 'skalarprodukt'],
      [
        'Notiere die Formel: a · b = a₁·b₁ + a₂·b₂ + a₃·b₃.',
        'Berechne das Produkt der ersten Komponenten: 1 · 4 = 4.',
        'Berechne das Produkt der zweiten Komponenten: 2 · 5 = 10.',
        'Berechne das Produkt der dritten Komponenten: 3 · 6 = 18.',
        'Summiere: 4 + 10 + 18 = 32.',
      ]
    ),
    makeMcq(
      'v5',
      'Welche Vektoren sind senkrecht zueinander?',
      '(3, 0) und (0, 5)',
      ['(1, 2) und (2, 4)', '(3, 1) und (1, 3)', '(1, 1) und (1, 1)'],
      'Skalarprodukt = 0 → (3)(0) + (0)(5) = 0 → senkrecht.',
      3,
      ['vektor', 'orthogonal'],
      [
        'Merke: Zwei Vektoren stehen senkrecht zueinander, wenn ihr Skalarprodukt 0 ist.',
        'Berechne das Skalarprodukt von (3, 0) und (0, 5): 3·0 + 0·5 = 0.',
        'Das Ergebnis ist 0 → die Vektoren sind senkrecht.',
        'Probe der anderen: (1,2)·(2,4) = 2+8 = 10 ≠ 0; (3,1)·(1,3) = 3+3 = 6 ≠ 0; (1,1)·(1,1) = 2 ≠ 0.',
        'Nur (3, 0) und (0, 5) erfüllen die Bedingung.',
      ]
    ),
    makeMcq(
      'v6',
      'Was ist der Betrag des Vektors (1, 2, 2)?',
      '3',
      ['5', '√6', '6'],
      '|v| = √(1 + 4 + 4) = √9 = 3.',
      2,
      ['vektor', 'betrag'],
      [
        'Notiere die Formel für den Betrag im 3D: |v| = √(a₁² + a₂² + a₃²).',
        'Setze die Komponenten ein: a₁ = 1, a₂ = 2, a₃ = 2.',
        'Quadriere jede Komponente: 1² = 1, 2² = 4, 2² = 4.',
        'Summiere: 1 + 4 + 4 = 9.',
        'Ziehe die Wurzel: √9 = 3.',
      ]
    ),
  ],
};

const stochastik: Topic = {
  id: 'stochastik',
  title: 'Stochastik',
  summary: 'Wahrscheinlichkeitsrechnung — Laplace, bedingte Wahrscheinlichkeit, Erwartungswert.',
  lesson: {
    intro:
      'Die Stochastik beschäftigt sich mit Zufall und Wahrscheinlichkeit. In der Oberstufe lernst du, Wahrscheinlichkeiten zu berechnen und zu interpretieren.',
    rules: [
      {
        title: 'Laplace-Wahrscheinlichkeit',
        body: 'P(E) = Anzahl günstiger Ergebnisse / Anzahl möglicher Ergebnisse. Nur bei Laplace-Experimenten anwendbar (alle Ergebnisse gleich wahrscheinlich).',
        examples: [
          'Würfel: P(gerade Zahl) = 3/6 = 1/2',
          'Münzwurf: P(Kopf) = 1/2',
          'Kartenspiel (32 Karten): P(Ass) = 4/32 = 1/8',
        ],
      },
      {
        title: 'Gegenereignis',
        body: 'P(Ē) = 1 - P(E). Die Wahrscheinlichkeit, dass E nicht eintritt.',
        examples: [
          'P(kein Sechser beim Würfeln) = 1 - 1/6 = 5/6',
          'P(mindestens 1 Treffer bei 3 Versuchen)',
        ],
      },
      {
        title: 'Bedingte Wahrscheinlichkeit',
        body: 'P(A|B) = P(A ∩ B) / P(B). Die Wahrscheinlichkeit von A unter der Bedingung, dass B eingetreten ist.',
        examples: [
          'Aus einer Urne mit 3 roten und 2 blauen Kugeln: P(rot|gezogen wurde überhaupt eine Kugel) = 3/5',
        ],
      },
      {
        title: 'Erwartungswert',
        body: 'E(X) = Σ xᵢ · P(xᵢ). Was auf lange Sicht als Mittelwert herauskommt.',
        examples: [
          'Spiel: Gewinn 10€ mit P=0.3, Verlust 5€ mit P=0.7 → E = 10·0.3 - 5·0.7 = 3 - 3.5 = -0.5€ (Verlust)',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      's1',
      'Wie groß ist die Wahrscheinlichkeit, beim Würfeln eine 6 zu bekommen?',
      '1/6',
      ['1/3', '1/4', '1/5'],
      'Laplace: 1 günstiges / 6 mögliche = 1/6.',
      1,
      ['stochastik', 'laplace'],
      [
        'Identifiziere das Zufallsexperiment: einmal Würfeln.',
        'Bestimme die möglichen Ergebnisse: {1, 2, 3, 4, 5, 6}, also 6 Stück.',
        'Bestimme die günstigen Ergebnisse: nur die 6, also 1 Stück.',
        'Wende die Laplace-Formel an: P = günstige / mögliche.',
        'Ergebnis: P = 1/6.',
      ]
    ),
    makeMcq(
      's2',
      'Was ist die Gegenwahrscheinlichkeit zu P = 0.3?',
      '0.7',
      ['0.3', '-0.3', '1.3'],
      'P(Ē) = 1 - P(E) = 1 - 0.3 = 0.7.',
      1,
      ['stochastik', 'gegenereignis'],
      [
        'Merke die Regel: Die Summe der Wahrscheinlichkeit eines Ereignisses und seines Gegenereignisses ist 1.',
        'Formel: P(Ē) = 1 - P(E).',
        'Setze P(E) = 0.3 ein.',
        'Berechne: 1 - 0.3 = 0.7.',
      ]
    ),
    makeMcq(
      's3',
      'Eine Urne hat 4 rote und 6 blaue Kugeln. P(rot)?',
      '2/5',
      ['4/6', '1/4', '4/10'],
      'P(rot) = 4/10 = 2/5.',
      1,
      ['stochastik', 'laplace'],
      [
        'Bestimme die Gesamtzahl der Kugeln: 4 + 6 = 10.',
        'Bestimme die Anzahl der günstigen Kugeln (rote): 4.',
        'Wende die Laplace-Formel an: P(rot) = 4/10.',
        'Kürze den Bruch: 4/10 = 2/5.',
      ]
    ),
    makeMcq(
      's4',
      'Wie viele mögliche Ergebnisse hat der gleichzeitige Wurf von 2 Münzen?',
      '4',
      ['2', '6', '8'],
      'Jede Münze hat 2 Seiten → 2·2 = 4 Ergebnisse: KK, KZ, ZK, ZZ.',
      2,
      ['stochastik', 'kombinatorik'],
      [
        'Bestimme die Möglichkeiten pro Münze: Kopf oder Zahl, also 2.',
        'Verwende die Zählregel: zwei unabhängige Würfe → 2 · 2.',
        'Berechne: 2 · 2 = 4.',
        'Aufzählung zur Kontrolle: KK, KZ, ZK, ZZ — vier Kombinationen.',
      ]
    ),
    makeMcq(
      's5',
      'Ein Spiel kostet 2€. Mit P=0.25 gewinnt man 6€, sonst nichts. Erwartungswert?',
      '-0.50 €',
      ['+1.00 €', '+4.00 €', '0 €'],
      'E = 0.25·(6-2) + 0.75·(0-2) = 0.25·4 + 0.75·(-2) = 1 - 1.5 = -0.5.',
      3,
      ['stochastik', 'erwartungswert'],
      [
        'Definiere die Zufallsvariable X = Gewinn (Einsatz abgezogen).',
        'Fall 1: Gewinn mit P = 0.25 → X = 6 - 2 = 4 €.',
        'Fall 2: Verlust mit P = 0.75 → X = 0 - 2 = -2 €.',
        'Berechne den Erwartungswert: E(X) = 0.25 · 4 + 0.75 · (-2).',
        'Rechne aus: 1 - 1.5 = -0.5 €. Das Spiel ist langfristig ungünstig.',
      ]
    ),
    makeMcq(
      's6',
      'Wie groß ist die Wahrscheinlichkeit, mit 2 Würfeln die Summe 7 zu würfeln?',
      '6/36 = 1/6',
      ['1/12', '2/36', '7/36'],
      'Günstige Paare: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 Stück. 6/36 = 1/6.',
      3,
      ['stochastik', 'kombinatorik'],
      [
        'Bestimme die Gesamtzahl der möglichen Würfe: 6 · 6 = 36.',
        'Suche alle Paare (a, b) mit a + b = 7.',
        'Liste auf: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) — 6 Stück.',
        'Berechne die Wahrscheinlichkeit: P = 6/36.',
        'Kürze: 6/36 = 1/6.',
      ]
    ),
  ],
};

// ─── Lineare Algebra II (NEU für Abitur) ────────────────────────────────────
// Matrisler, Determinanten, Gauss-Verfahren, Eigenvektorlar
// NRW Zentralabitur: Pflichtthema Analysis & Lineare Algebra

const lineareAlgebra2: Topic = {
  id: 'lineare-algebra-2',
  title: 'Lineare Algebra II',
  summary: 'Matrisler, Determinanten, Gauss-Jordan, Eigenvektorlar — Abitur-Pflichtthema.',
  lesson: {
    intro: 'Matrisler, Determinanten ve Eigenvektorlar — bunlar Lineare Algebra\'nın temel araçları. NRW Abi Lineare Algebra bölümünde zorunlu olarak karşımıza çıkıyor. Bu bölümde matrislerle hesap yapma, lineer denklem sistemlerini çözme ve basit Eigenwert problemlerini öğreneceksin.',
    rules: [
      {
        title: 'Matrix-Multiplikation (Matris çarpımı)',
        body: 'Zwei Matrizen A (m×n) und B (n×p) können multipliziert werden. Das Ergebnis C = A·B hat Dimension m×p. Eintrag cᵢⱼ = Σₖ aᵢₖ · bₖⱼ.',
        examples: [
          'Eine 2×3-Matrix kann mit einer 3×2-Matrix multipliziert werden → Ergebnis ist 2×2.',
          'Matris çarpımı sıraya bağlıdır: A·B ≠ B·A (genelde).',
          'Her Matrix hat bir birim matrisi I ile çarpılırsa kendisi verir.',
        ],
      },
      {
        title: 'Determinante (2×2)',
        body: 'Eine 2×2-Matrix A = ((a, b), (c, d)) hat Determinante det(A) = a·d − b·c.',
        examples: [
          'det((1,2),(3,4)) = 1·4 − 2·3 = 4 − 6 = −2.',
          'Wenn det(A) = 0, dann ist A nicht invertierbar (tekil).',
        ],
      },
      {
        title: 'Determinante (3×3, Sarrus-Regel)',
        body: 'Für eine 3×3-Matrix: erste zwei Spalten rechts daneben schreiben, drei positive Diagonalprodukte summieren, drei negative subtrahieren.',
        examples: [
          'det((1,2,3),(4,5,6),(7,8,9)) = (1·5·9 + 2·6·7 + 3·4·8) − (3·5·7 + 2·4·9 + 1·6·8) = 0.',
          'det = 0 → Matris singüler, LGS keine eindeutige Lösung.',
        ],
      },
      {
        title: 'Inverse Matrix (Ters Matris)',
        body: 'A⁻¹ existiert nur wenn det(A) ≠ 0. Für 2×2: A⁻¹ = (1/det(A)) · ((d,−b),(−c,a)).',
        examples: [
          'A = ((1,2),(3,4)), det = −2. A⁻¹ = −½ · ((4,−2),(−3,1)) = ((−2,1),(1.5,−0.5)).',
        ],
      },
      {
        title: 'LGS mit Gauss-Verfahren (Lineer denklem sistemleri)',
        body: 'Lineares Gleichungssystem als erweiterte Matrix (A|b). Mit Zeilenoperationen Dreiecksform herstellen. Dann von unten nach oben lösen.',
        examples: [
          'Pivot: erste Zeile unverändert. Zweite Zeile: −(a₂₁/a₁₁)·Zeile₁ + Zeile₂.',
          'Rücksubstitution: letzte Variable aus der letzten Zeile, dann zurück.',
        ],
      },
      {
        title: 'Eigenvektorlar (Temel)',
        body: 'Für eine Matrix A: A·v = λ·v, wobei λ Eigenwert und v Eigenvektor ist. Bestimme Eigenwerte aus det(A − λ·I) = 0.',
        examples: [
          'A = ((2,1),(1,2)). Charakteristisches Polynom: (2−λ)² − 1 = 0 → λ² − 4λ + 3 = 0 → λ = 1 oder λ = 3.',
        ],
      },
    ],
  },
  questions: [
    // Matris Grundlagen
    makeMcq('la1', 'Was ist die Dimension einer Matrix mit 3 Zeilen und 4 Spalten?',
      '3×4-Matrix', ['4×3-Matrix', '3+4-Matrix', 'Quadratische Matrix'],
      'Eine Matrix mit m Zeilen und n Spalten heißt „m×n-Matrix". 3 Zeilen und 4 Spalten → 3×4.',
      1, ['matrix', 'dimension']),
    makeMcq('la2', 'Wann können zwei Matrizen A und B multipliziert werden?',
      'Wenn die Spaltenanzahl von A gleich der Zeilenanzahl von B ist.',
      ['Wenn beide gleich groß sind', 'Wenn beide quadratisch sind', 'Wenn beide Determinante 0 haben'],
      'A (m×n) · B (n×p) = C (m×p). Die „inneren Dimensionen" (n) müssen gleich sein.',
      2, ['matrix', 'multiplikation']),

    // Determinanten
    makeMcq('la3', 'Wie berechnet man die Determinante einer 2×2-Matrix ((a, b), (c, d))?',
      'det = a·d − b·c', ['det = a·c + b·d', 'det = a·d + b·c', 'det = a·b − c·d'],
      'Sarrus-Regel für 2×2: ad − bc. Das ist die Standardformel.',
      2, ['determinante']),
    makeMcq('la4', 'Berechne det(((3, 1), (2, 4))).',
      '10', ['14', '5', '−2'],
      'det = 3·4 − 1·2 = 12 − 2 = 10.',
      1, ['determinante']),
    makeMcq('la5', 'Was bedeutet det(A) = 0?',
      'Die Matrix A ist singulär und nicht invertierbar.',
      ['A ist die Einheitsmatrix', 'A hat nur positive Einträge', 'A ist symmetrisch'],
      'det = 0 → singulär → A⁻¹ existiert nicht → LGS A·x = b hat keine eindeutige Lösung.',
      2, ['determinante']),
    makeMcq('la6', 'Berechne die Determinante von ((1, 2, 3), (4, 5, 6), (7, 8, 9)).',
      '0', ['1', '−18', '42'],
      'Mit Sarrus: (1·5·9 + 2·6·7 + 3·4·8) − (3·5·7 + 2·4·9 + 1·6·8) = (45+84+96) − (105+72+48) = 225 − 225 = 0. Die Zeilen sind linear abhängig!',
      3, ['determinante', 'sarrus']),

    // LGS / Gauss
    makeMcq('la7', 'Was ist das Ziel des Gauss-Verfahrens?',
      'Das LGS in Dreiecksform (Stufenform) zu bringen, um von unten nach oben zu lösen.',
      ['Die Matrix zu invertieren', 'Die Determinante zu berechnen', 'Eigenwerte zu finden'],
      'Durch Zeilenoperationen (Vertauschen, Multiplizieren, Addieren) wird das System in eine einfache Form gebracht.',
      2, ['gauss', 'lgs']),
    makeMcq('la8', 'Welche Zeilenoperation ist beim Gauss-Verfahren NICHT erlaubt?',
      'Eine Zeile mit einer anderen Zeile tauschen — das IST erlaubt.',
      ['Eine Zeile mit einer Zahl ≠ 0 multiplizieren', 'Zwei Zeilen vertauschen', 'Vielfache einer Zeile zu einer anderen addieren'],
      'Alle drei Operationen sind erlaubt beim Gauss-Verfahren. Eine Zeile mit 0 zu multiplizieren ist sinnlos.',
      2, ['gauss']),
    makeMcq('la9', 'Ein LGS hat unendlich viele Lösungen, wenn…',
      '…der Rang der Koeffizientenmatrix kleiner ist als die Anzahl der Variablen.',
      ['…die Determinante ungleich 0 ist', '…mehr Gleichungen als Variablen vorhanden sind', '…alle Variablen positiv sind'],
      'Bei einem unterbestimmten System (mehr Variablen als unabhängige Gleichungen) gibt es eine oder mehrere freie Variablen → Lösungsmenge ist eine Gerade oder Ebene.',
      3, ['lgs', 'loesung']),
    makeMcq('la10', 'Welche Aussage über das LGS A·x = b ist richtig?',
      'Wenn det(A) ≠ 0, dann hat das System genau eine Lösung.',
      ['Es gibt immer genau eine Lösung', 'Es gibt niemals eine Lösung', 'Die Lösung hängt nicht von b ab'],
      'Bei det(A) ≠ 0 ist A invertierbar → x = A⁻¹·b ist die eindeutige Lösung.',
      2, ['lgs', 'invers']),

    // Inverse Matrix
    makeMcq('la11', 'Wann existiert die inverse Matrix A⁻¹?',
      'Wenn det(A) ≠ 0.',
      ['Wenn A quadratisch ist', 'Wenn alle Einträge positiv sind', 'Wenn b der Nullvektor ist'],
      'Nur invertierbare Matrizen (det ≠ 0) haben ein Inverses.',
      2, ['invers']),
    makeMcq('la12', 'Wie berechnet man die inverse Matrix einer 2×2-Matrix A = ((a, b), (c, d))?',
      'A⁻¹ = (1/det(A)) · ((d, −b), (−c, a))',
      ['A⁻¹ = ((a, b), (c, d))', 'A⁻¹ = ((d, b), (c, a))', 'A⁻¹ = (−a, −b), (−c, −d)'],
      'Für 2×2: Vertausche Diagonalelemente (a↔d), negiere Nebendiagonalelemente (b, c), teile alles durch det(A).',
      3, ['invers', '2x2']),

    // Eigenwerte / Eigenvektoren
    makeMcq('la13', 'Was ist ein Eigenvektor einer Matrix A?',
      'Ein Vektor v ≠ 0 mit A·v = λ·v für einen Skalar λ (Eigenwert).',
      ['Ein Vektor mit Länge 1', 'Ein Vektor senkrecht zu A', 'Ein Spaltenvektor mit gleichen Einträgen'],
      'Eigenvektoren sind spezielle Vektoren, die durch Multiplikation mit A nur skaliert werden — ihre Richtung bleibt erhalten.',
      3, ['eigenvektor', 'definition']),
    makeMcq('la14', 'Wie findet man die Eigenwerte einer Matrix A?',
      'det(A − λ·I) = 0 setzen (charakteristisches Polynom lösen).',
      ['det(A) = 0 setzen', 'A·λ = 0 setzen', 'A·b = 0 setzen'],
      'Das charakteristische Polynom p(λ) = det(A − λ·I) liefert die Eigenwerte.',
      3, ['eigenwert', 'berechnung']),
    makeMcq('la15', 'Berechne die Eigenwerte von A = ((2, 1), (1, 2)).',
      'λ₁ = 1, λ₂ = 3', ['λ = 0, λ = 4', 'λ = −1, λ = 5', 'λ = 2, λ = 2'],
      'det(A − λ·I) = det(((2−λ, 1), (1, 2−λ))) = (2−λ)² − 1 = 0 → λ² − 4λ + 3 = 0 → λ = 1 oder λ = 3.',
      3, ['eigenwert', 'beispiel']),
    makeMcq('la16', 'Welche Bedeutung haben Eigenwerte in der Praxis?',
      'Sie beschreiben Resonanzfrequenzen, Wachstumsraten, Hauptachsen — überall wo Skalierung eine Rolle spielt.',
      ['Sie haben keine Bedeutung', 'Sie zählen die Einträge der Matrix', 'Sie bestimmen die Farbe der Matrix'],
      'Eigenwerte sind zentral in Physik (Schwingungen), Statistik (PCA), Google PageRank, Bildanalyse — überall wo lineare Strukturen wichtig sind.',
      3, ['eigenwert', 'anwendung']),

    // Anwendungen
    makeMcq('la17', 'Was beschreibt eine Übergangsmatrix (Markov-Matrix)?',
      'Die Wahrscheinlichkeitsübergänge zwischen Zuständen in einem stochastischen Prozess.',
      ['Die Steigung einer Funktion', 'Den Winkel zwischen Vektoren', 'Die Geschwindigkeit eines Autos'],
      'Eine Markov-Matrix hat nicht-negative Einträge und Spaltensumme 1. Sie beschreibt Übergänge zwischen Zuständen.',
      3, ['markov', 'anwendung']),
    makeMcq('la18', 'Was ist der stationäre Zustand einer Markov-Kette?',
      'Ein Vektor π mit M·π = π (also M·π = 1·π).',
      ['Der Zustand mit höchster Energie', 'Der Zustand, der nie erreicht wird', 'Der Zustand am Anfang'],
      'π ist Eigenvektor zum Eigenwert 1. Im langfristigen Verlauf konvergiert die Markov-Kette gegen diesen Zustand.',
      3, ['markov', 'eigenwert']),
    makeMcq('la19', 'Wozu dient die transponierte Matrix Aᵀ?',
      'Sie entsteht durch Vertauschen von Zeilen und Spalten — und ermöglicht Skalarprodukt-Schreibweise.',
      ['Sie macht die Matrix größer', 'Sie ist nur für quadratische Matrizen definiert', 'Sie ist immer die Nullmatrix'],
      '(A·x)·y = x·(Aᵀ·y). Das ist nützlich in vielen Beweisen und bei der Definition von symmetrischen Matrizen (A = Aᵀ).',
      2, ['transponiert', 'definition']),
    makeMcq('la20', 'Wann ist eine Matrix symmetrisch?',
      'Wenn A = Aᵀ (also Aᵢⱼ = Aⱼᵢ für alle i, j).',
      ['Wenn sie quadratisch ist', 'Wenn alle Einträge gleich sind', 'Wenn die Determinante 0 ist'],
      'Symmetrische Matrizen haben immer reelle Eigenwerte — das ist ein wichtiger Satz der Linearen Algebra.',
      3, ['symmetrisch', 'definition']),
    makeMcq('la21', 'Wie viele Lösungen hat ein quadratisches LGS A·x = b mit det(A) ≠ 0?',
      'Genau eine Lösung.',
      ['Unendlich viele', 'Keine', 'Kommt auf b an'],
      'Bei det ≠ 0 ist A invertierbar → x = A⁻¹·b ist eindeutig bestimmt.',
      2, ['lgs', 'determinante']),
    makeMcq('la22', 'Was ist die Einheitsmatrix I?',
      'Eine quadratische Matrix mit 1 auf der Diagonale und 0 sonst.',
      ['Eine Matrix mit lauter Nullen', 'Eine Matrix mit lauter Einsen', 'Eine Matrix mit der Zahl 1'],
      'I hat die Eigenschaft I·A = A·I = A. Sie ist das neutrale Element der Matrix-Multiplikation.',
      1, ['matrix', 'definition']),
    makeMcq('la23', 'Welche Operation gehört NICHT zum Gauss-Verfahren?',
      'Eine Zeile mit einer Konstanten addieren (außer Vielfaches einer anderen Zeile).',
      ['Zeilen vertauschen', 'Zeile mit einer Zahl multiplizieren', 'Vielfache einer Zeile zu einer anderen addieren'],
      'Beim elementaren Gauss-Verfahren sind nur drei Operationen erlaubt: Vertauschen, Multiplizieren, Vielfache addieren.',
      2, ['gauss']),
    makeMcq('la24', 'Was ist der Rang einer Matrix?',
      'Die Anzahl der linear unabhängigen Zeilen (oder Spalten).',
      ['Die Anzahl der Zeilen', 'Die Anzahl der Spalten', 'Die größte Zahl in der Matrix'],
      'Der Rang ist zentral für Lösbarkeit: LGS A·x = b ist lösbar genau dann, wenn rang(A) = rang(A|b).',
      3, ['rang', 'definition']),
    makeMcq('la25', 'Was bedeutet es, wenn das charakteristische Polynom p(λ) = det(A − λ·I) keine reellen Nullstellen hat?',
      'Die Matrix A hat keine reellen Eigenwerte (sondern nur komplexe).',
      ['Die Matrix A hat unendlich viele Eigenwerte', 'Die Matrix A ist die Nullmatrix', 'Die Matrix A hat Determinante 1'],
      'Bei symmetrischen Matrizen sind Eigenwerte immer reell. Bei nicht-symmetrischen Matrizen können sie komplex sein.',
      3, ['eigenwert', 'komplex']),
  ],
};

export const mathematikModule: Module = {
  id: 'mathematik',
  title: 'Mathematik',
  description: 'Funktionen, Ableitung, Vektoren, Stochastik — das Fundament für die Oberstufe.',
  icon: 'calculator',
  color: 'cyan',
  topics: [funktionen, ableitung, vektoren, stochastik, lineareAlgebra2],
};
