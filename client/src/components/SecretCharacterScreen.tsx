import { useEffect, useState, type ReactNode } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { useDiceRoll, type DiceOutcome } from '../hooks/useDiceRoll';
import { FONT_BODY, FONT_DISPLAY } from '../ui/kit';
import { ClassEmblem } from './ClassEmblem';
import { isClassId } from '../../../shared/classes';

/**
 * Tales of Ravenwood — Gizli Karakter Ekranı
 * Mobil öncelikli; her oyuncunun kendi telefonunda gördüğü kişisel panel.
 *
 * Tailwind config gerektirmez: renkler arbitrary value, animasyonlar
 * bileşenle birlikte gelen <style> bloğundadır.
 * Long-form reading uses the shared system font and optional larger text size.
 */

export interface SecretCharacterScreenProps {
  characterClass: string; // ör. "Medyum"
  classLogoUrl?: string;
  playerName: string;
  hp: number;
  maxHp: number;
  /** Sunucudan gelen fazın bitiş anı (epoch ms). null = sayaç yok. */
  phaseEndsAt: number | null;
  totalSeconds?: number; // halka dolumu için, varsayılan 90
  serverOffsetMs?: number;
  /** Bu sahnede sınıfa özel gizli ipucu. null = bu sahnede ipucu yok. */
  secretHint: string | null;
  /** Zar sırası bu oyuncuda mı? */
  canRoll: boolean;
  /** Zar sırası başkasındaysa adı (ör. "Dedektif · Ayşe") */
  rollerLabel?: string;
  /** Ölçeklenmiş DC — butonda gösterilir */
  dc?: number;
  actionLabel?: string;
  /** Sunucuya 'dice:roll' gönderip sonucu döndürür. */
  requestRoll: () => Promise<DiceOutcome>;
  onRollSettled?: (o: DiceOutcome) => void;
  /** İpucu kartının üstünde gösterilen içerik (ör. sahne metni) */
  sceneSlot?: ReactNode;
  /** İpucu kartının altında gösterilen içerik (ör. seçenekler, sonuç) */
  children?: ReactNode;
  /** Zar alanı gösterilsin mi (varsayılan true) */
  showDice?: boolean;
  /** Değiştiğinde ipucu kartı yeniden mühürlenir (ör. sahne id'si) */
  hintKey?: string;
  /** Değiştiğinde zar alanı sıfırlanır (ör. sahne + aksiyon id'si) */
  diceKey?: string;
  /** Zarı başkası attığında izleyicilere gösterilecek animasyon/sonuç */
  spectator?: { rolling: boolean; outcome: DiceOutcome | null };
}


export default function SecretCharacterScreen(props: SecretCharacterScreenProps) {
  const {
    characterClass,
    classLogoUrl,
    playerName,
    hp,
    maxHp,
    phaseEndsAt,
    totalSeconds = 90,
    serverOffsetMs = 0,
    secretHint,
    canRoll,
    rollerLabel,
    dc,
    actionLabel,
    requestRoll,
    onRollSettled,
    sceneSlot,
    children,
    showDice = true,
    hintKey,
    diceKey,
    spectator,
  } = props;

  return (
    <div
      className="relative min-h-dvh w-full overflow-hidden bg-[#0d0712] text-[#efe3c8] antialiased"
      style={FONT_BODY}
    >
      <RavenwoodStyles />
      {/* Atmosfer: vinyet + kan kırmızısı alt ışık + sis */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#3a1747_0%,#170b1f_45%,#0d0712_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(122,14,26,0.35),transparent)]" />
      <div aria-hidden className="rw-fog pointer-events-none absolute inset-0 opacity-30" />

      <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col gap-5 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:max-w-lg">
        <Header
          characterClass={characterClass}
          logoUrl={classLogoUrl}
          playerName={playerName}
          hp={hp}
          maxHp={maxHp}
          phaseEndsAt={phaseEndsAt}
          totalSeconds={totalSeconds}
          serverOffsetMs={serverOffsetMs}
        />

        {sceneSlot}

        <SecretHintCard key={hintKey} hint={secretHint} />

        {children}

        <div className="flex-1" />

        {showDice && (
        <DiceArea
          key={diceKey}
          spectator={spectator}
          canRoll={canRoll}
          rollerLabel={rollerLabel}
          dc={dc}
          actionLabel={actionLabel}
          requestRoll={requestRoll}
          onSettled={onRollSettled}
        />
        )}
      </main>
    </div>
  );
}

// ═══════════════════════════════ Üst Kısım ═══════════════════════════════

function Header(p: {
  characterClass: string;
  logoUrl?: string;
  playerName: string;
  hp: number;
  maxHp: number;
  phaseEndsAt: number | null;
  totalSeconds: number;
  serverOffsetMs: number;
}) {
  return (
    <header className="flex items-center gap-3 rounded-2xl border border-[#c9a24a]/30 bg-[#1b0f24]/80 p-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur-sm">
      {/* Sınıf mührü */}
      <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[#c9a24a] bg-[radial-gradient(circle_at_35%_30%,#4b2160,#1a0c22)] shadow-[0_0_18px_-4px_rgba(201,162,74,0.7),inset_0_0_12px_rgba(0,0,0,0.8)]">
        {p.logoUrl ? (
          <img src={p.logoUrl} alt="" className="h-9 w-9 object-contain" />
        ) : (
          <ClassEmblem classId={isClassId(p.characterClass) ? p.characterClass : null} className="h-10 w-10" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] uppercase tracking-[0.25em] text-[#c9a24a]/80">{p.playerName}</p>
        <h1 className="truncate text-xl font-bold tracking-wide text-[#f3dfa6]" style={FONT_DISPLAY}>
          {p.characterClass}
        </h1>
        <HpBar hp={p.hp} maxHp={p.maxHp} />
      </div>

      {p.phaseEndsAt !== null && <CountdownRing endsAt={p.phaseEndsAt} totalSeconds={p.totalSeconds} serverOffsetMs={p.serverOffsetMs} />}
    </header>
  );
}

function HpBar({ hp, maxHp }: { hp: number; maxHp: number }) {
  const pct = maxHp > 0 ? Math.max(0, Math.min(100, (hp / maxHp) * 100)) : 0;
  const critical = pct <= 30;
  return (
    <div className="mt-1.5">
      <div className="mb-0.5 flex items-baseline justify-between text-[13px]">
        <span className="uppercase tracking-widest text-[#b98a8a]">Can</span>
        <span className={`tabular-nums ${critical ? 'text-[#ff6b6b]' : 'text-[#efe3c8]'}`}>
          {hp} / {maxHp}
        </span>
      </div>
      <div
        className="relative h-2.5 overflow-hidden rounded-full border border-[#5a1a22] bg-[#2a0d12]"
        role="meter"
        aria-label="Kalan can"
        aria-valuemin={0}
        aria-valuemax={maxHp}
        aria-valuenow={hp}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r from-[#5c0612] via-[#a3131f] to-[#d9303a] transition-[width] duration-700 ease-out ${critical ? 'rw-heartbeat' : ''}`}
          style={{ width: `${pct}%` }}
        />
        {/* Cam parlaması */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-white/10" />
      </div>
    </div>
  );
}

function CountdownRing({ endsAt, totalSeconds, serverOffsetMs }: { endsAt: number | null; totalSeconds: number; serverOffsetMs: number }) {
  const secondsLeft = useCountdown(endsAt, serverOffsetMs);
  const R = 24;
  const C = 2 * Math.PI * R;
  const ratio = endsAt === null ? 0 : Math.min(1, secondsLeft / totalSeconds);
  const urgent = endsAt !== null && secondsLeft <= 15;
  const mm = Math.floor(secondsLeft / 60);
  const ss = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div
      className={`relative grid h-16 w-16 shrink-0 place-items-center ${urgent ? 'rw-tremble' : ''}`}
      role="timer"
      aria-live={urgent ? 'assertive' : 'off'}
      aria-label={`Kalan süre ${secondsLeft} saniye`}
    >
      <svg viewBox="0 0 60 60" className="absolute inset-0 -rotate-90">
        <circle cx="30" cy="30" r={R} fill="#140a1a" stroke="#3b2148" strokeWidth="5" />
        <circle
          cx="30"
          cy="30"
          r={R}
          fill="none"
          stroke={urgent ? '#e0303c' : '#c9a24a'}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - ratio)}
          style={{ transition: 'stroke-dashoffset 0.25s linear, stroke 0.4s' }}
        />
      </svg>
      <span
        className={`relative text-sm font-bold tabular-nums ${urgent ? 'text-[#ff5a5f] drop-shadow-[0_0_6px_rgba(224,48,60,0.9)]' : 'text-[#f3dfa6]'}`}
        style={FONT_DISPLAY}
      >
        {endsAt === null ? '—' : `${mm}:${ss}`}
      </span>
    </div>
  );
}

// ═══════════════════════════════ Gizli İpucu ═══════════════════════════════

function SecretHintCard({ hint }: { hint: string | null }) {
  const [revealed, setRevealed] = useState(false);
  const hasHint = hint !== null && hint.trim().length > 0;

  return (
    <section aria-labelledby="secret-hint-title" className="relative">
      <div className={`rw-glow-border rounded-2xl p-[1.5px] ${hasHint && !revealed ? 'rw-glow-anim' : ''}`}>
        <div className="relative overflow-hidden rounded-[15px] bg-[#f3e6c9] text-[#2b1a10]">
          {/* Parşömen dokusu */}

          <div className="relative p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 id="secret-hint-title" className="text-sm font-bold uppercase tracking-[0.2em] text-[#5c0612]" style={FONT_DISPLAY}>
                Gizli İpucu
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#5c0612]/40 px-2 py-0.5 text-[12px] uppercase tracking-widest text-[#5c0612]">
                <LockIcon open={revealed} /> Sadece sen
              </span>
            </div>

            {!hasHint ? (
              <p className="mt-3 text-[17px] not-italic leading-relaxed text-[#4a3424]">
                Bu sahnede sezgilerin sessiz. Diğerlerini dinle — belki onlar senin göremediğini görüyor.
              </p>
            ) : (
              <div className="relative mt-3 min-h-[7.5rem]">
                <p
                  className={`rw-copy transition-[filter,opacity] duration-500 ${revealed ? 'opacity-100 blur-0' : 'select-none opacity-60 blur-[7px]'}`}
                  aria-hidden={!revealed}
                >
                  {hint}
                </p>

                {!revealed && (
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="absolute inset-0 grid place-items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5c0612]"
                    aria-label="Mührü kır ve ipucunu göster"
                  >
                    <span className="flex flex-col items-center gap-2">
                      <WaxSeal />
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5c0612]" style={FONT_DISPLAY}>
                        Mührü kırmak için dokun
                      </span>
                    </span>
                  </button>
                )}
              </div>
            )}

            <div className="mt-3 flex items-start gap-2 border-t border-dashed border-[#5c0612]/30 pt-3">
              <span aria-hidden className="mt-0.5 text-[#7a0e1a]">✦</span>
              <p className="text-[14px] leading-snug text-[#4a3424]">
                Masadaki arkadaşlarınla paylaşabilir veya saklayabilirsin.
              </p>
              {hasHint && revealed && (
                <button
                  type="button"
                  onClick={() => setRevealed(false)}
                  className="ml-auto shrink-0 rounded-md border border-[#5c0612]/40 px-2 py-1 text-[13px] font-semibold uppercase tracking-wider text-[#5c0612] active:scale-95"
                >
                  Gizle
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WaxSeal() {
  return (
    <span className="rw-seal relative grid h-16 w-16 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#c2283a,#7a0e1a_55%,#4a0610)] shadow-[0_4px_10px_rgba(60,0,10,0.6),inset_0_-3px_6px_rgba(0,0,0,0.45),inset_0_3px_6px_rgba(255,180,180,0.25)]">
      <span className="text-2xl text-[#f0c6c6]/90 drop-shadow" style={FONT_DISPLAY}>
        R
      </span>
    </span>
  );
}

function LockIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d={open ? 'M5 7V5a3 3 0 0 1 5.6-1.5' : 'M5 7V5a3 3 0 0 1 6 0v2'} />
    </svg>
  );
}

// ═══════════════════════════════ Zar Alanı ═══════════════════════════════

function DiceArea(p: {
  spectator?: { rolling: boolean; outcome: DiceOutcome | null };
  canRoll: boolean;
  rollerLabel?: string;
  dc?: number;
  actionLabel?: string;
  requestRoll: () => Promise<DiceOutcome>;
  onSettled?: (o: DiceOutcome) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const dice = useDiceRoll({
    requestRoll: p.requestRoll,
    onSettle: p.onSettled,
    onError: (e) => setError(e instanceof Error ? e.message : 'Zar atılamadı'),
    onRollStart: () => setError(null),
  });

  // İzleyici modu: zarı başkası atıyor; herkes aynı anda takla ve sonucu görür
  const spectating = dice.phase === 'idle' && !!p.spectator && (p.spectator.rolling || !!p.spectator.outcome);
  const [spinFace, setSpinFace] = useState(20);
  useEffect(() => {
    if (!spectating || !p.spectator?.rolling) return;
    const id = window.setInterval(() => setSpinFace(1 + Math.floor(Math.random() * 20)), 90);
    return () => window.clearInterval(id);
  }, [spectating, p.spectator?.rolling]);
  const specRolling = spectating && !!p.spectator?.rolling;
  const o = dice.outcome ?? (spectating && !specRolling ? p.spectator!.outcome : null);
  const shownFace = dice.phase !== 'idle' ? dice.face : specRolling ? spinFace : o ? o.roll : dice.face;
  const isRolling = dice.isRolling || specRolling;
  const tone =
    o?.critical === 'NAT20'
      ? 'gold'
      : o?.critical === 'NAT1'
        ? 'doom'
        : o
          ? o.success
            ? 'win'
            : 'lose'
          : 'neutral';

  const disabled = !p.canRoll || dice.isRolling || dice.phase === 'settled' || spectating;

  return (
    <section
      aria-label="Zar atma alanı"
      className="rounded-3xl border border-[#c9a24a]/25 bg-[#160b1d]/85 p-4 shadow-[0_-10px_40px_-20px_rgba(122,14,26,0.8)] backdrop-blur-sm"
    >
      {p.actionLabel && (
        <p className="mb-3 text-center text-[14px] not-italic leading-snug text-[#d9c9a6]/85">“{p.actionLabel}”</p>
      )}

      <div className="flex items-center justify-center gap-5">
        <D20 face={shownFace} rolling={isRolling} tone={isRolling ? 'neutral' : tone} />
        <div className="min-w-[5.5rem] text-left" aria-live="polite">
          {p.dc !== undefined && (
            <p className="text-[13px] uppercase tracking-[0.25em] text-[#c9a24a]/80">
              Zorluk <span className="text-lg font-bold text-[#f3dfa6]" style={FONT_DISPLAY}>{p.dc}</span>
            </p>
          )}
          {o && !isRolling && (
            <div className="mt-1">
              <p className="text-sm tabular-nums text-[#efe3c8]">
                {o.roll}
                {o.bonus > 0 && <span className="text-[#c9a24a]"> + {o.bonus}</span>} = <b>{o.total}</b>
              </p>
              <p
                className={`text-base font-bold uppercase tracking-widest ${
                  tone === 'gold' ? 'text-[#ffd66b]' : tone === 'win' ? 'text-[#9be29b]' : 'text-[#ff5a5f]'
                }`}
                style={FONT_DISPLAY}
              >
                {tone === 'gold' ? 'Kader seni seçti!' : tone === 'doom' ? 'Lanetli zar!' : o.success ? 'Başarı' : 'Başarısız'}
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => void dice.roll()}
        disabled={disabled}
        className={`group relative mt-4 w-full overflow-hidden rounded-2xl px-6 py-4 text-lg font-bold uppercase tracking-[0.2em] transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c66a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#160b1d] ${
          disabled
            ? 'cursor-not-allowed border border-[#3b2148] bg-[#211029] text-[#8d7a96]'
            : 'border border-[#e8c66a]/70 bg-gradient-to-b from-[#9e1424] to-[#5c0612] text-[#fbe7b0] shadow-[0_0_24px_-4px_rgba(224,48,60,0.75),inset_0_1px_0_rgba(255,220,180,0.35)]'
        }`}
        style={FONT_DISPLAY}
      >
        {!disabled && <span aria-hidden className="rw-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-white/20" />}
        <span className="relative">
          {isRolling
            ? 'Kader dönüyor…'
            : dice.phase === 'settled' || o
              ? 'Zar atıldı'
              : p.canRoll
                ? 'D20 At'
                : 'Sıra sende değil'}
        </span>
      </button>

      {!p.canRoll && dice.phase === 'idle' && !o && !isRolling && p.rollerLabel && (
        <p className="mt-2 text-center text-xs text-[#c7b9d0]">Zarı {p.rollerLabel} atacak. Masaya bak, nefesini tut.</p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-center text-xs text-[#ff7a7f]">
          {error}
        </p>
      )}
    </section>
  );
}

/** SVG d20 — dış altıgen siluet + ön yüz üçgeni. `rolling` iken takla atar. */
function D20({ face, rolling, tone }: { face: number; rolling: boolean; tone: 'gold' | 'doom' | 'win' | 'lose' | 'neutral' }) {
  const palette = {
    neutral: { fill: '#2a1235', stroke: '#c9a24a', text: '#f3dfa6', glow: 'rgba(201,162,74,0.45)' },
    win: { fill: '#173022', stroke: '#9be29b', text: '#e6ffe6', glow: 'rgba(155,226,155,0.55)' },
    lose: { fill: '#3a0d14', stroke: '#e0303c', text: '#ffd9db', glow: 'rgba(224,48,60,0.55)' },
    gold: { fill: '#3d2a06', stroke: '#ffd66b', text: '#fff4cf', glow: 'rgba(255,214,107,0.9)' },
    doom: { fill: '#120306', stroke: '#7a0e1a', text: '#ff5a5f', glow: 'rgba(122,14,26,0.9)' },
  }[tone];

  return (
    <div
      className={`relative h-28 w-28 shrink-0 ${rolling ? 'rw-tumble' : tone !== 'neutral' ? 'rw-land' : 'rw-idle'}`}
      style={{ filter: `drop-shadow(0 0 14px ${palette.glow})` }}
      aria-label={`D20 zarı: ${face}`}
      role="img"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <polygon points="50,3 93,27 93,73 50,97 7,73 7,27" fill={palette.fill} stroke={palette.stroke} strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="50,22 78,68 22,68" fill="rgba(255,255,255,0.05)" stroke={palette.stroke} strokeWidth="1.5" strokeLinejoin="round" />
        <g stroke={palette.stroke} strokeWidth="1" opacity="0.55">
          <line x1="50" y1="3" x2="50" y2="22" />
          <line x1="93" y1="27" x2="78" y2="68" />
          <line x1="7" y1="27" x2="22" y2="68" />
          <line x1="93" y1="27" x2="50" y2="22" />
          <line x1="7" y1="27" x2="50" y2="22" />
          <line x1="93" y1="73" x2="78" y2="68" />
          <line x1="7" y1="73" x2="22" y2="68" />
          <line x1="50" y1="97" x2="78" y2="68" />
          <line x1="50" y1="97" x2="22" y2="68" />
        </g>
        <text
          x="50"
          y="58"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={face >= 10 ? 22 : 24}
          fontWeight="700"
          fill={palette.text}
          style={FONT_DISPLAY}
        >
          {face}
        </text>
      </svg>
    </div>
  );
}

// ═══════════════════════════════ Animasyonlar ═══════════════════════════════

function RavenwoodStyles() {
  return (
    <style>{`
      @keyframes rw-glow { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      .rw-glow-border { background: linear-gradient(120deg,#c9a24a33,#c9a24a55,#7a0e1a55,#c9a24a33); }
      .rw-glow-anim { background: linear-gradient(120deg,#c9a24a,#7a0e1a,#5b2a86,#e8c66a,#7a0e1a); background-size: 300% 300%;
        animation: rw-glow 4s ease-in-out infinite; box-shadow: 0 0 22px -6px rgba(232,198,106,.65); border-radius: 1rem; }
      @keyframes rw-seal { 0%,100% { transform: scale(1) rotate(-4deg); } 50% { transform: scale(1.06) rotate(3deg); } }
      .rw-seal { animation: rw-seal 2.6s ease-in-out infinite; }
      @keyframes rw-heartbeat { 0%,100% { filter: brightness(1); } 15% { filter: brightness(1.6); } 30% { filter: brightness(1); } 45% { filter: brightness(1.4); } }
      .rw-heartbeat { animation: rw-heartbeat 1.1s ease-in-out infinite; }
      @keyframes rw-tremble { 0%,100% { transform: translate(0,0); } 25% { transform: translate(-1px,1px); } 50% { transform: translate(1px,-1px); } 75% { transform: translate(-1px,-1px); } }
      .rw-tremble { animation: rw-tremble .18s linear infinite; }
      @keyframes rw-tumble { 0% { transform: rotate(0) scale(1); } 25% { transform: rotate(140deg) scale(.88) translateY(-6px); }
        50% { transform: rotate(260deg) scale(1.05); } 75% { transform: rotate(330deg) scale(.92) translateY(-3px); } 100% { transform: rotate(360deg) scale(1); } }
      .rw-tumble { animation: rw-tumble .55s cubic-bezier(.4,.1,.3,1) infinite; }
      @keyframes rw-land { 0% { transform: scale(1.25) rotate(-8deg); } 60% { transform: scale(.95) rotate(2deg); } 100% { transform: scale(1) rotate(0); } }
      .rw-land { animation: rw-land .45s ease-out both; }
      @keyframes rw-idle { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-4px) rotate(2deg); } }
      .rw-idle { animation: rw-idle 3.2s ease-in-out infinite; }
      @keyframes rw-shine { 0% { left: -35%; } 60%,100% { left: 120%; } }
      .rw-shine { animation: rw-shine 2.8s ease-in-out infinite; }
      @keyframes rw-fog { from { transform: translateX(-10%); } to { transform: translateX(10%); } }
      .rw-fog { background: radial-gradient(40% 25% at 30% 60%, rgba(180,160,200,.12), transparent 70%),
        radial-gradient(35% 20% at 75% 40%, rgba(180,160,200,.10), transparent 70%); animation: rw-fog 18s ease-in-out infinite alternate; }
      @media (prefers-reduced-motion: reduce) {
        .rw-glow-anim,.rw-seal,.rw-heartbeat,.rw-tremble,.rw-tumble,.rw-land,.rw-idle,.rw-shine,.rw-fog { animation: none !important; }
      }
    `}</style>
  );
}
