import { render, screen } from '@testing-library/react';
import Template from '@/app/product/[id]/template';

describe('Product Template', () => {
  it('renderiza children', () => {
    render(
      <Template>
        <div data-testid="product-template-child" />
      </Template>
    );

    expect(screen.getByTestId('product-template-child')).toBeInTheDocument();
  });
});
