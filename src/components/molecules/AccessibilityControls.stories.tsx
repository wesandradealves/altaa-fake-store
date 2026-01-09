import type { Meta, StoryObj } from '@storybook/react';
import AccessibilityControls from './AccessibilityControls';

const meta: Meta<typeof AccessibilityControls> = {
  title: 'Molecules/AccessibilityControls',
  component: AccessibilityControls,
};

export default meta;

type Story = StoryObj<typeof AccessibilityControls>;

export const Default: Story = {};
