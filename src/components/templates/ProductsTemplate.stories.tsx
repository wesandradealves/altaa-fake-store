import type { Meta, StoryObj } from '@storybook/react';
import ProductsTemplate from './ProductsTemplate';

const meta: Meta<typeof ProductsTemplate> = {
  title: 'Templates/ProductsTemplate',
  component: ProductsTemplate,
};

export default meta;

type Story = StoryObj<typeof ProductsTemplate>;

export const Default: Story = {
  parameters: {
    mockData: {
      categories: {
        categories: ['electronics', 'jewelery', "men's clothing"],
      },
      products: {
        products: [
          {
            id: 1,
            title: 'Produto Alpha',
            price: 109.95,
            description: 'Descricao do produto Alpha',
            category: 'electronics',
            image: 'https://placehold.co/600x600/png',
            rating: { rate: 4.5, count: 120 },
          },
          {
            id: 2,
            title: 'Produto Beta',
            price: 79.9,
            description: 'Descricao do produto Beta',
            category: 'jewelery',
            image: 'https://placehold.co/600x600/png',
            rating: { rate: 4.2, count: 48 },
          },
          {
            id: 3,
            title: 'Produto Gamma',
            price: 55.5,
            description: 'Descricao do produto Gamma',
            category: "men's clothing",
            image: 'https://placehold.co/600x600/png',
            rating: { rate: 4.1, count: 32 },
          },
          {
            id: 4,
            title: 'Produto Delta',
            price: 132.0,
            description: 'Descricao do produto Delta',
            category: "women's clothing",
            image: 'https://placehold.co/600x600/png',
            rating: { rate: 3.9, count: 20 },
          },
          {
            id: 5,
            title: 'Produto Epsilon',
            price: 89.0,
            description: 'Descricao do produto Epsilon',
            category: 'electronics',
            image: 'https://placehold.co/600x600/png',
            rating: { rate: 4.8, count: 76 },
          },
          {
            id: 6,
            title: 'Produto Zeta',
            price: 42.0,
            description: 'Descricao do produto Zeta',
            category: 'electronics',
            image: 'https://placehold.co/600x600/png',
            rating: { rate: 4.0, count: 15 },
          },
          {
            id: 7,
            title: 'Produto Eta',
            price: 64.0,
            description: 'Descricao do produto Eta',
            category: 'jewelery',
            image: 'https://placehold.co/600x600/png',
            rating: { rate: 4.3, count: 19 },
          },
          {
            id: 8,
            title: 'Produto Theta',
            price: 92.0,
            description: 'Descricao do produto Theta',
            category: "men's clothing",
            image: 'https://placehold.co/600x600/png',
            rating: { rate: 3.8, count: 13 },
          },
          {
            id: 9,
            title: 'Produto Iota',
            price: 140.0,
            description: 'Descricao do produto Iota',
            category: 'electronics',
            image: 'https://placehold.co/600x600/png',
            rating: { rate: 4.9, count: 200 },
          },
        ],
      },
    },
  },
};

export const Category: Story = {
  args: {
    initialCategory: 'electronics',
  },
  parameters: {
    mockData: {
      categories: {
        categories: ['electronics', 'jewelery', "men's clothing"],
      },
    },
  },
};

export const Loading: Story = {
  parameters: {
    mockData: {
      products: {
        loading: true,
      },
    },
  },
};

export const Error: Story = {
  parameters: {
    mockData: {
      products: {
        error: 'Falha ao carregar',
      },
      categories: {
        categories: ['electronics', 'jewelery'],
      },
    },
  },
};

export const Empty: Story = {
  parameters: {
    mockData: {
      products: {
        products: [],
        isEmpty: true,
      },
      categories: {
        categories: ['electronics', 'jewelery'],
      },
    },
  },
};
