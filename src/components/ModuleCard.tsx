import { NavLink } from 'react-router-dom';
import { BookOpen, Calculator, Library as LibIcon, PenLine, Languages, ArrowRight } from 'lucide-react';
import type { Module } from '../types';
import { useGameStore } from '../store/gameStore';
import clsx from 'clsx';

const iconMap = { book: BookOpen, calculator: Calculator, library: LibIcon, pen: PenLine, languages: Languages };

const colorMap = {
  pink: { from: '#ec4899', to: '#f59e0b', glow: 'rgba(236, 72, 153, 0.25)' },
  cyan: { from: '#06b6d4', to: '#3b82f6', glow: 'rgba(6, 182, 212, 0.25)' },
  green: { from: '#10b981', to: '#14b8a6', glow: 'rgba(16, 185, 129, 0.25)' },
};

interface ModuleCardProps {
  module: Module;
  showDuelButton?: boolean;
}

export function ModuleCard({ module, showDuelButton = true }: ModuleCardProps) {
  const Icon = iconMap[module.icon as keyof typeof iconMap] ?? BookOpen;
  const color = colorMap[module.color];
  const progress = useGameStore((s) => s.progress.moduleProgress[module.id]);
  const completedCount = progress?.completedTopics.length ?? 0;
  const totalTopics = module.topics.length;
  const progressPct = totalTopics === 0 ? 0 : (completedCount / totalTopics) * 100;

  return (
    <div className="card p-5 sm:p-6 hover:border-border-default transition-all group relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity"
        style={{ background: color.glow }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})` }}
          >
            <Icon className="w-6 h-6" />
          </div>
          {module.topics.length === 0 && (
            <span className="chip bg-white/5 border-border-default text-text-secondary text-[11px] uppercase tracking-wider">
              Bald
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold mb-1 tracking-tight">{module.title}</h3>
        <p className="text-sm text-text-secondary mb-4 leading-relaxed">{module.description}</p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs font-semibold mb-1.5">
            <span className="text-text-secondary">{completedCount} / {totalTopics} Themen</span>
            <span style={{ color: color.to }} className="font-bold">{Math.round(progressPct)}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progressPct}%`,
                background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {module.topics.length > 0 && (
            <NavLink
              to={`/learn/${module.id}`}
              className="btn-ghost flex-1 justify-center text-center text-sm flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" /> Lernen
            </NavLink>
          )}
          {showDuelButton && module.topics.length > 0 && (
            <NavLink
              to={`/duel/${module.id}`}
              className={clsx(
                'flex-1 justify-center text-center text-sm font-bold py-2.5 px-3 rounded-xl flex items-center gap-1.5 text-white',
                'transition-all hover:scale-[1.02] active:scale-[0.98]'
              )}
              style={{
                background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                boxShadow: `0 4px 16px ${color.glow}`,
              }}
            >
              ⚔️ Duell <ArrowRight className="w-4 h-4" />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
