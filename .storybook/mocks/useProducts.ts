import type { Product } from '@/types/product';
import { sampleProducts } from '@/stories/fixtures/products';
import { getMockData } from './mockData';

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

const defaultProducts: Product[] = sampleProducts;

export const useProducts = (options: UseProductsOptions = {}): UseProductsResult => {
  const mock = getMockData().products ?? {};
  const loading = mock.loading ?? false;
  const error = mock.error ?? null;

  const normalizedCategory = options.category?.trim();
  const filteredDefaults = normalizedCategory
    ? defaultProducts.filter((product) => product.category === normalizedCategory)
    : defaultProducts;

  const products = mock.products ?? filteredDefaults;
  const isEmpty = mock.isEmpty ?? (!loading && !error && products.length === 0);

  return {
    products,
    loading,
    error,
    isEmpty,
    refresh: () => {},
  };
};
