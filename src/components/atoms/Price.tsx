'use client';

import { useMemo } from 'react';

interface Props {
  value: number | string | null | undefined;
  currency?: string;
  locale?: string;
  fallback?: string;
  className?: string;
}

const Price = ({
  value,
  currency = 'USD',
  locale = 'pt-BR',
  fallback = '--',
  className,
}: Props) => {
  const formatted = useMemo(() => {
    const numericValue = typeof value === 'string' ? Number(value) : value;
    if (numericValue === null || numericValue === undefined || !Number.isFinite(numericValue)) {
      return fallback;
    }
    try {
      return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(numericValue);
    } catch {
      return numericValue.toFixed(2);
    }
  }, [currency, fallback, locale, value]);

  return <span className={className}>{formatted}</span>;
};

export default Price;
