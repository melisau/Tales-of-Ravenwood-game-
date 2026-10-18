import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** Ortak görsel dil: gotik mor zemin, kan kırmızısı, altın ve parşömen. */
export const FONT_DISPLAY = { fontFamily: "'Cinzel', 'Trajan Pro', Georgia, serif" };
export const FONT_BODY = { fontFamily: "'IM Fell English', 'Iowan Old Style', Georgia, serif" };

export function Backdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh w-full bg-[#0d0712] text-[#efe3c8] antialiased" style={FONT_BODY}>
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,#3a1747_0%,#170b1f_50%,#0d0712_100%)]" />
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(122,14,26,0.28),transparent)]" />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:max-w-lg">
        {children}
      </div>
    </div>
  );
}

type Variant = 'primary' | 'secondary' | 'ghost';

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    'w-full rounded-2xl px-5 py-3.5 text-[15px] font-bold uppercase tracking-[0.16em] transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8c66a] disabled:cursor-not-allowed disabled:active:scale-100';
  const styles: Record<Variant, string> = {
    primary:
      'border border-[#e8c66a]/70 bg-gradient-to-b from-[#9e1424] to-[#5c0612] text-[#fbe7b0] shadow-[0_0_22px_-6px_rgba(224,48,60,0.8)] disabled:border-[#3b2148] disabled:from-[#211029] disabled:to-[#211029] disabled:text-[#8d7a96] disabled:shadow-none',
    secondary: 'border border-[#c9a24a]/50 bg-[#1b0f24]/80 text-[#f3dfa6] disabled:opacity-50',
    ghost: 'border border-transparent text-[#c9b48a] underline-offset-4 hover:underline disabled:opacity-50',
  };
  return (
    <button type="button" className={`${base} ${styles[variant]} ${className}`} style={FONT_DISPLAY} {...rest}>
      {children}
    </button>
  );
}

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-[#c9a24a]/25 bg-[#1b0f24]/80 p-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur-sm ${className}`}>
      {children}
    </section>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9a24a]/85">{children}</p>;
}

export function Title({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={`text-3xl font-bold tracking-wide text-[#f3dfa6] drop-shadow-[0_0_12px_rgba(201,162,74,0.35)] ${className}`} style={FONT_DISPLAY}>
      {children}
    </h1>
  );
}

export function HpBar({ hp, maxHp, size = 'md' }: { hp: number; maxHp: number; size?: 'sm' | 'md' }) {
  const pct = maxHp > 0 ? Math.max(0, Math.min(100, (hp / maxHp) * 100)) : 0;
  return (
    <div
      className={`relative overflow-hidden rounded-full border border-[#5a1a22] bg-[#2a0d12] ${size === 'sm' ? 'h-1.5' : 'h-2.5'}`}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={maxHp}
      aria-valuenow={hp}
    >
      <div className="h-full rounded-full bg-gradient-to-r from-[#5c0612] via-[#a3131f] to-[#d9303a] transition-[width] duration-700" style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Ekranın altında beliren hata/uyarı şeridi */
export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div role="alert" className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="flex items-start gap-3 rounded-2xl border border-[#e0303c]/60 bg-[#2a0d12]/95 p-3 shadow-[0_0_30px_-8px_rgba(224,48,60,0.8)] backdrop-blur">
        <span aria-hidden className="text-[#ff7a7f]">✦</span>
        <p className="flex-1 text-[14px] leading-snug text-[#ffd9db]">{message}</p>
        <button type="button" onClick={onClose} className="text-[#ff9a9e]" aria-label="Kapat">
          ✕
        </button>
      </div>
    </div>
  );
}

/** Bağlantı koptuğunda üstte görünen şerit */
export function ConnectionBanner({ state }: { state: 'connecting' | 'online' | 'offline' }) {
  if (state === 'online') return null;
  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-[#5c0612] px-4 py-1.5 text-center text-[12.5px] text-[#fbe7b0]" role="status">
      {state === 'connecting' ? 'Ravenwood\'a bağlanılıyor…' : 'Bağlantı koptu — yeniden bağlanılıyor…'}
    </div>
  );
}

export function HelpButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Nasıl oynanır"
      className="grid h-9 w-9 place-items-center rounded-full border border-[#c9a24a]/50 bg-[#1b0f24]/80 text-[#e8c66a] active:scale-95"
      style={FONT_DISPLAY}
    >
      ?
    </button>
  );
}
