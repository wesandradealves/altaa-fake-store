import type { Meta, StoryObj } from '@storybook/react';
import ProductDetailTemplate from './ProductDetailTemplate';

const meta: Meta<typeof ProductDetailTemplate> = {
  title: 'Templates/ProductDetailTemplate',
  component: ProductDetailTemplate,
  args: {
    id: '1',
  },
};

export default meta;

type Story = StoryObj<typeof ProductDetailTemplate>;

export const Default: Story = {
  parameters: {
    mockData: {
      product: {
        product: {
          id: 1,
          title: 'Produto Alpha',
          price: 109.95,
          description: 'Descricao detalhada do produto Alpha',
          category: 'electronics',
          image: 'https://placehold.co/600x600/png',
          rating: { rate: 4.5, count: 120 },
        },
        isReady: true,
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
            category: 'electronics',
            image: 'https://placehold.co/600x600/png',
            rating: { rate: 4.2, count: 48 },
          },
          {
            id: 3,
            title: 'Produto Gamma',
            price: 55.5,
            description: 'Descricao do produto Gamma',
            category: 'electronics',
            image: 'https://placehold.co/600x600/png',
            rating: { rate: 4.1, count: 32 },
          },
        ],
      },
    },
  },
};

export const Loading: Story = {
  parameters: {
    mockData: {
      product: {
        loading: true,
      },
    },
  },
};

export const Error: Story = {
  parameters: {
    mockData: {
      product: {
        error: 'Falha ao carregar',
        isReady: true,
      },
    },
  },
};

export const Empty: Story = {
  parameters: {
    mockData: {
      product: {
        product: null,
        isReady: true,
      },
    },
  },
};
