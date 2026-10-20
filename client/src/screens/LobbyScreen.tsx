import { CLASSES } from '../../../shared/classes';
import { ADVENTURES } from '../../../shared/adventures';
import type { AdventureId } from '../../../shared/types';
import { MAX_PLAYERS, MIN_PLAYERS, getTierConfig, startingHpPerPlayer } from '../../../shared/scaling';
import type { Game } from '../state/useGame';
import { PartyAdvice } from '../components/PartyAdvice';
import { ClassEmblem } from '../components/ClassEmblem';
import { Backdrop, Button, FONT_DISPLAY, HelpButton, Label, Panel } from '../ui/kit';

/** Lobi: oda kodu, oyuncular, sınıf seçimi, Host başlatır. */
export function LobbyScreen({ game, onPickClass, onOpenGuide }: { game: Game; onPickClass: () => void; onOpenGuide: () => void }) {
  const room = game.room!;
  const me = game.me!;
  const isHost = me.isHost;
  const players = room.players;
  const missingClass = players.filter((p) => !p.classId);
  const minimum = room.mode === 'betrayal' ? 4 : MIN_PLAYERS;
  const canStart = players.length >= minimum && missingClass.length === 0;

  const share = async () => {
    const text = `Tales of Ravenwood'a gel! Oda kodu: ${room.code}`;
    try {
      if (navigator.share) await navigator.share({ text, url: location.href });
      else await navigator.clipboard.writeText(room.code);
    } catch {
      /* kullanıcı vazgeçti */
    }
  };

  const balance = players.length >= MIN_PLAYERS ? describeBalance(players.length) : null;

  return (
    <Backdrop>
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => void game.leave()} className="text-[14px] text-[#c7b9d0] underline-offset-4 active:underline">
          ← Ayrıl
        </button>
        <HelpButton onClick={onOpenGuide} />
      </div>

      {/* Oda kodu */}
      <section className="pb-5 pt-4 text-center">
        <Label>Oda kodu</Label>
        <div className="mt-3 flex justify-center gap-2" aria-label={`Oda kodu ${room.code.split('').join(' ')}`}>
          {room.code.split('').map((ch, i) => (
            <span
              key={i}
              className="grid h-16 w-14 place-items-center rounded-xl border-2 border-[#c9a24a] bg-[#1b0f24] text-4xl font-bold text-[#f3dfa6] shadow-[0_0_18px_-6px_rgba(201,162,74,0.8)]"
              style={FONT_DISPLAY}
            >
              {ch}
            </span>
          ))}
        </div>
        <button type="button" onClick={share} className="mt-3 text-[14px] text-[#c9a24a] underline underline-offset-4">
          Kodu paylaş
        </button>
      </section>

      <div className="space-y-4">
        <Panel>
          <label htmlFor="adventure"><Label>Blackthorne Konağı · Macera seçimi</Label></label>
          <select id="adventure" value={room.adventureId} disabled={!isHost} onChange={(event) => void game.setAdventure(event.target.value as AdventureId)}
            className="mt-2 w-full rounded-xl border border-[#c9a24a]/30 bg-[#160b1d] p-3 text-[#f3dfa6]">
            {ADVENTURES.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
          </select>
          <p className="mt-2 text-sm leading-relaxed text-[#c9b48a]">{ADVENTURES.find((a) => a.id === room.adventureId)?.description}</p>
          <p className="mt-2 text-xs text-[#c7b9d0]">Her macera farklı yollara ve sonlara ayrılır. Zar başarısı hamlenin uygulandığını gösterir; kötü bir ritüelin başarıyla yapılması da mümkün.</p>
        </Panel>
        <Panel>
          <label htmlFor="game-mode"><Label>Oyun modu</Label></label>
          <select id="game-mode" value={room.mode} disabled={!isHost} onChange={(event) => void game.setMode(event.target.value as 'cooperative' | 'betrayal')}
            className="mt-2 w-full rounded-xl border border-[#c9a24a]/30 bg-[#160b1d] p-3 text-[#f3dfa6]">
            <option value="cooperative">Birlikte hayatta kal · 2–12 kişi</option>
            <option value="betrayal">Gizli Hain · 4–12 kişi</option>
          </select>
          <p className="mt-2 text-sm leading-relaxed text-[#c9b48a]">{room.mode === 'betrayal'
            ? 'Rastgele bir kişi karanlığın hizmetkârı olur. Hain yenilgide, maceracılar zafer veya buruk sonda kazanır. Hainin iki gizli laneti vardır; herkesin sınıfı aynı kalır. Roller finalde açılır.'
            : 'Herkes aynı tarafta. Zafer veya buruk sonda birlikte kazanırsınız; yenilgide birlikte kaybedersiniz.'}</p>
          <p className="mt-2 text-xs text-[#c7b9d0]">Süre sınırı yok. Her aşamada bağlı oyuncular hazır olduğunu onaylayınca ilerlenir; zar elle atılır. Modu yalnızca Host lobide değiştirir.</p>
        </Panel>
        {/* Benim sınıfım */}
        <Panel>
          <Label>Senin sınıfın</Label>
          {me.classId ? (
            <div className="mt-2 flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#c9a24a] bg-[radial-gradient(circle_at_35%_30%,#4b2160,#1a0c22)] text-xl text-[#e8c66a]">
                <ClassEmblem classId={me.classId} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-[#f3dfa6]" style={FONT_DISPLAY}>
                  {me.classId}
                </p>
                <p className="text-[15px] leading-snug text-[#d9c9a6]">{CLASSES[me.classId].duty}</p>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-[16px] text-[#d9c9a6]">Henüz seçmedin. Her sınıf odada yalnızca bir kez alınabilir.</p>
          )}
          <Button className="mt-3" variant={me.classId ? 'secondary' : 'primary'} onClick={onPickClass}>
            {me.classId ? 'Sınıfı Değiştir' : 'Sınıfını Seç'}
          </Button>
        </Panel>

        <PartyAdvice playerCount={players.length} takenClasses={room.takenClasses} />

        {/* Oyuncular */}
        <Panel>
          <div className="flex items-baseline justify-between">
            <Label>Masadakiler</Label>
            <span className="text-[14px] text-[#c7b9d0]">
              {players.length} / {MAX_PLAYERS}
            </span>
          </div>
          <ul className="mt-2 divide-y divide-white/5">
            {players.map((p) => (
              <li key={p.id} className={`flex items-center gap-3 py-2.5 ${p.connected ? '' : 'opacity-50'}`}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#c9a24a]/50 bg-[#2a1235] text-[#e8c66a]">
                  <ClassEmblem classId={p.classId} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[17px] text-[#efe3c8]">
                    {p.name}
                    {p.id === me.id && <span className="ml-1.5 text-[14px] text-[#c9a24a]">(sen)</span>}
                  </span>
                  <span className="block text-[14px] text-[#c7b9d0]">
                    {p.classId ?? 'Sınıf seçiyor…'}
                    {!p.connected && ' · bağlantı koptu'}
                  </span>
                </span>
                {p.isHost && (
                  <span className="rounded-full border border-[#e8c66a]/50 px-2 py-0.5 text-[12px] uppercase tracking-widest text-[#e8c66a]">Host</span>
                )}
              </li>
            ))}
          </ul>
        </Panel>

        {balance && (
          <p className="px-1 text-center text-[14px] not-italic text-[#c9b48a]">
            {players.length} oyuncu: {balance}
          </p>
        )}

        {/* Başlat */}
        {isHost ? (
          <div className="space-y-2 pt-1">
            <Button onClick={() => void game.start()} disabled={!canStart}>
              Geceyi Başlat
            </Button>
            {!canStart && (
              <p className="text-center text-[14px] text-[#c7b9d0]">
                {players.length < minimum
                  ? `Bu modda en az ${minimum} oyuncu gerekli. Kodu masadakilere söyle.`
                  : `Sınıf seçmesi beklenenler: ${missingClass.map((p) => p.name).join(', ')}`}
              </p>
            )}
          </div>
        ) : (
          <p className="pt-2 text-center text-[16px] not-italic text-[#c9b48a]">Host'un geceyi başlatması bekleniyor…</p>
        )}
      </div>
    </Backdrop>
  );
}

function describeBalance(n: number): string {
  const tier = getTierConfig(n);
  const hp = startingHpPerPlayer(n);
  if (tier.tier === 'SMALL') return `zarlar %15 daha kolay, herkes ${hp} canla başlar.`;
  if (tier.tier === 'LARGE') return `zarlar %20 daha zor, ama hasar gruba paylaştırılır. Herkes ${hp} can.`;
  return `standart denge, herkes ${hp} canla başlar.`;
}
