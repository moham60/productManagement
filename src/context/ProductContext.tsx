import React, { createContext, useReducer, useEffect, ReactNode, useMemo, useState } from 'react';
import { Product, ProductContextType, ProductFormData, FilterState, Category } from '../types/index';
import { localStorageService } from '../services/localStorage.service';

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

interface State {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  products: [],
  loading: true,
  error: null,
};

function productReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false, error: null };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  // Initialize data on mount
  useEffect(() => {
    try {
      localStorageService.initialize();
      const products = localStorageService.getAllProducts();
      const loadedCategories = localStorageService.getAllCategories();

      dispatch({ type: 'SET_PRODUCTS', payload: products });
      setCategories(loadedCategories);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load products' });
    }
  }, []);

  const addProduct = (data: ProductFormData) => {
    try {
      // Check if category exists, if not add it
      const existingCategory = localStorageService.getCategory(data.categoryName);
      if (!existingCategory) {
        const newCategory: Category = {
          name: data.categoryName,
          imageUrl: data.categoryImageUrl,
        };
        localStorageService.addCategory(newCategory);
      }

      const newProduct = localStorageService.addProduct(data);
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
      setCategories(localStorageService.getAllCategories());
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add product' });
    }
  };

  const updateProduct = (id: string, data: ProductFormData) => {
    try {
      // Check if category exists, if not add it
      const existingCategory = localStorageService.getCategory(data.categoryName);
      if (!existingCategory) {
        const newCategory: Category = {
          name: data.categoryName,
          imageUrl: data.categoryImageUrl,
        };
        localStorageService.addCategory(newCategory);
      }

      const updated = localStorageService.updateProduct(id, data);
      dispatch({ type: 'UPDATE_PRODUCT', payload: updated });
      setCategories(localStorageService.getAllCategories());
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update product' });
    }
  };

  const deleteProduct = (id: string) => {
    try {
      localStorageService.deleteProduct(id);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete product' });
    }
  };

  const getProduct = (id: string): Product | undefined => {
    return state.products.find((p) => p.id === id);
  };

  const getFilteredAndSortedProducts = (filters: FilterState): Product[] => {
    let filtered = state.products;

    // Search filter
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    // Category filter (by name)
    if (filters.categoryName) {
      filtered = filtered.filter((p) => p.category.name === filters.categoryName);
    }

    // Sort
    filtered = localStorageService.sortProducts(filtered, filters.sortBy);

    return filtered;
  };

  const value: ProductContextType = useMemo(() => ({
    products: state.products,
    categories,
    searchTerm,
    setSearchTerm,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getFilteredAndSortedProducts,
    loading: state.loading,
    error: state.error,
  }), [state.products, categories, state.loading, state.error, searchTerm]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProductContext(): ProductContextType {
  const context = React.useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within ProductProvider');
  }
  return context;
}
