import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
  component: Logo,
  args: {
    width: 140,
    height: 79,
    className: 'h-12 w-auto',
    priority: true,
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    width: 90,
    height: 50,
    className: 'h-8 w-auto',
  },
};
