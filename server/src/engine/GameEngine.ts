import { randomInt } from 'node:crypto';
import type {
  ActionOutcome,
  GameOverInfo,
  GameMode,
  PendingRoll,
  PrivateHintPayload,
  PublicActionView,
  PublicRoomState,
  SceneResult,
  ScalingInfo,
  ServerToClientEvents,
  StoryAction,
  StoryNode,
} from '../../../shared/types';
import { ANY_CLASS, GamePhase } from '../../../shared/types';
import { CLASSES } from '../../../shared/classes';
import { MIN_PLAYERS, distributeDamage, getTierConfig, scaleDifficulty, startingHpPerPlayer } from '../../../shared/scaling';
import { GameError } from '../core/errors';
import type { Player, Room } from '../core/Room';
import type { StoryRepository } from '../story/StoryRepository';
import { assertPhase, assertTransition } from './stateMachine';

// ───────────── Bağımlılıklar (test edilebilirlik için enjekte edilir) ─────────────

type EventArgs<E extends keyof ServerToClientEvents> = Parameters<ServerToClientEvents[E]>;

/** Engine socket.io'yu bilmez; sadece bu arayüz üzerinden konuşur. */
export interface RoomOutbox {
  toRoom<E extends keyof ServerToClientEvents>(event: E, ...args: EventArgs<E>): void;
  toPlayer<E extends keyof ServerToClientEvents>(player: Player, event: E, ...args: EventArgs<E>): void;
}

export interface Clock {
  now(): number;
  setTimeout(fn: () => void, ms: number): unknown;
  clearTimeout(handle: unknown): void;
}

export const systemClock: Clock = {
  now: () => Date.now(),
  setTimeout: (fn, ms) => setTimeout(fn, ms),
  clearTimeout: (h) => clearTimeout(h as NodeJS.Timeout),
};

export interface EngineDeps {
  /** Production uses cryptographic randomness; tests can select a fixed player. */
  chooseTraitorIndex?: (playerCount: number) => number;
  story: StoryRepository;
  outbox: RoomOutbox;
  clock: Clock;
  /** [1, 20] aralığında d20 — testlerde deterministik zar için değiştirilebilir. */
  rollD20: () => number;
  startNodeId: string;
  basePlayerHp: number;
}

export const cryptoD20 = (): number => randomInt(1, 21);

interface ScaledAction extends StoryAction {
  scaledDC: number;
}

/**
 * Bir odanın oyun akışını yöneten durum makinesi.
 * Tüm faz değişiklikleri `transition()` üzerinden geçer.
 */
export class GameEngine {
  private curseQueued = false;
  private darknessPenalty = 0;
  private node: StoryNode | null = null;
  private actions: ScaledAction[] = [];
  private scaling: ScalingInfo | null = null;
  private phaseEndsAt: number | null = null;
  private pendingRoll: PendingRoll | null = null;
  private lastResult: SceneResult | null = null;
  private lastOutcome: ActionOutcome | null = null;
  private gameOver: GameOverInfo | null = null;
  private phaseDurationMs: number | null = null;
  private sceneNumber = 0;

  constructor(
    private readonly room: Room,
    private readonly deps: EngineDeps,
  ) {}

  // ═════════════════════════ Komutlar (socket katmanından çağrılır) ═════════════════════════

  setMode(byPlayerId: string, mode: GameMode): void {
    this.room.assertHost(byPlayerId);
    assertPhase(this.room.phase, GamePhase.LOBBY);
    if (mode !== 'cooperative' && mode !== 'betrayal') throw new GameError('VALIDATION', 'Geçersiz oyun modu');
    this.room.mode = mode;
    this.broadcastState();
  }

  curse(byPlayerId: string): void {
    assertPhase(this.room.phase, GamePhase.DISCUSSION_TIMER);
    const player = this.room.getPlayer(byPlayerId);
    if (this.room.mode !== 'betrayal' || player.allegiance !== 'darkness' || player.cursesLeft <= 0 || this.curseQueued) {
      throw new GameError('NOT_ALLOWED', 'Bu sahnede lanet kullanamazsın');
    }
    player.cursesLeft--;
    this.curseQueued = true;
    this.sendPrivateRole(player);
  }

  start(byPlayerId: string): void {
    this.room.assertHost(byPlayerId);
    assertPhase(this.room.phase, GamePhase.LOBBY);

    const players = [...this.room.players.values()];
    if (players.length < MIN_PLAYERS) {
      throw new GameError('NOT_ENOUGH_PLAYERS', `En az ${MIN_PLAYERS} oyuncu gerekli`);
    }
    const missing = players.filter((p) => !p.classId);
    if (missing.length > 0) {
      throw new GameError('VALIDATION', `Sınıf seçmeyenler: ${missing.map((p) => p.name).join(', ')}`);
    }

    if (this.room.mode === 'betrayal' && players.length < 4) {
      throw new GameError('NOT_ENOUGH_PLAYERS', 'Gizli Hain modu için en az 4 oyuncu gerekli');
    }
    const traitorIndex = this.room.mode === 'betrayal'
      ? (this.deps.chooseTraitorIndex ?? ((count: number) => randomInt(count)))(players.length)
      : -1;
    if (this.room.mode === 'betrayal' && (!Number.isInteger(traitorIndex) || traitorIndex < 0 || traitorIndex >= players.length)) {
      throw new Error('Hain seçimi geçersiz');
    }
    players.forEach((player, index) => {
      player.allegiance = index === traitorIndex ? 'darkness' : 'adventurers';
      player.cursesLeft = index === traitorIndex ? 2 : 0;
    });
    this.curseQueued = false;
    this.darknessPenalty = 0;

    // Ölçekleme oyun başında sabitlenir; sonradan düşen bağlantılar dengeyi değiştirmez.
    const cfg = getTierConfig(players.length);
    this.scaling = {
      playerCount: players.length,
      tier: cfg.tier,
      dcMultiplier: cfg.dcMultiplier,
      partyHpMultiplier: cfg.partyHPMultiplier,
      distributeDamage: cfg.distributeDamage,
    };
    const hp = startingHpPerPlayer(players.length, this.deps.basePlayerHp);
    for (const p of players) {
      p.hp = hp;
      p.maxHp = hp;
    }
    this.lastResult = null;
    this.lastOutcome = null;
    this.gameOver = null;
    this.sceneNumber = 0;
    this.enterScene(this.deps.startNodeId);
  }

  /** Only the host can reset a completed game. Active phases require consent. */
  advance(byPlayerId: string): void {
    this.room.assertHost(byPlayerId);
    assertPhase(this.room.phase, GamePhase.GAME_OVER);
    this.resetToLobby();
  }

  ready(playerId: string, request: { ready: boolean; phase: GamePhase; sceneNumber: number }): void {
    assertPhase(this.room.phase, GamePhase.SCENE_TEXT, GamePhase.PRIVATE_CHOICES, GamePhase.DISCUSSION_TIMER, GamePhase.SCENE_RESULT);
    if (request.phase !== this.room.phase || request.sceneNumber !== this.sceneNumber) {
      throw new GameError('INVALID_PHASE', 'Sahne veya aşama değişti; ekranı kontrol et');
    }
    const player = this.room.getPlayer(playerId);
    if (request.ready && this.room.phase === GamePhase.PRIVATE_CHOICES && !player.choice) {
      throw new GameError('NOT_ALLOWED', 'Önce bir seçenek seç');
    }
    player.ready = request.ready;
    const connected = this.room.connectedPlayers();
    if (!request.ready || !connected.length || !connected.every((p) => p.ready)) {
      this.broadcastState();
      return;
    }
    switch (this.room.phase) {
      case GamePhase.SCENE_TEXT: return this.enterPrivateChoices();
      case GamePhase.PRIVATE_CHOICES: return this.enterDiscussion();
      case GamePhase.DISCUSSION_TIMER: return this.enterDiceRoll();
      case GamePhase.SCENE_RESULT: return this.proceedFromResult();
    }
  }

  submitChoice(playerId: string, actionId: string): void {
    assertPhase(this.room.phase, GamePhase.PRIVATE_CHOICES, GamePhase.DISCUSSION_TIMER);
    const player = this.room.getPlayer(playerId);
    // Grup kararı: herkes görünür her aksiyona oy verebilir; sınıfa özel
    // aksiyon kazanırsa zarı o sınıfın sahibi atar.
    if (!this.actions.some((a) => a.action_id === actionId)) {
      throw new GameError('NOT_ALLOWED', 'Bu seçenek bu sahnede mevcut değil');
    }
    player.choice = actionId;
    player.choiceAt = this.deps.clock.now();
    player.ready = false;
    this.broadcastState(); // sadece hasChosen bayrağı görünür, seçimin kendisi değil
  }

  roll(byPlayerId: string): SceneResult {
    assertPhase(this.room.phase, GamePhase.DICE_ROLL);
    const pending = this.pendingRoll!;
    const roller = this.room.getPlayer(pending.rollerPlayerId);
    // Zarcı bağlı değilse Host onun yerine atabilir.
    const allowed = byPlayerId === roller.id || (roller.socketId === null && this.room.isHost(byPlayerId));
    if (!allowed) throw new GameError('NOT_ALLOWED', `Zarı ${roller.name} atmalı`);
    return this.resolveRoll();
  }

  // ═════════════════════════ Bağlantı olayları ═════════════════════════

  onPlayerReconnected(player: Player): void {
    this.broadcastState();
    this.sendPrivateRole(player);
    if (this.node && this.room.phase !== GamePhase.LOBBY && this.room.phase !== GamePhase.GAME_OVER) {
      this.sendPrivateHint(player); // gizli ipucunu yeni socket'e tekrar gönder
    }
  }

  onPlayerDisconnected(player: Player): void {
    player.ready = false;
    this.broadcastState();
  }

  dispose(): void {
    // No automatic phase timers; room cleanup is owned by RoomManager.
  }

  // ═════════════════════════ Faz girişleri ═════════════════════════

  private enterScene(nodeId: string): void {
    const node = this.deps.story.get(nodeId);
    if (!node) {
      this.endGame({
        victory: true,
        type: 'bittersweet',
        title: 'Devam Edecek...',
        reason: 'Hikayenin bu kolu henüz yazılmadı.',
      });
      return;
    }
    this.transition(GamePhase.SCENE_TEXT);
    this.node = node;
    this.sceneNumber++;
    this.actions = this.computeVisibleActions(node);
    this.pendingRoll = null;
    this.curseQueued = false;
    this.darknessPenalty = 0;
    for (const p of this.room.players.values()) {
      p.choice = null;
      p.choiceAt = null;
    }

    // 1) Genel sahne metni herkese
    this.broadcastState();
    // 2) Asimetrik veri: her oyuncunun kendi socket'ine sadece kendi sınıfının ipucu
    for (const player of this.room.connectedPlayers()) {
      this.sendPrivateHint(player);
      this.sendPrivateRole(player);
    }
  }

  private enterPrivateChoices(): void {
    this.transition(GamePhase.PRIVATE_CHOICES);
    this.broadcastState();
  }

  private enterDiscussion(): void {
    this.transition(GamePhase.DISCUSSION_TIMER);
    this.broadcastState();
  }

  private enterDiceRoll(): void {
    this.transition(GamePhase.DICE_ROLL);
    const action = this.pickWinningAction();
    const roller = this.pickRoller(action);
    this.darknessPenalty = this.curseQueued ? Math.min(2, 20 - action.scaledDC) : 0;
    this.pendingRoll = { action_id: action.action_id, rollerPlayerId: roller.id, dc: action.scaledDC + this.darknessPenalty };
    this.broadcastState();
  }

  private resolveRoll(): SceneResult {
    const pending = this.pendingRoll!;
    const action = this.actions.find((a) => a.action_id === pending.action_id)!;
    const roller = this.room.getPlayer(pending.rollerPlayerId);

    this.deps.outbox.toRoom('dice:rolling', { rollerPlayerId: roller.id, action_id: action.action_id });

    const roll = this.deps.rollD20();
    const isSpecialist = action.required_class !== ANY_CLASS && action.required_class === roller.classId;
    const bonus = isSpecialist && roller.classId ? CLASSES[roller.classId].rollBonus : 0;
    const total = roll + bonus;
    const critical = roll === 20 ? 'NAT20' : roll === 1 ? 'NAT1' : null;
    const success = critical === 'NAT20' || (critical !== 'NAT1' && total >= pending.dc);
    const outcome = success ? action.success : action.fail;
    this.lastOutcome = outcome;

    const hpDeltaByPlayer = this.applyHpChange(outcome.hp_change, roller.id);

    const result: SceneResult = {
      darknessPenalty: this.darknessPenalty,
      action_id: action.action_id,
      rollerPlayerId: roller.id,
      roll,
      bonus,
      total,
      dc: pending.dc,
      success,
      critical,
      text: outcome.text,
      hpChange: outcome.hp_change,
      hpDeltaByPlayer,
      next_node_id: outcome.next_node_id,
    };
    this.lastResult = result;
    this.transition(GamePhase.SCENE_RESULT);
    this.deps.outbox.toRoom('scene:result', result);
    this.broadcastState();
    return result;
  }

  private proceedFromResult(): void {
    assertPhase(this.room.phase, GamePhase.SCENE_RESULT);
    if (this.partyHp() <= 0) {
      this.endGame({
        victory: false,
        type: 'defeat',
        title: 'Karanlık Kazandı',
        reason: 'Grubun son nefesi de mahzenin taşlarına karıştı. Ravenwood bir hikaye daha yuttu.',
      });
      return;
    }
    const next = this.lastResult?.next_node_id ?? null;
    if (next === null) {
      const ending = this.lastOutcome?.ending ?? { type: 'victory' as const, title: 'Şafak Söktü' };
      this.endGame({
        victory: ending.type !== 'defeat',
        type: ending.type,
        title: ending.title,
        reason: this.lastOutcome?.text ?? 'Ravenwood bu gecelik sustu.',
      });
      return;
    }
    this.enterScene(next);
  }

  private endGame(info: GameOverInfo): void {
    this.transition(GamePhase.GAME_OVER);
    const traitor = [...this.room.players.values()].find((p) => p.allegiance === 'darkness');
    this.gameOver = this.room.mode === 'betrayal' && traitor
      ? { ...info, betrayal: { winningSide: info.victory ? 'adventurers' : 'darkness', traitorPlayerId: traitor.id } }
      : info;
    this.deps.outbox.toRoom('game:over', this.gameOver);
    this.broadcastState();
  }

  private resetToLobby(): void {
    this.transition(GamePhase.LOBBY);
    this.node = null;
    this.actions = [];
    this.scaling = null;
    this.pendingRoll = null;
    this.lastResult = null;
    this.lastOutcome = null;
    this.gameOver = null;
    this.sceneNumber = 0;
    this.curseQueued = false;
    this.darknessPenalty = 0;
    // Bağlantısı kopmuş oyuncular lobide tutulmaz.
    for (const p of [...this.room.players.values()]) {
      if (p.socketId === null) this.room.removePlayer(p.id);
      else {
        Object.assign(p, { hp: 0, maxHp: 0, choice: null, choiceAt: null, ready: false, allegiance: 'adventurers', cursesLeft: 0 });
        this.deps.outbox.toPlayer(p, 'player:role', null);
      }
    }
    this.broadcastState();
  }

  // ═════════════════════════ Kurallar ═════════════════════════

  /** Odada sınıfı bulunmayan özel aksiyonlar gizlenir; ANY her zaman görünür. */
  private computeVisibleActions(node: StoryNode): ScaledAction[] {
    const classesInRoom = new Set(this.room.takenClasses());
    const count = this.scaling!.playerCount;
    return node.actions
      .filter((a) => a.required_class === ANY_CLASS || classesInRoom.has(a.required_class))
      .map((a) => ({ ...a, scaledDC: scaleDifficulty(count, a.dice_dc).finalDC }));
  }

  /** En çok oy alan aksiyon; eşitlikte hikayedeki sıra; hiç oy yoksa ilk ANY aksiyon. */
  private pickWinningAction(): ScaledAction {
    const tally = new Map<string, number>();
    for (const p of this.room.players.values()) {
      if (p.choice) tally.set(p.choice, (tally.get(p.choice) ?? 0) + 1);
    }
    if (tally.size === 0) return this.actions.find((a) => a.required_class === ANY_CLASS) ?? this.actions[0]!;
    let best = this.actions[0]!;
    let bestVotes = -1;
    for (const a of this.actions) {
      const v = tally.get(a.action_id) ?? 0;
      if (v > bestVotes) {
        best = a;
        bestVotes = v;
      }
    }
    return best;
  }

  /**
   * Sınıfa özel aksiyonu o sınıfın sahibi atar. ANY aksiyonu ilk oy veren
   * (bağlı ve ayakta) oyuncu atar; kimse yoksa Host.
   */
  private pickRoller(action: ScaledAction): Player {
    const players = [...this.room.players.values()];
    if (action.required_class !== ANY_CLASS) {
      const owner = players.find((p) => p.classId === action.required_class);
      if (owner) return owner;
    }
    const voters = players
      .filter((p) => p.choice === action.action_id && p.socketId !== null)
      .sort((a, b) => (b.hp > 0 ? 1 : 0) - (a.hp > 0 ? 1 : 0) || (a.choiceAt ?? 0) - (b.choiceAt ?? 0));
    return voters[0] ?? this.room.getPlayer(this.room.hostId ?? players[0]!.id);
  }

  /** Negatif: hasar (ölçeklemeye göre zarcıya ya da gruba). Pozitif: en yaralılardan başlayarak iyileştirme. */
  private applyHpChange(change: number, rollerId: string): Record<string, number> {
    const players = [...this.room.players.values()];
    const deltas: Record<string, number> = {};

    if (change < 0) {
      const dmg = distributeDamage(-change, players, rollerId, this.scaling!.distributeDamage);
      for (const [id, d] of Object.entries(dmg)) {
        const p = this.room.getPlayer(id);
        const applied = Math.min(d, p.hp);
        p.hp -= applied;
        deltas[id] = -applied;
      }
    } else if (change > 0) {
      for (let i = 0; i < change; i++) {
        const target = players.filter((p) => p.hp < p.maxHp).sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
        if (!target) break;
        target.hp += 1;
        deltas[target.id] = (deltas[target.id] ?? 0) + 1;
      }
    }
    return deltas;
  }

  // ═════════════════════════ Yardımcılar ═════════════════════════

  private transition(to: GamePhase): void {
    assertTransition(this.room.phase, to);
    for (const player of this.room.players.values()) player.ready = false;
    this.phaseEndsAt = null;
    this.phaseDurationMs = null;
    this.room.phase = to;
    this.room.touch();
  }

  private partyHp(): number {
    let sum = 0;
    for (const p of this.room.players.values()) sum += p.hp;
    return sum;
  }

  private sendPrivateHint(player: Player): void {
    if (!this.node || !player.classId) return;
    const payload: PrivateHintPayload = {
      node_id: this.node.node_id,
      classId: player.classId,
      hint: this.node.class_hints[player.classId] ?? null,
      ownActionIds: this.actions.filter((a) => a.required_class === player.classId).map((a) => a.action_id),
    };
    this.deps.outbox.toPlayer(player, 'scene:hint', payload);
  }

  private sendPrivateRole(player: Player): void {
    this.deps.outbox.toPlayer(player, 'player:role', this.room.phase === GamePhase.LOBBY ? null : {
      allegiance: player.allegiance,
      cursesLeft: player.cursesLeft,
      curseQueued: player.allegiance === 'darkness' && this.curseQueued,
    });
  }

  broadcastState(): void {
    this.deps.outbox.toRoom('room:state', this.getPublicState());
  }

  getPublicState(): PublicRoomState {
    const players = this.room.toPublicPlayers();
    const actions: PublicActionView[] = this.actions.map((a) => ({
      action_id: a.action_id,
      required_class: a.required_class,
      button_text: a.button_text,
      dc: a.scaledDC,
    }));
    return {
      mode: this.room.mode,
      code: this.room.code,
      phase: this.room.phase,
      players,
      takenClasses: this.room.takenClasses(),
      partyHp: players.reduce((s, p) => s + p.hp, 0),
      partyMaxHp: players.reduce((s, p) => s + p.maxHp, 0),
      scaling: this.scaling,
      scene: this.node
        ? { node_id: this.node.node_id, title: this.node.title, public_text: this.node.public_text, actions }
        : null,
      phaseEndsAt: this.phaseEndsAt,
      phaseDurationMs: this.phaseDurationMs,
      serverNow: this.deps.clock.now(),
      gameOver: this.gameOver,
      sceneNumber: this.sceneNumber,
      pendingRoll: this.pendingRoll,
      lastResult: this.lastResult,
    };
  }
}
