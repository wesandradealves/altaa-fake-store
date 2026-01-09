import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CategoriesMenu from '@/components/molecules/CategoriesMenu';
import { useCategories } from '@/hooks/useCategories';
import { encodeCategorySlug } from '@/utils';
import content from '@/config/content.json';

jest.mock('@/hooks/useCategories', () => ({
  useCategories: jest.fn(),
}));

const mockedUseCategories = useCategories as jest.MockedFunction<typeof useCategories>;

describe('CategoriesMenu', () => {
  it('renderiza categorias e abre o menu', async () => {
    const categories = ['electronics', "men's clothing"];

    mockedUseCategories.mockReturnValue({
      categories,
      loading: false,
      error: null,
      isEmpty: false,
      refresh: jest.fn(),
    });

    render(<CategoriesMenu />);

    const trigger = screen.getByRole('button', { name: content.app.nav.categories });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    const wrapper = trigger.parentElement as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('opacity-100');

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: categories[0] })).toBeInTheDocument();
    });

    const firstLink = screen.getByRole('menuitem', { name: categories[0] });
    const secondLink = screen.getByRole('menuitem', { name: categories[1] });

    expect(firstLink).toHaveAttribute('href', `/categoria/${encodeCategorySlug(categories[0])}`);
    expect(secondLink).toHaveAttribute('href', `/categoria/${encodeCategorySlug(categories[1])}`);
  });

  it('exibe status de carregamento quando necessario', () => {
    mockedUseCategories.mockReturnValue({
      categories: [],
      loading: true,
      error: null,
      isEmpty: false,
      refresh: jest.fn(),
    });

    render(<CategoriesMenu />);

    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(content.app.categoriesMenu.loading);
  });
});
