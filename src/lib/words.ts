// Vocabulary pool for Wörterbuch.
// Oberstufe-Niveau, komplex, für Abitur nützlich.
// Two pools: Deutsch Oberstufe + English Oberstufe.
// Daily 5 words via deterministic seed (date) — never the same combination twice.

export type WordLanguage = 'de' | 'en';

export interface VocabWord {
  id: string;
  language: WordLanguage;
  word: string;
  translation: string; // Turkish (since the user is Turkish, learning German/English)
  partOfSpeech: string;
  example: string; // example sentence (in target language)
  exampleTranslation: string; // Turkish
  complexity: 1 | 2 | 3; // 1 = GK, 2 = LK, 3 = sehr komplex
  topic: string; // thematic tag
}

// ─── Deutsch Oberstufe ────────────────────────────────────────────────────
export const deutschWords: VocabWord[] = [
  // Gesellschaft & Politik
  { id: 'de-01', language: 'de', word: 'die Gesellschaft', translation: 'toplum', partOfSpeech: 'Substantiv (f)', example: 'Die Gesellschaft verändert sich durch Digitalisierung.', exampleTranslation: 'Toplum dijitalleşmeyle değişiyor.', complexity: 1, topic: 'Gesellschaft' },
  { id: 'de-02', language: 'de', word: 'die Verantwortung', translation: 'sorumluluk', partOfSpeech: 'Substantiv (f)', example: 'Jeder trägt Verantwortung für die Umwelt.', exampleTranslation: 'Herkes çevre için sorumluluk taşır.', complexity: 1, topic: 'Gesellschaft' },
  { id: 'de-03', language: 'de', word: 'die Gerechtigkeit', translation: 'adalet', partOfSpeech: 'Substantiv (f)', example: 'Gerechtigkeit ist ein Grundrecht.', exampleTranslation: 'Adalet temel bir haktır.', complexity: 1, topic: 'Gesellschaft' },
  { id: 'de-04', language: 'de', word: 'die Gleichberechtigung', translation: 'eşit hak', partOfSpeech: 'Substantiv (f)', example: 'Gleichberechtigung ist noch nicht überall erreicht.', exampleTranslation: 'Eşit haklar henüz her yerde sağlanmadı.', complexity: 2, topic: 'Gesellschaft' },
  { id: 'de-05', language: 'de', word: 'die Meinungsfreiheit', translation: 'ifade özgürlüğü', partOfSpeech: 'Substantiv (f)', example: 'Meinungsfreiheit ist ein hohes Gut.', exampleTranslation: 'İfade özgürlüğü değerli bir şeydir.', complexity: 2, topic: 'Gesellschaft' },
  { id: 'de-06', language: 'de', word: 'der Zusammenhalt', translation: 'dayanışma, birliktelik', partOfSpeech: 'Substantiv (m)', example: 'Der Zusammenhalt der Gemeinschaft ist wichtig.', exampleTranslation: 'Topluluğun dayanışması önemlidir.', complexity: 2, topic: 'Gesellschaft' },
  { id: 'de-07', language: 'de', word: 'die Ausgrenzung', translation: 'dışlanma', partOfSpeech: 'Substantiv (f)', example: 'Ausgrenzung ist ein gesellschaftliches Problem.', exampleTranslation: 'Dışlanma toplumsal bir sorundur.', complexity: 2, topic: 'Gesellschaft' },
  { id: 'de-08', language: 'de', word: 'die Demokratie', translation: 'demokrasi', partOfSpeech: 'Substantiv (f)', example: 'Eine lebendige Demokratie braucht mündige Bürger.', exampleTranslation: 'Canlı bir demokrasi bilinçli vatandaşlar gerektirir.', complexity: 1, topic: 'Politik' },
  { id: 'de-09', language: 'de', word: 'die Manipulation', translation: 'manipülasyon', partOfSpeech: 'Substantiv (f)', example: 'Manipulation durch Medien ist ein Risiko.', exampleTranslation: 'Medya aracılığıyla manipülasyon bir risktir.', complexity: 2, topic: 'Medien' },
  { id: 'de-10', language: 'de', word: 'die Zensur', translation: 'sansür', partOfSpeech: 'Substantiv (f)', example: 'Zensur gefährdet die Pressefreiheit.', exampleTranslation: 'Sansür basın özgürlüğünü tehdit eder.', complexity: 2, topic: 'Medien' },

  // Umwelt & Technik
  { id: 'de-11', language: 'de', word: 'der Klimawandel', translation: 'iklim değişikliği', partOfSpeech: 'Substantiv (m)', example: 'Der Klimawandel ist die größte Herausforderung.', exampleTranslation: 'İklim değişikliği en büyük meydan okumadır.', complexity: 1, topic: 'Umwelt' },
  { id: 'de-12', language: 'de', word: 'die Nachhaltigkeit', translation: 'sürdürülebilirlik', partOfSpeech: 'Substantiv (f)', example: 'Nachhaltigkeit beginnt im Alltag.', exampleTranslation: 'Sürdürülebilirlik günlük hayatta başlar.', complexity: 2, topic: 'Umwelt' },
  { id: 'de-13', language: 'de', word: 'der Umweltschutz', translation: 'çevre koruma', partOfSpeech: 'Substantiv (m)', example: 'Umweltschutz ist eine globale Aufgabe.', exampleTranslation: 'Çevre koruma küresel bir görevdir.', complexity: 1, topic: 'Umwelt' },
  { id: 'de-14', language: 'de', word: 'die Erderwärmung', translation: 'küresel ısınma', partOfSpeech: 'Substantiv (f)', example: 'Die Erderwärmung bedroht viele Arten.', exampleTranslation: 'Küresel ısınma birçok türü tehdit ediyor.', complexity: 2, topic: 'Umwelt' },
  { id: 'de-15', language: 'de', word: 'die Digitalisierung', translation: 'dijitalleşme', partOfSpeech: 'Substantiv (f)', example: 'Die Digitalisierung verändert die Arbeitswelt.', exampleTranslation: 'Dijitalleşme iş dünyasını değiştiriyor.', complexity: 2, topic: 'Technik' },
  { id: 'de-16', language: 'de', word: 'die Künstliche Intelligenz', translation: 'yapay zeka', partOfSpeech: 'Substantiv (f)', example: 'Künstliche Intelligenz beeinflusst unser Leben.', exampleTranslation: 'Yapay zeka hayatımızı etkiliyor.', complexity: 2, topic: 'Technik' },

  // Bildung & Karriere
  { id: 'de-17', language: 'de', word: 'die Herausforderung', translation: 'meydan okuma', partOfSpeech: 'Substantiv (f)', example: 'Das Abitur ist eine große Herausforderung.', exampleTranslation: 'Abitur büyük bir meydan okumadır.', complexity: 1, topic: 'Bildung' },
  { id: 'de-18', language: 'de', word: 'die Eigeninitiative', translation: 'kendi inisiyatifi', partOfSpeech: 'Substantiv (f)', example: 'Eigeninitiative wird im Beruf geschätzt.', exampleTranslation: 'Kendi inisiyatifiniz işte takdir edilir.', complexity: 3, topic: 'Bildung' },
  { id: 'de-19', language: 'de', word: 'der Leistungsdruck', translation: 'başarı baskısı', partOfSpeech: 'Substantiv (m)', example: 'Leistungsdruck belastet viele Schüler.', exampleTranslation: 'Başarı baskısı birçok öğrenciyi zorluyor.', complexity: 2, topic: 'Bildung' },
  { id: 'de-20', language: 'de', word: 'die Weiterbildung', translation: 'mesleki gelişim', partOfSpeech: 'Substantiv (f)', example: 'Lebenslange Weiterbildung ist wichtig.', exampleTranslation: 'Yaşam boyu mesleki gelişim önemlidir.', complexity: 2, topic: 'Bildung' },

  // Gefühle & abstrakte Begriffe
  { id: 'de-21', language: 'de', word: 'die Zufriedenheit', translation: 'memnuniyet', partOfSpeech: 'Substantiv (f)', example: 'Zufriedenheit hängt nicht vom Besitz ab.', exampleTranslation: 'Memnuniyet sahip olmaktan bağımsızdır.', complexity: 2, topic: 'Emotionen' },
  { id: 'de-22', language: 'de', word: 'die Enttäuschung', translation: 'hayal kırıklığı', partOfSpeech: 'Substantiv (f)', example: 'Die Enttäuschung war groß.', exampleTranslation: 'Hayal kırıklığı büyüktü.', complexity: 2, topic: 'Emotionen' },
  { id: 'de-23', language: 'de', word: 'die Zuversicht', translation: 'güven, inanç', partOfSpeech: 'Substantiv (f)', example: 'Trotz allem bewahrte sie Zuversicht.', exampleTranslation: 'Her şeye rağmen iyimserliğini korudu.', complexity: 3, topic: 'Emotionen' },
  { id: 'de-24', language: 'de', word: 'die Verbundenheit', translation: 'bağlılık, yakınlık', partOfSpeech: 'Substantiv (f)', example: 'Verbundenheit zur Heimat ist wichtig.', exampleTranslation: 'Vatana bağlılık önemlidir.', complexity: 3, topic: 'Emotionen' },
  { id: 'de-25', language: 'de', word: 'die Besorgnis', translation: 'endişe', partOfSpeech: 'Substantiv (f)', example: 'Die Besorgnis der Eltern war berechtigt.', exampleTranslation: 'Ebeveynlerin endişesi haklıydı.', complexity: 2, topic: 'Emotionen' },

  // Verben (komplex)
  { id: 'de-26', language: 'de', word: 'sich auseinandersetzen mit', translation: 'bir şeyle yüzleşmek', partOfSpeech: 'reflexives Verb', example: 'Wir müssen uns mit dem Problem auseinandersetzen.', exampleTranslation: 'Sorunla yüzleşmeliyiz.', complexity: 2, topic: 'Verben' },
  { id: 'de-27', language: 'de', word: 'etwas in Frage stellen', translation: 'bir şeyi sorgulamak', partOfSpeech: 'Verb + Akkusativ', example: 'Diese These ist in Frage zu stellen.', exampleTranslation: 'Bu tez sorgulanmalıdır.', complexity: 3, topic: 'Verben' },
  { id: 'de-28', language: 'de', word: 'etwas berücksichtigen', translation: 'dikkate almak', partOfSpeech: 'Verb + Akkusativ', example: 'Wir müssen alle Aspekte berücksichtigen.', exampleTranslation: 'Tüm yönleri dikkate almalıyız.', complexity: 2, topic: 'Verben' },
  { id: 'de-29', language: 'de', word: 'etwas bewältigen', translation: 'üstesinden gelmek', partOfSpeech: 'Verb + Akkusativ', example: 'Sie bewältigte die Krise.', exampleTranslation: 'Krizin üstesinden geldi.', complexity: 2, topic: 'Verben' },
  { id: 'de-30', language: 'de', word: 'etwas hinterfragen', translation: 'sorgulamak', partOfSpeech: 'Verb + Akkusativ', example: 'Man sollte Werbung kritisch hinterfragen.', exampleTranslation: 'Reklamları eleştirel olarak sorgulamalıyız.', complexity: 3, topic: 'Verben' },

  // Adjektive
  { id: 'de-31', language: 'de', word: 'zweifelhaft', translation: 'şüpheli', partOfSpeech: 'Adjektiv', example: 'Seine Aussage ist zweifelhaft.', exampleTranslation: 'Açıklaması şüpheli.', complexity: 2, topic: 'Adjektive' },
  { id: 'de-32', language: 'de', word: 'unverzichtbar', translation: 'vazgeçilmez', partOfSpeech: 'Adjektiv', example: 'Bildung ist unverzichtbar.', exampleTranslation: 'Eğitim vazgeçilmezdir.', complexity: 2, topic: 'Adjektive' },
  { id: 'de-33', language: 'de', word: 'beispiellos', translation: 'emsalsiz', partOfSpeech: 'Adjektiv', example: 'Diese Krise ist beispiellos.', exampleTranslation: 'Bu kriz emsalsizdir.', complexity: 3, topic: 'Adjektive' },
  { id: 'de-34', language: 'de', word: 'widersprüchlich', translation: 'çelişkili', partOfSpeech: 'Adjektiv', example: 'Seine Aussage ist widersprüchlich.', exampleTranslation: 'Açıklaması çelişkilidir.', complexity: 3, topic: 'Adjektive' },
  { id: 'de-35', language: 'de', word: 'zunehmend', translation: 'artan', partOfSpeech: 'Adjektiv', example: 'Die zunehmende Digitalisierung verändert alles.', exampleTranslation: 'Artan dijitalleşme her şeyi değiştiriyor.', complexity: 2, topic: 'Adjektive' },
];

// ─── English Oberstufe ────────────────────────────────────────────────────
export const englishWords: VocabWord[] = [
  // Society & Politics
  { id: 'en-01', language: 'en', word: 'accountability', translation: 'hesap verebilirlik', partOfSpeech: 'noun', example: 'Politicians must be held to greater accountability.', exampleTranslation: 'Politikacılar daha fazla hesap verebilir olmalı.', complexity: 2, topic: 'Society' },
  { id: 'en-02', language: 'en', word: 'discrimination', translation: 'ayrımcılık', partOfSpeech: 'noun', example: 'Discrimination based on gender is illegal.', exampleTranslation: 'Cinsiyete dayalı ayrımcılık yasadışıdır.', complexity: 1, topic: 'Society' },
  { id: 'en-03', language: 'en', word: 'inequality', translation: 'eşitsizlik', partOfSpeech: 'noun', example: 'Economic inequality is growing worldwide.', exampleTranslation: 'Ekonomik eşitsizlik dünya çapında artıyor.', complexity: 1, topic: 'Society' },
  { id: 'en-04', language: 'en', word: 'exploitation', translation: 'sömürü', partOfSpeech: 'noun', example: 'The exploitation of workers is unethical.', exampleTranslation: 'İşçilerin sömürülmesi etik dışıdır.', complexity: 2, topic: 'Society' },
  { id: 'en-05', language: 'en', word: 'integration', translation: 'entegrasyon, uyum', partOfSpeech: 'noun', example: 'Successful integration requires effort from both sides.', exampleTranslation: 'Başarılı entegrasyon iki taraftan da çaba gerektirir.', complexity: 2, topic: 'Society' },
  { id: 'en-06', language: 'en', word: 'polarisation', translation: 'kutuplaşma', partOfSpeech: 'noun', example: 'Political polarisation is increasing in many countries.', exampleTranslation: 'Siyasi kutuplaşma birçok ülkede artıyor.', complexity: 3, topic: 'Politics' },
  { id: 'en-07', language: 'en', word: 'propaganda', translation: 'propaganda', partOfSpeech: 'noun', example: 'The regime used propaganda to control its citizens.', exampleTranslation: 'Rejim, vatandaşlarını kontrol etmek için propaganda kullandı.', complexity: 2, topic: 'Media' },
  { id: 'en-08', language: 'en', word: 'misinformation', translation: 'yanlış bilgi', partOfSpeech: 'noun', example: 'Social media spreads misinformation rapidly.', exampleTranslation: 'Sosyal medya yanlış bilgiyi hızla yayar.', complexity: 2, topic: 'Media' },

  // Environment & Tech
  { id: 'en-09', language: 'en', word: 'sustainability', translation: 'sürdürülebilirlik', partOfSpeech: 'noun', example: 'Sustainability must be a global priority.', exampleTranslation: 'Sürdürülebilirlik küresel bir öncelik olmalıdır.', complexity: 1, topic: 'Environment' },
  { id: 'en-10', language: 'en', word: 'biodiversity', translation: 'biyoçeşitlilik', partOfSpeech: 'noun', example: 'Deforestation threatens biodiversity.', exampleTranslation: 'Ormansızlaşma biyoçeşitliliği tehdit ediyor.', complexity: 2, topic: 'Environment' },
  { id: 'en-11', language: 'en', word: 'conservation', translation: 'koruma', partOfSpeech: 'noun', example: 'Wildlife conservation is crucial.', exampleTranslation: 'Yaban hayatı koruma çok önemlidir.', complexity: 2, topic: 'Environment' },
  { id: 'en-12', language: 'en', word: 'automation', translation: 'otomasyon', partOfSpeech: 'noun', example: 'Automation will replace many jobs.', exampleTranslation: 'Otomasyon birçok işin yerini alacak.', complexity: 2, topic: 'Technology' },
  { id: 'en-13', language: 'en', word: 'innovation', translation: 'inovasyon, yenilik', partOfSpeech: 'noun', example: 'Innovation drives economic growth.', exampleTranslation: 'Yenilik ekonomik büyümeyi yönlendirir.', complexity: 1, topic: 'Technology' },

  // Education & Work
  { id: 'en-14', language: 'en', word: 'achievement', translation: 'başarı', partOfSpeech: 'noun', example: 'Graduating is a great achievement.', exampleTranslation: 'Mezun olmak büyük bir başarıdır.', complexity: 1, topic: 'Education' },
  { id: 'en-15', language: 'en', word: 'enrolment', translation: 'kayıt', partOfSpeech: 'noun', example: 'University enrolment has increased.', exampleTranslation: 'Üniversite kayıtları arttı.', complexity: 3, topic: 'Education' },
  { id: 'en-16', language: 'en', word: 'curriculum', translation: 'müfredat', partOfSpeech: 'noun', example: 'The curriculum needs updating.', exampleTranslation: 'Müfredatın güncellenmesi gerekiyor.', complexity: 2, topic: 'Education' },

  // Abstract & emotional
  { id: 'en-17', language: 'en', word: 'resilience', translation: 'dayanıklılık, direnç', partOfSpeech: 'noun', example: 'Resilience helps people overcome hardship.', exampleTranslation: 'Dayanıklılık insanların zorlukları aşmasına yardımcı olur.', complexity: 2, topic: 'Emotions' },
  { id: 'en-18', language: 'en', word: 'compassion', translation: 'merhamet, şefkat', partOfSpeech: 'noun', example: 'Compassion is essential in healthcare.', exampleTranslation: 'Şefkat sağlık hizmetlerinde çok önemlidir.', complexity: 2, topic: 'Emotions' },
  { id: 'en-19', language: 'en', word: 'frustration', translation: 'hayal kırıklığı, sinir', partOfSpeech: 'noun', example: 'His frustration grew with each failure.', exampleTranslation: 'Hayal kırıklığı her başarısızlıkla büyüdü.', complexity: 2, topic: 'Emotions' },
  { id: 'en-20', language: 'en', word: 'ambiguity', translation: 'belirsizlik, muğlaklık', partOfSpeech: 'noun', example: 'The contract contained several ambiguities.', exampleTranslation: 'Sözleşme birkaç muğlaklık içeriyordu.', complexity: 3, topic: 'Emotions' },

  // Verbs (complex)
  { id: 'en-21', language: 'en', word: 'to advocate', translation: 'savunmak, desteklemek', partOfSpeech: 'verb', example: 'She advocates for human rights.', exampleTranslation: 'İnsan haklarını savunuyor.', complexity: 2, topic: 'Verbs' },
  { id: 'en-22', language: 'en', word: 'to undermine', translation: 'zayıflatmak, baltalamak', partOfSpeech: 'verb', example: 'His actions undermine our efforts.', exampleTranslation: 'Eylemleri çabalarımızı baltalıyor.', complexity: 3, topic: 'Verbs' },
  { id: 'en-23', language: 'en', word: 'to acknowledge', translation: 'kabul etmek, teşekkür etmek', partOfSpeech: 'verb', example: 'I acknowledge your contribution.', exampleTranslation: 'Katkınızı takdir ediyorum.', complexity: 2, topic: 'Verbs' },
  { id: 'en-24', language: 'en', word: 'to confront', translation: 'yüzleşmek', partOfSpeech: 'verb', example: 'We must confront the truth.', exampleTranslation: 'Gerçekle yüzleşmeliyiz.', complexity: 2, topic: 'Verbs' },
  { id: 'en-25', language: 'en', word: 'to emphasize', translation: 'vurgulamak', partOfSpeech: 'verb', example: 'I want to emphasize the importance of honesty.', exampleTranslation: 'Dürüstlüğün önemini vurgulamak istiyorum.', complexity: 1, topic: 'Verbs' },
  { id: 'en-26', language: 'en', word: 'to implement', translation: 'uygulamak', partOfSpeech: 'verb', example: 'The new policy was implemented last year.', exampleTranslation: 'Yeni politika geçen yıl uygulandı.', complexity: 2, topic: 'Verbs' },

  // Adjectives
  { id: 'en-27', language: 'en', word: 'compelling', translation: 'ikna edici, sürükleyici', partOfSpeech: 'adjective', example: 'Her argument was compelling.', exampleTranslation: 'Argümanı ikna ediciydi.', complexity: 2, topic: 'Adjectives' },
  { id: 'en-28', language: 'en', word: 'inevitable', translation: 'kaçınılmaz', partOfSpeech: 'adjective', example: 'Change is inevitable.', exampleTranslation: 'Değişim kaçınılmazdır.', complexity: 2, topic: 'Adjectives' },
  { id: 'en-29', language: 'en', word: 'profound', translation: 'derin, köklü', partOfSpeech: 'adjective', example: 'The book had a profound effect on me.', exampleTranslation: 'Kitap beni derinden etkiledi.', complexity: 2, topic: 'Adjectives' },
  { id: 'en-30', language: 'en', word: 'vulnerable', translation: 'kırılgan, savunmasız', partOfSpeech: 'adjective', example: 'Children are particularly vulnerable.', exampleTranslation: 'Çocuklar özellikle savunmasızdır.', complexity: 2, topic: 'Adjectives' },
  { id: 'en-31', language: 'en', word: 'controversial', translation: 'tartışmalı', partOfSpeech: 'adjective', example: 'It was a controversial decision.', exampleTranslation: 'Tartışmalı bir karardı.', complexity: 1, topic: 'Adjectives' },
  { id: 'en-32', language: 'en', word: 'unprecedented', translation: 'eşi benzeri görülmemiş', partOfSpeech: 'adjective', example: 'The pandemic was unprecedented.', exampleTranslation: 'Pandemi eşi benzeri görülmemişti.', complexity: 3, topic: 'Adjectives' },
];

export const allWords: VocabWord[] = [...deutschWords, ...englishWords];

export function getWordById(id: string): VocabWord | undefined {
  return allWords.find((w) => w.id === id);
}
