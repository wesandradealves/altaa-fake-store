export const resolveQueryError = (error: unknown): string | null => {
  if (error instanceof Error) return error.message;
  return error ? 'Unexpected error' : null;
};

export const isEmptyResult = (
  loading: boolean,
  error: string | null,
  length: number
): boolean => !loading && !error && length === 0;
