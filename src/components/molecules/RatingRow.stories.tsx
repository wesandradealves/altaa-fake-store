import type { Meta, StoryObj } from '@storybook/react';
import RatingRow from './RatingRow';

const meta: Meta<typeof RatingRow> = {
  title: 'Molecules/RatingRow',
  component: RatingRow,
  args: {
    value: 4.5,
    count: 120,
    label: 'Nota',
    countLabel: 'avaliacoes',
  },
};

export default meta;

type Story = StoryObj<typeof RatingRow>;

export const Default: Story = {};
