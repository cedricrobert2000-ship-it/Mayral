'use client';

import { Button } from '@/components/ui/Button';

export function ReplayIntro() {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        try { sessionStorage.removeItem('mayral-intro'); } catch {}
        window.location.reload();
      }}
    >
      Rejouer le loader
    </Button>
  );
}
