import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const productsFile = path.join(process.cwd(), 'data', 'products.json');
const categoriesFile = path.join(process.cwd(), 'data', 'categories.json');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
  const product = products.find((p: any) => p.id === parseInt(id));
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const categories = JSON.parse(fs.readFileSync(categoriesFile, 'utf8'));
  const category = categories.find((c: any) => c.id === product.categoryId);
  return NextResponse.json({ ...product, category });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
  const index = products.findIndex((p: any) => p.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  products[index] = { ...products[index], ...body, id: parseInt(id) };
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
  return NextResponse.json(products[index]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
  const filtered = products.filter((p: any) => p.id !== parseInt(id));
  fs.writeFileSync(productsFile, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}