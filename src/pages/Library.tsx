import { NavLink } from 'react-router-dom';
import { Upload, FileText, Image as ImageIcon, Trash2, Clock, Sparkles } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export default function Library() {
  const docs = useGameStore((s) => s.uploadedDocs);
  const removeDoc = useGameStore((s) => s.removeUploadedDoc);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Bibliothek</h1>
          <p className="text-text-secondary mt-1">
            Hochgeladene Arbeitsblätter, Fotos und Übungsmaterial — alles an einem Ort.
          </p>
        </div>
        <NavLink to="/upload" className="btn-primary inline-flex items-center gap-2">
          <Upload className="w-5 h-5" /> Neu hochladen
        </NavLink>
      </header>

      {docs.length === 0 ? (
        <div className="card p-10 sm:p-16 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-xl font-bold mb-2">Noch nichts hochgeladen</h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Lade ein Arbeitsblatt als PDF oder Foto hoch. Die App erkennt den Text und schlägt Quiz-Fragen vor.
          </p>
          <NavLink to="/upload" className="btn-primary inline-flex items-center gap-2">
            <Upload className="w-5 h-5" /> Erstes Dokument hochladen
          </NavLink>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map((doc) => (
            <article key={doc.id} className="card p-5 hover:border-border-default transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: doc.type === 'pdf' ? 'rgba(239,68,68,0.15)' : 'rgba(6,182,212,0.15)',
                    color: doc.type === 'pdf' ? '#fca5a5' : '#67e8f9',
                  }}
                >
                  {doc.type === 'pdf' ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                </div>
                <button
                  onClick={() => removeDoc(doc.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-accent-red/15 text-text-muted hover:text-accent-red"
                  aria-label="Löschen"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-sm mb-1 line-clamp-2">{doc.name}</h3>
              <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(doc.uploadedAt).toLocaleDateString('de-DE')}
                </span>
                <span>·</span>
                <span>{doc.sizeKb} KB</span>
              </div>
              {doc.tags && doc.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {doc.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-border-default text-text-secondary font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {doc.textContent && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-accent-cyan font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Text anzeigen
                  </summary>
                  <p className="mt-2 text-text-secondary leading-relaxed line-clamp-4 font-mono">
                    {doc.textContent.slice(0, 300)}{doc.textContent.length > 300 ? '…' : ''}
                  </p>
                </details>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
