import { fileURLToPath } from 'node:url';

/** Ortam değişkenlerinden okunan, tek yerde toplanmış ayarlar. */
const num = (key: string, fallback: number): number => {
  const v = process.env[key];
  const n = v === undefined ? NaN : Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export const config = {
  port: num('PORT', 3000),
  /**
   * Varsayılan: her kaynağa izin (aynı Wi-Fi'deki telefonlar 192.168.x.x'ten bağlanır).
   * İnternete yayınlarken CORS_ORIGIN=https://oyunun-adresi.com olarak kısıtla.
   */
  corsOrigin: (process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true) as string[] | boolean,
  // fileURLToPath: Windows sürücü harfleri ve Türkçe/boşluklu klasör adları için doğru yol üretir.
  storyDir: process.env.STORY_DIR ?? fileURLToPath(new URL('../../story', import.meta.url)),
  startNodeId: process.env.START_NODE_ID ?? 'mahzen_01_karanlik_mahzen',
  /** Varsayılan katı: kırık next_node_id varsa sunucu açılmaz. Taslak yazarken STRICT_STORY=false. */
  strictStory: process.env.STRICT_STORY !== 'false',

  basePlayerHp: num('BASE_PLAYER_HP', 10),

  timers: {
    reconnectGraceMs: num('RECONNECT_GRACE_MS', 30_000),
    emptyRoomTtlMs: num('EMPTY_ROOM_TTL_MS', 10 * 60_000),
  },

  rateLimit: { windowMs: 1_000, maxEvents: 10 },
} as const;

export type AppConfig = typeof config;
