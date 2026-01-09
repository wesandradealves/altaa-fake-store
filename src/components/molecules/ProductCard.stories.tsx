import type { Meta, StoryObj } from '@storybook/react';
import type { Product } from '@/types/product';
import ProductCard from './ProductCard';

const product: Product = {
  id: 1,
  title: 'Produto Alpha',
  price: 109.95,
  description: 'Descricao do produto Alpha',
  category: 'electronics',
  image: 'https://placehold.co/600x600/png',
  rating: { rate: 4.5, count: 120 },
};

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  args: {
    product,
    priceLabel: 'Preco',
  },
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {};
