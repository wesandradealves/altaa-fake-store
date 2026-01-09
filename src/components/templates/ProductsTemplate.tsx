'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { useMetadata } from '@/hooks/useMetadata';
import { usePagination } from '@/hooks/usePagination';
import { range } from '@/utils';
import DataState from '@/components/molecules/DataState';
import FilterBar from '@/components/molecules/FilterBar';
import ProductCardSkeleton from '@/components/molecules/ProductCardSkeleton';
import StateMessage from '@/components/molecules/StateMessage';
import Pagination from '@/components/molecules/Pagination';
import ProductGrid from '@/components/organisms/ProductGrid';
import content from '@/config/content.json';

const sortOptions = [
  { value: 'price-asc', label: content.products.sortOptions.priceAsc },
  { value: 'price-desc', label: content.products.sortOptions.priceDesc },
  { value: 'name-asc', label: content.products.sortOptions.nameAsc },
  { value: 'name-desc', label: content.products.sortOptions.nameDesc },
];

interface Props {
  initialCategory?: string;
}

const ProductsTemplate = ({ initialCategory }: Props) => {
  const pageSize = 8;
  const resolvedInitialCategory = useMemo(
    () => (initialCategory ? initialCategory.trim() : 'all'),
    [initialCategory]
  );

  const isCategoryPage = useMemo(
    () => resolvedInitialCategory !== 'all',
    [resolvedInitialCategory]
  );

  useMetadata({
    title: isCategoryPage
      ? `${content.products.meta.title} - ${resolvedInitialCategory}`
      : content.products.meta.title,
    description: content.products.meta.description,
    keywords: content.products.meta.keywords,
    ogTitle: isCategoryPage
      ? `${content.products.meta.ogTitle} - ${resolvedInitialCategory}`
      : content.products.meta.ogTitle,
    ogImage: '/favicon.ico',
    favicon: '/favicon.ico',
  });

  const [category, setCategory] = useState(resolvedInitialCategory);
  const [sort, setSort] = useState('price-asc');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const normalizedCategory = useMemo(
    () => (category === 'all' ? undefined : category),
    [category]
  );

  const { products, loading, error, isEmpty, refresh: refreshProducts } = useProducts({
    category: normalizedCategory,
  });

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    refresh: refreshCategories,
  } = useCategories();

  const categoryOptions = useMemo(() => {
    const baseCategories = hydrated ? categories : [];
    const options = ['all', ...baseCategories];
    if (category !== 'all' && !options.includes(category)) {
      options.push(category);
    }
    return options;
  }, [category, categories, hydrated]);

  const effectiveCategoriesLoading = !hydrated || categoriesLoading;
  const effectiveCategoriesError = hydrated ? categoriesError : null;

  const sortedProducts = useMemo(() => {
    const copy = [...products];
    const sorters: Record<string, (a: (typeof products)[number], b: (typeof products)[number]) => number> = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'name-asc': (a, b) => a.title.localeCompare(b.title),
      'name-desc': (a, b) => b.title.localeCompare(a.title),
    };
    const sorter = sorters[sort] ?? sorters['price-asc'];
    return copy.sort(sorter);
  }, [products, sort]);

  const { page, setPage, totalPages, pagedItems: pagedProducts } = usePagination(
    sortedProducts,
    pageSize
  );

  const effectiveLoading = !hydrated || loading;
  const effectiveError = hydrated ? error : null;
  const effectiveIsEmpty = hydrated ? isEmpty : false;

  useEffect(() => {
    setCategory(resolvedInitialCategory);
    setPage(1);
  }, [resolvedInitialCategory, setCategory, setPage]);

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value);
      setPage(1);
    },
    [setPage]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      setSort(value);
      setPage(1);
    },
    [setPage]
  );

  const handlePageChange = useCallback(
    (value: number) => {
      setPage(value);
    },
    [setPage]
  );

  const handleRetry = useCallback(() => {
    refreshProducts();
    refreshCategories();
  }, [refreshCategories, refreshProducts]);

  const skeletons = useMemo(
    () => range(pageSize).map((index) => <ProductCardSkeleton key={index} />),
    [pageSize]
  );

  return (
    <section className="container m-auto max-w-6xl py-12 text-[var(--foreground)] sm:py-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
            {content.products.brand}
          </p>
          <h1 className="text-3xl font-semibold lg:text-5xl">
            {isCategoryPage
              ? `${content.products.category.titlePrefix}: ${resolvedInitialCategory}`
              : content.products.title}
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            {isCategoryPage
              ? `${content.products.category.subtitlePrefix} ${resolvedInitialCategory}.`
              : content.products.subtitle}
          </p>
        </div>
        <div className="self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] lg:self-end">
          {effectiveLoading
            ? content.common.loading
            : `${sortedProducts.length} ${content.common.itemsLabel}`}
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <FilterBar
          categories={categoryOptions}
          category={category}
          sort={sort}
          sortOptions={sortOptions}
          loading={effectiveCategoriesLoading}
          error={effectiveCategoriesError}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          labels={{
            category: content.products.filters.category,
            sort: content.products.filters.sort,
            allCategories: content.products.filters.allCategories,
            categoriesUnavailable: content.products.filters.categoriesUnavailable,
          }}
        />

        <DataState
          loading={effectiveLoading}
          error={effectiveError}
          isEmpty={effectiveIsEmpty}
          loadingFallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {skeletons}
            </div>
          }
          errorFallback={
            <StateMessage
              title={content.products.states.errorTitle}
              description={content.products.states.errorDescription}
              actionLabel={content.products.states.retry}
              onAction={handleRetry}
              tone="alert"
            />
          }
          emptyFallback={
            <StateMessage
              title={content.products.states.emptyTitle}
              description={content.products.states.emptyDescription}
            />
          }
        >
          <>
            <ProductGrid products={pagedProducts} priceLabel={content.products.card.priceLabel} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              labels={content.products.pagination}
              className="pt-6"
            />
          </>
        </DataState>
      </div>
    </section>
  );
};

export default ProductsTemplate;
