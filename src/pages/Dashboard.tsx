import { NavLink } from 'react-router-dom';
import { Zap, ArrowRight, Flame, Trophy, Upload, Calendar, Sparkles, PenLine, Repeat, BookText, BarChart3, Flag, Award, BookOpen, Languages } from 'lucide-react';
import { repetitionByTopic } from '../data/repetition';
import { todayISO } from '../lib/sr';
import { modules } from '../data/satzaufbau';
import { useGameStore } from '../store/gameStore';
import { ModuleCard } from '../components/ModuleCard';
import { getTodayKey } from '../lib/dailySeed';

export default function Dashboard() {
  const progress = useGameStore((s) => s.progress);
  const profile = useGameStore((s) => s.profile);
  const dailyChallenge = useGameStore((s) => s.dailyChallenge);
  const totalQuestions = progress.correctAnswers + progress.totalAnswers;
  const accuracy = totalQuestions === 0 ? 0 : Math.round((progress.correctAnswers / totalQuestions) * 100);
  const today = getTodayKey();
  const completedToday = dailyChallenge.dateKey === today && dailyChallenge.completedAt !== null;

  // Count topics with repetition pools (just for badge display)
  const repTopicCount = Object.keys(repetitionByTopic).length;

  return (
    <div className="space-y-8 sm:space-y-10 animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden card-elevated p-6 sm:p-10">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 80% 20%, rgba(99,102,241,0.4), transparent 50%), radial-gradient(circle at 20% 80%, rgba(6,182,212,0.3), transparent 50%)',
          }}
        />
        <div className="relative grid sm:grid-cols-[1.5fr_1fr] gap-6 sm:gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/30 text-accent-amber text-xs font-bold mb-4">
              <Flame className="w-3.5 h-3.5" />
              {progress.streak} Tage Streak · Level {progress.level}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-3">
              Hi <span className="gradient-text">{profile.userName}</span>,<br />
              bereit für das <span className="gradient-text-warm">Duell?</span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg mb-6 max-w-md leading-relaxed">
              Spiele gegen Bot-Rivalen, meistere Satzaufbau-Themen und klettere Liga um Liga nach oben.
            </p>
            <div className="flex flex-wrap gap-3">
              <NavLink to="/duel/satzaufbau" className="btn-primary inline-flex items-center gap-2">
                <Zap className="w-5 h-5" /> Duell starten
                <ArrowRight className="w-5 h-5" />
              </NavLink>
              <NavLink to="/upload" className="btn-ghost inline-flex items-center gap-2">
                <Upload className="w-4 h-4" /> Ders yükle
              </NavLink>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-1 gap-3 sm:gap-4">
            <StatTile icon="🏆" label="Siege" value={progress.wins} />
            <StatTile icon="🎯" label="Genauigkeit" value={`${accuracy}%`} />
            <StatTile icon="⚡" label="XP" value={progress.xp} />
          </div>
        </div>
      </section>

      {/* Daily Challenge Card */}
      <NavLink
        to="/challenge"
        className="block group relative overflow-hidden card-elevated p-6 sm:p-8 hover:border-pink-500/40 transition-all"
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 100% 50%, rgba(236,72,153,0.3), transparent 60%)' }}
        />
        <div className="relative grid sm:grid-cols-[auto_1fr_auto] items-center gap-5 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-accent-pink via-accent-amber to-accent-primary flex items-center justify-center text-3xl sm:text-4xl shadow-xl shadow-accent-pink/30 group-hover:scale-110 transition-transform">
            📅
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-pink uppercase tracking-widest mb-1">
              <Sparkles className="w-3 h-3" /> Tages-Challenge
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
              {completedToday ? 'Heute schon gespielt!' : 'Heute 10 Fragen knacken'}
            </h2>
            <p className="text-text-secondary text-sm">
              {completedToday
                ? `Rekord: ${dailyChallenge.bestScore.toLocaleString('de-DE')} Punkte · Versuche heute: ${dailyChallenge.attempts}`
                : 'Jeden Tag die gleichen 10 Fragen — wer schafft den höchsten Rekord?'}
            </p>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end justify-end gap-2 sm:gap-1">
            <div className="text-right">
              <div className="text-xs text-text-secondary font-bold uppercase tracking-wider">Rekord</div>
              <div className="text-2xl sm:text-3xl font-black gradient-text-warm">{dailyChallenge.bestScore.toLocaleString('de-DE')}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-accent-pink group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </NavLink>

      {/* Module grid */}
      <section>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">Module</h2>
          <span className="text-sm text-text-secondary">{modules.length} verfügbar</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <ModuleCard key={m.id} module={m} />
          ))}
        </div>
      </section>

      {/* Aufsatz-Training Card */}
      <NavLink
        to="/aufsatz"
        className="block group relative overflow-hidden card-elevated p-6 sm:p-8 hover:border-pink-500/40 transition-all"
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 0% 50%, rgba(236,72,153,0.25), transparent 60%), radial-gradient(circle at 100% 100%, rgba(168,85,247,0.2), transparent 60%)',
          }}
        />
        <div className="relative grid sm:grid-cols-[auto_1fr_auto] items-center gap-5 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-xl shadow-pink-500/30 group-hover:scale-110 transition-transform">
            <PenLine className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-300 uppercase tracking-widest mb-1">
              <Sparkles className="w-3 h-3" /> Aufsatz-Studio
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
              Schreibe & vergleiche mit Musterlösung
            </h2>
            <p className="text-text-secondary text-sm max-w-2xl">
              Erörterung, Charakterisierung, Inhaltsangabe — schreibe 4–6 Sätze und vergleiche sie
              mit der Musterlösung. Stilistische Mittel werden erklärt.
            </p>
          </div>
          <ArrowRight className="w-6 h-6 text-pink-300 group-hover:translate-x-1 transition-transform" />
        </div>
      </NavLink>

      {/* Repetitor + Wörterbuch (2 columns) */}
      <div className="grid gap-4 sm:grid-cols-2">
        <NavLink
          to="/repetitor"
          className="block group relative overflow-hidden card-elevated p-6 hover:border-purple-500/40 transition-all"
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 100% 0%, rgba(168,85,247,0.4), transparent 60%)',
            }}
          />
          <div className="relative">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 shadow-lg group-hover:scale-110 transition-transform">
              <Repeat className="h-6 w-6 text-purple-300" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-purple-300 uppercase tracking-widest mb-1">
              Spaced Repetition
            </div>
            <h3 className="mb-1 text-xl font-bold text-white">
              Schwache Themen wiederholen
            </h3>
            <p className="text-xs text-slate-400">
              {repTopicCount} Themen mit neuem Fragen-Pool — neue Wörter, andere Inhalte.
            </p>
            <ArrowRight className="absolute right-0 top-0 h-5 w-5 text-purple-300 transition-transform group-hover:translate-x-1" />
          </div>
        </NavLink>

        <NavLink
          to="/woerterbuch"
          className="block group relative overflow-hidden card-elevated p-6 hover:border-emerald-500/40 transition-all"
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 0% 100%, rgba(16,185,129,0.4), transparent 60%)',
            }}
          />
          <div className="relative">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 shadow-lg group-hover:scale-110 transition-transform">
              <BookText className="h-6 w-6 text-emerald-300" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">
              Wörterbuch · Täglich neu
            </div>
            <h3 className="mb-1 text-xl font-bold text-white">
              5 neue Oberstufe-Wörter
            </h3>
            <p className="text-xs text-slate-400">
              Komplexer Wortschatz mit Beispielsatz — jeden Tag andere Wörter.
            </p>
            <ArrowRight className="absolute right-0 top-0 h-5 w-5 text-emerald-300 transition-transform group-hover:translate-x-1" />
          </div>
        </NavLink>
      </div>

      {/* Mock-Prüfung + Achievements (2 columns) */}
      <div className="grid gap-4 sm:grid-cols-2">
        <NavLink
          to="/mock-pruefung"
          className="block group relative overflow-hidden card-elevated p-6 hover:border-purple-500/40 transition-all"
        >
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 0% 0%, rgba(168,85,247,0.5), transparent 60%), radial-gradient(circle at 100% 100%, rgba(236,72,153,0.4), transparent 60%)',
            }}
          />
          <div className="relative">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg group-hover:scale-110 transition-transform">
              <Flag className="h-6 w-6 text-white" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-purple-300 uppercase tracking-widest mb-1">
              Mock-Prüfung · 60 min
            </div>
            <h3 className="mb-1 text-xl font-bold text-white">
              Abitur-Simulation
            </h3>
            <p className="text-xs text-slate-400">
              30 Fragen aus allen Modulen unter Zeitdruck. Echtes Prüfungs-Feeling.
            </p>
            <ArrowRight className="absolute right-0 top-0 h-5 w-5 text-purple-300 transition-transform group-hover:translate-x-1" />
          </div>
        </NavLink>

        <NavLink
          to="/achievements"
          className="block group relative overflow-hidden card-elevated p-6 hover:border-yellow-500/40 transition-all"
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 100% 0%, rgba(250,204,21,0.4), transparent 60%)',
            }}
          />
          <div className="relative">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg group-hover:scale-110 transition-transform">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-yellow-300 uppercase tracking-widest mb-1">
              Achievements · {progress.wins} Siege
            </div>
            <h3 className="mb-1 text-xl font-bold text-white">
              Badges & Erfolge
            </h3>
            <p className="text-xs text-slate-400">
              21 Badges warten auf dich — Bronze, Silber, Gold für jede Leistung.
            </p>
            <ArrowRight className="absolute right-0 top-0 h-5 w-5 text-yellow-300 transition-transform group-hover:translate-x-1" />
          </div>
        </NavLink>
      </div>

      {/* Lektüre (full-width) */}
      <NavLink
        to="/lektuere"
        className="block group relative overflow-hidden card-elevated p-6 hover:border-amber-500/40 transition-all"
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 0%, rgba(245,158,11,0.4), transparent 60%), radial-gradient(circle at 100% 100%, rgba(168,85,247,0.3), transparent 60%)',
          }}
        />
        <div className="relative">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 shadow-lg group-hover:scale-110 transition-transform">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-300 uppercase tracking-widest mb-1">
            Lektüre · Deutsch-Abitur
          </div>
          <h3 className="mb-1 text-xl font-bold text-white">
            Lektüre-Kanon: Kafka · Borchert · Brecht · Mann
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl">
            4 zentrale Autoren mit Biografie, Hauptwerken, Themen, Stilmitteln und typischen Abiturfragen. Pflichtlektüre fürs Zentralabitur NRW.
          </p>
          <ArrowRight className="absolute right-0 top-0 h-5 w-5 text-amber-300 transition-transform group-hover:translate-x-1" />
        </div>
      </NavLink>

      {/* Mediation (full-width) */}
      <NavLink
        to="/mediation"
        className="block group relative overflow-hidden card-elevated p-6 hover:border-blue-500/40 transition-all"
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 70% 0%, rgba(59,130,246,0.4), transparent 60%), radial-gradient(circle at 0% 100%, rgba(168,85,247,0.3), transparent 60%)',
          }}
        />
        <div className="relative">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg group-hover:scale-110 transition-transform">
            <Languages className="h-6 w-6 text-white" />
          </div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">
            Mediation · English Abitur
          </div>
          <h3 className="mb-1 text-xl font-bold text-white">
            Mediation: 6 Themen, 3 Level, Musterlösung
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl">
            Deutsche Originaltexte ins Englische übersetzen — Bildung, Umwelt, Geschichte, Politik, Kultur, Soziales. Mit Vokabelliste, Tipps, NRW-Bewertungskriterien.
          </p>
          <ArrowRight className="absolute right-0 top-0 h-5 w-5 text-blue-300 transition-transform group-hover:translate-x-1" />
        </div>
      </NavLink>

      {/* EF-Vorbereitung (full-width) */}
      <NavLink
        to="/ef-vorbereitung"
        className="block group relative overflow-hidden card-elevated p-6 hover:border-emerald-500/40 transition-all"
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 0% 0%, rgba(34,197,94,0.4), transparent 60%), radial-gradient(circle at 100% 100%, rgba(245,158,11,0.3), transparent 60%)',
          }}
        />
        <div className="relative">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-amber-500 shadow-lg group-hover:scale-110 transition-transform">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-1">
            EF-Vorbereitung · 10. Klasse Wiederholung
          </div>
          <h3 className="mb-1 text-xl font-bold text-white">
            Fit für die 11. Klasse: 3× 12-Minuten-Quiz
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl">
            36 kurze Fragen zu Deutsch (Konnektoren, Konjunktiv, Adjektivdeklination), Mathe (Ableitung, Gleichungen, pq-Formel) und English (Tenses, Conditionals, Passive). Sofortiges Feedback mit Themen-Empfehlungen.
          </p>
          <ArrowRight className="absolute right-0 top-0 h-5 w-5 text-emerald-300 transition-transform group-hover:translate-x-1" />
        </div>
      </NavLink>
    </div>
  );
}

function StatTile({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="card p-3 sm:p-4">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs text-text-secondary font-semibold uppercase tracking-wider mb-0.5">{label}</div>
      <div className="text-xl sm:text-2xl font-black gradient-text-warm">{value}</div>
    </div>
  );
}
