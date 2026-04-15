import { Trash2 } from 'lucide-react';

interface DeleteConfirmationProps {
  isOpen: boolean;
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeleteConfirmation({
  isOpen,
  productName,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-2xl shadow-ambient p-8 max-w-sm w-full mx-4 border border-outline-variant/10 dark:border-slate-700/30">
        {/* Header with Icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-error/10 dark:bg-red-900/30 rounded-lg">
            <Trash2 className="w-6 h-6 text-error" />
          </div>
          <h2 className="text-2xl font-headline font-bold text-on-surface dark:text-slate-100">
            Delete Product
          </h2>
        </div>

        {/* Message */}
        <div className="mb-8 space-y-2">
          <p className="text-on-surface dark:text-slate-200 font-body">
            Are you sure you want to delete{' '}
            <span className="font-bold text-error">"{productName}"</span>?
          </p>
          <p className="text-sm text-on-surface-variant dark:text-slate-400 font-body">
            This action cannot be undone. The product will be permanently removed from your inventory.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-3 bg-surface-container-high dark:bg-slate-800 text-on-surface dark:text-slate-100 rounded-lg font-semibold hover:bg-surface-container-highest dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-3 bg-error text-on-error rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
