import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'categories.json');

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const categories = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const category = categories.find((c: any) => c.id === id);
  if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const body = await request.json();
  const categories = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const index = categories.findIndex((c: any) => c.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  categories[index] = { ...categories[index], ...body, id };
  fs.writeFileSync(dataFile, JSON.stringify(categories, null, 2));
  return NextResponse.json(categories[index]);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const categories = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const filtered = categories.filter((c: any) => c.id !== id);
  fs.writeFileSync(dataFile, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}