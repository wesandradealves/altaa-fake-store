import type { Meta, StoryObj } from '@storybook/react';
import { sampleProducts } from '@/stories/fixtures/products';
import ProductGrid from './ProductGrid';

const meta: Meta<typeof ProductGrid> = {
  title: 'Organisms/ProductGrid',
  component: ProductGrid,
  args: {
    products: sampleProducts.slice(0, 3),
    priceLabel: 'Preco',
  },
};

export default meta;

type Story = StoryObj<typeof ProductGrid>;

export const Default: Story = {};
