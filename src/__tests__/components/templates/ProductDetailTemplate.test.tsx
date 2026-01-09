import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetailTemplate from '@/components/templates/ProductDetailTemplate';
import { useProduct } from '@/hooks/useProduct';
import { useMetadata } from '@/hooks/useMetadata';
import content from '@/config/content.json';

jest.mock('@/hooks/useProduct', () => ({
  useProduct: jest.fn(),
}));

jest.mock('@/hooks/useMetadata', () => ({
  useMetadata: jest.fn(),
}));

jest.mock('@/components/molecules/ProductDetailSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="detail-skeleton" />,
}));

jest.mock('@/components/organisms/ProductDetail', () => ({
  __esModule: true,
  default: ({ product }: any) => <div data-testid="product-detail">{product.title}</div>,
}));

jest.mock('@/components/organisms/RelatedProducts', () => ({
  __esModule: true,
  default: ({ category, currentProductId }: any) => (
    <div data-testid="related-products" data-category={category} data-id={currentProductId} />
  ),
}));

const mockedUseProduct = useProduct as jest.MockedFunction<typeof useProduct>;
const mockedUseMetadata = useMetadata as jest.MockedFunction<typeof useMetadata>;

describe('ProductDetailTemplate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza skeleton durante o carregamento', () => {
    mockedUseProduct.mockReturnValue({
      product: null,
      loading: true,
      error: null,
      refresh: jest.fn(),
      isReady: false,
    });

    render(<ProductDetailTemplate id="1" />);

    expect(screen.getByTestId('detail-skeleton')).toBeInTheDocument();
    expect(mockedUseMetadata).toHaveBeenCalled();
  });

  it('mostra erro e permite tentar novamente', async () => {
    const user = userEvent.setup();
    const refresh = jest.fn();

    mockedUseProduct.mockReturnValue({
      product: null,
      loading: false,
      error: 'Falha',
      refresh,
      isReady: true,
    });

    render(<ProductDetailTemplate id="1" />);

    expect(screen.getByText(content.productDetail.states.errorTitle)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: content.productDetail.states.retry }));
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it('mostra estado vazio quando nao ha produto', () => {
    mockedUseProduct.mockReturnValue({
      product: null,
      loading: false,
      error: null,
      refresh: jest.fn(),
      isReady: true,
    });

    render(<ProductDetailTemplate id="1" />);

    expect(screen.getByText(content.productDetail.states.emptyTitle)).toBeInTheDocument();
  });

  it('renderiza detalhes e produtos relacionados', () => {
    const product = {
      id: 2,
      title: 'Produto Exemplo',
      category: 'electronics',
    };

    mockedUseProduct.mockReturnValue({
      product: product as any,
      loading: false,
      error: null,
      refresh: jest.fn(),
      isReady: true,
    });

    render(<ProductDetailTemplate id="2" />);

    expect(screen.getByTestId('product-detail')).toHaveTextContent('Produto Exemplo');
    const related = screen.getByTestId('related-products');
    expect(related).toHaveAttribute('data-category', 'electronics');
    expect(related).toHaveAttribute('data-id', '2');
  });
});
