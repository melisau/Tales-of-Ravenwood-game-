import { useEffect, useState } from 'react';

/**
 * Sunucunun verdiği `endsAt` (epoch ms) zamanına göre kalan saniyeyi hesaplar.
 * İstemci saatini değil sunucu bitiş anını esas aldığı için tüm telefonlarda senkron kalır.
 * `serverOffsetMs`: (sunucu saati - istemci saati), bağlantıda ölçülüp verilebilir.
 */
export function useCountdown(endsAt: number | null, serverOffsetMs = 0): number {
  const compute = () => (endsAt === null ? 0 : Math.max(0, Math.ceil((endsAt - (Date.now() + serverOffsetMs)) / 1000)));
  const [secondsLeft, setSecondsLeft] = useState(compute);

  useEffect(() => {
    setSecondsLeft(compute());
    if (endsAt === null) return;
    const id = window.setInterval(() => {
      const s = compute();
      setSecondsLeft(s);
      if (s <= 0) window.clearInterval(id);
    }, 250);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt, serverOffsetMs]);

  return secondsLeft;
}
