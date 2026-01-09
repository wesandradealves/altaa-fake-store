'use client';

import { memo, useCallback, useMemo } from 'react';
import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

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
      minWidth: 200,
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        color: '#E5E7EB',
        '& fieldset': {
          borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(255, 255, 255, 0.35)',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#38BDF8',
        },
      },
      '& .MuiInputLabel-root': {
        color: '#9CA3AF',
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: '#E5E7EB',
      },
      '& .MuiSelect-icon': {
        color: '#E5E7EB',
      },
    }),
    []
  );

  const menuPaperSx = useMemo(
    () => ({
      backgroundColor: '#0B0F14',
      color: '#E5E7EB',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }),
    []
  );

  const menuItemSx = useMemo(
    () => ({
      '&.Mui-selected': {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
      },
      '&.Mui-selected:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
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
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white">
      <FormControl size="small" className="min-w-[200px]" disabled={loading} sx={controlSx}>
        <InputLabel id="category-filter-label">{labels.category}</InputLabel>
        <Select
          labelId="category-filter-label"
          value={category}
          label={labels.category}
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

      <FormControl size="small" className="min-w-[200px]" sx={controlSx}>
        <InputLabel id="sort-filter-label">{labels.sort}</InputLabel>
        <Select
          labelId="sort-filter-label"
          value={sort}
          label={labels.sort}
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
