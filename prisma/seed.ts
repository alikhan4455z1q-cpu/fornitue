import { PrismaClient } from '@prisma/client';
import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  console.log('Cleared existing data');

  // Insert categories
  console.log(`Inserting ${categoriesData.length} categories...`);
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
  console.log('Categories inserted');

  // Insert products
  console.log(`Inserting ${productsData.length} products...`);
  for (const prod of productsData) {
    // Validate required fields
    if (!prod.price) {
      console.error(`Product ${prod.id} (${prod.name}) is missing price`);
      continue;
    }
    await prisma.product.create({
      data: {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        sizes: JSON.stringify(prod.sizes || []),
        colors: JSON.stringify(prod.colors || []),
        description: prod.description || '',
        material: prod.material || '',
        warranty: prod.warranty || '',
        inStock: prod.inStock ?? true,
        categoryId: prod.categoryId,
      },
    });
  }
  console.log('Products inserted');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });