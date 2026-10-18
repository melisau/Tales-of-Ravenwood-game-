import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import type { ServerToClientEvents } from '../../shared/types';
import { GamePhase } from '../../shared/types';
import { GameError } from '../src/core/errors';
import { RoomManager, type Transport } from '../src/core/RoomManager';
import type { Clock } from '../src/engine/GameEngine';
import { StoryRepository } from '../src/story/StoryRepository';

const storyDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../story');

// ───────── Sahte transport: socket.io yerine hangi socket'e ne gittiğini kaydeder ─────────
type Sent = { to: string; event: keyof ServerToClientEvents; payload: unknown };
function fakeTransport() {
  const channels = new Map<string, Set<string>>();
  const log: Sent[] = [];
  const t: Transport = {
    emitToChannel: (ch, event, ...args) => {
      for (const sid of channels.get(ch) ?? []) log.push({ to: sid, event, payload: args[0] });
    },
    emitToSocket: (sid, event, ...args) => log.push({ to: sid, event, payload: args[0] }),
    joinChannel: (sid, ch) => void (channels.get(ch) ?? channels.set(ch, new Set()).get(ch)!).add(sid),
    leaveChannel: (sid, ch) => void channels.get(ch)?.delete(sid),
  };
  return { t, log, received: (sid: string, event: string) => log.filter((l) => l.to === sid && l.event === event) };
}

// ───────── Elle ilerletilen saat ─────────
function fakeClock() {
  let now = 1_000_000;
  let seq = 0;
  const timers = new Map<number, { at: number; fn: () => void }>();
  const clock: Clock = {
    now: () => now,
    setTimeout: (fn, ms) => (timers.set(++seq, { at: now + ms, fn }), seq),
    clearTimeout: (h) => void timers.delete(h as number),
  };
  const advance = (ms: number) => {
    now += ms;
    for (const [id, t] of [...timers].sort((a, b) => a[1].at - b[1].at)) {
      if (t.at <= now && timers.has(id)) {
        timers.delete(id);
        t.fn();
      }
    }
  };
  return { clock, advance };
}

async function setup(rolls: number[], startNodeId = 'mahzen_01_karanlik_mahzen') {
  const story = await StoryRepository.loadFromDir(storyDir, { strict: true });
  const { t, log, received } = fakeTransport();
  const { clock, advance } = fakeClock();
  const queue = [...rolls];
  const manager = new RoomManager({
    transport: t,
    clock,
    reconnectGraceMs: 30_000,
    emptyRoomTtlMs: 600_000,
    engineDeps: {
      story,
      rollD20: () => queue.shift() ?? 10,
      startNodeId,
      basePlayerHp: 10,
      timers: { sceneTextMs: 60_000, privateChoicesMs: 30_000, discussionMs: 90_000, diceRollMs: 30_000, sceneResultMs: 10_000 },
    },
  });
  return { manager, log, received, advance };
}

test('story JSON şemaya uyuyor', async () => {
  const story = await StoryRepository.loadFromDir(storyDir, { strict: false });
  const node = story.get('mahzen_01_karanlik_mahzen')!;
  assert.ok(Object.keys(node.class_hints).length >= 4);
  for (const a of node.actions) assert.ok(a.dice_dc >= 10 && a.dice_dc <= 15, `${a.action_id} DC aralık dışı`);
});

test('oda: 4 harfli kod, ilk giren Host, aynı sınıf iki kez seçilemez', async () => {
  const { manager } = await setup([]);
  const host = manager.createRoom('s1', 'Melis');
  assert.match(host.room.code, /^[A-Z]{4}$/);
  assert.equal(host.room.players[0]!.isHost, true);

  const guest = manager.join('s2', host.room.code.toLowerCase(), 'Ayşe'); // küçük harf de kabul
  assert.equal(guest.room.players.find((p) => p.id === guest.playerId)!.isHost, false);

  manager.selectClass('s1', 'Medyum');
  assert.throws(() => manager.selectClass('s2', 'Medyum'), (e: unknown) => e instanceof GameError && e.code === 'CLASS_TAKEN');
  manager.selectClass('s2', 'Dedektif');
  assert.throws(() => manager.start('s2'), (e: unknown) => e instanceof GameError && e.code === 'NOT_HOST');
});

test('tam akış: asimetrik ipuçları, oylama, zar, sonuç, sonraki sahne', async () => {
  const { manager, received, advance } = await setup([17]);
  const { room } = manager.createRoom('s1', 'Melis');
  manager.join('s2', room.code, 'Ayşe');
  manager.join('s3', room.code, 'Can');
  manager.selectClass('s1', 'Medyum');
  manager.selectClass('s2', 'Dedektif');
  manager.selectClass('s3', 'Muhafız'); // bu sahnede ipucu yok

  manager.start('s1');

  // Herkes aynı genel metni alır
  for (const s of ['s1', 's2', 's3']) {
    const st = received(s, 'room:state').at(-1)!.payload as { phase: string; scene: { title: string } };
    assert.equal(st.phase, GamePhase.SCENE_TEXT);
    assert.equal(st.scene.title, 'Karanlık Mahzen');
  }
  // Gizli ipuçları: sadece kendi socket'ine, sadece kendi sınıfınınki
  const h1 = received('s1', 'scene:hint');
  const h2 = received('s2', 'scene:hint');
  const h3 = received('s3', 'scene:hint');
  assert.equal(h1.length, 1);
  assert.match((h1[0]!.payload as { hint: string }).hint, /Elspeth/);
  assert.match((h2[0]!.payload as { hint: string }).hint, /kıl tel/);
  assert.equal((h3[0]!.payload as { hint: string | null }).hint, null);
  // Hiçbir genel yayın ipucu metni sızdırmamalı
  const leaked = received('s3', 'room:state').some((l) => JSON.stringify(l.payload).includes('kıl tel'));
  assert.equal(leaked, false, 'ipucu genel state içine sızdı');

  // Odada olmayan sınıfın aksiyonu (Bilgin) görünmemeli; 3 oyuncuda DC %15 düşer
  const scene = (received('s1', 'room:state').at(-1)!.payload as { scene: { actions: { action_id: string; dc: number }[] } }).scene;
  assert.ok(!scene.actions.some((a) => a.action_id === 'bilgin_muhru_coz'));
  assert.equal(scene.actions.find((a) => a.action_id === 'medyum_elspeth_ile_konus')!.dc, 10); // 12 → 10

  // Sahnede görünmeyen (odada sınıfı olmayan) aksiyona oy verilemez
  manager.advance('s1'); // → PRIVATE_CHOICES
  assert.throws(() => manager.submitChoice('s3', 'bilgin_muhru_coz'), (e: unknown) => e instanceof GameError && e.code === 'NOT_ALLOWED');
  assert.deepEqual((h1[0]!.payload as { ownActionIds: string[] }).ownActionIds, ['medyum_elspeth_ile_konus']);

  manager.submitChoice('s1', 'medyum_elspeth_ile_konus');
  manager.submitChoice('s2', 'fenerleri_yak_ve_ilerle');
  manager.submitChoice('s3', 'fenerleri_yak_ve_ilerle'); // herkes seçti → otomatik tartışma
  let st = received('s1', 'room:state').at(-1)!.payload as { phase: string; phaseEndsAt: number };
  assert.equal(st.phase, GamePhase.DISCUSSION_TIMER);

  // Tartışmada fikir değişikliği: Dedektif Medyum'un aksiyonuna oy kaydırır (2-1)
  manager.submitChoice('s2', 'medyum_elspeth_ile_konus');
  advance(90_000); // 90 sn bitti → DICE_ROLL
  st = received('s1', 'room:state').at(-1)!.payload as never;
  const pending = (st as unknown as { pendingRoll: { rollerPlayerId: string; action_id: string } }).pendingRoll;
  assert.equal((st as { phase: string }).phase, GamePhase.DICE_ROLL);
  assert.equal(pending.action_id, 'medyum_elspeth_ile_konus');

  // Yanlış kişi zar atamaz; Medyum atar (17 + 2 sınıf bonusu)
  assert.throws(() => manager.roll('s2'));
  const result = manager.roll('s1');
  assert.equal(result.total, 19);
  assert.equal(result.success, true);
  assert.equal(result.next_node_id, 'mahzen_03_elspeth_fisiltisi');
  assert.ok(received('s3', 'scene:result').length === 1);

  // Sonuç sonrası: 10 sn sonra sonraki sahneye geçilir, yeni gizli ipuçları gönderilir
  advance(10_000);
  st = received('s1', 'room:state').at(-1)!.payload as never;
  const s2 = st as unknown as { phase: string; sceneNumber: number; scene: { node_id: string }; players: { hp: number; maxHp: number }[] };
  assert.equal(s2.phase, GamePhase.SCENE_TEXT);
  assert.equal(s2.scene.node_id, 'mahzen_03_elspeth_fisiltisi');
  assert.equal(s2.sceneNumber, 2);
  assert.equal(received('s1', 'scene:hint').length, 2);
  assert.match((received('s1', 'scene:hint').at(-1)!.payload as { hint: string }).hint, /ilk heceyi/);
});

test('final: doğru hamle zafer sonuyla biter, Host lobiye döndürür', async () => {
  const { manager, received, advance } = await setup([20], 'mahzen_07_ac_olan');
  const { room } = manager.createRoom('s1', 'Melis');
  manager.join('s2', room.code, 'Ayşe');
  manager.selectClass('s1', 'Medyum');
  manager.selectClass('s2', 'Avcı');
  manager.start('s1');
  manager.advance('s1');
  manager.submitChoice('s1', 'hep_birlikte_adini_haykir');
  manager.submitChoice('s2', 'hep_birlikte_adini_haykir');
  manager.advance('s1');
  const r = manager.roll('s1');
  assert.equal(r.critical, 'NAT20');
  advance(10_000);
  const over = received('s2', 'game:over').at(-1)!.payload as { victory: boolean; type: string; title: string };
  assert.deepEqual([over.victory, over.type, over.title], [true, 'victory', 'Birlikte']);
  const st = received('s2', 'room:state').at(-1)!.payload as { phase: string; gameOver: { title: string } };
  assert.equal(st.phase, GamePhase.GAME_OVER);
  assert.equal(st.gameOver.title, 'Birlikte'); // sonradan bağlanan da sonu görür

  manager.advance('s1');
  assert.equal((received('s1', 'room:state').at(-1)!.payload as { phase: string }).phase, GamePhase.LOBBY);
});

test('final: son direnişte başarısızlık yenilgi sonuyla biter', async () => {
  const { manager, received, advance } = await setup([5], 'mahzen_08_son_direnis');
  const { room } = manager.createRoom('s1', 'Melis');
  manager.join('s2', room.code, 'Ayşe');
  manager.selectClass('s1', 'Bilgin');
  manager.selectClass('s2', 'İzci');
  manager.start('s1');
  manager.advance('s1');
  manager.advance('s1');
  manager.advance('s1'); // oy yok → ilk ANY aksiyon
  const r = manager.roll('s1');
  assert.equal(r.success, false);
  advance(10_000);
  const over = received('s1', 'game:over').at(-1)!.payload as { victory: boolean; type: string };
  assert.equal(over.victory, false);
  assert.equal(over.type, 'defeat');
});

test('başarısız zar ve 9+ oyuncuda hasar gruba dağıtılır; nat 1 her zaman başarısız', async () => {
  const { manager, received, advance } = await setup([1]);
  const classes = ['Medyum', 'Dedektif', 'Bilgin', 'Simyacı', 'İzci', 'Tamirci', 'Muhafız', 'Şifacı', 'Gizemci'] as const;
  const { room } = manager.createRoom('s0', 'P0');
  for (let i = 1; i < classes.length; i++) manager.join(`s${i}`, room.code, `P${i}`);
  classes.forEach((c, i) => manager.selectClass(`s${i}`, c));
  manager.start('s0');
  manager.advance('s0');
  manager.submitChoice('s0', 'fenerleri_yak_ve_ilerle'); // DC 15 → 18, fail: -3
  manager.advance('s0'); // → DISCUSSION
  manager.advance('s0'); // → DICE_ROLL
  const r = manager.roll('s0');
  assert.equal(r.critical, 'NAT1');
  assert.equal(r.success, false);
  assert.equal(r.dc, 18);
  const deltas = Object.values(r.hpDeltaByPlayer);
  assert.equal(deltas.reduce((s, v) => s + v, 0), -3);
  assert.equal(deltas.length, 3, '3 hasar 3 farklı oyuncuya dağılmalı');
  advance(10_000);
  const st = received('s0', 'room:state').at(-1)!.payload as { phase: string; scene: { node_id: string } | null };
  assert.equal(st.phase, GamePhase.SCENE_TEXT);
  assert.equal(st.scene?.node_id, 'mahzen_06_yanan_mahzen');
});

test('yeniden bağlanma: Host devri ve gizli ipucunun yeni socket e tekrar gönderilmesi', async () => {
  const { manager, received, advance } = await setup([10]);
  const host = manager.createRoom('s1', 'Melis');
  const guest = manager.join('s2', host.room.code, 'Ayşe');
  manager.selectClass('s1', 'Bilgin');
  manager.selectClass('s2', 'İzci');
  manager.start('s1');

  manager.handleDisconnect('s1'); // host düştü
  let st = received('s2', 'room:state').at(-1)!.payload as { players: { id: string; isHost: boolean; connected: boolean }[] };
  assert.equal(st.players.find((p) => p.id === guest.playerId)!.isHost, true);

  manager.rejoin('s1b', host.room.code, host.sessionToken);
  const hint = received('s1b', 'scene:hint');
  assert.equal(hint.length, 1);
  assert.match((hint[0]!.payload as { hint: string }).hint, /mühür dilinde/);

  // Zarcı bağlı değilse sunucu otomatik atar (oyun kilitlenmez)
  manager.advance('s2'); // yeni host
  manager.submitChoice('s1b', 'bilgin_muhru_coz');
  manager.submitChoice('s2', 'bilgin_muhru_coz'); // → DISCUSSION
  manager.advance('s2'); // → DICE_ROLL, zarcı Bilgin (s1b)
  manager.handleDisconnect('s1b');
  advance(3_000);
  st = received('s2', 'room:state').at(-1)!.payload as never;
  assert.equal((st as { phase: string }).phase, GamePhase.SCENE_RESULT);
});

test('lobide bağlantısı kopan oyuncunun sınıfı süre dolunca serbest kalır', async () => {
  const { manager, advance } = await setup([]);
  const { room } = manager.createRoom('s1', 'Melis');
  manager.join('s2', room.code, 'Ayşe');
  manager.selectClass('s2', 'Avcı');
  manager.handleDisconnect('s2');
  assert.throws(() => manager.selectClass('s1', 'Avcı'));
  advance(30_000);
  manager.selectClass('s1', 'Avcı');
  manager.shutdown();
});
