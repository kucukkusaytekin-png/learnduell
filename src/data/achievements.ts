export type AchievementCategory = 'progress' | 'streak' | 'module' | 'speed' | 'mastery' | 'special';

export interface Achievement {
  id: string;
  category: AchievementCategory;
  title: string;
  description: string;
  icon: string; // emoji
  tier: 'bronze' | 'silver' | 'gold';
}

export const achievements: Achievement[] = [
  // ─── Progress ─────────────────────────────────────────────────────────────
  {
    id: 'first-duel',
    category: 'progress',
    title: 'Erste Schritte',
    description: 'Beende dein erstes Duell.',
    icon: '🎯',
    tier: 'bronze',
  },
  {
    id: 'wins-3',
    category: 'progress',
    title: 'Anfänger-Sieger',
    description: 'Gewinne 3 Duelle.',
    icon: '🥉',
    tier: 'bronze',
  },
  {
    id: 'wins-10',
    category: 'progress',
    title: 'Erfahrene Kämpferin',
    description: 'Gewinne 10 Duelle.',
    icon: '🥈',
    tier: 'silver',
  },
  {
    id: 'wins-25',
    category: 'progress',
    title: 'Kriegerin',
    description: 'Gewinne 25 Duelle.',
    icon: '⚔️',
    tier: 'silver',
  },
  {
    id: 'wins-50',
    category: 'progress',
    title: 'Champion',
    description: 'Gewinne 50 Duelle.',
    icon: '👑',
    tier: 'gold',
  },

  // ─── Streak ───────────────────────────────────────────────────────────────
  {
    id: 'streak-3',
    category: 'streak',
    title: 'Flamme',
    description: 'Halte einen 3-Tage-Streak.',
    icon: '🔥',
    tier: 'bronze',
  },
  {
    id: 'streak-7',
    category: 'streak',
    title: 'Beständig',
    description: 'Halte einen 7-Tage-Streak.',
    icon: '🔥',
    tier: 'silver',
  },
  {
    id: 'streak-30',
    category: 'streak',
    title: 'Unbesiegbar',
    description: 'Halte einen 30-Tage-Streak.',
    icon: '💎',
    tier: 'gold',
  },

  // ─── Module mastery ──────────────────────────────────────────────────────
  {
    id: 'module-satzaufbau',
    category: 'module',
    title: 'Satzbau-Profi',
    description: 'Gewinne 5 Duelle in Deutsch Satzaufbau.',
    icon: '📚',
    tier: 'silver',
  },
  {
    id: 'module-mathematik',
    category: 'module',
    title: 'Mathe-Ass',
    description: 'Gewinne 5 Duelle in Mathematik.',
    icon: '🧮',
    tier: 'silver',
  },
  {
    id: 'module-stil',
    category: 'module',
    title: 'Stilübungs-Profi',
    description: 'Gewinne 5 Duelle in Stil & Ausdruck.',
    icon: '✍️',
    tier: 'silver',
  },
  {
    id: 'module-englisch',
    category: 'module',
    title: 'English-Master',
    description: 'Gewinne 5 Duelle in English.',
    icon: '🇬🇧',
    tier: 'silver',
  },

  // ─── Speed ───────────────────────────────────────────────────────────────
  {
    id: 'fast-answer',
    category: 'speed',
    title: 'Schnelldenkerin',
    description: 'Beantworte 3 Fragen in unter 5 Sekunden richtig.',
    icon: '⚡',
    tier: 'bronze',
  },

  // ─── Mastery ─────────────────────────────────────────────────────────────
  {
    id: 'perfect-duel',
    category: 'mastery',
    title: 'Vollkommen',
    description: 'Erreiche 100 % Genauigkeit in einem Duell.',
    icon: '💯',
    tier: 'gold',
  },
  {
    id: 'high-accuracy',
    category: 'mastery',
    title: 'Präzise',
    description: 'Halte eine Gesamtgenauigkeit von 90 %+.',
    icon: '🎯',
    tier: 'silver',
  },

  // ─── Special (advanced activities) ───────────────────────────────────────
  {
    id: 'first-aufsatz',
    category: 'special',
    title: 'Aufsatz-Talent',
    description: 'Öffne zum ersten Mal das Aufsatz-Studio.',
    icon: '📝',
    tier: 'bronze',
  },
  {
    id: 'first-mock',
    category: 'special',
    title: 'Prüfungs-Mutige',
    description: 'Beende deine erste Mock-Prüfung.',
    icon: '📋',
    tier: 'bronze',
  },
  {
    id: 'mock-70',
    category: 'special',
    title: 'Mock-Besteherin',
    description: 'Erreiche 70 %+ in der Mock-Prüfung.',
    icon: '📊',
    tier: 'silver',
  },
  {
    id: 'mock-90',
    category: 'special',
    title: 'Mock-Meisterin',
    description: 'Erreiche 90 %+ in der Mock-Prüfung.',
    icon: '🏆',
    tier: 'gold',
  },
  {
    id: 'mock-perfect',
    category: 'special',
    title: 'Perfekte Prüfung',
    description: 'Erreiche 100 % in der Mock-Prüfung.',
    icon: '🌟',
    tier: 'gold',
  },

  // ─── Module-specific deep mastery ───────────────────────────────────────
  {
    id: 'satz-10-wins',
    category: 'module',
    title: 'Satzbau-Veteranin',
    description: 'Gewinne 10 Duelle in Deutsch Satzaufbau.',
    icon: '📖',
    tier: 'gold',
  },
  {
    id: 'math-10-wins',
    category: 'module',
    title: 'Mathe-Veteranin',
    description: 'Gewinne 10 Duelle in Mathematik.',
    icon: '🧮',
    tier: 'gold',
  },
  {
    id: 'stil-10-wins',
    category: 'module',
    title: 'Stil-Meisterin',
    description: 'Gewinne 10 Duelle in Stil & Ausdruck.',
    icon: '✒️',
    tier: 'gold',
  },
  {
    id: 'englisch-10-wins',
    category: 'module',
    title: 'English-Veteranin',
    description: 'Gewinne 10 Duelle in English.',
    icon: '🇬🇧',
    tier: 'gold',
  },
  {
    id: 'all-modules-master',
    category: 'mastery',
    title: 'Allrounderin',
    description: 'Mindestens 3 Siege in jedem der 4 Module.',
    icon: '🏅',
    tier: 'gold',
  },
  {
    id: 'first-mock-each-module',
    category: 'special',
    title: 'Modul-Prüferin',
    description: 'Spiele je eine Mini-Mock-Prüfung in jedem Modul.',
    icon: '🎯',
    tier: 'silver',
  },
];

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}

export const tierColors = {
  bronze: { from: 'from-amber-700', to: 'to-amber-900', text: 'text-amber-400', border: 'border-amber-500/40' },
  silver: { from: 'from-slate-400', to: 'to-slate-600', text: 'text-slate-300', border: 'border-slate-400/40' },
  gold: { from: 'from-yellow-400', to: 'to-amber-500', text: 'text-yellow-300', border: 'border-yellow-400/40' },
};
