import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

jest.mock('@/components/templates/ProductsTemplate', () => ({
  __esModule: true,
  default: () => <div data-testid="products-template" />,
}));

describe('HomePage', () => {
  it('renderiza o template de produtos', () => {
    render(<HomePage />);

    expect(screen.getByTestId('products-template')).toBeInTheDocument();
  });
});
