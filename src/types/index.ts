export type ModuleId = 'satzaufbau' | 'mathematik' | 'library' | 'stil' | 'englisch' | 'lektuere';

export type QuestionType = 'mcq' | 'fill' | 'order' | 'rewrite';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  // Turkish translation of the prompt (for math/STEM support — bilingual)
  turkishPrompt?: string;
  // MCQ options
  options?: string[];
  correctIndex?: number;
  // Fill / Rewrite: model answer
  correctAnswer?: string;
  // Rewrite: original sentence to be rewritten
  givenSentence?: string;
  // Rewrite: alternative acceptable answers
  acceptedAnswers?: string[];
  // Explanation shown after answer
  explanation: string;
  // Turkish translation of the explanation
  turkishExplanation?: string;
  // Step-by-step solution (optional, mainly for Math)
  solutionSteps?: string[];
  // Turkish translation of the solution steps (parallel array)
  turkishSolutionSteps?: string[];
  // Difficulty 1-3
  difficulty: 1 | 2 | 3;
  // Tags for analytics
  tags: string[];
}

export interface Topic {
  id: string;
  title: string;
  summary: string;
  // ISO date string (YYYY-MM-DD) — used to flag "Neu" badge for recent additions
  addedAt?: string;
  // Learning material
  lesson: {
    intro: string;
    rules: { title: string; body: string; examples: string[] }[];
  };
  questions: Question[];
}

// Leküre (Literatur) modülü — genişletilmiş bilgi kartı
export interface AuthorInfo {
  name: string;
  lebensdaten: string; // 1883-1924
  herkunft: string;    // Prag
  epoche: string;      // Expressionismus / Neue Sachlichkeit
  hauptwerke: string[];
  zitate?: { text: string; werk: string }[];
  themen: string[];
  stilmittel: string[];
  abiturRelevanz: string; // neden bu yazar Abitur'da önemli
}

export interface LektuereTopic extends Topic {
  author: AuthorInfo;
}

export interface Module {
  id: ModuleId;
  title: string;
  description: string;
  icon: string;
  color: 'pink' | 'cyan' | 'green' | 'purple' | 'blue';
  topics: Topic[];
}

export type Liga = 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Master';

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastPlayedDate: string | null; // ISO date
  wins: number;
  losses: number;
  correctAnswers: number;
  totalAnswers: number;
  moduleProgress: Record<string, { completedTopics: string[]; score: number }>;
}

export interface DuelAnswer {
  questionId: string;
  userAnswer: string | number;
  correct: boolean;
  timeMs: number;
}

export interface DuelResult {
  moduleId: ModuleId;
  userScore: number;
  botScore: number;
  answers: DuelAnswer[];
  xpEarned: number;
  durationMs: number;
}

export interface UploadedDoc {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  uploadedAt: string;
  textContent?: string;
  tags?: string[];
  sizeKb: number;
}
