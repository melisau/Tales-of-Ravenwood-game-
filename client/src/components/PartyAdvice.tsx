import { useState } from 'react';
import { ClassEmblem } from './ClassEmblem';
import type { ClassId } from '../../../shared/types';

// Editorial starter teams for the current story; every class remains optional.
const STARTER_ORDER: ReadonlyArray<{ id: ClassId; reason: string }> = [
  { id: 'Medyum', reason: 'Ruhları ve yanıltıcı sesleri ayırt eder.' },
  { id: 'Bilgin', reason: 'Mühürleri ve kadim yazıları çözer.' },
  { id: 'Dedektif', reason: 'Tuzakları ve sahte izleri fark eder.' },
  { id: 'Şifacı', reason: 'Tedavi seçenekleri ve yaralılara ilişkin bilgi getirir.' },
  { id: 'İzci', reason: 'Gizli geçitleri ve alternatif yolları bulur.' },
  { id: 'Gizemci', reason: 'Lanetleri ve büyünün kaynağını araştırır.' },
  { id: 'Muhafız', reason: 'Savunma ve grubu koruma seçenekleri açar.' },
  { id: 'Simyacı', reason: 'Zehir, spor ve yanıcı madde tehlikelerini tanır.' },
  { id: 'Günlükçü', reason: 'İsimleri ve konağın geçmişini birbirine bağlar.' },
  { id: 'Avcı', reason: 'Yaratıkların zayıflıklarını ve av yöntemlerini bilir.' },
  { id: 'Tamirci', reason: 'Kilitler ve düzenekler için çözüm getirir.' },
  { id: 'Falcı', reason: 'Olası sonuçları sezerek yorumlara yeni bir bakış katar.' },
];

export function PartyAdvice({ playerCount, takenClasses = [] }: { playerCount?: number; takenClasses?: ClassId[] }) {
  const [previewCount, setPreviewCount] = useState(4);
  const count = Math.max(2, Math.min(12, playerCount ?? previewCount));

  return (
    <section aria-label="Önerilen ekip" className="rounded-2xl border border-[#c9a24a]/30 bg-[#1b0f24] p-4 text-[#e4d6b8]">
      <h2 className="text-lg font-bold text-[#f3dfa6]">Oyuncu sayısına göre ekip önerisi</h2>
      {playerCount === undefined ? (
        <label className="mt-3 flex items-center gap-3 text-sm">
          Kaç kişisiniz?
          <select className="rounded-lg border border-[#c9a24a]/50 bg-[#160b1d] p-2 text-[#f3dfa6]" value={previewCount} onChange={(event) => setPreviewCount(Number(event.target.value))}>
            {Array.from({ length: 11 }, (_, i) => i + 2).map((n) => <option key={n} value={n}>{n} oyuncu</option>)}
          </select>
        </label>
      ) : (
        <p className="mt-2 text-sm">{playerCount < 2 ? 'Oyun en az 2 kişiyle başlar. İlk ikili için öneri:' : `Odanızdaki ${count} kişi için öneri:`}</p>
      )}
      <ul className="mt-3 space-y-2 text-sm">
        {STARTER_ORDER.slice(0, count).map(({ id, reason }) => (
          <li key={id}>
            <span className="inline-flex items-center gap-2 font-bold text-[#f3dfa6]"><ClassEmblem classId={id} className="h-6 w-6" /> {id}</span>
            {takenClasses.includes(id) && <span className="ml-2 text-xs text-[#c9a24a]">Seçildi</span>}
            <span className="block text-[#c9b48a]">{reason}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-[#c7b9d0]">Mevcut hikâye için başlangıç önerisidir; zorunlu veya kazanmayı garantileyen bir ekip değildir. Her sınıf yalnızca bir oyuncuda olabilir. İstediğiniz sınıfı seçebilirsiniz; herkese açık seçeneklerle her ekip ilerleyebilir. Sınıf yetenekleri ilgili sahne seçeneklerinde çalışır, sürekli etkin bir güç değildir.</p>
    </section>
  );
}
