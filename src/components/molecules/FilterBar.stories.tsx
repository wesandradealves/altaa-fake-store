import type { Meta, StoryObj } from '@storybook/react';
import FilterBar from './FilterBar';

const meta: Meta<typeof FilterBar> = {
  title: 'Molecules/FilterBar',
  component: FilterBar,
  args: {
    categories: ['all', 'electronics', 'jewelery'],
    category: 'all',
    sort: 'price-asc',
    sortOptions: [
      { label: 'Preco: menor para maior', value: 'price-asc' },
      { label: 'Preco: maior para menor', value: 'price-desc' },
      { label: 'Nome: A a Z', value: 'name-asc' },
      { label: 'Nome: Z a A', value: 'name-desc' },
    ],
    labels: {
      category: 'Categoria',
      sort: 'Ordenacao',
      allCategories: 'Todas as categorias',
      categoriesUnavailable: 'Categorias indisponiveis',
    },
  },
  argTypes: {
    onCategoryChange: { action: 'categoria alterada' },
    onSortChange: { action: 'ordenacao alterada' },
  },
};

export default meta;

type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Error: Story = {
  args: {
    error: 'Falha ao carregar',
  },
};
