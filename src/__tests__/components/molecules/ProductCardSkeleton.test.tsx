import { render } from '@testing-library/react';
import ProductCardSkeleton from '@/components/molecules/ProductCardSkeleton';

describe('ProductCardSkeleton', () => {
  it('renderiza placeholders de carregamento', () => {
    const { container } = render(<ProductCardSkeleton />);

    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(5);
    expect(container.firstChild).toHaveClass('rounded-2xl');
  });
});
