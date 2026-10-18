import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { test } from 'node:test';
import { createWebApp } from '../src/web/app';

test('production web: oyun, sağlık kontrolü ve MP3 range istekleri tek adresten çalışır', async (t) => {
  const fixture = await mkdtemp(path.join(tmpdir(), 'ravenwood-web-'));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  const clientDir = path.join(fixture, 'client');
  await mkdir(path.join(clientDir, 'audio'), { recursive: true });
  await writeFile(path.join(clientDir, 'index.html'), '<!doctype html><title>Ravenwood</title>');
  await writeFile(path.join(clientDir, 'audio', 'test.mp3'), Buffer.alloc(100));
  await writeFile(path.join(fixture, 'private-story.json'), 'secret');
  const server = createServer(createWebApp(clientDir, () => ({ rooms: 2, sockets: 4 })));
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise<void>((resolve, reject) => server.close((e) => e ? reject(e) : resolve())));
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  const root = await fetch(base);
  assert.equal(root.status, 200);
  assert.match(await root.text(), /Ravenwood/);
  assert.equal(root.headers.get('x-powered-by'), null);
  assert.equal(root.headers.get('cache-control'), 'no-cache');
  const health = await (await fetch(`${base}/healthz`)).json() as { status: string; rooms: number; sockets: number };
  assert.deepEqual([health.status, health.rooms, health.sockets], ['ok', 2, 4]);
  const audio = await fetch(`${base}/audio/test.mp3`, { headers: { Range: 'bytes=0-9' } });
  assert.equal(audio.status, 206);
  assert.equal(audio.headers.get('content-range'), 'bytes 0-9/100');
  assert.equal((await audio.arrayBuffer()).byteLength, 10);
  for (const url of ['/story/private-story.json', '/.env', '/audio/missing.mp3', '/node_modules/package.json']) {
    assert.equal((await fetch(`${base}${url}`)).status, 404);
  }
});
