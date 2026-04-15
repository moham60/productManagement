import { Product } from '../../types/index';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
  isLoading?: boolean;
  searchTerm?: string;
}

export function ProductGrid({
  products,
  onEdit,
  onDelete,
  isLoading = false,
  searchTerm = '',
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (products.length === 0) {
    const hasSearchTerm = searchTerm.trim().length > 0;

    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <p className="text-lg text-on-surface-variant dark:text-slate-400 mb-2">No products found</p>
        <p className="text-sm text-on-surface-variant dark:text-slate-400">
          {hasSearchTerm
            ? `No products match "${searchTerm}". Try a different search term or adjust your filters.`
            : 'Try adjusting your search or filters'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          prioritizeImage={index === 0}
        />
      ))}
    </div>
  );
}
