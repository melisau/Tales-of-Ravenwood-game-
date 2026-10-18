import { z } from 'zod';
import { CLASS_IDS } from '../../../shared/types';
import { ROOM_CODE_REGEX } from '../core/roomCode';

/** İstemciden gelen her payload bu şemalardan geçer; güvenilmeyen girdi asla doğrudan kullanılmaz. */
const name = z
  .string()
  .trim()
  .min(1, 'İsim boş olamaz')
  .max(20, 'İsim en fazla 20 karakter')
  // Kontrol karakterleri ve HTML açısı ayraçları reddedilir.
  .refine((s) => !/[\u0000-\u001f<>]/.test(s), 'İsim geçersiz karakter içeriyor');

const code = z
  .string()
  .trim()
  .transform((s) => s.toUpperCase())
  .pipe(z.string().regex(ROOM_CODE_REGEX, 'Oda kodu 4 harf olmalı'));

export const schemas = {
  'room:create': z.object({ name }),
  'room:join': z.object({ code, name }),
  'room:rejoin': z.object({ code, sessionToken: z.string().min(16).max(64) }),
  'class:select': z.object({ classId: z.enum(CLASS_IDS) }),
  'choice:submit': z.object({ actionId: z.string().regex(/^[a-z0-9_]{1,64}$/) }),
} as const;
