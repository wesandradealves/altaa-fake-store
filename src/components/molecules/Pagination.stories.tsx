import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  args: {
    currentPage: 2,
    totalPages: 5,
    labels: {
      previous: 'Anterior',
      next: 'Proxima',
      page: 'Pagina',
      nav: 'Paginacao',
    },
  },
  argTypes: {
    onPageChange: { action: 'pagina alterada' },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
  },
};
