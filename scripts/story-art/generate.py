#!/usr/bin/env python3
"""
manifest.json'daki görselleri CellCog ile üretir ve place.py ile yerine koyar.

  CELLCOG_API_KEY=sk_... python3 scripts/story-art/generate.py <node_id> [--only id1,id2] [--tier max]

- Bir sahnenin eksik görselleri tek CellCog sohbetinde üretilir (süreklilik için).
- Sahnenin ana görseli yoksa önce o üretilir, sonuç görselleri ona referansla üretilir.
- Ham çıktılar scripts/story-art/.raw/ altına iner (git'e girmez).
"""
import json, os, sys, subprocess
from cellcog import CellCogClient

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
ART = os.path.join(ROOT, 'client', 'public', 'story-art')
RAW = os.path.join(HERE, '.raw')
# Üslup referansı: kullanıcının onayladığı ilk sahne görseli
STYLE_REF = os.path.join(ART, 'mahzen', 'mahzen_01_karanlik_mahzen', 'scene.webp')


def chat(client, prompt, label, tier):
    r = client.create_chat(prompt=prompt, task_label=label, chat_mode='agent', chat_tier=tier, timeout=3600)
    print(r['message'])
    if r.get('timed_out'):
        r = client.wait_for_completion(chat_id=r['chat_id'], timeout=3600)
        print(r['message'])
    return r


def batch_prompt(items, refs):
    lines = [
        f'Aşağıdaki {len(items)} görselin HER BİRİNİ ayrı bir PNG dosyası olarak oluştur. '
        'Hepsi YATAY 16:9 (ör. 1920x1080), 2K kalite. Görsellerin hiçbirinde okunabilir yazı, harf, logo, filigran ya da arayüz olmasın.',
        'Üslup referansı (palet, fırça dokusu, ışık; içeriğini kopyalama): ' + ''.join(f'<SHOW_FILE>{p}</SHOW_FILE>' for p in refs),
        '',
    ]
    for n, it in enumerate(items, 1):
        lines.append(f'--- GÖRSEL {n} ---')
        lines.append(it['prompt'])
        if it.get('redo'):
            old = os.path.join(ART, it['output'])
            if os.path.exists(old):
                lines.append(f'Bu görselin ÖNCEKİ sürümü (düzeltmede belirtilen sorun dışında kompozisyon ve üslubu koru): <SHOW_FILE>{old}</SHOW_FILE>')
            if it.get('outcome') == 'fail':
                twin = old.replace('_fail.webp', '_success.webp')
                if os.path.exists(twin):
                    lines.append(f'Aynı eylemin BAŞARI karesi (bu başarısızlık karesi bundan açıkça farklı görünmeli): <SHOW_FILE>{twin}</SHOW_FILE>')
        lines.append(f'<GENERATE_FILE>{os.path.join(RAW, it["id"] + ".png")}</GENERATE_FILE>')
        lines.append('')
    return '\n'.join(lines)


def place(it):
    src = os.path.join(RAW, it['id'] + '.png')
    if not os.path.exists(src):
        print(f'EKSİK ÇIKTI: {it["id"]}')
        return False
    subprocess.run([sys.executable, os.path.join(HERE, 'place.py'), src, it['id']], check=True)
    return True


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    node = args[0]
    only = args[args.index('--only') + 1].split(',') if '--only' in args else None
    tier = args[args.index('--tier') + 1] if '--tier' in args else 'flash'
    manifest = json.load(open(os.path.join(HERE, 'manifest.json'), encoding='utf-8'))
    items = [i for i in manifest if i['node_id'] == node and (not only or i['id'].split('/')[1] in only)]
    if not items:
        sys.exit(f'{node}: üretilecek görsel yok')
    os.makedirs(os.path.join(RAW, node), exist_ok=True)
    client = CellCogClient(agent_provider='claude-code')

    scene = [i for i in items if i['id'].endswith('/scene')]
    rest = [i for i in items if not i['id'].endswith('/scene')]
    if scene:
        chat(client, batch_prompt(scene, [STYLE_REF]), f'{node}-scene', tier)
        place(scene[0])
    scene_path = os.path.join(ART, rest[0]['reference']) if rest else None
    # CellCog'a çok uzun istem göndermemek için sonuçları 6'şarlı gruplar halinde üret
    for k in range(0, len(rest), 6):
        group = rest[k:k + 6]
        refs = [STYLE_REF] + ([scene_path] if scene_path and os.path.exists(scene_path) and scene_path != STYLE_REF else [])
        prompt = batch_prompt(group, refs)
        if scene_path and os.path.exists(scene_path):
            prompt = ('SÜREKLİLİK: Sonuç görselleri, şu sahne görselinin devamıdır; mekân, ışık ve nesne yerleşimi aynı kalsın: '
                      f'<SHOW_FILE>{scene_path}</SHOW_FILE>\n\n') + prompt
        chat(client, prompt, f'{node}-results-{k // 6 + 1}', tier)
        for it in group:
            place(it)


if __name__ == '__main__':
    main()
