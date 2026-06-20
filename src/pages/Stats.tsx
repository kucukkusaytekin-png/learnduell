import { Trophy, Target, Zap, Flame, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useGameStore, getLigaForLevel, getLigaColor } from '../store/gameStore';
import { modules } from '../data/satzaufbau';

export default function Stats() {
  const progress = useGameStore((s) => s.progress);
  const liga = getLigaForLevel(progress.level);
  const ligaColor = getLigaColor(liga);

  const accuracy = progress.totalAnswers === 0 ? 0 : Math.round((progress.correctAnswers / progress.totalAnswers) * 100);
  const totalDuels = progress.wins + progress.losses;
  const winRate = totalDuels === 0 ? 0 : Math.round((progress.wins / totalDuels) * 100);

  // Liga thresholds for the visual ladder
  const ligaLadder = [
    { name: 'Bronze', min: 1, max: 4, icon: '🥉', color: '#a16207' },
    { name: 'Silver', min: 5, max: 9, icon: '🥈', color: '#94a3b8' },
    { name: 'Gold', min: 10, max: 19, icon: '🥇', color: '#fbbf24' },
    { name: 'Diamond', min: 20, max: 29, icon: '💎', color: '#06b6d4' },
    { name: 'Master', min: 30, max: 999, icon: '👑', color: '#ef4444' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Deine Stats</h1>
        <p className="text-text-secondary mt-1">Fortschritt, Genauigkeit und Liga-Status auf einen Blick.</p>
      </header>

      {/* Liga Card */}
      <section
        className="card-elevated p-6 sm:p-8 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${ligaColor.bg}, rgba(255,255,255,0.02))`, borderColor: ligaColor.from }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 relative">
          <div className="text-7xl sm:text-8xl">
            {liga === 'Master' ? '👑' : liga === 'Diamond' ? '💎' : liga === 'Gold' ? '🥇' : liga === 'Silver' ? '🥈' : '🥉'}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Aktuelle Liga</div>
            <h2 className="text-4xl sm:text-5xl font-black mb-2" style={{ color: ligaColor.text }}>{liga}</h2>
            <div className="text-text-secondary">Level {progress.level} · {progress.xp} XP gesamt</div>
          </div>
          <div className="text-center">
            <div className="text-5xl sm:text-6xl font-black text-accent-amber">{progress.streak}</div>
            <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-1">Tage Streak</div>
          </div>
        </div>
      </section>

      {/* Liga Ladder */}
      <section className="card p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent-cyan" />
          Liga-Aufstieg
        </h3>
        <div className="space-y-2">
          {ligaLadder.map((l) => {
            const current = progress.level >= l.min && progress.level <= l.max;
            const passed = progress.level > l.max;
            return (
              <div
                key={l.name}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                  current ? 'bg-gradient-to-r from-accent-primary/15 to-accent-cyan/10 border border-accent-primary/30' : 'border border-border-subtle'
                }`}
              >
                <div className="text-3xl">{l.icon}</div>
                <div className="flex-1">
                  <div className="font-bold" style={{ color: current || passed ? l.color : undefined }}>{l.name}</div>
                  <div className="text-xs text-text-muted">Level {l.min}{l.max < 999 ? ` – ${l.max}` : '+'}</div>
                </div>
                {current && <span className="chip text-[10px] bg-accent-primary/15 border-accent-primary/40 text-accent-primary">AKTUELL</span>}
                {passed && <span className="chip text-[10px] bg-accent-green/15 border-accent-green/40 text-accent-green">GESCHAFT</span>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Stat grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatBox icon={<Trophy className="w-5 h-5" />} label="Siege" value={progress.wins} accent="text-accent-amber" />
        <StatBox icon={<Target className="w-5 h-5" />} label="Genauigkeit" value={`${accuracy}%`} accent="text-accent-cyan" />
        <StatBox icon={<Zap className="w-5 h-5" />} label="XP gesamt" value={progress.xp} accent="text-accent-primary" />
        <StatBox icon={<TrendingUp className="w-5 h-5" />} label="Siegquote" value={`${winRate}%`} accent="text-accent-green" />
      </section>

      {/* Module progress */}
      <section>
        <h3 className="font-bold mb-4">Modul-Fortschritt</h3>
        <div className="space-y-3">
          {modules.map((m) => {
            const prog = progress.moduleProgress[m.id] || { completedTopics: [], score: 0 };
            const pct = m.topics.length === 0 ? 0 : (prog.completedTopics.length / m.topics.length) * 100;
            return (
              <div key={m.id} className="card p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-text-secondary" />
                    <span className="font-bold">{m.title}</span>
                  </div>
                  <span className="text-xs text-text-muted font-mono">{prog.completedTopics.length} / {m.topics.length}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-cyan rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <NavLink to="/duel/satzaufbau" className="btn-primary inline-flex items-center gap-2">
        Noch ein Duell wagen <ArrowRight className="w-4 h-4" />
      </NavLink>
    </div>
  );
}

function StatBox({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string | number; accent: string }) {
  return (
    <div className="card p-4 sm:p-5">
      <div className={`${accent} mb-2`}>{icon}</div>
      <div className="text-2xl sm:text-3xl font-black tabular-nums">{value}</div>
      <div className="text-xs text-text-secondary font-semibold uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}
