'use client';

import Link from 'next/link';
import classNames from 'classnames';
import Logo from '@/components/atoms/Logo';
import CategoriesMenu from '@/components/molecules/CategoriesMenu';
import AccessibilityControls from '@/components/molecules/AccessibilityControls';
import ThemeToggle from '@/components/molecules/ThemeToggle';
import content from '@/config/content.json';

interface Props {
  scrollPosition?: number;
}

const HomeIcon = ({ className }: { className?: string }) => (
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
    <path d="M3 10.5l9-7 9 7" />
    <path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />
  </svg>
);

const Header = ({ scrollPosition = 0 }: Props) => {
  return (
    <header
      className={classNames(
        'w-full sticky top-0 z-40 transition-colors',
        scrollPosition > 8 ? 'backdrop-blur bg-[color:var(--surface)]/80' : 'bg-transparent'
      )}
    >
      <div className="container m-auto flex flex-wrap items-center gap-3 py-4">
        <Link href="/" className="flex items-center">
          <Logo className="h-9 w-auto sm:h-10" priority />
        </Link>
        <nav className="ml-auto flex items-center gap-4 text-sm text-[var(--text-muted)]">
          <Link
            href="/"
            aria-label={content.app.nav.home}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:text-[var(--foreground)]"
          >
            <HomeIcon className="h-4 w-4" />
            <span className="sr-only">{content.app.nav.home}</span>
          </Link>
          <CategoriesMenu />
        </nav>
        <div className="flex w-full items-center justify-end gap-3 sm:w-auto sm:pl-1">
          <ThemeToggle />
          <AccessibilityControls />
        </div>
      </div>
    </header>
  );
};

export default Header;
