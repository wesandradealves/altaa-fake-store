import type { Meta, StoryObj } from '@storybook/react';
import { sampleProduct } from '@/stories/fixtures/products';
import ProductCard from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  args: {
    product: sampleProduct,
    priceLabel: 'Preco',
  },
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {};
