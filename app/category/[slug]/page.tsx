import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProductGrid from '@/components/ProductGrid';
import { getCategoryBySlug, getProducts } from '@/lib/data';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProducts(category.id).map((p: any) => ({
    ...p,
    category,
  }));

  return (
    <main>
      <section className="relative h-64 md:h-96 flex items-center justify-center text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore our premium collection of {category.name.toLowerCase()}
          </p>
        </div>
      </section>

      <ProductGrid products={products} categorySlug={category.slug} />
    </main>
  );
}