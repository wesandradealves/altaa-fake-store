'use client';

import { memo } from 'react';

interface Props {
  loading: boolean;
  error?: string | null;
  isEmpty?: boolean;
  loadingFallback: React.ReactNode;
  errorFallback: React.ReactNode;
  emptyFallback: React.ReactNode;
  children: React.ReactNode;
}

const DataState = ({
  loading,
  error,
  isEmpty,
  loadingFallback,
  errorFallback,
  emptyFallback,
  children,
}: Props) => {
  if (loading) return <>{loadingFallback}</>;
  if (error) return <>{errorFallback}</>;
  if (isEmpty) return <>{emptyFallback}</>;
  return <>{children}</>;
};

export default memo(DataState);
