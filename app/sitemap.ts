import { getCategories, getProductsWithCategory } from '@/lib/data';

export default async function sitemap() {
  const baseUrl = 'https://yourdomain.com'; // Replace with your actual domain

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Category pages
  const categories = getCategories();
  const categoryPages = categories.map((cat: any) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(), // Ideally use cat.updatedAt if you have it
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Product pages
  const products = getProductsWithCategory();
  const productPages = products.map((prod: any) => ({
    url: `${baseUrl}/category/${prod.category.slug}/${prod.id}`,
    lastModified: new Date(), // Ideally use prod.updatedAt
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}