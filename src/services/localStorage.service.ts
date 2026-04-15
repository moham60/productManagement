import { Product, Category, ProductFormData } from '../types/index';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/formatters';

class ProductLocalStorageService {
  // ============ Initialization ============
  initialize(): void {
    if (!this.getProducts().length) {
      this.setProducts(MOCK_PRODUCTS);
    }
    if (!this.getCategories().length) {
      this.setCategories(MOCK_CATEGORIES);
    }
  }

  // ============ Private Helpers ============
  private getProducts(): Product[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading products from localStorage:', error);
      return [];
    }
  }

  private setProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (error) {
      console.error('Error writing products to localStorage:', error);
    }
  }

  private getCategories(): Category[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading categories from localStorage:', error);
      return [];
    }
  }

  private setCategories(categories: Category[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (error) {
      console.error('Error writing categories to localStorage:', error);
    }
  }

  private getStorageSize(): number {
    let size = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage[key].length + key.length;
      }
    }
    return size;
  }

  // ============ Product CRUD Operations ============
  getAllProducts(): Product[] {
    return this.getProducts();
  }

  getProduct(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  }

  addProduct(formData: ProductFormData): Product {
    const products = this.getProducts();
    const now = new Date().toISOString();

    // Check storage limit (warn at 80% of 5MB)
    const storageSize = this.getStorageSize();
    if (storageSize > 4 * 1024 * 1024) {
      console.warn('Warning: localStorage is nearly full');
    }

    const newProduct: Product = {
      id: generateId(),
      name: formData.name,
      description: formData.description,
      price: formData.price,
      imageUrl: formData.imageUrl,
      isBase64: formData.isBase64,
      category: {
        name: formData.categoryName,
        imageUrl: formData.categoryImageUrl,
      },
      colors: formData.colors,
      createdAt: now,
      updatedAt: now,
    };

    products.push(newProduct);
    this.setProducts(products);
    return newProduct;
  }

  updateProduct(id: string, formData: ProductFormData): Product {
    const products = this.getProducts();
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    const updatedProduct: Product = {
      ...products[productIndex],
      name: formData.name,
      description: formData.description,
      price: formData.price,
      imageUrl: formData.imageUrl,
      isBase64: formData.isBase64,
      category: {
        name: formData.categoryName,
        imageUrl: formData.categoryImageUrl,
      },
      colors: formData.colors,
      updatedAt: new Date().toISOString(),
    };

    products[productIndex] = updatedProduct;
    this.setProducts(products);
    return updatedProduct;
  }

  deleteProduct(id: string): void {
    const products = this.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    this.setProducts(filtered);
  }

  // ============ Category Operations ============
  getAllCategories(): Category[] {
    let categories = this.getCategories();

    return categories;
  }

  getCategory(name: string): Category | undefined {
    return this.getCategories().find((c) => c.name === name);
  }

  addCategory(category: Category): Category {
    const categories = this.getCategories();
    categories.push(category);
    this.setCategories(categories);
    return category;
  }

 

  // ============ Search & Filter ============
  searchProducts(searchTerm: string): Product[] {
    const products = this.getProducts();
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  }

  filterByCategory(categoryName: string): Product[] {
    return this.getProducts().filter((p) => p.category.name === categoryName);
  }

  // ============ Sorting ============
  sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }

  // ============ Data Management ============
  clearAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
  }

  resetToMockData(): void {
    this.setProducts(MOCK_PRODUCTS);
    this.setCategories(MOCK_CATEGORIES);
  }

  exportData() {
    return {
      products: this.getProducts(),
      categories: this.getCategories(),
      exportDate: new Date().toISOString(),
    };
  }

  importData(data: { products: Product[]; categories: Category[] }): void {
    if (data.products && Array.isArray(data.products)) {
      this.setProducts(data.products);
    }
    if (data.categories && Array.isArray(data.categories)) {
      this.setCategories(data.categories);
    }
  }
}

export const localStorageService = new ProductLocalStorageService();
