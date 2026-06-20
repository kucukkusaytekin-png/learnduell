import { useState, useMemo } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Languages, Sparkles, Lightbulb, Eye, CheckCircle2, XCircle, ArrowRight, RotateCcw, FileText, ChevronLeft } from 'lucide-react';
import { mediationTexts, mediationTopics, mediationLevels, type MediationLevel, type MediationTopic } from '../data/mediation';
import { useGameStore } from '../store/gameStore';
import { bestScore, verdictForScore, jaccardSimilarity } from '../lib/similarity';
import clsx from 'clsx';

// ─── List Page ──────────────────────────────────────────────────────────────
export function MediationList() {
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
              'radial-gradient(circle at 80% 20%, rgba(59,130,246,0.5), transparent 60%), radial-gradient(circle at 20% 80%, rgba(168,85,247,0.4), transparent 60%)',
          }}
        />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">
            <Languages className="h-3.5 w-3.5" />
            Mediation · English Abitur
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">Mediation: Deutsch → English</h1>
          <p className="mb-6 max-w-2xl text-slate-400">
            Eigene Abitur-Disziplin: Einen deutschen Text ins Englische übertragen — sachlich, fließend und mit dem richtigen Ton. Übungsmaterial mit Musterlösung und Bewertungskriterien.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon="📄" label="Texte" value={mediationTexts.length.toString()} />
            <Stat icon="🎯" label="Themen" value={mediationTopics.length.toString()} />
            <Stat icon="📊" label="Level" value="3" />
            <Stat icon="🎓" label="Abitur" value="✓" />
          </div>
        </div>
      </div>

      {/* Topic filter chips */}
      <div className="flex flex-wrap gap-2">
        <FilterChip active label={`Alle (${mediationTexts.length})`} />
        {mediationTopics.map((t) => {
          const count = mediationTexts.filter((m) => m.topic === t.id).length;
          if (count === 0) return null;
          return (
            <FilterChip key={t.id} label={`${t.icon} ${t.label} (${count})`} />
          );
        })}
      </div>

      {/* Text cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {mediationTexts.map((m) => {
          const topic = mediationTopics.find((t) => t.id === m.topic);
          const level = mediationLevels.find((l) => l.id === m.level);
          return (
            <NavLink
              key={m.id}
              to={`/mediation/${m.id}`}
              className="group card-elevated p-5 transition-all hover:scale-[1.01] hover:shadow-xl"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {topic?.icon} {topic?.label} · {m.source}
                  </div>
                  <h3 className="mt-1 text-base font-bold leading-tight text-white">
                    {m.title}
                  </h3>
                </div>
                <span className={clsx(
                  'rounded-full border px-2 py-0.5 text-[10px] font-bold',
                  m.level === 'leicht' && 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
                  m.level === 'mittel' && 'border-amber-500/40 bg-amber-500/10 text-amber-300',
                  m.level === 'schwer' && 'border-red-500/40 bg-red-500/10 text-red-300',
                )}>
                  {level?.label}
                </span>
              </div>

              <p className="mb-3 line-clamp-3 text-sm text-slate-400">
                {m.germanText.split('\n').slice(0, 3).join(' ').substring(0, 140)}…
              </p>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>~{m.wordCount} Wörter</span>
                <span className="inline-flex items-center gap-1 text-blue-300 group-hover:translate-x-1 transition-transform">
                  Übersetzen <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* Info card */}
      <div className="card-elevated p-5">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
          <Lightbulb className="h-4 w-4 text-amber-300" />
          Tipps für die Mediation
        </h3>
        <ul className="space-y-1.5 text-sm text-slate-300">
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> Nicht Wort-für-Wort übersetzen — auf den Sinn achten</li>
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> Deutsche Eigennamen/Fachbegriffe können im Englischen erklärt werden</li>
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> Aktiv/passiv abwechseln — klingt natürlicher</li>
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> Akademischer Ton: „in the context of", „with regard to", „as a result of"</li>
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

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={clsx(
        'rounded-full border px-3 py-1.5 text-sm font-semibold transition-all',
        active
          ? 'border-blue-500/50 bg-blue-500/15 text-blue-200'
          : 'border-slate-700/50 bg-slate-800/40 text-slate-300 hover:bg-slate-700/60'
      )}
    >
      {label}
    </button>
  );
}

// ─── Detail Page ────────────────────────────────────────────────────────────
export function MediationDetail() {
  const { textId } = useParams<{ textId: string }>();
  const navigate = useNavigate();
  const text = mediationTexts.find((t) => t.id === textId);
  const recordDuelResult = useGameStore((s) => s.recordDuelResult);

  const [userTranslation, setUserTranslation] = useState('');
  const [showMusterloesung, setShowMusterloesung] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const similarity = useMemo(() => {
    if (!submitted || !text) return 0;
    return jaccardSimilarity(userTranslation, text.englishMusterloesung);
  }, [submitted, userTranslation, text]);

  const verdict = useMemo(() => verdictForScore(similarity), [similarity]);
  const scorePts = useMemo(() => Math.round(similarity * 200), [similarity]);

  if (!text) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <p className="text-slate-300">Text nicht gefunden.</p>
        <NavLink to="/mediation" className="text-blue-300 hover:underline">← Zurück zur Liste</NavLink>
      </div>
    );
  }

  const topic = mediationTopics.find((t) => t.id === text.topic);
  const level = mediationLevels.find((l) => l.id === text.level);
  const userWords = userTranslation.trim().split(/\s+/).filter(Boolean).length;

  const submit = () => {
    if (userTranslation.trim().length < 20) return;
    setSubmitted(true);
    setShowMusterloesung(true);
    // record as a "duel" with high/low counts
    const correct = similarity >= 0.55 ? 1 : 0;
    recordDuelResult({
      moduleId: 'englisch',
      userScore: correct,
      botScore: 0,
      correctAnswers: correct,
      totalAnswers: 1,
    });
  };

  const reset = () => {
    setUserTranslation('');
    setSubmitted(false);
    setShowMusterloesung(false);
  };

  const next = () => {
    const idx = mediationTexts.findIndex((t) => t.id === textId);
    const nextText = mediationTexts[idx + 1] ?? mediationTexts[0];
    reset();
    navigate(`/mediation/${nextText.id}`);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <NavLink to="/mediation" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ChevronLeft className="h-4 w-4" /> Zurück zur Text-Liste
      </NavLink>

      {/* Header */}
      <div className="card-elevated p-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <span>{topic?.icon} {topic?.label}</span>
          <span>·</span>
          <span>{text.source}</span>
          <span>·</span>
          <span className={clsx(
            'rounded-full border px-2 py-0.5',
            text.level === 'leicht' && 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
            text.level === 'mittel' && 'border-amber-500/40 bg-amber-500/10 text-amber-300',
            text.level === 'schwer' && 'border-red-500/40 bg-red-500/10 text-red-300',
          )}>
            {level?.label}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{text.title}</h1>
      </div>

      {/* 2-column: Source DE | Target EN */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* DE Source */}
        <div className="card-elevated p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/60 px-3 py-1 text-xs font-bold text-slate-300">
              🇩🇪 Deutsch · Original
            </div>
            <span className="text-xs text-slate-500">{text.wordCount} Wörter</span>
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-slate-200">
            {text.germanText.split('\n').map((para, i) => (
              <p key={i} className="rounded-md border-l-2 border-blue-500/30 bg-slate-900/40 p-3">
                {para}
              </p>
            ))}
          </div>

          {/* Vocabulary list */}
          <details className="mt-4">
            <summary className="cursor-pointer text-xs font-bold text-slate-400 hover:text-slate-200">
              📚 Wichtige Vokabeln ({text.vocabulary.length})
            </summary>
            <ul className="mt-2 space-y-1.5 text-xs">
              {text.vocabulary.map((v, i) => (
                <li key={i} className="flex items-start gap-2 rounded-md bg-slate-900/40 p-2">
                  <span className="font-mono text-blue-300">{v.de}</span>
                  <span className="text-slate-500">→</span>
                  <span className="text-slate-200">{v.en}</span>
                  {v.context && <span className="text-slate-500 italic">({v.context})</span>}
                </li>
              ))}
            </ul>
          </details>

          {/* Tips */}
          <details className="mt-3">
            <summary className="cursor-pointer text-xs font-bold text-amber-300 hover:text-amber-200">
              💡 Übersetzungs-Tipps
            </summary>
            <ul className="mt-2 space-y-1 text-xs text-slate-300">
              {text.tips.map((tip, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-amber-400">▸</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* EN Target */}
        <div className="card-elevated p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/60 px-3 py-1 text-xs font-bold text-slate-300">
              🇬🇧 English · Your Translation
            </div>
            <span className="text-xs text-slate-500">{userWords} Wörter</span>
          </div>

          <textarea
            value={userTranslation}
            onChange={(e) => setUserTranslation(e.target.value)}
            disabled={submitted}
            placeholder="Type your English translation here… Be accurate, fluent, and use the vocabulary provided. Aim for around 150-200 words."
            className="min-h-[300px] w-full resize-y rounded-lg border border-slate-700/50 bg-slate-900/40 p-4 text-sm leading-relaxed text-slate-100 placeholder-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 disabled:opacity-70"
          />

          {/* Action bar */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700/60"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
              <button
                onClick={() => setShowMusterloesung((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-200 hover:bg-blue-500/20"
              >
                <Eye className="h-3 w-3" />
                {showMusterloesung ? 'Musterlösung verbergen' : 'Musterlösung anzeigen'}
              </button>
            </div>

            {!submitted ? (
              <button
                onClick={submit}
                disabled={userTranslation.trim().length < 20}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Sparkles className="h-4 w-4" />
                Bewerten
              </button>
            ) : (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-5 py-2 text-sm font-bold text-white hover:bg-slate-700"
              >
                Nächster Text <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Musterlösung (only if toggled) */}
          {showMusterloesung && (
            <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
              <div className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                <CheckCircle2 className="h-3 w-3" /> Musterlösung
              </div>
              <div className="space-y-2 text-sm leading-relaxed text-slate-200">
                {text.englishMusterloesung.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scoring panel (only after submit) */}
      {submitted && (
        <div className={clsx(
          'card-elevated p-6',
          verdict.verdict === 'excellent' && 'border-yellow-500/40',
          verdict.verdict === 'good' && 'border-slate-400/40',
          verdict.verdict === 'okay' && 'border-amber-700/40',
        )}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Deine Bewertung</h2>
            <div className="text-right">
              <div className="text-3xl font-black" style={{ color: verdict.color }}>{verdict.pct}%</div>
              <div className="text-xs text-slate-400">{verdict.label}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full transition-all"
              style={{ width: `${verdict.pct}%`, background: verdict.color }}
            />
          </div>

          {/* Score */}
          <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ScoreBox label="Similarity" value={`${verdict.pct}%`} color={verdict.color} />
            <ScoreBox label="Punkte" value={scorePts.toString()} color="text-purple-300" />
            <ScoreBox label="Wörter" value={userWords.toString()} color="text-blue-300" />
            <ScoreBox label="Status" value={similarity >= 0.55 ? '✓ bestanden' : '✗ üben'} color={similarity >= 0.55 ? 'text-emerald-300' : 'text-amber-300'} />
          </div>

          {/* Bewertungskriterien */}
          <div className="rounded-lg border border-slate-700/40 bg-slate-900/30 p-4">
            <h3 className="mb-3 text-sm font-bold text-white">📊 Bewertungskriterien (NRW Abitur)</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Criterion label="Korrektheit" desc={text.punktzahl.korrektheit} />
              <Criterion label="Fließend" desc={text.punktzahl.fliessend} />
              <Criterion label="Wortschatz" desc={text.punktzahl.wortschatz} />
              <Criterion label="Struktur" desc={text.punktzahl.struktur} />
            </div>
          </div>

          {similarity < 0.55 && (
            <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-amber-100">
              💡 <strong>Tipp:</strong> Vergleiche deine Übersetzung mit der Musterlösung. Achte auf unbekannte Vokabeln und versuche, längere Sätze natürlich aufzuteilen.
            </div>
          )}
          {similarity >= 0.85 && (
            <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-emerald-100">
              🎉 <strong>Sehr gut!</strong> Deine Übersetzung ist flüssig und genau. So sieht eine Bestnote im Abitur aus!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScoreBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-slate-700/40 bg-slate-900/30 p-3 text-center">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</div>
      <div className={clsx('text-xl font-black', color)}>{value}</div>
    </div>
  );
}

function Criterion({ label, desc }: { label: string; desc: string }) {
  return (
    <div>
      <div className="text-xs font-bold text-blue-300">{label}</div>
      <div className="text-xs text-slate-400">{desc}</div>
    </div>
  );
}
