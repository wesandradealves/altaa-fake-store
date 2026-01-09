'use client';

import { useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { useProduct } from '@/hooks/useProduct';
import { useMetadata } from '@/hooks/useMetadata';
import StateMessage from '@/components/molecules/StateMessage';
import ProductDetailSkeleton from '@/components/molecules/ProductDetailSkeleton';
import ProductDetail from '@/components/organisms/ProductDetail';
import content from '@/config/content.json';

interface Props {
  id: string;
}

const ProductDetailTemplate = ({ id }: Props) => {
  const { product, loading, error, refresh, isReady } = useProduct(id);

  const title = useMemo(() => {
    if (product?.title) {
      return `${content.productDetail.meta.titlePrefix}: ${product.title}`;
    }
    return content.productDetail.meta.title;
  }, [product?.title]);

  const description = useMemo(
    () => product?.description || content.productDetail.meta.description,
    [product?.description]
  );

  const ogImage = useMemo(() => product?.image || '/favicon.ico', [product?.image]);

  useMetadata({
    title,
    description,
    keywords: content.productDetail.meta.keywords,
    ogTitle: product?.title || content.productDetail.meta.ogTitle,
    ogImage,
    favicon: '/favicon.ico',
  });

  const labels = useMemo(() => content.productDetail.labels, []);

  const handleRetry = useCallback(() => {
    refresh();
  }, [refresh]);

  const isEmpty = useMemo(
    () => !loading && !error && !product && isReady,
    [error, isReady, loading, product]
  );

  return (
    <section className="container m-auto py-16 text-white">
      <div className="mb-8 space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{content.productDetail.eyebrow}</p>
        <h1 className="text-3xl font-semibold lg:text-5xl">{content.productDetail.title}</h1>
        <p className="text-sm text-gray-300">{content.productDetail.subtitle}</p>
      </div>

      {loading ? (
        <ProductDetailSkeleton />
      ) : error ? (
        <StateMessage
          title={content.productDetail.states.errorTitle}
          description={content.productDetail.states.errorDescription}
          actionLabel={content.productDetail.states.retry}
          onAction={handleRetry}
          tone="alert"
        />
      ) : isEmpty ? (
        <StateMessage
          title={content.productDetail.states.emptyTitle}
          description={content.productDetail.states.emptyDescription}
        />
      ) : product ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProductDetail
            product={product}
            labels={labels}
            backLabel={content.productDetail.backLabel}
          />
        </motion.div>
      ) : null}
    </section>
  );
};

export default ProductDetailTemplate;
