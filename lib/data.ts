import { prisma } from './prisma';
import { Category, Product } from '@prisma/client';

// Helper to parse JSON fields (since Prisma returns strings for JSON fields)
const parseProductFields = (product: any) => ({
  ...product,
  sizes: JSON.parse(product.sizes),
  colors: JSON.parse(product.colors),
});

export async function getCategories() {
  return await prisma.category.findMany();
}

export async function getCategoryBySlug(slug: string) {
  return await prisma.category.findUnique({ where: { slug } });
}

export async function getProducts(categoryId?: number) {
  const where = categoryId ? { categoryId } : {};
  const products = await prisma.product.findMany({ where });
  return products.map(parseProductFields);
}

export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!product) return null;
  return {
    ...parseProductFields(product),
    category: product.category,
  };
}

export async function getProductsWithCategory() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  return products.map(p => ({
    ...parseProductFields(p),
    category: p.category,
  }));
}