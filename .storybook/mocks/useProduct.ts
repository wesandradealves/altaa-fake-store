import type { Product } from '@/types/product';
import { sampleProduct } from '@/stories/fixtures/products';
import { getMockData } from './mockData';

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  isReady: boolean;
}

const defaultProduct: Product = {
  ...sampleProduct,
  description: 'Descricao detalhada do produto Alpha',
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
