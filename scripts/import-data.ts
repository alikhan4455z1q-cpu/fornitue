import { prisma } from '../lib/prisma';
import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';

async function main() {
  // Clear existing data (optional)
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Insert categories
  for (const cat of categoriesData) {
    await prisma.category.create({
      data: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        thumbnail: cat.thumbnail,
      },
    });
  }

  // Insert products
  for (const prod of productsData) {
    await prisma.product.create({
      data: {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        sizes: JSON.stringify(prod.sizes),
        colors: JSON.stringify(prod.colors),
        description: prod.description,
        material: prod.material,
        warranty: prod.warranty,
        inStock: prod.inStock,
        categoryId: prod.categoryId,
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());