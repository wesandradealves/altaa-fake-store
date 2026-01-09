'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import Logo from '@/components/atoms/Logo';
import CategoriesMenuSkeleton from '@/components/molecules/CategoriesMenuSkeleton';
import AccessibilityControls from '@/components/molecules/AccessibilityControls';
import content from '@/config/content.json';

const CategoriesMenu = dynamic(() => import('@/components/molecules/CategoriesMenu'), {
  ssr: false,
  loading: () => <CategoriesMenuSkeleton />,
});

interface Props {
  scrollPosition?: number;
}

const Header = ({ scrollPosition = 0 }: Props) => {
  return (
    <header
      className={classNames(
        'w-full sticky top-0 z-40 transition-colors',
        scrollPosition > 8 ? 'backdrop-blur bg-black/70' : 'bg-transparent'
      )}
    >
      <div className="container m-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center">
          <Logo className="h-9 w-auto sm:h-10" priority />
        </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-200">
          <Link href="/" className="hover:text-white">
            {content.app.nav.home}
          </Link>
          <CategoriesMenu />
          <AccessibilityControls />
        </nav>
      </div>
    </header>
  );
};

export default Header;
