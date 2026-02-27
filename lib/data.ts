import fs from 'fs';
import path from 'path';

const categoriesFile = path.join(process.cwd(), 'data', 'categories.json');
const productsFile = path.join(process.cwd(), 'data', 'products.json');

const readJSON = (file: string) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${file}:`, error);
    return [];
  }
};

const parseProductFields = (product: any) => {
  try {
    return {
      ...product,
      sizes: typeof product.sizes === 'string' ? JSON.parse(product.sizes) : (product.sizes || []),
      colors: typeof product.colors === 'string' ? JSON.parse(product.colors) : (product.colors || []),
    };
  } catch (error) {
    console.error('Error parsing product fields for product:', product.id, error);
    return product;
  }
};

export const getCategories = () => {
  return readJSON(categoriesFile);
};

export const getCategoryBySlug = (slug: string) => {
  const categories = getCategories();
  return categories.find((c: any) => c.slug === slug) || null;
};

export const getProducts = (categoryId?: number) => {
  const products = readJSON(productsFile).map(parseProductFields);
  if (categoryId) {
    return products.filter((p: any) => p.categoryId === categoryId);
  }
  return products;
};

// ✅ Only one definition of getProductById
export const getProductById = (id: number) => {
  const products = readJSON(productsFile).map(parseProductFields);
  const product = products.find((p: any) => p.id === id);
  if (!product) return null;
  const categories = getCategories();
  const category = categories.find((c: any) => c.id === product.categoryId);
  return { ...product, category };
};

export const getProductsWithCategory = () => {
  const products = readJSON(productsFile).map(parseProductFields);
  const categories = getCategories();
  return products.map((p: any) => ({
    ...p,
    category: categories.find((c: any) => c.id === p.categoryId) || null,
  }));
};