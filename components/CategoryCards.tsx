'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CategoryCards({ categories }: { categories: any[] }) {
  return (
    <section id="categories" className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Shop by Category</h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Discover our handpicked collections of premium furniture for every room
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
          >
            <Link href={`/category/${cat.slug}`}>
              <div className="relative h-80">
                <Image
                  src={cat.thumbnail}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                <span className="inline-block bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-amber-500 hover:text-white transition">
                  Shop {cat.name} →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}