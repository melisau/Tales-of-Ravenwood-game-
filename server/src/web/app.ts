import express from 'express';
import { existsSync } from 'node:fs';
import path from 'node:path';

/** Serve the built game and Socket.IO from the same public origin. */
export function createWebApp(clientDir: string, stats: () => { rooms: number; sockets: number }) {
  const app = express();
  app.disable('x-powered-by');
  app.get('/healthz', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime(), ...stats() });
  });
  const index = path.join(clientDir, 'index.html');
  if (existsSync(index)) {
    app.get('/', (_req, res) => res.sendFile(index, { headers: { 'Cache-Control': 'no-cache' } }));
    app.use(express.static(clientDir, { index: false, dotfiles: 'deny' }));
  } else if (process.env.NODE_ENV === 'production') {
    throw new Error('Oyun arayüzü bulunamadı. Önce npm run build çalıştırın.');
  }
  return app;
}
