'use client';

import Link from 'next/link';
import { memo, useCallback, useId, useMemo, useState, type FocusEvent } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { encodeCategorySlug } from '@/utils';
import content from '@/config/content.json';

const CategoriesMenu = () => {
  const { categories, loading, error, isEmpty } = useCategories();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const items = useMemo(
    () =>
      categories.map((category) => ({
        label: category,
        href: `/categoria/${encodeCategorySlug(category)}`,
      })),
    [categories]
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }, []);

  const statusLabel = useMemo(() => {
    if (loading) return content.app.categoriesMenu.loading;
    if (error) return content.app.categoriesMenu.error;
    if (isEmpty) return content.app.categoriesMenu.empty;
    return '';
  }, [error, isEmpty, loading]);

  return (
    <div
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleBlur}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className="flex items-center gap-2 text-sm text-gray-200 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <span>{content.app.nav.categories}</span>
        <span aria-hidden="true" className="text-[10px]">
          v
        </span>
      </button>
      <div
        id={menuId}
        role="menu"
        className={[
          'absolute left-0 top-full z-50 mt-2 min-w-[220px] origin-top-left rounded-xl border border-white/10 bg-black/90 p-2 transition',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      >
        {statusLabel ? (
          <span role="status" className="block px-3 py-2 text-xs text-gray-400">
            {statusLabel}
          </span>
        ) : (
          items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="block rounded-lg px-3 py-2 text-sm text-gray-200 transition hover:bg-white/10 hover:text-white"
              onClick={handleClose}
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
