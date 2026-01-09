'use client';

import { memo } from 'react';

const ProductDetailSkeleton = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="aspect-square w-full animate-pulse rounded-3xl bg-white/10" />
      <div className="flex flex-col gap-4">
        <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />
        <div className="h-8 w-3/4 animate-pulse rounded-full bg-white/10" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-white/10" />
        <div className="mt-4 space-y-3">
          <div className="h-4 w-20 animate-pulse rounded-full bg-white/10" />
          <div className="h-4 w-4/5 animate-pulse rounded-full bg-white/10" />
          <div className="h-4 w-3/5 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetailSkeleton);
