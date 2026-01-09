import { render, screen } from '@testing-library/react';
import Logo from '@/components/atoms/Logo';
import content from '@/config/content.json';

describe('Logo', () => {
  it('renderiza a imagem com alt padrao', () => {
    render(<Logo />);
    const image = screen.getByAltText(content.app.logoAlt) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBe('/altaa_logo_branca-1024x576.png');
    expect(image).toHaveClass('app-logo');
  });

  it('permite sobrescrever alt e tamanhos', () => {
    render(<Logo alt="Logo Teste" width={80} height={40} className="custom-logo" />);
    const image = screen.getByAltText('Logo Teste');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('app-logo');
    expect(image).toHaveClass('custom-logo');
  });
});
