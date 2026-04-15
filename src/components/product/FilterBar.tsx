import React from 'react';
import { Search } from 'lucide-react';
import { FilterState, SortOption } from '../../types/index';
import { SORT_OPTIONS } from '../../utils/constants';
import { useDebounce } from '../../hooks/index';
import { Category } from '../../types/index';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  categories: Category[];
  initialFilters: FilterState;
}

export function FilterBar({ onFilterChange, categories, initialFilters }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = React.useState(initialFilters.searchTerm);
  const [categoryName, setCategoryName] = React.useState(initialFilters.categoryName || '');
  const [sortBy, setSortBy] = React.useState<SortOption>(initialFilters.sortBy);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  React.useEffect(() => {
    onFilterChange({
      searchTerm: debouncedSearchTerm,
      categoryName: categoryName || null,
      sortBy,
    });
  }, [debouncedSearchTerm, categoryName, sortBy, onFilterChange]);

  return (
    <div className="bg-surface dark:bg-slate-900/50 rounded-xl p-6 shadow-sm">
      {/* Editorial Header */}
      <div className="mb-6">
        <span className="text-tertiary font-label text-[10px] tracking-[0.2em] font-bold uppercase">Filters</span>
        <h2 className="text-3xl font-headline font-bold text-on-surface dark:text-slate-100 mt-2">Search & Organize</h2>
      </div>

      <div className="flex flex-col gap-6">
        {/* Search Input */}
        <div className="flex-1 relative">
          <label className="block text-sm font-semibold text-on-surface dark:text-slate-200 mb-2">Search Products</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline dark:text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-surface-container-low dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest dark:focus:bg-slate-700 transition-all text-on-surface dark:text-slate-100 font-body"
            />
          </div>
        </div>

        {/* Category Filter - Chips */}
        <div>
          <label className="block text-sm font-semibold text-on-surface dark:text-slate-200 mb-3">Categories</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryName('')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                categoryName === ''
                  ? 'bg-primary text-on-primary'
                  : 'bg-secondary-container text-on-secondary-container dark:bg-slate-800 dark:text-slate-200 hover:bg-surface-container-highest dark:hover:bg-slate-700'
              }`}
            >
              All Items
            </button>
            {Array.from(
              new Map(categories.map(cat => [cat.name, cat])).values()
            ).map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCategoryName(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                  categoryName === cat.name
                    ? 'bg-primary text-on-primary'
                    : 'bg-secondary-container text-on-secondary-container dark:bg-slate-800 dark:text-slate-200 hover:bg-surface-container-highest dark:hover:bg-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-on-surface dark:text-slate-200 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full bg-surface-container-low dark:bg-slate-800 border-none rounded-lg px-4 py-2 text-on-surface dark:text-slate-100 focus:ring-2 focus:ring-primary/40 transition-all font-body"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
