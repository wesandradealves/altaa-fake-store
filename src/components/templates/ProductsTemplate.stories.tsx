import type { Meta, StoryObj } from '@storybook/react';
import { sampleCategories, sampleProducts } from '@/stories/fixtures/products';
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
        categories: sampleCategories,
      },
      products: {
        products: sampleProducts,
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
        categories: sampleCategories,
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
        categories: sampleCategories,
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
        categories: sampleCategories,
      },
    },
  },
};
