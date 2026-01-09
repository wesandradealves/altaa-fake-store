import Script from 'next/script';
import classNames from 'classnames';
import '@/assets/scss/globals.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ClientProviders from '@/app/client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.NEXT_PUBLIC_API_URL_DEV ??
    process.env.NEXT_PUBLIC_API_URL_HML ??
    '';

  return (
    <html lang="pt-br">
      <body
        suppressHydrationWarning={true}
        className={classNames(`
          antialiased overflow-x-hidden
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-track]:ms-7
          [&::-webkit-scrollbar-track]:me-7
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-yellow-500
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:cursor-move
        `)}
      >
        {apiBaseUrl ? <link rel="preconnect" href={apiBaseUrl} crossOrigin="anonymous" /> : null}
        {apiBaseUrl ? <link rel="dns-prefetch" href={apiBaseUrl} /> : null}
        <Script
          src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"
          strategy="afterInteractive"
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
