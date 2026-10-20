import type { ReactNode } from 'react';
import type { ClassId } from '../../../shared/types';

/** A single engraved heraldic vocabulary, independent of installed emoji fonts. */
const EMBLEMS: Record<ClassId, ReactNode> = {
  Medyum: <>
    <path d="M39 9a23 23 0 1 0 15 35A24 24 0 0 1 39 9Z" fill="currentColor" fillOpacity=".14" />
    <path d="m46 13 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
    <path d="M21 30c-5 5-5 12 0 16" opacity=".65" />
  </>,
  Dedektif: <>
    <path d="M25 16v-4a7 7 0 0 1 14 0v4M19 22l6-6h14l6 6M17 22h30M20 22v29h24V22M17 51h30l-4 6H21Z" />
    <path d="M25 25h14v23H25Z" fill="currentColor" fillOpacity=".12" />
    <path d="M32 29c1 5-5 7-3 12 2 4 8 2 7-2-1-3-4-5-4-10Z" fill="currentColor" fillOpacity=".3" />
  </>,
  Bilgin: <>
    <path d="M32 18c-7-6-16-7-24-4v37c8-3 17-2 24 4 7-6 16-7 24-4V14c-8-3-17-2-24 4Z" fill="currentColor" fillOpacity=".1" />
    <path d="M32 18v37M14 24c4-1 8 0 12 2m-12 7c4-1 8 0 12 2m-12 7c4-1 8 0 12 2m12-18c4-2 8-3 12-2m-12 11c4-2 8-3 12-2m-12 11c4-2 8-3 12-2" />
    <path d="m32 5 3 4-3 4-3-4Z" fill="currentColor" />
  </>,
  Simyacı: <>
    <path d="M25 7h14v7H25ZM28 14v13L14 45c-4 6 0 12 7 12h22c7 0 11-6 7-12L36 27V14" />
    <path d="M20 39h24l6 8c2 4-1 7-6 7H20c-5 0-8-3-6-7Z" fill="currentColor" fillOpacity=".18" stroke="none" />
    <path d="M20 39h24m-21 8 2 2m12-4 2 2M28 21h8" />
    <circle cx="32" cy="34" r="2" />
  </>,
  Tamirci: <>
    <path d="m18 10 12 12-7 7L11 17Zm8 16 27 27-6 6-27-27Z" fill="currentColor" fillOpacity=".14" />
    <circle cx="46" cy="17" r="9" />
    <path d="m40 23-29 29 5 5 29-29M17 46l6 6m-1-11 6 6M43 14l6 6m-6 0 6-6" />
  </>,
  İzci: <>
    <path d="M17 6c29 10 29 42 0 52l10-26Z" fill="currentColor" fillOpacity=".1" />
    <path d="M17 6v52M11 32h44m-9-8 9 8-9 8M11 27l7 5-7 5" />
    <path d="m32 10 3 3m-3 38 3 3" opacity=".65" />
  </>,
  Muhafız: <>
    <path d="m32 6 23 9-4 22c-2 10-10 16-19 22-9-6-17-12-19-22L9 15Z" fill="currentColor" fillOpacity=".14" />
    <path d="m32 13 16 6-3 17c-2 7-7 12-13 16-6-4-11-9-13-16l-3-17Z" />
    <path d="M32 19v26m-9-17h18m-12 17h6" />
  </>,
  Şifacı: <>
    <path d="M13 31h38c-1 14-7 20-19 20S14 45 13 31Zm-3 0h44M25 51v6h14v-6M21 57h22" fill="currentColor" fillOpacity=".12" />
    <path d="m36 29 12-18a4 4 0 0 1 7 4L44 31M28 30l-5-14" />
    <path d="M23 21c-9 0-13-5-12-11 8 0 13 4 12 11Zm2 3c0-8 4-12 10-12 1 7-3 12-10 12Z" fill="currentColor" fillOpacity=".18" />
  </>,
  Gizemci: <>
    <circle cx="32" cy="32" r="23" />
    <path d="m32 14 13 18-13 18-13-18Z" fill="currentColor" fillOpacity=".14" />
    <path d="M32 14v36M19 32h26m-13-9 7 9-7 9-7-9ZM32 4v5m0 46v5M4 32h5m46 0h5" />
  </>,
  Falcı: <>
    <path d="m13 14 8-5 26 8 5 35-8 5M19 8h25v48H19Z" fill="currentColor" fillOpacity=".1" />
    <path d="m32 18 8 13-8 14-8-14Z" />
    <path d="M34 25a7 7 0 1 0 2 12 7 7 0 0 1-2-12Z" fill="currentColor" fillOpacity=".2" />
    <path d="M25 13h2m10 38h2" />
  </>,
  Günlükçü: <>
    <path d="M14 30H9c-5 0-5 8 0 8h4v14c0 6 8 6 8 0V30h23v18M21 55h26c6 0 6-8 0-8H21" fill="currentColor" fillOpacity=".1" />
    <path d="M29 36 50 9c-10 0-21 8-21 18v9Zm0 0 24-24m-17 6 4 5m-10 1 5 5M26 40l3-4m-11 6h5m3 4h10" />
  </>,
  Avcı: <>
    <path d="m10 7 11 6-2 6L55 55l-5 5-36-36-6 2Z" fill="currentColor" fillOpacity=".14" />
    <path d="m54 7-11 6 2 6L9 55l5 5 36-36 6 2Z" fill="currentColor" fillOpacity=".14" />
    <path d="m13 10 4 8m34-8-4 8M26 46l6 4 6-4" />
  </>,
};

export function ClassEmblem({ classId, className = 'h-8 w-8' }: { classId: ClassId | null; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"
      className={`inline-block shrink-0 align-middle text-[#e8c66a] ${className}`} aria-hidden="true" focusable="false" data-class-icon={classId ?? 'unselected'}>
      {classId ? EMBLEMS[classId] : <path d="m32 9 21 8-4 20c-2 9-9 15-17 20-8-5-15-11-17-20l-4-20Zm0 12v17m0 7v1" />}
    </svg>
  );
}
