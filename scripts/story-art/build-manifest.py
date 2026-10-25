#!/usr/bin/env python3
"""
Eksik / yeniden üretilecek sahne görselleri için üretim listesi çıkarır.

  python3 scripts/story-art/build-manifest.py
    -> scripts/story-art/manifest.json  (her görsel için hedef yol + istem metni)

Kaynak: story/*.json (tek doğruluk kaynağı) ve görsel brief'indeki sanat yönetimi.
Zaten var olan görseller listeye girmez; REDO içindekiler yeniden üretilmek üzere eklenir.
"""
import json, glob, os, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
ART = os.path.join(ROOT, 'client', 'public', 'story-art')

# node_id öneki -> story-art altındaki macera klasörü (brief ile aynı)
FOLDERS = [('mahzen_', 'mahzen'), ('konak_', 'mahzen'), ('yanki_', 'yankilar'), ('nota_', 'nota')]

# Kontrolde sorun çıkan, yeniden üretilecek görseller ve nedeni
REDO = {
    'mahzen_01_karanlik_mahzen/bilgin_muhru_coz_success':
        'Önceki sürümde mühür ve kemer üzerinde okunabilir Latince yazı vardı. Hiçbir yüzeyde okunabilir harf olmasın; '
        'mühür yalnızca okunamayan, soyut rün benzeri işaretlerle çizilsin.',
    'mahzen_01_karanlik_mahzen/dedektif_tuzagi_etkisizlestir_fail':
        'Önceki sürüm başarı karesiyle neredeyse aynıydı. Bu kare açıkça BAŞARISIZLIK anı olmalı: tuzak tetiklenmiş, '
        'mekanizma boşalmış, dedektif geri savruluyor; başarı karesinden kompozisyon ve ışıkla belirgin biçimde ayrışsın.',
    'mahzen_01_karanlik_mahzen/bilgin_muhru_coz_fail':
        'Önceki sürümde yerde belirgin kan izleri vardı. Kan gösterme; tehlikeyi soğuk mor ışık, savrulan toz, '
        'kararmış mühür ve gölgelerle anlat.',
}

STYLE = (
    'Tales of Ravenwood için tek karelik sahne illüstrasyonu. Gotik orta çağ karanlık-fantezi hikâye kitabı estetiği, '
    'dokulu el boyaması, sinematik ışık, katmanlı derinlik (ön/orta/arka plan), net odak. Palet: koyu erik, isli siyah, '
    'taş grisi, yosun yeşili, kirli fildişi; fener ve mumda az miktarda kehribar. Karanlığın etkisinde soğuk mor/kızıl '
    'vurgular, güvenli anlarda küçük altın ışık; neon yok. Ürkütücü ve gizemli ama kanlı/grafik değil; çocuk ruhlar '
    '(Elspeth, Ada) masum ve savunmasız, şiddetsiz. Oyuncular çoğunlukla omuz üstü siluet, el ya da ayak; isim yok. '
    'Blackthorne Konağı: dar, nemli taş duvarlar, gotik kemerler; fener tasarımı ve ters taç motifi her karede aynı. '
    'YATAY 16:9 KOMPOZİSYON. Tek an; çizgi roman paneli, kolaj, yazı, harf, altyazı, logo, filigran, arayüz YOK. '
    'Mühür ve levhalarda yalnızca okunamayan dekoratif işaretler. Kaynak metne sadık kal, yeni karakter/olay/nesne ekleme.'
)


def folder_for(node_id):
    for prefix, folder in FOLDERS:
        if node_id.startswith(prefix):
            return folder
    sys.exit(f'Bilinmeyen macera öneki: {node_id}')


def tone(outcome, success):
    hp = outcome.get('hp_change', 0) or 0
    end = (outcome.get('ending') or {}).get('type')
    if end == 'victory': return 'umutlu, zafer'
    if end == 'bittersweet': return 'buruk'
    if end == 'defeat': return 'yıkıcı'
    if success and hp >= 0: return 'umutlu ama tekinsiz'
    if success: return 'tekinsiz: başarılı ama bedeli var'
    return 'ürkütücü, tehlikeli' if hp > -2 else 'yıkıcı'


def load_nodes():
    nodes = []
    for f in sorted(glob.glob(os.path.join(ROOT, 'story', '*.json'))):
        d = json.load(open(f, encoding='utf-8'))
        nodes += d if isinstance(d, list) else [d]
    return nodes


def main():
    nodes = load_nodes()
    by_id = {n['node_id']: n for n in nodes}
    items = []
    for n in nodes:
        nid, folder = n['node_id'], folder_for(n['node_id'])
        scene_desc = n['public_text']
        def add(name, moment, extra=None, ref_scene=True):
            rel = f'{folder}/{nid}/{name}.webp'
            key = f'{nid}/{name}'
            exists = os.path.exists(os.path.join(ART, rel))
            if exists and key not in REDO:
                return
            prompt = STYLE + '\n\n' + moment
            if key in REDO:
                prompt += '\n\nDÜZELTME: ' + REDO[key]
            items.append({
                'id': key, 'adventure': folder, 'node_id': nid, 'output': rel,
                'reference': f'{folder}/{nid}/scene.webp' if ref_scene else None,
                'redo': key in REDO, 'prompt': prompt, **(extra or {}),
            })
        add('scene', f'Sahne: "{n["title"]}". An: SAHNENİN AÇILIŞI, oyuncular mekâna yeni girdi. '
                     f'Kaynak sahne metni: "{scene_desc}"', ref_scene=False)
        for a in n['actions']:
            for kind, label in (('success', 'BAŞARI'), ('fail', 'BAŞARISIZLIK')):
                o = a[kind]
                nxt = o.get('next_node_id')
                target = (o.get('ending') or {}).get('title') if not nxt else by_id.get(nxt, {}).get('title', nxt)
                moment = (
                    'Bu, aynı sahne ana görselinin devamlılık karesidir: mekân mimarisi, fenerler, nesne yerleşimi ve palet '
                    'referans görseldeki gibi kalsın. Yalnızca aşağıdaki zar sonucunun gerçekleştiği tek anı göster; sonucu '
                    'yazıyla belirtme. Başarı ve başarısızlık kareleri birbirinden açıkça ayırt edilebilsin.\n'
                    f'Sahne: "{n["title"]}". Sahne özeti: "{scene_desc}"\n'
                    f'Eylem: "{a["button_text"]}". Zar sonucu: {label}. Sonuç tonu: {tone(o, kind == "success")}.\n'
                    f'Sonuç metni: "{o["text"]}"\nHP değişimi: {o.get("hp_change", 0)}. Sonraki: {target}.'
                )
                add(f'{a["action_id"]}_{kind}', moment, {'action_id': a['action_id'], 'outcome': kind})
    out = os.path.join(os.path.dirname(__file__), 'manifest.json')
    json.dump(items, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    scenes = sum(1 for i in items if i['id'].endswith('/scene'))
    print(f'{len(items)} görsel ({scenes} ana sahne, {sum(i["redo"] for i in items)} yeniden üretim) -> {out}')


if __name__ == '__main__':
    main()
