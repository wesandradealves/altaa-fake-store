import { render, screen } from '@testing-library/react';
import RatingRow from '@/components/molecules/RatingRow';

describe('RatingRow', () => {
  it('renderiza nota e quantidade', () => {
    render(<RatingRow value={4.5} count={120} label="Nota" countLabel="avaliacoes" />);

    expect(screen.getByText('Nota')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(120 avaliacoes)')).toBeInTheDocument();
  });
});
