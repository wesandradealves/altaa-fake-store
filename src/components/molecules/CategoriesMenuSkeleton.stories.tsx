import type { Meta, StoryObj } from '@storybook/react';
import CategoriesMenuSkeleton from './CategoriesMenuSkeleton';

const meta: Meta<typeof CategoriesMenuSkeleton> = {
  title: 'Molecules/CategoriesMenuSkeleton',
  component: CategoriesMenuSkeleton,
};

export default meta;

type Story = StoryObj<typeof CategoriesMenuSkeleton>;

export const Default: Story = {};
