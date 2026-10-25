import type { AudioCue } from '../../../shared/types';

type SceneArt = { place: 'cellar' | 'cave' | 'hall' | 'nursery' | 'well' | 'cistern' | 'grove'; motif: 'seal' | 'door' | 'spirit' | 'voice' | 'fire' | 'passage' | 'portrait' | 'altar' | 'struggle' | 'musicbox' | 'gears' | 'frames' | 'mirror' | 'drops' | 'note' | 'entrance' | 'echo' | 'mouth' | 'water' | 'roots' | 'heart' };

const ART: Record<string, SceneArt> = {
  mahzen_01_karanlik_mahzen: { place: 'cellar', motif: 'seal' },
  mahzen_02_muhurlu_kapi: { place: 'cellar', motif: 'door' },
  mahzen_03_elspeth_fisiltisi: { place: 'cave', motif: 'spirit' },
  mahzen_03b_sahte_ses: { place: 'cave', motif: 'voice' },
  mahzen_04_kan_muhru: { place: 'cellar', motif: 'seal' },
  mahzen_04b_uyanan_muhur: { place: 'cave', motif: 'spirit' },
  mahzen_05_gizli_gecit: { place: 'cave', motif: 'passage' },
  mahzen_06_yanan_mahzen: { place: 'cellar', motif: 'fire' },
  konak_02_buyuk_salon: { place: 'hall', motif: 'portrait' },
  mahzen_07_ac_olan: { place: 'cellar', motif: 'altar' },
  mahzen_08_son_direnis: { place: 'cellar', motif: 'struggle' },
  nota_01_cocuk_odasi: { place: 'nursery', motif: 'musicbox' },
  nota_02_disli: { place: 'nursery', motif: 'gears' },
  nota_03_portreler: { place: 'hall', motif: 'frames' },
  nota_04_ayna: { place: 'nursery', motif: 'mirror' },
  nota_05_damla_mahzeni: { place: 'cave', motif: 'drops' },
  nota_06_son_nota: { place: 'nursery', motif: 'note' },
  yanki_01_esik: { place: 'well', motif: 'entrance' },
  yanki_02_damlalar: { place: 'cave', motif: 'drops' },
  yanki_03_agiz: { place: 'cave', motif: 'mouth' },
  yanki_04_sarnic: { place: 'cistern', motif: 'water' },
  yanki_05_kokler: { place: 'grove', motif: 'roots' },
  yanki_06_kalp: { place: 'cave', motif: 'heart' },
};

const SCENES = Object.values(ART);

const PROVIDED_ART: Record<string, string> = {
  'mahzen_01_karanlik_mahzen:scene': '/story-art/mahzen/mahzen_01_karanlik_mahzen/scene.webp',
  'mahzen_01_karanlik_mahzen:dedektif_tuzagi_etkisizlestir:success': '/story-art/mahzen/mahzen_01_karanlik_mahzen/dedektif_tuzagi_etkisizlestir_success.webp',
  'mahzen_01_karanlik_mahzen:dedektif_tuzagi_etkisizlestir:fail': '/story-art/mahzen/mahzen_01_karanlik_mahzen/dedektif_tuzagi_etkisizlestir_fail.webp',
  'mahzen_01_karanlik_mahzen:medyum_elspeth_ile_konus:success': '/story-art/mahzen/mahzen_01_karanlik_mahzen/medyum_elspeth_ile_konus_success.webp',
  'mahzen_01_karanlik_mahzen:medyum_elspeth_ile_konus:fail': '/story-art/mahzen/mahzen_01_karanlik_mahzen/medyum_elspeth_ile_konus_fail.webp',
  'mahzen_01_karanlik_mahzen:bilgin_muhru_coz:success': '/story-art/mahzen/mahzen_01_karanlik_mahzen/bilgin_muhru_coz_success.webp',
  'mahzen_01_karanlik_mahzen:bilgin_muhru_coz:fail': '/story-art/mahzen/mahzen_01_karanlik_mahzen/bilgin_muhru_coz_fail.webp',
  'mahzen_01_karanlik_mahzen:izci_gizli_gecidi_bul:success': '/story-art/mahzen/mahzen_01_karanlik_mahzen/izci_gizli_gecidi_bul_success.webp',
  'mahzen_01_karanlik_mahzen:izci_gizli_gecidi_bul:fail': '/story-art/mahzen/mahzen_01_karanlik_mahzen/izci_gizli_gecidi_bul_fail.webp',
  'mahzen_01_karanlik_mahzen:fenerleri_yak_ve_ilerle:success': '/story-art/mahzen/mahzen_01_karanlik_mahzen/fenerleri_yak_ve_ilerle_success.webp',
  'mahzen_01_karanlik_mahzen:fenerleri_yak_ve_ilerle:fail': '/story-art/mahzen/mahzen_01_karanlik_mahzen/fenerleri_yak_ve_ilerle_fail.webp',
  'mahzen_01_karanlik_mahzen:merdivenden_geri_cekil:success': '/story-art/mahzen/mahzen_01_karanlik_mahzen/merdivenden_geri_cekil_success.webp',
  'mahzen_01_karanlik_mahzen:merdivenden_geri_cekil:fail': '/story-art/mahzen/mahzen_01_karanlik_mahzen/merdivenden_geri_cekil_fail.webp',
  'mahzen_01_karanlik_mahzen:mahzen_taca_fener:success': '/story-art/mahzen/mahzen_01_karanlik_mahzen/mahzen_taca_fener_success.webp',
  'mahzen_01_karanlik_mahzen:mahzen_taca_fener:fail': '/story-art/mahzen/mahzen_01_karanlik_mahzen/mahzen_taca_fener_fail.webp',
  'mahzen_02_muhurlu_kapi:scene': '/story-art/mahzen/mahzen_02_muhurlu_kapi/scene.webp',
  'mahzen_02_muhurlu_kapi:tamirci_mandali_kaldir:success': '/story-art/mahzen/mahzen_02_muhurlu_kapi/tamirci_mandali_kaldir_success.webp',
  'mahzen_02_muhurlu_kapi:tamirci_mandali_kaldir:fail': '/story-art/mahzen/mahzen_02_muhurlu_kapi/tamirci_mandali_kaldir_fail.webp',
  'mahzen_02_muhurlu_kapi:dedektif_anahtari_bul:success': '/story-art/mahzen/mahzen_02_muhurlu_kapi/dedektif_anahtari_bul_success.webp',
  'mahzen_02_muhurlu_kapi:dedektif_anahtari_bul:fail': '/story-art/mahzen/mahzen_02_muhurlu_kapi/dedektif_anahtari_bul_fail.webp',
  'mahzen_02_muhurlu_kapi:avci_tuz_cizgisi:success': '/story-art/mahzen/mahzen_02_muhurlu_kapi/avci_tuz_cizgisi_success.webp',
  'mahzen_02_muhurlu_kapi:avci_tuz_cizgisi:fail': '/story-art/mahzen/mahzen_02_muhurlu_kapi/avci_tuz_cizgisi_fail.webp',
};

/** Storybook-like, original scene art drawn in SVG; no image service or font dependency. */
export function SceneIllustration({ sceneId, title, ambience, action, actionId, result, success }: {
  sceneId: string; title: string; ambience: AudioCue | null;
  action?: string; actionId?: string; result?: string; success?: boolean;
}) {
  const art = ART[sceneId] ?? SCENES[hash(sceneId) % SCENES.length];
  const hasResult = Boolean(result);
  const cold = ambience === 'scary_cave' || success === false;
  const glint = cold ? '#ee7874' : '#e9c86f';
  const actionMotif = hasResult ? chooseMotif(`${action} ${result}`) : null;
  const resourceId = `rw-${hash(`${sceneId}:${action ?? ''}:${result ?? ''}`)}`;
  const resultArtKey = hasResult && actionId ? `${sceneId}:${actionId}:${success ? 'success' : 'fail'}` : null;
  const illustrationUrl = (resultArtKey && PROVIDED_ART[resultArtKey]) || PROVIDED_ART[`${sceneId}:scene`];
  return (
    <figure className="rw-scene-art m-0 overflow-hidden rounded-xl border border-[#c9a24a]/35 bg-[#100a17]" aria-label={`${title} sahne çizimi${hasResult ? `: ${action}, ${success ? 'başarılı' : 'başarısız'}` : ''}`}>
      {illustrationUrl ? <img src={illustrationUrl} alt={`${title}${hasResult ? ` — ${action}, ${success ? 'başarı' : 'başarısızlık'}` : ''}`} className="block max-h-[420px] w-full object-cover" loading="lazy" /> : <svg viewBox="0 0 720 300" role="img" aria-hidden="true" className="block h-auto max-h-[300px] w-full">
        <defs>
          <linearGradient id={`${resourceId}-sky`} x2="0" y2="1"><stop stopColor={cold ? '#170f20' : '#251834'} /><stop offset="1" stopColor={art.place === 'nursery' || art.place === 'hall' ? '#392238' : '#101b20'} /></linearGradient>
          <linearGradient id={`${resourceId}-light`} x2="1" y2="1"><stop stopColor={glint} stopOpacity=".4" /><stop offset="1" stopColor={glint} stopOpacity="0" /></linearGradient>
          <radialGradient id={`${resourceId}-glow`}><stop stopColor={glint} stopOpacity=".62" /><stop offset="1" stopColor={glint} stopOpacity="0" /></radialGradient>
          <pattern id={`${resourceId}-grain`} width="31" height="27" patternUnits="userSpaceOnUse"><circle cx="4" cy="7" r=".8" fill="#f7dfae" opacity=".15"/><circle cx="22" cy="19" r=".6" fill="#f7dfae" opacity=".12"/></pattern>
          <filter id={`${resourceId}-blur`}><feGaussianBlur stdDeviation="13" /></filter>
        </defs>
        <rect width="720" height="300" fill={`url(#${resourceId}-sky)`} />
        <circle cx={art.place === 'nursery' ? 560 : 138} cy="70" r="71" fill={`url(#${resourceId}-glow)`} filter={`url(#${resourceId}-blur)`} />
        <path d={placeShape(art.place)} fill="#090812" opacity=".65" />
        {art.place === 'cave' || art.place === 'cellar' || art.place === 'well' || art.place === 'cistern' ? <Cave details={art.place} /> : <Room details={art.place} />}
        <path d="M0 250 Q95 222 190 253 T380 248 T570 250 T720 235 V300 H0Z" fill={art.place === 'grove' ? '#17221c' : '#121018'} />
        <path d="M0 271 Q120 248 240 274 T480 270 T720 258" fill="none" stroke="#6c5847" strokeOpacity=".45" strokeWidth="3" />
        <MainMotif motif={art.motif} color={glint} resourceId={resourceId} />
        {hasResult && <OutcomeMoment success={success !== false} motif={actionMotif ?? art.motif} color={glint} resourceId={resourceId} />}
        <rect width="720" height="300" fill={`url(#${resourceId}-grain)`} />
        <path d="M0 227 Q90 202 173 230 T330 226 T496 229 T720 213" fill="none" stroke="#d3bd99" strokeOpacity=".13" strokeWidth="2" />
      </svg>}
      <figcaption className="flex min-h-9 items-center justify-between gap-3 border-t border-white/5 bg-[#120b18] px-3 py-2 text-xs text-[#d7c6a6]">
        <span className="truncate font-semibold">{title}</span>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 ${hasResult ? success ? 'border-[#9be29b]/40 text-[#b9ebac]' : 'border-[#ef7877]/40 text-[#ffb1ac]' : 'border-[#c9a24a]/35 text-[#e8c66a]'}`}>
          {hasResult ? success ? 'Yol aydınlandı' : 'Karanlık karşılık verdi' : 'Sahne tasviri'}
        </span>
      </figcaption>
    </figure>
  );
}

function Cave({ details }: { details: SceneArt['place'] }) {
  return <>
    <path d="M0 0H720V34L689 58 670 95 639 73 614 111 589 70 562 106 529 68 500 99 467 58 440 99 405 68 370 99 337 59 305 105 277 70 240 114 207 72 176 105 146 68 117 107 84 67 51 102 22 66 0 91Z" fill="#080912" />
    <path d="M42 0V204 Q47 128 87 0M636 0V214Q631 128 590 0" fill="#100d18" stroke="#57404a" strokeOpacity=".55" strokeWidth="4" />
    <path d="M60 274V95Q360 -45 660 95V274" fill="none" stroke="#746078" strokeOpacity=".32" strokeWidth="9" />
    <path d="M95 251Q180 220 254 246T420 242T626 226" fill="none" stroke="#aa977f" strokeOpacity=".4" strokeWidth="3" />
    {details === 'well' && <><ellipse cx="360" cy="263" rx="153" ry="32" fill="#09090e" stroke="#88715c" strokeWidth="8"/><path d="M260 258V122L360 71 460 122V258" fill="none" stroke="#7d6a70" strokeWidth="9"/><path d="M283 242H437" stroke="#bdb3a1" strokeOpacity=".6" strokeWidth="5"/></>}
    {details === 'cistern' && <><path d="M95 190V102H210V190M512 190V102H627V190" fill="#171728" stroke="#8c7380" strokeWidth="5"/><path d="M0 250Q130 218 240 249T470 249T720 237V300H0Z" fill="#27373f" opacity=".7"/><path d="M25 254Q145 228 255 255T490 253T697 245" fill="none" stroke="#91abb0" strokeOpacity=".5" strokeWidth="3"/></>}
    {details === 'cellar' && <><path d="M80 249V143H210V249M510 249V143H640V249" fill="#211925" stroke="#715662" strokeWidth="4"/><path d="M103 174H188M103 201H188M532 174H617M532 201H617" stroke="#92755e" strokeWidth="3" opacity=".7"/></>}
    {details === 'cave' && <path d="M70 241Q360 175 650 237" fill="none" stroke="#2d3442" strokeWidth="27" opacity=".7"/>}
  </>;
}

function Room({ details }: { details: SceneArt['place'] }) {
  return <>
    <path d="M45 271V26H675V271M45 91L360 24 675 91" fill="#211626" stroke="#765968" strokeWidth="5" />
    <path d="M98 240V112Q98 52 164 52T230 112V242Z" fill="#151725" stroke="#b39a72" strokeWidth="5" />
    <path d="M118 131Q164 91 211 131V232H118Z" fill="#273142" />
    <path d="M164 104V240M106 166H222" stroke="#c8a46b" strokeWidth="4" opacity=".7" />
    {details === 'nursery' ? <><path d="M436 234V168H593V234M419 234H608M450 168V151H579V168" fill="#603c47" stroke="#d2a56a" strokeWidth="5"/><path d="M459 201H574M477 169V233M548 169V233" stroke="#d4b781" strokeWidth="3" opacity=".7"/><path d="M484 141Q514 107 546 141Z" fill="#a35b70" stroke="#e0b76d" strokeWidth="3"/><circle cx="515" cy="143" r="4" fill="#ffd977"/></> : <><path d="M436 247V112Q436 53 536 53T636 112V247Z" fill="#161421" stroke="#927962" strokeWidth="6"/><path d="M462 130Q535 83 610 130V237H462Z" fill="#342334"/><circle cx="535" cy="137" r="22" fill="#c5a173" opacity=".45"/></>}
  </>;
}

function MainMotif({ motif, color, resourceId }: { motif: SceneArt['motif']; color: string; resourceId: string }) {
  const stroke = '#d4b77e';
  if (['seal','altar','heart','struggle'].includes(motif)) return <g stroke={stroke} strokeWidth="5" fill="none" strokeLinejoin="round"><path d="M315 252V167Q360 124 405 167V252M289 251H431"/><path d="M360 142 390 176 360 210 330 176Z" fill="#521827"/><circle cx="360" cy="176" r="10" fill={color}/><path d="M340 228H380M351 214V196M369 214V196"/></g>;
  if (['door','passage','entrance','mouth'].includes(motif)) return <g stroke={stroke} strokeWidth="5" fill="#17121c" strokeLinejoin="round"><path d="M281 253V130Q281 91 360 71Q439 91 439 130V253Z"/><path d="M307 252V140Q307 113 360 95Q413 113 413 140V252Z" fill="#241424"/><circle cx="394" cy="185" r="6" fill={color}/><path d="M348 252V177Q360 158 372 177V252" stroke="#916f61"/></g>;
  if (['spirit','voice','echo'].includes(motif)) return <g stroke={stroke} strokeWidth="4" fill="none"><path d="M360 115Q321 128 330 178Q332 205 313 232H407Q388 205 390 178Q399 128 360 115Z" fill="#b6c5d0" fillOpacity=".18"/><circle cx="350" cy="164" r="4" fill={color}/><circle cx="370" cy="164" r="4" fill={color}/><path d="M345 185Q360 194 375 185"/><path d="M270 135q-26 22 0 44m180-44q26 22 0 44" opacity=".55"/></g>;
  if (['fire'].includes(motif)) return <g><circle cx="360" cy="210" r="58" fill={`url(#${resourceId}-glow)`}/><path d="M360 249Q299 245 335 190Q345 174 348 150Q390 181 384 202Q423 182 402 250Z" fill="#e57249" stroke="#f7c870" strokeWidth="4"/><path d="M362 244Q339 239 355 207Q366 224 377 231Q383 240 362 244Z" fill="#fff0b0"/></g>;
  if (['musicbox','gears','frames','mirror','note'].includes(motif)) return <g stroke={stroke} strokeWidth="4" strokeLinejoin="round"><path d="M309 219 326 163H394L411 219V245H309Z" fill="#563b49"/><path d="M319 219H401V244H319ZM326 163 341 143H380L394 163Z" fill="#805161"/><path d="M343 161Q360 135 378 161" fill="none"/><circle cx="360" cy="198" r="12" fill={color}/><path d="m360 180 4 10-4 4-4-4Zm-20 22 10-4 4 4-4 4Zm40 0-10-4-4 4 4 4Z" fill="#f1d994"/><path d="M360 94v28m-42-17 21 21m63-21-21 21" fill="none" opacity=".75"/></g>;
  if (['drops','water'].includes(motif)) return <g stroke="#a7cbd2" strokeWidth="4" fill="none"><path d="M360 112C360 112 330 156 330 174A30 30 0 0 0 390 174C390 156 360 112 360 112Z" fill="#7eabb9" fillOpacity=".4"/><path d="M270 225Q310 207 350 225T430 225T510 221"/><path d="M290 246Q330 232 370 246T450 245" opacity=".55"/><circle cx="360" cy="175" r="7" fill={color}/></g>;
  if (['roots','grove'].includes(motif)) return <g stroke="#b59266" strokeWidth="9" fill="none" strokeLinecap="round"><path d="M360 264V149M360 182Q317 157 294 137M359 201Q410 172 429 137M360 232Q321 212 302 204M360 231Q404 219 423 199"/><path d="M290 240Q323 230 335 265M421 238Q393 226 382 265" strokeWidth="6"/></g>;
  return <g stroke={stroke} strokeWidth="5" fill="none"><path d="M330 239V160L360 129 390 160V239Z"/><path d="M343 192H377M360 175V211" stroke={color}/></g>;
}

function OutcomeMoment({ success, motif, color, resourceId }: { success: boolean; motif: SceneArt['motif']; color: string; resourceId: string }) {
  const focusX = motif === 'fire' ? 372 : motif === 'water' || motif === 'drops' ? 348 : 360;
  return <g className="rw-scene-outcome" aria-hidden="true">
    <path d={success ? 'M0 20 205 0 314 300 0 300Z' : 'M720 16 550 0 441 300 720 300Z'} fill={`url(#${resourceId}-light)`} opacity=".55" />
    {success ? <><circle cx={focusX} cy="164" r="92" fill="none" stroke={color} strokeOpacity=".75" strokeWidth="3" strokeDasharray="4 9"/><path d="M349 115l11-21 11 21m-22 137 11 21 11-21M295 164l-22-10m151 10 51-10" stroke={color} strokeWidth="3" opacity=".8"/></> : <><path d="M340 98 372 144 344 169 383 204 352 254" fill="none" stroke="#f18c7b" strokeWidth="4" opacity=".85"/><circle cx={focusX} cy="173" r="78" fill="none" stroke="#e9646b" strokeOpacity=".52" strokeWidth="4" strokeDasharray="10 12"/><path d="m330 117-13-17m83 160 14 16m-91-29-18 8m117-94 18-8" stroke="#ffb48c" strokeWidth="3"/></>}
    <g transform="translate(512 216) scale(.38)" opacity=".85"><MainMotif motif={motif} color={color} resourceId={resourceId}/></g>
    <g transform="translate(595 39)"><circle r="25" fill="#100a17" stroke={success ? '#b5df9d' : '#f18c7b'} strokeWidth="3"/><path d={success ? 'M-10 0-3 8 12-10' : 'M-9-9 9 9M9-9-9 9'} fill="none" stroke={success ? '#b5df9d' : '#f18c7b'} strokeWidth="4" strokeLinecap="round" /></g>
    <title>{success ? 'Seçilen eylem başarıyla sahneye yansıdı' : 'Seçilen eylem başarısız oldu; sahne karardı'}</title>
  </g>;
}

function placeShape(place: SceneArt['place']) {
  return place === 'grove' ? 'M0 32Q115 47 184 22T360 36T550 22T720 34V107H0Z' : place === 'hall' || place === 'nursery' ? 'M0 0H720V36L675 55 720 69V90L660 74V0Z' : 'M0 0H42L0 63ZM720 0H677L720 58Z';
}

function chooseMotif(text: string): SceneArt['motif'] {
  const matchers: Array<[RegExp, SceneArt['motif']]> = [
    [/ateş|alev|yan|kıvılcım|kum/, 'fire'], [/damla|su|ıslak|sarnıç|kuyu/, 'water'], [/müzik|nota|kutu|ezgi|yay|dişli/, 'musicbox'],
    [/portre|resim|plaket|çerçeve/, 'frames'], [/ayna|yansı/, 'mirror'], [/zincir|sunak|varlık|adını|mühür/, 'altar'],
    [/kapı|kilit|aç|kır|geçit|merdiven|çık/, 'door'], [/kök|dal|orman/, 'roots'], [/hayalet|ruh|fısıltı|ses|yankı/, 'spirit'],
    [/kitap|defter|sayfa|yazı|notu/, 'frames'], [/fener|ışık|parla/, 'note'], [/koş|kaç|izle|ilerle|yol/, 'passage'],
  ];
  return matchers.find(([pattern]) => pattern.test(text))?.[1] ?? 'seal';
}

function hash(value: string) { let result = 0; for (const character of value) result = (result * 31 + character.charCodeAt(0)) | 0; return Math.abs(result); }
