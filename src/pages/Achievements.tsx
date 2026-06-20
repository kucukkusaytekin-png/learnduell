import { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Trophy, Lock, Sparkles, ArrowLeft, Filter } from 'lucide-react';
import { achievements, tierColors, type Achievement, type AchievementCategory } from '../data/achievements';
import { useGameStore } from '../store/gameStore';
import clsx from 'clsx';

const CATEGORIES: { id: AchievementCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Alle' },
  { id: 'progress', label: 'Fortschritt' },
  { id: 'streak', label: 'Streak' },
  { id: 'module', label: 'Module' },
  { id: 'speed', label: 'Speed' },
  { id: 'mastery', label: 'Mastery' },
  { id: 'special', label: 'Spezial' },
];

export default function Achievements() {
  const unlocked = useGameStore((s) => s.unlockedAchievements);
  const wins = useGameStore((s) => s.progress.wins);
  const streak = useGameStore((s) => s.progress.streak);

  const [activeFilter, setActiveFilter] = useState<AchievementCategory | 'all'>('all');
  const [showLocked, setShowLocked] = useState(true);

  const grouped = useMemo(() => {
    const filtered = achievements.filter((a) => activeFilter === 'all' || a.category === activeFilter);
    return filtered;
  }, [activeFilter]);

  const totalUnlocked = unlocked.length;
  const totalAll = achievements.length;
  const pct = totalAll === 0 ? 0 : Math.round((totalUnlocked / totalAll) * 100);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <NavLink to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Zurück zum Dashboard
      </NavLink>

      {/* Header */}
      <div className="card-elevated relative overflow-hidden p-6 sm:p-8">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 100% 0%, rgba(250,204,21,0.4), transparent 60%), radial-gradient(circle at 0% 100%, rgba(168,85,247,0.3), transparent 60%)',
          }}
        />
        <div className="relative grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-300">
              <Trophy className="h-3.5 w-3.5" />
              Achievements · Badge-System
            </div>
            <h1 className="mb-1 text-3xl font-bold text-white sm:text-4xl">Deine Erfolge</h1>
            <p className="text-slate-400">
              {totalUnlocked} von {totalAll} freigeschaltet ({pct}%)
            </p>
          </div>
          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-4 text-center">
            <div className="text-3xl sm:text-4xl font-black gradient-text-warm">{pct}%</div>
            <div className="text-[10px] uppercase tracking-wider text-yellow-300">Fortschritt</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-slate-500" />
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveFilter(c.id)}
            className={clsx(
              'rounded-full px-3 py-1 text-xs font-semibold transition-all',
              activeFilter === c.id
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
            )}
          >
            {c.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-slate-400">
            <input
              type="checkbox"
              checked={showLocked}
              onChange={() => setShowLocked(!showLocked)}
              className="rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500/30"
            />
            Gesperrte zeigen
          </label>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grouped
          .filter((a) => showLocked || unlocked.includes(a.id))
          .map((a) => (
            <AchievementCard key={a.id} achievement={a} unlocked={unlocked.includes(a.id)} />
          ))}
      </div>

      {grouped.length === 0 && (
        <div className="card p-8 text-center text-sm text-slate-400">
          Keine Achievements in dieser Kategorie.
        </div>
      )}

      {/* Recent stats */}
      <div className="card-elevated p-5">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">Statistik</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Siege" value={wins} />
          <Stat label="Streak" value={`${streak} Tage`} />
          <Stat label="Badges" value={`${totalUnlocked}/${totalAll}`} />
          <Stat label="Quote" value={pct + '%'} />
        </div>
      </div>
    </div>
  );
}

function AchievementCard({ achievement, unlocked }: { achievement: Achievement; unlocked: boolean }) {
  const tier = tierColors[achievement.tier];
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl border p-5 transition-all',
        unlocked
          ? clsx('bg-slate-800/60', tier.border)
          : 'border-slate-700/40 bg-slate-900/40 opacity-60 grayscale'
      )}
    >
      {unlocked && (
        <div className={clsx('absolute inset-0 opacity-10 bg-gradient-to-br', tier.from, tier.to)} />
      )}
      <div className="relative flex items-start gap-4">
        <div
          className={clsx(
            'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-3xl shadow-lg',
            unlocked
              ? clsx('bg-gradient-to-br', tier.from, tier.to)
              : 'bg-slate-800 border border-slate-700'
          )}
        >
          {unlocked ? achievement.icon : <Lock className="h-6 w-6 text-slate-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={clsx('truncate text-base font-bold', unlocked ? 'text-white' : 'text-slate-400')}>
              {achievement.title}
            </h4>
            {unlocked && (
              <span className={clsx('rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase', tier.text, 'bg-white/5')}>
                {achievement.tier}
              </span>
            )}
          </div>
          <p className={clsx('mt-1 text-xs leading-relaxed', unlocked ? 'text-slate-300' : 'text-slate-500')}>
            {achievement.description}
          </p>
        </div>
      </div>
      {unlocked && (
        <div className="absolute right-3 top-3">
          <Sparkles className={clsx('h-4 w-4', tier.text)} />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-0.5 text-xl font-black text-white">{value}</div>
    </div>
  );
}
