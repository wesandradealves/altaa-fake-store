import React from 'react';
import RootLayout from '@/app/layout';
import ClientProviders from '@/app/client';

jest.mock('next/script', () => ({
  __esModule: true,
  default: () => <script data-testid="next-script" />,
}));

describe('RootLayout', () => {
  it('define lang e repassa children para ClientProviders', () => {
    const element = RootLayout({
      children: <div data-testid="layout-child" />,
    });

    expect(element.type).toBe('html');
    expect(element.props.lang).toBe('pt-br');

    const body = element.props.children;
    expect(body.type).toBe('body');
    expect(body.props.className).toContain('antialiased');

    const childrenArray = React.Children.toArray(body.props.children) as React.ReactElement[];
    const clientProviders = childrenArray.find((child) => child.type === ClientProviders);

    expect(clientProviders).toBeDefined();
    expect((clientProviders as React.ReactElement).props.children.props['data-testid']).toBe(
      'layout-child'
    );
  });
});
