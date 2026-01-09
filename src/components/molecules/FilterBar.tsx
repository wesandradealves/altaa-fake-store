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
      <FormControl size="small" className="min-w-[200px]" disabled={loading}>
        <InputLabel id="category-filter-label">{labels.category}</InputLabel>
        <Select
          labelId="category-filter-label"
          value={category}
          label={labels.category}
          onChange={handleCategoryChange}
        >
          {error ? (
            <MenuItem value="all" disabled>
              {labels.categoriesUnavailable}
            </MenuItem>
          ) : (
            categoryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <FormControl size="small" className="min-w-[200px]">
        <InputLabel id="sort-filter-label">{labels.sort}</InputLabel>
        <Select
          labelId="sort-filter-label"
          value={sort}
          label={labels.sort}
          onChange={handleSortChange}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default memo(FilterBar);
