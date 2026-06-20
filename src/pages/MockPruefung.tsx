import { useState, useEffect, useMemo, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Flag,
  Trophy,
  RotateCcw,
  ArrowLeft,
  Languages,
  Lightbulb,
} from 'lucide-react';
import { generateMockPruefung, formatDuration, getMockConfig, type MockQuestion, type MockScope } from '../data/mockPruefung';
import { useGameStore } from '../store/gameStore';
import { getBilingual } from '../lib/bilingual';
import { bestScore, verdictForScore } from '../lib/similarity';
import clsx from 'clsx';

const TOTAL_SECONDS_INITIAL = 60 * 60; // default 60 min, overwritten on start
const WARNING_AT_SEC = 5 * 60; // last 5 min

interface AnswerRecord {
  questionIdx: number;
  userAnswer: string | number | null;
  rewriteText?: string;
  rewriteScore?: number;
  correct: boolean;
  timeMs: number;
}

export default function MockPruefung() {
  const recordMockPruefung = useGameStore((s) => s.recordMockPruefung);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);
  const prevBest = useGameStore((s) => s.mockPruefung);

  const [phase, setPhase] = useState<'intro' | 'running' | 'result'>('intro');
  const [scope, setScope] = useState<MockScope>('all');
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [rewriteText, setRewriteText] = useState('');
  const [rewriteScore, setRewriteScore] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS_INITIAL);
  const [totalSeconds, setTotalSeconds] = useState(TOTAL_SECONDS_INITIAL);
  const [startedAt, setStartedAt] = useState<number>(0);
  const questionStartRef = useRef<number>(0);

  const current = questions[currentIdx];

  // Timer
  useEffect(() => {
    if (phase !== 'running') return;
    if (secondsLeft <= 0) {
      finalize();
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secondsLeft]);

  const start = () => {
    const selectedScope = scope;
    const qs = generateMockPruefung(selectedScope);
    const config = getMockConfig(selectedScope);
    setScope(selectedScope);
    setQuestions(qs);
    setCurrentIdx(0);
    setAnswers([]);
    setSelectedIdx(null);
    setRewriteText('');
    setRewriteScore(null);
    setShowFeedback(false);
    setShowSolution(false);
    const totalSec = config.durationMin * 60;
    setSecondsLeft(totalSec);
    setTotalSeconds(totalSec);
    setStartedAt(Date.now());
    questionStartRef.current = Date.now();
    setPhase('running');
  };

  const handleAnswer = (idx: number) => {
    if (!current || showFeedback) return;
    setSelectedIdx(idx);
    const isCorrect = idx === current.question.correctIndex;
    const timeMs = Date.now() - questionStartRef.current;
    const newAnswers: AnswerRecord[] = [
      ...answers,
      {
        questionIdx: currentIdx,
        userAnswer: idx,
        correct: isCorrect,
        timeMs,
      },
    ];
    setAnswers(newAnswers);
    setShowFeedback(true);
    // Auto-add to answers for accurate scoring
    void newAnswers;
  };

  const handleRewrite = (text: string) => {
    if (!current || showFeedback) return;
    const score = bestScore(text, current.question.correctAnswer ?? '', current.question.acceptedAnswers ?? []);
    const isCorrect = score >= 0.55;
    setRewriteScore(score);
    const timeMs = Date.now() - questionStartRef.current;
    setAnswers([
      ...answers,
      {
        questionIdx: currentIdx,
        userAnswer: text,
        rewriteText: text,
        rewriteScore: score,
        correct: isCorrect,
        timeMs,
      },
    ]);
    setShowFeedback(true);
  };

  const goNext = () => {
    if (currentIdx + 1 >= questions.length) {
      finalize();
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedIdx(null);
      setRewriteText('');
      setRewriteScore(null);
      setShowFeedback(false);
      setShowSolution(false);
      questionStartRef.current = Date.now();
    }
  };

  const goPrev = () => {
    if (currentIdx === 0) return;
    setCurrentIdx((i) => i - 1);
    const prev = answers[currentIdx - 1];
    if (prev) {
      if (prev.userAnswer !== null && typeof prev.userAnswer === 'number') {
        setSelectedIdx(prev.userAnswer);
      } else if (prev.rewriteText !== undefined) {
        setRewriteText(prev.rewriteText);
        setRewriteScore(prev.rewriteScore ?? null);
      }
      setShowFeedback(true);
    } else {
      setSelectedIdx(null);
      setRewriteText('');
      setRewriteScore(null);
      setShowFeedback(false);
    }
    setShowSolution(false);
  };

  const finalize = () => {
    const correctAnswers = answers.filter((a) => a.correct).length;
    const totalAnswers = questions.length;
    const accuracy = totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100);

    // Module breakdown
    const correctByModule: Record<string, number> = {};
    const totalByModule: Record<string, number> = {};
    questions.forEach((mq, i) => {
      totalByModule[mq.moduleId] = (totalByModule[mq.moduleId] || 0) + 1;
      if (answers[i]?.correct) {
        correctByModule[mq.moduleId] = (correctByModule[mq.moduleId] || 0) + 1;
      }
    });

    // Score: weighted by accuracy and time
    const timeUsedMs = (totalSeconds - secondsLeft) * 1000;
    const baseScore = correctAnswers * 30;
    const accuracyBonus = accuracy * 5;
    const timeBonus = Math.max(0, Math.round(((totalSeconds - secondsLeft) / totalSeconds) < 0.7 ? 100 : 0));
    const score = baseScore + accuracyBonus + timeBonus;

    recordMockPruefung({
      score,
      accuracy,
      durationMs: timeUsedMs,
      correctByModule,
      totalByModule,
    });

    // Unlock achievements
    if (accuracy >= 70) unlockAchievement('mock-70');
    if (accuracy >= 90) unlockAchievement('mock-90');
    if (accuracy === 100) unlockAchievement('mock-perfect');

    setPhase('result');
  };

  const result = useMemo(() => {
    if (phase !== 'result' || questions.length === 0) return null;
    const correct = answers.filter((a) => a.correct).length;
    const total = questions.length;
    const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
    const timeUsedMs = (totalSeconds - secondsLeft) * 1000;
    const baseScore = correct * 30;
    const accuracyBonus = accuracy * 5;
    const timeBonus = Math.max(0, Math.round(((totalSeconds - secondsLeft) / totalSeconds) < 0.7 ? 100 : 0));
    const score = baseScore + accuracyBonus + timeBonus;

    const byModule: Record<string, { correct: number; total: number; title: string; color: string }> = {};
    questions.forEach((mq, i) => {
      if (!byModule[mq.moduleId]) {
        byModule[mq.moduleId] = { correct: 0, total: 0, title: mq.moduleTitle, color: mq.moduleColor };
      }
      byModule[mq.moduleId].total += 1;
      if (answers[i]?.correct) byModule[mq.moduleId].correct += 1;
    });

    return { correct, total, accuracy, score, timeUsedMs, byModule };
  }, [phase, answers, questions, secondsLeft, totalSeconds]);

  // ─── INTRO ─────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    const config = getMockConfig(scope);
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <NavLink to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Zurück zum Dashboard
        </NavLink>

        <div className="card-elevated relative overflow-hidden p-8">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 80% 20%, rgba(168,85,247,0.5), transparent 60%), radial-gradient(circle at 20% 80%, rgba(6,182,212,0.4), transparent 60%)',
            }}
          />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300">
              <Trophy className="h-3.5 w-3.5" />
              Mock-Prüfung · Abitur-Simulation
            </div>
            <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">Bist du bereit?</h1>
            <p className="mb-6 text-slate-400">
              {scope === 'all'
                ? '60 Minuten. 30 Fragen aus allen Modulen. Echtes Abitur-Feeling mit Zeitdruck.'
                : `${config.durationMin} Minuten. ${config.totalQuestions} Fragen — Mini-Prüfung für ein einzelnes Modul.`}
            </p>

            {/* Module chips */}
            <div className="mb-5">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Welches Modul?</div>
              <div className="flex flex-wrap gap-2">
                <ModuleChip
                  active={scope === 'all'}
                  onClick={() => setScope('all')}
                  color="purple"
                  label="Alle Module"
                />
                <ModuleChip
                  active={scope === 'satzaufbau'}
                  onClick={() => setScope('satzaufbau')}
                  color="pink"
                  label="📚 Satzaufbau"
                />
                <ModuleChip
                  active={scope === 'mathematik'}
                  onClick={() => setScope('mathematik')}
                  color="cyan"
                  label="🧮 Mathematik"
                />
                <ModuleChip
                  active={scope === 'stil'}
                  onClick={() => setScope('stil')}
                  color="blue"
                  label="✍️ Stil"
                />
                <ModuleChip
                  active={scope === 'englisch'}
                  onClick={() => setScope('englisch')}
                  color="green"
                  label="🇬🇧 English"
                />
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat icon="⏱️" label="Zeit" value={`${config.durationMin} min`} />
              <Stat icon="❓" label="Fragen" value={String(config.totalQuestions)} />
              <Stat icon="📚" label="Module" value={scope === 'all' ? '4' : '1'} />
              <Stat icon="🏆" label="Bestwert" value={prevBest.bestScore > 0 ? prevBest.bestScore.toString() : '—'} />
            </div>

            <div className="mb-6 rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
              <h3 className="mb-2 text-sm font-bold text-white">Wie es funktioniert:</h3>
              <ul className="space-y-1.5 text-sm text-slate-300">
                <li className="flex gap-2"><span className="text-emerald-400">✓</span> {config.durationMin} Minuten Zeit, läuft ab Start</li>
                <li className="flex gap-2"><span className="text-emerald-400">✓</span> {scope === 'all' ? 'Fragen aus Satzaufbau, Mathematik, Stil & Ausdruck, English' : `Nur ${scope} Fragen`}</li>
                <li className="flex gap-2"><span className="text-emerald-400">✓</span> Du kannst zwischen Fragen springen</li>
                <li className="flex gap-2"><span className="text-emerald-400">✓</span> Mathe-Fragen zeigen Türkçe Çeviri</li>
                <li className="flex gap-2"><span className="text-emerald-400">✓</span> Am Ende: detaillierter Bericht pro Modul</li>
                <li className="flex gap-2"><span className="text-amber-400">⚠</span> Zeit wird knapp? Du wirst gewarnt (letzte 5 Min)</li>
              </ul>
            </div>

            <button
              onClick={start}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl"
            >
              <Flag className="h-5 w-5" />
              Prüfung starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULT ────────────────────────────────────────────────────────────────
  if (phase === 'result' && result) {
    const isPerfect = result.accuracy === 100;
    const isGreat = result.accuracy >= 80;
    const isGood = result.accuracy >= 60;
    const verdict = isPerfect ? 'Perfekt!' : isGreat ? 'Sehr gut!' : isGood ? 'Gut gemacht!' : 'Weiter üben!';
    const verdictColor = isPerfect ? 'text-yellow-300' : isGreat ? 'text-emerald-300' : isGood ? 'text-blue-300' : 'text-slate-300';

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="card-elevated relative overflow-hidden p-8 text-center">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                isPerfect
                  ? 'radial-gradient(circle at 50% 50%, rgba(250,204,21,0.5), transparent 60%)'
                  : isGreat
                  ? 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.4), transparent 60%)'
                  : 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.3), transparent 60%)',
            }}
          />
          <div className="relative">
            <div className="mb-3 text-7xl">{isPerfect ? '🌟' : isGreat ? '🏆' : isGood ? '👍' : '💪'}</div>
            <h2 className={`mb-2 text-4xl font-black tracking-tight ${verdictColor}`}>{verdict}</h2>
            <p className="mb-6 text-slate-400">
              {result.correct} von {result.total} richtig in {formatDuration(result.timeUsedMs)}
            </p>

            <div className="mb-6 grid grid-cols-3 gap-3">
              <div className="card p-3">
                <div className="text-xs text-slate-400">Punkte</div>
                <div className="text-2xl font-black gradient-text-warm">{result.score}</div>
              </div>
              <div className="card p-3">
                <div className="text-xs text-slate-400">Genauigkeit</div>
                <div className={`text-2xl font-black ${verdictColor}`}>{result.accuracy}%</div>
              </div>
              <div className="card p-3">
                <div className="text-xs text-slate-400">Zeit</div>
                <div className="text-2xl font-black text-slate-200">{formatDuration(result.timeUsedMs)}</div>
              </div>
            </div>

            {prevBest.bestScore > 0 && result.score >= prevBest.bestScore && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
                <Trophy className="h-4 w-4" />
                Neuer Rekord! 🎉
              </div>
            )}
          </div>
        </div>

        {/* Module breakdown */}
        <div className="card-elevated p-6">
          <h3 className="mb-3 text-lg font-bold text-white">Aufschlüsselung pro Modul</h3>
          <div className="space-y-3">
            {Object.entries(result.byModule).map(([modId, info]) => {
              const pct = info.total === 0 ? 0 : Math.round((info.correct / info.total) * 100);
              return (
                <div key={modId}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-semibold text-white">{info.title}</span>
                    <span className="text-slate-400 tabular-nums">
                      {info.correct}/{info.total} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={clsx(
                        'h-full transition-all',
                        pct === 100 ? 'bg-gradient-to-r from-emerald-400 to-teal-500' :
                        pct >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                        pct >= 60 ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                        'bg-gradient-to-r from-red-500 to-rose-600'
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={start} className="btn-primary inline-flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Erneut versuchen
          </button>
          <NavLink to="/" className="btn-ghost inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Zum Dashboard
          </NavLink>
        </div>
      </div>
    );
  }

  // ─── RUNNING ───────────────────────────────────────────────────────────────
  if (!current) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isWarning = secondsLeft <= WARNING_AT_SEC;
  const bilingual = getBilingual(current.question);

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {/* Timer + Progress strip */}
      <div className="card-elevated sticky top-20 z-10 p-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-base font-bold',
                isWarning ? 'bg-red-500/20 text-red-300 animate-pulse' : 'bg-slate-800 text-slate-100'
              )}
            >
              {isWarning ? <AlertTriangle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-400">
              Frage <span className="font-bold text-white">{currentIdx + 1}</span> / {questions.length}
            </span>
          </div>
          <div className="flex flex-1 items-center gap-1">
            {questions.map((_, i) => {
              const a = answers.find((ans) => ans.questionIdx === i);
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={clsx(
                    'h-1.5 flex-1 rounded-full transition-all',
                    i === currentIdx && 'bg-cyan-400 h-2',
                    i !== currentIdx && a?.correct && 'bg-emerald-500',
                    i !== currentIdx && a && !a.correct && 'bg-red-500',
                    i !== currentIdx && !a && 'bg-slate-700'
                  )}
                  title={`Frage ${i + 1}`}
                />
              );
            })}
          </div>
          <button
            onClick={() => {
              if (confirm('Prüfung wirklich abgeben?')) finalize();
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:border-amber-500/60"
          >
            <Flag className="h-3.5 w-3.5" />
            Abgeben
          </button>
        </div>
      </div>

      {/* Question card */}
      <div className="card-elevated p-6 sm:p-8">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={clsx(
              'rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide',
              current.moduleColor === 'pink' && 'bg-pink-500/20 text-pink-300',
              current.moduleColor === 'cyan' && 'bg-cyan-500/20 text-cyan-300',
              current.moduleColor === 'green' && 'bg-emerald-500/20 text-emerald-300',
              current.moduleColor === 'blue' && 'bg-blue-500/20 text-blue-300',
              current.moduleColor === 'purple' && 'bg-purple-500/20 text-purple-300'
            )}
          >
            {current.moduleTitle}
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-slate-400">{current.topicTitle}</span>
        </div>

        <div className="mb-2 text-base sm:text-xl font-bold leading-relaxed whitespace-pre-line">
          {current.question.prompt}
        </div>
        {bilingual.turkishPrompt && (
          <div className="mb-5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-sm leading-relaxed text-emerald-100/90">
            <span className="mr-1.5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              <Languages className="h-3 w-3" /> TR
            </span>
            {bilingual.turkishPrompt}
          </div>
        )}

        {/* Rewrite (Stilübung) */}
        {current.question.type === 'rewrite' ? (
          <div className="space-y-3">
            {current.question.givenSentence && (
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-sm">
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Original
                </div>
                <p className="italic text-slate-200">{current.question.givenSentence}</p>
              </div>
            )}
            <textarea
              value={rewriteText}
              onChange={(e) => setRewriteText(e.target.value)}
              disabled={showFeedback}
              placeholder="Schreibe deine förmliche Version hier …"
              rows={4}
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-900/60 p-3 font-mono text-sm leading-relaxed text-slate-100 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-60"
            />
            {!showFeedback && (
              <button
                onClick={() => handleRewrite(rewriteText)}
                disabled={!rewriteText.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                Vergleichen
              </button>
            )}
            {rewriteScore !== null && (
              <VerdictBar score={rewriteScore} />
            )}
          </div>
        ) : (
          /* MCQ */
          <div className="grid gap-2.5 sm:grid-cols-2">
            {current.question.options?.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              const isCorrect = idx === current.question.correctIndex;
              const showAsCorrect = showFeedback && isCorrect;
              const showAsWrong = showFeedback && isSelected && !isCorrect;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showFeedback}
                  className={clsx(
                    'group flex items-center gap-3 rounded-xl border-2 p-3.5 text-left text-sm font-medium transition-all',
                    !showFeedback && 'border-slate-700 bg-slate-800/40 hover:border-cyan-500/40 hover:bg-slate-800/70',
                    showAsCorrect && 'border-emerald-500 bg-emerald-500/15',
                    showAsWrong && 'border-red-500 bg-red-500/15',
                    isSelected && !showFeedback && 'border-cyan-500 bg-cyan-500/10'
                  )}
                >
                  <span
                    className={clsx(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors',
                      showAsCorrect ? 'bg-emerald-500 text-white' :
                      showAsWrong ? 'bg-red-500 text-white' :
                      'bg-slate-700/60 text-slate-300'
                    )}
                  >
                    {showAsCorrect ? <CheckCircle2 className="h-4 w-4" /> :
                     showAsWrong ? <XCircle className="h-4 w-4" /> :
                     String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Solution toggle */}
        {current.question.solutionSteps && current.question.solutionSteps.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setShowSolution((s) => !s)}
              className="w-full inline-flex items-center justify-between gap-2 rounded-xl border-2 border-amber-500/30 bg-amber-500/5 px-4 py-2.5 text-sm font-bold text-amber-300 hover:border-amber-500/60"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                {showSolution ? 'Lösung verbergen' : '💡 Lösungsschritte'}
              </span>
            </button>
            {showSolution && (
              <ol className="mt-3 space-y-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                {current.question.solutionSteps.map((step, i) => {
                  const tr = bilingual.turkishSolutionSteps?.[i];
                  return (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-slate-100">{step}</div>
                        {tr && <div className="mt-1 text-xs italic text-emerald-200/80">🌍 {tr}</div>}
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        )}

        {showFeedback && (
          <div className="mt-4 rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
            <div className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">Erklärung</div>
            <p className="text-sm text-slate-200">{current.question.explanation}</p>
            {bilingual.turkishExplanation && (
              <div className="mt-3 border-t border-slate-700/50 pt-3 text-sm text-emerald-100/90">
                <div className="mb-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  <Languages className="h-3 w-3" /> Türkçe
                </div>
                {bilingual.turkishExplanation}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={goPrev}
          disabled={currentIdx === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:border-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" /> Zurück
        </button>
        {showFeedback && (
          <button
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/30 hover:shadow-xl"
          >
            {currentIdx + 1 >= questions.length ? 'Abgeben' : 'Weiter'}
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-3 text-center">
      <div className="text-2xl">{icon}</div>
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="text-base font-bold text-white">{value}</div>
    </div>
  );
}

function ModuleChip({ active, onClick, color, label }: { active: boolean; onClick: () => void; color: 'pink' | 'cyan' | 'green' | 'blue' | 'purple'; label: string }) {
  const colorMap: Record<string, string> = {
    pink: 'border-pink-500/50 bg-pink-500/15 text-pink-200',
    cyan: 'border-cyan-500/50 bg-cyan-500/15 text-cyan-200',
    green: 'border-emerald-500/50 bg-emerald-500/15 text-emerald-200',
    blue: 'border-blue-500/50 bg-blue-500/15 text-blue-200',
    purple: 'border-purple-500/50 bg-purple-500/15 text-purple-200',
  };
  return (
    <button
      onClick={onClick}
      className={clsx(
        'rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-all',
        active
          ? colorMap[color] + ' shadow-lg'
          : 'border-slate-700/50 bg-slate-800/40 text-slate-300 hover:bg-slate-700/60'
      )}
    >
      {label}
    </button>
  );
}

function VerdictBar({ score }: { score: number }) {
  const verdict = verdictForScore(score);
  const pct = Math.round(score * 100);
  const isExcellent = verdict.verdict === 'excellent';
  const isGood = verdict.verdict === 'good';
  return (
    <div className={clsx(
      'rounded-xl border p-3',
      isExcellent ? 'border-emerald-500/40 bg-emerald-500/10' :
      isGood ? 'border-blue-500/40 bg-blue-500/10' :
      'border-amber-500/40 bg-amber-500/10'
    )}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-bold text-white">{verdict.label}</span>
        <span className="font-mono text-white">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={clsx(
            'h-full transition-all',
            isExcellent ? 'bg-gradient-to-r from-emerald-400 to-teal-500' :
            isGood ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
            'bg-gradient-to-r from-amber-400 to-orange-500'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
