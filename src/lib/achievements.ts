import type { GameStore } from '../store/gameStore';
import { achievements } from '../data/achievements';

// Returns the list of achievement IDs that should be unlocked given the current state.
// Caller compares with previously-unlocked and unlocks new ones.
export function detectUnlocked(state: GameStore): string[] {
  const unlocked: string[] = [];
  const { progress, mockPruefung } = state;

  // Total duels completed = wins + losses
  const totalDuels = progress.wins + progress.losses;
  if (totalDuels >= 1) unlocked.push('first-duel');
  if (progress.wins >= 3) unlocked.push('wins-3');
  if (progress.wins >= 10) unlocked.push('wins-10');
  if (progress.wins >= 25) unlocked.push('wins-25');
  if (progress.wins >= 50) unlocked.push('wins-50');

  // Streaks
  if (progress.streak >= 3) unlocked.push('streak-3');
  if (progress.streak >= 7) unlocked.push('streak-7');
  if (progress.streak >= 30) unlocked.push('streak-30');

  // Module mastery (5 + 10 wins per module)
  const satzaufbauProg = progress.moduleProgress['satzaufbau'];
  const mathematikProg = progress.moduleProgress['mathematik'];
  const stilProg = progress.moduleProgress['stil'];
  const englischProg = progress.moduleProgress['englisch'];

  if (satzaufbauProg && satzaufbauProg.score >= 5) unlocked.push('module-satzaufbau');
  if (mathematikProg && mathematikProg.score >= 5) unlocked.push('module-mathematik');
  if (stilProg && stilProg.score >= 5) unlocked.push('module-stil');
  if (englischProg && englischProg.score >= 5) unlocked.push('module-englisch');

  // Veteran (10 wins per module)
  if (satzaufbauProg && satzaufbauProg.score >= 10) unlocked.push('satz-10-wins');
  if (mathematikProg && mathematikProg.score >= 10) unlocked.push('math-10-wins');
  if (stilProg && stilProg.score >= 10) unlocked.push('stil-10-wins');
  if (englischProg && englischProg.score >= 10) unlocked.push('englisch-10-wins');

  // Allrounder (3+ wins in every module)
  if (
    satzaufbauProg && satzaufbauProg.score >= 3 &&
    mathematikProg && mathematikProg.score >= 3 &&
    stilProg && stilProg.score >= 3 &&
    englischProg && englischProg.score >= 3
  ) {
    unlocked.push('all-modules-master');
  }

  // Mastery
  const overallAccuracy = progress.totalAnswers === 0 ? 0 : progress.correctAnswers / progress.totalAnswers;
  if (overallAccuracy >= 0.9 && progress.totalAnswers >= 30) unlocked.push('high-accuracy');
  // Perfect duel tracked elsewhere — currently bestScore per module == 10 = 100%
  if (
    (satzaufbauProg && satzaufbauProg.score >= 10) ||
    (mathematikProg && mathematikProg.score >= 10) ||
    (stilProg && stilProg.score >= 10) ||
    (englischProg && englischProg.score >= 10)
  ) {
    unlocked.push('perfect-duel');
  }

  // Special
  if (mockPruefung.attempts >= 1) unlocked.push('first-mock');
  if (mockPruefung.bestAccuracy >= 70 && mockPruefung.attempts >= 1) unlocked.push('mock-70');
  if (mockPruefung.bestAccuracy >= 90 && mockPruefung.attempts >= 1) unlocked.push('mock-90');
  if (mockPruefung.bestAccuracy === 100 && mockPruefung.attempts >= 1) unlocked.push('mock-perfect');

  return unlocked;
}

export function getUnlockedCount(state: GameStore): number {
  return state.unlockedAchievements.length;
}

export function getTotalCount(): number {
  return achievements.length;
}
