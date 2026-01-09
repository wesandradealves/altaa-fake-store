import { NextResponse } from 'next/server';
import { config, middleware } from '@/middleware';

jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(() => 'next-response'),
  },
}));

describe('middleware', () => {
  it('retorna NextResponse.next', () => {
    const result = middleware();

    expect(NextResponse.next).toHaveBeenCalledTimes(1);
    expect(result).toBe('next-response');
  });

  it('define matcher esperado', () => {
    expect(config).toEqual({ matcher: '/' });
  });
});
