import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/types/product';
import { fetchProducts, fetchProductsByCategory } from '@/services/fakeStore';

interface UseProductsOptions {
  category?: string;
}

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  refresh: () => void;
}

export const useProducts = (options: UseProductsOptions = {}): UseProductsResult => {
  const { category } = options;
  const normalizedCategory = useMemo(() => (category ? category.trim() : undefined), [category]);

  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: ['products', normalizedCategory ?? 'all'],
    queryFn: () =>
      normalizedCategory ? fetchProductsByCategory(normalizedCategory) : fetchProducts(),
  });

  const products: Product[] = data ?? [];
  const loading = isPending || isFetching;
  const resolvedError = error instanceof Error ? error.message : error ? 'Unexpected error' : null;

  const isEmpty = useMemo(() => !loading && !resolvedError && products.length === 0, [
    loading,
    resolvedError,
    products.length,
  ]);

  const refresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  return {
    products,
    loading,
    error: resolvedError,
    isEmpty,
    refresh,
  };
};
