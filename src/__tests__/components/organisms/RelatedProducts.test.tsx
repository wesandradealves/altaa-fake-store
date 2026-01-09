import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RelatedProducts from '@/components/organisms/RelatedProducts';
import { useProducts } from '@/hooks/useProducts';
import content from '@/config/content.json';

jest.mock('@/hooks/useProducts', () => ({
  useProducts: jest.fn(),
}));

jest.mock('@/components/molecules/ProductCardSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="product-card-skeleton" />,
}));

jest.mock('@/components/organisms/ProductGrid', () => ({
  __esModule: true,
  default: ({ products }: { products: { id: number; title: string }[] }) => (
    <div data-testid="product-grid">
      {products.map((product) => (
        <span key={product.id}>{product.title}</span>
      ))}
    </div>
  ),
}));

const mockedUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;

describe('RelatedProducts', () => {
  it('renderiza skeletons durante o carregamento', () => {
    mockedUseProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null,
      isEmpty: false,
      refresh: jest.fn(),
    });

    render(<RelatedProducts category="electronics" currentProductId={1} />);

    expect(screen.getAllByTestId('product-card-skeleton')).toHaveLength(4);
  });

  it('mostra erro e permite tentar novamente', async () => {
    const user = userEvent.setup();
    const refresh = jest.fn();

    mockedUseProducts.mockReturnValue({
      products: [],
      loading: false,
      error: 'Falha',
      isEmpty: false,
      refresh,
    });

    render(<RelatedProducts category="electronics" currentProductId={1} />);

    expect(screen.getByText(content.productDetail.related.states.errorTitle)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: content.productDetail.related.states.retry }));
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it('pagina produtos relacionados e filtra o atual', async () => {
    const user = userEvent.setup();

    mockedUseProducts.mockReturnValue({
      products: [
        { id: 1, title: 'Produto 1' },
        { id: 2, title: 'Produto 2' },
        { id: 3, title: 'Produto 3' },
        { id: 4, title: 'Produto 4' },
        { id: 5, title: 'Produto 5' },
        { id: 6, title: 'Produto 6' },
      ],
      loading: false,
      error: null,
      isEmpty: false,
      refresh: jest.fn(),
    });

    render(<RelatedProducts category="electronics" currentProductId={1} />);

    const grid = screen.getByTestId('product-grid');
    expect(grid).toHaveTextContent('Produto 2');
    expect(grid).toHaveTextContent('Produto 5');
    expect(grid).not.toHaveTextContent('Produto 1');
    expect(grid).not.toHaveTextContent('Produto 6');

    await user.click(screen.getByRole('button', { name: 'Pagina 2' }));

    expect(grid).toHaveTextContent('Produto 6');
    expect(grid).not.toHaveTextContent('Produto 2');
  });
});
