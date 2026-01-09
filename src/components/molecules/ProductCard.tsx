'use client';

import Link from 'next/link';
import Image from 'next/image';
import { memo, useMemo } from 'react';
import { motion } from 'motion/react';
import type { Product } from '@/types/product';
import Badge from '@/components/atoms/Badge';
import { encodeCategorySlug } from '@/utils';
import Price from '@/components/atoms/Price';

interface Props {
  product: Product;
  priceLabel: string;
}

const ProductCard = ({ product, priceLabel }: Props) => {
  const href = useMemo(() => `/product/${product.id}`, [product.id]);
  const title = useMemo(() => product.title.trim(), [product.title]);
  const category = useMemo(() => product.category.trim(), [product.category]);
  const categoryHref = useMemo(() => `/categoria/${encodeCategorySlug(category)}`, [category]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="h-full"
    >
      <div className="group relative flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white transition hover:border-white/30 hover:bg-white/10 focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/20">
        <Link href={href} className="absolute inset-0 z-0" aria-label={title}>
          <span className="sr-only">{title}</span>
        </Link>

        <div className="relative z-10 pointer-events-none space-y-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white/5">
            <Image
              src={product.image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain p-6 transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </div>
          <h3 className="text-base font-semibold leading-snug text-white/90">{title}</h3>
        </div>

        <Link href={categoryHref} className="relative z-20 inline-flex">
          <Badge className="bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-200 hover:bg-white/20">
            {category}
          </Badge>
        </Link>

        <div className="relative z-10 pointer-events-none mt-auto flex items-center justify-between">
          <span className="text-xs text-gray-400">{priceLabel}</span>
          <Price className="text-lg font-semibold text-white" value={product.price} />
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ProductCard);
