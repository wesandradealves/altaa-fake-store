import type { Meta, StoryObj } from '@storybook/react';
import { sampleProduct } from '@/stories/fixtures/products';
import ProductDetail from './ProductDetail';

const meta: Meta<typeof ProductDetail> = {
  title: 'Organisms/ProductDetail',
  component: ProductDetail,
  args: {
    product: {
      ...sampleProduct,
      description: 'Descricao detalhada do produto Alpha',
    },
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
