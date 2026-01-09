import api from '@/services/api';
import type { Product } from '@/types/product';

const normalizeProduct = (product: Product): Product => ({
  ...product,
  price: Number(product.price) || 0,
  rating: {
    rate: Number(product.rating?.rate) || 0,
    count: Number(product.rating?.count) || 0,
  },
});

const normalizeProducts = (products: Product[]) => products.map(normalizeProduct);

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return normalizeProducts(response.data);
};

export const fetchProductById = async (id: number | string): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return normalizeProduct(response.data);
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get<Product[]>(`/products/category/${encodeURIComponent(category)}`);
  return normalizeProducts(response.data);
};
