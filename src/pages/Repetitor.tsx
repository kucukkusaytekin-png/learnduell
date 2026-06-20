import { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Repeat, ChevronRight, Clock, ArrowRight, Sparkles, CheckCircle2, XCircle, RotateCcw, Languages } from 'lucide-react';
import { modules } from '../data/satzaufbau';
import { repetitionByTopic } from '../data/repetition';
import {
  recordAnswer,
  todayISO,
  type TopicReviewState,
} from '../lib/sr';
import { getBilingual } from '../lib/bilingual';
import clsx from 'clsx';

const STORAGE_KEY = 'lernduell.repetition.v1';

function loadReviews(): Record<string, TopicReviewState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveReviews(reviews: Record<string, TopicReviewState>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // ignore
  }
}

interface RepeatEntry {
  moduleId: string;
  moduleTitle: string;
  moduleColor: string;
  topicId: string;
  topicTitle: string;
  state: TopicReviewState;
  questionCount: number;
}

export default function Repetitor() {
  const [reviews, setReviews] = useState<Record<string, TopicReviewState>>(loadReviews);
  const [activeTopicKey, setActiveTopicKey] = useState<string | null>(null);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);

  useEffect(() => {
    saveReviews(reviews);
  }, [reviews]);

  // Build the due-list from modules → topics
  const dueList: RepeatEntry[] = useMemo(() => {
    const list: RepeatEntry[] = [];
    const today = todayISO();
    modules.forEach((m) => {
      m.topics.forEach((t) => {
        if (!repetitionByTopic[t.id]) return; // only topics with rep pool
        const state = reviews[t.id] ?? {
          box: 1,
          lastReviewedAt: null,
          nextReviewAt: today,
          correctCount: 0,
          wrongCount: 0,
        };
        const isDue = !state.nextReviewAt || state.nextReviewAt <= today;
        if (isDue) {
          list.push({
            moduleId: m.id,
            moduleTitle: m.title,
            moduleColor: m.color,
            topicId: t.id,
            topicTitle: t.title,
            state,
            questionCount: repetitionByTopic[t.id].length,
          });
        }
      });
    });
    return list;
  }, [reviews]);

  const activeEntry = activeTopicKey
    ? dueList.find((e) => e.topicId === activeTopicKey)
    : null;

  const activeQuestions = activeEntry ? repetitionByTopic[activeEntry.topicId] : [];
  const currentQuestion = activeQuestions[questionIdx];
  const options = currentQuestion?.options ?? [];

  const handleStartTopic = (topicId: string) => {
    setActiveTopicKey(topicId);
    setQuestionIdx(0);
    setCorrectCount(0);
    setWrongCount(0);
    setSessionDone(false);
  };

  const handleAnswer = (correct: boolean) => {
    if (!activeEntry) return;
    setReviews((r) => {
      const prev = r[activeEntry.topicId] ?? {
        box: 1,
        lastReviewedAt: null,
        nextReviewAt: todayISO(),
        correctCount: 0,
        wrongCount: 0,
      };
      return {
        ...r,
        [activeEntry.topicId]: recordAnswer(prev, correct),
      };
    });
    if (correct) setCorrectCount((c) => c + 1);
    else setWrongCount((c) => c + 1);

    if (questionIdx + 1 >= activeQuestions.length) {
      setSessionDone(true);
    } else {
      setQuestionIdx((i) => i + 1);
    }
  };

  const handleExit = () => {
    setActiveTopicKey(null);
    setQuestionIdx(0);
    setCorrectCount(0);
    setWrongCount(0);
    setSessionDone(false);
  };

  // ─── Topic session view ───
  if (activeEntry && currentQuestion) {
    if (sessionDone) {
      const total = correctCount + wrongCount;
      const score = total === 0 ? 0 : Math.round((correctCount / total) * 100);
      return (
        <div className="mx-auto max-w-2xl">
          <div className="card-elevated p-8 text-center">
            <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-2 text-3xl font-black tracking-tight">Session fertig!</h2>
            <p className="mb-6 text-slate-400">
              {activeEntry.topicTitle} — {correctCount} von {total} richtig ({score}%)
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="card p-3">
                <div className="text-xs text-slate-400">Richtig</div>
                <div className="text-2xl font-black text-emerald-400">{correctCount}</div>
              </div>
              <div className="card p-3">
                <div className="text-xs text-slate-400">Falsch</div>
                <div className="text-2xl font-black text-red-400">{wrongCount}</div>
              </div>
              <div className="card p-3">
                <div className="text-xs text-slate-400">Genauigkeit</div>
                <div className="text-2xl font-black gradient-text-warm">{score}%</div>
              </div>
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={handleExit} className="btn-primary inline-flex items-center gap-2">
                <ChevronRight className="h-4 w-4" /> Zur Übersicht
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleExit}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            ← Zurück
          </button>
          <div className="text-xs text-slate-500">
            Frage {questionIdx + 1} / {activeQuestions.length}
          </div>
        </div>

        <div className="card-elevated p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-purple-300">
              {activeEntry.moduleTitle}
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">{activeEntry.topicTitle}</span>
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-slate-500">
              <Repeat className="h-3 w-3" />
              Wiederholung
            </span>
          </div>

          <h3 className="mb-2 text-lg font-bold leading-snug text-white whitespace-pre-wrap">
            {currentQuestion.prompt}
          </h3>
          {getBilingual(currentQuestion).turkishPrompt && (
            <div className="mb-5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-sm leading-relaxed text-emerald-100/90">
              <span className="mr-1.5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                <Languages className="h-3 w-3" /> TR
              </span>
              {getBilingual(currentQuestion).turkishPrompt}
            </div>
          )}

          <div className="grid gap-2.5">
            {options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i);
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt === currentQuestion!.options![currentQuestion!.correctIndex!])}
                  className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/40 p-3.5 text-left transition-all hover:border-purple-500/40 hover:bg-slate-800/70"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-700/60 text-xs font-bold text-slate-300 group-hover:bg-purple-500/20 group-hover:text-purple-200">
                    {letter}
                  </span>
                  <span className="text-sm text-slate-100">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─── Overview list ───
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300">
          <Repeat className="h-3.5 w-3.5" />
          Spaced Repetition
        </div>
        <h1 className="mb-2 text-3xl font-bold text-white">Heute fällige Wiederholungen</h1>
        <p className="text-slate-400">
          Themen, die du wiederholen solltest — neue Fragen, neuer Wortschatz.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-elevated p-4">
          <div className="text-xs text-slate-400">Fällig heute</div>
          <div className="mt-1 text-2xl font-black gradient-text-warm">{dueList.length}</div>
        </div>
        <div className="card-elevated p-4">
          <div className="text-xs text-slate-400">Bisher wiederholt</div>
          <div className="mt-1 text-2xl font-black text-emerald-400">
            {Object.values(reviews).reduce((sum, r) => sum + r.correctCount + r.wrongCount, 0)}
          </div>
        </div>
        <div className="card-elevated p-4">
          <div className="text-xs text-slate-400">Themen gelernt</div>
          <div className="mt-1 text-2xl font-black text-purple-300">
            {Object.keys(reviews).length}
          </div>
        </div>
      </div>

      {/* Due list */}
      {dueList.length === 0 ? (
        <div className="card-elevated p-10 text-center">
          <Sparkles className="mx-auto mb-3 h-10 w-10 text-purple-400" />
          <h3 className="mb-2 text-xl font-bold text-white">Alles erledigt!</h3>
          <p className="mb-5 text-sm text-slate-400">
            Du hast heute keine Wiederholungen. Komm morgen wieder oder übe mit neuen Themen.
          </p>
          <NavLink to="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowRight className="h-4 w-4" /> Zum Dashboard
          </NavLink>
        </div>
      ) : (
        <div className="space-y-3">
          {dueList.map((entry) => {
            const accuracy =
              entry.state.correctCount + entry.state.wrongCount > 0
                ? Math.round(
                    (entry.state.correctCount /
                      (entry.state.correctCount + entry.state.wrongCount)) *
                      100
                  )
                : 0;
            return (
              <button
                key={entry.topicId}
                onClick={() => handleStartTopic(entry.topicId)}
                className="group w-full card-elevated p-5 text-left transition-all hover:border-purple-500/40"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={clsx(
                      'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                      entry.moduleColor === 'pink' && 'bg-pink-500/20 text-pink-300',
                      entry.moduleColor === 'blue' && 'bg-blue-500/20 text-blue-300',
                      entry.moduleColor === 'cyan' && 'bg-cyan-500/20 text-cyan-300',
                      entry.moduleColor === 'green' && 'bg-emerald-500/20 text-emerald-300',
                      !['pink', 'blue', 'cyan', 'green'].includes(entry.moduleColor) &&
                        'bg-purple-500/20 text-purple-300'
                    )}
                  >
                    <Repeat className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {entry.moduleTitle}
                    </div>
                    <div className="text-base font-bold text-white">{entry.topicTitle}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Box {entry.state.box} von 5
                      </span>
                      {entry.state.lastReviewedAt && (
                        <span>
                          Letzte Wiederholung:{' '}
                          <span className="text-slate-300">
                            {entry.state.lastReviewedAt}
                          </span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        {entry.state.correctCount}
                        <XCircle className="ml-1 h-3 w-3 text-red-400" />
                        {entry.state.wrongCount}
                        {accuracy > 0 && (
                          <span className="ml-1 text-slate-300">({accuracy}%)</span>
                        )}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-purple-400" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {Object.keys(reviews).length > 0 && (
        <div className="text-center">
          <button
            onClick={() => {
              if (confirm('Alle Wiederholungs-Stati zurücksetzen?')) {
                setReviews({});
              }
            }}
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-red-400"
          >
            <RotateCcw className="h-3 w-3" />
            Wiederholungs-Fortschritt zurücksetzen
          </button>
        </div>
      )}
    </div>
  );
}
