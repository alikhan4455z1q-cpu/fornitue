import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const productsFile = path.join(process.cwd(), 'data', 'products.json');
const categoriesFile = path.join(process.cwd(), 'data', 'categories.json');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');

  const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
  const categories = JSON.parse(fs.readFileSync(categoriesFile, 'utf8'));

  let filtered = products;
  if (categoryId) {
    filtered = products.filter((p: any) => p.categoryId === parseInt(categoryId));
  }

  const productsWithCategory = filtered.map((p: any) => ({
    ...p,
    category: categories.find((c: any) => c.id === p.categoryId) || null,
  }));

  return NextResponse.json(productsWithCategory);
}

export async function POST(request: Request) {
  const body = await request.json();
  const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
  const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  const newProduct = { id: newId, ...body };
  products.push(newProduct);
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
  return NextResponse.json(newProduct, { status: 201 });
}