import type { Meta, StoryObj } from '@storybook/react';
import { sampleProducts } from '@/stories/fixtures/products';
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
        products: sampleProducts.map((product) => ({
          ...product,
          category: 'electronics',
        })),
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
