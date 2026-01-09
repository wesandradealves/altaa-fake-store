'use client';

import classNames from 'classnames';
import content from '@/config/content.json';
import { FONT_SCALE_LEVELS, useAccessibility } from '@/context/accessibility';

const ContrastIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4a8 8 0 000 16V4z" fill="currentColor" stroke="none" />
  </svg>
);

const AccessibilityControls = () => {
  const {
    highContrast,
    fontScale,
    toggleContrast,
    increaseFont,
    decreaseFont,
    resetFont,
  } = useAccessibility();

  const minScale = FONT_SCALE_LEVELS[0];
  const maxScale = FONT_SCALE_LEVELS[FONT_SCALE_LEVELS.length - 1];
  const canDecrease = fontScale > minScale;
  const canIncrease = fontScale < maxScale;
  const fontScaleLabel = `${Math.round(fontScale * 100)}%`;

  return (
    <div className="flex items-center gap-2" aria-label={content.app.accessibility.label}>
      <span className="sr-only">{content.app.accessibility.label}</span>
      <button
        type="button"
        className={classNames(
          'rounded-full border border-[var(--border)] px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] transition',
          canDecrease ? 'hover:border-[var(--accent)]' : 'cursor-not-allowed opacity-50'
        )}
        onClick={decreaseFont}
        aria-label={content.app.accessibility.decreaseFont}
        disabled={!canDecrease}
      >
        A-
      </button>
      <button
        type="button"
        className="rounded-full border border-[var(--border)] px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] transition hover:border-[var(--accent)]"
        onClick={resetFont}
        aria-label={content.app.accessibility.resetFont}
      >
        A
      </button>
      <button
        type="button"
        className={classNames(
          'rounded-full border border-[var(--border)] px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] transition',
          canIncrease ? 'hover:border-[var(--accent)]' : 'cursor-not-allowed opacity-50'
        )}
        onClick={increaseFont}
        aria-label={content.app.accessibility.increaseFont}
        disabled={!canIncrease}
      >
        A+
      </button>
      <button
        type="button"
        className={classNames(
          'rounded-full border border-[var(--border)] px-3 py-1 text-[11px] uppercase tracking-[0.2em] transition',
          highContrast
            ? 'bg-[var(--surface)] text-[var(--contrast-toggle-foreground)]'
            : 'text-[var(--text-muted)] hover:border-[var(--accent)]'
        )}
        onClick={toggleContrast}
        aria-label={content.app.accessibility.highContrast}
        aria-pressed={highContrast}
      >
        <ContrastIcon className="h-4 w-4" />
      </button>
      <span className="sr-only" aria-live="polite">
        {content.app.accessibility.fontLabel} {fontScaleLabel}
      </span>
    </div>
  );
};

export default AccessibilityControls;
