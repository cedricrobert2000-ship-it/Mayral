import type { Metadata } from 'next';
import { FormOnImage } from '@/components/sections/FormOnImage';
import { Label } from '@/components/ui/Label';
import { media } from '@/lib/media';
import { t } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Off-market', robots: { index: false, follow: false } };

export default function OffMarketPage() {
  const p = t.offMarketPage;
  return (
    <div className="pt-16">
      <FormOnImage
        as="h1"
        image={media.rearThreeQuarter}
        label={<Label>{p.label}</Label>}
        title={p.title}
        body={p.body.join(' ')}
        source="off-market"
        submitLabel={p.formTitle}
      />
    </div>
  );
}
