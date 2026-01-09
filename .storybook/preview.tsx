import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { AccessibilityProvider } from '../src/context/accessibility';
import { LoaderProvider } from '../src/context/spinner';
import { GlobalStyle } from '../src/app/style';
import { _breakpoints, _colors } from '../src/assets/scss/variables';
import '../src/assets/scss/globals.scss';

const theme = {
  _colors,
  _breakpoints,
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: '#0B0F14' },
        { name: 'light', value: '#F8FAFC' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      if (typeof globalThis !== 'undefined') {
        (globalThis as { __STORYBOOK_MOCKS__?: unknown }).__STORYBOOK_MOCKS__ =
          context.parameters?.mockData ?? {};
      }

      return (
        <ThemeProvider theme={theme}>
          <LoaderProvider>
            <AccessibilityProvider>
              <GlobalStyle />
              <div className="min-h-screen bg-[#0B0F14] text-white">
                <Story />
              </div>
            </AccessibilityProvider>
          </LoaderProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
