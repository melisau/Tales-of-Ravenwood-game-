import { randomInt } from 'node:crypto';

/**
 * 4 harfli oda kodu (örn. HLLW). Karışan harfler (I, O) çıkarıldı;
 * masada yüksek sesle okunabilir olmalı. 24^4 ≈ 331k kombinasyon.
 */
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const CODE_LENGTH = 4;
const MAX_ATTEMPTS = 50;

export const ROOM_CODE_REGEX = new RegExp(`^[${ALPHABET}]{${CODE_LENGTH}}$`);

export function generateRoomCode(isTaken: (code: string) => boolean): string {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    let code = '';
    for (let i = 0; i < CODE_LENGTH; i++) code += ALPHABET[randomInt(ALPHABET.length)];
    if (!isTaken(code)) return code;
  }
  throw new Error('Benzersiz oda kodu üretilemedi (oda havuzu dolu olabilir)');
}

export function normalizeRoomCode(input: string): string {
  return input.trim().toUpperCase();
}
