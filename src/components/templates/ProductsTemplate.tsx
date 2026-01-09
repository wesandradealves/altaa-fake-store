'use client';

import { useCallback, useMemo, useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { useMetadata } from '@/hooks/useMetadata';
import FilterBar from '@/components/molecules/FilterBar';
import ProductCardSkeleton from '@/components/molecules/ProductCardSkeleton';
import StateMessage from '@/components/molecules/StateMessage';
import ProductGrid from '@/components/organisms/ProductGrid';
import content from '@/config/content.json';

const sortOptions = [
  { value: 'price-asc', label: content.products.sortOptions.priceAsc },
  { value: 'price-desc', label: content.products.sortOptions.priceDesc },
  { value: 'name-asc', label: content.products.sortOptions.nameAsc },
  { value: 'name-desc', label: content.products.sortOptions.nameDesc },
];

const ProductsTemplate = () => {
  useMetadata({
    title: content.products.meta.title,
    description: content.products.meta.description,
    keywords: content.products.meta.keywords,
    ogTitle: content.products.meta.ogTitle,
    ogImage: '/favicon.ico',
    favicon: '/favicon.ico',
  });

  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('price-asc');

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

  const categoryOptions = useMemo(() => ['all', ...categories], [categories]);

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

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSort(value);
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
    <section className="container m-auto py-16 text-white">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{content.products.brand}</p>
          <h1 className="text-3xl font-semibold lg:text-5xl">{content.products.title}</h1>
          <p className="text-sm text-gray-300">
            {content.products.subtitle}
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gray-300">
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
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{skeletons}</div>
        ) : error ? (
          <StateMessage
            title={content.products.states.errorTitle}
            description={content.products.states.errorDescription}
            actionLabel={content.products.states.retry}
            onAction={handleRetry}
          />
        ) : isEmpty ? (
          <StateMessage
            title={content.products.states.emptyTitle}
            description={content.products.states.emptyDescription}
          />
        ) : (
          <ProductGrid products={sortedProducts} priceLabel={content.products.card.priceLabel} />
        )}
      </div>
    </section>
  );
};

export default ProductsTemplate;
