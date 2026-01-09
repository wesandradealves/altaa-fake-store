import { render, screen } from '@testing-library/react';
import DataState from '@/components/molecules/DataState';

const renderState = (props: Partial<React.ComponentProps<typeof DataState>>) => {
  const baseProps: React.ComponentProps<typeof DataState> = {
    loading: false,
    error: null,
    isEmpty: false,
    loadingFallback: <div>loading</div>,
    errorFallback: <div>error</div>,
    emptyFallback: <div>empty</div>,
    children: <div>content</div>,
  };

  return render(<DataState {...baseProps} {...props} />);
};

describe('DataState', () => {
  it('mostra loading', () => {
    renderState({ loading: true });
    expect(screen.getByText('loading')).toBeInTheDocument();
  });

  it('mostra erro', () => {
    renderState({ error: 'Falha' });
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it('mostra vazio', () => {
    renderState({ isEmpty: true });
    expect(screen.getByText('empty')).toBeInTheDocument();
  });

  it('mostra conteudo quando ok', () => {
    renderState({});
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
