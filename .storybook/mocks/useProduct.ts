import type { Product } from '@/types/product';
import { getMockData } from './mockData';

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  isReady: boolean;
}

const defaultProduct: Product = {
  id: 1,
  title: 'Produto Alpha',
  price: 109.95,
  description: 'Descricao detalhada do produto Alpha',
  category: 'electronics',
  image: 'https://placehold.co/600x600/png',
  rating: { rate: 4.5, count: 120 },
};

export const useProduct = (id?: number | string): UseProductResult => {
  const mock = getMockData().product ?? {};
  const loading = mock.loading ?? false;
  const error = mock.error ?? null;
  const isReady = mock.isReady ?? id !== undefined && id !== null && id !== '';

  const product = mock.product ?? (isReady ? { ...defaultProduct, id: Number(id) || defaultProduct.id } : null);

  return {
    product,
    loading,
    error,
    refresh: () => {},
    isReady,
  };
};
