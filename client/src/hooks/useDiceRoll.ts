import { useCallback, useEffect, useRef, useState } from 'react';

export interface DiceOutcome {
  roll: number; // ham d20 (1-20)
  bonus: number;
  total: number;
  dc: number;
  success: boolean;
  critical: 'NAT20' | 'NAT1' | null;
}

export type DicePhase = 'idle' | 'rolling' | 'settled';

export interface UseDiceRollOptions {
  /**
   * Zarı gerçekte atan fonksiyon. Sonuç SUNUCUDAN gelir (hile önleme);
   * örn. () => emitWithAck(socket, 'dice:roll')
   */
  requestRoll: () => Promise<DiceOutcome>;
  /** Sunucu çok hızlı cevap verse bile animasyonun süreceği minimum süre. */
  minRollMs?: number;
  /** Animasyon kancaları: ses, titreşim, 3D zar kütüphanesi vb. bağlamak için. */
  onRollStart?: () => void;
  onFaceChange?: (face: number) => void;
  onSettle?: (outcome: DiceOutcome) => void;
  onError?: (err: unknown) => void;
}

/**
 * Görsel zar animasyon kancası.
 * Animasyon sırasında rastgele yüzler gösterir, sunucu sonucu geldiğinde
 * gerçek sonuca yavaşlayarak oturur.
 */
export function useDiceRoll({
  requestRoll,
  minRollMs = 1400,
  onRollStart,
  onFaceChange,
  onSettle,
  onError,
}: UseDiceRollOptions) {
  const [phase, setPhase] = useState<DicePhase>('idle');
  const [face, setFace] = useState<number>(20);
  const [outcome, setOutcome] = useState<DiceOutcome | null>(null);
  const tickRef = useRef<number | null>(null);
  const mounted = useRef(true);

  useEffect(
    () => () => {
      mounted.current = false;
      if (tickRef.current !== null) window.clearTimeout(tickRef.current);
    },
    [],
  );

  const roll = useCallback(async () => {
    if (phase === 'rolling') return;
    setPhase('rolling');
    setOutcome(null);
    onRollStart?.();
    if ('vibrate' in navigator) navigator.vibrate?.(30);

    // Giderek yavaşlayan yüz değişimi
    let delay = 50;
    const spin = () => {
      const f = 1 + Math.floor(Math.random() * 20);
      setFace(f);
      onFaceChange?.(f);
      delay = Math.min(delay * 1.12, 220);
      tickRef.current = window.setTimeout(spin, delay);
    };
    spin();

    try {
      const [result] = await Promise.all([
        requestRoll(),
        new Promise((r) => setTimeout(r, minRollMs)),
      ]);
      if (!mounted.current) return;
      if (tickRef.current !== null) window.clearTimeout(tickRef.current);
      setFace(result.roll);
      setOutcome(result);
      setPhase('settled');
      if ('vibrate' in navigator) navigator.vibrate?.(result.critical ? [60, 40, 120] : 60);
      onSettle?.(result);
    } catch (err) {
      if (tickRef.current !== null) window.clearTimeout(tickRef.current);
      if (!mounted.current) return;
      setPhase('idle');
      onError?.(err);
    }
  }, [phase, requestRoll, minRollMs, onRollStart, onFaceChange, onSettle, onError]);

  const reset = useCallback(() => {
    setPhase('idle');
    setOutcome(null);
  }, []);

  return { phase, face, outcome, roll, reset, isRolling: phase === 'rolling' };
}
