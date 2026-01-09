import type { Meta, StoryObj } from '@storybook/react';
import type { Product } from '@/types/product';
import ProductDetail from './ProductDetail';

const product: Product = {
  id: 1,
  title: 'Produto Alpha',
  price: 109.95,
  description: 'Descricao detalhada do produto Alpha',
  category: 'electronics',
  image: 'https://placehold.co/600x600/png',
  rating: { rate: 4.5, count: 120 },
};

const meta: Meta<typeof ProductDetail> = {
  title: 'Organisms/ProductDetail',
  component: ProductDetail,
  args: {
    product,
    labels: {
      price: 'Preco',
      category: 'Categoria',
      description: 'Descricao',
      rating: 'Nota',
      ratingCount: 'Avaliacoes',
    },
    backLabel: 'Voltar para o catalogo',
    backHref: '/',
  },
};

export default meta;

type Story = StoryObj<typeof ProductDetail>;

export const Default: Story = {};
