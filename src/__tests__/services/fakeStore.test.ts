import api from '@/services/api';
import {
  fetchCategories,
  fetchProductById,
  fetchProducts,
  fetchProductsByCategory,
} from '@/services/fakeStore';

jest.mock('@/services/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const mockedApi = api as { get: jest.Mock };

describe('fakeStore services', () => {
  beforeEach(() => {
    mockedApi.get.mockReset();
  });

  it('normaliza lista de produtos', async () => {
    mockedApi.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Produto',
          price: '10.5',
          rating: { rate: '4.2', count: '8' },
        },
      ],
    });

    const products = await fetchProducts();

    expect(mockedApi.get).toHaveBeenCalledWith('/products');
    expect(products[0].price).toBe(10.5);
    expect(products[0].rating?.rate).toBe(4.2);
    expect(products[0].rating?.count).toBe(8);
  });

  it('busca produto por id', async () => {
    mockedApi.get.mockResolvedValue({
      data: {
        id: 2,
        title: 'Produto 2',
        price: 20,
        rating: { rate: 3, count: 1 },
      },
    });

    const product = await fetchProductById(2);

    expect(mockedApi.get).toHaveBeenCalledWith('/products/2');
    expect(product.id).toBe(2);
  });

  it('busca categorias', async () => {
    mockedApi.get.mockResolvedValue({
      data: ['electronics', 'jewelery'],
    });

    const categories = await fetchCategories();

    expect(mockedApi.get).toHaveBeenCalledWith('/products/categories');
    expect(categories).toEqual(['electronics', 'jewelery']);
  });

  it('busca produtos por categoria', async () => {
    mockedApi.get.mockResolvedValue({
      data: [
        {
          id: 3,
          title: 'Produto 3',
          price: 30,
          rating: { rate: 4, count: 2 },
        },
      ],
    });

    await fetchProductsByCategory("men's clothing");

    expect(mockedApi.get).toHaveBeenCalledWith("/products/category/men's%20clothing");
  });
});
