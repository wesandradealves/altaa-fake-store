import { render, screen } from '@testing-library/react';
import StyledComponentsRegistry from '@/app/registry';
import { useServerInsertedHTML } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useServerInsertedHTML: jest.fn(),
}));

describe('StyledComponentsRegistry', () => {
  it('renderiza children e registra insercao de estilos', () => {
    render(
      <StyledComponentsRegistry>
        <div data-testid="registry-child" />
      </StyledComponentsRegistry>
    );

    expect(screen.getByTestId('registry-child')).toBeInTheDocument();

    const mockedHook = useServerInsertedHTML as jest.Mock;
    expect(mockedHook).toHaveBeenCalledTimes(1);
    expect(typeof mockedHook.mock.calls[0][0]).toBe('function');
  });
});
