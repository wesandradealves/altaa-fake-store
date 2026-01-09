'use client';

import { ThemeProvider } from 'styled-components';
import { Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { LoaderProvider, useLoader } from '@/context/spinner';
import { AppProvider } from '@/context/app';
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

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({
    container: scrollRef,
  });
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((n) => {
      setScrollPosition(n);
    });
    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  return (
    <ThemeProvider theme={theme}>
      <LoaderProvider>
        <LoaderSetup />
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
      </LoaderProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

function LoaderSetup() {
  const { setLoading } = useLoader();

  useEffect(() => {
    setupInterceptors(setLoading);
  }, [setLoading]);

  return null;
}
