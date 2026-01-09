import { act, renderHook, waitFor } from '@testing-library/react';
import { usePagination } from '@/hooks/usePagination';

describe('usePagination', () => {
  it('pagina a lista e calcula total', () => {
    const items = [1, 2, 3, 4, 5];
    const { result } = renderHook(() => usePagination(items, 2));

    expect(result.current.totalPages).toBe(3);
    expect(result.current.page).toBe(1);
    expect(result.current.pagedItems).toEqual([1, 2]);

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
    expect(result.current.pagedItems).toEqual([3, 4]);
  });

  it('ajusta pagina quando lista diminui', async () => {
    const initialItems = [1, 2, 3, 4, 5];
    const { result, rerender } = renderHook(
      ({ items }) => usePagination(items, 2),
      { initialProps: { items: initialItems } }
    );

    act(() => {
      result.current.setPage(3);
    });

    expect(result.current.page).toBe(3);

    rerender({ items: [1, 2] });

    await waitFor(() => {
      expect(result.current.page).toBe(1);
    });
    expect(result.current.totalPages).toBe(1);
  });
});
