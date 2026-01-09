import { useSyncExternalStore } from 'react';

export const useHydrated = () => {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
};
