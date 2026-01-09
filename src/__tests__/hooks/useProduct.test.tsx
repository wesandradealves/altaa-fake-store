import type { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProduct } from '@/hooks/useProduct';
import { fetchProductById } from '@/services/fakeStore';

jest.mock('@/services/fakeStore', () => ({
  fetchProductById: jest.fn(),
}));

const mockedFetchProduct = fetchProductById as jest.MockedFunction<typeof fetchProductById>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = 'QueryWrapper';

  return Wrapper;
};

describe('useProduct', () => {
  beforeEach(() => {
    mockedFetchProduct.mockReset();
  });

  it('nao busca quando id nao existe', async () => {
    const { result } = renderHook(() => useProduct(undefined), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedFetchProduct).not.toHaveBeenCalled();
    expect(result.current.product).toBeNull();
    expect(result.current.isReady).toBe(false);
  });

  it('busca produto por id quando informado', async () => {
    mockedFetchProduct.mockResolvedValue({
      id: 10,
      title: 'Produto',
      price: 10,
      description: 'Descricao',
      category: 'categoria',
      image: 'img',
      rating: { rate: 4, count: 2 },
    });

    const { result } = renderHook(() => useProduct('10'), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedFetchProduct).toHaveBeenCalledWith('10');
    expect(result.current.product?.id).toBe(10);
    expect(result.current.isReady).toBe(true);
  });

  it('retorna erro quando a requisicao falha', async () => {
    mockedFetchProduct.mockRejectedValue(new Error('Falha no produto'));

    const { result } = renderHook(() => useProduct(3), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Falha no produto');
  });
});
