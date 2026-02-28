import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, slug, image, thumbnail } = body;
  const category = await prisma.category.create({
    data: { name, slug, image, thumbnail },
  });
  return NextResponse.json(category, { status: 201 });
}