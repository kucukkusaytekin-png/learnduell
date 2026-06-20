import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, Liga, ModuleId, UploadedDoc } from '../types';

export interface DailyChallengeRecord {
  dateKey: string; // YYYY-MM-DD
  bestScore: number;
  bestAccuracy: number; // 0-100
  attempts: number;
  completedAt: string | null; // ISO timestamp of last completion
}

export interface MockPruefungRecord {
  bestScore: number;
  bestAccuracy: number; // 0-100
  bestDurationMs: number;
  attempts: number;
  lastCompletedAt: string | null;
  lastResult: {
    score: number;
    accuracy: number;
    durationMs: number;
    correctByModule: Record<string, number>;
    totalByModule: Record<string, number>;
  } | null;
}

export interface ProfileSettings {
  userName: string;
  avatarEmoji: string;
  ttsEnabled: boolean;
}

export interface GameStore {
  // Profile
  profile: ProfileSettings;

  // Progress
  progress: UserProgress;
  uploadedDocs: UploadedDoc[];

  // Daily challenge
  dailyChallenge: DailyChallengeRecord;

  // Mock-Prüfung (Abitur simulation)
  mockPruefung: MockPruefungRecord;

  // Achievements (unlocked IDs)
  unlockedAchievements: string[];

  // Setters
  setUserName: (name: string) => void;
  setAvatar: (emoji: string) => void;
  setTtsEnabled: (enabled: boolean) => void;

  // Duel results
  recordDuelResult: (data: {
    moduleId: ModuleId;
    userScore: number;
    botScore: number;
    correctAnswers: number;
    totalAnswers: number;
  }) => { xpEarned: number; newLevel: boolean };

  // Module progress
  completeTopic: (moduleId: ModuleId, topicId: string, score: number) => void;

  // Library
  addUploadedDoc: (doc: UploadedDoc) => void;
  removeUploadedDoc: (id: string) => void;

  // Daily challenge
  recordDailyChallenge: (data: {
    dateKey: string;
    score: number;
    correctAnswers: number;
    totalAnswers: number;
  }) => { xpEarned: number; isNewRecord: boolean };

  // Mock-Prüfung
  recordMockPruefung: (data: {
    score: number;
    accuracy: number;
    durationMs: number;
    correctByModule: Record<string, number>;
    totalByModule: Record<string, number>;
  }) => { xpEarned: number; isNewRecord: boolean; isBestTime: boolean };

  // Achievements
  unlockAchievement: (id: string) => void;

  // Reset
  resetAll: () => void;
}

function calculateLevel(xp: number): number {
  return Math.floor(xp / 200) + 1;
}

function getLigaForLevel(level: number): Liga {
  if (level >= 30) return 'Master';
  if (level >= 20) return 'Diamond';
  if (level >= 10) return 'Gold';
  if (level >= 5) return 'Silver';
  return 'Bronze';
}

function getLigaColor(liga: Liga): { from: string; to: string; text: string; bg: string } {
  switch (liga) {
    case 'Master':
      return { from: '#ef4444', to: '#ec4899', text: '#fda4af', bg: 'rgba(239,68,68,0.15)' };
    case 'Diamond':
      return { from: '#06b6d4', to: '#3b82f6', text: '#67e8f9', bg: 'rgba(6,182,212,0.15)' };
    case 'Gold':
      return { from: '#f59e0b', to: '#eab308', text: '#fcd34d', bg: 'rgba(245,158,11,0.15)' };
    case 'Silver':
      return { from: '#94a3b8', to: '#64748b', text: '#cbd5e1', bg: 'rgba(148,163,184,0.15)' };
    default:
      return { from: '#a16207', to: '#854d0e', text: '#fcd34d', bg: 'rgba(161,98,7,0.15)' };
  }
}

function isToday(iso: string | null): boolean {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

function isYesterday(iso: string | null): boolean {
  if (!iso) return false;
  const d = new Date(iso);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      profile: {
        userName: 'Didem',
        avatarEmoji: '👩‍🎓',
        ttsEnabled: true,
      },
      progress: {
        xp: 240,
        level: 2,
        streak: 3,
        lastPlayedDate: new Date().toISOString(),
        wins: 4,
        losses: 1,
        correctAnswers: 28,
        totalAnswers: 35,
        moduleProgress: {
          satzaufbau: { completedTopics: [], score: 0 },
        },
      },
      uploadedDocs: [],
      dailyChallenge: {
        dateKey: todayKey(),
        bestScore: 0,
        bestAccuracy: 0,
        attempts: 0,
        completedAt: null,
      },
      mockPruefung: {
        bestScore: 0,
        bestAccuracy: 0,
        bestDurationMs: 0,
        attempts: 0,
        lastCompletedAt: null,
        lastResult: null,
      },
      unlockedAchievements: [],

      setUserName: (name) => set({ profile: { ...get().profile, userName: name } }),
      setAvatar: (emoji) => set({ profile: { ...get().profile, avatarEmoji: emoji } }),
      setTtsEnabled: (enabled) => set({ profile: { ...get().profile, ttsEnabled: enabled } }),

      recordDuelResult: ({ moduleId, userScore, botScore, correctAnswers, totalAnswers }) => {
        const prev = get().progress;
        const won = userScore > botScore;
        const baseXp = correctAnswers * 15;
        const winBonus = won ? 50 : 0;
        const streakBonus = prev.streak * 5;
        const xpEarned = baseXp + winBonus + streakBonus;

        const newXp = prev.xp + xpEarned;
        const oldLevel = calculateLevel(prev.xp);
        const newLevelNum = calculateLevel(newXp);
        const newLevel = newLevelNum > oldLevel;

        let newStreak = prev.streak;
        if (isToday(prev.lastPlayedDate)) {
          // already played today, streak unchanged
        } else if (isYesterday(prev.lastPlayedDate)) {
          newStreak = prev.streak + 1;
        } else {
          newStreak = 1;
        }

        // Track per-module wins for module-specific achievements
        const moduleProg = prev.moduleProgress[moduleId] || { completedTopics: [], score: 0 };
        const newModuleScore = won ? moduleProg.score + 1 : moduleProg.score;

        set({
          progress: {
            ...prev,
            xp: newXp,
            level: newLevelNum,
            streak: newStreak,
            lastPlayedDate: new Date().toISOString(),
            wins: prev.wins + (won ? 1 : 0),
            losses: prev.losses + (won ? 0 : 1),
            correctAnswers: prev.correctAnswers + correctAnswers,
            totalAnswers: prev.totalAnswers + totalAnswers,
            moduleProgress: {
              ...prev.moduleProgress,
              [moduleId]: {
                ...moduleProg,
                score: newModuleScore,
              },
            },
          },
        });

        return { xpEarned, newLevel };
      },

      completeTopic: (moduleId, topicId, score) => {
        const prev = get().progress;
        const moduleProg = prev.moduleProgress[moduleId] || { completedTopics: [], score: 0 };
        const newCompleted = moduleProg.completedTopics.includes(topicId)
          ? moduleProg.completedTopics
          : [...moduleProg.completedTopics, topicId];
        set({
          progress: {
            ...prev,
            moduleProgress: {
              ...prev.moduleProgress,
              [moduleId]: {
                completedTopics: newCompleted,
                score: Math.max(moduleProg.score, score),
              },
            },
          },
        });
      },

      addUploadedDoc: (doc) => set({ uploadedDocs: [...get().uploadedDocs, doc] }),

      removeUploadedDoc: (id) =>
        set({ uploadedDocs: get().uploadedDocs.filter((d) => d.id !== id) }),

      recordDailyChallenge: ({ dateKey, score, correctAnswers, totalAnswers }) => {
        const prev = get().dailyChallenge;
        const accuracy = totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100);
        const xpEarned = correctAnswers * 20 + (accuracy >= 80 ? 100 : accuracy >= 60 ? 50 : 0);
        const isNewRecord = score > prev.bestScore;

        set({
          dailyChallenge: {
            dateKey,
            bestScore: Math.max(prev.bestScore, score),
            bestAccuracy: Math.max(prev.bestAccuracy, accuracy),
            attempts: prev.dateKey === dateKey ? prev.attempts + 1 : 1,
            completedAt: new Date().toISOString(),
          },
          progress: {
            ...get().progress,
            xp: get().progress.xp + xpEarned,
            level: calculateLevel(get().progress.xp + xpEarned),
          },
        });

        return { xpEarned, isNewRecord };
      },

      recordMockPruefung: ({ score, accuracy, durationMs, correctByModule, totalByModule }) => {
        const prev = get().mockPruefung;
        const isNewRecord = score > prev.bestScore;
        const isBestTime = prev.bestDurationMs === 0 || durationMs < prev.bestDurationMs;
        const baseXp = Math.round(score * 0.5);
        const accuracyBonus = accuracy >= 90 ? 300 : accuracy >= 75 ? 200 : accuracy >= 60 ? 100 : 0;
        const perfectBonus = accuracy === 100 ? 500 : 0;
        const xpEarned = baseXp + accuracyBonus + perfectBonus;

        set({
          mockPruefung: {
            bestScore: Math.max(prev.bestScore, score),
            bestAccuracy: Math.max(prev.bestAccuracy, accuracy),
            bestDurationMs: isBestTime ? durationMs : prev.bestDurationMs,
            attempts: prev.attempts + 1,
            lastCompletedAt: new Date().toISOString(),
            lastResult: { score, accuracy, durationMs, correctByModule, totalByModule },
          },
          progress: {
            ...get().progress,
            xp: get().progress.xp + xpEarned,
            level: calculateLevel(get().progress.xp + xpEarned),
          },
        });

        return { xpEarned, isNewRecord, isBestTime };
      },

      unlockAchievement: (id) => {
        const prev = get().unlockedAchievements;
        if (prev.includes(id)) return;
        set({ unlockedAchievements: [...prev, id] });
      },

      resetAll: () =>
        set({
          profile: { userName: 'Didem', avatarEmoji: '👩‍🎓', ttsEnabled: true },
          progress: {
            xp: 0,
            level: 1,
            streak: 0,
            lastPlayedDate: null,
            wins: 0,
            losses: 0,
            correctAnswers: 0,
            totalAnswers: 0,
            moduleProgress: {},
          },
          uploadedDocs: [],
          dailyChallenge: {
            dateKey: todayKey(),
            bestScore: 0,
            bestAccuracy: 0,
            attempts: 0,
            completedAt: null,
          },
          mockPruefung: {
            bestScore: 0,
            bestAccuracy: 0,
            bestDurationMs: 0,
            attempts: 0,
            lastCompletedAt: null,
            lastResult: null,
          },
          unlockedAchievements: [],
        }),
    }),
    {
      name: 'lernduell-storage',
      version: 4,
      migrate: (persistedState: any, version: number) => {
        // v1 → v2: rename Ayşe to Didem
        if (version < 2 && persistedState) {
          if (persistedState.userName === 'Ayşe') {
            persistedState.userName = 'Didem';
          }
        }
        // v2 → v3: introduce profile / dailyChallenge fields
        if (version < 3 && persistedState) {
          persistedState.profile = persistedState.profile || {
            userName: persistedState.userName || 'Didem',
            avatarEmoji: '👩‍🎓',
            ttsEnabled: true,
          };
          persistedState.dailyChallenge = persistedState.dailyChallenge || {
            dateKey: todayKey(),
            bestScore: 0,
            bestAccuracy: 0,
            attempts: 0,
            completedAt: null,
          };
          persistedState.mockPruefung = persistedState.mockPruefung || {
            bestScore: 0,
            bestAccuracy: 0,
            bestDurationMs: 0,
            attempts: 0,
            lastCompletedAt: null,
            lastResult: null,
          };
          persistedState.unlockedAchievements = persistedState.unlockedAchievements || [];
        }
        return persistedState;
      },
    }
  )
);

export { calculateLevel, getLigaForLevel, getLigaColor };
