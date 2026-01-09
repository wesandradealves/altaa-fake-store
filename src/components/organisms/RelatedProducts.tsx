'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { usePagination } from '@/hooks/usePagination';
import ProductCardSkeleton from '@/components/molecules/ProductCardSkeleton';
import Pagination from '@/components/molecules/Pagination';
import StateMessage from '@/components/molecules/StateMessage';
import DataState from '@/components/molecules/DataState';
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
  const [hydrated, setHydrated] = useState(false);

  const { products, loading, error, refresh } = useProducts({ category: normalizedCategory });

  const relatedProducts = useMemo(
    () => products.filter((item) => item.id !== currentProductId),
    [currentProductId, products]
  );

  const { page, setPage, totalPages, pagedItems: pagedProducts } = usePagination(
    relatedProducts,
    pageSize
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [currentProductId, normalizedCategory, setPage]);

  const handlePageChange = useCallback(
    (value: number) => {
      setPage(value);
    },
    [setPage]
  );

  const handleRetry = useCallback(() => {
    refresh();
  }, [refresh]);

  const effectiveLoading = !hydrated || loading;
  const effectiveError = hydrated ? error : null;

  const isEmpty = useMemo(
    () => !effectiveLoading && !effectiveError && relatedProducts.length === 0,
    [effectiveError, effectiveLoading, relatedProducts.length]
  );

  const skeletons = range(pageSize).map((index) => <ProductCardSkeleton key={index} />);

  return (
    <section className="mt-12 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold lg:text-3xl">{content.productDetail.related.title}</h2>
        <p className="text-sm text-gray-300">{content.productDetail.related.subtitle}</p>
      </div>

      <DataState
        loading={effectiveLoading}
        error={effectiveError}
        isEmpty={isEmpty}
        loadingFallback={
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {skeletons}
          </div>
        }
        errorFallback={
          <StateMessage
            title={content.productDetail.related.states.errorTitle}
            description={content.productDetail.related.states.errorDescription}
            actionLabel={content.productDetail.related.states.retry}
            onAction={handleRetry}
            tone="alert"
          />
        }
        emptyFallback={
          <StateMessage
            title={content.productDetail.related.states.emptyTitle}
            description={content.productDetail.related.states.emptyDescription}
          />
        }
      >
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
      </DataState>
    </section>
  );
};

export default memo(RelatedProducts);
