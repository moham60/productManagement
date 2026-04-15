import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import { ProductForm } from '../components/product/ProductForm';
import { ProductFormData } from '../types/index';
import toast from 'react-hot-toast';

export function ProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, addProduct, updateProduct } = useProductContext();
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!id;
  const product = id ? getProduct(id) : null;

  const initialData = product
    ? {
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        isBase64: product.isBase64,
        categoryName: product.category.name,
        categoryImageUrl: product.category.imageUrl,
        colors: product.colors,
      }
    : undefined;

  const handleSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      if (isEditMode && id) {
        updateProduct(id, data);
      } else {
        addProduct(data);
      }
      navigate('/');
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to save product');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditMode && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      onSubmit={handleSubmit}
      initialData={initialData}
      isLoading={isLoading}
      isEditMode={isEditMode}
    />
  );
}
