'use client';

import { memo } from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="aspect-square w-full animate-pulse rounded-xl bg-white/10" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-white/10" />
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className="h-4 w-20 animate-pulse rounded-full bg-white/10" />
        <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
      </div>
    </div>
  );
};

export default memo(ProductCardSkeleton);
