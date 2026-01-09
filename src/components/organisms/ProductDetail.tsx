'use client';

import Link from 'next/link';
import Image from 'next/image';
import { memo, useMemo } from 'react';
import styled from 'styled-components';
import type { Product } from '@/types/product';
import Badge from '@/components/atoms/Badge';
import Price from '@/components/atoms/Price';
import InfoRow from '@/components/molecules/InfoRow';
import RatingRow from '@/components/molecules/RatingRow';

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

  return (
    <DetailShell className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-xl lg:p-10">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <Link href={backHref} className="text-gray-300 transition hover:text-white">
          {backLabel}
        </Link>
        <Badge className="bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-200">
          {category}
        </Badge>
      </div>

      <DetailGrid>
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white/5">
          <Image src={product.image} alt={title} fill sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
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
              <Badge className="bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-200">
                {category}
              </Badge>
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
