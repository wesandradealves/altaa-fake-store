import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from '@/context/app';
import content from '@/config/content.json';

describe('AppProvider', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AppProvider>{children}</AppProvider>
  );

  const envKey = 'NEXT_PUBLIC_APP_NAME';

  afterEach(() => {
    delete process.env[envKey];
  });

  it('usa o nome do .env quando definido', () => {
    process.env[envKey] = 'Minha App';
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.appName).toBe('Minha App');
  });

  it('usa o fallback quando nao ha nome', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.appName).toBe(content.app.nameFallback);
  });

  it('permite atualizar o nome da aplicacao', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.setAppName('Nova App');
    });

    expect(result.current.appName).toBe('Nova App');
  });

  it('lanca erro quando usado fora do provider', () => {
    expect(() => renderHook(() => useApp())).toThrow('useApp must be used within an AppProvider');
  });
});
