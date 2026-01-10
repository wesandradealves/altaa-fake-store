'use client';

import { memo, useMemo } from 'react';
import type { Product } from '@/types/product';
import ProductCard from '@/components/molecules/ProductCard';

interface Props {
  products: Product[];
  priceLabel: string;
  gridSize?: 4 | 8;
}

const ProductGrid = ({ products, priceLabel, gridSize = 8 }: Props) => {
  const cards = useMemo(
    () =>
      products.map((product) => (
        <ProductCard key={product.id} product={product} priceLabel={priceLabel} />
      )),
    [priceLabel, products]
  );

  const gridClassName =
    gridSize === 4
      ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2'
      : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4';

  return <div className={gridClassName}>{cards}</div>;
};

export default memo(ProductGrid);
