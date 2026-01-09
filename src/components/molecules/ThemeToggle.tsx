'use client';

import classNames from 'classnames';
import content from '@/config/content.json';
import { useThemeMode } from '@/context/theme';

type ThemeToggleProps = {
  className?: string;
};

type IconProps = {
  className?: string;
};

const SunIcon = ({ className }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = ({ className }: IconProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { mode, toggle, hydrated } = useThemeMode();

  if (!hydrated) return null;

  const isDark = mode === 'dark';
  const actionLabel = isDark
    ? content.app.theme.toggleToLight
    : content.app.theme.toggleToDark;
  const Icon = isDark ? SunIcon : MoonIcon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={actionLabel}
      aria-pressed={isDark}
      className={classNames(
        'inline-flex h-7 w-7 items-center justify-center rounded-full border transition',
        'border-[var(--border)] text-[var(--theme-toggle-foreground)] bg-[var(--surface-alt)]',
        'hover:border-[var(--accent)] hover:text-[var(--accent)]',
        className
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
};

export default ThemeToggle;
