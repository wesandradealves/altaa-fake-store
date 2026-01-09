'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const FONT_SCALE_LEVELS = [0.9, 1, 1.1, 1.2, 1.3] as const;

type FontScale = (typeof FONT_SCALE_LEVELS)[number];

interface AccessibilityContextValue {
  highContrast: boolean;
  fontScale: FontScale;
  toggleContrast: () => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
}

const STORAGE_KEYS = {
  contrast: 'a11y:contrast',
  fontScale: 'a11y:font-scale',
};

const DEFAULT_FONT_SCALE: FontScale = 1;

const isClient = () => typeof window !== 'undefined';

const readStoredContrast = () => {
  if (!isClient()) return false;
  return localStorage.getItem(STORAGE_KEYS.contrast) === '1';
};

const readStoredFontScale = (): FontScale => {
  if (!isClient()) return DEFAULT_FONT_SCALE;
  const raw = localStorage.getItem(STORAGE_KEYS.fontScale);
  if (!raw) return DEFAULT_FONT_SCALE;

  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed)) return DEFAULT_FONT_SCALE;

  const matched = FONT_SCALE_LEVELS.find((scale) => Math.abs(scale - parsed) < 0.01);
  return matched ?? DEFAULT_FONT_SCALE;
};

const applyToDocument = (highContrast: boolean, fontScale: FontScale) => {
  if (!isClient()) return;
  const root = document.documentElement;
  root.style.setProperty('--font-scale', String(fontScale));

  if (highContrast) {
    root.dataset.contrast = 'high';
  } else {
    delete root.dataset.contrast;
  }
};

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontScale, setFontScale] = useState<FontScale>(DEFAULT_FONT_SCALE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHighContrast(readStoredContrast());
    setFontScale(readStoredFontScale());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !isClient()) return;
    localStorage.setItem(STORAGE_KEYS.contrast, highContrast ? '1' : '0');
    localStorage.setItem(STORAGE_KEYS.fontScale, String(fontScale));
    applyToDocument(highContrast, fontScale);
  }, [highContrast, hydrated, fontScale]);

  const toggleContrast = useCallback(() => {
    setHighContrast((prev) => !prev);
  }, []);

  const increaseFont = useCallback(() => {
    setFontScale((current) => {
      const index = FONT_SCALE_LEVELS.findIndex((scale) => scale === current);
      const nextIndex = Math.min(index + 1, FONT_SCALE_LEVELS.length - 1);
      return FONT_SCALE_LEVELS[nextIndex];
    });
  }, []);

  const decreaseFont = useCallback(() => {
    setFontScale((current) => {
      const index = FONT_SCALE_LEVELS.findIndex((scale) => scale === current);
      const nextIndex = Math.max(index - 1, 0);
      return FONT_SCALE_LEVELS[nextIndex];
    });
  }, []);

  const resetFont = useCallback(() => {
    setFontScale(DEFAULT_FONT_SCALE);
  }, []);

  const value = useMemo(
    () => ({
      highContrast,
      fontScale,
      toggleContrast,
      increaseFont,
      decreaseFont,
      resetFont,
    }),
    [highContrast, fontScale, toggleContrast, increaseFont, decreaseFont, resetFont]
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
