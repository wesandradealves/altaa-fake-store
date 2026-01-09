import { renderHook, waitFor } from '@testing-library/react';
import { useCategories } from '@/hooks/useCategories';
import { fetchCategories } from '@/services/fakeStore';

jest.mock('@/services/fakeStore', () => ({
  fetchCategories: jest.fn(),
}));

const mockedFetchCategories = fetchCategories as jest.MockedFunction<typeof fetchCategories>;

describe('useCategories', () => {
  beforeEach(() => {
    mockedFetchCategories.mockReset();
  });

  it('carrega categorias e finaliza loading', async () => {
    mockedFetchCategories.mockResolvedValue(['electronics', 'jewelery']);

    const { result } = renderHook(() => useCategories());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.categories).toEqual(['electronics', 'jewelery']);
    expect(result.current.error).toBeNull();
    expect(result.current.isEmpty).toBe(false);
  });

  it('define empty quando nao ha categorias', async () => {
    mockedFetchCategories.mockResolvedValue([]);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.categories).toEqual([]);
    expect(result.current.isEmpty).toBe(true);
  });

  it('retorna erro quando a requisicao falha', async () => {
    mockedFetchCategories.mockRejectedValue(new Error('Falha na API'));

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Falha na API');
  });
});
