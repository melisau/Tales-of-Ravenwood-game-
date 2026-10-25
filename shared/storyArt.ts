/**
 * Sahne görselleri için adlandırma kuralı — tek kaynak.
 *
 *   client/public/story-art/<macera>/<node_id>/scene.webp
 *   client/public/story-art/<macera>/<node_id>/<action_id>_success.webp
 *   client/public/story-art/<macera>/<node_id>/<action_id>_fail.webp
 *
 * Klasöre dosya koymak yeterli: Vite eklentisi (client/storyArtPlugin.ts) derleme
 * anında klasörü tarar, bu fonksiyonlarla bir dizin çıkarır. Test
 * (server/test/storyArt.test.ts) yanlış adlandırılmış dosyaları yakalar.
 */

export const STORY_ART_EXTENSIONS = ['webp', 'avif', 'png', 'jpg', 'jpeg'] as const;

export type StoryArtOutcome = 'success' | 'fail';

export type StoryArtEntry =
  | { kind: 'scene'; nodeId: string; key: string; path: string }
  | { kind: StoryArtOutcome; nodeId: string; actionId: string; key: string; path: string };

/** Dizin anahtarı: `<node>:scene` ya da `<node>:<action>:success|fail` */
export function storyArtKey(nodeId: string, actionId?: string, outcome?: StoryArtOutcome): string {
  return actionId && outcome ? `${nodeId}:${actionId}:${outcome}` : `${nodeId}:scene`;
}

/**
 * `mahzen/mahzen_01_karanlik_mahzen/bilgin_muhru_coz_fail.webp` gibi göreli bir yolu çözer.
 * Kurala uymayan yol için null döner.
 */
export function parseStoryArtPath(relPath: string): StoryArtEntry | null {
  const parts = relPath.replace(/\\/g, '/').split('/').filter(Boolean);
  if (parts.length < 2) return null;
  const file = parts[parts.length - 1]!;
  const nodeId = parts[parts.length - 2]!;
  const m = /^(.+)\.([a-z0-9]+)$/i.exec(file);
  if (!m || !(STORY_ART_EXTENSIONS as readonly string[]).includes(m[2]!.toLowerCase())) return null;
  const stem = m[1]!;
  const path = parts.join('/');
  if (stem === 'scene') return { kind: 'scene', nodeId, key: storyArtKey(nodeId), path };
  const r = /^(.+)_(success|fail)$/.exec(stem);
  if (!r) return null;
  const actionId = r[1]!;
  const kind = r[2] as StoryArtOutcome;
  return { kind, nodeId, actionId, key: storyArtKey(nodeId, actionId, kind), path };
}

export type StoryArtIndex = {
  /** anahtar → story-art/ altındaki göreli yol */
  index: Record<string, string>;
  entries: StoryArtEntry[];
  /** Kurala uymayan dosyalar (yanlış ad, desteklenmeyen uzantı) */
  ignored: string[];
  /** Aynı anahtara birden fazla dosya (ör. scene.webp + scene.png); webp tercih edilir */
  duplicates: string[];
};

export function buildStoryArtIndex(relPaths: readonly string[]): StoryArtIndex {
  const rank = (p: string) => STORY_ART_EXTENSIONS.indexOf(p.split('.').pop()!.toLowerCase() as never);
  const index: Record<string, string> = {};
  const entries: StoryArtEntry[] = [];
  const ignored: string[] = [];
  const duplicates: string[] = [];
  for (const rel of [...relPaths].sort()) {
    const name = rel.split(/[\\/]/).pop() ?? '';
    // Gizli dosyalar ve manifest/not dosyaları görsel değildir, sessizce atla
    if (name.startsWith('.') || /\.(json|md|txt)$/i.test(name)) continue;
    const e = parseStoryArtPath(rel);
    if (!e) { ignored.push(rel); continue; }
    const prev = index[e.key];
    if (prev !== undefined) {
      duplicates.push(e.path);
      if (rank(e.path) >= rank(prev)) continue;
      entries.splice(entries.findIndex((x) => x.key === e.key), 1);
    }
    index[e.key] = e.path;
    entries.push(e);
  }
  return { index, entries, ignored, duplicates };
}
