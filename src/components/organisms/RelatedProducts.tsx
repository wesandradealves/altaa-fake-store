'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCardSkeleton from '@/components/molecules/ProductCardSkeleton';
import Pagination from '@/components/molecules/Pagination';
import StateMessage from '@/components/molecules/StateMessage';
import ProductGrid from '@/components/organisms/ProductGrid';
import { range } from '@/utils';
import content from '@/config/content.json';

interface Props {
  category: string;
  currentProductId: number;
}

const pageSize = 4;

const RelatedProducts = ({ category, currentProductId }: Props) => {
  const normalizedCategory = useMemo(() => category.trim(), [category]);
  const [page, setPage] = useState(1);

  const { products, loading, error, refresh } = useProducts({ category: normalizedCategory });

  const relatedProducts = useMemo(
    () => products.filter((item) => item.id !== currentProductId),
    [currentProductId, products]
  );

  const totalPages = useMemo(
    () => Math.ceil(relatedProducts.length / pageSize),
    [relatedProducts.length]
  );

  useEffect(() => {
    setPage(1);
  }, [normalizedCategory, currentProductId]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pagedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return relatedProducts.slice(start, start + pageSize);
  }, [page, relatedProducts]);

  const handlePageChange = useCallback((value: number) => {
    setPage(value);
  }, []);

  const handleRetry = useCallback(() => {
    refresh();
  }, [refresh]);

  const isEmpty = useMemo(
    () => !loading && !error && relatedProducts.length === 0,
    [error, loading, relatedProducts.length]
  );

  const skeletons = useMemo(
    () => range(pageSize).map((index) => <ProductCardSkeleton key={index} />),
    [pageSize]
  );

  return (
    <section className="mt-12 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold lg:text-3xl">{content.productDetail.related.title}</h2>
        <p className="text-sm text-gray-300">{content.productDetail.related.subtitle}</p>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">{skeletons}</div>
      ) : error ? (
        <StateMessage
          title={content.productDetail.related.states.errorTitle}
          description={content.productDetail.related.states.errorDescription}
          actionLabel={content.productDetail.related.states.retry}
          onAction={handleRetry}
          tone="alert"
        />
      ) : isEmpty ? (
        <StateMessage
          title={content.productDetail.related.states.emptyTitle}
          description={content.productDetail.related.states.emptyDescription}
        />
      ) : (
        <>
          <ProductGrid products={pagedProducts} priceLabel={content.products.card.priceLabel} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            labels={content.productDetail.related.pagination}
            className="pt-6"
          />
        </>
      )}
    </section>
  );
};

export default memo(RelatedProducts);
