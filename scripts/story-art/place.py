#!/usr/bin/env python3
"""
Üretilmiş bir görseli oyunun beklediği biçime getirip yerine koyar.

  python3 scripts/story-art/place.py <kaynak.png|jpg|webp> <manifest id ya da story-art göreli yolu>
  ör: python3 scripts/story-art/place.py out.png mahzen_02_muhurlu_kapi/kapiyi_dinle_success

- 16:9'a ortadan kırpar (en fazla %8; daha fazlası gerekiyorsa uyarır ve durur)
- 1600x900'e ölçekler, WebP (kalite 82) olarak kaydeder (~150-250 KB)
"""
import json, os, sys
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
ART = os.path.join(ROOT, 'client', 'public', 'story-art')
W, H = 1600, 900


def resolve(target):
    if target.endswith('.webp'):
        return target
    manifest = json.load(open(os.path.join(os.path.dirname(__file__), 'manifest.json'), encoding='utf-8'))
    for item in manifest:
        if item['id'] == target:
            return item['output']
    sys.exit(f'Manifestte yok: {target}')


def main(src, target, force=False):
    rel = resolve(target)
    im = Image.open(src).convert('RGB')
    w, h = im.size
    want = W / H
    if abs(w / h - want) / want > 0.08 and not force:
        sys.exit(f'{src}: oran {w}x{h} ({w/h:.2f}), 16:9 değil; kırpmak sahneyi bozabilir. --force ile zorla.')
    if w / h > want:
        nw = round(h * want); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = round(w / want); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    im = im.resize((W, H), Image.LANCZOS)
    out = os.path.join(ART, rel)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.save(out, 'WEBP', quality=82, method=6)
    print(f'{rel}  {os.path.getsize(out)//1024} KB')


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if a != '--force']
    if len(args) != 2:
        sys.exit(__doc__)
    main(args[0], args[1], '--force' in sys.argv)
