import type { Meta, StoryObj } from '@storybook/react';
import { sampleProduct, sampleProducts } from '@/stories/fixtures/products';
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
          ...sampleProduct,
          description: 'Descricao detalhada do produto Alpha',
        },
        isReady: true,
      },
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
