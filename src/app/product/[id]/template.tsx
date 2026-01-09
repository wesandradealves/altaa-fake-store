'use client';

import content from '@/config/content.json';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <title>{content.productDetail.states.loading}</title>
      {children}
    </>
  );
}
