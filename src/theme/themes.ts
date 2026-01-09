import { colors } from '@/assets/scss/colors';
import { breakpoints } from '@/assets/scss/breakpoints';

export type ThemeMode = 'dark' | 'light';

const darkColors = colors;

const lightColors = {
  primary: {
    ...colors.primary,
    background: colors.primary.accentSoft,
    surface: colors.primary.text,
    surfaceAlt: colors.primary.accentSoft,
    text: colors.primary.textStrong,
    muted: colors.primary.textStrong,
  },
};

export const getTheme = (mode: ThemeMode) => ({
  mode,
  _colors: mode === 'light' ? lightColors : darkColors,
  _breakpoints: breakpoints,
});
