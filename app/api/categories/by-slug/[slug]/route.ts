import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const categoriesFile = path.join(process.cwd(), 'data', 'categories.json');
const productsFile = path.join(process.cwd(), 'data', 'products.json');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const categories = JSON.parse(fs.readFileSync(categoriesFile, 'utf8'));
  const category = categories.find((c: any) => c.slug === slug);
  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
  const categoryProducts = products.filter((p: any) => p.categoryId === category.id);
  const productsWithCategory = categoryProducts.map((p: any) => ({
    ...p,
    category,
  }));

  return NextResponse.json({ ...category, products: productsWithCategory });
}