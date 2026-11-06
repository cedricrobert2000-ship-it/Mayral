import localFont from 'next/font/local';

// Option A validée : Manrope (titres 300, UI 500) + Unbounded (labels).
// Alternative payante : Neue Montreal (Pangram Pangram).
export const manrope = localFont({
  src: [
    { path: '../public/fonts/manrope-latin-300-normal.woff2', weight: '300' },
    { path: '../public/fonts/manrope-latin-400-normal.woff2', weight: '400' },
    { path: '../public/fonts/manrope-latin-500-normal.woff2', weight: '500' },
  ],
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
});

export const unbounded = localFont({
  src: [{ path: '../public/fonts/unbounded-latin-500-normal.woff2', weight: '500' }],
  variable: '--font-unbounded',
  display: 'swap',
});
