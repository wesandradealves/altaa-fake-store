import ProductDetailTemplate from '@/components/templates/ProductDetailTemplate';

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  return <ProductDetailTemplate id={params.id} />;
}
