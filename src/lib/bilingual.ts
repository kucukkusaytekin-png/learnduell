import type { Question } from '../types';
import { getMathTranslation } from '../data/mathematikTranslations';

export interface BilingualQuestion {
  prompt: string;
  turkishPrompt?: string;
  explanation: string;
  turkishExplanation?: string;
  solutionSteps?: string[];
  turkishSolutionSteps?: string[];
}

// Returns Turkish translation for Mathematik questions.
// Other modules: inline turkishPrompt/turkishExplanation fields are used when set;
// otherwise only the German prompt is shown. To add TR to other modules,
// set the inline fields directly in the question data.
export function getBilingual(question: Question): BilingualQuestion {
  const mathTr = getMathTranslation(question.id);

  return {
    prompt: question.prompt,
    turkishPrompt: question.turkishPrompt ?? mathTr?.prompt,
    explanation: question.explanation,
    turkishExplanation: question.turkishExplanation ?? mathTr?.explanation,
    solutionSteps: question.solutionSteps,
    turkishSolutionSteps: question.turkishSolutionSteps ?? mathTr?.solutionSteps,
  };
}
