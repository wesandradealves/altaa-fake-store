import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  args: {
    children: 'Destaque',
    className: 'bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-200',
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const LongText: Story = {
  args: {
    children: 'Categoria Premium',
  },
};
