/**
 * Dinamik Zorluk ve Zar Dengeleme (Dynamic Scaling Algorithm)
 *
 *  Oyuncu  | DC          | Parti HP | Başarısızlık hasarı
 *  --------|-------------|----------|---------------------------------------------
 *  2 – 4   | %15 kolay   | x1.30    | Zarı atan oyuncu alır
 *  5 – 8   | standart    | x1.00    | Zarı atan oyuncu alır
 *  9 – 12  | %20 zor     | x1.00    | Gruba dağıtılır (kimse tek başına ölmez)
 *
 * Saf fonksiyonlardır; hem sunucuda hem istemcide (önizleme için) kullanılabilir.
 */

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 12;

/** d20 sisteminde anlamlı DC aralığı: nat 1 her zaman başarısız, nat 20 her zaman başarılı. */
export const DC_FLOOR = 2;
export const DC_CEIL = 20;

export type ScalingTier = 'SMALL' | 'STANDARD' | 'LARGE';

export interface ScalingResult {
  playerCount: number;
  tier: ScalingTier;
  baseDC: number;
  finalDC: number;
  dcMultiplier: number;
  /** Başlangıç HP'si bu çarpanla büyütülür. */
  partyHPMultiplier: number;
  /** true ise grup başarısızlığında hasar oyunculara bölünür. */
  distributeDamage: boolean;
  /** Atılan d20 + bonus ile başarı olasılığı (0-1), tasarımcı için bilgi. */
  successChance: number;
}

interface TierConfig {
  tier: ScalingTier;
  dcMultiplier: number;
  partyHPMultiplier: number;
  distributeDamage: boolean;
}

const TIERS: ReadonlyArray<{ max: number; config: TierConfig }> = [
  { max: 4, config: { tier: 'SMALL', dcMultiplier: 0.85, partyHPMultiplier: 1.3, distributeDamage: false } },
  { max: 8, config: { tier: 'STANDARD', dcMultiplier: 1.0, partyHPMultiplier: 1.0, distributeDamage: false } },
  { max: 12, config: { tier: 'LARGE', dcMultiplier: 1.2, partyHPMultiplier: 1.0, distributeDamage: true } },
];

function assertPlayerCount(playerCount: number): void {
  if (!Number.isInteger(playerCount) || playerCount < MIN_PLAYERS || playerCount > MAX_PLAYERS) {
    throw new RangeError(`playerCount ${MIN_PLAYERS}-${MAX_PLAYERS} arasında tam sayı olmalı (gelen: ${playerCount})`);
  }
}

export function getTierConfig(playerCount: number): TierConfig {
  assertPlayerCount(playerCount);
  return TIERS.find((t) => playerCount <= t.max)!.config;
}

/**
 * d20 + bonus >= DC başarı olasılığı. Nat 1 her zaman başarısız, nat 20 her zaman başarılı.
 */
export function d20SuccessChance(dc: number, bonus = 0): number {
  const needed = dc - bonus; // gereken ham zar
  const successes = Math.min(19, Math.max(1, 21 - needed)); // 2..20 arası yüzler + nat20
  return successes / 20;
}

/**
 * Ana fonksiyon: oyuncu sayısı ve temel DC'den optimize edilmiş final DC'yi
 * ve parti HP çarpanını döndürür.
 */
export function scaleDifficulty(playerCount: number, baseDC: number, rollBonus = 0): ScalingResult {
  if (!Number.isFinite(baseDC) || baseDC < 1 || baseDC > 30) {
    throw new RangeError(`baseDC 1-30 arasında olmalı (gelen: ${baseDC})`);
  }
  const cfg = getTierConfig(playerCount);
  const raw = Math.round(baseDC * cfg.dcMultiplier);
  const finalDC = Math.min(DC_CEIL, Math.max(DC_FLOOR, raw));

  return {
    playerCount,
    tier: cfg.tier,
    baseDC,
    finalDC,
    dcMultiplier: cfg.dcMultiplier,
    partyHPMultiplier: cfg.partyHPMultiplier,
    distributeDamage: cfg.distributeDamage,
    successChance: d20SuccessChance(finalDC, rollBonus),
  };
}

/** Oyuncu başına başlangıç HP'si (küçük gruplarda daha yüksek). */
export function startingHpPerPlayer(playerCount: number, baseHp = 10): number {
  return Math.round(baseHp * getTierConfig(playerCount).partyHPMultiplier);
}

/**
 * Hasarı oyunculara dağıtır.
 * - distribute=false: hasarın tamamı zarı atan oyuncuya.
 * - distribute=true : hasar 1'er puan halinde, zarı atandan başlayarak sırayla
 *   en çok HP'si kalan oyunculara verilir. Toplam hasar korunur, kimse
 *   gereksiz yere öldürülmez.
 *
 * @returns playerId -> alınan hasar (pozitif sayı)
 */
export function distributeDamage(
  totalDamage: number,
  players: ReadonlyArray<{ id: string; hp: number }>,
  rollerId: string,
  distribute: boolean,
): Record<string, number> {
  const dmg = Math.max(0, Math.floor(totalDamage));
  const result: Record<string, number> = {};
  if (dmg === 0 || players.length === 0) return result;

  if (!distribute) {
    result[rollerId] = dmg;
    return result;
  }

  const alive = players.filter((p) => p.hp > 0);
  const pool = alive.length > 0 ? alive : [...players];
  const remainingHp = new Map(pool.map((p) => [p.id, p.hp]));

  // Zarı atan ilk sırada; geri kalanlar kalan HP'ye göre azalan sırada.
  for (let i = 0; i < dmg; i++) {
    const sorted = [...pool].sort((a, b) => {
      if (i === 0) {
        if (a.id === rollerId) return -1;
        if (b.id === rollerId) return 1;
      }
      return (remainingHp.get(b.id)! - (result[b.id] ?? 0)) - (remainingHp.get(a.id)! - (result[a.id] ?? 0));
    });
    const target = sorted[0]!;
    result[target.id] = (result[target.id] ?? 0) + 1;
  }
  return result;
}
