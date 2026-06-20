import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Swords, BookOpen, Library, Calendar, User, Repeat, BookText } from 'lucide-react';
import { useGameStore, getLigaForLevel, getLigaColor } from '../store/gameStore';
import { detectUnlocked } from '../lib/achievements';
import { useEffect } from 'react';
import clsx from 'clsx';

export default function Layout() {
  const progress = useGameStore((s) => s.progress);
  const profile = useGameStore((s) => s.profile);
  const unlocked = useGameStore((s) => s.unlockedAchievements);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);

  // Auto-detect and unlock new achievements on every state change
  useEffect(() => {
    const state = useGameStore.getState();
    const newlyUnlocked = detectUnlocked(state);
    for (const id of newlyUnlocked) {
      if (!unlocked.includes(id)) unlockAchievement(id);
    }
  }, [progress, unlocked, unlockAchievement]);

  const liga = getLigaForLevel(progress.level);
  const ligaColor = getLigaColor(liga);
  const xpForLevel = (progress.level - 1) * 200;
  const xpForNext = progress.level * 200;
  const xpIntoLevel = progress.xp - xpForLevel;
  const xpNeeded = xpForNext - xpForLevel;
  const xpPct = Math.min(100, Math.max(0, (xpIntoLevel / xpNeeded) * 100));
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Swords, label: 'Duell', exact: true },
    { to: '/repetitor', icon: Repeat, label: 'Repetitor' },
    { to: '/woerterbuch', icon: BookText, label: 'Wörter' },
    { to: '/challenge', icon: Calendar, label: 'Challenge' },
    { to: '/learn/satzaufbau', icon: BookOpen, label: 'Lernen' },
    { to: '/library', icon: Library, label: 'Bibliothek' },
  ];

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    if (to === '/learn/satzaufbau') return location.pathname.startsWith('/learn');
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-2xl bg-bg-base/70 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-primary/30 group-hover:scale-105 transition-transform">
              <Swords className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight hidden sm:block">Lernduell</span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map(({ to, icon: Icon, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                className={clsx(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all',
                  isActive(to, exact)
                    ? 'bg-gradient-to-r from-accent-primary/20 to-accent-cyan/10 text-text-primary border border-accent-primary/30'
                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* XP Bar */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
                <span className="font-bold text-text-primary">Lvl {progress.level}</span>
                <span>·</span>
                <span className="font-mono">{progress.xp} XP</span>
              </div>
              <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-primary to-accent-cyan rounded-full transition-all"
                  style={{ width: `${xpPct}%` }}
                />
              </div>
            </div>

            {/* Streak */}
            <div
              className="chip"
              style={{
                background: 'rgba(245, 158, 11, 0.12)',
                borderColor: 'rgba(245, 158, 11, 0.3)',
                color: '#fbbf24',
              }}
            >
              🔥 <span className="font-bold">{progress.streak}</span>
            </div>

            {/* Liga */}
            <div
              className="chip"
              style={{
                background: ligaColor.bg,
                borderColor: 'rgba(255,255,255,0.1)',
                color: ligaColor.text,
              }}
            >
              {liga === 'Master' ? '👑' : liga === 'Diamond' ? '💎' : liga === 'Gold' ? '🥇' : liga === 'Silver' ? '🥈' : '🥉'}
              <span className="font-bold hidden sm:inline">{liga}</span>
            </div>

            {/* Avatar */}
            <NavLink to="/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-amber to-accent-red flex items-center justify-center text-xl border-2 border-white/10 hover:scale-105 transition-transform">
              {profile.avatarEmoji}
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28 md:pb-10">
        <Outlet />
      </main>

      {/* Bottom Nav (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 backdrop-blur-2xl bg-bg-base/80 border-t border-border-subtle md:hidden">
        <div className="grid grid-cols-6 max-w-7xl mx-auto">
          {navItems.map(({ to, icon: Icon, label, exact }) => {
            const active = isActive(to, exact);
            return (
              <NavLink
                key={to}
                to={to}
                className={clsx(
                  'flex flex-col items-center justify-center py-3 gap-0.5 text-[10px] font-semibold transition-colors',
                  active ? 'text-accent-cyan' : 'text-text-secondary'
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
