import { render, screen } from '@testing-library/react';
import ProductDetail from '@/components/organisms/ProductDetail';
import type { Product } from '@/types/product';
import { encodeCategorySlug } from '@/utils';

describe('ProductDetail', () => {
  it('exibe informacoes do produto e links relacionados', () => {
    const product: Product = {
      id: 1,
      title: 'Produto Teste',
      price: 109.95,
      description: 'Descricao completa do produto',
      category: "men's clothing",
      image: 'https://example.com/image.png',
      rating: { rate: 4.5, count: 120 },
    };

    const labels = {
      price: 'Preco',
      category: 'Categoria',
      description: 'Descricao',
      rating: 'Nota',
      ratingCount: 'Avaliacoes',
    };

    render(<ProductDetail product={product} labels={labels} backLabel="Voltar" />);

    expect(screen.getByRole('heading', { name: 'Produto Teste' })).toBeInTheDocument();
    expect(screen.getByText(labels.description)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(labels.rating)).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(120 Avaliacoes)')).toBeInTheDocument();

    const priceLabel = screen.getByText(labels.price);
    expect(priceLabel.parentElement).toHaveTextContent('109');

    const categoryLinks = screen.getAllByRole('link', { name: product.category });
    expect(categoryLinks).toHaveLength(2);
    categoryLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', `/categoria/${encodeCategorySlug(product.category)}`);
    });

    expect(screen.getByRole('link', { name: 'Voltar' })).toHaveAttribute('href', '/');
  });
});
