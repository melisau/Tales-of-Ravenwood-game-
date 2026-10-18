import { createServer } from 'node:http';
import { Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents } from '../../shared/types';
import { config } from './config';
import { RoomManager } from './core/RoomManager';
import { cryptoD20, systemClock } from './engine/GameEngine';
import { createSocketIoTransport, registerSocketHandlers } from './net/socketHandlers';
import { StoryRepository } from './story/StoryRepository';
import { createWebApp } from './web/app';

async function main(): Promise<void> {
  const story = await StoryRepository.loadFromDir(config.storyDir, { strict: config.strictStory, logger: console });
  if (!story.has(config.startNodeId)) throw new Error(`Başlangıç düğümü bulunamadı: ${config.startNodeId}`);

  const app = createWebApp(config.clientDir, () => manager.stats());
  const httpServer = createServer(app);

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: { origin: config.corsOrigin },
    // Yeniden bağlanma socket.io'nun connectionStateRecovery'si yerine kendi
    // sessionToken + 'room:rejoin' akışımızla yapılır (yatay ölçeklemede de çalışır).
    pingInterval: 10_000,
    pingTimeout: 8_000,
    maxHttpBufferSize: 16 * 1024, // oyun payload'ları küçük; büyük paketleri reddet
  });

  const manager = new RoomManager({
    transport: createSocketIoTransport(io),
    clock: systemClock,
    reconnectGraceMs: config.timers.reconnectGraceMs,
    emptyRoomTtlMs: config.timers.emptyRoomTtlMs,
    logger: console,
    engineDeps: {
      story,
      rollD20: cryptoD20,
      startNodeId: config.startNodeId,
      basePlayerHp: config.basePlayerHp,
    },
  });

  registerSocketHandlers(io, manager, config.rateLimit);

  httpServer.listen(config.port, () => console.info(`🦇 Tales of Ravenwood sunucusu :${config.port} portunda`));

  const shutdown = (signal: string) => {
    console.info(`${signal} alındı, kapanıyor...`);
    manager.shutdown();
    io.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 5_000).unref();
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
