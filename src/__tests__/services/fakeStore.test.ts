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
const navigatorDescriptor = Object.getOwnPropertyDescriptor(window.navigator, 'onLine');

describe('fakeStore services', () => {
  beforeEach(() => {
    mockedApi.get.mockReset();
    localStorage.clear();
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      get: () => true,
    });
  });

  afterAll(() => {
    if (navigatorDescriptor) {
      Object.defineProperty(window.navigator, 'onLine', navigatorDescriptor);
    }
  });

  const setOnlineStatus = (value: boolean) => {
    Object.defineProperty(window.navigator, 'onLine', {
      configurable: true,
      get: () => value,
    });
  };

  const setCache = <T>(key: string, data: T, timestamp = Date.now()) => {
    localStorage.setItem(`fakestore:${key}`, JSON.stringify({ data, timestamp }));
  };

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

  it('retorna cache quando offline para produtos', async () => {
    setOnlineStatus(false);
    const cachedProducts = [
      {
        id: 1,
        title: 'Produto Cache',
        price: 12.5,
        description: 'Descricao',
        category: 'categoria',
        image: 'img',
        rating: { rate: 4.2, count: 10 },
      },
    ];
    setCache('products', cachedProducts);

    const products = await fetchProducts();

    expect(mockedApi.get).not.toHaveBeenCalled();
    expect(products).toEqual(cachedProducts);
  });

  it('retorna cache quando a API falha', async () => {
    setOnlineStatus(true);
    const cachedCategories = ['electronics'];
    setCache('categories', cachedCategories);

    mockedApi.get.mockRejectedValue(new Error('Falha'));

    const categories = await fetchCategories();

    expect(categories).toEqual(cachedCategories);
  });

  it('salva cache ao buscar produto', async () => {
    mockedApi.get.mockResolvedValue({
      data: {
        id: 9,
        title: 'Produto 9',
        price: 99.9,
        description: 'Descricao',
        category: 'categoria',
        image: 'img',
        rating: { rate: 4.1, count: 2 },
      },
    });

    await fetchProductById(9);

    const cached = localStorage.getItem('fakestore:product:9');
    expect(cached).not.toBeNull();
  });

  it('propaga erro quando offline e sem cache', async () => {
    setOnlineStatus(false);
    mockedApi.get.mockRejectedValue(new Error('Sem cache'));

    await expect(fetchCategories()).rejects.toThrow('Sem cache');
  });
});
