import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ravenwood.largeText';

export function ReadingControl() {
  const [large, setLarge] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.dataset.largeText = String(large);
    try { localStorage.setItem(STORAGE_KEY, large ? '1' : '0'); } catch { /* Keep the setting in memory if storage is unavailable. */ }
  }, [large]);
  return (
    <button type="button" aria-pressed={large} onClick={() => setLarge((value) => !value)}
      title="Hikâye ve ipucu metinlerini büyüt"
      className={`rounded-lg border px-3 py-2 text-sm ${large ? 'border-[#e8c66a] bg-[#e8c66a] text-[#211029]' : 'border-[#c9a24a]/50 text-[#f3dfa6]'}`}>
      <span aria-hidden className="mr-1 font-bold">A+</span> Büyük yazı
    </button>
  );
}
