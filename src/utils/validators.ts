import { z } from 'zod';

// ============ Color Schema ============
export const ColorSchema = z.object({
  id: z.string().min(1, 'Color ID is required'),
  hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color'),
  name: z.string().optional(),
});

// ============ Category Schema ============
export const CategorySchema = z.object({
  id: z.string().min(1, 'Category ID is required'),
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  imageUrl: z.string().url('Invalid category image URL').optional().or(z.literal('')),
});

// ============ Product Form Schema ============
export const ProductFormSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be greater than 0'),
  imageUrl: z.string().min(1, 'Please upload or enter an image URL'),
  categoryId: z.string().min(1, 'Category ID is required'),
  categoryName: z.string().min(2, 'Category name must be at least 2 characters'),
  categoryImageUrl: z.string().url('Invalid category image URL').or(z.literal('')),
  colors: z
    .array(ColorSchema)
    .min(1, 'Please add at least one color')
    .max(20, 'Maximum 20 colors allowed'),
});

export type ProductFormInput = z.infer<typeof ProductFormSchema>;

// ============ Validation Functions ============
export const validateProductForm = (data: unknown) => {
  try {
    const validatedData = ProductFormSchema.parse(data);
    return { success: true, data: validatedData, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        formattedErrors[path] = err.message;
      });
      return { success: false, data: null, errors: formattedErrors };
    }
    return { success: false, data: null, errors: { general: 'Validation failed' } };
  }
};

export const validateColor = (hex: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};

export const validatePrice = (price: number): boolean => {
  return typeof price === 'number' && price > 0;
};

export const validateImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
