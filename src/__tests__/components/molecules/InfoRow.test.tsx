import { render, screen } from '@testing-library/react';
import InfoRow from '@/components/molecules/InfoRow';

describe('InfoRow', () => {
  it('renderiza label e conteudo', () => {
    render(
      <InfoRow label="Preco">
        <span>R$ 10,00</span>
      </InfoRow>
    );

    expect(screen.getByText('Preco')).toBeInTheDocument();
    expect(screen.getByText('R$ 10,00')).toBeInTheDocument();
  });
});
