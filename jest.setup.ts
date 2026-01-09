import '@testing-library/jest-dom';
import React from 'react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => React.createElement('img', props),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) =>
    React.createElement('a', { href, ...props }, children),
}));
