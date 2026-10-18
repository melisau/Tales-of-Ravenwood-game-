#!/usr/bin/env node
/**
 * Tek komutla oyunu başlatır: sunucu (3000) + uygulama (5173).
 * Ayrıca aynı Wi-Fi'deki telefonların gireceği adresi ekrana yazar.
 *
 *   npm run basla
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { networkInterfaces } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

for (const dir of ['server', 'client']) {
  if (!existsSync(path.join(root, dir, 'node_modules'))) {
    console.error(`\n✖ ${dir}/ klasöründe paketler kurulu değil. Önce şunu çalıştır:\n\n    npm run kur\n`);
    process.exit(1);
  }
}

const colors = { server: '\x1b[35m', client: '\x1b[33m' };
const reset = '\x1b[0m';
const children = [];

function run(name, cwd) {
  const child = spawn(npm, ['run', 'dev'], { cwd: path.join(root, cwd), shell: process.platform === 'win32', env: process.env });
  const prefix = `${colors[name]}[${name === 'server' ? 'sunucu' : 'uygulama'}]${reset} `;
  const pipe = (stream, out) => {
    let buf = '';
    stream.on('data', (d) => {
      buf += d.toString();
      const lines = buf.split(/\r?\n/);
      buf = lines.pop() ?? '';
      for (const line of lines) if (line.trim()) out.write(prefix + line + '\n');
    });
  };
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);
  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`${prefix}kapandı (kod ${code}). Diğer süreç de durduruluyor.`);
      shutdown(code);
    }
  });
  children.push(child);
}

function lanAddresses() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((i) => i && i.family === 'IPv4' && !i.internal)
    .map((i) => i.address);
}

function shutdown(code = 0) {
  for (const c of children) c.kill();
  process.exit(code);
}
process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

run('server', 'server');
run('client', 'client');

setTimeout(() => {
  const ips = lanAddresses();
  const line = '─'.repeat(52);
  console.log(`\n${line}`);
  console.log('  🦇  Tales of Ravenwood hazır!\n');
  console.log('  Bu bilgisayardan:   http://localhost:5173');
  if (ips.length) {
    console.log('  Telefonlardan (aynı Wi-Fi):');
    for (const ip of ips) console.log(`                      http://${ip}:5173`);
  }
  console.log('\n  Kapatmak için: Ctrl + C');
  console.log(`${line}\n`);
}, 2500);
