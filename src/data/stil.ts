import type { Module, Topic, Question } from '../types';

function makeMcq(
  id: string,
  prompt: string,
  correct: string,
  distractors: string[],
  explanation: string,
  difficulty: 1 | 2 | 3,
  tags: string[],
  solutionSteps?: string[]
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
    solutionSteps,
  };
}

function makeRewrite(
  id: string,
  givenSentence: string,
  prompt: string,
  modelAnswer: string,
  acceptedAnswers: string[],
  explanation: string,
  difficulty: 1 | 2 | 3,
  tags: string[],
  solutionSteps?: string[]
): Question {
  return {
    id,
    type: 'rewrite',
    prompt,
    givenSentence,
    correctAnswer: modelAnswer,
    acceptedAnswers,
    explanation,
    difficulty,
    tags,
    solutionSteps,
  };
}

const stilregister: Topic = {
  id: 'stilregister',
  title: 'Stilregister',
  summary: 'Umgangssprache, Standardsprache und gehobene Sprache sicher unterscheiden und anwenden.',
  lesson: {
    intro:
      'Im Deutschen gibt es drei große Sprachregister. Welches du wählst, hängt von der Situation ab — Klassenarbeit oder WhatsApp-Nachricht sind zwei Welten.',
    rules: [
      {
        title: 'Umgangssprache (gesprochen / informell)',
        body: 'Locker, kurz, mit Umgangswörtern. Für Freunde, Chat, gesprochene Sprache.',
        examples: [
          '"Hey, was geht?"',
          '"Das Buch war echt krass."',
          '"Ich find das nice."',
        ],
      },
      {
        title: 'Standardsprache (allgemein gültig)',
        body: 'Korrekte Grammatik, alltagsnah. Für Aufsätze, Bewerbungen, allgemeine Texte.',
        examples: [
          '"Das Buch hat mir sehr gut gefallen."',
          '"Ich finde das interessant."',
          '"Wir müssen das ändern."',
        ],
      },
      {
        title: 'Gehobene Sprache (förmlich / literarisch)',
        body: 'Bildungs- oder literatursprachlich, komplexe Strukturen. Für Erörterungen, Analysen, anspruchsvolle Texte.',
        examples: [
          '"Das Werk erweist sich als ausgesprochen fesselnd."',
          '"Dieser Umstand erweist sich als äußerst bedeutsam."',
          '"Es bedarf einer grundlegenden Revision."',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'sr1',
      'Welches Register passt zu einer Erörterung im Abitur?',
      'Gehobene Sprache',
      ['Umgangssprache', 'Standardsprache', 'Fachsprache Medizin'],
      'Abitur-Erörterungen verlangen gehobene Sprache: komplexe Sätze, präzise Ausdrucksweise.',
      1,
      ['stil', 'register'],
      [
        'Definition: Das Sprachregister richtet sich nach der Situation und dem Adressaten.',
        'Im Abitur schreibst du für eine Lehrkraft — förmlich, differenziert.',
        'Vergleiche: Umgangssprache ("Ich find das cool") wirkt hier unpassend.',
        'Gehobene Sprache ("Das Werk erweist sich als fesselnd") ist angemessen.',
      ]
    ),
    makeMcq(
      'sr2',
      'Welcher Satz ist in gehobener Sprache?',
      'Dieser Umstand erweist sich als äußerst bedeutsam.',
      ['Das ist voll wichtig.', 'Das ist sehr wichtig.', 'Das ist echt krass.'],
      'Erweist sich als + bedeutsam sind typisch gehoben. "Voll wichtig" ist Umgangssprache.',
      2,
      ['stil', 'register'],
      [
        'Lese alle Optionen und achte auf Wortwahl und Satzbau.',
        '"Voll wichtig", "sehr wichtig", "echt krass" — alle umgangssprachlich.',
        '"Dieser Umstand erweist sich als äußerst bedeutsam" — Fremdwort + gehobene Konstruktion.',
        'Ergebnis: die gehobene Variante.',
      ]
    ),
    makeRewrite(
      'sr3',
      'Das Buch war richtig gut.',
      'Schreibe förmlich (gehobene Sprache):',
      'Das Werk erweist sich als ausgesprochen fesselnd.',
      [
        'Das Buch erweist sich als ausgesprochen fesselnd.',
        'Dieses Buch erweist sich als äußerst lesenswert.',
        'Das Werk erweist sich als überaus ansprechend.',
      ],
      'Vermeide "richtig gut" (umgangssprachlich). "Werk" statt "Buch" + "erweist sich als" + gehobenes Adjektiv.',
      1,
      ['stil', 'register', 'rewrite'],
      [
        'Erkenne das Ausgangsmaterial: "Das Buch war richtig gut" — umgangssprachlich.',
        'Ersetze umgangssprachliche Wörter: "richtig gut" → "ausgesprochen fesselnd" oder "überaus lesenswert".',
        'Wähle ein gehobenes Wort für "Buch": "Werk" (literarisch) oder bleibe bei "Buch" mit besserem Adjektiv.',
        'Baue eine gehobene Struktur: "X erweist sich als Y" statt "X war Y".',
        'Musterlösung: "Das Werk erweist sich als ausgesprochen fesselnd."',
      ]
    ),
    makeRewrite(
      'sr4',
      'Alle müssen mitmachen.',
      'Schreibe förmlich (gehobene Sprache):',
      'Die Teilnahme aller ist unerlässlich.',
      [
        'Die Mitwirkung aller ist unerlässlich.',
        'Es ist unerlässlich, dass alle teilnehmen.',
        'Die Beteiligung aller erweist sich als unerlässlich.',
      ],
      '"Müssen mitmachen" → "Teilnahme/Mitwirkung" (Nominalisierung) + "unerlässlich" (gehoben).',
      2,
      ['stil', 'register', 'rewrite', 'nominal'],
      [
        'Erkenne: "müssen mitmachen" = einfache Aufforderung.',
        'Suche nach einem Substantiv für "mitmachen": Teilnahme, Mitwirkung, Beteiligung.',
        'Suche nach einem gehobenen Ausdruck für "müssen": unerlässlich, notwendig, erforderlich.',
        'Baue den Satz: "Die Teilnahme aller ist unerlässlich."',
        'Variante: "Es ist unerlässlich, dass alle teilnehmen." (Nebensatz statt Nominalisierung)',
      ]
    ),
    makeMcq(
      'sr5',
      'Welcher Satz ist in Umgangssprache?',
      '"Ey, das war voll krass, Alter!"',
      ['"Dieser Vorfall erweist sich als äußerst bemerkenswert."', '"Das war sehr beeindruckend."', '"Der Vorfall war bemerkenswert."'],
      'Umgangssprachliche Marker: "Ey", "voll", "Alter", Ausrufezeichen.',
      1,
      ['stil', 'register'],
      [
        'Suche nach umgangssprachlichen Markern: "Ey", "voll", "Alter", Slang.',
        '"Voll krass" und "Alter" sind typisch für gesprochene Umgangssprache.',
        'Andere Optionen sind standardsprachlich oder gehoben.',
      ]
    ),
    makeRewrite(
      'sr6',
      'Das hab ich nicht gewusst.',
      'Schreibe förmlich (gehobene Sprache):',
      'Dies war mir nicht bekannt.',
      [
        'Dieser Umstand war mir nicht bekannt.',
        'Dieser Sachverhalt war mir nicht geläufig.',
        'Mir war dies nicht bekannt.',
      ],
      '"Das hab ich nicht gewusst" — gesprochen, kurz. Gehoben: "Dies war mir nicht bekannt" oder "nicht geläufig".',
      2,
      ['stil', 'register', 'rewrite'],
      [
        'Erkenne: kurz, gesprochen, ohne Artikel ("Das").',
        'Suche nach einem gehobenen Ausdruck: "nicht gewusst" → "nicht bekannt" / "nicht geläufig".',
        'Verwende Pronomen mit Stil: "dies" statt "das".',
        'Musterlösung: "Dies war mir nicht bekannt."',
      ]
    ),
  ],
};

const stilfiguren: Topic = {
  id: 'stilfiguren',
  title: 'Stilfiguren',
  summary: 'Antithese, Klimax, Triade, Metapher, Chiasmus und mehr — Stilfiguren erkennen und anwenden.',
  lesson: {
    intro:
      'Stilfiguren sind besondere sprachliche Wendungen, die Texte wirkungsvoller machen. In der Oberstufe solltest du sie erkennen UND selbst anwenden können.',
    rules: [
      {
        title: 'Antithese (Gegensatz)',
        body: 'Zwei gegensätzliche Begriffe werden direkt gegenübergestellt.',
        examples: [
          '"Liebe und Hass liegen nah beieinander."',
          '"Nicht nur reden, sondern handeln."',
          '"Krieg und Frieden."',
        ],
      },
      {
        title: 'Klimax (Steigerung)',
        body: 'Begriffe oder Sätze werden stufenweise gesteigert.',
        examples: [
          '"Ich kam, ich sah, ich siegte." (Caesar)',
          '"Nicht nur höflich, sondern aufmerksam, sondern mitfühlend."',
        ],
      },
      {
        title: 'Triade (Dreierreihe)',
        body: 'Drei Begriffe oder Satzteile stehen nebeneinander.',
        examples: [
          '"Ehre, Treue, Vaterland."',
          '"Blut, Schweiß und Tränen." (Churchill)',
          '"Freiheit, Gleichheit, Brüderlichkeit."',
        ],
      },
      {
        title: 'Metapher (bildlicher Ausdruck)',
        body: 'Ein bildlicher Ausdruck ersetzt einen wörtlichen — ohne "wie".',
        examples: [
          '"Die See war ein Spiegel." (nicht: "wie ein Spiegel")',
          '"Mein Herz ist schwer."',
          '"Die Zeit ist ein Dieb."',
        ],
      },
      {
        title: 'Chiasmus (Kreuzstellung)',
        body: 'Zwei Satzglieder werden über Kreuz verschränkt (AB → BA).',
        examples: [
          '"Die Kunst ist lang, und kurz ist unser Leben." (Goethe)',
          '"Sie lehrt und lernt nicht." — falsch: "Sie lernt und lehrt nicht."',
        ],
      },
      {
        title: 'Personifikation',
        body: 'Unbelebtes wird vermenschlicht.',
        examples: [
          '"Der Wind flüstert."',
          '"Die Sonne lächelt."',
          '"Der Tod klopft an die Tür."',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'sf1',
      'Welche Stilfigur liegt vor?\n\n"Ich kam, ich sah, ich siegte." (Caesar)',
      'Klimax',
      ['Antithese', 'Triade', 'Metapher'],
      'Drei Stufen, die sich steigern: kam → sah → siegte. Klassische Klimax.',
      1,
      ['stil', 'stilfigur', 'klimax'],
      [
        'Achte auf die Reihenfolge: drei kurze Sätze, steigernd.',
        'Vergleiche die Bedeutungen: "kam" < "sah" < "siegte" (Bewegung → Wahrnehmung → Erfolg).',
        'Diese stufenweise Steigerung ist eine Klimax.',
      ]
    ),
    makeMcq(
      'sf2',
      'Welche Stilfigur ist "Die See war ein Spiegel"?',
      'Metapher',
      ['Vergleich', 'Personifikation', 'Antithese'],
      'Es wird ein Bild ("Spiegel") für etwas anderes ("See") gesetzt — ohne "wie". Das ist eine Metapher.',
      1,
      ['stil', 'stilfigur', 'metapher'],
      [
        'Merke: Metapher = bildlicher Ausdruck OHNE "wie".',
        'Vergleich wäre: "Die See war WIE ein Spiegel."',
        'Hier fehlt das "wie" — also Metapher.',
      ]
    ),
    makeMcq(
      'sf3',
      'Welche Stilfigur: "Die Kunst ist lang, und kurz ist unser Leben."?',
      'Chiasmus',
      ['Antithese', 'Klimax', 'Triade'],
      'AB → BA: "Die Kunst ist lang" / "kurz ist unser Leben" — Adjektiv und Subjekt sind über Kreuz.',
      3,
      ['stil', 'stilfigur', 'chiasmus'],
      [
        'Schaue die Satzstruktur an: "Die Kunst [ist] lang" — Adjektiv am Ende.',
        'Vergleiche: "kurz [ist] unser Leben" — Adjektiv am Anfang.',
        'Die Reihenfolge ist AB → BA: "Subjekt-Prädikat-Adjektiv" → "Adjektiv-Prädikat-Subjekt".',
        'Diese Kreuzstellung ist ein Chiasmus.',
      ]
    ),
    makeMcq(
      'sf4',
      'Welche Stilfigur: "Ehre, Treue, Vaterland."?',
      'Triade',
      ['Klimax', 'Antithese', 'Metapher'],
      'Drei Begriffe in einer Reihe — typische Triade.',
      1,
      ['stil', 'stilfigur', 'triade'],
      [
        'Zähle die Begriffe: Ehre, Treue, Vaterland — drei.',
        'Drei gleichwertige Begriffe in einer Reihe = Triade.',
        'Eine Klimax würde steigern (klein → mittel → groß). Hier sind sie eher parallel.',
      ]
    ),
    makeMcq(
      'sf5',
      'Welche Stilfigur: "Der Wind flüstert."?',
      'Personifikation',
      ['Metapher', 'Vergleich', 'Antithese'],
      'Der Wind (unbelebt) wird vermenschlicht ("flüstert" = menschliche Handlung).',
      1,
      ['stil', 'stilfigur', 'personifikation'],
      [
        'Prüfe: ist das Subjekt belebt oder unbelebt? "Der Wind" ist unbelebt.',
        'Welche Eigenschaft wird ihm zugeschrieben? "Flüstern" — eine menschliche Handlung.',
        'Unbelebtes bekommt menschliche Eigenschaften = Personifikation.',
      ]
    ),
    makeMcq(
      'sf6',
      'Welche Stilfigur: "Liebe und Hass liegen nah beieinander."?',
      'Antithese',
      ['Triade', 'Metapher', 'Klimax'],
      '"Liebe" und "Hass" sind gegensätzliche Begriffe — direkte Gegenüberstellung = Antithese.',
      1,
      ['stil', 'stilfigur', 'antithese'],
      [
        'Suche nach gegensätzlichen Begriffen: Liebe ↔ Hass.',
        'Direkte Gegenüberstellung mit "und" = Antithese.',
        'Triade wäre drei Begriffe; hier sind es nur zwei.',
      ]
    ),
  ],
};

const nominalstil: Topic = {
  id: 'nominalstil',
  title: 'Nominalstil & Passiv',
  summary: 'Verbalstil in Nominalstil umwandeln — für förmliche, präzise Texte.',
  lesson: {
    intro:
      'Im förmlichen Schreiben werden Verben oft zu Substantiven (Nominalisierung). Das klingt gehoben und passt in Erörterungen und Analysen.',
    rules: [
      {
        title: 'Was ist Nominalisierung?',
        body: 'Verben oder Adjektive werden zu Substantiven umgeformt. So entsteht ein dichterer, förmlicherer Stil.',
        examples: [
          '"weil es regnet" → "aufgrund des Regens"',
          '"weil er hilft" → "aufgrund seiner Hilfe" / "dank seiner Hilfe"',
          '"weil sie kam" → "infolge ihrer Ankunft"',
        ],
      },
      {
        title: 'Häufige Konnektoren für Nominalstil',
        body: 'Verbindungswörter, die einen Kausalsatz in eine Nominalphrase verwandeln.',
        examples: [
          'weil → aufgrund von (+ Genitiv) / wegen (+ Genitiv/Dativ)',
          'wenn → bei (+ Dativ) / im Falle von (+ Genitiv)',
          'während → während (+ Genitiv) / bei gleichzeitiger',
          'nachdem → nach (+ Dativ) / following',
        ],
      },
      {
        title: 'Vom Verb zum Nomen',
        body: 'Auch ohne Konnektor kannst du Verben nominalisieren.',
        examples: [
          '"helfen" → "die Hilfe"',
          '"ankommen" → "die Ankunft"',
          '"sich erinnern" → "die Erinnerung"',
          '"teilnehmen" → "die Teilnahme"',
        ],
      },
      {
        title: 'Passiv statt Aktiv',
        body: 'Im förmlichen Stil wird der Verursacher oft weggelassen. Das Passiv eignet sich gut dafür.',
        examples: [
          'Aktiv: "Man hat das Buch 1990 veröffentlicht." → Passiv: "Das Buch wurde 1990 veröffentlicht."',
          'Aktiv: "Die Schüler schrieben die Klausur." → Passiv: "Die Klausur wurde geschrieben."',
        ],
      },
    ],
  },
  questions: [
    makeRewrite(
      'n1',
      'Weil es regnet, gehe ich nicht raus.',
      'Schreibe im Nominalstil:',
      'Aufgrund des Regens bleibe ich zu Hause.',
      [
        'Wegen des Regens bleibe ich zu Hause.',
        'Infolge des Regens bleibe ich zu Hause.',
        'Aufgrund der Niederschläge halte ich mich zu Hause auf.',
      ],
      '"weil es regnet" → "aufgrund/wegen des Regens" (Genitiv). Verb "gehe raus" → "bleibe zu Hause".',
      2,
      ['stil', 'nominal', 'rewrite'],
      [
        'Identifiziere den Kausalsatz: "weil es regnet" (Grund).',
        'Wandle "weil" in eine Nominalphrase um: "aufgrund von" / "wegen" (+ Genitiv).',
        'Wandle "es regnet" in ein Substantiv um: "der Regen" / "die Niederschläge".',
        'Setze zusammen: "Aufgrund des Regens ..."',
        'Wandle das Verb um: "gehe raus" → "bleibe zu Hause" (oder halte mich auf).',
      ]
    ),
    makeRewrite(
      'n2',
      'Weil er viel gearbeitet hat, hat er Erfolg.',
      'Schreibe im Nominalstil:',
      'Aufgrund seiner intensiven Arbeit erzielte er Erfolg.',
      [
        'Infolge seiner intensiven Arbeit konnte er Erfolg verzeichnen.',
        'Dank seiner intensiven Arbeit war ihm Erfolg beschieden.',
        'Aufgrund seiner Bemühungen wurde ihm Erfolg zuteil.',
      ],
      '"weil er gearbeitet hat" → "aufgrund seiner Arbeit". "Erfolg haben" → "Erfolg erzielen".',
      3,
      ['stil', 'nominal', 'rewrite'],
      [
        'Identifiziere die zwei Kausalsätze.',
        'Erster Satz: "weil er viel gearbeitet hat" → Grund.',
        'Wandle um: "weil er gearbeitet hat" → "aufgrund seiner Arbeit" (Intensität: "intensiv", "mühevoll").',
        'Zweiter Satz: "Erfolg haben" → förmlich: "Erfolg erzielen / verzeichnen / erringen".',
        'Setze zusammen: "Aufgrund seiner intensiven Arbeit erzielte er Erfolg."',
      ]
    ),
    makeMcq(
      'n3',
      'Welcher Satz ist im Nominalstil?',
      'Aufgrund des starken Regens mussten wir den Ausflug absagen.',
      ['Weil es stark regnete, sagten wir den Ausflug ab.', 'Es regnete stark, also sagten wir ab.', 'Wir sagten ab, weil es regnete.'],
      'Kausalsatz "weil" → Nominalphrase "aufgrund". Verbstrukturen → Nominalisierung.',
      2,
      ['stil', 'nominal'],
      [
        'Suche nach "weil" + Verb: das ist Verbalstil.',
        'Suche nach "aufgrund" / "wegen" + Substantiv: das ist Nominalstil.',
        '"Aufgrund des Regens" ist Nominalstil — der Kausalsatz wurde zu einer Präpositionalphrase.',
      ]
    ),
    makeRewrite(
      'n4',
      'Man hat das Buch 1990 veröffentlicht.',
      'Schreibe im Passiv:',
      'Das Buch wurde 1990 veröffentlicht.',
      ['Das Buch wurde im Jahr 1990 veröffentlicht.'],
      '"man hat ... veröffentlicht" → "wurde ... veröffentlicht" (Vorgangspassiv).',
      1,
      ['stil', 'passiv', 'rewrite'],
      [
        'Identifiziere die Aktiv-Konstruktion: "man hat veröffentlicht".',
        'Erkenne das Passiv-Muster: "Subjekt + wurde + Partizip II".',
        'Im Passiv wird "man" zum Subjekt: "Das Buch wurde veröffentlicht".',
        'Zeitangabe "1990" bleibt im Satz: "Das Buch wurde 1990 veröffentlicht".',
      ]
    ),
    makeMcq(
      'n5',
      'Wandle um: "weil er half" → ?',
      'Aufgrund seiner Hilfe',
      ['Weil er half', 'Er half, weil', 'Hilfe von ihm'],
      '"weil" + Verb "half" → "aufgrund" + Substantiv "Hilfe" (Genitiv).',
      2,
      ['stil', 'nominal'],
      [
        'Erkenne das Verb: "helfen" / "half".',
        'Bilde das Substantiv: "die Hilfe".',
        'Verwende eine Präposition + Genitiv: "aufgrund seiner Hilfe".',
      ]
    ),
    makeRewrite(
      'n6',
      'Weil sie nicht kam, mussten wir warten.',
      'Schreibe im Nominalstil:',
      'Infolge ihres Ausbleibens mussten wir warten.',
      [
        'Aufgrund ihres Fernbleibens waren wir zum Warten gezwungen.',
        'Da sie ausblieb, mussten wir warten.',
        'Ihr Fernbleiben machte das Warten erforderlich.',
      ],
      '"weil sie nicht kam" → "infolge ihres Ausbleibens". Optional: "mussten warten" → "waren zum Warten gezwungen".',
      3,
      ['stil', 'nominal', 'rewrite'],
      [
        'Identifiziere den Grund: "weil sie nicht kam".',
        'Wandle "kam" um: "ihre Ankunft" oder negiert: "ihr Ausbleiben" / "Fernbleiben".',
        'Verwende "infolge" + Genitiv: "infolge ihres Ausbleibens".',
        'Verfeinere: "mussten warten" → "waren zum Warten gezwungen" (noch förmlicher).',
      ]
    ),
  ],
};

const satzanfaenge: Topic = {
  id: 'satzanfaenge',
  title: 'Satzanfänge variieren',
  summary: 'Abwechslungsreiche Satzanfänge — nicht immer "Ich finde, dass..."',
  lesson: {
    intro:
      'Wer in einer Erörterung immer mit "Ich finde" oder "Meiner Meinung nach" anfängt, wirkt eintönig. Hier lernst du vielfältige Satzanfänge kennen.',
    rules: [
      {
        title: 'Persönliche Meinung',
        body: 'Direkte Statements, die zeigen, dass du eine Position hast.',
        examples: [
          '"Ich vertrete die Auffassung, dass..."',
          '"Meiner Meinung nach..."',
          '"Meines Erachtens..."',
          '"Ich bin der Überzeugung, dass..."',
        ],
      },
      {
        title: 'Verstärkung / Einleitung',
        body: 'Drückt Überzeugung oder eine Einleitung aus.',
        examples: [
          '"Tatsächlich..."',
          '"In der Tat..."',
          '"Zweifellos..."',
          '"Unbestreitbar ist, dass..."',
        ],
      },
      {
        title: 'Einschränkung / Gegensatz',
        body: 'Signalisiert eine Gegenposition oder Einschränkung.',
        examples: [
          '"Allerdings..."',
          '"Jedoch..."',
          '"Dennoch..."',
          '"Einerseits ... andererseits ..."',
        ],
      },
      {
        title: 'Folgerung / Beispiel',
        body: 'Leitet eine Schlussfolgerung oder ein Beispiel ein.',
        examples: [
          '"Folglich..."',
          '"Daher..."',
          '"Demnach..."',
          '"Ein Beispiel hierfür ist..."',
        ],
      },
    ],
  },
  questions: [
    makeMcq(
      'sa1',
      'Welcher Satzanfang passt zu einer persönlichen Meinung?',
      'Ich vertrete die Auffassung, dass...',
      ['Tatsächlich...', 'Folglich...', 'Ein Beispiel hierfür ist...'],
      'Persönliche Meinungen werden mit "ich" oder Possessivpronomen + Verb der Meinung ausgedrückt.',
      1,
      ['stil', 'satzanfang'],
      [
        'Persönliche Meinung braucht einen klaren Verweis auf den Sprecher.',
        '"Ich vertrete die Auffassung" zeigt eine eigene Position.',
        'Andere Optionen: Tatsächlich (Verstärkung), Folglich (Schluss), Beispiel ist ein Beispiel.',
      ]
    ),
    makeMcq(
      'sa2',
      'Welcher Satzanfang passt für eine Schlussfolgerung?',
      'Folglich...',
      ['Ich vertrete...', 'Tatsächlich...', 'Ein Beispiel hierfür...'],
      'Folglich = Konsequenz, Schlussfolgerung. Passt am Ende einer Argumentation.',
      1,
      ['stil', 'satzanfang'],
      [
        'Eine Schlussfolgerung leitet eine Konsequenz aus dem Vorherigen ein.',
        '"Folglich" oder "Daher" oder "Demnach" sind typische Konsequenz-Marker.',
      ]
    ),
    makeRewrite(
      'sa3',
      'Ich finde, dass Schule wichtig ist.',
      'Formuliere den Satzanfang gehobener:',
      'Meines Erachtens ist Schule von großer Bedeutung.',
      [
        'Ich vertrete die Auffassung, dass Schule von wesentlicher Bedeutung ist.',
        'Meiner Meinung nach erweist sich Schule als bedeutsam.',
        'Ich bin der Überzeugung, dass Schule eine zentrale Rolle spielt.',
      ],
      'Vermeide "Ich finde, dass" (umgangssprachlich). Nutze "meines Erachtens" / "ich vertrete die Auffassung" + "von Bedeutung".',
      1,
      ['stil', 'satzanfang', 'rewrite'],
      [
        'Erkenne das Muster: "Ich finde, dass" — typisch umgangssprachlich.',
        'Wähle einen gehobenen Meinungs-Marker: "Meines Erachtens" / "Ich vertrete die Auffassung".',
        'Wandle "wichtig" in einen gehobenen Ausdruck: "von großer Bedeutung" / "bedeutsam".',
        'Setze zusammen: "Meines Erachtens ist Schule von großer Bedeutung."',
      ]
    ),
    makeMcq(
      'sa4',
      'Welcher Satzanfang leitet einen Gegensatz ein?',
      'Jedoch...',
      ['Folglich...', 'Tatsächlich...', 'Zunächst...'],
      'Jedoch = aber, leitet einen Kontrast ein.',
      1,
      ['stil', 'satzanfang'],
      [
        'Gegensatz-Marker zeigen einen Kontrast zum Vorherigen.',
        '"Jedoch", "Allerdings", "Dennoch" sind typische Kontrast-Marker.',
      ]
    ),
    makeRewrite(
      'sa5',
      'Schule ist wichtig, aber Schüler brauchen auch Freizeit.',
      'Formuliere den Satzanfang mit Gegensatz-Struktur:',
      'Einerseits ist Schule von Bedeutung, andererseits benötigen Schüler ausreichend Freizeit.',
      [
        'Zwar ist Schule von wesentlicher Bedeutung, jedoch bedürfen Schüler ebenso der Freizeit.',
        'Schule erweist sich einerseits als bedeutsam, andererseits bleibt Freizeit unverzichtbar.',
        'Einerseits spielt Schule eine zentrale Rolle, andererseits ist Freizeit unerlässlich.',
      ],
      'Statt "aber" → "andererseits" oder "zwar ... jedoch" als gehobene Kontrast-Strukturen.',
      2,
      ['stil', 'satzanfang', 'rewrite'],
      [
        'Erkenne die Kontrast-Struktur: "X ist wichtig, aber Y".',
        'Wähle eine gehobene Kontrast-Form: "einerseits ... andererseits" oder "zwar ... jedoch".',
        'Formuliere "wichtig" gehoben: "von Bedeutung", "bedeutsam", "zentrale Rolle".',
        'Formuliere "brauchen" gehoben: "bedürfen", "benötigen", "ist ... unverzichtbar".',
      ]
    ),
    makeMcq(
      'sa6',
      'Welcher Satzanfang passt für ein Beispiel?',
      'Ein Beispiel hierfür ist...',
      ['Folglich...', 'Tatsächlich...', 'Ich vertrete...'],
      '"Ein Beispiel hierfür" leitet konkretes Beispiel ein — typisch für argumentative Texte.',
      1,
      ['stil', 'satzanfang'],
      [
        'Beispiel-Marker leiten konkrete Fälle ein.',
        '"Ein Beispiel hierfür ist", "So etwa", "Beispielsweise" sind typisch.',
      ]
    ),
  ],
};

export const stilModule: Module = {
  id: 'stil',
  title: 'Stil & Ausdruck',
  description: 'Stilregister, Stilfiguren, Nominalstil und abwechslungsreiche Satzanfänge — für förmliche Texte und Klassenarbeiten.',
  icon: 'pen',
  color: 'pink',
  topics: [stilregister, stilfiguren, nominalstil, satzanfaenge],
};
