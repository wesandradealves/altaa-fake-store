import api from '@/services/api';
import type { Product } from '@/types/product';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

export const fetchProductById = async (id: number | string): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get<Product[]>(`/products/category/${encodeURIComponent(category)}`);
  return response.data;
};
