import type { Meta, StoryObj } from '@storybook/react';
import DataState from './DataState';

const meta: Meta<typeof DataState> = {
  title: 'Molecules/DataState',
  component: DataState,
};

export default meta;

type Story = StoryObj<typeof DataState>;

const baseArgs = {
  loadingFallback: <div>Carregando...</div>,
  errorFallback: <div>Erro ao carregar.</div>,
  emptyFallback: <div>Nenhum resultado.</div>,
  children: <div>Conteudo carregado.</div>,
};

export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
    error: null,
    isEmpty: false,
  },
};

export const Error: Story = {
  args: {
    ...baseArgs,
    loading: false,
    error: 'Falha',
    isEmpty: false,
  },
};

export const Empty: Story = {
  args: {
    ...baseArgs,
    loading: false,
    error: null,
    isEmpty: true,
  },
};

export const Loaded: Story = {
  args: {
    ...baseArgs,
    loading: false,
    error: null,
    isEmpty: false,
  },
};
