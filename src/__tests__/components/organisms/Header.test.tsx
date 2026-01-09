import { render, screen } from '@testing-library/react';
import Header from '@/components/header/header';
import content from '@/config/content.json';

jest.mock('@/components/molecules/CategoriesMenu', () => ({
  __esModule: true,
  default: () => <div data-testid="categories-menu" />,
}));

jest.mock('@/components/molecules/AccessibilityControls', () => ({
  __esModule: true,
  default: () => <div data-testid="accessibility-controls" />,
}));

jest.mock('@/components/molecules/ThemeToggle', () => ({
  __esModule: true,
  default: () => <div data-testid="theme-toggle" />,
}));

describe('Header', () => {
  it('renderiza o header padrao com link inicial', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-transparent');

    const homeLink = screen.getByRole('link', { name: content.app.nav.home });
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveAttribute('aria-label', content.app.nav.home);
    expect(homeLink.querySelector('svg')).toBeInTheDocument();

    const logoLink = screen.getByRole('link', { name: content.app.logoAlt });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('aplica estilo com scroll', () => {
    render(<Header scrollPosition={20} />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-[color:var(--surface)]/80');
    expect(header).toHaveClass('backdrop-blur');
  });
});
