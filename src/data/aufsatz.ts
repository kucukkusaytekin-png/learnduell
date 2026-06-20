export type AufsatzType = 'eroerterung' | 'charakterisierung' | 'inhaltsangabe';

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
