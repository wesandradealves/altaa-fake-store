'use client';

import Link from 'next/link';
import {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useCategories } from '@/hooks/useCategories';
import { encodeCategorySlug } from '@/utils';
import content from '@/config/content.json';

const CategoriesMenu = () => {
  const { categories, loading, error, isEmpty } = useCategories();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

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

  const getMenuItems = useCallback(() => {
    if (!menuRef.current) return [];
    return Array.from(menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]'));
  }, []);

  const getFocusableElements = useCallback(() => {
    if (!wrapperRef.current) return [];
    return Array.from(
      wrapperRef.current.querySelectorAll<HTMLElement>('button, [role="menuitem"]')
    ).filter((element) => !element.hasAttribute('disabled'));
  }, []);

  const openWithFocus = useCallback(
    (target: 'first' | 'last' | 'button') => {
      const scheduleFocus =
        typeof requestAnimationFrame === 'function'
          ? requestAnimationFrame
          : (callback: () => void) => window.setTimeout(callback, 0);
      setOpen(true);
      scheduleFocus(() => {
        if (target === 'button') {
          buttonRef.current?.focus();
          return;
        }
        const items = getMenuItems();
        if (!items.length) {
          buttonRef.current?.focus();
          return;
        }
        const index = target === 'last' ? items.length - 1 : 0;
        items[index]?.focus();
      });
    },
    [getMenuItems]
  );

  const handleBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (wrapperRef.current?.contains(document.activeElement)) return;
    setOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape' && open) {
        event.preventDefault();
        handleClose();
        buttonRef.current?.focus();
        return;
      }

      if (!open) {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openWithFocus('first');
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          openWithFocus('last');
        }
        return;
      }

      const items = getMenuItems();
      if (items.length) {
        const currentIndex = items.findIndex((item) => item === document.activeElement);

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
          items[nextIndex]?.focus();
          return;
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault();
          const nextIndex = currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
          items[nextIndex]?.focus();
          return;
        }

        if (event.key === 'Home') {
          event.preventDefault();
          items[0]?.focus();
          return;
        }

        if (event.key === 'End') {
          event.preventDefault();
          items[items.length - 1]?.focus();
          return;
        }
      }

      if (event.key === 'Tab') {
        const focusable = getFocusableElements();
        if (!focusable.length) return;
        const currentIndex = focusable.findIndex((element) => element === document.activeElement);
        if (currentIndex === -1) return;

        const lastIndex = focusable.length - 1;
        if (event.shiftKey && currentIndex === 0) {
          event.preventDefault();
          focusable[lastIndex]?.focus();
        } else if (!event.shiftKey && currentIndex === lastIndex) {
          event.preventDefault();
          focusable[0]?.focus();
        }
      }
    },
    [getFocusableElements, getMenuItems, handleClose, open, openWithFocus]
  );

  useEffect(() => {
    const handleShortcut = (event: globalThis.KeyboardEvent) => {
      if (!event.altKey || event.key.toLowerCase() !== 'c') return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) {
        return;
      }
      event.preventDefault();
      if (open) {
        handleClose();
        buttonRef.current?.focus();
      } else {
        openWithFocus('first');
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, [handleClose, open, openWithFocus]);

  const statusLabel = useMemo(() => {
    if (loading) return content.app.categoriesMenu.loading;
    if (error) return content.app.categoriesMenu.error;
    if (isEmpty) return content.app.categoriesMenu.empty;
    return '';
  }, [error, isEmpty, loading]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleMouseLeave}
      onFocus={handleOpen}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-keyshortcuts="Alt+C"
        ref={buttonRef}
        onClick={() => (open ? handleClose() : openWithFocus('first'))}
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
        ref={menuRef}
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
