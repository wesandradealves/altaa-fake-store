'use client';

import classNames from 'classnames';
import content from '@/config/content.json';
import { FONT_SCALE_LEVELS, useAccessibility } from '@/context/accessibility';

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
          'rounded-full border border-white/10 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-gray-200 transition',
          canDecrease ? 'hover:border-white/30' : 'cursor-not-allowed opacity-50'
        )}
        onClick={decreaseFont}
        aria-label={content.app.accessibility.decreaseFont}
        disabled={!canDecrease}
      >
        A-
      </button>
      <button
        type="button"
        className="rounded-full border border-white/10 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-gray-200 transition hover:border-white/30"
        onClick={resetFont}
        aria-label={content.app.accessibility.resetFont}
      >
        A
      </button>
      <button
        type="button"
        className={classNames(
          'rounded-full border border-white/10 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-gray-200 transition',
          canIncrease ? 'hover:border-white/30' : 'cursor-not-allowed opacity-50'
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
          'rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] transition',
          highContrast
            ? 'bg-white/10 text-white'
            : 'text-gray-200 hover:border-white/30'
        )}
        onClick={toggleContrast}
        aria-label={content.app.accessibility.highContrast}
        aria-pressed={highContrast}
      >
        {content.app.accessibility.highContrast}
      </button>
      <span className="sr-only" aria-live="polite">
        {content.app.accessibility.fontLabel} {fontScaleLabel}
      </span>
    </div>
  );
};

export default AccessibilityControls;
