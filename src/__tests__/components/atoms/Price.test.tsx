import { render, screen } from '@testing-library/react';
import Price from '@/components/atoms/Price';

describe('Price', () => {
  it('formata o valor com locale e currency', () => {
    const expected = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(12.5);

    render(<Price value={12.5} locale="en-US" currency="USD" />);

    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it('exibe fallback quando valor invalido', () => {
    render(<Price value={null} fallback="--" />);
    expect(screen.getByText('--')).toBeInTheDocument();
  });
});
