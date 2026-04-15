import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useImageUpload } from '../../hooks/index';

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string, isBase64: boolean) => void;
  initialImage?: string;
  initialIsBase64?: boolean;
  error?: string;
}

export function ImageUploader({
  onImageSelect,
  initialImage = '',
  initialIsBase64 = false,
  error,
}: ImageUploaderProps) {
  const upload = useImageUpload();
  const [mode, setMode] = useState<'upload' | 'url'>('url');
  const [urlInput, setUrlInput] = useState(initialImage);

  React.useEffect(() => {
    if (initialImage) {
      if (initialIsBase64) {
        setMode('upload');
      } else {
        setMode('url');
        setUrlInput(initialImage);
      }
    }
  }, [initialImage, initialIsBase64]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    upload.handleFileChange(e);
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string, true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUrlChange = (url: string) => {
    setUrlInput(url);
    if (url) {
      upload.handleUrlChange(url);
      onImageSelect(url, false);
    }
  };

  const handleClear = () => {
    upload.clearImage();
    setUrlInput('');
    onImageSelect('', false);
  };

  const displayImage = upload.preview || initialImage;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-headline font-bold text-on-surface dark:text-slate-100 uppercase tracking-wide">Product Image</h3>

      {/* Mode Selector - Style as category chips */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold tracking-wide transition-colors ${
            mode === 'url'
              ? 'bg-primary text-on-primary'
              : 'bg-secondary-container text-on-secondary-container dark:bg-slate-800 dark:text-slate-200 hover:bg-surface-container-highest dark:hover:bg-slate-700'
          }`}
        >
          URL Input
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1 ${
            mode === 'upload'
              ? 'bg-primary text-on-primary'
              : 'bg-secondary-container text-on-secondary-container dark:bg-slate-800 dark:text-slate-200 hover:bg-surface-container-highest dark:hover:bg-slate-700'
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      {/* URL Input */}
      {mode === 'url' && (
        <>
          <label htmlFor="product-image-url" className="sr-only">
            Product image URL
          </label>
          <input
            id="product-image-url"
            type="url"
            value={urlInput}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="arch-input"
          />
        </>
      )}

      {/* File Upload */}
      {mode === 'upload' && (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant dark:border-slate-700 rounded-lg p-12 cursor-pointer hover:bg-surface-container-low dark:hover:bg-slate-800/50 transition-colors">
          <Upload className="w-8 h-8 text-primary dark:text-blue-400 mb-3" />
          <span className="text-sm font-semibold text-on-surface dark:text-slate-200">Click to upload image</span>
          <span className="text-xs text-on-surface-variant dark:text-slate-400 mt-1">Max 500KB</span>
          <input
            aria-label="Upload product image file"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      )}

      {/* Error */}
      {(upload.error || error) && (
        <p className="error-text">{upload.error || error}</p>
      )}

      {/* Preview */}
      {displayImage && (
        <div className="relative group">
          <img
            src={displayImage}
            alt="Preview"
            className="w-full h-56 object-cover rounded-xl shadow-ambient group-hover:shadow-lg transition-all"
            onError={() => handleClear()}
          />
          <button
            type="button"
            onClick={handleClear}
            aria-label="Remove selected product image"
            title="Remove selected image"
            className="absolute top-3 right-3 p-2 bg-error/90 hover:bg-error text-on-error rounded-lg transition-all opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
