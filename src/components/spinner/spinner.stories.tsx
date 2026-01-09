import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import Spinner from './spinner';
import { useLoader } from '@/context/spinner';

const SpinnerDemo = ({ active }: { active: boolean }) => {
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(active);
    return () => setLoading(false);
  }, [active, setLoading]);

  return <Spinner />;
};

const meta: Meta<typeof Spinner> = {
  title: 'Layout/Spinner',
  component: Spinner,
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Loading: Story = {
  render: () => <SpinnerDemo active={true} />,
};

export const Hidden: Story = {
  render: () => <SpinnerDemo active={false} />,
};
