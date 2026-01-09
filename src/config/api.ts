export const getApiBaseUrl = () => {
  return (
    process.env.NEXT_PUBLIC_FAKE_STORE_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_URL_DEV ||
    process.env.NEXT_PUBLIC_API_URL_HML ||
    'https://fakestoreapi.com'
  );
};
