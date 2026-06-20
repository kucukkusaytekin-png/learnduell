// Mediation (Almanca → İngilizce çeviri) — NRW English Abitur
// 6 tematik metin: Bildung, Umwelt, Geschichte, Politik, Kultur, Soziales

export type MediationLevel = 'leicht' | 'mittel' | 'schwer';
export type MediationTopic =
  | 'bildung'
  | 'umwelt'
  | 'geschichte'
  | 'politik'
  | 'kultur'
  | 'soziales';

export interface MediationText {
  id: string;
  title: string;
  topic: MediationTopic;
  level: MediationLevel;
  wordCount: number; // Almanca kelime sayısı (tipik Abitur: 150-250)
  source: string; // Kaynak (örn. "Die Zeit, 2024")
  germanText: string;
  englishMusterloesung: string; // Referans çeviri
  tips: string[]; // Çeviri stratejileri
  vocabulary: { de: string; en: string; context?: string }[]; // Önemli kelimeler
  punktzahl: {
    korrektheit: string; // Doğruluk (%30)
    fliessend: string; // Akıcılık (%30)
    wortschatz: string; // Kelime bilgisi (%20)
    struktur: string; // Yapı (%20)
  };
}

export const mediationTexts: MediationText[] = [
  // ─── 1. Bildung ──────────────────────────────────────────────────────────
  {
    id: 'm-bildung-1',
    title: 'Das duale Ausbildungssystem in Deutschland',
    topic: 'bildung',
    level: 'leicht',
    wordCount: 175,
    source: 'Die Zeit, 2023 (adaption)',
    germanText: `Das duale Ausbildungssystem ist eine besondere Stärke Deutschlands. Jugendliche lernen gleichzeitig in einem Betrieb und in der Berufsschule. Diese Kombination aus Theorie und Praxis bereitet sie optimal auf das Berufsleben vor.

Im Betrieb arbeiten die Auszubildenden drei bis vier Tage pro Woche und lernen dabei praktische Fertigkeiten. In der Berufsschule besuchen sie an einem oder zwei Tagen pro Woche den Unterricht, wo sie die theoretischen Grundlagen ihres Berufes lernen.

Deutschland hat etwa 330 anerkannte Ausbildungsberufe. Besonders beliebt sind Berufe im Handwerk, in der Industrie und im Dienstleistungssektor. Viele Jugendliche schätzen die duale Ausbildung, weil sie nach zwei bis drei Jahren einen festen Berufsabschluss haben und sofort Geld verdienen können.`,
    englishMusterloesung: `Germany's dual vocational training system is one of its particular strengths. Young people learn simultaneously at a company and at a vocational school. This combination of theory and practice prepares them perfectly for working life.

At the company, trainees work three to four days per week and acquire practical skills. At the vocational school, they attend classes one or two days a week, where they learn the theoretical foundations of their profession.

Germany has around 330 recognised training occupations. Particularly popular are professions in skilled trades, industry, and the service sector. Many young people appreciate dual training because after two to three years they have a permanent professional qualification and can start earning money immediately.`,
    tips: [
      '„duale Ausbildung" = dual training/vocational training — tek kelime tercih et, açma.',
      '„Auszubildende" = trainees — Azubis (kısaltma) da kullanılabilir.',
      '„Berufsschule" = vocational school, „Berufsabschluss" = professional qualification.',
    ],
    vocabulary: [
      { de: 'duales Ausbildungssystem', en: 'dual training system', context: 'Ana terim' },
      { de: 'Auszubildende', en: 'trainee (apprentice)', context: 'Çırak anlamında' },
      { de: 'Berufsschule', en: 'vocational school' },
      { de: 'Handwerk', en: 'skilled trades (crafts)' },
      { de: 'Berufsabschluss', en: 'professional qualification' },
    ],
    punktzahl: {
      korrektheit: 'Bilgi doğru mu, hata var mı? (%30)',
      fliessend: 'Akıcı ve doğal İngilizce mi? (%30)',
      wortschatz: 'Teknik kelimeler doğru mu? (%20)',
      struktur: 'Cümle yapısı ve bağlaçlar uygun mu? (%20)',
    },
  },

  // ─── 2. Umwelt ───────────────────────────────────────────────────────────
  {
    id: 'm-umwelt-1',
    title: 'Die Energiewende in Deutschland',
    topic: 'umwelt',
    level: 'mittel',
    wordCount: 195,
    source: 'Spiegel, 2024 (adaption)',
    germanText: `Deutschland hat sich zum Ziel gesetzt, bis 2045 klimaneutral zu sein. Dieser Wandel wird als „Energiewende" bezeichnet und ist eines der wichtigsten politischen Projekte des Landes.

Der Ausbau erneuerbarer Energien spielt dabei eine zentrale Rolle. Windkraftanlagen an Land und auf See, Solaranlagen auf Dächern und Freiflächen sowie Biomasse sollen die fossilen Brennstoffe ersetzen. Im Jahr 2023 stammten bereits über 50 Prozent des deutschen Stroms aus erneuerbaren Quellen.

Gleichzeitig ist der Ausstieg aus der Kernenergie bereits abgeschlossen — die letzten drei Atomkraftwerke wurden im Frühjahr 2023 vom Netz genommen. Die Energiewende bringt jedoch auch Herausforderungen mit sich: Die schwankende Stromerzeugung aus Wind und Sonne erfordert den Ausbau von Stromnetzen und Speichern, und die Kosten sind hoch.`,
    englishMusterloesung: `Germany has set itself the goal of becoming climate-neutral by 2045. This transformation is called the "Energiewende" (energy transition) and is one of the country's most important political projects.

The expansion of renewable energies plays a central role. Onshore and offshore wind turbines, solar panels on roofs and open spaces, as well as biomass are intended to replace fossil fuels. In 2023, over 50 percent of Germany's electricity already came from renewable sources.

At the same time, the phase-out of nuclear energy has already been completed — the last three nuclear power plants were taken off the grid in spring 2023. However, the Energiewende also brings challenges: the fluctuating electricity generation from wind and sun requires the expansion of power grids and storage facilities, and the costs are high.`,
    tips: [
      '„Energiewende" Almanca kalabilir — Almanya\'ya özgü kavram, parantez içinde İngilizce açıklama yapılabilir.',
      '„erneuerbare Energien" = renewable energies (her zaman çoğul).',
      '„Klimaneutral" = climate-neutral (NOT climate-neutrality — burada sıfat gerekli).',
    ],
    vocabulary: [
      { de: 'Energiewende', en: 'energy transition (Energiewende)', context: 'Almanya\'ya özgü kavram' },
      { de: 'erneuerbare Energien', en: 'renewable energies' },
      { de: 'Windkraftanlage', en: 'wind turbine' },
      { de: 'Klimaneutralität', en: 'climate neutrality' },
      { de: 'Kernkraftwerk', en: 'nuclear power plant' },
    ],
    punktzahl: {
      korrektheit: 'Teknik bilgi doğru mu? (%30)',
      fliessend: 'Akademik İngilizce tonu var mı? (%30)',
      wortschatz: 'Çevre/enerji kelime bilgisi (%20)',
      struktur: 'Cümle uzunluğu ve bağlaçlar uygun mu? (%20)',
    },
  },

  // ─── 3. Geschichte ──────────────────────────────────────────────────────
  {
    id: 'm-geschichte-1',
    title: 'Der Mauerfall 1989',
    topic: 'geschichte',
    level: 'mittel',
    wordCount: 210,
    source: 'Tagesschau, 2024 (adaption)',
    germanText: `Am 9. November 1989 fiel die Berliner Mauer — ein Ereignis, das die Welt veränderte. Die Mauer hatte Deutschland seit 1961 in Ost und West geteilt und war zum Symbol des Kalten Krieges geworden.

In den Wochen zuvor hatten immer mehr Menschen in der DDR für ihre Freiheit demonstriert. Die berühmte Montagsdemonstration in Leipzig brachte Hunderttausende auf die Straßen. Der Druck auf die Regierung wuchs.

Als am 9. November der Pressesprecher der SED, Günter Schabowski, auf einer Pressekonferenz die neuen Reiseregeln versehentlich sofort in Kraft setzte, strömten die Menschen zu den Grenzübergängen. Die Grenzbeamten, völlig überrumpelt, öffneten die Schlagbäume. Tausende Berliner aus Ost und West feierten gemeinsam auf der Mauer.

Der Mauerfall markierte den Beginn eines neuen Zeitalters. Knapp ein Jahr später, am 3. Oktober 1990, wurde Deutschland wiedervereinigt.`,
    englishMusterloesung: `On 9 November 1989, the Berlin Wall fell — an event that changed the world. The wall had divided Germany into East and West since 1961 and had become a symbol of the Cold War.

In the weeks before, more and more people in the GDR had been demonstrating for their freedom. The famous Monday demonstrations in Leipzig brought hundreds of thousands onto the streets. Pressure on the government was mounting.

When on 9 November the SED spokesperson, Günter Schabowski, accidentally put the new travel regulations into effect immediately at a press conference, people streamed to the border crossings. The border guards, completely taken by surprise, opened the barriers. Thousands of East and West Berliners celebrated together on the wall.

The fall of the wall marked the beginning of a new era. Just under a year later, on 3 October 1990, Germany was reunified.`,
    tips: [
      '„Mauerfall" = fall of the Wall (Büyük W — tarihi olay olarak özel isim).',
      '„DDR" = GDR (German Democratic Republic) — resmi çeviri.',
      '„SED" — Almanca kısaltma olarak bırakılabilir veya (East German ruling party) açıklaması.',
      '„wiedervereinigt" = reunified (NOT „reunited" — yanlış).',
    ],
    vocabulary: [
      { de: 'der Mauerfall', en: 'the fall of the Wall' },
      { de: 'die Wiedervereinigung', en: 'reunification' },
      { de: 'die Montagsdemonstration', en: 'Monday demonstration' },
      { de: 'der Pressesprecher', en: 'spokesperson (press secretary)' },
      { de: 'der Kalte Krieg', en: 'the Cold War' },
    ],
    punktzahl: {
      korrektheit: 'Tarihsel bilgi doğru mu? (%30)',
      fliessend: 'Anlatı akıcı mı? (%30)',
      wortschatz: 'Tarih ve siyaset kelime bilgisi (%20)',
      struktur: 'Zamansal ifadeler doğru mu? (%20)',
    },
  },

  // ─── 4. Politik ─────────────────────────────────────────────────────────
  {
    id: 'm-politik-1',
    title: 'Die Europäische Union und Deutschland',
    topic: 'politik',
    level: 'schwer',
    wordCount: 230,
    source: 'FAZ, 2023 (adaption)',
    germanText: `Deutschland ist eines der wichtigsten Mitglieder der Europäischen Union. Als bevölkerungsreichstes Land und größte Volkswirtschaft hat das Land erheblichen Einfluss auf politische Entscheidungen in Brüssel.

Die EU wurde ursprünglich als Wirtschaftsgemeinschaft gegründet, um den Frieden in Europa nach dem Zweiten Weltkrieg zu sichern. Heute ist sie weit mehr als das: Sie regelt gemeinsame Standards, fördert die Mobilität der Bürger und versucht, bei globalen Herausforderungen wie dem Klimawandel mit einer Stimme zu sprechen.

Allerdings steht die EU vor großen Problemen. In vielen Mitgliedstaaten wächst die Skepsis gegenüber der europäischen Integration. Rechtspopulistische Parteien gewinnen an Zustimmung, und das Vertrauen in die EU-Institutionen sinkt. Die Frage, wie die EU reformiert werden kann, ohne ihre Grundwerte aufzugeben, wird in den kommenden Jahren eine der zentralen politischen Debatten sein.`,
    englishMusterloesung: `Germany is one of the most important members of the European Union. As the most populous country and the largest economy, it exerts considerable influence on political decisions in Brussels.

The EU was originally founded as an economic community to secure peace in Europe after the Second World War. Today it is much more than that: it regulates common standards, promotes the mobility of citizens, and tries to speak with one voice on global challenges such as climate change.

However, the EU faces major problems. In many member states, scepticism towards European integration is growing. Right-wing populist parties are gaining support, and trust in EU institutions is declining. The question of how the EU can be reformed without abandoning its fundamental values will be one of the central political debates in the years to come.`,
    tips: [
      '„Europäische Union" her zaman büyük harfle (kurum ismi).',
      '„Mitgliedstaat" = member state, „Mitgliedstaaten" = member states.',
      '„Rechtspopulismus" = right-wing populism — sıfat+isim, çoğul ekleme.',
      '„Grundwerte" = fundamental values — core values da olur.',
    ],
    vocabulary: [
      { de: 'Mitgliedstaat / Mitgliedstaaten', en: 'member state / member states' },
      { de: 'Volkswirtschaft', en: 'economy (national economy)' },
      { de: 'Rechtspopulismus', en: 'right-wing populism' },
      { de: 'Grundwerte', en: 'fundamental values' },
      { de: 'die Integration', en: 'integration' },
    ],
    punktzahl: {
      korrektheit: 'Siyasi doğruluk, terim doğruluğu (%30)',
      fliessend: 'Akademik argümantasyon (%30)',
      wortschatz: 'Siyasi kelime bilgisi (%20)',
      struktur: 'Giriş-gelişme-sonuç yapısı (%20)',
    },
  },

  // ─── 5. Kultur ──────────────────────────────────────────────────────────
  {
    id: 'm-kultur-1',
    title: 'Multikulturalismus in der deutschen Gesellschaft',
    topic: 'kultur',
    level: 'mittel',
    wordCount: 200,
    source: 'taz, 2024 (adaption)',
    germanText: `Deutschland ist seit Jahrzehnten ein Einwanderungsland. Nach den Gastarbeitern der 1960er Jahre und der Aussiedlerwelle der 1990er Jahre prägen heute Menschen aus über 190 Nationen das kulturelle Leben des Landes.

Diese Vielfalt zeigt sich in vielen Bereichen: in der Küche, die heute internationaler ist als je zuvor; in der Musik, wo türkische, arabische und afrikanische Klänge in die deutsche Popkultur eingeflossen sind; und in der Literatur, in der Autorinnen und Autor mit Migrationshintergrund wichtige Preise gewinnen.

Gleichzeitig gibt es Debatten über Integration und Identität. Nicht alle teilen die Vorstellung einer offenen, multikulturellen Gesellschaft. Die Herausforderung besteht darin, kulturelle Vielfalt zu fördern und gleichzeitig den gesellschaftlichen Zusammenhalt zu stärken.`,
    englishMusterloesung: `Germany has been a country of immigration for decades. After the guest workers of the 1960s and the wave of ethnic German resettlers in the 1990s, people from over 190 nations shape the country's cultural life today.

This diversity can be seen in many areas: in cuisine, which is more international today than ever before; in music, where Turkish, Arabic, and African sounds have flowed into German pop culture; and in literature, where authors with a migration background win important prizes.

At the same time, there are debates about integration and identity. Not everyone shares the idea of an open, multicultural society. The challenge is to promote cultural diversity while at the same time strengthening social cohesion.`,
    tips: [
      '„Einwanderungsland" = country of immigration — dikkat: „Einwanderung" immigration, „Zuwanderung" immigration da olur.',
      '„Gastarbeiter" = guest workers — tarihsel terim, tırnak içinde kalabilir.',
      '„Migrationshintergrund" = migration background — sıfat olarak kullanılır.',
      '„Vielfalt" = diversity, çoğul kullanım.',
    ],
    vocabulary: [
      { de: 'Einwanderungsland', en: 'country of immigration' },
      { de: 'Gastarbeiter', en: 'guest workers' },
      { de: 'Migrationshintergrund', en: 'migration background' },
      { de: 'Vielfalt', en: 'diversity' },
      { de: 'gesellschaftlicher Zusammenhalt', en: 'social cohesion' },
    ],
    punktzahl: {
      korrektheit: 'Kültürel doğruluk, duyarlılık (%30)',
      fliessend: 'Akıcı nüans (%30)',
      wortschatz: 'Kültür/sosyoloji kelimeleri (%20)',
      struktur: 'Argüman dengesi (%20)',
    },
  },

  // ─── 6. Soziales ────────────────────────────────────────────────────────
  {
    id: 'm-soziales-1',
    title: 'Der demografische Wandel in Deutschland',
    topic: 'soziales',
    level: 'schwer',
    wordCount: 215,
    source: 'Handelsblatt, 2023 (adaption)',
    germanText: `Deutschland altert rapide. Im Jahr 2023 lag das Durchschnittsalter der Bevölkerung bei etwa 45 Jahren, und die Zahl der über 65-Jährigen hat die der unter 20-Jährigen bereits deutlich überstiegen. Dieser demografische Wandel hat weitreichende Folgen für Wirtschaft und Gesellschaft.

Die Rentenversicherung steht vor einer Belastungsprobe: Immer weniger Beitragszahler müssen immer mehr Rentner finanzieren. Die Pflegebranche sucht händeringend nach Fachkräften, und viele ländliche Regionen verlieren junge Menschen, die in die Städte abwandern.

Gleichzeitig bringt der demografische Wandel auch Chancen mit sich. Ältere Arbeitnehmer verfügen über wertvolle Erfahrung, und die wachsende Zahl älterer Konsumenten schafft neue Märkte, etwa im Bereich altersgerechter Technologien und Dienstleistungen. Die Politik steht vor der Aufgabe, diese Herausforderungen zu meistern, ohne die jüngeren Generationen zu überlasten.`,
    englishMusterloesung: `Germany is ageing rapidly. In 2023, the average age of the population was around 45, and the number of over-65s has already significantly exceeded that of under-20s. This demographic change has far-reaching consequences for the economy and society.

The pension system is facing a stress test: fewer and fewer contributors must finance more and more pensioners. The care sector is desperately looking for skilled workers, and many rural regions are losing young people who move to the cities.

At the same time, demographic change also brings opportunities. Older workers have valuable experience, and the growing number of older consumers creates new markets — for instance, in the field of age-appropriate technologies and services. The task for policymakers is to master these challenges without overburdening younger generations.`,
    tips: [
      '„demografischer Wandel" = demographic change (alternative: demographic shift).',
      '„Beitragszahler" = contributors, „Rentner" = pensioners.',
      '„Belastungsprobe" = stress test — finansal bağlamda yaygın.',
      '„altersgerecht" = age-appropriate (NOT „age-friendly" — bu reklam terimi, „age-appropriate" daha resmi).',
    ],
    vocabulary: [
      { de: 'demografischer Wandel', en: 'demographic change' },
      { de: 'Rentenversicherung', en: 'pension system (insurance)' },
      { de: 'Pflegebranche', en: 'care sector' },
      { de: 'Beitragszahler', en: 'contributor' },
      { de: 'altersgerecht', en: 'age-appropriate' },
    ],
    punktzahl: {
      korrektheit: 'Ekonomik/sosyal doğruluk (%30)',
      fliessend: 'Akademik yazım stili (%30)',
      wortschatz: 'Sosyal/ekonomi kelimeleri (%20)',
      struktur: 'Neden-sonuç bağlantıları (%20)',
    },
  },
];

export const mediationTopics: { id: MediationTopic; label: string; icon: string; color: string }[] = [
  { id: 'bildung', label: 'Bildung', icon: '🎓', color: 'emerald' },
  { id: 'umwelt', label: 'Umwelt', icon: '🌱', color: 'green' },
  { id: 'geschichte', label: 'Geschichte', icon: '🏛️', color: 'amber' },
  { id: 'politik', label: 'Politik', icon: '⚖️', color: 'red' },
  { id: 'kultur', label: 'Kultur', icon: '🎭', color: 'pink' },
  { id: 'soziales', label: 'Soziales', icon: '🤝', color: 'blue' },
];

export const mediationLevels: { id: MediationLevel; label: string; color: string; description: string }[] = [
  { id: 'leicht', label: 'Leicht', color: 'emerald', description: '~175 kelime, basit cümleler' },
  { id: 'mittel', label: 'Mittel', color: 'amber', description: '~200 kelime, orta güçlük' },
  { id: 'schwer', label: 'Schwer', color: 'red', description: '~220 kelime, karmaşık yapılar' },
];

export function getMediationText(id: string): MediationText | undefined {
  return mediationTexts.find((t) => t.id === id);
}
