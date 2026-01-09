import type { Meta, StoryObj } from '@storybook/react';
import CategoriesMenu from './CategoriesMenu';

const meta: Meta<typeof CategoriesMenu> = {
  title: 'Molecules/CategoriesMenu',
  component: CategoriesMenu,
};

export default meta;

type Story = StoryObj<typeof CategoriesMenu>;

export const Default: Story = {
  parameters: {
    mockData: {
      categories: {
        categories: ['electronics', 'jewelery', "men's clothing"],
      },
    },
  },
};

export const Loading: Story = {
  parameters: {
    mockData: {
      categories: {
        loading: true,
      },
    },
  },
};

export const Empty: Story = {
  parameters: {
    mockData: {
      categories: {
        categories: [],
        isEmpty: true,
      },
    },
  },
};

export const Error: Story = {
  parameters: {
    mockData: {
      categories: {
        error: 'Falha ao carregar',
      },
    },
  },
};
