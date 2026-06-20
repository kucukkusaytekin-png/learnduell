// Turkish translations for Mathematik questions (Almanca + TR kombinasyonu).
// Almanca teknik terimleri KORUNUR (Steigung, Nullstelle, Scheitelpunkt, etc.).

export interface MathTranslation {
  prompt: string;
  explanation: string;
  solutionSteps?: string[];
}

export const mathTranslations: Record<string, MathTranslation> = {
  // ─── Funktionen ───────────────────────────────────────────────────────────
  f1: {
    prompt: 'Wie lautet die Steigung m der Funktion f(x) = 3x + 7? / f(x) = 3x + 7 fonksiyonunun Steigung (eğim) m nedir?',
    explanation: 'Bei f(x) = mx + b ist m = 3 (Koeffizient vor x), b = 7. / f(x) = mx + b formunda m = 3 (x\'in katsayısı), b = 7.',
    solutionSteps: [
      'Funktionsform erkennen: f(x) = mx + b (lineare Funktion). / Fonksiyon formunu tanı: f(x) = mx + b (doğrusal fonksiyon).',
      'Mit der gegebenen Funktion vergleichen: f(x) = 3x + 7. / Verilen fonksiyonla karşılaştır: f(x) = 3x + 7.',
      'Steigung m ablesen — Koeffizient vor x: m = 3. / Eğimi (m) oku — x\'in önündeki katsayı: m = 3.',
    ],
  },
  f2: {
    prompt: 'Was ist die Nullstelle von f(x) = 2x − 6? / f(x) = 2x − 6\'nın Nullstelle\'ı nedir?',
    explanation: '0 = 2x − 6 → 2x = 6 → x = 3. / 0 = 2x - 6 → 2x = 6 → x = 3.',
    solutionSteps: [
      'Definition: Die Nullstelle ist der x-Wert, an dem f(x) = 0. / Tanım: Nullstelle, f(x) = 0 olan x değeridir.',
      'Funktion gleich null setzen: 2x − 6 = 0. / Fonksiyonu sıfıra eşitle: 2x - 6 = 0.',
      'Nach x auflösen: 2x = 6, also x = 3. / x\'i yalnız bırak: 2x = 6, yani x = 3.',
    ],
  },
  f3: {
    prompt: 'Welcher Punkt ist der Scheitelpunkt von f(x) = (x − 2)² + 4? / f(x) = (x − 2)² + 4\'ün Scheitelpunkt\'u hangisidir?',
    explanation: 'In Scheitelpunktform f(x) = a(x − d)² + e ist S(d, e). Hier: d = 2, e = 4. / Scheitelpunktform\'unda f(x) = a(x - d)² + e ise S(d, e). Burada: d = 2, e = 4.',
    solutionSteps: [
      'Scheitelpunktform erkennen: f(x) = a(x − d)² + e. / Scheitelpunktform\'unu tanı: f(x) = a(x - d)² + e.',
      'Der Scheitelpunkt ist S(d, e). / Scheitelpunkt S(d, e)\'dir.',
      'Werte ablesen: x − d = x − 2, also d = 2. / Değerleri oku: x - d = x - 2, yani d = 2.',
      'Konstante am Ende: + 4, also e = 4. / Sondaki sabit: + 4, yani e = 4.',
      'Ergebnis: S(2, 4). / Sonuç: S(2, 4).',
    ],
  },
  f4: {
    prompt: 'Wie viele Nullstellen hat f(x) = x² + 4x + 5? / f(x) = x² + 4x + 5\'in kaç Nullstelle\'ı vardır?',
    explanation: 'Diskriminante: b² − 4ac = 16 − 20 = −4 < 0 → keine reellen Nullstellen. / Diskriminant: 16 − 20 = −4 < 0 → Nullstelle yok.',
    solutionSteps: [
      'a, b, c bestimmen: a = 1, b = 4, c = 5. / a, b, c değerlerini belirle: a = 1, b = 4, c = 5.',
      'Diskriminante: D = b² − 4ac = 16 − 20 = −4. / Diskriminant: D = b² - 4ac = 16 - 20 = -4.',
      'D < 0 → keine reellen Nullstellen. / D < 0 → Nullstelle yok.',
    ],
  },
  f5: {
    prompt: 'Was ist die y-Achsenabschnitt von f(x) = −2x + 5? / f(x) = -2x + 5\'in y-Achsenabschnitt\'ı nedir?',
    explanation: 'Bei f(x) = mx + b ist b = y-Achsenabschnitt. Hier: b = 5. / f(x) = mx + b\'de b = y-Achsenabschnitt. Burada: b = 5.',
    solutionSteps: [
      'Der y-Achsenabschnitt ist der Funktionswert an der Stelle x = 0. / y-Achsenabschnitt, x = 0\'daki fonksiyon değeridir.',
      'Berechnen: f(0) = −2·0 + 5 = 5. / Hesapla: f(0) = -2·0 + 5 = 5.',
      'Oder in der Form f(x) = mx + b direkt ablesen — b = 5. / Veya f(x) = mx + b formundan doğrudan oku — b = 5.',
    ],
  },
  f6: {
    prompt: 'Die Parabel f(x) = (x − 3)² ist… / f(x) = (x − 3)² parabolü nasıl açılmıştır?',
    explanation: 'Quadratische Funktion mit a = 1 > 0 → nach oben geöffnet. / a = 1 > 0 → yukarı doğru açılmış.',
    solutionSteps: [
      'Quadratische Funktion erkennen: f(x) = (x − 3)². / Kuadratik fonksiyonu tanı: f(x) = (x - 3)².',
      'Vorfaktor a = 1. / Ön katsayı a = 1.',
      'a > 0 → nach oben geöffnet. / a > 0 → yukarı doğru açılmış.',
    ],
  },

  // ─── Ableitung ───────────────────────────────────────────────────────────
  a1: {
    prompt: 'Was ist die Ableitung von f(x) = x⁴? / f(x) = x⁴\'ün Ableitung\'ı nedir?',
    explanation: 'Potenzregel: x⁴ → 4x³ (Exponent nach vorne als Faktor, −1). / Üs kuralı: x⁴ → 4x³ (üs öne çarpan olarak gelir, −1).',
    solutionSteps: [
      'Funktion als Potenz: f(x) = x⁴. / Üs olarak: f(x) = x⁴.',
      'Potenzregel: f\'(x) = n · xⁿ⁻¹ = 4 · x³. / Üs kuralı: f\'(x) = n · xⁿ⁻¹ = 4 · x³.',
      'Ergebnis: f\'(x) = 4x³. / Sonuç: f\'(x) = 4x³.',
    ],
  },
  a2: {
    prompt: "Was ist f'(x) von f(x) = 3x² + 5x? / f(x) = 3x² + 5x'in Ableitung f'(x) nedir?",
    explanation: 'Summen- und Potenzregel: 3x² → 6x, 5x → 5. Konstante fällt weg. / Toplam ve üs kuralı: 3x² → 6x, 5x → 5. Sabit 0.',
    solutionSteps: [
      'Summenregel: jede Summe einzeln ableiten. / Toplam kuralı: her terimi ayrı türevle.',
      '3x² mit Potenzregel: 3 · 2 · x = 6x. / 3x² üs kuralıyla: 3 · 2 · x = 6x.',
      '5x mit Potenzregel: 5. / 5x üs kuralıyla: 5.',
      'Summe: f\'(x) = 6x + 5. / Toplam: f\'(x) = 6x + 5.',
    ],
  },
  a3: {
    prompt: 'Was ist die Ableitung einer Konstanten c? / Bir sabit c\'nin Ableitung\'ı nedir?',
    explanation: 'Die Steigung einer konstanten Funktion ist immer 0. / Sabit fonksiyonun Steigung\'ı her zaman 0.',
    solutionSteps: [
      'Konstante Funktion: f(x) = c (z.B. f(x) = 5). / Sabit fonksiyon: f(x) = c (örn f(x) = 5).',
      'Graph ist eine horizontale Gerade → Steigung 0. / Yatay doğru → Steigung 0.',
      'Ergebnis: f\'(x) = 0. / Sonuç: f\'(x) = 0.',
    ],
  },
  a4: {
    prompt: 'Was ist die Ableitung von f(x) = sin(x)? / f(x) = sin(x)\'in Ableitung\'ı nedir?',
    explanation: 'Grundableitung: sin(x) → cos(x). / Temel türev: sin(x) → cos(x).',
    solutionSteps: [
      'Trigonometrische Grundfunktion: f(x) = sin(x). / Trigonometrik temel fonksiyon.',
      'Grundableitung: sin(x) → cos(x). / Temel türev.',
    ],
  },
  a5: {
    prompt: 'Berechne die Ableitung von f(x) = (2x + 1)³. / f(x) = (2x + 1)³\'ün Ableitung\'ı nedir?',
    explanation: 'Kettenregel: äußere Ableitung 3u² · innere Ableitung 2. / Zincir kuralı: dış türev 3u² · iç türev 2.',
    solutionSteps: [
      'Äußere Funktion: u³, innere: u = 2x + 1. / Dış fonksiyon: u³, iç: u = 2x + 1.',
      'Äußere Ableitung: 3u², innere Ableitung: 2. / Dış türev: 3u², iç türev: 2.',
      'Multiplizieren: 3(2x + 1)² · 2 = 6(2x + 1)². / Çarp: 3(2x + 1)² · 2 = 6(2x + 1)².',
    ],
  },
  a6: {
    prompt: 'Bilde die Ableitung von f(x) = 5x³ − 2x² + 7x − 4. / f(x) = 5x³ − 2x² + 7x − 4\'ün Ableitung\'ı nedir?',
    explanation: 'Jeden Term mit Potenzregel ableiten: 5x³ → 15x², −2x² → −4x, 7x → 7, −4 → 0. / Her terimi üs kuralıyla türevle.',
    solutionSteps: [
      '5x³ → 15x². / 5x³ → 15x².',
      '−2x² → −4x. / -2x² → -4x.',
      '7x → 7. / 7x → 7.',
      '−4 → 0 (Konstante verschwindet). / -4 → 0.',
      'Ergebnis: f\'(x) = 15x² − 4x + 7. / Sonuç: f\'(x) = 15x² - 4x + 7.',
    ],
  },

  // ─── Vektoren ────────────────────────────────────────────────────────────
  v1: {
    prompt: 'Was ist (2, 3) + (4, 1)? / (2, 3) + (4, 1) toplamı nedir?',
    explanation: 'Vektoraddition komponentenweise: (2+4, 3+1) = (6, 4). / Vektor toplamı bileşen bileşen: (2+4, 3+1) = (6, 4).',
    solutionSteps: [
      'Regel: Vektoren werden komponentenweise addiert. / Vektor\'lar bileşen bileşen toplanır.',
      'x-Komponente: 2 + 4 = 6. / x-bileşeni: 2 + 4 = 6.',
      'y-Komponente: 3 + 1 = 4. / y-bileşeni: 3 + 1 = 4.',
      'Ergebnis: (6, 4). / Sonuç: (6, 4).',
    ],
  },
  v2: {
    prompt: 'Was ist der Betrag des Vektors (3, 4)? / Vektor (3, 4)\'ün Betrag\'ı nedir?',
    explanation: '|a| = √(3² + 4²) = √25 = 5. (3-4-5 rechtwinkliges Dreieck) / |a| = √25 = 5. (3-4-5 dik üçgen)',
    solutionSteps: [
      'Betrag-Formel: |a| = √(a₁² + a₂²). / Betrag formülü.',
      'a₁ = 3, a₂ = 4: 9 + 16 = 25. / a₁ = 3, a₂ = 4: 9 + 16 = 25.',
      'Wurzel: √25 = 5. / Karekök: √25 = 5.',
    ],
  },
  v3: {
    prompt: 'Was ist 3·(2, −1)? / 3·(2, −1) skaler katı nedir?',
    explanation: 'Skalarmultiplikation: jede Komponente mit 3 multiplizieren → (6, −3). / Skaler çarpım: her bileşeni 3 ile çarp → (6, −3).',
    solutionSteps: [
      'Regel: Skalarmultiplikation komponentenweise. / Skaler çarpım bileşen bileşen.',
      'x-Komponente: 3 · 2 = 6. / x-bileşeni: 3 · 2 = 6.',
      'y-Komponente: 3 · (−1) = −3. / y-bileşeni: 3 · (-1) = -3.',
      'Ergebnis: (6, −3). / Sonuç: (6, -3).',
    ],
  },
  v4: {
    prompt: 'Was ist das Skalarprodukt (1, 2, 3) · (4, 5, 6)? / Skalarprodukt (1, 2, 3) · (4, 5, 6) nedir?',
    explanation: 'a · b = 1·4 + 2·5 + 3·6 = 4 + 10 + 18 = 32. / a · b = 1·4 + 2·5 + 3·6 = 32.',
    solutionSteps: [
      '3D-Skalarprodukt: a · b = a₁b₁ + a₂b₂ + a₃b₃. / 3D Skalarprodukt.',
      'Einsetzen: 1·4 + 2·5 + 3·6. / Yerine koy.',
      'Summe: 4 + 10 + 18 = 32. / Topla: 4 + 10 + 18 = 32.',
    ],
  },
  v5: {
    prompt: 'Welche Vektoren sind senkrecht zueinander? / Hangi Vektor\'lar birbirine dik (senkrecht)?',
    explanation: 'Zwei Vektoren sind senkrecht, wenn ihr Skalarprodukt 0 ist. / İki Vektor Skalarprodukt = 0 ise diktir.',
    solutionSteps: [
      'Bedingung: a · b = 0 → senkrecht. / Koşul: a · b = 0 → dik.',
      'Prüfe jedes Paar: a · b = a₁b₁ + a₂b₂ + a₃b₃. / Her çifti kontrol et.',
      'Wähle das Paar mit a · b = 0. / a · b = 0 olan çifti seç.',
    ],
  },
  v6: {
    prompt: 'Was ist der Betrag des Vektors (1, 2, 2)? / Vektor (1, 2, 2)\'nin Betrag\'ı nedir?',
    explanation: '|a| = √(1² + 2² + 2²) = √(1 + 4 + 4) = √9 = 3. / |a| = √(1 + 4 + 4) = √9 = 3.',
    solutionSteps: [
      '3D-Betrag-Formel: |a| = √(a₁² + a₂² + a₃²). / 3D Betrag formülü.',
      'Quadrate: 1 + 4 + 4 = 9. / Kareler: 1 + 4 + 4 = 9.',
      'Wurzel: √9 = 3. / Karekök: √9 = 3.',
    ],
  },

  // ─── Stochastik ──────────────────────────────────────────────────────────
  s1: {
    prompt: 'Wie groß ist die Wahrscheinlichkeit, beim Würfeln eine 6 zu bekommen? / Bir zar atıldığında 6 gelme Wahrscheinlichkeit\'i nedir?',
    explanation: '6 Seiten, eine davon zeigt die 6 → P = 1/6 ≈ 0.167. / 6 yüz, biri 6 → P = 1/6.',
    solutionSteps: [
      'Ergebnisraum |Ω| = 6. / Örnek uzay |Ω| = 6.',
      'Gewünschtes Ergebnis |A| = 1 (nur die 6). / İstenen sonuç |A| = 1.',
      'P = |A| / |Ω| = 1/6. / Olasılık = 1/6.',
    ],
  },
  s2: {
    prompt: 'Was ist die Gegenwahrscheinlichkeit zu P = 0.3? / P = 0.3\'ün Gegenwahrscheinlichkeit\'i (tümleyen) nedir?',
    explanation: 'Gegenwahrscheinlichkeit = 1 − P = 1 − 0.3 = 0.7. / Gegenwahrscheinlichkeit = 1 − P = 0.7.',
    solutionSteps: [
      'Definition: Gegenwahrscheinlichkeit = 1 − P. / Tanım.',
      'Einsetzen: 1 − 0.3. / Yerine koy.',
      'Ergebnis: 0.7. / Sonuç: 0.7.',
    ],
  },
  s3: {
    prompt: 'Eine Urne hat 4 rote und 6 blaue Kugeln. P(rot)? / 4 kırmızı 6 mavi top olan bir Urne\'den kırmızı çekme P nedir?',
    explanation: 'P(rot) = 4 / (4 + 6) = 4/10 = 0.4. / P(kırmızı) = 4/10 = 0.4.',
    solutionSteps: [
      'Gesamtzahl Kugeln: 4 + 6 = 10. / Toplam top: 10.',
      'Rote Kugeln: 4. / Kırmızı top: 4.',
      'P = 4/10 = 0.4 = 40%. / P = 4/10 = 0.4 = %40.',
    ],
  },
  s4: {
    prompt: 'Wie viele mögliche Ergebnisse hat der gleichzeitige Wurf von 2 Münzen? / 2 madeni paranın eşzamanlı atışında kaç olası sonuç var?',
    explanation: 'Jede Münze hat 2 Seiten → 2 · 2 = 4 mögliche Ergebnisse. / Her para 2 yüz → 2 · 2 = 4 olası sonuç.',
    solutionSteps: [
      'Eine Münze: 2 Möglichkeiten (Kopf oder Zahl). / Bir para: 2 olasılık.',
      'Zwei unabhängige Münzen: 2 · 2 = 4. / İki bağımsız para: 2 · 2 = 4.',
    ],
  },
  s5: {
    prompt: 'Ein Spiel kostet 2€. Mit P=0.25 gewinnt man 6€, sonst nichts. Erwartungswert? / 2€ maliyetli oyun. P=0.25 ile 6€ kazanılır, yoksa 0. Beklenen değer?',
    explanation: 'E(X) = 0.25 · 6 + 0.75 · 0 − 2 = 1.5 − 2 = −0.5€. / E(X) = 1.5 − 2 = −0.5€.',
    solutionSteps: [
      'Erwartungswert: E(X) = Σ xᵢ · P(xᵢ). / Beklenen değer formülü.',
      'Gewinn: 0.25 · 6 = 1.5. / Kazanç: 0.25 · 6 = 1.5.',
      'Verlust: 0.75 · 0 = 0. / Kayıp: 0.',
      'Minus Einsatz: −2. / Eksi bahis: −2.',
      'Ergebnis: −0.5€ (negativ → Verlust). / Sonuç: −0.5€ (negatif = kayıp).',
    ],
  },
  s6: {
    prompt: 'Wie groß ist die Wahrscheinlichkeit, mit 2 Würfeln die Summe 7 zu würfeln? / 2 zar atıldığında toplamın 7 olma Wahrscheinlichkeit\'i nedir?',
    explanation: '6 Kombinationen ergeben Summe 7 von 36 total → 6/36 = 1/6. / 36 kombinezondan 6 tanesi toplam 7 → 6/36 = 1/6.',
    solutionSteps: [
      'Gesamtzahl Fälle: 6 · 6 = 36. / Toplam durum: 36.',
      'Paare mit Summe 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6. / Toplam 7 çiftleri: 6.',
      'P = 6/36 = 1/6. / P = 6/36 = 1/6.',
    ],
  },

  // ─── Repetition Mathematik (separate pool) ──────────────────────────────
  'rep-ableit-1': {
    prompt: 'Bilde die Ableitung von f(x) = 4x³ − 6x + 2. / f(x) = 4x³ − 6x + 2\'nin Ableitung\'ı.',
    explanation: 'Potenzregel: 4x³ → 12x²; −6x → −6; +2 → 0. / Üs kuralı.',
    solutionSteps: [
      'Jeden Term einzeln ableiten. / Her terimi türevle.',
      '4x³ → 12x², −6x → −6, +2 → 0. / Her birini.',
      'Ergebnis: f\'(x) = 12x² − 6. / Sonuç.',
    ],
  },
  'rep-ableit-2': {
    prompt: 'Bilde die Ableitung von f(x) = 5/x = 5x⁻¹. / f(x) = 5/x = 5x⁻¹\'in Ableitung\'ı.',
    explanation: 'Potenzregel mit −1: 5x⁻¹ → −5x⁻² = −5/x². / -1 üssüyle üs kuralı.',
    solutionSteps: [
      'Als Potenz schreiben: 5 · x⁻¹. / Üs olarak yaz.',
      'Potenzregel: 5 · (−1) · x⁻² = −5x⁻². / Üs kuralı.',
      'Ergebnis: −5/x². / Sonuç.',
    ],
  },
  'rep-ableit-3': {
    prompt: 'Bilde die Ableitung von f(x) = sin(x) · cos(x). / f(x) = sin(x) · cos(x)\'in Ableitung\'ı.',
    explanation: 'Produktregel: u\'v + uv\' = cos²(x) − sin²(x). / Çarpım kuralı.',
    solutionSteps: [
      'Produktregel: (u·v)\' = u\'·v + u·v\'.',
      'u = sin(x), u\' = cos(x); v = cos(x), v\' = −sin(x).',
      'cos²(x) − sin²(x).',
    ],
  },
  'rep-ableit-4': {
    prompt: 'Bilde die Ableitung von f(x) = e^(3x). / f(x) = e^(3x)\'in Ableitung\'ı.',
    explanation: 'Kettenregel: (eᵘ)\' = eᵘ · u\'. u = 3x → 3. / Zincir kuralı.',
    solutionSteps: [
      'Kettenregel: (eᵘ)\' = eᵘ · u\'.',
      'u = 3x, u\' = 3.',
      'Ergebnis: f\'(x) = 3e^(3x). / Sonuç.',
    ],
  },
  'rep-vekt-1': {
    prompt: 'Berechne den Betrag des Vektors a = (3, 4). / Vektor a = (3, 4)\'ün Betrag\'ı.',
    explanation: '|a| = √(9 + 16) = √25 = 5. (3-4-5 rechtwinkliges Dreieck) / 3-4-5 dik üçgen.',
    solutionSteps: [
      'Betrag-Formel: |a| = √(a₁² + a₂²).',
      'a₁ = 3, a₂ = 4: 9 + 16 = 25.',
      'Wurzel: √25 = 5. / Karekök.',
    ],
  },
  'rep-vekt-2': {
    prompt: 'Sind die Vektoren a = (2, 1) und b = (−1, 2) senkrecht? / a = (2, 1) ve b = (−1, 2) senkrecht mi?',
    explanation: 'a · b = 2·(−1) + 1·2 = −2 + 2 = 0 → senkrecht (orthogonal). / 0 → dik.',
    solutionSteps: [
      'Skalarprodukt: a · b = a₁·b₁ + a₂·b₂.',
      '2·(−1) + 1·2 = −2 + 2 = 0.',
      '= 0 → senkrecht. / 0 → dik.',
    ],
  },
  'rep-vekt-3': {
    prompt: 'Berechne das Skalarprodukt a · b für a = (1, 2, 3) und b = (4, −5, 6). / a · b Skalarprodukt.',
    explanation: '1·4 + 2·(−5) + 3·6 = 4 − 10 + 18 = 12.',
    solutionSteps: [
      '3D-Skalarprodukt: a₁b₁ + a₂b₂ + a₃b₃.',
      '1·4 + 2·(−5) + 3·6.',
      'Summe: 12.',
    ],
  },
  'rep-vekt-4': {
    prompt: 'Welche Aussage über das Kreuzprodukt ist richtig? / Kreuzprodukt hakkında hangisi doğru?',
    explanation: 'Nur im ℝ³ definiert, Ergebnis ist Vektor senkrecht auf beide. / Sadece ℝ³\'te tanımlı, sonuç dik Vektor.',
    solutionSteps: [
      'Kreuzprodukt nur im 3D-Raum definiert. / 3D uzayda.',
      'Ergebnis ist ein Vektor (kein Skalar). / Vektor.',
      'Senkrecht auf a und b (rechte-Hand-Regel). / a ve b\'ye dik (sağ el kuralı).',
      'a × b = 0 → parallel. / 0 → parallel.',
    ],
  },

  // ─── Lineare Algebra II (Abitur-Pflichtthema) ─────────────────────────────
  la1: {
    prompt: 'Was ist die Dimension einer Matrix mit 3 Zeilen und 4 Spalten? / 3 satır ve 4 sütunlu bir Matris\'in Dimension\'ı nedir?',
    explanation: 'Eine Matrix mit m Zeilen und n Spalten heißt m×n. / m satır ve n sütunlu Matris m×n adını alır.',
  },
  la2: {
    prompt: 'Wann können zwei Matrizen A und B multipliziert werden? / İki Matris A ve B ne zaman çarpılabilir?',
    explanation: 'Spaltenanzahl von A muss gleich Zeilenanzahl von B sein. / A\'nın sütun sayısı, B\'nin satır sayısına eşit olmalı.',
  },
  la3: {
    prompt: 'Wie berechnet man die Determinante einer 2×2-Matrix ((a, b), (c, d))? / 2×2 Matris ((a, b), (c, d)) Determinante\'ı nasıl hesaplanır?',
    explanation: 'Sarrus-Regel für 2×2: ad − bc. / 2×2 için Sarrus kuralı: ad − bc.',
  },
  la4: {
    prompt: 'Berechne det(((3, 1), (2, 4))). / det(((3, 1), (2, 4))) hesapla.',
    explanation: 'det = 3·4 − 1·2 = 12 − 2 = 10. / det = 3·4 − 1·2 = 10.',
    solutionSteps: [
      'Formel: det = ad − bc. / Formül: det = ad − bc.',
      'Einsetzen: 3·4 − 1·2. / Yerine koy.',
      'Ergebnis: 10. / Sonuç: 10.',
    ],
  },
  la5: {
    prompt: 'Was bedeutet det(A) = 0? / det(A) = 0 ne anlama gelir?',
    explanation: 'A ist singulär und nicht invertierbar. / A singüler, tersi yok.',
  },
  la6: {
    prompt: 'Berechne die Determinante von ((1, 2, 3), (4, 5, 6), (7, 8, 9)). / Determinante\'ı hesapla.',
    explanation: 'Mit Sarrus: (45+84+96) − (105+72+48) = 0. Zeilen sind linear abhängig. / Sarrus ile 0. Satırlar lineer bağımlı.',
  },
  la7: {
    prompt: 'Was ist das Ziel des Gauss-Verfahrens? / Gauss yönteminin amacı nedir?',
    explanation: 'Das LGS in Dreiecksform bringen, dann von unten nach oben lösen. / LGS\'yi üçgen forma getirip aşağıdan yukarıya çözmek.',
  },
  la8: {
    prompt: 'Welche Zeilenoperation ist beim Gauss-Verfahren NICHT erlaubt? / Gauss yönteminde hangi satır işlemi YASAKTIR?',
    explanation: 'Trick: die genannten Optionen SIND erlaubt. Eine Zeile mit 0 zu multiplizieren ist sinnlos. / Verilenler izin verilir. 0 ile çarpmak anlamsız.',
  },
  la9: {
    prompt: 'Ein LGS hat unendlich viele Lösungen, wenn… / LGS\'nin sonsuz çözümü vardır, eğer…',
    explanation: 'Rang(A) < Anzahl der Variablen (unterbestimmtes System). / Rang(A) < değişken sayısı (eksik belirlenmiş sistem).',
  },
  la10: {
    prompt: 'Welche Aussage über das LGS A·x = b ist richtig? / LGS A·x = b hakkında hangisi doğru?',
    explanation: 'det(A) ≠ 0 → genau eine Lösung. / det(A) ≠ 0 → tam bir çözüm.',
  },
  la11: {
    prompt: 'Wann existiert die inverse Matrix A⁻¹? / Ters Matris A⁻¹ ne zaman vardır?',
    explanation: 'Nur wenn det(A) ≠ 0. / Sadece det(A) ≠ 0 iken.',
  },
  la12: {
    prompt: 'Wie berechnet man die inverse Matrix einer 2×2-Matrix A = ((a, b), (c, d))? / 2×2 Matris A\'nın tersi nasıl hesaplanır?',
    explanation: 'A⁻¹ = (1/det(A)) · ((d, −b), (−c, a)). / Diyagonal değiştir, yan diyagonal negale çevir, det\'e böl.',
  },
  la13: {
    prompt: 'Was ist ein Eigenvektor einer Matrix A? / A Matris\'inin Eigenvektor\'u nedir?',
    explanation: 'v ≠ 0 mit A·v = λ·v (Richtung bleibt, nur Skalierung). / A·v = λ·v. Yön korunur, sadece ölçek değişir.',
  },
  la14: {
    prompt: 'Wie findet man die Eigenwerte einer Matrix A? / A Matris\'inin Eigenwert\'ları nasıl bulunur?',
    explanation: 'det(A − λ·I) = 0 lösen (charakteristisches Polynom). / Karakteristik polinomu çöz.',
  },
  la15: {
    prompt: 'Berechne die Eigenwerte von A = ((2, 1), (1, 2)). / Eigenwert\'ları hesapla.',
    explanation: 'det(A − λ·I) = (2−λ)² − 1 = λ² − 4λ + 3 = 0 → λ = 1, 3. / λ = 1 ve λ = 3.',
    solutionSteps: [
      'Charakteristisches Polynom: det(((2−λ, 1), (1, 2−λ))) = (2−λ)² − 1.',
      'Vereinfachen: λ² − 4λ + 4 − 1 = λ² − 4λ + 3 = 0.',
      'Mitternachtsformel / pq-Formel: λ = (4 ± √(16−12))/2 = (4 ± 2)/2 = 1 oder 3.',
    ],
  },
  la16: {
    prompt: 'Welche Bedeutung haben Eigenwerte in der Praxis? / Eigenwert\'ların pratikteki anlamı nedir?',
    explanation: 'Resonanzfrequenzen, Wachstumsraten, Hauptachsen (PCA), PageRank. / Rezonans frekansları, büyüme oranları, ana eksenler.',
  },
  la17: {
    prompt: 'Was beschreibt eine Übergangsmatrix (Markov-Matrix)? / Übergangsmatrix (Markov) neyi tanımlar?',
    explanation: 'Wahrscheinlichkeitsübergänge zwischen Zuständen (nicht-negative Einträge, Spaltensumme 1). / Durumlar arası olasılık geçişleri.',
  },
  la18: {
    prompt: 'Was ist der stationäre Zustand einer Markov-Kette? / Markov zincirinin durağan durumu nedir?',
    explanation: 'π mit M·π = π (Eigenvektor zum Eigenwert 1). / M·π = π olan π vektörü (λ = 1 için Eigenvektor).',
  },
  la19: {
    prompt: 'Wozu dient die transponierte Matrix Aᵀ? / Transpoze Matris Aᵀ ne işe yarar?',
    explanation: 'Vertauscht Zeilen und Spalten. (A·x)·y = x·(Aᵀ·y). / Satır ve sütunları değiştirir.',
  },
  la20: {
    prompt: 'Wann ist eine Matrix symmetrisch? / Bir Matris ne zaman simetriktir?',
    explanation: 'A = Aᵀ (also Aᵢⱼ = Aⱼᵢ). Reelle Eigenwerte garantiert. / Aᵢⱼ = Aⱼᵢ. Reel Eigenwert garanti.',
  },
  la21: {
    prompt: 'Wie viele Lösungen hat ein quadratisches LGS A·x = b mit det(A) ≠ 0? / det(A) ≠ 0 olan karesel LGS A·x = b\'nin kaç çözümü var?',
    explanation: 'Genau eine Lösung (x = A⁻¹·b). / Tam olarak bir çözüm.',
  },
  la22: {
    prompt: 'Was ist die Einheitsmatrix I? / Einheitsmatrix I nedir?',
    explanation: 'Diagonale = 1, sonst 0. I·A = A·I = A. / Diyagonal = 1, gerisi 0.',
  },
  la23: {
    prompt: 'Welche Operation gehört NICHT zum Gauss-Verfahren? / Gauss yöntemine hangi işlem DAHİL DEĞİLDİR?',
    explanation: 'Trick-Frage: Vertauschen, Multiplizieren, Vielfache addieren — alles erlaubt. 0 ile çarpma veya "Konstante addieren" (anderes Zeilen-Vielfaches) hariç. / Trick soru: üçü de izinli.',
  },
  la24: {
    prompt: 'Was ist der Rang einer Matrix? / Matris\'in Rang\'ı nedir?',
    explanation: 'Anzahl der linear unabhängigen Zeilen/Spalten. / Doğrusal bağımsız satır/sütun sayısı.',
  },
  la25: {
    prompt: 'Was bedeutet es, wenn das charakteristische Polynom p(λ) = det(A − λ·I) keine reellen Nullstellen hat? / Karakteristik polinomun reel kökü yoksa ne olur?',
    explanation: 'A hat keine reellen Eigenwerte (nur komplexe). / A\'nın reel Eigenwert\'ı yok (sadece karmaşık).',
  },

  // ─── Integral (Analysis II) ───────────────────────────────────────────────
  i1: {
    prompt: 'Was ist eine Stammfunktion von f(x)? / f(x)\'in Stammfunktion\'ı nedir?',
    explanation: 'Eine Funktion F(x) mit F\'(x) = f(x) — also die Umkehrung der Ableitung. / F\'(x) = f(x) olan fonksiyon — türevin tersi.',
  },
  i2: {
    prompt: 'Welches ist die Stammfunktion von f(x) = 2x? / f(x) = 2x\'in Stammfunktion\'ı nedir?',
    explanation: 'F(x) = x² + C (denn d/dx(x²) = 2x). / F(x) = x² + C.',
  },
  i3: {
    prompt: 'Welches ist die Stammfunktion von f(x) = x³? / f(x) = x³\'in Stammfunktion\'ı nedir?',
    explanation: 'F(x) = x⁴/4 + C (Potenzregel rückwärts). / F(x) = x⁴/4 + C.',
  },
  i4: {
    prompt: 'Berechne ∫ x² dx. / ∫ x² dx hesapla.',
    explanation: 'x³/3 + C (Potenzregel: Exponent + 1, durch neuen Exponent). / x³/3 + C.',
  },
  i5: {
    prompt: 'Berechne ∫ 1 dx. / ∫ 1 dx hesapla.',
    explanation: 'x + C (denn 1 = x⁰). / x + C.',
  },
  i6: {
    prompt: 'Berechne ∫ x⁵ dx. / ∫ x⁵ dx hesapla.',
    explanation: 'x⁶/6 + C (Potenzregel). / x⁶/6 + C.',
  },
  i7: {
    prompt: 'Was besagt der Hauptsatz der Differential- und Integralrechnung? / Temel Teorem (Hauptsatz) ne der?',
    explanation: '∫ₐᵇ f(x) dx = F(b) − F(a), wobei F Stammfunktion von f ist. / ∫ₐᵇ f(x) dx = F(b) − F(a).',
  },
  i8: {
    prompt: 'Berechne ∫₀² 2x dx. / ∫₀² 2x dx hesapla.',
    explanation: 'F(x) = x². [x²]₀² = 4 − 0 = 4. / Sonuç: 4.',
  },
  i9: {
    prompt: 'Berechne ∫₁³ 1 dx. / ∫₁³ 1 dx hesapla.',
    explanation: '[x]₁³ = 3 − 1 = 2. / Sonuç: 2.',
  },
  i10: {
    prompt: 'Berechne ∫₀¹ x² dx. / ∫₀¹ x² dx hesapla.',
    explanation: '[x³/3]₀¹ = 1/3 − 0 = 1/3. / Sonuç: 1/3.',
  },
  i11: {
    prompt: 'Was ist ∫ eˣ dx? / ∫ eˣ dx nedir?',
    explanation: 'eˣ + C (eˣ kendi Stammfunktion\'ıdır). / eˣ + C.',
  },
  i12: {
    prompt: 'Was ist ∫ sin(x) dx? / ∫ sin(x) dx nedir?',
    explanation: '−cos(x) + C (Ableitung von cos ist −sin). / −cos(x) + C.',
  },
  i13: {
    prompt: 'Was ist ∫ cos(x) dx? / ∫ cos(x) dx nedir?',
    explanation: 'sin(x) + C (Ableitung von sin ist cos). / sin(x) + C.',
  },
  i14: {
    prompt: 'Was ist ∫ (1/x) dx? / ∫ (1/x) dx nedir?',
    explanation: 'ln|x| + C (für x ≠ 0). / ln|x| + C.',
  },
  i15: {
    prompt: 'Wie berechnet man die Fläche zwischen f(x) und der x-Achse? / f(x) ile x-ekseni arasındaki alan nasıl hesaplanır?',
    explanation: 'A = ∫ₐᵇ |f(x)| dx (mit Nullstellen-Aufteilung). / A = ∫ₐᵇ |f(x)| dx (Nullstellen\'da böl).',
  },
  i16: {
    prompt: 'Was passiert, wenn f(x) im Intervall negativ ist? / f(x) aralıkta negatifse ne olur?',
    explanation: 'Integral ohne Betrag liefert negativen Wert. Echte Fläche = |Integral|. / Mutlak değer ile al.',
  },
  i17: {
    prompt: 'f(x) = x − 1. Nullstelle? / f(x) = x − 1 Nullstelle nerede?',
    explanation: 'f(x) = 0 → x = 1. / x = 1.',
  },
  i18: {
    prompt: 'Berechne die Fläche zwischen f(x) = 2x und der x-Achse von 0 bis 3. / f(x) = 2x, x=0 ile 3 arası alan.',
    explanation: 'A = ∫₀³ 2x dx = [x²]₀³ = 9. / A = 9.',
  },
  i19: {
    prompt: 'Wie berechnet man das Volumen eines Rotationskörpers um die x-Achse? / x-ekseni etrafında dönen cismin hacmi nasıl hesaplanır?',
    explanation: 'V = π ∫ₐᵇ f(x)² dx (Kreisscheiben summieren). / V = π ∫ₐᵇ f(x)² dx.',
  },
  i20: {
    prompt: 'Berechne das Volumen eines Kegels (Rotation von f(x) = x zwischen 0 und R). / Koni hacmini hesapla (f(x) = x, 0 ile R arası).',
    explanation: 'V = π ∫₀ᴿ x² dx = πR³/3. / V = πR³/3.',
  },
  i21: {
    prompt: 'Berechne das Volumen einer Kugel mit Radius R. / R yarıçaplı küre hacmi.',
    explanation: 'V = π ∫₋ᴿᴿ (R² − x²) dx = 4πR³/3. / V = 4πR³/3.',
  },
  i22: {
    prompt: 'Wann darf man unter dem Integral differentiieren/integreren? / Integral altında türev/integral ne zaman alınabilir?',
    explanation: 'Bei stetigen Funktionen auf geschlossenem Intervall. / Sürekli fonksiyonlar ve kapalı aralık.',
  },
  i23: {
    prompt: 'Was bedeutet ∫ₐᵃ f(x) dx? / ∫ₐᵃ f(x) dx ne demek?',
    explanation: '0 (Intervall der Länge 0). / 0.',
  },
  i24: {
    prompt: '∫ₐᵇ + ∫ᵦᶜ wenn a<b<c? / ∫ₐᵇ + ∫ᵦᶜ neye eşit?',
    explanation: '= ∫ₐᶜ (Intervalladditivität). / = ∫ₐᶜ.',
  },
  i25: {
    prompt: 'Berechne ∫₋₁¹ x² dx. / ∫₋₁¹ x² dx hesapla.',
    explanation: 'x² gerade, symmetrisches Intervall: 2 · ∫₀¹ x² dx = 2/3. / 2/3.',
  },
  i26: {
    prompt: 'Berechne ∫₋₁¹ x³ dx. / ∫₋₁¹ x³ dx hesapla.',
    explanation: 'x³ ungerade, symmetrisches Intervall: 0. / 0.',
  },
  i27: {
    prompt: 'Welche Funktion ist die Ableitung von F(x) = −cos(x)? / F(x) = −cos(x)\'in türevi nedir?',
    explanation: 'f(x) = sin(x) (Ableitung von −cos ist sin). / f(x) = sin(x).',
  },
};

export function getMathTranslation(id: string): MathTranslation | undefined {
  return mathTranslations[id];
}
