import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const storyDir = path.join(root, 'story');
const outFile = path.join(root, 'TALES_OF_RAVENWOOD_GORSEL_URETIM_DOKUMANI.md');
const files = (await readdir(storyDir)).filter((file) => file.endsWith('.json')).sort();
const nodes = [];
for (const file of files) {
  const raw = JSON.parse(await readFile(path.join(storyDir, file), 'utf8'));
  nodes.push(...(Array.isArray(raw) ? raw : [raw]).map((node) => ({ ...node, _source: file })));
}
const byId = new Map(nodes.map((node) => [node.node_id, node]));
const adventureGroups = [
  { id: 'mahzen', title: 'Karanlık Mahzen / Blackthorne Konağı', start: 'mahzen_01_karanlik_mahzen', ids: ['mahzen_01_karanlik_mahzen','mahzen_02_muhurlu_kapi','mahzen_03_elspeth_fisiltisi','mahzen_03b_sahte_ses','mahzen_04_kan_muhru','mahzen_04b_uyanan_muhur','mahzen_05_gizli_gecit','mahzen_06_yanan_mahzen','konak_02_buyuk_salon','mahzen_07_ac_olan','mahzen_08_son_direnis'] },
  { id: 'yankilar', title: 'Yankı Mağaraları', start: 'yanki_01_esik', ids: ['yanki_01_esik','yanki_02_damlalar','yanki_03_agiz','yanki_04_sarnic','yanki_05_kokler','yanki_06_kalp'] },
  { id: 'nota', title: 'On Üçüncü Nota', start: 'nota_01_cocuk_odasi', ids: ['nota_01_cocuk_odasi','nota_02_disli','nota_03_portreler','nota_04_ayna','nota_05_damla_mahzeni','nota_06_son_nota'] },
];
const clean = (value = '') => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
const endingType = { victory: 'Zafer', bittersweet: 'Buruk son', defeat: 'Yenilgi' };
const audioNames = { cave_wind: 'Mağara rüzgârı', scary_cave: 'Tekinsiz mağara', droplets: 'Mağara damlaları', music_box: 'Korkunç müzik kutusu' };
let edgeCount = 0;
let actionCount = 0;
let missing = new Set();
const lines = [];
const add = (...items) => lines.push(...items);

add('# TALES OF RAVENWOOD — TÜM SENARYOLAR VE GÖRSEL ÜRETİM BRİEF’İ');
add('', '> Bu doküman, `story/*.json` kaynaklarının tüm mevcut sahnelerini, seçeneklerini, zar başarı/başarısızlık sonuçlarını, geçişlerini ve sonlarını kapsar. Görsel üretiminde tek doğruluk kaynağı olarak kullanılabilir.', '');
add('**Doküman sürümü:** Kaynak hikâye dosyalarından otomatik oluşturuldu.  ', `**Kapsam:** ${nodes.length} sahne düğümü · ${nodes.reduce((sum, n) => sum + n.actions.length, 0)} sahne seçeneği · ${nodes.reduce((sum, n) => sum + n.actions.length * 2, 0)} zar sonucu dalı.`, '');
add('## Görsel üretim görevi', '');
add('Bu oyunun üç macerasını baştan sona resimle. **Her sahne düğümü için bir ana sahne illüstrasyonu**, her görünür seçim için **başarı ve başarısızlık anını ayrı ayrı gösteren iki sonuç illüstrasyonu** oluştur. Aynı sonuç düğümüne farklı yollardan gelinse bile kaynakta her eylem için farklı olay yazıyorsa eylem sonucunu ayrı çiz. Böylece asgari üretim sayısı, aşağıdaki her seçenek için 2 sonuç görseli + her sahne için 1 ana görseldir. Son sahne seçenekleri de iki zar sonucu olarak ayrı sayılır.', '');
add('Her görseli dosya olarak kaydet: `story-art/<macera>/<node_id>/scene.webp`, `story-art/<macera>/<node_id>/<action_id>_success.webp`, `story-art/<macera>/<node_id>/<action_id>_fail.webp`. Aynı eylemin farklı hedef sınıfları olsa da tek seçenek/tek sonuç çifti üret. İstenirse varyantları ayrıca üret.', '');
add('## Oyun ve sonuç kuralları', '');
add('- Oyun 2–12 oyuncu, aynı odada telefonlarla oynanır. Üç macera: **Karanlık Mahzen**, **Yankı Mağaraları**, **On Üçüncü Nota**. Host lobi aşamasında birini seçer; her macera kendi başlangıç düğümünden açılır.');
add('- Her sahnede ortak anlatı metni ve gruba görünür seçenekler vardır. Sınıfa özel seçenekler yalnızca o sınıf odada bulunuyorsa görünür. Oyuncular gizli oy verir; en çok oyu alan eylem seçilir. Eşitlikte JSON’daki ilk seçenek kazanır.');
add('- Seçilen eylem için bir d20 atılır. Başarı eşiği (DC) oyuncu sayısına göre ölçeklenir: 2–4 kişi ×0,85 (yuvarlanmış), 5–8 kişi ×1,0, 9–12 kişi ×1,2; sınır 2–20. Eylemi kendi sınıfı yapıyorsa zar atan +2 alır. Nat 1 daima başarısız, nat 20 daima başarılıdır.');
add('- Zar sonucu eylemin `success` veya `fail` metnini, HP değişimini ve hedef düğümünü belirler. HP değişimi eksi ise hasar, artı ise iyileşmedir. 2–8 kişide başarısızlık hasarı zarı atana gider; 9–12 kişide gruba puan puan dağıtılır. Grubun toplam HP’si sıfır olunca doğrudan yenilgi.');
add('- Her bağlı oyuncu okuma, seçim, tartışma ve sonuç ekranını onaylayınca ilerler. Otomatik sayaç/oylama yoktur. Bu, görsel talebi etkilemez; promptlar tek bir karar anını ve sonrasındaki sonucu resmetmelidir.');
add('- **Birlikte Hayatta Kal:** Zafer ve buruk son grup başarısıdır; yenilgi grubun kaybıdır. **Gizli Hain** (4–12 kişi): bir oyuncu rastgele karanlığın hizmetkârıdır. Karanlığın işaretinin neden tehlikeli olduğunu yalnızca hain bilir ve işareti savunması istenir; hain iki kez sahne başına bir sonraki zar DC’sine +2 lanet ekleyebilir. Hain yenilgide kazanır; maceracılar zafer/buruk sonda kazanır.');
add('- Gizli sınıf ipuçları ve hain bilgisi normal sahne görseline yazı/ikon olarak eklenmez; resim metinleri spoiler vermemeli. Oyuncu adları sahne rolü metnine eklenebilir; görselde isim üretme veya okunabilir yazı çizme.');
add('- Görsel üreticinin “başarı = iyi, başarısızlık = kötü” diye basitleştirmemesi önemli: kötü işareti destekleyen bir eylem zarla başarılı olabilir ve yine de HP kaybettirip karanlığa yarayan bir sahneye geçebilir. Kaynak sonucunu ve `next_node_id` hedefini birlikte izle.');
add('## Görsel sanat yönetimi / süreklilik rehberi', '');
add('- **Tür ve duygu:** Cadılar Bayramı gecesinde geçen gotik orta çağ karanlık fantezi; hikâye kitabı illüstrasyonu, elle çizilmiş dokulu boya, sinematik ama okunaklı, ürpertici ve gizemli. Aşırı kanlı/grafik korku değil; genç yetişkinlere uygun gerilim.');
add('- **Renk:** koyu erik, isli siyah, taş grisi, yosun yeşili, kirli fildişi; fener ve mumda sınırlı sıcak kehribar. Karanlığın kötü etkisinde soğuk mor/kızıl vurgular; güvenli/iyileştirici anlarda küçük altın ışık. Parlak doygun neon kullanma.');
add('- **Kadraj:** yatay 3:2 veya 16:9, odak nesnesi net, ön/orta/arka plan katmanlı, sahne ekranında metin alanını kapatmayacak kenar boşlukları. Tek görselde tek an; çizgi roman panelleri, kolaj, yazı, altyazı, filigran ve arayüz yok.');
add('- **Süreklilik:** Blackthorne konağı eski, dar taş duvarlı, gotik kemerli, nemli ve eskimiş. Fener aynı tasarımda; mühür ve ters taç işareti hikâye boyunca aynı motif. Hayalet/varlıkların biçimi sahne açıklamasındaki kadar; açıklamada görünüşü verilmeyen karaktere rastgele yüz/giysi ayrıntısı ekleme.');
add('- **Oyuncular:** çoğunlukla kamera arkası/omuz üstü siluet veya el/ayak; sahne rolü alan oyuncuya özel portre gerekiyorsa adı yerine “oyuncu karakteri” de. Her resimde tüm oyuncuları göstermek zorunlu değil; eylemi yapan kişiyi ve eylemin nesnesini anlaşılır kıl.');
add('- **Duyarlılık ve içerik:** küçük Elspeth ve Ada çocuk ruhları olarak ürkütücü ama insanî/masum gösterilsin; çocuklara yönelik şiddet, parçalanma, işkence, aşırı kan yok. Korkuyu gölgeler, mekân, nesne, sesin görsel karşılığı ve ışıkla kur.');
add('- **Yazı:** resmin içine okunabilir yazı, harf, logo veya UI ekleme. Mühür/kitap/levha üzerinde gerektiğinde yalnızca okunamayan dekoratif işaretler kullan; tam okunması gereken ipucu metni oyunun UI’sinde kalır.');
add('', '### Her üretimde kullanılacak ana prompt', '```text');
add('Tales of Ravenwood için tek karelik sahne illüstrasyonu oluştur. Aşağıdaki sahne bilgisine ve olay metnine sadık kal; olay örgüsüne yeni gerçek, karakter veya nesne ekleme. Gotik orta çağ karanlık-fantezi hikâye kitabı estetiği, dokulu el boyaması, sinematik ışık, katmanlı derinlik, okunaklı odak, koyu erik/isli siyah/taş grisi/yosun yeşili paleti ve az miktarda kehribar fener ışığı. Korkutucu ve gizemli, aşırı kanlı değil; çocuk karakterleri savunmasız ama grafik şiddetsiz göster. Yatay 16:9 kompozisyon, tek an, arayüz/yazı/altyazı/logo/filigran yok. Mekân ve önemli nesneler: [sahne açıklamasından seç]. An: [SAHNE veya BAŞARI/BAŞARISIZLIK SONUCU]. Sonuç tonu: [umutlu/ürkütücü/tekinsiz/yıkıcı/buruk]. Kaynak olay metni: “[ilgili kaynak metin]”.');
add('```', '');
add('### Sonuç görseli ek promptu', '```text');
add('Bu, aynı sahne ana görselinin devamlılık karesidir. Mekân mimarisi, fenerler, karakter siluetleri, nesne yerleşimi ve palet aynı kalsın. Yalnızca aşağıdaki zar sonucunun gerçekleştiği tek anı göster; sonucu metinle yazma. Başarıysa bile sonucun tehlikeli olup olmadığını olay metnine göre resmet; başarısızlıksa metindeki hasarı/tehlikeyi göster ama yeni olay ekleme. Önceki anın görsel özeti: [ana sahne promptu]. Eylem: “[button_text]”. Zar sonucu: [BAŞARI/BAŞARISIZLIK]. Sonuç: “[outcome.text]”. HP değişimi: [hp_change]. Sonraki sahne/son: [hedef].');
add('```', '');
add('## Macera yol haritaları', '');

function actionRows(node) {
  return node.actions.map((action, index) => {
    actionCount++;
    const outcomes = [];
    for (const [label, result] of [['BAŞARI', action.success], ['BAŞARISIZLIK', action.fail]]) {
      edgeCount++;
      let destination;
      if (result.next_node_id === null) destination = result.ending ? `**SON: ${clean(result.ending.title)}** (${endingType[result.ending.type]})` : '**SON (son tanımı eksik)**';
      else if (byId.has(result.next_node_id)) destination = `→ ${result.next_node_id} — ${clean(byId.get(result.next_node_id).title)}`;
      else { missing.add(result.next_node_id); destination = `→ **EKSİK DÜĞÜM: ${result.next_node_id}** (uygulama “Devam edecek” buruk sonuna düşer)`; }
      outcomes.push(`**${label}** — ${clean(result.text)} (HP ${result.hp_change > 0 ? '+' : ''}${result.hp_change}) ${destination}. Görsel: \`${node.node_id}/${action.action_id}_${label === 'BAŞARI' ? 'success' : 'fail'}.webp\`.`);
    }
    return `| ${index + 1} | ${clean(action.button_text)} | ${action.required_class === 'ANY' ? 'Herkes' : clean(action.required_class)} | ${action.dice_dc} | ${outcomes.join('<br><br>')} |`;
  }).join('\n');
}

for (const adventure of adventureGroups) {
  const groupNodes = adventure.ids.map((id) => byId.get(id)).filter(Boolean);
  const groupEdges = groupNodes.reduce((sum, node) => sum + node.actions.length * 2, 0);
  const endings = new Set();
  for (const node of groupNodes) for (const action of node.actions) for (const outcome of [action.success, action.fail]) if (outcome.ending) endings.add(`${outcome.ending.title} (${endingType[outcome.ending.type]})`);
  add(`### ${adventure.title}`, '');
  add(`- Başlangıç düğümü: \`${adventure.start}\` · ${groupNodes.length} sahne · ${groupNodes.reduce((sum, node) => sum + node.actions.length, 0)} seçenek · ${groupEdges} başarı/başarısızlık dalı.`, `- Adlandırılmış finaller: ${endings.size ? [...endings].map(clean).join('; ') : 'Yol bu kaynak setinde isimli finale bağlanmıyor.'}`, '');
  add('**Akış özeti:** Her seçeneğin başarı ve başarısızlık hedefi aşağıdaki tabloda yazılıdır. Hedef sahneye varınca o sahnenin tüm seçenekleri kullanılabilir; önceki seçimler yalnızca belirtilen HP etkisini ve hikâyedeki anlatısal durumu taşır.');
  const reachable = new Set([adventure.start]);
  const queue = [adventure.start];
  while (queue.length) {
    const node = byId.get(queue.shift());
    if (!node) continue;
    for (const action of node.actions) for (const outcome of [action.success, action.fail]) if (outcome.next_node_id && byId.has(outcome.next_node_id) && adventure.ids.includes(outcome.next_node_id) && !reachable.has(outcome.next_node_id)) { reachable.add(outcome.next_node_id); queue.push(outcome.next_node_id); }
  }
  const unreachable = adventure.ids.filter((id) => byId.has(id) && !reachable.has(id));
  add(`- Başlangıçtan mevcut bağlantılarla erişilebilir düğüm sayısı: ${reachable.size}/${adventure.ids.filter((id) => byId.has(id)).length}${unreachable.length ? `. Erişilemeyen kayıtlı düğümler: ${unreachable.join(', ')}` : '.'}`);
  add('');
  for (const id of adventure.ids) {
    const node = byId.get(id);
    if (!node) continue;
    add(`#### ${node.title} — \`${node.node_id}\``, '');
    add(`Kaynak dosya: \`${node._source}\`. Görsel yolu: \`story-art/${adventure.id}/${node.node_id}/scene.webp\`.`, '');
    add(`**Sahne anlatısı:** ${clean(node.public_text)}`, '');
    if (node.story_role) add(`**Oyuncu adıyla sahne rolü:** ${clean(node.story_role.title)}. Rol girişi: ${clean(node.story_role.intro)}. Oyuncuya sorulan rol cümlesi: ${clean(node.story_role.prompt)}`, '');
    if (node.ambience) add(`**Atmosfer sesi:** ${audioNames[node.ambience]} (\`${node.ambience}\`).`);
    else add('**Atmosfer sesi:** Bu düğümde özel atmosfer işareti yok; genel Cadılar Bayramı müziği sürer.');
    if (node.class_hints && Object.keys(node.class_hints).length) {
      add('', '**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**', '');
      for (const [classId, hint] of Object.entries(node.class_hints)) add(`- **${classId}:** ${clean(hint)}`);
    }
    if (node.darkness) add('', `**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** ${clean(node.darkness.hint)}`, `**Karanlığın desteklediği eylem ID’leri:** ${node.darkness.favored_action_ids.map((id) => `\`${id}\``).join(', ')}. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.`);
    if (node.actions.some((action) => action.required_class !== 'ANY')) add('', '**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):', '', '| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |', '|---:|---|---|---:|---|');
    else add('', '**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi uygulanır):', '', '| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |', '|---:|---|---|---:|---|');
    add(actionRows(node), '');
  }
}

add('## Sonların dizini', '');
for (const adventure of adventureGroups) {
  add(`### ${adventure.title}`, '');
  const rows = [];
  for (const id of adventure.ids) {
    const node = byId.get(id); if (!node) continue;
    for (const action of node.actions) for (const [label, outcome] of [['başarı', action.success], ['başarısızlık', action.fail]]) if (outcome.ending) rows.push(`- **${outcome.ending.title}** (${endingType[outcome.ending.type]}) — \`${node.node_id}\` / “${clean(action.button_text)}” / zar ${label}: ${clean(outcome.text)} HP ${outcome.hp_change}.`);
  }
  add(rows.length ? rows : '- Bu macerada doğrudan isimli final düğümü tanımlanmamış.', '');
}
add('- **Her macerada:** Herhangi bir sonuçtan sonra toplam grup HP’si 0 veya altına düşerse kaynak eylemin tarif ettiği devam yerine **“Karanlık Kazandı” (yenilgi)** hemen gösterilir. Bu genel sistem finalidir; sahne sonucu görselinde takımın son gücü tükenmesi gösterilsin.', '');
add('## Görsel varlık kontrol listesi', '');
add(`- Ana sahne illüstrasyonları: ${nodes.length} (${nodes.map((n) => `\`${n.node_id}\``).join(', ')}).`);
add(`- Seçenek-sonuç illüstrasyonları: ${actionCount} seçenek × 2 = ${edgeCount} ayrı sonuç anı.`);
add('- Toplam asgari görsel sayısı: ana sahneler + bütün başarı/başarısızlık sonuçları. Aynı hedef sahneye giden farklı sonuç metinlerini birbirinin yerine kullanma.');
add('- Her dosya adında node/action ID’lerini aynen koru; yazım aksanları yalnızca ekranda gösterilen başlıkta yer alsın.');
add('- Üretim tamamlandığında her sahne ana görselini ve her seçenek için iki sonuç görselini kontrol et; eksik/tekrarlı dosyaları raporla. Görsel oluşturucu kaynak metinde olmayan olay örgüsü eklememeli.');
add('', '## Kaynakta dikkat edilmesi gereken veri tutarsızlıkları', '');
add('- Karanlık Mahzen’in iki dalı `konak_02_buyuk_salon` düğümüne gider. Bu düğüm mevcut ve sahne tablosuna alınmıştır; ancak hikâye grafiği testinde maceranın başlangıç düğümünden erişim ayrıca kontrol edilmelidir.', '- Kaynağın bazı hedefleri başka macera dosyasına/bağımsız kola geçebilir veya final düğümlerini doğrudan adlandırır. Tablodaki hedef kimliğine ve macera başlığına bak; varsayımla yeni sahne üretme.', '- Bu brief kaynak JSON’daki mevcut metin ve akışın dökümüdür; tasarımcı tarafından henüz yazılmamış sahneyi veya alternatif sonucu uydurmaz.');
if (missing.size) add(`- Kaynakta var olmayan hedef düğümler: ${[...missing].map((id) => `\`${id}\``).join(', ')}. Uygulama bu yollarda “Devam Edecek...” buruk sonuna düşer; bu doküman da hedefi eksik olarak işaretlemiştir.`);
add('', '## AI’ye verilecek çalışma talimatı', '', 'Bu markdown dosyasını baştan sona oku. Önce yukarıdaki tüm ID’leri, sahne metinlerini, seçeneklerin başarı/başarısızlık sonuçlarını ve hedef düğümlerini bir görsel üretim manifestine aktar. Ardından her sahne için bir ortam görseli ve her eylemin başarı/başarısızlık sonucu için ayrı görsel üret. Üretim sırasını maceraların başlangıç düğümünden takip et; düğümler arasında döngüler olduğu için sahne başına tek dosyayı tekrar kullanabilirsin ama farklı eylem-sonuç metinlerinin görselini birleştirme. Kaynakta eksik görünen hedef için yeni hikâye uydurma, eksik olarak raporla. Her üretimde aynı görsel sanat yönetimini ve görsel sürekliliğini koru. Sonunda manifestteki beklenen ve üretilen dosya listesini karşılaştırıp eksikleri bildir.', '');

await writeFile(outFile, lines.join('\n'), 'utf8');
console.log(JSON.stringify({ outFile, nodes: nodes.length, actions: actionCount, resultBranches: edgeCount, missingTargets: [...missing], bytes: (await readFile(outFile)).length }, null, 2));
