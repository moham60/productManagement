import { useState, useEffect } from 'react';

// ============ useDebounce ============
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// ============ useImageUpload ============
export function useImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState<string>('');

  const MAX_FILE_SIZE = 500 * 1024; // 500KB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError('');

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(`File size exceeds ${MAX_FILE_SIZE / 1024}KB limit`);
      return;
    }

    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUrlChange = (url: string) => {
    setError('');
    setFile(null);
    if (url) {
      // Validate URL format
      try {
        new URL(url);
        setPreview(url);
      } catch {
        setError('Invalid image URL');
      }
    } else {
      setPreview('');
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreview('');
    setError('');
  };

  return {
    file,
    preview,
    error,
    handleFileChange,
    handleUrlChange,
    clearImage,
  };
}

// ============ useForm ============
export interface FormState {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

export function useForm<T extends FormState>(
  initialState: T,
  onSubmit: (data: T) => Promise<void> | void
) {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? parseFloat(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Clear error for this field on change
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setFormData(initialState);
    setErrors({});
  };

  const setFieldError = (field: string, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const setFormErrors = (newErrors: FormErrors) => {
    setErrors(newErrors);
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setFormData,
    setFieldError,
    setFormErrors,
  };
}
