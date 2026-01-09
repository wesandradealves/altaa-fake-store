import { render, screen } from '@testing-library/react';
import Badge from '@/components/atoms/Badge';

describe('Badge', () => {
  it('renderiza o conteudo', () => {
    render(<Badge>categoria</Badge>);
    expect(screen.getByText('categoria')).toBeInTheDocument();
  });
});
