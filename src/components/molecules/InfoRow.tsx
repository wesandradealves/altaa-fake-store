'use client';

import { memo } from 'react';

interface Props {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const InfoRow = ({ label, children, className }: Props) => {
  return (
    <div className={['space-y-1', className].filter(Boolean).join(' ')}>
      <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</span>
      <div className="text-base text-[var(--foreground)]">{children}</div>
    </div>
  );
};

export default memo(InfoRow);
