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
    const existingAlias = storybookConfig.resolve?.alias || {};
    const mocksRoot = path.resolve(__dirname, 'mocks');
    const resolvedAliases = Array.isArray(existingAlias)
      ? existingAlias
      : Object.entries(existingAlias).map(([name, alias]) => ({ name, alias }));

    storybookConfig.resolve = {
      ...storybookConfig.resolve,
      alias: [
        { name: '@/hooks/useCategories', alias: path.join(mocksRoot, 'useCategories') },
        { name: '@/hooks/useProducts', alias: path.join(mocksRoot, 'useProducts') },
        { name: '@/hooks/useProduct', alias: path.join(mocksRoot, 'useProduct') },
        { name: '@/hooks/useMetadata', alias: path.join(mocksRoot, 'useMetadata') },
        { name: '@', alias: path.resolve(__dirname, '../src') },
        ...resolvedAliases,
      ],
    };

    return storybookConfig;
  },
};

export default config;
