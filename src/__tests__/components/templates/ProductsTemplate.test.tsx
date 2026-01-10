import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsTemplate from '@/components/templates/ProductsTemplate';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { useMetadata } from '@/hooks/useMetadata';
import type { Product } from '@/types/product';
import content from '@/config/content.json';

type FilterBarProps = {
  category: string;
  sort: string;
  gridSize: number;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onGridSizeChange: (value: number) => void;
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type ProductGridProps = {
  products: Product[];
};

jest.mock('@/hooks/useProducts', () => ({
  useProducts: jest.fn(),
}));

jest.mock('@/hooks/useCategories', () => ({
  useCategories: jest.fn(),
}));

jest.mock('@/hooks/useMetadata', () => ({
  useMetadata: jest.fn(),
}));

jest.mock('@/components/molecules/FilterBar', () => ({
  __esModule: true,
  default: ({
    category,
    sort,
    gridSize,
    onCategoryChange,
    onSortChange,
    onGridSizeChange,
  }: FilterBarProps) => (
    <div data-testid="filter-bar" data-category={category} data-sort={sort}>
      <button type="button" onClick={() => onCategoryChange('electronics')}>
        Trocar categoria
      </button>
      <button type="button" onClick={() => onSortChange('name-desc')}>
        Trocar ordenacao
      </button>
      <button type="button" onClick={() => onGridSizeChange(4)} data-grid={gridSize}>
        Trocar grid
      </button>
    </div>
  ),
}));

jest.mock('@/components/molecules/Pagination', () => ({
  __esModule: true,
  default: ({ currentPage, totalPages, onPageChange }: PaginationProps) => (
    <div data-testid="pagination" data-page={currentPage} data-total={totalPages}>
      <button type="button" onClick={() => onPageChange(2)}>
        Pagina 2
      </button>
    </div>
  ),
}));

jest.mock('@/components/organisms/ProductGrid', () => ({
  __esModule: true,
  default: ({ products }: ProductGridProps) => (
    <div data-testid="product-grid">
      {products.map((product) => (
        <span key={product.id}>{product.title}</span>
      ))}
    </div>
  ),
}));

jest.mock('@/components/molecules/ProductCardSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="product-card-skeleton" />,
}));

const mockedUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;
const mockedUseCategories = useCategories as jest.MockedFunction<typeof useCategories>;
const mockedUseMetadata = useMetadata as jest.MockedFunction<typeof useMetadata>;

describe('ProductsTemplate', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseCategories.mockReturnValue({
      categories: ['electronics'],
      loading: false,
      error: null,
      isEmpty: false,
      refresh: jest.fn(),
    });
  });

  it('renderiza skeletons durante o carregamento', () => {
    mockedUseProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null,
      isEmpty: false,
      refresh: jest.fn(),
    });

    render(<ProductsTemplate />);

    expect(screen.getAllByTestId('product-card-skeleton')).toHaveLength(8);
    expect(mockedUseMetadata).toHaveBeenCalled();
  });

  it('mostra erro e permite tentar novamente', async () => {
    const user = userEvent.setup();
    const refreshProducts = jest.fn();
    const refreshCategories = jest.fn();

    mockedUseProducts.mockReturnValue({
      products: [],
      loading: false,
      error: 'Falha',
      isEmpty: false,
      refresh: refreshProducts,
    });

    mockedUseCategories.mockReturnValue({
      categories: [],
      loading: false,
      error: null,
      isEmpty: false,
      refresh: refreshCategories,
    });

    render(<ProductsTemplate />);

    await waitFor(() => {
      expect(screen.getByText(content.products.states.errorTitle)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: content.products.states.retry }));
    expect(refreshProducts).toHaveBeenCalledTimes(1);
    expect(refreshCategories).toHaveBeenCalledTimes(1);
  });

  it('ordena e pagina a lista de produtos', async () => {
    const user = userEvent.setup();

    mockedUseProducts.mockReturnValue({
      products: [
        makeProduct({ id: 1, title: 'Produto A', price: 10 }),
        makeProduct({ id: 2, title: 'Produto B', price: 20 }),
        makeProduct({ id: 3, title: 'Produto C', price: 30 }),
        makeProduct({ id: 4, title: 'Produto D', price: 40 }),
        makeProduct({ id: 5, title: 'Produto E', price: 50 }),
        makeProduct({ id: 6, title: 'Produto F', price: 60 }),
        makeProduct({ id: 7, title: 'Produto G', price: 70 }),
        makeProduct({ id: 8, title: 'Produto H', price: 80 }),
        makeProduct({ id: 9, title: 'Produto I', price: 90 }),
        makeProduct({ id: 10, title: 'Produto J', price: 100 }),
      ],
      loading: false,
      error: null,
      isEmpty: false,
      refresh: jest.fn(),
    });

    render(<ProductsTemplate />);

    const grid = await screen.findByTestId('product-grid');
    expect(grid).toHaveTextContent('Produto A');
    expect(grid).toHaveTextContent('Produto H');
    expect(grid).not.toHaveTextContent('Produto I');

    await user.click(screen.getByRole('button', { name: 'Pagina 2' }));

    expect(grid).toHaveTextContent('Produto I');
    expect(grid).toHaveTextContent('Produto J');
    expect(grid).not.toHaveTextContent('Produto A');

    await user.click(screen.getByRole('button', { name: 'Trocar ordenacao' }));

    const pagination = screen.getByTestId('pagination');
    expect(pagination).toHaveAttribute('data-page', '1');
    expect(grid).toHaveTextContent('Produto J');
    expect(grid).not.toHaveTextContent('Produto A');
  });
});
