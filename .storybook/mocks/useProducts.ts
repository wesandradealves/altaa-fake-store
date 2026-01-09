import type { Product } from '@/types/product';
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

const defaultProducts: Product[] = [
  {
    id: 1,
    title: 'Produto Alpha',
    price: 109.95,
    description: 'Descricao do produto Alpha',
    category: 'electronics',
    image: 'https://placehold.co/600x600/png',
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: 2,
    title: 'Produto Beta',
    price: 79.9,
    description: 'Descricao do produto Beta',
    category: 'jewelery',
    image: 'https://placehold.co/600x600/png',
    rating: { rate: 4.2, count: 48 },
  },
  {
    id: 3,
    title: 'Produto Gamma',
    price: 55.5,
    description: 'Descricao do produto Gamma',
    category: "men's clothing",
    image: 'https://placehold.co/600x600/png',
    rating: { rate: 4.1, count: 32 },
  },
  {
    id: 4,
    title: 'Produto Delta',
    price: 132.0,
    description: 'Descricao do produto Delta',
    category: "women's clothing",
    image: 'https://placehold.co/600x600/png',
    rating: { rate: 3.9, count: 20 },
  },
  {
    id: 5,
    title: 'Produto Epsilon',
    price: 89.0,
    description: 'Descricao do produto Epsilon',
    category: 'electronics',
    image: 'https://placehold.co/600x600/png',
    rating: { rate: 4.8, count: 76 },
  },
  {
    id: 6,
    title: 'Produto Zeta',
    price: 42.0,
    description: 'Descricao do produto Zeta',
    category: 'electronics',
    image: 'https://placehold.co/600x600/png',
    rating: { rate: 4.0, count: 15 },
  },
];

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
