import { getProductsWithCategory } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q?.trim() || '';
  const allProducts = getProductsWithCategory();
  const results = query
    ? allProducts.filter((p: any) => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  // Render as before (using results)
  // ...
}