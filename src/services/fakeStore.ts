import api from '@/services/api';
import type { Product } from '@/types/product';

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const CACHE_PREFIX = 'fakestore:';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const normalizeProduct = (product: Product): Product => ({
  ...product,
  price: Number(product.price) || 0,
  rating: {
    rate: Number(product.rating?.rate) || 0,
    count: Number(product.rating?.count) || 0,
  },
});

const normalizeProducts = (products: Product[]) => products.map(normalizeProduct);

const isClient = typeof window !== 'undefined';

const isOnline = () => {
  if (typeof navigator === 'undefined') return true;
  return navigator.onLine;
};

const isCacheEntry = (value: unknown): value is CacheEntry<unknown> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    'timestamp' in value &&
    typeof (value as CacheEntry<unknown>).timestamp === 'number'
  );
};

const readCache = <T>(key: string, allowExpired = false): T | null => {
  if (!isClient) return null;

  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!isCacheEntry(parsed)) return null;

    const isExpired = Date.now() - parsed.timestamp > CACHE_TTL_MS;
    if (isExpired && !allowExpired) return null;

    return parsed.data as T;
  } catch {
    return null;
  }
};

const writeCache = <T>(key: string, data: T) => {
  if (!isClient) return;

  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
  } catch {
    // ignore cache write errors (quota, privacy mode, etc)
  }
};

const withCache = async <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
  if (!isOnline()) {
    const cached = readCache<T>(key, true);
    if (cached !== null) return cached;
  }

  try {
    const data = await fetcher();
    writeCache(key, data);
    return data;
  } catch (error) {
    const cached = readCache<T>(key, true);
    if (cached !== null) return cached;
    throw error;
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  return withCache('products', async () => {
    const response = await api.get<Product[]>('/products');
    return normalizeProducts(response.data);
  });
};

export const fetchProductById = async (id: number | string): Promise<Product> => {
  return withCache(`product:${id}`, async () => {
    const response = await api.get<Product>(`/products/${id}`);
    return normalizeProduct(response.data);
  });
};

export const fetchCategories = async (): Promise<string[]> => {
  return withCache('categories', async () => {
    const response = await api.get<string[]>('/products/categories');
    return response.data;
  });
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const categoryKey = `category:${encodeURIComponent(category)}`;
  return withCache(categoryKey, async () => {
    const response = await api.get<Product[]>(`/products/category/${encodeURIComponent(category)}`);
    return normalizeProducts(response.data);
  });
};
