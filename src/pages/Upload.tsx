import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Image as ImageIcon, X, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { extractPdfText } from '../lib/pdfParser';
import { extractImageText } from '../lib/ocr';
import { extractKeywords } from '../lib/keywords';
import clsx from 'clsx';

type Stage = 'idle' | 'reading' | 'extracting' | 'done';

export default function UploadPage() {
  const navigate = useNavigate();
  const addDoc = useGameStore((s) => s.addUploadedDoc);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stage, setStage] = useState<Stage>('idle');
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/');

    if (!isPdf && !isImage) {
      setError('Bitte lade eine PDF-Datei oder ein Bild hoch (JPG, PNG).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Datei zu groß. Maximal 10 MB.');
      return;
    }

    setStage('reading');
    setProgress(10);
    setProgressLabel(isPdf ? 'PDF wird gelesen…' : 'Bild wird geladen…');

    try {
      let text = '';
      if (isPdf) {
        text = await extractPdfText(file, (p) => {
          setProgress(10 + p * 0.7);
          setProgressLabel(`PDF Seite ${Math.floor(p * 5) + 1} wird gelesen…`);
        });
      } else {
        setStage('extracting');
        setProgress(50);
        setProgressLabel('Text wird erkannt (OCR)…');
        text = await extractImageText(file, (p) => {
          setProgress(50 + p * 0.4);
          setProgressLabel(`OCR: ${Math.round(p * 100)}%`);
        });
      }

      setStage('extracting');
      setProgress(95);
      setProgressLabel('Schlüsselbegriffe werden extrahiert…');

      const tags = extractKeywords(text);

      addDoc({
        id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: file.name,
        type: isPdf ? 'pdf' : 'image',
        uploadedAt: new Date().toISOString(),
        textContent: text.slice(0, 5000),
        tags,
        sizeKb: Math.round(file.size / 1024),
      });

      setStage('done');
      setProgress(100);
      setProgressLabel('Fertig!');

      setTimeout(() => navigate('/library'), 800);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || 'Datei konnte nicht gelesen werden.');
      setStage('idle');
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <header>
        <NavLink to="/library" className="text-sm text-text-secondary hover:text-text-primary inline-flex items-center gap-1 mb-3">
          ← Zurück zur Bibliothek
        </NavLink>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Dokument hochladen</h1>
        <p className="text-text-secondary mt-1">
          Lade ein Arbeitsblatt oder Foto hoch. Wir lesen den Text automatisch aus und schlagen Schlüsselbegriffe vor.
        </p>
      </header>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={clsx(
          'card-elevated p-10 sm:p-16 text-center border-2 border-dashed transition-all cursor-pointer',
          dragOver ? 'border-accent-primary bg-accent-primary/5' : 'border-border-default hover:border-border-strong',
          stage !== 'idle' && 'pointer-events-none'
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        {stage === 'idle' && (
          <>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-primary/20 to-accent-cyan/20 border border-accent-primary/30 mb-6">
              <Upload className="w-10 h-10 text-accent-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Datei hier ablegen oder klicken</h2>
            <p className="text-text-secondary text-sm mb-4">PDF oder Bild (JPG, PNG) · max. 10 MB</p>
            <div className="flex items-center justify-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> PDF</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><ImageIcon className="w-4 h-4" /> JPG / PNG</span>
            </div>
          </>
        )}

        {stage !== 'idle' && (
          <div className="space-y-4">
            {stage === 'done' ? (
              <CheckCircle2 className="w-16 h-16 mx-auto text-accent-green" />
            ) : (
              <Loader2 className="w-16 h-16 mx-auto text-accent-primary animate-spin" />
            )}
            <div className="text-lg font-bold">{progressLabel}</div>
            <div className="max-w-md mx-auto">
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-primary to-accent-cyan rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-text-muted mt-2">{Math.round(progress)}%</div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="card p-4 border-accent-red/40 bg-accent-red/10 flex items-start gap-3">
          <X className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-accent-red mb-1">Fehler</div>
            <div className="text-sm text-text-secondary">{error}</div>
          </div>
        </div>
      )}

      <section className="card p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-accent-amber" />
          <h3 className="font-bold">Was passiert nach dem Upload?</h3>
        </div>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-0.5">▸</span>
            <span>Der Text wird automatisch ausgelesen (PDF direkt, Bilder per OCR).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-0.5">▸</span>
            <span>Wichtige Begriffe werden als Tags erkannt — so findest du das Dokument später schnell wieder.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-cyan mt-0.5">▸</span>
            <span>Im nächsten Schritt kannst du aus dem Dokument eigene Quiz-Fragen erstellen oder den Text zum Lernen verwenden.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

// Fix import
import { NavLink } from 'react-router-dom';
