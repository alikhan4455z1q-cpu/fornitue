import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const categoriesFile = path.join(process.cwd(), 'data', 'categories.json');
const productsFile = path.join(process.cwd(), 'data', 'products.json');

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const categories = JSON.parse(fs.readFileSync(categoriesFile, 'utf8'));
  const category = categories.find((c: any) => c.slug === slug);
  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
  const categoryProducts = products.filter((p: any) => p.categoryId === category.id);
  // Attach category to each product
  const productsWithCategory = categoryProducts.map((p: any) => ({
    ...p,
    category,
  }));
  return NextResponse.json({ ...category, products: productsWithCategory });
}