export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  material: string;
  warranty: string;
  inStock: boolean;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string; // hero image for category page
  thumbnail: string; // card image
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Beds',
    slug: 'beds',
    image: '/images/category-beds-hero.jpg',
    thumbnail: '/images/category-beds-thumb.jpg',
  },
  {
    id: 2,
    name: 'Sofas',
    slug: 'sofas',
    image: '/images/category-sofas-hero.jpg',
    thumbnail: '/images/category-sofas-thumb.jpg',
  },
  {
    id: 3,
    name: 'Mattresses',
    slug: 'mattresses',
    image: '/images/category-mattresses-hero.jpg',
    thumbnail: '/images/category-mattresses-thumb.jpg',
  },
];

export const products: Product[] = [
  // Beds (categoryId 1)
  {
    id: 1,
    name: 'Luxury Upholstered Bed',
    price: 899,
    image: '/images/bed1.jpg',
    sizes: ['Double', 'King', 'Super King'],
    colors: [
      { name: 'Velvet Grey', hex: '#4A5568' },
      { name: 'Velvet Blue', hex: '#2C5282' },
    ],
    description: 'Experience ultimate comfort with our luxury upholstered bed. Featuring elegant velvet finish and sturdy wooden frame.',
    material: 'Velvet and solid wood',
    warranty: '5 years',
    inStock: true,
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Solid Oak Bed Frame',
    price: 1299,
    image: '/images/bed2.jpg',
    sizes: ['Double', 'King'],
    colors: [{ name: 'Natural Oak', hex: '#D2B48C' }],
    description: 'Handcrafted from solid European oak, this bed frame is built to last generations.',
    material: 'Solid oak',
    warranty: '10 years',
    inStock: true,
    categoryId: 1,
  },
  // Sofas (categoryId 2)
  {
    id: 3,
    name: 'Chesterfield Sofa',
    price: 1599,
    image: '/images/sofa1.jpg',
    sizes: ['2-Seater', '3-Seater'],
    colors: [
      { name: 'Burgundy', hex: '#800020' },
      { name: 'Navy', hex: '#001F3F' },
    ],
    description: 'Timeless Chesterfield design with deep button tufting and rolled arms. Handcrafted in Britain.',
    material: 'Velvet and hardwood frame',
    warranty: '7 years',
    inStock: true,
    categoryId: 2,
  },
  {
    id: 4,
    name: 'Modern Fabric Sofa',
    price: 1249,
    image: '/images/sofa2.jpg',
    sizes: ['2-Seater', '3-Seater'],
    colors: [{ name: 'Charcoal Grey', hex: '#36454F' }],
    description: 'Clean lines and deep seats make this modern sofa perfect for relaxing.',
    material: 'Polyester blend and birch frame',
    warranty: '5 years',
    inStock: true,
    categoryId: 2,
  },
  // Mattresses (categoryId 3)
  {
    id: 5,
    name: 'Memory Foam Mattress',
    price: 599,
    image: '/images/mattress1.jpg',
    sizes: ['Single', 'Double', 'King', 'Super King'],
    colors: [{ name: 'White', hex: '#FFFFFF' }],
    description: 'Pressure-relieving memory foam adapts to your body shape. Includes removable washable cover.',
    material: 'Gel memory foam and bamboo cover',
    warranty: '10 years',
    inStock: true,
    categoryId: 3,
  },
  {
    id: 6,
    name: 'Pocket Spring Mattress',
    price: 749,
    image: '/images/mattress2.jpg',
    sizes: ['Double', 'King', 'Super King'],
    colors: [{ name: 'White', hex: '#FFFFFF' }],
    description: 'Traditional pocket springs with modern comfort layers. Each spring moves independently.',
    material: 'Pocket springs, wool, and cotton',
    warranty: '8 years',
    inStock: true,
    categoryId: 3,
  },
];

export const getAllProducts = () => products;
export const getProductById = (id: number) => products.find(p => p.id === id);
export const getProductsByCategory = (categoryId: number) => products.filter(p => p.categoryId === categoryId);