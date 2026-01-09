import { useEffect, useMemo, useState } from 'react';

export const usePagination = <T,>(items: T[], pageSize: number, initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  const totalPages = useMemo(
    () => Math.ceil(items.length / pageSize),
    [items.length, pageSize]
  );

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const pagedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return {
    page,
    setPage,
    totalPages,
    pagedItems,
  };
};
