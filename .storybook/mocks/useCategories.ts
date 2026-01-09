import { sampleCategories } from '@/stories/fixtures/products';
import { getMockData } from './mockData';

interface UseCategoriesResult {
  categories: string[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  refresh: () => void;
}

const defaultCategories = sampleCategories;

export const useCategories = (): UseCategoriesResult => {
  const mock = getMockData().categories ?? {};
  const categories = mock.categories ?? defaultCategories;
  const loading = mock.loading ?? false;
  const error = mock.error ?? null;
  const isEmpty = mock.isEmpty ?? (!loading && !error && categories.length === 0);

  return {
    categories,
    loading,
    error,
    isEmpty,
    refresh: () => {},
  };
};
