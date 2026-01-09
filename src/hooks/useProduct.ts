import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/types/product';
import { fetchProductById } from '@/services/fakeStore';

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  isReady: boolean;
}

export const useProduct = (id?: number | string): UseProductResult => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const normalizedId = useMemo(() => {
    if (id === undefined || id === null || id === '') return null;
    return id;
  }, [id]);

  const loadProduct = useCallback(
    async (isActive: () => boolean) => {
      if (normalizedId === null) {
        setProduct(null);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchProductById(normalizedId);
        if (isActive()) {
          setProduct(data);
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
    },
    [normalizedId]
  );

  useEffect(() => {
    let active = true;
    loadProduct(() => active);
    return () => {
      active = false;
    };
  }, [loadProduct]);

  const refresh = useCallback(() => {
    loadProduct(() => true);
  }, [loadProduct]);

  return {
    product,
    loading,
    error,
    refresh,
    isReady: normalizedId !== null,
  };
};
