'use client';

import { memo, useCallback, useMemo } from 'react';
import { FormControl, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

interface Option {
  label: string;
  value: string;
}

interface Props {
  categories: string[];
  category: string;
  sort: string;
  sortOptions: Option[];
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
}

const FilterBar = ({
  categories,
  category,
  sort,
  sortOptions,
  loading,
  error,
  labels,
  onCategoryChange,
  onSortChange,
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
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-[var(--foreground)] backdrop-blur sm:flex-row sm:items-center">
      <FormControl
        size="small"
        className="w-full sm:min-w-[220px] sm:w-auto"
        disabled={loading}
        sx={controlSx}
      >
        <Select
          value={category}
          disabled={loading}
          inputProps={{ 'aria-label': labels.category }}
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
          inputProps={{ 'aria-label': labels.sort }}
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
  );
};

export default memo(FilterBar);
