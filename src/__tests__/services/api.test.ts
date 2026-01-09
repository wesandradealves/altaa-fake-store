const requestUse = jest.fn();
const responseUse = jest.fn();

const mockApi = {
  interceptors: {
    request: { use: requestUse },
    response: { use: responseUse },
  },
};

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => mockApi),
  },
}));

const loadSetupInterceptors = async () => {
  jest.resetModules();
  const apiModule = await import('@/services/api');
  return apiModule.setupInterceptors;
};

describe('api service', () => {
  beforeEach(() => {
    requestUse.mockClear();
    responseUse.mockClear();
    localStorage.clear();
  });

  it('registra interceptors apenas uma vez', async () => {
    const setupInterceptors = await loadSetupInterceptors();
    const setLoading = jest.fn();

    setupInterceptors(setLoading);
    setupInterceptors(setLoading);

    expect(requestUse).toHaveBeenCalledTimes(1);
    expect(responseUse).toHaveBeenCalledTimes(1);
  });

  it('controla loading e injeta token nas requisicoes', async () => {
    const setupInterceptors = await loadSetupInterceptors();
    const setLoading = jest.fn();

    setupInterceptors(setLoading);

    const onRequest = requestUse.mock.calls[0][0];
    const onRequestError = requestUse.mock.calls[0][1];
    const onResponse = responseUse.mock.calls[0][0];
    const onResponseError = responseUse.mock.calls[0][1];

    localStorage.setItem('token', 'abc');
    const config = { headers: {} as Record<string, string> };

    const result = onRequest(config);
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(result.headers.Authorization).toBe('Bearer abc');

    setLoading.mockClear();
    const response = { data: 'ok' };
    expect(onResponse(response)).toBe(response);
    expect(setLoading).toHaveBeenCalledWith(false);

    setLoading.mockClear();
    const error = new Error('falha');

    await expect(onResponseError(error)).rejects.toThrow('falha');
    expect(setLoading).toHaveBeenCalledWith(false);

    setLoading.mockClear();
    await expect(onRequestError(error)).rejects.toThrow('falha');
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});
