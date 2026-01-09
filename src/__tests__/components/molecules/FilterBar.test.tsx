import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from '@/components/molecules/FilterBar';

const labels = {
  category: 'Categoria',
  sort: 'Ordenacao',
  allCategories: 'Todas as categorias',
  categoriesUnavailable: 'Categorias indisponiveis',
};

const sortOptions = [
  { label: 'Nome A-Z', value: 'name-asc' },
  { label: 'Nome Z-A', value: 'name-desc' },
];

const categories = ['all', 'electronics'];

describe('FilterBar', () => {
  it('permite selecionar categoria e ordenacao', async () => {
    const user = userEvent.setup();
    const onCategoryChange = jest.fn();
    const onSortChange = jest.fn();

    render(
      <FilterBar
        categories={categories}
        category="all"
        sort="name-asc"
        sortOptions={sortOptions}
        labels={labels}
        onCategoryChange={onCategoryChange}
        onSortChange={onSortChange}
      />
    );

    await user.click(screen.getByLabelText(labels.category));
    await user.click(screen.getByText('electronics'));
    expect(onCategoryChange).toHaveBeenCalledWith('electronics');

    await user.click(screen.getByLabelText(labels.sort));
    await user.click(screen.getByText('Nome Z-A'));
    expect(onSortChange).toHaveBeenCalledWith('name-desc');
  });

  it('exibe estado de erro ao carregar categorias', async () => {
    const user = userEvent.setup();

    render(
      <FilterBar
        categories={categories}
        category="all"
        sort="name-asc"
        sortOptions={sortOptions}
        labels={labels}
        loading
        error="Falha"
        onCategoryChange={jest.fn()}
        onSortChange={jest.fn()}
      />
    );

    const categorySelect = screen.getByLabelText(labels.category);
    expect(categorySelect).toHaveAttribute('aria-disabled', 'true');

    await user.click(categorySelect);
    expect(screen.getByText(labels.categoriesUnavailable)).toBeInTheDocument();
  });
});
