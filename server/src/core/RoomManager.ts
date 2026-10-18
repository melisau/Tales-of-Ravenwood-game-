import type { ClassId, JoinResult, ServerToClientEvents } from '../../../shared/types';
import { GamePhase } from '../../../shared/types';
import { GameEngine, type Clock, type EngineDeps } from '../engine/GameEngine';
import { GameError } from './errors';
import { Room, type Player } from './Room';
import { generateRoomCode, normalizeRoomCode } from './roomCode';

/**
 * Ağ katmanı soyutlaması. Socket.io adaptörü bunu uygular; testlerde sahte
 * bir transport kullanılır. Böylece oyun mantığı kütüphaneden bağımsızdır.
 */
export interface Transport {
  emitToChannel<E extends keyof ServerToClientEvents>(channel: string, event: E, ...args: Parameters<ServerToClientEvents[E]>): void;
  emitToSocket<E extends keyof ServerToClientEvents>(socketId: string, event: E, ...args: Parameters<ServerToClientEvents[E]>): void;
  joinChannel(socketId: string, channel: string): void;
  leaveChannel(socketId: string, channel: string): void;
}

export interface RoomManagerOptions {
  transport: Transport;
  clock: Clock;
  engineDeps: Omit<EngineDeps, 'outbox' | 'clock'>;
  reconnectGraceMs: number;
  emptyRoomTtlMs: number;
  logger?: Pick<Console, 'info' | 'warn'>;
}

interface RoomEntry {
  room: Room;
  engine: GameEngine;
  graceTimers: Map<string, unknown>; // playerId -> timer
}

interface SocketBinding {
  code: string;
  playerId: string;
}

const channelOf = (code: string) => `room:${code}`;

export class RoomManager {
  private readonly rooms = new Map<string, RoomEntry>();
  private readonly sockets = new Map<string, SocketBinding>();
  private readonly sweepHandle: unknown;

  constructor(private readonly opts: RoomManagerOptions) {
    this.sweepHandle = setInterval(() => this.sweepEmptyRooms(), 60_000);
    (this.sweepHandle as NodeJS.Timeout).unref?.();
  }

  // ═════════════════════════ Oda yaşam döngüsü ═════════════════════════

  createRoom(socketId: string, name: string): JoinResult {
    this.assertNotInRoom(socketId);
    const code = generateRoomCode((c) => this.rooms.has(c));
    const room = new Room(code);
    const engine = new GameEngine(room, {
      ...this.opts.engineDeps,
      clock: this.opts.clock,
      outbox: {
        toRoom: (event, ...args) => this.opts.transport.emitToChannel(channelOf(code), event, ...args),
        toPlayer: (player, event, ...args) => {
          if (player.socketId) this.opts.transport.emitToSocket(player.socketId, event, ...args);
        },
      },
    });
    this.rooms.set(code, { room, engine, graceTimers: new Map() });
    this.opts.logger?.info(`[room] ${code} oluşturuldu`);
    return this.join(socketId, code, name);
  }

  join(socketId: string, rawCode: string, name: string): JoinResult {
    this.assertNotInRoom(socketId);
    const entry = this.getEntry(rawCode);
    const player = entry.room.addPlayer(name, socketId);
    this.bind(socketId, entry.room.code, player.id);
    entry.engine.broadcastState();
    return { room: entry.engine.getPublicState(), playerId: player.id, sessionToken: player.sessionToken };
  }

  /** Telefon kilitlendi / sekme yenilendi: aynı oyuncuya yeni socket ile dön. */
  rejoin(socketId: string, rawCode: string, sessionToken: string): JoinResult {
    this.assertNotInRoom(socketId);
    const entry = this.getEntry(rawCode);
    const player = [...entry.room.players.values()].find((p) => p.sessionToken === sessionToken);
    if (!player) throw new GameError('NOT_ALLOWED', 'Oturum bulunamadı; odaya yeniden katıl');

    // Eski socket hâlâ bağlıysa (iki sekme) eskisini düşür.
    if (player.socketId && player.socketId !== socketId) {
      this.opts.transport.leaveChannel(player.socketId, channelOf(entry.room.code));
      this.sockets.delete(player.socketId);
    }
    this.clearGrace(entry, player.id);
    player.socketId = socketId;
    player.disconnectedAt = null;
    if (entry.room.hostId === null) entry.room.hostId = player.id;
    this.bind(socketId, entry.room.code, player.id);
    entry.engine.onPlayerReconnected(player);
    return { room: entry.engine.getPublicState(), playerId: player.id, sessionToken: player.sessionToken };
  }

  leave(socketId: string): void {
    const ctx = this.sockets.get(socketId);
    if (!ctx) return;
    const entry = this.rooms.get(ctx.code);
    this.unbind(socketId);
    if (!entry) return;
    const player = entry.room.players.get(ctx.playerId);
    if (!player) return;

    if (entry.room.phase === GamePhase.LOBBY || entry.room.phase === GamePhase.GAME_OVER) {
      this.clearGrace(entry, player.id);
      entry.room.removePlayer(player.id); // sınıf da serbest kalır
      entry.engine.broadcastState();
    } else {
      // Oyun sürerken bilinçli ayrılık da bağlantı kopması gibi ele alınır; sınıf odada kalır.
      this.markDisconnected(entry, player);
    }
    this.destroyIfEmpty(entry);
  }

  handleDisconnect(socketId: string): void {
    const ctx = this.sockets.get(socketId);
    if (!ctx) return;
    this.unbind(socketId);
    const entry = this.rooms.get(ctx.code);
    const player = entry?.room.players.get(ctx.playerId);
    if (!entry || !player || player.socketId !== socketId) return;
    this.markDisconnected(entry, player);

    // Lobide geri gelmezse yer ve sınıf boşaltılır.
    const timer = this.opts.clock.setTimeout(() => {
      entry.graceTimers.delete(player.id);
      if (player.socketId !== null) return;
      if (entry.room.phase === GamePhase.LOBBY || entry.room.phase === GamePhase.GAME_OVER) {
        entry.room.removePlayer(player.id);
        entry.engine.broadcastState();
        this.destroyIfEmpty(entry);
      }
    }, this.opts.reconnectGraceMs);
    entry.graceTimers.set(player.id, timer);
  }

  // ═════════════════════════ Oyuncu komutları ═════════════════════════

  selectClass(socketId: string, classId: ClassId): void {
    const { entry, player } = this.ctx(socketId);
    entry.room.selectClass(player.id, classId);
    entry.engine.broadcastState();
  }

  releaseClass(socketId: string): void {
    const { entry, player } = this.ctx(socketId);
    entry.room.releaseClass(player.id);
    entry.engine.broadcastState();
  }

  start(socketId: string): void {
    const { entry, player } = this.ctx(socketId);
    entry.engine.start(player.id);
  }

  advance(socketId: string): void {
    const { entry, player } = this.ctx(socketId);
    entry.engine.advance(player.id);
  }

  submitChoice(socketId: string, actionId: string): void {
    const { entry, player } = this.ctx(socketId);
    entry.engine.submitChoice(player.id, actionId);
  }

  roll(socketId: string) {
    const { entry, player } = this.ctx(socketId);
    return entry.engine.roll(player.id);
  }

  // ═════════════════════════ Gözlem / bakım ═════════════════════════

  stats() {
    return { rooms: this.rooms.size, sockets: this.sockets.size };
  }

  shutdown(): void {
    clearInterval(this.sweepHandle as NodeJS.Timeout);
    for (const entry of this.rooms.values()) this.destroy(entry);
  }

  // ═════════════════════════ İç yardımcılar ═════════════════════════

  private markDisconnected(entry: RoomEntry, player: Player): void {
    player.socketId = null;
    player.disconnectedAt = this.opts.clock.now();
    if (entry.room.hostId === player.id) entry.room.migrateHost();
    entry.engine.onPlayerDisconnected(player);
  }

  private ctx(socketId: string): { entry: RoomEntry; player: Player } {
    const binding = this.sockets.get(socketId);
    if (!binding) throw new GameError('NOT_ALLOWED', 'Önce bir odaya katıl');
    const entry = this.rooms.get(binding.code);
    if (!entry) throw new GameError('ROOM_NOT_FOUND', 'Oda kapandı');
    return { entry, player: entry.room.getPlayer(binding.playerId) };
  }

  private getEntry(rawCode: string): RoomEntry {
    const entry = this.rooms.get(normalizeRoomCode(rawCode));
    if (!entry) throw new GameError('ROOM_NOT_FOUND', 'Bu kodla bir oda yok');
    return entry;
  }

  private assertNotInRoom(socketId: string): void {
    if (this.sockets.has(socketId)) throw new GameError('NOT_ALLOWED', 'Zaten bir odadasın; önce ayrıl');
  }

  private bind(socketId: string, code: string, playerId: string): void {
    this.sockets.set(socketId, { code, playerId });
    this.opts.transport.joinChannel(socketId, channelOf(code));
  }

  private unbind(socketId: string): void {
    const b = this.sockets.get(socketId);
    if (!b) return;
    this.sockets.delete(socketId);
    this.opts.transport.leaveChannel(socketId, channelOf(b.code));
  }

  private clearGrace(entry: RoomEntry, playerId: string): void {
    const t = entry.graceTimers.get(playerId);
    if (t !== undefined) this.opts.clock.clearTimeout(t);
    entry.graceTimers.delete(playerId);
  }

  private destroyIfEmpty(entry: RoomEntry): void {
    if (entry.room.players.size === 0) this.destroy(entry);
  }

  private destroy(entry: RoomEntry): void {
    entry.engine.dispose();
    for (const t of entry.graceTimers.values()) this.opts.clock.clearTimeout(t);
    this.rooms.delete(entry.room.code);
    this.opts.logger?.info(`[room] ${entry.room.code} kapatıldı`);
  }

  /** Kimsenin bağlı olmadığı ve uzun süredir hareketsiz odaları temizler (oyun ortasında terk edilenler dahil). */
  private sweepEmptyRooms(): void {
    const now = this.opts.clock.now();
    for (const entry of [...this.rooms.values()]) {
      const idle = now - entry.room.lastActivityAt > this.opts.emptyRoomTtlMs;
      if (idle && entry.room.connectedPlayers().length === 0) this.destroy(entry);
    }
  }
}
