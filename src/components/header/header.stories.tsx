import type { Meta, StoryObj } from '@storybook/react';
import Header from './header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  args: {
    scrollPosition: 0,
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const Scrolled: Story = {
  args: {
    scrollPosition: 20,
  },
};
