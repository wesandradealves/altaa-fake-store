'use client';

import { ThemeProvider } from 'styled-components';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { LoaderProvider, useLoader } from '@/context/spinner';
import { AppProvider } from '@/context/app';
import { AccessibilityProvider } from '@/context/accessibility';
import Spinner from '@/components/spinner/spinner';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import StyledJsxRegistry from './registry';
import { App, GlobalStyle } from '@/app/style';
import { setupInterceptors } from '@/services/api';
import { _colors, _breakpoints } from '@/assets/scss/variables';
import content from '@/config/content.json';

const theme = {
  _colors,
  _breakpoints,
};

let interceptorsInitialized = false;

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({
    container: scrollRef,
  });
  const [isHydrated, setIsHydrated] = useState(false);
  const persister = useMemo(() => {
    if (!isHydrated || typeof window === 'undefined') return null;
    return createSyncStoragePersister({
      storage: window.localStorage,
      key: 'bdm-web3:react-query',
    });
  }, [isHydrated]);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 60 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((n) => {
      setScrollPosition(n);
    });
    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  const contentTree = (
    <ThemeProvider theme={theme}>
      <LoaderProvider>
        <LoaderSetup />
        <AccessibilityProvider>
          <AppProvider>
            <Suspense fallback={<div>{content.common.loading}</div>}>
              <StyledJsxRegistry>
                <AnimatePresence
                  mode="wait"
                  initial={true}
                  onExitComplete={() => window.scrollTo(0, 0)}
                >
                  <App id="primary">
                    <motion.div
                      className="min-h-screen flex flex-col"
                      initial={{ x: 0, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 0, opacity: 0 }}
                      ref={scrollRef}
                    >
                      <Header scrollPosition={scrollPosition} />
                      {children}
                      <Footer />
                    </motion.div>
                    <Spinner />
                  </App>
                </AnimatePresence>
              </StyledJsxRegistry>
            </Suspense>
          </AppProvider>
        </AccessibilityProvider>
      </LoaderProvider>
      <GlobalStyle />
    </ThemeProvider>
  );

  if (!persister) {
    return <QueryClientProvider client={queryClient}>{contentTree}</QueryClientProvider>;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 24 * 60 * 60 * 1000,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => query.state.status === 'success',
        },
      }}
    >
      {contentTree}
    </PersistQueryClientProvider>
  );
}

function LoaderSetup() {
  const { setLoading } = useLoader();

  useEffect(() => {
    if (interceptorsInitialized) return;
    interceptorsInitialized = true;
    setupInterceptors(setLoading);
  }, [setLoading]);

  return null;
}
