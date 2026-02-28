import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { products: true },
  });
  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  const products = category.products.map(p => ({
    ...p,
    sizes: JSON.parse(p.sizes),
    colors: JSON.parse(p.colors),
  }));
  return NextResponse.json({ ...category, products });
}