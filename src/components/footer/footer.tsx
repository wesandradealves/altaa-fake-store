'use client';

import Logo from '@/components/atoms/Logo';
import content from '@/config/content.json';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 text-sm text-[var(--text-muted)]">
      <div className="container m-auto flex flex-wrap items-center justify-between gap-2 py-6">
        <Logo className="h-8 w-auto" width={120} height={68} />
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
