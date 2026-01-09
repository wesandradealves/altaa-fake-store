'use client';

import { useCallback, useMemo, useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { useMetadata } from '@/hooks/useMetadata';
import FilterBar from '@/components/molecules/FilterBar';
import ProductCardSkeleton from '@/components/molecules/ProductCardSkeleton';
import StateMessage from '@/components/molecules/StateMessage';
import ProductGrid from '@/components/organisms/ProductGrid';

const copy = {
  brand: 'Fake Store',
  title: 'Catalogo de Produtos',
  subtitle: 'Navegue pelo catalogo, filtre por categoria e ordene por preco ou nome.',
  itemsLabel: 'itens',
  meta: {
    title: 'Catalogo Fake Store',
    description: 'Lista de produtos usando Fake Store API com filtros e ordenacao.',
    keywords: 'react, nextjs, fake store, ecommerce',
    ogTitle: 'Catalogo Fake Store',
  },
  filters: {
    category: 'Categoria',
    sort: 'Ordenacao',
    allCategories: 'Todas as categorias',
    categoriesUnavailable: 'Categorias indisponiveis',
  },
  sortOptions: [
    { value: 'price-asc', label: 'Preco: menor para maior' },
    { value: 'price-desc', label: 'Preco: maior para menor' },
    { value: 'name-asc', label: 'Nome: A a Z' },
    { value: 'name-desc', label: 'Nome: Z a A' },
  ],
  states: {
    errorTitle: 'Nao foi possivel carregar os produtos',
    errorDescription: 'Tente novamente em alguns instantes.',
    retry: 'Tentar novamente',
    emptyTitle: 'Nenhum produto encontrado',
    emptyDescription: 'Ajuste os filtros ou escolha outra categoria.',
  },
  card: {
    priceLabel: 'Preco',
  },
};

const ProductsTemplate = () => {
  useMetadata({
    title: copy.meta.title,
    description: copy.meta.description,
    keywords: copy.meta.keywords,
    ogTitle: copy.meta.ogTitle,
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
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{copy.brand}</p>
          <h1 className="text-3xl font-semibold lg:text-5xl">{copy.title}</h1>
          <p className="text-sm text-gray-300">
            {copy.subtitle}
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gray-300">
          {loading
            ? 'Carregando...'
            : `${sortedProducts.length} ${copy.itemsLabel}`}
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <FilterBar
          categories={categoryOptions}
          category={category}
          sort={sort}
          sortOptions={copy.sortOptions}
          loading={categoriesLoading}
          error={categoriesError}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          labels={{
            category: copy.filters.category,
            sort: copy.filters.sort,
            allCategories: copy.filters.allCategories,
            categoriesUnavailable: copy.filters.categoriesUnavailable,
          }}
        />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{skeletons}</div>
        ) : error ? (
          <StateMessage
            title={copy.states.errorTitle}
            description={copy.states.errorDescription}
            actionLabel={copy.states.retry}
            onAction={handleRetry}
          />
        ) : isEmpty ? (
          <StateMessage
            title={copy.states.emptyTitle}
            description={copy.states.emptyDescription}
          />
        ) : (
          <ProductGrid products={sortedProducts} priceLabel={copy.card.priceLabel} />
        )}
      </div>
    </section>
  );
};

export default ProductsTemplate;
