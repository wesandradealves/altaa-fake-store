import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'dark' | 'light';
    _breakpoints: {
      sm: string;
      md: string;
      lg: string;
      [key: string]: string;
    };
    _colors: {
      primary: {
        background: string;
        accent: string;
        accentSoft: string;
        text: string;
        textStrong: string;
        surface: string;
        surfaceAlt: string;
        muted: string;
        [key: string]: string;
      };
      [key: string]: Record<string, string>;
    };
  }
}
