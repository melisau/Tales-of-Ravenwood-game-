import type { ClassArchetype, ClassDefinition, ClassId } from './types';
import { CLASS_IDS } from './types';

/**
 * 12 sınıfın tanımı. "Karakterleri Tanı" ekranı, lobi sınıf seçimi ve
 * oyun içi karakter ekranı bu tek kaynaktan beslenir.
 */
export const CLASSES: Readonly<Record<ClassId, ClassDefinition>> = {
  Medyum: {
    id: 'Medyum', title: 'Medyum', sigil: '☾', archetype: 'Gören', rollBonus: 2,
    description: 'Ölülerin fısıltısını duyar, perdenin ardını hisseder.',
    duty: 'Hayaletlerle konuşur, hangi ruhun dost hangisinin tehlike olduğunu ayırt eder.',
    sees: 'Odadaki ruhların varlığı, adları ve niyetleri; taklit edilen sesler.',
    rollsFor: 'Ruhlarla iletişim, lanetli varlıkları sakinleştirme.',
    tip: 'Hissettiğin şeyi anlatırken kimin sesine güvenilmeyeceğini mutlaka söyle.',
  },
  Dedektif: {
    id: 'Dedektif', title: 'Dedektif', sigil: '⌕', archetype: 'Gören', rollBonus: 2,
    description: 'Tuzakları, yalanları ve yerinden oynamış tozu görür.',
    duty: 'Tuzakları fark eder ve etkisiz hale getirir; gerçeği yalandan ayırır.',
    sees: 'Gizli tuzaklar, sahte izler, birinin yakın zamanda dokunduğu nesneler.',
    rollsFor: 'Tuzak etkisizleştirme, sorgulama, olay yeri incelemesi.',
    tip: 'Grup acele ediyorsa dur dedirtecek kişi sensin; tuzak ipucunu erken paylaş.',
  },
  Falcı: {
    id: 'Falcı', title: 'Falcı', sigil: '◈', archetype: 'Gören', rollBonus: 2,
    description: 'Kartlarda ve kehanetlerde olası sonları görür.',
    duty: 'Seçeneklerin olası sonuçlarını sezer; grubu felaket yollardan uzak tutar.',
    sees: 'Belirsiz kehanetler: "ateş seçen yanar", "ikinci kapı geri dönmez" gibi uyarılar.',
    rollsFor: 'Kehanet yorumlama, kaderi değiştirme ritüelleri.',
    tip: 'Kehanetlerin muğlak gelir; yorumunu grupla birlikte yap.',
  },
  Bilgin: {
    id: 'Bilgin', title: 'Bilgin', sigil: '✠', archetype: 'Bilen', rollBonus: 2,
    description: 'Kadim yazıları ve mühürleri okur.',
    duty: 'Yazıları, sembolleri ve mühürleri çözer; kilitli kapıların anahtarı çoğu zaman odur.',
    sees: 'Duvarlardaki yazıların çevirisi, sembollerin anlamı ve doğru ritüel.',
    rollsFor: 'Mühür açma, kadim metin okuma, şifre çözme.',
    tip: 'Okuduğun yazıyı aynen aktar; bir kelime bile başka bir sınıfın ipucunu tamamlayabilir.',
  },
  Günlükçü: {
    id: 'Günlükçü', title: 'Günlükçü', sigil: '✎', archetype: 'Bilen', rollBonus: 2,
    description: 'Ravenwood\'un unutulmuş tarihini kayda geçirmiştir.',
    duty: 'Geçmişi hatırlar; isimler, tarihler ve aile sırları onun defterindedir.',
    sees: 'Mekânın geçmişi, kayıp kişiler, yırtılmış sayfalar ve eski olaylar.',
    rollsFor: 'Arşiv araştırma, geçmişteki olayları yeniden kurma.',
    tip: 'Bulduğun isimleri bir kenara not et; bazı varlıklar ancak adıyla geri gönderilebilir.',
  },
  Gizemci: {
    id: 'Gizemci', title: 'Gizemci', sigil: '✶', archetype: 'Bilen', rollBonus: 2,
    description: 'Büyüyü sezer ve bozar.',
    duty: 'Büyüleri, lanetleri ve koruma çemberlerini fark eder, bozar ya da kurar.',
    sees: 'Görünmez büyü izleri, lanetli nesneler, büyünün kaynağı.',
    rollsFor: 'Lanet kırma, büyü bozma, koruma çemberi kurma.',
    tip: 'Bir şey "fazla kolay" görünüyorsa üzerinde büyü olabilir; sesli düşün.',
  },
  Simyacı: {
    id: 'Simyacı', title: 'Simyacı', sigil: '⚗', archetype: 'Yapan', rollBonus: 2,
    description: 'Zehri, iksiri ve yanıcı tozu tanır.',
    duty: 'Maddeleri tanır, iksir ve panzehir hazırlar; patlayıcı tehlikeleri önceden görür.',
    sees: 'Kokular, sıvılar, sporlar, zehirler ve neyin ateş alacağı.',
    rollsFor: 'İksir yapma, zehir tanıma, kimyasal tuzakları kullanma.',
    tip: 'Grup ateş veya ışıkla ilgili bir seçeneğe yönelirse önce seni dinlesinler.',
  },
  Tamirci: {
    id: 'Tamirci', title: 'Tamirci', sigil: '⚙', archetype: 'Yapan', rollBonus: 2,
    description: 'Kilitleri, menteşeleri ve mekanizmaları çözer.',
    duty: 'Kilitleri açar, mekanizmaları çalıştırır ya da bozar, aletleri onarır.',
    sees: 'Kilit tipleri, gizli düzenekler, zayıf menteşeler ve dişli sistemleri.',
    rollsFor: 'Kilit açma, düzenek çalıştırma, kırık aletleri onarma.',
    tip: 'Kapılar ve sandıklar senin alanın; zorla açmadan önce sana sorsunlar.',
  },
  İzci: {
    id: 'İzci', title: 'İzci', sigil: '➶', archetype: 'Yapan', rollBonus: 2,
    description: 'İz sürer, gizli geçitleri ve rüzgârın yönünü bulur.',
    duty: 'Yol bulur; gizli geçitleri, kaçış rotalarını ve ayak izlerini takip eder.',
    sees: 'Hava akımları, ayak izleri, gizli geçitler ve güvenli rotalar.',
    rollsFor: 'Gizli geçit bulma, iz sürme, sessizce ilerleme.',
    tip: 'Çıkmaza girdiğinizde ilk bakılacak kişi sensin; alternatif yolu hep aklında tut.',
  },
  Muhafız: {
    id: 'Muhafız', title: 'Muhafız', sigil: '⛨', archetype: 'Koruyan', rollBonus: 2,
    description: 'Grubu korur, darbeleri göğüsler.',
    duty: 'Grubun kalkanıdır; saldırıları karşılar, kapıları tutar, zayıfları korur.',
    sees: 'Saldırı yönleri, savunulabilir noktalar, yapısal tehlikeler.',
    rollsFor: 'Darbe karşılama, kapı tutma, ağır nesne kaldırma.',
    tip: 'İpucun az olabilir ama zar anında sen öne çıkarsın; riskli anlarda gönüllü ol.',
  },
  Şifacı: {
    id: 'Şifacı', title: 'Şifacı', sigil: '✚', archetype: 'Koruyan', rollBonus: 2,
    description: 'Yaraları sarar, lanetin ilerleyişini yavaşlatır.',
    duty: 'Grubun canını yerine getirir; yaraları ve lanetleri tedavi eder.',
    sees: 'Kimin ne kadar yaralı olduğu, hastalık ve lanet belirtileri.',
    rollsFor: 'İyileştirme, zehir/lanet tedavisi, bilinci yerine getirme.',
    tip: 'Herkesin can barını takip et; grup kritik seviyedeyse temkinli seçenekleri savun.',
  },
  Avcı: {
    id: 'Avcı', title: 'Avcı', sigil: '⚔', archetype: 'Koruyan', rollBonus: 2,
    description: 'Gece yaratıklarının zayıf noktalarını bilir.',
    duty: 'Yaratıkları tanır, zayıf noktalarını bilir ve onlarla savaşır.',
    sees: 'Pençe izleri, yaratık türleri ve onları durduracak şey (tuz, gümüş, ateş...).',
    rollsFor: 'Yaratık avlama, tuzak kurma, savaş.',
    tip: 'Hangi canavarla karşı karşıya olduğunuzu ilk sen anlarsın; zaafını gruba söyle.',
  },
};

export const ARCHETYPES: ReadonlyArray<{ id: ClassArchetype; label: string; blurb: string }> = [
  { id: 'Gören', label: 'Görenler', blurb: 'Başkalarının göremediğini fark ederler: ruhlar, tuzaklar, kehanetler.' },
  { id: 'Bilen', label: 'Bilenler', blurb: 'Yazıyı, tarihi ve büyüyü çözerler. Kapıların anahtarı onlardadır.' },
  { id: 'Yapan', label: 'Yapanlar', blurb: 'Elleriyle çözerler: iksir, kilit, gizli geçit.' },
  { id: 'Koruyan', label: 'Koruyanlar', blurb: 'Grubu ayakta tutarlar: kalkan, şifa ve av.' },
];

export function isClassId(value: unknown): value is ClassId {
  return typeof value === 'string' && (CLASS_IDS as readonly string[]).includes(value);
}
