import ProductsTemplate from '@/components/templates/ProductsTemplate';
import { decodeCategorySlug } from '@/utils';

interface PageProps {
  params: {
    slug: string[];
  };
}

export default function CategoryPage({ params }: PageProps) {
  const slug = params.slug?.join('/') ?? '';
  const category = decodeCategorySlug(slug);

  return <ProductsTemplate initialCategory={category} />;
}
