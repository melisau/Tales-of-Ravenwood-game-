import type { AdventureId } from './types';

export const ADVENTURES: ReadonlyArray<{ id: AdventureId; title: string; startNodeId: string; description: string }> = [
  { id: 'mahzen', title: 'Karanlık Mahzen', startNodeId: 'mahzen_01_karanlik_mahzen', description: 'Blackthorne Konağı altında tutsak bir çocuk ruhu, kan mühürleri ve adını saklayan kadim bir varlık.' },
  { id: 'yankilar', title: 'Yankı Mağaraları', startNodeId: 'yanki_01_esik', description: 'Konağın kuyusu kayıp madencilerin seslerini geri veriyor. Rüzgârı izleyin, damlaların işaretini çözün; her yankı size ait değil.' },
  { id: 'on_ucuncu_nota', title: 'On Üçüncü Nota', startNodeId: 'nota_01_cocuk_odasi', description: 'Terk edilmiş çocuk odasındaki müzik kutusu, konağı her gece aynı saate hapsediyor. Eksik notayı onarmak mı, susturmak mı?' },
];
