import { render } from '@testing-library/react';
import { ThemeProvider, type DefaultTheme } from 'styled-components';
import Spinner from '@/components/spinner/spinner';
import { useLoader } from '@/context/spinner';

jest.mock('@/context/spinner', () => ({
  useLoader: jest.fn(),
}));

const mockedUseLoader = useLoader as jest.MockedFunction<typeof useLoader>;

const theme: DefaultTheme = {
  mode: 'dark',
  _breakpoints: {
    sm: '0',
    md: '0',
    lg: '0',
  },
  _colors: {
    primary: {
      background: '#000000',
      accent: '#00ff00',
      accentSoft: '#ffffff',
      text: '#ffffff',
      textStrong: '#000000',
      surface: '#111111',
      surfaceAlt: '#222222',
      muted: '#999999',
    },
  },
};

describe('Spinner', () => {
  it('nao renderiza quando nao esta carregando', () => {
    mockedUseLoader.mockReturnValue({ isLoading: false, setLoading: jest.fn() });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Spinner />
      </ThemeProvider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renderiza overlay quando esta carregando', () => {
    mockedUseLoader.mockReturnValue({ isLoading: true, setLoading: jest.fn() });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Spinner />
      </ThemeProvider>
    );

    const overlay = container.firstChild as HTMLElement;
    expect(overlay).toHaveStyle({ position: 'fixed' });

    const spinner = overlay.querySelector('div');
    expect(spinner).toHaveStyle({ borderTop: '5px solid #00ff00' });
  });
});
