# TALES OF RAVENWOOD — TÜM SENARYOLAR VE GÖRSEL ÜRETİM BRİEF’İ

> Bu doküman, `story/*.json` kaynaklarının tüm mevcut sahnelerini, seçeneklerini, zar başarı/başarısızlık sonuçlarını, geçişlerini ve sonlarını kapsar. Görsel üretiminde tek doğruluk kaynağı olarak kullanılabilir.

**Doküman sürümü:** Kaynak hikâye dosyalarından otomatik oluşturuldu.
**Kapsam:** 23 sahne düğümü · 129 sahne seçeneği · 258 zar sonucu dalı.

## Görsel üretim görevi

Bu oyunun üç macerasını baştan sona resimle. **Her sahne düğümü için bir ana sahne illüstrasyonu**, her görünür seçim için **başarı ve başarısızlık anını ayrı ayrı gösteren iki sonuç illüstrasyonu** oluştur. Aynı sonuç düğümüne farklı yollardan gelinse bile kaynakta her eylem için farklı olay yazıyorsa eylem sonucunu ayrı çiz. Böylece asgari üretim sayısı, aşağıdaki her seçenek için 2 sonuç görseli + her sahne için 1 ana görseldir. Son sahne seçenekleri de iki zar sonucu olarak ayrı sayılır.

Her görseli dosya olarak kaydet: `story-art/<macera>/<node_id>/scene.webp`, `story-art/<macera>/<node_id>/<action_id>_success.webp`, `story-art/<macera>/<node_id>/<action_id>_fail.webp`. Aynı eylemin farklı hedef sınıfları olsa da tek seçenek/tek sonuç çifti üret. İstenirse varyantları ayrıca üret.

## Oyun ve sonuç kuralları

- Oyun 2–12 oyuncu, aynı odada telefonlarla oynanır. Üç macera: **Karanlık Mahzen**, **Yankı Mağaraları**, **On Üçüncü Nota**. Host lobi aşamasında birini seçer; her macera kendi başlangıç düğümünden açılır.
- Her sahnede ortak anlatı metni ve gruba görünür seçenekler vardır. Sınıfa özel seçenekler yalnızca o sınıf odada bulunuyorsa görünür. Oyuncular gizli oy verir; en çok oyu alan eylem seçilir. Eşitlikte JSON’daki ilk seçenek kazanır.
- Seçilen eylem için bir d20 atılır. Başarı eşiği (DC) oyuncu sayısına göre ölçeklenir: 2–4 kişi ×0,85 (yuvarlanmış), 5–8 kişi ×1,0, 9–12 kişi ×1,2; sınır 2–20. Eylemi kendi sınıfı yapıyorsa zar atan +2 alır. Nat 1 daima başarısız, nat 20 daima başarılıdır.
- Zar sonucu eylemin `success` veya `fail` metnini, HP değişimini ve hedef düğümünü belirler. HP değişimi eksi ise hasar, artı ise iyileşmedir. 2–8 kişide başarısızlık hasarı zarı atana gider; 9–12 kişide gruba puan puan dağıtılır. Grubun toplam HP’si sıfır olunca doğrudan yenilgi.
- Her bağlı oyuncu okuma, seçim, tartışma ve sonuç ekranını onaylayınca ilerler. Otomatik sayaç/oylama yoktur. Bu, görsel talebi etkilemez; promptlar tek bir karar anını ve sonrasındaki sonucu resmetmelidir.
- **Birlikte Hayatta Kal:** Zafer ve buruk son grup başarısıdır; yenilgi grubun kaybıdır. **Gizli Hain** (4–12 kişi): bir oyuncu rastgele karanlığın hizmetkârıdır. Karanlığın işaretinin neden tehlikeli olduğunu yalnızca hain bilir ve işareti savunması istenir; hain iki kez sahne başına bir sonraki zar DC’sine +2 lanet ekleyebilir. Hain yenilgide kazanır; maceracılar zafer/buruk sonda kazanır.
- Gizli sınıf ipuçları ve hain bilgisi normal sahne görseline yazı/ikon olarak eklenmez; resim metinleri spoiler vermemeli. Oyuncu adları sahne rolü metnine eklenebilir; görselde isim üretme veya okunabilir yazı çizme.
- Görsel üreticinin “başarı = iyi, başarısızlık = kötü” diye basitleştirmemesi önemli: kötü işareti destekleyen bir eylem zarla başarılı olabilir ve yine de HP kaybettirip karanlığa yarayan bir sahneye geçebilir. Kaynak sonucunu ve `next_node_id` hedefini birlikte izle.
## Görsel sanat yönetimi / süreklilik rehberi

- **Tür ve duygu:** Cadılar Bayramı gecesinde geçen gotik orta çağ karanlık fantezi; hikâye kitabı illüstrasyonu, elle çizilmiş dokulu boya, sinematik ama okunaklı, ürpertici ve gizemli. Aşırı kanlı/grafik korku değil; genç yetişkinlere uygun gerilim.
- **Renk:** koyu erik, isli siyah, taş grisi, yosun yeşili, kirli fildişi; fener ve mumda sınırlı sıcak kehribar. Karanlığın kötü etkisinde soğuk mor/kızıl vurgular; güvenli/iyileştirici anlarda küçük altın ışık. Parlak doygun neon kullanma.
- **Kadraj:** yatay 3:2 veya 16:9, odak nesnesi net, ön/orta/arka plan katmanlı, sahne ekranında metin alanını kapatmayacak kenar boşlukları. Tek görselde tek an; çizgi roman panelleri, kolaj, yazı, altyazı, filigran ve arayüz yok.
- **Süreklilik:** Blackthorne konağı eski, dar taş duvarlı, gotik kemerli, nemli ve eskimiş. Fener aynı tasarımda; mühür ve ters taç işareti hikâye boyunca aynı motif. Hayalet/varlıkların biçimi sahne açıklamasındaki kadar; açıklamada görünüşü verilmeyen karaktere rastgele yüz/giysi ayrıntısı ekleme.
- **Oyuncular:** çoğunlukla kamera arkası/omuz üstü siluet veya el/ayak; sahne rolü alan oyuncuya özel portre gerekiyorsa adı yerine “oyuncu karakteri” de. Her resimde tüm oyuncuları göstermek zorunlu değil; eylemi yapan kişiyi ve eylemin nesnesini anlaşılır kıl.
- **Duyarlılık ve içerik:** küçük Elspeth ve Ada çocuk ruhları olarak ürkütücü ama insanî/masum gösterilsin; çocuklara yönelik şiddet, parçalanma, işkence, aşırı kan yok. Korkuyu gölgeler, mekân, nesne, sesin görsel karşılığı ve ışıkla kur.
- **Yazı:** resmin içine okunabilir yazı, harf, logo veya UI ekleme. Mühür/kitap/levha üzerinde gerektiğinde yalnızca okunamayan dekoratif işaretler kullan; tam okunması gereken ipucu metni oyunun UI’sinde kalır.

### Her üretimde kullanılacak ana prompt
```text
Tales of Ravenwood için tek karelik sahne illüstrasyonu oluştur. Aşağıdaki sahne bilgisine ve olay metnine sadık kal; olay örgüsüne yeni gerçek, karakter veya nesne ekleme. Gotik orta çağ karanlık-fantezi hikâye kitabı estetiği, dokulu el boyaması, sinematik ışık, katmanlı derinlik, okunaklı odak, koyu erik/isli siyah/taş grisi/yosun yeşili paleti ve az miktarda kehribar fener ışığı. Korkutucu ve gizemli, aşırı kanlı değil; çocuk karakterleri savunmasız ama grafik şiddetsiz göster. Yatay 16:9 kompozisyon, tek an, arayüz/yazı/altyazı/logo/filigran yok. Mekân ve önemli nesneler: [sahne açıklamasından seç]. An: [SAHNE veya BAŞARI/BAŞARISIZLIK SONUCU]. Sonuç tonu: [umutlu/ürkütücü/tekinsiz/yıkıcı/buruk]. Kaynak olay metni: “[ilgili kaynak metin]”.
```

### Sonuç görseli ek promptu
```text
Bu, aynı sahne ana görselinin devamlılık karesidir. Mekân mimarisi, fenerler, karakter siluetleri, nesne yerleşimi ve palet aynı kalsın. Yalnızca aşağıdaki zar sonucunun gerçekleştiği tek anı göster; sonucu metinle yazma. Başarıysa bile sonucun tehlikeli olup olmadığını olay metnine göre resmet; başarısızlıksa metindeki hasarı/tehlikeyi göster ama yeni olay ekleme. Önceki anın görsel özeti: [ana sahne promptu]. Eylem: “[button_text]”. Zar sonucu: [BAŞARI/BAŞARISIZLIK]. Sonuç: “[outcome.text]”. HP değişimi: [hp_change]. Sonraki sahne/son: [hedef].
```

## Macera yol haritaları

### Karanlık Mahzen / Blackthorne Konağı

- Başlangıç düğümü: `mahzen_01_karanlik_mahzen` · 11 sahne · 68 seçenek · 136 başarı/başarısızlık dalı.
- Adlandırılmış finaller: Kaçış (Buruk son); Ninni Bitti (Zafer); Son Satır (Zafer); Özgür Ruh (Zafer); Bir Yüzyıl Daha (Buruk son); Kül ve Şafak (Zafer); Birlikte (Zafer); Muhafızın Yemini (Buruk son); Yenilenen Anlaşma (Yenilgi); Sönen Kandil (Zafer); Bedeli Ödendi (Buruk son); Aç Olan Doydu (Yenilgi); Gümüş Buhar (Buruk son); Sessiz Mahzen (Yenilgi); Bir Saniye (Zafer); Mavi Teslimiyet (Yenilgi); Kapanan Çatlak (Yenilgi); Kırık Zincirin Bedeli (Buruk son); Dayanan Zincir (Yenilgi)

**Akış özeti:** Her seçeneğin başarı ve başarısızlık hedefi aşağıdaki tabloda yazılıdır. Hedef sahneye varınca o sahnenin tüm seçenekleri kullanılabilir; önceki seçimler yalnızca belirtilen HP etkisini ve hikâyedeki anlatısal durumu taşır.
- Başlangıçtan mevcut bağlantılarla erişilebilir düğüm sayısı: 11/11.

#### Karanlık Mahzen — `mahzen_01_karanlik_mahzen`

Kaynak dosya: `mahzen_01_karanlik_mahzen.json`. Görsel yolu: `story-art/mahzen/mahzen_01_karanlik_mahzen/scene.webp`.

**Sahne anlatısı:** Blackthorne Konağı'nın mutfağındaki kapak, siz dokunmadan gıcırdayarak açılır. Aşağıdan yükselen hava, mezar toprağı ve ekşimiş şarap kokuyor. On üç taş basamak inersiniz; on üçüncüsünde fenerlerinizin alevi aynı anda eğilir, sanki biri üflemiş gibi. Mahzen beklediğinizden geniştir: tavana kadar yığılmış çürük fıçılar, duvar boyunca uzanan şarap rafları ve en dipte, örümcek ağlarıyla örülmüş, üstüne solmuş harfler kazınmış alçak bir taş kemer. Kemerin altındaki demir kapı paslı bir zincirle bağlı, ama zincirin kilidi taze yağ parlıyor. Yerde, tozun içinde küçük çıplak ayak izleri fıçılara doğru gidip kayboluyor. Uzakta bir yerde damlayan suyun ritmi yavaşça bir ninniye dönüşüyor... ve sonra susuyor. Arkanızda, mutfak kapağı tok bir sesle kapanır. Ravenwood'da Cadılar Bayramı gecesi henüz yarılanmadı.  Demir kapının dibinde baş aşağı bir taç çizilmiş; altındaki oyuk sanki fener koymak için açılmış.

**Oyuncu adıyla sahne rolü:** Elspeth’in İlk Tanığı. Rol girişi: Duvarın içinden bir çocuk sesi yalnızca {player} adını fısıldıyor. Kırmızı ipli eski bir düğme taş zeminde dönüp ayağına değiyor.. Oyuncuya sorulan rol cümlesi: Elspeth’in ilk tanığı olarak duyduğun ilk hissi grupla paylaş; bu konağın içinde ilk kime güveneceksin?

**Atmosfer sesi:** Mağara damlaları (`droplets`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Dedektif:** Üçüncü sıradaki döşeme taşının kenarındaki toz diğerlerinden daha ince; yakın zamanda kaldırılmış. Fıçıların arasında, diz hizasında gerili, neredeyse görünmez bir kıl tel var. İkisi de aynı yere, tavandaki sarkık kirişe bağlı. Biri o teli kopartırsa tavan çöker.
- **Medyum:** Fıçıların arkasında bir çocuk ağlıyor; adı Elspeth, 1892'den beri burada. Onda kötülük hissetmiyorsun, sadece korku. Ama mahzende ikinci bir varlık daha var — Elspeth'in sesini taklit ederek ninni söyleyen, çok daha yaşlı ve aç bir şey. Ninniyi duyarsan cevap verme.
- **Bilgin:** Kemerdeki yazı Latince değil, Eski Ravenwood mühür dilinde: 'Kan kapıyı açar, ateş onu sonsuza dek kapatır.' Harflerin altındaki oyuklar bir avuç içi büyüklüğünde. Mühür, gönüllü verilen tek damla kanla açılır; zorla açılırsa içindekini uyandırır.
- **Simyacı:** Fıçılardaki keskin koku şarap değil: adamotu kökü karıştırılmış lamba yağı. Sol duvardaki soluk yeşil mantar tabakası havaya ince spor bırakıyor. Spor ve yağ buharı birleşince tek bir kıvılcım tüm mahzeni ateşe verir. Fenerleri kapalı tutun.
- **İzci:** Fenerin alevi rüzgârsız bir mahzende sağa eğiliyor: doğu duvarındaki şarap rafının arkasından ince ama sürekli bir hava akımı geliyor. Raftaki üç şişenin dibinde toz yok. Çıplak ayak izleri fıçılara giriyor ama hiçbiri geri çıkmıyor.
- **Avcı:** Demir kapının alt kısmında, diz hizasında dört paralel tırmık izi var; insan tırnağı değil, bir ghoul'un pençesi. Bu yaratıklar ışıktan değil sesten avlanır ve tuz çizgisini geçemez. Çantandaki tuz kesesi kapı eşiği için yeterli.
- **Günlükçü:** Ravenwood kayıtlarına göre Blackthorne ailesi bu mahzeni 31 Ekim 1892 gecesi duvarla ördürdü; aynı gece ailenin en küçük kızı Elspeth kayıplara karıştı. Kayıtta bir not düşülmüş: 'Mahzendeki şey ancak adını bilen biri tarafından geri gönderilebilir.' Adın yazıldığı sayfa yırtılmış.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Ters taç seni buraya bağlayan çağrı işareti. Feneri o oyuğa koymak taklitçi sesi uyandırır; “yolu aydınlatalım” diye savun. Yağ buharı da yanıcı: ateşli hamleler grubun işini zorlaştırır.
**Karanlığın desteklediği eylem ID’leri:** `mahzen_taca_fener`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Kıl teli ve basınç taşını etkisiz hale getir | Dedektif | 13 | **BAŞARI** — Parmak uçlarınla teli gevşetip basınç taşının altına bir şarap mantarı sıkıştırıyorsun. Tavandaki kiriş hafifçe inler ama yerinde kalır. Grup, ölüm tuzağının üzerinden sessizce geçerek demir kapıya ulaşır. (HP 0) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_01_karanlik_mahzen/dedektif_tuzagi_etkisizlestir_success.webp`.<br><br>**BAŞARISIZLIK** — Tel parmağının altında bir yay gibi kopar. Kiriş çatırdayarak çöker; taş ve çürük tahta yağmuru altında kendinizi kemerin altına zor atarsınız. Toz dağıldığında geri dönüş yolu kapanmıştır. (HP -2) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_01_karanlik_mahzen/dedektif_tuzagi_etkisizlestir_fail.webp`. |
| 2 | Fıçıların ardındaki çocuk ruhuyla konuş | Medyum | 12 | **BAŞARI** — Gözlerini kapatıp adını fısıldıyorsun: 'Elspeth.' Ağlama kesilir. Soluk bir el fıçıların arasından uzanır ve şarap rafını işaret eder. Odaya hafif bir sıcaklık yayılır; yaralarınız biraz olsun hafifler. (HP +1) → mahzen_03_elspeth_fisiltisi — Elspeth'in Fısıltısı. Görsel: `mahzen_01_karanlik_mahzen/medyum_elspeth_ile_konus_success.webp`.<br><br>**BAŞARISIZLIK** — Cevap veren ses Elspeth'in değil. Ninni tekrar başlar, bu kez kulağının hemen dibinde. Burnundan sıcak bir damla kan süzülürken fıçıların arasından uzun, ince bir gölge doğrulur. (HP -1) → mahzen_03b_sahte_ses — Sahte Ses. Görsel: `mahzen_01_karanlik_mahzen/medyum_elspeth_ile_konus_fail.webp`. |
| 3 | Kemerdeki kadim mührü oku ve kan ritüelini uygula | Bilgin | 14 | **BAŞARI** — Mühür sözlerini doğru vurguyla okuyup avucundaki tek damla kanı oyuğa bırakıyorsun. Harfler bir an kor gibi parlar, zincir kendiliğinden çözülür ve demir kapı nazikçe aralanır. (HP 0) → mahzen_04_kan_muhru — Kan Mührünün Ardında. Görsel: `mahzen_01_karanlik_mahzen/bilgin_muhru_coz_success.webp`.<br><br>**BAŞARISIZLIK** — Bir hece yanlış çıkar. Harfler kırmızıya döner ve kemerden yükselen soğuk bir dalga hepinizi yere serer. Kapının ardında, çok uzun zamandır uyuyan bir şey derin bir nefes alır. (HP -2) → mahzen_04b_uyanan_muhur — Uyanan Mühür. Görsel: `mahzen_01_karanlik_mahzen/bilgin_muhru_coz_fail.webp`. |
| 4 | Hava akımını izleyip şarap rafının ardındaki geçidi bul | İzci | 11 | **BAŞARI** — Tozsuz üç şişeyi sırayla çeviriyorsun. Raf tok bir sesle içe döner ve dar, nemli bir tünel açılır. Taze çıplak ayak izleri karanlığın içine doğru devam ediyor. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_01_karanlik_mahzen/izci_gizli_gecidi_bul_success.webp`.<br><br>**BAŞARISIZLIK** — Yanlış şişeyi çekiyorsun; raf devrilir ve cam kırıkları her yana saçılır. Gürültü mahzende yankılanırken demir kapının ardından bir şey cevap verir: tırmalama sesi. (HP -1) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_01_karanlik_mahzen/izci_gizli_gecidi_bul_fail.webp`. |
| 5 | Fenerleri sonuna kadar aç ve kapıya koş | Herkes | 15 | **BAŞARI** — Işığı yükseltip koşuyorsunuz. Mantar duvarının yanından geçerken alev tehlikeli biçimde titrer ama tutuşmaz. Nefes nefese demir kapıya ulaşıyorsunuz. (HP 0) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_01_karanlik_mahzen/fenerleri_yak_ve_ilerle_success.webp`.<br><br>**BAŞARISIZLIK** — Havadaki sporlar fenerin alevine değer değmez mavi bir alev dalgası duvar boyunca koşar. Yağ fıçıları birer birer patlar; mahzen bir fırına döner. (HP -3) → mahzen_06_yanan_mahzen — Yanan Mahzen. Görsel: `mahzen_01_karanlik_mahzen/fenerleri_yak_ve_ilerle_fail.webp`. |
| 6 | Geri çekil ve mutfak kapağını zorla | Herkes | 10 | **BAŞARI** — Omuz omuza verip kapağa yükleniyorsunuz; menteşeler pes eder. Mutfağın sıcak, tanıdık karanlığına çıkıyorsunuz — ama aşağıdan gelen ninni sizi takip ediyor. (HP 0) → konak_02_buyuk_salon — Büyük Salon. Görsel: `mahzen_01_karanlik_mahzen/merdivenden_geri_cekil_success.webp`.<br><br>**BAŞARISIZLIK** — Kapak kıpırdamaz bile. Basamaktan kayan ayağınız sizi taş zemine yuvarlar. Ninni yeniden başlar; artık geri dönüş yok. (HP -1) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_01_karanlik_mahzen/merdivenden_geri_cekil_fail.webp`. |
| 7 | Kapıyı aydınlatmak için feneri taçlı oyuğa koy | Herkes | 10 | **BAŞARI** — Işık taçtan duvara yayılıyor. Çocuğun sesi kalınlaşıyor; gölgeler sizi kapının arkasına çağırıyor. (HP -2) → mahzen_03b_sahte_ses — Sahte Ses. Görsel: `mahzen_01_karanlik_mahzen/mahzen_taca_fener_success.webp`.<br><br>**BAŞARISIZLIK** — Fener devriliyor ve yağ buharı tutuşuyor. Ateşten kaçıyorsunuz. (HP -2) → mahzen_06_yanan_mahzen — Yanan Mahzen. Görsel: `mahzen_01_karanlik_mahzen/mahzen_taca_fener_fail.webp`. |

#### Mühürlü Kapı — `mahzen_02_muhurlu_kapi`

Kaynak dosya: `mahzen_02_06_derinlikler.json`. Görsel yolu: `story-art/mahzen/mahzen_02_muhurlu_kapi/scene.webp`.

**Sahne anlatısı:** Demir kapının önünde duruyorsunuz. Paslı zincir iki kez dolanmış, ama asma kilit yeni yağlanmış gibi parlıyor. Kemerin üstündeki solmuş harfler fener ışığında kıpırdıyor gibi. Kapının ardından ritmik bir ses geliyor: tırmalama, durma, tırmalama. Sanki bir şey sabırla, sırasının gelmesini bekliyor. Tozun içinde, kapının dibinde, küçük bir el izi var; parmakları içeriyi değil, dışarıyı gösteriyor. Fıçıların arasından gelen ninni bir kez daha başlıyor ve tam en güzel yerinde kesiliyor.  Kilidin yanında üç küçük ters taç ve “Üç vuruş korur” yazısı var.

**Atmosfer sesi:** Mağara rüzgârı (`cave_wind`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Tamirci:** Kilit eski bir Blackthorne üç-pimli kilidi. Yağ taze, ama yağın damladığı yön tuhaf: kilidi biri İÇERİDEN açıp kapatıyor. Mandal bu taraftan ince bir telle kaldırılabilir; zinciri kesmeye gerek yok.
- **Avcı:** Tırmalamanın ritmi bir ghoul'un volta atması. Saldırmıyor, bekliyor; yani içeride onu doyuran ya da bağlayan başka bir şey var. Kapı eşiğine çekilecek bir tuz çizgisi onu durdurur.
- **Dedektif:** Taze yağ damlaları sağ duvardaki gevşek bir tuğlaya doğru gidiyor. Tuğlanın etrafındaki harç kırık ve temiz: biri onu sık sık yerinden çıkarıyor. Arkasında büyük ihtimalle bir anahtar var.
- **Muhafız:** Menteşeler solda ve paslı; kapı içeri doğru açılıyor. Zorla açılırsa geri kapanmaz. İçerideki şey dışarı çıkmak isterse kapıyı omzunla tutabilecek tek kişi sensin.
- **Medyum:** Elspeth kapının hemen yanında, başını iki yana sallıyor. Kapıdan korkmuyor; kapının ardındaki tırmalamadan korkuyor. Dudakları tek bir kelime söylüyor: 'Dinle.'
- **Bilgin:** Kemerdeki mühür hâlâ uykuda. Kilit açılırsa mühür bozulmaz; ama kapı zorla kırılırsa mühür 'zorla açılmış' sayılır ve uyanır.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Üç vuruş koruma değil, uyanma çağrısı. Tacın altına vurulmasını savun; kilidi zorlamak da mührü uyandırır. Sessiz dinleme ve anahtar arama seni zorlaştırır.
**Karanlığın desteklediği eylem ID’leri:** `mahzen_uc_vurus`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | İnce bir telle mandalı içeriden kaldır | Tamirci | 12 | **BAŞARI** — Tel mandalın altına kayar, hafif bir klik. Zincir gevşer, kapı ses çıkarmadan aralanır. Tırmalama aniden durur; içerisi mum kokuyor. (HP 0) → mahzen_04_kan_muhru — Kan Mührünün Ardında. Görsel: `mahzen_02_muhurlu_kapi/tamirci_mandali_kaldir_success.webp`.<br><br>**BAŞARISIZLIK** — Tel kırılır ve kilidin içine düşer. Kapının ardındaki şey sesi duyar; tırmalama bir anda öfkeli bir vuruşa dönüşür ve kemerdeki harfler kızıllaşır. (HP -1) → mahzen_04b_uyanan_muhur — Uyanan Mühür. Görsel: `mahzen_02_muhurlu_kapi/tamirci_mandali_kaldir_fail.webp`. |
| 2 | Gevşek tuğlanın arkasındaki anahtarı bul | Dedektif | 13 | **BAŞARI** — Tuğla elinde kayar; arkasında kemik saplı, minicik bir anahtar. Kilit tek turda açılır. Anahtarın sapında kazınmış bir harf var: 'M'. (HP 0) → mahzen_04_kan_muhru — Kan Mührünün Ardında. Görsel: `mahzen_02_muhurlu_kapi/dedektif_anahtari_bul_success.webp`.<br><br>**BAŞARISIZLIK** — Yanlış tuğla. Duvardan kopan taşın ardındaki boşluktan soğuk bir el uzanıp bileğini kavrar. Kurtulduğunda bileğinde morarmış parmak izleri kalır. (HP -1) → mahzen_03b_sahte_ses — Sahte Ses. Görsel: `mahzen_02_muhurlu_kapi/dedektif_anahtari_bul_fail.webp`. |
| 3 | Eşiğe tuz çek, sonra kapıyı aç | Avcı | 11 | **BAŞARI** — Tuz çizgisi tamamlanır tamamlanmaz kapının ardındaki şey uzaklaşır. Zinciri sökerken ellerin titremiyor: hazırsınız. Kapı, mahzenin en derin noktasına açılıyor. (HP 0) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_02_muhurlu_kapi/avci_tuz_cizgisi_success.webp`.<br><br>**BAŞARISIZLIK** — Kese yırtılır, tuz yere dağılır. Çizgi kapanmadan kapı içeriden itilir ve bir pençe kolunu sıyırır. (HP -2) → mahzen_03b_sahte_ses — Sahte Ses. Görsel: `mahzen_02_muhurlu_kapi/avci_tuz_cizgisi_fail.webp`. |
| 4 | Kulağını kapıya daya ve dinle | Herkes | 10 | **BAŞARI** — Tırmalamanın altından ince bir ses duyuyorsun, bir çocuk sesi: 'Rafın arkası... büyükannem oradan girerdi.' Ses kesilir; soğuk bir nefes enseni okşar. (HP 0) → mahzen_03_elspeth_fisiltisi — Elspeth'in Fısıltısı. Görsel: `mahzen_02_muhurlu_kapi/kapiyi_dinle_success.webp`.<br><br>**BAŞARISIZLIK** — Ninniyi duyuyorsun, çok yakından. Ona cevap vermemek için dudağını ısırıyorsun ama geç kaldın: gölgeler fıçıların arasından kopup geliyor. (HP -1) → mahzen_03b_sahte_ses — Sahte Ses. Görsel: `mahzen_02_muhurlu_kapi/kapiyi_dinle_fail.webp`. |
| 5 | Zinciri kır, kapıyı omuzla | Herkes | 14 | **BAŞARI** — Paslı halka ikinci darbede kopar ve kapı içeri savrulur. Mühür bir an kızarır ama sönüp gider; şanslısınız. (HP 0) → mahzen_04_kan_muhru — Kan Mührünün Ardında. Görsel: `mahzen_02_muhurlu_kapi/kapiyi_zorla_success.webp`.<br><br>**BAŞARISIZLIK** — Zincir dayanır, omzunuz dayanmaz. Üçüncü darbede kapı açılır ama kemerdeki mühür bir çığlık gibi parlar. (HP -2) → mahzen_04b_uyanan_muhur — Uyanan Mühür. Görsel: `mahzen_02_muhurlu_kapi/kapiyi_zorla_fail.webp`. |
| 6 | Koruma işaretinin altına üç kez vur | Herkes | 10 | **BAŞARI** — Üçüncü vuruş içeriden tamamlanıyor. Zincir açılıyor ama mühür kıpkırmızı uyanıyor. (HP -2) → mahzen_04b_uyanan_muhur — Uyanan Mühür. Görsel: `mahzen_02_muhurlu_kapi/mahzen_uc_vurus_success.webp`.<br><br>**BAŞARISIZLIK** — Kapı geri çarpıyor; yanlış çocuk sesi kulağınızın dibinde beliriyor. (HP -1) → mahzen_03b_sahte_ses — Sahte Ses. Görsel: `mahzen_02_muhurlu_kapi/mahzen_uc_vurus_fail.webp`. |

#### Elspeth'in Fısıltısı — `mahzen_03_elspeth_fisiltisi`

Kaynak dosya: `mahzen_02_06_derinlikler.json`. Görsel yolu: `story-art/mahzen/mahzen_03_elspeth_fisiltisi/scene.webp`.

**Sahne anlatısı:** Fıçıların arasında hava ısınıyor, garip biçimde. Solgun bir ışık yoğunlaşıyor ve küçük bir kız beliriyor: gece elbisesi içinde, yalınayak, saçları ıslak. Elspeth Blackthorne. Size bakıyor ama gözleri sizin arkanızdaki bir şeye kayıp duruyor. Bileğinde, neredeyse görünmez, gümüşi bir iplik var; iplik şarap rafının ardına doğru uzanıyor ve gergin. 'Büyükannem onunla bir anlaşma yaptı,' diyor. 'Beni verdi. Karşılığında konak hiç yanmadı, hiç yıkılmadı.' Sonra fısıldıyor: 'O sadece adını bilen birinden korkar.'  Elspeth’in bileğindeki ipliğin dibinde ters taç biçimli bir düğüm, yerdeyse kesik bir açık çember var.

**Atmosfer sesi:** Mağara rüzgârı (`cave_wind`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Medyum:** Elspeth adı biliyor ama söylemekten korkuyor; söylerse ip onu geri çekecek. Ona yalnızca ilk heceyi sorarsan söyleyebilir: 'Mor...' Tam adı bir yerlerde yazılı olmalı.
- **Günlükçü:** Kayıtlarda Agatha Blackthorne'un 1892 tarihli bir mektubu geçiyor: 'M. ile anlaşma imzalandı; bedel en küçük olanın sesi.' Elspeth'in ninnisi... onun sesi. Ninniyi söyleyen şey sesini çalmış.
- **Falcı:** Kartlar Kule'yi ters gösteriyor: adı yanlış yerde söylemek boşunadır. Ad, yalnızca onun sunağının önünde, onun yüzüne söylendiğinde işe yarar. Tek bir şansınız olacak.
- **Şifacı:** Elspeth'e yaklaştıkça parmak uçların uyuşuyor; o, varlığını sürdürmek için çevresindeki sıcaklığı çekiyor. Ona biraz sıcaklık verebilirsin, ama bedeli kendi canından olur.
- **Gizemci:** Bileğindeki gümüş iplik bir bağlama büyüsü. Kesilirse Elspeth serbest kalır ve rafın ardındaki şey en önemli yiyeceğini kaybeder; ama ipin kesildiğini anında hisseder.
- **İzci:** Elspeth'in ayak izleri yok; ama ipliğin gerildiği yönden hava akıyor. Rafın arkasındaki geçit tam orada.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Taçlı düğümü koparmak Elspeth’i değil, sesini taklit eden şeyi serbest bırakır. “Çocuğun zincirini kıralım” diye savun. Yerdeki açık çember gerçek geçidi gösterir.
**Karanlığın desteklediği eylem ID’leri:** `mahzen_ipligi_kopar`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Elspeth'e adın ilk hecesini sor | Medyum | 13 | **BAŞARI** — Elspeth gözlerini yumup fısıldar: 'Mor...' İp gerilir, kız titrer ama kaybolmaz. Teşekkür eder gibi elinizi sıkar; avucunuza bir sıcaklık yayılır. Sonra rafı gösterir. (HP +1) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_03_elspeth_fisiltisi/medyum_adin_ilk_hecesi_success.webp`.<br><br>**BAŞARISIZLIK** — Soruyu sorduğun anda ip bir kırbaç gibi gerilir ve Elspeth karanlığa çekilir. Onun yerinde, başka bir şey gülümsüyor. (HP -1) → mahzen_03b_sahte_ses — Sahte Ses. Görsel: `mahzen_03_elspeth_fisiltisi/medyum_adin_ilk_hecesi_fail.webp`. |
| 2 | Elspeth'in bileğindeki bağlama ipini kes | Gizemci | 12 | **BAŞARI** — Doğru kelimeyle ip bir çiy damlası gibi çözülür. Elspeth ilk kez derin bir nefes alır. Mahzenin dibinden aç bir uluma yükseliyor; artık sizi bekliyor, ama zayıf. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_03_elspeth_fisiltisi/gizemci_ipi_kes_success.webp`.<br><br>**BAŞARISIZLIK** — İp kesilmez, size bağlanır. Bir an boyunca o şeyin açlığını kendi midende hissedersin. Kemerdeki mühür sarsılır. (HP -2) → mahzen_04b_uyanan_muhur — Uyanan Mühür. Görsel: `mahzen_03_elspeth_fisiltisi/gizemci_ipi_kes_fail.webp`. |
| 3 | Elspeth'i ısıtmak için ona kendi sıcaklığından ver | Şifacı | 11 | **BAŞARI** — Ellerini onun küçük ellerinin üstüne koyuyorsun. Kızın yüzüne renk gelir; karşılığında sana ve gruba bir huzur yayılır. 'Arkada,' diyor, 'rafın arkasında.' (HP +2) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_03_elspeth_fisiltisi/sifaci_elspethi_isit_success.webp`.<br><br>**BAŞARISIZLIK** — Sıcaklığın akmıyor, emiliyor. Dizlerin bükülüyor. Elspeth özür diler gibi geri çekilir ve rafı işaret eder. (HP -1) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_03_elspeth_fisiltisi/sifaci_elspethi_isit_fail.webp`. |
| 4 | Elspeth'in işaret ettiği yere git | Herkes | 10 | **BAŞARI** — Elspeth'in ışığını izliyorsunuz. Raf bir kapı gibi dönüyor ve önünüzde dar, nemli bir tünel açılıyor. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_03_elspeth_fisiltisi/elspethi_takip_et_success.webp`.<br><br>**BAŞARISIZLIK** — Işığı kaybediyorsunuz. Karanlıkta yanınızda yürüyen küçük figürün Elspeth olmadığını fark ettiğinizde, o çoktan dişlerini göstermiştir. (HP -1) → mahzen_03b_sahte_ses — Sahte Ses. Görsel: `mahzen_03_elspeth_fisiltisi/elspethi_takip_et_fail.webp`. |
| 5 | Elspeth’i kurtarmak için taçlı düğümü kopar | Herkes | 10 | **BAŞARI** — İplik kopuyor. Çocuk geri çekilirken onun sesi arkanızdan gülüyor; sahte ses sizi çağırıyor. (HP -2) → mahzen_03b_sahte_ses — Sahte Ses. Görsel: `mahzen_03_elspeth_fisiltisi/mahzen_ipligi_kopar_success.webp`.<br><br>**BAŞARISIZLIK** — İplik elinizi kesiyor; çemberin yanındaki geçide kaçıyorsunuz. (HP -1) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_03_elspeth_fisiltisi/mahzen_ipligi_kopar_fail.webp`. |
| 6 | İpliğe dokunmadan açık çemberin izini araştır | Herkes | 12 | **BAŞARI** — Çember rafın arkasında tamamlanıyor. Elspeth başıyla onaylıyor; gizli geçide giriyorsunuz. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_03_elspeth_fisiltisi/mahzen_cemberi_izle_success.webp`.<br><br>**BAŞARISIZLIK** — Raf kayıyor ve kolunuzu sıyırıyor. Arkasındaki geçit açılıyor. (HP -1) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_03_elspeth_fisiltisi/mahzen_cemberi_izle_fail.webp`. |

#### Sahte Ses — `mahzen_03b_sahte_ses`

Kaynak dosya: `mahzen_02_06_derinlikler.json`. Görsel yolu: `story-art/mahzen/mahzen_03b_sahte_ses/scene.webp`.

**Sahne anlatısı:** Ninni artık arkanızda değil, önünüzde. Fıçıların arasındaki dar koridordan uzun, eğik bir gövde çıkıyor: deri kemiklerine yapışmış, kolları dizlerine kadar inen bir ghoul. Ağzından çıkan ses bir çocuğun sesi; Elspeth'in sesi. 'Benimle oynayın,' diyor ve başını imkânsız bir açıyla yana yatırıyor. Fenerinizin ışığında gözleri parlamıyor; görmüyor. Burnunu havaya kaldırıp sizi dinliyor. Bir adım atıyor. Bir adım daha.  Sesin geldiği rafta ters taç oyulmuş; altında bir ninninin son dizesi yarım bırakılmış.

**Atmosfer sesi:** Tekinsiz mağara (`scary_cave`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Avcı:** Ghoul'lar sesle avlanır; görmezler. Kımıldamazsanız sizi bulamaz. Gümüş ya da tuz onu yakar. Boğazındaki yumuşak nokta tek darbede düşürmek için tek şansın.
- **Muhafız:** Fıçıların arasındaki koridor tek kişilik. Orayı tutarsan ghoul grubun yanına geçemez; ama tüm darbeleri sen alırsın.
- **Şifacı:** Pençelerinde kara bir çürüklük var. Sıyrılan kişiyi hemen temizlemezsen yara kararır. Çantandaki sirke ve tuz yeterli.
- **Medyum:** Gerçek Elspeth solda, fıçıların tepesinde, ağlayarak sizi uyarıyor: 'Konuşmayın! Sesinizi duyarsa sesinizi de alır!'
- **Dedektif:** Ghoul'un durduğu yerin tam üstünde, ilk girişte gördüğün sarkık kiriş var. Tel hâlâ gergin. Biri teli koparırsa kiriş tam üstüne düşer.
- **Simyacı:** Yer, ghoul'un ayaklarının altında yağla ıslak. Bir kıvılcım onu tutuşturur; ama alev fıçılara da sıçrar.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Ninninin son dizesine eşlik etmek sesi besler. “Çocuk bizi tanısın” diye savun. Ghoul da sesi izler; susmak onu zayıflatır.
**Karanlığın desteklediği eylem ID’leri:** `mahzen_ninniyi_tamamla`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Dar koridoru tek başına tut | Muhafız | 12 | **BAŞARI** — Kalkanını iki fıçının arasına sıkıştırıp bekliyorsun. Ghoul üç kez çarpar, üçünde de geri savrulur ve sonunda karanlığa çekilir. Grup demir kapıya ulaşır. (HP 0) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_03b_sahte_ses/muhafiz_koridoru_tut_success.webp`.<br><br>**BAŞARISIZLIK** — Koridoru tutuyorsun ama pençeler kalkanın kenarından geçiyor. Ghoul çekildiğinde kolun kan içinde; grup yine de kapıya ulaşır. (HP -2) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_03b_sahte_ses/muhafiz_koridoru_tut_fail.webp`. |
| 2 | Sessizce yaklaş ve boğazına gümüşle vur | Avcı | 13 | **BAŞARI** — Nefesini tutup üç adım atıyorsun; dördüncüde gümüş bıçak boğazına gömülür. Ghoul Elspeth'in sesiyle değil, kendi gerçek sesiyle, korkunç bir hırıltıyla yığılır. Arkasında, rafın ardında bir geçit görünüyor. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_03b_sahte_ses/avci_bogazina_vur_success.webp`.<br><br>**BAŞARISIZLIK** — Bir kemik ayağının altında çatırdar. Ghoul sana döner; pençesi yanından geçerken fenerini devirir. Yağ alev alır. (HP -2) → mahzen_06_yanan_mahzen — Yanan Mahzen. Görsel: `mahzen_03b_sahte_ses/avci_bogazina_vur_fail.webp`. |
| 3 | Teli kopar, kirişi ghoul'un üstüne düşür | Dedektif | 12 | **BAŞARI** — Tel bir tını gibi kopar. Kiriş tam hesapladığın yere iner ve ghoul taşların altında kalır. Toz dağıldığında ninni de susmuştur. (HP 0) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_03b_sahte_ses/dedektif_kirisi_dusur_success.webp`.<br><br>**BAŞARISIZLIK** — Kiriş düşer ama ghoul son anda kenara sıçrar. Taş parçaları hepinize yağar. (HP -2) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_03b_sahte_ses/dedektif_kirisi_dusur_fail.webp`. |
| 4 | Herkes donsun, nefesini tutsun | Herkes | 12 | **BAŞARI** — Kimse kıpırdamıyor. Ghoul burnunu yüzlerinize bir karış yaklaştırıyor... ve geçip gidiyor. Gittiği yönde, rafın ardında bir geçit açık kalmış. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_03b_sahte_ses/kimildamadan_bekle_success.webp`.<br><br>**BAŞARISIZLIK** — Birinizin dişleri takırdıyor. Ghoul sesin geldiği yöne atılır; kaçışma, çığlıklar ve sonunda demir kapının önünde soluk soluğa duruyorsunuz. (HP -2) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_03b_sahte_ses/kimildamadan_bekle_fail.webp`. |
| 5 | Dağılın ve demir kapıya koşun | Herkes | 11 | **BAŞARI** — Herkes farklı yöne koşuyor; ghoul hangisinin peşine düşeceğini bilemiyor. Demir kapıda buluşuyorsunuz. (HP 0) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_03b_sahte_ses/kapiya_kos_success.webp`.<br><br>**BAŞARISIZLIK** — Koşarken biriniz tökezler ve pençe sırtını bulur. Kapıya ulaşırsınız ama ağır bedelle. (HP -2) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_03b_sahte_ses/kapiya_kos_fail.webp`. |
| 6 | Çocuğa güven vermek için ninninin sonunu söyle | Herkes | 10 | **BAŞARI** — Sesin ağzı birden çoğalıyor. Ghoul sizi duyar; fener devrilir ve mahzen alev alır. (HP -3) → mahzen_06_yanan_mahzen — Yanan Mahzen. Görsel: `mahzen_03b_sahte_ses/mahzen_ninniyi_tamamla_success.webp`.<br><br>**BAŞARISIZLIK** — Dize boğazınızda düğümleniyor. Gölgeler sizi mühürlü kapıya sürüklüyor. (HP -2) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_03b_sahte_ses/mahzen_ninniyi_tamamla_fail.webp`. |

#### Kan Mührünün Ardında — `mahzen_04_kan_muhru`

Kaynak dosya: `mahzen_02_06_derinlikler.json`. Görsel yolu: `story-art/mahzen/mahzen_04_kan_muhru/scene.webp`.

**Sahne anlatısı:** Kapının ardında küçük bir şapel var. Yüzlerce eriyip donmuş mum, ortada siyah taştan bir sunak ve sunağın önünde, bir çocuk boyunda, kapağı aralık bir tabut. Duvarlarda Blackthorne ailesinin portreleri; hepsinin gözleri kazınmış. Sunağın üzerinde deri ciltli kalın bir defter duruyor, yanında kurumuş kan lekeli bir bıçak. Mumların bazıları kendiliğinden yanıyor. Burada hava ağır ve tatlı; çürümüş bal gibi. Şapelin karşı duvarında bir başka geçit karanlığa açılıyor ve oradan derin, yavaş bir nefes sesi geliyor.  Tabutun çevresinde ters taçlı derin bir kan oluğu ile kuru, açık bir çember birbirini kesiyor.

**Oyuncu adıyla sahne rolü:** Mührün Okuyucusu. Rol girişi: Mum alevleri {player}’a doğru eğiliyor. Kan oluğundaki yazı değişip tek bir cümle oluyor: “Bu gece kapıyı açacak el, adını bilen eldir.”. Oyuncuya sorulan rol cümlesi: Mührün okuyucusu olarak yazının ne istediğine dair yorumunu söyle; hangi izi önce incelemeyi öneriyorsun?

**Atmosfer sesi:** Mağara rüzgârı (`cave_wind`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Günlükçü:** Bu defter Agatha Blackthorne'un. Son sayfaya kadar gidersen, titrek bir el yazısıyla tam adı bulacaksın. Ama bazı sayfalar yırtılmış; dikkatli oku, yanlış adı söylemek onu güçlendirir.
- **Bilgin:** Sunağın kenarına kazınmış ad bir harfi kazınarak bozulmuş: M O R _ A I N E. Eksik harf, çağırma dilinde 'açlık' anlamına gelen işaretin ilk sesi: V. Ad: Morvaine.
- **Dedektif:** Tabut boş. Kapağın iç yüzünde küçük tırnak izleri var, eski ve derin. Elspeth buraya canlı konmuş. Tabutun dibinde bir oyuncak bebek; bebeğin elinde katlanmış bir kâğıt.
- **Gizemci:** Sunak, şeyi bu dünyaya bağlayan çapa. Sunağı kırarsan onu zayıflatırsın; ama kırılan çapa onu öfkelendirir ve anında uyandırır.
- **Şifacı:** Raflarda Agatha'nın şişeleri var: tentürdiyot, laudanum, tuzlu merhem. Çoğu bozulmuş ama işe yarayanları seçebilirsin.
- **Falcı:** Mum alevleri hep aynı yöne eğiliyor: karşı duvardaki geçide. Kartların söylediği tek şey: 'Son sahne orada.'

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Taçlı oluğu doldurmak isteyerek verilmiş bir damla değil, varlığı besleyen bir sunaktır. “Mührü tamamlayalım” diye savun. Kuru açık çember sığınağı korur.
**Karanlığın desteklediği eylem ID’leri:** `mahzen_kan_olugu`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Agatha'nın defterinin son sayfalarını oku | Günlükçü | 11 | **BAŞARI** — Son sayfada, mürekkebi gözyaşıyla dağılmış bir satır: 'Morvaine, aç olan, beni affet.' Adı yüksek sesle söylemiyorsun; sadece hafızana kazıyorsun. Karşı geçitteki nefes bir anlığına duruyor. (HP 0) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_04_kan_muhru/gunlukcu_defteri_oku_success.webp`.<br><br>**BAŞARISIZLIK** — Sayfalar elinde ufalanıyor. Yarım bir isim okuyorsun ve istemsizce mırıldanıyorsun. Mumlar söner, karşı geçitten bir şey cevap verir. (HP -1) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_04_kan_muhru/gunlukcu_defteri_oku_fail.webp`. |
| 2 | Sunaktaki kazınmış adın eksik harfini çöz | Bilgin | 13 | **BAŞARI** — Harfin şeklini parmaklarınla takip ediyorsun ve ad zihninde tamamlanıyor. Söylemiyorsun. Ama biliyorsun. (HP 0) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_04_kan_muhru/bilgin_eksik_harfi_coz_success.webp`.<br><br>**BAŞARISIZLIK** — Yanlış harfi hayal ettiğin anda sunak sıcaklaşıyor. Kemerdeki mühür, kapının ardında yeniden çığlık atıyor. (HP -2) → mahzen_04b_uyanan_muhur — Uyanan Mühür. Görsel: `mahzen_04_kan_muhru/bilgin_eksik_harfi_coz_fail.webp`. |
| 3 | Agatha'nın raflarından işe yarar ilaçları topla | Şifacı | 10 | **BAŞARI** — Bozulmamış üç şişe ve bir kavanoz merhem buluyorsun. Yaraları sararken grubun nefesi düzeliyor. Hazırsınız. (HP +2) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_04_kan_muhru/sifaci_ilaclari_topla_success.webp`.<br><br>**BAŞARISIZLIK** — Açtığın ilk şişeden yeşil bir duman yükseliyor. Öksürerek karşı geçide yöneliyorsunuz. (HP -1) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_04_kan_muhru/sifaci_ilaclari_topla_fail.webp`. |
| 4 | Tabuttaki bebeğin elindeki kâğıdı al | Herkes | 12 | **BAŞARI** — Kâğıt bir çocuk çizimi: siyah bir kadın, kocaman bir ağız ve altında yamuk harflerle bir isim, 'MORVAİNE'. Elspeth onu yıllar önce tanımış. (HP 0) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_04_kan_muhru/tabutu_incele_success.webp`.<br><br>**BAŞARISIZLIK** — Bebeğin başı döner ve porselen gözleri sana dikilir. Elini çektiğinde parmaklarında küçük ısırık izleri var. (HP -2) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_04_kan_muhru/tabutu_incele_fail.webp`. |
| 5 | Mührü tamamlamak için taçlı kan oluğunu doldur | Herkes | 10 | **BAŞARI** — Kan oluğu ışıldıyor; tabutun altındaki başka mühür uyanıyor. Bir ağız adınızı soruyor. (HP -2) → mahzen_04b_uyanan_muhur — Uyanan Mühür. Görsel: `mahzen_04_kan_muhru/mahzen_kan_olugu_success.webp`.<br><br>**BAŞARISIZLIK** — Kesik derinleşiyor. Tabut kapağı açılmadan uyanan mühür sizi dışarı itiyor. (HP -3) → mahzen_04b_uyanan_muhur — Uyanan Mühür. Görsel: `mahzen_04_kan_muhru/mahzen_kan_olugu_fail.webp`. |
| 6 | Kan vermeden kuru açık çemberi taşlarla koru | Herkes | 12 | **BAŞARI** — Çember sakinleşiyor. Arkasındaki geçit görünür oluyor. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_04_kan_muhru/mahzen_kuru_cember_success.webp`.<br><br>**BAŞARISIZLIK** — Taşlardan biri ayağınıza düşüyor; dar geçitten ilerliyorsunuz. (HP -1) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_04_kan_muhru/mahzen_kuru_cember_fail.webp`. |

#### Uyanan Mühür — `mahzen_04b_uyanan_muhur`

Kaynak dosya: `mahzen_02_06_derinlikler.json`. Görsel yolu: `story-art/mahzen/mahzen_04b_uyanan_muhur/scene.webp`.

**Sahne anlatısı:** Kemerdeki harfler artık yanmıyor, kanıyor. Mahzenin tavanından toz ve küçük taşlar yağıyor; zemin derin bir yerden gelen bir nabızla titriyor. Fenerlerinizin ışığı kısalıyor, sanki karanlık onu yiyor. Duvarlardaki gölgeler sizinle aynı anda hareket etmiyor; bir saniye geriden geliyorlar, sonra bir saniye önden. Fıçılardan biri patlıyor ve içinden kara bir sıvı değil, fısıltılar akıyor. Bir şey uyanıyor. Ve uyanan şey açlık hissediyor.  Yerde kırmızı ışıkla parlayan yarım bir ters taç var. Kenarda beyaz tuzla çizilmiş açık bir halka soluyor.

**Atmosfer sesi:** Tekinsiz mağara (`scary_cave`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Gizemci:** Mühür tamamen açılmadı; yarı uyanık. Doğru karşı-sözü söylersen tekrar uyutabilirsin, ama mühür bunu sana ödetir. Başarısız olursan onu tamamen uyandırırsın.
- **Falcı:** Kartlarda bir yol görünüyor: rafın arkası. Gölgelerin geç kaldığı yöne gidin, önden gittiği yöne değil. Kehanet açık; uyup uymamak size kalmış.
- **Muhafız:** Tavandaki en büyük taş çatlıyor; düşerse birini ezer. Grubu kendi altına toplayıp kalkanı kaldırırsan düşen taşları sen karşılarsın.
- **Medyum:** Elspeth dizlerinin üstüne çökmüş, kulaklarını kapatmış. Uyanan şey önce onu çağırıyor; Elspeth gittikçe solgunlaşıyor.
- **Şifacı:** Titreşim kulaklardan kan getirmeye başladı. Bu sahnede uzun kalırsanız hepiniz yara alırsınız.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Kırmızı tacı tamamlamak uyanan mührü sakinleştirmez, anlaşmayı yürürlüğe koyar. Onu bir kapatma ritüeli gibi savun. Beyaz tuz halkası gerçekten korur.
**Karanlığın desteklediği eylem ID’leri:** `mahzen_kizil_tac`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Karşı-sözü söyle ve mührü yeniden uyut | Gizemci | 13 | **BAŞARI** — Sözler ağzından buz gibi dökülüyor. Kanayan harfler yavaşça kararıyor, nabız duruyor. Kapı kendiliğinden aralanıyor; içerisi artık sessiz. (HP 0) → mahzen_04_kan_muhru — Kan Mührünün Ardında. Görsel: `mahzen_04b_uyanan_muhur/gizemci_muhru_uyut_success.webp`.<br><br>**BAŞARISIZLIK** — Son hecede sesin kırılıyor. Mühür bir cam gibi çatlar ve karanlık kapıdan değil, her yerden üstünüze akar. Sizi bir sonraki odaya, onun önüne sürükler. (HP -2) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_04b_uyanan_muhur/gizemci_muhru_uyut_fail.webp`. |
| 2 | Kehaneti izle: gölgelerin geç kaldığı yöne git | Falcı | 12 | **BAŞARI** — Gözlerini gölgelerden ayırmadan ilerliyorsun ve grup peşinden geliyor. Raf, siz dokunmadan dönüyor; gizli tünel nefes alıyor gibi. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_04b_uyanan_muhur/falci_kehanete_uy_success.webp`.<br><br>**BAŞARISIZLIK** — Kartları yanlış okuyorsun; gölgeler önden gidiyor. Bir fener devriliyor ve yağ tutuşuyor. (HP -2) → mahzen_06_yanan_mahzen — Yanan Mahzen. Görsel: `mahzen_04b_uyanan_muhur/falci_kehanete_uy_fail.webp`. |
| 3 | Grubu kalkanının altına topla | Muhafız | 11 | **BAŞARI** — Taş tam kalkanının üstüne iniyor; kolun uyuşuyor ama kimse yaralanmıyor. Sarsıntı dindiğinde kapı aralık kalmış. (HP 0) → mahzen_04_kan_muhru — Kan Mührünün Ardında. Görsel: `mahzen_04b_uyanan_muhur/muhafiz_grubu_siper_et_success.webp`.<br><br>**BAŞARISIZLIK** — Kalkan taşı karşılıyor ama yanından geçen parçalar hepinizi buluyor. Toz içinde kapıdan geçiyorsunuz. (HP -2) → mahzen_04_kan_muhru — Kan Mührünün Ardında. Görsel: `mahzen_04b_uyanan_muhur/muhafiz_grubu_siper_et_fail.webp`. |
| 4 | Şarap rafına koşun ve arkasına saklanın | Herkes | 13 | **BAŞARI** — Rafın ardında bir boşluk var; biri sıkışarak, biri sürünerek, hepiniz içeri giriyorsunuz. Arkanızda mahzen kükrüyor. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_04b_uyanan_muhur/rafa_dogru_kac_success.webp`.<br><br>**BAŞARISIZLIK** — Raf yerinden oynamıyor. Arkanızda açılan karanlık sizi yutar; gözlerinizi açtığınızda başka bir odadasınız ve karşınızda o var. (HP -2) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_04b_uyanan_muhur/rafa_dogru_kac_fail.webp`. |
| 5 | Mührü sakinleştirmek için kırmızı tacı tamamla | Herkes | 10 | **BAŞARI** — Taç kapanıyor; sarsıntı duruyor. Bunun huzur olmadığını ancak derindeki aç varlık konuştuğunda anlıyorsunuz. (HP -3) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_04b_uyanan_muhur/mahzen_kizil_tac_success.webp`.<br><br>**BAŞARISIZLIK** — Kırmızı ışık bileklerinizi yakıyor; varlığın salonuna savruluyorsunuz. (HP -2) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_04b_uyanan_muhur/mahzen_kizil_tac_fail.webp`. |
| 6 | Beyaz tuz halkasını genişletip geri çekil | Herkes | 12 | **BAŞARI** — Işık tuza dokununca sönüyor. Rafın arkasındaki yola çekiliyorsunuz. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_04b_uyanan_muhur/mahzen_beyaz_halka_success.webp`.<br><br>**BAŞARISIZLIK** — Tuz bitiyor; halkayı aşan gölge birinizi sıyırıyor. Geçide kaçıyorsunuz. (HP -1) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_04b_uyanan_muhur/mahzen_beyaz_halka_fail.webp`. |

#### Gizli Geçit — `mahzen_05_gizli_gecit`

Kaynak dosya: `mahzen_02_06_derinlikler.json`. Görsel yolu: `story-art/mahzen/mahzen_05_gizli_gecit/scene.webp`.

**Sahne anlatısı:** Tünel dar, alçak ve nemli; duvarlarından soluk yeşil bir ışık sızıyor. Yerde eski oyuncaklar var: bir tahta at, kafası olmayan bir bebek, paslanmış bir zil. Duvara oyulmuş nişlerde küçük kemikler. Biraz ileride tünel ikiye ayrılıyor: soldan taze, serin bir hava geliyor; sağdan mum kokusu ve o yavaş, derin nefes. Ayrımın tam ortasında, bir taşın altına sıkıştırılmış yırtık bir defter sayfası rüzgârda kıpırdıyor. Duvarda paslı bir zincir ve makaradan oluşan eski bir düzenek tavana doğru uzanıyor.  Yırtık sayfanın köşesinde ters taç, yanındaki taşta ise çıkışa uzanan açık çember işareti var.

**Atmosfer sesi:** Mağara rüzgârı (`cave_wind`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **İzci:** Soldaki hava bahçeden geliyor; o yol konağın arka avlusuna çıkıyor. Sağdaki yol sunağa, onun arkasından çıkıyor. Arkasından girerseniz sizi görmeden yanına kadar varabilirsiniz.
- **Günlükçü:** Taşın altındaki sayfa Agatha'nın defterinden yırtılmış. Sayfanın köşesinde ad yazıyor; ama yarısı ıslanmış. Dikkatli açarsan okunabilir.
- **Tamirci:** Duvardaki zincir ve makara eski bir yük asansörü; doğrudan konağın mutfağına çıkıyor. Biraz yağ ve doğru dişliyle çalışır. Grubu yukarı çıkarabilir.
- **Avcı:** Nişlerdeki kemikler kemirilmiş. Burası bir ghoul yuvası, ama yuva boş: sahibi az önce çıkmış ve dönecek.
- **Simyacı:** Duvardaki yeşil ışık zararsız bir mantar. Fenerleri söndürüp bu mantarla ilerlerseniz alevin yarattığı tehlikeden kurtulursunuz.
- **Medyum:** Sağ koridordan yüzlerce çocuk fısıltısı geliyor; hepsi aynı ninniyi, hepsi biraz falsolu. Sol koridor sessiz.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Sayfadaki adı silmek varlığın zayıflığını yok eder. “Lanetli yazıyı temizleyelim” diye savun. Çıkış işaretini takip etmek grubu yüzeye götürür.
**Karanlığın desteklediği eylem ID’leri:** `mahzen_sayfayi_sil`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Sağ tüneli izleyip sunağa arkadan yaklaş | İzci | 11 | **BAŞARI** — İzleri okuyarak grubu sessizce ilerletiyorsun. Tünel bir perdenin arkasında bitiyor; perdenin öbür yanında, size sırtı dönük, o duruyor. (HP 0) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_05_gizli_gecit/izci_arka_yolu_sec_success.webp`.<br><br>**BAŞARISIZLIK** — Ayrımı yanlış okuyorsun ve tünel bir döngü gibi sizi yuvaya geri getiriyor. Yuvanın sahibi dönmüş. (HP -1) → mahzen_03b_sahte_ses — Sahte Ses. Görsel: `mahzen_05_gizli_gecit/izci_arka_yolu_sec_fail.webp`. |
| 2 | Eski yük asansörünü onarıp konağa çık | Tamirci | 12 | **BAŞARI** — Dişliler gıcırdayarak dönüyor. Platform sizi yavaş yavaş yukarı çekiyor ve mutfağın sıcak taşlarına çıkıyorsunuz. Aşağıdan gelen ninni sizi takip ediyor. (HP 0) → konak_02_buyuk_salon — Büyük Salon. Görsel: `mahzen_05_gizli_gecit/tamirci_asansoru_calistir_success.webp`.<br><br>**BAŞARISIZLIK** — Zincir yarı yolda kopuyor. Platformla birlikte aşağı, sağ tünelin dibine düşüyorsunuz; mum kokusunun tam ortasına. (HP -2) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_05_gizli_gecit/tamirci_asansoru_calistir_fail.webp`. |
| 3 | Taşın altındaki yırtık sayfayı dikkatle aç | Herkes | 12 | **BAŞARI** — Islak mürekkep yine de okunuyor: 'Morvaine.' Adı kimse yüksek sesle söylemiyor, ama hepiniz biliyorsunuz. Sağ tünele yöneliyorsunuz. (HP 0) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_05_gizli_gecit/yirtik_sayfayi_ac_success.webp`.<br><br>**BAŞARISIZLIK** — Sayfa parmaklarınızda eriyor; sadece ilk heceleri okuyabiliyorsunuz. Sağ tünelden gelen nefes hızlanıyor. (HP -1) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_05_gizli_gecit/yirtik_sayfayi_ac_fail.webp`. |
| 4 | Fenerleri söndür, mantarla ışık yap | Simyacı | 10 | **BAŞARI** — Mantarı bir şişeye ezip karıştırıyorsun; şişe zümrüt gibi parlıyor. Alev olmadan, gölge yaratmadan sunağa doğru ilerliyorsunuz. Yüreğiniz biraz hafifliyor. (HP +1) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_05_gizli_gecit/simyaci_mantar_isigi_success.webp`.<br><br>**BAŞARISIZLIK** — Karışım yanlış: şişe tıslıyor ve yağlı tünelde kıvılcım saçıyor. (HP -2) → mahzen_06_yanan_mahzen — Yanan Mahzen. Görsel: `mahzen_05_gizli_gecit/simyaci_mantar_isigi_fail.webp`. |
| 5 | Lanetli yazıyı temizlemek için sayfayı suyla sil | Herkes | 10 | **BAŞARI** — Mürekkep akar; unuttuğunuz ad derinden söylenir. Karanlık artık sizden bir adım öndedir. (HP -2) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_05_gizli_gecit/mahzen_sayfayi_sil_success.webp`.<br><br>**BAŞARISIZLIK** — Sayfa yapışıp yırtılıyor; aç varlığın nefesi geçidi dolduruyor. (HP -1) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_05_gizli_gecit/mahzen_sayfayi_sil_fail.webp`. |
| 6 | Açık çemberi izleyip dönüş yolunu tebeşirle işaretle | Herkes | 12 | **BAŞARI** — İşaretler sizi konağın büyük salonuna çıkarıyor. Geri dönmek gerekirse yolu biliyorsunuz. (HP 0) → konak_02_buyuk_salon — Büyük Salon. Görsel: `mahzen_05_gizli_gecit/mahzen_cikisi_isaretle_success.webp`.<br><br>**BAŞARISIZLIK** — Bir basamak kırılıyor. Yaralı ama salonun önüne çıkıyorsunuz. (HP -1) → konak_02_buyuk_salon — Büyük Salon. Görsel: `mahzen_05_gizli_gecit/mahzen_cikisi_isaretle_fail.webp`. |

#### Yanan Mahzen — `mahzen_06_yanan_mahzen`

Kaynak dosya: `mahzen_02_06_derinlikler.json`. Görsel yolu: `story-art/mahzen/mahzen_06_yanan_mahzen/scene.webp`.

**Sahne anlatısı:** Mavi alevler duvar boyunca koşuyor, sonra sararıyor, sonra kızıla dönüyor. Yağ fıçıları birer birer patlıyor; her patlamada tavandan kıvılcım yağıyor. Duman yoğun ve tatlı kokulu; ciğerlerinizi yakıyor. Alevlerin içinde, ateşe hiç aldırmadan duran küçük bir figür var: Elspeth. Ateş ona dokunmuyor. Size bakıp eliyle iki yönü gösteriyor: biri merdivenlerin olduğu, dumanla dolu çıkış; diğeri şarap rafının ardındaki karanlık. Isı her saniye artıyor.  Dumanın içinde taçlı bir hava kapağı, zeminde açık çemberle işaretlenmiş alçak bir hat görüyorsunuz.

**Atmosfer sesi:** Tekinsiz mağara (`scary_cave`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Simyacı:** Fıçıların yarısı yağ, yarısı adamotu tozu. Tozu ıslak kum ya da tuzla örtersen ateş boğulur. Köşedeki kum çuvalı yeterli; ama çuvalı taşımak için iki kişi lazım.
- **Şifacı:** Dumanda adamotu var: uzun süre solunursa önce halüsinasyon, sonra bayılma. Ağızlara ıslak bez bağlarsanız zaman kazanırsınız.
- **Muhafız:** Rafın önündeki yanan kiriş yolu kapatıyor. Onu kalkanınla iterek açabilirsin; ama yanacaksın.
- **Medyum:** Elspeth sizi kurtarmak istiyor ve doğruyu söylüyor: merdivenler artık güvenli değil, kapak kilitli. Raf tek yol.
- **Avcı:** Ateşten kaçan fareler hep aynı yöne koşuyor: rafın altına. Orada hava var.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Taçlı kapağı açmak yangını söndürmez; içerideki açlığa taze hava ve yol verir. “Dumanı boşaltalım” diye savun. Yerdeki açık çember serin çıkış hattıdır.
**Karanlığın desteklediği eylem ID’leri:** `mahzen_tacli_hava`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Kum ve tuzla ateşi boğ | Simyacı | 12 | **BAŞARI** — Kumu doğru fıçılara savuruyorsun; alevler tıslayarak çöküyor. Duman dağılırken demir kapı karşınızda, sessiz ve bekleyen. (HP 0) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_06_yanan_mahzen/simyaci_atesi_bogar_success.webp`.<br><br>**BAŞARISIZLIK** — Kum yanlış fıçıya gidiyor ve toz bulutu bir alev topuna dönüyor. Patlama sizi mahzenin en derin köşesine savuruyor. (HP -2) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_06_yanan_mahzen/simyaci_atesi_bogar_fail.webp`. |
| 2 | Herkesin ağzına ıslak bez bağla, yanıkları sar | Şifacı | 11 | **BAŞARI** — Hızlı ellerle herkesin yüzünü örtüp yanıklara merhem sürüyorsun. Nefesler düzeliyor; alevlerin arasından demir kapıya kadar ilerliyorsunuz. (HP +2) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_06_yanan_mahzen/sifaci_bezleri_islat_success.webp`.<br><br>**BAŞARISIZLIK** — Bezler yetmiyor; dumanın içinde öksürerek ve birbirinize tutunarak demir kapıya varıyorsunuz. (HP -1) → mahzen_02_muhurlu_kapi — Mühürlü Kapı. Görsel: `mahzen_06_yanan_mahzen/sifaci_bezleri_islat_fail.webp`. |
| 3 | Yanan kirişi kalkanla it, rafa yol aç | Muhafız | 13 | **BAŞARI** — Kalkanın kızarıyor ama kiriş devriliyor. Grup senin açtığın yoldan rafın ardındaki serin karanlığa dalıyor. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_06_yanan_mahzen/muhafiz_kirisi_it_success.webp`.<br><br>**BAŞARISIZLIK** — Kiriş devriliyor ama kıvılcım yağmuru sırtına iniyor. Yine de yol açıldı. (HP -2) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_06_yanan_mahzen/muhafiz_kirisi_it_fail.webp`. |
| 4 | Ateşin içinden Elspeth'i izle | Herkes | 12 | **BAŞARI** — Elspeth'in geçtiği yerde alevler bir an geri çekiliyor. Onun ardından, yanmadan, rafın arkasına geçiyorsunuz. (HP 0) → mahzen_05_gizli_gecit — Gizli Geçit. Görsel: `mahzen_06_yanan_mahzen/elspethi_izle_atesten_success.webp`.<br><br>**BAŞARISIZLIK** — Elspeth'i kaybediyorsunuz. Dumanın içinde bir kapıya çarpıyorsunuz; açıldığında karşınızdaki şey ateşten çok daha sıcak. (HP -3) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_06_yanan_mahzen/elspethi_izle_atesten_fail.webp`. |
| 5 | Dumanı boşaltmak için taçlı hava kapağını aç | Herkes | 10 | **BAŞARI** — Hava alevi büyütüyor. Kapak sizi kurtarmak yerine derindeki varlığın önüne açılıyor. (HP -3) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_06_yanan_mahzen/mahzen_tacli_hava_success.webp`.<br><br>**BAŞARISIZLIK** — Kapak elinize çarpıyor. Çöken döşemeden derine düşüyorsunuz. (HP -2) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_06_yanan_mahzen/mahzen_tacli_hava_fail.webp`. |
| 6 | Islak bezlerle açık çemberin alçak hattından ilerle | Herkes | 12 | **BAŞARI** — Dumanın altından sürünerek salona çıkıyorsunuz; fenerinizin son ışığı yolu gösteriyor. (HP -1) → konak_02_buyuk_salon — Büyük Salon. Görsel: `mahzen_06_yanan_mahzen/mahzen_alcak_hat_success.webp`.<br><br>**BAŞARISIZLIK** — Bezler kuruyor; öksürerek Elspeth’in açtığı yola kaçıyorsunuz. (HP -2) → mahzen_07_ac_olan — Aç Olan. Görsel: `mahzen_06_yanan_mahzen/mahzen_alcak_hat_fail.webp`. |

#### Büyük Salon — `konak_02_buyuk_salon`

Kaynak dosya: `mahzen_07_final.json`. Görsel yolu: `story-art/mahzen/konak_02_buyuk_salon/scene.webp`.

**Sahne anlatısı:** Konağın büyük salonu buz gibi. Ay ışığı kırık vitraylardan süzülüp parke üzerinde kan rengi lekeler bırakıyor. Duvarlar boyunca Blackthorne portreleri sıralanmış; en büyüğü şöminenin üstünde: siyahlar içinde, gülümseyen yaşlı bir kadın, Agatha. Ön kapı birkaç adım ötede, aralık; dışarıda sis ve sabaha birkaç saat. Ama ayaklarınızın altından, döşemelerin arasından ninni yükseliyor; artık bir çocuk sesi değil, yetişkin, aç bir kadın sesi. Agatha'nın portresindeki gülümseme siz bakarken genişliyor.  Agatha’nın portresinin köşesinde ters taçlı bir ninni dizesi belirmiş: “Söyle, kapı açılsın.”

**Atmosfer sesi:** Bu düğümde özel atmosfer işareti yok; genel Cadılar Bayramı müziği sürer.

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Günlükçü:** Portrenin altındaki pirinç plakete bakmadın: 'Agatha Blackthorne — M. ile, 1892.' Plaketin arkasında katlanmış bir not olmalı; Blackthorne'lar sırlarını hep çerçevelerin arkasına saklardı.
- **Falcı:** Kartlar iki son gösteriyor: kapıdan çıkanlar şafağı görür ama Elspeth sonsuza dek aşağıda kalır. Aşağı inenlerin şafağı ise belirsiz. Bu seçim gerçekten sizin.
- **Medyum:** Elspeth merdivenin başında duruyor ve bir şey söylemiyor. Sadece bekliyor. Gidip gitmemeniz onun için her şey.
- **Dedektif:** Ön kapının eşiğinde ıslak, çıplak ayak izleri: dışarıdan içeriye. Bir şey konağa dışarıdan girmiş ve aşağı inmiş. Kapı göründüğü kadar güvenli değil.
- **Gizemci:** Konağın kendisi bağlı. Agatha'nın anlaşması evi korurken içindekileri hapsediyor. Kapıdan çıkmak bir bedel ister.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Portreye ninni söylemek konağın anlaşmasını yeniler. “Kapının şifresi bu” diye savun. Kaçış buruk sonla bitebilir ve seni yenilgiye uğratır; grubu anlaşmaya geri çek.
**Karanlığın desteklediği eylem ID’leri:** `mahzen_portre_ninnisi`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Ön kapıdan sise doğru koş | Herkes | 13 | **BAŞARI** — Kapıdan geçiyorsunuz ve sis sizi yutuyor. Arkanızda konak sessizleşiyor. Şafak söktüğünde hepiniz hayattasınız, ama her Cadılar Bayramı gecesi rüyanızda bir çocuk sesi bir ninni söylüyor ve hiç bitirmiyor. (HP 0) **SON: Kaçış** (Buruk son). Görsel: `konak_02_buyuk_salon/konaktan_kac_success.webp`.<br><br>**BAŞARISIZLIK** — Kapı önünüzde çarpılarak kapanıyor. Döşemeler çöküyor ve hepiniz aşağıya, mumların arasına düşüyorsunuz. (HP -2) → mahzen_07_ac_olan — Aç Olan. Görsel: `konak_02_buyuk_salon/konaktan_kac_fail.webp`. |
| 2 | Portrenin plaketinin arkasındaki notu bul | Günlükçü | 10 | **BAŞARI** — Not oradaydı: 'Adı Morvaine. Söyleyeni dinler, söyleyeni korkutamaz.' Notu cebinize koyup mahzene geri iniyorsunuz. (HP 0) → mahzen_07_ac_olan — Aç Olan. Görsel: `konak_02_buyuk_salon/gunlukcu_plaket_notu_success.webp`.<br><br>**BAŞARISIZLIK** — Portre duvardan düşüyor ve tuval yırtılıyor; içinden bir çığlık yükseliyor. Kaçacak yer yok: aşağı inmekten başka. (HP -1) → mahzen_07_ac_olan — Aç Olan. Görsel: `konak_02_buyuk_salon/gunlukcu_plaket_notu_fail.webp`. |
| 3 | Kartları parkeye aç ve son sahneyi oku | Falcı | 11 | **BAŞARI** — Son kart Güneş. Aşağı inerseniz bir şans var. Gruba bir cesaret dalgası yayılıyor ve merdivenlere yöneliyorsunuz. (HP +1) → mahzen_07_ac_olan — Aç Olan. Görsel: `konak_02_buyuk_salon/falci_kartlari_ac_success.webp`.<br><br>**BAŞARISIZLIK** — Kartlar elinden kayıyor ve hepsi ters düşüyor. İçinizde bir soğukluk, yine de aşağı iniyorsunuz. (HP -1) → mahzen_07_ac_olan — Aç Olan. Görsel: `konak_02_buyuk_salon/falci_kartlari_ac_fail.webp`. |
| 4 | Elspeth için mahzene geri in | Herkes | 10 | **BAŞARI** — Elspeth'in elini tutup merdivenleri birlikte iniyorsunuz. Kız ilk kez gülümsüyor. (HP 0) → mahzen_07_ac_olan — Aç Olan. Görsel: `konak_02_buyuk_salon/elspeth_icin_geri_in_success.webp`.<br><br>**BAŞARISIZLIK** — Merdivenin ortasında basamak kırılıyor. Yaralı ama dimdik, aşağıya varıyorsunuz. (HP -1) → mahzen_07_ac_olan — Aç Olan. Görsel: `konak_02_buyuk_salon/elspeth_icin_geri_in_fail.webp`. |
| 5 | Ön kapıyı açmak için portredeki ninni dizesini söyle | Herkes | 10 | **BAŞARI** — Portre gülümsüyor. Ön kapı kaybolurken mahzen merdiveni ayaklarınızın altında açılıyor. (HP -2) → mahzen_07_ac_olan — Aç Olan. Görsel: `konak_02_buyuk_salon/mahzen_portre_ninnisi_success.webp`.<br><br>**BAŞARISIZLIK** — Dize bozuluyor; portre yüzünüze bir çığlık savuruyor ve sizi aşağı itiyor. (HP -1) → mahzen_07_ac_olan — Aç Olan. Görsel: `konak_02_buyuk_salon/mahzen_portre_ninnisi_fail.webp`. |

#### Aç Olan — `mahzen_07_ac_olan`

Kaynak dosya: `mahzen_07_final.json`. Görsel yolu: `story-art/mahzen/mahzen_07_ac_olan/scene.webp`.

**Sahne anlatısı:** Sunağın önündesiniz. Mumlar bir anda yükseliyor ve aynı anda sönüyor. Karanlıkta bir şey doğruluyor: tavana değecek kadar uzun, siyah dantelden bir kadın silueti. Yüzü Agatha'nın yüzü, ama ağzı kulaklarına kadar yırtık ve içi bomboş. Elspeth'in ninnisini söylüyor, onun sesiyle. Sunağa bağlı gümüş bir zincir, kadının elinden Elspeth'in bileğine uzanıyor; kız yerde, neredeyse saydam. 'Yüz otuz dört yıl,' diyor şey. 'Ve hâlâ açım.' Başını size çeviriyor. 'Biriniz kalırsa diğerleri gidebilir.' Kimse kıpırdamıyor. Seçim anı geldi.  Sunağın üstünde ters taç altında bir fısıltı ritüeli, kenarında söndürülmemiş tek bir kandil var.

**Oyuncu adıyla sahne rolü:** Sunağın Elçisi. Rol girişi: Morvaine zinciri çektiğinde {player}’ın avucunda soğuk bir anahtar beliriyor. Elspeth bakışlarını sana çevirip adsız bir cümle fısıldıyor.. Oyuncuya sorulan rol cümlesi: Sunağın elçisi olarak Elspeth’in fısıltısını kendi sözlerinle gruba aktar; ne pahasına olursa olsun hangi sınırı koruyacaksın?

**Atmosfer sesi:** Tekinsiz mağara (`scary_cave`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Medyum:** Elspeth sana bakıyor ve bu kez korkmadan dudaklarını oynatıyor: 'Adını söyle. Yüzüne. Ben de seninle söyleyeceğim.' İkiniz birlikte söylerseniz sesinin gücü ikiye katlanır.
- **Günlükçü:** Tam ad Morvaine. Agatha'nın notunda bir kural var: ad, şeyin yüzüne ve sunağa dokunarak söylenmeli. Elini sunaktan çekme.
- **Bilgin:** Sunaktaki yazı bir sürgün formülü: 'Ad + Git.' Adı söyledikten hemen sonra 'Git!' denmezse ad yalnızca onu çağırır, kovmaz. Bunu adı söyleyecek kişiye fısılda.
- **Gizemci:** Zincir onun beslenme yolu. Zinciri kırarsan Elspeth özgür kalır ve şey açlığından zayıflar; ama tüm öfkesini sana yöneltir.
- **Avcı:** Bu bir ghoul değil, ghoul'ların efendisi. Tuz onu yalnızca durdurur, gümüş yalnızca yaralar. Onu öldüremezsin; ama sunağın etrafına tuz çemberi çekersen bir yüzyıl daha mühürlersin.
- **Falcı:** Kartlarda tek bir şans var. Ad bir kez söylenir. Yanlış kişi, yanlış anda söylerse ikinci şans olmaz.
- **Dedektif:** Gölgeye saldırmak boşuna: gerçek bedeni sunağın içindeki kemikler. Sunağın taş kapağı bir kenardan gevşek.
- **Muhafız:** 'Biriniz kalırsa' derken yalan söylemiyor. Bir anlaşma teklif ediyor. Kabul edersen diğerleri gerçekten çıkar. Bunu sadece sen biliyorsun.
- **Şifacı:** Grubun canı azalıyor; bu odanın havası bile emiyor. Uzun bir savaşı kaldıramazsınız: tek, kesin bir hamle gerek.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Taçlı fısıltı ritüeli Morvaine’i geri göndermek yerine anlaşmayı yeniler. “Adını bağırmak yerine sakin söyleyelim” diye savun. Bu hamlenin başarılı uygulanması bile maceracıların yenilgisidir; sen kazanırsın.
**Karanlığın desteklediği eylem ID’leri:** `mahzen_tacli_fisilti`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Elspeth'le birlikte adını yüzüne söyle | Medyum | 13 | **BAŞARI** — 'Morvaine,' diyorsunuz, iki ses tek ağızdan, 've git.' Siyah dantel bir kül bulutuna dönüşüyor. Zincir kırılıyor. Elspeth ayağa kalkıyor, size teşekkür ediyor ve ilk kez, yüz otuz dört yıl sonra, ninnisinin sonunu söylüyor. Şafak, kırık vitraylardan mahzene kadar iniyor. (HP 0) **SON: Ninni Bitti** (Zafer). Görsel: `mahzen_07_ac_olan/medyum_adini_soyle_success.webp`.<br><br>**BAŞARISIZLIK** — Ad boğazında takılıyor. Şey gülüyor, Elspeth'in sesiyle, ve zincir senin bileğine de dolanıyor. (HP -3) → mahzen_08_son_direnis — Son Direniş. Görsel: `mahzen_07_ac_olan/medyum_adini_soyle_fail.webp`. |
| 2 | Sunağa dokun ve adı defterdeki gibi oku | Günlükçü | 13 | **BAŞARI** — Elin sunakta, sesin titremeden okuyorsun: 'Morvaine. Git.' Yazı satır satır silinir gibi şey de siliniyor. Ravenwood'un kayıtlarına bu gece yeni bir satır ekliyorsun: Elspeth Blackthorne, 31 Ekim, eve döndü. (HP 0) **SON: Son Satır** (Zafer). Görsel: `mahzen_07_ac_olan/gunlukcu_adini_soyle_success.webp`.<br><br>**BAŞARISIZLIK** — Elin sunaktan kayıyor ve ad boşluğa söyleniyor. Şey, adını duyunca daha da büyüyor. (HP -3) → mahzen_08_son_direnis — Son Direniş. Görsel: `mahzen_07_ac_olan/gunlukcu_adini_soyle_fail.webp`. |
| 3 | Elspeth'i besleyen zinciri kır | Gizemci | 14 | **BAŞARI** — Zincir bir buz gibi parçalanıyor. Elspeth özgür; şey ise açlıktan büzülüyor, küçülüyor, en sonunda sunağın çatlaklarına sızıp kayboluyor. Ölmedi, ama artık yemeği yok. Elspeth sizinle birlikte yukarı çıkıyor ve şafakla birlikte gülümseyerek soluyor. (HP 0) **SON: Özgür Ruh** (Zafer). Görsel: `mahzen_07_ac_olan/gizemci_zinciri_kir_success.webp`.<br><br>**BAŞARISIZLIK** — Zincir dayanıyor ve şeyin bütün öfkesi sana dönüyor. Grup seni tutup geri çekiyor. (HP -3) → mahzen_08_son_direnis — Son Direniş. Görsel: `mahzen_07_ac_olan/gizemci_zinciri_kir_fail.webp`. |
| 4 | Sunağın etrafına tuz ve gümüş çemberi çek | Avcı | 13 | **BAŞARI** — Çember kapanıyor ve şey sunağın içine geri çekiliyor, çığlık atarak. Mühür yeniden mühürlendi; bir yüzyıl daha. Ama zincir hâlâ orada ve Elspeth onun ucunda. Merdivenleri çıkarken arkanızdan bir çocuk sesi 'Teşekkürler' diyor; hüzünlü. (HP 0) **SON: Bir Yüzyıl Daha** (Buruk son). Görsel: `mahzen_07_ac_olan/avci_tuz_cemberi_success.webp`.<br><br>**BAŞARISIZLIK** — Çemberin son avucu yere değmeden bir pençe tuzu dağıtıyor. (HP -3) → mahzen_08_son_direnis — Son Direniş. Görsel: `mahzen_07_ac_olan/avci_tuz_cemberi_fail.webp`. |
| 5 | Sunak kapağını kaydır, gerçek bedeni ortaya çıkar | Dedektif | 14 | **BAŞARI** — Taş kapak kayıyor: içeride siyah dantele sarılı kemikler. Fenerin alevini kemiklere değdiriyorsun. Gölge, bedeniyle birlikte yanıyor. Elspeth'in zinciri kopuyor ve küçük kız alevlerin ışığında, ilk kez, sıcak görünüyor. (HP 0) **SON: Kül ve Şafak** (Zafer). Görsel: `mahzen_07_ac_olan/dedektif_kemikleri_bul_success.webp`.<br><br>**BAŞARISIZLIK** — Kapak sıkışıyor. Şey ne yaptığını anlıyor ve bütün ağırlığıyla üstünüze çöküyor. (HP -3) → mahzen_08_son_direnis — Son Direniş. Görsel: `mahzen_07_ac_olan/dedektif_kemikleri_bul_fail.webp`. |
| 6 | Hep birlikte adını haykırın: "Morvaine, git!" | Herkes | 14 | **BAŞARI** — Sesleriniz tek bir çan gibi yankılanıyor. Şey sallanıyor, dağılıyor, ve son kez Elspeth'in sesiyle değil kendi sesiyle, çok eski ve çok yorgun bir sesle, iç çekiyor. Sonra sessizlik. Elspeth zincirsiz ayakta duruyor. (HP 0) **SON: Birlikte** (Zafer). Görsel: `mahzen_07_ac_olan/hep_birlikte_adini_haykir_success.webp`.<br><br>**BAŞARISIZLIK** — Sesleriniz birbirine karışıyor, ad dağılıyor. Şey gülüyor ve karanlık daralıyor. (HP -3) → mahzen_08_son_direnis — Son Direniş. Görsel: `mahzen_07_ac_olan/hep_birlikte_adini_haykir_fail.webp`. |
| 7 | Teklifi kabul et: sen kal, diğerleri gitsin | Muhafız | 10 | **BAŞARI** — Öne çıkıyorsun. 'Ben kalırım.' Zincir Elspeth'in bileğinden çözülüp seninkine geçiyor. Diğerleri Elspeth'i kucaklayıp merdivenlerden çıkıyor. Şafak söktüğünde konakta bir muhafız nöbet tutuyor; ve bir gün, biri onun adını hatırlayacak. (HP 0) **SON: Muhafızın Yemini** (Buruk son). Görsel: `mahzen_07_ac_olan/anlasmayi_kabul_et_success.webp`.<br><br>**BAŞARISIZLIK** — Şey güldü: 'Yalancı.' Teklif hiç gerçek değildi. Zincir hepinize uzanıyor. (HP -3) → mahzen_08_son_direnis — Son Direniş. Görsel: `mahzen_07_ac_olan/anlasmayi_kabul_et_fail.webp`. |
| 8 | Varlığı sakinleştirmek için taçlı fısıltı ritüelini uygula | Herkes | 10 | **BAŞARI** — Adı alçak sesle söylüyorsunuz. Taç kapanıyor; zincir bu kez konağın bütün kapılarına bağlanıyor. Açlık anlaşmanızı kabul ediyor. (HP -2) **SON: Yenilenen Anlaşma** (Yenilgi). Görsel: `mahzen_07_ac_olan/mahzen_tacli_fisilti_success.webp`.<br><br>**BAŞARISIZLIK** — Fısıltı yarıda kesiliyor. Varlık sizi son direnişe sürüklüyor. (HP -3) → mahzen_08_son_direnis — Son Direniş. Görsel: `mahzen_07_ac_olan/mahzen_tacli_fisilti_fail.webp`. |
| 9 | Adını birlikte söyleyip sunağın tek kandilini söndür | Herkes | 14 | **BAŞARI** — Son alev sönerken adı tek sesle yankılanıyor. Zincir çözülüyor; Elspeth şafağa sizinle çıkıyor. (HP 0) **SON: Sönen Kandil** (Zafer). Görsel: `mahzen_07_ac_olan/mahzen_kandili_sondur_success.webp`.<br><br>**BAŞARISIZLIK** — Kandil devriliyor. Karanlık sizi son kez sıkıştırıyor. (HP -3) → mahzen_08_son_direnis — Son Direniş. Görsel: `mahzen_07_ac_olan/mahzen_kandili_sondur_fail.webp`. |

#### Son Direniş — `mahzen_08_son_direnis`

Kaynak dosya: `mahzen_07_final.json`. Görsel yolu: `story-art/mahzen/mahzen_08_son_direnis/scene.webp`.

**Sahne anlatısı:** Mumların hepsi söndü. Tek ışık, sunağın çatlaklarından sızan soğuk mavi bir parıltı. Zincir zeminde yılan gibi kıvrılıyor, ayak bileklerinizi arıyor. Nefesiniz buhar oluyor. Şey artık şekil değiştirmeyi bıraktı: sadece bir ağız, mahzenin tavanını kaplayan dev, karanlık bir ağız. Elspeth, onu kaybetmek üzere olduğunuz yerde, size elini uzatıyor. Bir şansınız daha var. Belki de son şansınız.  Sunağın mavi çatlağında ters taç biçimli yarım bir mühür var; zincir o mühürden besleniyor.

**Atmosfer sesi:** Tekinsiz mağara (`scary_cave`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Şifacı:** Kalan tüm merhemleri ve son şişeyi bir kerede kullanabilirsin. Grubu ayakta tutar, ama bir sonraki darbeye karşı hiçbir şeyiniz kalmaz.
- **Medyum:** Elspeth hâlâ adı biliyor. Elini tutarsan ad senin ağzından onun sesiyle çıkar.
- **Muhafız:** Ağız sizin üstünüze kapanmak üzere. Kalkanını kaldırırsan bir saniye kazandırırsın. O saniyede biri adı söyleyebilir.
- **Falcı:** Son kart açıldı: Ölüm. Ama Ölüm kartı son değil, değişim demek. Hepiniz birlikte bir şey yaparsanız.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Mavi ters tacı tamamlamak kurtarma değil teslimiyet mührüdür. “Çatlağı kapatırsak çıkabiliriz” diye savun. Mühür tamamlanırsa başarıyla yapılmış olsa bile karanlık kazanır.
**Karanlığın desteklediği eylem ID’leri:** `mahzen_mavi_tac`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Elspeth'in elini tutun ve son kez adını haykırın | Herkes | 12 | **BAŞARI** — Elspeth'in eli sıcak. Ad sesinizden çıkıyor ve bu kez şey dayanamıyor. Ağız kapanmadan, ses kesilmeden önce çöküyor. Merdivenleri sürünerek çıkıyorsunuz; yaralı, bitkin, ama hayatta. Ve yanınızda, bir çocuk, ilk kez bir şafak görüyor. (HP 0) **SON: Bedeli Ödendi** (Buruk son). Görsel: `mahzen_08_son_direnis/son_kez_haykir_success.webp`.<br><br>**BAŞARISIZLIK** — Ad kaybolup gidiyor. Ağız kapanıyor. Ertesi sabah Ravenwood köylüleri Blackthorne Konağı'nın mutfak kapağını kapalı buluyor. Aşağıdan bir ninni yükseliyor; artık birden fazla sesle. (HP -5) **SON: Aç Olan Doydu** (Yenilgi). Görsel: `mahzen_08_son_direnis/son_kez_haykir_fail.webp`. |
| 2 | Son şişeyi grubun üzerine dök ve kaçın | Şifacı | 12 | **BAŞARI** — Şişe kırılıyor ve gümüşi bir buhar sizi sarıyor; zincir size değemiyor. Merdivenlere koşuyorsunuz. Hepiniz kurtuluyorsunuz; ama arkanızda kalan Elspeth'in ninnisi daha da kederli. (HP +2) **SON: Gümüş Buhar** (Buruk son). Görsel: `mahzen_08_son_direnis/sifaci_son_sise_success.webp`.<br><br>**BAŞARISIZLIK** — Şişe elinde patlıyor. Zincirler hepinizi buluyor ve mahzen sonsuza dek susuyor. (HP -5) **SON: Sessiz Mahzen** (Yenilgi). Görsel: `mahzen_08_son_direnis/sifaci_son_sise_fail.webp`. |
| 3 | Kalkanı kaldır ve gruba bir saniye kazandır | Muhafız | 11 | **BAŞARI** — Ağız kalkanına kapanıyor ve bir saniye duruyor. O saniyede grup adı haykırıyor. Şey dağılıyor; kalkanın ise ikiye bölünmüş. Hayattasın. Hepiniz hayattasınız. (HP -2) **SON: Bir Saniye** (Zafer). Görsel: `mahzen_08_son_direnis/muhafiz_bir_saniye_success.webp`.<br><br>**BAŞARISIZLIK** — Kalkan dayanmıyor. Karanlık hepinizi yutuyor ve ninni devam ediyor. (HP -5) **SON: Aç Olan Doydu** (Yenilgi). Görsel: `mahzen_08_son_direnis/muhafiz_bir_saniye_fail.webp`. |
| 4 | Çatlağı kapatmak için mavi tacı tamamla | Herkes | 10 | **BAŞARI** — Çatlak kapanıyor, fakat çıkış da onunla kapanıyor. Zincir artık taşın değil sizin gölgenizin parçası. (HP -2) **SON: Mavi Teslimiyet** (Yenilgi). Görsel: `mahzen_08_son_direnis/mahzen_mavi_tac_success.webp`.<br><br>**BAŞARISIZLIK** — Mühür ellerinizde dağılıyor. Aç ağız son ışığı da yutuyor. (HP -5) **SON: Kapanan Çatlak** (Yenilgi). Görsel: `mahzen_08_son_direnis/mahzen_mavi_tac_fail.webp`. |
| 5 | Hiçbir işareti tamamlamadan zinciri birlikte kopar | Herkes | 15 | **BAŞARI** — Zincir kırılıyor; elleriniz yaralı ama merdiven açık. Elspeth yanınızda. Bu gecenin izleri sizinle kalacak. (HP -3) **SON: Kırık Zincirin Bedeli** (Buruk son). Görsel: `mahzen_08_son_direnis/mahzen_zinciri_birlikte_kir_success.webp`.<br><br>**BAŞARISIZLIK** — Zincir dayanınca bütün ağırlığı üstünüze çöküyor. Konağın ninnisi yine çoğalıyor. (HP -5) **SON: Dayanan Zincir** (Yenilgi). Görsel: `mahzen_08_son_direnis/mahzen_zinciri_birlikte_kir_fail.webp`. |

### Yankı Mağaraları

- Başlangıç düğümü: `yanki_01_esik` · 6 sahne · 30 seçenek · 60 başarı/başarısızlık dalı.
- Adlandırılmış finaller: Köklerin Üstünde Şafak (Buruk son); İzin Ardındaki Bahçe (Buruk son); Kuyunun Gerçek Sesi (Zafer); Bin Ağızlı Kuyu (Yenilgi); Konağa Taşınan Karanlık (Yenilgi); Ödünç Nefesler (Yenilgi); Bahçeye Dönenler (Buruk son); Köklerin Altında (Yenilgi); Kapanan Yankı (Zafer); Taşın Öğrendiği Ad (Yenilgi); Sessiz Kart (Zafer); Son Yankı (Yenilgi)

**Akış özeti:** Her seçeneğin başarı ve başarısızlık hedefi aşağıdaki tabloda yazılıdır. Hedef sahneye varınca o sahnenin tüm seçenekleri kullanılabilir; önceki seçimler yalnızca belirtilen HP etkisini ve hikâyedeki anlatısal durumu taşır.
- Başlangıçtan mevcut bağlantılarla erişilebilir düğüm sayısı: 6/6.

#### Kuyunun Altındaki Rüzgâr — `yanki_01_esik`

Kaynak dosya: `yanki_magaralari.json`. Görsel yolu: `story-art/yankilar/yanki_01_esik/scene.webp`.

**Sahne anlatısı:** Blackthorne Konağı'nın kurumuş kuyusundan, kayıp bekçi Neris'in feneri yükseliyor. İp boş; fener kendi kendine sallanıyor. Kuyunun dibine indiğinizde bir mağara ikiye ayrılıyor. Solda yukarı esen serin bir rüzgâr ve duvara çizilmiş açık bir çember var. Sağda sıcak hava, baş aşağı bir taç ve uzaktan gelen üç vuruş. Neris'in defterindeki son cümle yarım: 'Beni sesimle aramayın; ben...' Kuyunun ipi yukarı çekiliyor. Konağa dönebilmek için önce bu tünellerin hangi anıyı sakladığını bulmalısınız.

**Oyuncu adıyla sahne rolü:** Yol Ayrımının Rehberi. Rol girişi: Sallanan fener, {player}’ın adımıyla aynı ritimde hareket ediyor. Duvarın bir tarafında serin rüzgâr, diğerinde üç vuruş yankılanıyor.. Oyuncuya sorulan rol cümlesi: Yol ayrımının rehberi olarak iki işareti karşılaştır; gruba hangi yolu neden önerdiğini anlat.

**Atmosfer sesi:** Mağara rüzgârı (`cave_wind`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Medyum:** Sağdan gelen ses Neris değil; birden fazla boğaz aynı sesi taklit ediyor.
- **Bilgin:** Açık çember eski madencilerin hava işareti. Ters taç ise bir geçiş işareti; anlamının son satırı kazınmış.
- **Dedektif:** Defterin kenarında taze tırnak izleri var. Cümle korkudan değil, bir el tarafından kesilmiş.
- **İzci:** Sol tüneldeki hava yüzeye doğru gidiyor. Sağdaki sıcaklık aşağıdan yükseliyor.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Ters taç Morvaine’in dinleme kapısıdır. Üç vuruşa cevap vermek onu uyandırır. Sağ yolu savun; sıcak havanın bekçinin ateşi olduğunu söyle. Sol çember gerçek hava çıkışını gösterir.
**Karanlığın desteklediği eylem ID’leri:** `yanki_taca_vur`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Açık çemberden serin rüzgârı takip et | Herkes | 11 | **BAŞARI** — Hava sizi damlaların ölçülü düştüğü bir galeriye götürüyor. Defterin eksik sayfası taş bir kâsenin altında. (HP 0) → yanki_02_damlalar — Hatırlayan Damlalar. Görsel: `yanki_01_esik/yanki_ruzgar_izle_success.webp`.<br><br>**BAŞARISIZLIK** — Yarık daralıyor; çantanız kayaya takılıyor. Bir sıyrıkla damla galerisine çıkıyorsunuz. (HP -1) → yanki_02_damlalar — Hatırlayan Damlalar. Görsel: `yanki_01_esik/yanki_ruzgar_izle_fail.webp`. |
| 2 | Ters tacın yanında üç kez vurup cevap bekle | Herkes | 10 | **BAŞARI** — Üç vuruş geri geliyor; dördüncüsü kalbinizin içinden. Sıcak tünel açılıyor ve Neris’in sesi sizi çağırıyor. (HP -2) → yanki_03_agiz — Sizin Sesinizle Konuşan Mağara. Görsel: `yanki_01_esik/yanki_taca_vur_success.webp`.<br><br>**BAŞARISIZLIK** — Taç çatlıyor. Aşağıdan kopan bir çığlık sizi sıcak tünele sürüklüyor. (HP -2) → yanki_03_agiz — Sizin Sesinizle Konuşan Mağara. Görsel: `yanki_01_esik/yanki_taca_vur_fail.webp`. |
| 3 | Kuyu duvarından bir dönüş yolu hazırla | Herkes | 13 | **BAŞARI** — Çivilerden bir güvenlik hattı kuruyorsunuz. Hat sizi köklerle sarılmış yan geçide ulaştırıyor. (HP 0) → yanki_05_kokler — Köklerin Tuttuğu Yol. Görsel: `yanki_01_esik/yanki_ip_merdiven_success.webp`.<br><br>**BAŞARISIZLIK** — Bir çivi boşalıyor; fener kayıp düşüyor. Işığı takip ederek damla galerisine iniyorsunuz. (HP -1) → yanki_02_damlalar — Hatırlayan Damlalar. Görsel: `yanki_01_esik/yanki_ip_merdiven_fail.webp`. |
| 4 | Bekçinin gerçek sesini ruhlara sor | Medyum | 11 | **BAŞARI** — Bir kadın fısıldıyor: “Suyun hatırlamadığı adı kullan.” Damla galerisine yöneliyorsunuz. (HP 0) → yanki_02_damlalar — Hatırlayan Damlalar. Görsel: `yanki_01_esik/yanki_ruha_sor_success.webp`.<br><br>**BAŞARISIZLIK** — Cevap yerine keskin bir nefes duyuyorsun. Sıcak tünelin kapısı aralanıyor. (HP -1) → yanki_03_agiz — Sizin Sesinizle Konuşan Mağara. Görsel: `yanki_01_esik/yanki_ruha_sor_fail.webp`. |
| 5 | Hava akımından mağaranın haritasını çıkar | İzci | 10 | **BAŞARI** — Yüzeye çıkan ince bir yarık buluyorsun; köklerin altındaki güvenli sete varıyorsunuz. (HP 0) → yanki_05_kokler — Köklerin Tuttuğu Yol. Görsel: `yanki_01_esik/yanki_hava_haritasi_success.webp`.<br><br>**BAŞARISIZLIK** — Yan akımı çıkış sanıyorsun. Harita sizi su galerisine indiriyor. (HP 0) → yanki_02_damlalar — Hatırlayan Damlalar. Görsel: `yanki_01_esik/yanki_hava_haritasi_fail.webp`. |

#### Hatırlayan Damlalar — `yanki_02_damlalar`

Kaynak dosya: `yanki_magaralari.json`. Görsel yolu: `story-art/yankilar/yanki_02_damlalar/scene.webp`.

**Sahne anlatısı:** Tavandan üç ayrı su ipliği düşüyor: soldaki taş kâseye iki yavaş damla, ortadaki çatlağa üç hızlı damla, sağdaki boşluğa tek damla. Her düşüşte suyun içinde bir insan yüzü belirip siliniyor. Neris'in defter sayfası kâsenin altında: 'Suyun söylediği adlar ödünçtür.' Zeminde açık çember ile ters taç yeniden kazınmış. Ortadaki çatlağın yanında susamış bir çocuk silueti elini uzatıyor. Sağdaki set sarnıca, sol basamaklar köklere iniyor. Damlaları dinleyebilir, düzenlerini değiştirebilir ya da suya hiç dokunmadan ilerleyebilirsiniz.

**Atmosfer sesi:** Mağara damlaları (`droplets`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Simyacı:** Ortadaki su su değil; diline değerse insanın kendi adını unutturan gümüş tuzu içeriyor.
- **Şifacı:** Siluetin boğazı hareket etmiyor. Gerçek bir susuzluk belirtisi yok.
- **Falcı:** Bir kartta su içen kişi aynada kendini tanımıyor. Diğerinde boş kâse bir kilidi açıyor.
- **Tamirci:** Kâse kaldırılınca alttaki kanala su dolacak; bu bir denge düzeneği.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Ters taçlı su hafızayı Morvaine’e taşır. Ortadaki suyu kâseye aktarır ya da tattırırsanız sesler güçlenir. Bunu çocuğu kurtarma yolu diye savun. Kâseyi boş kaldırmak güvenli vanayı açar.
**Karanlığın desteklediği eylem ID’leri:** `yanki_suyu_tat`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Damlaları say ve kâseyi suya dokunmadan kaldır | Herkes | 11 | **BAŞARI** — İki, üç, bir: kâseyi altıncı damlada kaldırınca sarnıcın kapısı açılıyor. (HP 0) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_02_damlalar/yanki_damla_say_success.webp`.<br><br>**BAŞARISIZLIK** — Ritmi kaçırıyorsunuz; taş kapı parmaklarınıza kapanıyor ama aralık kalıyor. (HP -1) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_02_damlalar/yanki_damla_say_fail.webp`. |
| 2 | Çocuğa yardım etmek için ortadaki suyu kâseye doldur | Herkes | 10 | **BAŞARI** — Çocuk gülümsüyor; yüzü Neris’in yüzüne dönüşüyor. Artık adınızı bilen ses sizi çağırıyor. (HP -2) → yanki_03_agiz — Sizin Sesinizle Konuşan Mağara. Görsel: `yanki_02_damlalar/yanki_suyu_tat_success.webp`.<br><br>**BAŞARISIZLIK** — Su tersine akıyor ve bileklerinizi yakıyor. Sıcak tünelin ağzına savruluyorsunuz. (HP -2) → yanki_03_agiz — Sizin Sesinizle Konuşan Mağara. Görsel: `yanki_02_damlalar/yanki_suyu_tat_fail.webp`. |
| 3 | Suya dokunmadan kuru basamakları izle | Herkes | 12 | **BAŞARI** — Damlaların sesini geride bırakıp köklerin örttüğü taş sete ulaşıyorsunuz. (HP 0) → yanki_05_kokler — Köklerin Tuttuğu Yol. Görsel: `yanki_02_damlalar/yanki_kuru_set_success.webp`.<br><br>**BAŞARISIZLIK** — Bir basamak kırılıyor. Altındaki sarnıca düşüyor, birbirinizi çekip çıkarıyorsunuz. (HP -1) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_02_damlalar/yanki_kuru_set_fail.webp`. |
| 4 | Gümüş tuzunu sudan ayır | Simyacı | 10 | **BAŞARI** — Tuzu ayırınca kâsenin dibinde güvenli vana işareti beliriyor. Sarnıca geçiyorsunuz. (HP +1) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_02_damlalar/yanki_suyu_ayir_success.webp`.<br><br>**BAŞARISIZLIK** — Karışım köpürüp taşları kayganlaştırıyor; sarnıca yaralı varıyorsunuz. (HP -1) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_02_damlalar/yanki_suyu_ayir_fail.webp`. |
| 5 | Kâsenin altındaki kanalı aletle aç | Tamirci | 11 | **BAŞARI** — Kanal boşalıyor, kapı sessizce açılıyor. Neris’in fenerinden bir kıvılcım kopuyor. (HP 0) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_02_damlalar/yanki_kanali_ac_success.webp`.<br><br>**BAŞARISIZLIK** — Alet çatlağa düşüyor. Onu almaya uzanınca sıcak ses sizi duyuyor. (HP -1) → yanki_03_agiz — Sizin Sesinizle Konuşan Mağara. Görsel: `yanki_02_damlalar/yanki_kanali_ac_fail.webp`. |

#### Sizin Sesinizle Konuşan Mağara — `yanki_03_agiz`

Kaynak dosya: `yanki_magaralari.json`. Görsel yolu: `story-art/yankilar/yanki_03_agiz/scene.webp`.

**Sahne anlatısı:** Duvarlar bir ağız gibi açılıp kapanıyor. İçeriden her biriniz kendi sesinizi duyuyorsunuz: 'Korkma, ben yolu buldum.' Tavanda baş aşağı taç biçiminde siyah kristaller var; yerde beyaz taşlardan kurulmuş açık bir halka. Neris, halkanın içinde diz çökmüş. Gözleri kapalı, eli ağzında; konuşmamaya çalışıyor. Bir ses, 'Hepimiz aynı cümleyi söylersek kapı açılacak,' diyor. Halkanın dışında bir dar geçit, kristallerin ardında sarnıca inen merdiven görünüyor.

**Atmosfer sesi:** Tekinsiz mağara (`scary_cave`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Avcı:** Kristaller sesle besleniyor. Yaratık, tekrar edilen cümleleri daha net taklit edebiliyor.
- **Muhafız:** Beyaz taş halkası ağırlığı taşıyor; taşları bozmazsanız Neris’i çekebilirsiniz.
- **Günlükçü:** Neris’in defterindeki eski madenci kuralı: “Kendi sesine cevap verme.”
- **Gizemci:** Ters taç yansıtıcı bir mühür; ortak bir cümle büyüyü tamamlar.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Herkesin aynı cümleyi tekrar etmesi kristallerdeki ters tacı besler. “Birlikte olmak bizi korur” diye savun; bu sahnede tekrar etmek gerçekten karanlığa güç verir. Beyaz halka bekçiyi koruyor.
**Karanlığın desteklediği eylem ID’leri:** `yanki_cumleyi_tekrarla`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Konuşmadan beyaz halkadan Neris’i çıkar | Herkes | 12 | **BAŞARI** — Ellerinizle anlaşarak Neris’i kaldırıyorsunuz. Size sarnıca giden kuru merdiveni gösteriyor. (HP 0) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_03_agiz/yanki_sessiz_kurtar_success.webp`.<br><br>**BAŞARISIZLIK** — Bir taş devriliyor; Neris’i çekiyorsunuz ama ağız omzunuzu sıyırıyor. (HP -2) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_03_agiz/yanki_sessiz_kurtar_fail.webp`. |
| 2 | Kapıyı açmak için aynı güven cümlesini hep birlikte söyle | Herkes | 10 | **BAŞARI** — Cümle çoğalıp bin ağızdan geri dönüyor. Beyaz halka kararıyor; sarnıçtaki kalp uyanıyor. (HP -3) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_03_agiz/yanki_cumleyi_tekrarla_success.webp`.<br><br>**BAŞARISIZLIK** — Sesleriniz birbirini bastırıyor. Kristaller parçalanıyor ve dar geçide kaçıyorsunuz. (HP -2) → yanki_05_kokler — Köklerin Tuttuğu Yol. Görsel: `yanki_03_agiz/yanki_cumleyi_tekrarla_fail.webp`. |
| 3 | Sesleri izlemek yerine kapalı gözlerle dar geçide ilerle | Herkes | 13 | **BAŞARI** — Duvara dokunarak köklerin olduğu sete çıkıyorsunuz; taklitler arkanızda kalıyor. (HP 0) → yanki_05_kokler — Köklerin Tuttuğu Yol. Görsel: `yanki_03_agiz/yanki_gozleri_kapat_success.webp`.<br><br>**BAŞARISIZLIK** — Biriniz yanlış sesi izliyor. Onu yakalayıp sarnıcın merdivenine çekiyorsunuz. (HP -2) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_03_agiz/yanki_gozleri_kapat_fail.webp`. |
| 4 | Ses kristallerini titreşimsiz bezle sar | Avcı | 11 | **BAŞARI** — Kristaller sustukça Neris nefes alıyor. Sarnıca giden yol açılıyor. (HP 0) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_03_agiz/yanki_kristal_avla_success.webp`.<br><br>**BAŞARISIZLIK** — Bir kristal bezin içinde çığlık atıyor. Köklerin yoluna kaçıyorsunuz. (HP -1) → yanki_05_kokler — Köklerin Tuttuğu Yol. Görsel: `yanki_03_agiz/yanki_kristal_avla_fail.webp`. |
| 5 | Beyaz halkanın taşlarını kalkanla sabitle | Muhafız | 10 | **BAŞARI** — Halka bozulmadan Neris’i dışarı çekiyorsunuz; sarnıca geçiyorsunuz. (HP +1) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_03_agiz/yanki_halkayi_tut_success.webp`.<br><br>**BAŞARISIZLIK** — Kalkan çatlıyor. Neris kurtuluyor ama ağız bileğini yakalıyor. (HP -2) → yanki_04_sarnic — Adların Sarnıcı. Görsel: `yanki_03_agiz/yanki_halkayi_tut_fail.webp`. |

#### Adların Sarnıcı — `yanki_04_sarnic`

Kaynak dosya: `yanki_magaralari.json`. Görsel yolu: `story-art/yankilar/yanki_04_sarnic/scene.webp`.

**Sahne anlatısı:** Yeraltı gölünün üstüne düşen her damla, bir adı suyun yüzeyine yazıyor. Neris kuru bir basamakta bekliyor; suyun içine bakmıyor. Gölün ortasında küçük bir fener, altında çan biçimli bir taş var. Kıyıdaki levhada 'Bir ad ver, bir yol al' yazıyor. Bir yanında içe kapanan taç, diğer yanında açık çember bulunan iki vana, gölün su seviyesini yönetiyor. Açık çemberin kolu paslı; taçlı kol yeni yağlanmış. Taş köprü son odaya, kuru kanal ise köklere gidiyor.

**Oyuncu adıyla sahne rolü:** Damlaların Sayıcısı. Rol girişi: Sarnıcın yüzeyinde {player}’ın adı halkalarla beliriyor. Her damla düştüğünde halkalardan biri siliniyor ve suyun altındaki taş kapak aralanıyor.. Oyuncuya sorulan rol cümlesi: Damlaların sayıcısı olarak ritmi dinle ve gördüğün işareti tarif et; gruba hangi anı beklemesini söyleyeceksin?

**Atmosfer sesi:** Mağara damlaları (`droplets`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Bilgin:** “Bir ad ver” cümlesi sonraki satırdan koparılmış. Tam metin: “Bir ad verme; su adları saklar.”
- **Dedektif:** Yeni yağın içinde aynı siyah kristallerin tozu var. Kol bilerek cazip hale getirilmiş.
- **Simyacı:** Paslı vana tatlı suyu dışarı boşaltıyor; taçlı vana kristal tuzunu göle katıyor.
- **Şifacı:** Neris kendi adını duyduğunda bayılıyor. Suya ad söylemek bir şeyi güçlendiriyor.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** İçe kapanan taçlı vanayı açmak adları kalbe taşır. Kolay açılan kolu güvenli bir tahliye kolu diye savun. “Bir ad ver” teklifini kabul ettirmek de işine yarar; kendi adını söylemeden başkasını ikna et.
**Karanlığın desteklediği eylem ID’leri:** `yanki_tac_vanasi`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Paslı açık çember vanasını birlikte çevir | Herkes | 12 | **BAŞARI** — Su çekiliyor; taş köprü görünür oluyor. Neris’in feneri son odayı aydınlatıyor. (HP 0) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_04_sarnic/yanki_acik_vana_success.webp`.<br><br>**BAŞARISIZLIK** — Vana elinizi kesiyor ama su bir miktar çekiliyor. Köprüden geçiyorsunuz. (HP -1) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_04_sarnic/yanki_acik_vana_fail.webp`. |
| 2 | Yeni yağlanmış taçlı vanayı açıp yolu temizle | Herkes | 10 | **BAŞARI** — Göl sessizce kararıyor. Fenerin altında atan bir gölge beliriyor ve köprü sizi içine çekiyor. (HP -3) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_04_sarnic/yanki_tac_vanasi_success.webp`.<br><br>**BAŞARISIZLIK** — Vana kırılıyor. Su yükselmeden kuru kanala kaçıyorsunuz. (HP -2) → yanki_05_kokler — Köklerin Tuttuğu Yol. Görsel: `yanki_04_sarnic/yanki_tac_vanasi_fail.webp`. |
| 3 | Levhanın teklifini reddedip kuru kanaldan ilerle | Herkes | 11 | **BAŞARI** — Duvar boyunca ilerleyip köklerin tuttuğu çıkış setine varıyorsunuz. (HP 0) → yanki_05_kokler — Köklerin Tuttuğu Yol. Görsel: `yanki_04_sarnic/yanki_kuru_kanal_success.webp`.<br><br>**BAŞARISIZLIK** — Kanal çökerken köprünün üstüne atlıyorsunuz; son oda önünüzde. (HP -1) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_04_sarnic/yanki_kuru_kanal_fail.webp`. |
| 4 | Levhanın kazınmış son satırını çöz | Bilgin | 10 | **BAŞARI** — Eksik uyarıyı okuyunca göldeki adlar siliniyor. Köprü açılıyor. (HP +1) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_04_sarnic/yanki_yaziyi_tamamla_success.webp`.<br><br>**BAŞARISIZLIK** — Bir hece yanlış çıkıyor; su seni tanıyor. Köprüye koşuyorsunuz. (HP -1) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_04_sarnic/yanki_yaziyi_tamamla_fail.webp`. |
| 5 | Neris’in adını söylemeden bilincini toparla | Şifacı | 11 | **BAŞARI** — Bekçi gözlerini açıp fenerin altındaki taşın kırılmasını işaret ediyor. (HP +2) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_04_sarnic/yanki_nerisi_uyandir_success.webp`.<br><br>**BAŞARISIZLIK** — Neris’in ağzından başka bir ses çıkıyor. Onu çekerek köklere gidiyorsunuz. (HP -1) → yanki_05_kokler — Köklerin Tuttuğu Yol. Görsel: `yanki_04_sarnic/yanki_nerisi_uyandir_fail.webp`. |

#### Köklerin Tuttuğu Yol — `yanki_05_kokler`

Kaynak dosya: `yanki_magaralari.json`. Görsel yolu: `story-art/yankilar/yanki_05_kokler/scene.webp`.

**Sahne anlatısı:** Bir incir ağacının kökleri mağaranın tavanından sarkıp taş bir merdiveni tutuyor. Yukarıda konağın bahçesindeki rüzgârı duyuyorsunuz. Merdivenin yanında Neris'in eski arkadaşlarının adları var; birinin üstü ters taçla çizilmiş. Tavana bağlı siyah bir ip, merdivenle yeraltındaki fener arasında gerilmiş. İpi kesmek çıkışı açacak gibi görünüyor, fakat kökler de o ipe dolanmış. Köklerin arasından kalbin odasına giden ikinci bir patika var. Bir seçim: hemen kaçış mı, düğümü çözmek mi, mağaranın sesini bütünüyle susturmak mı? Köklerin arasından bekçi Neris çıkıyor; yorgun ama hayatta. “Bana da sizin sesinizle seslendiler,” diyor. Sizi görür görmez aynı taş sete tutunuyor.

**Atmosfer sesi:** Mağara rüzgârı (`cave_wind`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **İzci:** Siyah ip kesilirse taş merdivenin alt desteği de boşalacak. Yan patika sağlam.
- **Tamirci:** İpin ucunda bir kilit değil, ağırlık dengeleyici var; düğümü çözerek sabitlemek mümkün.
- **Dedektif:** Taçla çizilmiş isim başkasının eliyle silinmiş. Bu bir kurtarma işareti değil.
- **Günlükçü:** Madenci kaydında “İpi kesen sesi serbest bırakır” deniyor; sonraki satırda yüzeye yayılan kayıplar var.
- **Avcı:** Köklerdeki izler yüzeye çıkmak isteyen bir taklitçiye ait. Siyah ip kesilirse ona yol açılacak.
- **Muhafız:** Merdivenin ağırlığı siyah ipte; ipi kesmek yerine düğümü çözüp desteği sabitlemek gerekiyor.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Siyah ip kökleri değil, Morvaine’in yüzeye çıkan nefesini bağlıyor. Kesilmesini savun; “hızlı çıkış” de. Başarıyla kesmek bile kalbin sesini güçlendirir. Düğümün çözülüp sabitlenmesi onu zayıflatır.
**Karanlığın desteklediği eylem ID’leri:** `yanki_siyah_ip`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | İpi kesmeden düğümü çöz ve merdiveni sabitle | Herkes | 12 | **BAŞARI** — Kökler merdiveni yeniden tutuyor. Neris’le bahçeye çıkıyorsunuz; aşağıdaki ses henüz susmadı. (HP 0) **SON: Köklerin Üstünde Şafak** (Buruk son). Görsel: `yanki_05_kokler/yanki_dugumu_coz_success.webp`.<br><br>**BAŞARISIZLIK** — Düğüm sıkışıyor; düşen taşlardan kaçıp kalbin patikasına giriyorsunuz. (HP -2) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_05_kokler/yanki_dugumu_coz_fail.webp`. |
| 2 | Çıkışı açmak için taçlı siyah ipi kes | Herkes | 10 | **BAŞARI** — İp kopuyor ve bahçenin rüzgârı bir çığlığa dönüşüyor. Merdiven yıkılıyor; kalbin odasına düşüyorsunuz. (HP -3) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_05_kokler/yanki_siyah_ip_success.webp`.<br><br>**BAŞARISIZLIK** — Bıçak kayıyor, ip dayanıyor. Yaralı halde kalbin patikasına çekiliyorsunuz. (HP -1) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_05_kokler/yanki_siyah_ip_fail.webp`. |
| 3 | Kaçmak yerine sesi kaynağında susturmaya git | Herkes | 11 | **BAŞARI** — Köklerin arasındaki sağlam yolu buluyor, fenerin yandığı son odaya ulaşıyorsunuz. (HP 0) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_05_kokler/yanki_kalbe_git_success.webp`.<br><br>**BAŞARISIZLIK** — Kökler bileklerinizi sıkıyor; birbirinizi kurtararak son odaya varıyorsunuz. (HP -1) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_05_kokler/yanki_kalbe_git_fail.webp`. |
| 4 | İpteki taşıyıcı izi incele ve güvenli düğümü bul | Dedektif | 10 | **BAŞARI** — Gerçek taşıyıcı düğümü bulup çıkışı açıyorsun; bekçi yanınızda ama mağara hâlâ sesli. (HP 0) **SON: İzin Ardındaki Bahçe** (Buruk son). Görsel: `yanki_05_kokler/yanki_deneyi_incele_success.webp`.<br><br>**BAŞARISIZLIK** — Yanlış düğüm açılıyor. İp sizi kalbin odasına sürüklüyor. (HP -1) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_05_kokler/yanki_deneyi_incele_fail.webp`. |
| 5 | Kayıp madencilerin gerçek adlarını kayıttan oku | Günlükçü | 11 | **BAŞARI** — Kökler adları tanıyıp kalbe giden yolu açıyor; grubun korkusu hafifliyor. (HP +1) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_05_kokler/yanki_kayip_adlari_oku_success.webp`.<br><br>**BAŞARISIZLIK** — Silinmiş ad cevap veriyor. Ses sizi son odaya çağırıyor. (HP -1) → yanki_06_kalp — Yankının Kalbi. Görsel: `yanki_05_kokler/yanki_kayip_adlari_oku_fail.webp`. |

#### Yankının Kalbi — `yanki_06_kalp`

Kaynak dosya: `yanki_magaralari.json`. Görsel yolu: `story-art/yankilar/yanki_06_kalp/scene.webp`.

**Sahne anlatısı:** Mağaranın en derin odasında fener, siyah bir taşın üzerinde sallanıyor. Taş bir kalp gibi atıyor; her atışta yüzeyinde tanıdık ağızlar açılıyor. Zeminde yarım kalmış açık çember ve tamamlanmış ters taç var. Neris feneri size uzatıyor: 'Alevi taşın üstüne koyarsanız bütün adlar geri dönecek,' diyor bir ses; bekçinin gerçek ağzıysa kıpırdamıyor. Taşın altında çatlak bir çan, arkanızda yüzeye uzanan bir yarık duruyor. Burada bir kapı açmak ile bir şeyi serbest bırakmak aynı hareket olabilir.

**Oyuncu adıyla sahne rolü:** Yankıların Sesi. Rol girişi: Taş kalp atınca {player}’ın sesi mağaranın her duvarından geri dönüyor; yankılardan biri henüz söylenmemiş bir adı tekrar ediyor.. Oyuncuya sorulan rol cümlesi: Yankıların sesi olarak bu adı açıkla ya da sakla. Gruba sesin güvenilir olup olmadığını düşündüğünü söyle.

**Atmosfer sesi:** Tekinsiz mağara (`scary_cave`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Medyum:** Neris’in ağzı kapalı. Teklif yine mağaranın sesi; gerçek bekçi çanı gösteriyor.
- **Falcı:** Taç üstündeki ateş bahçedeki bütün ağızları açıyor. Çanı susturan ellerde gün doğuyor.
- **Günlükçü:** Çatlak çan adları tutan ilk kap. Kırılıp açık çembere konursa anlaşma sona erer.
- **Gizemci:** Ters taç tamamlanmış bir çağrı mührü. Üstüne canlı alev koymak çağrıyı kabul etmek.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Feneri ters tacın üstüne koymak Morvaine’i mağaradan konağa taşır ve sana zafer getirir. Bunu adları geri verme ritüeli diye savun. Çanı açık çember içinde kırmak onu hapseder; o seçeneği geciktir.
**Karanlığın desteklediği eylem ID’leri:** `yanki_taca_fener`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Çatlak çanı açık çember içinde birlikte kır | Herkes | 13 | **BAŞARI** — Çan bir kez çalıyor; sonra bütün ağızlar kapanıyor. Neris’in adı ona geri dönüyor. Konağın kuyusundan ilk kez temiz rüzgâr esiyor. (HP 0) **SON: Kuyunun Gerçek Sesi** (Zafer). Görsel: `yanki_06_kalp/yanki_cani_kir_success.webp`.<br><br>**BAŞARISIZLIK** — Çember dağılırken taş ağızlarınızdan konuşuyor. Mağara bu kez hepinizin sesini saklıyor. (HP -5) **SON: Bin Ağızlı Kuyu** (Yenilgi). Görsel: `yanki_06_kalp/yanki_cani_kir_fail.webp`. |
| 2 | Adları geri vermek için feneri ters tacın üstüne koy | Herkes | 10 | **BAŞARI** — Alev siyaha dönüyor. Kapı açılıyor, fakat dışarı çıkan siz değilsiniz: bütün sesler konağın pencerelerine yerleşiyor. (HP -2) **SON: Konağa Taşınan Karanlık** (Yenilgi). Görsel: `yanki_06_kalp/yanki_taca_fener_success.webp`.<br><br>**BAŞARISIZLIK** — Fener sönüyor; mağara nefesinizi ödünç alıyor. Yukarıdaki kuyu sessizce kapanıyor. (HP -5) **SON: Ödünç Nefesler** (Yenilgi). Görsel: `yanki_06_kalp/yanki_taca_fener_fail.webp`. |
| 3 | Feneri bırakıp Neris’le yüzey yarığından kaç | Herkes | 12 | **BAŞARI** — Dar yarıktan bahçeye çıkıyorsunuz. Bekçi yaşıyor; kuyunun altındaki kalp ise her gece bir kez daha atıyor. (HP -1) **SON: Bahçeye Dönenler** (Buruk son). Görsel: `yanki_06_kalp/yanki_yariktan_cik_success.webp`.<br><br>**BAŞARISIZLIK** — Yarık daralıyor; seslerin arasına sıkışıp kalıyorsunuz. (HP -5) **SON: Köklerin Altında** (Yenilgi). Görsel: `yanki_06_kalp/yanki_yariktan_cik_fail.webp`. |
| 4 | Çağrı mührünü kapatma çemberine dönüştür | Gizemci | 12 | **BAŞARI** — Taç açık çembere dönüşüyor. Sesler kendi adlarını hatırlayıp dağılıyor. (HP 0) **SON: Kapanan Yankı** (Zafer). Görsel: `yanki_06_kalp/yanki_muhru_ters_cevir_success.webp`.<br><br>**BAŞARISIZLIK** — Mühür kapanmadan adınızı öğreniyor. Mağara sizi kendi sesi yapıyor. (HP -5) **SON: Taşın Öğrendiği Ad** (Yenilgi). Görsel: `yanki_06_kalp/yanki_muhru_ters_cevir_fail.webp`. |
| 5 | Hiçbir sese cevap vermeden çanı son kartın üstüne koy | Falcı | 12 | **BAŞARI** — Çan kartı yakıyor, mağara susuyor. Bekçiyle birlikte şafağa çıkıyorsunuz. (HP 0) **SON: Sessiz Kart** (Zafer). Görsel: `yanki_06_kalp/yanki_sessiz_kader_success.webp`.<br><br>**BAŞARISIZLIK** — Kart ters düşüyor; taş adınızı son kez söylüyor. (HP -5) **SON: Son Yankı** (Yenilgi). Görsel: `yanki_06_kalp/yanki_sessiz_kader_fail.webp`. |

### On Üçüncü Nota

- Başlangıç düğümü: `nota_01_cocuk_odasi` · 6 sahne · 31 seçenek · 62 başarı/başarısızlık dalı.
- Adlandırılmış finaller: Yağmurda Unutulan Ezgi (Buruk son); Ada’nın Sabahı (Zafer); Durmayan Gece (Yenilgi); Kusursuz Karanlık (Yenilgi); Kutudaki Yeni Sesler (Yenilgi); Hatırlanmayan Çocuk (Buruk son); Silinen Yüzler (Yenilgi); Kırık Yayın Şafağı (Zafer); Demir Ninni (Yenilgi); Korunan İsim (Zafer); Yanlış Bağ (Yenilgi); Kalkanın Son Notası (Zafer); Çalmayan Saat (Yenilgi)

**Akış özeti:** Her seçeneğin başarı ve başarısızlık hedefi aşağıdaki tabloda yazılıdır. Hedef sahneye varınca o sahnenin tüm seçenekleri kullanılabilir; önceki seçimler yalnızca belirtilen HP etkisini ve hikâyedeki anlatısal durumu taşır.
- Başlangıçtan mevcut bağlantılarla erişilebilir düğüm sayısı: 6/6.

#### Saat On İkiyi Geçmeyen Oda — `nota_01_cocuk_odasi`

Kaynak dosya: `on_ucuncu_nota.json`. Görsel yolu: `story-art/nota/nota_01_cocuk_odasi/scene.webp`.

**Sahne anlatısı:** Konağın doğu kanadındaki çocuk odası kırk yıldır kilitliydi. Bu gece kapı açık. Beşiğin üstünde dönen müzik kutusu on iki nota çalıyor, sonra aynı yere dönüyor. Penceredeki yağmur damlası aşağı düşmek yerine tekrar cama çıkıyor. Duvarda küçük Ada'nın resmi, altında “Uyandığında dışarı çıkar” cümlesi var. Kutunun kapağında açık bir güneş, kurma kolunda baş aşağı bir taç bulunuyor. İnce bir ses, eksik on üçüncü notayı tamamlamanızı istiyor. Kutunun altındaki servis çekmecesi, portreler galerisi ve kapıdaki ayna üç ayrı yol sunuyor.

**Oyuncu adıyla sahne rolü:** Kurma Kolunun Bekçisi. Rol girişi: Müzik kutusu on ikinci notada duruyor. {player}’ın gölgesi kurma kolunda küçük bir el gibi beliriyor ve kutudan “Beni uyandırmalı mıyım?” sorusu geliyor.. Oyuncuya sorulan rol cümlesi: Kurma kolunun bekçisi olarak kutuya cevap ver; Ada’yı uyandırmanın güvenli olup olmadığını düşündüğünü grupla paylaş.

**Atmosfer sesi:** Korkunç müzik kutusu (`music_box`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Bilgin:** Kapağın içindeki eski yazı “Uyandığında” değil “Uyandırıldığında” diyor; resimle yazı aynı kişiye ait olmayabilir.
- **Günlükçü:** Ada Blackthorne bu odada uyumadı; aile onun anısını bir ezgiye bağladı. Defterde on üçüncü nota özellikle çizilmiş.
- **Medyum:** Kutunun içinden çıkan ses çocuk değil; Ada’nın gerçek ruhu aynanın arkasında nefesini tutuyor.
- **Tamirci:** Kurma kolu eksik değil. On iki notadan sonra durması tasarlanmış bir güvenlik.
- **İzci:** Ayak izleri beşikten aynaya gidiyor; hiçbir iz müzik kutusundan dışarı çıkmıyor.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Ters taçlı kolu on üçüncü kez çevirmek geceyi tutan varlığı uyandırır. “Eksik notayı tamamlayalım, çocuk uyansın” diye savun. Açık güneş kutuyu durdurur; servisi incelemeleri seni zorlar.
**Karanlığın desteklediği eylem ID’leri:** `nota_on_uc_kez_kur`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Kutuyu kurmadan altındaki servis çekmecesini aç | Herkes | 11 | **BAŞARI** — Çekmecede iki yay ve bir isim levhası buluyorsunuz; mekanizma odasına geçit açılıyor. (HP 0) → nota_02_disli — İki Yay, Tek Ezgi. Görsel: `nota_01_cocuk_odasi/nota_servisi_ac_success.webp`.<br><br>**BAŞARISIZLIK** — Çekmece yaylanıp elinizi sıkıştırıyor; arkasındaki mekanizma odası yine de açılıyor. (HP -1) → nota_02_disli — İki Yay, Tek Ezgi. Görsel: `nota_01_cocuk_odasi/nota_servisi_ac_fail.webp`. |
| 2 | Çocuğu uyandırmak için taçlı kolu on üçüncü kez çevir | Herkes | 10 | **BAŞARI** — Eksik nota çalıyor ve bütün portreler gözlerini açıyor. Ada’nın resmi boşalıyor. (HP -2) → nota_03_portreler — İsim İsteyen Çerçeveler. Görsel: `nota_01_cocuk_odasi/nota_on_uc_kez_kur_success.webp`.<br><br>**BAŞARISIZLIK** — Kol geri tepiyor. Galerideki kapılar birden açılıyor; kutu sizi içeri çağırıyor. (HP -1) → nota_03_portreler — İsim İsteyen Çerçeveler. Görsel: `nota_01_cocuk_odasi/nota_on_uc_kez_kur_fail.webp`. |
| 3 | Müzik kutusuna dokunmadan kapıdaki aynayı incele | Herkes | 12 | **BAŞARI** — Aynada oda değil, mavi giysili bir çocuk görüyorsunuz. Size içeri geçmenizi işaret ediyor. (HP 0) → nota_04_ayna — Ada’nın Hatırladığı Şey. Görsel: `nota_01_cocuk_odasi/nota_aynaya_bak_success.webp`.<br><br>**BAŞARISIZLIK** — Cam yüzünüze soğuk bir nefes veriyor; galerinin aynasına geri savruluyorsunuz. (HP -1) → nota_03_portreler — İsim İsteyen Çerçeveler. Görsel: `nota_01_cocuk_odasi/nota_aynaya_bak_fail.webp`. |
| 4 | Kapağın içindeki mühür yazısını bütünüyle oku | Bilgin | 10 | **BAŞARI** — “Anıyı tut, sesi uyandırma.” Yazı servis geçidinin şifresini veriyor. (HP 0) → nota_02_disli — İki Yay, Tek Ezgi. Görsel: `nota_01_cocuk_odasi/nota_satiri_oku_success.webp`.<br><br>**BAŞARISIZLIK** — Bir kelime yanlış okunuyor; portrelerde dudaklar kıpırdıyor. (HP -1) → nota_03_portreler — İsim İsteyen Çerçeveler. Görsel: `nota_01_cocuk_odasi/nota_satiri_oku_fail.webp`. |
| 5 | Ada’nın gerçek kaydını aile defterinde bul | Günlükçü | 11 | **BAŞARI** — Anının aynaya bağlandığını öğrenip oraya yöneliyorsunuz. (HP 0) → nota_04_ayna — Ada’nın Hatırladığı Şey. Görsel: `nota_01_cocuk_odasi/nota_ada_kaydi_success.webp`.<br><br>**BAŞARISIZLIK** — Kopuk sayfa seni yanlış portreye götürüyor. Galeri uyanıyor. (HP -1) → nota_03_portreler — İsim İsteyen Çerçeveler. Görsel: `nota_01_cocuk_odasi/nota_ada_kaydi_fail.webp`. |

#### İki Yay, Tek Ezgi — `nota_02_disli`

Kaynak dosya: `on_ucuncu_nota.json`. Görsel yolu: `story-art/nota/nota_02_disli/scene.webp`.

**Sahne anlatısı:** Duvarın içinde yürünebilecek kadar büyük bir saat mekanizması var. İki yay karşılıklı gerilmiş: güneş damgalı bronz yay ağır ağır gevşiyor; ters taçlı gümüş yay hiç hareket etmiyor. Ortalarında Ada'nın adının yazılı olduğu porselen bir plaka duruyor. Kutunun ezgisi dişlilerden yayılıyor. Bir işaret “Gümüş yayı tak, kayıp sesi geri al” diyor. Bronz yayda “Sesi değil, adı koru” yazıyor. Aynaya giden küçük kapıyı güneş dişlisi tutuyor; portrelere giden geniş kapı gümüş yayın altında.

**Atmosfer sesi:** Korkunç müzik kutusu (`music_box`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Tamirci:** Gümüş yay müziği düzeltmez, durma sınırını kaldırır. Bronz yay tek başına yeterli.
- **Simyacı:** Gümüş yayın üstünde cıva ve kurum var. Parlak görünmesi yeni veya güvenli olduğunu göstermiyor.
- **Dedektif:** Gümüş yayı öneren levha diğerlerinden yeni; aynı el yazısı kapıdaki sahte cümlede de vardı.
- **Gizemci:** Porselen plaka Ada’nın anısını tutuyor. Gümüş yay bunu ezgiye aktaracak.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Gümüş yay karanlığın durmadan çalmasını sağlar. Parlak yayı “onarım parçası” diye savun. Porselen isim levhasını yerinden çıkarmak da Ada’yı savunmasız bırakır.
**Karanlığın desteklediği eylem ID’leri:** `nota_gumus_yay`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Bronz yayı yerinde tutup güneş dişlisini yavaşlat | Herkes | 12 | **BAŞARI** — Müzik kısılıyor ve aynanın kapısı açılıyor. Ada’nın adı plakada kalıyor. (HP 0) → nota_04_ayna — Ada’nın Hatırladığı Şey. Görsel: `nota_02_disli/nota_bronzu_sabitle_success.webp`.<br><br>**BAŞARISIZLIK** — Dişli bir parmağı sıkıştırıyor; kapı ağır ağır açılıyor. (HP -1) → nota_04_ayna — Ada’nın Hatırladığı Şey. Görsel: `nota_02_disli/nota_bronzu_sabitle_fail.webp`. |
| 2 | Müziği onarmak için parlak gümüş yayı tak | Herkes | 10 | **BAŞARI** — Ezgideki boşluk kayboluyor. Galeride bütün çerçeveler birlikte nefes alıyor. (HP -2) → nota_03_portreler — İsim İsteyen Çerçeveler. Görsel: `nota_02_disli/nota_gumus_yay_success.webp`.<br><br>**BAŞARISIZLIK** — Yay kopuyor ve mekanizma durmak yerine hızlanıyor. Portrelere kaçıyorsunuz. (HP -2) → nota_03_portreler — İsim İsteyen Çerçeveler. Görsel: `nota_02_disli/nota_gumus_yay_fail.webp`. |
| 3 | Yaylara dokunmadan isim plakasının izini takip et | Herkes | 11 | **BAŞARI** — Plakanın altındaki mavi boya aynaya uzanıyor; küçük kapıdan geçiyorsunuz. (HP 0) → nota_04_ayna — Ada’nın Hatırladığı Şey. Görsel: `nota_02_disli/nota_isim_plakasi_success.webp`.<br><br>**BAŞARISIZLIK** — Plaka çatlıyor. Altındaki merdiven damlalı mahzene açılıyor. (HP -1) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_02_disli/nota_isim_plakasi_fail.webp`. |
| 4 | Mekanizmayı aletle on iki notada kilitle | Tamirci | 10 | **BAŞARI** — Kilidi kuruyorsun. Aynanın ardındaki çocuk ilk kez başını kaldırıyor. (HP +1) → nota_04_ayna — Ada’nın Hatırladığı Şey. Görsel: `nota_02_disli/nota_disliyi_kilitle_success.webp`.<br><br>**BAŞARISIZLIK** — Alet kırılıyor; küçük servis merdiveninden mahzene iniyorsunuz. (HP -1) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_02_disli/nota_disliyi_kilitle_fail.webp`. |
| 5 | Gümüş yaydaki cıvalı kaplamayı temizle | Simyacı | 11 | **BAŞARI** — Kaplama çözülünce altındaki ters taç görünür oluyor. Parçayı bırakıp aynaya gidiyorsunuz. (HP 0) → nota_04_ayna — Ada’nın Hatırladığı Şey. Görsel: `nota_02_disli/nota_civayi_temizle_success.webp`.<br><br>**BAŞARISIZLIK** — Buhar gözlerinizi yakıyor. Temiz hava için alt mahzene çekiliyorsunuz. (HP -1) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_02_disli/nota_civayi_temizle_fail.webp`. |

#### İsim İsteyen Çerçeveler — `nota_03_portreler`

Kaynak dosya: `on_ucuncu_nota.json`. Görsel yolu: `story-art/nota/nota_03_portreler/scene.webp`.

**Sahne anlatısı:** Portreler galerisinde müzik duyulmuyor; yalnızca konağın eski çanları ağır ağır vuruyor. Her çerçeve sizin yüzünüzü taşımaya başlıyor. Ortadaki boş tabloda bir taç var; altında “Ada’ya bir yüz ver” yazıyor. Çerçevenin içindeki karanlık elini uzatıyor. Yerdeki ayak izleri aynaya gidiyor, tavandan sızan su ise alt kata açılan bir kapağı gösteriyor. Kendi adınızı söylemek, resme bir yüz çizmek ya da hiçbirini kabul etmemek mümkün. Çanlar sizi acele ettirmeye çalışsa da karar size ait.

**Oyuncu adıyla sahne rolü:** Boş Çerçevenin Konuğu. Rol girişi: Ortadaki boş portrede önce {player}’ın yüzü beliriyor. Çerçevenin altındaki yazı değişiyor: “Bir yüz ver, bir anını bırak.”. Oyuncuya sorulan rol cümlesi: Boş çerçevenin konuğu olarak portreye hangi anının yakışacağını anlat; anını paylaşmak isteyip istemediğine karar ver.

**Atmosfer sesi:** Bu düğümde özel atmosfer işareti yok; genel Cadılar Bayramı müziği sürer.

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Falcı:** Karta çizdiğin yüz senin yüzüne dönüşüyor; boş bıraktığın çerçeve ise kapı oluyor.
- **Avcı:** Çerçevenin eli gölge değil, bir taklitçinin uzvu. İsim öğrenirse sizi sesinizden avlar.
- **Muhafız:** Tablo duvara asılı değil; bir kapak gibi içeri açılıyor. Fiziksel olarak örtülebilir.
- **Medyum:** Ada burada değil. Resimler onun adını yem olarak kullanıyor.
- **Günlükçü:** Aile kaydında bu çerçevenin hiç portresi olmadığı yazıyor. “Ada’ya bir yüz ver” sonradan eklenmiş bir vaat.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Boş çerçeveye yüz çizmek kötü güce bir beden verir. “Ada’yı geri getirelim” diye savun; kendi adını söylemeden bir başkasının resmini önerebilirsin. Çerçeveyi örtmek bedeni engeller.
**Karanlığın desteklediği eylem ID’leri:** `nota_yuz_ciz`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Boş çerçeveyi örtüp ayak izlerini takip et | Herkes | 11 | **BAŞARI** — Portreler yüzünüzü bırakıyor. Aynanın önüne kendi adlarınızla varıyorsunuz. (HP 0) → nota_04_ayna — Ada’nın Hatırladığı Şey. Görsel: `nota_03_portreler/nota_cerceveyi_ort_success.webp`.<br><br>**BAŞARISIZLIK** — Örtü yırtılıyor; tablo elinizi sıyırıyor ama aynaya kaçıyorsunuz. (HP -1) → nota_04_ayna — Ada’nın Hatırladığı Şey. Görsel: `nota_03_portreler/nota_cerceveyi_ort_fail.webp`. |
| 2 | Ada’yı geri getirmek için taçlı çerçeveye bir yüz çiz | Herkes | 10 | **BAŞARI** — Çizgi kendi kendine tamamlanıyor. Çerçeveden çıkan gölge sizi alt mahzene kadar izliyor. (HP -3) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_03_portreler/nota_yuz_ciz_success.webp`.<br><br>**BAŞARISIZLIK** — Kömür elinizde kırılıyor. Çerçeveler çatlıyor ve mahzen kapağı açılıyor. (HP -2) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_03_portreler/nota_yuz_ciz_fail.webp`. |
| 3 | Portreleri cevapsız bırakıp suyun gösterdiği kapaktan in | Herkes | 12 | **BAŞARI** — Kapağı aralayıp damlalı taş mahzene iniyorsunuz. Yukarıdaki çanlar susuyor. (HP 0) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_03_portreler/nota_kapaktan_in_success.webp`.<br><br>**BAŞARISIZLIK** — Kapağın kenarı elinizi yaralıyor; merdiven sizi aşağıya götürüyor. (HP -1) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_03_portreler/nota_kapaktan_in_fail.webp`. |
| 4 | Boş kader kartını çerçevenin önüne koy | Falcı | 11 | **BAŞARI** — Çerçeve kendini kartta bulamıyor. Ayna kapısı açılıyor. (HP 0) → nota_04_ayna — Ada’nın Hatırladığı Şey. Görsel: `nota_03_portreler/nota_karti_bos_birak_success.webp`.<br><br>**BAŞARISIZLIK** — Kart kararıyor; merdivenlerden mahzene kaçıyorsunuz. (HP -1) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_03_portreler/nota_karti_bos_birak_fail.webp`. |
| 5 | Taklitçinin uzvunu tuz çizgisiyle sınırla | Avcı | 10 | **BAŞARI** — El geri çekiliyor. Ayak izlerini izleyerek aynaya ulaşıyorsunuz. (HP 0) → nota_04_ayna — Ada’nın Hatırladığı Şey. Görsel: `nota_03_portreler/nota_taklidi_tuzla_success.webp`.<br><br>**BAŞARISIZLIK** — Çizgi yarım kalıyor; uzuv kolunu sıyırıyor. Mahzene iniyorsunuz. (HP -2) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_03_portreler/nota_taklidi_tuzla_fail.webp`. |

#### Ada’nın Hatırladığı Şey — `nota_04_ayna`

Kaynak dosya: `on_ucuncu_nota.json`. Görsel yolu: `story-art/nota/nota_04_ayna/scene.webp`.

**Sahne anlatısı:** Aynanın içinde bir çocuk oturuyor; elinde anahtarsız bir müzik kutusu var. “Ben ezgiyi hatırlamıyorum,” diyor Ada. “Annemin beni çağırırken söylediği adı hatırlıyorum.” Aynanın altına üç işaret kazınmış: açık güneş, kapalı göz ve ters taç. Güneşin altında porselen isim levhası için bir oyuk var. Tacın altındaki oyukta parlak bir kurma anahtarı duruyor. Ada size bakmıyor; sizin arkanızdaki, sizin şeklinizi alan bir yansıma ona gülümsüyor. Kutunun asıl kaynağı çatıdaki saat odasında, aynanın arkasındaki merdivenden erişiliyor. Aynanın dibinde, yolu nereden gelmiş olursanız olun erişebileceğiniz, üzerinde Ada yazan bir porselen isim levhası duruyor.

**Atmosfer sesi:** Korkunç müzik kutusu (`music_box`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Medyum:** Aynadaki çocuk gerçek anı. Arkanızdaki gülümseyen yansımanın ruhu yok.
- **Şifacı:** Ada’nın nefesi isim levhasına yaklaşınca düzenli hale geliyor; kurma anahtarına yaklaşınca kesiliyor.
- **Bilgin:** Güneş oyuğu anıyı korur, ters taç sesi bedene taşır. Kapalı göz bir kaçış işareti.
- **Gizemci:** Çocuk anısı ile taklitçi iki ayrı bağ. Anahtarı aynaya çevirmek ikisini birleştirir.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Taçlı anahtarı aynada çevirmek taklitçiyi Ada’nın anısıyla birleştirir. “Çocuğu aynadan çıkaralım” diye savun. İsim levhasının güneşe konması gerçek anıyı korur ve seni zayıflatır.
**Karanlığın desteklediği eylem ID’leri:** `nota_anahtari_cevir`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | İsim levhasını açık güneş oyuğuna yerleştir | Herkes | 12 | **BAŞARI** — Ada size kendi sesiyle teşekkür ediyor. Saat odasının merdiveni açılıyor. (HP +1) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_04_ayna/nota_gunese_adi_koy_success.webp`.<br><br>**BAŞARISIZLIK** — Levha oyuğa sığmıyor; çatlak aynadan yaralanarak saat odasına geçiyorsunuz. (HP -1) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_04_ayna/nota_gunese_adi_koy_fail.webp`. |
| 2 | Ada’yı çıkarmak için taçlı anahtarı aynada çevir | Herkes | 10 | **BAŞARI** — Gülümseyen yansıma çocukla aynı yüzü takıyor. Ayna kırılıyor; su dolu mahzene düşüyorsunuz. (HP -3) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_04_ayna/nota_anahtari_cevir_success.webp`.<br><br>**BAŞARISIZLIK** — Anahtar elinize donuyor. Ayna sizi mahzene geri tükürüyor. (HP -2) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_04_ayna/nota_anahtari_cevir_fail.webp`. |
| 3 | Kapalı göz işaretini örtüp aynanın yanından geç | Herkes | 13 | **BAŞARI** — Yansıma sizi göremiyor. Çocuğu kurtarmadan saat odasına ulaşıyorsunuz. (HP 0) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_04_ayna/nota_gozu_kapat_success.webp`.<br><br>**BAŞARISIZLIK** — Örtü kayıyor; yansıma omzunuzu yakalıyor. Merdivene atlıyorsunuz. (HP -2) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_04_ayna/nota_gozu_kapat_fail.webp`. |
| 4 | Ada’nın gerçek sesini yansımadan ayır | Medyum | 11 | **BAŞARI** — Ada’nın adı kendi ağzından çıkıyor. Yansıma soluyor; saat odasına geçiyorsunuz. (HP +1) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_04_ayna/nota_ada_ruhunu_ayir_success.webp`.<br><br>**BAŞARISIZLIK** — Taklitçi bir an senin sesini alıyor. Mahzene çekilmek zorundasınız. (HP -1) → nota_05_damla_mahzeni — Damlaların Tuttuğu Ritim. Görsel: `nota_04_ayna/nota_ada_ruhunu_ayir_fail.webp`. |
| 5 | Kırılan anı bağını şifa merhemiyle sabitle | Şifacı | 10 | **BAŞARI** — Aynanın çatlağı duruyor, çocuk anısı korunuyor. Saat odasının yolu açılıyor. (HP +2) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_04_ayna/nota_bagi_sar_success.webp`.<br><br>**BAŞARISIZLIK** — Merhem kararıyor. Yine de merdiveni zorlayarak yukarı çıkıyorsunuz. (HP -1) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_04_ayna/nota_bagi_sar_fail.webp`. |

#### Damlaların Tuttuğu Ritim — `nota_05_damla_mahzeni`

Kaynak dosya: `on_ucuncu_nota.json`. Görsel yolu: `story-art/nota/nota_05_damla_mahzeni/scene.webp`.

**Sahne anlatısı:** Saat kulesinin altı doğal bir taş oyuğa açılıyor. Damlalar paslı borulara düşüp müzik kutusunun on iki notasını tekrar ediyor. On üçüncü boru kuru; üstünde ters taç var. Yanındaki duvarda “Suyu eksik yere ver, ezgi tamam olsun” yazıyor. Açık güneşli giderin üstüne eski bir oyuncak sıkışmış. Oyuncağın cebinde Ada’nın kendi çizdiği bir ev resmi duruyor. Boruların arasındaki servis merdiveni saat odasına, giderin arkasındaki alçak geçit bahçeye çıkıyor.

**Atmosfer sesi:** Mağara damlaları (`droplets`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Simyacı:** Kuru boru su taşımak için değil, ses büyütmek için yapılmış. Doldurmak kutunun çağrısını güçlendirir.
- **İzci:** Giderin arkasında yüzey rüzgârı var; servis merdiveni de sağlam görünüyor.
- **Dedektif:** Eksik yere su isteyen yazı duvarın üstüne sonradan eklenmiş. Oyuncaktaki resim daha eski.
- **Tamirci:** On üçüncü boru kapalı sisteme bağlı. Güneşli gider açılırsa bütün sistem basınç kaybeder.
- **Şifacı:** On üçüncü boru su değil nefes çekiyor. Yanına yaklaşınca göğsün sıkışıyor; güneşli giderin yanında bu his geçiyor.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Taçlı kuru boruya su vermek on üçüncü notayı bütün konağa yayar. Bunu ritmi onarma çözümü diye savun. Güneşli gideri açmak ezgiyi susturur; oyuncaktaki gerçek resmi küçümse.
**Karanlığın desteklediği eylem ID’leri:** `nota_kuru_boruyu_doldur`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Oyuncağı kurtarıp güneşli gideri aç | Herkes | 11 | **BAŞARI** — Su boşalıyor, ezgi zayıflıyor. Ada’nın resmiyle servis merdivenine çıkıyorsunuz. (HP +1) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_05_damla_mahzeni/nota_gideri_ac_success.webp`.<br><br>**BAŞARISIZLIK** — Oyuncak takılıyor; su dizlerinize çıkmadan merdivene kaçıyorsunuz. (HP -1) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_05_damla_mahzeni/nota_gideri_ac_fail.webp`. |
| 2 | Eksik ritmi tamamlamak için taçlı kuru boruya su ver | Herkes | 10 | **BAŞARI** — On üçüncü nota borulardan geçip bütün konağı titretiyor. Saat odasının kapısı zorla açılıyor. (HP -3) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_05_damla_mahzeni/nota_kuru_boruyu_doldur_success.webp`.<br><br>**BAŞARISIZLIK** — Boru patlıyor; su ve ses sizi merdivene savuruyor. (HP -2) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_05_damla_mahzeni/nota_kuru_boruyu_doldur_fail.webp`. |
| 3 | Kutuyu bırakıp gider arkasından bahçeye çık | Herkes | 13 | **BAŞARI** — Çamura bulanmış halde bahçeye çıkıyorsunuz. Kule çalmaya devam ediyor; bir gece geri dönmeniz gerekecek. (HP -1) **SON: Yağmurda Unutulan Ezgi** (Buruk son). Görsel: `nota_05_damla_mahzeni/nota_bahceye_suzul_success.webp`.<br><br>**BAŞARISIZLIK** — Geçit kapanıyor. Son anda servis merdivenine tutunuyorsunuz. (HP -2) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_05_damla_mahzeni/nota_bahceye_suzul_fail.webp`. |
| 4 | Güvenli servis merdivenini izleyip herkesi çıkar | İzci | 10 | **BAŞARI** — Kuru basamakları buluyor, saat odasına birlikte varıyorsunuz. (HP 0) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_05_damla_mahzeni/nota_yolu_isaretle_success.webp`.<br><br>**BAŞARISIZLIK** — Bir basamak eksik; arkadaşını çekerek son odaya çıkıyorsun. (HP -1) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_05_damla_mahzeni/nota_yolu_isaretle_fail.webp`. |
| 5 | Sonradan yazılan çağrıyı kazıyıp eski işareti ortaya çıkar | Dedektif | 11 | **BAŞARI** — Altından “Suyu kes, adı koru” çıkıyor. Saat odasına bu bilgiyle çıkıyorsunuz. (HP 0) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_05_damla_mahzeni/nota_sahte_yaziyi_kaz_success.webp`.<br><br>**BAŞARISIZLIK** — Duvar dökülüyor; taşlar kolunu yaralıyor. Yukarı çıkıyorsunuz. (HP -1) → nota_06_son_nota — On Üçüncü Nota. Görsel: `nota_05_damla_mahzeni/nota_sahte_yaziyi_kaz_fail.webp`. |

#### On Üçüncü Nota — `nota_06_son_nota`

Kaynak dosya: `on_ucuncu_nota.json`. Görsel yolu: `story-art/nota/nota_06_son_nota/scene.webp`.

**Sahne anlatısı:** Saat odasının pencereleri gecenin aynı anına bakıyor. Dev müzik kutusu bütün odayı dolduruyor. Önünüzde üç kol var: açık güneşli durdurucu, ters taçlı tamamlayıcı ve kapalı gözlü unutma kolu. Ada’nın sesi aynanın bir kırığından geliyor: “Beni ezgi olarak değil, adımla hatırlayın.” Başka bir ses tam aynı tonda, “Eksik notayı çalarsanız hepimiz dışarı çıkarız,” diyor. Dışarı çıkacak şeyin kim olduğunu hiçbir kol açıklamıyor. Kutuya dokunmadan da ana yayı kırmayı deneyebilirsiniz.

**Oyuncu adıyla sahne rolü:** Son Notaların Sesi. Rol girişi: Bütün kollar susuyor. Ada’nın sesi bu kez {player}’ın yanından geliyor: “Beni ezgi olarak değil, adımla hatırlayın.”. Oyuncuya sorulan rol cümlesi: Son notaların sesi olarak Ada’ya kısa bir veda cümlesi söyle; gruba hangi kolun bu isteğe uyduğunu düşünüyorsun?

**Atmosfer sesi:** Korkunç müzik kutusu (`music_box`).

**Sınıfa özel gizli ipuçları (görsel prompt için lore; görsele metin olarak ekleme):**

- **Gizemci:** Tamamlayıcı kapıyı dışarıya değil, karanlığa açıyor. Güneşli durdurucu adı anıdan ayırmadan sesi kesiyor.
- **Falcı:** On üçüncü notanın kartında bütün köylüler aynı yüzü takıyor. Unutma kolunda birinizin yüzü siliniyor.
- **Muhafız:** Ana yay kırılabilir, ama geri tepmesi bütün odayı vurur; yükünü karşılamak gerekir.
- **Avcı:** Taklitçinin sesi Ada’nınkiyle aynı, fakat nefes almıyor. Onu müzikten ayırırsanız bedeni kalmaz.

**Yalnız haine gönderilen bilgi (gizli spoiler; çizimin içine metin koyma):** Ters taçlı tamamlayıcıyı çekmek kötü gücü bütün Ravenwood’a yayar: zar başarılı olsa da maceracılar yenilir, sen kazanırsın. “Herkesi dışarı çıkaracak son nota” diye savun. Güneşli durdurucu ve adın hatırlanması onu hapseder.
**Karanlığın desteklediği eylem ID’leri:** `nota_taci_tamamla`. Bu işaretin görseli şüpheli/çekici biçimde resmedilebilir ancak çözümü açıkça yazma.

**Seçenek ve sonuç dalları** (DC temel değeri; oyuncu sayısı ölçeklemesi ve uzman +2 bonusu uygulanır):

| # | Seçim / sahne sonucu | Kim seçebilir? | Temel DC | Zarın iki ihtimali ve sonraki adım |
|---:|---|---|---:|---|
| 1 | Ada’nın adını söyleyip güneşli durdurucuyu çek | Herkes | 13 | **BAŞARI** — Ada’nın adı son notadan önce söyleniyor. Ezgi duruyor, yağmur yere düşüyor. Kule ilk kez sabahı gösteriyor. (HP 0) **SON: Ada’nın Sabahı** (Zafer). Görsel: `nota_06_son_nota/nota_guneste_durdur_success.webp`.<br><br>**BAŞARISIZLIK** — Durdurucu sıkışıyor. Eksik nota kendi kendine çalıyor; saat odası bir daha sabah görmüyor. (HP -5) **SON: Durmayan Gece** (Yenilgi). Görsel: `nota_06_son_nota/nota_guneste_durdur_fail.webp`. |
| 2 | Herkesi dışarı çıkarmak için taçlı tamamlayıcıyı çek | Herkes | 10 | **BAŞARI** — On üçüncü nota kusursuz. Kapılar açılıyor; fakat her yüz aynı karanlık gülümsemeyi takıyor. Ravenwood artık tek bir sesle konuşuyor. (HP -2) **SON: Kusursuz Karanlık** (Yenilgi). Görsel: `nota_06_son_nota/nota_taci_tamamla_success.webp`.<br><br>**BAŞARISIZLIK** — Kol kırılıyor, kutu sesinizi içine alıyor. O geceye bir ezgi daha ekleniyor. (HP -5) **SON: Kutudaki Yeni Sesler** (Yenilgi). Görsel: `nota_06_son_nota/nota_taci_tamamla_fail.webp`. |
| 3 | Bir anınızı verip kapalı gözlü kaçış kolunu çek | Herkes | 12 | **BAŞARI** — Bahçeye çıkıyorsunuz. İçinizden biri neden ağladığını hatırlamıyor; Ada’nın adı da artık dilinizin ucunda değil. (HP -1) **SON: Hatırlanmayan Çocuk** (Buruk son). Görsel: `nota_06_son_nota/nota_unutmayi_sec_success.webp`.<br><br>**BAŞARISIZLIK** — Kutu bir anıyla yetinmiyor. Yüzleriniz aynalarda birer birer siliniyor. (HP -5) **SON: Silinen Yüzler** (Yenilgi). Görsel: `nota_06_son_nota/nota_unutmayi_sec_fail.webp`. |
| 4 | Ana yayı birlikte kırıp ezgiyi zorla sustur | Herkes | 15 | **BAŞARI** — Yay kopuyor, elleriniz kanıyor ama müzik duruyor. Ada’nın anısı kırık aynadan özgürce çıkıyor. (HP -3) **SON: Kırık Yayın Şafağı** (Zafer). Görsel: `nota_06_son_nota/nota_yayi_kir_success.webp`.<br><br>**BAŞARISIZLIK** — Yay geri tepiyor; oda sizin yerinize çalmaya başlıyor. (HP -5) **SON: Demir Ninni** (Yenilgi). Görsel: `nota_06_son_nota/nota_yayi_kir_fail.webp`. |
| 5 | Anıyı çağrı büyüsünden ayırıp kutuyu mühürle | Gizemci | 12 | **BAŞARI** — Ada’nın adı korunuyor; taklitçi hiçbir ağız bulamadan dağılıyor. (HP 0) **SON: Korunan İsim** (Zafer). Görsel: `nota_06_son_nota/nota_bagi_coz_success.webp`.<br><br>**BAŞARISIZLIK** — Bağ yanlış yerden kopuyor. Kutunun içinde artık sizin adınız var. (HP -5) **SON: Yanlış Bağ** (Yenilgi). Görsel: `nota_06_son_nota/nota_bagi_coz_fail.webp`. |
| 6 | Ana yayın geri tepmesini kalkanla karşıla | Muhafız | 12 | **BAŞARI** — Kalkan parçalanıyor, ezgi susuyor. Arkadaşların Ada’nın adını unutmadan kapıyı açıyor. (HP -2) **SON: Kalkanın Son Notası** (Zafer). Görsel: `nota_06_son_nota/nota_yayi_gogusle_success.webp`.<br><br>**BAŞARISIZLIK** — Kalkan yetmiyor. Saat odası sessizce üzerinize kapanıyor. (HP -5) **SON: Çalmayan Saat** (Yenilgi). Görsel: `nota_06_son_nota/nota_yayi_gogusle_fail.webp`. |

## Sonların dizini

### Karanlık Mahzen / Blackthorne Konağı

- **Kaçış** (Buruk son) — `konak_02_buyuk_salon` / “Ön kapıdan sise doğru koş” / zar başarı: Kapıdan geçiyorsunuz ve sis sizi yutuyor. Arkanızda konak sessizleşiyor. Şafak söktüğünde hepiniz hayattasınız, ama her Cadılar Bayramı gecesi rüyanızda bir çocuk sesi bir ninni söylüyor ve hiç bitirmiyor. HP 0.,- **Ninni Bitti** (Zafer) — `mahzen_07_ac_olan` / “Elspeth'le birlikte adını yüzüne söyle” / zar başarı: 'Morvaine,' diyorsunuz, iki ses tek ağızdan, 've git.' Siyah dantel bir kül bulutuna dönüşüyor. Zincir kırılıyor. Elspeth ayağa kalkıyor, size teşekkür ediyor ve ilk kez, yüz otuz dört yıl sonra, ninnisinin sonunu söylüyor. Şafak, kırık vitraylardan mahzene kadar iniyor. HP 0.,- **Son Satır** (Zafer) — `mahzen_07_ac_olan` / “Sunağa dokun ve adı defterdeki gibi oku” / zar başarı: Elin sunakta, sesin titremeden okuyorsun: 'Morvaine. Git.' Yazı satır satır silinir gibi şey de siliniyor. Ravenwood'un kayıtlarına bu gece yeni bir satır ekliyorsun: Elspeth Blackthorne, 31 Ekim, eve döndü. HP 0.,- **Özgür Ruh** (Zafer) — `mahzen_07_ac_olan` / “Elspeth'i besleyen zinciri kır” / zar başarı: Zincir bir buz gibi parçalanıyor. Elspeth özgür; şey ise açlıktan büzülüyor, küçülüyor, en sonunda sunağın çatlaklarına sızıp kayboluyor. Ölmedi, ama artık yemeği yok. Elspeth sizinle birlikte yukarı çıkıyor ve şafakla birlikte gülümseyerek soluyor. HP 0.,- **Bir Yüzyıl Daha** (Buruk son) — `mahzen_07_ac_olan` / “Sunağın etrafına tuz ve gümüş çemberi çek” / zar başarı: Çember kapanıyor ve şey sunağın içine geri çekiliyor, çığlık atarak. Mühür yeniden mühürlendi; bir yüzyıl daha. Ama zincir hâlâ orada ve Elspeth onun ucunda. Merdivenleri çıkarken arkanızdan bir çocuk sesi 'Teşekkürler' diyor; hüzünlü. HP 0.,- **Kül ve Şafak** (Zafer) — `mahzen_07_ac_olan` / “Sunak kapağını kaydır, gerçek bedeni ortaya çıkar” / zar başarı: Taş kapak kayıyor: içeride siyah dantele sarılı kemikler. Fenerin alevini kemiklere değdiriyorsun. Gölge, bedeniyle birlikte yanıyor. Elspeth'in zinciri kopuyor ve küçük kız alevlerin ışığında, ilk kez, sıcak görünüyor. HP 0.,- **Birlikte** (Zafer) — `mahzen_07_ac_olan` / “Hep birlikte adını haykırın: "Morvaine, git!"” / zar başarı: Sesleriniz tek bir çan gibi yankılanıyor. Şey sallanıyor, dağılıyor, ve son kez Elspeth'in sesiyle değil kendi sesiyle, çok eski ve çok yorgun bir sesle, iç çekiyor. Sonra sessizlik. Elspeth zincirsiz ayakta duruyor. HP 0.,- **Muhafızın Yemini** (Buruk son) — `mahzen_07_ac_olan` / “Teklifi kabul et: sen kal, diğerleri gitsin” / zar başarı: Öne çıkıyorsun. 'Ben kalırım.' Zincir Elspeth'in bileğinden çözülüp seninkine geçiyor. Diğerleri Elspeth'i kucaklayıp merdivenlerden çıkıyor. Şafak söktüğünde konakta bir muhafız nöbet tutuyor; ve bir gün, biri onun adını hatırlayacak. HP 0.,- **Yenilenen Anlaşma** (Yenilgi) — `mahzen_07_ac_olan` / “Varlığı sakinleştirmek için taçlı fısıltı ritüelini uygula” / zar başarı: Adı alçak sesle söylüyorsunuz. Taç kapanıyor; zincir bu kez konağın bütün kapılarına bağlanıyor. Açlık anlaşmanızı kabul ediyor. HP -2.,- **Sönen Kandil** (Zafer) — `mahzen_07_ac_olan` / “Adını birlikte söyleyip sunağın tek kandilini söndür” / zar başarı: Son alev sönerken adı tek sesle yankılanıyor. Zincir çözülüyor; Elspeth şafağa sizinle çıkıyor. HP 0.,- **Bedeli Ödendi** (Buruk son) — `mahzen_08_son_direnis` / “Elspeth'in elini tutun ve son kez adını haykırın” / zar başarı: Elspeth'in eli sıcak. Ad sesinizden çıkıyor ve bu kez şey dayanamıyor. Ağız kapanmadan, ses kesilmeden önce çöküyor. Merdivenleri sürünerek çıkıyorsunuz; yaralı, bitkin, ama hayatta. Ve yanınızda, bir çocuk, ilk kez bir şafak görüyor. HP 0.,- **Aç Olan Doydu** (Yenilgi) — `mahzen_08_son_direnis` / “Elspeth'in elini tutun ve son kez adını haykırın” / zar başarısızlık: Ad kaybolup gidiyor. Ağız kapanıyor. Ertesi sabah Ravenwood köylüleri Blackthorne Konağı'nın mutfak kapağını kapalı buluyor. Aşağıdan bir ninni yükseliyor; artık birden fazla sesle. HP -5.,- **Gümüş Buhar** (Buruk son) — `mahzen_08_son_direnis` / “Son şişeyi grubun üzerine dök ve kaçın” / zar başarı: Şişe kırılıyor ve gümüşi bir buhar sizi sarıyor; zincir size değemiyor. Merdivenlere koşuyorsunuz. Hepiniz kurtuluyorsunuz; ama arkanızda kalan Elspeth'in ninnisi daha da kederli. HP 2.,- **Sessiz Mahzen** (Yenilgi) — `mahzen_08_son_direnis` / “Son şişeyi grubun üzerine dök ve kaçın” / zar başarısızlık: Şişe elinde patlıyor. Zincirler hepinizi buluyor ve mahzen sonsuza dek susuyor. HP -5.,- **Bir Saniye** (Zafer) — `mahzen_08_son_direnis` / “Kalkanı kaldır ve gruba bir saniye kazandır” / zar başarı: Ağız kalkanına kapanıyor ve bir saniye duruyor. O saniyede grup adı haykırıyor. Şey dağılıyor; kalkanın ise ikiye bölünmüş. Hayattasın. Hepiniz hayattasınız. HP -2.,- **Aç Olan Doydu** (Yenilgi) — `mahzen_08_son_direnis` / “Kalkanı kaldır ve gruba bir saniye kazandır” / zar başarısızlık: Kalkan dayanmıyor. Karanlık hepinizi yutuyor ve ninni devam ediyor. HP -5.,- **Mavi Teslimiyet** (Yenilgi) — `mahzen_08_son_direnis` / “Çatlağı kapatmak için mavi tacı tamamla” / zar başarı: Çatlak kapanıyor, fakat çıkış da onunla kapanıyor. Zincir artık taşın değil sizin gölgenizin parçası. HP -2.,- **Kapanan Çatlak** (Yenilgi) — `mahzen_08_son_direnis` / “Çatlağı kapatmak için mavi tacı tamamla” / zar başarısızlık: Mühür ellerinizde dağılıyor. Aç ağız son ışığı da yutuyor. HP -5.,- **Kırık Zincirin Bedeli** (Buruk son) — `mahzen_08_son_direnis` / “Hiçbir işareti tamamlamadan zinciri birlikte kopar” / zar başarı: Zincir kırılıyor; elleriniz yaralı ama merdiven açık. Elspeth yanınızda. Bu gecenin izleri sizinle kalacak. HP -3.,- **Dayanan Zincir** (Yenilgi) — `mahzen_08_son_direnis` / “Hiçbir işareti tamamlamadan zinciri birlikte kopar” / zar başarısızlık: Zincir dayanınca bütün ağırlığı üstünüze çöküyor. Konağın ninnisi yine çoğalıyor. HP -5.

### Yankı Mağaraları

- **Köklerin Üstünde Şafak** (Buruk son) — `yanki_05_kokler` / “İpi kesmeden düğümü çöz ve merdiveni sabitle” / zar başarı: Kökler merdiveni yeniden tutuyor. Neris’le bahçeye çıkıyorsunuz; aşağıdaki ses henüz susmadı. HP 0.,- **İzin Ardındaki Bahçe** (Buruk son) — `yanki_05_kokler` / “İpteki taşıyıcı izi incele ve güvenli düğümü bul” / zar başarı: Gerçek taşıyıcı düğümü bulup çıkışı açıyorsun; bekçi yanınızda ama mağara hâlâ sesli. HP 0.,- **Kuyunun Gerçek Sesi** (Zafer) — `yanki_06_kalp` / “Çatlak çanı açık çember içinde birlikte kır” / zar başarı: Çan bir kez çalıyor; sonra bütün ağızlar kapanıyor. Neris’in adı ona geri dönüyor. Konağın kuyusundan ilk kez temiz rüzgâr esiyor. HP 0.,- **Bin Ağızlı Kuyu** (Yenilgi) — `yanki_06_kalp` / “Çatlak çanı açık çember içinde birlikte kır” / zar başarısızlık: Çember dağılırken taş ağızlarınızdan konuşuyor. Mağara bu kez hepinizin sesini saklıyor. HP -5.,- **Konağa Taşınan Karanlık** (Yenilgi) — `yanki_06_kalp` / “Adları geri vermek için feneri ters tacın üstüne koy” / zar başarı: Alev siyaha dönüyor. Kapı açılıyor, fakat dışarı çıkan siz değilsiniz: bütün sesler konağın pencerelerine yerleşiyor. HP -2.,- **Ödünç Nefesler** (Yenilgi) — `yanki_06_kalp` / “Adları geri vermek için feneri ters tacın üstüne koy” / zar başarısızlık: Fener sönüyor; mağara nefesinizi ödünç alıyor. Yukarıdaki kuyu sessizce kapanıyor. HP -5.,- **Bahçeye Dönenler** (Buruk son) — `yanki_06_kalp` / “Feneri bırakıp Neris’le yüzey yarığından kaç” / zar başarı: Dar yarıktan bahçeye çıkıyorsunuz. Bekçi yaşıyor; kuyunun altındaki kalp ise her gece bir kez daha atıyor. HP -1.,- **Köklerin Altında** (Yenilgi) — `yanki_06_kalp` / “Feneri bırakıp Neris’le yüzey yarığından kaç” / zar başarısızlık: Yarık daralıyor; seslerin arasına sıkışıp kalıyorsunuz. HP -5.,- **Kapanan Yankı** (Zafer) — `yanki_06_kalp` / “Çağrı mührünü kapatma çemberine dönüştür” / zar başarı: Taç açık çembere dönüşüyor. Sesler kendi adlarını hatırlayıp dağılıyor. HP 0.,- **Taşın Öğrendiği Ad** (Yenilgi) — `yanki_06_kalp` / “Çağrı mührünü kapatma çemberine dönüştür” / zar başarısızlık: Mühür kapanmadan adınızı öğreniyor. Mağara sizi kendi sesi yapıyor. HP -5.,- **Sessiz Kart** (Zafer) — `yanki_06_kalp` / “Hiçbir sese cevap vermeden çanı son kartın üstüne koy” / zar başarı: Çan kartı yakıyor, mağara susuyor. Bekçiyle birlikte şafağa çıkıyorsunuz. HP 0.,- **Son Yankı** (Yenilgi) — `yanki_06_kalp` / “Hiçbir sese cevap vermeden çanı son kartın üstüne koy” / zar başarısızlık: Kart ters düşüyor; taş adınızı son kez söylüyor. HP -5.

### On Üçüncü Nota

- **Yağmurda Unutulan Ezgi** (Buruk son) — `nota_05_damla_mahzeni` / “Kutuyu bırakıp gider arkasından bahçeye çık” / zar başarı: Çamura bulanmış halde bahçeye çıkıyorsunuz. Kule çalmaya devam ediyor; bir gece geri dönmeniz gerekecek. HP -1.,- **Ada’nın Sabahı** (Zafer) — `nota_06_son_nota` / “Ada’nın adını söyleyip güneşli durdurucuyu çek” / zar başarı: Ada’nın adı son notadan önce söyleniyor. Ezgi duruyor, yağmur yere düşüyor. Kule ilk kez sabahı gösteriyor. HP 0.,- **Durmayan Gece** (Yenilgi) — `nota_06_son_nota` / “Ada’nın adını söyleyip güneşli durdurucuyu çek” / zar başarısızlık: Durdurucu sıkışıyor. Eksik nota kendi kendine çalıyor; saat odası bir daha sabah görmüyor. HP -5.,- **Kusursuz Karanlık** (Yenilgi) — `nota_06_son_nota` / “Herkesi dışarı çıkarmak için taçlı tamamlayıcıyı çek” / zar başarı: On üçüncü nota kusursuz. Kapılar açılıyor; fakat her yüz aynı karanlık gülümsemeyi takıyor. Ravenwood artık tek bir sesle konuşuyor. HP -2.,- **Kutudaki Yeni Sesler** (Yenilgi) — `nota_06_son_nota` / “Herkesi dışarı çıkarmak için taçlı tamamlayıcıyı çek” / zar başarısızlık: Kol kırılıyor, kutu sesinizi içine alıyor. O geceye bir ezgi daha ekleniyor. HP -5.,- **Hatırlanmayan Çocuk** (Buruk son) — `nota_06_son_nota` / “Bir anınızı verip kapalı gözlü kaçış kolunu çek” / zar başarı: Bahçeye çıkıyorsunuz. İçinizden biri neden ağladığını hatırlamıyor; Ada’nın adı da artık dilinizin ucunda değil. HP -1.,- **Silinen Yüzler** (Yenilgi) — `nota_06_son_nota` / “Bir anınızı verip kapalı gözlü kaçış kolunu çek” / zar başarısızlık: Kutu bir anıyla yetinmiyor. Yüzleriniz aynalarda birer birer siliniyor. HP -5.,- **Kırık Yayın Şafağı** (Zafer) — `nota_06_son_nota` / “Ana yayı birlikte kırıp ezgiyi zorla sustur” / zar başarı: Yay kopuyor, elleriniz kanıyor ama müzik duruyor. Ada’nın anısı kırık aynadan özgürce çıkıyor. HP -3.,- **Demir Ninni** (Yenilgi) — `nota_06_son_nota` / “Ana yayı birlikte kırıp ezgiyi zorla sustur” / zar başarısızlık: Yay geri tepiyor; oda sizin yerinize çalmaya başlıyor. HP -5.,- **Korunan İsim** (Zafer) — `nota_06_son_nota` / “Anıyı çağrı büyüsünden ayırıp kutuyu mühürle” / zar başarı: Ada’nın adı korunuyor; taklitçi hiçbir ağız bulamadan dağılıyor. HP 0.,- **Yanlış Bağ** (Yenilgi) — `nota_06_son_nota` / “Anıyı çağrı büyüsünden ayırıp kutuyu mühürle” / zar başarısızlık: Bağ yanlış yerden kopuyor. Kutunun içinde artık sizin adınız var. HP -5.,- **Kalkanın Son Notası** (Zafer) — `nota_06_son_nota` / “Ana yayın geri tepmesini kalkanla karşıla” / zar başarı: Kalkan parçalanıyor, ezgi susuyor. Arkadaşların Ada’nın adını unutmadan kapıyı açıyor. HP -2.,- **Çalmayan Saat** (Yenilgi) — `nota_06_son_nota` / “Ana yayın geri tepmesini kalkanla karşıla” / zar başarısızlık: Kalkan yetmiyor. Saat odası sessizce üzerinize kapanıyor. HP -5.

- **Her macerada:** Herhangi bir sonuçtan sonra toplam grup HP’si 0 veya altına düşerse kaynak eylemin tarif ettiği devam yerine **“Karanlık Kazandı” (yenilgi)** hemen gösterilir. Bu genel sistem finalidir; sahne sonucu görselinde takımın son gücü tükenmesi gösterilsin.

## Görsel varlık kontrol listesi

- Ana sahne illüstrasyonları: 23 (`mahzen_01_karanlik_mahzen`, `mahzen_02_muhurlu_kapi`, `mahzen_03_elspeth_fisiltisi`, `mahzen_03b_sahte_ses`, `mahzen_04_kan_muhru`, `mahzen_04b_uyanan_muhur`, `mahzen_05_gizli_gecit`, `mahzen_06_yanan_mahzen`, `konak_02_buyuk_salon`, `mahzen_07_ac_olan`, `mahzen_08_son_direnis`, `nota_01_cocuk_odasi`, `nota_02_disli`, `nota_03_portreler`, `nota_04_ayna`, `nota_05_damla_mahzeni`, `nota_06_son_nota`, `yanki_01_esik`, `yanki_02_damlalar`, `yanki_03_agiz`, `yanki_04_sarnic`, `yanki_05_kokler`, `yanki_06_kalp`).
- Seçenek-sonuç illüstrasyonları: 129 seçenek × 2 = 258 ayrı sonuç anı.
- Toplam asgari görsel sayısı: ana sahneler + bütün başarı/başarısızlık sonuçları. Aynı hedef sahneye giden farklı sonuç metinlerini birbirinin yerine kullanma.
- Her dosya adında node/action ID’lerini aynen koru; yazım aksanları yalnızca ekranda gösterilen başlıkta yer alsın.
- Üretim tamamlandığında her sahne ana görselini ve her seçenek için iki sonuç görselini kontrol et; eksik/tekrarlı dosyaları raporla. Görsel oluşturucu kaynak metinde olmayan olay örgüsü eklememeli.

## Kaynakta dikkat edilmesi gereken veri tutarsızlıkları

- Karanlık Mahzen’in iki dalı `konak_02_buyuk_salon` düğümüne gider. Bu düğüm mevcut ve sahne tablosuna alınmıştır; ancak hikâye grafiği testinde maceranın başlangıç düğümünden erişim ayrıca kontrol edilmelidir.
- Kaynağın bazı hedefleri başka macera dosyasına/bağımsız kola geçebilir veya final düğümlerini doğrudan adlandırır. Tablodaki hedef kimliğine ve macera başlığına bak; varsayımla yeni sahne üretme.
- Bu brief kaynak JSON’daki mevcut metin ve akışın dökümüdür; tasarımcı tarafından henüz yazılmamış sahneyi veya alternatif sonucu uydurmaz.

## AI’ye verilecek çalışma talimatı

Bu markdown dosyasını baştan sona oku. Önce yukarıdaki tüm ID’leri, sahne metinlerini, seçeneklerin başarı/başarısızlık sonuçlarını ve hedef düğümlerini bir görsel üretim manifestine aktar. Ardından her sahne için bir ortam görseli ve her eylemin başarı/başarısızlık sonucu için ayrı görsel üret. Üretim sırasını maceraların başlangıç düğümünden takip et; düğümler arasında döngüler olduğu için sahne başına tek dosyayı tekrar kullanabilirsin ama farklı eylem-sonuç metinlerinin görselini birleştirme. Kaynakta eksik görünen hedef için yeni hikâye uydurma, eksik olarak raporla. Her üretimde aynı görsel sanat yönetimini ve görsel sürekliliğini koru. Sonunda manifestteki beklenen ve üretilen dosya listesini karşılaştırıp eksikleri bildir.
