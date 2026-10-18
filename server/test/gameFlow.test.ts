import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import type { PublicRoomState, ServerToClientEvents, PrivateRole, GameOverInfo } from '../../shared/types';
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

async function setup(rolls: number[], startNodeId = 'mahzen_01_karanlik_mahzen', chooseTraitorIndex?: (n: number) => number) {
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
      chooseTraitorIndex,
      rollD20: () => queue.shift() ?? 10,
      startNodeId,
      basePlayerHp: 10,
    },
  });
  const progress = (socketId: string) => {
    const state = received(socketId, 'room:state').at(-1)!.payload as PublicRoomState;
    if (state.phase === GamePhase.GAME_OVER) return manager.advance(socketId);
    // All recipients of the latest broadcast are the currently connected sockets.
    const sockets = [...new Set(log.filter((p) => p.event === 'room:state' && p.payload === state).map((p) => p.to))];
    for (const sid of sockets) manager.ready(sid, { ready: true, phase: state.phase, sceneNumber: state.sceneNumber });
  };
  return { manager, log, received, advance, progress };
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
  const { manager, received, advance, progress } = await setup([17]);
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
  progress('s1'); // Everyone finished reading → PRIVATE_CHOICES
  assert.throws(() => manager.submitChoice('s3', 'bilgin_muhru_coz'), (e: unknown) => e instanceof GameError && e.code === 'NOT_ALLOWED');
  assert.deepEqual((h1[0]!.payload as { ownActionIds: string[] }).ownActionIds, ['medyum_elspeth_ile_konus']);

  manager.submitChoice('s1', 'medyum_elspeth_ile_konus');
  manager.submitChoice('s2', 'fenerleri_yak_ve_ilerle');
  manager.submitChoice('s3', 'fenerleri_yak_ve_ilerle');
  progress('s1'); // Everyone explicitly confirms their choice
  let st = received('s1', 'room:state').at(-1)!.payload as { phase: string; phaseEndsAt: number };
  assert.equal(st.phase, GamePhase.DISCUSSION_TIMER);

  // Tartışmada fikir değişikliği: Dedektif Medyum'un aksiyonuna oy kaydırır (2-1)
  manager.submitChoice('s2', 'medyum_elspeth_ile_konus');
  advance(900_000);
  assert.equal((received('s1', 'room:state').at(-1)!.payload as PublicRoomState).phase, GamePhase.DISCUSSION_TIMER);
  progress('s1'); // Everyone is ready → DICE_ROLL
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
  progress('s1');
  st = received('s1', 'room:state').at(-1)!.payload as never;
  const s2 = st as unknown as { phase: string; sceneNumber: number; scene: { node_id: string }; players: { hp: number; maxHp: number }[] };
  assert.equal(s2.phase, GamePhase.SCENE_TEXT);
  assert.equal(s2.scene.node_id, 'mahzen_03_elspeth_fisiltisi');
  assert.equal(s2.sceneNumber, 2);
  assert.equal(received('s1', 'scene:hint').length, 2);
  assert.match((received('s1', 'scene:hint').at(-1)!.payload as { hint: string }).hint, /ilk heceyi/);
});

test('final: doğru hamle zafer sonuyla biter, Host lobiye döndürür', async () => {
  const { manager, received, progress } = await setup([20], 'mahzen_07_ac_olan');
  const { room } = manager.createRoom('s1', 'Melis');
  manager.join('s2', room.code, 'Ayşe');
  manager.selectClass('s1', 'Medyum');
  manager.selectClass('s2', 'Avcı');
  manager.start('s1');
  progress('s1');
  manager.submitChoice('s1', 'hep_birlikte_adini_haykir');
  manager.submitChoice('s2', 'hep_birlikte_adini_haykir');
  progress('s1');
  progress('s1');
  const r = manager.roll('s1');
  assert.equal(r.critical, 'NAT20');
  progress('s1');
  const over = received('s2', 'game:over').at(-1)!.payload as { victory: boolean; type: string; title: string };
  assert.deepEqual([over.victory, over.type, over.title], [true, 'victory', 'Birlikte']);
  const st = received('s2', 'room:state').at(-1)!.payload as { phase: string; gameOver: { title: string } };
  assert.equal(st.phase, GamePhase.GAME_OVER);
  assert.equal(st.gameOver.title, 'Birlikte'); // sonradan bağlanan da sonu görür

  manager.advance('s1');
  assert.equal((received('s1', 'room:state').at(-1)!.payload as { phase: string }).phase, GamePhase.LOBBY);
});

test('final: son direnişte başarısızlık yenilgi sonuyla biter', async () => {
  const { manager, received, progress } = await setup([5], 'mahzen_08_son_direnis');
  const { room } = manager.createRoom('s1', 'Melis');
  manager.join('s2', room.code, 'Ayşe');
  manager.selectClass('s1', 'Bilgin');
  manager.selectClass('s2', 'İzci');
  manager.start('s1');
  progress('s1');
  manager.submitChoice('s1', 'son_kez_haykir');
  manager.submitChoice('s2', 'son_kez_haykir');
  progress('s1');
  progress('s1');
  const r = manager.roll('s1');
  assert.equal(r.success, false);
  progress('s1');
  const over = received('s1', 'game:over').at(-1)!.payload as { victory: boolean; type: string };
  assert.equal(over.victory, false);
  assert.equal(over.type, 'defeat');
});

test('başarısız zar ve 9+ oyuncuda hasar gruba dağıtılır; nat 1 her zaman başarısız', async () => {
  const { manager, received, progress } = await setup([1]);
  const classes = ['Medyum', 'Dedektif', 'Bilgin', 'Simyacı', 'İzci', 'Tamirci', 'Muhafız', 'Şifacı', 'Gizemci'] as const;
  const { room } = manager.createRoom('s0', 'P0');
  for (let i = 1; i < classes.length; i++) manager.join(`s${i}`, room.code, `P${i}`);
  classes.forEach((c, i) => manager.selectClass(`s${i}`, c));
  manager.start('s0');
  progress('s0');
  classes.forEach((_, i) => manager.submitChoice(`s${i}`, 'fenerleri_yak_ve_ilerle')); // DC 15 → 18, fail: -3
  progress('s0'); // → DISCUSSION
  progress('s0'); // → DICE_ROLL
  const r = manager.roll('s0');
  assert.equal(r.critical, 'NAT1');
  assert.equal(r.success, false);
  assert.equal(r.dc, 18);
  const deltas = Object.values(r.hpDeltaByPlayer);
  assert.equal(deltas.reduce((s, v) => s + v, 0), -3);
  assert.equal(deltas.length, 3, '3 hasar 3 farklı oyuncuya dağılmalı');
  progress('s0');
  const st = received('s0', 'room:state').at(-1)!.payload as { phase: string; scene: { node_id: string } | null };
  assert.equal(st.phase, GamePhase.SCENE_TEXT);
  assert.equal(st.scene?.node_id, 'mahzen_06_yanan_mahzen');
});

test('yeniden bağlanma: Host devri ve gizli ipucunun yeni socket e tekrar gönderilmesi', async () => {
  const { manager, received, advance, progress } = await setup([10]);
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

  // Disconnected roller: time alone does nothing; the new host rolls explicitly.
  progress('s2');
  manager.submitChoice('s1b', 'bilgin_muhru_coz');
  manager.submitChoice('s2', 'bilgin_muhru_coz');
  progress('s2');
  progress('s2'); // → DICE_ROLL, zarcı Bilgin (s1b)
  manager.handleDisconnect('s1b');
  advance(3_000);
  assert.equal((received('s2', 'room:state').at(-1)!.payload as PublicRoomState).phase, GamePhase.DICE_ROLL);
  manager.roll('s2');
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

test('süreler aşamaları değiştirmez; hazır onayı zorunludur ve eski onay yeni aşamaya taşınmaz', async (t) => {
  const { manager, received, advance, progress } = await setup([20]);
  t.after(() => manager.shutdown());
  const host = manager.createRoom('s1', 'Host');
  manager.join('s2', host.room.code, 'Konuk');
  manager.selectClass('s1', 'Medyum');
  manager.selectClass('s2', 'Bilgin');
  manager.start('s1');
  const state = () => received('s1', 'room:state').at(-1)!.payload as PublicRoomState;
  const read = { ready: true, phase: GamePhase.SCENE_TEXT, sceneNumber: 1 };
  advance(24 * 60 * 60_000);
  assert.equal(state().phase, GamePhase.SCENE_TEXT);
  assert.equal(state().phaseEndsAt, null);
  assert.throws(() => manager.advance('s1'), GameError, 'Host cannot skip consent');
  manager.ready('s1', read);
  assert.equal(state().phase, GamePhase.SCENE_TEXT);
  manager.ready('s2', read);
  assert.equal(state().phase, GamePhase.PRIVATE_CHOICES);
  assert.ok(state().players.every((p) => !p.ready));
  assert.throws(() => manager.ready('s1', read), GameError, 'late request must not confirm the next phase');
  assert.throws(() => manager.ready('s1', { ...read, phase: GamePhase.PRIVATE_CHOICES }), GameError, 'choice required');
  manager.submitChoice('s1', 'medyum_elspeth_ile_konus');
  manager.submitChoice('s2', 'medyum_elspeth_ile_konus');
  advance(24 * 60 * 60_000);
  assert.equal(state().phase, GamePhase.PRIVATE_CHOICES, 'votes alone do not advance');
  const voteReady = { ...read, phase: GamePhase.PRIVATE_CHOICES };
  manager.ready('s1', voteReady);
  manager.ready('s1', { ...voteReady, ready: false });
  assert.equal(state().players.find((p) => p.id === host.playerId)!.ready, false);
  manager.ready('s1', voteReady);
  manager.submitChoice('s1', 'fenerleri_yak_ve_ilerle');
  assert.equal(state().players.find((p) => p.id === host.playerId)!.ready, false, 'changed vote revokes readiness');
  manager.submitChoice('s1', 'medyum_elspeth_ile_konus');
  progress('s1');
  advance(24 * 60 * 60_000);
  assert.equal(state().phase, GamePhase.DISCUSSION_TIMER);
  progress('s1');
  advance(24 * 60 * 60_000);
  assert.equal(state().phase, GamePhase.DICE_ROLL);
  manager.roll('s1');
  advance(24 * 60 * 60_000);
  assert.equal(state().phase, GamePhase.SCENE_RESULT);
  progress('s1');
  assert.equal(state().sceneNumber, 2);
  assert.throws(() => manager.ready('s1', read), GameError, 'old scene confirmation must be rejected');
});

test('hain modu: Host ayarı, minimum oyuncu, tek gizli rol ve yeniden bağlanma', async (t) => {
  const { manager, received, log, progress } = await setup([20], undefined, () => 1);
  t.after(() => manager.shutdown());
  const host = manager.createRoom('s0', 'Host');
  const joins = [host, manager.join('s1', host.room.code, 'P1'), manager.join('s2', host.room.code, 'P2')];
  assert.throws(() => manager.setMode('s1', 'betrayal'), GameError);
  manager.setMode('s0', 'betrayal');
  const classes = ['Medyum', 'Bilgin', 'Dedektif', 'Şifacı'] as const;
  classes.slice(0, 3).forEach((c, i) => manager.selectClass(`s${i}`, c));
  assert.throws(() => manager.start('s0'), (e: unknown) => e instanceof GameError && e.code === 'NOT_ENOUGH_PLAYERS');
  joins.push(manager.join('s3', host.room.code, 'P3'));
  manager.selectClass('s3', classes[3]);
  manager.start('s0');
  const role = (sid: string) => received(sid, 'player:role').at(-1)!.payload as PrivateRole;
  assert.deepEqual(joins.map((_, i) => role(`s${i}`).allegiance), ['adventurers', 'darkness', 'adventurers', 'adventurers']);
  assert.equal(role('s1').cursesLeft, 2);
  assert.throws(() => manager.setMode('s0', 'cooperative'), GameError);
  assert.throws(() => manager.curse('s1'), GameError, 'curse only during discussion');
  progress('s0');
  joins.forEach((_, i) => manager.submitChoice(`s${i}`, 'medyum_elspeth_ile_konus'));
  progress('s0');
  assert.throws(() => manager.curse('s0'), GameError, 'adventurers cannot curse');
  const before = log.length;
  manager.curse('s1');
  assert.deepEqual(log.slice(before).map((p) => [p.to, p.event]), [['s1', 'player:role']], 'curse ack must not broadcast the owner');
  assert.throws(() => manager.curse('s1'), GameError, 'one curse per scene');
  manager.handleDisconnect('s1');
  manager.rejoin('s1-new', host.room.code, joins[1]!.sessionToken);
  assert.deepEqual(role('s1-new'), { allegiance: 'darkness', cursesLeft: 1, curseQueued: true });
  for (const packet of log.filter((p) => p.event === 'room:state')) {
    const serialized = JSON.stringify(packet.payload);
    assert.ok(!/allegiance|cursesLeft|curseQueued|traitorPlayerId/.test(serialized), 'private role data leaked');
  }
  progress('s0');
  const result = manager.roll('s0');
  assert.equal(result.darknessPenalty, 2);
  assert.equal(result.dc, 12); // 12 * 0.85 => 10, then curse +2
  assert.equal(result.success, true, 'natural 20 still wins');
  progress('s0');
  assert.deepEqual(role('s1-new'), { allegiance: 'darkness', cursesLeft: 1, curseQueued: false });
  progress('s0');
  const st = received('s0', 'room:state').at(-1)!.payload as PublicRoomState;
  const action = st.scene!.actions.find((a) => a.required_class === 'ANY')!.action_id;
  for (const sid of ['s0', 's1-new', 's2', 's3']) manager.submitChoice(sid, action);
  progress('s0');
  manager.curse('s1-new');
  assert.equal(role('s1-new').cursesLeft, 0);
  assert.throws(() => manager.curse('s1-new'), GameError);
});

for (const scenario of [
  { start: 'mahzen_07_ac_olan', action: 'hep_birlikte_adini_haykir', roll: 20, type: 'victory', side: 'adventurers' },
  { start: 'mahzen_08_son_direnis', action: 'son_kez_haykir', roll: 20, type: 'bittersweet', side: 'adventurers' },
  { start: 'mahzen_08_son_direnis', action: 'son_kez_haykir', roll: 1, type: 'defeat', side: 'darkness' },
] as const) {
  test(`hain modu finali: ${scenario.type}, kazanan ${scenario.side}; roller sıfırlanır`, async (t) => {
    let round = 0;
    const { manager, received, progress } = await setup([scenario.roll], scenario.start, () => round++ % 4);
    t.after(() => manager.shutdown());
    const host = manager.createRoom('s0', 'Host');
    const classes = ['Medyum', 'Bilgin', 'Dedektif', 'Şifacı'] as const;
    for (let i = 1; i < 4; i++) manager.join(`s${i}`, host.room.code, `P${i}`);
    classes.forEach((c, i) => manager.selectClass(`s${i}`, c));
    manager.setMode('s0', 'betrayal');
    manager.start('s0');
    progress('s0');
    for (let i = 0; i < 4; i++) manager.submitChoice(`s${i}`, scenario.action);
    progress('s0');
    progress('s0');
    manager.roll('s0');
    progress('s0');
    const over = received('s0', 'game:over').at(-1)!.payload as GameOverInfo;
    assert.equal(over.type, scenario.type);
    assert.deepEqual(over.betrayal, { winningSide: scenario.side, traitorPlayerId: host.playerId });
    manager.advance('s0');
    for (let i = 0; i < 4; i++) assert.equal(received(`s${i}`, 'player:role').at(-1)!.payload, null);
    manager.start('s0');
    assert.equal((received('s0', 'player:role').at(-1)!.payload as PrivateRole).allegiance, 'adventurers');
    assert.equal((received('s1', 'player:role').at(-1)!.payload as PrivateRole).allegiance, 'darkness');
    assert.equal((received('s1', 'player:role').at(-1)!.payload as PrivateRole).cursesLeft, 2);
  });
}

test('lanet zarı başarısızlığa çevirebilir ve doğal 1 yine başarısızdır', async (t) => {
  for (const roll of [10, 1]) {
    const { manager, received, progress } = await setup([roll], 'mahzen_08_son_direnis', () => 0);
    t.after(() => manager.shutdown());
    const host = manager.createRoom('s0', 'Host');
    const classes = ['Medyum', 'Bilgin', 'Dedektif', 'Şifacı'] as const;
    for (let i = 1; i < 4; i++) manager.join(`s${i}`, host.room.code, `P${i}`);
    classes.forEach((c, i) => manager.selectClass(`s${i}`, c));
    manager.setMode('s0', 'betrayal');
    manager.start('s0');
    progress('s0');
    for (let i = 0; i < 4; i++) manager.submitChoice(`s${i}`, 'son_kez_haykir');
    progress('s0');
    manager.curse('s0');
    progress('s0');
    const result = manager.roll('s0');
    assert.equal(result.dc, 12);
    assert.equal(result.success, false);
    assert.equal(result.critical, roll === 1 ? 'NAT1' : null);
    progress('s0');
    assert.equal((received('s0', 'game:over').at(-1)!.payload as GameOverInfo).betrayal!.winningSide, 'darkness');
  }
});

test('macera seçimi yalnızca lobide Host tarafından yapılır ve bütün odaya uygulanır', async (t) => {
  const { manager, received } = await setup([]);
  t.after(() => manager.shutdown());
  const host = manager.createRoom('s0', 'Host');
  manager.join('s1', host.room.code, 'Konuk');
  manager.selectClass('s0', 'Medyum');
  manager.selectClass('s1', 'Bilgin');
  assert.throws(() => manager.setAdventure('s1', 'yankilar'), GameError);
  manager.setAdventure('s0', 'yankilar');
  assert.equal((received('s1', 'room:state').at(-1)!.payload as PublicRoomState).adventureId, 'yankilar');
  manager.start('s0');
  const state = received('s0', 'room:state').at(-1)!.payload as PublicRoomState;
  assert.equal(state.scene!.node_id, 'yanki_01_esik');
  assert.equal(state.scene!.ambience, 'cave_wind');
  assert.throws(() => manager.setAdventure('s0', 'on_ucuncu_nota'), GameError);
});

test('kötü işaretin bilgisi sadece haine gider; başarılı kötü ritüel karanlığa kazandırır', async (t) => {
  for (const scenario of [
    { start: 'yanki_06_kalp', action: 'yanki_taca_fener' },
    { start: 'nota_06_son_nota', action: 'nota_taci_tamamla' },
  ]) {
    const { manager, received, log, progress } = await setup([20], scenario.start, () => 1);
    t.after(() => manager.shutdown());
    const host = manager.createRoom('s0', 'Host');
    const traitor = manager.join('s1', host.room.code, 'P1');
    for (let i = 2; i < 4; i++) manager.join(`s${i}`, host.room.code, `P${i}`);
    (['Medyum', 'Bilgin', 'Dedektif', 'Şifacı'] as const).forEach((c, i) => manager.selectClass(`s${i}`, c));
    manager.setMode('s0', 'betrayal');
    manager.start('s0');
    const hint = received('s1', 'scene:hint').at(-1)!.payload as import('../../shared/types').PrivateHintPayload;
    assert.ok(hint.darkness!.favored_action_ids.includes(scenario.action));
    for (const sid of ['s0', 's2', 's3']) {
      assert.equal((received(sid, 'scene:hint').at(-1)!.payload as import('../../shared/types').PrivateHintPayload).darkness, undefined);
    }
    assert.ok(log.filter((p) => p.event === 'room:state').every((p) => !JSON.stringify(p.payload).includes(hint.darkness!.hint)));
    manager.handleDisconnect('s1');
    manager.rejoin('s1-new', host.room.code, traitor.sessionToken);
    assert.deepEqual((received('s1-new', 'scene:hint').at(-1)!.payload as import('../../shared/types').PrivateHintPayload).darkness, hint.darkness);
    progress('s0');
    for (const sid of ['s0', 's1-new', 's2', 's3']) manager.submitChoice(sid, scenario.action);
    progress('s0');
    progress('s0');
    const result = manager.roll('s0');
    assert.equal(result.success, true);
    assert.equal(result.critical, 'NAT20');
    progress('s0');
    const over = received('s0', 'game:over').at(-1)!.payload as GameOverInfo;
    assert.equal(over.victory, false);
    assert.equal(over.betrayal!.winningSide, 'darkness');
  }
});
