import { useState } from 'react';
import { GamePhase } from '../../../shared/types';
import type { Game } from '../state/useGame';
import { Button } from '../ui/kit';

export function SecretRoleCard({ game }: { game: Game }) {
  const [busy, setBusy] = useState(false);
  if (game.room?.mode !== 'betrayal' || !game.role) return null;
  const role = game.role;
  const traitor = role.allegiance === 'darkness';
  return (
    <details className="rounded-2xl border border-[#c9a24a]/30 bg-[#1b0f24] p-4 text-[#e4d6b8]">
      <summary className="cursor-pointer font-bold text-[#f3dfa6]">Gizli bağlılığını aç — yalnızken bak</summary>
      <div className="mt-3 space-y-3 text-sm leading-relaxed">
        <p className="text-lg font-bold text-[#f3dfa6]">{traitor ? 'Karanlığın Hizmetkârı' : 'Maceracı'}</p>
        <p>{traitor
          ? 'Konağın kötü gücüyle anlaşma yaptın. Hikâye yenilgiyle biterse sen kazanırsın; zafer veya buruk sonla biterse kaybedersin. Sınıfın kimliğinin örtüsü. İpucunu saklayabilir, çarpıtabilir ve tehlikeli hamleleri savunabilirsin.'
          : 'Zafer veya buruk sona ulaşırsanız maceracılar kazanır; yenilgiyle biterse hain kazanır. Aranızda tam bir hain var. İpuçlarını karşılaştır; çelişkileri sorgula ve şüphelendiğin kişinin önerisine oy vermeyebilirsin. İpucunu kime, ne zaman ve ne kadar anlatacağına sen karar ver.'}</p>
        {traitor && <>
          <p>Kalan lanet: <b>{role.cursesLeft}</b>. Tartışma aşamasında, sahne başına bir kez kullanabilirsin. Bu sahnenin zar zorluğu 2 artar (en fazla 20); doğal 20 yine başarılıdır. Lanet geri alınmaz. Etki zar aşamasında görünür, kimin kullandığı açıklanmaz.</p>
          <Button variant="secondary" disabled={busy || game.connection !== 'online' || game.room.phase !== GamePhase.DISCUSSION_TIMER || role.cursesLeft === 0 || role.curseQueued}
            onClick={async () => { setBusy(true); try { await game.curse(); } finally { setBusy(false); } }}>
            {role.curseQueued ? 'Bu sahne için lanet hazır' : 'Karanlıkla anlaş: lanet kullan'}
          </Button>
        </>}
        <p className="text-xs text-[#a893b3]">Rolün oyun bitene kadar başkalarına gönderilmez. Telefonunu göstermek rolünü ele verebilir. Suçlama, oyuncu çıkarma veya başka birinin rolünü açma düğmesi yoktur; karşı hamleniz tartışma ve oylamadır.</p>
      </div>
    </details>
  );
}
