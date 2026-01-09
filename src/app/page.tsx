'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useMetadata } from '@/hooks/useMetadata';

export default function HomePage() {
  useMetadata({
    title: 'Starter App',
    description: 'Minimal boilerplate with registry, providers, axios loader, and motion.',
    keywords: 'nextjs, styled-components, motion, axios',
    ogTitle: 'Starter App',
    ogImage: '/favicon.ico',
    favicon: '/favicon.ico',
  });

  return (
    <section className="container m-auto py-16 text-white">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Boilerplate</p>
        <h1 className="mt-4 text-3xl font-semibold lg:text-5xl">Starter App</h1>
        <p className="mt-4 text-base text-gray-300 lg:text-lg">
          This base keeps the app router structure, providers, registry, loaders, metadata hook,
          SCSS imports, and motion usage without app-specific services.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/secondary"
            className="rounded-full border border-white/20 px-5 py-2 text-sm transition hover:border-white/40"
          >
            Secondary layout
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
