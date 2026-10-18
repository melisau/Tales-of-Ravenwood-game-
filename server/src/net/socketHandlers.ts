import type { Server, Socket } from 'socket.io';
import type { z } from 'zod';
import type { Ack, ClientToServerEvents, ServerToClientEvents } from '../../../shared/types';
import { GameError } from '../core/errors';
import type { RoomManager, Transport } from '../core/RoomManager';
import { schemas } from './validation';

type IO = Server<ClientToServerEvents, ServerToClientEvents>;
type ClientSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

/** RoomManager'ın beklediği Transport arayüzünün socket.io implementasyonu. */
export function createSocketIoTransport(io: IO): Transport {
  return {
    emitToChannel: (channel, event, ...args) => io.to(channel).emit(event, ...args),
    emitToSocket: (socketId, event, ...args) => io.to(socketId).emit(event, ...args),
    joinChannel: (socketId, channel) => void io.sockets.sockets.get(socketId)?.join(channel),
    leaveChannel: (socketId, channel) => void io.sockets.sockets.get(socketId)?.leave(channel),
  };
}

interface RateLimit {
  windowMs: number;
  maxEvents: number;
}

/**
 * Tüm event'leri tek bir güvenli sarmalayıcıdan geçirir:
 *  - rate limit
 *  - zod ile payload doğrulama
 *  - GameError → tipli ack, beklenmeyen hata → INTERNAL (detay sızdırılmaz)
 */
export function registerSocketHandlers(io: IO, manager: RoomManager, rateLimit: RateLimit, logger: Pick<Console, 'error'> = console): void {
  io.on('connection', (socket: ClientSocket) => {
    let windowStart = Date.now();
    let count = 0;
    const allow = (): boolean => {
      const now = Date.now();
      if (now - windowStart > rateLimit.windowMs) {
        windowStart = now;
        count = 0;
      }
      return ++count <= rateLimit.maxEvents;
    };

    const respond = <T>(ack: unknown, fn: () => T): void => {
      const reply = typeof ack === 'function' ? (ack as Ack<T>) : () => {};
      if (!allow()) return reply({ ok: false, error: 'RATE_LIMITED', message: 'Çok hızlı! Biraz yavaşla.' });
      try {
        reply({ ok: true, data: fn() });
      } catch (err) {
        if (err instanceof GameError) return reply({ ok: false, error: err.code, message: err.message });
        logger.error(`[socket ${socket.id}]`, err);
        reply({ ok: false, error: 'INTERNAL', message: 'Beklenmeyen bir hata oluştu' });
      }
    };

    const parse = <S extends z.ZodTypeAny>(schema: S, payload: unknown): z.infer<S> => {
      const r = schema.safeParse(payload);
      if (!r.success) throw new GameError('VALIDATION', r.error.issues[0]?.message ?? 'Geçersiz veri');
      return r.data;
    };

    socket.on('room:create', (p, ack) =>
      respond(ack, () => manager.createRoom(socket.id, parse(schemas['room:create'], p).name)),
    );
    socket.on('room:join', (p, ack) =>
      respond(ack, () => {
        const { code, name } = parse(schemas['room:join'], p);
        return manager.join(socket.id, code, name);
      }),
    );
    socket.on('room:rejoin', (p, ack) =>
      respond(ack, () => {
        const { code, sessionToken } = parse(schemas['room:rejoin'], p);
        return manager.rejoin(socket.id, code, sessionToken);
      }),
    );
    socket.on('room:leave', (ack) => respond(ack, () => void manager.leave(socket.id)));
    socket.on('class:select', (p, ack) =>
      respond(ack, () => void manager.selectClass(socket.id, parse(schemas['class:select'], p).classId)),
    );
    socket.on('class:release', (ack) => respond(ack, () => void manager.releaseClass(socket.id)));
    socket.on('game:start', (ack) => respond(ack, () => void manager.start(socket.id)));
    socket.on('room:adventure', (p, ack) => respond(ack, () => void manager.setAdventure(socket.id, parse(schemas['room:adventure'], p).adventureId)));
    socket.on('room:mode', (p, ack) => respond(ack, () => void manager.setMode(socket.id, parse(schemas['room:mode'], p).mode)));
    socket.on('darkness:curse', (ack) => respond(ack, () => void manager.curse(socket.id)));
    socket.on('game:ready', (p, ack) => respond(ack, () => void manager.ready(socket.id, parse(schemas['game:ready'], p))));
    socket.on('game:advance', (ack) => respond(ack, () => void manager.advance(socket.id)));
    socket.on('choice:submit', (p, ack) =>
      respond(ack, () => void manager.submitChoice(socket.id, parse(schemas['choice:submit'], p).actionId)),
    );
    socket.on('dice:roll', (ack) => respond(ack, () => manager.roll(socket.id)));

    socket.on('disconnect', () => manager.handleDisconnect(socket.id));
  });
}
