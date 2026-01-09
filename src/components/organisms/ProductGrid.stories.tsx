import type { Meta, StoryObj } from '@storybook/react';
import type { Product } from '@/types/product';
import ProductGrid from './ProductGrid';

const products: Product[] = [
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
];

const meta: Meta<typeof ProductGrid> = {
  title: 'Organisms/ProductGrid',
  component: ProductGrid,
  args: {
    products,
    priceLabel: 'Preco',
  },
};

export default meta;

type Story = StoryObj<typeof ProductGrid>;

export const Default: Story = {};
