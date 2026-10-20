import { ClassEmblem } from '../components/ClassEmblem';
import type { Game } from '../state/useGame';
import { Backdrop, Button, FONT_DISPLAY, HpBar, Label, Panel } from '../ui/kit';

const STYLE = {
  victory: { kicker: 'Zafer', color: 'text-[#ffd66b]', glow: 'drop-shadow-[0_0_24px_rgba(255,214,107,0.6)]', sigil: '☀' },
  bittersweet: { kicker: 'Buruk bir son', color: 'text-[#c9b4ff]', glow: 'drop-shadow-[0_0_24px_rgba(185,164,255,0.5)]', sigil: '☾' },
  defeat: { kicker: 'Yenilgi', color: 'text-[#ff5a5f]', glow: 'drop-shadow-[0_0_24px_rgba(224,48,60,0.7)]', sigil: '✝' },
} as const;

export function GameOverScreen({ game }: { game: Game }) {
  const room = game.room!;
  const over = game.gameOver!;
  const me = game.me!;
  const s = STYLE[over.type];
  const traitor = room.players.find((p) => p.id === over.betrayal?.traitorPlayerId);
  const mySide = me.id === over.betrayal?.traitorPlayerId ? 'darkness' : 'adventurers';

  return (
    <Backdrop>
      <section className="pb-6 pt-10 text-center">
        <div className={`text-6xl ${s.color} ${s.glow}`} aria-hidden>
          {s.sigil}
        </div>
        <p className="mt-4 text-[14px] uppercase tracking-[0.35em] text-[#c9a24a]/85">{s.kicker}</p>
        <h1 className={`mt-2 text-4xl font-bold ${s.color}`} style={FONT_DISPLAY}>
          {over.title}
        </h1>
        <p className="rw-copy mx-auto mt-5 text-left text-[#f1e7d6]">{over.reason}</p>
      </section>

      <div className="space-y-4">
        {over.betrayal && <Panel>
          <Label>{over.betrayal.winningSide === mySide ? 'Kazandın' : 'Kaybettin'}</Label>
          <p className="mt-2 text-[#f3dfa6]">{over.betrayal.winningSide === 'darkness' ? 'Karanlık ve hizmetkârı kazandı.' : 'Maceracılar kazandı; hain kaybetti.'}</p>
          <p className="mt-2 text-sm text-[#c9b48a]">Karanlığın hizmetkârı: <b>{traitor?.name ?? 'Ayrılan oyuncu'}</b>{traitor?.classId ? ` · ${traitor.classId}` : ''}. Diğer oyuncular maceracıydı.</p>
        </Panel>}
        <Panel>
          <div className="flex items-baseline justify-between">
            <Label>Gecenin özeti</Label>
            <span className="text-[14px] text-[#c7b9d0]">{room.sceneNumber} sahne</span>
          </div>
          <ul className="mt-2 divide-y divide-white/5">
            {room.players.map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#2a1235] text-[#e8c66a]">
                  <ClassEmblem classId={p.classId} className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[16px]">
                    {p.name} <span className="text-[14px] text-[#c7b9d0]">· {p.classId}</span>
                  </span>
                  <HpBar hp={p.hp} maxHp={p.maxHp} size="sm" />
                </span>
                <span className="w-12 text-right text-[14px] tabular-nums text-[#c9b48a]">
                  {p.hp}/{p.maxHp}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        {me.isHost ? (
          <Button onClick={() => void game.advance()}>Aynı Masayla Yeniden Oyna</Button>
        ) : (
          <p className="text-center text-[16px] not-italic text-[#c9b48a]">Host yeni bir geceyi başlatabilir…</p>
        )}
        <Button variant="ghost" onClick={() => void game.leave()}>
          Ana menüye dön
        </Button>
      </div>
    </Backdrop>
  );
}
