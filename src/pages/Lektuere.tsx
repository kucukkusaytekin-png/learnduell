import { NavLink } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, MapPin, Quote } from 'lucide-react';
import { lektuereModule } from '../data/lektuere';

const accentByAuthor: Record<string, { ring: string; bg: string; text: string; border: string }> = {
  kafka: { ring: 'from-amber-500/30', bg: 'from-amber-500/10 to-orange-500/10', text: 'text-amber-200', border: 'border-amber-500/30' },
  borchert: { ring: 'from-slate-400/30', bg: 'from-slate-400/10 to-slate-600/10', text: 'text-slate-200', border: 'border-slate-500/30' },
  brecht: { ring: 'from-red-500/30', bg: 'from-red-500/10 to-pink-500/10', text: 'text-red-200', border: 'border-red-500/30' },
  mann: { ring: 'from-emerald-500/30', bg: 'from-emerald-500/10 to-teal-500/10', text: 'text-emerald-200', border: 'border-emerald-500/30' },
};

export default function Lektuere() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <NavLink to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Zurück zum Dashboard
      </NavLink>

      {/* Header */}
      <div className="card-elevated relative overflow-hidden p-8">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 80% 20%, rgba(168,85,247,0.5), transparent 60%), radial-gradient(circle at 20% 80%, rgba(236,72,153,0.4), transparent 60%)',
          }}
        />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300">
            <BookOpen className="h-3.5 w-3.5" />
            Lektüre · Deutsch-Abi
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">Lektüre-Kanon</h1>
          <p className="mb-6 max-w-2xl text-slate-400">
            Vier zentrale Autoren des Deutsch-Abiturs: Werke, Themen, Epochen und typische Abiturfragen. Lerne die Autoren kennen, übe Analyse-Fragen — perfekt vor der Klausur.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon="📚" label="Autoren" value="4" />
            <Stat icon="❓" label="Fragen" value={lektuereModule.topics.reduce((sum, t) => sum + t.questions.length, 0).toString()} />
            <Stat icon="📖" label="Werke" value={lektuereModule.topics.reduce((sum, t) => sum + t.author.hauptwerke.length, 0).toString()} />
            <Stat icon="🎓" label="Abitur-relevant" value="✓" />
          </div>
        </div>
      </div>

      {/* Author cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {lektuereModule.topics.map((topic) => {
          const a = topic.author;
          const accent = accentByAuthor[topic.id] ?? accentByAuthor.kafka;
          return (
            <NavLink
              key={topic.id}
              to={`/lektuere/${topic.id}`}
              className={`group card-elevated relative overflow-hidden p-6 transition-all hover:scale-[1.01] hover:shadow-2xl`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-50 pointer-events-none`}
              />
              <div className="relative">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-wider ${accent.text}`}>
                      {a.lebensdaten}
                    </div>
                    <h2 className="mt-1 text-2xl font-bold text-white">{a.name}</h2>
                  </div>
                  <span className={`rounded-full border ${accent.border} bg-slate-900/40 px-3 py-1 text-xs font-bold ${accent.text}`}>
                    {a.epoche.split('/')[0].trim()}
                  </span>
                </div>

                <div className="mb-4 space-y-1.5 text-sm">
                  <div className="flex items-start gap-2 text-slate-300">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                    <span>{a.herkunft}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                    <span>{a.hauptwerke.length} Hauptwerke</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-300">
                    <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                    <span>{topic.questions.length} Übungsfragen</span>
                  </div>
                </div>

                {/* Themes chips */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {a.themen.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-md bg-slate-800/60 px-2 py-1 text-[10px] font-semibold text-slate-300">
                      {t}
                    </span>
                  ))}
                  {a.themen.length > 3 && (
                    <span className="rounded-md bg-slate-800/40 px-2 py-1 text-[10px] font-semibold text-slate-400">
                      +{a.themen.length - 3}
                    </span>
                  )}
                </div>

                {/* Quote */}
                {a.zitate?.[0] && (
                  <div className={`rounded-lg border ${accent.border} bg-slate-900/40 p-3`}>
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <Quote className="h-3 w-3" /> Zitat
                    </div>
                    <p className="text-sm italic text-slate-200">„{a.zitate[0].text}"</p>
                    <p className={`mt-1 text-[10px] ${accent.text}`}>— {a.zitate[0].werk}</p>
                  </div>
                )}

                <div className={`mt-4 flex items-center justify-end text-sm font-semibold ${accent.text} group-hover:translate-x-1 transition-transform`}>
                  Autor kennenlernen →
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* Hinweis */}
      <div className="card-elevated p-5">
        <h3 className="mb-2 text-sm font-bold text-white">📖 Wie du diese Lektüre nutzt</h3>
        <ul className="space-y-1.5 text-sm text-slate-300">
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> Klick auf einen Autor → Biografie, Werke, Themen, Stilmittel + Übungsfragen</li>
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> Übungsfragen sind im Abitur-Stil: Figur, Motiv, Epoche, Sprache</li>
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> Kombinier mit Aufsatz-Studio für Schreibpraxis</li>
          <li className="flex gap-2"><span className="text-emerald-400">✓</span> Wiederholung über Repetitor (Spaced Repetition)</li>
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
