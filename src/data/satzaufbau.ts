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

export const satzaufbauModule: Module = {
  id: 'satzaufbau',
  title: 'Deutsch Satzaufbau',
  description: 'Satzarten, Satzglieder, Konnektoren, Relativsätze — das Fundament für die Abiturprüfung.',
  icon: 'book',
  color: 'pink',
  topics: [satzarten, satzglieder, konnektoren, relativsaetze],
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
