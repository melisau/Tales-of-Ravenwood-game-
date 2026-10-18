# 🦇 Tales of Ravenwood

2–12 oyunculu, aynı masada telefonlarla oynanan Cadılar Bayramı temalı co-op FRP.
Sunucu otoriterdir: zar, HP, faz geçişleri ve gizli ipuçları yalnızca sunucuda hesaplanır.

```
ravenwood/
├── shared/                 # Sunucu + istemci ortak kodu (tek doğruluk kaynağı)
│   ├── types.ts            # Veri tipleri, GamePhase enum, socket event sözleşmesi
│   ├── classes.ts          # 12 sınıf tanımı
│   └── scaling.ts          # Dinamik zorluk & zar dengeleme
├── story/                  # Bölüm 1: Karanlık Mahzen — 11 sahne, 13 son
│   ├── mahzen_01_karanlik_mahzen.json
│   ├── mahzen_02_06_derinlikler.json
│   └── mahzen_07_final.json
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
- **Geçiş tablosu.** Her faz değişikliği `stateMachine.ts`'deki tablodan geçer; her geçişte artan `epoch` sayacı, faz değişmişken tetiklenen eski timer'ların state bozmasını engeller.
- **Ölçekleme oyun başında sabitlenir.** Ortada biri düşerse DC değişmez.
- **Kilitlenme yok.** Her fazın bir süresi var; zarcı düşerse sunucu 3 sn sonra onun yerine atar; Host düşerse en eski bağlı oyuncu Host olur.

## Durum makinesi

```
LOBBY → SCENE_TEXT → PRIVATE_CHOICES → DISCUSSION_TIMER (90 sn) → DICE_ROLL → SCENE_RESULT ─┐
              ↑                                                                             │
              └──────────────────────────── next_node_id ───────────────────────────────────┤
                                                                                GAME_OVER ←─┘ → LOBBY
```

| Faz | Ne olur | Nasıl biter |
|---|---|---|
| `SCENE_TEXT` | Herkese genel metin (`room:state`), **her socket'e ayrı** `scene:hint` | Host `game:advance` ya da 60 sn |
| `PRIVATE_CHOICES` | Her oyuncu gizlice oy verir; herkese sadece `hasChosen` görünür | Herkes seçince ya da 30 sn |
| `DISCUSSION_TIMER` | Masada tartışma; oylar değiştirilebilir | 90 sn ya da Host |
| `DICE_ROLL` | En çok oy alan aksiyon seçilir. Sınıfa özel aksiyonu o sınıfın sahibi (+2 bonus), ANY aksiyonu ilk oy veren atar | Zarcı `dice:roll` ya da 30 sn |
| `SCENE_RESULT` | `scene:result` yayını, HP güncellemesi | 10 sn ya da Host |

Odada sahibi olmayan sınıf aksiyonları sahnede hiç gösterilmez; her düğümde en az bir `"required_class": "ANY"` aksiyonu şema tarafından zorunludur.

## Socket event'leri

**İstemci → Sunucu** (hepsi ack callback'li: `{ ok: true, data } | { ok: false, error, message }`)

| Event | Payload | Kim |
|---|---|---|
| `room:create` | `{ name }` | Herkes (yaratan Host olur) |
| `room:join` | `{ code, name }` | Lobi açıkken |
| `room:rejoin` | `{ code, sessionToken }` | Bağlantısı kopan |
| `room:leave` | — | |
| `class:select` / `class:release` | `{ classId }` / — | Lobide |
| `game:start` | — | Host, ≥2 oyuncu, herkes sınıf seçmiş |
| `game:advance` | — | Host |
| `choice:submit` | `{ actionId }` | Seçim/tartışma fazında |
| `dice:roll` | — | Sadece zarcı (o düşmüşse Host) |

**Sunucu → İstemci**

| Event | Hedef | İçerik |
|---|---|---|
| `room:state` | Oda | `PublicRoomState` — gizli veri içermez (testle doğrulandı) |
| `scene:hint` | **Tek socket** | `{ classId, hint, ownActionIds }` |
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

Sunucu ortam değişkenleri: `PORT`, `CORS_ORIGIN` (varsayılan her yer; internete açarken kısıtla), `STORY_DIR`, `START_NODE_ID`, `STRICT_STORY=false` (taslak yazarken kırık bağlantılara izin verir), süreler için `DISCUSSION_MS` vb. (`config.ts`).
İstemci: `VITE_SERVER_URL` (sunucu başka bir adresteyse).

### Yeni sahne yazmak

`story/` klasörüne JSON ekle (tek düğüm ya da dizi). Bir yol bitiyorsa `"next_node_id": null` ve `"ending": { "type": "victory" | "bittersweet" | "defeat", "title": "..." }` ver. `npm test` kırık bağlantıları, ulaşılamayan sahneleri ve sona varılamayan yolları yakalar.

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
