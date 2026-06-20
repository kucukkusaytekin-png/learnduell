import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Save, Trash2, Volume2, VolumeX, Check } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { isTTSSupported, speak, stopSpeaking } from '../lib/tts';

const AVATARS = [
  '👩‍🎓', '👨‍🎓', '🧑‍🎓', '👧', '👦', '👩', '👨', '🧑',
  '🦊', '🐱', '🐼', '🐯', '🦁', '🐸', '🦄', '🐲',
  '⚔️', '🏆', '🚀', '🌟', '🔥', '💎', '🎯', '🧠',
];

export default function Profile() {
  const navigate = useNavigate();
  const profile = useGameStore((s) => s.profile);
  const setUserName = useGameStore((s) => s.setUserName);
  const setAvatar = useGameStore((s) => s.setAvatar);
  const setTtsEnabled = useGameStore((s) => s.setTtsEnabled);
  const resetAll = useGameStore((s) => s.resetAll);
  const [nameDraft, setNameDraft] = useState(profile.userName);
  const [saved, setSaved] = useState(false);

  function save() {
    const trimmed = nameDraft.trim();
    if (trimmed) {
      setUserName(trimmed);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }
  }

  async function previewVoice() {
    if (!profile.ttsEnabled) return;
    await speak('Hallo, ich bin ' + profile.userName + '. Bereit für das Duell?', { lang: 'de-DE' });
  }

  function handleReset() {
    if (confirm('Willst du wirklich alle Daten zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      resetAll();
      navigate('/');
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Profil</h1>
        <p className="text-text-secondary mt-1">
          Wie sollen wir dich nennen? Wähle einen Avatar und stelle die App nach deinem Geschmack ein.
        </p>
      </header>

      {/* Avatar */}
      <section className="card-elevated p-6 sm:p-8">
        <h2 className="font-bold text-lg mb-4">Avatar</h2>
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 sm:gap-3">
          {AVATARS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setAvatar(emoji)}
              className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all ${
                profile.avatarEmoji === emoji
                  ? 'bg-gradient-to-br from-accent-primary/30 to-accent-cyan/30 border-2 border-accent-primary scale-105'
                  : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
              }`}
              aria-label={`Avatar ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </section>

      {/* Name */}
      <section className="card-elevated p-6 sm:p-8">
        <h2 className="font-bold text-lg mb-4">Name</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && save()}
            maxLength={20}
            className="flex-1 px-4 py-3 rounded-xl bg-bg-base border border-border-default text-text-primary font-semibold focus:outline-none focus:border-accent-primary transition-colors"
            placeholder="Dein Name"
          />
          <button onClick={save} className="btn-primary inline-flex items-center gap-2">
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Gespeichert' : 'Speichern'}
          </button>
        </div>
      </section>

      {/* TTS */}
      <section className="card-elevated p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="font-bold text-lg flex items-center gap-2">
              {profile.ttsEnabled ? <Volume2 className="w-5 h-5 text-accent-cyan" /> : <VolumeX className="w-5 h-5 text-text-muted" />}
              Vorlesen
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Liest Fragen und Erklärungen auf Deutsch vor — hilft beim Üben von Aussprache.
            </p>
          </div>
          <button
            onClick={() => setTtsEnabled(!profile.ttsEnabled)}
            className={`relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ${
              profile.ttsEnabled ? 'bg-accent-primary' : 'bg-white/10'
            }`}
            aria-label="TTS Toggle"
          >
            <span
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                profile.ttsEnabled ? 'translate-x-7' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
        {!isTTSSupported() && (
          <div className="p-3 rounded-lg bg-accent-amber/10 border border-accent-amber/30 text-sm text-accent-amber">
            Dein Browser unterstützt leider keine Vorlese-Funktion.
          </div>
        )}
        {isTTSSupported() && profile.ttsEnabled && (
          <button onClick={previewVoice} className="btn-ghost inline-flex items-center gap-2 text-sm">
            <Volume2 className="w-4 h-4" /> Stimme testen
          </button>
        )}
      </section>

      {/* Reset */}
      <section className="card p-6 border-accent-red/30 bg-accent-red/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-bold text-lg text-accent-red">Daten zurücksetzen</h2>
            <p className="text-sm text-text-secondary mt-1">
              Löscht XP, Streak, Liga-Fortschritt, Bibliothek und alle Statistiken.
            </p>
          </div>
          <button onClick={handleReset} className="btn-ghost inline-flex items-center gap-2 text-accent-red border-accent-red/30">
            <Trash2 className="w-4 h-4" /> Zurücksetzen
          </button>
        </div>
      </section>
    </div>
  );
}
