'use client';

import Link from 'next/link';
import { memo, useMemo } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { encodeCategorySlug } from '@/utils';
import content from '@/config/content.json';

const CategoriesMenu = () => {
  const { categories, loading, error, isEmpty } = useCategories();

  const items = useMemo(
    () =>
      categories.map((category) => ({
        label: category,
        href: `/categoria/${encodeCategorySlug(category)}`,
      })),
    [categories]
  );

  const statusLabel = useMemo(() => {
    if (loading) return content.app.categoriesMenu.loading;
    if (error) return content.app.categoriesMenu.error;
    if (isEmpty) return content.app.categoriesMenu.empty;
    return '';
  }, [error, isEmpty, loading]);

  return (
    <div className="relative group">
      <button
        type="button"
        aria-haspopup="menu"
        className="flex items-center gap-2 text-sm text-gray-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <span>{content.app.nav.categories}</span>
        <span aria-hidden="true" className="text-[10px]">
          v
        </span>
      </button>
      <div className="absolute left-0 top-full z-50 mt-2 min-w-[220px] origin-top-left rounded-xl border border-white/10 bg-black/90 p-2 opacity-0 pointer-events-none transition group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
        {statusLabel ? (
          <span className="block px-3 py-2 text-xs text-gray-400">{statusLabel}</span>
        ) : (
          items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default memo(CategoriesMenu);
