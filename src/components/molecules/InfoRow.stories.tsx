import type { Meta, StoryObj } from '@storybook/react';
import InfoRow from './InfoRow';

const meta: Meta<typeof InfoRow> = {
  title: 'Molecules/InfoRow',
  component: InfoRow,
  args: {
    label: 'Preco',
    children: 'R$ 129,90',
  },
};

export default meta;

type Story = StoryObj<typeof InfoRow>;

export const Default: Story = {};
