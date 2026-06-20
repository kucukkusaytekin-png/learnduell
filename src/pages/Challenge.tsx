import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Trophy, Flame, Volume2, ArrowLeft, Lightbulb, ChevronDown, ChevronUp, ArrowRight, Check, Sparkles, Languages } from 'lucide-react';
import type { Question } from '../types';
import { modules } from '../data/satzaufbau';
import { useGameStore } from '../store/gameStore';
import { getTodayKey, pickDailyQuestions } from '../lib/dailySeed';
import { speak, stopSpeaking, isTTSSupported } from '../lib/tts';
import { bestScore, verdictForScore } from '../lib/similarity';
import { getBilingual } from '../lib/bilingual';
import clsx from 'clsx';

const QUESTION_TIME = 20;

export default function Challenge() {
  const navigate = useNavigate();
  const profile = useGameStore((s) => s.profile);
  const dailyChallenge = useGameStore((s) => s.dailyChallenge);
  const recordDailyChallenge = useGameStore((s) => s.recordDailyChallenge);

  const today = getTodayKey();
  const allQuestions: Question[] = modules.flatMap((m) => m.topics.flatMap((t) => t.questions));
  const [questions] = useState<Question[]>(() => pickDailyQuestions(allQuestions, 10, today));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [finished, setFinished] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [rewriteInput, setRewriteInput] = useState('');
  const [rewriteScore, setRewriteScore] = useState(0);
  const [result, setResult] = useState<{ xpEarned: number; isNewRecord: boolean } | null>(null);

  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<number | null>(null);

  const currentQuestion = questions[currentIdx];
  const isLast = currentIdx >= questions.length;

  useEffect(() => {
    if (isLast || finished) return;
    startTimeRef.current = Date.now();
    setTimeLeft(QUESTION_TIME);
    setShowSolution(false);

    // If user already answered this question (e.g. went back), restore state
    // (We don't track answers in Challenge state directly, so just reset)
    setSelectedIdx(null);
    setShowFeedback(false);
    setRewriteInput('');
    setRewriteScore(0);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIdx, isLast, finished]);

  useEffect(() => {
    if (timeLeft === 0 && !showFeedback && !isLast && !finished) {
      handleAnswer(-1);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (isLast && !finished && questions.length > 0) {
      const accuracy = Math.round((correctCount / questions.length) * 100);
      const r = recordDailyChallenge({
        dateKey: today,
        score,
        correctAnswers: correctCount,
        totalAnswers: questions.length,
      });
      setResult(r);
      setFinished(true);
    }
  }, [isLast, finished]);

  function handleAnswer(optionIdx: number) {
    if (showFeedback || finished) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const timeMs = Date.now() - startTimeRef.current;
    const correct = optionIdx === currentQuestion.correctIndex;
    const points = correct ? Math.round(100 + Math.max(0, (QUESTION_TIME * 1000 - timeMs) / 80)) : 0;

    setSelectedIdx(optionIdx);
    setShowFeedback(true);
    setScore((s) => s + points);
    if (correct) setCorrectCount((c) => c + 1);

    // No auto-advance — user controls pace via Weiter button
  }

  function handleRewrite(text: string) {
    if (showFeedback || finished) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const timeMs = Date.now() - startTimeRef.current;
    const learner = text.trim();
    const model = currentQuestion.correctAnswer || '';
    const accepted = currentQuestion.acceptedAnswers || [];
    const score = bestScore(learner, model, accepted);
    const correct = score >= 0.55;
    const basePoints = Math.round(score * 200);
    const speedBonus = correct ? Math.round(Math.max(0, (QUESTION_TIME * 1000 - timeMs) / 100)) : 0;
    const points = basePoints + speedBonus;

    setSelectedIdx(0);
    setRewriteInput(learner);
    setRewriteScore(score);
    setShowFeedback(true);
    setScore((s) => s + points);
    if (correct) setCorrectCount((c) => c + 1);
  }

  function goNext() {
    setCurrentIdx((i) => i + 1);
  }

  function goBack() {
    if (currentIdx === 0) return;
    setCurrentIdx((i) => i - 1);
  }

  function speakQuestion() {
    if (!profile.ttsEnabled || !isTTSSupported()) return;
    speak(currentQuestion.prompt + '. ' + (currentQuestion.options || []).join(', '), { lang: 'de-DE' });
  }

  // Result screen
  if (finished && result) {
    const accuracy = Math.round((correctCount / questions.length) * 100);
    const isNewRecord = result.isNewRecord;

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <section
          className={clsx(
            'card-elevated p-8 sm:p-12 text-center relative overflow-hidden',
            isNewRecord ? 'border-accent-amber/40 bg-gradient-to-br from-accent-amber/10 to-transparent' : 'card-elevated'
          )}
        >
          {isNewRecord && (
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 30%, rgba(251,191,36,0.4), transparent 60%)' }}
            />
          )}
          <div className="relative">
            <div className="text-7xl mb-4">{isNewRecord ? '🏆' : accuracy >= 80 ? '🌟' : accuracy >= 50 ? '👍' : '💪'}</div>
            <h1
              className={clsx(
                'text-4xl sm:text-5xl font-black tracking-tight mb-2',
                isNewRecord ? 'gradient-text-warm' : 'gradient-text'
              )}
            >
              {isNewRecord ? 'NEUER REKORD!' : accuracy >= 80 ? 'SUPER!' : accuracy >= 50 ? 'Gut gemacht!' : 'Weiter üben!'}
            </h1>
            <p className="text-text-secondary text-lg mb-2">
              {score.toLocaleString('de-DE')} Punkte · {accuracy}% richtig
            </p>
            {isNewRecord && (
              <p className="text-accent-amber font-bold text-sm mb-4">
                Bisheriger Rekord: {dailyChallenge.bestScore.toLocaleString('de-DE')} Punkte
              </p>
            )}
            <p className="text-text-secondary text-base mt-4">
              +{result.xpEarned} XP erhalten
            </p>
          </div>
        </section>

        <div className="grid grid-cols-3 gap-3">
          <StatBox icon="🎯" label="Richtig" value={`${correctCount}/${questions.length}`} />
          <StatBox icon="⚡" label="Punkte" value={score.toLocaleString('de-DE')} />
          <StatBox icon="🔥" label="Streak" value={useGameStore.getState().progress.streak} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigate('/')} className="btn-primary flex-1 inline-flex items-center justify-center gap-2">
            Zurück zum Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="card p-10 text-center">Keine Fragen verfügbar.</div>;
  }

  const timePct = (timeLeft / QUESTION_TIME) * 100;
  const isLowTime = timeLeft <= 5;

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      {/* Header */}
      <div className="card-elevated p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-pink to-accent-amber flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">Tages-Challenge</div>
            <div className="font-bold text-sm">{new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">Dein Rekord</div>
          <div className="font-black text-accent-amber">{dailyChallenge.bestScore.toLocaleString('de-DE')}</div>
        </div>
      </div>

      {/* Timer */}
      <div className={clsx('card p-4 border-2 transition-colors', isLowTime ? 'border-accent-red/50' : 'border-border-subtle')}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm font-bold text-text-secondary">
            ⏱️ Verbleibende Zeit
          </div>
          <div className={clsx('text-2xl sm:text-3xl font-black tabular-nums', isLowTime ? 'text-accent-red' : 'gradient-text-warm')}>
            00:{timeLeft.toString().padStart(2, '0')}
          </div>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className={clsx('h-full rounded-full transition-all duration-1000', isLowTime ? 'bg-accent-red' : 'bg-gradient-to-r from-accent-primary to-accent-cyan')}
            style={{ width: `${timePct}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="card-elevated p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-pink/15 border border-accent-pink/30 text-accent-pink text-xs font-bold">
            Frage {currentIdx + 1} / {questions.length}
          </div>
          {profile.ttsEnabled && isTTSSupported() && (
            <button onClick={speakQuestion} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-accent-cyan transition-colors" title="Vorlesen">
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
          <RewriteInputChallenge
            givenSentence={currentQuestion.givenSentence || ''}
            value={rewriteInput}
            onChange={setRewriteInput}
            onSubmit={() => handleRewrite(rewriteInput)}
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

        {/* Solution toggle */}
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
              {isLast ? 'Challenge beenden 🏁' : 'Weiter'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Score bar */}
      <div className="card p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-text-secondary">
          <Trophy className="w-4 h-4 text-accent-amber" /> Punkte
        </div>
        <div className="text-2xl font-black gradient-text-warm tabular-nums">{score.toLocaleString('de-DE')}</div>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="card p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-black tabular-nums gradient-text-warm">{value}</div>
      <div className="text-xs text-text-secondary font-semibold uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function RewriteInputChallenge({
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
      {givenSentence && (
        <div className="p-3 rounded-xl bg-bg-elevated/60 border border-border-default">
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Umgangssprache</div>
          <div className="text-sm text-text-primary italic">{givenSentence}</div>
        </div>
      )}
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
            style={{ borderColor: verdict.color, background: `${verdict.color}15` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: verdict.color }}>
                  {score >= 0.55 ? <Check className="w-4 h-4 text-white" /> : <span className="text-white text-sm font-black">!</span>}
                </div>
                <span className="font-bold text-base" style={{ color: verdict.color }}>{verdict.label}</span>
              </div>
              <div className="text-2xl font-black tabular-nums" style={{ color: verdict.color }}>{verdict.pct}%</div>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${verdict.pct}%`, background: verdict.color }} />
            </div>
          </div>
        )
      )}
    </div>
  );
}
