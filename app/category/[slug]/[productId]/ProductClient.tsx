'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function ProductClient({ product, categorySlug, relatedProducts }: any) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || { name: '', hex: '#000000' });
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor.name);
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${categorySlug}`} className="hover:text-amber-600 capitalize">{categorySlug}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Product details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-lg">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
            <div className="mb-6">
              <span className="text-3xl font-bold text-amber-600">£{product.price}</span>
              {!product.inStock && (
                <span className="ml-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Out of Stock
                </span>
              )}
            </div>
            <p className="text-gray-700 text-lg mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3">Select Size:</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg font-medium transition ${
                      selectedSize === size
                        ? 'bg-amber-500 text-white'
                        : 'border-2 border-gray-300 hover:border-amber-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3">Select Color:</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors?.map((color: any) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor.name === color.name ? 'border-amber-500' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3">Quantity:</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-lg hover:bg-gray-100 text-xl"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded-lg hover:bg-gray-100 text-xl"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 rounded-lg text-lg font-semibold transition ${
                  product.inStock
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
              <a
                href="https://m.me/ahmad.ali.513661"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-semibold transition text-center"
              >
                Message Us
              </a>
            </div>

            {/* Product Details */}
            <div className="border-t pt-8">
              <h3 className="font-semibold text-lg mb-4">Product Details</h3>
              <dl className="grid grid-cols-1 gap-4">
                <div className="flex">
                  <dt className="w-32 font-medium text-gray-600">Material:</dt>
                  <dd className="text-gray-900">{product.material}</dd>
                </div>
                <div className="flex">
                  <dt className="w-32 font-medium text-gray-600">Warranty:</dt>
                  <dd className="text-gray-900">{product.warranty}</dd>
                </div>
                <div className="flex">
                  <dt className="w-32 font-medium text-gray-600">Delivery:</dt>
                  <dd className="text-gray-900">Free UK delivery on all orders</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts?.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((related: any) => (
                <Link
                  key={related.id}
                  href={`/category/${categorySlug}/${related.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-amber-600 transition">{related.name}</h3>
                      <span className="text-amber-600 font-bold">£{related.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}