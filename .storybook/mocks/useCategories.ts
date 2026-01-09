import { getMockData } from './mockData';

interface UseCategoriesResult {
  categories: string[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  refresh: () => void;
}

const defaultCategories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

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
