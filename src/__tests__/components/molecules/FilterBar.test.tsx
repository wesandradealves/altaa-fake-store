import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from '@/components/molecules/FilterBar';

const labels = {
  category: 'Categoria',
  sort: 'Ordenacao',
  allCategories: 'Todas as categorias',
  categoriesUnavailable: 'Categorias indisponiveis',
};

const gridLabels = {
  label: 'Tamanho do grid',
  four: 'Mostrar 4',
  eight: 'Mostrar 8',
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
        gridSize={8}
        gridLabels={gridLabels}
        labels={labels}
        onCategoryChange={onCategoryChange}
        onSortChange={onSortChange}
        onGridSizeChange={jest.fn()}
      />
    );

    const categorySelect = screen.getByRole('combobox', { name: labels.category });
    await user.click(categorySelect);
    await user.click(await screen.findByRole('option', { name: 'electronics' }));
    expect(onCategoryChange).toHaveBeenCalledWith('electronics');

    const sortSelect = screen.getByRole('combobox', { name: labels.sort });
    await user.click(sortSelect);
    await user.click(await screen.findByRole('option', { name: 'Nome Z-A' }));
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
        gridSize={8}
        gridLabels={gridLabels}
        labels={labels}
        error="Falha"
        onCategoryChange={jest.fn()}
        onSortChange={jest.fn()}
        onGridSizeChange={jest.fn()}
      />
    );

    const categorySelect = screen.getByRole('combobox', { name: labels.category });
    await user.click(categorySelect);
    expect(await screen.findByRole('option', { name: labels.categoriesUnavailable })).toBeInTheDocument();
  });

  it('desabilita o filtro de categoria durante carregamento', () => {
    render(
      <FilterBar
        categories={categories}
        category="all"
        sort="name-asc"
        sortOptions={sortOptions}
        gridSize={8}
        gridLabels={gridLabels}
        labels={labels}
        loading
        onCategoryChange={jest.fn()}
        onSortChange={jest.fn()}
        onGridSizeChange={jest.fn()}
      />
    );

    const categorySelect = screen.getByRole('combobox', { name: labels.category });
    expect(categorySelect).toHaveAttribute('aria-disabled', 'true');
  });

  it('permite alternar o tamanho do grid', async () => {
    const user = userEvent.setup();
    const onGridSizeChange = jest.fn();

    render(
      <FilterBar
        categories={categories}
        category="all"
        sort="name-asc"
        sortOptions={sortOptions}
        gridSize={8}
        gridLabels={gridLabels}
        labels={labels}
        onCategoryChange={jest.fn()}
        onSortChange={jest.fn()}
        onGridSizeChange={onGridSizeChange}
      />
    );

    await user.click(screen.getByRole('button', { name: gridLabels.four }));
    expect(onGridSizeChange).toHaveBeenCalledWith(4);
  });
});
