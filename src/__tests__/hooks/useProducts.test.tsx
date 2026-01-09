import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from '@/hooks/useProducts';
import { fetchProducts, fetchProductsByCategory } from '@/services/fakeStore';

jest.mock('@/services/fakeStore', () => ({
  fetchProducts: jest.fn(),
  fetchProductsByCategory: jest.fn(),
}));

const mockedFetchProducts = fetchProducts as jest.MockedFunction<typeof fetchProducts>;
const mockedFetchByCategory = fetchProductsByCategory as jest.MockedFunction<typeof fetchProductsByCategory>;

describe('useProducts', () => {
  beforeEach(() => {
    mockedFetchProducts.mockReset();
    mockedFetchByCategory.mockReset();
  });

  it('busca todos os produtos quando nao ha categoria', async () => {
    mockedFetchProducts.mockResolvedValue([
      { id: 1, title: 'A', price: 10, description: 'd', category: 'c', image: 'img', rating: { rate: 4, count: 2 } },
    ]);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedFetchProducts).toHaveBeenCalledTimes(1);
    expect(result.current.products).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('busca produtos por categoria quando informada', async () => {
    mockedFetchByCategory.mockResolvedValue([
      { id: 2, title: 'B', price: 20, description: 'd', category: 'eletronicos', image: 'img', rating: { rate: 5, count: 1 } },
    ]);

    const { result } = renderHook(() => useProducts({ category: 'eletronicos' }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedFetchByCategory).toHaveBeenCalledWith('eletronicos');
    expect(result.current.products).toHaveLength(1);
  });

  it('define empty quando nao retorna produtos', async () => {
    mockedFetchProducts.mockResolvedValue([]);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isEmpty).toBe(true);
  });

  it('retorna erro quando a requisicao falha', async () => {
    mockedFetchProducts.mockRejectedValue(new Error('Erro API'));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Erro API');
  });
});
