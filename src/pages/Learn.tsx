import { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import { getModule } from '../data/satzaufbau';
import { useGameStore } from '../store/gameStore';
import { isRecentlyAdded } from '../lib/newBadge';
import clsx from 'clsx';

const EMPTY: string[] = [];

/**
 * "Neu" pill shown for topics added within the last 14 days.
 * Amber gradient — visually loud so the student notices fresh content.
 */
function NeuBadge({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full',
        'text-[10px] font-black uppercase tracking-wider text-white',
        'bg-gradient-to-r from-amber-500 to-pink-500 shadow-sm',
        'animate-pulse',
        className
      )}
    >
      <Sparkles className="w-3 h-3" />
      Neu
    </span>
  );
}

export default function Learn() {
  const { moduleId, topicId } = useParams();
  const mod = getModule(moduleId || 'satzaufbau');
  const [activeTopicId, setActiveTopicId] = useState(topicId || mod?.topics[0]?.id || '');
  const activeTopic = mod?.topics.find((t) => t.id === activeTopicId);
  const moduleProgress = useGameStore((s) => s.progress.moduleProgress[mod?.id || '']);
  const completedTopics = moduleProgress?.completedTopics ?? EMPTY;

  if (!mod || !activeTopic) {
    return (
      <div className="card p-10 text-center">
        <p className="text-text-secondary">Modul nicht gefunden.</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6 animate-fade-in">
      {/* Sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start space-y-2">
        <NavLink
          to="/"
          className="btn-ghost text-sm inline-flex items-center gap-2 mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Zurück
        </NavLink>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border-subtle">
            <BookOpen className="w-4 h-4 text-accent-cyan" />
            <span className="font-bold text-sm">{mod.title}</span>
          </div>
          <div className="space-y-1">
            {mod.topics.map((t) => {
              const isActive = t.id === activeTopicId;
              const done = completedTopics.includes(t.id);
              const isNew = isRecentlyAdded(t.addedAt);
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTopicId(t.id)}
                  className={clsx(
                    'w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-all text-sm',
                    isActive
                      ? 'bg-gradient-to-r from-accent-primary/20 to-accent-cyan/10 border border-accent-primary/30 font-bold'
                      : 'hover:bg-white/5 text-text-secondary'
                  )}
                >
                  {done ? (
                    <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 flex-shrink-0 opacity-50" />
                  )}
                  <span className="truncate flex-1">{t.title}</span>
                  {isNew && <NeuBadge />}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <article className="space-y-6">
        {/* Header */}
        <header className="card-elevated p-6 sm:p-8">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-text-muted uppercase tracking-widest font-bold">
              {mod.title}
            </div>
            {isRecentlyAdded(activeTopic.addedAt) && <NeuBadge />}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">{activeTopic.title}</h1>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">{activeTopic.summary}</p>
        </header>

        {/* Intro */}
        <section className="card p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-accent-amber" />
            <h2 className="text-lg font-bold">Einführung</h2>
          </div>
          <p className="text-text-primary leading-relaxed text-base">{activeTopic.lesson.intro}</p>
        </section>

        {/* Rules */}
        {activeTopic.lesson.rules.map((rule, idx) => (
          <section key={idx} className="card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-cyan flex items-center justify-center font-black text-sm">
                {idx + 1}
              </div>
              <h3 className="text-lg sm:text-xl font-bold">{rule.title}</h3>
            </div>
            <p className="text-text-secondary leading-relaxed mb-4">{rule.body}</p>
            <div className="space-y-2">
              <div className="text-xs text-text-muted uppercase font-bold tracking-wider mb-2">Beispiele</div>
              {rule.examples.map((ex, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-bg-base/60 border border-border-subtle font-mono text-sm"
                >
                  <span className="text-accent-cyan font-bold">▸</span>
                  <span className="text-text-primary italic">{ex}</span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CTA to duel */}
        <section className="card-elevated p-6 sm:p-8 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 100% 50%, rgba(236,72,153,0.4), transparent 60%)',
            }}
          />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Bereit, das Gelernte zu testen?</h3>
              <p className="text-text-secondary text-sm">
                Spiele ein Duell mit Fragen aus diesem und anderen Themen.
              </p>
            </div>
            <NavLink to={`/duel/${mod.id}`} className="btn-primary inline-flex items-center gap-2 flex-shrink-0">
              ⚔️ Duell starten <ArrowRight className="w-5 h-5" />
            </NavLink>
          </div>
        </section>
      </article>
    </div>
  );
}
