import { randomInt } from 'node:crypto';
import type {
  ActionOutcome,
  GameOverInfo,
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
  story: StoryRepository;
  outbox: RoomOutbox;
  clock: Clock;
  /** [1, 20] aralığında d20 — testlerde deterministik zar için değiştirilebilir. */
  rollD20: () => number;
  startNodeId: string;
  basePlayerHp: number;
  timers: {
    sceneTextMs: number;
    privateChoicesMs: number;
    discussionMs: number;
    diceRollMs: number;
    sceneResultMs: number;
  };
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
  private timer: unknown = null;
  /** Her geçişte artar; eski timer callback'lerinin state bozmasını engeller. */
  private epoch = 0;

  constructor(
    private readonly room: Room,
    private readonly deps: EngineDeps,
  ) {}

  // ═════════════════════════ Komutlar (socket katmanından çağrılır) ═════════════════════════

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

  /** Host'un "devam" butonu: okuma, seçim, tartışma ve sonuç fazlarını erken bitirir. */
  advance(byPlayerId: string): void {
    this.room.assertHost(byPlayerId);
    switch (this.room.phase) {
      case GamePhase.SCENE_TEXT:
        return this.enterPrivateChoices();
      case GamePhase.PRIVATE_CHOICES:
        return this.enterDiscussion();
      case GamePhase.DISCUSSION_TIMER:
        return this.enterDiceRoll();
      case GamePhase.SCENE_RESULT:
        return this.proceedFromResult();
      case GamePhase.GAME_OVER:
        return this.resetToLobby();
      default:
        throw new GameError('INVALID_PHASE', `${this.room.phase} fazı Host tarafından atlanamaz`);
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
    this.broadcastState(); // sadece hasChosen bayrağı görünür, seçimin kendisi değil

    // Herkes seçtiyse beklemeye gerek yok, tartışmaya geç.
    if (this.room.phase === GamePhase.PRIVATE_CHOICES && this.room.connectedPlayers().every((p) => p.choice !== null)) {
      this.enterDiscussion();
    }
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
    if (this.node && this.room.phase !== GamePhase.LOBBY && this.room.phase !== GamePhase.GAME_OVER) {
      this.sendPrivateHint(player); // gizli ipucunu yeni socket'e tekrar gönder
    }
  }

  onPlayerDisconnected(player: Player): void {
    this.broadcastState();
    // Seçim fazında kalan herkes seçmişse beklemeye gerek yok.
    if (
      this.room.phase === GamePhase.PRIVATE_CHOICES &&
      this.room.connectedPlayers().length > 0 &&
      this.room.connectedPlayers().every((p) => p.choice !== null)
    ) {
      this.enterDiscussion();
    }
    // Zarcı düştüyse oyunu 30 sn bekletme: kısa bir süre sonra sunucu onun yerine atar.
    if (this.room.phase === GamePhase.DICE_ROLL && this.pendingRoll?.rollerPlayerId === player.id) {
      this.clearTimer();
      this.armTimer(Math.min(3_000, this.deps.timers.diceRollMs), () => this.resolveRoll());
      this.broadcastState();
    }
  }

  dispose(): void {
    this.clearTimer();
    this.epoch++;
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
    for (const p of this.room.players.values()) {
      p.choice = null;
      p.choiceAt = null;
    }
    this.armTimer(this.deps.timers.sceneTextMs, () => this.enterPrivateChoices());

    // 1) Genel sahne metni herkese
    this.broadcastState();
    // 2) Asimetrik veri: her oyuncunun kendi socket'ine sadece kendi sınıfının ipucu
    for (const player of this.room.connectedPlayers()) this.sendPrivateHint(player);
  }

  private enterPrivateChoices(): void {
    this.transition(GamePhase.PRIVATE_CHOICES);
    this.armTimer(this.deps.timers.privateChoicesMs, () => this.enterDiscussion());
    this.broadcastState();
  }

  private enterDiscussion(): void {
    this.transition(GamePhase.DISCUSSION_TIMER);
    this.armTimer(this.deps.timers.discussionMs, () => this.enterDiceRoll());
    this.broadcastState();
  }

  private enterDiceRoll(): void {
    this.transition(GamePhase.DICE_ROLL);
    const action = this.pickWinningAction();
    const roller = this.pickRoller(action);
    this.pendingRoll = { action_id: action.action_id, rollerPlayerId: roller.id, dc: action.scaledDC };
    // Zarcı bağlı değilse daha kısa bekle.
    const wait = roller.socketId === null ? Math.min(3_000, this.deps.timers.diceRollMs) : this.deps.timers.diceRollMs;
    this.armTimer(wait, () => this.resolveRoll());
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
    this.armTimer(this.deps.timers.sceneResultMs, () => this.proceedFromResult());
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
    this.gameOver = info;
    this.deps.outbox.toRoom('game:over', info);
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
    // Bağlantısı kopmuş oyuncular lobide tutulmaz.
    for (const p of [...this.room.players.values()]) {
      if (p.socketId === null) this.room.removePlayer(p.id);
      else Object.assign(p, { hp: 0, maxHp: 0, choice: null, choiceAt: null });
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
    this.clearTimer();
    this.epoch++;
    this.phaseEndsAt = null;
    this.phaseDurationMs = null;
    this.room.phase = to;
    this.room.touch();
  }

  private armTimer(ms: number, fn: () => void): void {
    const epoch = this.epoch;
    this.phaseEndsAt = this.deps.clock.now() + ms;
    this.phaseDurationMs = ms;
    this.timer = this.deps.clock.setTimeout(() => {
      if (epoch !== this.epoch) return; // faz zaten değişti
      try {
        fn();
      } catch (err) {
        console.error(`[engine:${this.room.code}] timer hatası`, err);
      }
    }, ms);
  }

  private clearTimer(): void {
    if (this.timer !== null) this.deps.clock.clearTimeout(this.timer);
    this.timer = null;
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
