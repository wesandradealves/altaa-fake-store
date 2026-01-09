import { renderHook } from '@testing-library/react';
import { useMetadata } from '@/hooks/useMetadata';

describe('useMetadata', () => {
  beforeEach(() => {
    document.title = '';
    document.head.innerHTML = '';
  });

  it('aplica title, description e og tags', () => {
    renderHook(() =>
      useMetadata({
        title: 'Produto X',
        description: 'Descricao do produto',
        keywords: 'produto, teste',
        ogTitle: 'Produto X OG',
        ogImage: 'https://example.com/image.png',
      })
    );

    expect(document.title).toBe('Produto X');

    const description = document.querySelector('meta[name="description"]');
    expect(description?.getAttribute('content')).toBe('Descricao do produto');

    const keywords = document.querySelector('meta[name="keywords"]');
    expect(keywords?.getAttribute('content')).toBe('produto, teste');

    const ogTitle = document.querySelector('meta[property="og:title"], meta[name="og:title"]');
    expect(ogTitle?.getAttribute('content')).toBe('Produto X OG');

    const ogImage = document.querySelector('meta[property="og:image"], meta[name="og:image"]');
    expect(ogImage?.getAttribute('content')).toBe('https://example.com/image.png');
  });

  it('cria e atualiza o favicon', () => {
    renderHook(() =>
      useMetadata({
        title: 'Teste',
        favicon: '/favicon.ico',
      })
    );

    const icon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    expect(icon).not.toBeNull();
    expect(icon?.href).toContain('/favicon.ico');
  });
});
