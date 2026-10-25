/**
 * Vite eklentisi: public/story-art/ klasörünü tarar ve `virtual:story-art` modülünü üretir.
 *   import STORY_ART from 'virtual:story-art';   // { 'node:scene': '/story-art/…/scene.webp', … }
 *
 * Yeni görsel eklemek için kod değiştirmek gerekmez; dosyayı doğru klasöre koymak yeterli.
 * Geliştirme sunucusunda dosya eklenip silindiğinde sayfa kendiliğinden yenilenir.
 */
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { buildStoryArtIndex } from '../shared/storyArt';

const VIRTUAL_ID = 'virtual:story-art';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

/** story-art/ altındaki tüm dosyaların göreli yolları (klasör yoksa boş) */
export function listStoryArtFiles(rootDir: string): string[] {
  const out: string[] = [];
  const walk = (dir: string, rel: string) => {
    let names: string[];
    try { names = readdirSync(dir); } catch { return; }
    for (const name of names) {
      const abs = path.join(dir, name);
      const r = rel ? `${rel}/${name}` : name;
      if (statSync(abs).isDirectory()) walk(abs, r);
      else out.push(r);
    }
  };
  walk(rootDir, '');
  return out;
}

export function storyArtPlugin(): Plugin {
  let artDir = '';
  let base = '/';
  return {
    name: 'ravenwood-story-art',
    configResolved(config) {
      artDir = path.join(config.publicDir, 'story-art');
      base = config.base.endsWith('/') ? config.base : `${config.base}/`;
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null;
    },
    load(id) {
      if (id !== RESOLVED_ID) return null;
      const { index, ignored, duplicates } = buildStoryArtIndex(listStoryArtFiles(artDir));
      for (const f of ignored) this.warn(`story-art: adlandırma kuralına uymayan dosya atlandı: ${f}`);
      for (const f of duplicates) this.warn(`story-art: aynı görsel için birden fazla dosya, biri atlandı: ${f}`);
      const urls = Object.fromEntries(Object.entries(index).map(([k, rel]) => [k, `${base}story-art/${rel}`]));
      return `export default ${JSON.stringify(urls)};`;
    },
    configureServer(server) {
      server.watcher.add(artDir);
      const refresh = (file: string) => {
        if (!path.resolve(file).startsWith(path.resolve(artDir))) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh);
      server.watcher.on('unlink', refresh);
    },
  };
}
