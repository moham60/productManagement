import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useProductContext } from '../context/ProductContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { DeleteConfirmation } from '../components/shared/DeleteConfirmation';
import { FilterState, SortOption } from '../types/index';
import { SORT_OPTIONS } from '../utils/constants';
import { useDebounce } from '../hooks/index';

export function ProductListPage() {
  const navigate = useNavigate();
  const { categories, deleteProduct, searchTerm } = useProductContext();
 

  const [filters, setFilters] = useState<FilterState>({
    searchTerm,
    categoryName: null,
    sortBy: 'price-low',
  });
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    productId: string;
    productName: string;
  }>({
    isOpen: false,
    productId: '',
    productName: '',
  });

  // Update filters whenever search, category, or sort changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      searchTerm: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm]);

  const handleCategoryChange = (categoryName: string) => {
    setFilters(prev => ({
      ...prev,
      categoryName: categoryName === '' ? null : categoryName,
    }));
  };

  const handleAllItems = () => {
    setFilters(prev => ({
      ...prev,
      categoryName: null,
    }));
  };

  const handleSortChange = (sortBy: SortOption) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
    }));
  };

  const handleEdit = (id: string) => {
    navigate(`/products/${id}/edit`);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteModal({
      isOpen: true,
      productId: id,
      productName: name,
    });
  };

  const handleConfirmDelete = () => {
    deleteProduct(deleteModal.productId);
    setDeleteModal({ isOpen: false, productId: '', productName: '' });
  };

  // Get filtered and sorted products
  const { getFilteredAndSortedProducts } = useProductContext();
  const filteredProducts = getFilteredAndSortedProducts(filters);

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 pt-20">
      {/* Editorial Header Section */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-tertiary font-label text-[10px] tracking-[0.2em] font-bold uppercase">Archive 2024</span>
            <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface dark:text-slate-100 mt-2">
              Inventory
            </h1>
          </div>
          <button
            onClick={() => navigate('/products/new')}
            className="px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-5 h-5" />
            New Product
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="flex  flex-wrap  items-center justify-end w-full gap-2">
          {/* All Items Button */}
          <button
            onClick={handleAllItems}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              filters.categoryName === null
                ? 'bg-primary text-on-primary shadow-md'
                : 'bg-secondary-container text-on-secondary-container dark:bg-slate-800 dark:text-slate-200 hover:bg-surface-container-highest dark:hover:bg-slate-700'
            }`}
          >
            All Items
          </button>

          
              {/* Category Filter Specific buttons */}
         
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryChange(category.name)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                filters.categoryName === category.name
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-secondary-container text-on-secondary-container dark:bg-slate-800 dark:text-slate-200 hover:bg-surface-container-highest dark:hover:bg-slate-700'
              }`}
            >
              {category.name}
            </button>
          ))}

          {/* Sort/Price Filter Dropdown */}
          <label htmlFor="product-sort" className="sr-only">
            Sort products
          </label>
          <select
            id="product-sort"
            aria-label="Sort products"
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="px-4 py-2 bg-surface-container-high dark:bg-slate-800 border-none rounded-full text-xs font-semibold text-on-surface dark:text-slate-100 focus:ring-2 focus:ring-primary/40 transition-all cursor-pointer hover:bg-surface-container-highest dark:hover:bg-slate-700"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

         
        </div>

      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-8 py-4">
        <ProductGrid
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          searchTerm={filters.searchTerm}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        productName={deleteModal.productName}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, productId: '', productName: '' })}
      />
    </div>
  );
}
