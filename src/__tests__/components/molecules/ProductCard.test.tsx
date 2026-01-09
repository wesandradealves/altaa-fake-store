import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/molecules/ProductCard';

const product = {
  id: 1,
  title: 'Produto Teste',
  price: 109.95,
  description: 'Descricao',
  category: "men's clothing",
  image: 'https://example.com/image.png',
  rating: { rate: 4.5, count: 10 },
};

describe('ProductCard', () => {
  it('renderiza titulo, categoria e preco', () => {
    render(<ProductCard product={product} priceLabel="Preco" />);

    expect(screen.getByRole('heading', { name: 'Produto Teste' })).toBeInTheDocument();
    expect(screen.getByText("men's clothing")).toBeInTheDocument();
    expect(screen.getByText('Preco')).toBeInTheDocument();
  });

  it('expõe links para produto e categoria', () => {
    render(<ProductCard product={product} priceLabel="Preco" />);

    expect(screen.getByRole('link', { name: 'Produto Teste' })).toHaveAttribute('href', '/product/1');
    expect(screen.getByRole('link', { name: "men's clothing" })).toHaveAttribute(
      'href',
      "/categoria/men's%20clothing"
    );
  });
});
