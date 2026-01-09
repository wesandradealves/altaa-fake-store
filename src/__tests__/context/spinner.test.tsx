import { renderHook, act } from '@testing-library/react';
import { LoaderProvider, useLoader } from '@/context/spinner';

describe('LoaderProvider', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LoaderProvider>{children}</LoaderProvider>
  );

  it('expõe estado inicial como falso', () => {
    const { result } = renderHook(() => useLoader(), { wrapper });
    expect(result.current.isLoading).toBe(false);
  });

  it('permite atualizar o estado de loading', () => {
    const { result } = renderHook(() => useLoader(), { wrapper });

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('lanca erro quando usado fora do provider', () => {
    expect(() => renderHook(() => useLoader())).toThrow(
      'useLoader must be used within a LoaderProvider'
    );
  });
});
