import type { StorybookConfig } from '@storybook/nextjs';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (storybookConfig) => {
    const alias = storybookConfig.resolve?.alias || {};
    const mocksRoot = path.resolve(__dirname, 'mocks');

    storybookConfig.resolve = {
      ...storybookConfig.resolve,
      alias: {
        ...alias,
        '@': path.resolve(__dirname, '../src'),
        '@/hooks/useCategories': path.join(mocksRoot, 'useCategories'),
        '@/hooks/useProducts': path.join(mocksRoot, 'useProducts'),
        '@/hooks/useProduct': path.join(mocksRoot, 'useProduct'),
        '@/hooks/useMetadata': path.join(mocksRoot, 'useMetadata'),
      },
    };

    return storybookConfig;
  },
};

export default config;
