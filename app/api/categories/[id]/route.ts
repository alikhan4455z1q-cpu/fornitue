import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'categories.json');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const categories = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const category = categories.find((c: any) => c.id === parseInt(id));
  if (!category) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(category);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const categories = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const index = categories.findIndex((c: any) => c.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  categories[index] = { ...categories[index], ...body, id: parseInt(id) };
  fs.writeFileSync(dataFile, JSON.stringify(categories, null, 2));
  return NextResponse.json(categories[index]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const categories = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const filtered = categories.filter((c: any) => c.id !== parseInt(id));
  fs.writeFileSync(dataFile, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}