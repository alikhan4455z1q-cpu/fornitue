'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [showSelector, setShowSelector] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    setShowSelector(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowSelector(!showSelector)}
        className="bg-gray-900 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm transition"
      >
        Add to Cart
      </button>
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl p-4 z-10"
          >
            <h4 className="font-semibold mb-2">Select Size</h4>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full border rounded p-2 mb-3"
            >
              {product.sizes?.map((size: string) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            <h4 className="font-semibold mb-2">Select Color</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.colors?.map((color: any) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.name ? 'border-amber-500' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded transition"
            >
              Confirm
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}