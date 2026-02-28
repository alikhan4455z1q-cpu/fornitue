import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    const products = await prisma.product.findMany({
      where: categoryId ? { categoryId: parseInt(categoryId) } : {},
      include: { category: true },
    });

    // Parse JSON fields (sizes, colors) for frontend
    const parsedProducts = products.map(p => ({
      ...p,
      sizes: JSON.parse(p.sizes),
      colors: JSON.parse(p.colors),
    }));

    return NextResponse.json(parsedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, image, sizes, colors, description, material, warranty, inStock, categoryId } = body;

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        image,
        sizes: JSON.stringify(sizes),
        colors: JSON.stringify(colors),
        description,
        material,
        warranty,
        inStock,
        categoryId: parseInt(categoryId),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}