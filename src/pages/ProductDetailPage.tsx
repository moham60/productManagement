import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { useProductContext } from '../context/ProductContext';
import { DeleteConfirmation } from '../components/shared/DeleteConfirmation';
import { ColorSwatches } from '../components/shared/ColorSwatches';
import { formatPrice } from '../utils/formatters';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, deleteProduct } = useProductContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const product = id ? getProduct(id) : null;

  const handleDelete = () => {
    if (product) {
      deleteProduct(product.id);
      navigate('/');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background dark:bg-slate-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-on-surface-variant dark:text-slate-400 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg font-bold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 pt-20">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary dark:text-blue-400 hover:opacity-80 transition-opacity group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-body font-medium">Back to Products</span>
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image (Left) */}
          <div className="flex flex-col gap-6">
            <div className="group bg-surface-container-lowest dark:bg-slate-900 rounded-2xl overflow-hidden shadow-ambient aspect-square">
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/600x600?text=Product';
                }}
              />
            </div>
          </div>

          {/* Product Details (Right) */}
          <div className="flex flex-col gap-8">
            {/* Editorial Header */}
            <div>
              <span className="text-tertiary font-label text-[10px] tracking-[0.2em] font-bold uppercase">Product Details</span>
              <h1 className="text-5xl font-headline font-extrabold tracking-tighter text-on-surface dark:text-slate-100 mt-2">
                {product.name}
              </h1>
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              <p className="text-on-surface-variant dark:text-slate-400 font-label text-sm uppercase tracking-wide">Price</p>
              <p className="text-4xl font-bold text-primary dark:text-blue-400 font-headline">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Description Section */}
            <div className="space-y-4 bg-surface-container-low dark:bg-slate-800/50 rounded-xl p-8">
              <h2 className="text-sm font-headline font-bold text-on-surface dark:text-slate-100 uppercase tracking-wide">Description</h2>
              <p className="text-on-surface dark:text-slate-200 font-body leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Category Section */}
            <div className="space-y-4 bg-surface-container-low dark:bg-slate-800/50 rounded-xl p-8">
              <h2 className="text-sm font-headline font-bold text-on-surface dark:text-slate-100 uppercase tracking-wide">Category</h2>
              <div className="flex items-center gap-4">
                {product.category.imageUrl && (
                  <img
                    src={product.category.imageUrl}
                    alt={product.category.name}
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 rounded-lg object-cover shadow-ambient"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <span className="text-lg font-headline font-bold text-on-surface dark:text-slate-100">
                  {product.category.name}
                </span>
              </div>
            </div>

            {/* Colors Section */}
            <div className="space-y-4 bg-surface-container-low dark:bg-slate-800/50 rounded-xl p-8">
              <h2 className="text-sm font-headline font-bold text-on-surface dark:text-slate-100 uppercase tracking-wide">
                Available Colors
              </h2>
              <ColorSwatches colors={product.colors} maxVisible={8} />
            </div>

            {/* Metadata */}
            <div className="text-xs text-on-surface-variant dark:text-slate-500 space-y-1 font-body">
              <p>Added: {new Date(product.createdAt).toLocaleDateString()}</p>
              <p>Last updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => navigate(`/products/${product.id}/edit`)}
                className="flex-1 px-6 py-3 bg-primary text-on-primary rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Edit2 className="w-5 h-5" />
                Edit Product
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex-1 px-6 py-3 bg-error text-on-error rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteConfirmation
        isOpen={showDeleteModal}
        productName={product.name}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
