import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildStoryArtIndex, parseStoryArtPath, storyArtKey } from '../../shared/storyArt';
import { listStoryArtFiles } from '../../client/storyArtPlugin';
import { StoryRepository } from '../src/story/StoryRepository';

const here = path.dirname(fileURLToPath(import.meta.url));
const storyDir = path.resolve(here, '../../story');
const artDir = path.resolve(here, '../../client/public/story-art');

test('story-art: dosya adları doğru çözülür', () => {
  assert.deepEqual(parseStoryArtPath('mahzen/mahzen_01/scene.webp'),
    { kind: 'scene', nodeId: 'mahzen_01', key: 'mahzen_01:scene', path: 'mahzen/mahzen_01/scene.webp' });
  const r = parseStoryArtPath('mahzen\\mahzen_01\\bilgin_muhru_coz_fail.webp');
  assert.equal(r?.key, 'mahzen_01:bilgin_muhru_coz:fail');
  assert.equal(r?.kind, 'fail');
  assert.equal(parseStoryArtPath('mahzen/mahzen_01/medyum_success_success.png')?.key, 'mahzen_01:medyum_success:success');
  assert.equal(parseStoryArtPath('mahzen/mahzen_01/bilgin_muhru_coz_basari.webp'), null);
  assert.equal(parseStoryArtPath('mahzen/mahzen_01/scene.gif'), null);
  assert.equal(parseStoryArtPath('scene.webp'), null);
  assert.equal(storyArtKey('n', 'a', 'success'), 'n:a:success');
});

test('story-art: webp tercih edilir, manifest ve gizli dosyalar atlanır', () => {
  const r = buildStoryArtIndex([
    'm/n/scene.png', 'm/n/scene.webp', 'm/provided-art-manifest.json', 'm/n/.DS_Store', 'm/n/yanlis.webp',
  ]);
  assert.equal(r.index['n:scene'], 'm/n/scene.webp');
  assert.equal(r.entries.length, 1);
  assert.deepEqual(r.ignored, ['m/n/yanlis.webp']);
  assert.equal(r.duplicates.length, 1);
});

test('story-art: klasördeki her görsel gerçek bir sahneye ve eyleme ait', async () => {
  const repo = await StoryRepository.loadFromDir(storyDir, { strict: true });
  const { entries, ignored, duplicates } = buildStoryArtIndex(listStoryArtFiles(artDir));

  assert.deepEqual(ignored, [], `Adlandırma kuralına uymayan dosyalar:\n${ignored.join('\n')}`);
  assert.deepEqual(duplicates, [], `Aynı görsel için birden fazla dosya:\n${duplicates.join('\n')}`);

  const problems: string[] = [];
  const covered = new Set<string>();
  for (const e of entries) {
    const node = repo.get(e.nodeId);
    if (!node) { problems.push(`${e.path}: "${e.nodeId}" adında sahne yok`); continue; }
    if (e.kind !== 'scene' && !node.actions.some((a) => a.action_id === e.actionId)) {
      problems.push(`${e.path}: "${e.nodeId}" sahnesinde "${e.actionId}" eylemi yok`);
    }
    covered.add(e.key);
  }
  assert.deepEqual(problems, [], problems.join('\n'));

  // Eksik görseller hata değildir (oyun SVG çizime döner); yalnızca ilerlemeyi raporla.
  const all = repo.ids().map((id) => repo.get(id)!);
  const wanted = all.flatMap((n) => [
    storyArtKey(n.node_id),
    ...n.actions.flatMap((a) => [storyArtKey(n.node_id, a.action_id, 'success'), storyArtKey(n.node_id, a.action_id, 'fail')]),
  ]);
  const done = wanted.filter((k) => covered.has(k)).length;
  console.log(`story-art: ${done}/${wanted.length} görsel hazır`);
});
