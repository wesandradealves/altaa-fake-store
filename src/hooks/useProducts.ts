import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async (isActive: () => boolean) => {
    setLoading(true);
    setError(null);

    try {
      const data = category ? await fetchProductsByCategory(category) : await fetchProducts();
      if (isActive()) {
        setProducts(data);
      }
    } catch (err) {
      if (isActive()) {
        setError(err instanceof Error ? err.message : 'Unexpected error');
      }
    } finally {
      if (isActive()) {
        setLoading(false);
      }
    }
  }, [category]);

  useEffect(() => {
    let active = true;
    loadProducts(() => active);
    return () => {
      active = false;
    };
  }, [loadProducts]);

  const isEmpty = useMemo(() => !loading && !error && products.length === 0, [
    loading,
    error,
    products.length,
  ]);

  const refresh = useCallback(() => {
    loadProducts(() => true);
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    isEmpty,
    refresh,
  };
};
