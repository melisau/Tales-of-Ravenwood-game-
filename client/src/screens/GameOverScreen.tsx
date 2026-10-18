import { CLASSES } from '../../../shared/classes';
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

  return (
    <Backdrop>
      <section className="pb-6 pt-10 text-center">
        <div className={`text-6xl ${s.color} ${s.glow}`} aria-hidden>
          {s.sigil}
        </div>
        <p className="mt-4 text-[12px] uppercase tracking-[0.35em] text-[#c9a24a]/85">{s.kicker}</p>
        <h1 className={`mt-2 text-4xl font-bold ${s.color}`} style={FONT_DISPLAY}>
          {over.title}
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-[17px] italic leading-[1.7] text-[#e4d6b8]">{over.reason}</p>
      </section>

      <div className="space-y-4">
        <Panel>
          <div className="flex items-baseline justify-between">
            <Label>Gecenin özeti</Label>
            <span className="text-[12.5px] text-[#a893b3]">{room.sceneNumber} sahne</span>
          </div>
          <ul className="mt-2 divide-y divide-white/5">
            {room.players.map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#2a1235] text-[#e8c66a]">
                  {p.classId ? CLASSES[p.classId].sigil : '·'}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14.5px]">
                    {p.name} <span className="text-[12px] text-[#a893b3]">· {p.classId}</span>
                  </span>
                  <HpBar hp={p.hp} maxHp={p.maxHp} size="sm" />
                </span>
                <span className="w-12 text-right text-[12.5px] tabular-nums text-[#c9b48a]">
                  {p.hp}/{p.maxHp}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        {me.isHost ? (
          <Button onClick={() => void game.advance()}>Aynı Masayla Yeniden Oyna</Button>
        ) : (
          <p className="text-center text-[14px] italic text-[#c9b48a]">Host yeni bir geceyi başlatabilir…</p>
        )}
        <Button variant="ghost" onClick={() => void game.leave()}>
          Ana menüye dön
        </Button>
      </div>
    </Backdrop>
  );
}
