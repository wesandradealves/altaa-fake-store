'use client';

import { useApp } from '@/context/app';
import content from '@/config/content.json';

const Footer = () => {
  const { appName } = useApp();

  return (
    <footer className="mt-auto border-t border-white/10 text-sm text-gray-400">
      <div className="container m-auto flex flex-wrap items-center justify-between gap-2 py-6">
        <span>{appName}</span>
        <span
          dangerouslySetInnerHTML={{
            __html: content.app.footer.tagline,
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
