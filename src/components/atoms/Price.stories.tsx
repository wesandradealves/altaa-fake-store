import type { Meta, StoryObj } from '@storybook/react';
import Price from './Price';

const meta: Meta<typeof Price> = {
  title: 'Atoms/Price',
  component: Price,
  args: {
    value: 109.95,
    currency: 'BRL',
    locale: 'pt-BR',
    className: 'text-lg font-semibold',
  },
};

export default meta;

type Story = StoryObj<typeof Price>;

export const Default: Story = {};

export const InvalidValue: Story = {
  args: {
    value: null,
    fallback: '--',
  },
};
