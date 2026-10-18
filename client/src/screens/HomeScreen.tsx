import { useState, type FormEvent } from 'react';
import type { Game } from '../state/useGame';
import { Backdrop, Button, FONT_DISPLAY, Label, Panel, Title } from '../ui/kit';

/** Ana menü: isim, oda kur, kodla katıl. */
export function HomeScreen({ game, onOpenGuide }: { game: Game; onOpenGuide: (tab: 'howto' | 'classes') => void }) {
  const [name, setName] = useState(game.savedName);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState<'create' | 'join' | null>(null);

  const nameOk = name.trim().length > 0;
  const codeOk = /^[A-Z]{4}$/.test(code);
  const online = game.connection === 'online';

  const create = async () => {
    if (!nameOk) return;
    setBusy('create');
    await game.createRoom(name.trim());
    setBusy(null);
  };

  const join = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!nameOk || !codeOk) return;
    setBusy('join');
    await game.joinRoom(code, name.trim());
    setBusy(null);
  };

  return (
    <Backdrop>
      <header className="pb-6 pt-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#c9a24a]/80">Cadılar Bayramı · Co-op FRP</p>
        <Title className="mt-2 text-4xl">Tales of Ravenwood</Title>
        <p className="mx-auto mt-3 max-w-xs text-[15px] italic leading-relaxed text-[#d9c9a6]">
          Blackthorne Konağı'nın mahzeninde bir ninni çalıyor. 2–12 kişi, tek masa, herkes kendi telefonunda.
        </p>
      </header>

      <div className="space-y-4">
        <Panel>
          <label htmlFor="name" className="block">
            <Label>Adın</Label>
          </label>
          <input
            id="name"
            value={name}
            maxLength={20}
            autoComplete="nickname"
            onChange={(e) => setName(e.target.value)}
            placeholder="Masadakiler seni ne diye çağırıyor?"
            className="mt-2 w-full rounded-xl border border-[#c9a24a]/30 bg-[#0d0712] px-4 py-3 text-[17px] text-[#f3dfa6] placeholder:text-[#7d6a86] focus:border-[#e8c66a] focus:outline-none"
          />
        </Panel>

        <Panel>
          <Label>Yeni bir gece</Label>
          <p className="mt-1 text-[14px] text-[#d9c9a6]">Oda kur, kodu masadakilere söyle. Odayı kuran Host olur.</p>
          <Button className="mt-3" onClick={create} disabled={!nameOk || !online || busy !== null}>
            {busy === 'create' ? 'Kapı açılıyor…' : 'Oda Kur'}
          </Button>
        </Panel>

        <Panel>
          <form onSubmit={join}>
            <label htmlFor="code">
              <Label>Odaya katıl</Label>
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4))}
                placeholder="HLLW"
                inputMode="text"
                autoCapitalize="characters"
                autoComplete="off"
                className="w-0 flex-1 rounded-xl border border-[#c9a24a]/30 bg-[#0d0712] px-4 py-3 text-center text-2xl tracking-[0.5em] text-[#f3dfa6] placeholder:text-[#4a3a52] focus:border-[#e8c66a] focus:outline-none"
                style={FONT_DISPLAY}
              />
              <Button type="submit" variant="secondary" className="!w-auto shrink-0 px-5" disabled={!nameOk || !codeOk || !online || busy !== null}>
                {busy === 'join' ? '…' : 'Katıl'}
              </Button>
            </div>
            {!nameOk && code.length > 0 && <p className="mt-2 text-[12.5px] text-[#ff9a9e]">Önce adını yaz.</p>}
          </form>
        </Panel>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button variant="secondary" onClick={() => onOpenGuide('howto')}>
            Nasıl Oynanır
          </Button>
          <Button variant="secondary" onClick={() => onOpenGuide('classes')}>
            Karakterler
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}
