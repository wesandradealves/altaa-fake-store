import { render, screen } from '@testing-library/react';
import ProductPage from '@/app/product/[id]/page';

jest.mock('@/components/templates/ProductDetailTemplate', () => ({
  __esModule: true,
  default: ({ id }: { id: string }) => <div data-testid="product-template" data-id={id} />,
}));

describe('ProductPage', () => {
  it('passa o id para o template', async () => {
    const element = await ProductPage({ params: Promise.resolve({ id: '42' }) });

    render(element);

    expect(screen.getByTestId('product-template')).toHaveAttribute('data-id', '42');
  });

  it('renderiza com id vazio quando nao ha param', async () => {
    const element = await ProductPage({ params: Promise.resolve({}) });

    render(element);

    expect(screen.getByTestId('product-template')).toHaveAttribute('data-id', '');
  });
});
