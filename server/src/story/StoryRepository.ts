import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { StoryNode } from '../../../shared/types';
import { storyFileSchema } from './schema';

export interface StoryRepositoryOptions {
  /** true: var olmayan bir next_node_id'ye işaret eden düğüm varsa yükleme başarısız olur. */
  strict: boolean;
  logger?: Pick<Console, 'warn' | 'info'>;
}

/**
 * Hikaye ağacını diskteki JSON dosyalarından yükler, şemaya göre doğrular
 * ve bellekte değiştirilemez (frozen) olarak tutar.
 */
export class StoryRepository {
  private constructor(private readonly nodes: ReadonlyMap<string, StoryNode>) {}

  static fromNodes(nodes: StoryNode[], opts: StoryRepositoryOptions): StoryRepository {
    const map = new Map<string, StoryNode>();
    for (const node of nodes) {
      if (map.has(node.node_id)) throw new Error(`Tekrarlanan node_id: ${node.node_id}`);
      map.set(node.node_id, deepFreeze(node));
    }
    const dangling = StoryRepository.findDanglingRefs(map);
    if (dangling.length > 0) {
      const msg = `Henüz yazılmamış düğümlere referans: ${dangling.join(', ')}`;
      if (opts.strict) throw new Error(msg);
      opts.logger?.warn(`[story] ${msg} (bu yollar seçilirse oyun "devam edecek" sonuyla biter)`);
    }
    opts.logger?.info(`[story] ${map.size} düğüm yüklendi`);
    return new StoryRepository(map);
  }

  static async loadFromDir(dir: string, opts: StoryRepositoryOptions): Promise<StoryRepository> {
    const files = (await readdir(dir)).filter((f) => f.endsWith('.json')).sort();
    const nodes: StoryNode[] = [];
    for (const file of files) {
      const raw = JSON.parse(await readFile(path.join(dir, file), 'utf8'));
      const parsed = storyFileSchema.safeParse(raw);
      if (!parsed.success) {
        throw new Error(`[story] ${file} geçersiz:\n${parsed.error.issues.map((i) => ` - ${i.path.join('.')}: ${i.message}`).join('\n')}`);
      }
      nodes.push(...(Array.isArray(parsed.data) ? parsed.data : [parsed.data]));
    }
    return StoryRepository.fromNodes(nodes, opts);
  }

  get(nodeId: string): StoryNode | undefined {
    return this.nodes.get(nodeId);
  }

  has(nodeId: string): boolean {
    return this.nodes.has(nodeId);
  }

  private static findDanglingRefs(map: Map<string, StoryNode>): string[] {
    const missing = new Set<string>();
    for (const node of map.values()) {
      for (const a of node.actions) {
        for (const next of [a.success.next_node_id, a.fail.next_node_id]) {
          if (next !== null && !map.has(next)) missing.add(next);
        }
      }
    }
    return [...missing];
  }
}

function deepFreeze<T>(obj: T): T {
  if (obj && typeof obj === 'object') {
    Object.values(obj).forEach(deepFreeze);
    Object.freeze(obj);
  }
  return obj;
}
