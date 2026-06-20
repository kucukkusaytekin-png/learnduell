import { useState, useMemo } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, MapPin, Quote, CheckCircle2, XCircle, Lightbulb, Sparkles } from 'lucide-react';
import { lektuereModule } from '../data/lektuere';
import { useGameStore } from '../store/gameStore';
import clsx from 'clsx';

const accentByAuthor: Record<string, { ring: string; bg: string; text: string; border: string; primary: string }> = {
  kafka: { ring: 'from-amber-500/30', bg: 'from-amber-500/10 to-orange-500/10', text: 'text-amber-200', border: 'border-amber-500/30', primary: 'amber' },
  borchert: { ring: 'from-slate-400/30', bg: 'from-slate-400/10 to-slate-600/10', text: 'text-slate-200', border: 'border-slate-500/30', primary: 'slate' },
  brecht: { ring: 'from-red-500/30', bg: 'from-red-500/10 to-pink-500/10', text: 'text-red-200', border: 'border-red-500/30', primary: 'red' },
  mann: { ring: 'from-emerald-500/30', bg: 'from-emerald-500/10 to-teal-500/10', text: 'text-emerald-200', border: 'border-emerald-500/30', primary: 'emerald' },
};

export default function LektuereTopic() {
  const { authorId } = useParams<{ authorId: string }>();
  const navigate = useNavigate();
  const topic = lektuereModule.topics.find((t) => t.id === authorId);
  const accent = accentByAuthor[authorId ?? ''] ?? accentByAuthor.kafka;

  const [tab, setTab] = useState<'info' | 'duel'>('info');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const recordDuelResult = useGameStore((s) => s.recordDuelResult);

  const currentQ = topic?.questions[currentIdx];
  const totalQ = topic?.questions.length ?? 0;

  const shuffledOptions = useMemo(() => {
    if (!currentQ || !currentQ.options) return [];
    // keep deterministic per render by shuffling once
    return [...currentQ.options].sort(() => Math.random() - 0.5);
  }, [currentQ]);

  if (!topic || !currentQ) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <p className="text-slate-300">Autor nicht gefunden.</p>
        <NavLink to="/lektuere" className="text-purple-300 hover:underline">
          Zurück zur Lektüre-Liste
        </NavLink>
      </div>
    );
  }

  const isCorrect = selectedIdx !== null && shuffledOptions[selectedIdx] === currentQ.options?.[currentQ.correctIndex ?? 0];

  const submitAnswer = () => {
    if (selectedIdx === null) return;
    setShowFeedback(true);
    if (isCorrect) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    setSelectedIdx(null);
    setShowFeedback(false);
    if (currentIdx + 1 < totalQ) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // finish
      const correct = correctCount + (isCorrect ? 0 : 0); // already counted
      const accuracy = Math.round((correct / totalQ) * 100);
      recordDuelResult({
        moduleId: 'lektuere',
        userScore: correct,
        botScore: Math.floor(totalQ * 0.55),
        correctAnswers: correct,
        totalAnswers: totalQ,
      });
      alert(`Fertig! ${correct}/${totalQ} richtig (${accuracy}%)`);
      navigate('/lektuere');
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <NavLink to="/lektuere" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Zurück zur Lektüre
      </NavLink>

      {/* Author Header */}
      <div className="card-elevated relative overflow-hidden p-6">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-40 pointer-events-none`} />
        <div className="relative">
          <div className={`text-xs font-bold uppercase tracking-wider ${accent.text}`}>{topic.author.epoche}</div>
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">{topic.author.name}</h1>
          <p className="mt-2 text-slate-400">{topic.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-500" />
              {topic.author.lebensdaten}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-500" />
              {topic.author.herkunft}
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-slate-500" />
              {totalQ} Übungsfragen
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700/50">
        <TabButton active={tab === 'info'} onClick={() => setTab('info')}>Lektüre-Info</TabButton>
        <TabButton active={tab === 'duel'} onClick={() => setTab('duel')}>Übungsfragen</TabButton>
      </div>

      {tab === 'info' && <InfoPanel topic={topic} accent={accent} />}
      {tab === 'duel' && (
        <div className="space-y-4">
          {/* Progress */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Frage {currentIdx + 1} / {totalQ}</span>
            <span className="text-slate-400">Richtig: <span className="font-bold text-emerald-400">{correctCount}</span></span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-all"
              style={{ width: `${((currentIdx) / totalQ) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="card-elevated p-6">
            <div className={`mb-3 inline-flex items-center gap-2 rounded-full ${accent.border} border bg-slate-900/40 px-3 py-1 text-xs font-bold ${accent.text}`}>
              <Sparkles className="h-3.5 w-3.5" /> Abitur-Stil
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
                        ? `${accent.border} ${accent.bg}`
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
                          ? `border-current ${accent.text}`
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

            {/* Feedback */}
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
                    {isCorrect ? 'Richtig!' : 'Nicht ganz.'}
                  </span>
                </div>
                <p className="text-sm text-slate-200">{currentQ.explanation}</p>
              </div>
            )}

            {/* Action */}
            <div className="mt-5 flex justify-end gap-3">
              {!showFeedback ? (
                <button
                  onClick={submitAnswer}
                  disabled={selectedIdx === null}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-6 py-3 font-bold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Lightbulb className="h-4 w-4" />
                  Antwort prüfen
                </button>
              ) : (
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-6 py-3 font-bold text-white hover:bg-slate-700"
                >
                  {currentIdx + 1 < totalQ ? 'Nächste Frage →' : 'Fertig ✓'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'border-b-2 px-4 py-3 text-sm font-semibold transition-colors',
        active
          ? 'border-purple-400 text-white'
          : 'border-transparent text-slate-400 hover:text-slate-200'
      )}
    >
      {children}
    </button>
  );
}

function InfoPanel({ topic, accent }: { topic: typeof lektuereModule.topics[number]; accent: { ring: string; bg: string; text: string; border: string; primary: string } }) {
  const a = topic.author;
  return (
    <div className="space-y-5">
      {/* Intro */}
      <div className="card-elevated p-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
          <BookOpen className="h-5 w-5 text-purple-300" />
          Einführung
        </h2>
        <p className="leading-relaxed text-slate-300">{topic.lesson.intro}</p>
      </div>

      {/* Hauptwerke */}
      <div className="card-elevated p-6">
        <h2 className="mb-3 text-lg font-bold text-white">📚 Hauptwerke</h2>
        <ul className="space-y-2">
          {a.hauptwerke.map((werk, idx) => (
            <li key={idx} className="flex gap-3 rounded-lg bg-slate-900/40 p-3 text-sm">
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${accent.bg} ${accent.text} text-xs font-bold`}>
                {idx + 1}
              </span>
              <span className="text-slate-200">{werk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Themen + Stilmittel + Zitate (3 col on lg) */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="card-elevated p-6">
          <h2 className="mb-3 text-lg font-bold text-white">🎯 Zentrale Themen</h2>
          <div className="flex flex-wrap gap-2">
            {a.themen.map((t) => (
              <span key={t} className={`rounded-full border ${accent.border} ${accent.bg} px-3 py-1 text-xs font-semibold ${accent.text}`}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="card-elevated p-6">
          <h2 className="mb-3 text-lg font-bold text-white">✍️ Stilmittel</h2>
          <div className="flex flex-wrap gap-2">
            {a.stilmittel.map((s) => (
              <span key={s} className="rounded-full border border-slate-700/50 bg-slate-800/60 px-3 py-1 text-xs font-semibold text-slate-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Zitate */}
      {a.zitate && a.zitate.length > 0 && (
        <div className="card-elevated p-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
            <Quote className="h-5 w-5 text-purple-300" />
            Berühmte Zitate
          </h2>
          <div className="space-y-3">
            {a.zitate.map((z, idx) => (
              <div key={idx} className={`rounded-lg border ${accent.border} bg-slate-900/40 p-4`}>
                <p className="text-base italic leading-relaxed text-slate-100">„{z.text}"</p>
                <p className={`mt-2 text-xs font-semibold ${accent.text}`}>— {z.werk}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lesson rules */}
      <div className="card-elevated p-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
          <Lightbulb className="h-5 w-5 text-amber-300" />
          Wichtig fürs Abitur
        </h2>
        <div className="space-y-4">
          {topic.lesson.rules.map((rule, idx) => (
            <div key={idx} className="rounded-lg border border-slate-700/40 bg-slate-900/30 p-4">
              <h3 className="mb-2 text-sm font-bold text-white">{rule.title}</h3>
              <p className="mb-3 text-sm leading-relaxed text-slate-300">{rule.body}</p>
              <ul className="space-y-1.5">
                {rule.examples.map((ex, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-400">
                    <span className={`${accent.text} mt-0.5`}>▸</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Abitur-Hinweis */}
      <div className={`rounded-xl border ${accent.border} ${accent.bg} p-5`}>
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className={`h-5 w-5 ${accent.text}`} />
          <h3 className="font-bold text-white">Abitur-Hinweis</h3>
        </div>
        <p className="text-sm leading-relaxed text-slate-200">{a.abiturRelevanz}</p>
      </div>
    </div>
  );
}
