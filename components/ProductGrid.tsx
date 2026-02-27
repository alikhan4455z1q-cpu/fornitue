'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AddToCartButton from './AddToCartButton';

export default function ProductGrid({ products, categorySlug }: { products: any[]; categorySlug: string }) {
  if (!products.length) {
    return <p className="text-center py-12 text-gray-500">No products found in this category.</p>;
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
          >
            <Link href={`/category/${categorySlug}/${product.id}`}>
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Link>
            <div className="p-5">
              <Link href={`/category/${categorySlug}/${product.id}`}>
                <h3 className="text-lg font-semibold mb-2 hover:text-amber-600 transition">{product.name}</h3>
              </Link>
              <div className="flex gap-1 mb-2">
                {product.colors?.slice(0, 3).map((c: any) => (
                  <span
                    key={c.name}
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
                {product.colors?.length > 3 && <span className="text-xs">+{product.colors.length - 3}</span>}
              </div>
              <p className="text-gray-600 text-sm mb-2">Sizes: {product.sizes?.join(' · ') || 'N/A'}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-amber-600">£{product.price}</span>
                <AddToCartButton product={product} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}