import { render, screen } from '@testing-library/react';
import ProductGrid from '@/components/organisms/ProductGrid';

jest.mock('@/components/molecules/ProductCard', () => ({
  __esModule: true,
  default: ({ product, priceLabel }: { product: { id: number; title: string }; priceLabel: string }) => (
    <div data-testid="product-card" data-price-label={priceLabel}>
      {product.title}
    </div>
  ),
}));

describe('ProductGrid', () => {
  it('renderiza os cards de produto com o label de preco', () => {
    const products = [
      { id: 1, title: 'Produto 1' },
      { id: 2, title: 'Produto 2' },
    ];

    render(<ProductGrid products={products as any} priceLabel="Preco" />);

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent('Produto 1');
    expect(cards[1]).toHaveTextContent('Produto 2');
    expect(cards[0]).toHaveAttribute('data-price-label', 'Preco');
  });
});
