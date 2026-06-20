import { useState, useMemo, useRef, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, XCircle, RotateCcw, Sparkles, Lightbulb, ArrowRight, Flag, BookOpen, ChevronLeft } from 'lucide-react';
import { efVorbereitungQuiz, getQuizById, type QuizPack } from '../data/efVorbereitung';
import { useGameStore } from '../store/gameStore';
import clsx from 'clsx';

const totalDuration = 12 * 60; // default fallback
const warningAt = 3 * 60; // last 3 min

// ─── List Page ──────────────────────────────────────────────────────────────
export function EfVorbereitungList() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <NavLink to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Zurück zum Dashboard
      </NavLink>

      {/* Header */}
      <div className="card-elevated relative overflow-hidden p-8">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 80% 20%, rgba(34,197,94,0.5), transparent 60%), radial-gradient(circle at 20% 80%, rgba(245,158,11,0.4), transparent 60%)',
          }}
        />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            EF-Vorbereitung · 10. Klasse Wiederholung
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">Fit für die 11. Klasse</h1>
          <p className="mb-6 max-w-2xl text-slate-400">
            Drei kurze Quiz (Deutsch, Mathe, English) — je 12 Fragen in 12 Minuten. Wiederholt die wichtigsten Grundlagen aus der 10. Klasse. Am Ende siehst du, welche Themen du noch üben solltest.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon="📚" label="Quiz" value="3" />
            <Stat icon="❓" label="Fragen" value="36" />
            <Stat icon="⏱️" label="Dauer" value="~36 min" />
            <Stat icon="🎯" label="Ziel" value="EF 2026" />
          </div>
        </div>
      </div>

      {/* Quiz cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {efVorbereitungQuiz.map((quiz) => {
          const accent =
            quiz.moduleId === 'satzaufbau'
              ? { ring: 'from-pink-500/20', bg: 'from-pink-500/10 to-rose-500/10', text: 'text-pink-200', border: 'border-pink-500/30' }
              : quiz.moduleId === 'mathematik'
              ? { ring: 'from-cyan-500/20', bg: 'from-cyan-500/10 to-blue-500/10', text: 'text-cyan-200', border: 'border-cyan-500/30' }
              : { ring: 'from-emerald-500/20', bg: 'from-emerald-500/10 to-teal-500/10', text: 'text-emerald-200', border: 'border-emerald-500/30' };
          return (
            <NavLink
              key={quiz.id}
              to={`/ef-vorbereitung/${quiz.id}`}
              className={`group card-elevated relative overflow-hidden p-6 transition-all hover:scale-[1.02] hover:shadow-2xl`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-50 pointer-events-none`} />
              <div className="relative">
                <div className="text-5xl">{quiz.emoji}</div>
                <h3 className={`mt-3 text-lg font-bold ${accent.text}`}>
                  {quiz.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-300">{quiz.description}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {Math.round(quiz.timeLimitSec / 60)} min
                  </span>
                  <span>·</span>
                  <span>{quiz.questions.length} Fragen</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {quiz.topics.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-md bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-300">
                      {t}
                    </span>
                  ))}
                  {quiz.topics.length > 3 && (
                    <span className="rounded-md bg-slate-800/40 px-2 py-0.5 text-[10px] text-slate-400">
                      +{quiz.topics.length - 3}
                    </span>
                  )}
                </div>
                <div className={`mt-4 flex items-center justify-end text-sm font-semibold ${accent.text} group-hover:translate-x-1 transition-transform`}>
                  Quiz starten →
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* Info card */}
      <div className="card-elevated p-5">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
          <Lightbulb className="h-4 w-4 text-amber-300" />
          Wie du das Quiz nutzt
        </h3>
        <ul className="space-y-1.5 text-sm text-slate-300">
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> Wähle das Quiz (Deutsch, Mathe oder English) und klick „Quiz starten".</li>
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> 12 Fragen in 12 Minuten — bleib ruhig, kein Druck.</li>
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> Am Ende: Skor + Themen, die du noch üben solltest.</li>
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> Wiederholung in 1-2 Wochen — sehe deinen Fortschritt!</li>
          <li className="flex gap-2"><span className="text-amber-400">⚠</span> Wenn du bei einer Frage steckst: raten ist ok, Zeit sparen ist wichtiger.</li>
        </ul>
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

// ─── Quiz Detail Page ──────────────────────────────────────────────────────
export function EfVorbereitungQuiz() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const quiz = getQuizById(quizId ?? '');
  const recordDuelResult = useGameStore((s) => s.recordDuelResult);

  const [phase, setPhase] = useState<'intro' | 'running' | 'result'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(quiz?.timeLimitSec ?? totalDuration);
  const startedAtRef = useRef<number>(0);
  const questionStartRef = useRef<number>(0);

  const currentQ = quiz?.questions[currentIdx];
  const totalQ = quiz?.questions.length ?? 0;

  const shuffledOptions = useMemo(() => {
    if (!currentQ || !currentQ.options) return [];
    return [...currentQ.options].sort(() => Math.random() - 0.5);
  }, [currentQ]);

  // Timer
  useEffect(() => {
    if (phase !== 'running') return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          finalize();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (!quiz || !currentQ) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <p className="text-slate-300">Quiz nicht gefunden.</p>
        <NavLink to="/ef-vorbereitung" className="text-emerald-300 hover:underline">
          ← Zurück zur Übersicht
        </NavLink>
      </div>
    );
  }

  const isCorrect = selectedIdx !== null && shuffledOptions[selectedIdx] === currentQ.options?.[currentQ.correctIndex ?? 0];
  const correctCount = Object.values(answers).filter((idx, i) => {
    const q = quiz.questions[i];
    return q && q.options?.[q.correctIndex ?? 0] === shuffledOptions[idx];
  }).length;

  const start = () => {
    setAnswers({});
    setCurrentIdx(0);
    setSelectedIdx(null);
    setShowFeedback(false);
    setSecondsLeft(quiz.timeLimitSec);
    startedAtRef.current = Date.now();
    questionStartRef.current = Date.now();
    setPhase('running');
  };

  const submitAnswer = () => {
    if (selectedIdx === null) return;
    setAnswers((a) => ({ ...a, [currentIdx]: selectedIdx }));
    setShowFeedback(true);
  };

  const next = () => {
    setSelectedIdx(null);
    setShowFeedback(false);
    if (currentIdx + 1 < totalQ) {
      setCurrentIdx(currentIdx + 1);
      questionStartRef.current = Date.now();
    } else {
      finalize();
    }
  };

  const finalize = () => {
    setPhase('result');
    const finalCorrect = Object.entries(answers).filter(([idx, sel]) => {
      const q = quiz.questions[Number(idx)];
      return q && q.options?.[q.correctIndex ?? 0] === quiz.questions[Number(idx)].options?.[Number(sel)];
    }).length;
    if (isCorrect) {
      // include the current correct answer if not yet recorded
      const updatedCorrect = finalCorrect + 1;
      const accuracy = Math.round((updatedCorrect / totalQ) * 100);
      recordDuelResult({
        moduleId: quiz.moduleId,
        userScore: updatedCorrect,
        botScore: Math.floor(totalQ * 0.6),
        correctAnswers: updatedCorrect,
        totalAnswers: totalQ,
      });
    } else {
      const accuracy = Math.round((finalCorrect / totalQ) * 100);
      recordDuelResult({
        moduleId: quiz.moduleId,
        userScore: finalCorrect,
        botScore: Math.floor(totalQ * 0.6),
        correctAnswers: finalCorrect,
        totalAnswers: totalQ,
      });
    }
  };

  const reset = () => {
    setPhase('intro');
    setCurrentIdx(0);
    setAnswers({});
    setSelectedIdx(null);
    setShowFeedback(false);
    setSecondsLeft(quiz.timeLimitSec);
  };

  // ─── INTRO ───────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <NavLink to="/ef-vorbereitung" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ChevronLeft className="h-4 w-4" /> Zurück zur Übersicht
        </NavLink>

        <div className="card-elevated relative overflow-hidden p-8">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 80% 20%, rgba(34,197,94,0.5), transparent 60%), radial-gradient(circle at 20% 80%, rgba(245,158,11,0.4), transparent 60%)',
            }}
          />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
              <BookOpen className="h-3.5 w-3.5" />
              EF-Vorbereitung
            </div>
            <div className="flex items-start gap-4">
              <div className="text-6xl">{quiz.emoji}</div>
              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">{quiz.title}</h1>
                <p className="mt-2 text-slate-400">{quiz.description}</p>
              </div>
            </div>

            <div className="my-6 grid grid-cols-3 gap-3">
              <Stat icon="❓" label="Fragen" value={String(quiz.questions.length)} />
              <Stat icon="⏱️" label="Zeit" value={`${Math.round(quiz.timeLimitSec / 60)} min`} />
              <Stat icon="🎯" label="Schwierigkeit" value="10. Kl." />
            </div>

            <div className="mb-6 rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
              <h3 className="mb-2 text-sm font-bold text-white">📋 Themen, die drankommen</h3>
              <div className="flex flex-wrap gap-1.5">
                {quiz.topics.map((t) => (
                  <span key={t} className="rounded-md border border-slate-700/50 bg-slate-800/60 px-2 py-1 text-xs text-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={start}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl"
            >
              <Flag className="h-5 w-5" />
              Quiz starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULT ──────────────────────────────────────────────────────────
  if (phase === 'result') {
    const allAnswers = { ...answers, [currentIdx]: selectedIdx };
    const finalCorrect = Object.entries(allAnswers).filter(([idx, sel]) => {
      const q = quiz.questions[Number(idx)];
      return q && q.options?.[q.correctIndex ?? 0] === quiz.questions[Number(idx)].options?.[Number(sel)];
    }).length;
    const accuracy = Math.round((finalCorrect / totalQ) * 100);
    const wrongQuestions = quiz.questions.filter((q, i) => {
      const selIdx = allAnswers[i];
      if (selIdx === undefined || selIdx === null) return true;
      return q.options?.[q.correctIndex ?? 0] !== q.options?.[selIdx];
    });

    let verdictLabel = '';
    let verdictColor = '';
    let verdictEmoji = '';
    if (accuracy >= 80) {
      verdictLabel = 'Hervorragend! Du bist fit für die EF!';
      verdictColor = 'emerald';
      verdictEmoji = '🌟';
    } else if (accuracy >= 60) {
      verdictLabel = 'Gut! Mit etwas Übung schaffst du die EF.';
      verdictColor = 'amber';
      verdictEmoji = '👍';
    } else {
      verdictLabel = 'Da geht noch was. Übe die schwachen Themen!';
      verdictColor = 'red';
      verdictEmoji = '💪';
    }

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <NavLink to="/ef-vorbereitung" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Übersicht
        </NavLink>

        <div className={clsx(
          'card-elevated p-8 text-center',
          verdictColor === 'emerald' && 'border-emerald-500/40',
          verdictColor === 'amber' && 'border-amber-500/40',
          verdictColor === 'red' && 'border-red-500/40',
        )}>
          <div className="text-6xl">{verdictEmoji}</div>
          <h1 className={clsx(
            'mt-4 text-3xl font-bold',
            verdictColor === 'emerald' && 'text-emerald-300',
            verdictColor === 'amber' && 'text-amber-300',
            verdictColor === 'red' && 'text-red-300',
          )}>
            {accuracy}%
          </h1>
          <p className="mt-2 text-lg text-slate-300">{verdictLabel}</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-700/40 bg-slate-900/40 p-3">
              <div className="text-2xl font-bold text-emerald-300">{finalCorrect}</div>
              <div className="text-[10px] uppercase text-slate-500">Richtig</div>
            </div>
            <div className="rounded-lg border border-slate-700/40 bg-slate-900/40 p-3">
              <div className="text-2xl font-bold text-red-300">{totalQ - finalCorrect}</div>
              <div className="text-[10px] uppercase text-slate-500">Falsch</div>
            </div>
            <div className="rounded-lg border border-slate-700/40 bg-slate-900/40 p-3">
              <div className="text-2xl font-bold text-blue-300">
                {Math.floor((quiz.timeLimitSec - secondsLeft) / 60)}:{(quiz.timeLimitSec - secondsLeft) % 60}
              </div>
              <div className="text-[10px] uppercase text-slate-500">Zeit</div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/60 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700/60"
            >
              <RotateCcw className="h-4 w-4" /> Nochmal versuchen
            </button>
            <NavLink
              to="/ef-vorbereitung"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/25"
            >
              Andere Quiz <ArrowRight className="h-4 w-4" />
            </NavLink>
          </div>
        </div>

        {wrongQuestions.length > 0 && (
          <div className="card-elevated p-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
              <Lightbulb className="h-4 w-4 text-amber-300" />
              Themen zum Üben ({wrongQuestions.length} Frage{wrongQuestions.length !== 1 ? 'n' : ''} falsch)
            </h3>
            <div className="space-y-3">
              {wrongQuestions.slice(0, 5).map((q, i) => (
                <div key={i} className="rounded-lg border border-slate-700/40 bg-slate-900/40 p-3">
                  <div className="text-sm font-semibold text-white">{q.prompt}</div>
                  <div className="mt-1 text-xs text-slate-400">Richtige Antwort: <span className="text-emerald-300">{q.options?.[q.correctIndex ?? 0]}</span></div>
                  <div className="mt-1 text-xs text-slate-500">{q.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── RUNNING ──────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <NavLink to="/ef-vorbereitung" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ChevronLeft className="h-4 w-4" /> Zurück zur Übersicht
      </NavLink>

      {/* Sticky header */}
      <div className="card-elevated sticky top-20 z-10 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-lg font-bold',
              secondsLeft <= warningAt
                ? 'bg-red-500/20 text-red-300'
                : 'bg-emerald-500/20 text-emerald-300'
            )}>
              {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
            </div>
            <div className="text-sm">
              <div className="font-bold text-white">Frage {currentIdx + 1} / {totalQ}</div>
              <div className="text-xs text-slate-400">Richtig: <span className="font-bold text-emerald-300">{correctCount}</span></div>
            </div>
          </div>
          <div className="text-right text-xs text-slate-400">
            <div>{quiz.emoji} {quiz.title.split(' · ')[0]}</div>
            <div>{Math.max(0, Math.floor((secondsLeft - warningAt) / 60))} Min bis Warnung</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all"
            style={{ width: `${((currentIdx + 1) / totalQ) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="card-elevated p-6">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" /> Frage {currentIdx + 1}
        </div>
        <p className="mb-5 text-lg font-semibold leading-relaxed text-white">{currentQ.prompt}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          {shuffledOptions.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            const isThisCorrect = currentQ.options?.[currentQ.correctIndex ?? 0] === opt;
            return (
              <button
                key={`${idx}-${opt}`}
                onClick={() => !showFeedback && setSelectedIdx(idx)}
                disabled={showFeedback}
                className={clsx(
                  'rounded-xl border p-4 text-left transition-all',
                  showFeedback
                    ? isThisCorrect
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : isSelected
                      ? 'border-red-500/50 bg-red-500/10'
                      : 'border-slate-700/40 bg-slate-900/30 opacity-50'
                    : isSelected
                    ? 'border-emerald-500/50 bg-emerald-500/10'
                    : 'border-slate-700/50 bg-slate-900/40 hover:bg-slate-800/60'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={clsx(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
                    showFeedback && isThisCorrect
                      ? 'border-emerald-400 bg-emerald-500/30 text-emerald-100'
                      : showFeedback && isSelected
                      ? 'border-red-400 bg-red-500/30 text-red-100'
                      : isSelected
                      ? 'border-emerald-400 bg-emerald-500/30 text-emerald-100'
                      : 'border-slate-600 text-slate-400'
                  )}>
                    {showFeedback && isThisCorrect ? '✓' : showFeedback && isSelected ? '✗' : String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-sm text-slate-100">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={clsx(
            'mt-5 rounded-xl border p-4',
            isCorrect ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-red-500/30 bg-red-500/10'
          )}>
            <div className="mb-2 flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
              <span className={clsx('font-bold', isCorrect ? 'text-emerald-200' : 'text-red-200')}>
                {isCorrect ? 'Richtig!' : 'Leider falsch.'}
              </span>
            </div>
            <p className="text-sm text-slate-200">{currentQ.explanation}</p>
          </div>
        )}

        <div className="mt-5 flex justify-end gap-3">
          {!showFeedback ? (
            <button
              onClick={submitAnswer}
              disabled={selectedIdx === null}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="h-4 w-4" />
              Antwort prüfen
            </button>
          ) : (
            <button
              onClick={next}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-6 py-3 font-bold text-white hover:bg-slate-700"
            >
              {currentIdx + 1 < totalQ ? 'Nächste Frage →' : 'Ergebnis anzeigen ✓'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
