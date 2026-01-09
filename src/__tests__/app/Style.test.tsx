import { render, screen } from '@testing-library/react';
import { ThemeProvider, type DefaultTheme } from 'styled-components';
import { App, GlobalStyle } from '@/app/style';

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
      accent: '#ffffff',
      accentSoft: '#ffffff',
      text: '#ffffff',
      textStrong: '#000000',
      surface: '#111111',
      surfaceAlt: '#222222',
      muted: '#999999',
    },
  },
};

describe('App styles', () => {
  it('renderiza o container e injeta estilos globais', () => {
    render(
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <App data-testid="app-shell">Conteudo</App>
        </>
      </ThemeProvider>
    );

    expect(screen.getByTestId('app-shell')).toHaveTextContent('Conteudo');
  });
});
