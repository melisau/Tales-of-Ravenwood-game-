import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { CLASS_IDS } from '../../shared/types';
import { StoryRepository } from '../src/story/StoryRepository';

const storyDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../story');
const START = 'mahzen_01_karanlik_mahzen';

/**
 * Hikaye ağacının bütünlük testleri: yazarlar yeni düğüm ekledikçe
 * kırık bağlantı, ulaşılamayan sahne ya da sonsuz döngü olmasın.
 */
test('hikaye ağacı: kırık bağlantı yok, her düğüm ulaşılabilir, her yol bir sona çıkar', async () => {
  // strict: kırık next_node_id varsa burada patlar
  const repo = await StoryRepository.loadFromDir(storyDir, { strict: true });

  // Tüm düğümleri BFS ile topla
  const seen = new Set<string>([START]);
  const queue = [START];
  const endings = new Map<string, string>();
  while (queue.length) {
    const node = repo.get(queue.shift()!)!;
    assert.ok(node, 'düğüm bulunamadı');
    for (const a of node.actions) {
      for (const o of [a.success, a.fail]) {
        if (o.next_node_id === null) {
          assert.ok(o.ending, `${node.node_id}/${a.action_id}: son var ama ending etiketi yok`);
          endings.set(o.ending.title, o.ending.type);
        } else if (!seen.has(o.next_node_id)) {
          seen.add(o.next_node_id);
          queue.push(o.next_node_id);
        }
      }
    }
  }
  assert.ok(seen.size >= 10, `en az 10 sahne beklenir (${seen.size})`);
  assert.ok([...endings.values()].includes('victory'));
  assert.ok([...endings.values()].includes('bittersweet'));
  assert.ok([...endings.values()].includes('defeat'));

  // Her düğümden yalnızca ANY aksiyonlarla bile bir sona ulaşılabilmeli
  // (odada hiçbir özel sınıf yoksa bile oyun kilitlenmemeli).
  const canEnd = new Map<string, boolean>();
  const reachesEnd = (id: string, stack = new Set<string>()): boolean => {
    if (canEnd.has(id)) return canEnd.get(id)!;
    if (stack.has(id)) return false;
    stack.add(id);
    const node = repo.get(id)!;
    const ok = node.actions
      .filter((a) => a.required_class === 'ANY')
      .some((a) => [a.success, a.fail].some((o) => o.next_node_id === null || reachesEnd(o.next_node_id, stack)));
    stack.delete(id);
    canEnd.set(id, ok);
    return ok;
  };
  for (const id of seen) assert.ok(reachesEnd(id), `${id}: sadece ANY aksiyonlarla sona ulaşılamıyor`);
});

test('hikaye: her sınıfın en az iki sahnede gizli ipucu ve en az bir özel aksiyonu var', async () => {
  const repo = await StoryRepository.loadFromDir(storyDir, { strict: true });
  const ids = [START, 'mahzen_02_muhurlu_kapi', 'mahzen_03_elspeth_fisiltisi', 'mahzen_03b_sahte_ses', 'mahzen_04_kan_muhru',
    'mahzen_04b_uyanan_muhur', 'mahzen_05_gizli_gecit', 'mahzen_06_yanan_mahzen', 'konak_02_buyuk_salon', 'mahzen_07_ac_olan', 'mahzen_08_son_direnis'];
  const nodes = ids.map((id) => repo.get(id)!);
  for (const c of CLASS_IDS) {
    const hints = nodes.filter((n) => n.class_hints[c]).length;
    const actions = nodes.flatMap((n) => n.actions).filter((a) => a.required_class === c).length;
    assert.ok(hints >= 2, `${c}: sadece ${hints} sahnede ipucu var`);
    assert.ok(actions >= 1, `${c}: hiç özel aksiyonu yok`);
  }
  for (const n of nodes) for (const a of n.actions) assert.ok(a.dice_dc >= 10 && a.dice_dc <= 15, `${a.action_id} DC ${a.dice_dc}`);
});
