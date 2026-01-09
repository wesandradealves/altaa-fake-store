import { render } from '@testing-library/react';
import ProductDetailSkeleton from '@/components/molecules/ProductDetailSkeleton';

describe('ProductDetailSkeleton', () => {
  it('renderiza placeholders de carregamento do detalhe', () => {
    const { container } = render(<ProductDetailSkeleton />);

    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(7);
    expect(container.firstChild).toHaveClass('grid');
  });
});
