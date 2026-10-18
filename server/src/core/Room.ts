import { randomBytes, randomUUID } from 'node:crypto';
import type { ClassId, PublicPlayer } from '../../../shared/types';
import { GamePhase } from '../../../shared/types';
import { MAX_PLAYERS } from '../../../shared/scaling';
import { GameError } from './errors';

export interface Player {
  readonly id: string;
  readonly sessionToken: string;
  name: string;
  socketId: string | null;
  classId: ClassId | null;
  hp: number;
  maxHp: number;
  joinedAt: number;
  disconnectedAt: number | null;
  /** Gizli seçim — asla toplu yayına girmez. */
  choice: string | null;
  choiceAt: number | null;
}

/**
 * Oda verisi ve lobi kuralları. Faz mantığı GameEngine'dedir.
 * Oyuncu sırası (Map ekleme sırası) host devri için kullanılır.
 */
export class Room {
  readonly players = new Map<string, Player>();
  hostId: string | null = null;
  phase: GamePhase = GamePhase.LOBBY;
  readonly createdAt = Date.now();
  lastActivityAt = Date.now();

  constructor(readonly code: string) {}

  // ───────────── Oyuncu yönetimi ─────────────

  addPlayer(name: string, socketId: string): Player {
    if (this.phase !== GamePhase.LOBBY) throw new GameError('GAME_IN_PROGRESS', 'Oyun başladı; yeni oyuncu katılamaz');
    if (this.players.size >= MAX_PLAYERS) throw new GameError('ROOM_FULL', `Oda dolu (${MAX_PLAYERS} oyuncu)`);

    const player: Player = {
      id: randomUUID(),
      sessionToken: randomBytes(24).toString('base64url'),
      name: this.uniqueName(name),
      socketId,
      classId: null,
      hp: 0,
      maxHp: 0,
      joinedAt: Date.now(),
      disconnectedAt: null,
      choice: null,
      choiceAt: null,
    };
    this.players.set(player.id, player);
    // İlk giren Host olur.
    if (this.hostId === null) this.hostId = player.id;
    this.touch();
    return player;
  }

  removePlayer(playerId: string): void {
    this.players.delete(playerId);
    if (this.hostId === playerId) this.migrateHost();
    this.touch();
  }

  /** Host ayrılırsa en eski bağlı oyuncu Host olur. */
  migrateHost(): string | null {
    const next = [...this.players.values()]
      .filter((p) => p.socketId !== null)
      .sort((a, b) => a.joinedAt - b.joinedAt)[0];
    this.hostId = next?.id ?? null;
    return this.hostId;
  }

  getPlayer(playerId: string): Player {
    const p = this.players.get(playerId);
    if (!p) throw new GameError('NOT_ALLOWED', 'Oyuncu bu odada değil');
    return p;
  }

  isHost(playerId: string): boolean {
    return this.hostId === playerId;
  }

  assertHost(playerId: string): void {
    if (!this.isHost(playerId)) throw new GameError('NOT_HOST', 'Bu işlemi sadece Host yapabilir');
  }

  connectedPlayers(): Player[] {
    return [...this.players.values()].filter((p) => p.socketId !== null);
  }

  // ───────────── Sınıf seçimi ─────────────

  takenClasses(): ClassId[] {
    return [...this.players.values()].flatMap((p) => (p.classId ? [p.classId] : []));
  }

  /**
   * Aynı sınıf bir odada iki kez seçilemez. Node tek iş parçacıklı olduğu için
   * kontrol+atama atomiktir; iki oyuncu aynı anda isterse ilk gelen kazanır.
   */
  selectClass(playerId: string, classId: ClassId): void {
    if (this.phase !== GamePhase.LOBBY) throw new GameError('INVALID_PHASE', 'Sınıf sadece lobide seçilir');
    const player = this.getPlayer(playerId);
    const owner = [...this.players.values()].find((p) => p.classId === classId);
    if (owner && owner.id !== playerId) {
      throw new GameError('CLASS_TAKEN', `${classId} sınıfı ${owner.name} tarafından alındı`);
    }
    player.classId = classId;
    this.touch();
  }

  releaseClass(playerId: string): void {
    if (this.phase !== GamePhase.LOBBY) throw new GameError('INVALID_PHASE', 'Sınıf sadece lobide bırakılır');
    this.getPlayer(playerId).classId = null;
    this.touch();
  }

  // ───────────── Görünümler ─────────────

  toPublicPlayers(): PublicPlayer[] {
    return [...this.players.values()].map((p) => ({
      id: p.id,
      name: p.name,
      classId: p.classId,
      hp: p.hp,
      maxHp: p.maxHp,
      isHost: p.id === this.hostId,
      connected: p.socketId !== null,
      hasChosen: p.choice !== null,
    }));
  }

  touch(): void {
    this.lastActivityAt = Date.now();
  }

  private uniqueName(raw: string): string {
    const base = raw.trim().slice(0, 20) || 'Gezgin';
    const names = new Set([...this.players.values()].map((p) => p.name.toLowerCase()));
    if (!names.has(base.toLowerCase())) return base;
    for (let i = 2; ; i++) {
      const candidate = `${base} ${i}`;
      if (!names.has(candidate.toLowerCase())) return candidate;
    }
  }
}
