import { getCategories, getProductsWithCategory } from '@/lib/data';

export default async function sitemap() {
  const baseUrl = 'https://fornitue-mep1.vercel.app/'; // Replace with your actual Vercel URL

  // Static pages (always safe)
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Categories - filter out any without slug
  const categories = getCategories();
  const categoryPages = (await categories)
    .filter((cat: any) => cat && cat.slug) // ✅ Ensure category and slug exist
    .map((cat: any) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));

  // Products - get all products with their category
  const products = getProductsWithCategory();
  const productPages = (await products)
    .filter((prod: any) => prod && prod.category && prod.category.slug) // ✅ Ensure product, category, and slug exist
    .map((prod: any) => ({
      url: `${baseUrl}/category/${prod.category.slug}/${prod.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  return [...staticPages, ...categoryPages, ...productPages];
}
