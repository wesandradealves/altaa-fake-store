import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ThemeToggle from '@/components/molecules/ThemeToggle';
import { ThemeModeProvider } from '@/context/theme';
import content from '@/config/content.json';

const renderToggle = () =>
  render(
    <ThemeModeProvider>
      <ThemeToggle />
    </ThemeModeProvider>
  );

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

it('carrega preferencia salva de tema', async () => {
  localStorage.setItem('theme-mode', 'light');

  renderToggle();

  const button = await screen.findByRole('button', {
    name: content.app.theme.toggleToDark,
  });

  expect(button).toBeInTheDocument();
  expect(button.querySelector('svg')).toBeInTheDocument();
  expect(button).toHaveAttribute('aria-pressed', 'false');
  expect(document.documentElement.dataset.theme).toBe('light');
});

it('alterna entre dark e light', async () => {
  renderToggle();

  const button = await screen.findByRole('button', {
    name: content.app.theme.toggleToLight,
  });

  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(button).toHaveAttribute('aria-pressed', 'true');
  expect(button.querySelector('svg')).toBeInTheDocument();

  fireEvent.click(button);

  await waitFor(() => {
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(button).toHaveAttribute('aria-label', content.app.theme.toggleToDark);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  expect(localStorage.getItem('theme-mode')).toBe('light');
});
