import { useState, type ReactNode } from 'react';
import { ARCHETYPES, CLASSES } from '../../../shared/classes';
import type { ClassArchetype, ClassDefinition, ClassId } from '../../../shared/types';
import { CLASS_IDS } from '../../../shared/types';
import { PartyAdvice } from './PartyAdvice';
import { FONT_BODY, FONT_DISPLAY } from '../ui/kit';
import { ClassEmblem } from './ClassEmblem';

/**
 * Tales of Ravenwood — Başlangıç Rehberi
 * İki sekme: "Nasıl Oynanır" ve "Karakterleri Tanı".
 *
 * İki modda kullanılır:
 *  - Ana menü: sadece okuma. `onContinue` ile oda kur/katıl ekranına geçilir.
 *  - Lobi: `onSelectClass` + `takenClasses` verilirse kartlarda "Bu sınıfı seç" çıkar.
 */

export type GuideTab = 'howto' | 'classes';

export interface GuideScreenProps {
  initialTab?: GuideTab;
  onContinue?: () => void;
  continueLabel?: string;
  /** Lobi modu: verilirse sınıf kartlarında seçim butonu görünür */
  onSelectClass?: (classId: ClassId) => void;
  takenClasses?: ClassId[];
  mySelectedClass?: ClassId | null;
  playerCount?: number;
}


export default function GuideScreen({
  initialTab = 'howto',
  onContinue,
  continueLabel = 'Masaya Otur',
  onSelectClass,
  takenClasses = [],
  mySelectedClass = null,
  playerCount,
}: GuideScreenProps) {
  const [tab, setTab] = useState<GuideTab>(initialTab);

  return (
    <div className="relative min-h-dvh w-full bg-[#0d0712] text-[#efe3c8] antialiased" style={FONT_BODY}>
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,#3a1747_0%,#170b1f_50%,#0d0712_100%)]" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col sm:max-w-2xl">
        {/* Başlık */}
        <header className="px-4 pb-3 pt-[max(1.25rem,env(safe-area-inset-top))] text-center">
          <p className="text-[13px] uppercase tracking-[0.35em] text-[#c9a24a]/80">Cadılar Bayramı · Co-op FRP</p>
          <h1 className="mt-1 text-3xl font-bold tracking-wide text-[#f3dfa6] drop-shadow-[0_0_12px_rgba(201,162,74,0.35)]" style={FONT_DISPLAY}>
            Tales of Ravenwood
          </h1>
        </header>

        {/* Sekmeler */}
        <nav
          role="tablist"
          aria-label="Rehber"
          className="sticky top-0 z-10 mx-4 grid grid-cols-2 gap-1 rounded-2xl border border-[#c9a24a]/25 bg-[#160b1d]/90 p-1 backdrop-blur"
        >
          <TabButton active={tab === 'howto'} onClick={() => setTab('howto')} id="howto">
            Nasıl Oynanır
          </TabButton>
          <TabButton active={tab === 'classes'} onClick={() => setTab('classes')} id="classes">
            Karakterleri Tanı
          </TabButton>
        </nav>

        <main className="flex-1 px-4 pb-32 pt-5">
          {tab === 'howto' ? (
            <section className="rw-reading" role="tabpanel" id="panel-howto" aria-labelledby="tab-howto">
              <HowToPlay onShowClasses={() => setTab('classes')} />
            </section>
          ) : (
            <section role="tabpanel" id="panel-classes" aria-labelledby="tab-classes">
              <PartyAdvice playerCount={playerCount} takenClasses={takenClasses} />
              <div className="mt-5"><ClassCodex onSelectClass={onSelectClass} takenClasses={takenClasses} mySelectedClass={mySelectedClass} /></div>
            </section>
          )}
        </main>

        {onContinue && (
          <div className="fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#0d0712] via-[#0d0712]/95 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
            <button
              type="button"
              onClick={onContinue}
              className="mx-auto block w-full max-w-md rounded-2xl border border-[#e8c66a]/70 bg-gradient-to-b from-[#9e1424] to-[#5c0612] px-6 py-4 text-lg font-bold uppercase tracking-[0.2em] text-[#fbe7b0] shadow-[0_0_24px_-4px_rgba(224,48,60,0.75)] transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c66a]"
              style={FONT_DISPLAY}
            >
              {continueLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, id, children }: { active: boolean; onClick: () => void; id: string; children: ReactNode }) {
  return (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={active}
      aria-controls={`panel-${id}`}
      onClick={onClick}
      className={`rounded-xl px-2 py-2.5 text-[14px] font-bold uppercase tracking-[0.08em] whitespace-nowrap transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c66a] ${
        active
          ? 'bg-gradient-to-b from-[#c9a24a] to-[#8f6d25] text-[#1a0c22] shadow-[0_0_14px_-4px_rgba(232,198,106,0.8)]'
          : 'text-[#c9b48a] active:bg-white/5'
      }`}
      style={FONT_DISPLAY}
    >
      {children}
    </button>
  );
}

// ═══════════════════════════════ Nasıl Oynanır ═══════════════════════════════

const STEPS: ReadonlyArray<{ icon: string; title: string; body: ReactNode }> = [
  {
    icon: '🕯',
    title: 'Masaya toplanın',
    body: (
      <>
        Bir kişi <b>oda kurar</b> ve <b>Host</b> olur. Diğerleri ekrandaki <b>4 harfli kodu</b> (ör. <Code>HLLW</Code>) girerek
        kendi telefonlarından katılır. 2 ile 12 kişi oynayabilir.
      </>
    ),
  },
  {
    icon: '✠',
    title: 'Sınıfını seç',
    body: (
      <>
        12 sınıftan birini seç. Her sınıf odada <b>yalnızca bir kez</b> seçilebilir, kapan alır. Hangisinin ne işe yaradığını{' '}
        <i>Karakterleri Tanı</i> sekmesinde bulabilirsin.
      </>
    ),
  },
  {
    icon: '📜',
    title: 'Sahneyi dinleyin',
    body: <>Herkesin ekranında aynı hikaye metni belirir. Host'un sesli okuması atmosferi ikiye katlar.</>,
  },
  {
    icon: '🔒',
    title: 'Gizli ipucunu oku',
    body: (
      <>
        Telefonunda <b>sadece senin sınıfının</b> görebildiği bir ipucu var: Dedektif tuzağı, Medyum ruhu, Bilgin yazıyı görür.
        Mührü kır, oku. <b>Hain modunda kime güveneceğini düşün; birlikte oynarken tehlikeleri paylaş.</b> O sahnede sınıfına ipucu gelmeyebilir.
      </>
    ),
  },
  {
    icon: '🗳',
    title: 'Gizlice oy ver',
    body: <>Ekranda seçenekler çıkar. Herkes ne yapılması gerektiğine gizlice oy verir; kimin neye oy verdiği görünmez.</>,
  },
  {
    icon: '⏳',
    title: 'Acele etmeden tartışın',
    body: (
      <>
        Süre sınırı yok. Anlatılan ipuçlarını karşılaştırın, çelişkileri sorgulayın. Herkes hazır olduğunu onaylayana kadar <b>oyunu değiştirebilirsin</b>.
      </>
    ),
  },
  {
    icon: '🎲',
    title: 'Zarı at',
    body: (
      <>
        En çok oy alan seçenek uygulanır. Bir sınıfa özel seçenekse zarı <b>o sınıf</b> atar ve <b>+2 bonus</b> alır; herkese açık
        seçenekte zarı ilk oy veren atar. <b>D20 + bonus ≥ Zorluk</b> ise başarılı.
      </>
    ),
  },
  {
    icon: '🩸',
    title: 'Hikaye dallanır',
    body: (
      <>
        Başarı ya da başarısızlık sizi <b>farklı sahnelere</b> götürür; can kaybedebilir veya iyileşebilirsiniz. Her karar
        hikayenin sonunu değiştirir.
      </>
    ),
  },
];

function HowToPlay({ onShowClasses }: { onShowClasses: () => void }) {
  return (
    <div className="space-y-6">
      <p className="text-center text-[17px] not-italic leading-relaxed text-[#d9c9a6]">
        Ravenwood'da Cadılar Bayramı gecesi. Birlikte girdiniz; ancak birlikte çıkabilirsiniz.
      </p>

      <section className="rounded-2xl border border-[#c9a24a]/30 bg-[#1b0f24] p-4 text-[16px] leading-relaxed">
        <h2 className="text-lg font-bold text-[#f3dfa6]">Amacınız ve oyunun sonu</h2>
        <p className="mt-2">Blackthorne Konağı'nın sırrını çözün, tehlikelerden kurtulun ve mümkünse tutsak ruhu özgür bırakın. Host lobide Karanlık Mahzen, Yankı Mağaraları veya On Üçüncü Nota macerasını seçer. İki mod vardır: <b>Birlikte hayatta kal</b> (2–12 kişi, herkes aynı tarafta) veya <b>Gizli Hain</b> (4–12 kişi, rastgele bir kişi kötü güçle işbirliği yapar). Hain herhangi bir sınıftan olabilir; Host da hain olabilir.</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li><b>Zafer veya buruk son:</b> Maceracılar kazanır. Hain varsa kaybeder; hikâyedeki her sorun çözülmüş olmayabilir.</li>
          <li><b>Yenilgi:</b> Grubun toplam canı sıfıra düşerse veya hikâye yenilgi sonuyla biterse maceracılar kaybeder, hain varsa kazanır. Tek kişinin canının sıfırlanması tek başına oyunu bitirmez.</li>
          <li><b>Hainin anlaşması:</b> Bilgi saklayıp yalan söyleyebilir, yanlış hamleleri savunabilir. Tartışmada oyun boyunca iki kez gizli lanet kullanabilir: o sahnenin zar zorluğu +2 (en fazla 20), sahne başına bir kullanım. Doğal 20 yine başarılıdır. Laneti kimin kullandığı gizli kalır; roller finalde açılır.</li>
          <li><b>Kötü işareti savun:</b> Hain kendi gizli bağlılık kartında kötü gücün hangi işareti istediğini ve hangi seçeneği savunacağını görür. Zar başarısı yalnızca hamlenin uygulanmasıdır; kötü bir çağrı ritüeli başarılı olursa maceracılar yine yenilebilir.</li>
          <li><b>Hikâye sesleri:</b> “Sesi aç” ile genel müziği başlatın. Mağara, damla ve müzik kutusu sahnelerinde atmosfer değişir; ses kapalıyken bütün ipuçları metinde de vardır. Aynı masada tek cihazdan çalmanız önerilir.</li>
          <li><b>Kontrol sizde:</b> Okuma, seçim, tartışma ve sonuç aşamalarında herkes “Hazırım” dediğinde ilerlenir. Oy değiştirmek hazır onayını geri alır. Zar elle atılır; zarcı bağlı değilse Host onun yerine basabilir. Host aşamaları tek başına atlayamaz.</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-[#c9a24a]/30 bg-[#1b0f24] p-4 text-[16px] leading-relaxed">
        <h2 className="text-lg font-bold text-[#f3dfa6]">İpucumu ne zaman paylaşmalıyım?</h2>
        <p className="mt-2">Birlikte oynarken tehlike uyarılarını paylaşmak grubu korur. Gizli Hain modunda ise güven bir karardır: hain doğru ipucunu saklayabilir veya tersini söyleyerek sizi tuzağa yöneltebilir. Maceracı olarak bilgini önce güvendiğin biriyle konuşabilir, başka birinin anlatımıyla karşılaştırabilir veya tartışmada açıklayabilirsin.</p>
        <p className="mt-2">“Metinde bu yazıyor” ile “bence bu anlama geliyor” ayrımını yapın. Susmak tek başına hainlik kanıtı değildir. Birini oyundan çıkarma veya rolünü zorla açma yok; çelişkileri sorgulayıp güvenmediğiniz öneriye oy vermeyebilirsiniz. İpucu saklamak doğrudan puan kazandırmaz; hainin amacı sizi yenilgiye götürmektir.</p>
        <p className="mt-2 not-italic text-[#c9b48a]">Örnek: Simyacı “Buhar yanıcı, ateş kullanmayalım” der; Bilgin “Mühür gönüllü kanla açılıyor” diye tamamlar. Sonra grup seçenekleri değerlendirir. Doğru yorum başarıyı garanti etmez; zar yine atılır.</p>
      </section>

      {/* Adımlar — dikey zaman çizelgesi */}
      <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[21px] before:top-6 before:w-px before:bg-gradient-to-b before:from-[#c9a24a]/60 before:via-[#7a0e1a]/60 before:to-transparent">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative flex gap-3">
            <span className="relative z-[1] grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#c9a24a]/60 bg-[#1b0f24] text-lg shadow-[0_0_12px_-4px_rgba(201,162,74,0.7)]">
              <span aria-hidden>{s.icon}</span>
            </span>
            <div className="flex-1 rounded-xl border border-white/5 bg-[#1b0f24]/70 p-3">
              <h3 className="text-[17px] font-bold text-[#f3dfa6]" style={FONT_DISPLAY}>
                <span className="mr-1.5 text-[#c9a24a]/70">{i + 1}.</span>
                {s.title}
              </h3>
              <p className="mt-1 text-[16px] leading-relaxed text-[#e4d6b8]">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Zar kuralları */}
      <Parchment title="Zarın Kanunu">
        <ul className="space-y-1.5 text-[16px] leading-snug">
          <li>
            <b className="text-[#5c0612]">Doğal 20</b> — Ne olursa olsun başarı. Kader seni seçti.
          </li>
          <li>
            <b className="text-[#5c0612]">Doğal 1</b> — Ne olursa olsun başarısızlık. Lanetli zar.
          </li>
          <li>
            <b className="text-[#5c0612]">Zorluk (DC)</b> — Butonda yazan sayı. Zar + bonus bu sayıya eşit ya da büyükse başarılısın.
          </li>
        </ul>
      </Parchment>

      {/* Grup büyüklüğü */}
      <section>
        <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#c9a24a]" style={FONT_DISPLAY}>
          Grup büyüklüğü dengeyi değiştirir
        </h3>
        <div className="overflow-hidden rounded-xl border border-[#c9a24a]/20">
          <table className="w-full text-left text-[15px]">
            <thead className="bg-[#2a1235] text-[13px] uppercase tracking-wider text-[#c9a24a]">
              <tr>
                <th className="px-3 py-2 font-semibold">Oyuncu</th>
                <th className="px-3 py-2 font-semibold">Zorluk</th>
                <th className="px-3 py-2 font-semibold">Can / Hasar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#1b0f24]/70">
              <tr>
                <td className="px-3 py-2 font-bold">2–4</td>
                <td className="px-3 py-2 text-[#9be29b]">%15 kolay</td>
                <td className="px-3 py-2">Daha fazla can</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold">5–8</td>
                <td className="px-3 py-2">Standart</td>
                <td className="px-3 py-2">Standart</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-bold">9–12</td>
                <td className="px-3 py-2 text-[#ff7a7f]">%20 zor</td>
                <td className="px-3 py-2">Hasar gruba paylaştırılır</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Altın kurallar */}
      <section className="rounded-xl border border-[#7a0e1a]/50 bg-[#2a0d12]/50 p-4">
        <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#ff9a9e]" style={FONT_DISPLAY}>
          Unutma
        </h3>
        <ul className="list-disc space-y-1.5 pl-5 text-[16px] leading-snug text-[#e4d6b8] marker:text-[#7a0e1a]">
          <li>Birlikte modunda herkes aynı tarafta; Gizli Hain modunda bir kişi karanlık için çalışır.</li>
          <li>Kimse tüm resmi görmez. Bir sınıfın ipucu, diğerininkinin eksik parçası olabilir.</li>
          <li>Telefonlarınızı birbirinize göstermek yerine ipuçlarını sözlü aktarın; amaç bilgileri birlikte anlamlandırmaktır.</li>
          <li>Bağlantın koparsa aynı odaya tekrar gir; karakterin seni bekler.</li>
        </ul>
      </section>

      <button
        type="button"
        onClick={onShowClasses}
        className="w-full rounded-xl border border-[#c9a24a]/50 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#f3dfa6] transition active:scale-[0.98] active:bg-white/5"
        style={FONT_DISPLAY}
      >
        Karakterleri tanı →
      </button>
    </div>
  );
}

// ═══════════════════════════════ Karakterleri Tanı ═══════════════════════════════

function ClassCodex({
  onSelectClass,
  takenClasses,
  mySelectedClass,
}: {
  onSelectClass?: (id: ClassId) => void;
  takenClasses: ClassId[];
  mySelectedClass: ClassId | null;
}) {
  const [filter, setFilter] = useState<ClassArchetype | 'Tümü'>('Tümü');
  const [openId, setOpenId] = useState<ClassId | null>(null);
  // "Tümü"de de arketip sırasına göre gruplanmış gelir: Görenler → Bilenler → Yapanlar → Koruyanlar
  const order = ARCHETYPES.map((a) => a.id);
  const list = CLASS_IDS.map((id) => CLASSES[id])
    .filter((c) => filter === 'Tümü' || c.archetype === filter)
    .sort((x, y) => order.indexOf(x.archetype) - order.indexOf(y.archetype));
  const activeArchetype = ARCHETYPES.find((a) => a.id === filter);

  return (
    <div className="space-y-4">
      <p className="text-center text-[17px] not-italic leading-relaxed text-[#d9c9a6]">
        Her sınıf hikayenin farklı bir yüzünü görür. Hiçbiri tek başına yeterli değil.
      </p>

      {/* Arketip filtresi */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {(['Tümü', ...ARCHETYPES.map((a) => a.id)] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[14px] font-semibold uppercase tracking-wider transition ${
              filter === f ? 'border-[#c9a24a] bg-[#c9a24a]/15 text-[#f3dfa6]' : 'border-white/10 text-[#c7b9d0]'
            }`}
          >
            {f === 'Tümü' ? 'Tümü' : ARCHETYPES.find((a) => a.id === f)!.label}
          </button>
        ))}
      </div>
      {activeArchetype && <p className="text-[15px] text-[#c9b48a]">{activeArchetype.blurb}</p>}

      <ul className="grid gap-3 sm:grid-cols-2">
        {list.map((c) => (
          <ClassCard
            key={c.id}
            def={c}
            open={openId === c.id}
            onToggle={() => setOpenId(openId === c.id ? null : c.id)}
            selectable={!!onSelectClass}
            taken={takenClasses.includes(c.id) && mySelectedClass !== c.id}
            mine={mySelectedClass === c.id}
            onSelect={() => onSelectClass?.(c.id)}
          />
        ))}
      </ul>
    </div>
  );
}

const ARCHETYPE_COLOR: Record<ClassArchetype, string> = {
  Gören: 'text-[#b9a4ff] border-[#b9a4ff]/40',
  Bilen: 'text-[#e8c66a] border-[#e8c66a]/40',
  Yapan: 'text-[#8fd6b4] border-[#8fd6b4]/40',
  Koruyan: 'text-[#ff8a8f] border-[#ff8a8f]/40',
};

function ClassCard({
  def,
  open,
  onToggle,
  selectable,
  taken,
  mine,
  onSelect,
}: {
  def: ClassDefinition;
  open: boolean;
  onToggle: () => void;
  selectable: boolean;
  taken: boolean;
  mine: boolean;
  onSelect: () => void;
}) {
  const panelId = `class-${def.id}`;
  return (
    <li
      className={`overflow-hidden rounded-2xl border bg-[#1b0f24]/85 transition ${
        mine ? 'border-[#e8c66a] shadow-[0_0_20px_-6px_rgba(232,198,106,0.8)]' : open ? 'border-[#c9a24a]/50' : 'border-white/10'
      } ${taken ? 'opacity-55' : ''}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#e8c66a]"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-[#c9a24a] bg-[radial-gradient(circle_at_35%_30%,#4b2160,#1a0c22)] text-xl text-[#e8c66a]">
          <ClassEmblem classId={def.id} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="text-[17px] font-bold text-[#f3dfa6]" style={FONT_DISPLAY}>
              {def.title}
            </span>
            <span className={`rounded-full border px-1.5 py-px text-[12px] uppercase tracking-wider ${ARCHETYPE_COLOR[def.archetype]}`}>
              {def.archetype}
            </span>
          </span>
          <span className="mt-0.5 block text-[15px] leading-snug text-[#d9c9a6]">{def.duty}</span>
        </span>
        <span aria-hidden className={`shrink-0 text-[#c9a24a] transition-transform ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      {open && (
        <div id={panelId} className="space-y-3 border-t border-white/5 px-3 pb-3 pt-3">
          <p className="text-[16px] not-italic text-[#c9b48a]">{def.description}</p>
          <Detail icon="👁" label="Gizli ipucunda ne görür">
            {def.sees}
          </Detail>
          <Detail icon="🎲" label={`Zar attığı anlar (+${def.rollBonus})`}>
            {def.rollsFor}
          </Detail>
          <div className="rounded-lg bg-[#e9d9b4] p-2.5 text-[15px] leading-snug text-[#2b1a10]">
            <b className="text-[#5c0612]">Masa tavsiyesi: </b>
            {def.tip}
          </div>

          {selectable && (
            <button
              type="button"
              disabled={taken || mine}
              onClick={onSelect}
              className={`w-full rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] transition active:scale-[0.98] ${
                mine
                  ? 'border border-[#e8c66a] text-[#e8c66a]'
                  : taken
                    ? 'cursor-not-allowed border border-white/10 text-[#8d7a96]'
                    : 'border border-[#e8c66a]/70 bg-gradient-to-b from-[#9e1424] to-[#5c0612] text-[#fbe7b0]'
              }`}
              style={FONT_DISPLAY}
            >
              {mine ? 'Senin sınıfın' : taken ? 'Başka biri seçti' : 'Bu sınıfı seç'}
            </button>
          )}
        </div>
      )}
    </li>
  );
}

// ═══════════════════════════════ Küçük parçalar ═══════════════════════════════

function Detail({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <span aria-hidden className="mt-0.5 text-base">
        {icon}
      </span>
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#c9a24a]">{label}</p>
        <p className="text-[16px] leading-snug text-[#e4d6b8]">{children}</p>
      </div>
    </div>
  );
}

function Parchment({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-[#e9d9b4] p-4 text-[#2b1a10] shadow-[inset_0_0_30px_rgba(92,52,20,0.5)]">
      <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#5c0612]" style={FONT_DISPLAY}>
        {title}
      </h3>
      {children}
    </section>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <span className="rounded border border-[#c9a24a]/50 bg-[#2a1235] px-1.5 py-px font-mono text-[14px] tracking-[0.2em] text-[#f3dfa6]">
      {children}
    </span>
  );
}
