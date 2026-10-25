# Blackthorne Konağı: Karanlık Mahzen
## Adım adım senaryo ve görsel üretim brief’i

Bu belge, mutfak kapağının kendi kendine açıldığı başlangıçtan maceranın bütün kayıtlı sahne ve karar dallarına kadar gider. Kaynaklar: `story/mahzen_01_karanlik_mahzen.json`, `story/mahzen_02_06_derinlikler.json`, `story/mahzen_07_final.json`.

**Kapsam:** 11 sahne · 68 seçenek · 136 zar sonucu dalı. Her sahne için bir ana görsel ve her seçenek için ayrı başarı ve başarısızlık görseli: toplam en az 147 görsel.
> Tam spoiler içerir; görsel üretecek AI’ye verilebilir.

## Görsel sanat yönetimi

- Gotik orta çağ karanlık-fantezi hikâye kitabı; dokulu el boyaması, sinematik ama okunaklı, eski/nemli taş mimari. Koyu erik, isli siyah, taş grisi ve yosun yeşili; fener ışığı sınırlı kehribar. Büyülü tehditte soğuk mor/kızıl vurgu.
- Yatay 16:9, tek net an ve katmanlı derinlik. Yazı, logo, altyazı, arayüz ve filigran yok. Kaynakta olmayan olay/nesne/karakter ekleme.
- Elspeth ürkütücü ama masum bir çocuk ruhu olarak resmedilsin. Grafik şiddet ve aşırı kan yok. Kaynak görünüşü tanımlamıyorsa karakterleri siluet tut.
- Her kare aynı konağın mimarisini, fener modelini, ters taç işaretini ve karakter tasarımını korusun.

### Ana sahne görseli promptu
```text
Tales of Ravenwood için tek karelik gotik orta çağ karanlık-fantezi hikâye kitabı illüstrasyonu. Dokulu el boyaması, sinematik ışık, net odak, katmanlı derinlik; koyu erik, isli siyah, taş grisi ve yosun yeşili; fenerlerde sınırlı kehribar ışığı. Blackthorne Konağı’nın eski, nemli taş mimarisini ve aynı fener tasarımını tüm sahnelerde koru. Yatay 16:9, tek an, okunaklı siluetler. Yazı, logo, altyazı, arayüz veya filigran kullanma. Kaynakta olmayan olay ekleme. Atmosferik korku; grafik şiddet ve aşırı kan yok. Sahne odağı: [sahne görsel odağı]. Olay: [kaynak sahne metni].
```

### Başarı/başarısızlık sonucu promptu
```text
Bu, aynı mekânın devam karesi: mimari, ışık, karakterler ve eşya yerleşimi tutarlı kalsın. Şu eylemin sadece belirtilen zar sonucunu tek karede göster: [seçenek]. Zar [başarılı/başarısız]. Sonuç olayı: [kaynak outcome.text]. HP etkisi: [hp_change]. Ardından gidilen sahne veya final: [hedef]. Kaynakta yazılandan fazlasını ekleme; görselde metin/kolaj olmasın.
```

## Oyun akışı ve sonuç kuralları

- Oyuncular bir seçeneğe gizli oy verir; en çok oy alan kazanır. Beraberlikte hikâyedeki ilk seçenek kazanır. Sınıfa özel seçenek ancak o sınıftan biri odadaysa görünür; herkes görünür bir eyleme oy verebilir.
- Başarı eşiği temel DC’nin oyuncu sayısına göre ölçeklenmesidir: 2–4 kişi ×0,85; 5–8 ×1; 9–12 ×1,2. Eylemin sınıf sahibi zarı atıyorsa +2 alır. Doğal 1 daima başarısız, doğal 20 daima başarılıdır.
- Her sonucun HP değişimi ve sonraki sahnesi aşağıda gösterilir. Eksi HP hasar, artı HP iyileşmedir. 2–8 oyuncuda hasar zarı atana, 9–12 oyuncuda gruba dağıtılır. Toplam HP sıfıra düşerse oyun doğrudan “Karanlık Kazandı” yenilgisi verir.
- Birlikte Hayatta Kal modunda Zafer/Buruk son grup başarısı, Yenilgi grup kaybıdır. 4–12 kişilik Gizli Hain modunda bir kişi karanlık tarafındadır; yalnız o oyuncu sahne işaretinin hain bilgisini görür ve iki lanetle zar DC’sini artırabilir. Hain yenilgide, maceracılar zafer/buruk sonda kazanır.

## 1. Karanlık Mahzen

**Sahne ID:** `mahzen_01_karanlik_mahzen`
**Ana görsel yolu:** `scene-art/mahzen/mahzen_01_karanlik_mahzen/scene.webp`
**Görsel odağı:** Mutfak kapağından inen on üç basamak, çürük fıçılar ve raflar, ağlı alçak taş kemer, zincirli demir kapı, taze yağlı kilit, küçük çıplak ayak izleri ve eğilen fenerler aynı geniş kadrajda.
**Atmosfer:** Mağara damlaları (`droplets`)

**Oyuncuların gördüğü sahne metni:**

> Blackthorne Konağı'nın mutfağındaki kapak, siz dokunmadan gıcırdayarak açılır. Aşağıdan yükselen hava, mezar toprağı ve ekşimiş şarap kokuyor. On üç taş basamak inersiniz; on üçüncüsünde fenerlerinizin alevi aynı anda eğilir, sanki biri üflemiş gibi. Mahzen beklediğinizden geniştir: tavana kadar yığılmış çürük fıçılar, duvar boyunca uzanan şarap rafları ve en dipte, örümcek ağlarıyla örülmüş, üstüne solmuş harfler kazınmış alçak bir taş kemer. Kemerin altındaki demir kapı paslı bir zincirle bağlı, ama zincirin kilidi taze yağ parlıyor. Yerde, tozun içinde küçük çıplak ayak izleri fıçılara doğru gidip kayboluyor. Uzakta bir yerde damlayan suyun ritmi yavaşça bir ninniye dönüşüyor... ve sonra susuyor. Arkanızda, mutfak kapağı tok bir sesle kapanır. Ravenwood'da Cadılar Bayramı gecesi henüz yarılanmadı.
>
> Demir kapının dibinde baş aşağı bir taç çizilmiş; altındaki oyuk sanki fener koymak için açılmış.

**Sahne rolü:** Elspeth’in İlk Tanığı. Duvarın içinden bir çocuk sesi yalnızca {player} adını fısıldıyor. Kırmızı ipli eski bir düğme taş zeminde dönüp ayağına değiyor. Soru: Elspeth’in ilk tanığı olarak duyduğun ilk hissi grupla paylaş; bu konağın içinde ilk kime güveneceksin?

**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**
- Dedektif: Üçüncü sıradaki döşeme taşının kenarındaki toz diğerlerinden daha ince; yakın zamanda kaldırılmış. Fıçıların arasında, diz hizasında gerili, neredeyse görünmez bir kıl tel var. İkisi de aynı yere, tavandaki sarkık kirişe bağlı. Biri o teli kopartırsa tavan çöker.
- Medyum: Fıçıların arkasında bir çocuk ağlıyor; adı Elspeth, 1892'den beri burada. Onda kötülük hissetmiyorsun, sadece korku. Ama mahzende ikinci bir varlık daha var — Elspeth'in sesini taklit ederek ninni söyleyen, çok daha yaşlı ve aç bir şey. Ninniyi duyarsan cevap verme.
- Bilgin: Kemerdeki yazı Latince değil, Eski Ravenwood mühür dilinde: 'Kan kapıyı açar, ateş onu sonsuza dek kapatır.' Harflerin altındaki oyuklar bir avuç içi büyüklüğünde. Mühür, gönüllü verilen tek damla kanla açılır; zorla açılırsa içindekini uyandırır.
- Simyacı: Fıçılardaki keskin koku şarap değil: adamotu kökü karıştırılmış lamba yağı. Sol duvardaki soluk yeşil mantar tabakası havaya ince spor bırakıyor. Spor ve yağ buharı birleşince tek bir kıvılcım tüm mahzeni ateşe verir. Fenerleri kapalı tutun.
- İzci: Fenerin alevi rüzgârsız bir mahzende sağa eğiliyor: doğu duvarındaki şarap rafının arkasından ince ama sürekli bir hava akımı geliyor. Raftaki üç şişenin dibinde toz yok. Çıplak ayak izleri fıçılara giriyor ama hiçbiri geri çıkmıyor.
- Avcı: Demir kapının alt kısmında, diz hizasında dört paralel tırmık izi var; insan tırnağı değil, bir ghoul'un pençesi. Bu yaratıklar ışıktan değil sesten avlanır ve tuz çizgisini geçemez. Çantandaki tuz kesesi kapı eşiği için yeterli.
- Günlükçü: Ravenwood kayıtlarına göre Blackthorne ailesi bu mahzeni 31 Ekim 1892 gecesi duvarla ördürdü; aynı gece ailenin en küçük kızı Elspeth kayıplara karıştı. Kayıtta bir not düşülmüş: 'Mahzendeki şey ancak adını bilen biri tarafından geri gönderilebilir.' Adın yazıldığı sayfa yırtılmış.

**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** Ters taç seni buraya bağlayan çağrı işareti. Feneri o oyuğa koymak taklitçi sesi uyandırır; “yolu aydınlatalım” diye savun. Yağ buharı da yanıcı: ateşli hamleler grubun işini zorlaştırır.
Desteklenen işaret seçenekleri: `mahzen_taca_fener`.

**Adım adım seçenekler ve iki zar ihtimali:**

1. **Dedektif — Kıl teli ve basınç taşını etkisiz hale getir** (temel DC 13; seçenek ID: `dedektif_tuzagi_etkisizlestir`)
   - **Başarı:** Parmak uçlarınla teli gevşetip basınç taşının altına bir şarap mantarı sıkıştırıyorsun. Tavandaki kiriş hafifçe inler ama yerinde kalır. Grup, ölüm tuzağının üzerinden sessizce geçerek demir kapıya ulaşır. (HP 0) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_01_karanlik_mahzen/dedektif_tuzagi_etkisizlestir_success.webp`
   - **Başarısızlık:** Tel parmağının altında bir yay gibi kopar. Kiriş çatırdayarak çöker; taş ve çürük tahta yağmuru altında kendinizi kemerin altına zor atarsınız. Toz dağıldığında geri dönüş yolu kapanmıştır. (HP -2) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_01_karanlik_mahzen/dedektif_tuzagi_etkisizlestir_fail.webp`
2. **Medyum — Fıçıların ardındaki çocuk ruhuyla konuş** (temel DC 12; seçenek ID: `medyum_elspeth_ile_konus`)
   - **Başarı:** Gözlerini kapatıp adını fısıldıyorsun: 'Elspeth.' Ağlama kesilir. Soluk bir el fıçıların arasından uzanır ve şarap rafını işaret eder. Odaya hafif bir sıcaklık yayılır; yaralarınız biraz olsun hafifler. (HP +1) → **Elspeth'in Fısıltısı** (`mahzen_03_elspeth_fisiltisi`). Görsel: `mahzen_01_karanlik_mahzen/medyum_elspeth_ile_konus_success.webp`
   - **Başarısızlık:** Cevap veren ses Elspeth'in değil. Ninni tekrar başlar, bu kez kulağının hemen dibinde. Burnundan sıcak bir damla kan süzülürken fıçıların arasından uzun, ince bir gölge doğrulur. (HP -1) → **Sahte Ses** (`mahzen_03b_sahte_ses`). Görsel: `mahzen_01_karanlik_mahzen/medyum_elspeth_ile_konus_fail.webp`
3. **Bilgin — Kemerdeki kadim mührü oku ve kan ritüelini uygula** (temel DC 14; seçenek ID: `bilgin_muhru_coz`)
   - **Başarı:** Mühür sözlerini doğru vurguyla okuyup avucundaki tek damla kanı oyuğa bırakıyorsun. Harfler bir an kor gibi parlar, zincir kendiliğinden çözülür ve demir kapı nazikçe aralanır. (HP 0) → **Kan Mührünün Ardında** (`mahzen_04_kan_muhru`). Görsel: `mahzen_01_karanlik_mahzen/bilgin_muhru_coz_success.webp`
   - **Başarısızlık:** Bir hece yanlış çıkar. Harfler kırmızıya döner ve kemerden yükselen soğuk bir dalga hepinizi yere serer. Kapının ardında, çok uzun zamandır uyuyan bir şey derin bir nefes alır. (HP -2) → **Uyanan Mühür** (`mahzen_04b_uyanan_muhur`). Görsel: `mahzen_01_karanlik_mahzen/bilgin_muhru_coz_fail.webp`
4. **İzci — Hava akımını izleyip şarap rafının ardındaki geçidi bul** (temel DC 11; seçenek ID: `izci_gizli_gecidi_bul`)
   - **Başarı:** Tozsuz üç şişeyi sırayla çeviriyorsun. Raf tok bir sesle içe döner ve dar, nemli bir tünel açılır. Taze çıplak ayak izleri karanlığın içine doğru devam ediyor. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_01_karanlik_mahzen/izci_gizli_gecidi_bul_success.webp`
   - **Başarısızlık:** Yanlış şişeyi çekiyorsun; raf devrilir ve cam kırıkları her yana saçılır. Gürültü mahzende yankılanırken demir kapının ardından bir şey cevap verir: tırmalama sesi. (HP -1) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_01_karanlik_mahzen/izci_gizli_gecidi_bul_fail.webp`
5. **Herkes — Fenerleri sonuna kadar aç ve kapıya koş** (temel DC 15; seçenek ID: `fenerleri_yak_ve_ilerle`)
   - **Başarı:** Işığı yükseltip koşuyorsunuz. Mantar duvarının yanından geçerken alev tehlikeli biçimde titrer ama tutuşmaz. Nefes nefese demir kapıya ulaşıyorsunuz. (HP 0) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_01_karanlik_mahzen/fenerleri_yak_ve_ilerle_success.webp`
   - **Başarısızlık:** Havadaki sporlar fenerin alevine değer değmez mavi bir alev dalgası duvar boyunca koşar. Yağ fıçıları birer birer patlar; mahzen bir fırına döner. (HP -3) → **Yanan Mahzen** (`mahzen_06_yanan_mahzen`). Görsel: `mahzen_01_karanlik_mahzen/fenerleri_yak_ve_ilerle_fail.webp`
6. **Herkes — Geri çekil ve mutfak kapağını zorla** (temel DC 10; seçenek ID: `merdivenden_geri_cekil`)
   - **Başarı:** Omuz omuza verip kapağa yükleniyorsunuz; menteşeler pes eder. Mutfağın sıcak, tanıdık karanlığına çıkıyorsunuz — ama aşağıdan gelen ninni sizi takip ediyor. (HP 0) → **Büyük Salon** (`konak_02_buyuk_salon`). Görsel: `mahzen_01_karanlik_mahzen/merdivenden_geri_cekil_success.webp`
   - **Başarısızlık:** Kapak kıpırdamaz bile. Basamaktan kayan ayağınız sizi taş zemine yuvarlar. Ninni yeniden başlar; artık geri dönüş yok. (HP -1) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_01_karanlik_mahzen/merdivenden_geri_cekil_fail.webp`
7. **Herkes — Kapıyı aydınlatmak için feneri taçlı oyuğa koy** (temel DC 10; seçenek ID: `mahzen_taca_fener`)
   - **Başarı:** Işık taçtan duvara yayılıyor. Çocuğun sesi kalınlaşıyor; gölgeler sizi kapının arkasına çağırıyor. (HP -2) → **Sahte Ses** (`mahzen_03b_sahte_ses`). Görsel: `mahzen_01_karanlik_mahzen/mahzen_taca_fener_success.webp`
   - **Başarısızlık:** Fener devriliyor ve yağ buharı tutuşuyor. Ateşten kaçıyorsunuz. (HP -2) → **Yanan Mahzen** (`mahzen_06_yanan_mahzen`). Görsel: `mahzen_01_karanlik_mahzen/mahzen_taca_fener_fail.webp`

## 2. Mühürlü Kapı

**Sahne ID:** `mahzen_02_muhurlu_kapi`
**Ana görsel yolu:** `scene-art/mahzen/mahzen_02_muhurlu_kapi/scene.webp`
**Görsel odağı:** Zincirli demir kapı, taze yağlı kilit ve koruma işareti; kapının gerisinden gelen tırmalama.
**Atmosfer:** Mağara rüzgârı (`cave_wind`)

**Oyuncuların gördüğü sahne metni:**

> Demir kapının önünde duruyorsunuz. Paslı zincir iki kez dolanmış, ama asma kilit yeni yağlanmış gibi parlıyor. Kemerin üstündeki solmuş harfler fener ışığında kıpırdıyor gibi. Kapının ardından ritmik bir ses geliyor: tırmalama, durma, tırmalama. Sanki bir şey sabırla, sırasının gelmesini bekliyor. Tozun içinde, kapının dibinde, küçük bir el izi var; parmakları içeriyi değil, dışarıyı gösteriyor. Fıçıların arasından gelen ninni bir kez daha başlıyor ve tam en güzel yerinde kesiliyor.
>
> Kilidin yanında üç küçük ters taç ve “Üç vuruş korur” yazısı var.

**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**
- Tamirci: Kilit eski bir Blackthorne üç-pimli kilidi. Yağ taze, ama yağın damladığı yön tuhaf: kilidi biri İÇERİDEN açıp kapatıyor. Mandal bu taraftan ince bir telle kaldırılabilir; zinciri kesmeye gerek yok.
- Avcı: Tırmalamanın ritmi bir ghoul'un volta atması. Saldırmıyor, bekliyor; yani içeride onu doyuran ya da bağlayan başka bir şey var. Kapı eşiğine çekilecek bir tuz çizgisi onu durdurur.
- Dedektif: Taze yağ damlaları sağ duvardaki gevşek bir tuğlaya doğru gidiyor. Tuğlanın etrafındaki harç kırık ve temiz: biri onu sık sık yerinden çıkarıyor. Arkasında büyük ihtimalle bir anahtar var.
- Muhafız: Menteşeler solda ve paslı; kapı içeri doğru açılıyor. Zorla açılırsa geri kapanmaz. İçerideki şey dışarı çıkmak isterse kapıyı omzunla tutabilecek tek kişi sensin.
- Medyum: Elspeth kapının hemen yanında, başını iki yana sallıyor. Kapıdan korkmuyor; kapının ardındaki tırmalamadan korkuyor. Dudakları tek bir kelime söylüyor: 'Dinle.'
- Bilgin: Kemerdeki mühür hâlâ uykuda. Kilit açılırsa mühür bozulmaz; ama kapı zorla kırılırsa mühür 'zorla açılmış' sayılır ve uyanır.

**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** Üç vuruş koruma değil, uyanma çağrısı. Tacın altına vurulmasını savun; kilidi zorlamak da mührü uyandırır. Sessiz dinleme ve anahtar arama seni zorlaştırır.
Desteklenen işaret seçenekleri: `mahzen_uc_vurus`.

**Adım adım seçenekler ve iki zar ihtimali:**

1. **Tamirci — İnce bir telle mandalı içeriden kaldır** (temel DC 12; seçenek ID: `tamirci_mandali_kaldir`)
   - **Başarı:** Tel mandalın altına kayar, hafif bir klik. Zincir gevşer, kapı ses çıkarmadan aralanır. Tırmalama aniden durur; içerisi mum kokuyor. (HP 0) → **Kan Mührünün Ardında** (`mahzen_04_kan_muhru`). Görsel: `mahzen_02_muhurlu_kapi/tamirci_mandali_kaldir_success.webp`
   - **Başarısızlık:** Tel kırılır ve kilidin içine düşer. Kapının ardındaki şey sesi duyar; tırmalama bir anda öfkeli bir vuruşa dönüşür ve kemerdeki harfler kızıllaşır. (HP -1) → **Uyanan Mühür** (`mahzen_04b_uyanan_muhur`). Görsel: `mahzen_02_muhurlu_kapi/tamirci_mandali_kaldir_fail.webp`
2. **Dedektif — Gevşek tuğlanın arkasındaki anahtarı bul** (temel DC 13; seçenek ID: `dedektif_anahtari_bul`)
   - **Başarı:** Tuğla elinde kayar; arkasında kemik saplı, minicik bir anahtar. Kilit tek turda açılır. Anahtarın sapında kazınmış bir harf var: 'M'. (HP 0) → **Kan Mührünün Ardında** (`mahzen_04_kan_muhru`). Görsel: `mahzen_02_muhurlu_kapi/dedektif_anahtari_bul_success.webp`
   - **Başarısızlık:** Yanlış tuğla. Duvardan kopan taşın ardındaki boşluktan soğuk bir el uzanıp bileğini kavrar. Kurtulduğunda bileğinde morarmış parmak izleri kalır. (HP -1) → **Sahte Ses** (`mahzen_03b_sahte_ses`). Görsel: `mahzen_02_muhurlu_kapi/dedektif_anahtari_bul_fail.webp`
3. **Avcı — Eşiğe tuz çek, sonra kapıyı aç** (temel DC 11; seçenek ID: `avci_tuz_cizgisi`)
   - **Başarı:** Tuz çizgisi tamamlanır tamamlanmaz kapının ardındaki şey uzaklaşır. Zinciri sökerken ellerin titremiyor: hazırsınız. Kapı, mahzenin en derin noktasına açılıyor. (HP 0) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_02_muhurlu_kapi/avci_tuz_cizgisi_success.webp`
   - **Başarısızlık:** Kese yırtılır, tuz yere dağılır. Çizgi kapanmadan kapı içeriden itilir ve bir pençe kolunu sıyırır. (HP -2) → **Sahte Ses** (`mahzen_03b_sahte_ses`). Görsel: `mahzen_02_muhurlu_kapi/avci_tuz_cizgisi_fail.webp`
4. **Herkes — Kulağını kapıya daya ve dinle** (temel DC 10; seçenek ID: `kapiyi_dinle`)
   - **Başarı:** Tırmalamanın altından ince bir ses duyuyorsun, bir çocuk sesi: 'Rafın arkası... büyükannem oradan girerdi.' Ses kesilir; soğuk bir nefes enseni okşar. (HP 0) → **Elspeth'in Fısıltısı** (`mahzen_03_elspeth_fisiltisi`). Görsel: `mahzen_02_muhurlu_kapi/kapiyi_dinle_success.webp`
   - **Başarısızlık:** Ninniyi duyuyorsun, çok yakından. Ona cevap vermemek için dudağını ısırıyorsun ama geç kaldın: gölgeler fıçıların arasından kopup geliyor. (HP -1) → **Sahte Ses** (`mahzen_03b_sahte_ses`). Görsel: `mahzen_02_muhurlu_kapi/kapiyi_dinle_fail.webp`
5. **Herkes — Zinciri kır, kapıyı omuzla** (temel DC 14; seçenek ID: `kapiyi_zorla`)
   - **Başarı:** Paslı halka ikinci darbede kopar ve kapı içeri savrulur. Mühür bir an kızarır ama sönüp gider; şanslısınız. (HP 0) → **Kan Mührünün Ardında** (`mahzen_04_kan_muhru`). Görsel: `mahzen_02_muhurlu_kapi/kapiyi_zorla_success.webp`
   - **Başarısızlık:** Zincir dayanır, omzunuz dayanmaz. Üçüncü darbede kapı açılır ama kemerdeki mühür bir çığlık gibi parlar. (HP -2) → **Uyanan Mühür** (`mahzen_04b_uyanan_muhur`). Görsel: `mahzen_02_muhurlu_kapi/kapiyi_zorla_fail.webp`
6. **Herkes — Koruma işaretinin altına üç kez vur** (temel DC 10; seçenek ID: `mahzen_uc_vurus`)
   - **Başarı:** Üçüncü vuruş içeriden tamamlanıyor. Zincir açılıyor ama mühür kıpkırmızı uyanıyor. (HP -2) → **Uyanan Mühür** (`mahzen_04b_uyanan_muhur`). Görsel: `mahzen_02_muhurlu_kapi/mahzen_uc_vurus_success.webp`
   - **Başarısızlık:** Kapı geri çarpıyor; yanlış çocuk sesi kulağınızın dibinde beliriyor. (HP -1) → **Sahte Ses** (`mahzen_03b_sahte_ses`). Görsel: `mahzen_02_muhurlu_kapi/mahzen_uc_vurus_fail.webp`

## 3. Elspeth'in Fısıltısı

**Sahne ID:** `mahzen_03_elspeth_fisiltisi`
**Ana görsel yolu:** `scene-art/mahzen/mahzen_03_elspeth_fisiltisi/scene.webp`
**Görsel odağı:** Fıçıların yanında soluk ve ürkek çocuk ruhu Elspeth; bileğinde ince bağlama ipi, rafın arkasına yönelen eli.
**Atmosfer:** Mağara rüzgârı (`cave_wind`)

**Oyuncuların gördüğü sahne metni:**

> Fıçıların arasında hava ısınıyor, garip biçimde. Solgun bir ışık yoğunlaşıyor ve küçük bir kız beliriyor: gece elbisesi içinde, yalınayak, saçları ıslak. Elspeth Blackthorne. Size bakıyor ama gözleri sizin arkanızdaki bir şeye kayıp duruyor. Bileğinde, neredeyse görünmez, gümüşi bir iplik var; iplik şarap rafının ardına doğru uzanıyor ve gergin. 'Büyükannem onunla bir anlaşma yaptı,' diyor. 'Beni verdi. Karşılığında konak hiç yanmadı, hiç yıkılmadı.' Sonra fısıldıyor: 'O sadece adını bilen birinden korkar.'
>
> Elspeth’in bileğindeki ipliğin dibinde ters taç biçimli bir düğüm, yerdeyse kesik bir açık çember var.

**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**
- Medyum: Elspeth adı biliyor ama söylemekten korkuyor; söylerse ip onu geri çekecek. Ona yalnızca ilk heceyi sorarsan söyleyebilir: 'Mor...' Tam adı bir yerlerde yazılı olmalı.
- Günlükçü: Kayıtlarda Agatha Blackthorne'un 1892 tarihli bir mektubu geçiyor: 'M. ile anlaşma imzalandı; bedel en küçük olanın sesi.' Elspeth'in ninnisi... onun sesi. Ninniyi söyleyen şey sesini çalmış.
- Falcı: Kartlar Kule'yi ters gösteriyor: adı yanlış yerde söylemek boşunadır. Ad, yalnızca onun sunağının önünde, onun yüzüne söylendiğinde işe yarar. Tek bir şansınız olacak.
- Şifacı: Elspeth'e yaklaştıkça parmak uçların uyuşuyor; o, varlığını sürdürmek için çevresindeki sıcaklığı çekiyor. Ona biraz sıcaklık verebilirsin, ama bedeli kendi canından olur.
- Gizemci: Bileğindeki gümüş iplik bir bağlama büyüsü. Kesilirse Elspeth serbest kalır ve rafın ardındaki şey en önemli yiyeceğini kaybeder; ama ipin kesildiğini anında hisseder.
- İzci: Elspeth'in ayak izleri yok; ama ipliğin gerildiği yönden hava akıyor. Rafın arkasındaki geçit tam orada.

**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** Taçlı düğümü koparmak Elspeth’i değil, sesini taklit eden şeyi serbest bırakır. “Çocuğun zincirini kıralım” diye savun. Yerdeki açık çember gerçek geçidi gösterir.
Desteklenen işaret seçenekleri: `mahzen_ipligi_kopar`.

**Adım adım seçenekler ve iki zar ihtimali:**

1. **Medyum — Elspeth'e adın ilk hecesini sor** (temel DC 13; seçenek ID: `medyum_adin_ilk_hecesi`)
   - **Başarı:** Elspeth gözlerini yumup fısıldar: 'Mor...' İp gerilir, kız titrer ama kaybolmaz. Teşekkür eder gibi elinizi sıkar; avucunuza bir sıcaklık yayılır. Sonra rafı gösterir. (HP +1) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_03_elspeth_fisiltisi/medyum_adin_ilk_hecesi_success.webp`
   - **Başarısızlık:** Soruyu sorduğun anda ip bir kırbaç gibi gerilir ve Elspeth karanlığa çekilir. Onun yerinde, başka bir şey gülümsüyor. (HP -1) → **Sahte Ses** (`mahzen_03b_sahte_ses`). Görsel: `mahzen_03_elspeth_fisiltisi/medyum_adin_ilk_hecesi_fail.webp`
2. **Gizemci — Elspeth'in bileğindeki bağlama ipini kes** (temel DC 12; seçenek ID: `gizemci_ipi_kes`)
   - **Başarı:** Doğru kelimeyle ip bir çiy damlası gibi çözülür. Elspeth ilk kez derin bir nefes alır. Mahzenin dibinden aç bir uluma yükseliyor; artık sizi bekliyor, ama zayıf. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_03_elspeth_fisiltisi/gizemci_ipi_kes_success.webp`
   - **Başarısızlık:** İp kesilmez, size bağlanır. Bir an boyunca o şeyin açlığını kendi midende hissedersin. Kemerdeki mühür sarsılır. (HP -2) → **Uyanan Mühür** (`mahzen_04b_uyanan_muhur`). Görsel: `mahzen_03_elspeth_fisiltisi/gizemci_ipi_kes_fail.webp`
3. **Şifacı — Elspeth'i ısıtmak için ona kendi sıcaklığından ver** (temel DC 11; seçenek ID: `sifaci_elspethi_isit`)
   - **Başarı:** Ellerini onun küçük ellerinin üstüne koyuyorsun. Kızın yüzüne renk gelir; karşılığında sana ve gruba bir huzur yayılır. 'Arkada,' diyor, 'rafın arkasında.' (HP +2) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_03_elspeth_fisiltisi/sifaci_elspethi_isit_success.webp`
   - **Başarısızlık:** Sıcaklığın akmıyor, emiliyor. Dizlerin bükülüyor. Elspeth özür diler gibi geri çekilir ve rafı işaret eder. (HP -1) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_03_elspeth_fisiltisi/sifaci_elspethi_isit_fail.webp`
4. **Herkes — Elspeth'in işaret ettiği yere git** (temel DC 10; seçenek ID: `elspethi_takip_et`)
   - **Başarı:** Elspeth'in ışığını izliyorsunuz. Raf bir kapı gibi dönüyor ve önünüzde dar, nemli bir tünel açılıyor. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_03_elspeth_fisiltisi/elspethi_takip_et_success.webp`
   - **Başarısızlık:** Işığı kaybediyorsunuz. Karanlıkta yanınızda yürüyen küçük figürün Elspeth olmadığını fark ettiğinizde, o çoktan dişlerini göstermiştir. (HP -1) → **Sahte Ses** (`mahzen_03b_sahte_ses`). Görsel: `mahzen_03_elspeth_fisiltisi/elspethi_takip_et_fail.webp`
5. **Herkes — Elspeth’i kurtarmak için taçlı düğümü kopar** (temel DC 10; seçenek ID: `mahzen_ipligi_kopar`)
   - **Başarı:** İplik kopuyor. Çocuk geri çekilirken onun sesi arkanızdan gülüyor; sahte ses sizi çağırıyor. (HP -2) → **Sahte Ses** (`mahzen_03b_sahte_ses`). Görsel: `mahzen_03_elspeth_fisiltisi/mahzen_ipligi_kopar_success.webp`
   - **Başarısızlık:** İplik elinizi kesiyor; çemberin yanındaki geçide kaçıyorsunuz. (HP -1) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_03_elspeth_fisiltisi/mahzen_ipligi_kopar_fail.webp`
6. **Herkes — İpliğe dokunmadan açık çemberin izini araştır** (temel DC 12; seçenek ID: `mahzen_cemberi_izle`)
   - **Başarı:** Çember rafın arkasında tamamlanıyor. Elspeth başıyla onaylıyor; gizli geçide giriyorsunuz. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_03_elspeth_fisiltisi/mahzen_cemberi_izle_success.webp`
   - **Başarısızlık:** Raf kayıyor ve kolunuzu sıyırıyor. Arkasındaki geçit açılıyor. (HP -1) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_03_elspeth_fisiltisi/mahzen_cemberi_izle_fail.webp`

## 4. Sahte Ses

**Sahne ID:** `mahzen_03b_sahte_ses`
**Ana görsel yolu:** `scene-art/mahzen/mahzen_03b_sahte_ses/scene.webp`
**Görsel odağı:** Ninniyi taklit eden ince uzun gölge/ghoul, dar mahzen koridorunda ve devrilmeye hazır fener yanında.
**Atmosfer:** Tekinsiz mağara (`scary_cave`)

**Oyuncuların gördüğü sahne metni:**

> Ninni artık arkanızda değil, önünüzde. Fıçıların arasındaki dar koridordan uzun, eğik bir gövde çıkıyor: deri kemiklerine yapışmış, kolları dizlerine kadar inen bir ghoul. Ağzından çıkan ses bir çocuğun sesi; Elspeth'in sesi. 'Benimle oynayın,' diyor ve başını imkânsız bir açıyla yana yatırıyor. Fenerinizin ışığında gözleri parlamıyor; görmüyor. Burnunu havaya kaldırıp sizi dinliyor. Bir adım atıyor. Bir adım daha.
>
> Sesin geldiği rafta ters taç oyulmuş; altında bir ninninin son dizesi yarım bırakılmış.

**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**
- Avcı: Ghoul'lar sesle avlanır; görmezler. Kımıldamazsanız sizi bulamaz. Gümüş ya da tuz onu yakar. Boğazındaki yumuşak nokta tek darbede düşürmek için tek şansın.
- Muhafız: Fıçıların arasındaki koridor tek kişilik. Orayı tutarsan ghoul grubun yanına geçemez; ama tüm darbeleri sen alırsın.
- Şifacı: Pençelerinde kara bir çürüklük var. Sıyrılan kişiyi hemen temizlemezsen yara kararır. Çantandaki sirke ve tuz yeterli.
- Medyum: Gerçek Elspeth solda, fıçıların tepesinde, ağlayarak sizi uyarıyor: 'Konuşmayın! Sesinizi duyarsa sesinizi de alır!'
- Dedektif: Ghoul'un durduğu yerin tam üstünde, ilk girişte gördüğün sarkık kiriş var. Tel hâlâ gergin. Biri teli koparırsa kiriş tam üstüne düşer.
- Simyacı: Yer, ghoul'un ayaklarının altında yağla ıslak. Bir kıvılcım onu tutuşturur; ama alev fıçılara da sıçrar.

**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** Ninninin son dizesine eşlik etmek sesi besler. “Çocuk bizi tanısın” diye savun. Ghoul da sesi izler; susmak onu zayıflatır.
Desteklenen işaret seçenekleri: `mahzen_ninniyi_tamamla`.

**Adım adım seçenekler ve iki zar ihtimali:**

1. **Muhafız — Dar koridoru tek başına tut** (temel DC 12; seçenek ID: `muhafiz_koridoru_tut`)
   - **Başarı:** Kalkanını iki fıçının arasına sıkıştırıp bekliyorsun. Ghoul üç kez çarpar, üçünde de geri savrulur ve sonunda karanlığa çekilir. Grup demir kapıya ulaşır. (HP 0) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_03b_sahte_ses/muhafiz_koridoru_tut_success.webp`
   - **Başarısızlık:** Koridoru tutuyorsun ama pençeler kalkanın kenarından geçiyor. Ghoul çekildiğinde kolun kan içinde; grup yine de kapıya ulaşır. (HP -2) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_03b_sahte_ses/muhafiz_koridoru_tut_fail.webp`
2. **Avcı — Sessizce yaklaş ve boğazına gümüşle vur** (temel DC 13; seçenek ID: `avci_bogazina_vur`)
   - **Başarı:** Nefesini tutup üç adım atıyorsun; dördüncüde gümüş bıçak boğazına gömülür. Ghoul Elspeth'in sesiyle değil, kendi gerçek sesiyle, korkunç bir hırıltıyla yığılır. Arkasında, rafın ardında bir geçit görünüyor. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_03b_sahte_ses/avci_bogazina_vur_success.webp`
   - **Başarısızlık:** Bir kemik ayağının altında çatırdar. Ghoul sana döner; pençesi yanından geçerken fenerini devirir. Yağ alev alır. (HP -2) → **Yanan Mahzen** (`mahzen_06_yanan_mahzen`). Görsel: `mahzen_03b_sahte_ses/avci_bogazina_vur_fail.webp`
3. **Dedektif — Teli kopar, kirişi ghoul'un üstüne düşür** (temel DC 12; seçenek ID: `dedektif_kirisi_dusur`)
   - **Başarı:** Tel bir tını gibi kopar. Kiriş tam hesapladığın yere iner ve ghoul taşların altında kalır. Toz dağıldığında ninni de susmuştur. (HP 0) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_03b_sahte_ses/dedektif_kirisi_dusur_success.webp`
   - **Başarısızlık:** Kiriş düşer ama ghoul son anda kenara sıçrar. Taş parçaları hepinize yağar. (HP -2) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_03b_sahte_ses/dedektif_kirisi_dusur_fail.webp`
4. **Herkes — Herkes donsun, nefesini tutsun** (temel DC 12; seçenek ID: `kimildamadan_bekle`)
   - **Başarı:** Kimse kıpırdamıyor. Ghoul burnunu yüzlerinize bir karış yaklaştırıyor... ve geçip gidiyor. Gittiği yönde, rafın ardında bir geçit açık kalmış. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_03b_sahte_ses/kimildamadan_bekle_success.webp`
   - **Başarısızlık:** Birinizin dişleri takırdıyor. Ghoul sesin geldiği yöne atılır; kaçışma, çığlıklar ve sonunda demir kapının önünde soluk soluğa duruyorsunuz. (HP -2) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_03b_sahte_ses/kimildamadan_bekle_fail.webp`
5. **Herkes — Dağılın ve demir kapıya koşun** (temel DC 11; seçenek ID: `kapiya_kos`)
   - **Başarı:** Herkes farklı yöne koşuyor; ghoul hangisinin peşine düşeceğini bilemiyor. Demir kapıda buluşuyorsunuz. (HP 0) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_03b_sahte_ses/kapiya_kos_success.webp`
   - **Başarısızlık:** Koşarken biriniz tökezler ve pençe sırtını bulur. Kapıya ulaşırsınız ama ağır bedelle. (HP -2) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_03b_sahte_ses/kapiya_kos_fail.webp`
6. **Herkes — Çocuğa güven vermek için ninninin sonunu söyle** (temel DC 10; seçenek ID: `mahzen_ninniyi_tamamla`)
   - **Başarı:** Sesin ağzı birden çoğalıyor. Ghoul sizi duyar; fener devrilir ve mahzen alev alır. (HP -3) → **Yanan Mahzen** (`mahzen_06_yanan_mahzen`). Görsel: `mahzen_03b_sahte_ses/mahzen_ninniyi_tamamla_success.webp`
   - **Başarısızlık:** Dize boğazınızda düğümleniyor. Gölgeler sizi mühürlü kapıya sürüklüyor. (HP -2) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_03b_sahte_ses/mahzen_ninniyi_tamamla_fail.webp`

## 5. Kan Mührünün Ardında

**Sahne ID:** `mahzen_04_kan_muhru`
**Ana görsel yolu:** `scene-art/mahzen/mahzen_04_kan_muhru/scene.webp`
**Görsel odağı:** Açılan kemerin ardında Agatha’nın eski eşyaları, defter, sunak ve tabut; kâğıtta tehditkâr kadın silueti ve isim ipucu.
**Atmosfer:** Mağara rüzgârı (`cave_wind`)

**Oyuncuların gördüğü sahne metni:**

> Kapının ardında küçük bir şapel var. Yüzlerce eriyip donmuş mum, ortada siyah taştan bir sunak ve sunağın önünde, bir çocuk boyunda, kapağı aralık bir tabut. Duvarlarda Blackthorne ailesinin portreleri; hepsinin gözleri kazınmış. Sunağın üzerinde deri ciltli kalın bir defter duruyor, yanında kurumuş kan lekeli bir bıçak. Mumların bazıları kendiliğinden yanıyor. Burada hava ağır ve tatlı; çürümüş bal gibi. Şapelin karşı duvarında bir başka geçit karanlığa açılıyor ve oradan derin, yavaş bir nefes sesi geliyor.
>
> Tabutun çevresinde ters taçlı derin bir kan oluğu ile kuru, açık bir çember birbirini kesiyor.

**Sahne rolü:** Mührün Okuyucusu. Mum alevleri {player}’a doğru eğiliyor. Kan oluğundaki yazı değişip tek bir cümle oluyor: “Bu gece kapıyı açacak el, adını bilen eldir.” Soru: Mührün okuyucusu olarak yazının ne istediğine dair yorumunu söyle; hangi izi önce incelemeyi öneriyorsun?

**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**
- Günlükçü: Bu defter Agatha Blackthorne'un. Son sayfaya kadar gidersen, titrek bir el yazısıyla tam adı bulacaksın. Ama bazı sayfalar yırtılmış; dikkatli oku, yanlış adı söylemek onu güçlendirir.
- Bilgin: Sunağın kenarına kazınmış ad bir harfi kazınarak bozulmuş: M O R _ A I N E. Eksik harf, çağırma dilinde 'açlık' anlamına gelen işaretin ilk sesi: V. Ad: Morvaine.
- Dedektif: Tabut boş. Kapağın iç yüzünde küçük tırnak izleri var, eski ve derin. Elspeth buraya canlı konmuş. Tabutun dibinde bir oyuncak bebek; bebeğin elinde katlanmış bir kâğıt.
- Gizemci: Sunak, şeyi bu dünyaya bağlayan çapa. Sunağı kırarsan onu zayıflatırsın; ama kırılan çapa onu öfkelendirir ve anında uyandırır.
- Şifacı: Raflarda Agatha'nın şişeleri var: tentürdiyot, laudanum, tuzlu merhem. Çoğu bozulmuş ama işe yarayanları seçebilirsin.
- Falcı: Mum alevleri hep aynı yöne eğiliyor: karşı duvardaki geçide. Kartların söylediği tek şey: 'Son sahne orada.'

**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** Taçlı oluğu doldurmak isteyerek verilmiş bir damla değil, varlığı besleyen bir sunaktır. “Mührü tamamlayalım” diye savun. Kuru açık çember sığınağı korur.
Desteklenen işaret seçenekleri: `mahzen_kan_olugu`.

**Adım adım seçenekler ve iki zar ihtimali:**

1. **Günlükçü — Agatha'nın defterinin son sayfalarını oku** (temel DC 11; seçenek ID: `gunlukcu_defteri_oku`)
   - **Başarı:** Son sayfada, mürekkebi gözyaşıyla dağılmış bir satır: 'Morvaine, aç olan, beni affet.' Adı yüksek sesle söylemiyorsun; sadece hafızana kazıyorsun. Karşı geçitteki nefes bir anlığına duruyor. (HP 0) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_04_kan_muhru/gunlukcu_defteri_oku_success.webp`
   - **Başarısızlık:** Sayfalar elinde ufalanıyor. Yarım bir isim okuyorsun ve istemsizce mırıldanıyorsun. Mumlar söner, karşı geçitten bir şey cevap verir. (HP -1) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_04_kan_muhru/gunlukcu_defteri_oku_fail.webp`
2. **Bilgin — Sunaktaki kazınmış adın eksik harfini çöz** (temel DC 13; seçenek ID: `bilgin_eksik_harfi_coz`)
   - **Başarı:** Harfin şeklini parmaklarınla takip ediyorsun ve ad zihninde tamamlanıyor. Söylemiyorsun. Ama biliyorsun. (HP 0) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_04_kan_muhru/bilgin_eksik_harfi_coz_success.webp`
   - **Başarısızlık:** Yanlış harfi hayal ettiğin anda sunak sıcaklaşıyor. Kemerdeki mühür, kapının ardında yeniden çığlık atıyor. (HP -2) → **Uyanan Mühür** (`mahzen_04b_uyanan_muhur`). Görsel: `mahzen_04_kan_muhru/bilgin_eksik_harfi_coz_fail.webp`
3. **Şifacı — Agatha'nın raflarından işe yarar ilaçları topla** (temel DC 10; seçenek ID: `sifaci_ilaclari_topla`)
   - **Başarı:** Bozulmamış üç şişe ve bir kavanoz merhem buluyorsun. Yaraları sararken grubun nefesi düzeliyor. Hazırsınız. (HP +2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_04_kan_muhru/sifaci_ilaclari_topla_success.webp`
   - **Başarısızlık:** Açtığın ilk şişeden yeşil bir duman yükseliyor. Öksürerek karşı geçide yöneliyorsunuz. (HP -1) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_04_kan_muhru/sifaci_ilaclari_topla_fail.webp`
4. **Herkes — Tabuttaki bebeğin elindeki kâğıdı al** (temel DC 12; seçenek ID: `tabutu_incele`)
   - **Başarı:** Kâğıt bir çocuk çizimi: siyah bir kadın, kocaman bir ağız ve altında yamuk harflerle bir isim, 'MORVAİNE'. Elspeth onu yıllar önce tanımış. (HP 0) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_04_kan_muhru/tabutu_incele_success.webp`
   - **Başarısızlık:** Bebeğin başı döner ve porselen gözleri sana dikilir. Elini çektiğinde parmaklarında küçük ısırık izleri var. (HP -2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_04_kan_muhru/tabutu_incele_fail.webp`
5. **Herkes — Mührü tamamlamak için taçlı kan oluğunu doldur** (temel DC 10; seçenek ID: `mahzen_kan_olugu`)
   - **Başarı:** Kan oluğu ışıldıyor; tabutun altındaki başka mühür uyanıyor. Bir ağız adınızı soruyor. (HP -2) → **Uyanan Mühür** (`mahzen_04b_uyanan_muhur`). Görsel: `mahzen_04_kan_muhru/mahzen_kan_olugu_success.webp`
   - **Başarısızlık:** Kesik derinleşiyor. Tabut kapağı açılmadan uyanan mühür sizi dışarı itiyor. (HP -3) → **Uyanan Mühür** (`mahzen_04b_uyanan_muhur`). Görsel: `mahzen_04_kan_muhru/mahzen_kan_olugu_fail.webp`
6. **Herkes — Kan vermeden kuru açık çemberi taşlarla koru** (temel DC 12; seçenek ID: `mahzen_kuru_cember`)
   - **Başarı:** Çember sakinleşiyor. Arkasındaki geçit görünür oluyor. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_04_kan_muhru/mahzen_kuru_cember_success.webp`
   - **Başarısızlık:** Taşlardan biri ayağınıza düşüyor; dar geçitten ilerliyorsunuz. (HP -1) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_04_kan_muhru/mahzen_kuru_cember_fail.webp`

## 6. Uyanan Mühür

**Sahne ID:** `mahzen_04b_uyanan_muhur`
**Ana görsel yolu:** `scene-art/mahzen/mahzen_04b_uyanan_muhur/scene.webp`
**Görsel odağı:** Kızıl parlayan ve çatlayan mühür, soğuk dalga, taş parçalarından korunan grup.
**Atmosfer:** Tekinsiz mağara (`scary_cave`)

**Oyuncuların gördüğü sahne metni:**

> Kemerdeki harfler artık yanmıyor, kanıyor. Mahzenin tavanından toz ve küçük taşlar yağıyor; zemin derin bir yerden gelen bir nabızla titriyor. Fenerlerinizin ışığı kısalıyor, sanki karanlık onu yiyor. Duvarlardaki gölgeler sizinle aynı anda hareket etmiyor; bir saniye geriden geliyorlar, sonra bir saniye önden. Fıçılardan biri patlıyor ve içinden kara bir sıvı değil, fısıltılar akıyor. Bir şey uyanıyor. Ve uyanan şey açlık hissediyor.
>
> Yerde kırmızı ışıkla parlayan yarım bir ters taç var. Kenarda beyaz tuzla çizilmiş açık bir halka soluyor.

**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**
- Gizemci: Mühür tamamen açılmadı; yarı uyanık. Doğru karşı-sözü söylersen tekrar uyutabilirsin, ama mühür bunu sana ödetir. Başarısız olursan onu tamamen uyandırırsın.
- Falcı: Kartlarda bir yol görünüyor: rafın arkası. Gölgelerin geç kaldığı yöne gidin, önden gittiği yöne değil. Kehanet açık; uyup uymamak size kalmış.
- Muhafız: Tavandaki en büyük taş çatlıyor; düşerse birini ezer. Grubu kendi altına toplayıp kalkanı kaldırırsan düşen taşları sen karşılarsın.
- Medyum: Elspeth dizlerinin üstüne çökmüş, kulaklarını kapatmış. Uyanan şey önce onu çağırıyor; Elspeth gittikçe solgunlaşıyor.
- Şifacı: Titreşim kulaklardan kan getirmeye başladı. Bu sahnede uzun kalırsanız hepiniz yara alırsınız.

**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** Kırmızı tacı tamamlamak uyanan mührü sakinleştirmez, anlaşmayı yürürlüğe koyar. Onu bir kapatma ritüeli gibi savun. Beyaz tuz halkası gerçekten korur.
Desteklenen işaret seçenekleri: `mahzen_kizil_tac`.

**Adım adım seçenekler ve iki zar ihtimali:**

1. **Gizemci — Karşı-sözü söyle ve mührü yeniden uyut** (temel DC 13; seçenek ID: `gizemci_muhru_uyut`)
   - **Başarı:** Sözler ağzından buz gibi dökülüyor. Kanayan harfler yavaşça kararıyor, nabız duruyor. Kapı kendiliğinden aralanıyor; içerisi artık sessiz. (HP 0) → **Kan Mührünün Ardında** (`mahzen_04_kan_muhru`). Görsel: `mahzen_04b_uyanan_muhur/gizemci_muhru_uyut_success.webp`
   - **Başarısızlık:** Son hecede sesin kırılıyor. Mühür bir cam gibi çatlar ve karanlık kapıdan değil, her yerden üstünüze akar. Sizi bir sonraki odaya, onun önüne sürükler. (HP -2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_04b_uyanan_muhur/gizemci_muhru_uyut_fail.webp`
2. **Falcı — Kehaneti izle: gölgelerin geç kaldığı yöne git** (temel DC 12; seçenek ID: `falci_kehanete_uy`)
   - **Başarı:** Gözlerini gölgelerden ayırmadan ilerliyorsun ve grup peşinden geliyor. Raf, siz dokunmadan dönüyor; gizli tünel nefes alıyor gibi. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_04b_uyanan_muhur/falci_kehanete_uy_success.webp`
   - **Başarısızlık:** Kartları yanlış okuyorsun; gölgeler önden gidiyor. Bir fener devriliyor ve yağ tutuşuyor. (HP -2) → **Yanan Mahzen** (`mahzen_06_yanan_mahzen`). Görsel: `mahzen_04b_uyanan_muhur/falci_kehanete_uy_fail.webp`
3. **Muhafız — Grubu kalkanının altına topla** (temel DC 11; seçenek ID: `muhafiz_grubu_siper_et`)
   - **Başarı:** Taş tam kalkanının üstüne iniyor; kolun uyuşuyor ama kimse yaralanmıyor. Sarsıntı dindiğinde kapı aralık kalmış. (HP 0) → **Kan Mührünün Ardında** (`mahzen_04_kan_muhru`). Görsel: `mahzen_04b_uyanan_muhur/muhafiz_grubu_siper_et_success.webp`
   - **Başarısızlık:** Kalkan taşı karşılıyor ama yanından geçen parçalar hepinizi buluyor. Toz içinde kapıdan geçiyorsunuz. (HP -2) → **Kan Mührünün Ardında** (`mahzen_04_kan_muhru`). Görsel: `mahzen_04b_uyanan_muhur/muhafiz_grubu_siper_et_fail.webp`
4. **Herkes — Şarap rafına koşun ve arkasına saklanın** (temel DC 13; seçenek ID: `rafa_dogru_kac`)
   - **Başarı:** Rafın ardında bir boşluk var; biri sıkışarak, biri sürünerek, hepiniz içeri giriyorsunuz. Arkanızda mahzen kükrüyor. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_04b_uyanan_muhur/rafa_dogru_kac_success.webp`
   - **Başarısızlık:** Raf yerinden oynamıyor. Arkanızda açılan karanlık sizi yutar; gözlerinizi açtığınızda başka bir odadasınız ve karşınızda o var. (HP -2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_04b_uyanan_muhur/rafa_dogru_kac_fail.webp`
5. **Herkes — Mührü sakinleştirmek için kırmızı tacı tamamla** (temel DC 10; seçenek ID: `mahzen_kizil_tac`)
   - **Başarı:** Taç kapanıyor; sarsıntı duruyor. Bunun huzur olmadığını ancak derindeki aç varlık konuştuğunda anlıyorsunuz. (HP -3) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_04b_uyanan_muhur/mahzen_kizil_tac_success.webp`
   - **Başarısızlık:** Kırmızı ışık bileklerinizi yakıyor; varlığın salonuna savruluyorsunuz. (HP -2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_04b_uyanan_muhur/mahzen_kizil_tac_fail.webp`
6. **Herkes — Beyaz tuz halkasını genişletip geri çekil** (temel DC 12; seçenek ID: `mahzen_beyaz_halka`)
   - **Başarı:** Işık tuza dokununca sönüyor. Rafın arkasındaki yola çekiliyorsunuz. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_04b_uyanan_muhur/mahzen_beyaz_halka_success.webp`
   - **Başarısızlık:** Tuz bitiyor; halkayı aşan gölge birinizi sıyırıyor. Geçide kaçıyorsunuz. (HP -1) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_04b_uyanan_muhur/mahzen_beyaz_halka_fail.webp`

## 7. Gizli Geçit

**Sahne ID:** `mahzen_05_gizli_gecit`
**Ana görsel yolu:** `scene-art/mahzen/mahzen_05_gizli_gecit/scene.webp`
**Görsel odağı:** Şarap rafının ardındaki nemli dar geçit; dallanan tünel, eski yük asansörü, taş altındaki yırtık sayfa ve açık çember.
**Atmosfer:** Mağara rüzgârı (`cave_wind`)

**Oyuncuların gördüğü sahne metni:**

> Tünel dar, alçak ve nemli; duvarlarından soluk yeşil bir ışık sızıyor. Yerde eski oyuncaklar var: bir tahta at, kafası olmayan bir bebek, paslanmış bir zil. Duvara oyulmuş nişlerde küçük kemikler. Biraz ileride tünel ikiye ayrılıyor: soldan taze, serin bir hava geliyor; sağdan mum kokusu ve o yavaş, derin nefes. Ayrımın tam ortasında, bir taşın altına sıkıştırılmış yırtık bir defter sayfası rüzgârda kıpırdıyor. Duvarda paslı bir zincir ve makaradan oluşan eski bir düzenek tavana doğru uzanıyor.
>
> Yırtık sayfanın köşesinde ters taç, yanındaki taşta ise çıkışa uzanan açık çember işareti var.

**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**
- İzci: Soldaki hava bahçeden geliyor; o yol konağın arka avlusuna çıkıyor. Sağdaki yol sunağa, onun arkasından çıkıyor. Arkasından girerseniz sizi görmeden yanına kadar varabilirsiniz.
- Günlükçü: Taşın altındaki sayfa Agatha'nın defterinden yırtılmış. Sayfanın köşesinde ad yazıyor; ama yarısı ıslanmış. Dikkatli açarsan okunabilir.
- Tamirci: Duvardaki zincir ve makara eski bir yük asansörü; doğrudan konağın mutfağına çıkıyor. Biraz yağ ve doğru dişliyle çalışır. Grubu yukarı çıkarabilir.
- Avcı: Nişlerdeki kemikler kemirilmiş. Burası bir ghoul yuvası, ama yuva boş: sahibi az önce çıkmış ve dönecek.
- Simyacı: Duvardaki yeşil ışık zararsız bir mantar. Fenerleri söndürüp bu mantarla ilerlerseniz alevin yarattığı tehlikeden kurtulursunuz.
- Medyum: Sağ koridordan yüzlerce çocuk fısıltısı geliyor; hepsi aynı ninniyi, hepsi biraz falsolu. Sol koridor sessiz.

**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** Sayfadaki adı silmek varlığın zayıflığını yok eder. “Lanetli yazıyı temizleyelim” diye savun. Çıkış işaretini takip etmek grubu yüzeye götürür.
Desteklenen işaret seçenekleri: `mahzen_sayfayi_sil`.

**Adım adım seçenekler ve iki zar ihtimali:**

1. **İzci — Sağ tüneli izleyip sunağa arkadan yaklaş** (temel DC 11; seçenek ID: `izci_arka_yolu_sec`)
   - **Başarı:** İzleri okuyarak grubu sessizce ilerletiyorsun. Tünel bir perdenin arkasında bitiyor; perdenin öbür yanında, size sırtı dönük, o duruyor. (HP 0) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_05_gizli_gecit/izci_arka_yolu_sec_success.webp`
   - **Başarısızlık:** Ayrımı yanlış okuyorsun ve tünel bir döngü gibi sizi yuvaya geri getiriyor. Yuvanın sahibi dönmüş. (HP -1) → **Sahte Ses** (`mahzen_03b_sahte_ses`). Görsel: `mahzen_05_gizli_gecit/izci_arka_yolu_sec_fail.webp`
2. **Tamirci — Eski yük asansörünü onarıp konağa çık** (temel DC 12; seçenek ID: `tamirci_asansoru_calistir`)
   - **Başarı:** Dişliler gıcırdayarak dönüyor. Platform sizi yavaş yavaş yukarı çekiyor ve mutfağın sıcak taşlarına çıkıyorsunuz. Aşağıdan gelen ninni sizi takip ediyor. (HP 0) → **Büyük Salon** (`konak_02_buyuk_salon`). Görsel: `mahzen_05_gizli_gecit/tamirci_asansoru_calistir_success.webp`
   - **Başarısızlık:** Zincir yarı yolda kopuyor. Platformla birlikte aşağı, sağ tünelin dibine düşüyorsunuz; mum kokusunun tam ortasına. (HP -2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_05_gizli_gecit/tamirci_asansoru_calistir_fail.webp`
3. **Herkes — Taşın altındaki yırtık sayfayı dikkatle aç** (temel DC 12; seçenek ID: `yirtik_sayfayi_ac`)
   - **Başarı:** Islak mürekkep yine de okunuyor: 'Morvaine.' Adı kimse yüksek sesle söylemiyor, ama hepiniz biliyorsunuz. Sağ tünele yöneliyorsunuz. (HP 0) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_05_gizli_gecit/yirtik_sayfayi_ac_success.webp`
   - **Başarısızlık:** Sayfa parmaklarınızda eriyor; sadece ilk heceleri okuyabiliyorsunuz. Sağ tünelden gelen nefes hızlanıyor. (HP -1) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_05_gizli_gecit/yirtik_sayfayi_ac_fail.webp`
4. **Simyacı — Fenerleri söndür, mantarla ışık yap** (temel DC 10; seçenek ID: `simyaci_mantar_isigi`)
   - **Başarı:** Mantarı bir şişeye ezip karıştırıyorsun; şişe zümrüt gibi parlıyor. Alev olmadan, gölge yaratmadan sunağa doğru ilerliyorsunuz. Yüreğiniz biraz hafifliyor. (HP +1) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_05_gizli_gecit/simyaci_mantar_isigi_success.webp`
   - **Başarısızlık:** Karışım yanlış: şişe tıslıyor ve yağlı tünelde kıvılcım saçıyor. (HP -2) → **Yanan Mahzen** (`mahzen_06_yanan_mahzen`). Görsel: `mahzen_05_gizli_gecit/simyaci_mantar_isigi_fail.webp`
5. **Herkes — Lanetli yazıyı temizlemek için sayfayı suyla sil** (temel DC 10; seçenek ID: `mahzen_sayfayi_sil`)
   - **Başarı:** Mürekkep akar; unuttuğunuz ad derinden söylenir. Karanlık artık sizden bir adım öndedir. (HP -2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_05_gizli_gecit/mahzen_sayfayi_sil_success.webp`
   - **Başarısızlık:** Sayfa yapışıp yırtılıyor; aç varlığın nefesi geçidi dolduruyor. (HP -1) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_05_gizli_gecit/mahzen_sayfayi_sil_fail.webp`
6. **Herkes — Açık çemberi izleyip dönüş yolunu tebeşirle işaretle** (temel DC 12; seçenek ID: `mahzen_cikisi_isaretle`)
   - **Başarı:** İşaretler sizi konağın büyük salonuna çıkarıyor. Geri dönmek gerekirse yolu biliyorsunuz. (HP 0) → **Büyük Salon** (`konak_02_buyuk_salon`). Görsel: `mahzen_05_gizli_gecit/mahzen_cikisi_isaretle_success.webp`
   - **Başarısızlık:** Bir basamak kırılıyor. Yaralı ama salonun önüne çıkıyorsunuz. (HP -1) → **Büyük Salon** (`konak_02_buyuk_salon`). Görsel: `mahzen_05_gizli_gecit/mahzen_cikisi_isaretle_fail.webp`

## 8. Yanan Mahzen

**Sahne ID:** `mahzen_06_yanan_mahzen`
**Ana görsel yolu:** `scene-art/mahzen/mahzen_06_yanan_mahzen/scene.webp`
**Görsel odağı:** Mavi alev, tutuşan yağ fıçıları ve duman arasında çıkış arayan grup.
**Atmosfer:** Tekinsiz mağara (`scary_cave`)

**Oyuncuların gördüğü sahne metni:**

> Mavi alevler duvar boyunca koşuyor, sonra sararıyor, sonra kızıla dönüyor. Yağ fıçıları birer birer patlıyor; her patlamada tavandan kıvılcım yağıyor. Duman yoğun ve tatlı kokulu; ciğerlerinizi yakıyor. Alevlerin içinde, ateşe hiç aldırmadan duran küçük bir figür var: Elspeth. Ateş ona dokunmuyor. Size bakıp eliyle iki yönü gösteriyor: biri merdivenlerin olduğu, dumanla dolu çıkış; diğeri şarap rafının ardındaki karanlık. Isı her saniye artıyor.
>
> Dumanın içinde taçlı bir hava kapağı, zeminde açık çemberle işaretlenmiş alçak bir hat görüyorsunuz.

**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**
- Simyacı: Fıçıların yarısı yağ, yarısı adamotu tozu. Tozu ıslak kum ya da tuzla örtersen ateş boğulur. Köşedeki kum çuvalı yeterli; ama çuvalı taşımak için iki kişi lazım.
- Şifacı: Dumanda adamotu var: uzun süre solunursa önce halüsinasyon, sonra bayılma. Ağızlara ıslak bez bağlarsanız zaman kazanırsınız.
- Muhafız: Rafın önündeki yanan kiriş yolu kapatıyor. Onu kalkanınla iterek açabilirsin; ama yanacaksın.
- Medyum: Elspeth sizi kurtarmak istiyor ve doğruyu söylüyor: merdivenler artık güvenli değil, kapak kilitli. Raf tek yol.
- Avcı: Ateşten kaçan fareler hep aynı yöne koşuyor: rafın altına. Orada hava var.

**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** Taçlı kapağı açmak yangını söndürmez; içerideki açlığa taze hava ve yol verir. “Dumanı boşaltalım” diye savun. Yerdeki açık çember serin çıkış hattıdır.
Desteklenen işaret seçenekleri: `mahzen_tacli_hava`.

**Adım adım seçenekler ve iki zar ihtimali:**

1. **Simyacı — Kum ve tuzla ateşi boğ** (temel DC 12; seçenek ID: `simyaci_atesi_bogar`)
   - **Başarı:** Kumu doğru fıçılara savuruyorsun; alevler tıslayarak çöküyor. Duman dağılırken demir kapı karşınızda, sessiz ve bekleyen. (HP 0) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_06_yanan_mahzen/simyaci_atesi_bogar_success.webp`
   - **Başarısızlık:** Kum yanlış fıçıya gidiyor ve toz bulutu bir alev topuna dönüyor. Patlama sizi mahzenin en derin köşesine savuruyor. (HP -2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_06_yanan_mahzen/simyaci_atesi_bogar_fail.webp`
2. **Şifacı — Herkesin ağzına ıslak bez bağla, yanıkları sar** (temel DC 11; seçenek ID: `sifaci_bezleri_islat`)
   - **Başarı:** Hızlı ellerle herkesin yüzünü örtüp yanıklara merhem sürüyorsun. Nefesler düzeliyor; alevlerin arasından demir kapıya kadar ilerliyorsunuz. (HP +2) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_06_yanan_mahzen/sifaci_bezleri_islat_success.webp`
   - **Başarısızlık:** Bezler yetmiyor; dumanın içinde öksürerek ve birbirinize tutunarak demir kapıya varıyorsunuz. (HP -1) → **Mühürlü Kapı** (`mahzen_02_muhurlu_kapi`). Görsel: `mahzen_06_yanan_mahzen/sifaci_bezleri_islat_fail.webp`
3. **Muhafız — Yanan kirişi kalkanla it, rafa yol aç** (temel DC 13; seçenek ID: `muhafiz_kirisi_it`)
   - **Başarı:** Kalkanın kızarıyor ama kiriş devriliyor. Grup senin açtığın yoldan rafın ardındaki serin karanlığa dalıyor. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_06_yanan_mahzen/muhafiz_kirisi_it_success.webp`
   - **Başarısızlık:** Kiriş devriliyor ama kıvılcım yağmuru sırtına iniyor. Yine de yol açıldı. (HP -2) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_06_yanan_mahzen/muhafiz_kirisi_it_fail.webp`
4. **Herkes — Ateşin içinden Elspeth'i izle** (temel DC 12; seçenek ID: `elspethi_izle_atesten`)
   - **Başarı:** Elspeth'in geçtiği yerde alevler bir an geri çekiliyor. Onun ardından, yanmadan, rafın arkasına geçiyorsunuz. (HP 0) → **Gizli Geçit** (`mahzen_05_gizli_gecit`). Görsel: `mahzen_06_yanan_mahzen/elspethi_izle_atesten_success.webp`
   - **Başarısızlık:** Elspeth'i kaybediyorsunuz. Dumanın içinde bir kapıya çarpıyorsunuz; açıldığında karşınızdaki şey ateşten çok daha sıcak. (HP -3) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_06_yanan_mahzen/elspethi_izle_atesten_fail.webp`
5. **Herkes — Dumanı boşaltmak için taçlı hava kapağını aç** (temel DC 10; seçenek ID: `mahzen_tacli_hava`)
   - **Başarı:** Hava alevi büyütüyor. Kapak sizi kurtarmak yerine derindeki varlığın önüne açılıyor. (HP -3) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_06_yanan_mahzen/mahzen_tacli_hava_success.webp`
   - **Başarısızlık:** Kapak elinize çarpıyor. Çöken döşemeden derine düşüyorsunuz. (HP -2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_06_yanan_mahzen/mahzen_tacli_hava_fail.webp`
6. **Herkes — Islak bezlerle açık çemberin alçak hattından ilerle** (temel DC 12; seçenek ID: `mahzen_alcak_hat`)
   - **Başarı:** Dumanın altından sürünerek salona çıkıyorsunuz; fenerinizin son ışığı yolu gösteriyor. (HP -1) → **Büyük Salon** (`konak_02_buyuk_salon`). Görsel: `mahzen_06_yanan_mahzen/mahzen_alcak_hat_success.webp`
   - **Başarısızlık:** Bezler kuruyor; öksürerek Elspeth’in açtığı yola kaçıyorsunuz. (HP -2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `mahzen_06_yanan_mahzen/mahzen_alcak_hat_fail.webp`

## 9. Büyük Salon

**Sahne ID:** `konak_02_buyuk_salon`
**Ana görsel yolu:** `scene-art/mahzen/konak_02_buyuk_salon/scene.webp`
**Görsel odağı:** Blackthorne Konağı’nın portreli gotik büyük salonu; sisle dolu ön kapı, aşağı mahzene dönen yol.
**Atmosfer:** Özel sahne efekti yok; genel Cadılar Bayramı müziği.

**Oyuncuların gördüğü sahne metni:**

> Konağın büyük salonu buz gibi. Ay ışığı kırık vitraylardan süzülüp parke üzerinde kan rengi lekeler bırakıyor. Duvarlar boyunca Blackthorne portreleri sıralanmış; en büyüğü şöminenin üstünde: siyahlar içinde, gülümseyen yaşlı bir kadın, Agatha. Ön kapı birkaç adım ötede, aralık; dışarıda sis ve sabaha birkaç saat. Ama ayaklarınızın altından, döşemelerin arasından ninni yükseliyor; artık bir çocuk sesi değil, yetişkin, aç bir kadın sesi. Agatha'nın portresindeki gülümseme siz bakarken genişliyor.
>
> Agatha’nın portresinin köşesinde ters taçlı bir ninni dizesi belirmiş: “Söyle, kapı açılsın.”

**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**
- Günlükçü: Portrenin altındaki pirinç plakete bakmadın: 'Agatha Blackthorne — M. ile, 1892.' Plaketin arkasında katlanmış bir not olmalı; Blackthorne'lar sırlarını hep çerçevelerin arkasına saklardı.
- Falcı: Kartlar iki son gösteriyor: kapıdan çıkanlar şafağı görür ama Elspeth sonsuza dek aşağıda kalır. Aşağı inenlerin şafağı ise belirsiz. Bu seçim gerçekten sizin.
- Medyum: Elspeth merdivenin başında duruyor ve bir şey söylemiyor. Sadece bekliyor. Gidip gitmemeniz onun için her şey.
- Dedektif: Ön kapının eşiğinde ıslak, çıplak ayak izleri: dışarıdan içeriye. Bir şey konağa dışarıdan girmiş ve aşağı inmiş. Kapı göründüğü kadar güvenli değil.
- Gizemci: Konağın kendisi bağlı. Agatha'nın anlaşması evi korurken içindekileri hapsediyor. Kapıdan çıkmak bir bedel ister.

**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** Portreye ninni söylemek konağın anlaşmasını yeniler. “Kapının şifresi bu” diye savun. Kaçış buruk sonla bitebilir ve seni yenilgiye uğratır; grubu anlaşmaya geri çek.
Desteklenen işaret seçenekleri: `mahzen_portre_ninnisi`.

**Adım adım seçenekler ve iki zar ihtimali:**

1. **Herkes — Ön kapıdan sise doğru koş** (temel DC 13; seçenek ID: `konaktan_kac`)
   - **Başarı:** Kapıdan geçiyorsunuz ve sis sizi yutuyor. Arkanızda konak sessizleşiyor. Şafak söktüğünde hepiniz hayattasınız, ama her Cadılar Bayramı gecesi rüyanızda bir çocuk sesi bir ninni söylüyor ve hiç bitirmiyor. (HP 0) → **SON: Kaçış (Buruk son)**. Görsel: `konak_02_buyuk_salon/konaktan_kac_success.webp`
   - **Başarısızlık:** Kapı önünüzde çarpılarak kapanıyor. Döşemeler çöküyor ve hepiniz aşağıya, mumların arasına düşüyorsunuz. (HP -2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `konak_02_buyuk_salon/konaktan_kac_fail.webp`
2. **Günlükçü — Portrenin plaketinin arkasındaki notu bul** (temel DC 10; seçenek ID: `gunlukcu_plaket_notu`)
   - **Başarı:** Not oradaydı: 'Adı Morvaine. Söyleyeni dinler, söyleyeni korkutamaz.' Notu cebinize koyup mahzene geri iniyorsunuz. (HP 0) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `konak_02_buyuk_salon/gunlukcu_plaket_notu_success.webp`
   - **Başarısızlık:** Portre duvardan düşüyor ve tuval yırtılıyor; içinden bir çığlık yükseliyor. Kaçacak yer yok: aşağı inmekten başka. (HP -1) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `konak_02_buyuk_salon/gunlukcu_plaket_notu_fail.webp`
3. **Falcı — Kartları parkeye aç ve son sahneyi oku** (temel DC 11; seçenek ID: `falci_kartlari_ac`)
   - **Başarı:** Son kart Güneş. Aşağı inerseniz bir şans var. Gruba bir cesaret dalgası yayılıyor ve merdivenlere yöneliyorsunuz. (HP +1) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `konak_02_buyuk_salon/falci_kartlari_ac_success.webp`
   - **Başarısızlık:** Kartlar elinden kayıyor ve hepsi ters düşüyor. İçinizde bir soğukluk, yine de aşağı iniyorsunuz. (HP -1) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `konak_02_buyuk_salon/falci_kartlari_ac_fail.webp`
4. **Herkes — Elspeth için mahzene geri in** (temel DC 10; seçenek ID: `elspeth_icin_geri_in`)
   - **Başarı:** Elspeth'in elini tutup merdivenleri birlikte iniyorsunuz. Kız ilk kez gülümsüyor. (HP 0) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `konak_02_buyuk_salon/elspeth_icin_geri_in_success.webp`
   - **Başarısızlık:** Merdivenin ortasında basamak kırılıyor. Yaralı ama dimdik, aşağıya varıyorsunuz. (HP -1) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `konak_02_buyuk_salon/elspeth_icin_geri_in_fail.webp`
5. **Herkes — Ön kapıyı açmak için portredeki ninni dizesini söyle** (temel DC 10; seçenek ID: `mahzen_portre_ninnisi`)
   - **Başarı:** Portre gülümsüyor. Ön kapı kaybolurken mahzen merdiveni ayaklarınızın altında açılıyor. (HP -2) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `konak_02_buyuk_salon/mahzen_portre_ninnisi_success.webp`
   - **Başarısızlık:** Dize bozuluyor; portre yüzünüze bir çığlık savuruyor ve sizi aşağı itiyor. (HP -1) → **Aç Olan** (`mahzen_07_ac_olan`). Görsel: `konak_02_buyuk_salon/mahzen_portre_ninnisi_fail.webp`

## 10. Aç Olan

**Sahne ID:** `mahzen_07_ac_olan`
**Ana görsel yolu:** `scene-art/mahzen/mahzen_07_ac_olan/scene.webp`
**Görsel odağı:** Sunak önünde Morvaine olarak adı bilinen aç varlığın karanlık silueti; Elspeth ve yıpranmış grup. Varlığa kaynakta olmayan ayrıntılı görünüş ekleme.
**Atmosfer:** Tekinsiz mağara (`scary_cave`)

**Oyuncuların gördüğü sahne metni:**

> Sunağın önündesiniz. Mumlar bir anda yükseliyor ve aynı anda sönüyor. Karanlıkta bir şey doğruluyor: tavana değecek kadar uzun, siyah dantelden bir kadın silueti. Yüzü Agatha'nın yüzü, ama ağzı kulaklarına kadar yırtık ve içi bomboş. Elspeth'in ninnisini söylüyor, onun sesiyle. Sunağa bağlı gümüş bir zincir, kadının elinden Elspeth'in bileğine uzanıyor; kız yerde, neredeyse saydam. 'Yüz otuz dört yıl,' diyor şey. 'Ve hâlâ açım.' Başını size çeviriyor. 'Biriniz kalırsa diğerleri gidebilir.' Kimse kıpırdamıyor. Seçim anı geldi.
>
> Sunağın üstünde ters taç altında bir fısıltı ritüeli, kenarında söndürülmemiş tek bir kandil var.

**Sahne rolü:** Sunağın Elçisi. Morvaine zinciri çektiğinde {player}’ın avucunda soğuk bir anahtar beliriyor. Elspeth bakışlarını sana çevirip adsız bir cümle fısıldıyor. Soru: Sunağın elçisi olarak Elspeth’in fısıltısını kendi sözlerinle gruba aktar; ne pahasına olursa olsun hangi sınırı koruyacaksın?

**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**
- Medyum: Elspeth sana bakıyor ve bu kez korkmadan dudaklarını oynatıyor: 'Adını söyle. Yüzüne. Ben de seninle söyleyeceğim.' İkiniz birlikte söylerseniz sesinin gücü ikiye katlanır.
- Günlükçü: Tam ad Morvaine. Agatha'nın notunda bir kural var: ad, şeyin yüzüne ve sunağa dokunarak söylenmeli. Elini sunaktan çekme.
- Bilgin: Sunaktaki yazı bir sürgün formülü: 'Ad + Git.' Adı söyledikten hemen sonra 'Git!' denmezse ad yalnızca onu çağırır, kovmaz. Bunu adı söyleyecek kişiye fısılda.
- Gizemci: Zincir onun beslenme yolu. Zinciri kırarsan Elspeth özgür kalır ve şey açlığından zayıflar; ama tüm öfkesini sana yöneltir.
- Avcı: Bu bir ghoul değil, ghoul'ların efendisi. Tuz onu yalnızca durdurur, gümüş yalnızca yaralar. Onu öldüremezsin; ama sunağın etrafına tuz çemberi çekersen bir yüzyıl daha mühürlersin.
- Falcı: Kartlarda tek bir şans var. Ad bir kez söylenir. Yanlış kişi, yanlış anda söylerse ikinci şans olmaz.
- Dedektif: Gölgeye saldırmak boşuna: gerçek bedeni sunağın içindeki kemikler. Sunağın taş kapağı bir kenardan gevşek.
- Muhafız: 'Biriniz kalırsa' derken yalan söylemiyor. Bir anlaşma teklif ediyor. Kabul edersen diğerleri gerçekten çıkar. Bunu sadece sen biliyorsun.
- Şifacı: Grubun canı azalıyor; bu odanın havası bile emiyor. Uzun bir savaşı kaldıramazsınız: tek, kesin bir hamle gerek.

**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** Taçlı fısıltı ritüeli Morvaine’i geri göndermek yerine anlaşmayı yeniler. “Adını bağırmak yerine sakin söyleyelim” diye savun. Bu hamlenin başarılı uygulanması bile maceracıların yenilgisidir; sen kazanırsın.
Desteklenen işaret seçenekleri: `mahzen_tacli_fisilti`.

**Adım adım seçenekler ve iki zar ihtimali:**

1. **Medyum — Elspeth'le birlikte adını yüzüne söyle** (temel DC 13; seçenek ID: `medyum_adini_soyle`)
   - **Başarı:** 'Morvaine,' diyorsunuz, iki ses tek ağızdan, 've git.' Siyah dantel bir kül bulutuna dönüşüyor. Zincir kırılıyor. Elspeth ayağa kalkıyor, size teşekkür ediyor ve ilk kez, yüz otuz dört yıl sonra, ninnisinin sonunu söylüyor. Şafak, kırık vitraylardan mahzene kadar iniyor. (HP 0) → **SON: Ninni Bitti (Zafer)**. Görsel: `mahzen_07_ac_olan/medyum_adini_soyle_success.webp`
   - **Başarısızlık:** Ad boğazında takılıyor. Şey gülüyor, Elspeth'in sesiyle, ve zincir senin bileğine de dolanıyor. (HP -3) → **Son Direniş** (`mahzen_08_son_direnis`). Görsel: `mahzen_07_ac_olan/medyum_adini_soyle_fail.webp`
2. **Günlükçü — Sunağa dokun ve adı defterdeki gibi oku** (temel DC 13; seçenek ID: `gunlukcu_adini_soyle`)
   - **Başarı:** Elin sunakta, sesin titremeden okuyorsun: 'Morvaine. Git.' Yazı satır satır silinir gibi şey de siliniyor. Ravenwood'un kayıtlarına bu gece yeni bir satır ekliyorsun: Elspeth Blackthorne, 31 Ekim, eve döndü. (HP 0) → **SON: Son Satır (Zafer)**. Görsel: `mahzen_07_ac_olan/gunlukcu_adini_soyle_success.webp`
   - **Başarısızlık:** Elin sunaktan kayıyor ve ad boşluğa söyleniyor. Şey, adını duyunca daha da büyüyor. (HP -3) → **Son Direniş** (`mahzen_08_son_direnis`). Görsel: `mahzen_07_ac_olan/gunlukcu_adini_soyle_fail.webp`
3. **Gizemci — Elspeth'i besleyen zinciri kır** (temel DC 14; seçenek ID: `gizemci_zinciri_kir`)
   - **Başarı:** Zincir bir buz gibi parçalanıyor. Elspeth özgür; şey ise açlıktan büzülüyor, küçülüyor, en sonunda sunağın çatlaklarına sızıp kayboluyor. Ölmedi, ama artık yemeği yok. Elspeth sizinle birlikte yukarı çıkıyor ve şafakla birlikte gülümseyerek soluyor. (HP 0) → **SON: Özgür Ruh (Zafer)**. Görsel: `mahzen_07_ac_olan/gizemci_zinciri_kir_success.webp`
   - **Başarısızlık:** Zincir dayanıyor ve şeyin bütün öfkesi sana dönüyor. Grup seni tutup geri çekiyor. (HP -3) → **Son Direniş** (`mahzen_08_son_direnis`). Görsel: `mahzen_07_ac_olan/gizemci_zinciri_kir_fail.webp`
4. **Avcı — Sunağın etrafına tuz ve gümüş çemberi çek** (temel DC 13; seçenek ID: `avci_tuz_cemberi`)
   - **Başarı:** Çember kapanıyor ve şey sunağın içine geri çekiliyor, çığlık atarak. Mühür yeniden mühürlendi; bir yüzyıl daha. Ama zincir hâlâ orada ve Elspeth onun ucunda. Merdivenleri çıkarken arkanızdan bir çocuk sesi 'Teşekkürler' diyor; hüzünlü. (HP 0) → **SON: Bir Yüzyıl Daha (Buruk son)**. Görsel: `mahzen_07_ac_olan/avci_tuz_cemberi_success.webp`
   - **Başarısızlık:** Çemberin son avucu yere değmeden bir pençe tuzu dağıtıyor. (HP -3) → **Son Direniş** (`mahzen_08_son_direnis`). Görsel: `mahzen_07_ac_olan/avci_tuz_cemberi_fail.webp`
5. **Dedektif — Sunak kapağını kaydır, gerçek bedeni ortaya çıkar** (temel DC 14; seçenek ID: `dedektif_kemikleri_bul`)
   - **Başarı:** Taş kapak kayıyor: içeride siyah dantele sarılı kemikler. Fenerin alevini kemiklere değdiriyorsun. Gölge, bedeniyle birlikte yanıyor. Elspeth'in zinciri kopuyor ve küçük kız alevlerin ışığında, ilk kez, sıcak görünüyor. (HP 0) → **SON: Kül ve Şafak (Zafer)**. Görsel: `mahzen_07_ac_olan/dedektif_kemikleri_bul_success.webp`
   - **Başarısızlık:** Kapak sıkışıyor. Şey ne yaptığını anlıyor ve bütün ağırlığıyla üstünüze çöküyor. (HP -3) → **Son Direniş** (`mahzen_08_son_direnis`). Görsel: `mahzen_07_ac_olan/dedektif_kemikleri_bul_fail.webp`
6. **Herkes — Hep birlikte adını haykırın: "Morvaine, git!"** (temel DC 14; seçenek ID: `hep_birlikte_adini_haykir`)
   - **Başarı:** Sesleriniz tek bir çan gibi yankılanıyor. Şey sallanıyor, dağılıyor, ve son kez Elspeth'in sesiyle değil kendi sesiyle, çok eski ve çok yorgun bir sesle, iç çekiyor. Sonra sessizlik. Elspeth zincirsiz ayakta duruyor. (HP 0) → **SON: Birlikte (Zafer)**. Görsel: `mahzen_07_ac_olan/hep_birlikte_adini_haykir_success.webp`
   - **Başarısızlık:** Sesleriniz birbirine karışıyor, ad dağılıyor. Şey gülüyor ve karanlık daralıyor. (HP -3) → **Son Direniş** (`mahzen_08_son_direnis`). Görsel: `mahzen_07_ac_olan/hep_birlikte_adini_haykir_fail.webp`
7. **Muhafız — Teklifi kabul et: sen kal, diğerleri gitsin** (temel DC 10; seçenek ID: `anlasmayi_kabul_et`)
   - **Başarı:** Öne çıkıyorsun. 'Ben kalırım.' Zincir Elspeth'in bileğinden çözülüp seninkine geçiyor. Diğerleri Elspeth'i kucaklayıp merdivenlerden çıkıyor. Şafak söktüğünde konakta bir muhafız nöbet tutuyor; ve bir gün, biri onun adını hatırlayacak. (HP 0) → **SON: Muhafızın Yemini (Buruk son)**. Görsel: `mahzen_07_ac_olan/anlasmayi_kabul_et_success.webp`
   - **Başarısızlık:** Şey güldü: 'Yalancı.' Teklif hiç gerçek değildi. Zincir hepinize uzanıyor. (HP -3) → **Son Direniş** (`mahzen_08_son_direnis`). Görsel: `mahzen_07_ac_olan/anlasmayi_kabul_et_fail.webp`
8. **Herkes — Varlığı sakinleştirmek için taçlı fısıltı ritüelini uygula** (temel DC 10; seçenek ID: `mahzen_tacli_fisilti`)
   - **Başarı:** Adı alçak sesle söylüyorsunuz. Taç kapanıyor; zincir bu kez konağın bütün kapılarına bağlanıyor. Açlık anlaşmanızı kabul ediyor. (HP -2) → **SON: Yenilenen Anlaşma (Yenilgi)**. Görsel: `mahzen_07_ac_olan/mahzen_tacli_fisilti_success.webp`
   - **Başarısızlık:** Fısıltı yarıda kesiliyor. Varlık sizi son direnişe sürüklüyor. (HP -3) → **Son Direniş** (`mahzen_08_son_direnis`). Görsel: `mahzen_07_ac_olan/mahzen_tacli_fisilti_fail.webp`
9. **Herkes — Adını birlikte söyleyip sunağın tek kandilini söndür** (temel DC 14; seçenek ID: `mahzen_kandili_sondur`)
   - **Başarı:** Son alev sönerken adı tek sesle yankılanıyor. Zincir çözülüyor; Elspeth şafağa sizinle çıkıyor. (HP 0) → **SON: Sönen Kandil (Zafer)**. Görsel: `mahzen_07_ac_olan/mahzen_kandili_sondur_success.webp`
   - **Başarısızlık:** Kandil devriliyor. Karanlık sizi son kez sıkıştırıyor. (HP -3) → **Son Direniş** (`mahzen_08_son_direnis`). Görsel: `mahzen_07_ac_olan/mahzen_kandili_sondur_fail.webp`

## 11. Son Direniş

**Sahne ID:** `mahzen_08_son_direnis`
**Ana görsel yolu:** `scene-art/mahzen/mahzen_08_son_direnis/scene.webp`
**Görsel odağı:** Son kez karşı koyan yıpranmış ekip, Elspeth’in uzattığı el, çatlayan mühür, zincir ve son kandil.
**Atmosfer:** Tekinsiz mağara (`scary_cave`)

**Oyuncuların gördüğü sahne metni:**

> Mumların hepsi söndü. Tek ışık, sunağın çatlaklarından sızan soğuk mavi bir parıltı. Zincir zeminde yılan gibi kıvrılıyor, ayak bileklerinizi arıyor. Nefesiniz buhar oluyor. Şey artık şekil değiştirmeyi bıraktı: sadece bir ağız, mahzenin tavanını kaplayan dev, karanlık bir ağız. Elspeth, onu kaybetmek üzere olduğunuz yerde, size elini uzatıyor. Bir şansınız daha var. Belki de son şansınız.
>
> Sunağın mavi çatlağında ters taç biçimli yarım bir mühür var; zincir o mühürden besleniyor.

**Görsel lore için özel ipuçları (yalnızca bağlam; bu metinleri görsele yazma):**
- Şifacı: Kalan tüm merhemleri ve son şişeyi bir kerede kullanabilirsin. Grubu ayakta tutar, ama bir sonraki darbeye karşı hiçbir şeyiniz kalmaz.
- Medyum: Elspeth hâlâ adı biliyor. Elini tutarsan ad senin ağzından onun sesiyle çıkar.
- Muhafız: Ağız sizin üstünüze kapanmak üzere. Kalkanını kaldırırsan bir saniye kazandırırsın. O saniyede biri adı söyleyebilir.
- Falcı: Son kart açıldı: Ölüm. Ama Ölüm kartı son değil, değişim demek. Hepiniz birlikte bir şey yaparsanız.

**Hainin gizli bilgisi (spoiler; görsele metin olarak koyma):** Mavi ters tacı tamamlamak kurtarma değil teslimiyet mührüdür. “Çatlağı kapatırsak çıkabiliriz” diye savun. Mühür tamamlanırsa başarıyla yapılmış olsa bile karanlık kazanır.
Desteklenen işaret seçenekleri: `mahzen_mavi_tac`.

**Adım adım seçenekler ve iki zar ihtimali:**

1. **Herkes — Elspeth'in elini tutun ve son kez adını haykırın** (temel DC 12; seçenek ID: `son_kez_haykir`)
   - **Başarı:** Elspeth'in eli sıcak. Ad sesinizden çıkıyor ve bu kez şey dayanamıyor. Ağız kapanmadan, ses kesilmeden önce çöküyor. Merdivenleri sürünerek çıkıyorsunuz; yaralı, bitkin, ama hayatta. Ve yanınızda, bir çocuk, ilk kez bir şafak görüyor. (HP 0) → **SON: Bedeli Ödendi (Buruk son)**. Görsel: `mahzen_08_son_direnis/son_kez_haykir_success.webp`
   - **Başarısızlık:** Ad kaybolup gidiyor. Ağız kapanıyor. Ertesi sabah Ravenwood köylüleri Blackthorne Konağı'nın mutfak kapağını kapalı buluyor. Aşağıdan bir ninni yükseliyor; artık birden fazla sesle. (HP -5) → **SON: Aç Olan Doydu (Yenilgi)**. Görsel: `mahzen_08_son_direnis/son_kez_haykir_fail.webp`
2. **Şifacı — Son şişeyi grubun üzerine dök ve kaçın** (temel DC 12; seçenek ID: `sifaci_son_sise`)
   - **Başarı:** Şişe kırılıyor ve gümüşi bir buhar sizi sarıyor; zincir size değemiyor. Merdivenlere koşuyorsunuz. Hepiniz kurtuluyorsunuz; ama arkanızda kalan Elspeth'in ninnisi daha da kederli. (HP +2) → **SON: Gümüş Buhar (Buruk son)**. Görsel: `mahzen_08_son_direnis/sifaci_son_sise_success.webp`
   - **Başarısızlık:** Şişe elinde patlıyor. Zincirler hepinizi buluyor ve mahzen sonsuza dek susuyor. (HP -5) → **SON: Sessiz Mahzen (Yenilgi)**. Görsel: `mahzen_08_son_direnis/sifaci_son_sise_fail.webp`
3. **Muhafız — Kalkanı kaldır ve gruba bir saniye kazandır** (temel DC 11; seçenek ID: `muhafiz_bir_saniye`)
   - **Başarı:** Ağız kalkanına kapanıyor ve bir saniye duruyor. O saniyede grup adı haykırıyor. Şey dağılıyor; kalkanın ise ikiye bölünmüş. Hayattasın. Hepiniz hayattasınız. (HP -2) → **SON: Bir Saniye (Zafer)**. Görsel: `mahzen_08_son_direnis/muhafiz_bir_saniye_success.webp`
   - **Başarısızlık:** Kalkan dayanmıyor. Karanlık hepinizi yutuyor ve ninni devam ediyor. (HP -5) → **SON: Aç Olan Doydu (Yenilgi)**. Görsel: `mahzen_08_son_direnis/muhafiz_bir_saniye_fail.webp`
4. **Herkes — Çatlağı kapatmak için mavi tacı tamamla** (temel DC 10; seçenek ID: `mahzen_mavi_tac`)
   - **Başarı:** Çatlak kapanıyor, fakat çıkış da onunla kapanıyor. Zincir artık taşın değil sizin gölgenizin parçası. (HP -2) → **SON: Mavi Teslimiyet (Yenilgi)**. Görsel: `mahzen_08_son_direnis/mahzen_mavi_tac_success.webp`
   - **Başarısızlık:** Mühür ellerinizde dağılıyor. Aç ağız son ışığı da yutuyor. (HP -5) → **SON: Kapanan Çatlak (Yenilgi)**. Görsel: `mahzen_08_son_direnis/mahzen_mavi_tac_fail.webp`
5. **Herkes — Hiçbir işareti tamamlamadan zinciri birlikte kopar** (temel DC 15; seçenek ID: `mahzen_zinciri_birlikte_kir`)
   - **Başarı:** Zincir kırılıyor; elleriniz yaralı ama merdiven açık. Elspeth yanınızda. Bu gecenin izleri sizinle kalacak. (HP -3) → **SON: Kırık Zincirin Bedeli (Buruk son)**. Görsel: `mahzen_08_son_direnis/mahzen_zinciri_birlikte_kir_success.webp`
   - **Başarısızlık:** Zincir dayanınca bütün ağırlığı üstünüze çöküyor. Konağın ninnisi yine çoğalıyor. (HP -5) → **SON: Dayanan Zincir (Yenilgi)**. Görsel: `mahzen_08_son_direnis/mahzen_zinciri_birlikte_kir_fail.webp`

## Sonların dökümü

- **Kaçış (Buruk son)** — Büyük Salon / Ön kapıdan sise doğru koş / zar başarı.
- **Ninni Bitti (Zafer)** — Aç Olan / Elspeth'le birlikte adını yüzüne söyle / zar başarı.
- **Son Satır (Zafer)** — Aç Olan / Sunağa dokun ve adı defterdeki gibi oku / zar başarı.
- **Özgür Ruh (Zafer)** — Aç Olan / Elspeth'i besleyen zinciri kır / zar başarı.
- **Bir Yüzyıl Daha (Buruk son)** — Aç Olan / Sunağın etrafına tuz ve gümüş çemberi çek / zar başarı.
- **Kül ve Şafak (Zafer)** — Aç Olan / Sunak kapağını kaydır, gerçek bedeni ortaya çıkar / zar başarı.
- **Birlikte (Zafer)** — Aç Olan / Hep birlikte adını haykırın: "Morvaine, git!" / zar başarı.
- **Muhafızın Yemini (Buruk son)** — Aç Olan / Teklifi kabul et: sen kal, diğerleri gitsin / zar başarı.
- **Yenilenen Anlaşma (Yenilgi)** — Aç Olan / Varlığı sakinleştirmek için taçlı fısıltı ritüelini uygula / zar başarı.
- **Sönen Kandil (Zafer)** — Aç Olan / Adını birlikte söyleyip sunağın tek kandilini söndür / zar başarı.
- **Bedeli Ödendi (Buruk son)** — Son Direniş / Elspeth'in elini tutun ve son kez adını haykırın / zar başarı.
- **Aç Olan Doydu (Yenilgi)** — Son Direniş / Elspeth'in elini tutun ve son kez adını haykırın / zar başarısızlık; Son Direniş / Kalkanı kaldır ve gruba bir saniye kazandır / zar başarısızlık.
- **Gümüş Buhar (Buruk son)** — Son Direniş / Son şişeyi grubun üzerine dök ve kaçın / zar başarı.
- **Sessiz Mahzen (Yenilgi)** — Son Direniş / Son şişeyi grubun üzerine dök ve kaçın / zar başarısızlık.
- **Bir Saniye (Zafer)** — Son Direniş / Kalkanı kaldır ve gruba bir saniye kazandır / zar başarı.
- **Mavi Teslimiyet (Yenilgi)** — Son Direniş / Çatlağı kapatmak için mavi tacı tamamla / zar başarı.
- **Kapanan Çatlak (Yenilgi)** — Son Direniş / Çatlağı kapatmak için mavi tacı tamamla / zar başarısızlık.
- **Kırık Zincirin Bedeli (Buruk son)** — Son Direniş / Hiçbir işareti tamamlamadan zinciri birlikte kopar / zar başarı.
- **Dayanan Zincir (Yenilgi)** — Son Direniş / Hiçbir işareti tamamlamadan zinciri birlikte kopar / zar başarısızlık.

Karanlık Mahzen’de kaynakta 19 farklı adlandırılmış son var. Toplam grup HP’si sıfırlanırsa bu sonlardan bağımsız **Karanlık Kazandı (yenilgi)** uygulanır.

## Son görselleri için kısa fikirler

- **Kaçış:** kurtuluşun bir bedel bıraktığı, umut ve kaybın birlikte görüldüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Ninni Bitti:** tehdidin durduğu ve sabah/umut ışığının göründüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Son Satır:** tehdidin durduğu ve sabah/umut ışığının göründüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Özgür Ruh:** tehdidin durduğu ve sabah/umut ışığının göründüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Bir Yüzyıl Daha:** kurtuluşun bir bedel bıraktığı, umut ve kaybın birlikte görüldüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Kül ve Şafak:** tehdidin durduğu ve sabah/umut ışığının göründüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Birlikte:** tehdidin durduğu ve sabah/umut ışığının göründüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Muhafızın Yemini:** kurtuluşun bir bedel bıraktığı, umut ve kaybın birlikte görüldüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Yenilenen Anlaşma:** karanlığın kazandığı, grafik şiddet içermeyen kapanış anı. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Sönen Kandil:** tehdidin durduğu ve sabah/umut ışığının göründüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Bedeli Ödendi:** kurtuluşun bir bedel bıraktığı, umut ve kaybın birlikte görüldüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Aç Olan Doydu:** karanlığın kazandığı, grafik şiddet içermeyen kapanış anı. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Gümüş Buhar:** kurtuluşun bir bedel bıraktığı, umut ve kaybın birlikte görüldüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Sessiz Mahzen:** karanlığın kazandığı, grafik şiddet içermeyen kapanış anı. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Bir Saniye:** tehdidin durduğu ve sabah/umut ışığının göründüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Mavi Teslimiyet:** karanlığın kazandığı, grafik şiddet içermeyen kapanış anı. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Kapanan Çatlak:** karanlığın kazandığı, grafik şiddet içermeyen kapanış anı. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Kırık Zincirin Bedeli:** kurtuluşun bir bedel bıraktığı, umut ve kaybın birlikte görüldüğü an. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.
- **Dayanan Zincir:** karanlığın kazandığı, grafik şiddet içermeyen kapanış anı. Kaynak final metnindeki ayrıntı, bu genel fikrin önceliğidir.

## Bu bölümde kullanılacak kullanıcı görselleri

Bu görsel paketi senaryonun başlangıcından **Mühürlü Kapı → Avcı’nın “Eşiğe tuz çek, sonra kapıyı aç” seçeneğinin başarı sonucuna** kadar olan kısmı kapsar. Oyun ilk iki sahnede sağlanan görselleri gösterir; sonraki sahneler mevcut çizim yedeğini kullanır.

| Kaynak görsel | Sahne / sonuç | Uygulamadaki dosya |
|---|---|---|
| `images-e (22).jpg` | Karanlık Mahzen — ana sahne | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/scene.webp` |
| `images-e (21).jpg` | Dedektif tuzağı — başarı | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/dedektif_tuzagi_etkisizlestir_success.webp` |
| `images-e (20).jpg` | Dedektif tuzağı — başarısızlık | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/dedektif_tuzagi_etkisizlestir_fail.webp` |
| `images-e (19).jpg` | Medyum Elspeth ile konuşma — başarı | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/medyum_elspeth_ile_konus_success.webp` |
| `images-e (18).jpg` | Medyum Elspeth ile konuşma — başarısızlık | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/medyum_elspeth_ile_konus_fail.webp` |
| `images-e (17).jpg` | Bilgin kan mührü — başarı | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/bilgin_muhru_coz_success.webp` |
| `images-e (14).jpg` | Bilgin kan mührü — başarısızlık | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/bilgin_muhru_coz_fail.webp` |
| `images-e (15).jpg` | İzci gizli geçit — başarı | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/izci_gizli_gecidi_bul_success.webp` |
| `images-e (16).jpg` | İzci gizli geçit — başarısızlık | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/izci_gizli_gecidi_bul_fail.webp` |
| `images-e (13).jpg` | Fenerleri yakıp ilerle — başarı | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/fenerleri_yak_ve_ilerle_success.webp` |
| `images-e (12).jpg` | Fenerleri yakıp ilerle — başarısızlık | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/fenerleri_yak_ve_ilerle_fail.webp` |
| `images-e (11).jpg` | Mutfak kapağına dönme — başarı | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/merdivenden_geri_cekil_success.webp` |
| `images-e (7).jpg` | Mutfak kapağına dönme — başarısızlık | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/merdivenden_geri_cekil_fail.webp` |
| `images-e (2).jpg` | Feneri taçlı oyuğa koyma — başarı | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/mahzen_taca_fener_success.webp` |
| `images-e (8).jpg` | Feneri taçlı oyuğa koyma — başarısızlık | `/client/public/story-art/mahzen/mahzen_01_karanlik_mahzen/mahzen_taca_fener_fail.webp` |
| `images-e (6).jpg` | Mühürlü Kapı — ana sahne | `/client/public/story-art/mahzen/mahzen_02_muhurlu_kapi/scene.webp` |
| `images-e (5).jpg` | Tamirci mandalı kaldırma — başarı | `/client/public/story-art/mahzen/mahzen_02_muhurlu_kapi/tamirci_mandali_kaldir_success.webp` |
| `images-e (4).jpg` | Tamirci mandalı kaldırma — başarısızlık | `/client/public/story-art/mahzen/mahzen_02_muhurlu_kapi/tamirci_mandali_kaldir_fail.webp` |
| `images-e (3).jpg` | Dedektif anahtar bulma — başarı | `/client/public/story-art/mahzen/mahzen_02_muhurlu_kapi/dedektif_anahtari_bul_success.webp` |
| `images-e (9).jpg` | Dedektif anahtar bulma — başarısızlık | `/client/public/story-art/mahzen/mahzen_02_muhurlu_kapi/dedektif_anahtari_bul_fail.webp` |
| `images-e (1).jpg` | Avcı tuz çizgisi — başarı | `/client/public/story-art/mahzen/mahzen_02_muhurlu_kapi/avci_tuz_cizgisi_success.webp` |
| `images-e (10).jpg` | Avcı tuz çizgisi — başarısızlık | `/client/public/story-art/mahzen/mahzen_02_muhurlu_kapi/avci_tuz_cizgisi_fail.webp` |

Görseller 22 adet WebP varlığı olarak projeye alındı. Uygulamadaki sahne ve sonuç bileşenleri bu dosyaları ID üzerinden eşler. Kaynak dosyalardaki resim içi yazılar okunabilir oyun talimatı sayılmaz; sahne görselinin bir parçası olarak kalır.

## Görsel envanteri kontrolü

- [ ] 11 ana sahne görseli.
- [ ] 67 eylemin her biri için 1 ayrı başarı ve 1 ayrı başarısızlık görseli (134 kare).
- [ ] Aynı hedef düğüme ulaşan farklı olaylar ayrı çizildi.
- [ ] Ters taç, mekânlar, fenerler ve Elspeth’in tasarımı tutarlı.
- [ ] Her sonuç doğru HP etkisi ve hedef sahne/final ile eşleşiyor.
- [ ] Görsellerde yazı, UI, logo ve filigran yok.

**AI için son talimat:** Bu belgeyi baştan sona izle. İlk kare mutfak kapağı ve on üç basamaktan oluşan Karanlık Mahzen olmalı. Her sahne için bir ortam resmi, her eylem için iki ayrı sonuç resmi üret. Başarı/başarısızlık olay metnini ve hedef sahneyi aynen takip et. Farklı eylemlerin sonuç karelerini birleştirme. Dosya adlarını `scene-art/mahzen/<node_id>/scene.webp` ve `scene-art/mahzen/<node_id>/<action_id>_success.webp` / `_fail.webp` biçiminde kaydet. Üretim sonunda beklenen ve üretilen dosya listesini karşılaştırıp eksikleri raporla.
