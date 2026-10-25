import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceFiles = ['mahzen_01_karanlik_mahzen.json', 'mahzen_02_06_derinlikler.json', 'mahzen_07_final.json'];
const nodes = [];
for (const file of sourceFiles) {
  const raw = JSON.parse(await readFile(path.join(root, 'story', file), 'utf8'));
  nodes.push(...(Array.isArray(raw) ? raw : [raw]));
}
const nodeById = new Map(nodes.map((node) => [node.node_id, node]));
const orderedIds = ['mahzen_01_karanlik_mahzen','mahzen_02_muhurlu_kapi','mahzen_03_elspeth_fisiltisi','mahzen_03b_sahte_ses','mahzen_04_kan_muhru','mahzen_04b_uyanan_muhur','mahzen_05_gizli_gecit','mahzen_06_yanan_mahzen','konak_02_buyuk_salon','mahzen_07_ac_olan','mahzen_08_son_direnis'];
const focus = {
  mahzen_01_karanlik_mahzen: 'Mutfak kapağından inen on üç basamak, çürük fıçılar ve raflar, ağlı alçak taş kemer, zincirli demir kapı, taze yağlı kilit, küçük çıplak ayak izleri ve eğilen fenerler aynı geniş kadrajda.',
  mahzen_02_muhurlu_kapi: 'Zincirli demir kapı, taze yağlı kilit ve koruma işareti; kapının gerisinden gelen tırmalama.',
  mahzen_03_elspeth_fisiltisi: 'Fıçıların yanında soluk ve ürkek çocuk ruhu Elspeth; bileğinde ince bağlama ipi, rafın arkasına yönelen eli.',
  mahzen_03b_sahte_ses: 'Ninniyi taklit eden ince uzun gölge/ghoul, dar mahzen koridorunda ve devrilmeye hazır fener yanında.',
  mahzen_04_kan_muhru: 'Açılan kemerin ardında Agatha’nın eski eşyaları, defter, sunak ve tabut; kâğıtta tehditkâr kadın silueti ve isim ipucu.',
  mahzen_04b_uyanan_muhur: 'Kızıl parlayan ve çatlayan mühür, soğuk dalga, taş parçalarından korunan grup.',
  mahzen_05_gizli_gecit: 'Şarap rafının ardındaki nemli dar geçit; dallanan tünel, eski yük asansörü, taş altındaki yırtık sayfa ve açık çember.',
  mahzen_06_yanan_mahzen: 'Mavi alev, tutuşan yağ fıçıları ve duman arasında çıkış arayan grup.',
  konak_02_buyuk_salon: 'Blackthorne Konağı’nın portreli gotik büyük salonu; sisle dolu ön kapı, aşağı mahzene dönen yol.',
  mahzen_07_ac_olan: 'Sunak önünde Morvaine olarak adı bilinen aç varlığın karanlık silueti; Elspeth ve yıpranmış grup. Varlığa kaynakta olmayan ayrıntılı görünüş ekleme.',
  mahzen_08_son_direnis: 'Son kez karşı koyan yıpranmış ekip, Elspeth’in uzattığı el, çatlayan mühür, zincir ve son kandil.'
};
const ambience = { cave_wind: 'Mağara rüzgârı', scary_cave: 'Tekinsiz mağara', droplets: 'Mağara damlaları', music_box: 'Korkunç müzik kutusu' };
const ending = { victory: 'Zafer', bittersweet: 'Buruk son', defeat: 'Yenilgi' };
const lines = [];
const add = (...parts) => lines.push(...parts);
const escapeCell = (text = '') => String(text).replaceAll('|', '\\|').replaceAll('\n', ' ');

add('# Blackthorne Konağı: Karanlık Mahzen', '## Adım adım senaryo ve görsel üretim brief’i', '');
add('Bu belge, mutfak kapağının kendi kendine açıldığı başlangıçtan maceranın bütün kayıtlı sahne ve karar dallarına kadar gider. Kaynaklar: `story/mahzen_01_karanlik_mahzen.json`, `story/mahzen_02_06_derinlikler.json`, `story/mahzen_07_final.json`.', '');
add(`**Kapsam:** ${orderedIds.length} sahne · ${orderedIds.reduce((n, id) => n + nodeById.get(id).actions.length, 0)} seçenek · ${orderedIds.reduce((n, id) => n + nodeById.get(id).actions.length * 2, 0)} zar sonucu dalı. Her sahne için bir ana görsel ve her seçenek için ayrı başarı ve başarısızlık görseli: toplam en az 145 görsel.`, '> Tam spoiler içerir; görsel üretecek AI’ye verilebilir.', '');
add('## Görsel sanat yönetimi', '');
add('- Gotik orta çağ karanlık-fantezi hikâye kitabı; dokulu el boyaması, sinematik ama okunaklı, eski/nemli taş mimari. Koyu erik, isli siyah, taş grisi ve yosun yeşili; fener ışığı sınırlı kehribar. Büyülü tehditte soğuk mor/kızıl vurgu.', '- Yatay 16:9, tek net an ve katmanlı derinlik. Yazı, logo, altyazı, arayüz ve filigran yok. Kaynakta olmayan olay/nesne/karakter ekleme.', '- Elspeth ürkütücü ama masum bir çocuk ruhu olarak resmedilsin. Grafik şiddet ve aşırı kan yok. Kaynak görünüşü tanımlamıyorsa karakterleri siluet tut.', '- Her kare aynı konağın mimarisini, fener modelini, ters taç işaretini ve karakter tasarımını korusun.', '', '### Ana sahne görseli promptu', '```text', 'Tales of Ravenwood için tek karelik gotik orta çağ karanlık-fantezi hikâye kitabı illüstrasyonu. Dokulu el boyaması, sinematik ışık, net odak, katmanlı derinlik; koyu erik, isli siyah, taş grisi ve yosun yeşili; fenerlerde sınırlı kehribar ışığı. Blackthorne Konağı’nın eski, nemli taş mimarisini ve aynı fener tasarımını tüm sahnelerde koru. Yatay 16:9, tek an, okunaklı siluetler. Yazı, logo, altyazı, arayüz veya filigran kullanma. Kaynakta olmayan olay ekleme. Atmosferik korku; grafik şiddet ve aşırı kan yok. Sahne odağı: [sahne görsel odağı]. Olay: [kaynak sahne metni].', '```', '', '### Başarı/başarısızlık sonucu promptu', '```text', 'Bu, aynı mekânın devam karesi: mimari, ışık, karakterler ve eşya yerleşimi tutarlı kalsın. Şu eylemin sadece belirtilen zar sonucunu tek karede göster: [seçenek]. Zar [başarılı/başarısız]. Sonuç olayı: [kaynak outcome.text]. HP etkisi: [hp_change]. Ardından gidilen sahne veya final: [hedef]. Kaynakta yazılandan fazlasını ekleme; görselde metin/kolaj olmasın.', '```', '');
add('## Oyun akışı ve sonuç kuralları', '');
add('- Oyuncular bir seçeneğe gizli oy verir; en çok oy alan kazanır. Beraberlikte hikâyedeki ilk seçenek kazanır. Sınıfa özel seçenek ancak o sınıftan biri odadaysa görünür; herkes görünür bir eyleme oy verebilir.', '- Başarı eşiği temel DC’nin oyuncu sayısına göre ölçeklenmesidir: 2–4 kişi ×0,85; 5–8 ×1; 9–12 ×1,2. Eylemin sınıf sahibi zarı atıyorsa +2 alır. Doğal 1 daima başarısız, doğal 20 daima başarılıdır.', '- Her sonucun HP değişimi ve sonraki sahnesi aşağıda gösterilir. Eksi HP hasar, artı HP iyileşmedir. 2–8 oyuncuda hasar zarı atana, 9–12 oyuncuda gruba dağıtılır. Toplam HP sıfıra düşerse oyun doğrudan “Karanlık Kazandı” yenilgisi verir.', '- Birlikte Hayatta Kal modunda Zafer/Buruk son grup başarısı, Yenilgi grup kaybıdır. 4–12 kişilik Gizli Hain modunda bir kişi karanlık tarafındadır; yalnız o oyuncu sahne işaretinin hain bilgisini görür ve iki lanetle zar DC’sini artırabilir. Hain yenilgide, maceracılar zafer/buruk sonda kazanır.', '');

for (const id of orderedIds) {
  const node = nodeById.get(id);
  add(`## ${orderedIds.indexOf(id) + 1}. ${node.title}`, '', `**Sahne ID:** \`${id}\`  `, `**Ana görsel yolu:** \`scene-art/mahzen/${id}/scene.webp\`  `);
  add(`**Görsel odağı:** ${focus[id]}`);
  add(`**Atmosfer:** ${node.ambience ? `${ambience[node.ambience]} (\`${node.ambience}\`)` : 'Özel sahne efekti yok; genel Cadılar Bayramı müziği.'}`, '');
  add('**Oyuncuların gördüğü sahne metni:**', '', `> ${node.public_text.replaceAll('\n', '\n> ')}`, '');
  if (node.story_role) add(`**Sahne rolü:** ${node.story_role.title}. ${node.story_role.intro} Soru: ${node.story_role.prompt}`, '');
  if (node.class_hints && Object.keys(node.class_hints).length) {
    add('**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**');
    for (const [classId, hint] of Object.entries(node.class_hints)) add(`- ${classId}: ${hint}`);
    add('');
  }
  if (node.darkness) add(`**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** ${node.darkness.hint}`, `Desteklenen işaret seçenekleri: ${node.darkness.favored_action_ids.map((actionId) => `\`${actionId}\``).join(', ')}.`, '');
  add('**Adım adım seçenekler ve iki zar ihtimali:**', '');
  node.actions.forEach((action, index) => {
    const who = action.required_class === 'ANY' ? 'Herkes' : action.required_class;
    const writeOutcome = (label, outcome, suffix) => {
      let next;
      if (outcome.next_node_id) next = nodeById.has(outcome.next_node_id) ? `→ **${nodeById.get(outcome.next_node_id).title}** (\`${outcome.next_node_id}\`)` : `→ tanımsız hedef \`${outcome.next_node_id}\``;
      else if (outcome.ending) next = `→ **SON: ${outcome.ending.title} (${ending[outcome.ending.type]})**`;
      else next = '→ hedef belirtilmemiş';
      add(`   - **${label}:** ${outcome.text} (HP ${outcome.hp_change > 0 ? '+' : ''}${outcome.hp_change}) ${next}. Görsel: \`${id}/${action.action_id}_${suffix}.webp\``);
    };
    add(`${index + 1}. **${who} — ${action.button_text}** (temel DC ${action.dice_dc}; seçenek ID: \`${action.action_id}\`)`);
    writeOutcome('Başarı', action.success, 'success');
    writeOutcome('Başarısızlık', action.fail, 'fail');
  });
  add('');
}

add('## Sonların dökümü', '');
const finals = new Map();
for (const id of orderedIds) {
  const node = nodeById.get(id);
  for (const action of node.actions) for (const [resultName, outcome] of [['başarı', action.success], ['başarısızlık', action.fail]]) if (outcome.ending) {
    const key = `${outcome.ending.title}|${outcome.ending.type}`;
    if (!finals.has(key)) finals.set(key, { title: outcome.ending.title, type: outcome.ending.type, paths: [] });
    finals.get(key).paths.push(`${node.title} / ${action.button_text} / zar ${resultName}`);
  }
}
for (const item of finals.values()) add(`- **${item.title} (${ending[item.type]})** — ${item.paths.join('; ')}.`);
add('', `Karanlık Mahzen’de kaynakta ${finals.size} farklı adlandırılmış son var. Toplam grup HP’si sıfırlanırsa bu sonlardan bağımsız **Karanlık Kazandı (yenilgi)** uygulanır.`, '');
add('## Son görselleri için kısa fikirler', '');
for (const item of finals.values()) add(`- **${item.title}:** ${item.type === 'victory' ? 'tehdidin durduğu ve sabah/umut ışığının göründüğü an' : item.type === 'bittersweet' ? 'kurtuluşun bir bedel bıraktığı, umut ve kaybın birlikte görüldüğü an' : 'karanlığın kazandığı, grafik şiddet içermeyen kapanış anı'}. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.`);
add('', '## Görsel envanteri kontrolü', '', '- [ ] 11 ana sahne görseli.', '- [ ] 67 eylemin her biri için 1 ayrı başarı ve 1 ayrı başarısızlık görseli (134 kare).', '- [ ] Aynı hedef düğüme ulaşan farklı olaylar ayrı çizildi.', '- [ ] Ters taç, mekânlar, fenerler ve Elspeth’in tasarımı tutarlı.', '- [ ] Her sonuç doğru HP etkisi ve hedef sahne/final ile eşleşiyor.', '- [ ] Görsellerde yazı, UI, logo ve filigran yok.', '', '**AI için son talimat:** Bu belgeyi baştan sona izle. İlk kare mutfak kapağı ve on üç basamaktan oluşan Karanlık Mahzen olmalı. Her sahne için bir ortam resmi, her eylem için iki ayrı sonuç resmi üret. Başarı/başarısızlık olay metnini ve hedef sahneyi aynen takip et. Farklı eylemlerin sonuç karelerini birleştirme. Dosya adlarını `scene-art/mahzen/<node_id>/scene.webp` ve `scene-art/mahzen/<node_id>/<action_id>_success.webp` / `_fail.webp` biçiminde kaydet. Üretim sonunda beklenen ve üretilen dosya listesini karşılaştırıp eksikleri raporla.', '');

const out = path.join(root, 'KARANLIK_MAHZEN_ADIM_ADIM_GORSEL_BRIEF.md');
await writeFile(out, lines.join('\n'), 'utf8');
console.log(JSON.stringify({ out, scenes: orderedIds.length, choices: orderedIds.reduce((n, id) => n + nodeById.get(id).actions.length, 0), endings: finals.size }));
