import { render, screen } from '@testing-library/react';
import CategoryPage from '@/app/categoria/[...slug]/page';

jest.mock('@/components/templates/ProductsTemplate', () => ({
  __esModule: true,
  default: ({ initialCategory }: { initialCategory?: string }) => (
    <div data-testid="products-template" data-category={initialCategory || ''} />
  ),
}));

describe('CategoryPage', () => {
  it('passa a categoria decodificada para o template', async () => {
    const element = await CategoryPage({
      params: Promise.resolve({ slug: ['men%27s%20clothing'] }),
    });

    render(element);

    expect(screen.getByTestId('products-template')).toHaveAttribute(
      'data-category',
      "men's clothing"
    );
  });

  it('renderiza com categoria vazia quando nao ha slug', async () => {
    const element = await CategoryPage({ params: Promise.resolve({}) });

    render(element);

    expect(screen.getByTestId('products-template')).toHaveAttribute('data-category', '');
  });
});
