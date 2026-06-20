// Text-to-Speech wrapper using the Web Speech API.
// Uses German voice when available, falls back to default.

let cachedGermanVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      voicesLoaded = true;
      resolve(voices);
      return;
    }
    // Some browsers fire voiceschanged asynchronously
    const handler = () => {
      const v = window.speechSynthesis.getVoices();
      voicesLoaded = true;
      window.speechSynthesis.removeEventListener('voiceschanged', handler);
      resolve(v);
    };
    window.speechSynthesis.addEventListener('voiceschanged', handler);
    // Timeout fallback
    setTimeout(() => {
      if (!voicesLoaded) {
        const v = window.speechSynthesis.getVoices();
        voicesLoaded = true;
        resolve(v);
      }
    }, 1500);
  });
}

async function pickVoice(): Promise<SpeechSynthesisVoice | null> {
  if (cachedGermanVoice) return cachedGermanVoice;
  const voices = await loadVoices();
  // Prefer high-quality German voices
  const preferred = voices.find(
    (v) => v.lang === 'de-DE' && /Google|Premium|Natural|Samantha|Enhanced/i.test(v.name)
  );
  const german = preferred || voices.find((v) => v.lang.startsWith('de')) || null;
  cachedGermanVoice = german;
  return german;
}

export async function speak(text: string, opts?: { rate?: number; pitch?: number; lang?: string }) {
  if (!('speechSynthesis' in window)) return;
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = opts?.lang || 'de-DE';
  utterance.rate = opts?.rate ?? 0.95;
  utterance.pitch = opts?.pitch ?? 1;

  const voice = await pickVoice();
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}
