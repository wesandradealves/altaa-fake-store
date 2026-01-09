import axios from 'axios';

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_API_URL_DEV ??
  process.env.NEXT_PUBLIC_API_URL_HML ??
  'https://fakestoreapi.com';

const apiBasePath = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const api = axios.create({
  baseURL: apiBaseUrl ? `${apiBaseUrl}${apiBasePath}` : undefined,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let interceptorsReady = false;

export const setupInterceptors = (setLoading: (loading: boolean) => void) => {
  if (interceptorsReady) return;
  interceptorsReady = true;

  api.interceptors.request.use(
    (config) => {
      setLoading(true);

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );
};

export default api;
