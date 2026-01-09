import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/services/fakeStore';
import { isEmptyResult, resolveQueryError } from '@/hooks/queryUtils';

interface UseCategoriesResult {
  categories: string[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  refresh: () => void;
}

export const useCategories = (): UseCategoriesResult => {
  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const categories = data ?? [];
  const loading = isPending || isFetching;
  const resolvedError = resolveQueryError(error);

  const isEmpty = useMemo(
    () => isEmptyResult(loading, resolvedError, categories.length),
    [loading, resolvedError, categories.length]
  );

  const refresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  return {
    categories,
    loading,
    error: resolvedError,
    isEmpty,
    refresh,
  };
};
