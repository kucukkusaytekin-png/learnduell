import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Trophy, RotateCcw, Home, TrendingUp, ArrowRight } from 'lucide-react';
import { useGameStore, getLigaForLevel, getLigaColor } from '../store/gameStore';

interface ResultState {
  userScore: number;
  botScore: number;
  answers: { questionId: string; correct: boolean; timeMs: number }[];
  xpEarned: number;
  leveledUp: boolean;
  totalQuestions: number;
  moduleTitle: string;
  durationMs: number;
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState | null;
  const progress = useGameStore((s) => s.progress);
  const liga = getLigaForLevel(progress.level);
  const ligaColor = getLigaColor(liga);

  useEffect(() => {
    if (!state) navigate('/');
  }, [state, navigate]);

  if (!state) return null;

  const won = state.userScore > state.botScore;
  const tie = state.userScore === state.botScore;
  const correctCount = state.answers.filter((a) => a.correct).length;
  const accuracy = state.totalQuestions === 0 ? 0 : Math.round((correctCount / state.totalQuestions) * 100);
  const avgTimeSec = state.answers.length === 0 ? 0 : (state.answers.reduce((s, a) => s + a.timeMs, 0) / state.answers.length / 1000);
  const durationSec = Math.round(state.durationMs / 1000);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Hero result */}
      <section
        className="card-elevated p-8 sm:p-12 text-center relative overflow-hidden"
        style={{
          background: won
            ? 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.1))'
            : tie
            ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1))'
            : 'linear-gradient(135deg, rgba(239,68,68,0.10), rgba(236,72,153,0.08))',
          borderColor: won ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.1)',
        }}
      >
        <div className="text-7xl sm:text-8xl mb-4 animate-slide-up">
          {won ? '🏆' : tie ? '🤝' : '💪'}
        </div>
        <h1
          className="text-4xl sm:text-5xl font-black tracking-tight mb-2"
          style={{
            background: won
              ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
              : tie
              ? 'linear-gradient(135deg, #6366f1, #06b6d4)'
              : 'linear-gradient(135deg, #94a3b8, #64748b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {won ? 'SIEG!' : tie ? 'UNENTSCHIEDEN' : 'KNAPP DANEBEN'}
        </h1>
        <p className="text-text-secondary text-base sm:text-lg mb-2">
          {state.userScore.toLocaleString('de-DE')} : {state.botScore.toLocaleString('de-DE')} Punkte
        </p>

        {state.leveledUp && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-amber/15 border border-accent-amber/40 text-accent-amber text-sm font-bold mt-3 animate-pulse-glow">
            <TrendingUp className="w-4 h-4" />
            Level Up! Du bist jetzt Level {progress.level}
          </div>
        )}
      </section>

      {/* Stats grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <StatTile
          label="XP erhalten"
          value={`+${state.xpEarned}`}
          icon="⚡"
          highlight
        />
        <StatTile label="Richtig" value={`${correctCount} / ${state.totalQuestions}`} icon="🎯" />
        <StatTile label="Genauigkeit" value={`${accuracy}%`} icon="📊" />
        <StatTile label="Ø Antwortzeit" value={`${avgTimeSec.toFixed(1)}s`} icon="⏱️" />
      </section>

      {/* Liga */}
      <section
        className="card p-5 sm:p-6 flex items-center justify-between gap-4"
        style={{ borderColor: ligaColor.from, background: ligaColor.bg }}
      >
        <div className="flex items-center gap-4">
          <div className="text-4xl">
            {liga === 'Master' ? '👑' : liga === 'Diamond' ? '💎' : liga === 'Gold' ? '🥇' : liga === 'Silver' ? '🥈' : '🥉'}
          </div>
          <div>
            <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-0.5">Aktuelle Liga</div>
            <div className="text-2xl font-black" style={{ color: ligaColor.text }}>{liga}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-text-secondary font-bold uppercase tracking-wider mb-0.5">Streak</div>
          <div className="text-2xl font-black text-accent-amber">🔥 {progress.streak}</div>
        </div>
      </section>

      {/* Actions */}
      <section className="flex flex-col sm:flex-row gap-3">
        <NavLink
          to={`/duel/${state.moduleTitle === 'Deutsch Satzaufbau' ? 'satzaufbau' : 'satzaufbau'}`}
          className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" /> Nochmal spielen
        </NavLink>
        <NavLink to="/learn/satzaufbau" className="btn-ghost flex-1 inline-flex items-center justify-center gap-2">
          Lernen üben <ArrowRight className="w-4 h-4" />
        </NavLink>
        <NavLink to="/" className="btn-ghost flex-1 inline-flex items-center justify-center gap-2">
          <Home className="w-5 h-5" /> Dashboard
        </NavLink>
      </section>

      {/* Game stats */}
      <section className="card p-5 text-center text-xs text-text-muted">
        Spieldauer: {Math.floor(durationSec / 60)}m {durationSec % 60}s · Modul: {state.moduleTitle}
      </section>
    </div>
  );
}

function StatTile({ label, value, icon, highlight }: { label: string; value: string; icon: string; highlight?: boolean }) {
  return (
    <div className={highlight ? 'card p-4 border-accent-amber/40 bg-accent-amber/5' : 'card p-4'}>
      <div className="text-xl sm:text-2xl mb-1">{icon}</div>
      <div className={`text-xl sm:text-2xl font-black tabular-nums ${highlight ? 'gradient-text-warm' : 'gradient-text'}`}>{value}</div>
      <div className="text-[10px] sm:text-xs text-text-secondary font-semibold uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}
