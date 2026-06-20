import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Zap, Clock, Volume2, Lightbulb, ChevronDown, ChevronUp, ArrowLeft, ArrowRight, Check, Sparkles, Languages } from 'lucide-react';
import type { Question, DuelAnswer } from '../types';
import { getModule, getRandomQuestions } from '../data/satzaufbau';
import { useGameStore } from '../store/gameStore';
import { speak, isTTSSupported } from '../lib/tts';
import { bestScore, verdictForScore } from '../lib/similarity';
import { getBilingual } from '../lib/bilingual';
import clsx from 'clsx';

interface BotState {
  score: number;
  currentQuestionIdx: number;
  isAnswering: boolean;
  feedback: 'correct' | 'wrong' | null;
  feedbackAt: number | null;
  speedHistory: number[];
}

const QUESTION_TIME = 20; // seconds

export default function Duel() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const mod = getModule(moduleId || 'satzaufbau');
  const recordDuelResult = useGameStore((s) => s.recordDuelResult);

  const [questions] = useState<Question[]>(() => getRandomQuestions(moduleId || 'satzaufbau', 10));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [answers, setAnswers] = useState<DuelAnswer[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [rewriteUserInput, setRewriteUserInput] = useState('');
  const [rewriteScore, setRewriteScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [bot, setBot] = useState<BotState>({
    score: 0,
    currentQuestionIdx: 0,
    isAnswering: false,
    feedback: null,
    feedbackAt: null,
    speedHistory: [],
  });
  const [startedAt] = useState(Date.now());

  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<number | null>(null);
  const botTimerRef = useRef<number | null>(null);

  const currentQuestion = questions[currentIdx];
  const isLastQuestion = currentIdx === questions.length - 1;
  const isFinished = currentIdx >= questions.length;

  // Reset question timer (preserve answered state when navigating back)
  useEffect(() => {
    if (isFinished) return;
    startTimeRef.current = Date.now();
    setTimeLeft(QUESTION_TIME);
    setShowSolution(false);

    // If user already answered this question (e.g. went back), restore state
    const existing = answers.find((a) => a.questionId === currentQuestion.id);
    if (existing) {
      setSelectedIdx(existing.userAnswer as number);
      if (currentQuestion.type === 'rewrite') {
        setRewriteUserInput(String(existing.userAnswer));
        const model = currentQuestion.correctAnswer || '';
        const accepted = currentQuestion.acceptedAnswers || [];
        setRewriteScore(bestScore(String(existing.userAnswer), model, accepted));
      }
      setShowFeedback(true);
      // Don't restart bot for this question
      return;
    }
    setSelectedIdx(null);
    setShowFeedback(false);
    setRewriteUserInput('');
    setRewriteScore(0);

    // Start bot reaction for this question
    scheduleBotAnswer(currentQuestion);

    // User timer
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (botTimerRef.current) clearTimeout(botTimerRef.current);
    };
  }, [currentIdx, isFinished]);

  // Auto-advance when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && !showFeedback && !isFinished) {
      handleTimeout();
    }
  }, [timeLeft]);

  // Navigate to result when finished
  useEffect(() => {
    if (isFinished) {
      const correctAnswers = answers.filter((a) => a.correct).length;
      const totalAnswers = answers.length;
      const result = recordDuelResult({
        moduleId: (moduleId || 'satzaufbau') as any,
        userScore,
        botScore: bot.score,
        correctAnswers,
        totalAnswers,
      });
      navigate('/result', {
        state: {
          userScore,
          botScore: bot.score,
          answers,
          xpEarned: result.xpEarned,
          leveledUp: result.newLevel,
          totalQuestions: questions.length,
          moduleTitle: mod?.title,
          durationMs: Date.now() - startedAt,
        },
      });
    }
  }, [isFinished]);

  function scheduleBotAnswer(q: Question) {
    // Bot thinking time: 2-7 seconds, scaled by difficulty
    const base = 2000 + Math.random() * 4000;
    const difficultyMult = 1 + (q.difficulty - 1) * 0.5;
    const delay = base * difficultyMult;

    // Accuracy by difficulty
    const accuracy = q.difficulty === 1 ? 0.92 : q.difficulty === 2 ? 0.78 : 0.6;
    const willBeCorrect = Math.random() < accuracy;

    botTimerRef.current = window.setTimeout(() => {
      const responseTimeMs = delay;
      const points = willBeCorrect ? Math.round(100 + Math.max(0, 5000 - responseTimeMs) / 50) : 0;
      setBot((prev) => ({
        ...prev,
        score: prev.score + points,
        currentQuestionIdx: prev.currentQuestionIdx + 1,
        feedback: willBeCorrect ? 'correct' : 'wrong',
        feedbackAt: Date.now(),
        speedHistory: [...prev.speedHistory, responseTimeMs],
      }));
    }, delay);
  }

  function handleTimeout() {
    // User didn't answer → record as wrong
    handleAnswer(-1);
  }

  function handleAnswer(optionIdx: number) {
    if (showFeedback || isFinished) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const timeMs = Date.now() - startTimeRef.current;
    let correct = false;
    let points = 0;

    if (currentQuestion.type === 'rewrite') {
      // optionIdx is not used here — caller uses handleRewriteAnswer
      return;
    } else {
      correct = optionIdx === currentQuestion.correctIndex;
      points = correct ? Math.round(100 + Math.max(0, (QUESTION_TIME * 1000 - timeMs) / 80)) : 0;
    }

    setSelectedIdx(optionIdx);
    setShowFeedback(true);
    setUserScore((s) => s + points);
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, userAnswer: optionIdx, correct, timeMs },
    ]);

    // No auto-advance — user controls pace via Weiter button
  }

  function handleRewriteAnswer(text: string) {
    if (showFeedback || isFinished) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const timeMs = Date.now() - startTimeRef.current;
    const learnerAnswer = text.trim();
    const model = currentQuestion.correctAnswer || '';
    const accepted = currentQuestion.acceptedAnswers || [];
    const score = bestScore(learnerAnswer, model, accepted);
    // Score thresholds: 0.75+ = excellent, 0.55+ = good, 0.35+ = okay, else wrong
    const correct = score >= 0.55;
    const basePoints = Math.round(score * 200);
    const speedBonus = correct ? Math.round(Math.max(0, (QUESTION_TIME * 1000 - timeMs) / 100)) : 0;
    const points = basePoints + speedBonus;

    setSelectedIdx(0); // dummy index for feedback
    setRewriteUserInput(learnerAnswer);
    setRewriteScore(score);
    setShowFeedback(true);
    setUserScore((s) => s + points);
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, userAnswer: learnerAnswer, correct, timeMs },
    ]);
  }

  function goNext() {
    setCurrentIdx((i) => i + 1);
  }

  function goBack() {
    if (currentIdx === 0) return;
    setCurrentIdx((i) => i - 1);
  }

  if (!mod || questions.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-text-secondary">Keine Fragen für dieses Modul verfügbar.</p>
      </div>
    );
  }

  if (isFinished) return null;

  const timePct = (timeLeft / QUESTION_TIME) * 100;
  const isLowTime = timeLeft <= 5;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header: Players + VS */}
      <div className="card-elevated p-5 sm:p-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
          {/* You */}
          <PlayerCard
            name={`${useGameStore.getState().profile.userName} (Du)`}
            avatar={useGameStore.getState().profile.avatarEmoji}
            score={userScore}
            gradient="from-accent-amber to-accent-red"
            borderColor="#fbbf24"
          />

          {/* VS */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-accent-red to-accent-pink flex items-center justify-center font-black text-sm sm:text-lg glow-primary flex-shrink-0">
            VS
          </div>

          {/* Bot */}
          <PlayerCard
            name="Bot · Max"
            avatar="🤖"
            score={bot.score}
            gradient="from-slate-500 to-slate-700"
            borderColor="#64748b"
            botFeedback={bot.feedback}
          />
        </div>

        {/* Bot progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-text-secondary">Bot-Fortschritt</span>
            <span className="text-text-primary">{Math.min(bot.currentQuestionIdx, questions.length)} / {questions.length}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-slate-500 to-slate-700 rounded-full transition-all"
              style={{ width: `${(Math.min(bot.currentQuestionIdx, questions.length) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className={clsx('card p-4 sm:p-5 border-2 transition-colors', isLowTime ? 'border-accent-red/50 animate-pulse' : 'border-border-subtle')}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm font-bold text-text-secondary">
            <Clock className="w-4 h-4" /> Verbleibende Zeit
          </div>
          <div className={clsx('text-2xl sm:text-3xl font-black tabular-nums', isLowTime ? 'text-accent-red' : 'gradient-text-warm')}>
            00:{timeLeft.toString().padStart(2, '0')}
          </div>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className={clsx('h-full rounded-full transition-all duration-1000', isLowTime ? 'bg-gradient-to-r from-accent-red to-accent-pink' : 'bg-gradient-to-r from-accent-primary to-accent-cyan')}
            style={{ width: `${timePct}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="card-elevated p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-pink/15 border border-accent-pink/30 text-accent-pink text-xs font-bold">
            <Zap className="w-3.5 h-3.5" />
            Frage {currentIdx + 1} / {questions.length} · {currentQuestion.tags[0]}
          </div>
          {useGameStore.getState().profile.ttsEnabled && isTTSSupported() && (
            <button
              onClick={() => speak(currentQuestion.prompt + '. ' + (currentQuestion.options || []).join(', '), { lang: 'de-DE' })}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-accent-cyan transition-colors"
              title="Frage vorlesen"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="text-lg sm:text-2xl font-bold leading-relaxed whitespace-pre-line mb-2">
          {currentQuestion.prompt}
        </div>
        {getBilingual(currentQuestion).turkishPrompt && (
          <div className="mb-5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-sm leading-relaxed text-emerald-100/90">
            <span className="mr-1.5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              <Languages className="h-3 w-3" /> TR
            </span>
            {getBilingual(currentQuestion).turkishPrompt}
          </div>
        )}

        {/* Rewrite (Stilübung) — text input */}
        {currentQuestion.type === 'rewrite' && (
          <RewriteInput
            givenSentence={currentQuestion.givenSentence || ''}
            value={rewriteUserInput}
            onChange={setRewriteUserInput}
            onSubmit={() => handleRewriteAnswer(rewriteUserInput)}
            disabled={showFeedback}
            score={rewriteScore}
            showFeedback={showFeedback}
          />
        )}

        {/* MCQ options */}
        {currentQuestion.type !== 'rewrite' && (
          <div className="grid sm:grid-cols-2 gap-3">
            {currentQuestion.options?.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              const isCorrect = idx === currentQuestion.correctIndex;
              const showAsCorrect = showFeedback && isCorrect;
              const showAsWrong = showFeedback && isSelected && !isCorrect;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showFeedback}
                  className={clsx(
                    'group p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 font-medium',
                    'hover:border-accent-primary hover:bg-accent-primary/10',
                    !showFeedback && 'border-border-default bg-bg-elevated/50',
                    showAsCorrect && 'border-accent-green bg-accent-green/15',
                    showAsWrong && 'border-accent-red bg-accent-red/15',
                    isSelected && !showFeedback && 'border-accent-primary bg-accent-primary/10'
                  )}
                >
                  <span
                    className={clsx(
                      'w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 transition-colors',
                      showAsCorrect ? 'bg-accent-green text-white' :
                      showAsWrong ? 'bg-accent-red text-white' :
                      'bg-white/5 text-text-secondary group-hover:bg-accent-primary group-hover:text-white'
                    )}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Solution toggle — only if steps exist */}
        {currentQuestion.solutionSteps && currentQuestion.solutionSteps.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setShowSolution((s) => !s)}
              className={clsx(
                'w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border-2 transition-all text-sm font-bold',
                showSolution
                  ? 'bg-accent-amber/15 border-accent-amber/50 text-accent-amber'
                  : 'bg-gradient-to-r from-accent-amber/10 to-accent-pink/5 border-accent-amber/30 text-accent-amber hover:border-accent-amber/60'
              )}
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                {showSolution ? 'Lösung verbergen' : '💡 Lösungsschritte anzeigen'}
              </span>
              {showSolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showSolution && (
              <div className="mt-3 p-4 rounded-xl bg-gradient-to-br from-accent-amber/10 to-accent-pink/5 border border-accent-amber/30 animate-slide-up">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-accent-amber" />
                  <span className="text-xs font-black text-accent-amber uppercase tracking-wider">
                    Lösungsschritte
                  </span>
                </div>
                <ol className="space-y-3">
                  {currentQuestion.solutionSteps.map((step, i) => {
                    const tr = getBilingual(currentQuestion).turkishSolutionSteps?.[i];
                    return (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-primary leading-relaxed">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-amber/20 border border-accent-amber/40 text-accent-amber text-xs font-black flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <div className="flex-1 pt-0.5">
                          <div>{step}</div>
                          {tr && (
                            <div className="mt-1 text-xs italic leading-relaxed text-emerald-200/80">
                              <Languages className="inline h-3 w-3 mr-0.5 -mt-0.5" /> {tr}
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
        )}

        {showFeedback && (
          <div className="mt-5 p-4 rounded-xl bg-bg-base/60 border border-border-subtle animate-slide-up">
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Erklärung</div>
            <p className="text-sm text-text-primary leading-relaxed">{currentQuestion.explanation}</p>
            {getBilingual(currentQuestion).turkishExplanation && (
              <div className="mt-3 border-t border-border-subtle pt-3 text-sm leading-relaxed text-emerald-100/90">
                <div className="mb-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  <Languages className="h-3 w-3" /> Türkçe Açıklama
                </div>
                {getBilingual(currentQuestion).turkishExplanation}
              </div>
            )}
          </div>
        )}

        {/* Navigation: Zurück / Weiter — user controls the pace */}
        {showFeedback && (
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={goBack}
              disabled={currentIdx === 0}
              className={clsx(
                'btn-ghost inline-flex items-center gap-2 text-sm',
                currentIdx === 0 && 'opacity-30 cursor-not-allowed'
              )}
            >
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>
            <button
              onClick={goNext}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-accent-primary to-accent-cyan hover:shadow-lg hover:shadow-accent-primary/30 transition-all"
            >
              {isLastQuestion ? 'Duell beenden 🏁' : 'Weiter'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PlayerCard({
  name,
  avatar,
  score,
  gradient,
  borderColor,
  botFeedback,
}: {
  name: string;
  avatar: string;
  score: number;
  gradient: string;
  borderColor: string;
  botFeedback?: 'correct' | 'wrong' | null;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={clsx(
          'w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br flex items-center justify-center text-2xl sm:text-3xl border-2 flex-shrink-0',
          gradient
        )}
        style={{ borderColor }}
      >
        {avatar}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs sm:text-sm font-bold truncate">{name}</div>
        <div className="text-xl sm:text-2xl font-black gradient-text-warm tabular-nums">{score.toLocaleString('de-DE')}</div>
      </div>
      {botFeedback && (
        <div className={clsx('text-xl', botFeedback === 'correct' ? '✅' : '❌')} />
      )}
    </div>
  );
}

function RewriteInput({
  givenSentence,
  value,
  onChange,
  onSubmit,
  disabled,
  score,
  showFeedback,
}: {
  givenSentence: string;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  score: number;
  showFeedback: boolean;
}) {
  const verdict = showFeedback ? verdictForScore(score) : null;
  return (
    <div className="space-y-3">
      {/* Original sentence */}
      {givenSentence && (
        <div className="p-3 rounded-xl bg-bg-elevated/60 border border-border-default">
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Umgangssprache</div>
          <div className="text-sm text-text-primary italic">{givenSentence}</div>
        </div>
      )}

      {/* Textarea */}
      <div>
        <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Deine förmliche Version</div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Schreibe hier deine Version..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-bg-base border-2 border-border-default text-text-primary font-medium focus:outline-none focus:border-accent-primary transition-colors resize-none"
        />
      </div>

      {/* Submit or verdict */}
      {!showFeedback ? (
        <button
          onClick={onSubmit}
          disabled={disabled || value.trim().length < 3}
          className={clsx(
            'w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white transition-all',
            'bg-gradient-to-r from-accent-primary to-accent-cyan',
            'hover:shadow-lg hover:shadow-accent-primary/30',
            (disabled || value.trim().length < 3) && 'opacity-40 cursor-not-allowed'
          )}
        >
          <Sparkles className="w-4 h-4" /> Vergleichen
        </button>
      ) : (
        verdict && (
          <div
            className="p-4 rounded-xl border-2 animate-slide-up"
            style={{
              borderColor: verdict.color,
              background: `${verdict.color}15`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: verdict.color }}
                >
                  {score >= 0.55 ? <Check className="w-4 h-4 text-white" /> : <span className="text-white text-sm font-black">!</span>}
                </div>
                <span className="font-bold text-base" style={{ color: verdict.color }}>
                  {verdict.label}
                </span>
              </div>
              <div className="text-2xl font-black tabular-nums" style={{ color: verdict.color }}>
                {verdict.pct}%
              </div>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${verdict.pct}%`, background: verdict.color }}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
