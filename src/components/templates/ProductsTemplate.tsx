'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { useMetadata } from '@/hooks/useMetadata';
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
  const [page, setPage] = useState(1);

  useEffect(() => {
    setCategory(resolvedInitialCategory);
    setPage(1);
  }, [resolvedInitialCategory]);

  const normalizedCategory = useMemo(
    () => (category === 'all' ? undefined : category),
    [category]
  );

  const {
    products,
    loading,
    error,
    isEmpty,
    refresh: refreshProducts,
  } = useProducts({ category: normalizedCategory });

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    refresh: refreshCategories,
  } = useCategories();

  const categoryOptions = useMemo(() => {
    const options = ['all', ...categories];
    if (category !== 'all' && !options.includes(category)) {
      options.push(category);
    }
    return options;
  }, [categories, category]);

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

  const totalPages = useMemo(() => Math.ceil(sortedProducts.length / pageSize), [
    pageSize,
    sortedProducts.length,
  ]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pagedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedProducts.slice(start, start + pageSize);
  }, [page, pageSize, sortedProducts]);

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
    setPage(1);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSort(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((value: number) => {
    setPage(value);
  }, []);

  const handleRetry = useCallback(() => {
    refreshProducts();
    refreshCategories();
  }, [refreshCategories, refreshProducts]);

  const skeletons = useMemo(
    () => Array.from({ length: 8 }, (_, index) => <ProductCardSkeleton key={index} />),
    []
  );

  return (
    <section className="container m-auto max-w-6xl py-12 text-white sm:py-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{content.products.brand}</p>
          <h1 className="text-3xl font-semibold lg:text-5xl">
            {isCategoryPage
              ? `${content.products.category.titlePrefix}: ${resolvedInitialCategory}`
              : content.products.title}
          </h1>
          <p className="text-sm text-gray-300">
            {isCategoryPage
              ? `${content.products.category.subtitlePrefix} ${resolvedInitialCategory}.`
              : content.products.subtitle}
          </p>
        </div>
        <div className="self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gray-300 lg:self-end">
          {loading
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
          loading={categoriesLoading}
          error={categoriesError}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          labels={{
            category: content.products.filters.category,
            sort: content.products.filters.sort,
            allCategories: content.products.filters.allCategories,
            categoriesUnavailable: content.products.filters.categoriesUnavailable,
          }}
        />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">{skeletons}</div>
        ) : error ? (
          <StateMessage
            title={content.products.states.errorTitle}
            description={content.products.states.errorDescription}
            actionLabel={content.products.states.retry}
            onAction={handleRetry}
            tone="alert"
          />
        ) : isEmpty ? (
          <StateMessage
            title={content.products.states.emptyTitle}
            description={content.products.states.emptyDescription}
          />
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default ProductsTemplate;
