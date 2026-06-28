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
  summary: 'Laplace, Baumdiagramm, Binomialverteilung, Bernoulli-Ketten, Hypothesentest — NRW Abi Pflichtthema (Q1 + Q2).',
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
      {
        title: 'Baumdiagramm & Pfadregeln',
        body: 'Ein Baumdiagramm stellt mehrstufige Zufallsexperimente dar. Pfadregel 1 (Produktregel): entlang eines Pfades multiplizieren. Pfadregel 2 (Summenregel): Pfade eines Ereignisses addieren.',
        examples: [
          '2× Würfeln, beide 6: 1/6 · 1/6 = 1/36 (Pfadregel 1).',
          'Mindestens ein 6 bei 2 Würfen: 1 − 5/6 · 5/6 = 11/36 (Gegenereignis + Pfadregel 1).',
          'Pfade mit gerader Augensumme: alle "passenden" Pfade werden summiert (Pfadregel 2).',
        ],
      },
      {
        title: 'Bedingte Wahrscheinlichkeit & Unabhängigkeit',
        body: 'P(A|B) = P(A ∩ B) / P(B). Zwei Ereignisse sind unabhängig, wenn P(A ∩ B) = P(A) · P(B) gilt — dann ändert B die Wahrscheinlichkeit von A nicht.',
        examples: [
          'Karte ziehen ohne Zurücklegen: P(2. Karte ist Herz | 1. Karte war Herz) = 12/51 (12 Herz-Karten, 51 Karten übrig).',
          'Zwei Mal Würfeln: P(beide 6) = P(6) · P(6) = 1/36 — unabhängig.',
          'Satz von Bayes: P(A|B) = P(B|A) · P(A) / P(B) — kehrt bedingte W\'keit um.',
        ],
      },
      {
        title: 'Binomialverteilung & Bernoulli-Ketten',
        body: 'X ist binomialverteilt (X ~ B(n, p)), wenn X die Anzahl der Treffer bei n unabhängigen Bernoulli-Versuchen mit Trefferwahrscheinlichkeit p zählt. Erwartungswert E(X) = n·p, Standardabweichung σ = √(n·p·(1−p)).',
        examples: [
          '10 Würfe, p = 0,3: E = 3, σ = √(10·0,3·0,7) = √2,1 ≈ 1,45.',
          'P(X = k) = C(n, k) · p^k · (1−p)^(n−k).',
          'P(X = 4) bei n=10, p=0,5: C(10,4) · 0,5⁴ · 0,5⁶ = 210/1024 ≈ 0,205.',
        ],
      },
      {
        title: 'Hypothesentest',
        body: 'Statistisches Verfahren: Man prüft eine Nullhypothese H₀ anhand einer Stichprobe. Ablehnungsbereich = Werte, bei denen H₀ abgelehnt wird. Fehler 1. Art = H₀ ist wahr, wird aber abgelehnt (α). Fehler 2. Art = H₀ ist falsch, wird aber nicht abgelehnt (β).',
        examples: [
          'Münze scheint unfair. H₀: p = 0,5. Wir werfen 100-mal, zählen Treffer. Wenn Treffer ≤ 40 oder ≥ 60 → H₀ ablehnen (α = 5% ≈ 2σ).',
          'Fehler 1. Art: faire Münze wird als unfair abgestempelt.',
          'Fehler 2. Art: unfaire Münze wird übersehen.',
        ],
      },
      {
        title: 'Kombinatorik (Zählprinzipien)',
        body: 'Permutation: n! Möglichkeiten, n Objekte anzuordnen. Variation: n·(n−1)·... wenn Reihenfolge wichtig und ohne Wiederholung. Kombination C(n,k) = n!/(k!·(n−k)!), wenn Reihenfolge egal.',
        examples: [
          '5 Bücher im Regal: 5! = 120 Reihenfolgen.',
          '10 Personen, 2 Ämter (Vorsitz + Stellvertreter): 10·9 = 90 (Variation, Reihenfolge wichtig).',
          '6 Personen, 3-köpfige AG: C(6,3) = 20 (Kombination, Reihenfolge egal).',
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

    // ─── Baumdiagramm & Pfadregeln ──────────────────────────────────────────
    makeMcq(
      's7',
      'Was besagt die 1. Pfadregel (Produktregel) bei einem Baumdiagramm?',
      'Die Wahrscheinlichkeit eines Pfads ist das Produkt der Einzelwahrscheinlichkeiten entlang des Pfads.',
      ['Die Wahrscheinlichkeiten werden addiert', 'Es gibt keine Regel', 'Nur der erste Ast zählt'],
      'Pfadregel 1: Entlang eines Pfads werden die Wahrscheinlichkeiten multipliziert. Beispiel: 0,6 · 0,5 = 0,3.',
      1,
      ['stochastik', 'baumdiagramm'],
      [
        'Öffne das Baumdiagramm von oben nach unten.',
        'Multipliziere entlang jedes Pfads die Wahrscheinlichkeiten.',
        'Beispiel: Ast 1: 0,6, Ast 2 (von Ast 1): 0,5 → Pfad: 0,6 · 0,5 = 0,3.',
      ],
      { prompt: '1. Pfadregel ne der? Çarpma mı toplama mı?', explanation: 'Bir yol boyunca olasılıklar çarpılır. Örn: 0,6 · 0,5 = 0,3.', solutionSteps: ['Ağacı yukarıdan aşağı oku.', 'Her yolda olasılıkları çarp.', 'Örn: 0,6 · 0,5 = 0,3.'] }
    ),
    makeMcq(
      's8',
      'Was besagt die 2. Pfadregel (Summenregel)?',
      'Die Wahrscheinlichkeit eines Ereignisses ist die Summe der Wahrscheinlichkeiten aller zugehörigen Pfade.',
      ['Die Pfade werden multipliziert', 'Man nimmt nur den ersten Pfad', 'Man teilt durch die Anzahl der Pfade'],
      'Summenregel: Für ein Ereignis werden alle Pfade addiert, die zum Ereignis gehören.',
      2,
      ['stochastik', 'baumdiagramm'],
      [
        'Identifiziere alle Pfade, die zum gewünschten Ereignis gehören.',
        'Addiere die Wahrscheinlichkeiten dieser Pfade.',
        'Beispiel: P(A) = 0,3 + 0,2 = 0,5.',
      ],
      { prompt: '2. Pfadregel ne der? Toplama.', explanation: 'Bir olayın yollarının olasılıkları toplanır.', solutionSteps: ['Olayı oluşturan yolları bul.', 'Olasılıkları topla.', 'Örn: P(A) = 0,3 + 0,2 = 0,5.'] }
    ),
    makeMcq(
      's9',
      'Aus einer Urne mit 3 roten und 2 schwarzen Kugeln wird zweimal OHNE Zurücklegen gezogen. Wie groß ist P(rot, dann schwarz)?',
      '3/10',
      ['6/25', '1/5', '3/5'],
      'Ohne Zurücklegen: P(rot zuerst) = 3/5. Dann sind noch 4 Kugeln da, davon 2 schwarz. P(schwarz | rot gezogen) = 2/4. Pfad: 3/5 · 2/4 = 6/20 = 3/10.',
      2,
      ['stochastik', 'baumdiagramm', 'ziehen'],
      [
        'Bestimme P(rot zuerst) = 3/5.',
        'Ohne Zurücklegen: 4 Kugeln bleiben, 2 schwarz.',
        'P(schwarz danach) = 2/4 = 1/2.',
        'Pfadregel 1: 3/5 · 1/2 = 3/10.',
      ],
      { prompt: 'Yerine koymadan: 3 kırmızı + 2 siyah, 2 kez çek. İlk kırmızı sonra siyah?', explanation: 'P(kırmızı) = 3/5, sonra 4 top kalır → P(siyah) = 2/4. Çarp: 3/5 · 1/2 = 3/10.', solutionSteps: ['İlk çekiş: 3/5.', 'Yerine koymadan: 4 top kalır, 2 siyah.', 'P(siyah|önce kırmızı) = 2/4.', 'Çarp: 3/5 · 1/2 = 3/10.'] }
    ),
    makeMcq(
      's10',
      'Aus einer Urne mit 3 roten und 2 schwarzen Kugeln wird zweimal MIT Zurücklegen gezogen. Wie groß ist P(beide rot)?',
      '9/25',
      ['6/20', '3/5', '6/25'],
      'Mit Zurücklegen sind die Ziehungen unabhängig. P(rot) bleibt bei 3/5. Pfad: 3/5 · 3/5 = 9/25.',
      2,
      ['stochastik', 'baumdiagramm', 'ziehen'],
      [
        'Mit Zurücklegen → jedes Mal wieder 5 Kugeln.',
        'P(rot) bleibt konstant bei 3/5.',
        'Pfadregel 1: 3/5 · 3/5 = 9/25.',
      ],
      { prompt: 'Yerine koyarak: 3 kırmızı + 2 siyah, 2 kez çek. İkisi de kırmızı?', explanation: 'Bağımsız çekiliş. P(kırmızı) = 3/5 kalır. Çarp: 3/5 · 3/5 = 9/25.', solutionSteps: ['Yerine koyunca hep 5 top.', 'P(kırmızı) hep 3/5.', 'Çarp: 3/5 · 3/5 = 9/25.'] }
    ),

    // ─── Bedingte Wahrscheinlichkeit & Vierfeldertafel ──────────────────────
    makeMcq(
      's11',
      'Wie ist die bedingte Wahrscheinlichkeit P(A|B) definiert?',
      'P(A|B) = P(A ∩ B) / P(B)',
      ['P(A|B) = P(A) · P(B)', 'P(A|B) = P(A) + P(B)', 'P(A|B) = P(B) / P(A)'],
      'Die bedingte Wahrscheinlichkeit P(A|B) gibt die Wahrscheinlichkeit von A an, wenn B bereits eingetreten ist. Formel: P(A ∩ B) / P(B).',
      2,
      ['stochastik', 'bedingt'],
      [
        'Definition: P(A|B) = Wahrscheinlichkeit von A, gegeben B.',
        'Formel: P(A ∩ B) / P(B).',
        'Voraussetzung: P(B) > 0.',
        'Beispiel: P(König|Karte ist Herz) = 1/13 (1 König in 13 Herz-Karten).',
      ],
      { prompt: 'Koşullu olasılık P(A|B) formülü?', explanation: 'P(A ∩ B) / P(B). B gerçekleştiğinde A olasılığı.', solutionSteps: ['Tanım: B olmuşken A.', 'Formül: P(A ∩ B) / P(B).', 'P(B) > 0 olmalı.'] }
    ),
    makeMcq(
      's12',
      'In einer Klasse sind 12 Mädchen und 8 Jungen. 5 Mädchen und 4 Jungen haben eine 1 in Mathe. P(Mädchen | 1 in Mathe)?',
      '5/9',
      ['12/20', '5/12', '1/2'],
      'P(M ∩ 1) = 5/20. P(1) = 9/20. P(M | 1) = (5/20) / (9/20) = 5/9.',
      3,
      ['stochastik', 'bedingt', 'vierfeldertafel'],
      [
        'Erstelle Vierfeldertafel: 12 Mädchen, 8 Jungen, 5+4 = 9 mit Note 1.',
        'Bestimme P(M ∩ 1) = 5/20.',
        'Bestimme P(1) = 9/20.',
        'Anwenden: P(M | 1) = (5/20) / (9/20) = 5/9.',
      ],
      { prompt: '12 kız + 8 erkek. 5 kız ve 4 erkek matematikten 1 aldı. P(kız | 1)?', explanation: 'P(K ∩ 1) = 5/20, P(1) = 9/20. Oran: 5/9.', solutionSteps: ['Dört alanlı tablo.', 'P(K ∩ 1) = 5/20.', 'P(1) = 9/20.', 'Böl: 5/20 ÷ 9/20 = 5/9.'] }
    ),
    makeMcq(
      's13',
      'Was ist der Satz von Bayes (einfache Form)?',
      'P(A|B) = P(B|A) · P(A) / P(B)',
      ['P(A|B) = P(A) + P(B)', 'P(A|B) = P(A) · P(B)', 'P(A|B) = P(B)'],
      'Bayes erlaubt das Umkehren der bedingten Wahrscheinlichkeit: wenn man P(B|A) kennt, kann man P(A|B) berechnen.',
      3,
      ['stochastik', 'bayes', 'bedingt'],
      [
        'Bayes-Formel: P(A|B) = P(B|A) · P(A) / P(B).',
        'Anwendung: Medizinische Tests, Vorhersagen.',
        'Beispiel: Krankheit hat 1% Vorkommen, Test ist 99% genau, dann P(krank|positiv) ist trotzdem nicht 99%.',
      ],
      { prompt: 'Bayes formülü?', explanation: 'P(A|B) = P(B|A) · P(A) / P(B). Ters koşullu olasılık hesabı.', solutionSteps: ['Formül: P(A|B) = P(B|A)·P(A) / P(B).', 'Tıbbi test, öngörü.', 'P(hasta|test+) P(hasta) değil!'] }
    ),

    // ─── Stochastische Unabhängigkeit ───────────────────────────────────────
    makeMcq(
      's14',
      'Wann heißen zwei Ereignisse A und B stochastisch unabhängig?',
      'Wenn P(A ∩ B) = P(A) · P(B) gilt.',
      ['Wenn P(A) = P(B) ist', 'Wenn A und B sich gegenseitig ausschließen', 'Wenn P(A ∪ B) = 1 ist'],
      'Unabhängigkeit bedeutet: das Eintreten von B verändert die Wahrscheinlichkeit von A nicht. Formal: P(A ∩ B) = P(A) · P(B).',
      2,
      ['stochastik', 'unabhaengigkeit'],
      [
        'Definition: P(A ∩ B) = P(A) · P(B).',
        'Bedeutet: A und B beeinflussen sich nicht.',
        'Beispiel: Zweimaliges Würfeln — die Ergebnisse sind unabhängig.',
      ],
      { prompt: 'Bağımsızlık tanımı?', explanation: 'P(A ∩ B) = P(A) · P(B). A ve B birbirini etkilemez.', solutionSteps: ['Formül: P(A ∩ B) = P(A) · P(B).', 'Bağımsız → birbirini etkilemez.', 'Örn: iki zar atışı.'] }
    ),
    makeMcq(
      's15',
      'Zwei Ereignisse sind stochastisch unabhängig, wenn gilt: P(A|B) = ?',
      'P(A)',
      ['P(B)', 'P(A ∩ B)', '0'],
      'Unabhängigkeit bedeutet: die Bedingung B ändert die Wahrscheinlichkeit von A nicht. Also P(A|B) = P(A).',
      2,
      ['stochastik', 'unabhaengigkeit'],
      [
        'Aus P(A|B) = P(A ∩ B) / P(B) und Unabhängigkeit P(A ∩ B) = P(A)·P(B) folgt P(A|B) = P(A).',
      ],
      { prompt: 'Bağımsızsa P(A|B) ne?', explanation: 'P(A|B) = P(A). Koşul değiştirmez.', solutionSteps: ['P(A|B) = P(A∩B)/P(B) = P(A)·P(B)/P(B) = P(A).'] }
    ),

    // ─── Binomialverteilung ─────────────────────────────────────────────────
    makeMcq(
      's16',
      'Wann ist eine Zufallsvariable X binomialverteilt?',
      'Wenn sie die Anzahl der Treffer bei n unabhängigen Bernoulli-Versuchen mit gleicher Trefferwahrscheinlichkeit p zählt.',
      ['Wenn nur ein Versuch gemacht wird', 'Wenn alle Ergebnisse verschieden sind', 'Wenn die Summe immer 1 ist'],
      'Bernoulli-Kette: n Versuche, jeder mit Erfolg/Misserfolg, gleiche p. X = Anzahl Erfolge ist binomialverteilt mit Parametern n und p.',
      2,
      ['stochastik', 'binomial'],
      [
        'Bernoulli-Bedingungen: feste Anzahl n, unabhängig, gleiche Trefferwahrscheinlichkeit p.',
        'X = Anzahl der Treffer.',
        'Schreibweise: X ~ B(n, p).',
      ],
      { prompt: 'Binomial dağılım koşulu?', explanation: 'n bağımsız Bernoulli denemesi, sabit p. X = başarı sayısı.', solutionSteps: ['Sabit n.', 'Bağımsız.', 'Sabit p.', 'X ~ B(n, p).'] }
    ),
    makeMcq(
      's17',
      'Wie berechnet man den Erwartungswert einer binomialverteilten Zufallsvariable?',
      'E(X) = n · p',
      ['E(X) = n / p', 'E(X) = √(n·p)', 'E(X) = n + p'],
      'Erwartungswert einer Binomialverteilung: E(X) = n · p. Beispiel: 100 Würfe mit p=0,5 → E(X) = 50.',
      1,
      ['stochastik', 'binomial', 'erwartungswert'],
      [
        'Formel: E(X) = n · p.',
        'Beispiel: 10 Würfe, p = 0,3 → E = 3.',
        'Beispiel: 100 Würfe, p = 0,5 → E = 50.',
      ],
      { prompt: 'Binomial X için E(X)?', explanation: 'E(X) = n · p. Örn: 100 atış, p=0,5 → E=50.', solutionSteps: ['Formül: n·p.', 'Örn: n=10, p=0,3 → 3.', 'Örn: n=100, p=0,5 → 50.'] }
    ),
    makeMcq(
      's18',
      'Wie berechnet man die Standardabweichung einer binomialverteilten Zufallsvariable?',
      'σ = √(n · p · (1 − p))',
      ['σ = n · p · (1 − p)', 'σ = n · p', 'σ = √(n) · p'],
      'Standardabweichung: σ = √(Varianz) = √(n · p · (1 − p)). Beispiel: 100 Würfe, p=0,5 → σ = √25 = 5.',
      2,
      ['stochastik', 'binomial', 'standardabweichung'],
      [
        'Varianz: Var(X) = n · p · (1 − p).',
        'Standardabweichung: σ = √(Var(X)) = √(n · p · (1 − p)).',
        'Beispiel: n=100, p=0,5 → σ = √(100·0,5·0,5) = √25 = 5.',
      ],
      { prompt: 'Standart sapma σ?', explanation: 'σ = √(n·p·(1−p)). Örn: n=100, p=0,5 → σ=5.', solutionSteps: ['Varyans: n·p·(1−p).', 'σ = √Varyans.', 'Örn: √(100·0,5·0,5) = √25 = 5.'] }
    ),
    makeMcq(
      's19',
      'Wie berechnet man die Wahrscheinlichkeit, bei n=10 Bernoulli-Versuchen mit p=0,5 genau k=3 Treffer zu erzielen?',
      'P(X=3) = C(10,3) · 0,5³ · 0,5⁷ ≈ 0,117',
      ['P(X=3) = 10 · 0,5³', 'P(X=3) = 3/10', 'P(X=3) = 0,5³'],
      'Bernoulli-Formel: P(X=k) = C(n,k) · p^k · (1−p)^(n−k). C(10,3) = 120. 120 · (0,5)^10 = 120/1024 ≈ 0,117.',
      3,
      ['stochastik', 'binomial', 'berechnung'],
      [
        'Formel: P(X=k) = C(n,k) · p^k · (1−p)^(n−k).',
        'C(10,3) = 10!/(3!·7!) = 120.',
        'p³ · (1−p)⁷ = 0,5³ · 0,5⁷ = 0,5¹⁰ = 1/1024.',
        'P(X=3) = 120 · 1/1024 ≈ 0,117.',
      ],
      { prompt: 'P(X=3) n=10, p=0,5?', explanation: 'P(X=k) = C(n,k)·p^k·(1−p)^(n−k). C(10,3)·0,5¹⁰ ≈ 0,117.', solutionSteps: ['Formül: C(n,k)·p^k·(1−p)^(n−k).', 'C(10,3) = 120.', 'p³·(1−p)⁷ = 0,5¹⁰ = 1/1024.', '120/1024 ≈ 0,117.'] }
    ),

    // ─── Bernoulli-Ketten: Anwendung ────────────────────────────────────────
    makeMcq(
      's20',
      'Ein Basketballspieler trifft mit p = 0,7. Wie groß ist die Wahrscheinlichkeit, bei 5 Versuchen GENAU 4 zu treffen?',
      'P(X=4) = C(5,4) · 0,7⁴ · 0,3¹ ≈ 0,36',
      ['0,7⁴ ≈ 0,24', '0,7 · 0,3', '0,5'],
      'C(5,4) = 5. P(X=4) = 5 · 0,7⁴ · 0,3 = 5 · 0,2401 · 0,3 ≈ 0,36.',
      3,
      ['stochastik', 'bernoulli', 'berechnung'],
      [
        'Formel: P(X=k) = C(n,k) · p^k · (1−p)^(n−k).',
        'C(5,4) = 5.',
        'p⁴ · (1−p)¹ = 0,7⁴ · 0,3 = 0,2401 · 0,3 = 0,07203.',
        'P(X=4) = 5 · 0,07203 ≈ 0,360.',
      ],
      { prompt: '5 atışta tam 4 isabet? p=0,7', explanation: 'C(5,4)·0,7⁴·0,3¹ = 5·0,072 ≈ 0,36.', solutionSteps: ['Formül: C(n,k)·p^k·(1−p)^(n−k).', 'C(5,4)=5.', '0,7⁴·0,3=0,072.', '5·0,072≈0,36.'] }
    ),
    makeMcq(
      's21',
      'Ein Schütze trifft mit p = 0,8. Wie groß ist P(mindestens 9 Treffer bei 10 Schüssen)?',
      'P(X≥9) = P(X=9) + P(X=10) = 10·0,8⁹·0,2 + 0,8¹⁰ ≈ 0,376',
      ['0,8⁹', '1 − 0,8¹⁰', '0,8 · 10'],
      'Mindestens 9 = X=9 oder X=10. P(X=9) = 10 · 0,8⁹ · 0,2 ≈ 0,268. P(X=10) = 0,8¹⁰ ≈ 0,107. Summe ≈ 0,376.',
      3,
      ['stochastik', 'bernoulli', 'mindestens'],
      [
        'Mindestens 9 = X=9 oder X=10.',
        'P(X=9) = C(10,9) · 0,8⁹ · 0,2¹ = 10 · 0,1342 · 0,2 ≈ 0,268.',
        'P(X=10) = 0,8¹⁰ ≈ 0,107.',
        'Summe: 0,268 + 0,107 ≈ 0,376.',
      ],
      { prompt: 'P(en az 9 isabet, 10 atış, p=0,8)?', explanation: 'P(X=9)+P(X=10) = 10·0,8⁹·0,2 + 0,8¹⁰ ≈ 0,376.', solutionSteps: ['X=9 veya X=10.', 'P(X=9)=10·0,8⁹·0,2≈0,268.', 'P(X=10)=0,8¹⁰≈0,107.', 'Toplam ≈ 0,376.'] }
    ),
    makeMcq(
      's22',
      'Wie berechnet man P(höchstens 2 Treffer bei 5 Versuchen mit p = 0,3)?',
      'P(X≤2) = P(X=0) + P(X=1) + P(X=2)',
      ['1 − P(X=3) − P(X=4) − P(X=5)', 'P(X=2)', 'P(X=0) · P(X=1) · P(X=2)'],
      'Höchstens 2 = X=0, 1 oder 2. Summenregel: addiere alle Einzelwahrscheinlichkeiten. Alternative: 1 − P(X≥3), aber direktes Summieren ist meistens einfacher.',
      2,
      ['stochastik', 'bernoulli', 'hoechstens'],
      [
        'Höchstens 2 = X=0 oder X=1 oder X=2.',
        'Summenregel: P(X≤2) = P(X=0) + P(X=1) + P(X=2).',
        'Berechne jeden Term mit Bernoulli-Formel.',
        'Alternative (bei großen n): 1 − P(X≥3).',
      ],
      { prompt: 'P(X≤2) n=5, p=0,3?', explanation: 'P(X=0)+P(X=1)+P(X=2). Tek tek hesapla.', solutionSteps: ['X=0 veya X=1 veya X=2.', 'Topla.', 'Büyük n için: 1−P(X≥3).'] }
    ),
    makeMcq(
      's23',
      'Welche Faustregel gilt für die Annäherung einer Binomialverteilung durch die Normalverteilung?',
      'σ > 3 (also n·p·(1−p) > 9)',
      ['n > 10', 'p > 0,5', 'n·p < 1'],
      'Normalapproximation ist gut, wenn die Standardabweichung σ = √(n·p·(1−p)) > 3 ist, also n·p·(1−p) > 9. Faustregel: σ > 3.',
      3,
      ['stochastik', 'normalverteilung'],
      [
        'Faustregel: σ = √(n·p·(1−p)) > 3.',
        'Äquivalent: n·p·(1−p) > 9.',
        'Beispiel: n=100, p=0,5 → σ=5 > 3, also gut approximierbar.',
        'Beispiel: n=20, p=0,1 → σ=√(1,8) ≈ 1,34, schlecht approximierbar.',
      ],
      { prompt: 'Normal yaklaşımı ne zaman?', explanation: 'σ = √(n·p·(1−p)) > 3, yani n·p·(1−p) > 9.', solutionSteps: ['σ > 3.', 'n·p·(1−p) > 9.', 'Örn: n=100, p=0,5 → σ=5 ✓.', 'Örn: n=20, p=0,1 → σ≈1,34 ✗.'] }
    ),

    // ─── Hypothesentest ─────────────────────────────────────────────────────
    makeMcq(
      's24',
      'Was ist ein Hypothesentest in der Stochastik?',
      'Ein statistisches Verfahren, um eine Vermutung über einen Parameter mit Stichproben zu überprüfen.',
      ['Eine Methode, um Würfel zu analysieren', 'Ein Test für Hypothesen im Alltag', 'Eine andere Bezeichnung für Erwartungswert'],
      'Ein Hypothesentest prüft eine Nullhypothese H₀ anhand einer Stichprobe. Man entscheidet, ob die Nullhypothese abgelehnt wird oder nicht.',
      2,
      ['stochastik', 'hypothesentest'],
      [
        'Definition: statistisches Testverfahren.',
        'Nullhypothese H₀ wird gegen Alternative H₁ getestet.',
        'Entscheidung basiert auf Stichprobe und Ablehnungsbereich.',
      ],
      { prompt: 'Hipotez testi nedir?', explanation: 'H₀\'ı örneklem ile kontrol etme. Kabul/red kararı.', solutionSteps: ['Tanım: istatistiksel test.', 'H₀ ve H₁.', 'Red bölgesine göre karar.'] }
    ),
    makeMcq(
      's25',
      'Was ist der Ablehnungsbereich bei einem Hypothesentest?',
      'Der Bereich der Stichprobenwerte, bei dessen Eintreten H₀ abgelehnt wird.',
      ['Der Bereich, in dem H₀ akzeptiert wird', 'Der Wertebereich der Grundgesamtheit', 'Eine Konstante'],
      'Der Ablehnungsbereich (auch kritischer Bereich) ist die Menge der Stichprobenergebnisse, bei denen die Nullhypothese abgelehnt wird. Sein Komplement ist der Annahmebereich.',
      3,
      ['stochastik', 'hypothesentest', 'ablehnungsbereich'],
      [
        'Definition: Wertebereich, bei dem H₀ abgelehnt wird.',
        'Ergänzt zum Annahmebereich: dort wird H₀ nicht abgelehnt.',
        'Festlegung: Signifikanzniveau α (z.B. 5%).',
      ],
      { prompt: 'Red bölgesi ne?', explanation: 'H₀\'ın reddedildiği değerler aralığı. Anlamlılık α ile belirlenir.', solutionSteps: ['Tanım.', 'Anlamlılık düzeyi α.', 'Kabul/red alanı.'] }
    ),
    makeMcq(
      's26',
      'Was ist der Fehler 1. Art bei einem Hypothesentest?',
      'H₀ wird abgelehnt, obwohl sie wahr ist (falscher Alarm).',
      ['H₀ wird angenommen, obwohl sie falsch ist', 'Es wird eine falsche Stichprobe gezogen', 'Es gibt keinen Fehler 1. Art'],
      'Fehler 1. Art: H₀ ist wahr, wird aber abgelehnt. Wahrscheinlichkeit = Signifikanzniveau α. Beispiel: Wir behaupten, eine Münze ist unfair, obwohl sie fair ist.',
      3,
      ['stochastik', 'hypothesentest', 'fehler'],
      [
        'Definition: H₀ wahr, aber abgelehnt.',
        'Wahrscheinlichkeit: α (Signifikanzniveau).',
        'Typisches Beispiel: Medikament wirkt nicht, Test sagt doch wirkt.',
      ],
      { prompt: '1. tip hata ne?', explanation: 'H₀ doğru ama reddediliyor. Olasılık = α.', solutionSteps: ['Tanım.', 'α.', 'Örn: ilaç yok, test var diyor.'] }
    ),
    makeMcq(
      's27',
      'Was ist der Fehler 2. Art bei einem Hypothesentest?',
      'H₀ wird nicht abgelehnt, obwohl sie falsch ist (verpasster Effekt).',
      ['H₀ wird abgelehnt, obwohl sie wahr ist', 'Es liegt ein Rechenfehler vor', 'Es gibt keinen Fehler 2. Art'],
      'Fehler 2. Art: H₀ ist falsch, wird aber nicht abgelehnt. Wahrscheinlichkeit = β. Beispiel: Wir erkennen nicht, dass die Münze unfair ist.',
      3,
      ['stochastik', 'hypothesentest', 'fehler'],
      [
        'Definition: H₀ falsch, aber nicht abgelehnt.',
        'Wahrscheinlichkeit: β.',
        'Beispiel: Krankheit vorhanden, Test sagt gesund.',
      ],
      { prompt: '2. tip hata ne?', explanation: 'H₀ yanlış ama kabul. Olasılık = β.', solutionSteps: ['Tanım.', 'β.', 'Örn: hasta, test sağlıklı diyor.'] }
    ),

    // ─── Kombinatorik ───────────────────────────────────────────────────────
    makeMcq(
      's28',
      'Wie viele Möglichkeiten gibt es, 5 verschiedene Bücher in einem Regal anzuordnen (Permutation)?',
      '5! = 120',
      ['5', '25', '5² = 25'],
      'Permutation von n Elementen: n!. 5! = 5·4·3·2·1 = 120.',
      1,
      ['stochastik', 'kombinatorik', 'permutation'],
      [
        'Formel: n! = n·(n−1)·(n−2)·...·1.',
        '5! = 5·4·3·2·1 = 120.',
        'Beispiel: 5 Bücher, 120 Reihenfolgen.',
      ],
      { prompt: '5 kitap kaç sıraya?', explanation: 'n! = 120. 5·4·3·2·1.', solutionSteps: ['n! = n·(n−1)·...·1.', '5! = 5·4·3·2·1 = 120.'] }
    ),
    makeMcq(
      's29',
      'Wie viele Möglichkeiten gibt es, aus 10 Personen einen Klassensprecher UND einen Stellvertreter zu wählen (Reihenfolge wichtig, Variation)?',
      '10 · 9 = 90',
      ['10', '45', '10 · 10 = 100'],
      'Variation ohne Wiederholung: für Sprecher 10 Möglichkeiten, für Stellvertreter noch 9. Total: 10 · 9 = 90.',
      2,
      ['stochastik', 'kombinatorik', 'variation'],
      [
        'Variation: Reihenfolge wichtig.',
        'Schritt 1: 10 Möglichkeiten für Sprecher.',
        'Schritt 2: 9 Möglichkeiten für Stellvertreter (eine Person schon gewählt).',
        'Total: 10 · 9 = 90.',
      ],
      { prompt: '10 kişiden başkan ve yardımcı?', explanation: 'Sıralı seçim: 10 · 9 = 90.', solutionSteps: ['Sıralı önemli.', '10 seçenek başkan.', '9 seçenek yardımcı.', 'Çarp: 90.'] }
    ),
    makeMcq(
      's30',
      'Wie viele Möglichkeiten gibt es, aus 6 Personen eine 3-köpfige AG zu wählen (Reihenfolge egal, Kombination)?',
      'C(6,3) = 20',
      ['6·5·4 = 120', '3! = 6', 'C(6,3) = 6'],
      'Kombination ohne Wiederholung: C(n,k) = n!/(k!·(n−k)!). C(6,3) = 6!/(3!·3!) = 720/36 = 20.',
      2,
      ['stochastik', 'kombinatorik', 'kombination'],
      [
        'Kombination: Reihenfolge egal.',
        'Formel: C(n,k) = n! / (k! · (n−k)!).',
        'C(6,3) = 6!/(3!·3!) = 720/36 = 20.',
      ],
      { prompt: '6 kişiden 3 kişilik grup?', explanation: 'C(6,3) = 6!/(3!·3!) = 20.', solutionSteps: ['Kombinasyon.', 'C(n,k) = n!/(k!(n−k)!).', 'C(6,3) = 720/36 = 20.'] }
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

// ─── Integral (Analysis II — Abitur-Pflichtthema) ────────────────────────────
// Stammfunktion, unbestimmtes/bestimmtes Integral, Flächenberechnung,
// Rotationskörper — NRW Zentralabitur Analysis

const integral: Topic = {
  id: 'integral',
  title: 'Integral',
  summary: 'Stammfunktion, Hauptsatz, Flächenberechnung, Rotationskörper — Abitur-Pflicht.',
  lesson: {
    intro: 'Integral hesabı, türevin ters yönüdür. NRW Abi Analysis sınavının yarısı integral sorularıdır. Bu bölümde Stammfunktion (anti-türev) bulma, belirli integral hesaplama (Hauptsatz), fonksiyon ile x-ekseni arasındaki alanı hesaplama ve Rotationskörper hacmini öğreneceksin.',
    rules: [
      {
        title: 'Stammfunktion (Anti-türev)',
        body: 'Eine Funktion F(x) heißt Stammfunktion von f(x), wenn F\'(x) = f(x) gilt. Schreibweise: F(x) = ∫ f(x) dx.',
        examples: [
          'Stammfunktion von f(x) = 2x ist F(x) = x² (denn d/dx(x²) = 2x).',
          'Stammfunktion von f(x) = x³ ist F(x) = x⁴/4.',
          'Man vergisst oft die Konstante C: F(x) + C ist auch eine Stammfunktion.',
        ],
      },
      {
        title: 'Potenzregel für Integrale',
        body: '∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C (für n ≠ −1). Der Exponent erhöht sich um 1, dividiert durch den neuen Exponenten.',
        examples: [
          '∫ x² dx = x³/3 + C.',
          '∫ x⁵ dx = x⁶/6 + C.',
          '∫ 1 dx = ∫ x⁰ dx = x + C.',
          '∫ dx = x + C.',
        ],
      },
      {
        title: 'Bestimmtes Integral (Hauptsatz)',
        body: '∫ₐᵇ f(x) dx = F(b) − F(a), wobei F eine Stammfunktion von f ist. Die Integrationsgrenzen a und b bestimmen das Intervall.',
        examples: [
          '∫₀² 2x dx = [x²]₀² = 2² − 0² = 4.',
          'Negative Ergebnisse können auftreten, wenn f(x) < 0 ist — dann bedeutet das Fläche unter der x-Achse.',
        ],
      },
      {
        title: 'Flächenberechnung',
        body: 'Fläche zwischen Funktion und x-Achse = ∫ₐᵇ |f(x)| dx. Bei Nullstellen aufteilen — die Beträge der einzelnen Teile summieren.',
        examples: [
          'f(x) = x − 2 zwischen x=0 und x=4: Nullstelle bei x=2. Fläche = ∫₀² (2 − x) dx + ∫₂⁴ (x − 2) dx = 2 + 2 = 4.',
          'Integral mit Vorzeichen gibt den „orientierten" Flächeninhalt — wir wollen aber den Betrag!',
        ],
      },
      {
        title: 'Rotationskörper (Volumen)',
        body: 'Volumen eines Körpers, der durch Rotation von f(x) um die x-Achse entsteht: V = π ∫ₐᵇ f(x)² dx.',
        examples: [
          'Rotation von f(x) = 1 (also y=1) zwischen x=0 und x=h gibt Zylinder mit V = π · 1² · h = πh.',
          'Rotation von f(x) = x zwischen x=0 und x=R gibt Kegel mit V = π ∫₀ᴿ x² dx = π · R³/3.',
        ],
      },
      {
        title: 'Wichtige Integrale',
        body: 'Diese Grundintegrale musst du auswendig kennen:',
        examples: [
          '∫ eˣ dx = eˣ + C.',
          '∫ sin(x) dx = −cos(x) + C.',
          '∫ cos(x) dx = sin(x) + C.',
          '∫ 1/x dx = ln|x| + C.',
          '∫ (1/x²) dx = −1/x + C.',
        ],
      },
    ],
  },
  questions: [
    // Grundlagen
    makeMcq('i1', 'Was ist eine Stammfunktion von f(x)?',
      'Eine Funktion F(x) mit F\'(x) = f(x).',
      ['Eine Funktion, die größer als f(x) ist', 'Eine Funktion mit F(x) = 0', 'Eine Funktion mit negativer Steigung'],
      'Die Stammfunktion ist die Umkehrung der Ableitung. F\'(x) = f(x) bedeutet: F ist Stammfunktion von f.',
      1, ['integral', 'definition']),
    makeMcq('i2', 'Welches ist die Stammfunktion von f(x) = 2x?',
      'F(x) = x²', ['F(x) = 2', 'F(x) = x', 'F(x) = 2x²'],
      'Ableitung von x² = 2x. Also ist x² eine Stammfunktion von 2x. Plus C (Konstante).',
      2, ['integral', 'stammfunktion']),
    makeMcq('i3', 'Welches ist die Stammfunktion von f(x) = x³?',
      'F(x) = x⁴/4', ['F(x) = x²', 'F(x) = 3x²', 'F(x) = x⁴'],
      'Potenzregel rückwärts: Exponent + 1, dann durch neuen Exponent teilen. x³ → x⁴/4.',
      2, ['integral', 'stammfunktion']),

    // Potenzregel
    makeMcq('i4', 'Berechne ∫ x² dx.',
      'x³/3 + C', ['x³ + C', '2x + C', '3x² + C'],
      'Potenzregel: Exponent + 1, durch neuen Exponent teilen. ∫ x² dx = x³/3 + C.',
      1, ['integral', 'potenzregel']),
    makeMcq('i5', 'Berechne ∫ 1 dx.',
      'x + C', ['1 + C', '0 + C', 'x² + C'],
      '1 = x⁰. Potenzregel: x¹/1 = x + C.',
      1, ['integral', 'potenzregel']),
    makeMcq('i6', 'Berechne ∫ x⁵ dx.',
      'x⁶/6 + C', ['x⁶ + C', '6x⁵ + C', 'x⁴/4 + C'],
      'Potenzregel: x⁵ → x⁶/6 + C.',
      2, ['integral', 'potenzregel']),

    // Bestimmtes Integral / Hauptsatz
    makeMcq('i7', 'Was besagt der Hauptsatz der Differential- und Integralrechnung?',
      '∫ₐᵇ f(x) dx = F(b) − F(a), wobei F eine Stammfunktion von f ist.',
      ['Das Integral ist immer positiv', 'Die Ableitung ist immer 0', 'Die Fläche ist immer 1'],
      'Der Hauptsatz verbindet Ableitung und Integral: das bestimmte Integral lässt sich über die Stammfunktion auswerten.',
      3, ['integral', 'hauptsatz']),
    makeMcq('i8', 'Berechne ∫₀² 2x dx.',
      '4', ['0', '2', '8'],
      'Stammfunktion: x². Auswerten: [x²]₀² = 2² − 0² = 4 − 0 = 4.',
      2, ['integral', 'hauptsatz']),
    makeMcq('i9', 'Berechne ∫₁³ 1 dx.',
      '2', ['1', '3', '0'],
      'Stammfunktion von 1 ist x. Auswerten: [x]₁³ = 3 − 1 = 2.',
      1, ['integral', 'hauptsatz']),
    makeMcq('i10', 'Berechne ∫₀¹ x² dx.',
      '1/3', ['1/2', '1', '0'],
      'Stammfunktion: x³/3. Auswerten: [x³/3]₀¹ = 1/3 − 0 = 1/3.',
      2, ['integral', 'hauptsatz']),

    // Wichtige Grundintegrale
    makeMcq('i11', 'Was ist ∫ eˣ dx?',
      'eˣ + C', ['eˣ · x + C', 'eˣ / x + C', 'eˣ⁻¹ + C'],
      'eˣ ist seine eigene Stammfunktion: d/dx(eˣ) = eˣ. Daher ∫ eˣ dx = eˣ + C.',
      1, ['integral', 'grundintegrale']),
    makeMcq('i12', 'Was ist ∫ sin(x) dx?',
      '−cos(x) + C', ['cos(x) + C', 'sin(x) + C', '−sin(x) + C'],
      'Ableitung von cos(x) ist −sin(x). Daher ist die Stammfunktion von sin(x) genau −cos(x).',
      2, ['integral', 'grundintegrale']),
    makeMcq('i13', 'Was ist ∫ cos(x) dx?',
      'sin(x) + C', ['−sin(x) + C', 'cos(x) + C', '−cos(x) + C'],
      'Ableitung von sin(x) ist cos(x). Also ist die Stammfunktion von cos(x) genau sin(x).',
      2, ['integral', 'grundintegrale']),
    makeMcq('i14', 'Was ist ∫ (1/x) dx?',
      'ln|x| + C', ['1/ln(x) + C', 'x · ln(x) + C', 'ln(x)/x + C'],
      'Für x > 0: d/dx(ln(x)) = 1/x. Daher Stammfunktion ln(x). Mit Betrag für alle x ≠ 0: ln|x|.',
      3, ['integral', 'grundintegrale']),

    // Flächenberechnung
    makeMcq('i15', 'Wie berechnet man die Fläche zwischen f(x) und der x-Achse von a bis b?',
      'A = ∫ₐᵇ |f(x)| dx (mit Nullstellen-Aufteilung)',
      ['A = ∫ₐᵇ f(x) dx (ohne Betrag)', 'A = ∫ₐᵇ f(x)² dx', 'A = f(b) − f(a)'],
      'Ohne Betrag bekommt man den „orientierten" Flächeninhalt — bei negativen Werten hebt sich Positives und Negatives auf. Mit Betrag und Nullstellen-Aufteilung bekommt man die echte Fläche.',
      3, ['integral', 'flaeche']),
    makeMcq('i16', 'Was passiert, wenn f(x) im Intervall negativ ist?',
      'Das Integral ohne Betrag liefert einen negativen Wert.',
      ['Das Integral ist 0', 'Das Integral ist immer positiv', 'Es gibt keine Lösung'],
      '∫ₐᵇ f(x) dx kann negativ sein, wenn f(x) < 0 auf [a, b]. Für die tatsächliche Fläche nimmt man |∫ₐᵇ f(x) dx|.',
      2, ['integral', 'flaeche']),
    makeMcq('i17', 'f(x) = x − 1. Nullstelle?',
      'x = 1', ['x = 0', 'x = −1', 'Es gibt keine'],
      'f(x) = 0 → x − 1 = 0 → x = 1. Die Nullstelle teilt das Intervall bei Flächenberechnungen.',
      1, ['integral', 'nullstelle']),
    makeMcq('i18', 'Berechne die Fläche zwischen f(x) = 2x und der x-Achse von x = 0 bis x = 3.',
      '9', ['6', '18', '3'],
      'f(x) = 2x ist auf [0,3] positiv (außer am Anfang). A = ∫₀³ 2x dx = [x²]₀³ = 9 − 0 = 9.',
      2, ['integral', 'flaeche']),

    // Rotationskörper
    makeMcq('i19', 'Wie berechnet man das Volumen eines Rotationskörpers um die x-Achse?',
      'V = π ∫ₐᵇ f(x)² dx',
      ['V = ∫ₐᵇ f(x) dx', 'V = 2π ∫ₐᵇ f(x) dx', 'V = π · f(b) · b'],
      'Die Formel V = π ∫ f(x)² dx entsteht durch Aufsummieren infinitesimaler Kreisscheiben (Radius f(x)).',
      3, ['integral', 'rotation']),
    makeMcq('i20', 'Berechne das Volumen eines Kegels, der durch Rotation von f(x) = x zwischen 0 und R entsteht.',
      'π · R³/3', ['π · R³', 'π · R²/2', 'π · R'],
      'V = π ∫₀ᴿ x² dx = π · [x³/3]₀ᴿ = π · R³/3.',
      3, ['integral', 'rotation']),
    makeMcq('i21', 'Berechne das Volumen einer Kugel mit Radius R (Rotation von f(x) = √(R² − x²) zwischen −R und R).',
      '(4/3) · π · R³', ['π · R³', 'π · R²', '2π · R³'],
      'V = π ∫₋ᴿᴿ (R² − x²) dx = π · [R²x − x³/3]₋ᴿᴿ = π · (2R³ − 2R³/3) = π · (4R³/3) = 4πR³/3.',
      3, ['integral', 'rotation', 'kugel']),

    // Anwendungen & Theorie
    makeMcq('i22', 'Wann darf man unter dem Integral differentiieren bzw. integrieren?',
      'Bei stetigen Funktionen auf einem geschlossenen Intervall — sonst Sonderfälle.',
      ['Immer', 'Nie', 'Nur bei Polynomen'],
      'Der Hauptsatz setzt voraus, dass f stetig auf [a, b] ist. Bei unstetigen Funktionen muss man aufpassen.',
      3, ['integral', 'theorie']),
    makeMcq('i23', 'Was bedeutet ∫ₐᵃ f(x) dx?',
      '0', ['f(a)', '2 · f(a)', 'Es ist undefiniert'],
      'Integral über ein Intervall der Länge 0 ist 0. F(a) − F(a) = 0.',
      1, ['integral', 'theorie']),
    makeMcq('i24', 'Wie lautet ∫ₐᵇ f(x) dx + ∫ᵦᶜ f(x) dx wenn a < b < c?',
      '∫ₐᶜ f(x) dx', ['∫ₐᵇ f(x) dx', '∫ᵦᶜ f(x) dx', '0'],
      'Intervalladditivität: die Integrale über aneinandergrenzende Intervalle ergeben das Integral über das Gesamtintervall.',
      2, ['integral', 'theorie']),
    makeMcq('i25', 'Berechne ∫₋₁¹ x² dx.',
      '2/3', ['0', '2', '1'],
      'Symmetrisches Intervall, x² ist gerade. ∫₋₁¹ x² dx = 2 · ∫₀¹ x² dx = 2 · [x³/3]₀¹ = 2/3.',
      3, ['integral', 'symmetrie']),
    makeMcq('i26', 'Berechne ∫₋₁¹ x³ dx.',
      '0', ['2/3', '2', '−2/3'],
      'x³ ist eine ungerade Funktion, symmetrisches Intervall. Integral = 0 (positive und negative Teile heben sich auf).',
      2, ['integral', 'symmetrie']),
    makeMcq('i27', 'Welche Funktion ist die Ableitung von F(x) = −cos(x)?',
      'f(x) = sin(x)', ['f(x) = −sin(x)', 'f(x) = cos(x)', 'f(x) = −cos(x)'],
      'Ableitung von −cos(x) ist −(−sin(x)) = sin(x). Daher ist −cos(x) eine Stammfunktion von sin(x).',
      2, ['integral', 'grundintegrale']),
  ],
};

export const mathematikModule: Module = {
  id: 'mathematik',
  title: 'Mathematik',
  description: 'Funktionen, Ableitung, Vektoren, Stochastik — das Fundament für die Oberstufe.',
  icon: 'calculator',
  color: 'cyan',
  topics: [funktionen, ableitung, vektoren, stochastik, lineareAlgebra2, integral],
};
