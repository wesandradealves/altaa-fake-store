'use client';

import { memo, useCallback, useMemo } from 'react';
import { FormControl, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

interface Option {
  label: string;
  value: string;
}

type GridSize = 4 | 8;

const GridFourIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <rect x="14" y="14" width="6" height="6" rx="1" />
  </svg>
);

const GridEightIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <rect x="3" y="5" width="3" height="3" rx="0.6" />
    <rect x="8" y="5" width="3" height="3" rx="0.6" />
    <rect x="13" y="5" width="3" height="3" rx="0.6" />
    <rect x="18" y="5" width="3" height="3" rx="0.6" />
    <rect x="3" y="13" width="3" height="3" rx="0.6" />
    <rect x="8" y="13" width="3" height="3" rx="0.6" />
    <rect x="13" y="13" width="3" height="3" rx="0.6" />
    <rect x="18" y="13" width="3" height="3" rx="0.6" />
  </svg>
);

interface Props {
  categories: string[];
  category: string;
  sort: string;
  sortOptions: Option[];
  gridSize: GridSize;
  gridLabels: {
    label: string;
    four: string;
    eight: string;
  };
  loading?: boolean;
  error?: string | null;
  labels: {
    category: string;
    sort: string;
    allCategories: string;
    categoriesUnavailable: string;
  };
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onGridSizeChange: (value: GridSize) => void;
}

const FilterBar = ({
  categories,
  category,
  sort,
  sortOptions,
  gridSize,
  gridLabels,
  loading,
  error,
  labels,
  onCategoryChange,
  onSortChange,
  onGridSizeChange,
}: Props) => {
  const categoryOptions = useMemo(
    () =>
      categories.map((item) => ({
        value: item,
        label: item === 'all' ? labels.allCategories : item,
      })),
    [categories, labels.allCategories]
  );

  const controlSx = useMemo(
    () => ({
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'var(--select-bg)',
        color: 'var(--select-foreground)',
        '& fieldset': {
          borderColor: 'var(--select-border)',
        },
        '&:hover fieldset': {
          borderColor: 'var(--select-border-hover)',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'var(--select-border-hover)',
        },
      },
      '& .MuiInputLabel-root': {
        color: 'var(--select-muted)',
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: 'var(--select-foreground)',
      },
      '& .MuiSelect-icon': {
        color: 'var(--select-foreground)',
      },
    }),
    []
  );

  const menuPaperSx = useMemo(
    () => ({
      backgroundColor: 'var(--select-bg)',
      color: 'var(--select-foreground)',
      border: '1px solid var(--select-border)',
    }),
    []
  );

  const menuItemSx = useMemo(
    () => ({
      '&.Mui-selected': {
        backgroundColor: 'var(--surface-alt)',
      },
      '&.Mui-selected:hover': {
        backgroundColor: 'var(--surface-alt)',
      },
    }),
    []
  );

  const handleCategoryChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      onCategoryChange(event.target.value);
    },
    [onCategoryChange]
  );

  const handleSortChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      onSortChange(event.target.value);
    },
    [onSortChange]
  );

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-[var(--foreground)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <FormControl
          size="small"
          className="w-full sm:min-w-[220px] sm:w-auto"
          disabled={loading}
          sx={controlSx}
        >
          <Select
            value={category}
            disabled={loading}
            SelectDisplayProps={{ 'aria-label': labels.category }}
            onChange={handleCategoryChange}
            MenuProps={{ PaperProps: { sx: menuPaperSx } }}
          >
            {error ? (
              <MenuItem value="all" disabled sx={menuItemSx}>
                {labels.categoriesUnavailable}
              </MenuItem>
            ) : (
              categoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value} sx={menuItemSx}>
                  {option.label}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <FormControl size="small" className="w-full sm:min-w-[220px] sm:w-auto" sx={controlSx}>
          <Select
            value={sort}
            SelectDisplayProps={{ 'aria-label': labels.sort }}
            onChange={handleSortChange}
            MenuProps={{ PaperProps: { sx: menuPaperSx } }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={menuItemSx}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="flex items-center gap-2 sm:ml-auto" aria-label={gridLabels.label}>
        <span className="sr-only">{gridLabels.label}</span>
        <button
          type="button"
          onClick={() => onGridSizeChange(4)}
          aria-label={gridLabels.four}
          aria-pressed={gridSize === 4}
          className={[
            'inline-flex h-7 w-7 items-center justify-center rounded-full border transition',
            gridSize === 4
              ? 'border-[var(--accent)] text-[var(--foreground)]'
              : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]',
          ].join(' ')}
        >
          <GridFourIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onGridSizeChange(8)}
          aria-label={gridLabels.eight}
          aria-pressed={gridSize === 8}
          className={[
            'inline-flex h-7 w-7 items-center justify-center rounded-full border transition',
            gridSize === 8
              ? 'border-[var(--accent)] text-[var(--foreground)]'
              : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]',
          ].join(' ')}
        >
          <GridEightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default memo(FilterBar);
