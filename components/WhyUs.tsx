'use client';

import { motion } from 'framer-motion';

const reasons = [
  { icon: '🇬🇧', title: 'British Craftsmanship', desc: 'Handcrafted by skilled artisans' },
  { icon: '🚚', title: 'Free UK Delivery', desc: 'On orders over £500' },
  { icon: '🔄', title: '100-Night Trial', desc: 'On all mattresses' },
  { icon: '⭐', title: '5-Star Reviews', desc: 'From customers across the UK' },
];

export default function WhyUs() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-all"
          >
            <div className="text-5xl mb-4">{reason.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p className="text-gray-600">{reason.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}