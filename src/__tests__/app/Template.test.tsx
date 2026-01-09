import { render, screen } from '@testing-library/react';
import Template from '@/app/template';
describe('Template', () => {
  it('renderiza titulo e children', () => {
    render(
      <Template>
        <div data-testid="template-child" />
      </Template>
    );

    expect(screen.getByTestId('template-child')).toBeInTheDocument();
    expect(screen.getByRole('main')).toContainElement(screen.getByTestId('template-child'));
  });
});
