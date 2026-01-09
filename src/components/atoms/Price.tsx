import { useMemo } from 'react';

interface Props {
  value: number;
  currency?: string;
  locale?: string;
  className?: string;
}

const Price = ({ value, currency = 'USD', locale = 'pt-BR', className }: Props) => {
  const formatted = useMemo(
    () => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value),
    [currency, locale, value]
  );

  return <span className={className}>{formatted}</span>;
};

export default Price;
