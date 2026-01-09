'use client';

import { memo, useMemo } from 'react';
import type { Product } from '@/types/product';
import ProductCard from '@/components/molecules/ProductCard';

interface Props {
  products: Product[];
  priceLabel: string;
}

const ProductGrid = ({ products, priceLabel }: Props) => {
  const cards = useMemo(
    () =>
      products.map((product) => (
        <ProductCard key={product.id} product={product} priceLabel={priceLabel} />
      )),
    [priceLabel, products]
  );

  return <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{cards}</div>;
};

export default memo(ProductGrid);
