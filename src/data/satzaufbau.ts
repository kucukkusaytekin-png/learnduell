import type { Module, Topic, Question } from '../types';
import { mathematikModule } from './mathematik';
import { stilModule } from './stil';
import { englischModule } from './englisch';

// Helper: shuffle and pick 4 options for MCQ
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

const satzarten: Topic = {
  id: 'satzarten',
  title: 'Satzarten',
  summary: 'Aussagesatz, Fragesatz, Aufforderungssatz und ihre Besonderheiten.',
  lesson: {
    intro:
      'Im Deutschen unterscheidet man vier Hauptarten von Sätzen. Jede Satzart hat ihre eigene Wortstellung und Funktion.',
    rules: [
      {
        title: 'Aussagesatz (Statement)',
        body: 'Normale Mitteilung. Das konjugierte Verb steht an zweiter Position. Am Ende steht ein Punkt.',
        examples: [
          'Ich gehe heute zur Schule.',
          'Das Wetter ist schön.',
          'Morgen haben wir keine Mathematik.',
        ],
      },
      {
        title: 'Fragesatz (Question)',
        body: 'Es gibt zwei Arten: W-Fragen beginnen mit einem Fragewort (das Verb folgt direkt), Ja/Nein-Fragen beginnen mit dem konjugierten Verb.',
        examples: [
          'Wann fängt die Schule an? (W-Frage)',
          'Kommst du mit? (Ja/Nein-Frage)',
          'Warum hast du das gemacht?',
        ],
      },
      {
        title: 'Aufforderungssatz (Imperativ)',
        body: 'Eine Bitte oder ein Befehl. Das Verb steht meist an erster Stelle. Die du-Form lässt das Subjekt weg.',
        examples: [
          'Geh zur Tafel!',
          'Öffne bitte das Buch auf Seite 42.',
          'Seid leise, bitte.',
        ],
      },
      {
        title: 'Ausrufesatz (Exclamation)',
        body: 'Drückt eine starke Emotion aus. Endet mit einem Ausrufezeichen. Beginnt oft mit Wie oder Was.',
        examples: [
          'Wie schön das Wetter heute ist!',
          'Das ist ja unglaublich!',
          'Was für ein schöner Tag!',
        ],
      },
    ],
  },
  questions: [
    makeMcq('sa1', 'Welche Satzart liegt vor?\n\n„Komm bitte pünktlich!"', 'Aufforderungssatz', ['Aussagesatz', 'Fragesatz', 'Ausrufesatz'], 'Imperativ mit „bitte" — eine höfliche Aufforderung. Das Verb steht am Satzanfang.', 1, ['satzart']),
    makeMcq('sa2', 'Welche Satzart ist das?\n\n„Wie schnell die Zeit vergeht!"', 'Ausrufesatz', ['Fragesatz', 'Aussagesatz', 'Aufforderungssatz'], 'Beginnt mit „Wie" und drückt ein Staunen aus — typisch für einen Ausruf.', 2, ['satzart']),
    makeMcq('sa3', 'Welche Satzart?\n\n„Gestern hat meine Schwester Geburtstag gefeiert."', 'Aussagesatz', ['Fragesatz', 'Aufforderungssatz', 'Ausrufesatz'], 'Normale Mitteilung, Verb an zweiter Position, Punkt am Ende — Aussagesatz.', 1, ['satzart']),
    makeMcq('sa4', 'Welche Satzart?\n\n„Hast du morgen Zeit?"', 'Ja/Nein-Frage', ['W-Frage', 'Aussagesatz', 'Aufforderungssatz'], 'Mit dem Verb „hast" begonnen — typische Ja/Nein-Frage. Eine Antwort mit „Ja" oder „Nein" ist möglich.', 2, ['satzart']),
    makeMcq('sa5', 'Welche Satzart?\n\n„Warum regnet es schon wieder?"', 'W-Frage', ['Aussagesatz', 'Ja/Nein-Frage', 'Aufforderungssatz'], 'Beginnt mit dem Fragewort „Warum", das Verb folgt direkt — W-Frage.', 2, ['satzart']),
    makeMcq('sa6', 'Welche Satzart?\n\n„Lies bitte den Text bis morgen."', 'Aufforderungssatz', ['Aussagesatz', 'Fragesatz', 'Ausrufesatz'], 'Imperativ in der du-Form. Das Subjekt „du" ist weggelassen.', 2, ['satzart']),
  ],
};

const satzglieder: Topic = {
  id: 'satzglieder',
  title: 'Satzglieder',
  summary: 'Subjekt, Prädikat, Objekt und adverbiale Bestimmungen erkennen.',
  lesson: {
    intro:
      'Ein Satz besteht aus verschiedenen Satzgliedern. Wer sie erkennt, versteht die Satzstruktur und kann eigene Sätze sicher bilden.',
    rules: [
      {
        title: 'Subjekt (Wer? Was?)',
        body: 'Steht fast immer im Nominativ. Es bestimmt, ob das Verb in der Einzahl oder Mehrzahl steht. Man erkennt es mit der Frage „Wer oder was?"',
        examples: [
          'Der Lehrer (Subjekt) erklärt die Aufgabe.',
          'Die Kinder spielen im Park.',
          'Wissenschaft ist spannend.',
        ],
      },
      {
        title: 'Prädikat (Was tut jemand?)',
        body: 'Das konjugierte Verb (und evtl. Hilfsverben). Bildet den Kern des Satzes.',
        examples: [
          'Sie liest ein Buch.',
          'Er hat das Spiel gewonnen.',
          'Wir werden morgen anfangen.',
        ],
      },
      {
        title: 'Akkusativobjekt (Wen? Was?)',
        body: 'Steht im Akkusativ. Erkennt man mit der Frage „wen oder was?".',
        examples: [
          'Ich sehe den Mann.',
          'Sie liest ein Buch.',
          'Wir treffen unsere Freunde.',
        ],
      },
      {
        title: 'Dativobjekt (Wem?)',
        body: 'Steht im Dativ. Erkennt man mit der Frage „wem?".',
        examples: [
          'Ich helfe meinem Bruder.',
          'Sie schreibt ihrer Freundin.',
          'Das Buch gehört mir.',
        ],
      },
      {
        title: 'Adverbiale Bestimmung',
        body: 'Gibt Auskunft über Zeit, Ort, Grund, Art und Weise. Erkennt man mit W-Fragen (wann, wo, warum, wie).',
        examples: [
          'Gestern (Zeit) bin ich ins Kino (Ort) gegangen.',
          'Wegen des Regens (Grund) bleiben wir zu Hause.',
          'Sie singt schön (Art und Weise).',
        ],
      },
    ],
  },
  questions: [
    makeMcq('sg1', 'Welches Satzglied ist „meinem Bruder"?\n\n„Ich helfe meinem Bruder."', 'Dativobjekt', ['Akkusativobjekt', 'Subjekt', 'Adverbiale Bestimmung'], '„Wem hilfst du?" → meinem Bruder. Steht im Dativ.', 2, ['satzglied']),
    makeMcq('sg2', 'Welches Satzglied ist „gestern"?\n\n„Gestern habe ich meine Hausaufgaben gemacht."', 'Adverbiale Bestimmung (Zeit)', ['Subjekt', 'Akkusativobjekt', 'Prädikat'], '„Wann?" → gestern. Eine adverbiale Bestimmung der Zeit.', 1, ['satzglied']),
    makeMcq('sg3', 'Welches Satzglied ist „den Film"?\n\n„Wir schauen uns den Film an."', 'Akkusativobjekt', ['Dativobjekt', 'Subjekt', 'Adverbiale Bestimmung'], '„Wen oder was schauen wir an?" → den Film. Akkusativ.', 2, ['satzglied']),
    makeMcq('sg4', 'Welches Satzglied ist „Die Schülerin"?\n\n„Die Schülerin schreibt einen Brief."', 'Subjekt', ['Akkusativobjekt', 'Dativobjekt', 'Adverbiale Bestimmung'], '„Wer schreibt?" → Die Schülerin. Bestimmt die Verbform „schreibt".', 1, ['satzglied']),
    makeMcq('sg5', 'Welches Satzglied ist „im Park"?\n\n„Die Kinder spielen im Park."', 'Adverbiale Bestimmung (Ort)', ['Dativobjekt', 'Akkusativobjekt', 'Subjekt'], '„Wo spielen sie?" → im Park. Adverbiale Bestimmung des Ortes.', 2, ['satzglied']),
    makeMcq('sg6', 'Welches Satzglied ist „ihrer Freundin"?\n\n„Sie schreibt ihrer Freundin einen Brief."', 'Dativobjekt', ['Akkusativobjekt', 'Subjekt', 'Adverbiale Bestimmung'], '„Wem schreibt sie?" → ihrer Freundin. Steht im Dativ, „einen Brief" ist das Akkusativobjekt.', 3, ['satzglied']),
  ],
};

const konnektoren: Topic = {
  id: 'konnektoren',
  title: 'Konnektoren',
  summary: 'Verbindungswörter zwischen Sätzen und Satzgliedern — mit Bedeutung und Wirkung.',
  lesson: {
    intro:
      'Konnektoren verbinden Hauptsätze und Nebensätze. Sie bestimmen die Bedeutung (kausal, temporal, konzessiv …) und oft die Wortstellung.',
    rules: [
      {
        title: 'Kausale Konnektoren (Grund/Ursache)',
        body: 'Beantworten die Frage „Warum?". Weil leitet einen Nebensatz ein (Verb am Ende).',
        examples: [
          'Ich bleibe zu Hause, weil ich krank bin.',
          'Da es regnet, gehen wir nicht raus.',
          'Wegen des Wetters bleiben wir drinnen.',
        ],
      },
      {
        title: 'Temporale Konnektoren (Zeit)',
        body: 'Beantworten die Frage „Wann?". Während, bevor, nachdem, als, sobald.',
        examples: [
          'Während ich esse, sehe ich fern.',
          'Nachdem er angekommen war, rief er an.',
          'Bevor du gehst, schließe das Fenster.',
        ],
      },
      {
        title: 'Konzessive Konnektoren (Gegensatz/Einschränkung)',
        body: 'Drücken einen Gegensatz aus. „Obwohl" — etwas ist trotzdem so.',
        examples: [
          'Obwohl es regnet, gehen wir spazieren.',
          'Auch wenn es schwer ist, schaffen wir es.',
          'Trotz seiner Erfahrung hat er verloren.',
        ],
      },
      {
        title: 'Finale Konnektoren (Zweck)',
        body: 'Drücken einen Zweck aus. „Damit" — wozu?',
        examples: [
          'Ich lerne viel, damit ich die Prüfung bestehe.',
          'Er spricht leise, um niemanden zu stören.',
        ],
      },
      {
        title: 'Konditionale Konnektoren (Bedingung)',
        body: 'Drücken eine Bedingung aus. „Wenn", „falls".',
        examples: [
          'Wenn du Zeit hast, ruf mich an.',
          'Falls es Probleme gibt, sag Bescheid.',
        ],
      },
    ],
  },
  questions: [
    makeMcq('k1', 'Welcher Konnektor passt?\n\n„___ es regnet, gehen wir spazieren."', 'Obwohl', ['Weil', 'Damit', 'Bevor'], 'Trotz Regens geht sie spazieren — Konzessiv. „Obwohl" leitet einen Nebensatz mit Gegensatz ein.', 2, ['konnektor', 'konzessiv']),
    makeMcq('k2', 'Welcher Konnektor passt?\n\n„Ich lerne viel, ___ ich die Prüfung bestehe."', 'damit', ['obwohl', 'während', 'nachdem'], 'Zweck: ich will bestehen. „Damit" leitet einen Finalsatz ein.', 2, ['konnektor', 'final']),
    makeMcq('k3', 'Welcher Konnektor passt?\n\n„___ ich esse, sehe ich fern."', 'Während', ['Bevor', 'Damit', 'Obwohl'], 'Zwei Handlungen gleichzeitig → temporal. „Während" passt.', 2, ['konnektor', 'temporal']),
    makeMcq('k4', 'Welcher Konnektor passt?\n\n„Ich bleibe zu Hause, ___ ich krank bin."', 'weil', ['obwohl', 'während', 'damit'], 'Grund: ich bin krank → kausaler Nebensatz mit „weil".', 1, ['konnektor', 'kausal']),
    makeMcq('k5', 'Welcher Konnektor passt?\n\n„___ du Zeit hast, ruf mich an."', 'Wenn', ['Während', 'Obwohl', 'Damit'], 'Bedingung: nur wenn Zeit da ist. „Wenn" leitet Konditionalsatz ein.', 2, ['konnektor', 'konditional']),
    makeMcq('k6', 'Welcher Konnektor passt?\n\n„___ er angekommen war, rief er sofort an."', 'Nachdem', ['Während', 'Obwohl', 'Damit'], 'Vorzeitigkeit: nach der Ankunft passierte etwas. „Nachdem" + Plusquamperfekt.', 3, ['konnektor', 'temporal']),
  ],
};

const relativsaetze: Topic = {
  id: 'relativsaetze',
  title: 'Relativsätze',
  summary: 'Nebensätze, die ein Nomen genauer beschreiben — mit Relativpronomen.',
  lesson: {
    intro:
      'Relativsätze beschreiben ein Nomen genauer. Sie werden mit Relativpronomen (der, die, das, welcher, …) eingeleitet. Das Verb steht am Ende.',
    rules: [
      {
        title: 'Relativpronomen (der/die/das)',
        body: 'Richtet sich nach Genus und Numerus des Bezugsworts. Der Kasus richtet sich nach der Rolle im Relativsatz.',
        examples: [
          'Der Mann, der dort steht, ist mein Lehrer.',
          'Die Frau, die ich kenne, kommt aus Berlin.',
          'Das Buch, das ich lese, ist spannend.',
        ],
      },
      {
        title: 'Relativsatz im Akkusativ',
        body: 'Wenn das Relativpronomen im Relativsatz Akkusativ-Objekt ist, bleibt die Form gleich wie im Nominativ (außer bei Personen im Dativ/Genitiv).',
        examples: [
          'Der Film, den ich gestern gesehen habe, war gut.',
          'Die Stadt, die ich besuchen will, ist Rom.',
        ],
      },
      {
        title: 'Relativsatz im Dativ',
        body: 'Wenn das Relativpronomen im Relativsatz Dativ-Objekt ist, verwendet man „dem/der/denen".',
        examples: [
          'Meine Freundin, der ich vertraue, hilft mir immer.',
          'Die Leute, denen wir geholfen haben, haben sich bedankt.',
        ],
      },
      {
        title: 'Relativsatz mit „welcher"',
        body: 'Kann statt der/die/das verwendet werden, besonders in geschriebener Sprache.',
        examples: [
          'Das Buch, welches ich lese, ist spannend.',
          'Die Studenten, welche die Prüfung bestanden haben, feiern.',
        ],
      },
    ],
  },
  questions: [
    makeMcq('r1', 'Welches Relativpronomen passt?\n\n„Das Buch, ___ ich lese, ist spannend."', 'das', ['der', 'die', 'denen'], '„Das Buch" ist sächlich (das). Im Relativsatz ist es Akkusativ-Objekt → „das".', 2, ['relativ', 'akkusativ']),
    makeMcq('r2', 'Welches Relativpronomen passt?\n\n„Der Mann, ___ dort steht, ist mein Onkel."', 'der', ['den', 'dem', 'dessen'], '„Der Mann" → der Mann (maskulin). Steht im Nominativ im Relativsatz → „der".', 2, ['relativ', 'nominativ']),
    makeMcq('r3', 'Welches Relativpronomen passt?\n\n„Meine Freundin, ___ ich vertraue, ist sehr ehrlich."', 'der', ['die', 'das', 'denen'], '„Meine Freundin" (fem., Sing., Nom.). Im Relativsatz Dativ → „der" (fem. Dat. = „der").', 3, ['relativ', 'dativ']),
    makeMcq('r4', 'Welches Relativpronomen passt?\n\n„Die Leute, ___ wir geholfen haben, haben sich bedankt."', 'denen', ['die', 'der', 'das'], '„Die Leute" (Plural). Im Relativsatz Dativ Plural → „denen".', 3, ['relativ', 'dativ']),
    makeMcq('r5', 'Welches Relativpronomen passt?\n\n„Der Film, ___ wir gestern gesehen haben, war langweilig."', 'den', ['der', 'dem', 'dessen'], '„Der Film" (mask.). Im Relativsatz Akkusativ → „den".', 2, ['relativ', 'akkusativ']),
    makeMcq('r6', 'Welches Relativpronomen passt?\n\n„Das Mädchen, ___ Mutter Lehrerin ist, singt gern."', 'dessen', ['das', 'der', 'dem'], 'Besitz: Die Mutter des Mädchens. Genitiv Relativpronomen → „dessen".', 3, ['relativ', 'genitiv']),
  ],
};

// ─── Lyrik-Analyse (EF / 11. sınıf + Q1) ──────────────────────────────────
// Metrum, Reim, Bildsprache, lyrisches Ich — Pflichtthema Oberstufe

const lyrik: Topic = {
  id: 'lyrik-analyse',
  title: 'Lyrik-Analyse',
  summary: 'Metrum, Reim, Bildsprache, lyrisches Ich — Gedichte verstehen und interpretieren.',
  lesson: {
    intro:
      'Lyrik-Analyse ist in der Oberstufe Pflicht (EF, Q1, Q2). Du musst ein Gedicht auf Form, Sprache, Inhalt und Wirkung untersuchen. Die wichtigsten Werkzeuge: Metrum (Jambus, Trochäus, Daktylus), Reimschema, Bildsprache (Metapher, Vergleich, Personifikation, Symbol) und die Frage nach dem lyrischen Ich.',
    rules: [
      {
        title: 'Metrum (Versmaß)',
        body: 'Metrum beschreibt das rhythmische Muster betonter und unbetonter Silben. Hebung (/) = betont, Senkung (u) = unbetont.',
        examples: [
          'Jambus (/u): „Der Knabe /u saß /u auf /u der /u Mau\u2010/er" — meist vierhebig.',
          'Trochäus (u/): „Wei\u2010/ße /u Wol\u2010/ken /u zie\u2010/hen" — fallend.',
          'Daktylus (/uu): „Wei\u2010/ße /u Ro\u2010/ße /u" — fallend mit drei Silben.',
          'Anapäst (u//): „Es war /u/ ei\u2010/ne /u/ Mut\u2010/ter" — steigend mit drei Silben.',
        ],
      },
      {
        title: 'Reimschema',
        body: 'Reime zwischen Versen werden mit Kleinbuchstaben markiert: aabb = Paarreim, abab = Kreuzreim, abba = umarmender Reim, aba (oder abacb…) = Schweifreim.',
        examples: [
          'Paarreim (aabb): klassisch, ruhig — „Abendrot / Morgenbrot" (a-a).',
          'Kreuzreim (abab): Spannung durch Wechsel — „Liebe / Treue / Hiebe / Reue" (a-b-a-b).',
          'Umarmender Reim (abba): ein Paar umschließt das andere — Rahmenwirkung.',
          'Binnenreim: reimt innerhalb einer Zeile — verstärkt Klangwirkung.',
        ],
      },
      {
        title: 'Kadenz (Versende)',
        body: 'Steigende Kadenz: Schlusssilbe des Verses ist unbetont (typisch für Jambus). Fallende Kadenz: Schlusssilbe ist betont (typisch für Trochäus, Daktylus).',
        examples: [
          'Jambus → steigende Kadenz (weibliche Endung).',
          'Trochäus → fallende Kadenz (männliche Endung).',
        ],
      },
      {
        title: 'Strophe, Vers, Enjambement',
        body: 'Strophe = Absatz aus mehreren Versen. Vers = einzelne Zeile. Enjambement = Vers geht über Strophengrenze hinaus (Satz läuft weiter).',
        examples: [
          'Terzett = 3-zeilige Strophe, Quartett = 4-zeilige.',
          'Sonett = 14 Verse in 2 Quartetten + 2 Terzetten (Petrarkistisch) oder 3 Quartette + Couplet (Shakespeare-Sonett).',
          'Enjambement erzeugt Spannung, weil das erwartete Strophenende durchbrochen wird.',
        ],
      },
      {
        title: 'Bildsprache (Tropen)',
        body: 'Metapher, Vergleich, Personifikation, Symbol — Lyrik lebt von Bildern.',
        examples: [
          'Metapher: direkte Übertragung — „Die Stadt ist ein Dschungel" (ohne „wie").',
          'Vergleich: mit „wie" oder „als" — „Mutig wie ein Löwe".',
          'Personifikation: abstrakte Begriffe werden vermenschlicht — „Der Wind flüstert".',
          'Symbol: gegenständliches Bild mit tieferer Bedeutung — Rose = Liebe, Taube = Frieden, Kreuz = Leid.',
        ],
      },
      {
        title: 'Lyrisches Ich & Sprechsituation',
        body: 'Das lyrische Ich ist nicht der Autor, sondern die Sprechstimme im Gedicht. Es ist situationsgebunden, oft an einem Ort, zu einer Zeit, in einer Stimmung.',
        examples: [
          'Frage: Wer spricht? An wen? In welcher Situation?',
          'Beispiel: Goethes „Erlkönig" — Vater, Kind und Erlkönig als Stimmen.',
          'Das lyrische Ich kann „ich" sagen oder auch unpersönlich bleiben.',
        ],
      },
    ],
  },
  questions: [
    // Metrum
    makeMcq('ly1', 'Was beschreibt das Metrum in einem Gedicht?',
      'Das rhythmische Muster aus betonten und unbetonten Silben.',
      ['Den Inhalt', 'Den Reim', 'Die Anzahl der Strophen'],
      'Metrum = Versmaß = die regelmäßige Abfolge von Hebungen (betont) und Senkungen (unbetont).',
      1, ['lyrik', 'metrum']),
    makeMcq('ly2', 'Welches Metrum hat ein Jambus?',
      '/u (Hebung-Senkung, steigend)',
      ['u/ (Senkung-Hebung, fallend)', '/uu', 'uu/'],
      'Jambus = betont-unbetont. Beispiel: „Der Knabe saß auf der Mauer" — jedes zweite Silbe steigt.',
      2, ['lyrik', 'metrum']),
    makeMcq('ly3', 'Welches Metrum hat ein Trochäus?',
      'u/ (Senkung-Hebung, fallend)',
      ['/u (steigend)', '/uu', 'uu/'],
      'Trochäus = unbetont-betont. Beispiel: „Weiße Wolken ziehen" — fallender Rhythmus.',
      2, ['lyrik', 'metrum']),
    makeMcq('ly4', 'Welches Metrum hat ein Daktylus?',
      '/uu (Hebung + 2 Senkungen)',
      ['/u', 'u/', 'uu/'],
      'Daktylus = drei Silben, betont + zwei unbeton. Beispiel: „Weiße Roße" (alte Schreibung) — wie ein galoppierendes Pferd.',
      2, ['lyrik', 'metrum']),
    makeMcq('ly5', 'Welches Metrum passt zu „Es war /u/ eine Mutter /u/"?',
      'Anapäst (u//)',
      ['Jambus (/u)', 'Trochäus (u/)', 'Daktylus (/uu)'],
      'Anapäst: zwei unbetonte Silben gefolgt von einer betonten — gibt vorwärts treibenden Rhythmus (oft in Balladen und Volksliedern).',
      3, ['lyrik', 'metrum']),

    // Reim
    makeMcq('ly6', 'Was ist ein Paarreim?',
      'aabb — benachbarte Verse reimen sich (1+2, 3+4).',
      ['abab', 'abba', 'aba'],
      'Beispiel: „Im Wald / da sind die Räuber / im Haus / da sind die Träumer" — die 1.+2. reimen, dann 3.+4.',
      1, ['lyrik', 'reim']),
    makeMcq('ly7', 'Was ist ein Kreuzreim?',
      'abab — Vers 1 reimt mit 3, Vers 2 mit 4.',
      ['aabb', 'abba', 'aa'],
      'Kreuzreim: Reimschema wechselt zwischen den Versen. Sehr häufig in der deutschen Lyrik.',
      1, ['lyrik', 'reim']),
    makeMcq('ly8', 'Was ist ein umarmender Reim?',
      'abba — zwei Verse werden von einem anderen Paar umschlossen.',
      ['aabb', 'abab', 'aba'],
      'Der erste reimt mit dem vierten, der zweite und dritte miteinander. Wirkt wie ein Rahmen.',
      2, ['lyrik', 'reim']),
    makeMcq('ly9', 'Was ist ein Binnenreim?',
      'Ein Reim innerhalb einer einzigen Zeile.',
      ['Ein Reim zwischen Strophen', 'Ein Reim zwischen Versen 1+2', 'Ein fehlender Reim'],
      'Binnenreim: reimende Wörter im selben Vers. Beispiel: „Mit Zittern und mit Zagen" (altmodisch).',
      2, ['lyrik', 'reim']),

    // Strophe / Form
    makeMcq('ly10', 'Wie viele Verse hat ein klassisches Sonett?',
      '14 Verse (in 2 Quartetten + 2 Terzetten)',
      ['12', '8', '16'],
      'Petrarkistisches Sonett: 4+4+3+3 Verse. Shakespeare-Sonett: 3×4+2. Insgesamt 14 Verse.',
      2, ['lyrik', 'form']),
    makeMcq('ly11', 'Was ist ein Enjambement?',
      'Ein Satz geht über die Strophengrenze hinaus.',
      ['Ein Reim am Versende', 'Eine Strophe mit 3 Versen', 'Eine Wiederholung'],
      'Enjambement (frz. „Überspringen"): der Satz läuft weiter, obwohl die Strophe zu Ende ist. Erzeugt Spannung.',
      2, ['lyrik', 'form']),
    makeMcq('ly12', 'Was ist eine Terzine?',
      'Eine Strophe aus drei Versen.',
      ['Ein Reimschema', 'Eine Strophe aus vier Versen', 'Ein Metrum'],
      'Terzett = 3-zeilige Strophe. Quartett = 4-zeilig. Terzine kann auch eine reimtechnische Fortsetzungskette bezeichnen (Dante).',
      2, ['lyrik', 'form']),

    // Kadenz
    makeMcq('ly13', 'Was ist eine „steigende Kadenz"?',
      'Der Vers endet auf einer unbetonten Silbe.',
      ['Der Vers endet auf einer betonten Silbe', 'Der Vers reimt mit dem nächsten', 'Der Vers beginnt mit einer Hebung'],
      'Steigende Kadenz (weibliche Endung): Jambus typisch. Beispiel: „Es war /u/ eine Mut-/u/ter" — letzte Silbe „ter" ist Senkung.',
      2, ['lyrik', 'kadenz']),
    makeMcq('ly14', 'Was ist eine „fallende Kadenz"?',
      'Der Vers endet auf einer betonten Silbe.',
      ['Der Vers endet auf einer unbetonten Silbe', 'Der Vers reimt nicht', 'Der Vers hat kein Metrum'],
      'Fallende Kadenz (männliche Endung): Trochäus, Daktylus typisch. Wirkt abschließend, kraftvoll.',
      2, ['lyrik', 'kadenz']),

    // Bildsprache
    makeMcq('ly15', 'Was ist eine Metapher?',
      'Eine direkte Übertragung ohne „wie" — „Die Stadt ist ein Dschungel".',
      ['Ein Vergleich mit „wie"', 'Eine wörtliche Beschreibung', 'Ein Oberbegriff'],
      'Metapher = bildlicher Ausdruck, bei dem das Bild ohne Vergleichswort direkt für das Eigentliche steht.',
      1, ['lyrik', 'bildsprache']),
    makeMcq('ly16', 'Was ist ein Vergleich (Simile)?',
      'Eine Verknüpfung mit „wie" oder „als" — „Mutig wie ein Löwe".',
      ['Eine direkte Übertragung', 'Eine Personifikation', 'Ein Symbol'],
      'Vergleich/Simile: das Bild wird mit „wie" oder „als" eingeführt. Verdeutlicht, ohne vollständig zu ersetzen.',
      1, ['lyrik', 'bildsprache']),
    makeMcq('ly17', 'Was ist eine Personifikation?',
      'Eine abstrakte Sache wird vermenschlicht — „Der Wind flüstert".',
      ['Eine Metapher', 'Ein Vergleich', 'Ein Symbol'],
      'Personifikation: unbelebte Dinge bekommen menschliche Eigenschaften oder Handlungen.',
      2, ['lyrik', 'bildsprache']),
    makeMcq('ly18', 'Was ist ein Symbol?',
      'Ein Bild mit tieferer Bedeutung — Rose = Liebe, Taube = Frieden.',
      ['Eine wörtliche Beschreibung', 'Ein Vergleich', 'Eine Metapher'],
      'Symbol: ein konkreter Gegenstand steht für eine abstrakte Bedeutung. Rose = Liebe/Schönheit, Kreuz = Leid, Wasser = Leben/Tod.',
      2, ['lyrik', 'bildsprache']),

    // Lyrisches Ich
    makeMcq('ly19', 'Was ist das lyrische Ich?',
      'Die Sprechstimme im Gedicht — sie ist nicht der Autor.',
      ['Immer der Autor selbst', 'Eine historische Person', 'Eine mythologische Figur'],
      'Das lyrische Ich ist eine fiktive Sprechhaltung. Es kann „ich" sagen, aber es ist nicht der reale Dichter. Es ist an eine konkrete Situation gebunden.',
      1, ['lyrik', 'sprecher']),
    makeMcq('ly20', 'Welche Frage hilft, das lyrische Ich zu beschreiben?',
      'Wer spricht, an wen, in welcher Situation, in welcher Stimmung?',
      ['Wie alt ist der Dichter?', 'Wann wurde das Gedicht geschrieben?', 'In welcher Stadt?'],
      'Diese vier W-Fragen helfen, das lyrische Ich zu charakterisieren. Wichtig für die Einleitung einer Gedichtanalyse.',
      2, ['lyrik', 'sprecher']),

    // Beispiele / Klassiker
    makeMcq('ly21', 'Welche Stimme spricht in Goethes „Erlkönig"?',
      'Vater, Kind, Erlkönig und Erzähler — vier Stimmen in einer Ballade.',
      ['Nur das Kind', 'Nur der Vater', 'Nur der Erzähler'],
      'Die Ballade hat vier Stimmen, jede in eigenem Versmaß. Vater (Jambus beruhigend), Kind (Anapäst ängstlich), Erlkönig (Trikolon verführerisch), Erzähler (knapp).',
      3, ['lyrik', 'beispiel']),
    makeMcq('ly22', 'Was ist ein Volkslied typisch?',
      'Einfache Sprache, eingängiger Rhythmus, Strophenform, Reimschema.',
      ['Komplexe Metaphern', 'Lange freie Verse', 'Enjambement über mehrere Strophen'],
      'Volkslieder: schlichte Sprache, oft Paarreim, daktylischer Rhythmus — leicht zu singen und zu merken.',
      2, ['lyrik', 'volkslied']),
    makeMcq('ly23', 'Was versteht man unter „freien Versen"?',
      'Verse ohne festes Metrum und ohne festes Reimschema.',
      ['Verse mit viel Metaphern', 'Lange Strophen', 'Verse auf Französisch'],
      'Freie Verse (ab ca. 1900) brechen mit klassischen Regeln — kein festes Metrum, keine Reime. Vertreter: Rilke, Brecht, Enzensberger.',
      2, ['lyrik', 'frei']),
    makeMcq('ly24', 'Welcher Dichter ist für „freie Verse" bekannt?',
      'Rainer Maria Rilke, Bertolt Brecht, Hans Magnus Enzensberger.',
      ['Heinrich Heine', 'Friedrich Schiller', 'Johann Wolfgang von Goethe'],
      'Rilke („Herbsttag"), Brecht, Enzensberger — typische Vertreter der Moderne. Sie brechen klassische Formen bewusst.',
      2, ['lyrik', 'frei']),
    makeMcq('ly25', 'In welcher Reihenfolge gliedert man eine Gedichtanalyse?',
      'Einleitung → Hauptteil (Form, Sprache, Inhalt) → Deutung/Zusammenfassung',
      ['Inhalt → Schluss → Einleitung', 'Nur Inhalt', 'Nur Reime auflisten'],
      'Standard-Struktur: Einleitung (Autor, Titel, Thema, Metrum, Reimschema), Hauptteil (genau), Schluss (Wirkung, Deutung).',
      2, ['lyrik', 'aufsatz']),
  ],
};

export const satzaufbauModule: Module = {
  id: 'satzaufbau',
  title: 'Deutsch Satzaufbau',
  description: 'Satzarten, Satzglieder, Konnektoren, Relativsätze, Lyrik — das Fundament für die Abiturprüfung.',
  icon: 'book',
  color: 'pink',
  topics: [satzarten, satzglieder, konnektoren, relativsaetze, lyrik],
};

export { mathematikModule };
export { stilModule };
export { englischModule };
export const modules: Module[] = [satzaufbauModule, mathematikModule, stilModule, englischModule];

export function getModule(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getTopic(moduleId: string, topicId: string): Topic | undefined {
  return getModule(moduleId)?.topics.find((t) => t.id === topicId);
}

export function getRandomQuestions(moduleId: string, count = 10): Question[] {
  const mod = getModule(moduleId);
  if (!mod) return [];
  const all = mod.topics.flatMap((t) => t.questions);
  // Shuffle and take count, then sort by difficulty for fair progression
  return [...all].sort(() => Math.random() - 0.5).slice(0, count).sort((a, b) => a.difficulty - b.difficulty);
}
