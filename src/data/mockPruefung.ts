import type { Question } from '../types';
import { modules } from './satzaufbau';

// Mock-Prüfung (Abitur simülasyonu) — her modülden belirli sayıda soru seç.
// Scope: 'all' = tüm modüller (30 soru, 60 dk)
//        veya tek bir modulId (10 soru, 15 dk)

export type MockScope = 'all' | 'satzaufbau' | 'mathematik' | 'stil' | 'englisch';

export interface MockQuestion {
  question: Question;
  moduleId: string;
  moduleTitle: string;
  moduleColor: 'pink' | 'cyan' | 'green' | 'blue' | 'purple';
  topicId: string;
  topicTitle: string;
}

const PER_MODULE_FULL: Record<string, number> = {
  satzaufbau: 8,
  mathematik: 6,
  stil: 6,
  englisch: 10,
};

const PER_MODULE_SINGLE = 10;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function generateMockPruefung(scope: MockScope = 'all'): MockQuestion[] {
  const targetMods = scope === 'all' ? modules : modules.filter((m) => m.id === scope);
  const out: MockQuestion[] = [];
  for (const mod of targetMods) {
    const count = scope === 'all' ? PER_MODULE_FULL[mod.id] ?? 5 : PER_MODULE_SINGLE;
    const all: { q: Question; topicId: string; topicTitle: string }[] = [];
    for (const topic of mod.topics) {
      for (const q of topic.questions) {
        all.push({ q, topicId: topic.id, topicTitle: topic.title });
      }
    }
    const picked = shuffle(all).slice(0, Math.min(count, all.length));
    for (const { q, topicId, topicTitle } of picked) {
      out.push({
        question: q,
        moduleId: mod.id,
        moduleTitle: mod.title,
        moduleColor: mod.color,
        topicId,
        topicTitle,
      });
    }
  }
  return shuffle(out);
}

export function getMockConfig(scope: MockScope = 'all'): { totalQuestions: number; durationMin: number } {
  if (scope === 'all') return { totalQuestions: 30, durationMin: 60 };
  return { totalQuestions: 10, durationMin: 15 };
}

export function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

