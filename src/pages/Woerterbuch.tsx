import { useState, useMemo } from 'react';
import { BookText, RotateCcw, ChevronLeft, ChevronRight, Sparkles, Check, X, Eye, Lightbulb } from 'lucide-react';
import { pickDailyWords } from '../lib/dailyWords';
import { todayISO } from '../lib/sr';
import clsx from 'clsx';

type CardState = 'front' | 'back';

interface CardResult {
  wordId: string;
  knew: boolean;
}

export default function Woerterbuch() {
  const today = useMemo(() => todayISO(), []);
  const dailyWords = useMemo(() => pickDailyWords(today, 5), [today]);

  const [idx, setIdx] = useState(0);
  const [cardState, setCardState] = useState<CardState>('front');
  const [results, setResults] = useState<CardResult[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const current = dailyWords[idx];
  const total = dailyWords.length;
  const finished = results.length === total;

  const handleAnswer = (knew: boolean) => {
    if (!current) return;
    setResults((r) => [...r, { wordId: current.id, knew }]);
    setShowExample(false);
    setCardState('front');
    if (idx + 1 >= total) {
      setShowStats(true);
    } else {
      setIdx((i) => i + 1);
    }
  };

  const handleRestart = () => {
    setIdx(0);
    setResults([]);
    setShowStats(false);
    setShowExample(false);
    setCardState('front');
  };

  const handlePrev = () => {
    if (results.length === 0) return;
    setResults((r) => r.slice(0, -1));
    setShowExample(false);
    setCardState('front');
    setIdx((i) => Math.max(0, i - 1));
    setShowStats(false);
  };

  if (!current) return null;

  const knewCount = results.filter((r) => r.knew).length;
  const accuracy = results.length > 0 ? Math.round((knewCount / results.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
            <BookText className="h-3.5 w-3.5" />
            Wörterbuch · Täglich neu
          </div>
          <h1 className="mb-1.5 text-3xl font-bold text-white">Heute: 5 neue Wörter</h1>
          <p className="text-slate-400">
            Oberstufe-Wortschatz mit Beispiel — klick die Karte zum Aufdecken.
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-xs text-slate-300 hover:border-slate-600"
          title="Neu starten"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Neu starten
        </button>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {dailyWords.map((w, i) => {
            const result = results.find((r) => r.wordId === w.id);
            return (
              <div
                key={w.id}
                className={clsx(
                  'h-1.5 flex-1 rounded-full transition-all',
                  result === undefined && i === idx && 'bg-emerald-400',
                  result === undefined && i !== idx && 'bg-slate-700',
                  result?.knew && 'bg-emerald-500',
                  result && !result.knew && 'bg-red-500'
                )}
              />
            );
          })}
        </div>
        <span className="text-xs text-slate-400 tabular-nums">
          {Math.min(results.length + (finished ? 0 : 1), total)} / {total}
        </span>
      </div>

      {/* Card */}
      {!showStats ? (
        <div
          onClick={() => cardState === 'front' && setCardState('back')}
          className={clsx(
            'card-elevated relative cursor-pointer overflow-hidden p-8 sm:p-12 transition-all',
            cardState === 'back' ? 'border-emerald-500/40' : 'hover:border-emerald-500/30'
          )}
          style={{ minHeight: 360 }}
        >
          {/* Lang badge */}
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span
              className={clsx(
                'rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide',
                current.language === 'de'
                  ? 'bg-blue-500/20 text-blue-300'
                  : 'bg-emerald-500/20 text-emerald-300'
              )}
            >
              {current.language === 'de' ? 'Deutsch' : 'English'}
            </span>
            <span className="rounded-full bg-slate-700/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-300">
              {current.topic}
            </span>
            <span className="rounded-full bg-slate-800/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Komplexität {current.complexity}/3
            </span>
          </div>

          {/* Front */}
          {cardState === 'front' && (
            <div className="flex flex-col items-center justify-center pt-12 text-center">
              <div className="mb-4 text-xs uppercase tracking-widest text-slate-500">
                Was bedeutet …
              </div>
              <h2 className="mb-4 text-4xl font-black leading-tight text-white sm:text-5xl">
                {current.word}
              </h2>
              <div className="mt-2 text-sm italic text-slate-400">{current.partOfSpeech}</div>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm text-emerald-300">
                <Eye className="h-4 w-4" />
                Karte antippen zum Aufdecken
              </div>
            </div>
          )}

          {/* Back */}
          {cardState === 'back' && (
            <div className="space-y-5 pt-10">
              <div className="text-center">
                <div className="mb-2 text-sm uppercase tracking-widest text-slate-500">
                  {current.word}
                </div>
                <div className="mb-1 text-3xl font-black gradient-text-warm sm:text-4xl">
                  {current.translation}
                </div>
              </div>

              <div className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    <Lightbulb className="h-3 w-3 text-amber-400" />
                    Beispiel
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowExample((v) => !v);
                    }}
                    className="text-[11px] text-emerald-300 hover:text-emerald-200"
                  >
                    {showExample ? 'Ausblenden' : 'Übersetzung zeigen'}
                  </button>
                </div>
                <p className="text-sm leading-relaxed text-slate-100">"{current.example}"</p>
                {showExample && (
                  <p className="mt-3 border-t border-slate-700/40 pt-3 text-sm italic leading-relaxed text-slate-400">
                    {current.exampleTranslation}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card-elevated p-8 text-center">
          <Sparkles className="mx-auto mb-3 h-10 w-10 text-emerald-400" />
          <h2 className="mb-2 text-3xl font-black tracking-tight">Tag geschafft!</h2>
          <p className="mb-6 text-slate-400">
            Du hast heute {total} neue Wörter geübt — Genauigkeit: {accuracy}%
          </p>
          <div className="mb-6 grid grid-cols-3 gap-3">
            <div className="card p-3">
              <div className="text-xs text-slate-400">Gewusst</div>
              <div className="text-2xl font-black text-emerald-400">{knewCount}</div>
            </div>
            <div className="card p-3">
              <div className="text-xs text-slate-400">Nicht gewusst</div>
              <div className="text-2xl font-black text-red-400">{total - knewCount}</div>
            </div>
            <div className="card p-3">
              <div className="text-xs text-slate-400">Genauigkeit</div>
              <div className="text-2xl font-black gradient-text-warm">{accuracy}%</div>
            </div>
          </div>
          <button onClick={handleRestart} className="btn-primary inline-flex items-center gap-2">
            <RotateCcw className="h-4 w-4" /> Erneut durchgehen
          </button>
        </div>
      )}

      {/* Controls */}
      {!showStats && cardState === 'front' && (
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={results.length === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-300 transition-all hover:border-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            Zurück
          </button>
          <div className="text-xs text-slate-500">
            Karte antippen oder „Antwort zeigen" drücken
          </div>
          <button
            onClick={() => setCardState('back')}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl"
          >
            Antwort zeigen
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {cardState === 'back' && !showStats && (
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCardState('front')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-300 hover:border-slate-600"
          >
            <Eye className="h-4 w-4" />
            Wort nochmal ansehen
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handleAnswer(false)}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 hover:border-red-500/60 hover:bg-red-500/20"
            >
              <X className="h-4 w-4" />
              Nicht gewusst
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300 hover:border-emerald-500/60 hover:bg-emerald-500/20"
            >
              <Check className="h-4 w-4" />
              Gewusst
            </button>
          </div>
        </div>
      )}

      {/* Streak tip */}
      <div className="rounded-xl border border-slate-700/40 bg-slate-800/30 p-4 text-center text-xs text-slate-500">
        💡 Die 5 Wörter sind jeden Tag neu (deterministischer Seed). Morgen kommen andere — alle Oberstufe-relevant.
      </div>
    </div>
  );
}
