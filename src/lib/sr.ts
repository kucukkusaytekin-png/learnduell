// Leitner box-based spaced repetition.
// 5 boxes: review intervals (in days) = [1, 3, 7, 14, 30].
// Correct answer → move up one box (capped at 5). Wrong → back to box 1.

export const BOX_INTERVALS = [1, 3, 7, 14, 30] as const;
export const MAX_BOX = 5;

export interface TopicReviewState {
  box: number; // 1..MAX_BOX
  lastReviewedAt: string | null; // ISO date
  nextReviewAt: string | null; // ISO date (yyyy-mm-dd)
  correctCount: number;
  wrongCount: number;
}

export function createInitialState(): TopicReviewState {
  return {
    box: 1,
    lastReviewedAt: null,
    nextReviewAt: todayISO(),
    correctCount: 0,
    wrongCount: 0,
  };
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysBetween(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / (24 * 60 * 60 * 1000));
}

export function isDue(state: TopicReviewState, today: string = todayISO()): boolean {
  if (!state.nextReviewAt) return true;
  return state.nextReviewAt <= today;
}

export function recordAnswer(
  state: TopicReviewState,
  correct: boolean,
  today: string = todayISO()
): TopicReviewState {
  if (correct) {
    const newBox = Math.min(MAX_BOX, state.box + 1);
    const interval = BOX_INTERVALS[newBox - 1];
    const nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + interval);
    return {
      ...state,
      box: newBox,
      lastReviewedAt: today,
      nextReviewAt: nextDate.toISOString().slice(0, 10),
      correctCount: state.correctCount + 1,
    };
  } else {
    const nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + BOX_INTERVALS[0]);
    return {
      ...state,
      box: 1,
      lastReviewedAt: today,
      nextReviewAt: nextDate.toISOString().slice(0, 10),
      wrongCount: state.wrongCount + 1,
    };
  }
}

export function dueTopics<T extends { id: string }>(
  topics: T[],
  reviews: Record<string, TopicReviewState>,
  today: string = todayISO()
): T[] {
  return topics.filter((t) => {
    const r = reviews[t.id];
    return !r || isDue(r, today);
  });
}
