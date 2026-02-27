import Image from 'next/image';
import Link from 'next/link';
import CategoryCards from '@/components/CategoryCards';

export const metadata = {
  title: 'Search Products | Luxury Furniture UK',
  description: 'Search for your perfect bed, sofa, or mattress.',
};



import WhyUs from '@/components/WhyUs';
import { getCategories, getProducts } from '@/lib/data';

export default async function Home() {
  const categories = getCategories();
  const allProducts = getProducts();
  const featured = allProducts.slice(0, 3); // first 3 as featured

  return (
    <main>
      {/* Hero Section (unchanged) */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero.jpg"
            alt="Luxury living room"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Luxury Furniture for Your <span className="text-amber-300">British Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Handcrafted beds, sofas, and mattresses delivered across the UK
          </p>
          <Link
            href="https://m.me/ahmad.ali.513661"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105"
          >
            Message Us on Messenger
          </Link>
        </div>
      </section>

      <CategoryCards categories={categories} />
 
      <WhyUs />
    </main>
  );
}