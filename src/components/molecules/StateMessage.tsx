'use client';

import { memo } from 'react';

interface Props {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  tone?: 'status' | 'alert';
}

const StateMessage = ({
  title,
  description,
  actionLabel,
  onAction,
  className,
  tone = 'status',
}: Props) => {
  return (
    <div
      role={tone}
      aria-live={tone === 'alert' ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={[
        'w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-[var(--foreground)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {description ? <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p> : null}
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--foreground)] transition hover:border-white/40"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default memo(StateMessage);
