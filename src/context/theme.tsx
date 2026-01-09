import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { getTheme, type ThemeMode } from '@/theme/themes';

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
  hydrated: boolean;
};

const STORAGE_KEY = 'theme-mode';

const ThemeModeContext = createContext<ThemeContextValue>({
  mode: 'dark',
  setMode: () => undefined,
  toggle: () => undefined,
  hydrated: false,
});

const getPreferredMode = () => {
  if (typeof window === 'undefined') return 'dark';
  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
};

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      setMode(stored);
    } else {
      setMode(getPreferredMode());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [hydrated, mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggle = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeModeContext.Provider value={{ mode, setMode, toggle, hydrated }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeModeContext);
