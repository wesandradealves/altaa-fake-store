import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StateMessage from '@/components/molecules/StateMessage';

describe('StateMessage', () => {
  it('renderiza titulo e descricao', () => {
    render(<StateMessage title="Erro" description="Falha ao carregar" />);

    expect(screen.getByText('Erro')).toBeInTheDocument();
    expect(screen.getByText('Falha ao carregar')).toBeInTheDocument();
  });

  it('executa action quando clicado', async () => {
    const user = userEvent.setup();
    const onAction = jest.fn();

    render(
      <StateMessage
        title="Erro"
        description="Falha ao carregar"
        actionLabel="Tentar novamente"
        onAction={onAction}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
