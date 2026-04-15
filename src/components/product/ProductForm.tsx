import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useForm } from '../../hooks/index';
import { ImageUploader } from '../shared/ImageUploader';
import { ColorPicker } from '../shared/ColorPicker';
import { validateProductForm } from '../../utils/validators';
import { Color, ProductFormData } from '../../types/index';
import toast from 'react-hot-toast';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialData?: ProductFormData;
  isLoading?: boolean;
  isEditMode?: boolean;
}

export function ProductForm({
  onSubmit,
  initialData,
  isLoading = false,
  isEditMode = false,
}: ProductFormProps) {
  const navigate = useNavigate();

  const [colors, setColors] = React.useState<Color[]>(initialData?.colors || []);
  const [imageUrl, setImageUrl] = React.useState(initialData?.imageUrl || '');
  const [imageIsBase64, setImageIsBase64] = React.useState(initialData?.isBase64 || false);

  const defaultFormData: ProductFormData = {
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    imageUrl: initialData?.imageUrl || '',
    categoryName: initialData?.categoryName || '',
    categoryImageUrl: initialData?.categoryImageUrl || '',
    colors: initialData?.colors || [],
  };

  const form = useForm(defaultFormData, handleSubmit);

  async function handleSubmit(data: ProductFormData) {
    // Validate image
    if (!imageUrl) {
      toast.error('Please upload or enter a product image');
      return;
    }

    // Validate colors
    if (colors.length === 0) {
      toast.error('Please add at least one color');
      return;
    }

    // Prepare form data
    const submitData: ProductFormData = {
      name: data.name || '',
      description: data.description || '',
      price: parseFloat(String(data.price)) || 0,
      imageUrl,
      isBase64: imageIsBase64,
      categoryName: data.categoryName || '',
      categoryImageUrl: data.categoryImageUrl || '',
      colors,
    };

    // Validate with Zod
    const validation = validateProductForm(submitData);
    if (!validation.success) {
      form.setFormErrors(validation.errors || {});
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      onSubmit(submitData);
      form.reset();
      setColors([]);
      setImageUrl('');
      toast.success(isEditMode ? 'Product updated successfully!' : 'Product added successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to save product');
    }
  }

  const handleImageSelect = (url: string, isBase64: boolean) => {
    setImageUrl(url);
    setImageIsBase64(isBase64);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 pt-20">
      {/* Editorial Header Section */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary dark:text-blue-400 hover:opacity-80 transition-opacity mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-body font-medium">Back to Products</span>
        </button>
        <div>
          <span className="text-tertiary font-label text-[10px] tracking-[0.2em] font-bold uppercase">Product Management</span>
          <h1 className="text-5xl font-headline font-extrabold tracking-tighter text-on-surface dark:text-slate-100 mt-2">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <form onSubmit={form.handleSubmit} className="space-y-8">
          {/* Row 1: Two Cards (Basic Info & Product Media) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Basic Information */}
            <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-8 shadow-ambient space-y-6">
              <h2 className="text-xl font-headline font-bold text-on-surface dark:text-slate-100">Basic Information</h2>

              {/* Product Name */}
              <div>
                <label htmlFor="product-name" className="block text-sm font-semibold text-on-surface dark:text-slate-200 mb-2">Product Name *</label>
                <input
                  id="product-name"
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={form.formData.name}
                  onChange={form.handleChange}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-slate-800 border-none rounded-lg text-on-surface dark:text-slate-100 placeholder-on-surface-variant dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest dark:focus:bg-slate-700 transition-all font-body"
                />
                {form.errors.name && <p className="mt-1 text-sm text-error">{form.errors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="product-description" className="block text-sm font-semibold text-on-surface dark:text-slate-200 mb-2">Description *</label>
                <textarea
                  id="product-description"
                  name="description"
                  placeholder="Enter description (min 10 characters)"
                  value={form.formData.description}
                  onChange={form.handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-slate-800 border-none rounded-lg text-on-surface dark:text-slate-100 placeholder-on-surface-variant dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest dark:focus:bg-slate-700 transition-all font-body resize-none"
                />
                {form.errors.description && <p className="mt-1 text-sm text-error">{form.errors.description}</p>}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="product-price" className="block text-sm font-semibold text-on-surface dark:text-slate-200 mb-2">Price *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400 font-body">$</span>
                  <input
                    id="product-price"
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={form.formData.price}
                    onChange={form.handleChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 bg-surface-container-low dark:bg-slate-800 border-none rounded-lg text-on-surface dark:text-slate-100 placeholder-on-surface-variant dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest dark:focus:bg-slate-700 transition-all font-body"
                  />
                </div>
                {form.errors.price && <p className="mt-1 text-sm text-error">{form.errors.price}</p>}
              </div>

              {/* Category Name */}
              <div>
                <label htmlFor="product-category-name" className="block text-sm font-semibold text-on-surface dark:text-slate-200 mb-2">Category Name *</label>
                <input
                  id="product-category-name"
                  type="text"
                  name="categoryName"
                  placeholder="Enter category name"
                  value={form.formData.categoryName}
                  onChange={form.handleChange}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-slate-800 border-none rounded-lg text-on-surface dark:text-slate-100 placeholder-on-surface-variant dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest dark:focus:bg-slate-700 transition-all font-body"
                />
                {form.errors.categoryName && <p className="mt-1 text-sm text-error">{form.errors.categoryName}</p>}
              </div>
            </div>

            {/* Card 2: Product Media */}
            <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-8 shadow-ambient space-y-6">
              <h2 className="text-xl font-headline font-bold text-on-surface dark:text-slate-100">Product Media</h2>

              {/* Product Image */}
              <div>
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  initialImage={initialData?.imageUrl}
                  initialIsBase64={initialData?.isBase64}
                  error={form.errors.imageUrl}
                />
              </div>

              {/* Category Image URL */}
              <div>
                <label htmlFor="product-category-image-url" className="block text-sm font-semibold text-on-surface dark:text-slate-200 mb-2">Category Image URL</label>
                <input
                  id="product-category-image-url"
                  type="url"
                  name="categoryImageUrl"
                  placeholder="https://example.com/category-image.jpg"
                  value={form.formData.categoryImageUrl}
                  onChange={form.handleChange}
                  className="w-full px-4 py-3 bg-surface-container-low dark:bg-slate-800 border-none rounded-lg text-on-surface dark:text-slate-100 placeholder-on-surface-variant dark:placeholder-slate-500 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest dark:focus:bg-slate-700 transition-all font-body"
                />
                {form.errors.categoryImageUrl && <p className="mt-1 text-sm text-error">{form.errors.categoryImageUrl}</p>}
              </div>
            </div>
          </div>

          {/* Row 2: Full Width - Product Colors Card */}
          <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-8 shadow-ambient space-y-6">
            <h2 className="text-xl font-headline font-bold text-on-surface dark:text-slate-100">Product Colors</h2>
            <ColorPicker
              colors={colors}
              onColorsChange={setColors}
              error={form.errors.colors}
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end pt-6 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={() => navigate('/')}
              disabled={isLoading}
              className="px-6 py-3 bg-surface-container-high dark:bg-slate-800 text-on-surface dark:text-slate-100 rounded-lg font-semibold hover:bg-surface-container-highest dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : isEditMode ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
