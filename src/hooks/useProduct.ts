import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
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
  const normalizedId = useMemo(() => {
    if (id === undefined || id === null || id === '') return null;
    return id;
  }, [id]);

  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: ['product', normalizedId],
    queryFn: () => fetchProductById(normalizedId as number | string),
    enabled: normalizedId !== null,
  });

  const product: Product | null = data ?? null;
  const loading = normalizedId === null ? false : isPending || isFetching;
  const resolvedError =
    normalizedId === null
      ? null
      : error instanceof Error
        ? error.message
        : error
          ? 'Unexpected error'
          : null;

  const refresh = useCallback(() => {
    if (normalizedId === null) return;
    void refetch();
  }, [normalizedId, refetch]);

  return {
    product,
    loading,
    error: resolvedError,
    refresh,
    isReady: normalizedId !== null,
  };
};
