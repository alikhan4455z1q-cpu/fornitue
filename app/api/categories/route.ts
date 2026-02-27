import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'categories.json');

export async function GET() {
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const categories = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const newId = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;
  const newCategory = { id: newId, ...body };
  categories.push(newCategory);
  fs.writeFileSync(dataFile, JSON.stringify(categories, null, 2));
  return NextResponse.json(newCategory, { status: 201 });
}