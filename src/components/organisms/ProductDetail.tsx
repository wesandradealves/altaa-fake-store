'use client';

import Link from 'next/link';
import Image from 'next/image';
import { memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import type { Product } from '@/types/product';
import Badge from '@/components/atoms/Badge';
import Price from '@/components/atoms/Price';
import InfoRow from '@/components/molecules/InfoRow';
import RatingRow from '@/components/molecules/RatingRow';
import { encodeCategorySlug } from '@/utils';

const DetailShell = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const DetailGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    align-items: start;
  }
`;

const ZoomFrame = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.06);
  cursor: zoom-in;
  --zoom: 1;
  --zoom-x: 50%;
  --zoom-y: 50%;

  img {
    transform: scale(var(--zoom));
    transform-origin: var(--zoom-x) var(--zoom-y);
    transition: transform 140ms ease-out;
    will-change: transform;
  }
`;

interface Labels {
  price: string;
  category: string;
  description: string;
  rating: string;
  ratingCount: string;
}

interface Props {
  product: Product;
  labels: Labels;
  backLabel: string;
  backHref?: string;
}

const ProductDetail = ({ product, labels, backLabel, backHref = '/' }: Props) => {
  const title = useMemo(() => product.title.trim(), [product.title]);
  const category = useMemo(() => product.category.trim(), [product.category]);
  const description = useMemo(() => product.description.trim(), [product.description]);
  const ratingValue = useMemo(() => product.rating?.rate ?? 0, [product.rating?.rate]);
  const ratingCount = useMemo(() => product.rating?.count ?? 0, [product.rating?.count]);
  const categoryHref = useMemo(() => `/categoria/${encodeCategorySlug(category)}`, [category]);

  const zoomRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const canHover =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover)').matches;

    node.style.setProperty('--zoom', '1');
    node.style.setProperty('--zoom-x', '50%');
    node.style.setProperty('--zoom-y', '50%');

    if (!canHover) return;

    let rafId = 0;

    const updateZoom = (event: PointerEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = Math.min(Math.max(0, event.clientX - rect.left), rect.width);
        const y = Math.min(Math.max(0, event.clientY - rect.top), rect.height);
        const xPercent = rect.width ? (x / rect.width) * 100 : 50;
        const yPercent = rect.height ? (y / rect.height) * 100 : 50;

        node.style.setProperty('--zoom', '2.4');
        node.style.setProperty('--zoom-x', `${xPercent}%`);
        node.style.setProperty('--zoom-y', `${yPercent}%`);
      });
    };

    const resetZoom = () => {
      if (rafId) cancelAnimationFrame(rafId);
      node.style.setProperty('--zoom', '1');
      node.style.setProperty('--zoom-x', '50%');
      node.style.setProperty('--zoom-y', '50%');
    };

    node.addEventListener('pointerenter', updateZoom);
    node.addEventListener('pointermove', updateZoom);
    node.addEventListener('pointerleave', resetZoom);

    return () => {
      node.removeEventListener('pointerenter', updateZoom);
      node.removeEventListener('pointermove', updateZoom);
      node.removeEventListener('pointerleave', resetZoom);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <DetailShell className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-xl lg:p-10">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <Link href={backHref} className="text-gray-300 transition hover:text-white">
          {backLabel}
        </Link>
        <Link href={categoryHref} className="inline-flex">
          <Badge className="bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-200 hover:bg-white/20">
            {category}
          </Badge>
        </Link>
      </div>

      <DetailGrid>
        <ZoomFrame ref={zoomRef}>
          <Image
            src={product.image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6"
          />
        </ZoomFrame>
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold lg:text-4xl">{title}</h1>
            <RatingRow
              value={ratingValue}
              count={ratingCount}
              label={labels.rating}
              countLabel={labels.ratingCount}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow label={labels.price}>
              <Price className="text-xl font-semibold text-white" value={product.price} />
            </InfoRow>
            <InfoRow label={labels.category}>
              <Link href={categoryHref} className="inline-flex">
                <Badge className="bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-200 hover:bg-white/20">
                  {category}
                </Badge>
              </Link>
            </InfoRow>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm uppercase tracking-[0.2em] text-gray-400">{labels.description}</h2>
            <p className="text-sm leading-relaxed text-gray-200">{description}</p>
          </div>
        </div>
      </DetailGrid>
    </DetailShell>
  );
};

export default memo(ProductDetail);
