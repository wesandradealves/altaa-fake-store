'use client';

import { memo, useMemo } from 'react';
import { Rating } from '@mui/material';

interface Props {
  value: number;
  count: number;
  label: string;
  countLabel: string;
}

const RatingRow = ({ value, count, label, countLabel }: Props) => {
  const formattedCount = useMemo(
    () => new Intl.NumberFormat('pt-BR').format(count),
    [count]
  );

  const formattedValue = useMemo(() => value.toFixed(1), [value]);

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--foreground)]">
      <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</span>
      <Rating value={value} precision={0.1} readOnly size="small" />
      <span className="text-xs text-[var(--text-muted)]">{formattedValue}</span>
      <span className="text-xs text-[var(--text-muted)]">
        ({formattedCount} {countLabel})
      </span>
    </div>
  );
};

export default memo(RatingRow);
