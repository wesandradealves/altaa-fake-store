'use client';

import { useApp } from '@/context/app';

const Footer = () => {
  const { appName } = useApp();

  return (
    <footer className="mt-auto border-t border-white/10 text-sm text-gray-400">
      <div className="container m-auto flex flex-wrap items-center justify-between gap-2 py-6">
        <span>{appName}</span>
        <span>Base app router + styled-components + motion</span>
      </div>
    </footer>
  );
};

export default Footer;
