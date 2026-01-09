import { render, screen } from '@testing-library/react';
import Footer from '@/components/footer/footer';
import content from '@/config/content.json';

describe('Footer', () => {
  it('renderiza logo e tagline com link', () => {
    render(<Footer />);

    expect(screen.getByRole('img', { name: content.app.logoAlt })).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Wesley Alves/i });
    expect(link).toHaveAttribute('href', 'http://www.github.com/wesandradealves');
  });
});
