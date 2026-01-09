import type { Meta, StoryObj } from '@storybook/react';
import ProductDetailSkeleton from './ProductDetailSkeleton';

const meta: Meta<typeof ProductDetailSkeleton> = {
  title: 'Molecules/ProductDetailSkeleton',
  component: ProductDetailSkeleton,
};

export default meta;

type Story = StoryObj<typeof ProductDetailSkeleton>;

export const Default: Story = {};
