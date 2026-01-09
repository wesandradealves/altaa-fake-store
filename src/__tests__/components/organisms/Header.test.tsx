import { render, screen } from '@testing-library/react';
import Header from '@/components/header/header';
import content from '@/config/content.json';

jest.mock('@/components/molecules/CategoriesMenu', () => ({
  __esModule: true,
  default: () => <div data-testid="categories-menu" />,
}));

describe('Header', () => {
  it('renderiza o header padrao com link inicial', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-transparent');

    const homeLink = screen.getByRole('link', { name: content.app.nav.home });
    expect(homeLink).toHaveAttribute('href', '/');

    const logoLink = screen.getByRole('link', { name: content.app.logoAlt });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('aplica estilo com scroll', () => {
    render(<Header scrollPosition={20} />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-black/70');
    expect(header).toHaveClass('backdrop-blur');
  });
});
