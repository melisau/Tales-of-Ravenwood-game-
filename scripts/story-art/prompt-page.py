#!/usr/bin/env python3
"""
manifest.json'dan kopyala-yapıştır istem sayfası (tek HTML) üretir.

  python3 scripts/story-art/prompt-page.py <çıktı.html>

Ana sahneler ve sonuç görselleri sahne sahne listelenir. Her görsel için tam istem
(ChatGPT vb.) ve kısa istem (karakter sınırı olan araçlar için) kopyalanabilir.
"""
import glob, html, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
RAW = 'https://raw.githubusercontent.com/melisau/Tales-of-Ravenwood-game-/main/client/public/story-art/'

SHORT_STYLE = ('Gotik karanlık fantezi hikâye kitabı illüstrasyonu, dokulu el boyaması, koyu erik, isli siyah, '
               'taş grisi ve yosun yeşili palet, az kehribar fener ışığı. Yatay 16:9. Yazı, harf, logo, filigran ve kan yok.')
ADV = [('mahzen', 'Karanlık Mahzen'), ('yankilar', 'Yankı Mağaraları'), ('nota', 'On Üçüncü Nota')]


def main(out):
    manifest = json.load(open(os.path.join(HERE, 'manifest.json'), encoding='utf-8'))
    nodes = {}
    for f in sorted(glob.glob(os.path.join(ROOT, 'story', '*.json'))):
        d = json.load(open(f, encoding='utf-8'))
        for n in (d if isinstance(d, list) else [d]):
            nodes[n['node_id']] = n
    style = manifest[0]['prompt'].split('\n\n', 1)[0]
    items = []
    for it in manifest:
        n = nodes[it['node_id']]
        moment = it['prompt'].split('\n\n', 1)[1]
        rec = {'id': it['id'], 'node': it['node_id'], 'title': n['title'], 'adv': it['adventure'],
               'file': it['output'], 'moment': moment}
        if it['id'].endswith('/scene'):
            rec['kind'] = 'scene'
            rec['short'] = f'{SHORT_STYLE} Sahne "{n["title"]}": {n["public_text"]}'
        else:
            a = next(a for a in n['actions'] if a['action_id'] == it['action_id'])
            o = a[it['outcome']]
            rec.update(kind=it['outcome'], action=a['button_text'], text=o['text'], hp=o.get('hp_change', 0),
                       ref=RAW + it['reference'],
                       refReady=os.path.exists(os.path.join(ROOT, 'client', 'public', 'story-art', it['reference'])))
            label = 'BAŞARI' if it['outcome'] == 'success' else 'BAŞARISIZLIK'
            rec['short'] = (f'{SHORT_STYLE} Ekteki sahne görseliyle aynı mekân ve ışık. '
                            f'Eylem: {a["button_text"]}. Zar sonucu {label}: {o["text"]}')
        items.append(rec)
    order = {a: i for i, (a, _) in enumerate(ADV)}
    node_order = {nid: i for i, nid in enumerate(nodes)}
    items.sort(key=lambda r: (order[r['adv']], node_order[r['node']], r['kind'] != 'scene'))
    data = json.dumps({'style': style, 'adv': ADV, 'items': items}, ensure_ascii=False).replace('</', '<\\/')
    page = open(os.path.join(HERE, 'prompt-page.template.html'), encoding='utf-8').read()
    open(out, 'w', encoding='utf-8').write(page.replace('/*__DATA__*/null', data))
    print(f'{len(items)} istem -> {out} ({os.path.getsize(out)//1024} KB)')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
