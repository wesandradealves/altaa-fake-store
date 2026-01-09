'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { useApp } from '@/context/app';
import content from '@/config/content.json';

interface Props {
  scrollPosition?: number;
}

const Header = ({ scrollPosition = 0 }: Props) => {
  const { appName } = useApp();

  return (
    <header
      className={classNames(
        'w-full sticky top-0 z-40 transition-colors',
        scrollPosition > 8 ? 'backdrop-blur bg-black/70' : 'bg-transparent'
      )}
    >
      <div className="container m-auto flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-semibold text-white">
            {appName}
          </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-200">
          <Link href="/" className="hover:text-white">
            {content.app.nav.home}
          </Link>
          <Link href="/secondary" className="hover:text-white">
            {content.app.nav.secondary}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
