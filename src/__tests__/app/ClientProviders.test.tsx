import { render, screen, waitFor } from '@testing-library/react';
import ClientProviders from '@/app/client';
import { setupInterceptors } from '@/services/api';

jest.mock('motion/react', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  },
  useScroll: () => ({
    scrollY: {
      onChange: jest.fn(() => jest.fn()),
    },
  }),
}));

jest.mock('@/app/registry', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/app/style', () => ({
  App: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-shell">{children}</div>
  ),
  GlobalStyle: () => <div data-testid="global-style" />,
}));

jest.mock('@/components/header/header', () => ({
  __esModule: true,
  default: () => <div data-testid="header" />,
}));

jest.mock('@/components/footer/footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

jest.mock('@/components/spinner/spinner', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner" />,
}));

jest.mock('@/services/api', () => ({
  setupInterceptors: jest.fn(),
}));

describe('ClientProviders', () => {
  it('renderiza estrutura base e configura interceptors', async () => {
    render(
      <ClientProviders>
        <div data-testid="page-child" />
      </ClientProviders>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('global-style')).toBeInTheDocument();
    expect(screen.getByTestId('page-child')).toBeInTheDocument();

    await waitFor(() => {
      expect(setupInterceptors).toHaveBeenCalledTimes(1);
    });

    expect(typeof (setupInterceptors as jest.Mock).mock.calls[0][0]).toBe('function');
  });
});
