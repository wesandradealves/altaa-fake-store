import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '@/components/molecules/Pagination';

describe('Pagination', () => {
  const labels = {
    previous: 'Anterior',
    next: 'Proxima',
    page: 'Pagina',
    nav: 'Paginacao',
  };

  it('renderiza paginas e dispara mudanca', async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
        labels={labels}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Pagina 2' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('desabilita anterior e proxima quando necessario', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={2}
        onPageChange={jest.fn()}
        labels={labels}
      />
    );

    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
  });
});
