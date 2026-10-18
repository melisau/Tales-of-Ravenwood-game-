import { io, type Socket } from 'socket.io-client';
import type { ClientToServerEvents, ErrorCode, ServerToClientEvents } from '../../../shared/types';

export type GameSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

/**
 * Sunucu adresi:
 *  - VITE_SERVER_URL verilmişse o (internete yayınlarken)
 *  - development modunda sayfanın açıldığı makinenin 3000 portu. Böylece aynı Wi-Fi'deki
 *    telefonlar http://192.168.x.x:5173 adresine girdiğinde sunucuyu
 *    otomatik olarak http://192.168.x.x:3000'de bulur; ayar gerekmez.
 *  - production modunda sayfayla aynı adres. HTTPS/WebSocket, Railway domaini
 *    ve platformun PORT yönlendirmesi için ayrı sunucu adresi gerekmez.
 */
export function serverUrl(): string {
  return import.meta.env.VITE_SERVER_URL || (import.meta.env.DEV
    ? `${location.protocol}//${location.hostname}:3000`
    : location.origin);
}

export function createSocket(): GameSocket {
  return io(serverUrl(), {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 3000,
  }) as GameSocket;
}

export class ServerError extends Error {
  constructor(
    public readonly code: ErrorCode | 'TIMEOUT' | 'OFFLINE',
    message: string,
  ) {
    super(message);
  }
}

type AckResponse<T> = { ok: true; data: T } | { ok: false; error: ErrorCode; message: string };

/**
 * Sunucuya ack'li istek gönderip cevabı Promise olarak döndürür.
 * Sunucu GameError fırlattıysa ServerError ile reddedilir.
 */
export function call<T = undefined>(socket: GameSocket, event: keyof ClientToServerEvents, payload?: unknown, timeoutMs = 8000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (!socket.connected) {
      reject(new ServerError('OFFLINE', 'Sunucuya bağlı değilsin. Bağlantı bekleniyor…'));
      return;
    }
    const timer = setTimeout(() => reject(new ServerError('TIMEOUT', 'Sunucu cevap vermedi')), timeoutMs);
    const ack = (res: AckResponse<T>) => {
      clearTimeout(timer);
      if (res.ok) resolve(res.data);
      else reject(new ServerError(res.error, res.message));
    };
    const s = socket as unknown as { emit: (...args: unknown[]) => void };
    if (payload === undefined) s.emit(event, ack);
    else s.emit(event, payload, ack);
  });
}
