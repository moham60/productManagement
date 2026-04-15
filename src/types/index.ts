// ============ Product & Category ============
export interface Color {
  id: string;
  hex: string;
  name?: string;
}

export interface Category {
  name: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isBase64?: boolean;
  category: Category;
  colors: Color[];
  createdAt: string;
  updatedAt: string;
}

// ============ Form Data ============
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isBase64?: boolean;
  categoryName: string;
  categoryImageUrl?: string;
  colors: Color[];
}

// ============ Filter & Sort ============
export type SortOption = 'price-low' | 'price-high' | 'name-asc' | 'name-desc';

export interface FilterState {
  searchTerm: string;
  categoryName: string | null;
  sortBy: SortOption;
}

// ============ Context Types ============
export interface ProductContextType {
  products: Product[];
  categories: Category[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  addProduct: (data: ProductFormData) => void;
  updateProduct: (id: string, data: ProductFormData) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getFilteredAndSortedProducts: (filters: FilterState) => Product[];
  loading: boolean;
  error: string | null;
}

// ============ Notification ============
export interface NotificationPayload {
  type: 'success' | 'error' | 'info';
  message: string;
}
