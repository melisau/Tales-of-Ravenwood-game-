import { useEffect, useRef, useState } from 'react';
import { AMBIENCE_TRACKS, BACKGROUND_TRACK } from '../../../shared/audio';
import { GamePhase, type PublicRoomState } from '../../../shared/types';
import { ReadingControl } from './ReadingControl';

export function StoryAudio({ room }: { room: PublicRoomState | null }) {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [error, setError] = useState<string | null>(null);
  const background = useRef<HTMLAudioElement>(null);
  const atmosphere = useRef<HTMLAudioElement>(null);
  const active = !!room && room.phase !== GamePhase.LOBBY && room.phase !== GamePhase.GAME_OVER;
  const cue = active ? room.scene?.ambience ?? null : null;
  const track = cue ? AMBIENCE_TRACKS[cue] : null;
  const base = `${import.meta.env.BASE_URL}audio/`;

  useEffect(() => {
    const audio = background.current;
    if (!audio) return;
    let cancelled = false;
    audio.volume = volume * 0.32;
    if (enabled && active) {
      void audio.play().catch((e: unknown) => {
        if (!cancelled && !(e instanceof DOMException && e.name === 'AbortError')) setError('Ses başlatılamadı. Sesi kapatıp tekrar açmayı dene.');
      });
    } else audio.pause();
    return () => { cancelled = true; audio.pause(); };
  }, [active, enabled, volume]);

  useEffect(() => {
    const audio = atmosphere.current;
    if (!audio) return;
    let cancelled = false;
    audio.volume = volume * (track?.gain ?? 0);
    if (enabled && active && track) {
      void audio.play().catch((e: unknown) => {
        if (!cancelled && !(e instanceof DOMException && e.name === 'AbortError')) setError('Sahne sesi başlatılamadı. Sesi kapatıp tekrar açmayı dene.');
      });
    } else audio.pause();
    return () => { cancelled = true; audio.pause(); };
  }, [active, enabled, volume, track]);

  return (
    <section aria-label="Hikâye sesleri" className="relative z-20 border-b border-[#c9a24a]/20 bg-[#160b1d] px-4 py-3 text-[#e4d6b8]">
      <div className="mx-auto flex max-w-lg flex-wrap items-center gap-3">
        <button type="button" aria-pressed={enabled} onClick={() => { setError(null); setEnabled(!enabled); }} className="rounded-lg border border-[#c9a24a]/50 px-3 py-2 text-sm text-[#f3dfa6]">{enabled ? 'Sesi kapat' : 'Sesi aç'}</button>
        <ReadingControl />
        <label className="flex w-full items-center gap-3 text-sm">Ses seviyesi
          <input aria-label="Ses seviyesi" type="range" min="0" max="100" value={Math.round(volume * 100)} onChange={(e) => setVolume(Number(e.target.value) / 100)} className="min-w-0 flex-1 accent-[#c9a24a]" />
        </label>
        <p className="w-full text-xs text-[#c7b9d0]">{active ? `Genel müzik: Cadılar Bayramı çanları${track ? ` · ${track.label}` : ''}` : 'Müzik macera başlayınca çalar.'} Aynı masada tek telefondan açmanız önerilir.</p>
        {error && <p role="status" className="w-full text-xs text-[#ff9a9e]">{error}</p>}
      </div>
      <audio ref={background} data-track="background" src={base + BACKGROUND_TRACK} loop preload="none" onError={() => enabled && setError('Genel müzik dosyası yüklenemedi.')} />
      <audio ref={atmosphere} data-track="ambience" src={track ? base + track.file : undefined} loop preload="none" onError={() => enabled && track && setError('Sahne sesi yüklenemedi.')} />
    </section>
  );
}
