import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import { Product } from '../../types/index';
import { ColorSwatches } from '../shared/ColorSwatches';
import { truncateDescription, formatPrice } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
  prioritizeImage?: boolean;
}

export function ProductCard({ product, onEdit, onDelete, prioritizeImage = false }: ProductCardProps) {
  return (
    <div className="group bg-surface-container-lowest dark:bg-slate-800 rounded-xl overflow-hidden hover:shadow-ambient hover:-translate-y-1 transition-all duration-300">
      {/* Image Container - Architectural Editor style */}
      <Link to={`/products/${product.id}`} className="block overflow-hidden h-48 bg-surface-container-highest dark:bg-slate-700 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading={prioritizeImage ? 'eager' : 'lazy'}
          fetchPriority={prioritizeImage ? 'high' : 'auto'}
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          
        />
        {/* In-stock Badge with glassmorphism */}
        <div className="absolute top-4 right-4 bg-surface/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md">
          <span className="text-[10px] font-bold font-label uppercase tracking-widest text-on-surface dark:text-slate-100">
            Instock
          </span>
        </div>
      </Link>

      {/* Content Container - Architectural Editor spacing */}
      <div className="p-5 flex flex-col gap-3">
        {/* Product Name - Manrope headline font */}
        <Link
          to={`/products/${product.id}`}
          className="font-headline text-lg font-bold text-on-surface dark:text-slate-100 leading-tight hover:text-primary transition-colors line-clamp-2"
        >
          {product.name}
        </Link>

        {/* Description - Inter body font */}
        <p className="text-sm text-on-surface-variant dark:text-slate-400 font-body h-10 overflow-hidden">
          {truncateDescription(product.description, 80)}
        </p>

        {/* Price & Category Image */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary font-headline dark:text-blue-400">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Category Image Circle */}
          {product.category?.imageUrl && (
            <img
              src={product.category.imageUrl}
              alt={product.category.name}
              loading="lazy"
              decoding="async"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 dark:border-blue-400/20 flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
        </div>

        {/* Color Swatches */}
        {product.colors.length > 0 && (
          <div className="mb-2">
            <ColorSwatches colors={product.colors} />
          </div>
        )}

        {/* Action Buttons - Architectural Editor button styles */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onEdit(product.id)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id, product.name)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-error text-on-error rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
