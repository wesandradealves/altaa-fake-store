'use client';

import { memo, useCallback, useMemo } from 'react';

interface Labels {
  previous: string;
  next: string;
  page: string;
  nav: string;
}

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  labels: Labels;
  className?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, labels, className }: Props) => {
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages]
  );

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }, [currentPage, onPageChange, totalPages]);

  const handlePageSelect = useCallback(
    (page: number) => () => {
      onPageChange(page);
    },
    [onPageChange]
  );

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label={labels.nav}
      className={['flex flex-wrap items-center justify-center gap-2', className].filter(Boolean).join(' ')}
    >
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-200 transition hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {labels.previous}
      </button>
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={handlePageSelect(page)}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'h-9 min-w-9 rounded-full border px-3 text-xs font-semibold transition',
              isActive
                ? 'border-white/50 bg-white/10 text-white'
                : 'border-white/10 text-gray-200 hover:border-white/30',
            ].join(' ')}
          >
            <span className="sr-only">{labels.page}</span>
            {page}
          </button>
        );
      })}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-200 transition hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {labels.next}
      </button>
    </nav>
  );
};

export default memo(Pagination);
