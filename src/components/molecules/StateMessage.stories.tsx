import type { Meta, StoryObj } from '@storybook/react';
import StateMessage from './StateMessage';

const meta: Meta<typeof StateMessage> = {
  title: 'Molecules/StateMessage',
  component: StateMessage,
  args: {
    title: 'Algo deu errado',
    description: 'Tente novamente em alguns instantes.',
  },
  argTypes: {
    onAction: { action: 'action click' },
  },
};

export default meta;

type Story = StoryObj<typeof StateMessage>;

export const Default: Story = {};

export const AlertWithAction: Story = {
  args: {
    tone: 'alert',
    actionLabel: 'Tentar novamente',
  },
};
