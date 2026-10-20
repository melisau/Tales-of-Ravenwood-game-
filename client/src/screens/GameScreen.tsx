import { useEffect, useState } from 'react';
import { CLASSES } from '../../../shared/classes';
import { ANY_CLASS, GamePhase, type PublicActionView, type PublicPlayer, type PublicRoomState, type SceneResult } from '../../../shared/types';
import SecretCharacterScreen from '../components/SecretCharacterScreen';
import { SecretRoleCard } from '../components/SecretRoleCard';
import type { Game } from '../state/useGame';
import { Button, FONT_DISPLAY, HelpButton, HpBar, Label } from '../ui/kit';

/** Zarın herkesin ekranında aynı anda dönmesi için sonucun açıklanmadan önce beklenen süre */
const REVEAL_DELAY_MS = 1600;

const PHASE_COPY: Partial<Record<GamePhase, { title: string; body: string }>> = {
  [GamePhase.SCENE_TEXT]: { title: 'Sahneyi okuyun', body: 'Metni masaya sesli okuyun. Sonra mührü kırıp gizli ipucuna bakın. Süre sınırı yok; okuyunca hazır olduğunu onayla.' },
  [GamePhase.PRIVATE_CHOICES]: { title: 'Gizlice oy ver', body: 'Ne yapılmalı? Kimse senin oyunu görmez.' },
  [GamePhase.DISCUSSION_TIMER]: { title: 'Tartışın!', body: 'İpuçlarını karşılaştırın, kime güveneceğinize karar verin. Herkes hazır olana kadar oyunu değiştirebilirsin; süre sınırı yok.' },
  [GamePhase.DICE_ROLL]: { title: 'Zar zamanı', body: '' },
  [GamePhase.SCENE_RESULT]: { title: 'Kader konuştu', body: '' },
};

export function GameScreen({ game, onOpenGuide }: { game: Game; onOpenGuide: () => void }) {
  const room = game.room!;
  const me = game.me!;
  const scene = room.scene!;
  const phase = room.phase;
  const classDef = me.classId ? CLASSES[me.classId] : null;

  const pending = room.pendingRoll;
  const roller = pending ? room.players.find((p) => p.id === pending.rollerPlayerId) ?? null : null;
  const pendingAction = pending ? scene.actions.find((a) => a.action_id === pending.action_id) ?? null : null;
  const iAmRoller = !!roller && roller.id === me.id;
  const hostRollsForAbsent = !!roller && !roller.connected && me.isHost;

  const result = phase === GamePhase.SCENE_RESULT ? room.lastResult : null;
  const revealed = useRevealDelay(result ? `${game.nodeKey}:${result.action_id}` : null, REVEAL_DELAY_MS);
  const resultAction = result ? scene.actions.find((a) => a.action_id === result.action_id) ?? null : null;
  const resultRoller = result ? room.players.find((p) => p.id === result.rollerPlayerId) ?? null : null;

  const showDice = phase === GamePhase.DICE_ROLL || phase === GamePhase.SCENE_RESULT;
  const diceAction = pendingAction ?? resultAction;
  const diceRoller = roller ?? resultRoller;

  return (
    <SecretCharacterScreen
      characterClass={me.classId ?? '—'}
      classSigil={classDef?.sigil ?? '·'}
      playerName={me.hp <= 0 ? `${me.name} · baygın` : me.name}
      hp={me.hp}
      maxHp={me.maxHp}
      phaseEndsAt={room.phaseEndsAt}
      totalSeconds={Math.max(1, Math.round((room.phaseDurationMs ?? 90_000) / 1000))}
      serverOffsetMs={game.serverOffsetMs}
      secretHint={game.hint?.hint ?? null}
      hintKey={game.nodeKey}
      showDice={showDice}
      diceKey={`${game.nodeKey}:${diceAction?.action_id ?? ''}`}
      canRoll={phase === GamePhase.DICE_ROLL && (iAmRoller || hostRollsForAbsent)}
      rollerLabel={diceRoller ? `${diceRoller.classId ?? ''} · ${diceRoller.name}` : undefined}
      dc={result?.dc ?? pending?.dc ?? diceAction?.dc}
      actionLabel={diceAction?.button_text}
      requestRoll={game.roll}
      // Zarı bu telefondan attıysan kendi animasyonun oynar; değilse (başkası attı ya da
      // süre dolunca sunucu attı) herkes aynı anda izleyici animasyonunu görür.
      spectator={result ? { rolling: !revealed, outcome: result } : undefined}
      sceneSlot={
        <>
          <PartyStrip room={room} meId={me.id} onHelp={onOpenGuide} />
          <SceneCard room={room} collapsed={phase !== GamePhase.SCENE_TEXT} />
        </>
      }
    >
      <PhaseBanner phase={phase} roller={roller} meId={me.id} />
      <SecretRoleCard key={game.nodeKey} game={game} />
      {phase === GamePhase.DICE_ROLL && pendingAction && pending && pending.dc > pendingAction.dc && (
        <p className="text-center text-sm text-[#ff9a9e]">Karanlık bu zarı etkiliyor: zorluk +{pending.dc - pendingAction.dc}. Kaynağı bilinmiyor.</p>
      )}

      {phase === GamePhase.SCENE_TEXT && (
        <ReadyControl game={game} label="Okudum, seçimlere hazırım" />
      )}

      {(phase === GamePhase.PRIVATE_CHOICES || phase === GamePhase.DISCUSSION_TIMER) && (
        <>
          <ChoiceList
            actions={scene.actions}
            players={room.players}
            me={me}
            myVote={game.myVote}
            ownActionIds={game.hint?.ownActionIds ?? []}
            onVote={(id) => void game.vote(id, game.nodeKey)}
          />
          <ReadyControl game={game} label={phase === GamePhase.PRIVATE_CHOICES ? 'Oyumu seçtim, tartışmaya hazırım' : 'Kararım hazır, zara geçelim'} disabled={phase === GamePhase.PRIVATE_CHOICES && !me.hasChosen} />
        </>
      )}

      {result && revealed && (
        <>
          <ResultCard result={result} room={room} />
          {result.darknessPenalty > 0 && <p className="text-center text-sm text-[#ff9a9e]">Karanlık etkisi: zorluk +{result.darknessPenalty}.</p>}
          <ReadyControl game={game} label="Sonucu okudum, devam edelim" />
        </>
      )}
    </SecretCharacterScreen>
  );
}

function ReadyControl({ game, label, disabled = false }: { game: Game; label: string; disabled?: boolean }) {
  const room = game.room!;
  const me = game.me!;
  const waiting = room.players.filter((p) => p.connected && !p.ready);
  return (
    <div className="space-y-2">
      <Button disabled={disabled || game.connection !== 'online'} onClick={() => void game.ready(true, room.phase, room.sceneNumber)}>
        {me.ready ? 'Hazırım · durumu yeniden kontrol et' : label}
      </Button>
      {me.ready && <Button variant="ghost" onClick={() => void game.ready(false, room.phase, room.sceneNumber)}>Hazır değilim, bekleyin</Button>}
      <p className="text-center text-xs text-[#c7b9d0]">Süre sınırı yok. {waiting.length ? `Beklenenler: ${waiting.map((p) => p.name).join(', ')}` : 'Herkes hazır; devam etmek için onayla.'}</p>
    </div>
  );
}

// ═══════════════════════════════ Parçalar ═══════════════════════════════

function PartyStrip({ room, meId, onHelp }: { room: PublicRoomState; meId: string; onHelp: () => void }) {
  const choosing = room.phase === GamePhase.PRIVATE_CHOICES || room.phase === GamePhase.DISCUSSION_TIMER;
  const voted = room.players.filter((p) => p.hasChosen).length;
  return (
    <section className="rounded-2xl border border-white/5 bg-[#140a1a]/70 p-3">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-baseline justify-between text-[13px] uppercase tracking-widest">
            <span className="text-[#b98a8a]">Grubun canı</span>
            <span className="tabular-nums text-[#efe3c8]">
              {room.partyHp} / {room.partyMaxHp}
            </span>
          </div>
          <HpBar hp={room.partyHp} maxHp={room.partyMaxHp} />
        </div>
        <HelpButton onClick={onHelp} />
      </div>
      <ul className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
        {room.players.map((p) => (
          <li
            key={p.id}
            className={`w-[4.6rem] shrink-0 rounded-xl border p-1.5 text-center ${p.id === meId ? 'border-[#c9a24a]/60' : 'border-white/10'} ${
              !p.connected || p.hp <= 0 ? 'opacity-45' : ''
            }`}
            title={`${p.name} · ${p.classId ?? ''}`}
          >
            <div className="relative mx-auto grid h-8 w-8 place-items-center rounded-full bg-[#2a1235] text-[#e8c66a]">
              {p.classId ? CLASSES[p.classId].sigil : '·'}
              {choosing && p.hasChosen && (
                <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[#2f7a45] text-[9px] text-white" aria-label="oy verdi">
                  ✓
                </span>
              )}
            </div>
            <p className="mt-1 truncate text-[13px] text-[#efe3c8]">{p.name}</p>
            <div className="mt-1">
              <HpBar hp={p.hp} maxHp={p.maxHp} size="sm" />
            </div>
          </li>
        ))}
      </ul>
      {choosing && (
        <p className="mt-1 text-center text-[14px] text-[#c7b9d0]">
          {voted} / {room.players.filter((p) => p.connected).length} kişi oy verdi
        </p>
      )}
    </section>
  );
}

function SceneCard({ room, collapsed }: { room: PublicRoomState; collapsed: boolean }) {
  const scene = room.scene!;
  const [open, setOpen] = useState(!collapsed);
  useEffect(() => setOpen(!collapsed), [collapsed, scene.node_id]);
  return (
    <article className="rounded-2xl border border-[#c9a24a]/25 bg-[#1b0f24]/85 p-4">
      <Label>Sahne {room.sceneNumber}</Label>
      <h2 className="mt-1 text-2xl font-bold text-[#f3dfa6]" style={FONT_DISPLAY}>
        {scene.title}
      </h2>
      <p className={`rw-copy mt-4 whitespace-pre-line text-[#f1e7d6] ${open ? '' : 'line-clamp-3'}`}>{scene.public_text}</p>
      {collapsed && (
        <button type="button" onClick={() => setOpen(!open)} className="mt-2 text-[14px] text-[#c9a24a] underline underline-offset-4">
          {open ? 'Kısalt' : 'Sahnenin tamamını oku'}
        </button>
      )}
    </article>
  );
}

function PhaseBanner({ phase, roller, meId }: { phase: GamePhase; roller: PublicPlayer | null; meId: string }) {
  const copy = PHASE_COPY[phase];
  if (!copy) return null;
  let body = copy.body;
  if (phase === GamePhase.DICE_ROLL && roller) {
    body = roller.id === meId ? 'Grup karar verdi ve zar sende. Aşağıdaki D20\'ye dokun.' : `Grup karar verdi. Zarı ${roller.name} (${roller.classId}) atacak.`;
  }
  if (!body) return null;
  return (
    <div className="rounded-xl border border-[#7a0e1a]/40 bg-[#2a0d12]/50 px-4 py-3 text-center">
      <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#ff9a9e]" style={FONT_DISPLAY}>
        {copy.title}
      </p>
      <p className="mt-1 text-[16px] leading-snug text-[#e4d6b8]">{body}</p>
    </div>
  );
}

function ChoiceList({
  actions,
  players,
  me,
  myVote,
  ownActionIds,
  onVote,
}: {
  actions: PublicActionView[];
  players: PublicPlayer[];
  me: PublicPlayer;
  myVote: string | null;
  ownActionIds: string[];
  onVote: (actionId: string) => void;
}) {
  return (
    <ul className="space-y-2.5" aria-label="Seçenekler">
      {actions.map((a) => {
        const selected = myVote === a.action_id;
        const mine = ownActionIds.includes(a.action_id);
        const owner = a.required_class !== ANY_CLASS ? players.find((p) => p.classId === a.required_class) : null;
        return (
          <li key={a.action_id}>
            <button
              type="button"
              onClick={() => onVote(a.action_id)}
              aria-pressed={selected}
              className={`w-full rounded-2xl border p-3.5 text-left transition active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c66a] ${
                selected
                  ? 'border-[#e8c66a] bg-[#3a1d10]/70 shadow-[0_0_20px_-6px_rgba(232,198,106,0.8)]'
                  : 'border-white/10 bg-[#1b0f24]/80'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[14px] ${
                    selected ? 'border-[#e8c66a] bg-[#e8c66a] text-[#1a0c22]' : 'border-[#c9a24a]/50 text-transparent'
                  }`}
                  aria-hidden
                >
                  ✓
                </span>
                <span className="min-w-0 flex-1">
                  <span className="rw-copy block text-[#f5e8c6]">{a.button_text}</span>
                  <span className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[13px]">
                    <span className="rounded-full border border-[#c9a24a]/40 px-2 py-0.5 text-[#e8c66a]">Zorluk {a.dc}</span>
                    {a.required_class === ANY_CLASS ? (
                      <span className="rounded-full border border-white/15 px-2 py-0.5 text-[#c9b48a]">Herkes</span>
                    ) : (
                      <span className={`rounded-full border px-2 py-0.5 ${mine ? 'border-[#9be29b]/60 text-[#9be29b]' : 'border-[#b9a4ff]/40 text-[#b9a4ff]'}`}>
                        {CLASSES[a.required_class].sigil} {mine ? 'Zarı sen atarsın (+2)' : `${a.required_class}: ${owner?.name ?? ''} atar (+2)`}
                      </span>
                    )}
                  </span>
                </span>
              </div>
            </button>
          </li>
        );
      })}
      {me.hp <= 0 && <p className="text-center text-[14px] not-italic text-[#c7b9d0]">Baygınsın ama sesin hâlâ duyuluyor: oy verebilirsin.</p>}
    </ul>
  );
}

function ResultCard({ result, room }: { result: SceneResult; room: PublicRoomState }) {
  const deltas = Object.entries(result.hpDeltaByPlayer).map(([id, d]) => ({ p: room.players.find((x) => x.id === id), d }));
  const tone = result.critical === 'NAT20' ? 'gold' : result.critical === 'NAT1' ? 'doom' : result.success ? 'win' : 'lose';
  const head = {
    gold: { t: 'Kader seni seçti!', c: 'text-[#ffd66b]', b: 'border-[#ffd66b]/60' },
    win: { t: 'Başarı', c: 'text-[#9be29b]', b: 'border-[#9be29b]/50' },
    lose: { t: 'Başarısızlık', c: 'text-[#ff7a7f]', b: 'border-[#e0303c]/50' },
    doom: { t: 'Lanetli zar!', c: 'text-[#ff5a5f]', b: 'border-[#7a0e1a]' },
  }[tone];

  return (
    <article className={`rw-result-in rounded-2xl border-2 ${head.b} bg-[#1b0f24]/90 p-4`}>
      <div className="flex items-baseline justify-between gap-2">
        <p className={`text-xl font-bold uppercase tracking-[0.15em] ${head.c}`} style={FONT_DISPLAY}>
          {head.t}
        </p>
        <p className="text-[14px] tabular-nums text-[#c9b48a]">
          {result.roll}
          {result.bonus > 0 && ` + ${result.bonus}`} = {result.total} / {result.dc}
        </p>
      </div>
      <p className="rw-copy mt-4 text-[#f1e7d6]">{result.text}</p>
      {deltas.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {deltas.map(({ p, d }) => (
            <li
              key={p?.id ?? Math.random()}
              className={`rounded-full px-2.5 py-1 text-[14px] ${d < 0 ? 'bg-[#5c0612]/60 text-[#ffd9db]' : 'bg-[#173022] text-[#c9f5c9]'}`}
            >
              {p?.name ?? '?'} {d > 0 ? `+${d}` : d} can
            </li>
          ))}
        </ul>
      )}
      <style>{`@keyframes rw-result-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.rw-result-in{animation:rw-result-in .5s ease-out both}`}</style>
    </article>
  );
}

/** key değiştiğinde false olur, `ms` sonra true. Zar sonucunu herkese aynı anda açıklamak için. */
function useRevealDelay(key: string | null, ms: number): boolean {
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  useEffect(() => {
    if (!key) return;
    const id = window.setTimeout(() => setRevealedKey(key), ms);
    return () => window.clearTimeout(id);
  }, [key, ms]);
  return key !== null && revealedKey === key;
}
