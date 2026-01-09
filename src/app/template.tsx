'use client';

import content from '@/config/content.json';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>{content.common.loading}</title>
      <main className="flex-1">{children}</main>
    </>
  );
}
