import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { App, GlobalStyle } from '@/app/style';

const theme = {
  _colors: {
    primary: {
      background: '#000000',
      accent: '#ffffff',
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
