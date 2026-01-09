import type { Product } from '@/types/product';

export type CategoriesMock = {
  categories?: string[];
  loading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
};

export type ProductsMock = {
  products?: Product[];
  loading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
};

export type ProductMock = {
  product?: Product | null;
  loading?: boolean;
  error?: string | null;
  isReady?: boolean;
};

export type StorybookMockData = {
  categories?: CategoriesMock;
  products?: ProductsMock;
  product?: ProductMock;
};

export const getMockData = (): StorybookMockData => {
  if (typeof globalThis === 'undefined') return {};
  return (globalThis as { __STORYBOOK_MOCKS__?: StorybookMockData }).__STORYBOOK_MOCKS__ ?? {};
};
