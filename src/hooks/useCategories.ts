import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchCategories } from '@/services/fakeStore';

interface UseCategoriesResult {
  categories: string[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  refresh: () => void;
}

export const useCategories = (): UseCategoriesResult => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async (isActive: () => boolean) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchCategories();
      if (isActive()) {
        setCategories(data);
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
  }, []);

  useEffect(() => {
    let active = true;
    loadCategories(() => active);
    return () => {
      active = false;
    };
  }, [loadCategories]);

  const isEmpty = useMemo(() => !loading && !error && categories.length === 0, [
    loading,
    error,
    categories.length,
  ]);

  const refresh = useCallback(() => {
    loadCategories(() => true);
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    isEmpty,
    refresh,
  };
};
