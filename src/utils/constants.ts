import type { Category } from '../types/index';

// ============ Categories ============
export const MOCK_CATEGORIES: Category[] = [
  {
  
    name: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
  },
  {
    name: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&h=200&fit=crop',
  },
  {

    name: 'Home & Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=200&h=200&fit=crop',
  },
  {
    name: 'Books',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=200&h=200&fit=crop',
  },
  {
    name: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop',
  },
];

// ============ Mock Colors ============
export const MOCK_COLORS = {
  red: { id: 'color-red', hex: '#EF4444', name: 'Red' },
  blue: { id: 'color-blue', hex: '#3B82F6', name: 'Blue' },
  green: { id: 'color-green', hex: '#10B981', name: 'Green' },
  yellow: { id: 'color-yellow', hex: '#FBBF24', name: 'Yellow' },
  purple: { id: 'color-purple', hex: '#A855F7', name: 'Purple' },
  pink: { id: 'color-pink', hex: '#EC4899', name: 'Pink' },
  indigo: { id: 'color-indigo', hex: '#6366F1', name: 'Indigo' },
  orange: { id: 'color-orange', hex: '#F97316', name: 'Orange' },
  teal: { id: 'color-teal', hex: '#14B8A6', name: 'Teal' },
  cyan: { id: 'color-cyan', hex: '#06B6D4', name: 'Cyan' },
  gray: { id: 'color-gray', hex: '#6B7280', name: 'Gray' },
  slate: { id: 'color-slate', hex: '#64748B', name: 'Slate' },
  amber: { id: 'color-amber', hex: '#F59E0B', name: 'Amber' },
  lime: { id: 'color-lime', hex: '#84CC16', name: 'Lime' },
  black: { id: 'color-black', hex: '#000000', name: 'Black' },
};

// ============ Sort Options ============
export const SORT_OPTIONS = [
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

// ============ Mock Products ============
export const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Wireless Bluetooth Headphones Pro',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life, advanced sound quality, and comfortable design for all-day wear.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[0],
    colors: [MOCK_COLORS.black, MOCK_COLORS.blue, MOCK_COLORS.gray, MOCK_COLORS.pink],
    createdAt: new Date(2024, 0, 1).toISOString(),
    updatedAt: new Date(2024, 0, 1).toISOString(),
  },
  {
    id: 'prod-2',
    name: 'Wireless USB-C Charging Cable',
    description: 'Fast charging cable compatible with all modern smartphones and tablets, durable design that lasts for years.',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1591959518455-b92d9d3e4f16?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[0],
    colors: [MOCK_COLORS.red, MOCK_COLORS.blue, MOCK_COLORS.orange, MOCK_COLORS.teal],
    createdAt: new Date(2024, 0, 2).toISOString(),
    updatedAt: new Date(2024, 0, 2).toISOString(),
  },
  {
    id: 'prod-3',
    name: '4K USB-C Monitor',
    description: 'Ultra-high-definition 4K display with USB-C connectivity, perfect for professional work and creative professionals.',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[0],
    colors: [MOCK_COLORS.gray, MOCK_COLORS.slate, MOCK_COLORS.black],
    createdAt: new Date(2024, 0, 3).toISOString(),
    updatedAt: new Date(2024, 0, 3).toISOString(),
  },
  {
    id: 'prod-4',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and eco-friendly organic cotton t-shirt, perfect for everyday wear with sustainable fashion choices.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[1],
    colors: [MOCK_COLORS.red, MOCK_COLORS.blue, MOCK_COLORS.green, MOCK_COLORS.black],
    createdAt: new Date(2024, 0, 4).toISOString(),
    updatedAt: new Date(2024, 0, 4).toISOString(),
  },
  {
    id: 'prod-5',
    name: 'Premium Denim Jeans',
    description: 'Classic denim jeans made from high-quality materials, versatile style that works for any occasion and season.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c62e4beeb?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[1],
    colors: [MOCK_COLORS.blue, MOCK_COLORS.indigo, MOCK_COLORS.gray, MOCK_COLORS.black],
    createdAt: new Date(2024, 0, 5).toISOString(),
    updatedAt: new Date(2024, 0, 5).toISOString(),
  },
  {
    id: 'prod-6',
    name: 'Elegant Stainless Steel Watch',
    description: 'Sophisticated timepiece with stainless steel construction, water-resistant, and features precision quartz movement.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[1],
    colors: [MOCK_COLORS.gray, MOCK_COLORS.pink, MOCK_COLORS.teal],
    createdAt: new Date(2024, 0, 6).toISOString(),
    updatedAt: new Date(2024, 0, 6).toISOString(),
  },
  {
    id: 'prod-7',
    name: 'Non-Stick Cookware Set',
    description: 'Complete cookware set with non-stick coating, includes pans, pots, and lids for complete kitchen cooking needs.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[2],
    colors: [MOCK_COLORS.red, MOCK_COLORS.black, MOCK_COLORS.gray],
    createdAt: new Date(2024, 0, 7).toISOString(),
    updatedAt: new Date(2024, 0, 7).toISOString(),
  },
  {
    id: 'prod-8',
    name: 'Bamboo Cutting Board Set',
    description: 'Eco-friendly bamboo cutting boards in various sizes, durable and sustainable for food preparation tasks daily.',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[2],
    colors: [MOCK_COLORS.amber, MOCK_COLORS.orange, MOCK_COLORS.lime],
    createdAt: new Date(2024, 0, 8).toISOString(),
    updatedAt: new Date(2024, 0, 8).toISOString(),
  },
  {
    id: 'prod-9',
    name: 'Stainless Steel Kettle',
    description: 'Modern electric kettle with stainless steel construction, fast heating capability, and automatic shut-off feature.',
    price: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[2],
    colors: [MOCK_COLORS.gray, MOCK_COLORS.black, MOCK_COLORS.red],
    createdAt: new Date(2024, 0, 9).toISOString(),
    updatedAt: new Date(2024, 0, 9).toISOString(),
  },
  {
    id: 'prod-10',
    name: 'The Complete JavaScript Course',
    description: 'Comprehensive guide to mastering JavaScript programming with practical examples, exercises, and real-world projects.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[3],
    colors: [MOCK_COLORS.blue, MOCK_COLORS.yellow, MOCK_COLORS.purple],
    createdAt: new Date(2024, 0, 10).toISOString(),
    updatedAt: new Date(2024, 0, 10).toISOString(),
  },
  {
    id: 'prod-11',
    name: 'React in Depth Guide',
    description: 'Deep dive into React framework covering hooks, context, performance optimization, and advanced pattern techniques.',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[3],
    colors: [MOCK_COLORS.blue, MOCK_COLORS.cyan, MOCK_COLORS.teal, MOCK_COLORS.indigo],
    createdAt: new Date(2024, 0, 11).toISOString(),
    updatedAt: new Date(2024, 0, 11).toISOString(),
  },
  {
    id: 'prod-12',
    name: 'Professional Basketball',
    description: 'Official size professional-grade basketball, perfect for indoor and outdoor games with excellent ball control.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[4],
    colors: [MOCK_COLORS.orange, MOCK_COLORS.red, MOCK_COLORS.blue, MOCK_COLORS.black],
    createdAt: new Date(2024, 0, 12).toISOString(),
    updatedAt: new Date(2024, 0, 12).toISOString(),
  },
  {
    id: 'prod-13',
    name: 'Yoga Mat with Carrying Strap',
    description: 'Premium quality yoga mat with non-slip surface, includes carrying strap for portability and easy transport.',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[4],
    colors: [MOCK_COLORS.purple, MOCK_COLORS.pink, MOCK_COLORS.blue, MOCK_COLORS.green],
    createdAt: new Date(2024, 0, 13).toISOString(),
    updatedAt: new Date(2024, 0, 13).toISOString(),
  },
  {
    id: 'prod-14',
    name: 'Professional Tent Camping Set',
    description: 'Durable camping tent with rain fly, waterproof design, and easy setup, perfect for outdoor adventures.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[4],
    colors: [MOCK_COLORS.green, MOCK_COLORS.gray, MOCK_COLORS.orange, MOCK_COLORS.teal],
    createdAt: new Date(2024, 0, 14).toISOString(),
    updatedAt: new Date(2024, 0, 14).toISOString(),
  },
  {
    id: 'prod-15',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact wireless speaker with exceptional sound quality, long battery life, and waterproof design for adventures.',
    price: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: MOCK_CATEGORIES[0],
    colors: [MOCK_COLORS.blue, MOCK_COLORS.red, MOCK_COLORS.black, MOCK_COLORS.cyan],
    createdAt: new Date(2024, 0, 15).toISOString(),
    updatedAt: new Date(2024, 0, 15).toISOString(),
  },
];

// ============ Local Storage Keys ============
export const STORAGE_KEYS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  THEME: 'theme',
};

// ============ Format Constants ============
export const DESCRIPTION_MAX_LENGTH = 80;
export const PRODUCT_IMAGE_MAX_SIZE = 500 * 1024; // 500KB
