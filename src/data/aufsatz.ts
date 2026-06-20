export type AufsatzType = 'eroerterung' | 'charakterisierung' | 'inhaltsangabe' | 'format-guide';

export interface AufsatzPrompt {
  id: string;
  type: AufsatzType;
  typeLabel: string;
  title: string;
  level: 'Einführungskurs' | 'Grundkurs' | 'Leistungskurs';
  estimatedMinutes: number;
  prompt: string;
  tips: string[];
  musterloesung: string;
  musterloesungNotes: string[]; // explains the stylistic choices in the model
  kriterien: { label: string; description: string }[];
}

export const aufsatzPrompts: AufsatzPrompt[] = [
  {
    id: 'er-social-media',
    type: 'eroerterung',
    typeLabel: 'Erörterung',
    title: 'Sollte Social Media für Jugendliche unter 16 verboten werden?',
    level: 'Grundkurs',
    estimatedMinutes: 12,
    prompt:
      'Verfasse eine kurze Erörterung (4–6 Sätze) zum Thema „Social Media und Jugendliche". ' +
      'Beachte: Eine klare Einleitung mit These, mindestens zwei Pro-Argumente, ein Contra-Argument und ein abschließendes Fazit.',
    tips: [
      'Beginne mit einer überleitenden Einleitung: „Immer wieder wird diskutiert, ob …"',
      'Verwende abwechslungsreiche Konnektoren: einerseits … andererseits, zwar … dennoch, einerseits … jedoch, weil, obwohl',
      'Bringe Beispiele aus der Lebenswelt Jugendlicher (Schule, Freunde, Schlaf).',
      'Schließe mit einem klaren Fazit („Abschließend lässt sich festhalten, dass …")',
      'Verwende mindestens eine Stilfigur (Antithese, Triade oder Klimax).',
    ],
    musterloesung:
      'Immer wieder wird diskutiert, ob ein Verbot von Social Media für Jugendliche unter 16 Jahren sinnvoll wäre. ' +
      'Einerseits befürworten Pädagogen ein solches Verbot, weil übermäßiger Konsum nachweislich zu Schlafstörungen, Konzentrationsproblemen und einer verzerrten Selbstwahrnehmung führt. ' +
      'Andererseits zeigen internationale Studien, dass ein pauschales Verbot die Medienkompetenz schwächt, da Jugendliche den kritischen Umgang mit digitalen Plattformen erlernen müssen, um später mündige Bürger zu sein. ' +
      'Zwar ist der Schutz der psychischen Gesundheit ein berechtigtes Anliegen, jedoch sprechen pädagogische Gründe klar gegen ein Verbot und für eine bessere Aufklärung. ' +
      'Abschließend lässt sich festhalten, dass gezielte Medienbildung an Schulen weitaus wirksamer wäre als ein pauschales Verbot — denn Verbote fördern Ausweichverhalten, Aufklärung hingegen stärkt die Eigenverantwortung.',
    musterloesungNotes: [
      'Antithese: „einerseits … andererseits" — gegensätzliche Argumente parallel.',
      'Triade: „Schlafstörungen, Konzentrationsproblemen, verzerrten Selbstwahrnehmung" — drei negative Effekte.',
      'Nominalstil: „der Schutz der psychischen Gesundheit" (statt: „dass die Psyche geschützt wird").',
      'Passiv: „die Medienkompetenz geschwächt wird", „ein Verbot gefördert".',
      'Variabler Satzanfang: Nicht nur „Ich finde …", sondern auch „Immer wieder wird diskutiert …".',
      'Schlussfazit mit Nominalstil + Antithese („Verbote fördern Ausweichverhalten, Aufklärung hingegen stärkt …").',
    ],
    kriterien: [
      { label: 'Aufbau (Einleitung → Pro → Contra → Fazit)', description: 'Struktur erkennbar — These, Argumente, Schluss.' },
      { label: 'Konnektoren-Vielfalt', description: 'Mindestens 3 verschiedene Konnektoren verwendet.' },
      { label: 'Stilfiguren', description: 'Antithese, Triade, Klimax oder Metapher — mind. 1x.' },
      { label: 'Nominalstil', description: 'Mindestens 1x substantivische Umschreibung.' },
      { label: 'Satzanfänge', description: 'Nicht jeder Satz beginnt mit „Ich".' },
      { label: 'Sprache', description: 'Durchgehend Standardsprache (kein Slang).' },
    ],
  },
  {
    id: 'er-homeschooling',
    type: 'eroerterung',
    typeLabel: 'Erörterung',
    title: 'Ist Homeschooling eine gleichwertige Alternative zur Präsenzschule?',
    level: 'Grundkurs',
    estimatedMinutes: 12,
    prompt:
      'Schreibe eine dialektische Erörterung (5–6 Sätze) zur Frage, ob Homeschooling den Präsenzunterricht ersetzen kann. ' +
      'Berücksichtige soziale, pädagogische und psychologische Aspekte.',
    tips: [
      'Struktur: Einleitung → Pro → Contra → Abwägung → Fazit',
      'Verwende Konjunktiv II für hypothetische Aspekte: „könnte", „würde", „möglicherweise".',
      'Bringe Stilfiguren ein: Klimax („Lernen, Wachsen, Reifen") oder Triade.',
      'Beende mit einem differenzierten Fazit (nicht nur „Ich finde …").',
    ],
    musterloesung:
      'Seit der Pandemie wird die Frage kontrovers diskutiert, ob Homeschooling den klassischen Präsenzunterricht dauerhaft ersetzen könnte. ' +
      'Befürworter führen an, dass individuelles Lerntempo, flexible Tagesgestaltung und die Reduktion von sozialem Druck wesentliche Vorteile seien. ' +
      'Trotz dieser Argumente zeigt die Erfahrung, dass die schulische Gemeinschaft, der spontane Austausch und das Erlernen sozialer Kompetenzen in der Präsenzschule unverzichtbar bleiben. ' +
      'Zwar mag Homeschooling in Einzelfällen eine sinnvolle Ergänzung darstellen, jedoch kann es die persönliche Begegnung mit Lehrkräften und Gleichaltrigen nicht vollständig ersetzen. ' +
      'Abschließend lässt sich konstatieren, dass eine hybride Form — Präsenzunterricht mit digitalen Elementen — den Anforderungen einer modernen Lernkultur am ehesten gerecht würde.',
    musterloesungNotes: [
      'Nominalstil: „die Reduktion von sozialem Druck", „die schulische Gemeinschaft".',
      'Klimax: „Lernen, Wachsen, Reifen" (implizit in der Struktur).',
      'Konjunktiv II: „könnte", „möglicherweise".',
      'Trotz-Dem-Struktur: „Trotz dieser Argumente … bleibt".',
      'Differenziertes Fazit: hybrid (Präsenz + digital) statt Schwarz-Weiß.',
    ],
    kriterien: [
      { label: 'Aufbau', description: 'Klare Pro/Contra-Struktur und abgewogenes Fazit.' },
      { label: 'Konjunktiv II', description: 'Mindestens 1x hypothetische Formulierung.' },
      { label: 'Nominalstil', description: 'Substantivische Wendungen statt nur Verben.' },
      { label: 'Stilfiguren', description: 'Mind. 1 Triade, Klimax oder Antithese.' },
      { label: 'Variabler Satzanfang', description: 'Mind. 3 verschiedene Satzanfänge.' },
    ],
  },
  {
    id: 'cha-kafka',
    type: 'charakterisierung',
    typeLabel: 'Charakterisierung',
    title: 'Franz Kafka — „Ein Hungerkünstler" — Figurenanalyse',
    level: 'Leistungskurs',
    estimatedMinutes: 15,
    prompt:
      'Verfasse eine kurze Charakterisierung (4–6 Sätze) des Hungerkünstlers aus Franz Kafkas gleichnamiger Erzählung. ' +
      'Berücksichtige äußere Situation, innere Motivation, Verhalten gegenüber anderen und symbolische Bedeutung.',
    tips: [
      'Struktur: Äußere Beschreibung → innere Haltung → Beziehung zu anderen → Symbolik.',
      'Verwende treffende Adjektive: „asketisch", „entkräftet", „vereinsamt", „rätselhaft".',
      'Beachte den Konjunktiv I für indirekte Rede (Aussagen anderer Figuren).',
      'Schließe mit einer Deutung auf der Metaebene ab.',
    ],
    musterloesung:
      'Der Hungerkünstler, eine rätselhafte, zunehmend ausgezehrte Figur, lebt in einer widersprüchlichen Beziehung zur Öffentlichkeit: Einerseits sehnt er sich nach Anerkennung, andererseits flößt sein asketischer Verzicht den Zuschauern Unbehagen ein. ' +
      'Sein Verhalten gegenüber den Impressarios offenbart eine zynische Geschäftsbeziehung, in der er als Attraktion vermarktet wird, während er selbst nach künstlerischer Vollkommenheit strebt. ' +
      'Zwar behauptet der Hungerkünstler, aus freien Stücken zu fasten, jedoch wird im Laufe der Erzählung deutlich, dass sein innerer Zwang zur Selbstaufgabe ihn zutiefst vereinsamt. ' +
      'Symbolisch lässt sich seine Figur als Sinnbild für die Entfremdung des modernen Künstlers deuten, dessen Authentizität von einer sensationslüsternen Gesellschaft ausgehöhlt wird.',
    musterloesungNotes: [
      'Antithese: „einerseits … andererseits", „Zwar … jedoch".',
      'Nominalstil: „die Beziehung zur Öffentlichkeit", „die Entfremdung des modernen Künstlers".',
      'Treffende Adjektive: „rätselhaft", „asketisch", „zutiefst vereinsamt", „authentizität".',
      'Symbolische Deutung am Ende — Metaebene.',
      'Konjunktiv I würde in indirekter Rede stehen (im Auszug ausgespart).',
    ],
    kriterien: [
      { label: 'Figurenanalyse', description: 'Äußeres, Inneres, Beziehungen, Symbolik.' },
      { label: 'Literarische Fachsprache', description: '„Symbolik", „Erzählperspektive", „Motiv".' },
      { label: 'Konjunktiv I / II', description: 'Für indirekte Rede oder Hypothesen.' },
      { label: 'Stilfiguren', description: 'Antithese oder Klimax.' },
      { label: 'Differenzierte Sprache', description: 'Keine bloßen Wiederholungen, treffende Adjektive.' },
    ],
  },
  {
    id: 'inh-verwandlung',
    type: 'inhaltsangabe',
    typeLabel: 'Inhaltsangabe',
    title: 'Franz Kafka — „Die Verwandlung" — Eröffnungsszene',
    level: 'Einführungskurs',
    estimatedMinutes: 10,
    prompt:
      'Verfasse eine Inhaltsangabe (4–6 Sätze) der Eröffnung von Kafkas „Die Verwandlung" (Gregor Samsa wacht als Ungeziefer auf). ' +
      'Achte auf sachliche, zeitliche Reihenfolge und Verwenden des Präsens.',
    tips: [
      'Verwende das Präsens (auch bei vergangenen Handlungen in der Zusammenfassung).',
      'Reihenfolge der Ereignisse einhalten — keine Wertung.',
      'Benutze sachliche Verben: „erwacht", „betrachtet", „versucht", „stellt fest".',
      'Vermeide wörtliche Rede — paraphrasiere.',
      'Struktur: Einleitung (Autor, Titel, Textsorte) → Hauptteil → ggf. Ausblick.',
    ],
    musterloesung:
      'Franz Kafkas Erzählung „Die Verwandlung" beginnt mit einer verstörenden Ausgangssituation: Der Protagonist Gregor Samsa erwacht eines Morgens in seinem Bett und stellt fest, dass er sich in ein riesiges, unscheinbares Insekt verwandelt hat. ' +
      'Vergeblich versucht er, sich aufzurichten und zur Arbeit zu gelangen, doch sein neuer Körper verweigert jeden Dienst. ' +
      'Während die Uhr tickt und sein Zug zur Dienstreise droht, ohne ihn abzufahren, macht er sich Sorgen um seinen Beruf als Handelsreisender und die finanziellen Folgen für seine Familie. ' +
      'Als die Familie an die Tür klopft und nach dem Grund seines Zuspätkommens fragt, antwortet Gregor mit einer menschlichen Stimme, ohne dass dies die anderen beruhigt.',
    musterloesungNotes: [
      'Einleitung mit Textsorte, Autor, Titel — Standard.',
      'Präsens (auch für vergangene Handlung) — Merkmal der Inhaltsangabe.',
      'Sachliche Sprache: „erwacht", „stellt fest", „versucht", „verweigert".',
      'Keine wörtliche Rede — Paraphrase („antwortet mit einer menschlichen Stimme").',
      'Zeitliche Abfolge klar: Aufwachen → Versuche → Sorgen → Familie.',
      'Treffende Adjektive sparsam: „verstörend", „unscheinbar" — nur wo nötig.',
    ],
    kriterien: [
      { label: 'Einleitung', description: 'Autor, Titel, Textsorte erwähnt.' },
      { label: 'Präsens', description: 'Durchgehend im Präsens.' },
      { label: 'Sachlichkeit', description: 'Keine Wertung, keine eigene Meinung.' },
      { label: 'Zeitliche Reihenfolge', description: 'Ereignisse in chronologischer Folge.' },
      { label: 'Keine wörtliche Rede', description: 'Nur paraphrasiert.' },
    ],
  },
];

export function getAufsatzTypeLabel(type: AufsatzType): string {
  const found = aufsatzPrompts.find((p) => p.type === type);
  return found?.typeLabel ?? type;
}

// ════════════════════════════════════════════════════════════════════════════
// Format-Guide — Aufsatz-Formate für die Oberstufe
// Strukturen, Schemata, nützliche Phrasen
// ════════════════════════════════════════════════════════════════════════════

export interface AufsatzFormat {
  id: string;
  name: string;
  englishName?: string;
  icon: string;
  color: 'pink' | 'blue' | 'amber' | 'green' | 'cyan' | 'purple';
  kurz: string; // Kısa açıklama
  zweck: string; // Ne zaman kullanılır
  dauer: string; // Tahmini süre (sınavda)
  laenge: string; // Tahmini kelime sayısı
  aufbau: { phase: string; beschreibung: string }[]; // Yapı adımları
  einleitungBeispiel?: string; // Örnek Einleitung
  schlussBeispiel?: string; // Örnek Schluss
  nuetzlichePhrasen: { kategorie: string; phrasen: string[] }[]; // Useful phrases
  tipps: string[];
  abiRelevanz: string; // NRW Abitur'da ne kadar önemli
  beispielFrage?: string; // Örnek Abitur-Frage
}

export const aufsatzFormate: AufsatzFormat[] = [
  // ─── 1. Lineare Erörterung ───────────────────────────────────────────────
  {
    id: 'linear',
    name: 'Lineare Erörterung',
    icon: '📝',
    color: 'pink',
    kurz: 'Eine eigene Meinung sachlich und überzeugend darlegen — der Klassiker der Oberstufe.',
    zweck: 'Wenn die Aufgabe „Erörtern Sie…" lautet und du eine Position einnehmen sollst.',
    dauer: '~90 min',
    laenge: '400-500 Wörter',
    aufbau: [
      { phase: 'Einleitung', beschreibung: 'Thema einführen, eigene Position klar formulieren („Ich vertrete die Position, dass…").' },
      { phase: 'Hauptteil: Argumente PRO', beschreibung: '2-3 Argumente mit Beispielen und Belegen (These → Argument → Beispiel → Beleg).' },
      { phase: 'Hauptteil: Argumente CONTRA (optional)', beschreibung: 'Gegenargumente anerkennen + entkräften („Zwar…, aber…").' },
      { phase: 'Schluss', beschreibung: 'Eigene Position zusammenfassen, Ausblick geben („Abschließend lässt sich sagen…").' },
    ],
    einleitungBeispiel: 'Seit der Einführung der Ganztagsschule wird kontrovers diskutiert, ob sie die Bildungschancen verbessert oder einschränkt. In dieser Erörterung vertrete ich die Position, dass die Ganztagsschule überwiegend positive Auswirkungen auf die Schüler hat.',
    schlussBeispiel: 'Zusammenfassend lässt sich festhalten, dass die Ganztagsschule mehr Chancen als Risiken bietet. Wenn sie gut gestaltet ist, kann sie einen wertvollen Beitrag zur Bildungsgerechtigkeit leisten. Es liegt an uns, diese Chance zu nutzen.',
    nuetzlichePhrasen: [
      {
        kategorie: 'Einleitung',
        phrasen: [
          'Seit… wird kontrovers diskutiert, ob…',
          'Im Folgenden soll erörtert werden, inwiefern…',
          'In dieser Erörterung vertrete ich die Position, dass…',
        ],
      },
      {
        kategorie: 'Argumente einleiten',
        phrasen: [
          'Ein wesentliches Argument für… ist…',
          'Zunächst ist zu betonen, dass…',
          'Darüber hinaus spricht für…, dass…',
        ],
      },
      {
        kategorie: 'Gegenargumente',
        phrasen: [
          'Zwar lässt sich anführen, dass… — jedoch…',
          'Es wird oft eingewandt, dass… Allerdings…',
          'Manche Kritiker betonen, dass… Dem ist jedoch entgegenzuhalten, dass…',
        ],
      },
      {
        kategorie: 'Schluss',
        phrasen: [
          'Zusammenfassend lässt sich festhalten, dass…',
          'Abschließend kann man sagen, dass…',
          'Insgesamt überwiegen die Vorteile/Nachteile von…',
        ],
      },
    ],
    tipps: [
      'Immer eine klare These am Anfang — keine Pseudoausgewogenheit („einerseits… andererseits…").',
      'Jedes Argument mit einem konkreten Beispiel belegen (Statistik, Geschichte, persönliche Erfahrung).',
      'Gegenargumente anerkennen, aber entkräften — das zeigt kritisches Denken.',
    ],
    abiRelevanz: 'Sehr hoch — eine der drei Hauptformen in NRW Deutsch-Abi (Q1/Q2).',
    beispielFrage: '„Erörtern Sie, ob die Ganztagsschule die Bildungschancen verbessert."',
  },

  // ─── 2. Dialektische Erörterung ──────────────────────────────────────────
  {
    id: 'dialektisch',
    name: 'Dialektische Erörterung',
    icon: '⚖️',
    color: 'blue',
    kurz: 'Pro und Contra abwägen, ohne eine eigene Position zu beziehen.',
    zweck: 'Wenn die Aufgabe „Diskutieren Sie…" lautet und du neutral abwägen sollst.',
    dauer: '~90 min',
    laenge: '400-500 Wörter',
    aufbau: [
      { phase: 'Einleitung', beschreibung: 'Thema + Kontroverse darstellen, KEINE eigene Position.' },
      { phase: 'Argumente PRO', beschreibung: '2-3 starke Argumente für die eine Seite (mit Beispielen).' },
      { phase: 'Übergang', beschreibung: 'Eine Überleitung wie „Dem stehen jedoch gewichtige Argumente gegenüber".' },
      { phase: 'Argumente CONTRA', beschreibung: '2-3 starke Argumente für die Gegenseite.' },
      { phase: 'Synthese/Schluss', beschreibung: 'Abwägen, was schwerer wiegt, evtl. Lösung vorschlagen.' },
    ],
    einleitungBeispiel: 'Die Frage, ob Jugendliche ab 16 Jahren wählen dürfen sollten, wird in der Gesellschaft kontrovers diskutiert. Im Folgenden sollen die Pro- und Contra-Argumente dieser Debatte dargelegt und abgewogen werden.',
    nuetzlichePhrasen: [
      {
        kategorie: 'Einleitung (neutral)',
        phrasen: [
          'Die Frage, ob…, wird kontrovers diskutiert.',
          'Im Folgenden sollen die wesentlichen Argumente abgewogen werden.',
        ],
      },
      {
        kategorie: 'Pro',
        phrasen: [
          'Befürworter von… argumentieren, dass…',
          'Für… spricht vor allem, dass…',
          'Ein gewichtiges Argument ist hier…',
        ],
      },
      {
        kategorie: 'Übergang',
        phrasen: [
          'Dem stehen jedoch gewichtige Gegenargumente gegenüber.',
          'Allerdings gibt es auch Stimmen, die…',
        ],
      },
      {
        kategorie: 'Contra',
        phrasen: [
          'Gegner von… wenden ein, dass…',
          'Dagegen lässt sich anführen, dass…',
          'Kritiker betonen, dass…',
        ],
      },
      {
        kategorie: 'Synthese',
        phrasen: [
          'Bei einer Gesamtbetrachtung zeigt sich, dass…',
          'Eine mögliche Lösung könnte sein, dass…',
        ],
      },
    ],
    tipps: [
      'KEINE eigene Meinung in der Schluss — du wägst nur ab.',
      'Pro und Contra gleich stark darstellen, sonst wirkt es unausgewogen.',
      'Am Ende: Synthese oder Kompromissvorschlag.',
    ],
    abiRelevanz: 'Hoch — besonders wenn „erörtern Sie, ob…" gestellt wird.',
    beispielFrage: '„Diskutieren Sie, ob Jugendliche ab 16 Jahren wählen sollten."',
  },

  // ─── 3. Materialgestützte Erörterung ─────────────────────────────────────
  {
    id: 'materialgestuetzt',
    name: 'Materialgestützte Erörterung',
    icon: '📰',
    color: 'amber',
    kurz: 'Erörterung auf Basis vorgegebener Materialien (Statistik, Zitate, Karikatur).',
    zweck: 'NRW-Abitur-Klassiker: Du bekommst 2-3 Materialien und sollst dazu eine Erörterung schreiben.',
    dauer: '~90 min',
    laenge: '500-600 Wörter',
    aufbau: [
      { phase: 'Materialanalyse', beschreibung: 'Alle Materialien lesen, Kernaussagen notieren, Verknüpfungen suchen.' },
      { phase: 'Einleitung', beschreibung: 'Thema + Bezug zu Material 1 + eigene Frage/These.' },
      { phase: 'Argument 1 (Material 1)', beschreibung: 'These + Argument + Material 1 als Beleg.' },
      { phase: 'Argument 2 (Material 2)', beschreibung: 'These + Argument + Material 2 als Beleg.' },
      { phase: 'Gegenposition', beschreibung: 'Gegenargumente anerkennen und entkräften (Material 3 optional).' },
      { phase: 'Schluss', beschreibung: 'Eigene Position + Ausblick.' },
    ],
    einleitungBeispiel: 'Während die Coronapandemie die Digitalisierung in Schulen beschleunigte, fragen sich viele, ob dieser Wandel langfristig positiv ist. Anhand der vorliegenden Materialien soll erörtert werden, inwiefern digitale Medien den Unterricht verbessern oder behindern.',
    nuetzlichePhrasen: [
      {
        kategorie: 'Materialverweis',
        phrasen: [
          'Wie Material 1 zeigt, …',
          'Diese Aussage wird durch Material 2 gestützt, in dem…',
          'Laut Statistik in Material 3…',
        ],
      },
      {
        kategorie: 'Verknüpfung',
        phrasen: [
          'Dieser Befund deckt sich mit der Aussage in Material…',
          'Im Gegensatz dazu hebt Material… hervor, dass…',
        ],
      },
    ],
    tipps: [
      'JEDES Argument muss auf ein Material verweisen — sonst gibt es Punktabzug.',
      'Materialien zuerst gründlich lesen, dann Stichworte machen, dann erst schreiben.',
      'Karikatur/Zitat/Statistik in eigenen Worten wiedergeben — nicht abschreiben.',
    ],
    abiRelevanz: 'Sehr hoch — die häufigste Form im NRW Deutsch-Abi.',
    beispielFrage: '„Erörtern Sie auf Basis der Materialien, ob Social Media das Kommunikationsverhalten verändert."',
  },

  // ─── 4. Lyrik-Analyse ────────────────────────────────────────────────────
  {
    id: 'lyrik-analyse',
    name: 'Lyrik-Analyse',
    icon: '🌹',
    color: 'purple',
    kurz: 'Ein Gedicht auf Form, Sprache, Inhalt und Wirkung untersuchen.',
    zweck: 'EF/Q1 Pflichtaufgabe: ein vorliegendes Gedicht wird analysiert.',
    dauer: '~60 min',
    laenge: '300-400 Wörter',
    aufbau: [
      { phase: 'Einleitung', beschreibung: 'Autor, Titel, Erscheinungsjahr, Epoche, Thema, Metrum, Reimschema kurz nennen.' },
      { phase: 'Inhalt (kurz)', beschreibung: 'Wovon handelt das Gedicht? Thema in 1-2 Sätzen zusammenfassen.' },
      { phase: 'Formale Analyse', beschreibung: 'Metrum (Jambus, Trochäus…), Reimschema (Paar/Kreuz…), Strophenform (Sonett, Quartett…).' },
      { phase: 'Sprachliche Analyse', beschreibung: 'Bildsprache (Metapher, Vergleich, Personifikation, Symbol), Schlüsselwörter, Sprechhaltung.' },
      { phase: 'Deutung', beschreibung: 'Was will das Gedicht aussagen? Wirkung auf den Leser.' },
      { phase: 'Schluss', beschreibung: 'Zusammenfassung der wichtigsten Erkenntnisse.' },
    ],
    einleitungBeispiel: 'In Goethes Ballade „Der Erlkönig" (1782) wird die dramatische Verfolgung eines Kindes durch eine übernatürliche Gestalt dargestellt. Das vorliegende Gedicht umfasst acht Strophen zu je vier Versen im Jambus, mit einem unregelmäßigen Reimschema.',
    nuetzlichePhrasen: [
      {
        kategorie: 'Formale Analyse',
        phrasen: [
          'Das Metrum des Gedichts ist…',
          'Es liegt ein… Reim vor (Paarreim, Kreuzreim, umarmender Reim).',
          'Die Strophenform (z.B. Sonett, Quartett) deutet auf… hin.',
        ],
      },
      {
        kategorie: 'Sprachliche Analyse',
        phrasen: [
          'Bemerkenswert ist die Verwendung einer Metapher: …',
          'Durch die Personifikation von… wird…',
          'Das Symbol des/der… steht für…',
        ],
      },
      {
        kategorie: 'Deutung',
        phrasen: [
          'Diese sprachlichen Mittel erzeugen eine Atmosphäre von…',
          'Das Gedicht thematisiert…',
          'Insgesamt zeigt das Gedicht, dass…',
        ],
      },
    ],
    tipps: [
      'Immer von konkreten Textstellen ausgehen (Zitat + Zeilenangabe).',
      'Metrum, Reim, Bildsprache — alle drei Dimensionen abdecken.',
      'Nicht nur beschreiben („Es gibt eine Metapher"), sondern deuten („Die Metapher verdeutlicht, dass…").',
    ],
    abiRelevanz: 'Hoch — in EF, Q1 und Q2 immer wieder.',
    beispielFrage: '„Analysieren Sie das vorliegende Gedicht unter besonderer Berücksichtigung von Metrum, Bildsprache und Wirkung."',
  },

  // ─── 5. Comment (English) ───────────────────────────────────────────────
  {
    id: 'comment-en',
    name: 'Comment',
    englishName: 'Comment (English Abitur)',
    icon: '💬',
    color: 'green',
    kurz: 'Persönliche Meinung zu einem kontroversen Thema — typischer English-Abitur-Text.',
    zweck: 'Wenn du in einer English-Klausur deine Meinung vertreten sollst.',
    dauer: '~60 min',
    laenge: '250-350 words',
    aufbau: [
      { phase: 'Introduction', beschreibung: 'Hook (provocative statement, statistic, question) + your opinion.' },
      { phase: 'Body 1: First argument', beschreibung: 'Argument + example + explanation.' },
      { phase: 'Body 2: Second argument', beschreibung: 'Another argument + example.' },
      { phase: 'Body 3: Counter-argument', beschreibung: 'Acknowledge the other side, then refute it.' },
      { phase: 'Conclusion', beschreibung: 'Restate opinion + recommendation/call to action.' },
    ],
    einleitungBeispiel: 'In an age of constant connectivity, many argue that social media is destroying real human interaction. While this concern is understandable, I strongly believe that social media can actually enrich our lives when used mindfully.',
    nuetzlichePhrasen: [
      {
        kategorie: 'Introduction',
        phrasen: [
          'In an age of…, many argue that…',
          'The question whether… has sparked heated debate.',
          'I firmly believe that…',
        ],
      },
      {
        kategorie: 'Arguments',
        phrasen: [
          'First and foremost, …',
          'Another compelling argument is that…',
          'What is more, …',
        ],
      },
      {
        kategorie: 'Counter-argument',
        phrasen: [
          'Admittedly, …',
          'Critics may argue that…, but I would counter that…',
          'While it is true that…, …',
        ],
      },
      {
        kategorie: 'Conclusion',
        phrasen: [
          'In conclusion, I maintain that…',
          'All things considered, …',
          'It is therefore essential that we…',
        ],
      },
    ],
    tipps: [
      'Hook ist alles: erstes Satz muss neugierig machen oder provozieren.',
      'Concrete examples statt abstrakter Aussagen.',
      'Variety of sentence types — short and long, simple and complex.',
    ],
    abiRelevanz: 'Sehr hoch — Standard im English Abitur (Q1, Q2).',
    beispielFrage: '"Comment on the following statement: Social media does more harm than good."',
  },

  // ─── 6. Report (English) ────────────────────────────────────────────────
  {
    id: 'report-en',
    name: 'Report',
    englishName: 'Report (English Abitur)',
    icon: '📄',
    color: 'cyan',
    kurz: 'Sachlicher Bericht über ein Ereignis oder Phänomen — neutral, faktenbasiert.',
    zweck: 'Wenn du als Reporter/Korrespondent einen objektiven Bericht schreiben sollst.',
    dauer: '~60 min',
    laenge: '250-300 words',
    aufbau: [
      { phase: 'Headline', beschreibung: 'Catchy, informative title.' },
      { phase: 'Lead', beschreibung: 'Who? What? When? Where? Why? in 1-2 sentences.' },
      { phase: 'Main body', beschreibung: 'Chronological order or by importance. Facts, not opinions.' },
      { phase: 'Background', beschreibung: 'Context, history, related facts.' },
      { phase: 'Conclusion/Outlook', beschreibung: 'Current state + what might happen next (no speculation).' },
    ],
    einleitungBeispiel: 'Hundreds of students gathered in Berlin\'s Brandenburg Gate on Friday to demand stronger action against climate change. The peaceful demonstration, organised by the student-led movement Fridays for Future, brought together young people from over 50 schools across the city.',
    nuetzlichePhrasen: [
      {
        kategorie: 'Headline',
        phrasen: [
          'STUDENTS RALLY FOR CLIMATE ACTION',
          'NEW POLICY SPARKS DEBATE',
          'TECH GIANT ANNOUNCES LAYOFFS',
        ],
      },
      {
        kategorie: 'Lead (5 Ws)',
        phrasen: [
          'Over 1,000 people gathered in… to…',
          'A new policy announced by… on Tuesday aims to…',
        ],
      },
      {
        kategorie: 'Body',
        phrasen: [
          'According to the organisers, …',
          'A spokesperson for… confirmed that…',
          'The figures show a 20% increase in…',
        ],
      },
      {
        kategorie: 'Outlook',
        phrasen: [
          'The future of… remains uncertain.',
          'Further developments are expected in the coming weeks.',
        ],
      },
    ],
    tipps: [
      'Objective tone — keine Adjektive wie „wonderful" oder „terrible".',
      'Facts, facts, facts — keine Meinung.',
      'Headline soll Aufmerksamkeit erregen + Hauptinhalt verraten.',
    ],
    abiRelevanz: 'Hoch — alternative Aufsatzform im English Abitur.',
    beispielFrage: '"Write a report on a recent school event for your school magazine."',
  },
];

export function getFormatById(id: string): AufsatzFormat | undefined {
  return aufsatzFormate.find((f) => f.id === id);
}
