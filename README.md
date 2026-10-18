# 🦇 Tales of Ravenwood

2–12 oyunculu, aynı masada telefonlarla oynanan Cadılar Bayramı temalı FRP.
Sunucu otoriterdir: zar, HP, faz geçişleri ve gizli ipuçları yalnızca sunucuda hesaplanır.

## Blackthorne Konağı maceraları

Host lobide macerayı seçer; seçim bütün oyunculara uygulanır. Üç macera da
birlikte hayatta kal veya Gizli Hain modunda oynanabilir.

| Macera | Sahne | Adlandırılmış son | Konu |
|---|---:|---:|---|
| Karanlık Mahzen | 11 | 19 | Elspeth, kan mühürleri ve konağın eski anlaşması |
| Yankı Mağaraları | 6 | 12 | Kayıp bekçi, adları saklayan su ve sesleri taklit eden mağara |
| On Üçüncü Nota | 6 | 13 | Ada’nın anısı, müzik kutusu ve aynı geceye hapsolmuş konak |

Toplam 23 sahne ve 44 adlandırılmış son vardır. Her sahnede, odadaki sınıflardan
bağımsız en az üç herkese açık seçenek bulunur; sınıfa özel seçenekler bunlara
eklenir. Her oyunda bütün sahneler görülmez.

Hain, kendi gizli bağlılık kartında **Karanlığın bu sahnedeki fısıltısı** bölümünü
görür: işaretin neyi tetiklediği, neden kötü güce yaradığı ve savunması istenen
seçenekler yalnızca ona gönderilir. Maceracılar kendi sınıf ipuçlarını görür.
Zarın başarılı olması hamlenin iyi olduğu anlamına gelmez: bir çağrı ritüelinin
başarıyla yapılması hikâyeyi yenilgiyle bitirip haine kazandırabilir.

## Genel müzik ve sahne atmosferleri

Üstteki **Sesi aç** düğmesiyle oynatmayı başlatın; varsayılan kapalıdır.
Genel arka plan müziği ile sahne atmosferi iki ayrı döngü halinde karıştırılır.
Sahne değiştiğinde atmosfer değişir, genel müzik devam eder. Lobide ve finalde
çalma durur. Ses seviyesi ayarlanabilir; aynı masada tek telefondan açılması
önerilir. Tarayıcı oynatmayı engellerse kontrol alanında tekrar açma mesajı görünür.
Ses, gizli rolü ele verecek kişisel efektler içermez; bütün önemli bilgiler metinde de vardır.

| Kullanıcının sağladığı dosya | Oyundaki kullanım |
|---|---|
| `idoberg-creepy-halloween-bells-loop-.mp3` | Bütün maceralarda genel arka plan |
| `cave-wind-.mp3` | Mağarada dolaşma ve hava akımı sahneleri |
| `scary-cave.mp3` | Tehlikeli mağara ve kötü gücün odaları |
| `droplets-in-a-cave.mp3` | Damla galerisi, sarnıç ve damlalı mahzen |
| `scary-music-box-.mp3` | Müzik kutusu ve ona bağlı mekanizma/ayna sahneleri |

Ses dosyaları `client/public/audio/` içindedir. Dosya eşlemeleri `shared/audio.ts`,
macera kataloğu `shared/adventures.ts` dosyasındadır. Hikâyedeki `ambience` alanı
sahne atmosferini belirler; alan yoksa yalnızca genel müzik çalar.

## Oyun modları ve gizli bağlılık

- **Birlikte hayatta kal (2–12 kişi):** Herkes maceracıdır. Zafer veya buruk son
  birlikte başarı, yenilgi birlikte kayıptır.
- **Gizli Hain (4–12 kişi):** Host lobide bu modu seçer. Sunucu oyun başında
  rastgele tam bir kişiyi karanlığın hizmetkârı yapar; Host da seçilebilir.
  Sınıf seçimi değişmez. Bağlılık yalnızca oyuncunun kendi socket'ine gönderilir
  ve yeniden bağlanmada korunur; roller oyun sonunda açıklanır.
- Maceracılar zafer veya buruk sonda, hain ise yenilgide kazanır. Toplam canın
  sıfırlanması da yenilgidir. Hain bilgi saklayabilir, çarpıtabilir ve grubu
  tehlikeli seçeneklere ikna etmeye çalışabilir.
- Hainin oyun boyunca **iki laneti** vardır: tartışmada, sahne başına bir kez,
  sonraki zarın DC değerine +2 ekler (tavan 20). Kullanım geri alınmaz; doğal
  1/20 kuralları değişmez. Zar aşamasında artan DC görünür, kullanan açıklanmaz.
  Suçlama ile oyuncu çıkarma yoktur; karşı oyun ipuçlarını karşılaştırmak ve
  şüpheli önerilere oy vermemektir. Bu ilk sürümün dengesi masa testleriyle
  geliştirilebilir.

## Süresiz, onayla ilerleyen oyun

Okuma, seçim, tartışma ve sonuç aşamalarında **geri sayım ve otomatik geçiş yoktur**.
Her bağlı oyuncu “Hazırım” dediğinde bir sonraki aşamaya geçilir. Seçim aşamasında
önce oy vermek gerekir; yalnızca oy vermek aşamayı bitirmez. Oy değiştirmek
oyuncunun hazır onayını geri alır. Oyuncu onayını ayrıca geri çekebilir.
Host aşamaları tek başına atlayamaz. Zar ilgili oyuncu basınca atılır; bağlantısı
kopmuşsa Host onun yerine elle atabilir. Bağlantısı kopanlar hazır sayımına
katılmaz; kopma olayı kendi başına aşamayı değiştirmez, kalanlardan biri yeniden
onaylayabilir. Bağlı bir oyuncu onay vermezse oyun bekler.

```
ravenwood/
├── shared/                 # Sunucu + istemci ortak kodu (tek doğruluk kaynağı)
│   ├── types.ts            # Veri tipleri, GamePhase enum, socket event sözleşmesi
│   ├── classes.ts          # 12 sınıf tanımı
│   └── scaling.ts          # Dinamik zorluk & zar dengeleme
├── story/                  # Üç macera — toplam 23 sahne, 44 adlandırılmış son
│   ├── mahzen_01_karanlik_mahzen.json
│   ├── mahzen_02_06_derinlikler.json
│   └── mahzen_07_final.json
│   # Ayrıca: yanki_magaralari.json, on_ucuncu_nota.json
├── scripts/dev.mjs         # `npm run basla`: sunucu + uygulama + telefon adresi
├── server/                 # Node.js + Express + Socket.io (TypeScript)
│   └── src/
│       ├── index.ts                 # HTTP + socket.io kurulumu, /healthz, graceful shutdown
│       ├── config.ts                # Ortam değişkenleri, süreler
│       ├── core/Room.ts             # Oda verisi, Host, benzersiz sınıf kuralı
│       ├── core/RoomManager.ts      # Oda yaşam döngüsü, socket↔oyuncu eşleme, yeniden bağlanma
│       ├── core/roomCode.ts         # 4 harfli kod üretimi (I/O hariç)
│       ├── engine/stateMachine.ts   # İzinli faz geçiş tablosu
│       ├── engine/GameEngine.ts     # Faz mantığı, oylama, zar, hasar, asimetrik gönderim
│       ├── story/                   # Zod şeması + StoryRepository (yükle, doğrula, dondur)
│       └── net/                     # socket.io adaptörü, payload doğrulama, rate limit
└── client/                 # React + Vite + Tailwind (mobil öncelikli)
    └── src/
        ├── App.tsx                         # Ekran yönlendirme (sunucudaki faza göre)
        ├── state/useGame.ts                # Bağlantı, oda durumu, komutlar, yeniden bağlanma
        ├── net/socket.ts                   # socket.io bağlantısı + ack'li istek yardımcısı
        ├── screens/                        # Ana menü, Lobi, Oyun, Oyun Sonu
        ├── components/GuideScreen.tsx      # "Nasıl Oynanır" + "Karakterleri Tanı"
        ├── components/SecretCharacterScreen.tsx
        └── hooks/useCountdown.ts, useDiceRoll.ts
```

## Mimari kararlar

- **Transport soyutlaması.** `GameEngine` ve `RoomManager` socket.io'yu bilmez; `Transport` arayüzü üzerinden konuşur. Oyun mantığı sahte transport + sahte saatle milisaniyeler içinde test edilir; ileride Redis adapter ya da başka bir protokol eklemek tek dosyalık iştir.
- **Kalıcı oyuncu kimliği.** Oyuncu `playerId` + `sessionToken` ile tanınır, socket id ile değil. Telefon kilitlenip açıldığında `room:rejoin` aynı karaktere döner ve gizli ipucu yeni socket'e tekrar gönderilir.
- **Geçiş tablosu.** Her faz değişikliği `stateMachine.ts`'deki tablodan geçer; hazır isteklerindeki faz ve sahne numarası eski isteklerin yeni aşamayı atlatmasını engeller.
- **Ölçekleme oyun başında sabitlenir.** Ortada biri düşerse DC değişmez.
- **Oyuncu kontrolü.** Faz süreleri yoktur. Host düşerse en eski bağlı oyuncu Host olur; zarcı bağlı değilse Host elle zar atar.

## Durum makinesi

```
LOBBY → SCENE_TEXT → PRIVATE_CHOICES → DISCUSSION_TIMER (süresiz) → DICE_ROLL → SCENE_RESULT ─┐
              ↑                                                                             │
              └──────────────────────────── next_node_id ───────────────────────────────────┤
                                                                                GAME_OVER ←─┘ → LOBBY
```

| Faz | Ne olur | Nasıl biter |
|---|---|---|
| `SCENE_TEXT` | Herkese genel metin (`room:state`), **her socket'e ayrı** `scene:hint` | Her bağlı oyuncu hazır onayını verince |
| `PRIVATE_CHOICES` | Gizli oy; herkese sadece `hasChosen` ve hazır bilgisi görünür | Her bağlı oyuncu oyunu seçip hazır onayını verince |
| `DISCUSSION_TIMER` | Süresiz tartışma; oylar değiştirilebilir. Enum adı uyumluluk için korunur. | Her bağlı oyuncu hazır onayını verince |
| `DICE_ROLL` | Sınıfa özel aksiyonda sahibi (+2), ANY aksiyonda ilk oy veren atar | Zarcı `dice:roll`; zarcı bağlı değilse Host |
| `SCENE_RESULT` | `scene:result` yayını, HP güncellemesi | Her bağlı oyuncu hazır onayını verince |

Odada sahibi olmayan sınıf aksiyonları sahnede hiç gösterilmez; her düğümde en az üç `"required_class": "ANY"` aksiyonu şema tarafından zorunludur.

## Socket event'leri

**İstemci → Sunucu** (hepsi ack callback'li: `{ ok: true, data } | { ok: false, error, message }`)

| Event | Payload | Kim |
|---|---|---|
| `room:create` | `{ name }` | Herkes (yaratan Host olur) |
| `room:join` | `{ code, name }` | Lobi açıkken |
| `room:rejoin` | `{ code, sessionToken }` | Bağlantısı kopan |
| `room:leave` | — | |
| `class:select` / `class:release` | `{ classId }` / — | Lobide |
| `room:mode` | `{ mode: 'cooperative' \| 'betrayal' }` | Host, yalnızca lobide |
| `room:adventure` | `{ adventureId: 'mahzen' \| 'yankilar' \| 'on_ucuncu_nota' }` | Host, yalnızca lobide |
| `game:start` | — | Host, moda göre ≥2 veya ≥4 oyuncu, herkes sınıf seçmiş |
| `game:ready` | `{ ready, phase, sceneNumber }` | Okuma, seçim, tartışma, sonuç aşamalarında oyuncu |
| `game:advance` | — | Host, yalnızca oyun sonundan lobiye dönüş |
| `darkness:curse` | — | Hain, tartışmada, hakkı varsa ve bu sahnede kullanmadıysa |
| `choice:submit` | `{ actionId }` | Seçim/tartışma fazında |
| `dice:roll` | — | Sadece zarcı (o düşmüşse Host) |

**Sunucu → İstemci**

| Event | Hedef | İçerik |
|---|---|---|
| `room:state` | Oda | `PublicRoomState` — gizli veri içermez (testle doğrulandı) |
| `scene:hint` | **Tek socket** | `{ classId, hint, ownActionIds }` |
| `player:role` | **Tek socket** | `{ allegiance, cursesLeft, curseQueued }`; lobide sıfırlamak için `null` |
| `dice:rolling` | Oda | Diğer telefonlarda animasyon başlatmak için |
| `scene:result` | Oda | Ham zar, bonus, toplam, DC, kritik, oyuncu bazlı HP değişimi |
| `game:over` | Oda | `{ victory, reason }` |

## Dinamik zorluk (`shared/scaling.ts`)

```ts
scaleDifficulty(playerCount, baseDC) // → { finalDC, partyHPMultiplier, distributeDamage, tier, successChance }
```

| Oyuncu | DC | Başlangıç HP | Başarısızlık hasarı |
|---|---|---|---|
| 2–4 | ×0.85 (12 → 10) | ×1.3 (10 → 13) | Zarcıya |
| 5–8 | ×1.0 | ×1.0 | Zarcıya |
| 9–12 | ×1.2 (15 → 18) | ×1.0 | 1'er puan, zarcıdan başlayarak en sağlıklılara dağıtılır |

DC her zaman 2–20 aralığına kırpılır; nat 1 her zaman başarısız, nat 20 her zaman başarılı.

## Android Studio ve Android durumu

Bu sürüm mobil tarayıcıda çalışan bir web oyunudur (React + Vite istemcisi ve
Node.js + Socket.IO sunucusu). Depoda henüz Gradle projesi, Android uygulama
modülü veya APK üretimi bulunmuyor; Android Studio kurulması tek başına APK
oluşturmaz.

Android telefonda oynamak için aşağıdaki kurulum ve başlatma adımlarını izleyip
aynı Wi-Fi üzerindeki telefonun tarayıcısında terminalde verilen adresi açın.
Oyun sırasında Node.js sunucusu açık kalmalıdır. Android uygulaması olarak
paketlemek için ayrıca bir Android istemcisi veya Capacitor entegrasyonu gerekir;
çok oyunculu oyun sunucusu yine ayrı çalışır.

## Kurulum (ilk sefer)

1. **Node.js 20+** kur: https://nodejs.org → "LTS". Terminalde `node -v` sürüm göstermeli.
2. Zip'i aç, terminalde `ravenwood` klasörüne gir.
3. Paketleri kur (bir kez, internet gerekir):
   ```bash
   npm run kur
   ```

## Oynamak

```bash
npm run basla
```

Ekranda şuna benzer bir kutu çıkar:

```
  🦇  Tales of Ravenwood hazır!
  Bu bilgisayardan:   http://localhost:5173
  Telefonlardan (aynı Wi-Fi):
                      http://192.168.1.20:5173
```

- Herkes telefonundan **"Telefonlardan"** satırındaki adrese girer (bilgisayar ve telefonlar aynı Wi-Fi'de olmalı).
- Biri **Oda Kur** der, ekrandaki 4 harfli kodu söyler; diğerleri kodu girip **Katıl** der.
- Herkes sınıfını seçer, Host **Geceyi Başlat**'a basar.
- Kapatmak için terminalde **Ctrl + C**. Terminal kapanırsa oyun da kapanır.

**Telefon bağlanamıyorsa:** Windows ilk açılışta "Güvenlik Duvarı: Node.js'e izin ver" sorabilir; **Özel ağlar**'ı işaretleyip izin ver. Misafir/okul Wi-Fi'leri cihazların birbirini görmesini engelleyebilir; o zaman bir telefonun hotspot'una herkes bağlansın.

## Geliştiriciler için

```bash
npm test                                                      # sunucu + hikaye ağacı testleri
cd server && npm run typecheck && npm run build && npm start  # production sunucu
cd client && npm run build                                    # dist/ (Vercel/Netlify'a yüklenebilir)
```

Sunucu ortam değişkenleri: `PORT`, `CORS_ORIGIN` (varsayılan her yer; internete açarken kısıtla), `STORY_DIR`, `START_NODE_ID`, `STRICT_STORY=false` (taslak yazarken kırık bağlantılara izin verir). Aşama süreleri kaldırılmıştır; eski `DISCUSSION_MS`, `SCENE_TEXT_MS` vb. ayarlar kullanılmaz. Bağlantı ve boş oda temizliği süreleri `config.ts` içindedir.
İstemci: `VITE_SERVER_URL` (sunucu başka bir adresteyse).

### Yeni sahne yazmak

`story/` klasörüne JSON ekle (tek düğüm ya da dizi). Her sahnede en az üç `ANY` seçeneği bulunmalı. `darkness: { hint, favored_action_ids }` alanında hainin gizli işaret bilgisini yaz; önerilen eylemler herkese açık seçeneklere işaret etmelidir. Atmosfer için `ambience` alanını `cave_wind`, `scary_cave`, `droplets` veya `music_box` olarak ver. Bir yol bitiyorsa `"next_node_id": null` ve `"ending": { "type": "victory" | "bittersweet" | "defeat", "title": "..." }` ver. Yeni bağımsız macerayı `shared/adventures.ts` kataloğuna ekle. `npm test` kırık bağlantıları, erişilemeyen sahneleri, çıkmazları ve ses dosyalarını kontrol eder.

### İstemci bağlantısı (örnek)

```tsx
const socket = io(SERVER_URL);
const [hint, setHint] = useState<PrivateHintPayload | null>(null);
const [state, setState] = useState<PublicRoomState | null>(null);
useEffect(() => {
  socket.on('room:state', setState);
  socket.on('scene:hint', setHint);
  return () => { socket.off('room:state', setState); socket.off('scene:hint', setHint); };
}, []);

const me = state?.players.find(p => p.id === myPlayerId);
<SecretCharacterScreen
  characterClass={me.classId} classSigil={CLASSES[me.classId].sigil} playerName={me.name}
  hp={me.hp} maxHp={me.maxHp}
  phaseEndsAt={state.phaseEndsAt} totalSeconds={90}
  secretHint={hint?.hint ?? null}
  canRoll={state.phase === 'DICE_ROLL' && state.pendingRoll?.rollerPlayerId === myPlayerId}
  dc={state.pendingRoll?.dc}
  requestRoll={() => new Promise((res, rej) =>
    socket.emit('dice:roll', r => r.ok ? res(r.data) : rej(new Error(r.message))))}
/>
```

### Başlangıç rehberi

`GuideScreen` iki sekmelidir: **Nasıl Oynanır** (8 adımlık oyun akışı, zar kuralları, grup büyüklüğü tablosu) ve **Karakterleri Tanı** (12 sınıf; her kartta görevi, gizli ipucunda ne gördüğü, hangi anlarda +2 bonusla zar attığı ve masa tavsiyesi). Sınıflar Görenler / Bilenler / Yapanlar / Koruyanlar olarak gruplanır. Tüm metin `shared/classes.ts`'den gelir.

```tsx
// Ana menüde: sadece okuma
<GuideScreen onContinue={() => navigate('/join')} />
// Lobide: kartlardan sınıf seçilir, alınmış sınıflar kilitli görünür
<GuideScreen initialTab="classes" takenClasses={state.takenClasses} mySelectedClass={me.classId}
  onSelectClass={(classId) => socket.emit('class:select', { classId }, ack)} />
```

Fontlar için `index.html`'e: `Cinzel` ve `IM Fell English` (Google Fonts). Bileşen Tailwind v4 ile config dosyası gerektirmeden çalışır.

## Production'a çıkarken

- Birden fazla sunucu instance'ı için oda state'i bellekte tutulduğundan **sticky session** gerekir (ya da `RoomManager` arkasına Redis tabanlı bir store).
- `/healthz` oda ve bağlı socket sayısını döndürür; load balancer health check'ine bağlayın.
