import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';
import { LOGO_LETTERS, LOGO_SUB, LOGO_W, LOGO_H } from '@/lib/logo-paths';

export const alt = 'MAYRAL — Private Office';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  const bg = fs.readFileSync(path.join(process.cwd(), 'public/media/hero-silhouette-1344.webp'));
  const png = await (await import('sharp')).default(bg).png().toBuffer();
  const src = `data:image/png;base64,${png.toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#020202' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={1200} height={672} style={{ position: 'absolute', top: -20, left: 0, width: 1200, height: 672, objectFit: 'cover', opacity: 0.85 }} alt="" />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', background: 'linear-gradient(180deg, rgba(2,2,2,0.7) 0%, rgba(2,2,2,0.1) 45%, rgba(2,2,2,0.6) 100%)' }} />
        <div style={{ position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <svg width={430} height={(430 * LOGO_H) / LOGO_W} viewBox={`0 0 ${LOGO_W} ${LOGO_H}`} fill="#FAF8F7">
            {LOGO_LETTERS.map((l, i) => <path key={i} transform={`translate(${l.x} 0)`} d={l.d} />)}
            <path d={LOGO_SUB} />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
