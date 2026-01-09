import ProductDetailTemplate from '@/components/templates/ProductDetailTemplate';

interface PageProps {
  params?: Promise<{
    id?: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = (await params) ?? {};
  const id = resolvedParams.id ?? '';
  return <ProductDetailTemplate id={id} />;
}
