import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';
import { getProductById, getProducts } from '@/lib/data';

export default async function ProductPage({ params }: { params: Promise<{ slug: string; productId: string }> }) {
  const { slug, productId } = await params;
  console.log('=== Product Page Debug ===');
  console.log('Params:', { slug, productId });

  const id = parseInt(productId);
  console.log('Parsed ID:', id);

  const product = getProductById(id);
  console.log('Product from getProductById:', product);

  if (!product) {
    console.log('Product not found, calling notFound()');
    notFound();
  }

  const related = getProducts(product.categoryId)
    .filter((p: any) => p.id !== product.id)
    .slice(0, 3)
    .map((p: any) => ({ ...p, category: product.category }));

  console.log('Related products count:', related.length);

  return <ProductClient product={product} categorySlug={slug} relatedProducts={related} />;
}