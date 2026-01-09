import type { Meta, StoryObj } from '@storybook/react';
import RelatedProducts from './RelatedProducts';

const meta: Meta<typeof RelatedProducts> = {
  title: 'Organisms/RelatedProducts',
  component: RelatedProducts,
  args: {
    category: 'electronics',
    currentProductId: 1,
  },
};

export default meta;

type Story = StoryObj<typeof RelatedProducts>;

export const Default: Story = {
  parameters: {
    mockData: {
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
          {
            id: 4,
            title: 'Produto Delta',
            price: 132.0,
            description: 'Descricao do produto Delta',
            category: 'electronics',
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
        ],
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
    },
  },
};
