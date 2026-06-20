import { useState, useMemo } from 'react';
import { aufsatzPrompts, type AufsatzPrompt } from '../data/aufsatz';
import {
  PenLine,
  Clock,
  Sparkles,
  Eye,
  EyeOff,
  Lightbulb,
  CheckCircle2,
  Circle,
  ArrowRight,
} from 'lucide-react';
import clsx from 'clsx';

export default function Aufsatz() {
  const [activeId, setActiveId] = useState(aufsatzPrompts[0].id);
  const [text, setText] = useState('');
  const [showMuster, setShowMuster] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const active: AufsatzPrompt = useMemo(
    () => aufsatzPrompts.find((p) => p.id === activeId) ?? aufsatzPrompts[0],
    [activeId]
  );

  const wordCount = useMemo(
    () => text.trim().split(/\s+/).filter(Boolean).length,
    [text]
  );

  const handleSwitch = (id: string) => {
    setActiveId(id);
    setText('');
    setShowMuster(false);
    setShowTips(true);
    setChecked({});
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-white">
            <PenLine className="h-8 w-8 text-pink-400" />
            Aufsatz-Training
          </h1>
          <p className="text-slate-400">
            Schreibe kurze Texte zu klassischen Aufsatztypen — und vergleiche sie mit der Musterlösung.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-sm text-pink-300 md:flex">
          <Sparkles className="h-4 w-4" />
          Stil & Ausdruck
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
        {/* Sidebar — Prompt list */}
        <aside className="space-y-2">
          <div className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Aufgaben
          </div>
          {aufsatzPrompts.map((p) => {
            const isActive = p.id === activeId;
            return (
              <button
                key={p.id}
                onClick={() => handleSwitch(p.id)}
                className={clsx(
                  'group w-full rounded-xl border p-4 text-left transition-all',
                  isActive
                    ? 'border-pink-500/50 bg-pink-500/10 shadow-lg shadow-pink-500/10'
                    : 'border-slate-700/50 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800/70'
                )}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className={clsx(
                      'rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                      p.type === 'eroerterung'
                        ? 'bg-blue-500/20 text-blue-300'
                        : p.type === 'charakterisierung'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    )}
                  >
                    {p.typeLabel}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="h-3 w-3" />
                    {p.estimatedMinutes} min
                  </span>
                </div>
                <h3
                  className={clsx(
                    'text-sm font-semibold leading-snug',
                    isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  )}
                >
                  {p.title}
                </h3>
                <div className="mt-2 text-[11px] text-slate-500">{p.level}</div>
              </button>
            );
          })}
        </aside>

        {/* Main — Active prompt */}
        <main className="space-y-5">
          {/* Prompt card */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6 backdrop-blur">
            <div className="mb-3 flex items-center gap-2">
              <span
                className={clsx(
                  'rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide',
                  active.type === 'eroerterung'
                    ? 'bg-blue-500/20 text-blue-300'
                    : active.type === 'charakterisierung'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                )}
              >
                {active.typeLabel}
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-500">{active.level}</span>
              <span className="text-xs text-slate-500">·</span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                {active.estimatedMinutes} min
              </span>
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight text-white">
              {active.title}
            </h2>
            <p className="leading-relaxed text-slate-300">{active.prompt}</p>
          </div>

          {/* Tipps toggle */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5">
            <button
              onClick={() => setShowTips((v) => !v)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/20">
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <div className="font-semibold text-amber-100">Tipps für diese Aufgabe</div>
                  <div className="text-xs text-amber-300/70">
                    {showTips ? 'Klicken zum Einklappen' : 'Klicken zum Ausklappen'}
                  </div>
                </div>
              </div>
              {showTips ? (
                <EyeOff className="h-4 w-4 text-amber-300" />
              ) : (
                <Eye className="h-4 w-4 text-amber-300" />
              )}
            </button>
            {showTips && (
              <div className="border-t border-amber-500/20 px-4 py-4">
                <ul className="space-y-2">
                  {active.tips.map((t, i) => (
                    <li key={i} className="flex gap-2 text-sm text-amber-100/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Textarea + side-by-side */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6">
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-200">
                Dein Aufsatz
              </label>
              <div className="text-xs text-slate-500">
                {wordCount} {wordCount === 1 ? 'Wort' : 'Wörter'}
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Schreibe hier deinen Text …"
              rows={10}
              className="w-full resize-y rounded-xl border border-slate-700 bg-slate-900/60 p-4 font-mono text-sm leading-relaxed text-slate-100 placeholder:text-slate-600 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            />
          </div>

          {/* Musterlösung reveal */}
          {showMuster ? (
            <div className="grid gap-5 md:grid-cols-2">
              {/* Dein Aufsatz */}
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-slate-700/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-300">
                    Dein Aufsatz
                  </span>
                  <span className="text-xs text-slate-500">{wordCount} Wörter</span>
                </div>
                {text.trim() ? (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                    {text}
                  </p>
                ) : (
                  <p className="italic text-slate-500">
                    Du hast noch nichts geschrieben — keine Sorge, hier ist die Musterlösung zum Lernen.
                  </p>
                )}
              </div>

              {/* Musterlösung */}
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-300">
                    Musterlösung
                  </span>
                  <span className="text-xs text-emerald-300/70">
                    {active.musterloesung.trim().split(/\s+/).length} Wörter
                  </span>
                </div>
                <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-100">
                  {active.musterloesung}
                </p>
                <div className="border-t border-emerald-500/20 pt-4">
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    Stilistische Highlights
                  </div>
                  <ul className="space-y-1.5">
                    {active.musterloesungNotes.map((note, i) => (
                      <li key={i} className="flex gap-2 text-xs text-emerald-100/90">
                        <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800/30 p-8 text-center">
              <Eye className="mx-auto mb-3 h-8 w-8 text-slate-600" />
              <p className="mb-4 text-slate-400">
                Schreibe zuerst deinen Aufsatz — oder schau dir die Musterlösung an, um die stilistischen Mittel kennenzulernen.
              </p>
              <button
                onClick={() => setShowMuster(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl"
              >
                <Sparkles className="h-4 w-4" />
                Musterlösung anzeigen
              </button>
            </div>
          )}

          {/* Bewertungskriterien checklist */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6">
            <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold text-white">
              <CheckCircle2 className="h-5 w-5 text-pink-400" />
              Bewertungskriterien
            </h3>
            <p className="mb-4 text-xs text-slate-500">
              Hake selbst ab, welche Kriterien dein Text erfüllt — so lernst du, worauf es ankommt.
            </p>
            <div className="space-y-2">
              {active.kriterien.map((k, i) => {
                const id = `${active.id}-${i}`;
                const isChecked = !!checked[id];
                return (
                  <button
                    key={id}
                    onClick={() => setChecked((c) => ({ ...c, [id]: !c[id] }))}
                    className={clsx(
                      'flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all',
                      isChecked
                        ? 'border-pink-500/40 bg-pink-500/10'
                        : 'border-slate-700/60 bg-slate-900/40 hover:border-slate-600'
                    )}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-pink-400" />
                    ) : (
                      <Circle className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
                    )}
                    <div>
                      <div
                        className={clsx(
                          'text-sm font-semibold',
                          isChecked ? 'text-pink-100' : 'text-slate-200'
                        )}
                      >
                        {k.label}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">{k.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 text-xs text-slate-500">
              {Object.values(checked).filter(Boolean).length} / {active.kriterien.length} erfüllt
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
