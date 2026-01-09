import { render, screen } from '@testing-library/react';
import ProductGrid from '@/components/organisms/ProductGrid';
import type { Product } from '@/types/product';

jest.mock('@/components/molecules/ProductCard', () => ({
  __esModule: true,
  default: ({ product, priceLabel }: { product: Product; priceLabel: string }) => (
    <div data-testid="product-card" data-price-label={priceLabel}>
      {product.title}
    </div>
  ),
}));

describe('ProductGrid', () => {
  const makeProduct = (overrides: Partial<Product>): Product => ({
    id: 0,
    title: 'Produto',
    price: 0,
    description: 'Descricao',
    category: 'categoria',
    image: 'https://example.com/image.png',
    rating: { rate: 0, count: 0 },
    ...overrides,
  });

  it('renderiza os cards de produto com o label de preco', () => {
    const products: Product[] = [
      makeProduct({ id: 1, title: 'Produto 1' }),
      makeProduct({ id: 2, title: 'Produto 2' }),
    ];

    render(<ProductGrid products={products} priceLabel="Preco" />);

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Produto 1');
    expect(cards[1]).toHaveTextContent('Produto 2');
    expect(cards[0]).toHaveAttribute('data-price-label', 'Preco');
  });
});
