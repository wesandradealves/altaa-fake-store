import ProductsTemplate from '@/components/templates/ProductsTemplate';
import { decodeCategorySlug } from '@/utils';

interface PageProps {
  params?: Promise<{
    slug?: string[];
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = (await params) ?? {};
  const slug = resolvedParams.slug?.join('/') ?? '';
  const category = decodeCategorySlug(slug);

  return <ProductsTemplate initialCategory={category} />;
}
